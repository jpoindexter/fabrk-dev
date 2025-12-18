import { FeatureGuideTemplate } from '@/components/docs';
import { CreditCard, Globe, Shield, Users, Zap, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'PayPal - Fabrk Docs',
  description:
    'Integrate PayPal for payments. Trusted payments with 400+ million active accounts.',
};

export default function PayPalPage() {
  return (
    <FeatureGuideTemplate
      code="[0xP4]"
      category="Payment Providers"
      title="PayPal"
      description="Trusted payments - 400M+ active accounts."
      overview="PayPal is one of the most recognized payment brands globally with 400+ million active accounts. Many customers prefer PayPal checkout over entering card details. Features include PayPal Checkout, Venmo (US), Pay Later options, subscriptions, and one-click checkout for returning customers."
      features={[
        {
          icon: Users,
          title: '400M+ Accounts',
          description:
            'Massive user base. Many customers prefer PayPal over cards.',
        },
        {
          icon: Globe,
          title: 'Global Reach',
          description:
            '200+ markets, 100+ currencies. Local payment methods included.',
        },
        {
          icon: Shield,
          title: 'Buyer Protection',
          description:
            'PayPal purchase protection increases customer trust.',
        },
        {
          icon: Zap,
          title: 'One-Click Checkout',
          description:
            'Returning users checkout in one click. Higher conversion.',
        },
        {
          icon: DollarSign,
          title: 'Pay Later',
          description:
            'Pay in 4, Pay Monthly options. Increase average order value.',
        },
        {
          icon: CreditCard,
          title: 'Venmo (US)',
          description:
            'Accept Venmo payments. Popular with younger demographics.',
        },
      ]}
      setup={[
        {
          title: 'Create PayPal Business Account',
          description:
            'Sign up at paypal.com/business. Instant approval for most countries.',
        },
        {
          title: 'Create REST API App',
          description:
            'Go to Developer Dashboard → Apps & Credentials → Create App.',
          code: `# In PayPal Developer Dashboard:
# 1. Log in at developer.paypal.com
# 2. Apps & Credentials → Create App
# 3. Name: "Your App Name"
# 4. Copy Client ID and Secret

# For Subscriptions:
# 5. Enable "Subscriptions" feature in app settings`,
          language: 'bash',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your PayPal credentials to .env.local',
          code: `# PayPal Configuration
PAYPAL_CLIENT_ID="AYSq3RD..."
PAYPAL_CLIENT_SECRET="EGnHDx..."
PAYPAL_WEBHOOK_ID="WH-XXX..."  # From webhook setup

# Sandbox mode (for testing)
PAYPAL_MODE="sandbox"  # or "live"
PAYPAL_SANDBOX_CLIENT_ID="AYSq3RD..."
PAYPAL_SANDBOX_CLIENT_SECRET="EGnHDx..."

# Set PayPal as your payment provider
PAYMENT_PROVIDER="paypal"`,
          language: 'bash',
        },
        {
          title: 'Configure Webhook',
          description:
            'Set up webhook endpoint in PayPal dashboard.',
          code: `// Webhook URL: https://your-domain.com/api/webhooks/paypal

// Events to subscribe:
// - BILLING.SUBSCRIPTION.CREATED
// - BILLING.SUBSCRIPTION.ACTIVATED
// - BILLING.SUBSCRIPTION.CANCELLED
// - BILLING.SUBSCRIPTION.SUSPENDED
// - PAYMENT.SALE.COMPLETED
// - PAYMENT.SALE.REFUNDED`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'PayPal Buttons',
          description: 'Add PayPal checkout buttons.',
          code: `'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export function PayPalCheckout({ amount }: { amount: string }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: amount },
            }],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          console.log('Payment completed:', order);
          // Handle successful payment
        }}
        onError={(err) => {
          console.error('PayPal error:', err);
        }}
      />
    </PayPalScriptProvider>
  );
}`,
          language: 'typescript',
        },
        {
          title: 'Create Subscription',
          description: 'Set up recurring payments with PayPal subscriptions.',
          code: `// First, create a Plan in PayPal Dashboard or via API
// Then use the plan ID for subscriptions

'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export function PayPalSubscription({ planId }: { planId: string }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        vault: true,
        intent: 'subscription',
      }}
    >
      <PayPalButtons
        style={{ label: 'subscribe' }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: planId,
            custom_id: 'user_123', // Your user ID
          });
        }}
        onApprove={async (data) => {
          console.log('Subscription ID:', data.subscriptionID);
          // Save subscription to database
          await fetch('/api/subscriptions', {
            method: 'POST',
            body: JSON.stringify({
              subscriptionId: data.subscriptionID,
              userId: 'user_123',
            }),
          });
        }}
      />
    </PayPalScriptProvider>
  );
}`,
          language: 'typescript',
        },
        {
          title: 'Handle Webhooks',
          description: 'Process PayPal webhook events.',
          code: `// src/app/api/webhooks/paypal/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  // Verify webhook signature (recommended)
  const isValid = await verifyPayPalWebhook(request, body);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid' }, { status: 401 });
  }

  const eventType = body.event_type;
  const resource = body.resource;

  switch (eventType) {
    case 'BILLING.SUBSCRIPTION.ACTIVATED':
      await handleSubscriptionActivated(resource);
      break;

    case 'BILLING.SUBSCRIPTION.CANCELLED':
      await handleSubscriptionCancelled(resource);
      break;

    case 'PAYMENT.SALE.COMPLETED':
      await handlePaymentCompleted(resource);
      break;

    case 'PAYMENT.SALE.REFUNDED':
      await handlePaymentRefunded(resource);
      break;
  }

  return NextResponse.json({ received: true });
}

async function verifyPayPalWebhook(request: Request, body: any) {
  // Verify using PayPal's verification API
  const response = await fetch(
    'https://api-m.paypal.com/v1/notifications/verify-webhook-signature',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: \`Bearer \${await getAccessToken()}\`,
      },
      body: JSON.stringify({
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        transmission_id: request.headers.get('paypal-transmission-id'),
        transmission_time: request.headers.get('paypal-transmission-time'),
        cert_url: request.headers.get('paypal-cert-url'),
        auth_algo: request.headers.get('paypal-auth-algo'),
        transmission_sig: request.headers.get('paypal-transmission-sig'),
        webhook_event: body,
      }),
    }
  );

  const result = await response.json();
  return result.verification_status === 'SUCCESS';
}`,
          language: 'typescript',
        },
      ]}
    />
  );
}
