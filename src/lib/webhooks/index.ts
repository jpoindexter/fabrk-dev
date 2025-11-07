/**
 * Webhook Utilities
 * Verify and handle webhooks from external services
 *
 * Supported:
 * - Stripe (already implemented in /api/webhooks/stripe)
 * - Generic webhook verification
 * - Webhook retry logic
 * - Webhook logging
 */

import crypto from "crypto";

export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  timestamp: Date;
  signature?: string;
}

/**
 * Verify webhook signature using HMAC SHA-256
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Verify Stripe webhook signature
 * (More specific version with timestamp validation)
 */
export function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  secret: string,
  tolerance: number = 300 // 5 minutes
): boolean {
  const elements = signatureHeader.split(",");
  let timestamp: number | null = null;
  let signatures: string[] = [];

  elements.forEach((element) => {
    const [key, value] = element.split("=");
    if (key === "t") {
      timestamp = parseInt(value, 10);
    } else if (key === "v1") {
      signatures.push(value);
    }
  });

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  // Check timestamp tolerance
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - timestamp) > tolerance) {
    return false;
  }

  // Verify signature
  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  return signatures.some((sig) =>
    crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSignature))
  );
}

/**
 * Parse webhook payload safely
 */
export function parseWebhookPayload<T = any>(body: string): T | null {
  try {
    return JSON.parse(body) as T;
  } catch (error) {
    console.error("[Webhook] Failed to parse payload:", error);
    return null;
  }
}

/**
 * Webhook event deduplication
 * Store processed event IDs to prevent double-processing
 */
const processedEvents = new Set<string>();

export function isEventProcessed(eventId: string): boolean {
  return processedEvents.has(eventId);
}

export function markEventProcessed(eventId: string): void {
  processedEvents.add(eventId);

  // Clean up old events after 1 hour
  setTimeout(() => {
    processedEvents.delete(eventId);
  }, 60 * 60 * 1000);
}

/**
 * Webhook retry with exponential backoff
 */
export async function retryWebhook<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const delay = initialDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error("Webhook retry failed");
}

/**
 * Log webhook event (for debugging and audit)
 */
export interface WebhookLog {
  eventId: string;
  type: string;
  timestamp: Date;
  success: boolean;
  error?: string;
  processingTime: number;
}

const webhookLogs: WebhookLog[] = [];

export function logWebhookEvent(log: WebhookLog): void {
  webhookLogs.push(log);

  // Keep only last 1000 logs
  if (webhookLogs.length > 1000) {
    webhookLogs.shift();
  }

  if (!log.success) {
    console.error(`[Webhook] ${log.type} failed:`, log.error);
  }
}

export function getWebhookLogs(): WebhookLog[] {
  return [...webhookLogs];
}

/**
 * Validate webhook IP (for services that use IP whitelisting)
 */
export function isValidWebhookIP(
  ip: string,
  allowedIPs: string[]
): boolean {
  return allowedIPs.includes(ip);
}

/**
 * Webhook rate limiting
 */
const rateLimitMap = new Map<string, number[]>();

export function checkWebhookRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000 // 1 minute
): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  // Add current timestamp
  validTimestamps.push(now);
  rateLimitMap.set(identifier, validTimestamps);

  return true;
}

/**
 * Standard webhook response helpers
 */
export const WebhookResponse = {
  success: (message: string = "Webhook processed successfully") => ({
    success: true,
    message,
  }),

  error: (message: string, statusCode: number = 400) => ({
    success: false,
    error: message,
    statusCode,
  }),

  duplicate: (eventId: string) => ({
    success: true,
    message: `Event ${eventId} already processed`,
    duplicate: true,
  }),

  invalid: (reason: string) => ({
    success: false,
    error: `Invalid webhook: ${reason}`,
    statusCode: 400,
  }),
};

/**
 * Webhook handler wrapper
 * Automatically handles verification, deduplication, logging
 */
export function createWebhookHandler<T = any>(options: {
  verify: (signature: string, payload: string) => boolean;
  handle: (event: T) => Promise<void>;
  onError?: (error: Error) => void;
}) {
  return async (payload: string, signature: string): Promise<any> => {
    const startTime = Date.now();
    let eventId = "";

    try {
      // Verify signature
      if (!options.verify(signature, payload)) {
        return WebhookResponse.invalid("Invalid signature");
      }

      // Parse payload
      const event = parseWebhookPayload<T>(payload);
      if (!event) {
        return WebhookResponse.invalid("Invalid payload");
      }

      eventId = (event as any).id || crypto.randomUUID();

      // Check for duplicates
      if (isEventProcessed(eventId)) {
        return WebhookResponse.duplicate(eventId);
      }

      // Process event
      await options.handle(event);

      // Mark as processed
      markEventProcessed(eventId);

      // Log success
      logWebhookEvent({
        eventId,
        type: (event as any).type || "unknown",
        timestamp: new Date(),
        success: true,
        processingTime: Date.now() - startTime,
      });

      return WebhookResponse.success();
    } catch (error) {
      // Log failure
      logWebhookEvent({
        eventId,
        type: "unknown",
        timestamp: new Date(),
        success: false,
        error: (error as Error).message,
        processingTime: Date.now() - startTime,
      });

      // Call error handler if provided
      options.onError?.(error as Error);

      throw error;
    }
  };
}
