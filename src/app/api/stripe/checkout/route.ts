/**
 * @swagger
 * /api/stripe/checkout:
 *   post:
 *     summary: Create Stripe checkout session
 *     description: |
 *       Creates a Stripe checkout session for one-time product purchase.
 *       Supports both authenticated users and guest purchases (email collected by Stripe).
 *
 *       **Flow:**
 *       1. User selects product and clicks "Buy Now"
 *       2. Frontend calls this endpoint with priceId
 *       3. Returns checkout URL to redirect user to Stripe
 *       4. User completes payment on Stripe's hosted checkout page
 *       5. Stripe redirects back to success_url on completion
 *
 *       **Features:**
 *       - Automatic Stripe customer creation
 *       - Promotion code support
 *       - One-time payment mode (not subscription)
 *       - Metadata tracking for purchase attribution
 *     tags:
 *       - Payments
 *       - Stripe
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priceId
 *             properties:
 *               priceId:
 *                 type: string
 *                 example: price_1234567890abcdef
 *                 description: Stripe Price ID for the complete product
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   format: uri
 *                   example: https://checkout.stripe.com/c/pay/cs_test_abc123
 *                   description: Stripe checkout URL to redirect user to
 *       400:
 *         description: Invalid price ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid price ID
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized - Please sign in
 *       404:
 *         description: User not found in database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Failed to create checkout session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create checkout session
 *     x-codeSamples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/stripe/checkout', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *               priceId: 'price_1234567890abcdef'
 *             })
 *           });
 *
 *           const { url } = await response.json();
 *           // Redirect to Stripe checkout
 *           window.location.href = url;
 *       - lang: curl
 *         source: |
 *           curl -X POST https://fabrk.dev/api/stripe/checkout \
 *             -H "Content-Type: application/json" \
 *             -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
 *             -d '{"priceId": "price_1234567890abcdef"}'
 */

/**
 * ✅ FABRK API ROUTE
 * Stripe Checkout Session Creation
 * Supports both authenticated and guest checkout
 */

import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { withRateLimit } from "@/lib/rate-limit/middleware";
import { getOrCreateCustomer, stripe } from "@/lib/stripe/client";
import { STRIPE_CONFIG, STRIPE_PRODUCTS } from "@/lib/stripe/config";
import {
  generateCheckoutIdempotencyKey,
  getExistingCheckoutSession,
  storeCheckoutIdempotency,
} from "@/lib/stripe/idempotency";
import { NextRequest, NextResponse } from "next/server";

async function checkoutHandler(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();
    const { priceId, idempotencyKey: clientIdempotencyKey } = body as {
      priceId: string;
      idempotencyKey?: string;
    };

    // Validate the price ID against all available products
    const validProducts = Object.entries(STRIPE_PRODUCTS);
    const matchedProduct = validProducts.find(([, product]) => product.priceId === priceId);

    if (!matchedProduct) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    const [tierName, product] = matchedProduct;

    // If user is authenticated, link to their account
    let customerId: string | undefined;
    let userId: string | undefined;

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user) {
        userId = user.id;
        customerId = await getOrCreateCustomer(user.email, user.id, user.customerId);

        // Update user with customer ID if newly created
        if (!user.customerId) {
          await prisma.user.update({
            where: { id: user.id },
            data: { customerId },
          });
        }
      }
    }

    // Generate or use provided idempotency key
    const idempotencyKey = clientIdempotencyKey || generateCheckoutIdempotencyKey(userId || null, priceId);

    // Check if this idempotency key was already used
    const existingSessionId = await getExistingCheckoutSession(idempotencyKey);
    if (existingSessionId) {
      logger.info("Returning existing checkout session", {
        idempotencyKey,
        sessionId: existingSessionId,
      });

      // Retrieve the existing session from Stripe
      const existingSession = await stripe.checkout.sessions.retrieve(existingSessionId);
      return NextResponse.json({ url: existingSession.url });
    }

    // Create Stripe checkout session with idempotency key
    const checkoutSession = await stripe.checkout.sessions.create(
      {
        // Only set customer if logged in, otherwise Stripe creates new customer
        ...(customerId ? { customer: customerId } : {}),
        mode: "payment", // One-time payment
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${STRIPE_CONFIG.successUrl}&product=${tierName}`,
        cancel_url: STRIPE_CONFIG.cancelUrl,
        metadata: {
          userId: userId || "guest",
          product: tierName,
          tier: tierName,
          idempotencyKey, // Store for reference
        },
        allow_promotion_codes: true, // Allow promo codes
        billing_address_collection: "required", // Collect billing address
        customer_creation: "always", // Always create/link customer (required for email)
      },
      {
        idempotencyKey, // Stripe's built-in idempotency
      }
    );

    // Store idempotency record in database
    await storeCheckoutIdempotency(idempotencyKey, userId || null, checkoutSession.id, priceId);

    logger.info("Created new checkout session", {
      idempotencyKey,
      sessionId: checkoutSession.id,
      userId,
      tier: tierName,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: unknown) {
    logger.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}

// Apply rate limiting: 10 requests per minute for payment endpoints
export const POST = withRateLimit(checkoutHandler, "payment");
