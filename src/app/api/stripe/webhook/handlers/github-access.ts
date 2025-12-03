/**
 * ✅ FABRK COMPONENT
 * GitHub access handler for checkout completions
 * Queues a background job to grant customers repository access after purchase
 * Uses retry mechanism for transient GitHub API failures
 */

import { logger } from "@/lib/logger";
import { env } from "@/lib/env";
import { enqueueJob } from "@/lib/jobs/queue";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

/**
 * Handle GitHub repository access after successful checkout
 * Extracts GitHub username from checkout custom fields and grants access
 */
export async function handleGitHubAccessGrant(
  session: Stripe.Checkout.Session
): Promise<{
  success: boolean;
  githubUsername?: string;
  repoUrl?: string;
  jobId?: string;
  error?: string;
}> {
  try {
    // Check if GitHub integration is enabled
    if (
      !env.server.GITHUB_ACCESS_TOKEN ||
      !env.server.GITHUB_REPO_OWNER ||
      !env.server.GITHUB_REPO_NAME
    ) {
      logger.info(
        "GitHub integration not configured, skipping access grant",
        {
          sessionId: session.id,
        }
      );
      return {
        success: true, // Don't fail the entire checkout process
      };
    }

    // Extract GitHub username from custom fields
    // Stripe sends custom_fields as an array: [{ key: "github_username", type: "text", text: { value: "..." } }]
    const customFields = (session as { custom_fields?: Array<{ key: string; text?: { value: string } }> }).custom_fields || [];
    const githubField = customFields.find(
      (field: { key: string }) => field.key === "github_username"
    );
    const githubUsername = githubField?.text?.value || null;

    if (!githubUsername) {
      logger.warn("No GitHub username provided in checkout session", {
        sessionId: session.id,
        customerId: session.customer,
      });
      return {
        success: false,
        error: "No GitHub username provided. Customer needs to update their profile.",
      };
    }

    // Get user ID from session metadata or find by email
    const customerEmail = session.customer_email || session.customer_details?.email;
    let userId = session.metadata?.userId;

    if (!userId || userId === "guest") {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: customerEmail as string },
        select: { id: true },
      });
      userId = user?.id;
    }

    if (!userId) {
      logger.error("Could not find user for GitHub access grant", {
        sessionId: session.id,
        customerEmail,
      });
      return {
        success: false,
        githubUsername,
        error: "User not found for GitHub access grant",
      };
    }

    // Update user with pending status and GitHub username
    await prisma.user.update({
      where: { id: userId },
      data: {
        githubUsername,
        githubAccessStatus: "pending",
      },
    });

    logger.info("Queueing GitHub repository access grant job", {
      sessionId: session.id,
      userId,
      githubUsername,
    });

    // Queue the job for background processing with retry logic
    const jobId = await enqueueJob({
      type: "github.access_grant",
      payload: {
        userId,
        githubUsername,
        repoOwner: env.server.GITHUB_REPO_OWNER!,
        repoName: env.server.GITHUB_REPO_NAME!,
      },
      priority: "high",
      maxAttempts: 3, // Retry up to 3 times with exponential backoff
    });

    logger.info("GitHub access grant job queued successfully", {
      sessionId: session.id,
      jobId,
      userId,
      githubUsername,
    });

    return {
      success: true,
      githubUsername,
      jobId,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    logger.error("Error handling GitHub access grant", {
      sessionId: session.id,
      error: errorMessage,
    });

    // Don't throw - we don't want to fail the entire webhook process
    return {
      success: false,
      error: errorMessage,
    };
  }
}
