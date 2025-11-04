/**
 * Stripe Client and Customer Management
 */

import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2023-10-16",
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
