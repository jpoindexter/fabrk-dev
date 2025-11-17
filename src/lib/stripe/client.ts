/**
 * Stripe Client and Customer Management
 */

import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// Initialize Stripe - require environment variable to prevent silent failures
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is required. Please set it in your .env file.\n" +
    "Get your key from: https://dashboard.stripe.com/apikeys"
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
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
