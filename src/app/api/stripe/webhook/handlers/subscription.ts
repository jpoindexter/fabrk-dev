/**
 * ✅ FABRK COMPONENT
 * Subscription webhook handlers
 * Under 150 lines ✓
 */

import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

/**
 * Maps Stripe price IDs to subscription tiers
 */
function getTierFromPriceId(priceId: string): string {
  const priceMap: Record<string, string> = {
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "price_starter"]: "starter",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || "price_professional"]: "professional",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || "price_enterprise"]: "enterprise",
  };
  return priceMap[priceId] || "professional";
}

/**
 * Handle new subscription created
 * Updates user subscription status and tier
 */
export async function handleSubscriptionCreated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;

  try {
    logger.info("Processing subscription.created", {
      subscriptionId: subscription.id,
      customerId: subscription.customer,
      status: subscription.status,
    });

    const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
    if (!customerId) {
      logger.error("No customer ID found in subscription");
      return;
    }

    // Get subscription tier from price ID
    const priceId = subscription.items.data[0]?.price?.id;
    const tier = priceId ? getTierFromPriceId(priceId) : "professional";

    // Update user with subscription info
    await prisma.user.update({
      where: { customerId },
      data: {
        subscriptionTier: tier,
        tier,
        // Clear trial period since they now have an active subscription
        trialEndsAt: null,
      },
    });

    logger.info("Subscription created successfully", {
      customerId,
      tier,
      status: subscription.status,
    });
  } catch (error: unknown) {
    logger.error("Error processing subscription.created", error);
    throw error;
  }
}

/**
 * Handle subscription updated (plan change, status change)
 * Updates user subscription tier and status
 */
export async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;

  try {
    logger.info("Processing subscription.updated", {
      subscriptionId: subscription.id,
      customerId: subscription.customer,
      status: subscription.status,
    });

    const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
    if (!customerId) {
      logger.error("No customer ID found in subscription");
      return;
    }

    // Get updated tier from price ID
    const priceId = subscription.items.data[0]?.price?.id;
    const tier = priceId ? getTierFromPriceId(priceId) : "professional";

    // Update user subscription
    await prisma.user.update({
      where: { customerId },
      data: {
        subscriptionTier: subscription.status === "active" ? tier : null,
        tier: subscription.status === "active" ? tier : "free",
      },
    });

    logger.info("Subscription updated successfully", {
      customerId,
      tier,
      status: subscription.status,
    });
  } catch (error: unknown) {
    logger.error("Error processing subscription.updated", error);
    throw error;
  }
}

/**
 * Handle subscription deleted/cancelled
 * Downgrades user to free tier
 */
export async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;

  try {
    logger.info("Processing subscription.deleted", {
      subscriptionId: subscription.id,
      customerId: subscription.customer,
    });

    const customerId = typeof subscription.customer === "string" ? subscription.customer : null;
    if (!customerId) {
      logger.error("No customer ID found in subscription");
      return;
    }

    // Downgrade user to free tier
    await prisma.user.update({
      where: { customerId },
      data: {
        subscriptionTier: null,
        tier: "free",
        trialEndsAt: null,
      },
    });

    logger.info("Subscription cancelled successfully", {
      customerId,
    });
  } catch (error: unknown) {
    logger.error("Error processing subscription.deleted", error);
    throw error;
  }
}
