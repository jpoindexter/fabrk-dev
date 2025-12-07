# Polar.sh Production Checklist

## Current Status: ✅ CONFIGURED

Your Polar.sh integration is already set up:
- Access Token: ✅ Configured
- Webhook Secret: ✅ Configured
- Product ID: ✅ Configured

---

## Pre-Launch Verification

### 1. Verify Product in Polar Dashboard

1. Go to [Polar Dashboard](https://polar.sh/dashboard)
2. Navigate to **Products**
3. Verify your product:
   - [ ] Name is correct (Fabrk)
   - [ ] Price is correct ($199)
   - [ ] Description is accurate
   - [ ] Product is **published** (not draft)

### 2. Test Checkout Flow

1. Visit your site's pricing page
2. Click the purchase button
3. Complete a test purchase (use a test card if available, or refund immediately)
4. Verify:
   - [ ] Checkout redirects to Polar
   - [ ] Payment completes successfully
   - [ ] Webhook fires (check server logs)
   - [ ] Customer receives confirmation email
   - [ ] Access is granted (GitHub repo invite, download link, etc.)

### 3. Webhook Verification

Your webhook endpoint: `https://yourdomain.com/api/webhooks/polar` (or `/api/polar/webhook`)

Check that these events are configured in Polar:
- [ ] `checkout.created`
- [ ] `checkout.updated`
- [ ] `order.created`
- [ ] `subscription.created` (if using subscriptions)

### 4. Production Domain Update

Update these in your production environment (Vercel):

```env
NEXT_PUBLIC_APP_URL=https://fabrk.dev
NEXT_PUBLIC_SITE_DOMAIN=fabrk.dev
NEXTAUTH_URL=https://fabrk.dev
```

---

## Polar Dashboard Checklist

- [ ] Organization profile complete (logo, description)
- [ ] Payout method configured (Stripe Connect or bank)
- [ ] Tax settings configured (if applicable)
- [ ] Product thumbnail uploaded
- [ ] Product description finalized
- [ ] Checkout success/cancel URLs set

---

## Post-Purchase Flow

Verify what happens after a customer pays:

1. **Email Confirmation** - Customer receives receipt
2. **Access Delivery** - One of these:
   - [ ] GitHub repo access (via `GITHUB_ACCESS_TOKEN`)
   - [ ] Download link email
   - [ ] License key generation
   - [ ] Dashboard access

### GitHub Access (if using)

Your GitHub config:
```env
GITHUB_ACCESS_TOKEN=ghp___FILL_ME__  # ⚠️ NEEDS SETUP
GITHUB_REPO_OWNER=jpoindexter
GITHUB_REPO_NAME=fabrk-boilerplate
```

**To set up GitHub access automation:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` and `admin:repo_hook` scopes
3. Add to environment as `GITHUB_ACCESS_TOKEN`

---

## Launch Day Monitoring

### Polar Dashboard
- Monitor sales in real-time
- Check for failed payments
- Verify webhook delivery

### Your Server Logs
- Watch for webhook errors
- Check for access delivery issues
- Monitor error rates

---

## Common Issues

### Checkout Not Loading
- Check `NEXT_PUBLIC_POLAR_PRODUCT_ID` is correct
- Verify product is published in Polar

### Webhook Not Firing
- Check webhook URL is correct in Polar dashboard
- Verify `POLAR_WEBHOOK_SECRET` matches
- Check server logs for 4xx/5xx errors

### Customer Didn't Get Access
- Check webhook logs in Polar dashboard
- Verify your webhook handler is processing correctly
- Manual fulfillment: Add customer to GitHub repo manually

---

## Support Resources

- **Polar Docs:** https://docs.polar.sh
- **Polar Discord:** https://discord.gg/polar
- **Polar Status:** https://status.polar.sh

---

*Your Polar integration is ready for launch!*
