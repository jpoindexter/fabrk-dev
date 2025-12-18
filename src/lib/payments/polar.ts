/**
 * Polar.sh Payment Provider
 *
 * Open source monetization platform
 * Great for digital products and SaaS
 *
 * Setup:
 *   1. Create account at polar.sh
 *   2. Add POLAR_ACCESS_TOKEN to .env
 *   3. Add POLAR_WEBHOOK_SECRET to .env
 *   4. Configure webhook at /api/webhooks/polar
 */

import crypto from 'crypto';
import { Polar, ServerSandbox } from '@polar-sh/sdk';
import type { PaymentProviderClient, CheckoutOptions, CheckoutResult, WebhookEvent } from './index';

interface PolarConfig {
  accessToken: string;
  webhookSecret: string;
}

function getConfig(): PolarConfig {
  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

  if (!accessToken) throw new Error('POLAR_ACCESS_TOKEN is required');
  if (!webhookSecret) throw new Error('POLAR_WEBHOOK_SECRET is required');

  return { accessToken, webhookSecret };
}

function getPolarClient(): Polar {
  const config = getConfig();
  return new Polar({
    accessToken: config.accessToken,
    server: process.env.NODE_ENV === 'development' ? ServerSandbox : undefined,
  });
}

export class PolarProvider implements PaymentProviderClient {
  async createCheckout(options: CheckoutOptions): Promise<CheckoutResult> {
    const polar = getPolarClient();

    const checkout = await polar.checkouts.create({
      products: [options.priceId], // Polar uses product IDs
      customerEmail: options.email,
      successUrl: options.successUrl,
      metadata: {
        user_id: options.userId,
        ...options.metadata,
      },
    });

    return {
      url: checkout.url,
      sessionId: checkout.id,
    };
  }

  async handleWebhook(payload: string, signature: string): Promise<WebhookEvent> {
    const config = getConfig();

    // Verify signature using HMAC-SHA256
    const hmac = crypto.createHmac('sha256', config.webhookSecret);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');

    // Timing-safe comparison
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      throw new Error('Invalid webhook signature');
    }

    const event = JSON.parse(payload);
    const eventType = event.type;
    const data = event.data;

    // Map Polar events to our unified format
    const typeMap: Record<string, string> = {
      'checkout.created': 'checkout.created',
      'checkout.updated': 'checkout.updated',
      'order.created': 'checkout.completed',
      'subscription.created': 'subscription.created',
      'subscription.updated': 'subscription.updated',
      'subscription.canceled': 'subscription.cancelled',
      'subscription.active': 'subscription.created',
      'subscription.revoked': 'subscription.cancelled',
    };

    return {
      type: typeMap[eventType] || eventType,
      data: {
        customerId: data.customer_id,
        subscriptionId: data.subscription_id || data.id,
        priceId: data.product_id,
        status: data.status,
        metadata: data.metadata || {},
      },
    };
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    const polar = getPolarClient();
    // Polar SDK uses update with SubscriptionCancel type to cancel at period end
    await polar.subscriptions.update({
      id: subscriptionId,
      subscriptionUpdate: { cancelAtPeriodEnd: true },
    });
  }

  async getSubscription(subscriptionId: string) {
    const polar = getPolarClient();
    const sub = await polar.subscriptions.get({ id: subscriptionId });

    return {
      status: sub.status as string,
      currentPeriodEnd: sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd) : new Date(),
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    };
  }
}
