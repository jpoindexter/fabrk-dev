/**
 * @swagger
 * /api/webhooks/stripe:
 *   post:
 *     summary: Stripe webhook handler
 *     description: |
 *       Processes Stripe webhook events for payment processing and license generation.
 *       This endpoint must be configured in your Stripe dashboard webhook settings.
 *
 *       **Handled Events:**
 *       - `checkout.session.completed` - Creates purchase record and generates license key
 *       - `payment_intent.succeeded` - Logs successful payment
 *       - `payment_intent.payment_failed` - Logs failed payment
 *     tags:
 *       - Payments
 *       - Webhooks
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Stripe webhook event payload
 *     parameters:
 *       - in: header
 *         name: stripe-signature
 *         required: true
 *         schema:
 *           type: string
 *         description: Stripe webhook signature for verification
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 received:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - missing signature or invalid webhook
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No signature provided
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *     x-webhook: true
 *     x-codeSamples:
 *       - lang: Stripe CLI
 *         source: |
 *           # Test webhook locally
 *           stripe listen --forward-to localhost:3000/api/webhooks/stripe
 *
 *           # Trigger test event
 *           stripe trigger checkout.session.completed
 *       - lang: Stripe Dashboard
 *         source: |
 *           # Configure in Stripe Dashboard:
 *           # 1. Go to Developers → Webhooks
 *           # 2. Add endpoint: https://fabrk.dev/api/webhooks/stripe
 *           # 3. Select events:
 *           #    - checkout.session.completed
 *           #    - payment_intent.succeeded
 *           #    - payment_intent.payment_failed
 *           # 4. Copy webhook signing secret to STRIPE_WEBHOOK_SECRET
 */

/**
 * ✅ FABRK API ROUTE
 * Stripe Webhook Handler
 * Handles post-purchase flow for Stripe payments
 */

import { generateUniqueLicenseKey } from "@/lib/license";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      logger.error("No stripe-signature header found");
      return NextResponse.json({ error: "No signature provided" }, { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      logger.error("Webhook signature verification failed:", errorMessage);
      return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logger.info("PaymentIntent succeeded", { paymentIntentId: paymentIntent.id });
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logger.error("Payment failed", undefined, { paymentIntentId: paymentIntent.id });
        break;
      }

      default:
        logger.info("Unhandled event type", { eventType: event.type });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    logger.error("Webhook handler error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    logger.info("Processing checkout.session.completed", { sessionId: session.id });

    // Extract customer information
    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerName = session.customer_details?.name || "Customer";

    if (!customerEmail) {
      throw new Error("No customer email found in session");
    }

    // Get or create customer record
    let customer = await prisma.customer.findUnique({
      where: { email: customerEmail },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          email: customerEmail,
          name: customerName,
          totalPurchases: 1,
          totalSpent: session.amount_total || 0,
          lastPurchaseAt: new Date(),
        },
      });
    } else {
      await prisma.customer.update({
        where: { email: customerEmail },
        data: {
          totalPurchases: { increment: 1 },
          totalSpent: { increment: session.amount_total || 0 },
          lastPurchaseAt: new Date(),
        },
      });
    }

    // Generate unique license key
    const licenseKey = await generateUniqueLicenseKey();

    // Extract tier from metadata or default to 'developer'
    const tier = session.metadata?.tier || "developer";
    const productId = session.metadata?.productId || null;

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        email: customerEmail,
        name: customerName,
        licenseKey,
        provider: "STRIPE",
        stripeCustomerId: session.customer as string,
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent as string,
        amount: session.amount_total || 0,
        productId,
        tier,
        status: "ACTIVE",
        purchasedAt: new Date(),
        welcomeEmailSent: false,
      },
    });

    logger.info("Purchase created:", {
      id: purchase.id,
      email: customerEmail,
      licenseKey,
      tier,
    });

    // Send welcome email (queue for background processing)
    await queueWelcomeEmail(purchase.id, customerEmail, licenseKey);

    // Log audit trail
    await prisma.auditLog.create({
      data: {
        action: "purchase.created",
        resource: "purchase",
        resourceId: purchase.id,
        details: {
          provider: "STRIPE",
          sessionId: session.id,
          amount: session.amount_total,
          tier,
        },
      },
    });

    return purchase;
  } catch (error) {
    logger.error(
      "Error handling checkout completion:",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
}

async function queueWelcomeEmail(purchaseId: string, email: string, licenseKey: string) {
  try {
    await prisma.emailQueue.create({
      data: {
        purchaseId,
        type: "WELCOME",
        to: email,
        subject: "Your Fabrk License Key",
        status: "PENDING",
      },
    });

    logger.info("Welcome email queued", { email });
  } catch (error) {
    logger.error(
      "Error queueing welcome email",
      error instanceof Error ? error.message : String(error)
    );
    // Don't throw - email failure shouldn't block purchase
  }
}
