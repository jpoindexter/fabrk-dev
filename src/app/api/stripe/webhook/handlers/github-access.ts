/**
 * ✅ FABRK COMPONENT
 * GitHub access handler for checkout completions
 * Grants customers repository access automatically after purchase
 */

import { logger } from "@/lib/logger";
import { grantRepositoryAccess } from "@/lib/github";
import { env } from "@/lib/env";
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
    // Custom fields are stored in session.custom_fields
    const customFields = (session as any).custom_fields || {};
    const githubUsername =
      customFields.values && customFields.values.github_username
        ? customFields.values.github_username.text_value
        : null;

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

    logger.info("Attempting to grant GitHub repository access", {
      sessionId: session.id,
      githubUsername,
    });

    // Grant repository access
    const result = await grantRepositoryAccess(githubUsername, "pull");

    if (!result.success) {
      logger.error("Failed to grant GitHub repository access", {
        sessionId: session.id,
        githubUsername,
        error: result.error,
      });
      // Don't throw - we don't want to fail the entire webhook
      // The customer can manually request access via support
      return {
        success: false,
        githubUsername,
        error: result.error,
      };
    }

    logger.info("GitHub repository access granted successfully", {
      sessionId: session.id,
      githubUsername,
      repoUrl: result.repoUrl,
    });

    return {
      success: true,
      githubUsername,
      repoUrl: result.repoUrl,
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
