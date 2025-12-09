/* 💡 PAYMENT TIP: Get your Stripe keys from https://dashboard.stripe.com/apikeys
 * Use test keys (sk_test_...) during development.
 * Switch to live keys (sk_live_...) when deploying to production.
 * Test webhook locally: stripe listen --forward-to localhost:3000/api/stripe/webhook
 */

/**
 * Stripe Client and Customer Management
 */

import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// Initialize Stripe - require environment variable to prevent silent failures
// Allow builds without Stripe key when SKIP_ENV_VALIDATION is set
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";

if (!STRIPE_KEY && process.env.SKIP_ENV_VALIDATION !== "true" && process.env.NODE_ENV === "production") {
  throw new Error(
    "STRIPE_SECRET_KEY is required in production. Please set it in your .env file.\n" +
      "Get your key from: https://dashboard.stripe.com/apikeys"
  );
}

export const stripe = new Stripe(STRIPE_KEY || "sk_test_placeholder", {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});

/**
 * Get or create a Stripe customer for a user
 */
export async function getOrCreateCustomer(
  email: string,
  userId: string,
  existingCustomerId?: string | null
): Promise<string> {
  // Return existing customer ID if provided
  if (existingCustomerId) {
    return existingCustomerId;
  }

  // Check if user already has a customer ID
  const user = await prisma.user.findUnique({
    where: { email },
    select: { customerId: true },
  });

  if (user?.customerId) {
    return user.customerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  // Update user with customer ID
  await prisma.user.update({
    where: { email },
    data: { customerId: customer.id },
  });

  return customer.id;
}
