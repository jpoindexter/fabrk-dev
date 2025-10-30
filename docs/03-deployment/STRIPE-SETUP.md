# Stripe Setup Guide

Complete guide to configuring Stripe for payments and subscriptions.

---

## Overview

This guide covers:
1. Creating a Stripe account
2. Setting up API keys
3. Creating products and prices
4. Configuring webhooks
5. Testing payments
6. Going live

**Time estimate:** 30-40 minutes

---

## Prerequisites

- [ ] Stripe account ([Sign up](https://stripe.com))
- [ ] Business details ready (name, email, etc.)
- [ ] Bank account for payouts (optional for testing)

---

## Step 1: Create Stripe Account (5 minutes)

### Sign Up

1. Go to [stripe.com](https://stripe.com)
2. Click "Sign up"
3. Enter email and password
4. Verify email

### Complete Profile

1. Business name
2. Country
3. Business type (Individual, Company, etc.)
4. Industry

**For testing:** You can skip verification initially. Stripe starts in test mode.

---

## Step 2: Get API Keys (2 minutes)

### Access API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click "Developers" in top right
3. Click "API keys" in sidebar

### Copy Keys

You'll see 4 keys:

#### Publishable Key (Test)
```
pk_test_51Abc123...
```
- Safe to expose in browser
- Used in frontend code
- Copy to `.env.local`:
  ```env
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51Abc123..."
  ```

#### Secret Key (Test)
```
sk_test_51Abc123...
```
- **NEVER expose publicly**
- Used in backend code
- Copy to `.env.local`:
  ```env
  STRIPE_SECRET_KEY="sk_test_51Abc123..."
  ```

**Note:** Test mode keys start with `pk_test_` or `sk_test_`

---

## Step 3: Create Products (10 minutes)

### Understanding Products vs Prices

- **Product:** What you're selling (e.g., "Pro Plan")
- **Price:** How much it costs (e.g., "$99/month")

One product can have multiple prices (monthly/yearly, different currencies).

### Create Your Products

1. Go to [Products](https://dashboard.stripe.com/test/products)
2. Click "Add product"

#### Product 1: Starter

```
Name: Starter Plan
Description: Essential components for individual developers

Pricing:
- Type: One-time payment
- Price: $99
- Currency: USD

Click "Save product"
```

**Copy Product ID:**
- Starts with `prod_`
- Example: `prod_ABC123def456`
- Add to `.env.local`:
  ```env
  NEXT_PUBLIC_STRIPE_PRICE_STARTER="prod_ABC123def456"
  ```

#### Product 2: Professional

```
Name: Professional Plan
Description: Complete design system (Most Popular)

Pricing:
- Type: One-time payment
- Price: $199
- Currency: USD

Click "Save product"
```

**Copy Product ID:**
```env
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="prod_DEF456ghi789"
```

#### Product 3: Enterprise

```
Name: Enterprise Plan
Description: Advanced team features

Pricing:
- Type: One-time payment
- Price: $499
- Currency: USD

Click "Save product"
```

**Copy Product ID:**
```env
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="prod_GHI789jkl012"
```

### Alternative: Subscriptions

If you want recurring payments:

```
Pricing:
- Type: Recurring
- Billing period: Monthly (or Yearly)
- Price: $99/month
- Currency: USD
```

**For subscriptions:** Use Price ID (starts with `price_`) instead of Product ID.

---

## Step 4: Configure Webhooks (10 minutes)

Webhooks notify your app when payments succeed, fail, or subscriptions change.

### Local Development Webhooks

1. **Install Stripe CLI:**

   **macOS:**
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

   **Windows:**
   Download from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

   **Linux:**
   ```bash
   curl -s https://packages.stripe.com/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
   echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.com/stripe-cli-debian-local stable main" | sudo tee /etc/apt/sources.list.d/stripe.list
   sudo apt update
   sudo apt install stripe
   ```

2. **Login to Stripe:**
   ```bash
   stripe login
   ```

   Follow browser prompt to authenticate.

3. **Forward webhooks:**
   ```bash
   npm run stripe:listen
   ```

   Or directly:
   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```

4. **Copy webhook secret:**

   Output shows:
   ```
   Ready! Your webhook signing secret is whsec_abc123...
   ```

   Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_abc123..."
   ```

**Keep this terminal running** while testing locally!

### Production Webhooks

After deploying to Vercel/production:

1. Go to [Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Enter endpoint URL:
   ```
   https://your-app.vercel.app/api/webhooks/stripe
   ```
4. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click "Add endpoint"
6. Copy "Signing secret" (starts with `whsec_`)
7. Add to Vercel environment variables

---

## Step 5: Test Payments (10 minutes)

### Test in Development

1. **Start servers:**
   ```bash
   # Terminal 1: Dev server
   npm run dev

   # Terminal 2: Stripe webhooks
   npm run stripe:listen
   ```

2. **Go to pricing page:**
   ```
   http://localhost:3000/pricing
   ```

3. **Click "Get Started" on any plan**

4. **Use test card:**
   ```
   Card number: 4242 4242 4242 4242
   Expiry: 12/34 (any future date)
   CVC: 123 (any 3 digits)
   ZIP: 12345 (any 5 digits)
   ```

5. **Complete checkout**

### Verify Success

**Check browser:**
- Redirects to success page
- Shows confirmation message

**Check Stripe webhook terminal:**
```
[200] POST /api/webhooks/stripe [evt_123abc]
checkout.session.completed
```

**Check Stripe Dashboard:**
- Go to [Payments](https://dashboard.stripe.com/test/payments)
- Recent payment should appear
- Status: Succeeded

**Check database:**
```bash
npm run db:studio
# Payment table → new record
# User table → tier updated
```

### Test Different Scenarios

#### Successful Payment
```
Card: 4242 4242 4242 4242
Expected: Payment succeeds immediately
```

#### 3D Secure Authentication
```
Card: 4000 0025 0000 3155
Expected: Modal appears for authentication, then succeeds
```

#### Declined - Insufficient Funds
```
Card: 4000 0000 0000 9995
Expected: Payment fails with "insufficient funds"
```

#### Declined - Generic
```
Card: 4000 0000 0000 0002
Expected: Payment fails with "card declined"
```

More test cards: [stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## Step 6: Go Live (Production)

### Activate Your Account

Before accepting real payments:

1. Go to [Activate Account](https://dashboard.stripe.com/settings/account)
2. Complete business details:
   - Business description
   - Website URL
   - Phone number
3. Add bank account for payouts
4. Verify identity (may require documents)

**Processing time:** Usually instant, sometimes 1-2 business days

### Get Live API Keys

1. Toggle to "Live mode" (top right corner)
2. Go to [Developers → API keys](https://dashboard.stripe.com/apikeys)
3. Copy **Live** keys:
   ```
   pk_live_51Abc123...
   sk_live_51Abc123...
   ```

### Update Production Environment

**In Vercel Dashboard:**

1. Project Settings → Environment Variables
2. Update these variables:
   ```env
   STRIPE_SECRET_KEY=sk_live_51Abc123...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51Abc123...
   ```
3. Redeploy

### Create Live Products

Products created in test mode **don't** carry over to live mode.

**Create products again in Live mode:**

1. Toggle to "Live mode"
2. Go to [Products](https://dashboard.stripe.com/products)
3. Recreate your 3 products (Starter, Professional, Enterprise)
4. Copy **Live** Product IDs
5. Update in Vercel:
   ```env
   NEXT_PUBLIC_STRIPE_PRICE_STARTER=prod_LiveABC123...
   NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=prod_LiveDEF456...
   NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=prod_LiveGHI789...
   ```

### Set Up Live Webhooks

1. Toggle to "Live mode"
2. Go to [Webhooks](https://dashboard.stripe.com/webhooks)
3. Click "Add endpoint"
4. Enter: `https://your-app.vercel.app/api/webhooks/stripe`
5. Select same events as test mode
6. Copy **Live** signing secret
7. Update in Vercel:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_LiveSecret...
   ```

### Test with Real Card

**Important:** Test with small amount first!

1. Go to your live site
2. Make test purchase ($1-5)
3. Verify payment succeeds
4. Check Stripe Dashboard (Live mode)
5. Refund if needed: Dashboard → Payments → Refund

---

## Configuration Summary

### Environment Variables Checklist

**For development (`.env.local`):**
```env
STRIPE_SECRET_KEY="sk_test_51..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51..."
STRIPE_WEBHOOK_SECRET="whsec_..." # From stripe listen
NEXT_PUBLIC_STRIPE_PRICE_STARTER="prod_..."
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="prod_..."
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="prod_..."
```

**For production (Vercel):**
```env
STRIPE_SECRET_KEY="sk_live_51..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_51..."
STRIPE_WEBHOOK_SECRET="whsec_..." # From Stripe Dashboard webhook
NEXT_PUBLIC_STRIPE_PRICE_STARTER="prod_..." # Live product
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="prod_..." # Live product
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="prod_..." # Live product
```

---

## Advanced Configuration

### Custom Checkout

Customize Stripe Checkout appearance:

1. Go to [Branding](https://dashboard.stripe.com/settings/branding)
2. Upload logo
3. Set brand color
4. Choose button text

**Or in code:**

```typescript
const session = await stripe.checkout.sessions.create({
  // ...
  custom_text: {
    submit: {
      message: 'Get instant access',
    },
  },
  allow_promotion_codes: true, // Enable discount codes
})
```

### Promotion Codes

Create discount codes:

1. Go to [Coupons](https://dashboard.stripe.com/test/coupons)
2. Click "Create coupon"
3. Set discount (e.g., 20% off)
4. Create promotion code (e.g., "LAUNCH20")
5. Share with customers

**Enable in checkout:**

Already enabled in code! Customers can enter codes at checkout.

### Tax Collection

Automatic tax calculation:

1. Go to [Tax Settings](https://dashboard.stripe.com/settings/tax)
2. Enable Stripe Tax
3. Add tax registrations
4. Stripe automatically calculates and collects tax

**Update code:**

```typescript
const session = await stripe.checkout.sessions.create({
  // ...
  automatic_tax: { enabled: true },
})
```

### Multiple Currencies

Support international customers:

**Create prices in multiple currencies:**

1. Edit product
2. Add price: €99 EUR
3. Add price: £89 GBP
4. Stripe shows correct price based on customer location

### Subscriptions (If Using Recurring)

**Enable Customer Portal:**

1. Go to [Customer Portal](https://dashboard.stripe.com/settings/billing/portal)
2. Enable features:
   - Cancel subscription
   - Update payment method
   - View invoices
3. Customize appearance
4. Save

**Add to your app:**

```typescript
const portalSession = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: 'https://yourapp.com/dashboard',
})

// Redirect user to portalSession.url
```

---

## Monitoring and Analytics

### Stripe Dashboard

**Key metrics to monitor:**

1. **Revenue** - Dashboard home
2. **Payments** - Success/failure rate
3. **Customers** - Total, new, churned
4. **Disputes** - Chargebacks (handle quickly!)

### Webhook Logs

Check webhook delivery:

1. Go to [Webhooks](https://dashboard.stripe.com/webhooks)
2. Click your endpoint
3. View "Attempts" tab
4. See status codes (200 = success)

**Failed webhooks?**
- Check endpoint is accessible
- Verify signature validation
- Review server logs

### Radar (Fraud Prevention)

Stripe Radar is automatically enabled:

- Blocks suspicious transactions
- Assigns risk scores
- No extra cost for basic features

**Review blocked payments:**
1. Go to [Radar](https://dashboard.stripe.com/radar/overview)
2. Check "Needs review"
3. Approve/decline manually

---

## Troubleshooting

### "Invalid API Key"

**Check:**
- [ ] Key copied completely (starts with `sk_test_` or `sk_live_`)
- [ ] No extra spaces
- [ ] Using test key for development, live key for production
- [ ] Key not expired/revoked

**Fix:** Regenerate key in Stripe Dashboard

### "No such price"

**Check:**
- [ ] Product ID is correct (starts with `prod_`)
- [ ] Using test product ID in test mode, live in live mode
- [ ] Product not deleted in Stripe Dashboard

**Fix:** Verify product exists in Stripe Dashboard

### "Webhook signature verification failed"

**Check:**
- [ ] `STRIPE_WEBHOOK_SECRET` matches webhook endpoint
- [ ] Using test secret for local, live secret for production
- [ ] Webhook secret not expired

**Fix:** Get new secret:
- **Local:** Restart `stripe listen`, copy new secret
- **Production:** Regenerate webhook endpoint

### Webhook Not Firing

**Check:**
- [ ] Endpoint URL is correct and accessible
- [ ] Webhook endpoint returns 200 status
- [ ] Selected events in Stripe Dashboard
- [ ] Firewall not blocking Stripe IPs

**Test manually:**
```bash
stripe trigger checkout.session.completed
```

### Payment Stuck in "Processing"

**Possible causes:**
- Webhook failed to process
- Database connection error
- Code error in webhook handler

**Fix:**
1. Check server logs
2. Manually process in database
3. Refund and retry

---

## Security Best Practices

### 1. Never Expose Secret Key

```typescript
// ✅ Good - Server-side only
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// ❌ Bad - Never in browser
const stripe = Stripe('sk_test_...') // Never do this!
```

### 2. Always Verify Webhooks

```typescript
// ✅ Good
const sig = request.headers.get('stripe-signature')!
const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)

// ❌ Bad - Never trust webhook without verification
const event = JSON.parse(body) // Insecure!
```

### 3. Validate Amounts

```typescript
// ✅ Good - Server determines price
const price = getProductPrice(productId)
const session = await stripe.checkout.sessions.create({
  line_items: [{ price, quantity: 1 }]
})

// ❌ Bad - Client controls price
const price = request.body.price // User can manipulate!
```

### 4. Use Idempotency Keys

```typescript
await stripe.paymentIntents.create(
  { ... },
  { idempotencyKey: 'unique-key-per-request' }
)
```

Prevents duplicate charges if request retries.

### 5. Rotate API Keys

- Rotate every 90 days
- Immediately if exposed
- Use separate keys per environment

---

## Going Live Checklist

Before accepting real payments:

- [ ] Stripe account activated
- [ ] Bank account added for payouts
- [ ] Live API keys configured
- [ ] Products created in live mode
- [ ] Live webhook endpoint configured
- [ ] Test transaction completed successfully
- [ ] Webhook logs show 200 status
- [ ] Terms of service page exists
- [ ] Privacy policy page exists
- [ ] Refund policy documented
- [ ] Customer support email set

---

## Next Steps

Stripe configured! Now:

1. **Test thoroughly** - Try different cards, amounts
2. **Monitor payments** - Check Stripe Dashboard daily
3. **Handle disputes** - Respond within 7 days
4. **Optimize conversion** - A/B test pricing
5. **Add features** - Coupons, subscriptions, trials

---

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Testing Guide](https://stripe.com/docs/testing)
- [Webhooks Reference](https://stripe.com/docs/webhooks)
- [Security Best Practices](https://stripe.com/docs/security)
- [API Reference](https://stripe.com/docs/api)

---

## Support

**Need help?**

- Stripe Support: [support.stripe.com](https://support.stripe.com)
- Community: [GitHub Discussions](https://github.com/stripe/stripe-node/discussions)
- Status: [status.stripe.com](https://status.stripe.com)

**Integration issues?**
- Check code in `/src/app/api/checkout`
- Review webhook handler in `/src/app/api/webhooks/stripe`
- Open GitHub issue with error details
