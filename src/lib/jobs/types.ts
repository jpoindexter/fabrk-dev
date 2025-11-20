/**
 * Job Queue Types
 * Type definitions and constants for the background job system
 */

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
  | "analytics.calculate"
  | "github.access_grant";

export type JobPriority = "low" | "normal" | "high" | "urgent";

export interface JobData<T = unknown> {
  type: JobType;
  payload: T;
  priority?: JobPriority;
  maxAttempts?: number;
  scheduledFor?: Date;
  metadata?: Record<string, unknown>;
}

export interface JobResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Job handler type
 */
export type JobHandler<TInput = unknown, TOutput = unknown> = (
  data: TInput,
  jobId: string
) => Promise<JobResult<TOutput>>;

/**
 * Priority mapping
 */
export const PRIORITY_MAP: Record<JobPriority, number> = {
  low: 0,
  normal: 5,
  high: 10,
  urgent: 20,
};
