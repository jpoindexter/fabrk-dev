---
title: 'Multi-Provider Payments: Stripe, Polar, and Lemonsqueezy in One Boilerplate'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'multi-provider-payments-saas'
description: 'How Fabrk supports three payment providers with identical patterns. Choose Stripe, Polar.sh, or Lemonsqueezy without changing your codebase.'
publishedAt: '2026-02-02T10:00:00.000Z'
---

Every SaaS needs payments, but choosing the right provider is complicated. Stripe is the industry standard but complex. Polar.sh is perfect for developer tools. Lemonsqueezy handles global taxes as a merchant of record. Fabrk supports all three with identical patterns, so you're never locked in.

---

## Why Multi-Provider Support Matters

**Business Model Evolution**
- Start simple with Lemonsqueezy for tax compliance
- Scale to Stripe for enterprise features
- Add Polar for open source monetization

**Regional Requirements**
- Some providers have better coverage in specific regions
- Tax laws may favor merchant-of-record models
- Local payment methods vary by provider

**Risk Mitigation**
- Provider outages happen
- Terms of service change
- Having options protects your business

---

## Provider Comparison

| Feature | Stripe | Polar.sh | Lemonsqueezy |
|---------|--------|----------|--------------|
| **Best For** | Enterprise, complex billing | Developer tools, OSS | Solo founders, global |
| **Pricing** | 2.9% + $0.30 | 5% platform fee | 5% + payment fees |
| **MoR** | No | No | Yes |
| **Handles Taxes** | Partial | No | Yes (globally) |
| **Setup Complexity** | High | Low | Low |
| **Metered Billing** | Yes | Limited | No |
| **GitHub Integration** | No | Yes | No |

---

## Identical API Patterns

Each provider follows the exact same pattern in Fabrk:

| Provider | Checkout Endpoint | Webhook Endpoint |
|----------|-------------------|------------------|
| Stripe | `/api/stripe/checkout` | `/api/stripe/webhook` |
| Polar | `/api/polar/checkout` | `/api/polar/webhook` |
| Lemonsqueezy | `/api/lemonsqueezy/checkout` | `/api/lemonsqueezy/webhook` |

This means you can switch providers by changing environment variables—no code changes required.

---

## Setting Up Stripe

### 1. Create a Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Complete business verification
3. Go to Developers → API Keys
4. Copy your secret key and publishable key

### 2. Configure Products and Prices

```bash
# Create products in Stripe Dashboard or via API
# Each price has a unique price_id like: price_1234567890
```

### 3. Set Environment Variables

```bash
# .env.local
PAYMENT_PROVIDER=stripe

# API Keys
STRIPE_SECRET_KEY=sk_test_...  # Use sk_live_... for production
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Webhook (generate in Stripe Dashboard → Webhooks)
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs from your Stripe products
STRIPE_PRICE_MONTHLY=price_...
STRIPE_PRICE_YEARLY=price_...
```

### 4. Configure Webhook Endpoint

In Stripe Dashboard → Webhooks:
- Add endpoint: `https://yourdomain.com/api/stripe/webhook`
- Select events:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.paid`
  - `invoice.payment_failed`

---

## Setting Up Polar.sh

### 1. Create a Polar Account

1. Sign up at [polar.sh](https://polar.sh)
2. Connect your GitHub account
3. Create an organization
4. Navigate to Settings → Developers

### 2. Create Products

In Polar Dashboard:
1. Go to Products → Create Product
2. Set pricing (one-time or subscription)
3. Copy the product ID

### 3. Set Environment Variables

```bash
# .env.local
PAYMENT_PROVIDER=polar

# API Key (from Settings → Developers → Access Tokens)
POLAR_ACCESS_TOKEN=polar_at_...

# Organization ID
POLAR_ORGANIZATION_ID=...

# Webhook Secret (from Settings → Webhooks)
POLAR_WEBHOOK_SECRET=...

# Product IDs
POLAR_PRODUCT_MONTHLY=...
POLAR_PRODUCT_YEARLY=...
```

### 4. Configure Webhook

In Polar Dashboard → Settings → Webhooks:
- URL: `https://yourdomain.com/api/polar/webhook`
- Events: All subscription and order events

---

## Setting Up Lemonsqueezy

### 1. Create a Lemonsqueezy Account

1. Sign up at [lemonsqueezy.com](https://lemonsqueezy.com)
2. Complete store setup
3. Add products with pricing

### 2. Get API Credentials

1. Go to Settings → API
2. Generate an API key
3. Copy your store ID

### 3. Set Environment Variables

```bash
# .env.local
PAYMENT_PROVIDER=lemonsqueezy

# API Key
LEMONSQUEEZY_API_KEY=...

# Store ID
LEMONSQUEEZY_STORE_ID=...

# Webhook Secret (from Settings → Webhooks)
LEMONSQUEEZY_WEBHOOK_SECRET=...

# Variant IDs (Lemonsqueezy uses variants for pricing)
LEMONSQUEEZY_VARIANT_MONTHLY=...
LEMONSQUEEZY_VARIANT_YEARLY=...
```

### 4. Configure Webhook

In Lemonsqueezy Dashboard → Settings → Webhooks:
- URL: `https://yourdomain.com/api/lemonsqueezy/webhook`
- Events:
  - `subscription_created`
  - `subscription_updated`
  - `subscription_cancelled`
  - `order_created`

---

## Client-Side Checkout Flow

The checkout flow is identical regardless of provider:

```tsx
// src/components/billing/checkout-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CheckoutButtonProps {
  priceId: string;
  label?: string;
}

export function CheckoutButton({ priceId, label = '> SUBSCRIBE' }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error('Checkout error:', error);
        return;
      }

      // Redirect to provider's checkout page
      window.location.href = url;
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? 'LOADING...' : label}
    </Button>
  );
}
```

---

## Unified Checkout API

The checkout API routes to the correct provider:

```typescript
// src/app/api/checkout/route.ts
import { auth } from '@/lib/auth';
import { env } from '@/lib/env';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { priceId } = await request.json();
  const provider = env.PAYMENT_PROVIDER;

  // Route to provider-specific handler
  switch (provider) {
    case 'stripe':
      return handleStripeCheckout(session.user, priceId);
    case 'polar':
      return handlePolarCheckout(session.user, priceId);
    case 'lemonsqueezy':
      return handleLemonsqueezyCheckout(session.user, priceId);
    default:
      return NextResponse.json(
        { error: 'Invalid payment provider' },
        { status: 500 }
      );
  }
}
```

---

## Stripe Checkout Implementation

```typescript
// src/lib/payments/stripe.ts
import Stripe from 'stripe';
import { env } from '@/lib/env';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function createStripeCheckout(
  user: { id: string; email: string },
  priceId: string
) {
  // Find or create customer
  const customers = await stripe.customers.list({
    email: user.email,
    limit: 1,
  });

  let customerId = customers.data[0]?.id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: { userId: user.id },
  });

  return { url: session.url };
}
```

---

## Webhook Handling

### Stripe Webhook

```typescript
// src/app/api/stripe/webhook/route.ts
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return new Response('Webhook Error', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      await updateSubscription(subscription);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await cancelSubscription(subscription.id);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      await handlePaymentFailed(invoice);
      break;
    }
  }

  return new Response('OK', { status: 200 });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId) return;

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  await prisma.subscription.create({
    data: {
      id: subscription.id,
      userId,
      provider: 'stripe',
      providerCustomerId: session.customer as string,
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

async function updateSubscription(subscription: Stripe.Subscription) {
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

async function cancelSubscription(subscriptionId: string) {
  await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { status: 'canceled' },
  });
}
```

---

## Provider-Agnostic Database Schema

The subscription schema works with all providers:

```prisma
// prisma/schema.prisma
model Subscription {
  id                 String   @id
  userId             String
  provider           String   // 'stripe', 'polar', 'lemonsqueezy'
  providerCustomerId String
  status             String   // 'active', 'canceled', 'past_due', etc.
  priceId            String   // Provider-specific price/variant ID
  currentPeriodEnd   DateTime
  cancelAtPeriodEnd  Boolean  @default(false)
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  user User @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([provider, providerCustomerId])
}
```

---

## Checking Subscription Status

```typescript
// src/lib/subscription.ts
import { prisma } from '@/lib/prisma';

export async function getUserSubscription(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: { in: ['active', 'trialing'] },
    },
  });

  return subscription;
}

export async function isUserSubscribed(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return !!subscription;
}

export async function getSubscriptionTier(userId: string): Promise<string> {
  const subscription = await getUserSubscription(userId);

  if (!subscription) return 'free';

  // Map price IDs to tier names
  const tierMap: Record<string, string> = {
    [process.env.STRIPE_PRICE_MONTHLY!]: 'pro',
    [process.env.STRIPE_PRICE_YEARLY!]: 'pro',
    // Add other provider mappings
  };

  return tierMap[subscription.priceId] || 'pro';
}
```

---

## Feature Gating

```tsx
// src/components/billing/feature-gate.tsx
'use client';

import { useSubscription } from '@/hooks/use-subscription';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FeatureGateProps {
  children: React.ReactNode;
  requiredTier: string;
}

export function FeatureGate({ children, requiredTier }: FeatureGateProps) {
  const { tier, loading } = useSubscription();

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  const tierHierarchy = ['free', 'pro', 'enterprise'];
  const userTierIndex = tierHierarchy.indexOf(tier);
  const requiredTierIndex = tierHierarchy.indexOf(requiredTier);

  if (userTierIndex < requiredTierIndex) {
    return (
      <Card className="border border-border p-6 text-center">
        <p className="font-mono text-sm text-muted-foreground mb-4">
          This feature requires {requiredTier.toUpperCase()} plan
        </p>
        <Link href="/pricing">
          <Button>> UPGRADE</Button>
        </Link>
      </Card>
    );
  }

  return <>{children}</>;
}
```

---

## Customer Portal

### Stripe Customer Portal

```typescript
// src/app/api/billing/portal/route.ts
import Stripe from 'stripe';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const subscription = await prisma.subscription.findFirst({
    where: { userId: session.user.id, provider: 'stripe' },
  });

  if (!subscription) {
    return Response.json({ error: 'No subscription found' }, { status: 404 });
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.providerCustomerId,
    return_url: `${env.NEXT_PUBLIC_APP_URL}/billing`,
  });

  return Response.json({ url: portalSession.url });
}
```

---

## Switching Providers

To switch from one provider to another:

1. **Update Environment Variables**
   ```bash
   # Change this line
   PAYMENT_PROVIDER=polar  # was 'stripe'

   # Add new provider credentials
   POLAR_ACCESS_TOKEN=...
   ```

2. **Update Webhook URLs** in new provider's dashboard

3. **Create Products** in new provider matching your pricing

4. **Migrate Existing Subscriptions** (optional)
   - Export customer data from old provider
   - Create customers in new provider
   - Offer transition period for existing subscribers

5. **Deploy** - No code changes needed

---

## Testing Webhooks Locally

Use provider CLIs to forward webhooks during development:

### Stripe

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Polar

```bash
# Use ngrok or similar for local webhook testing
ngrok http 3000

# Add ngrok URL to Polar webhook settings
```

---

## Best Practices

1. **Always verify webhook signatures** - Never trust unverified webhooks
2. **Make webhooks idempotent** - Handle duplicate events gracefully
3. **Log all payment events** - For debugging and auditing
4. **Test in sandbox/test mode** - Never test with real payments
5. **Handle failures gracefully** - Show clear error messages to users
6. **Monitor webhook delivery** - Set up alerts for failed webhooks

---

## Troubleshooting

### "Webhook signature verification failed"

- Ensure you're using the correct webhook secret
- Check that you're reading the raw body (not parsed JSON)
- Verify the webhook is from the correct environment (test vs live)

### Subscription not updating

- Check webhook logs in provider dashboard
- Verify all required events are subscribed
- Check database for constraint violations

### Checkout redirects to error

- Verify price/product IDs are correct
- Check that customer creation succeeds
- Review server logs for detailed errors

---

## Next Steps

1. **Set up your preferred provider** - Start with one, add others later
2. **Create your products** - Define pricing tiers in provider dashboard
3. **Test the full flow** - Checkout, webhook, portal
4. **Deploy** - Configure production webhooks

Payment flexibility from day one. Switch providers without rewriting code.
