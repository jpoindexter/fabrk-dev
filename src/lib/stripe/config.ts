/**
 * Stripe configuration
 * Product tiers, URLs, and pricing configuration
 */

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const STRIPE_CONFIG = {
  successUrl: `${APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${APP_URL}/pricing`,
} as const;

export const STRIPE_PRODUCTS = {
  starter: {
    name: "Starter",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "",
    price: 9900, // $99 in cents
    currency: "usd",
    description: "Essential components for individual developers",
    features: [
      "Core component library",
      "Basic templates",
      "Email support",
      "Single developer license",
    ],
  },
  professional: {
    name: "Professional",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || "",
    price: 19900, // $199 in cents
    currency: "usd",
    description: "Complete design system (Most Popular)",
    features: [
      "Full component library",
      "Premium templates",
      "Priority support",
      "Up to 5 developers",
      "Advanced customization",
    ],
  },
  enterprise: {
    name: "Enterprise",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || "",
    price: 49900, // $499 in cents
    currency: "usd",
    description: "Advanced team features",
    features: [
      "Everything in Professional",
      "Unlimited developers",
      "White-label options",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
} as const;

export type ProductTier = keyof typeof STRIPE_PRODUCTS;
