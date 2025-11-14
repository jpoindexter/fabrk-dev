# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fabrk is a **premium enterprise-grade Next.js 15 SaaS boilerplate** built for professional developers and agencies. Unlike bloated competitors (450-1000 files), Fabrk maintains ~161 essential files while delivering more components (87) than competitors like Makerkit (60).

**Pricing:** $299 one-time payment
**Components:** 87 production-ready (more than any competitor)
**Templates:** 8 copy-paste ready page layouts
**Themes:** 6 color schemes with instant switching
**Test Coverage:** 17,822 test lines (Vitest + Playwright + Storybook)
**Storybook:** Integrated for component development and documentation

**Tech Stack:**
- Next.js 15 (App Router, Server Components, React 19, Turbopack)
- NextAuth v5 (Credentials + OAuth)
- Prisma ORM + PostgreSQL
- Stripe (one-time + subscriptions)
- React Email + Resend
- Radix UI (25 components)
- Tailwind CSS + next-themes
- TypeScript 5 (strict mode)

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

# Testing
npm run test                # Vitest unit tests
npm run test:watch          # Vitest watch mode
npm run test:coverage       # Coverage report
npm run test:e2e            # Playwright E2E tests
npm run test:e2e:ui         # Playwright UI mode
npm run test:all            # Run all tests

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

**Token Flows:**
- Email verification: 24-hour token in `User.verifyToken`
- Password reset: SHA-256 hashed token in `User.resetToken`

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

**Optional Models (can delete if not needed):**
- `Organization` - Multi-tenancy
- `MFADevice` - Two-factor auth
- `BackupCode` - MFA recovery codes
- `Upload` - File uploads
- `EmailQueue` - Queued emails (if using direct send instead)

**Schema Changes:**
```bash
# 1. Edit prisma/schema.prisma
# 2. Push to DB (no migration files needed)
npm run db:push
```

### Internationalization (i18n)

**Status:** ✅ Infrastructure Complete (100%) | ⏳ Component Migration (0%)

Fabrk includes full i18n support with `next-intl` for **5 languages**:
- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇵🇹 Portuguese (pt)

**Translation Coverage:** 200+ keys across 12 sections:
- Common UI actions (save, cancel, edit, delete, etc.)
- Navigation labels
- Complete auth flows (login, register, password reset, email verification)
- Dashboard, settings, billing, team management
- Error messages, landing page content, footer

**Key Files:**
- `src/i18n/config.ts` - Locale definitions (locales, names, flags)
- `src/i18n/request.ts` - next-intl request configuration
- `src/i18n/messages/*.json` - 5 translation files (200+ keys each)
- `src/middleware.ts` - Combined i18n + auth middleware
- `next.config.ts` - Integrated with next-intl plugin

**Usage in Components:**
```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('common');
  return <button>{t('save')}</button>; // "Save" or "Guardar" or "Enregistrer" etc.
}
```

**Routing Strategy:** "as-needed" locale prefix
- English: `/features` (no prefix)
- Others: `/es/features`, `/fr/features`, `/de/features`, `/pt/features`

**Documentation:** See `docs/I18N-IMPLEMENTATION.md` for:
- Complete translation key structure
- How to use translations in components
- Adding new translations/languages
- Creating LocaleSwitcher component
- Migration checklist

**TODO:** Component migration (create LocaleSwitcher, update 30+ components to use translations)

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

Three variations at `/variations/*` demonstrate theme-responsive design:

1. **Modern** (`/variations/modern`) - Soft shadows, rounded corners
2. **SaaS** (`/variations/saas`) - B2B professional with enterprise badges
3. **Startup** (`/variations/startup`) - Bold black background with high-energy accents

All variations respond to theme changes except intentional design choices (e.g., Startup's black background).

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
- `useDemoDates(fixedBase?: string)` - Hook with optional fixed base date (recommended for hydration safety)
- `generateDemoDates(baseDate?: Date)` - Pure function for Storybook stories
- `now()` - Current time (base date)
- `minutesAgo(n)` - n minutes before now
- `hoursAgo(n)` - n hours before now
- `daysAgo(n)` - n days before now
- `weeksAgo(n)` - n weeks before now
- `monthsAgo(n)` - n months before now

**References:**
- Demo: `src/app/components/activity-timeline-demo.tsx`
- Stories: `src/components/ui/activity-timeline.stories.tsx`
- Stories: `src/components/ui/notification-center.stories.tsx`
- Stories: `src/components/ui/chat-message.stories.tsx`

### Testing Strategy

**Minimal Examples Included:**
- 2 API route tests: `register`, `verify-email`
- Test infrastructure: Vitest + Playwright + Storybook

**Philosophy:** Provide testing setup, customers add comprehensive tests.

**Test Structure:**
```
tests/
├── e2e/              # Playwright E2E tests
│   ├── auth.spec.ts
│   ├── landing.spec.ts
│   └── navigation.spec.ts
└── unit/             # Vitest unit tests (to be added)
```

### Template Gallery System

**8 Production-Ready Templates** at `/templates`:
1. Analytics Dashboard
2. Team Dashboard (Multi-tenancy + RBAC)
3. Chart Library (Recharts)
4. User Management (TanStack Table)
5. Settings Page (4 tabs)
6. Billing Dashboard
7. Security & Privacy (2FA, OAuth, sessions)
8. Email Templates Showcase

**Usage Pattern:** Each template is self-contained and copy-paste ready. See `src/app/templates/README.md` for integration guide.

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

**Optional:**
```env
GOOGLE_CLIENT_ID                      # Google OAuth
GOOGLE_CLIENT_SECRET                  # Google OAuth
NEXT_PUBLIC_SENTRY_DSN                # Error tracking
UPSTASH_REDIS_REST_URL                # Rate limiting (production)
UPSTASH_REDIS_REST_TOKEN              # Rate limiting (production)
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

### Add New Component
When creating components:
1. Use design tokens for all colors (never hardcoded)
2. Apply neo-brutalism utilities (`border-brutal`, `shadow-brutal`)
3. Use semantic color pairings
4. Run `npm run scan:hex` to verify no hardcoded colors

## Code Style

- **TypeScript strict mode** enabled (no `any` types)
- **No emojis** in code/comments
- **Comments focus on "why" not "what"**
- **ESLint** enforced (run before committing)
- **No Prettier config** (use editor defaults)

## Security Considerations

- **Never commit secrets** (`.env.local` is gitignored)
- **Webhook signature verification** mandatory for Stripe
- **Password hashing:** bcrypt with 12 rounds
- **JWT sessions:** 30-day expiration
- **Security headers:** Configured in `next.config.ts` (HSTS, CSP, X-Frame-Options)
- **Session versioning:** Increment `User.sessionVersion` to invalidate all sessions

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
- Consider Redis rate limiting (Upstash)
- Enable error tracking (Sentry)

**Build Configuration:**
- `output: "standalone"` enabled for Docker/containers
- Turbopack enabled for faster builds
- Console logs removed in production (except errors/warnings)

## File Organization Philosophy

**Essential Files Only:**
- ~161 total files (vs 450-1000 in competitors)
- ~105 TypeScript/TSX files
- ~25 core UI components
- Minimal dependencies

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
├── architecture/           # Design decisions
├── development-reports/    # Progress audits
├── features/              # Feature documentation
├── migration/             # Migration guides
└── planning/              # Planning documents
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
