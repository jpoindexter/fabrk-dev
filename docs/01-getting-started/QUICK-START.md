# Quick Start Guide

Get Fabrk running locally in under 5 minutes.

---

## Prerequisites

Before starting, make sure you have:

- **Node.js 18+** ([Download](https://nodejs.org/))
- **PostgreSQL database** (see database options below)
- **Stripe account** ([Sign up free](https://stripe.com/))
- **Resend account** for emails ([Sign up free](https://resend.com/))
- **Git** installed

---

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/fabrk.git
cd fabrk

# Install dependencies
npm install --legacy-peer-deps
```

**Why `--legacy-peer-deps`?** Next.js 15 and React 19 are cutting-edge. Some dependencies haven't updated peer dependency versions yet. This flag ensures everything installs smoothly.

---

## Step 2: Database Setup

You have several free options:

### Option A: Supabase (Recommended - Easiest)

1. Go to [database.new](https://database.new)
2. Create a new project (free tier)
3. Copy the connection string from Settings → Database → Connection String (URI)
4. Use the "Session mode" connection string for best compatibility

### Option B: Railway

1. Go to [railway.app](https://railway.app/)
2. Click "New Project" → "Provision PostgreSQL"
3. Copy the `DATABASE_URL` from the PostgreSQL service

### Option C: Local PostgreSQL

```bash
# macOS (via Homebrew)
brew install postgresql
brew services start postgresql
createdb fabrk

# Ubuntu/Debian
sudo apt install postgresql
sudo systemctl start postgresql
sudo -u postgres createdb fabrk

# Your connection string:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/fabrk"
```

---

## Step 3: Environment Variables

Fabrk uses **runtime validation** for all environment variables to prevent silent failures. Missing or invalid variables will cause immediate startup errors with clear messages.

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and fill in your values:

```env
# Required for Development (minimum)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"  # Min 32 chars
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Database (optional in dev, required in production)
DATABASE_URL="your-postgresql-connection-string-here"

# Stripe (optional - only if you want to test payments)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # (see Stripe setup below)

# Resend Email (optional - emails will log to console if not set)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"

# Optional: Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Important:** All environment variables are validated at startup. If validation fails, you'll see a clear error message indicating what's wrong. See `/docs/ENV-VALIDATION.md` for complete validation rules.

### How to Get Each API Key:

**NextAuth Secret:**
```bash
openssl rand -base64 32
```

**Stripe Keys:**
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com/)
2. Click "Developers" → "API keys"
3. Copy "Publishable key" and "Secret key"
4. Toggle "Test mode" ON (top right) for development

**Stripe Webhook Secret** (for local dev):
```bash
# In a separate terminal, run:
npm run stripe:listen

# Copy the webhook signing secret (whsec_...) that appears
```

**Resend API Key:**
1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Copy the key (starts with `re_`)

**Google OAuth (Optional):**
1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

---

## Step 4: Initialize Database

Run Prisma to create your database schema:

```bash
npx prisma db push
```

**What this does:**
- Creates all tables in your PostgreSQL database
- Generates the Prisma Client for type-safe database queries
- No migrations needed in development (push directly to database)

**Expected output:**
```
✔ Generated Prisma Client
✔ Database synchronized with Prisma schema
```

**Optional:** Open Prisma Studio to see your database:
```bash
npm run db:studio
```

---

## Step 5: Run Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
- Ready in 1.2s
```

---

## Step 6: Test Authentication Flow

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Get Started" or navigate to `/register`
3. Register with your email:
   - Email: `test@example.com`
   - Password: `Test1234!`

**What should happen:**
- ✅ Account created in database
- ✅ Verification email logged to console (if `RESEND_API_KEY` not set)
- ✅ Redirected to verification prompt

**Check the console** to see the verification link if you don't have Resend configured yet.

4. Click the verification link (from console or email)
5. Log in with your credentials
6. You should see the dashboard at `/dashboard`

---

## Step 7: Test Stripe Checkout (Optional)

1. Make sure Stripe webhook listener is running:
```bash
npm run stripe:listen
```

2. Navigate to pricing section (/#pricing)
3. Click "Buy Now"
4. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

**Expected outcome:**
- ✅ Redirected to Stripe Checkout
- ✅ Payment successful
- ✅ Webhook received (check terminal running `stripe:listen`)
- ✅ Payment recorded in database
- ✅ Welcome email sent (or logged to console)

---

## Troubleshooting

### Environment variable validation errors
If you see errors like:
```
❌ Invalid server environment variables:
{
  "NEXTAUTH_SECRET": {
    "_errors": ["String must contain at least 32 character(s)"]
  }
}
```

**Solution:**
```bash
# Generate a strong secret
openssl rand -base64 32

# Add to .env.local
echo "NEXTAUTH_SECRET=your-generated-secret-here" >> .env.local

# Restart the dev server
npm run dev
```

**Common validation issues:**
- `NEXTAUTH_SECRET` must be at least 32 characters
- `NEXTAUTH_URL` must be a valid URL (HTTPS in production)
- Stripe keys must start with correct prefix (`sk_test_` or `sk_live_`)
- See `/docs/ENV-VALIDATION.md` for complete validation rules

### "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Database connection errors
```bash
# Test your connection string
npx prisma db pull

# If it fails, check:
# - Is PostgreSQL running?
# - Is the connection string correct?
# - Does the database exist?
```

### Prisma Client errors
```bash
# Regenerate Prisma Client
npx prisma generate
```

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Stripe webhook not receiving events
```bash
# Make sure stripe:listen is running in a separate terminal
npm run stripe:listen

# The webhook endpoint should show:
# > Ready! Your webhook signing secret is whsec_...
```

### Email not sending
- If `RESEND_API_KEY` is not set, emails will be logged to the console instead
- Check your Resend domain is verified
- For development, console logging is fine

---

## Next Steps

✅ **You're ready to build!** Here's what to do next:

1. **Explore the codebase:**
   - `src/app/` - All pages and API routes
   - `src/components/` - Reusable UI components
   - `src/lib/` - Utility functions and configurations
   - `prisma/schema.prisma` - Database schema

2. **Customize your app:**
   - Edit `src/config.js` - Central configuration file
   - Update branding in `src/app/layout.tsx`
   - Modify pricing in `src/components/landing/pricing-section.tsx`

3. **Add your features:**
   - Start building your unique product features
   - All the boring stuff (auth, payments, emails) is done

4. **Read the docs:**
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production
   - [CLAUDE.md](../CLAUDE.md) - Detailed architecture guide
   - [README.md](../README.md) - Project overview

---

## Common Questions

**Q: Can I use a different database?**
A: Fabrk uses PostgreSQL with Prisma. You *could* switch to MySQL or SQLite by changing the `provider` in `prisma/schema.prisma`, but PostgreSQL is recommended for production SaaS.

**Q: Do I need Stripe webhook for development?**
A: Yes, otherwise payment confirmations won't work. Use `npm run stripe:listen` to forward webhooks to localhost.

**Q: What if I don't want OAuth?**
A: Just don't set `GOOGLE_CLIENT_ID`. The OAuth button will be hidden automatically.

**Q: How do I add more OAuth providers?**
A: Edit `src/lib/auth.ts` and add providers from [authjs.dev/getting-started/providers](https://authjs.dev/getting-started/providers)

---

