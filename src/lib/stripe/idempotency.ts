import { prisma } from "@/lib/prisma";
import crypto from "crypto";

/**
 * Stripe checkout idempotency utilities
 * Prevents duplicate checkout sessions and ensures reliable payment processing
 */

/**
 * Generate a unique idempotency key for checkout sessions
 * @param userId - User ID (optional for guest checkouts)
 * @param priceId - Stripe price ID
 * @returns Idempotency key string
 */
export function generateCheckoutIdempotencyKey(
  userId: string | null,
  priceId: string
): string {
  const timestamp = Date.now();
  const randomBytes = crypto.randomBytes(16).toString("hex");
  const userPart = userId || "guest";
  return `checkout_${userPart}_${priceId}_${timestamp}_${randomBytes}`;
}

/**
 * Check if a checkout session already exists for this idempotency key
 * @param idempotencyKey - The idempotency key to check
 * @returns Existing session ID if found, null otherwise
 */
export async function getExistingCheckoutSession(
  idempotencyKey: string
): Promise<string | null> {
  const record = await prisma.checkoutIdempotency.findUnique({
    where: {
      idempotencyKey,
      expiresAt: {
        gt: new Date(),
      },
    },
    select: {
      sessionId: true,
    },
  });

  return record?.sessionId || null;
}

/**
 * Store a checkout session idempotency record
 * @param idempotencyKey - The idempotency key
 * @param userId - User ID (optional for guest checkouts)
 * @param sessionId - Stripe checkout session ID
 * @param priceId - Stripe price ID
 */
export async function storeCheckoutIdempotency(
  idempotencyKey: string,
  userId: string | null,
  sessionId: string,
  priceId: string
): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // Expire after 24 hours

  await prisma.checkoutIdempotency.create({
    data: {
      idempotencyKey,
      userId,
      sessionId,
      priceId,
      expiresAt,
    },
  });
}

/**
 * Webhook idempotency utilities
 * Prevents duplicate webhook processing
 */

/**
 * Check if a webhook event has already been processed
 * @param eventId - Stripe event ID
 * @returns true if event was already processed
 */
export async function isWebhookEventProcessed(
  eventId: string
): Promise<boolean> {
  const record = await prisma.webhookEvent.findUnique({
    where: {
      eventId,
    },
  });

  return record !== null;
}

/**
 * Mark a webhook event as processed
 * @param eventId - Stripe event ID
 * @param eventType - Type of webhook event (e.g., "checkout.session.completed")
 */
export async function markWebhookEventProcessed(
  eventId: string,
  eventType: string
): Promise<void> {
  await prisma.webhookEvent.create({
    data: {
      eventId,
      eventType,
      processedAt: new Date(),
    },
  });
}
