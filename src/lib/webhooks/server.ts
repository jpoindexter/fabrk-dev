/**
 * Webhook Server
 * Core webhook functionality for triggering and delivering webhooks
 */

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as crypto from "crypto";
import { WebhookEvent, isValidEvent } from "./events";

/**
 * Type guard for HTTP errors with status codes
 */
interface HttpError extends Error {
  status?: number;
}

function isHttpError(error: unknown): error is HttpError {
  return error instanceof Error && 'status' in error;
}

/**
 * Webhook event payload types
 * Defines the structure of data for each webhook event type
 */

// Organization member event payloads
interface OrgMemberPayload {
  memberId: string;
  userId: string;
  email: string;
  role?: string;
}

interface OrgMemberRoleChangedPayload extends OrgMemberPayload {
  previousRole: string;
  newRole: string;
}

// Organization event payloads
interface OrgPayload {
  organizationId: string;
  name: string;
  slug?: string;
}

// Payment event payloads
interface PaymentPayload {
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
}

interface PaymentFailedPayload extends PaymentPayload {
  errorMessage: string;
}

// Subscription event payloads
interface SubscriptionPayload {
  subscriptionId: string;
  planId: string;
  status: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
}

// API Key event payloads
interface ApiKeyPayload {
  apiKeyId: string;
  name: string;
  createdAt?: Date;
  revokedAt?: Date;
}

// Security event payloads
interface SecurityPayload {
  userId: string;
  action: string;
  timestamp: Date;
}

/**
 * Union type of all possible webhook event data payloads
 */
export type WebhookEventData =
  | OrgMemberPayload
  | OrgMemberRoleChangedPayload
  | OrgPayload
  | PaymentPayload
  | PaymentFailedPayload
  | SubscriptionPayload
  | ApiKeyPayload
  | SecurityPayload
  | Record<string, unknown>; // Fallback for custom events

export interface WebhookPayload {
  event: WebhookEvent;
  data: WebhookEventData;
  organizationId: string;
  timestamp: string;
}

/**
 * Generates HMAC-SHA256 signature for webhook payload verification
 * Used to cryptographically sign webhook payloads so recipients can verify authenticity
 *
 * @param payload - The JSON string payload to sign
 * @param secret - The webhook secret key
 * @returns Hexadecimal string of the HMAC-SHA256 signature
 *
 * @example
 * ```typescript
 * const payload = JSON.stringify({ event: "user.created", data: {...} });
 * const signature = signPayload(payload, "webhook_secret_key");
 * // Include signature in X-Webhook-Signature header
 * ```
 */
export function signPayload(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Generates a cryptographically secure random webhook secret
 * Creates a 64-character hexadecimal string (256 bits of entropy)
 *
 * @returns Secure random webhook secret as hex string
 *
 * @example
 * ```typescript
 * const secret = generateWebhookSecret();
 * // Store this secret securely and use it to sign/verify webhook payloads
 * console.log(secret); // "a3f2c8d9e..."
 * ```
 */
export function generateWebhookSecret(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Triggers webhook delivery for all active webhooks subscribed to an event
 * Finds all enabled webhooks for the organization subscribed to this event type,
 * creates delivery records, and initiates HTTP delivery (fire-and-forget)
 *
 * @param organizationId - The organization's ID
 * @param event - The webhook event type (e.g., "org.member.added")
 * @param data - Event-specific payload data
 *
 * @example
 * ```typescript
 * await triggerWebhook("org_123", "org.member.added", {
 *   memberId: "mem_456",
 *   userId: "user_789",
 *   email: "newmember@example.com",
 *   role: "MEMBER"
 * });
 * ```
 */
export async function triggerWebhook(
  organizationId: string,
  event: WebhookEvent,
  data: WebhookEventData
): Promise<void> {
  if (!isValidEvent(event)) {
    return;
  }

  try {
    // Find all active webhooks subscribed to this event
    const webhooks = await prisma.webhook.findMany({
      where: {
        organizationId,
        enabled: true,
        events: {
          has: event,
        },
      },
    });

    if (webhooks.length === 0) {
      return; // No webhooks to trigger
    }

    // Create delivery records for each webhook
    const deliveryPromises = webhooks.map((webhook) =>
      deliverWebhook(webhook.id, event, data)
    );

    // Execute deliveries in parallel (don't await - fire and forget)
    Promise.all(deliveryPromises).catch(() => {
      // Silently handle errors
    });
  } catch (error: unknown) {
    // Silently handle errors
  }
}

/**
 * Delivers a webhook to a specific endpoint via HTTP POST
 * Creates a delivery record, signs the payload, and sends to the webhook URL.
 * Includes retry scheduling for failed deliveries.
 *
 * @param webhookId - The webhook's ID
 * @param event - The webhook event type
 * @param data - Event-specific payload data
 *
 * @example
 * ```typescript
 * await deliverWebhook("webhook_123", "payment.succeeded", {
 *   paymentId: "pay_456",
 *   amount: 5000,
 *   currency: "usd",
 *   status: "succeeded"
 * });
 * ```
 */
export async function deliverWebhook(
  webhookId: string,
  event: WebhookEvent,
  data: WebhookEventData
): Promise<void> {
  try {
    // Fetch webhook details
    const webhook = await prisma.webhook.findUnique({
      where: { id: webhookId },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!webhook || !webhook.enabled) {
      return;
    }

    // Create payload
    const payload: WebhookPayload = {
      event,
      data,
      organizationId: webhook.organizationId,
      timestamp: new Date().toISOString(),
    };

    const payloadString = JSON.stringify(payload);
    const signature = signPayload(payloadString, webhook.secret);

    // Create delivery record
    const delivery = await prisma.webhookDelivery.create({
      data: {
        webhookId,
        event,
        // Prisma JSON field - convert to unknown first for type safety
        payload: payload as unknown as Prisma.InputJsonValue,
        status: "pending",
        attempts: 1,
      },
    });

    // Attempt delivery
    try {
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Signature": signature,
          "X-Webhook-Event": event,
          "X-Webhook-Delivery-ID": delivery.id,
          "User-Agent": "Fabrk-Webhooks/1.0",
        },
        body: payloadString,
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      const responseText = await response.text();

      if (response.ok) {
        // Success
        await prisma.webhookDelivery.update({
          where: { id: delivery.id },
          data: {
            status: "success",
            statusCode: response.status,
            response: responseText.substring(0, 5000), // Limit response size
          },
        });
      } else {
        // HTTP error
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }
    } catch (error: unknown) {
      // Delivery failed
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      await prisma.webhookDelivery.update({
        where: { id: delivery.id },
        data: {
          status: "failed",
          statusCode: isHttpError(error) ? error.status ?? null : null,
          response: errorMessage.substring(0, 5000),
          nextRetryAt: calculateNextRetry(1),
        },
      });
    }
  } catch (error: unknown) {
    // Silently handle errors
  }
}

/**
 * Calculates the next retry time using exponential backoff strategy
 * Retry schedule: 1min, 5min, 15min, 1hr, 6hr (max)
 *
 * @param attempts - Current number of delivery attempts
 * @returns Date object for when the next retry should occur
 *
 * @example
 * ```typescript
 * const nextRetry1 = calculateNextRetry(1); // +1 minute
 * const nextRetry2 = calculateNextRetry(2); // +5 minutes
 * const nextRetry5 = calculateNextRetry(5); // +6 hours (max)
 * ```
 */
export function calculateNextRetry(attempts: number): Date {
  const delays = [
    1 * 60 * 1000, // 1 minute
    5 * 60 * 1000, // 5 minutes
    15 * 60 * 1000, // 15 minutes
    60 * 60 * 1000, // 1 hour
    6 * 60 * 60 * 1000, // 6 hours
  ];

  const delayIndex = Math.min(attempts - 1, delays.length - 1);
  const delay = delays[delayIndex];

  return new Date(Date.now() + delay);
}

/**
 * Retries a failed webhook delivery
 * Increments attempt count, reattempts HTTP delivery, and schedules next retry if needed.
 * Maximum of 5 attempts before marking as permanently failed.
 *
 * @param deliveryId - The webhook delivery record's ID
 *
 * @example
 * ```typescript
 * // Typically called by a background worker processing failed deliveries
 * await retryWebhookDelivery("delivery_123");
 * ```
 */
export async function retryWebhookDelivery(deliveryId: string): Promise<void> {
  try {
    const delivery = await prisma.webhookDelivery.findUnique({
      where: { id: deliveryId },
      include: {
        webhook: true,
      },
    });

    if (!delivery || !delivery.webhook || !delivery.webhook.enabled) {
      return;
    }

    const maxAttempts = 5;
    if (delivery.attempts >= maxAttempts) {
      return;
    }

    const webhook = delivery.webhook;
    // Cast from Prisma JsonValue to our typed payload
    const payload = delivery.payload as unknown as WebhookPayload;
    const payloadString = JSON.stringify(payload);
    const signature = signPayload(payloadString, webhook.secret);

    // Update attempt count
    await prisma.webhookDelivery.update({
      where: { id: deliveryId },
      data: {
        attempts: delivery.attempts + 1,
        status: "pending",
      },
    });

    // Attempt delivery
    try {
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Signature": signature,
          "X-Webhook-Event": delivery.event,
          "X-Webhook-Delivery-ID": delivery.id,
          "X-Webhook-Retry": String(delivery.attempts + 1),
          "User-Agent": "Fabrk-Webhooks/1.0",
        },
        body: payloadString,
        signal: AbortSignal.timeout(10000),
      });

      const responseText = await response.text();

      if (response.ok) {
        // Success
        await prisma.webhookDelivery.update({
          where: { id: deliveryId },
          data: {
            status: "success",
            statusCode: response.status,
            response: responseText.substring(0, 5000),
            nextRetryAt: null,
          },
        });
      } else {
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      const newAttempts = delivery.attempts + 1;
      const shouldRetry = newAttempts < maxAttempts;

      await prisma.webhookDelivery.update({
        where: { id: deliveryId },
        data: {
          status: "failed",
          statusCode: isHttpError(error) ? error.status ?? null : null,
          response: errorMessage.substring(0, 5000),
          nextRetryAt: shouldRetry ? calculateNextRetry(newAttempts) : null,
        },
      });
    }
  } catch (error: unknown) {
    // Silently handle errors
  }
}

/**
 * Retrieves webhook statistics and metrics for an organization
 * Includes total webhooks, active count, delivery counts, and success rate
 *
 * @param organizationId - The organization's ID
 * @returns Statistics object with webhook counts and success rate percentage
 *
 * @example
 * ```typescript
 * const stats = await getWebhookStats("org_123");
 * console.log(`Success rate: ${stats.successRate}%`);
 * console.log(`Active webhooks: ${stats.activeWebhooks}/${stats.totalWebhooks}`);
 * ```
 */
export async function getWebhookStats(organizationId: string) {
  const [totalWebhooks, activeWebhooks, totalDeliveries, successfulDeliveries, failedDeliveries] =
    await Promise.all([
      prisma.webhook.count({
        where: { organizationId },
      }),
      prisma.webhook.count({
        where: { organizationId, enabled: true },
      }),
      prisma.webhookDelivery.count({
        where: {
          webhook: {
            organizationId,
          },
        },
      }),
      prisma.webhookDelivery.count({
        where: {
          webhook: {
            organizationId,
          },
          status: "success",
        },
      }),
      prisma.webhookDelivery.count({
        where: {
          webhook: {
            organizationId,
          },
          status: "failed",
        },
      }),
    ]);

  return {
    totalWebhooks,
    activeWebhooks,
    totalDeliveries,
    successfulDeliveries,
    failedDeliveries,
    successRate:
      totalDeliveries > 0
        ? Math.round((successfulDeliveries / totalDeliveries) * 100)
        : 0,
  };
}
