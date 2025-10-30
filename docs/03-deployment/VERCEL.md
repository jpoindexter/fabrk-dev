# Vercel Deployment Guide

Deploy your SaaS application to Vercel in minutes.

---

## Why Vercel?

- **Zero configuration** - Works with Next.js out of the box
- **Automatic deployments** - Push to GitHub, auto-deploy
- **Preview environments** - Every PR gets a preview URL
- **Global CDN** - Fast worldwide
- **Free tier** - Perfect for getting started
- **PostgreSQL included** - Optional Vercel Postgres

---

## Prerequisites

- [ ] Code pushed to GitHub
- [ ] Vercel account ([signup](https://vercel.com/signup))
- [ ] PostgreSQL database ready (see [DATABASE.md](../01-getting-started/DATABASE.md))
- [ ] Stripe account configured
- [ ] All environment variables ready

---

## Quick Deploy (10 minutes)

### Step 1: Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Import"

**That's it!** Vercel auto-detects Next.js configuration.

### Step 2: Configure Environment Variables

Before deploying, add environment variables:

1. Click "Environment Variables"
2. Add each variable from `.env.local`:

#### Required Variables

```env
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Product Price IDs
NEXT_PUBLIC_STRIPE_PRICE_STARTER=prod_...
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=prod_...
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=prod_...
```

#### Optional Variables

```env
# Google OAuth (if using)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com

# Redis (Upstash - recommended for production)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Monitoring (Sentry)
NEXT_PUBLIC_SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=...
```

**Important:** Use **production** values, not test mode!

### Step 3: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your app is live!

**Expected output:**
```
✓ Building
✓ Testing
✓ Deploying
🎉 Deployed to: https://your-app.vercel.app
```

---

## Post-Deployment Configuration

### 1. Set Up Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain: `yourdomain.com`
4. Follow DNS instructions:
   - Add A record: `76.76.21.21`
   - Or CNAME record: `cname.vercel-dns.com`
5. Wait for DNS propagation (5-60 minutes)

**Update environment variables:**
```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

Redeploy after updating.

### 2. Configure Stripe Webhooks

Now that your app is deployed, set up production webhooks:

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter endpoint URL:
   ```
   https://your-app.vercel.app/api/webhooks/stripe
   ```
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"
6. Copy "Signing secret" (starts with `whsec_`)

**Update environment variable:**

1. Go to Vercel Project Settings → Environment Variables
2. Find `STRIPE_WEBHOOK_SECRET`
3. Update value with new signing secret
4. Redeploy

### 3. Test Production Deployment

1. Visit your deployed URL
2. Test registration/login
3. Test Stripe checkout with **live mode** card
4. Verify webhooks are working:
   - Make test purchase
   - Check Stripe Dashboard → Webhooks
   - Should show `200` status

**Use real card for testing:**
- Amounts under $1 won't be charged
- Cancel subscription immediately
- Refund in Stripe Dashboard

### 4. Enable Automatic Deployments

Already enabled! Every push to `main` branch auto-deploys.

**How it works:**
```
git push origin main
    ↓
GitHub detects push
    ↓
Vercel auto-builds
    ↓
Deploys to production
```

**Preview deployments:**
- Every PR gets preview URL
- Test before merging
- Comments on PR with link

---

## Environment Configuration

### Production Environment

Add to Vercel Environment Variables:

**Scope:** Production

```env
DATABASE_URL=postgresql://production-db-url
NEXTAUTH_URL=https://yourdomain.com
STRIPE_SECRET_KEY=sk_live_...
# ... other production values
```

### Preview Environment

Add to Vercel Environment Variables:

**Scope:** Preview

```env
DATABASE_URL=postgresql://staging-db-url
NEXTAUTH_URL=https://preview-app.vercel.app
STRIPE_SECRET_KEY=sk_test_...
# ... other staging values
```

### Development Environment

Keep in `.env.local` (not uploaded to Vercel):

```env
DATABASE_URL=postgresql://localhost:5432/fabrk
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
# ... other dev values
```

---

## Database Setup

### Option 1: Vercel Postgres (Easiest)

1. Go to Vercel Dashboard → Storage
2. Click "Create Database" → "Postgres"
3. Choose region (same as your app)
4. Name: `production-db`
5. Click "Create"

**Connect to project:**
1. Database created
2. Click "Connect to Project"
3. Select your project
4. Vercel automatically adds `DATABASE_URL`

**Run migrations:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Run migration
vercel env pull
npx prisma migrate deploy
```

### Option 2: External Database

Use Supabase, Neon, or Railway (see [DATABASE.md](../01-getting-started/DATABASE.md)):

1. Create production database
2. Get connection URL
3. Add `DATABASE_URL` to Vercel environment variables
4. Redeploy

---

## Deployment Workflow

### Making Changes

1. **Make changes locally:**
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   npm run dev  # Test locally
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add: new feature"
   git push origin feature/new-feature
   ```

3. **Create Pull Request:**
   - GitHub → Pull Requests → New
   - Vercel auto-creates preview deployment
   - Preview URL appears in PR comments

4. **Review preview:**
   - Click preview URL
   - Test changes
   - Verify everything works

5. **Merge to main:**
   - Click "Merge pull request"
   - Vercel auto-deploys to production
   - Live in 2-3 minutes

### Rollback Deployment

If something breaks:

1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"
4. Instant rollback!

---

## Monitoring and Logs

### View Logs

**Real-time logs:**
1. Vercel Dashboard → Project → Logs
2. Filter by level (info, warning, error)
3. Search by keyword

**CLI logs:**
```bash
vercel logs
```

### Error Tracking

**Enable Sentry (recommended):**

1. Sign up at [sentry.io](https://sentry.io)
2. Create project (Next.js)
3. Get DSN
4. Add to Vercel environment variables:
   ```env
   NEXT_PUBLIC_SENTRY_DSN=https://...
   SENTRY_AUTH_TOKEN=...
   ```
5. Redeploy

**View errors:**
- Sentry Dashboard → Issues
- Automatic error alerts
- Source maps for debugging

### Analytics

**Built-in Vercel Analytics:**

1. Project Settings → Analytics
2. Enable Web Analytics
3. View in Dashboard → Analytics

**Shows:**
- Page views
- Load time
- Core Web Vitals
- Visitor data

---

## Performance Optimization

### Edge Functions

API routes automatically run on Vercel Edge Network for low latency.

No configuration needed!

### Image Optimization

Next.js Image component automatically optimized:

```tsx
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
/>
```

**Benefits:**
- WebP/AVIF format
- Responsive sizes
- Lazy loading
- Automatic caching

### Caching

Vercel automatically caches:
- Static pages (1 year)
- API routes (configurable)
- Images (1 year)

**Custom caching:**
```typescript
// app/api/data/route.ts
export const revalidate = 3600 // Cache for 1 hour
```

---

## Security

### Environment Variables

- Never commit secrets to git
- Use different values per environment
- Rotate regularly
- Store in Vercel dashboard only

### HTTPS

- Automatic SSL certificate
- Free with Vercel domain
- Free with custom domain
- Auto-renewal

### CORS

Configure in `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
      ],
    },
  ]
}
```

---

## Cost Estimates

### Vercel Pricing

**Hobby (Free):**
- Unlimited deployments
- 100GB bandwidth
- Perfect for side projects

**Pro ($20/month):**
- Team collaboration
- Password protection
- Advanced analytics
- Recommended for production

### Database Costs

**Vercel Postgres:**
- Free: 256MB, 60 hours compute
- Pro: $24/month for 10GB

**External (recommended):**
- Supabase: $25/month (8GB)
- Neon: $19/month (3GB)
- Railway: Pay-as-you-go (~$5-15/month)

### Total Monthly Cost

**Minimum (Free tier):**
- Vercel: $0
- Database: $0 (Supabase free)
- Total: **$0/month**

**Production (Recommended):**
- Vercel Pro: $20
- Database: $25 (Supabase Pro)
- Stripe: $0 (pay-per-transaction)
- Total: **$45/month**

---

## Troubleshooting

### Build Failures

**Error: "Module not found"**

Solution:
```bash
# Clear cache and rebuild
vercel --force
```

**Error: "Out of memory"**

Solution: Upgrade to Pro plan (more build resources)

### Environment Variable Issues

**Error: "NEXTAUTH_SECRET is not defined"**

Solution:
1. Check spelling in Vercel dashboard
2. Verify all environments selected (Production, Preview, Development)
3. Redeploy

### Database Connection Errors

**Error: "Can't reach database"**

Check:
- [ ] DATABASE_URL is correct
- [ ] Database allows connections from Vercel IPs
- [ ] SSL mode enabled: `?sslmode=require`

**Whitelist Vercel IPs** (if using IP whitelist):
- Not recommended (Vercel uses dynamic IPs)
- Use connection pooling instead
- Or allow all IPs (if database supports auth)

### Stripe Webhook Failures

**Error: "Webhook signature verification failed"**

Solution:
1. Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
2. Check webhook endpoint URL is correct
3. Test with Stripe CLI:
   ```bash
   stripe listen --forward-to https://your-app.vercel.app/api/webhooks/stripe
   ```

---

## Advanced Configuration

### Custom Build Command

Edit `package.json`:

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

Vercel automatically runs `vercel-build` if present.

### Environment-Specific Configs

Use `next.config.ts`:

```typescript
const isProduction = process.env.NODE_ENV === 'production'

export default {
  reactStrictMode: true,
  images: {
    domains: isProduction
      ? ['yourdomain.com']
      : ['localhost'],
  },
}
```

### Monorepo Setup

If using monorepo:

1. Project Settings → Root Directory
2. Set to: `apps/web` (or your app path)
3. Vercel installs from workspace root

---

## Deployment Checklist

Before going live:

### Code
- [ ] All features tested locally
- [ ] No console errors
- [ ] TypeScript compiles
- [ ] Lint passes
- [ ] Build succeeds

### Environment
- [ ] All environment variables added
- [ ] Production database configured
- [ ] Stripe webhooks set up
- [ ] Custom domain configured (if applicable)

### Testing
- [ ] Test registration/login on production
- [ ] Test payment flow with real card
- [ ] Test password reset email
- [ ] Check all pages load
- [ ] Test on mobile

### Security
- [ ] HTTPS enabled (automatic)
- [ ] Secrets not in code
- [ ] CORS configured
- [ ] Rate limiting enabled

### Monitoring
- [ ] Error tracking set up (Sentry)
- [ ] Analytics enabled
- [ ] Log monitoring configured

---

## Next Steps

Deployed successfully? Great!

**Now:**

1. **Set up monitoring** - [Sentry setup](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
2. **Configure email** - [Email setup](https://resend.com/docs)
3. **Add custom domain** - See [Custom Domain section](#1-set-up-custom-domain-optional)
4. **Enable Redis caching** - See [REDIS-SETUP.md](./REDIS-SETUP.md)

**Marketing:**

- Add to Product Hunt
- Share on Twitter
- Write launch blog post
- Set up analytics

---

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## Getting Help

**Deployment issues:**

1. Check [Troubleshooting](#troubleshooting) section
2. Review Vercel logs
3. Search [Vercel Discussions](https://github.com/vercel/vercel/discussions)
4. Open GitHub issue with:
   - Error message
   - Build logs
   - Environment (if not sensitive)
