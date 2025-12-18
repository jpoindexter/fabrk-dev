/**
 * Stripe Payment Provider
 *
 * Industry standard - cards, subscriptions, invoices
 * Most features, best docs, widest adoption
 *
 * Setup:
 *   1. Create account at dashboard.stripe.com
 *   2. Add STRIPE_SECRET_KEY to .env
 *   3. Add STRIPE_WEBHOOK_SECRET to .env
 *   4. Configure webhook at /api/webhooks/stripe
 */

import Stripe from 'stripe';
import type { PaymentProviderClient, CheckoutOptions, CheckoutResult, WebhookEvent } from './index';
import { env } from '@/lib/env';

interface StripeConfig {
  secretKey: string;
  webhookSecret: string;
}

function getConfig(): StripeConfig {
  const secretKey = env.server.STRIPE_SECRET_KEY;
  const webhookSecret = env.server.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is required');
  if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is required');

  return { secretKey, webhookSecret };
}

function getStripeClient(): Stripe {
  const config = getConfig();
  return new Stripe(config.secretKey, {
    apiVersion: '2025-11-17.clover',
    typescript: true,
  });
}

export class StripeProvider implements PaymentProviderClient {
  async createCheckout(options: CheckoutOptions): Promise<CheckoutResult> {
    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.create({
      customer_email: options.email,
      line_items: [
        {
          price: options.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // Use 'subscription' for recurring
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      allow_promotion_codes: true,
      metadata: {
        user_id: options.userId,
        ...options.metadata,
      },
    });

    return {
      url: session.url || '',
      sessionId: session.id,
    };
  }

  async handleWebhook(payload: string, signature: string): Promise<WebhookEvent> {
    const config = getConfig();
    const stripe = getStripeClient();

    const event = stripe.webhooks.constructEvent(payload, signature, config.webhookSecret);

    const data = event.data.object as any;

    // Map Stripe events to our unified format
    const typeMap: Record<string, string> = {
      'checkout.session.completed': 'checkout.completed',
      'customer.subscription.created': 'subscription.created',
      'customer.subscription.updated': 'subscription.updated',
      'customer.subscription.deleted': 'subscription.cancelled',
      'invoice.payment_succeeded': 'payment.succeeded',
      'invoice.payment_failed': 'payment.failed',
    };

    return {
      type: typeMap[event.type] || event.type,
      data: {
        customerId: data.customer,
        subscriptionId: data.subscription || data.id,
        priceId: data.items?.data?.[0]?.price?.id || data.metadata?.priceId,
        status: data.status,
        metadata: data.metadata || {},
      },
    };
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    const stripe = getStripeClient();
    await stripe.subscriptions.cancel(subscriptionId);
  }

  async getSubscription(subscriptionId: string) {
    const stripe = getStripeClient();
    const sub = await stripe.subscriptions.retrieve(subscriptionId);

    return {
      status: sub.status,
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    };
  }
}
