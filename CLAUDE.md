# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Fabrk is a Next.js 15 SaaS boilerplate with authentication, billing, multi-tenant organizations, real-time features, analytics, i18n, and a production-ready component library.

**Tech Stack:**
- Next.js 15 (App Router, Server Components, React 19, Turbopack)
- NextAuth v5 (Credentials + OAuth + Magic Link)
- Prisma ORM + PostgreSQL
- Stripe (one-time + subscriptions)
- React Email + Resend
- Radix UI (25+ primitives)
- Tailwind CSS 4 + next-themes
- TypeScript 5 (strict mode)
- Pusher (real-time features)
- PostHog (analytics)
- Algolia (search - optional)
- Sanity CMS (optional)

**Node Version:** v24.11.1 (specified in `.nvmrc`)

## Development Commands

```bash
# Development
npm run dev                 # Start dev server (auto-kills port 3000)
npm run build               # Production build (includes prisma generate)
npm start                   # Start production server

# Database
npm run db:push             # Push schema changes (no migrations)
npm run db:studio           # Open Prisma Studio GUI
npm run db:seed             # Seed test data
npm run db:reset            # Reset DB and reseed

# Code Quality
npm run lint                # ESLint + hex color scan
npm run scan:hex            # Detect hardcoded colors (use tokens instead)
npm run type-check          # TypeScript validation (no emit)
npm run format              # Prettier format
npm run format:check        # Prettier check

# Testing (Vitest + Playwright)
npm run test                                # Run all Vitest unit tests
npm run test -- path/to/file.test.ts        # Run a single Vitest test file
npm run test:watch                          # Vitest watch mode
npm run test:coverage                       # Coverage report
npm run test:e2e                            # Run all Playwright E2E tests
npm run test:e2e -- tests/e2e/auth.spec.ts  # Run a single Playwright spec file
npm run test:e2e:ui                         # Playwright UI mode
npm run test:all                            # Run Vitest + Playwright suites

# Stripe (Local Development)
npm run stripe:listen       # Forward webhooks to localhost

# Background Workers
npm run email:worker        # Email queue worker (production)
npm run email:dev           # Email worker with auto-restart
npm run jobs:worker         # Job queue worker
npm run jobs:dev            # Jobs worker with auto-restart

# Component Development
npm run storybook           # Storybook dev server (port 6006)
npm run build-storybook     # Build Storybook static site
```

## Architecture Overview

### Three-Layer Architecture

```
UI Layer (src/app/)
    ↓
API Layer (src/app/api/)
    ↓
Service Layer (src/lib/)
```

**Key Insight:** This codebase follows a **pragmatic simplicity pattern** inspired by ShipFast. Avoid abstractions until needed twice. Favor direct, copy-paste friendly code over clever architecture.

### Central Configuration

**Critical:** ALL app settings live in `src/config.js` (not scattered across multiple files). This is your single source of truth for:
- App metadata
- Stripe price IDs
- Auth providers
- Feature flags
- Subscription tiers
- API rate limits
- Search configuration (Algolia)
- CMS configuration (Sanity)

**Always update config.js first** when adding features.

### Authentication Flow (NextAuth v5)

**Session Strategy:** JWT with 30-day expiration (`src/lib/auth.ts`)

**Middleware Protection:** `src/middleware.ts` automatically protects routes matching:
- `/dashboard/:path*`
- `/admin/:path*`
- `/billing/:path*`
- `/settings/:path*`

**Session Versioning:** Users have a `sessionVersion` field. Incrementing it instantly invalidates all sessions (for security actions like password change).

```typescript
// Pattern for protected API routes
const session = await auth();
if (!session?.user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

**Providers:**
- Credentials (bcrypt, 12 rounds)
- Google OAuth (if `GOOGLE_CLIENT_ID` is set)
- Magic Link (token-based passwordless authentication)

**Token Flows:**
- Email verification: 24-hour token in `VerificationToken`
- Password reset: SHA-256 hashed token in `User.resetToken`
- Magic link: One-time use token with expiration

### Multi-Tenancy & Organizations

**Architecture:** Full multi-tenancy with organization-based data isolation and RBAC.

**Role Hierarchy:**
- `OWNER` - Full control, can delete organization
- `ADMIN` - All permissions except delete organization
- `MEMBER` - Standard access, cannot manage members
- `GUEST` - Read-only access

**Key Components:**
- Organization Switcher (Cmd+K keyboard shortcut)
- Member Management UI with data tables
- Invitation System (7-day expiry, email-based)
- Per-organization billing via Stripe

**Session Context:** `activeOrganizationId` stored in session for data scoping.

**API Routes:**
- `POST /api/organizations` - Create organization
- `GET /api/organizations` - List user's organizations
- `POST /api/organizations/switch` - Switch active org
- `POST /api/organizations/invite` - Send invitation
- `GET /api/organizations/[id]/members` - List members
- `PATCH /api/organizations/[id]/members/[memberId]` - Update member role

**Database Models:**
- `Organization` - Name, slug, plan, billing info
- `OrganizationMember` - User-org junction with role
- `OrganizationInvite` - Pending invitations with tokens

### Real-Time Features (Pusher)

**Infrastructure:** Pusher integration for live updates across the application.

**Features:**
1. **Notification Center** - Bell icon with unread badge, real-time delivery
2. **Activity Feed** - Live organization activity stream
3. **Presence Tracking** - Online/offline status for team members

**React Hooks:**
- `useNotifications()` - Subscribe to user notifications
- `useOrgActivity()` - Subscribe to org activity stream
- `usePresence()` - Track online members

**Key Files:**
- `src/lib/pusher/server.ts` - Server-side client
- `src/lib/pusher/client.ts` - Client-side hooks
- `src/app/api/pusher/auth` - Channel authorization

**Database Model:**
- `Notification` - Type, title, message, read status, metadata

### Analytics & Admin (PostHog)

**PostHog Integration:**
- Server-side client (`src/lib/analytics/posthog.ts`)
- Auto-disabled in development
- Feature flags support
- Session replay ready

**Event Tracking:**
20+ typed event functions in `src/lib/analytics/events.ts`:
- User lifecycle: signup, login, logout
- Organization events: created, updated, member_joined
- Payment events: checkout_started, payment_succeeded
- Feature usage: api_key_created, webhook_triggered

**Audit Log System:**
- Immutable append-only logging (compliance requirement)
- 18+ action types (user.*, org.*, payment.*, security.*)
- Indexed for fast querying
- Never updated or deleted

**Admin Dashboard:**
- `/admin` route (requires ADMIN role)
- User/org/revenue stats
- Recent signups table
- Activity charts
- User impersonation
- Audit log viewer with filters

**Feature Flags:**
- Database-backed (`src/lib/feature-flags/db-flags.ts`)
- Percentage-based rollout (0-100%)
- 60-second cache for performance

### Webhooks System

**Production-Grade Webhook Infrastructure** with 22 webhook events:

**Core Features:**
- HMAC-SHA256 signature verification
- Automatic retry with exponential backoff
- Delivery tracking and history
- Event subscription management

**Event Categories:**
- Organization: created, updated, deleted, member_invited, member_joined
- Member: removed, role_changed, left, updated
- Payment: succeeded, failed, refunded, subscription events
- Security: password_changed, email_changed, api_key events
- Feature: feature_flag_updated, notification_sent

**Retry Logic:** 5 attempts with exponential backoff (1min → 5min → 15min → 1hr → 6hr)

**Key Files:**
- `src/lib/webhooks/server.ts` - Main webhook engine
- `src/lib/webhooks/retry-worker.ts` - Background retry job
- `src/lib/webhooks/events.ts` - Event definitions

**API Routes:**
- `POST /api/webhooks` - Create webhook
- `GET /api/webhooks` - List webhooks
- `PATCH /api/webhooks/[id]` - Update webhook
- `POST /api/webhooks/[id]/test` - Send test payload
- `GET /api/webhooks/[id]/deliveries` - Delivery history

**Database Models:**
- `Webhook` - url, secret, events[], enabled
- `WebhookDelivery` - payload, status, attempts, nextRetryAt

**Security:**
- HTTPS enforcement in production
- 10-second timeout per request
- Secret rotation support

### API Keys System

**Production-Grade API Key Management:**

**Key Generation:**
- 256-bit cryptographically secure keys
- Format: `sk_live_<43-char-base64url>`
- SHA-256 hash storage (never store raw keys)
- Timing-safe comparison to prevent timing attacks

**Permission Levels:**
- `read` - GET endpoints only
- `write` - POST/PATCH/DELETE (requires read)
- `admin` - All endpoints + sensitive operations

**Authentication Middleware:**
- `src/middleware/api-auth.ts` - Bearer token extraction
- `authenticateApiKey()` - Validate key and permissions
- `requirePermission()` - Higher-order function wrapper

**API Routes:**
- `POST /api/api-keys` - Create new key (returns full key ONCE)
- `GET /api/api-keys` - List user's keys (prefix only)
- `DELETE /api/api-keys/[id]` - Revoke key

**Protected API Endpoints Example:**
- `GET /api/v1/organizations/[id]` - Requires `read` permission
- `POST /api/v1/members/invite` - Requires `write` permission

**Key Files:**
- `src/lib/api-keys/generator.ts` - Key generation
- `src/lib/api-keys/hasher.ts` - SHA-256 hashing
- `src/lib/api-keys/auth.ts` - Authentication logic

**Database Model:**
- `ApiKey` - keyHash, keyPrefix, permissions[], expiresAt, lastUsedAt

**Security Features:**
- crypto.randomBytes(32) for entropy
- crypto.timingSafeEqual() for comparison
- Optional expiration dates
- Instant revocation
- Audit trail for all operations

### Payment Flow (Stripe)

**Dual Mode:** Supports BOTH one-time payments AND subscriptions.

**Idempotency Pattern** (Critical):
All checkout sessions use idempotency keys via `CheckoutSession` model to prevent duplicate charges on page refresh:

```typescript
// src/lib/stripe/idempotency.ts
const idempotencyKey = generateCheckoutIdempotencyKey(userId, priceId);
const existing = await getExistingCheckoutSession(idempotencyKey);
if (existing) return NextResponse.json({ url: existing });
```

**Webhook Deduplication:**
`WebhookEvent` model tracks Stripe event IDs to prevent duplicate processing.

**One-Time Purchase Flow:**
1. `POST /api/stripe/checkout` → Creates Stripe Checkout (mode: "payment")
2. User pays → Stripe redirects to `/success`
3. Webhook `checkout.session.completed` → Creates `Payment` record
4. Updates `User.customerId` (Stripe customer ID)
5. Queues welcome email via `EmailQueue`

**Subscription Flow:**
Similar to one-time but mode: "subscription". Add subscription lifecycle event handlers in webhook as needed.

**Key Files:**
- `src/app/api/stripe/checkout/route.ts` - Session creation
- `src/app/api/webhooks/stripe/route.ts` - Event processing
- `src/lib/stripe.ts` - Client & helpers
- `src/lib/stripe/idempotency.ts` - Duplicate prevention

**Security:** ALWAYS verify webhook signatures:
```typescript
const signature = req.headers.get("stripe-signature");
const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
```

### Database Architecture (Prisma)

**Singleton Pattern:** Always use `import { prisma } from "@/lib/prisma"` (prevents multiple instances)

**Schema Philosophy:** Minimal core + optional advanced features. Can be simplified for basic SaaS.

**Core Models (7):**
- `User` - Auth + Stripe customer ID + tier tracking
- `Account` - OAuth provider accounts
- `Session` - Active sessions
- `VerificationToken` - Email verification
- `Payment` - Stripe payment records
- `CheckoutSession` - Prevents duplicate checkouts (24hr expiry)
- `WebhookEvent` - Prevents duplicate webhook processing

**Enterprise Models (Advanced Features):**
- `Organization` - Multi-tenancy with billing
- `OrganizationMember` - User-org junction with RBAC
- `OrganizationInvite` - Pending invitations
- `Webhook` - Webhook subscriptions
- `WebhookDelivery` - Delivery tracking
- `ApiKey` - Secure API key storage
- `AuditLog` - Immutable audit trail
- `Notification` - Real-time notifications
- `FeatureFlag` - Feature flag management
- `MFADevice` - Two-factor auth
- `BackupCode` - MFA recovery codes
- `Upload` - File uploads
- `EmailQueue` - Queued emails
- `Job` - Background job queue

**Schema Changes:**
```bash
# 1. Edit prisma/schema.prisma
# 2. Push to DB (no migration files needed)
npm run db:push
```

### Internationalization (i18n)

**Status:** ✅ Infrastructure Complete (100%)

Fabrk uses `next-intl` with 6 locales to provide full UI translation coverage across auth, dashboard, settings, billing, and marketing pages.

**Key Files:**
- `src/i18n/config.ts` - Locale definitions
- `src/i18n/request.ts` - next-intl configuration
- `src/i18n/messages/*.json` - 6 translation files
- `src/middleware.ts` - Combined i18n + auth middleware
- `next.config.ts` - Integrated with next-intl plugin

**Usage in Components:**
```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('common');
  return <button>{t('save')}</button>;
}
```

**Formatting Utilities:**
- `formatCurrency()` - Locale-aware currency
- `formatDate()` - Locale-aware dates
- `formatRelativeTime()` - "2 minutes ago" in all languages
- `formatNumber()` - Thousands separator

**Routing Strategy:** "as-needed" locale prefix
- English: `/features` (no prefix)
- Others: `/es/features`, `/fr/features`, etc.

**Locale Switcher:** Dropdown in navbar with flag emojis, keyboard shortcut (Cmd+L)

### Search Integration (Algolia - Optional)

When Algolia environment variables are configured, the app indexes `pages`, `components`, `templates`, and `docs` for search.

Key files:
- `src/lib/algolia/client.ts` - Search client
- `src/components/search/search-dialog.tsx` - Search UI

### CMS Integration (Sanity - Optional)

When Sanity environment variables are configured, content is managed via Sanity Studio at `/studio`.

Key files:
- `src/lib/sanity/client.ts` - Sanity client
- `src/lib/sanity/queries.ts` - GROQ queries

### Email System (Dual-Mode)

**Pattern:** Both direct sending AND background queue supported.

**When to use each:**
- **Direct Send**: Auth emails (verification, password reset) - immediate delivery required
- **Queue**: Bulk emails, welcome emails, non-critical transactional emails

**Direct Send Functions:**
```typescript
import { sendVerificationEmail, sendResetEmail, sendWelcomeEmail } from '@/lib/email';
```

**Queue Functions:**
```typescript
import { queueVerificationEmail, queueResetEmail, queueWelcomeEmail } from '@/lib/email';
```

**Email Worker:**
```bash
# Production
npm run email:worker

# Development (auto-restart)
npm run email:dev
```

**Queue Features:**
- 3 automatic retries with exponential backoff
- Status tracking: PENDING → SENDING → SENT/FAILED
- Batch processing (10 emails per cycle)
- 5-second polling interval

**Dev Mode:** When `RESEND_API_KEY` is not set, emails log to console instead of sending.

## Design System

### Theme Architecture

**6 Color Themes** (switchable via `/components` page):
- Purple (Default), Ocean Blue, Forest Green, Sunset Orange, Hot Pink, Ruby Red

**Theme Storage:** `localStorage` with key `theme-color`

**CRITICAL RULE:** Always use design tokens, never hardcoded colors.

```typescript
// ✅ GOOD - Theme-responsive
<Button className="bg-primary text-primary-foreground">Click</Button>
<div className="text-muted-foreground border-border">Content</div>

// ❌ BAD - Hardcoded (breaks theme switching)
<Button className="bg-purple-500 text-white">Click</Button>
<div className="text-gray-600 border-gray-300">Content</div>
```

**Color Linting:** Run `npm run scan:hex` to detect hardcoded hex colors. The linter flags any hex values outside of:
- `src/app/globals.css`
- `tailwind.config.ts`

### Design Tokens (CSS Variables)

All components use centralized tokens from `src/app/globals.css`:

```css
--primary                /* Theme-specific primary color */
--primary-foreground     /* Text on primary background */
--background             /* Page background */
--foreground             /* Main text color */
--muted                  /* Muted background */
--muted-foreground       /* Muted text */
--border                 /* Border color */
--card                   /* Card background */
```

**Neo-Brutalism Utilities:**
```css
.rounded-brutal     /* 8px radius */
.border-brutal      /* 2px width */
.shadow-brutal      /* 2px offset shadow */
.shadow-brutal-lg   /* 4px offset shadow */
.shadow-brutal-xl   /* 6px offset shadow */
```

**Semantic Color Pairings:**
- Primary: `bg-primary` + `text-primary-foreground`
- Accent: `bg-accent` + `text-accent-foreground`
- Card: `bg-card` + `text-card-foreground`

### Landing Page Variations

Example marketing layouts live under `/variations/*` and demonstrate theme-responsive design.

## Important Patterns

### API Error Handling (Standard Pattern)

**All API routes follow this structure:**

```typescript
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Business logic
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Description:", error);
    return NextResponse.json({ error: "User-friendly message" }, { status: 500 });
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid input
- `401` - Unauthorized
- `403` - Forbidden (insufficient permissions)
- `422` - Validation failed
- `500` - Server error

### Hydration-Safe Date Pattern (CRITICAL)

**Problem:** Module-level `new Date()` causes hydration mismatches because server and client execute at different times.

❌ **NEVER DO THIS:**
```typescript
// BAD - Causes hydration errors
const now = new Date();  // Executes at different times on server vs client
const events = [{
  timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000)
}];
```

✅ **DO THIS INSTEAD:**

**For React Components (Hooks):**
```typescript
import { useState } from "react";
import { useDemoDates } from "@/lib/utils/demo-dates";

export default function MyComponent() {
  // Pass fixed base date to ensure server/client timestamps match
  const { now, minutesAgo, hoursAgo, daysAgo } = useDemoDates("2025-11-14T00:00:00.000Z");

  const [events] = useState(() => [
    { id: "1", timestamp: now(), title: "Just now" },
    { id: "2", timestamp: minutesAgo(30), title: "30 mins ago" },
    { id: "3", timestamp: hoursAgo(2), title: "2 hours ago" },
    { id: "4", timestamp: daysAgo(5), title: "5 days ago" },
  ]);

  return <Timeline events={events} />;
}
```

**For Storybook Stories (Non-React):**
```typescript
import { generateDemoDates } from "@/lib/utils/demo-dates";

const { now, minutesAgo, hoursAgo, daysAgo } = generateDemoDates();

export const Default: Story = {
  args: {
    timestamp: now(),
    events: [
      { timestamp: daysAgo(10), title: "Old event" },
      { timestamp: hoursAgo(2), title: "Recent event" },
    ],
  },
};
```

**Why This Works:**
- `useDemoDates(fixedBase)` uses fixed ISO timestamp to ensure identical dates on server and client
- Optional parameter: omit for dynamic dates (riskier for hydration), pass for guaranteed safety
- `generateDemoDates()` is a pure function for non-React contexts (Storybook)
- Both generate dates **relative to base**, not build time
- Zero hydration errors, no loading states, production-ready

**Utility Location:** `src/lib/utils/demo-dates.ts`

**API:**
- `useDemoDates(fixedBase?: string)` - Hook with optional fixed base date
- `generateDemoDates(baseDate?: Date)` - Pure function for Storybook
- `now()` - Current time (base date)
- `minutesAgo(n)` - n minutes before now
- `hoursAgo(n)` - n hours before now
- `daysAgo(n)` - n days before now
- `weeksAgo(n)` - n weeks before now
- `monthsAgo(n)` - n months before now

### Testing Strategy

**Testing Infrastructure:**
- Vitest for unit/integration tests
- Playwright for E2E tests
- Storybook for component visual testing

**Test Structure:**
```
tests/
├── e2e/              # Playwright E2E tests
│   ├── auth.spec.ts
│   ├── landing.spec.ts
│   └── navigation.spec.ts
└── unit/             # Vitest unit tests (to be added)
```

**Philosophy:** Provide testing setup, customers add comprehensive tests.

### Component Development with Storybook

Use `npm run storybook` to explore and develop components in isolation.

### Template Gallery System

Templates live under `/templates` and are documented in `src/app/templates/README.md`. Each template is self-contained and can be copied into a production app.

## Path Aliases

```typescript
@/*                 // src/*
@/components/*      // src/components/*
@/lib/*             // src/lib/*
@/app/*             // src/app/*
@/types/*           // src/types/*
@/hooks/*           // src/hooks/*
@/utils/*           // src/utils/*
@/tests/*           // tests/*
```

## Environment Variables

**Required:**
```env
DATABASE_URL                          # PostgreSQL connection
NEXTAUTH_URL                          # http://localhost:3000
NEXTAUTH_SECRET                       # openssl rand -base64 32
STRIPE_SECRET_KEY                     # sk_test_...
STRIPE_WEBHOOK_SECRET                 # whsec_... (from Stripe CLI)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY    # pk_test_...
RESEND_API_KEY                        # Email API key
```

**Optional - Real-Time:**
```env
NEXT_PUBLIC_PUSHER_KEY                # Pusher app key
NEXT_PUBLIC_PUSHER_CLUSTER            # Pusher cluster
PUSHER_APP_ID                         # Pusher app ID
PUSHER_SECRET                         # Pusher secret
```

**Optional - Analytics:**
```env
NEXT_PUBLIC_POSTHOG_KEY               # PostHog project key
NEXT_PUBLIC_POSTHOG_HOST              # https://app.posthog.com
```

**Optional - OAuth:**
```env
GOOGLE_CLIENT_ID                      # Google OAuth
GOOGLE_CLIENT_SECRET                  # Google OAuth
```

**Optional - Search:**
```env
NEXT_PUBLIC_ALGOLIA_APP_ID            # Algolia app ID
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY    # Algolia search key
ALGOLIA_ADMIN_API_KEY                 # Algolia admin key (server-side)
```

**Optional - CMS:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID         # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET            # Sanity dataset
SANITY_API_TOKEN                      # Sanity API token
```

**Stripe Tiers:** See `.env.example` for product IDs:
- `NEXT_PUBLIC_STRIPE_PRICE_STARTER`
- `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL`
- `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE`

## Common Development Tasks

### Add Protected Route
1. Create page in `src/app/(dashboard)/your-page/`
2. Middleware auto-protects based on path

### Add API Route
1. Create `src/app/api/your-endpoint/route.ts`
2. Follow error handling pattern
3. Use `NextResponse` for responses

### Add API Key Protected Endpoint
1. Create route in `src/app/api/v1/your-endpoint/route.ts`
2. Use `requirePermission('read', handler)` wrapper
3. Return 403 for insufficient permissions

### Add Webhook Event
1. Add event type to `src/lib/webhooks/events.ts`
2. Call `triggerWebhook(organizationId, eventType, payload)` when event occurs
3. Document event in `docs/04-features/WEBHOOKS.md`

### Add Stripe Webhook Event
1. Add handler in `src/app/api/webhooks/stripe/route.ts`
2. Follow switch-case pattern
3. Test: `stripe trigger <event-name>`

### Test Stripe Webhooks Locally
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run stripe:listen

# Terminal 3
stripe trigger checkout.session.completed
```

### Add Real-Time Feature
1. Define event type in Pusher configuration
2. Server-side: Use `src/lib/pusher/server.ts` to trigger events
3. Client-side: Create hook or use existing hooks from `src/lib/pusher/client.ts`

### Add New Component
When creating components:
1. Use design tokens for all colors (never hardcoded)
2. Apply neo-brutalism utilities (`border-brutal`, `shadow-brutal`)
3. Use semantic color pairings
4. Create Storybook story in `.stories.tsx` file
5. Run `npm run scan:hex` to verify no hardcoded colors

## Code Style

- **TypeScript strict mode** enabled (no `any` types)
- **No emojis** in code/comments
- **Comments focus on "why" not "what"**
- **ESLint** enforced (run before committing)
- **No Prettier config** (use editor defaults)

## Security Considerations

- **Never commit secrets** (`.env.local` is gitignored)
- **Webhook signature verification** mandatory for Stripe and custom webhooks
- **Password hashing:** bcrypt with 12 rounds
- **JWT sessions:** 30-day expiration
- **Security headers:** Configured in `next.config.ts` (HSTS, CSP, X-Frame-Options)
- **Session versioning:** Increment `User.sessionVersion` to invalidate all sessions
- **API key storage:** SHA-256 hashed, never store raw keys
- **Timing-safe comparison:** Use crypto.timingSafeEqual() for sensitive comparisons
- **HMAC signing:** All webhooks use HMAC-SHA256 signatures

## Deployment

**Vercel (Recommended):**
```bash
vercel
```

**Stripe Webhook Configuration:**
1. Set webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
2. Add events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

**Production Checklist:**
- Set all environment variables
- Configure Stripe webhook in dashboard
- Set up Pusher channels (if using real-time)
- Configure PostHog project (if using analytics)
- Set up Algolia indices (if using search)
- Configure Sanity dataset (if using CMS)
- Consider Redis rate limiting (Upstash)
- Enable error tracking (Sentry)

**Cron Jobs to Configure:**
- Webhook retry worker: `/api/cron/retry-webhooks` (every 5 minutes)
- Notification cleanup: `/api/cron/cleanup-notifications` (daily)

**Build Configuration:**
- `output: "standalone"` enabled for Docker/containers
- Turbopack enabled for faster builds
- Console logs removed in production (except errors/warnings)

## File Organization Philosophy

The project keeps a relatively small, focused file set and avoids unnecessary abstractions.

**When Adding Features:**
- Maintain simplicity principle
- Delete 3 files before adding 1
- Avoid abstractions until needed twice
- Favor direct code over clever architecture

## CI/CD Pipeline

**GitHub Actions Workflows:**
- `ci.yml` - Lint, type check, test, build on every push/PR
- `deploy.yml` - Automated deployment
- `e2e-tests.yml` - Playwright E2E tests
- `maintenance.yml` - Dependency updates
- `performance.yml` - Lighthouse audits
- `pr-checks.yml` - PR validation

**Dependabot:** Configured for weekly dependency updates

## Documentation Structure

```
docs/
├── 01-getting-started/     # Quick start, setup guides
├── 02-launch/              # Launch preparation, marketing
├── 03-development/         # Development guides, testing
├── 04-features/            # Feature documentation
│   ├── MULTI-TENANCY.md
│   ├── REAL-TIME.md
│   ├── ANALYTICS.md
│   ├── WEBHOOKS.md
│   └── API-KEYS.md
├── 05-optimization/        # Performance, conversion
└── 06-operations/          # Post-launch, monitoring
```

## Troubleshooting

**Port 3000 Already in Use:**
`npm run dev` automatically kills existing processes on port 3000.

**Prisma Client Out of Sync:**
```bash
npm run db:push
```

**Type Errors After Schema Change:**
Prisma Client regenerates automatically. Restart TypeScript server if needed.

**Theme Not Persisting:**
Check browser localStorage. Theme key: `theme-color`

**Emails Not Sending:**
- Development: Emails log to console when `RESEND_API_KEY` not set
- Production: Check Resend dashboard for errors

**Webhook Deliveries Failing:**
- Check webhook URL is HTTPS in production
- Verify signature verification in receiving endpoint
- Check delivery history in `/organizations/[slug]/webhooks/[id]`
- Review retry attempts and error messages

**Real-Time Features Not Working:**
- Verify Pusher credentials in environment variables
- Check browser console for Pusher connection errors
- Confirm channel authorization is working (`/api/pusher/auth`)
- Test presence tracking with multiple browser tabs

**Webpack Warnings (React Email):**
Expected. `@react-email` packages are externalized in `next.config.ts` to prevent server-side CSS issues.

## Philosophy: ShipFast-Inspired Simplicity

This codebase follows a **pragmatic simplicity approach** learned from successful boilerplates:

1. **Single config.js** - All settings in one place
2. **Copy-paste friendly** - Customers customize, not extend
3. **No abstractions** until needed twice
4. **Direct code > clever architecture** - Understandable in 5 minutes
5. **Delete first, add never** - Combat feature creep

When adding code, ask: "Does this help customers ship faster?" If no, delete it.
