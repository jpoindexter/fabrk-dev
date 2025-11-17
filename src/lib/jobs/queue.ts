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
import { captureError } from "@/lib/monitoring";
import { logger } from "@/lib/logger";

export type JobType =
  | "email.send"
  | "email.broadcast"
  | "webhook.send"
  | "report.generate"
  | "user.onboarding"
  | "payment.process"
  | "export.data"
  | "import.data"
  | "image.optimize"
  | "notification.send"
  | "analytics.calculate";

export type JobPriority = "low" | "normal" | "high" | "urgent";

export interface JobData<T = any> {
  type: JobType;
  payload: T;
  priority?: JobPriority;
  maxAttempts?: number;
  scheduledFor?: Date;
  metadata?: Record<string, any>;
}

export interface JobResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Job handler type
export type JobHandler<TInput = any, TOutput = any> = (
  data: TInput,
  jobId: string
) => Promise<JobResult<TOutput>>;

// Job registry
const jobHandlers: Map<JobType, JobHandler> = new Map();

/**
 * Priority mapping
 */
const PRIORITY_MAP: Record<JobPriority, number> = {
  low: 0,
  normal: 5,
  high: 10,
  urgent: 20,
};

/**
 * Register job handler
 */
export function registerJobHandler<TInput = any, TOutput = any>(
  type: JobType,
  handler: JobHandler<TInput, TOutput>
) {
  jobHandlers.set(type, handler);
}

/**
 * Enqueue a job
 */
export async function enqueueJob<T = any>(
  data: JobData<T>
): Promise<string> {
  const priority =
    PRIORITY_MAP[data.priority || "normal"];

  const job = await prisma.job.create({
    data: {
      type: data.type,
      status: "PENDING",
      priority,
      maxAttempts: data.maxAttempts || 3,
      data: data.payload as any,
      scheduledFor: data.scheduledFor,
    },
  });

  return job.id;
}

/**
 * Process next job
 */
export async function processNextJob(): Promise<boolean> {
  const now = new Date();

  // Find next job to process
  const job = await prisma.job.findFirst({
    where: {
      status: "PENDING",
      OR: [
        { scheduledFor: null },
        { scheduledFor: { lte: now } },
      ],
    },
    orderBy: [
      { priority: "desc" },
      { createdAt: "asc" },
    ],
  });

  if (!job) {
    return false; // No jobs to process
  }

  // Mark as processing
  await prisma.job.update({
    where: { id: job.id },
    data: {
      status: "PROCESSING",
      startedAt: now,
    },
  });

  // Get handler
  const handler = jobHandlers.get(job.type as JobType);

  if (!handler) {
    logger.error(`No handler registered for job type: ${job.type}`);

    await prisma.job.update({
      where: { id: job.id },
      data: {
        status: "FAILED",
        error: `No handler registered for job type: ${job.type}`,
        completedAt: new Date(),
      },
    });

    return true;
  }

  try {
    // Execute job
    const result = await handler(job.data, job.id);

    if (result.success) {
      // Mark as completed
      await prisma.job.update({
        where: { id: job.id },
        data: {
          status: "COMPLETED",
          result: result.data as any,
          completedAt: new Date(),
        },
      });
    } else {
      throw new Error(result.error || "Job failed");
    }
  } catch (error: unknown) {
    const attempts = job.attempts + 1;
    const shouldRetry = attempts < job.maxAttempts;

    if (shouldRetry) {
      // Retry with exponential backoff
      const delay = Math.pow(2, attempts) * 1000; // 2s, 4s, 8s, 16s, etc.
      const scheduledFor = new Date(Date.now() + delay);

      await prisma.job.update({
        where: { id: job.id },
        data: {
          status: "PENDING",
          attempts,
          error: error instanceof Error ? error.message : String(error),
          scheduledFor,
        },
      });
    } else {
      // Max attempts reached, mark as failed
      await prisma.job.update({
        where: { id: job.id },
        data: {
          status: "FAILED",
          attempts,
          error: error instanceof Error ? error.message : String(error),
          completedAt: new Date(),
        },
      });

      // Log error
      captureError(error instanceof Error ? error : new Error(String(error)), {
        metadata: {
          jobId: job.id,
          jobType: job.type,
          attempts,
        },
      });
    }
  }

  return true;
}

/**
 * Start job worker
 */
export function startJobWorker(options: {
  interval?: number; // Poll interval in ms
  concurrency?: number; // Number of concurrent jobs
} = {}) {
  const interval = options.interval || 1000; // Default: 1 second
  const concurrency = options.concurrency || 1;

  let isRunning = true;
  let activeWorkers = 0;

  async function processJobs() {
    while (activeWorkers < concurrency && isRunning) {
      activeWorkers++;

      try {
        const hasJob = await processNextJob();
        if (!hasJob) {
          // No jobs, wait before next poll
          await new Promise((resolve) => setTimeout(resolve, interval));
        }
      } catch (error: unknown) {
        logger.error("[Job Worker] Error processing job:", error);
        captureError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        activeWorkers--;
      }
    }

    // Continue processing
    if (isRunning) {
      setTimeout(processJobs, interval);
    }
  }

  // Start workers
  for (let i = 0; i < concurrency; i++) {
    processJobs();
  }

  // Return stop function
  return () => {
    isRunning = false;
  };
}

/**
 * Get job status
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
 * Cancel job
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
 * Retry failed job
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
 * Get job statistics
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
 * Clean up old completed jobs
 */
export async function cleanupOldJobs(olderThanDays: number = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.setDate(cutoff.getDate() - olderThanDays));

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

/**
 * Built-in job handlers
 */

// Email send job
registerJobHandler<{ to: string; subject: string; html: string }>(
  "email.send",
  async (data) => {
    // Import email service
    const { sendEmail } = await import("@/lib/email");

    try {
      await sendEmail(data.to, data.subject, data.html);
      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
);

// Webhook send job
registerJobHandler<{ url: string; payload: any }>(
  "webhook.send",
  async (data) => {
    try {
      const response = await fetch(data.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status}`);
      }

      return {
        success: true,
        data: { status: response.status },
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
);

/**
 * Process email queue
 * Fetches pending emails from EmailQueue and sends them via Resend
 */
export async function processEmailQueue(): Promise<number> {
  const Resend = (await import("resend")).Resend;
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  if (!resend) {
    logger.warn("⚠️ [Email Queue] Resend API key not configured. Emails will be logged only.");
  }

  const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@yourdomain.com";

  // Fetch pending emails (limit to 10 per batch)
  const pendingEmails = await prisma.emailQueue.findMany({
    where: {
      status: "PENDING",
      attempts: { lt: prisma.emailQueue.fields.maxAttempts },
    },
    orderBy: { createdAt: "asc" },
    take: 10,
  });

  if (pendingEmails.length === 0) {
    return 0;
  }

  logger.info(`📧 [Email Queue] Processing ${pendingEmails.length} emails...`);

  let successCount = 0;

  for (const email of pendingEmails) {
    try {
      // Mark as sending
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: "SENDING",
          attempts: email.attempts + 1,
        },
      });

      // Send email
      if (resend) {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email.to,
          subject: email.subject,
          html: email.html,
        });
      } else {
        // Dev mode - just log
        logger.debug(`📧 [DEV] Email to: ${email.to} - Subject: ${email.subject}`);
      }

      // Mark as sent
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
          lastError: null,
        },
      });

      successCount++;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`❌ [Email Queue] Failed to send email ${email.id}:`, errorMessage);

      // Check if should retry
      const shouldRetry = email.attempts + 1 < email.maxAttempts;

      await prisma.emailQueue.update({
        where: { id: email.id },
        data: {
          status: shouldRetry ? "PENDING" : "FAILED",
          lastError: errorMessage,
        },
      });

      // Log to monitoring if failed permanently
      if (!shouldRetry) {
        captureError(error instanceof Error ? error : new Error(String(error)), {
          metadata: {
            emailQueueId: email.id,
            emailType: email.type,
            recipient: email.to,
            attempts: email.attempts + 1,
          },
        });
      }
    }
  }

  logger.info(`✅ [Email Queue] Successfully sent ${successCount}/${pendingEmails.length} emails`);

  return successCount;
}

/**
 * Start email queue worker
 * Polls EmailQueue table and processes pending emails
 */
export function startEmailQueueWorker(options: {
  interval?: number; // Poll interval in ms (default: 5000 = 5 seconds)
} = {}) {
  const interval = options.interval || 5000; // Default: 5 seconds

  let isRunning = true;

  async function processEmails() {
    if (!isRunning) return;

    try {
      await processEmailQueue();
    } catch (error: unknown) {
      logger.error("[Email Queue Worker] Error:", error);
      captureError(error instanceof Error ? error : new Error(String(error)));
    }

    // Schedule next run
    if (isRunning) {
      setTimeout(processEmails, interval);
    }
  }

  // Start processing
  logger.info("🚀 [Email Queue Worker] Started (polling every 5 seconds)");
  processEmails();

  // Return stop function
  return () => {
    logger.info("🛑 [Email Queue Worker] Stopping...");
    isRunning = false;
  };
}
