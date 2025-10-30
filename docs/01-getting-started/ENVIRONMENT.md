# Environment Variables Guide

This document explains **every single environment variable** in the project, what it does, where to get it, and whether it's required.

---

## Quick Reference

| Variable | Required | When | Where to Get |
|----------|----------|------|--------------|
| `DATABASE_URL` | ✅ Yes | Always | Your database provider |
| `NEXTAUTH_URL` | ✅ Yes | Always | Your app URL |
| `NEXTAUTH_SECRET` | ✅ Yes | Always | Generate with OpenSSL |
| `STRIPE_SECRET_KEY` | ✅ Yes | For payments | Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | ✅ Yes | For payments | Stripe CLI |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ Yes | For payments | Stripe Dashboard |
| `GOOGLE_CLIENT_ID` | ❌ Optional | OAuth login | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | ❌ Optional | OAuth login | Google Cloud Console |
| `RESEND_API_KEY` | ❌ Optional | Send emails | Resend Dashboard |
| `EMAIL_FROM` | ❌ Optional | Send emails | Your email address |
| `UPSTASH_REDIS_REST_URL` | ❌ Optional | Production | Upstash Dashboard |
| `UPSTASH_REDIS_REST_TOKEN` | ❌ Optional | Production | Upstash Dashboard |
| `NEXT_PUBLIC_SENTRY_DSN` | ❌ Optional | Error tracking | Sentry Dashboard |
| `CRON_SECRET` | ❌ Optional | Email worker | Generate random string |

---

## Database Variables

### `DATABASE_URL`

**What it does:** Connects your app to the PostgreSQL database.

**Format:**
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

**Examples:**

```env
# Local PostgreSQL
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/fabrk"

# Vercel Postgres
DATABASE_URL="postgres://default:abc123@ep-cool-darkness-123456.us-east-1.postgres.vercel-storage.com:5432/verceldb"

# Supabase
DATABASE_URL="postgresql://postgres:password@db.projectref.supabase.co:5432/postgres"

# Neon
DATABASE_URL="postgresql://user:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb"

# Railway
DATABASE_URL="postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway"
```

**How to get it:**

- **Local:** Install PostgreSQL, create database, use `postgresql://postgres:yourpassword@localhost:5432/fabrk`
- **Hosted:** Copy from your database provider's dashboard (see [DATABASE.md](./DATABASE.md))

**Required:** ✅ Always

**Common errors:**

- `Can't reach database server` → Check host and port
- `Authentication failed` → Check username/password
- `Database "fabrk" does not exist` → Create database first

---

## Application URL Variables

### `NEXT_PUBLIC_APP_URL`

**What it does:** Base URL of your application (used for redirects, API calls, etc.)

**Format:**
```env
# Development
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Production
NEXT_PUBLIC_APP_URL="https://yourapp.com"
```

**Required:** ✅ Always

**Note:** `NEXT_PUBLIC_` prefix makes this available in browser JavaScript.

---

### `NEXT_PUBLIC_API_URL`

**What it does:** Base URL for API routes.

**Format:**
```env
# Development
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Production
NEXT_PUBLIC_API_URL="https://yourapp.com/api"
```

**Required:** ✅ Always

---

## Authentication Variables

### `NEXTAUTH_URL`

**What it does:** Tells NextAuth where your app is hosted (used for OAuth callbacks).

**Format:**
```env
# Development
NEXTAUTH_URL="http://localhost:3000"

# Production
NEXTAUTH_URL="https://yourapp.com"
```

**Required:** ✅ Always

**Must match:** `NEXT_PUBLIC_APP_URL`

---

### `NEXTAUTH_SECRET`

**What it does:** Encrypts session tokens and cookies. MUST be random and secret.

**Generate it:**
```bash
openssl rand -base64 32
```

**Example output:**
```
XjK9L2mN3pQ4rS5tU6vW7xY8zA1bC2dE3fG4hI5jK6l=
```

**Format:**
```env
NEXTAUTH_SECRET="XjK9L2mN3pQ4rS5tU6vW7xY8zA1bC2dE3fG4hI5jK6l="
```

**Required:** ✅ Always

**Security notes:**
- NEVER commit this to git
- Use different secrets for dev/staging/production
- Changing this will log out all users

---

## OAuth Variables (Google)

### `GOOGLE_CLIENT_ID`

**What it does:** Enables "Sign in with Google" button.

**Format:**
```env
GOOGLE_CLIENT_ID="123456789-abcdefg.apps.googleusercontent.com"
```

**How to get:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project or select existing
3. Enable "Google+ API"
4. Credentials → Create Credentials → OAuth 2.0 Client ID
5. Application type: Web application
6. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Copy Client ID

**Required:** ❌ Optional (but recommended)

**Skip if:** You don't want Google login

---

### `GOOGLE_CLIENT_SECRET`

**What it does:** Works with Client ID to authenticate with Google.

**Format:**
```env
GOOGLE_CLIENT_SECRET="GOCSPX-abc123def456"
```

**How to get:** Same place as Client ID (Google Cloud Console → Credentials)

**Required:** ❌ Optional (only if using Google OAuth)

**Security:** NEVER expose this publicly

---

## Stripe Payment Variables

### `STRIPE_SECRET_KEY`

**What it does:** Authenticates server-side Stripe API calls (charges, subscriptions, etc.)

**Format:**
```env
# Test mode (safe to use)
STRIPE_SECRET_KEY="sk_test_51Abc123..."

# Live mode (real money!)
STRIPE_SECRET_KEY="sk_live_51Abc123..."
```

**How to get:**

1. Create account at [stripe.com](https://stripe.com)
2. Go to [Developers → API keys](https://dashboard.stripe.com/test/apikeys)
3. Copy "Secret key" (starts with `sk_test_`)

**Required:** ✅ Yes (for payments)

**Security:**
- NEVER expose this in browser code
- NEVER commit to git
- Use test mode (`sk_test_`) for development

---

### `STRIPE_WEBHOOK_SECRET`

**What it does:** Verifies that webhook events actually come from Stripe (security).

**Format:**
```env
STRIPE_WEBHOOK_SECRET="whsec_abc123def456..."
```

**How to get:**

**For local development:**
```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` from the output.

**For production:**
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Add endpoint: `https://yourapp.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret

**Required:** ✅ Yes (for payments)

**Security:** Each environment (local/staging/production) needs its own secret

---

### `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

**What it does:** Initializes Stripe.js in the browser (safe to expose).

**Format:**
```env
# Test mode
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51Abc123..."

# Live mode
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_51Abc123..."
```

**How to get:**

Same place as Secret Key:
1. [Stripe Dashboard → API keys](https://dashboard.stripe.com/test/apikeys)
2. Copy "Publishable key" (starts with `pk_test_`)

**Required:** ✅ Yes (for payments)

**Note:** `NEXT_PUBLIC_` means this is exposed to browsers (that's okay, it's designed for that)

---

### Stripe Product Price IDs

These tell Stripe which products to charge for:

```env
NEXT_PUBLIC_STRIPE_PRICE_STARTER="prod_ABC123"
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL="prod_DEF456"
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE="prod_GHI789"
```

**How to get:**

1. [Stripe Dashboard → Products](https://dashboard.stripe.com/test/products)
2. Create products with prices
3. Copy Product ID (starts with `prod_`) for each tier

**Required:** ✅ Yes (for pricing page)

See [STRIPE-SETUP.md](../03-deployment/STRIPE-SETUP.md) for detailed product creation.

---

## Email Variables

### `RESEND_API_KEY`

**What it does:** Sends transactional emails (welcome, password reset, etc.)

**Format:**
```env
RESEND_API_KEY="re_abc123def456"
```

**How to get:**

1. Sign up at [resend.com](https://resend.com)
2. Add your domain (or use their test domain)
3. Copy API key from dashboard

**Required:** ❌ Optional

**Skip if:** You don't need email functionality (the app still works)

**Alternative providers:** SendGrid, Mailgun, AWS SES (requires code changes)

---

### `EMAIL_FROM`

**What it does:** "From" address for outgoing emails.

**Format:**
```env
EMAIL_FROM="noreply@yourdomain.com"
```

**Requirements:**

- Must be verified in your email provider
- Should be a no-reply address
- Must match your domain

**Required:** ❌ Optional (only if using email)

---

### `CRON_SECRET`

**What it does:** Authenticates requests to email worker cron job.

**Generate it:**
```bash
openssl rand -base64 32
```

**Format:**
```env
CRON_SECRET="your-random-string-here"
```

**Required:** ❌ Optional (only if using email queue)

**Used in:** `/api/cron/process-emails` endpoint

---

## Product Download URLs

These are used if you're selling downloadable products:

```env
PRODUCT_DOWNLOAD_URL_DEV="https://example.com/download/dev"
PRODUCT_DOWNLOAD_URL_PRO="https://example.com/download/pro"
PRODUCT_DOWNLOAD_URL_ENT="https://example.com/download/ent"
```

**Required:** ❌ Optional

**Default behavior:** If not set, app uses placeholder URLs

---

## Redis Cache Variables (Production Only)

### `UPSTASH_REDIS_REST_URL`

**What it does:** Enables distributed caching and rate limiting across multiple servers.

**Format:**
```env
UPSTASH_REDIS_REST_URL="https://us1-your-redis.upstash.io"
```

**How to get:**

1. Sign up at [upstash.com](https://upstash.com)
2. Create Redis database
3. Copy "REST URL" from dashboard

**Required:** ❌ Optional

**When to use:**
- Production deployments
- Multiple server instances
- Rate limiting across servers

**Skip for:** Local development (uses in-memory cache)

---

### `UPSTASH_REDIS_REST_TOKEN`

**What it does:** Authenticates with Upstash Redis.

**Format:**
```env
UPSTASH_REDIS_REST_TOKEN="AYB3ABC123..."
```

**How to get:** Same dashboard as REST_URL (Upstash → your database → REST Token)

**Required:** ❌ Optional (only if using Redis)

---

## Monitoring Variables (Optional)

### `NEXT_PUBLIC_SENTRY_DSN`

**What it does:** Tracks errors and performance in production.

**Format:**
```env
NEXT_PUBLIC_SENTRY_DSN="https://abc123@o123456.ingest.sentry.io/789"
```

**How to get:**

1. Sign up at [sentry.io](https://sentry.io)
2. Create new project (Next.js)
3. Copy DSN from project settings

**Required:** ❌ Optional

**Skip for:** Local development

---

### `SENTRY_ORG`

**What it does:** Your Sentry organization slug.

**Format:**
```env
SENTRY_ORG="your-company"
```

**Required:** ❌ Optional (only if using Sentry)

---

### `SENTRY_PROJECT`

**What it does:** Your Sentry project name.

**Format:**
```env
SENTRY_PROJECT="fabrk"
```

**Required:** ❌ Optional (only if using Sentry)

---

### `SENTRY_AUTH_TOKEN`

**What it does:** Uploads source maps to Sentry for better error tracking.

**Format:**
```env
SENTRY_AUTH_TOKEN="sntrys_abc123..."
```

**How to get:** Sentry → Settings → Auth Tokens → Create New Token

**Required:** ❌ Optional (only if using Sentry)

---

### `NEXT_PUBLIC_APP_VERSION`

**What it does:** Tracks which version of your app is deployed (for Sentry releases).

**Format:**
```env
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

**Required:** ❌ Optional

**Update:** Every time you deploy a new version

---

## Environment Files

### `.env.local` (Your personal file)

- Used for local development
- NOT committed to git
- Contains real secrets
- Created by copying `.env.example`

### `.env.example` (Template)

- Committed to git
- Contains placeholder values
- Shows which variables are needed
- Updated when adding new variables

### `.env.production` (Production secrets)

- Added in Vercel/hosting provider dashboard
- Never committed to git
- Uses real/live values (not test mode)

---

## Environment-Specific Values

| Variable | Development | Production |
|----------|-------------|------------|
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://yourapp.com` |
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://yourapp.com` |
| `STRIPE_SECRET_KEY` | `sk_test_...` | `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | `pk_live_...` |
| `DATABASE_URL` | Local or dev DB | Production DB |

---

## Security Checklist

- [ ] NEVER commit `.env.local` to git
- [ ] Use test mode Stripe keys for development
- [ ] Generate random secrets with `openssl rand -base64 32`
- [ ] Different `NEXTAUTH_SECRET` for each environment
- [ ] Enable 2FA on Stripe, database, and email accounts
- [ ] Rotate secrets if exposed
- [ ] Use read-only database credentials where possible

---

## Common Mistakes

### ❌ Spaces around equals sign
```env
# WRONG
DATABASE_URL = "postgresql://..."

# RIGHT
DATABASE_URL="postgresql://..."
```

### ❌ Exposing secrets in browser
```env
# WRONG - Server secret exposed to browser
NEXT_PUBLIC_STRIPE_SECRET_KEY="sk_test_..."

# RIGHT - No NEXT_PUBLIC prefix for secrets
STRIPE_SECRET_KEY="sk_test_..."
```

### ❌ Using production secrets in development
```env
# WRONG - Live mode in development
STRIPE_SECRET_KEY="sk_live_..."

# RIGHT - Test mode for dev
STRIPE_SECRET_KEY="sk_test_..."
```

### ❌ Missing quotes with special characters
```env
# WRONG - Special chars break parsing
DATABASE_URL=postgresql://user:p@ss!word@host:5432/db

# RIGHT - Quoted
DATABASE_URL="postgresql://user:p@ss!word@host:5432/db"
```

---

## Testing Your Configuration

Run this to verify environment variables are loading:

```bash
npm run type-check
npm run lint
npm run dev
```

If any environment variable is missing or invalid, you'll see errors immediately.

---

## Need Help?

- **Missing variable error?** Check this guide and `.env.example`
- **Variable not loading?** Restart dev server (`Ctrl+C` then `npm run dev`)
- **File not found?** Make sure it's named `.env.local` (not `.env`)
- **Still stuck?** Open an issue with the variable name and error message
