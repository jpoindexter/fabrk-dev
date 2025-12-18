/**
 * Payment Providers - Unified Interface
 *
 * Supports: Stripe, Lemonsqueezy, Paddle, Polar, PayPal
 *
 * Usage:
 *   import { createCheckout, handleWebhook } from '@/lib/payments'
 */

export type PaymentProvider = 'stripe' | 'lemonsqueezy' | 'paddle' | 'polar' | 'paypal';

export interface CheckoutOptions {
  priceId: string;
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CheckoutResult {
  url: string;
  sessionId: string;
}

export interface WebhookEvent {
  type: string;
  data: {
    customerId?: string;
    subscriptionId?: string;
    priceId?: string;
    status?: string;
    metadata?: Record<string, string>;
  };
}

export interface PaymentProviderClient {
  createCheckout(options: CheckoutOptions): Promise<CheckoutResult>;
  handleWebhook(payload: string, signature: string): Promise<WebhookEvent>;
  cancelSubscription(subscriptionId: string): Promise<void>;
  getSubscription(subscriptionId: string): Promise<{
    status: string;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  }>;
}

// Re-export individual providers
export { StripeProvider } from './stripe';
export { LemonsqueezyProvider } from './lemonsqueezy';
export { PaddleProvider } from './paddle';
export { PolarProvider } from './polar';
export { PayPalProvider } from './paypal';

/**
 * Get payment provider based on environment config
 */
export function getPaymentProvider(): PaymentProviderClient {
  const provider = process.env.PAYMENT_PROVIDER as PaymentProvider || 'stripe';

  switch (provider) {
    case 'stripe':
      return new (require('./stripe').StripeProvider)();
    case 'lemonsqueezy':
      return new (require('./lemonsqueezy').LemonsqueezyProvider)();
    case 'paddle':
      return new (require('./paddle').PaddleProvider)();
    case 'polar':
      return new (require('./polar').PolarProvider)();
    case 'paypal':
      return new (require('./paypal').PayPalProvider)();
    default:
      throw new Error(`Unknown payment provider: ${provider}`);
  }
}
