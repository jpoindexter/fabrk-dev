---
title: 'Multi-Provider Payments: Stripe, Polar, and Lemonsqueezy in One Boilerplate'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'multi-provider-payments-saas'
description: 'How Fabrk supports three payment providers with identical patterns. Choose Stripe, Polar.sh, or Lemonsqueezy without changing your codebase.'
publishedAt: '2026-02-02T10:00:00.000Z'
---

**One boilerplate, three payment providers, zero code changes.**

---

## The Payment Provider Problem

Every SaaS needs payments. But which provider?

- **Stripe** - The industry standard, but complex
- **Polar.sh** - Developer-focused, GitHub-native
- **Lemonsqueezy** - Merchant of record, handles taxes

Fabrk doesn't make you choose. It supports all three.

---

## Identical API Patterns

Each provider follows the same pattern:

| Provider | Checkout | Webhook |
|----------|----------|---------|
| Stripe | `/api/stripe/checkout` | `/api/stripe/webhook` |
| Polar | `/api/polar/checkout` | `/api/polar/webhook` |
| Lemonsqueezy | `/api/lemonsqueezy/checkout` | `/api/lemonsqueezy/webhook` |

---

## Configuration

Set your provider in `.env.local`:

```bash
# Choose your provider
PAYMENT_PROVIDER=stripe  # or 'polar' or 'lemonsqueezy'

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Polar.sh
POLAR_API_KEY=...
POLAR_WEBHOOK_SECRET=...

# Lemonsqueezy
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_WEBHOOK_SECRET=...
```

---

## Checkout Flow

The checkout flow is identical regardless of provider:

```tsx
// Client-side
const handleCheckout = async (priceId: string) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId }),
  });

  const { url } = await response.json();
  window.location.href = url;
};
```

The server routes to the correct provider automatically.

---

## Webhook Handling

All webhooks follow the same pattern:

1. Verify signature
2. Parse event
3. Update database
4. Return 200

```typescript
export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();

  // Verify and process
  const event = verifyWebhook(body, signature);
  await handleEvent(event);

  return new Response('OK', { status: 200 });
}
```

---

## When to Use Each

### Stripe
- Global presence
- Complex billing (metered, tiered)
- Enterprise requirements

### Polar.sh
- Developer tools
- Open source projects
- GitHub integration

### Lemonsqueezy
- Solo founders
- Global tax compliance needed
- Simple subscription models

---

## Switching Providers

To switch providers:

1. Update `PAYMENT_PROVIDER` in `.env`
2. Add provider credentials
3. Update webhook URLs in provider dashboard
4. Done

No code changes required.

---

## Database Schema

Fabrk uses a provider-agnostic schema:

```prisma
model Subscription {
  id                 String   @id
  userId             String
  provider           String   // 'stripe', 'polar', 'lemonsqueezy'
  providerCustomerId String
  status             String
  priceId            String
  currentPeriodEnd   DateTime
}
```

This allows switching providers without database migrations.

---

## Why This Matters

Payment providers change. Pricing changes. Business models evolve.

With Fabrk, you're never locked in. Start with Lemonsqueezy for simplicity, migrate to Stripe for enterprise features, or use Polar for open source monetization.

The choice is yours—and you can change your mind.

