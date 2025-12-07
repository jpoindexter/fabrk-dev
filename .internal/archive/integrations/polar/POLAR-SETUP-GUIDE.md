# Polar.sh Integration Setup Guide

## Overview
Your Fabrk boilerplate now has complete Polar.sh integration for one-shot sales. Here's how to complete the setup.

## Step 1: Create Organization Access Token

1. Go to https://polar.sh/settings
2. Click "Create Organization Access Token"
3. Name it: "Fabrk Production"
4. **Select these scopes (minimum required):**
   - ✅ `products:read` - Read product information
   - ✅ `products:write` - Create/update products
   - ✅ `checkouts:read` - Read checkout sessions
   - ✅ `checkouts:write` - Create checkout sessions
   - ✅ `customers:read` - Read customer information
   - ✅ `orders:read` - Read order information
   - ✅ `files:read` - Read uploaded files (for ZIP)
   - ✅ `files:write` - Upload files (for ZIP)
   - ✅ `webhooks:read` - Read webhook config
   - ✅ `webhooks:write` - Manage webhooks

5. Copy the token (starts with `polar_at_...`)

## Step 2: Create Product in Polar.sh

1. Go to https://polar.sh/dashboard
2. Click "Products" → "Create Product"
3. Configure:
   - **Name:** Fabrk - Enterprise Next.js 15 SaaS Boilerplate
   - **Type:** Digital Product
   - **Price:** $199 (one-time)
   - **Description:** Use the short description from POLAR-PRODUCT-DESCRIPTION.md
   - **File:** Upload your distribution ZIP (run `git archive` to create it)

4. **Create distribution ZIP:**
   ```bash
   # From project root
   git archive --format=zip --output=fabrk-v1.0.0.zip HEAD
   ```

5. **Upload the ZIP** to Polar.sh product
6. **Copy the Product ID** (shown after creation, format: `prod_...`)

## Step 3: Configure Webhook

1. In Polar.sh dashboard, go to "Webhooks"
2. Click "Create Webhook"
3. **URL:** `https://your-domain.com/api/webhooks/polar`
   - For testing: Use ngrok or similar to expose localhost
   - Example: `https://abc123.ngrok.io/api/webhooks/polar`
4. **Events to subscribe:**
   - ✅ `order.created`
   - ✅ `checkout.completed`
5. **Copy the Webhook Secret** (shown after creation)

## Step 4: Add Environment Variables

Add to your `.env.local`:

```bash
# Polar.sh Configuration
POLAR_ACCESS_TOKEN="polar_at_your_token_here"
POLAR_WEBHOOK_SECRET="whsec_your_secret_here"
NEXT_PUBLIC_POLAR_PRODUCT_ID="prod_your_product_id_here"
```

## Step 5: Test the Integration

### Local Testing Setup

1. **Start your Next.js app:**
   ```bash
   npm run dev
   ```

2. **Expose localhost with ngrok (for webhook testing):**
   ```bash
   ngrok http 3000
   ```

3. **Update webhook URL in Polar.sh** to your ngrok URL

### Test Checkout Flow

1. Add the checkout button to your landing page (`src/app/page.tsx`):
   ```typescript
   import { PolarCheckoutButton } from '@/components/polar/checkout-button'

   // In your pricing section or hero
   <PolarCheckoutButton />
   ```

2. Click the button in your browser
3. You should redirect to Polar.sh checkout
4. Use Polar.sh test mode to complete a test purchase
5. After payment, you should:
   - Redirect to `/purchase/success`
   - Receive webhook at `/api/webhooks/polar` (check logs)

### Verify Webhook Delivery

Check your terminal logs for:
```
Polar webhook event: { type: 'checkout.completed' }
Polar checkout completed: { checkoutId: '...', customerEmail: '...' }
```

## Step 6: Customize Success Page

Edit `src/app/purchase/success/page.tsx` to match your branding and include:
- Download instructions
- Setup guide link
- Support contact
- Community links

## Step 7: Add Custom Logic

The webhook handlers have TODO comments for custom logic:

**`src/app/api/webhooks/polar/route.ts`:**
- Line 81-85: Handle `order.created` event
  - Send confirmation email
  - Add to CRM
  - Track analytics

- Line 91-101: Handle `checkout.completed` event
  - Grant product access
  - Send welcome email
  - Track conversion

## Production Checklist

Before going live:

- [ ] Replace ngrok URL with your production domain
- [ ] Set `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Update webhook URL in Polar.sh to production
- [ ] Test full checkout flow in production
- [ ] Verify webhook signature validation works
- [ ] Set up email notifications for orders
- [ ] Add order tracking/analytics
- [ ] Test ZIP download delivery
- [ ] Verify success page redirects correctly

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is correct and publicly accessible
2. Verify webhook secret matches `.env.local`
3. Check Polar.sh webhook logs for delivery attempts
4. Check your app logs for signature verification errors

### Checkout Button Not Working

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_POLAR_PRODUCT_ID` is set
3. Check API route logs at `/api/polar/checkout`
4. Verify `POLAR_ACCESS_TOKEN` has correct scopes

### 401 Unauthorized from Polar.sh API

1. Verify access token is valid and not expired
2. Check token has required scopes (see Step 1)
3. Regenerate token if necessary

## Files Created

Your Polar.sh integration includes:

```
src/
├── lib/
│   └── polar.ts                           # SDK client + helpers
├── app/
│   ├── api/
│   │   ├── polar/
│   │   │   └── checkout/
│   │   │       └── route.ts               # Checkout API
│   │   └── webhooks/
│   │       └── polar/
│   │           └── route.ts               # Webhook handler
│   └── purchase/
│       └── success/
│           └── page.tsx                   # Success page
└── components/
    └── polar/
        └── checkout-button.tsx            # Reusable button
```

## Next Steps

1. Complete Steps 1-4 above to configure environment
2. Test locally with ngrok
3. Add checkout button to your landing page
4. Customize success page and webhook handlers
5. Deploy to production
6. Update webhook URL to production domain

## Support

If you encounter issues:
- Check Polar.sh documentation: https://polar.sh/docs
- Review webhook logs in Polar.sh dashboard
- Check your application logs for errors
- Verify environment variables are set correctly

---

**Integration Status:** ✅ Code Complete - Ready for Configuration
**Last Updated:** November 26, 2025
