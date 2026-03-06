# Add a Payment Provider

FABRK supports three payment providers with identical patterns. Configure one or all of them.

---

## How the Multi-Provider Pattern Works

Each provider follows the same structure:

```
src/
  lib/{provider}.ts            # Client init + helper functions
  app/api/{provider}/
    checkout/route.ts          # Create checkout session
    webhook/route.ts           # Handle post-payment events
```

The boilerplate auto-detects which providers are configured based on environment variables. If a provider's keys are not set, its API routes return 404.

---

## Stripe

### 1. Get Your Keys

1. Go to [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy the **Secret key** and **Publishable key**

### 2. Create a Product

1. Stripe Dashboard > Products > Add Product
2. Set name, description, price
3. Copy the **Price ID** (starts with `price_`) or set a **Lookup Key**

### 3. Set Environment Variables

```bash
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PRICE_FABRK="price_1ABC..."  # or lookup key like "fabrk_purchase"
```

### 4. Set Up Webhook

1. Stripe Dashboard > Webhooks > Add Endpoint
2. URL: `https://yourdomain.com/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy signing secret:

```bash
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 5. Test Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret from CLI output
# Use test card: 4242 4242 4242 4242
```

### Key Files

- `src/lib/stripe.ts` -- Stripe client and helpers
- `src/config/stripe.ts` -- Product/price configuration
- `src/app/api/stripe/checkout/route.ts` -- Creates checkout sessions
- `src/app/api/stripe/webhook/route.ts` -- Handles Stripe events
- `src/app/api/stripe/portal/route.ts` -- Customer billing portal

---

## Polar

### 1. Get Your Access Token

1. Go to [polar.sh/settings](https://polar.sh/settings) > Developer Settings
2. Create an organization access token with scopes: `products:*`, `checkouts:*`, `customers:read`, `orders:read`, `webhooks:*`

### 2. Create a Product

1. Polar Dashboard > Products > Create
2. Copy the **Product ID**

### 3. Set Environment Variables

```bash
POLAR_ACCESS_TOKEN="polar_..."
NEXT_PUBLIC_POLAR_PRODUCT_ID="your-product-id"
NEXT_PUBLIC_POLAR_DISCOUNT_ID=""  # optional discount
```

### 4. Set Up Webhook

1. Polar Dashboard > Settings > Webhooks > Create
2. URL: `https://yourdomain.com/api/polar/webhook`
3. Copy signing secret:

```bash
POLAR_WEBHOOK_SECRET="..."
```

### 5. Test Locally

Polar uses a sandbox server in development automatically:

```ts
// From src/lib/polar.ts -- already configured
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: process.env.NODE_ENV === 'development' ? ServerSandbox : undefined,
});
```

### Key Files

- `src/lib/polar.ts` -- Polar client, checkout session creation
- `src/app/api/polar/checkout/route.ts` -- Creates checkout
- `src/app/api/polar/webhook/route.ts` -- Handles order events

---

## Lemon Squeezy

### 1. Get Your API Key

1. Go to [app.lemonsqueezy.com/settings/api](https://app.lemonsqueezy.com/settings/api)
2. Create an API key

### 2. Create a Product

1. Lemon Squeezy Dashboard > Products > Create
2. Add variants (pricing tiers)
3. Copy your **Store ID** from store settings

### 3. Set Environment Variables

```bash
LEMONSQUEEZY_API_KEY="..."
LEMONSQUEEZY_STORE_ID="..."
```

### 4. Set Up Webhook

1. Lemon Squeezy > Settings > Webhooks > Create
2. URL: `https://yourdomain.com/api/lemonsqueezy/webhook`
3. Events: `order_created`, `subscription_created`, `subscription_updated`
4. Copy signing secret:

```bash
LEMONSQUEEZY_WEBHOOK_SECRET="..."
```

### Key Files

- `src/lib/lemonsqueezy.ts` -- Client and checkout helpers
- `src/app/api/lemonsqueezy/checkout/route.ts` -- Creates checkout
- `src/app/api/lemonsqueezy/webhook/route.ts` -- Handles events

---

## Testing Payments Locally

### General Setup

1. Set up your provider keys in `.env.local`
2. Run `npm run dev`
3. Use the provider's test/sandbox mode

### Stripe-Specific

```bash
# Terminal 1: Run dev server
npm run dev

# Terminal 2: Forward Stripe webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, any ZIP code.

### Validate Webhooks

```bash
npm run validate:webhooks
```

This checks that all webhook endpoints are reachable and correctly configured.

---

## Switching Providers

The billing components in `src/components/billing/` detect which provider is configured and render the appropriate checkout button. To switch providers, change your environment variables -- no code changes needed.

If you want to force a specific provider, check the feature flags in `src/config/app.ts`:

```ts
features: {
  subscriptions: true,
  oneTimePurchases: true,
  trialPeriod: true,
  trialDays: 14,
},
```
