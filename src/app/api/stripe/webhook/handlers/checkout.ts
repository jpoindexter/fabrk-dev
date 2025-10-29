/**
 * ✅ FABRK COMPONENT
 * Checkout webhook handler
 * Handles checkout.session.completed event
 */

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { generateLicenseKey } from "@/lib/license";
import { sendPurchaseConfirmationEmail } from "@/lib/email/purchase-confirmation";
import { randomBytes } from "crypto";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function handleCheckoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  try {
    logger.info("Processing checkout.session.completed", {
      sessionId: session.id,
      customerEmail: session.customer_email,
      customerId: session.customer,
    });

    // Extract customer information
    const customerEmail =
      session.customer_email ||
      (session.customer_details?.email as string);

    if (!customerEmail) {
      logger.error("No customer email found in checkout session");
      return;
    }

    // Extract metadata
    const { userId, product, tier } = session.metadata || {};
    const isGuestPurchase = userId === "guest";

    // Get or create customer ID
    const customerId =
      typeof session.customer === "string" ? session.customer : null;

    // Generate license key
    const licenseKey = generateLicenseKey();

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    if (user) {
      // Update existing user
      logger.info("Updating existing user", { userId: user.id });
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          customerId: customerId || user.customerId,
          licenseKey,
          tier: tier || "professional",
          subscriptionTier: tier || "professional",
          accessGrantedAt: new Date(),
        },
      });
    } else {
      // Create new user account (passwordless)
      logger.info("Creating new user account", { email: customerEmail });

      // Generate magic link token
      const magicLinkToken = generateMagicLinkToken();
      const magicLinkExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      user = await prisma.user.create({
        data: {
          email: customerEmail,
          name: session.customer_details?.name || null,
          customerId,
          licenseKey,
          tier: tier || "professional",
          subscriptionTier: tier || "professional",
          accessGrantedAt: new Date(),
          emailVerified: new Date(), // Auto-verify since they paid
          magicLinkToken,
          magicLinkExpiry,
        },
      });
    }

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: user.id,
        stripePaymentId: session.payment_intent as string,
        stripeCustomerId: customerId || "",
        amount: session.amount_total || 0,
        currency: session.currency || "usd",
        status: "SUCCEEDED",
        description: `Purchase: ${tier || "professional"} tier`,
      },
    });

    // Send confirmation email with magic link
    await sendPurchaseConfirmationEmail({
      email: customerEmail,
      name: user.name || "Customer",
      licenseKey,
      tier: tier || "professional",
      magicLinkToken: user.magicLinkToken!,
      receiptUrl: undefined, // Stripe Checkout Session doesn't have receipt_url directly
    });

    logger.info("Purchase processed successfully", {
      userId: user.id,
      email: customerEmail,
      tier,
    });
  } catch (error) {
    logger.error("Error processing checkout.session.completed", error);
    throw error;
  }
}

/**
 * Generate a secure magic link token
 */
function generateMagicLinkToken(): string {
  return randomBytes(32).toString("hex");
}
