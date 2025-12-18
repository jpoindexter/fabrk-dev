/**
 * PayPal Payment Provider
 *
 * Global reach, trusted brand
 * Great for international customers
 *
 * Setup:
 *   1. Create account at developer.paypal.com
 *   2. Add PAYPAL_CLIENT_ID to .env
 *   3. Add PAYPAL_CLIENT_SECRET to .env
 *   4. Configure webhook at /api/webhooks/paypal
 */

import crypto from 'crypto';
import type { PaymentProviderClient, CheckoutOptions, CheckoutResult, WebhookEvent } from './index';

const API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  webhookId?: string;
}

function getConfig(): PayPalConfig {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;

  if (!clientId) throw new Error('PAYPAL_CLIENT_ID is required');
  if (!clientSecret) throw new Error('PAYPAL_CLIENT_SECRET is required');

  return { clientId, clientSecret, webhookId };
}

async function getAccessToken(): Promise<string> {
  const config = getConfig();
  const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');

  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`PayPal auth error: ${res.status} - ${error}`);
  }

  const data = await res.json();
  return data.access_token;
}

async function paypalRequest(endpoint: string, options: RequestInit = {}) {
  const token = await getAccessToken();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`PayPal API error: ${res.status} - ${error}`);
  }

  return res.json();
}

export class PayPalProvider implements PaymentProviderClient {
  async createCheckout(options: CheckoutOptions): Promise<CheckoutResult> {
    // Create a PayPal order
    const order = await paypalRequest('/v2/checkout/orders', {
      method: 'POST',
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: options.userId,
            custom_id: options.priceId,
            amount: {
              currency_code: 'USD',
              value: options.metadata?.amount || '0.00', // Amount should be passed in metadata
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              return_url: options.successUrl,
              cancel_url: options.cancelUrl,
              user_action: 'PAY_NOW',
              brand_name: 'Your App',
            },
          },
        },
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      }),
    });

    // Find the approval URL
    const approveLink = order.links?.find((link: any) => link.rel === 'payer-action');

    return {
      url: approveLink?.href || '',
      sessionId: order.id,
    };
  }

  async handleWebhook(payload: string, signature: string): Promise<WebhookEvent> {
    // PayPal webhook verification is more complex - uses transmission headers
    // For simplicity, we parse the JSON headers from the signature
    const headers = JSON.parse(signature);

    // Verify webhook signature (simplified - production should use PayPal's SDK)
    const config = getConfig();
    if (config.webhookId) {
      const isValid = await this.verifyWebhookSignature(payload, headers, config.webhookId);
      if (!isValid) {
        throw new Error('Invalid webhook signature');
      }
    }

    const event = JSON.parse(payload);
    const eventType = event.event_type;
    const resource = event.resource;

    // Map PayPal events to our unified format
    const typeMap: Record<string, string> = {
      'CHECKOUT.ORDER.APPROVED': 'checkout.completed',
      'PAYMENT.CAPTURE.COMPLETED': 'payment.succeeded',
      'PAYMENT.CAPTURE.DENIED': 'payment.failed',
      'BILLING.SUBSCRIPTION.CREATED': 'subscription.created',
      'BILLING.SUBSCRIPTION.UPDATED': 'subscription.updated',
      'BILLING.SUBSCRIPTION.CANCELLED': 'subscription.cancelled',
      'BILLING.SUBSCRIPTION.SUSPENDED': 'payment.failed',
    };

    return {
      type: typeMap[eventType] || eventType,
      data: {
        customerId: resource.payer?.payer_id,
        subscriptionId: resource.billing_agreement_id || resource.id,
        priceId: resource.purchase_units?.[0]?.custom_id,
        status: resource.status?.toLowerCase(),
        metadata: {
          reference_id: resource.purchase_units?.[0]?.reference_id,
        },
      },
    };
  }

  private async verifyWebhookSignature(
    payload: string,
    headers: Record<string, string>,
    webhookId: string
  ): Promise<boolean> {
    try {
      const result = await paypalRequest('/v1/notifications/verify-webhook-signature', {
        method: 'POST',
        body: JSON.stringify({
          auth_algo: headers['paypal-auth-algo'],
          cert_url: headers['paypal-cert-url'],
          transmission_id: headers['paypal-transmission-id'],
          transmission_sig: headers['paypal-transmission-sig'],
          transmission_time: headers['paypal-transmission-time'],
          webhook_id: webhookId,
          webhook_event: JSON.parse(payload),
        }),
      });

      return result.verification_status === 'SUCCESS';
    } catch {
      return false;
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await paypalRequest(`/v1/billing/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({
        reason: 'Customer requested cancellation',
      }),
    });
  }

  async getSubscription(subscriptionId: string) {
    const sub = await paypalRequest(`/v1/billing/subscriptions/${subscriptionId}`);

    return {
      status: sub.status?.toLowerCase(),
      currentPeriodEnd: new Date(sub.billing_info?.next_billing_time || Date.now()),
      cancelAtPeriodEnd: sub.status === 'CANCELLED',
    };
  }
}
