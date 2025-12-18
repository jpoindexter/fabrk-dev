import { FeatureGuideTemplate } from '@/components/docs';
import { CreditCard, Globe, Shield, DollarSign, Calculator, Users } from 'lucide-react';

export const metadata = {
  title: 'Paddle - Fabrk Docs',
  description:
    'Integrate Paddle for payments. Merchant of record that handles global tax compliance.',
};

export default function PaddlePage() {
  return (
    <FeatureGuideTemplate
      code="[0xP3]"
      category="Payment Providers"
      title="Paddle"
      description="Merchant of Record - Global tax compliance handled."
      overview="Paddle is a merchant of record, meaning they handle all sales tax, VAT, and compliance globally. You never deal with tax filings. Features include automatic tax calculation and remittance, support for 200+ countries, subscription management, checkout localization, and invoice generation. Perfect for SaaS selling globally."
      features={[
        {
          icon: Calculator,
          title: 'Tax Compliance',
          description:
            'Paddle handles VAT, sales tax, GST worldwide. No tax filings for you.',
        },
        {
          icon: Globe,
          title: 'Global Payments',
          description:
            '200+ countries, local payment methods, automatic currency conversion.',
        },
        {
          icon: Shield,
          title: 'Merchant of Record',
          description:
            'Paddle is the seller. They handle refunds, chargebacks, and compliance.',
        },
        {
          icon: CreditCard,
          title: 'Modern Checkout',
          description:
            'Localized checkout overlay. Supports cards, PayPal, Apple Pay, and more.',
        },
        {
          icon: DollarSign,
          title: 'Subscription Management',
          description:
            'Built-in subscription handling with proration, upgrades, and dunning.',
        },
        {
          icon: Users,
          title: 'Customer Portal',
          description:
            'Hosted portal for customers to manage subscriptions and billing.',
        },
      ]}
      setup={[
        {
          title: 'Create Paddle Account',
          description:
            'Sign up at paddle.com. Approval takes 1-3 business days.',
        },
        {
          title: 'Create Products & Prices',
          description:
            'In Paddle dashboard, create your products and pricing.',
          code: `# Paddle uses Products → Prices model
# 1. Create a Product (e.g., "Pro Plan")
# 2. Add Prices to the product:
#    - Monthly: $29/month
#    - Yearly: $290/year (2 months free)

# Note: Paddle prices include tax calculation
# The displayed price can be tax-inclusive or exclusive`,
          language: 'bash',
        },
        {
          title: 'Get API Keys',
          description:
            'Go to Developer Tools → Authentication to get your API key and client token.',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your Paddle credentials to .env.local',
          code: `# Paddle Configuration
PADDLE_API_KEY="pdl_live_..."           # Server-side API key
PADDLE_CLIENT_TOKEN="live_..."          # Client-side token
PADDLE_WEBHOOK_SECRET="pdl_ntfset_..."  # Webhook signature secret

# Sandbox mode (for testing)
PADDLE_ENVIRONMENT="sandbox"  # or "production"
PADDLE_SANDBOX_API_KEY="pdl_sandbox_..."
PADDLE_SANDBOX_CLIENT_TOKEN="test_..."

# Set Paddle as your payment provider
PAYMENT_PROVIDER="paddle"`,
          language: 'bash',
        },
        {
          title: 'Configure Webhook',
          description:
            'Set up webhook endpoint in Paddle dashboard.',
          code: `// Webhook URL: https://your-domain.com/api/webhooks/paddle

// Events to subscribe:
// - subscription.created
// - subscription.updated
// - subscription.canceled
// - subscription.paused
// - subscription.resumed
// - transaction.completed
// - transaction.payment_failed`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Initialize Checkout',
          description: 'Open Paddle checkout overlay.',
          code: `'use client';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';

export function PaddleCheckout({ priceId }: { priceId: string }) {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: 'sandbox', // or 'production'
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    }).then(setPaddle);
  }, []);

  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: {
        email: 'customer@example.com',
      },
      customData: {
        userId: 'user_123', // Pass to webhook
      },
    });
  };

  return (
    <button onClick={openCheckout}>
      > SUBSCRIBE
    </button>
  );
}`,
          language: 'typescript',
        },
        {
          title: 'Handle Webhooks',
          description: 'Process Paddle webhook events.',
          code: `// src/app/api/webhooks/paddle/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Paddle } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('paddle-signature');

  try {
    const event = paddle.webhooks.unmarshal(
      body,
      process.env.PADDLE_WEBHOOK_SECRET!,
      signature!
    );

    switch (event.eventType) {
      case 'subscription.created':
        await handleSubscriptionCreated(event.data);
        break;
      case 'subscription.canceled':
        await handleSubscriptionCanceled(event.data);
        break;
      case 'transaction.completed':
        await handleTransactionCompleted(event.data);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  }
}`,
          language: 'typescript',
        },
        {
          title: 'Manage Subscriptions',
          description: 'Cancel, pause, or update subscriptions via API.',
          code: `import { Paddle } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY!);

// Cancel subscription
await paddle.subscriptions.cancel(subscriptionId, {
  effectiveFrom: 'next_billing_period', // or 'immediately'
});

// Pause subscription
await paddle.subscriptions.pause(subscriptionId);

// Resume subscription
await paddle.subscriptions.resume(subscriptionId, {
  effectiveFrom: 'immediately',
});

// Update subscription (change plan)
await paddle.subscriptions.update(subscriptionId, {
  items: [{ priceId: 'pri_new_plan', quantity: 1 }],
  prorationBillingMode: 'prorated_immediately',
});

// Get customer portal URL
const customer = await paddle.customers.get(customerId);
// Paddle automatically creates a portal for customers`,
          language: 'typescript',
        },
      ]}
    />
  );
}
