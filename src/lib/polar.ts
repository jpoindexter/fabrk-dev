/* 💡 PAYMENT TIP: Polar.sh is a Stripe alternative optimized for digital products.
 * Get your access token from https://polar.sh/settings → Developer Settings.
 * Product ID is found in Polar Dashboard → Products → your product.
 * Create discount codes in Polar Dashboard → Marketing → Discounts.
 */

/**
 * Polar.sh Integration
 * Handles product sales and checkout for Fabrk
 */

import { Polar } from '@polar-sh/sdk';

// Check if Polar is configured
export const isPolarConfigured = () => !!process.env.POLAR_ACCESS_TOKEN;

// Initialize Polar client (only if configured)
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || 'not-configured',
});

// Product configuration
export const FABRK_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID;
export const FABRK_DISCOUNT_ID = undefined; // No discount for testing

/**
 * Create a checkout session for Fabrk purchase
 * @param params.customerEmail - Pre-fill customer email
 * @param params.successUrl - Redirect URL after successful purchase
 * @param params.discountId - Optional custom discount ID (overrides default)
 * @param params.metadata - Additional metadata for the order
 */
export async function createCheckoutSession(params: {
  customerEmail?: string;
  successUrl: string;
  discountId?: string;
  metadata?: Record<string, string>;
}) {
  if (!FABRK_PRODUCT_ID) {
    throw new Error('Polar product ID not configured');
  }

  // Build checkout payload (no discount for testing)
  const checkoutPayload: any = {
    products: [FABRK_PRODUCT_ID],
    customerEmail: params.customerEmail,
    successUrl: params.successUrl,
    metadata: params.metadata,
  };

  // Only add discountId if explicitly provided
  if (params.discountId) {
    checkoutPayload.discountId = params.discountId;
  }

  const checkout = await polar.checkouts.create(checkoutPayload);

  return checkout;
}

/**
 * Get product details
 */
export async function getProduct() {
  if (!FABRK_PRODUCT_ID) {
    throw new Error('Polar product ID not configured');
  }

  const product = await polar.products.get({
    id: FABRK_PRODUCT_ID,
  });

  return product;
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // Polar.sh uses standard HMAC-SHA256 webhook signatures
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');

  // Timing-safe comparison
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}
