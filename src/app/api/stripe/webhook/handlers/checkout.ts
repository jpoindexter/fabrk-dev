/**
 * ✅ FABRK COMPONENT
 * Checkout webhook handler
 * Handles checkout.session.completed event
 */

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { generateLicenseKey } from "@/lib/license";
import { queueWelcomeEmail } from "@/lib/email";
import { generateSecureToken, getTokenExpiration } from "@/lib/tokens";
import { handleGitHubAccessGrant } from "./github-access";
import { createHash } from "crypto";
import Stripe from "stripe";

const _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
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
    const { userId, product: _product, tier } = session.metadata || {};
    const _isGuestPurchase = userId === "guest";

    // Get or create customer ID
    const customerId =
      typeof session.customer === "string" ? session.customer : null;

    // Generate license key
    const licenseKey = generateLicenseKey();

    // Upsert user first (atomic operation to prevent race conditions)
    const user = await prisma.user.upsert({
      where: { email: customerEmail },
      update: {
        customerId: customerId || undefined,
        licenseKey,
        tier: tier || "professional",
        subscriptionTier: tier || "professional",
      },
      create: {
        email: customerEmail,
        name: session.customer_details?.name || null,
        customerId,
        licenseKey,
        tier: tier || "professional",
        subscriptionTier: tier || "professional",
        emailVerified: new Date(), // Auto-verify since they paid
      },
    });

    // Queue GitHub repository access grant job (if enabled)
    // This handles retry logic for transient GitHub API failures
    const githubResult = await handleGitHubAccessGrant(session);

    logger.info("User upserted", { userId: user.id, email: customerEmail });

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: user.id,
        stripeId: session.id,
        stripePaymentId: session.payment_intent as string,
        amount: session.amount_total || 0,
        status: "succeeded",
        productId: tier || "professional",
      },
    });

    // Generate magic link token for one-click dashboard access
    const magicLinkToken = generateSecureToken();
    const magicLinkExpiry = getTokenExpiration(24 * 7); // Valid for 7 days

    // Hash token before storing in database (security: never store plain tokens)
    const hashedMagicToken = createHash("sha256").update(magicLinkToken).digest("hex");

    // Store hashed token in database
    await prisma.verificationToken.create({
      data: {
        identifier: customerEmail,
        token: hashedMagicToken,
        expires: magicLinkExpiry,
      },
    });

    // Build magic link URL with plain token (sent via email)
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/magic-signin?token=${magicLinkToken}&email=${encodeURIComponent(customerEmail)}`;

    // Queue welcome email with license key and magic link
    // Note: GitHub access is handled asynchronously via job queue
    await queueWelcomeEmail({
      to: customerEmail,
      name: user.name || "Customer",
      licenseKey,
      magicLink,
      userId: user.id,
      // GitHub info will be communicated separately once job completes
      githubRepoUrl: null,
      githubUsername: githubResult.githubUsername || null,
    });

    logger.info("Purchase processed successfully", {
      userId: user.id,
      email: customerEmail,
      tier,
      githubJobQueued: githubResult.success,
      githubJobId: githubResult.jobId,
      githubUsername: githubResult.githubUsername,
      githubError: githubResult.error,
    });
  } catch (error: unknown) {
    logger.error("Error processing checkout.session.completed", error);
    throw error;
  }
}
