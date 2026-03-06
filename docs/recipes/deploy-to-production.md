# Deploy to Production

Get your FABRK app live on Vercel with a database, payments, and custom domain.

---

## 1. Vercel Setup

### Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `prisma generate && next build` (configured in `vercel.json`)
5. Output directory: leave default

### Environment Variables

Set these in Vercel Dashboard > Settings > Environment Variables:

**Required:**

```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://yourdomain.com"
AUTH_TRUST_HOST="true"

# App URL
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_API_URL="https://yourdomain.com/api"
NEXT_PUBLIC_SITE_DOMAIN="yourdomain.com"
```

**Payments (at least one provider):**

```bash
# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXT_PUBLIC_STRIPE_PRICE_FABRK="fabrk_purchase"

# OR Polar
POLAR_ACCESS_TOKEN="polar_..."
POLAR_WEBHOOK_SECRET="..."
NEXT_PUBLIC_POLAR_PRODUCT_ID="..."

# OR Lemon Squeezy
LEMONSQUEEZY_API_KEY="..."
LEMONSQUEEZY_STORE_ID="..."
LEMONSQUEEZY_WEBHOOK_SECRET="..."
```

**Email:**

```bash
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@mail.yourdomain.com"
CONTACT_FORM_EMAIL="support@yourdomain.com"
```

**Optional (recommended):**

```bash
# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Redis (for rate limiting)
KV_REST_API_URL="..."
KV_REST_API_TOKEN="..."

# Error tracking
NEXT_PUBLIC_SENTRY_DSN="..."
```

## 2. Database Setup

### Option A: Vercel Postgres (easiest)

1. Vercel Dashboard > Storage > Create Database > Postgres
2. Link to your project -- env vars auto-populate
3. Run initial migration:

```bash
npx prisma db push
```

### Option B: External Provider (Supabase, Neon, Railway)

1. Create a PostgreSQL database with your provider
2. Copy the connection string
3. Set `DATABASE_URL` in Vercel env vars
4. If your provider gives a pooled + direct URL, also set `DATABASE_URL_DIRECT`

## 3. Payment Provider Configuration

### Stripe

1. Switch to **Live mode** in [Stripe Dashboard](https://dashboard.stripe.com)
2. Create your product and price
3. Copy the price lookup key or price ID to `NEXT_PUBLIC_STRIPE_PRICE_FABRK`
4. Set up webhook:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
5. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### Polar

1. Get access token from [polar.sh/settings](https://polar.sh/settings) > Developer Settings
2. Create your product in Polar Dashboard
3. Set up webhook:
   - URL: `https://yourdomain.com/api/polar/webhook`
   - Copy signing secret to `POLAR_WEBHOOK_SECRET`

### Lemon Squeezy

1. Get API key from [app.lemonsqueezy.com/settings/api](https://app.lemonsqueezy.com/settings/api)
2. Create webhook:
   - URL: `https://yourdomain.com/api/lemonsqueezy/webhook`
   - Events: `order_created`, `subscription_created`, `subscription_updated`

## 4. Domain and DNS

1. Vercel Dashboard > Settings > Domains
2. Add your domain
3. Set DNS records as shown by Vercel (typically an A record or CNAME)
4. Wait for SSL certificate (automatic, usually under 5 minutes)
5. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to use your domain

### Email DNS (for Resend)

If sending from your domain, add these DNS records in Resend Dashboard:

- SPF record (TXT)
- DKIM record (CNAME)
- Return-path (CNAME)

## 5. Post-Deployment Checklist

```bash
# Validate the build locally first
npm run ai:pre-deploy
```

After deploying:

- [ ] Landing page loads at your domain
- [ ] Login/registration works
- [ ] Google OAuth redirects correctly (update callback URL in Google Console)
- [ ] Payment checkout completes (make a test purchase)
- [ ] Webhook endpoint responds (check Stripe/Polar dashboard for delivery status)
- [ ] Emails send (test password reset or contact form)
- [ ] `https://yourdomain.com/api/health` returns 200
- [ ] OG image shows correctly (test at [opengraph.xyz](https://opengraph.xyz))
- [ ] NEXTAUTH_URL matches your actual domain (auth will break if mismatched)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on Vercel | Check `npm run build` locally first. Run `npx prisma generate` before build. |
| Auth redirect loop | Verify `NEXTAUTH_URL` matches your actual domain exactly. Ensure `AUTH_TRUST_HOST=true`. |
| Stripe webhook 400 | Verify `STRIPE_WEBHOOK_SECRET` matches the secret shown in Stripe webhook settings (not the API key). |
| Database connection refused | Check `DATABASE_URL` includes `?sslmode=require` for remote databases. |
| Emails not sending | Verify domain DNS records in Resend. Check `EMAIL_FROM` uses a verified domain. |
