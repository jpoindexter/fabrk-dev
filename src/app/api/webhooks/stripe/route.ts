/**
 * @swagger
 * /api/webhooks/stripe:
 *   post:
 *     summary: Stripe webhook handler (DEPRECATED - redirects to /api/stripe/webhook)
 *     description: |
 *       **DEPRECATED:** This endpoint redirects to `/api/stripe/webhook` which has better idempotency handling.
 *
 *       Please update your Stripe webhook configuration to use:
 *       `https://fabrk.dev/api/stripe/webhook`
 *
 *       This redirect endpoint exists for backwards compatibility only.
 *     tags:
 *       - Payments
 *       - Webhooks
 *     deprecated: true
 *     security: []
 *     responses:
 *       307:
 *         description: Temporary redirect to /api/stripe/webhook
 *     x-codeSamples:
 *       - lang: Stripe Dashboard
 *         source: |
 *           # Update your webhook endpoint to:
 *           # https://fabrk.dev/api/stripe/webhook
 */

/**
 * ✅ FABRK API ROUTE
 * Stripe Webhook Handler - Redirect Endpoint
 * Redirects to /api/stripe/webhook which has idempotency
 */

import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

/**
 * Redirect all webhook requests to the improved endpoint
 * The /api/stripe/webhook endpoint has better idempotency handling
 */
export async function POST(req: NextRequest) {
  logger.info("Redirecting webhook from /api/webhooks/stripe to /api/stripe/webhook");

  // Get the base URL
  const url = new URL(req.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  // Redirect to the improved endpoint
  return NextResponse.redirect(`${baseUrl}/api/stripe/webhook`, {
    status: 307, // Temporary redirect (preserves POST method and body)
  });
}
