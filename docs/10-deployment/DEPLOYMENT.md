# Deployment Guide

Deploy Fabrk to production in under 15 minutes.

---

## Quick Start (Vercel)

Fabrk is optimized for Vercel. Other platforms (Railway, Fly.io, Render) work but require more configuration.

### Prerequisites

- GitHub account with your Fabrk repo
- Vercel account ([sign up free](https://vercel.com/signup))
- Production database (Supabase, Railway, or Vercel Postgres)
- Payment provider configured (Stripe, Polar.sh, or Lemonsqueezy)

---

## Step 1: Deploy to Vercel

```bash
# Option A: CLI
vercel

# Option B: Dashboard
# Go to vercel.com/new → Import your GitHub repo
```

---

## Step 2: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

### Required

```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Auth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"  # Min 32 chars

# App URLs
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Payments (choose one)

**Stripe:**
```bash
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

**Polar.sh:**
```bash
POLAR_ACCESS_TOKEN="polar_..."
POLAR_WEBHOOK_SECRET="polar_whs_..."
NEXT_PUBLIC_POLAR_PRODUCT_ID="your-product-id"
```

**Lemonsqueezy:**
```bash
LEMONSQUEEZY_API_KEY="..."
LEMONSQUEEZY_WEBHOOK_SECRET="..."
```

### Email

```bash
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"
```

### Optional

```bash
# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Rate limiting (recommended)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# Error tracking
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
```

---

## Step 3: Setup Database

### Option A: Supabase (Recommended - Free 500MB)

1. Go to [database.new](https://database.new)
2. Create project → Wait 2-3 minutes
3. Settings → Database → Copy Connection String (Session mode)

### Option B: Railway

1. [railway.app](https://railway.app/) → New Project → PostgreSQL
2. Copy `DATABASE_URL` from Variables tab

### Option C: Vercel Postgres

1. Vercel Dashboard → Storage → Create Database → Postgres
2. Connection string auto-added to env vars

---

## Step 4: Configure Webhooks

### Stripe

1. [dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks) → Add endpoint
2. URL: `https://yourdomain.com/api/stripe/webhook`
3. Events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy signing secret → Add as `STRIPE_WEBHOOK_SECRET` in Vercel

### Polar.sh

1. Polar Dashboard → Settings → Webhooks → Add webhook
2. URL: `https://yourdomain.com/api/polar/webhook`
3. Select all events (or: `order.created`, `checkout.created`)
4. Copy secret → Add as `POLAR_WEBHOOK_SECRET` in Vercel

---

## Step 5: Custom Domain

1. Vercel → Settings → Domains → Add domain
2. Add DNS records (Vercel shows instructions):
   ```
   A     @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```
3. Wait 5-60 minutes for SSL certificate

After domain is active, update:
- `NEXTAUTH_URL=https://yourdomain.com`
- `NEXT_PUBLIC_APP_URL=https://yourdomain.com`

---

## Step 6: Verify Deployment

### Quick Test (5 minutes)

- [ ] Homepage loads
- [ ] Sign up works
- [ ] Login works
- [ ] Checkout opens (test purchase)
- [ ] Webhook fires (check Stripe/Polar dashboard)

### Full Test

```bash
# Health check
curl https://yourdomain.com/api/health

# Run Lighthouse
npx lighthouse https://yourdomain.com --view
```

---

## Troubleshooting

### Build fails

```bash
# Check locally first
npm run type-check
npm run build
```

Common causes:
- TypeScript errors
- Missing env vars (check `.env.example`)
- Prisma not generated (add `prisma generate` to build command)

### Database connection fails

- Verify `DATABASE_URL` is correct in Vercel
- Check database is running (provider dashboard)
- Ensure SSL is enabled (default for Supabase/Railway)

### Webhooks not working

- Verify URL is exactly: `https://yourdomain.com/api/stripe/webhook`
- Check webhook secret matches
- View failed deliveries in Stripe/Polar dashboard

### Environment variable not found

- Variables must be set for **Production** environment
- Redeploy after adding new variables
- `NEXT_PUBLIC_*` vars are client-safe (exposed to browser)

---

## Rollback

### Code Rollback

```bash
# Vercel Dashboard → Deployments → Find working version → Promote to Production

# Or CLI
vercel list
vercel promote <deployment-url>
```

### Database Rollback

```bash
# Restore from backup
psql $DATABASE_URL < backup.sql
```

---

## Alternative Platforms

Fabrk works on any Node.js platform:

| Platform | Ease | Cost | Best For |
|----------|------|------|----------|
| **Vercel** | Easy | $20/mo | Next.js (recommended) |
| **Railway** | Easy | $5+/mo | Quick setup + PostgreSQL |
| **Fly.io** | Medium | $10+/mo | Global edge |
| **Render** | Easy | $7+/mo | Zero-config |
| **Self-hosted** | Hard | $5+/mo | Full control |

For detailed guides on alternative platforms, see the archived docs.

---

## Monitoring (Post-Launch)

### Essential (Free)

- **UptimeRobot** - Uptime monitoring ([uptimerobot.com](https://uptimerobot.com))
- **Vercel Analytics** - Performance metrics (built-in)
- **Stripe Dashboard** - Payment monitoring

### Recommended (Paid)

- **Sentry** - Error tracking ($26/mo)
- **PostHog** - Product analytics (free tier available)

### Key Metrics

| Metric | Target | Alert If |
|--------|--------|----------|
| Uptime | 99.9% | Down >1 min |
| Response time | <500ms | P95 >2s |
| Error rate | <0.1% | >1% |
| Checkout completion | >60% | <40% |

---

## Support

- **Docs:** [fabrk.dev/docs](https://fabrk.dev/docs)
- **Email:** support@fabrk.dev

---

**You're live!** Time to ship features and get customers.
