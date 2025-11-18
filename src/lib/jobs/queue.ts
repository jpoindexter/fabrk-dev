/**
 * Background Job System
 * Simple, database-backed job queue for async processing
 *
 * Features:
 * - Priority-based job processing
 * - Retry logic with exponential backoff
 * - Scheduled/delayed jobs
 * - Job status tracking
 * - Dead letter queue
 * - Type-safe job handlers
 */

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Re-export types
export type { JobType, JobPriority, JobData, JobResult, JobHandler } from "./types";
export { PRIORITY_MAP } from "./types";

// Re-export handler functions
export { registerJobHandler } from "./handlers";

// Re-export processor functions
export {
  processNextJob,
  startJobWorker,
  processEmailQueue,
  startEmailQueueWorker,
} from "./processor";

// Import for internal use
import { PRIORITY_MAP } from "./types";
import type { JobData } from "./types";

/**
 * Adds a job to the queue for asynchronous processing
 * Jobs can be scheduled for future execution or prioritized
 *
 * @param data - Job configuration
 * @param data.type - Job type (must have a registered handler)
 * @param data.payload - Data to pass to the job handler
 * @param data.priority - Optional priority level (default: "normal")
 * @param data.maxAttempts - Maximum retry attempts (default: 3)
 * @param data.scheduledFor - Optional future execution time
 * @returns Job ID for tracking status
 *
 * @example
 * ```typescript
 * const jobId = await enqueueJob({
 *   type: "email.send",
 *   payload: {
 *     to: "user@example.com",
 *     subject: "Welcome!",
 *     html: "<h1>Hello</h1>"
 *   },
 *   priority: "high",
 *   maxAttempts: 5
 * });
 * ```
 */
export async function enqueueJob<T = unknown>(
  data: JobData<T>
): Promise<string> {
  const priority = PRIORITY_MAP[data.priority || "normal"];

  const job = await prisma.job.create({
    data: {
      type: data.type,
      status: "PENDING",
      priority,
      maxAttempts: data.maxAttempts || 3,
      // Prisma JSON field
      data: data.payload as Prisma.InputJsonValue,
      scheduledFor: data.scheduledFor,
    },
  });

  return job.id;
}

/**
 * Retrieves the current status and details of a job
 *
 * @param jobId - The job's ID
 * @returns Job status object with details, or null if not found
 *
 * @example
 * ```typescript
 * const status = await getJobStatus("job_123");
 * if (status) {
 *   console.log(`Status: ${status.status}`);
 *   console.log(`Attempts: ${status.attempts}/${status.maxAttempts}`);
 *   if (status.error) {
 *     console.error(`Error: ${status.error}`);
 *   }
 * }
 * ```
 */
export async function getJobStatus(jobId: string) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return null;
  }

  return {
    id: job.id,
    type: job.type,
    status: job.status,
    attempts: job.attempts,
    maxAttempts: job.maxAttempts,
    result: job.result,
    error: job.error,
    createdAt: job.createdAt,
    startedAt: job.startedAt,
    completedAt: job.completedAt,
  };
}

/**
 * Cancels a pending job (prevents it from being processed)
 * Only works for jobs with PENDING status
 *
 * @param jobId - The job's ID
 * @returns True if successfully cancelled, false otherwise
 *
 * @example
 * ```typescript
 * const cancelled = await cancelJob("job_123");
 * if (cancelled) {
 *   console.log("Job cancelled successfully");
 * } else {
 *   console.log("Job not found or already processed");
 * }
 * ```
 */
export async function cancelJob(jobId: string): Promise<boolean> {
  try {
    await prisma.job.update({
      where: { id: jobId, status: "PENDING" },
      data: {
        status: "CANCELLED",
        completedAt: new Date(),
      },
    });

    return true;
  } catch (error: unknown) {
    return false;
  }
}

/**
 * Resets a failed job back to pending status for retry
 * Resets attempt counter and clears error state
 *
 * @param jobId - The job's ID
 * @returns True if successfully reset, false otherwise
 *
 * @example
 * ```typescript
 * const retried = await retryJob("job_123");
 * if (retried) {
 *   console.log("Job queued for retry");
 * }
 * ```
 */
export async function retryJob(jobId: string): Promise<boolean> {
  try {
    await prisma.job.update({
      where: { id: jobId, status: "FAILED" },
      data: {
        status: "PENDING",
        attempts: 0,
        error: null,
        scheduledFor: null,
      },
    });

    return true;
  } catch (error: unknown) {
    return false;
  }
}

/**
 * Retrieves statistics about jobs across all statuses
 *
 * @returns Object with counts for each job status and total
 *
 * @example
 * ```typescript
 * const stats = await getJobStats();
 * console.log(`Pending: ${stats.pending}`);
 * console.log(`Processing: ${stats.processing}`);
 * console.log(`Completed: ${stats.completed}`);
 * console.log(`Failed: ${stats.failed}`);
 * console.log(`Total: ${stats.total}`);
 * ```
 */
export async function getJobStats() {
  const [pending, processing, completed, failed, total] = await Promise.all([
    prisma.job.count({ where: { status: "PENDING" } }),
    prisma.job.count({ where: { status: "PROCESSING" } }),
    prisma.job.count({ where: { status: "COMPLETED" } }),
    prisma.job.count({ where: { status: "FAILED" } }),
    prisma.job.count(),
  ]);

  return {
    pending,
    processing,
    completed,
    failed,
    total,
  };
}

/**
 * Deletes completed jobs older than specified days to prevent database bloat
 * Only removes successfully completed jobs, leaves failed jobs for analysis
 *
 * @param olderThanDays - Number of days to keep completed jobs (default: 7)
 * @returns Number of jobs deleted
 *
 * @example
 * ```typescript
 * // Delete completed jobs older than 30 days
 * const deleted = await cleanupOldJobs(30);
 * console.log(`Cleaned up ${deleted} old jobs`);
 * ```
 */
export async function cleanupOldJobs(olderThanDays: number = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - olderThanDays);

  const deleted = await prisma.job.deleteMany({
    where: {
      status: "COMPLETED",
      completedAt: {
        lt: cutoff,
      },
    },
  });

  return deleted.count;
}
