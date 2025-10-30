import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

/**
 * Stripe client singleton
 * Initializes Stripe with secret key from environment
 */

// Use placeholder during build if env var not set
const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2023-10-16",
  typescript: true,
});

/**
 * Get or create a Stripe customer for a user
 * @param userId - User ID from database
 * @param email - User email address
 * @param name - Optional user name
 * @returns Stripe customer ID
 */
export async function getOrCreateCustomer(
  userId: string,
  email: string,
  name?: string | null
): Promise<string> {
  // Check if user already has a customer ID
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { customerId: true },
  });

  if (user?.customerId) {
    return user.customerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    name: name || undefined,
    metadata: {
      userId,
    },
  });

  // Save customer ID to user record
  await prisma.user.update({
    where: { id: userId },
    data: { customerId: customer.id },
  });

  return customer.id;
}
