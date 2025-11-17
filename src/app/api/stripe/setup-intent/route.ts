/**
 * @swagger
 * /api/stripe/setup-intent:
 *   post:
 *     summary: Create Stripe SetupIntent for adding payment methods
 *     description: |
 *       Creates a Stripe SetupIntent that allows users to securely add
 *       payment methods without an immediate charge. Used for saving cards
 *       for future use, subscriptions, or recurring payments.
 *
 *       **Flow:**
 *       1. User clicks "Add Payment Method"
 *       2. Frontend calls this endpoint
 *       3. Returns client_secret to initialize Stripe Elements
 *       4. User enters card details in Stripe-hosted form
 *       5. Card is saved to customer's payment methods
 *       6. Webhook handles setup_intent.succeeded event
 *
 *       **Features:**
 *       - No immediate charge
 *       - Automatic customer creation if needed
 *       - Secure card tokenization via Stripe
 *       - PCI compliance built-in
 *     tags:
 *       - Payments
 *       - Stripe
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: SetupIntent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *                   example: seti_1234567890_secret_abcdefghijklmnop
 *                   description: Client secret to initialize Stripe Elements
 *                 customerId:
 *                   type: string
 *                   example: cus_1234567890abcdef
 *                   description: Stripe customer ID
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
 *         description: Failed to create SetupIntent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create setup intent
 *     x-codeSamples:
 *       - lang: JavaScript
 *         source: |
 *           const response = await fetch('/api/stripe/setup-intent', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *             },
 *           });
 *
 *           const { clientSecret } = await response.json();
 *
 *           // Use with Stripe Elements
 *           const stripe = await loadStripe(publishableKey);
 *           const { error } = await stripe.confirmCardSetup(clientSecret, {
 *             payment_method: {
 *               card: cardElement,
 *             },
 *           });
 *       - lang: curl
 *         source: |
 *           curl -X POST https://fabrk.dev/api/stripe/setup-intent \
 *             -H "Content-Type: application/json" \
 *             -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
 */

/**
 * ✅ FABRK API ROUTE
 * Stripe SetupIntent Creation
 * Allows users to add payment methods without immediate charge
 */

import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { withRateLimit } from "@/lib/rate-limit/middleware";
import { getOrCreateCustomer, stripe } from "@/lib/stripe/client";
import { NextRequest, NextResponse } from "next/server";

async function setupIntentHandler(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get or create Stripe customer
    const customerId = await getOrCreateCustomer(
      user.email,
      user.id,
      user.customerId
    );

    // Update user with customer ID if newly created
    if (!user.customerId) {
      await prisma.user.update({
        where: { id: user.id },
        data: { customerId },
      });
    }

    // Create SetupIntent
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
      metadata: {
        userId: user.id,
      },
    });

    logger.info("Created SetupIntent", {
      userId: user.id,
      customerId,
      setupIntentId: setupIntent.id,
    });

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      customerId,
    });
  } catch (error: unknown) {
    logger.error("SetupIntent creation error:", error);
    return NextResponse.json(
      { error: "Failed to create setup intent" },
      { status: 500 }
    );
  }
}

// Apply rate limiting: 10 requests per minute for payment endpoints
export const POST = withRateLimit(setupIntentHandler, "payment");
