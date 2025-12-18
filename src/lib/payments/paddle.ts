/**
 * Paddle Payment Provider
 *
 * Merchant of record - handles global tax compliance
 * Great for SaaS and digital products
 *
 * Setup:
 *   1. Create account at paddle.com
 *   2. Add PADDLE_API_KEY to .env
 *   3. Add PADDLE_WEBHOOK_SECRET to .env
 *   4. Configure webhook at /api/webhooks/paddle
 */

import crypto from 'crypto';
import type { PaymentProviderClient, CheckoutOptions, CheckoutResult, WebhookEvent } from './index';

const API_BASE = 'https://api.paddle.com';

interface PaddleConfig {
  apiKey: string;
  webhookSecret: string;
}

function getConfig(): PaddleConfig {
  const apiKey = process.env.PADDLE_API_KEY;
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!apiKey) throw new Error('PADDLE_API_KEY is required');
  if (!webhookSecret) throw new Error('PADDLE_WEBHOOK_SECRET is required');

  return { apiKey, webhookSecret };
}

async function paddleRequest(endpoint: string, options: RequestInit = {}) {
  const config = getConfig();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Paddle API error: ${res.status} - ${error}`);
  }

  return res.json();
}

export class PaddleProvider implements PaymentProviderClient {
  async createCheckout(options: CheckoutOptions): Promise<CheckoutResult> {
    const data = await paddleRequest('/transactions', {
      method: 'POST',
      body: JSON.stringify({
        items: [
          {
            price_id: options.priceId,
            quantity: 1,
          },
        ],
        customer: {
          email: options.email,
        },
        custom_data: {
          user_id: options.userId,
          ...options.metadata,
        },
        checkout: {
          url: options.successUrl,
        },
      }),
    });

    return {
      url: data.data.checkout.url,
      sessionId: data.data.id,
    };
  }

  async handleWebhook(payload: string, signature: string): Promise<WebhookEvent> {
    const config = getConfig();

    // Paddle uses ts;h1 signature format
    const parts = signature.split(';');
    const ts = parts.find((p) => p.startsWith('ts='))?.slice(3);
    const h1 = parts.find((p) => p.startsWith('h1='))?.slice(3);

    if (!ts || !h1) {
      throw new Error('Invalid webhook signature format');
    }

    const signedPayload = `${ts}:${payload}`;
    const expectedSignature = crypto
      .createHmac('sha256', config.webhookSecret)
      .update(signedPayload)
      .digest('hex');

    if (h1 !== expectedSignature) {
      throw new Error('Invalid webhook signature');
    }

    const event = JSON.parse(payload);
    const eventType = event.event_type;
    const data = event.data;

    // Map Paddle events to our unified format
    const typeMap: Record<string, string> = {
      'subscription.created': 'subscription.created',
      'subscription.updated': 'subscription.updated',
      'subscription.canceled': 'subscription.cancelled',
      'subscription.past_due': 'payment.failed',
      'transaction.completed': 'checkout.completed',
      'transaction.payment_failed': 'payment.failed',
    };

    return {
      type: typeMap[eventType] || eventType,
      data: {
        customerId: data.customer_id,
        subscriptionId: data.subscription_id || data.id,
        priceId: data.items?.[0]?.price?.id,
        status: data.status,
        metadata: data.custom_data || {},
      },
    };
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await paddleRequest(`/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({
        effective_from: 'next_billing_period',
      }),
    });
  }

  async getSubscription(subscriptionId: string) {
    const data = await paddleRequest(`/subscriptions/${subscriptionId}`);
    const sub = data.data;

    return {
      status: sub.status,
      currentPeriodEnd: new Date(sub.current_billing_period.ends_at),
      cancelAtPeriodEnd: sub.scheduled_change?.action === 'cancel',
    };
  }
}
