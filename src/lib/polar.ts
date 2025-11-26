/**
 * Polar.sh Integration
 * Handles product sales and checkout for Fabrk
 */

import { Polar } from '@polar-sh/sdk';

// Initialize Polar client
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
});

// Product configuration
export const FABRK_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID;
export const FABRK_DISCOUNT_ID = '1161689c-dbc2-4e53-8c18-43f4af7aaa3f'; // Auto-expires at 1000 uses

/**
 * Create a checkout session for Fabrk purchase
 */
export async function createCheckoutSession(params: {
  customerEmail?: string;
  successUrl: string;
  metadata?: Record<string, string>;
}) {
  if (!FABRK_PRODUCT_ID) {
    throw new Error('Polar product ID not configured');
  }

  const checkout = await polar.checkouts.create({
    products: [FABRK_PRODUCT_ID],
    discountId: FABRK_DISCOUNT_ID,
    customerEmail: params.customerEmail,
    successUrl: params.successUrl,
    metadata: params.metadata,
  });

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
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
