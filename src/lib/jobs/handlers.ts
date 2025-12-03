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

// GitHub access grant job
registerJobHandler<{
  userId: string;
  githubUsername: string;
  repoOwner: string;
  repoName: string;
}>("github.access_grant", async (data, jobId) => {
  const { grantRepositoryAccess } = await import("@/lib/github");
  const { prisma } = await import("@/lib/prisma");
  const { logger } = await import("@/lib/logger");
  const { queueEmail: _queueEmail } = await import("@/lib/email");

  try {
    logger.info("Processing GitHub access grant job", {
      jobId,
      userId: data.userId,
      githubUsername: data.githubUsername,
    });

    // Attempt to grant access
    const result = await grantRepositoryAccess(data.githubUsername, "pull");

    if (result.success) {
      // Update user status to 'granted'
      await prisma.user.update({
        where: { id: data.userId },
        data: {
          githubAccessStatus: "granted",
          githubAccessAt: new Date(),
        },
      });

      logger.info("GitHub access granted successfully", {
        jobId,
        userId: data.userId,
        githubUsername: data.githubUsername,
        repoUrl: result.repoUrl,
      });

      return {
        success: true,
        data: { repoUrl: result.repoUrl },
      };
    }

    // Grant failed - throw error to trigger retry
    throw new Error(result.error || "Failed to grant GitHub access");
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error("GitHub access grant job failed", {
      jobId,
      userId: data.userId,
      githubUsername: data.githubUsername,
      error: errorMessage,
    });

    // Check if this is the final attempt (handled by processor)
    // Return failure to let processor handle retry logic
    return {
      success: false,
      error: errorMessage,
    };
  }
});

// GitHub access grant failure notification handler
// Called when max retries exceeded - sends error notification email
export async function handleGitHubAccessGrantFailure(
  userId: string,
  githubUsername: string,
  error: string
): Promise<void> {
  const { prisma } = await import("@/lib/prisma");
  const { queueEmail } = await import("@/lib/email");
  const { logger } = await import("@/lib/logger");

  try {
    // Update user status to 'failed'
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        githubAccessStatus: "failed",
      },
    });

    // Queue error notification email
    if (user.email) {
      await queueEmail({
        to: user.email,
        subject: "Action Required: GitHub Repository Access Issue",
        type: "NOTIFICATION",
        html: `
          <h2>GitHub Repository Access Failed</h2>
          <p>Hi ${user.name || "there"},</p>
          <p>We were unable to grant access to the GitHub repository for username: <strong>${githubUsername}</strong></p>
          <p><strong>Error:</strong> ${error}</p>
          <p>Please verify your GitHub username is correct and try again, or contact support for assistance.</p>
          <p>Common issues:</p>
          <ul>
            <li>GitHub username doesn't exist</li>
            <li>Typo in the username</li>
            <li>GitHub API rate limiting</li>
          </ul>
          <p>You can update your GitHub username in your account settings.</p>
          <p>Thank you,<br>The Fabrk Team</p>
        `,
      });
    }

    logger.info("GitHub access failure notification sent", {
      userId,
      email: user.email,
      githubUsername,
    });
  } catch (notifyError: unknown) {
    logger.error("Failed to send GitHub access failure notification", {
      userId,
      githubUsername,
      error: notifyError instanceof Error ? notifyError.message : String(notifyError),
    });
  }
}
