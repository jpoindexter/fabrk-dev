# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fabrk Boilerplate is a production-ready Next.js 15 SaaS boilerplate with authentication, payments, database, and email built-in. This is a clean, sellable boilerplate extracted from an over-engineered codebase (reduced from 1000+ files to 161 essential files).

**Tech Stack:**
- Next.js 15 (App Router with Server Components)
- NextAuth v5 (Credentials + OAuth)
- Prisma ORM with PostgreSQL
- Stripe (one-time payments + subscriptions)
- React Email + Resend
- Radix UI (25 essential components)
- Tailwind CSS + next-themes

## Development Commands

### Essential Commands
```bash
# Development
npm run dev                 # Start dev server at localhost:3000

# Database
npm run db:push            # Push Prisma schema to database (no migrations)
npm run db:studio          # Open Prisma Studio GUI

# Build & Production
npm run build              # Build for production (includes prisma generate)
npm start                  # Start production server

# Code Quality
npm run lint               # Run ESLint
npm run type-check         # TypeScript validation (no emit)

# Stripe (Local Development)
npm run stripe:listen      # Listen to Stripe webhooks locally
```

### Testing
**Note:** The boilerplate includes 2 example tests (register, verify-email) located at:
- `src/app/api/auth/register/route.test.ts`
- `src/app/api/auth/verify-email/route.test.ts`

No test runner is configured yet. Customers should add their own testing setup (Vitest, Jest, etc.) and comprehensive tests.

## Architecture Overview

### Authentication Flow
- **NextAuth v5** configuration in `src/lib/auth.ts`
- **Middleware** (`src/middleware.ts`) protects routes: `/dashboard`, `/admin`, `/billing`, `/settings`
- **Session strategy:** JWT with 30-day expiration
- **Providers:** Credentials (email/password with bcrypt) + Google OAuth
- **Email verification:** Token-based with 24-hour expiration
- **Password reset:** Token-based flow with secure expiry

### Route Structure
```
src/app/
├── (auth)/              # Auth pages (login, register, forgot-password, reset-password)
├── (dashboard)/         # Protected dashboard pages (settings, account)
├── api/
│   ├── auth/           # Auth endpoints (register, verify-email, reset-password, resend-verification)
│   │   └── [...nextauth]/  # NextAuth catch-all route
│   ├── stripe/         # Stripe endpoints (checkout, portal, verify)
│   └── webhooks/
│       └── stripe/     # Stripe webhook handler (checkout.session.completed, payment_intent.*)
└── page.tsx            # Landing page
```

### Payment Flow (Stripe)

**Architecture Pattern:** This boilerplate supports BOTH one-time payments AND subscriptions:

1. **One-Time Purchase Flow:**
   - Frontend calls `/api/stripe/checkout` with `priceId`
   - Creates Stripe Checkout session (mode: "payment")
   - Webhook handles `checkout.session.completed`
   - Creates `Payment` record
   - Updates `User.customerId` (Stripe customer ID)
   - Sends welcome email immediately (no queue)

2. **Subscription Flow** (you'll need to implement):
   - Similar to one-time but mode: "subscription"
   - Webhook can handle subscription lifecycle events
   - Note: No `Subscription` model exists yet - add it to schema if needed

**Key Files:**
- `src/app/api/stripe/checkout/route.ts` - Creates checkout sessions with idempotency
- `src/app/api/webhooks/stripe/route.ts` - Processes payment events
- `src/lib/stripe.ts` - Stripe client and helper functions

**Idempotency:** All checkout sessions use idempotency via the `CheckoutSession` model, which stores session IDs with 24-hour expiry to prevent duplicate charges on page refresh.

### Database Architecture

**All Models** (7 total - kept intentionally minimal):
- `User` - Authentication + Stripe customer ID + tier tracking
  - Includes `resetToken`, `resetExpires`, `verifyToken` for auth flows
  - `role` enum (USER, ADMIN)
- `Account` - OAuth provider accounts (NextAuth adapter)
- `Session` - Active user sessions (NextAuth adapter)
- `VerificationToken` - Email verification tokens (NextAuth adapter)
- `Payment` - Stripe payment records
  - Stores `stripeId`, `amount`, `status`, `productId`
- `CheckoutSession` - Prevents duplicate checkouts on page refresh
  - Stores session ID with 24-hour expiry
- `WebhookEvent` - Prevents duplicate webhook processing
  - Idempotency tracking via Stripe event ID

**No subscription model** - The schema tracks payments but not active subscriptions. Add a `Subscription` model if you need subscription lifecycle management.

**Philosophy:** This is a minimal, ShipFast-style schema. No multi-tenancy, no MFA, no audit logs. Add complexity only when you need it.

### Email System

**Pattern:** Simple direct sending via Resend (ShipFast style - no queue, no retry)
- **Service:** `src/lib/email.ts` - ~100 lines with 3 send functions
- **Templates:** `src/emails/welcome-html.ts` - Simple HTML templates (no React Email)
- **Provider:** Resend (configured via `RESEND_API_KEY`)
- **Dev Mode:** Logs to console instead of sending when `RESEND_API_KEY` is not set

**Email Functions:**
- `sendWelcomeEmail(to, name, licenseKey?)` - After purchase
- `sendVerificationEmail(to, token)` - After registration
- `sendResetEmail(to, token)` - Password reset flow

**No queue or retry logic** - Emails send immediately. For production-grade retry logic, consider adding a queue system (Bull, Inngest, etc.).

### Logging & Monitoring

**No built-in logger** - The boilerplate uses simple `console.log`/`console.error` throughout.

**Error Handling Pattern:**
```typescript
try {
  // business logic
} catch (error) {
  console.error("Description:", error);
  return NextResponse.json({ error: "User message" }, { status: 500 });
}
```

**Add Sentry (optional):**
- Install `@sentry/nextjs`
- Run `npx @sentry/wizard@latest -i nextjs`
- Configure DSN in environment variables
- No Sentry config is included by default

### Path Aliases

```typescript
@/*                 // src/*
@/components/*      // src/components/*
@/lib/*             // src/lib/*
@/app/*             // src/app/*
@/types/*           // src/types/*
```

## Important Patterns

### 1. API Error Handling
All API routes follow this pattern:
```typescript
try {
  // Business logic
  return NextResponse.json({ data }, { status: 200 });
} catch (error) {
  console.error("Description:", error);
  return NextResponse.json({ error: "User-friendly message" }, { status: 500 });
}
```

### 2. Database Access
- Always use the singleton Prisma client: `import { prisma } from "@/lib/prisma"`
- Prevents multiple instances in development
- No need to manually manage connections

### 3. Authentication Checks
```typescript
import { auth } from "@/lib/auth";

const session = await auth();
if (!session?.user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

### 4. Webhook Signature Verification
Stripe webhooks MUST verify signatures:
```typescript
const signature = req.headers.get("stripe-signature");
const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
```

### 5. Idempotency for Payments
Payment operations use the `CheckoutSession` model to prevent duplicate charges:
- Store checkout session ID with 24-hour expiry
- Check for existing session before creating new one
- Webhook uses `WebhookEvent` model to prevent duplicate processing

## Environment Variables

**Required for Development:**
```env
DATABASE_URL                          # PostgreSQL connection string
NEXTAUTH_URL                          # http://localhost:3000
NEXTAUTH_SECRET                       # Generate with: openssl rand -base64 32
STRIPE_SECRET_KEY                     # sk_test_...
STRIPE_WEBHOOK_SECRET                 # whsec_... (from Stripe webhook config)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY    # pk_test_...
RESEND_API_KEY                        # Email sending
```

**Optional:**
```env
GOOGLE_CLIENT_ID                      # For Google OAuth
GOOGLE_CLIENT_SECRET                  # For Google OAuth
NEXT_PUBLIC_SENTRY_DSN                # Error tracking
UPSTASH_REDIS_REST_URL                # Rate limiting (production)
UPSTASH_REDIS_REST_TOKEN              # Rate limiting (production)
```

**Stripe Product IDs:**
See `.env.example` for actual Stripe product IDs. The boilerplate includes three tiers:
- NEXT_PUBLIC_STRIPE_PRICE_STARTER (Starter tier)
- NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL (Professional tier)
- NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE (Enterprise tier)

## Common Development Tasks

### Adding a New Protected Route
1. Create page in `src/app/(dashboard)/`
2. Middleware automatically protects based on path matcher in `src/middleware.ts`

### Adding a New API Route
1. Create route handler in `src/app/api/`
2. Use NextResponse for responses
3. Wrap in try-catch with logger.error
4. Return proper status codes (200, 400, 401, 500)

### Adding a New Stripe Webhook Event
1. Add event handler in `src/app/api/webhooks/stripe/route.ts`
2. Follow existing switch-case pattern
3. Test with Stripe CLI: `stripe trigger <event-name>`

### Database Schema Changes
```bash
# 1. Edit prisma/schema.prisma
# 2. Push to database (no migrations in this boilerplate)
npm run db:push
# 3. Prisma Client will auto-regenerate
```

### Testing Stripe Webhooks Locally
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Forward webhooks
npm run stripe:listen

# Terminal 3: Trigger test events
stripe trigger checkout.session.completed
```

## Code Style

- **No emojis** in code or comments (unless explicitly requested)
- **Concise comments** - focus on "why" not "what"
- **TypeScript strict mode** enabled
- **ESLint** - Run `npm run lint` before committing
- **No Prettier config** - Use your editor's default formatting

## Security Considerations

- **Never commit** `.env.local` or any file with actual secrets
- **Webhook signature verification** is mandatory for Stripe webhooks
- **Password hashing** uses bcrypt with 12 rounds
- **JWT sessions** expire after 30 days
- **Security headers** configured in `next.config.ts`
- **Sensitive data sanitization** in logger before sending to external services

## Deployment Notes

- Set `output: "standalone"` for Docker/containerized deployments (already configured)
- Ensure all environment variables are set in production
- Configure Stripe webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
- Add webhook events in Stripe Dashboard: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- For production, set up Redis (Upstash) for distributed rate limiting

## Central Configuration

**All app settings live in `src/config.js`** - This is your single source of truth:
- App metadata (name, description, URLs)
- Auth providers and session settings
- Stripe price IDs and configuration
- Email settings (Resend)
- Feature flags (enable/disable features)
- Subscription tiers with pricing
- API rate limits
- Development mode toggles

**Update this file first** when configuring your SaaS. It's referenced throughout the codebase.

## File Organization Philosophy

This boilerplate follows the "essential files only" principle:
- ~105 TypeScript/TSX files (vs 1000+ in over-engineered version)
- ~10 core UI components from Radix (vs 169 in original)
- Minimal dependencies (check package.json)
- No extensive test suites (customers add their own)
- No complex pre-commit hooks (basic linting only)
- No generated documentation (README + CLAUDE.md only)

When adding features, maintain this simplicity principle.
