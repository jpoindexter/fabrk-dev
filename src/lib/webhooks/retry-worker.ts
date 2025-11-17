/**
 * Webhook Retry Worker
 * Background job to retry failed webhook deliveries
 */

import { prisma } from "@/lib/prisma";
import { retryWebhookDelivery } from "./server";
import { logger } from "@/lib/logger";

/**
 * Process failed webhooks that are ready for retry
 */
export async function retryFailedWebhooks(): Promise<number> {
  try {
    const now = new Date();

    // Find failed deliveries ready for retry
    const failedDeliveries = await prisma.webhookDelivery.findMany({
      where: {
        status: "failed",
        nextRetryAt: {
          lte: now, // Ready for retry
        },
        attempts: {
          lt: 5, // Haven't exceeded max attempts
        },
      },
      take: 10, // Process 10 at a time
      orderBy: {
        nextRetryAt: "asc",
      },
    });

    if (failedDeliveries.length === 0) {
      return 0;
    }

    logger.info(
      `[Webhook Retry Worker] Processing ${failedDeliveries.length} failed deliveries...`
    );

    // Retry each delivery
    const retryPromises = failedDeliveries.map((delivery) =>
      retryWebhookDelivery(delivery.id)
    );

    await Promise.allSettled(retryPromises);

    logger.info(
      `[Webhook Retry Worker] Completed processing ${failedDeliveries.length} deliveries`
    );

    return failedDeliveries.length;
  } catch (error: unknown) {
    logger.error("[Webhook Retry Worker] Error:", error);
    return 0;
  }
}

/**
 * Start webhook retry worker
 * Polls for failed deliveries and retries them
 */
export function startWebhookRetryWorker(options: {
  interval?: number; // Poll interval in ms (default: 60000 = 1 minute)
} = {}) {
  const interval = options.interval || 60000; // Default: 1 minute

  let isRunning = true;

  async function processRetries() {
    if (!isRunning) return;

    try {
      await retryFailedWebhooks();
    } catch (error: unknown) {
      logger.error("[Webhook Retry Worker] Error:", error);
    }

    // Schedule next run
    if (isRunning) {
      setTimeout(processRetries, interval);
    }
  }

  // Start processing
  logger.info("🔄 [Webhook Retry Worker] Started (polling every 1 minute)");
  processRetries();

  // Return stop function
  return () => {
    logger.info("🛑 [Webhook Retry Worker] Stopping...");
    isRunning = false;
  };
}

/**
 * Clean up old webhook deliveries
 * Removes delivery records older than specified days
 */
export async function cleanupOldDeliveries(olderThanDays: number = 30): Promise<number> {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    const result = await prisma.webhookDelivery.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
        status: {
          in: ["success", "failed"],
        },
      },
    });

    logger.info(
      `[Webhook Cleanup] Deleted ${result.count} old delivery records`
    );

    return result.count;
  } catch (error: unknown) {
    logger.error("[Webhook Cleanup] Error:", error);
    return 0;
  }
}
