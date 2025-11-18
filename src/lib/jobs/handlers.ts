/**
 * Job Handlers
 * Registration and execution of job handlers
 */

import type { JobType, JobHandler } from "./types";

/**
 * Job registry - use flexible typing to allow different handler signatures
 */
const jobHandlers: Map<JobType, JobHandler<unknown, unknown>> = new Map();

/**
 * Register job handler
 */
export function registerJobHandler<TInput = unknown, TOutput = unknown>(
  type: JobType,
  handler: JobHandler<TInput, TOutput>
) {
  // Store handler with type erasure to allow different signatures
  jobHandlers.set(type, handler as JobHandler<unknown, unknown>);
}

/**
 * Get registered job handler
 */
export function getJobHandler(
  type: JobType
): JobHandler<unknown, unknown> | undefined {
  return jobHandlers.get(type);
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
registerJobHandler<{ url: string; payload: unknown }>(
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
