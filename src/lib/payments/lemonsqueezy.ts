/**
 * Lemonsqueezy Payment Provider
 *
 * EU-friendly, handles tax automatically
 * Great for digital products
 *
 * Setup:
 *   1. Create account at lemonsqueezy.com
 *   2. Add LEMONSQUEEZY_API_KEY to .env
 *   3. Add LEMONSQUEEZY_WEBHOOK_SECRET to .env
 *   4. Configure webhook at /api/webhooks/lemonsqueezy
 */

import crypto from 'crypto';
import type { PaymentProviderClient, CheckoutOptions, CheckoutResult, WebhookEvent } from './index';

const API_BASE = 'https://api.lemonsqueezy.com/v1';

interface LemonsqueezyConfig {
  apiKey: string;
  webhookSecret: string;
  storeId: string;
}

function getConfig(): LemonsqueezyConfig {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;

  if (!apiKey) throw new Error('LEMONSQUEEZY_API_KEY is required');
  if (!webhookSecret) throw new Error('LEMONSQUEEZY_WEBHOOK_SECRET is required');
  if (!storeId) throw new Error('LEMONSQUEEZY_STORE_ID is required');

  return { apiKey, webhookSecret, storeId };
}

async function lemonRequest(endpoint: string, options: RequestInit = {}) {
  const config = getConfig();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.api+json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Lemonsqueezy API error: ${res.status} - ${error}`);
  }

  return res.json();
}

export class LemonsqueezyProvider implements PaymentProviderClient {
  async createCheckout(options: CheckoutOptions): Promise<CheckoutResult> {
    const config = getConfig();

    const data = await lemonRequest('/checkouts', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email: options.email,
              custom: {
                user_id: options.userId,
                ...options.metadata,
              },
            },
            checkout_options: {
              success_url: options.successUrl,
              cancel_url: options.cancelUrl,
            },
            product_options: {
              redirect_url: options.successUrl,
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: config.storeId,
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: options.priceId, // Lemonsqueezy uses variant IDs
              },
            },
          },
        },
      }),
    });

    return {
      url: data.data.attributes.url,
      sessionId: data.data.id,
    };
  }

  async handleWebhook(payload: string, signature: string): Promise<WebhookEvent> {
    const config = getConfig();

    // Verify signature
    const hmac = crypto.createHmac('sha256', config.webhookSecret);
    const digest = hmac.update(payload).digest('hex');

    if (digest !== signature) {
      throw new Error('Invalid webhook signature');
    }

    const event = JSON.parse(payload);
    const eventType = event.meta.event_name;
    const data = event.data;

    // Map Lemonsqueezy events to our unified format
    const typeMap: Record<string, string> = {
      'subscription_created': 'subscription.created',
      'subscription_updated': 'subscription.updated',
      'subscription_cancelled': 'subscription.cancelled',
      'subscription_payment_success': 'payment.succeeded',
      'subscription_payment_failed': 'payment.failed',
      'order_created': 'checkout.completed',
    };

    return {
      type: typeMap[eventType] || eventType,
      data: {
        customerId: data.attributes.customer_id?.toString(),
        subscriptionId: data.id,
        priceId: data.attributes.variant_id?.toString(),
        status: data.attributes.status,
        metadata: event.meta.custom_data || {},
      },
    };
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await lemonRequest(`/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
    });
  }

  async getSubscription(subscriptionId: string) {
    const data = await lemonRequest(`/subscriptions/${subscriptionId}`);
    const attrs = data.data.attributes;

    return {
      status: attrs.status,
      currentPeriodEnd: new Date(attrs.renews_at),
      cancelAtPeriodEnd: attrs.cancelled,
    };
  }
}
