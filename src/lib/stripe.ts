/**
 * Stripe Integration - ShipFast Style
 * All Stripe logic in one file
 */

import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import crypto from "crypto";

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2023-10-16",
  typescript: true,
});

// ===========================
// CUSTOMER MANAGEMENT
// ===========================

export async function getOrCreateCustomer(
  userId: string,
  email: string,
  name?: string | null
): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { customerId: true },
  });

  if (user?.customerId) return user.customerId;

  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: { userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { customerId: customer.id },
  });

  return customer.id;
}

// ===========================
// CHECKOUT IDEMPOTENCY
// ===========================

export function generateIdempotencyKey(userId: string, priceId: string): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString("hex");
  return `checkout_${userId}_${priceId}_${timestamp}_${random}`;
}

export async function getExistingCheckout(key: string): Promise<string | null> {
  const record = await prisma.checkoutSession.findFirst({
    where: {
      userId: key.split("_")[1], // Extract userId from key
      expiresAt: { gt: new Date() },
    },
    select: { sessionId: true },
    orderBy: { createdAt: "desc" },
  });

  return record?.sessionId || null;
}

export async function storeCheckoutSession(
  key: string,
  userId: string,
  sessionId: string,
  priceId: string
): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  await prisma.checkoutSession.create({
    data: { userId, sessionId, priceId, expiresAt },
  });
}

// ===========================
// WEBHOOK IDEMPOTENCY
// ===========================

export async function isWebhookProcessed(eventId: string): Promise<boolean> {
  const record = await prisma.webhookEvent.findUnique({
    where: { eventId },
  });
  return record !== null;
}

export async function markWebhookProcessed(eventId: string): Promise<void> {
  await prisma.webhookEvent.create({
    data: { eventId, processed: new Date() },
  });
}

// ===========================
// CHECKOUT SESSION
// ===========================

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  email: string,
  name?: string | null
): Promise<string> {
  // Check for existing checkout (prevent duplicates on refresh)
  const idempotencyKey = generateIdempotencyKey(userId, priceId);
  const existingSession = await getExistingCheckout(idempotencyKey);
  if (existingSession) {
    const session = await stripe.checkout.sessions.retrieve(existingSession);
    return session.url || "";
  }

  // Get or create Stripe customer
  const customerId = await getOrCreateCustomer(userId, email, name);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "payment", // one-time payment (use "subscription" for recurring)
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    allow_promotion_codes: true,
    metadata: { userId, priceId },
  });

  // Store session for idempotency
  await storeCheckoutSession(idempotencyKey, userId, session.id, priceId);

  return session.url || "";
}

// ===========================
// WEBHOOK HANDLING
// ===========================

export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("No userId in session metadata");
    return;
  }

  // Update user tier based on price
  const priceId = session.metadata?.priceId || "";
  const tier = getTierFromPrice(priceId);

  await prisma.user.update({
    where: { id: userId },
    data: { tier, customerId: session.customer as string },
  });

  // Record payment
  await prisma.payment.create({
    data: {
      userId,
      stripeId: session.payment_intent as string,
      amount: session.amount_total || 0,
      status: "succeeded", // Simple string status
      productId: priceId,
    },
  });

  console.log("✓ Checkout completed for user:", userId);
}

// Helper: Map price ID to tier
function getTierFromPrice(priceId: string): string {
  // Get from config.js or env vars
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER) return "starter";
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) return "pro";
  return "free";
}
