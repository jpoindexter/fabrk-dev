/**
 * Email Queue Base Functions
 * Queue emails for background processing
 */

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

/**
 * Queue an email for background sending (requires EmailQueue model)
 * @param params - Email queue parameters
 * @param params.type - Email type for categorization
 * @param params.to - Recipient email address
 * @param params.subject - Email subject line
 * @param params.html - HTML email body
 * @param params.userId - Optional user ID for tracking
 * @param params.purchaseId - Optional purchase ID for tracking
 * @param params.metadata - Optional metadata object
 * @param params.maxAttempts - Max retry attempts (default: 3)
 * @returns Promise with success status and emailQueueId
 * @example
 * await queueEmail({
 *   type: "NOTIFICATION",
 *   to: "user@example.com",
 *   subject: "New feature available",
 *   html: "<p>Check out our new feature!</p>"
 * })
 */
export async function queueEmail(params: {
  type: "WELCOME" | "VERIFICATION" | "RESET" | "INVOICE" | "NOTIFICATION";
  to: string;
  subject: string;
  html: string;
  userId?: string;
  purchaseId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
  maxAttempts?: number;
}) {
  try {
    const emailQueue = await prisma.emailQueue.create({
      data: {
        type: params.type,
        to: params.to,
        subject: params.subject,
        html: params.html,
        userId: params.userId,
        purchaseId: params.purchaseId,
        metadata: params.metadata,
        maxAttempts: params.maxAttempts || 3,
        status: "PENDING",
      },
    });

    return { success: true, emailQueueId: emailQueue.id };
  } catch (error: unknown) {
    logger.error("Failed to queue email:", error);
    return { success: false, error };
  }
}
