# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**Fabrk** is a premium enterprise-grade Next.js 15 SaaS boilerplate with 87 production-ready components, comprehensive testing, and complete feature parity for launching SaaS products.

**Core Tech Stack:**
- Next.js 15 (App Router, React 19, TypeScript 5 strict mode)
- NextAuth v5 (Credentials + Google OAuth)
- Stripe (one-time payments + subscriptions)
- Prisma ORM + PostgreSQL
- Resend + React Email templates
- Framer Motion (v12.23.24) for animations
- Radix UI (25+ primitives) + Tailwind CSS 4
- Vitest (1500+ tests, 1200+ passing, 80% pass rate)
- Playwright E2E tests
- Storybook (95% coverage)
- next-intl (6 languages)

**Current Version:** 1.0.0 | **Files:** 156 | **Components:** 87

---

## Essential Commands

### Development & Build
```bash
npm run dev              # Start dev server (auto-kills port 3000)
npm run build            # Production build (runs prisma generate first)
npm start                # Start production server
npm run analyze          # Analyze bundle size
```

### Database
```bash
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Prisma Studio GUI
npm run db:seed          # Seed test data
npm run db:reset         # Reset database and reseed
npm run db:migrate       # Create migration
```

### Code Quality
```bash
npm run lint             # ESLint + hex color scan (checks for hardcoded colors)
npm run scan:hex         # Detect stray hex color codes (must use design tokens)
npm run type-check       # TypeScript validation
npm run format           # Prettier format
npm run format:check     # Check if formatting needed
```

### Testing
```bash
npm test                 # Vitest unit tests
npm run test:watch       # Vitest watch mode
npm run test:coverage    # Coverage report
npm run test:ui          # Vitest UI
npm run test:e2e         # Playwright E2E tests
npm run test:e2e:ui      # Playwright UI
npm run test:e2e:headed  # Playwright with visible browser
npm run test:a11y        # Accessibility tests
npm run test:all         # Run Vitest + Playwright
```

### Component Development
```bash
npm run storybook        # Start Storybook (port 6006)
npm run build-storybook  # Build static Storybook site
```

### Third-Party Integration Testing
```bash
npm run stripe:listen    # Forward Stripe webhooks to localhost
npm run jobs:dev         # Background job worker (auto-restart)
npm run email:dev        # Email queue worker (auto-restart)
```

---

## High-Level Architecture

### Three-Layer Design
```
UI Layer (src/app/)
   ↓
API Layer (src/app/api/)
   ↓
Service Layer (src/lib/)
```

### Project Structure
```
fabrk/
├── src/
│   ├── app/
│   │   ├── [locale]/          # i18n routes (en, es, fr, etc)
│   │   ├── (legal)/           # Legal pages (privacy, terms, refund)
│   │   ├── variations/        # Hero/pricing layout variations
│   │   ├── components/        # Component showcase page
│   │   ├── templates/         # Copy-paste ready templates
│   │   ├── api/              # API routes (v1, webhooks)
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # 25 Radix UI primitives
│   │   ├── landing/           # Landing page sections
│   │   ├── dashboard/         # Dashboard components
│   │   ├── settings/          # Settings pages
│   │   └── ...other components
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── db/                # Prisma client & utilities
│   │   ├── stripe.ts          # Stripe utilities
│   │   ├── email.ts           # Email sending
│   │   ├── webhooks/          # Webhook utilities
│   │   └── utils/             # General utilities
│   ├── emails/                # React Email templates
│   ├── prisma/                # Database schema
│   ├── types/                 # TypeScript type definitions
│   ├── hooks/                 # Custom React hooks
│   ├── middleware.ts          # NextAuth + i18n middleware
│   ├── config.js              # Central configuration ⭐
│   └── globals.css            # Tailwind + CSS variables
├── .storybook/                # Storybook config
├── tests/
│   ├── e2e/                   # Playwright tests
│   ├── unit/                  # Vitest tests
│   └── accessibility/         # A11y tests
├── docs/                      # Documentation (400KB)
├── scripts/                   # Utilities & workers
└── prisma/                    # Database schema & seeding
```

---

## Critical Files & Patterns

### Central Configuration (⭐ Always update first)
**`src/config.js`** - Single source of truth for ALL app settings:
- App metadata (name, description, URL)
- Authentication providers (Google OAuth config)
- Stripe payment configuration (price IDs, API keys)
- Email configuration (Resend API)
- Feature flags (analytics, blog, CMS, etc)
- Subscription tiers
- Product pricing
- Search & CMS configuration

**Important:** When adding features, ALWAYS update `src/config.js` first before implementing elsewhere.

### Authentication Flow (NextAuth v5)
**`src/lib/auth.ts`** - NextAuth configuration with:
- JWT session strategy (30-day expiration)
- Credentials provider (email/password with bcrypt)
- Google OAuth provider (conditional, based on `GOOGLE_CLIENT_ID`)

**`src/middleware.ts`** - Protects routes:
- `/dashboard/*` - Requires authentication
- `/admin/*` - Requires admin role
- `/billing/*` - Requires authentication
- Also handles i18n routing

**Pattern for protected API routes:**
```typescript
const session = await auth();
if (!session?.user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

### Stripe Payment Integration
**`src/lib/stripe.ts`** + **`src/app/api/stripe/checkout/route.ts`** - Payment flow:
1. Create Stripe Checkout session
2. User pays
3. Webhook triggers (`src/app/api/webhooks/stripe/route.ts`)
4. Payment record created in database
5. Welcome email queued

**Idempotency Pattern** (prevents duplicate charges):
- `CheckoutSession` model tracks sessions
- Same user + price = returns existing checkout URL
- Prevents duplicate charges on page refresh

### Multi-Tenancy & RBAC
**Models:** `Organization`, `OrganizationMember`, `OrganizationInvite`

**Roles:**
- `OWNER` - Full control
- `ADMIN` - All permissions except delete org
- `MEMBER` - Standard access
- `GUEST` - Read-only

**API Routes:**
- `POST /api/v1/organizations` - Create
- `GET /api/v1/organizations` - List user's orgs
- `POST /api/v1/organizations/invite` - Send invite

### Real-Time Features (Pusher)
**`src/lib/pusher/server.ts`** + **`src/lib/pusher/client.ts`**:
- Notifications (bell icon with badge)
- Activity feed (org events)
- Presence tracking (online members)

### Webhooks System
**`src/lib/webhooks/server.ts`** - Production-grade webhook handling:
- 22 webhook event types
- HMAC-SHA256 signature verification
- Automatic retry with exponential backoff
- Delivery tracking

### Database Architecture
**Prisma ORM** with PostgreSQL:
- **Core Models (7):** User, Account, Session, VerificationToken, Payment, CheckoutSession, WebhookEvent
- **Enterprise Models:** Organization, Webhook, ApiKey, AuditLog, Notification, FeatureFlag, etc.

**Schema changes:**
```bash
# Edit prisma/schema.prisma
npm run db:push      # Push changes (no migration files)
```

### Email System (Dual-Mode)
**Direct Send:** For auth emails (verification, password reset) - immediate
```typescript
import { sendVerificationEmail, sendResetEmail } from '@/lib/email';
```

**Queue System:** For bulk/transactional emails - async
```typescript
import { queueWelcomeEmail, queueConfirmationEmail } from '@/lib/email';
npm run email:dev    # Run worker with auto-restart
```

### Design System & Styling
**CRITICAL RULE:** Use design tokens, never hardcoded colors.

**CSS Variables in `src/app/globals.css`:**
```css
--primary              /* Theme-specific */
--primary-foreground   /* Text on primary */
--background
--foreground
--muted
--muted-foreground
--border
--card
--destructive          /* Error/danger */
--success              /* Success states */
```

**6 Color Themes:**
- Purple (default)
- Ocean Blue
- Forest Green
- Sunset Orange
- Hot Pink
- Ruby Red

**Strict Rule - Run linter to catch violations:**
```bash
npm run scan:hex      # Detects hardcoded hex colors ❌
```

**Components must use Radix UI primitives from `src/components/ui/` with theme tokens:**
```typescript
// ✅ GOOD
<Button className="bg-primary text-primary-foreground">
<div className="text-muted-foreground border-border">

// ❌ BAD (breaks theme switching)
<Button className="bg-purple-500 text-white">
<div className="text-gray-600">
```

---

## Important Implementation Patterns

### Animation with Framer Motion
Landing page sections use consistent animation patterns:
```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  viewport={{ once: true }}
>
  {content}
</motion.div>
```

**Key properties:**
- `initial` - Starting state
- `whileInView` - State when in viewport (scroll animations)
- `transition` - Animation timing + delays
- `viewport={{ once: true }}` - Only animate on first scroll into view

### Hydration Safety (Radix UI)
Radix UI components can cause hydration mismatches. Add `suppressHydrationWarning` prop:
```typescript
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

<Accordion suppressHydrationWarning>
  {/* items */}
</Accordion>
```

### i18n with next-intl
**Locale routing:** "as-needed" prefix
- English: `/features` (no prefix)
- Others: `/es/features`, `/fr/features`, etc.

**6 languages:** English, Spanish, French, German, Portuguese, Japanese

**In components:**
```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('common');
return <button>{t('save')}</button>;
```

### Environment Variable Usage
**ALWAYS use validated env vars from `src/lib/env.ts`:**

```typescript
import { env } from '@/lib/env';

// ✅ GOOD - Type-safe and validated
const apiKey = env.server.STRIPE_SECRET_KEY;
const appUrl = env.client.NEXT_PUBLIC_APP_URL;

// ❌ BAD - No validation or type safety
const apiKey = process.env.STRIPE_SECRET_KEY;
```

**When adding new environment variables:**
1. Add to Zod schema in `src/lib/env.ts` first
2. Update `.env.example` with documentation
3. Use via `env.server` or `env.client` in code
4. Never use `process.env` directly (bypasses validation)

### CSRF Protection Pattern
**Auth routes automatically protected by Next.js:**
```typescript
// In API routes handling authentication
import { auth } from '@/lib/auth';

// CSRF tokens handled by NextAuth automatically
const session = await auth();
```

**For custom forms requiring CSRF:**
```typescript
import { getCsrfToken } from 'next-auth/react';

const csrfToken = await getCsrfToken();
```

### Testing Strategy
- **Vitest** - Unit/integration tests (1500+ tests total, 1200+ passing)
- **Playwright** - E2E tests (critical user flows)
- **Storybook** - Visual testing (95% coverage)
- **Accessibility** - axe/playwright a11y tests

**Run all tests:**
```bash
npm run test:all
```

---

## Commonly Modified Files

1. **`src/config.js`** - App settings, pricing, feature flags (uses validated env vars)
2. **`src/lib/env.ts`** - Environment variable validation (add new vars here first)
3. **`src/app/[locale]/page.tsx`** - Landing page content
4. **`src/components/landing/*`** - Landing page sections (with animations)
5. **`src/components/ui/*`** - Theme-using UI components
6. **`src/lib/auth.ts`** - Auth configuration
7. **`src/app/api/*`** - API endpoints
8. **`prisma/schema.prisma`** - Database schema
9. **`src/app/globals.css`** - Theme colors & design tokens
10. **`src/emails/*`** - Email templates

---

## Key Technical Decisions

### Environment Variable Validation
- **Type-Safe Validation:** All environment variables validated with Zod at startup
- **Fail Loudly:** Invalid/missing variables cause immediate startup failure with clear errors
- **Conditional Requirements:** Variables required based on feature flags (e.g., Stripe keys only if payments enabled)
- **Production Safety:** Critical vars like `DATABASE_URL` required in production, optional in dev
- **Format Validation:** API keys validated to match expected formats (e.g., `sk_test_` for Stripe)

**Pattern for using environment variables:**
```typescript
import { env } from '@/lib/env';

// Server-side (never exposed to browser)
const dbUrl = env.server.DATABASE_URL;
const stripeKey = env.server.STRIPE_SECRET_KEY;

// Client-side (must be NEXT_PUBLIC_* prefix)
const appUrl = env.client.NEXT_PUBLIC_APP_URL;
```

**See:** `/docs/ENV-VALIDATION.md` for complete guide

### Payment Flow
- **Mode:** Supports both one-time purchases AND subscriptions
- **Idempotency:** Uses `CheckoutSession` model to prevent duplicate charges
- **Webhook Deduplication:** `WebhookEvent` model tracks Stripe event IDs

### API Design
- **Status Codes:** 200 (success), 400 (bad input), 401 (unauthorized), 403 (forbidden), 422 (validation), 500 (server error)
- **Pattern:** Try → Validate → Return JSON or error

### Error Handling
**Consistent pattern in all API routes:**
```typescript
try {
  // Business logic
  return NextResponse.json({ data }, { status: 200 });
} catch (error) {
  console.error("Description:", error);
  return NextResponse.json({ error: "User message" }, { status: 500 });
}
```

### Security
- **Passwords:** bcryptjs with 12 rounds
- **Sessions:** JWT with 30-day expiration
- **Session Versioning:** Increment `User.sessionVersion` to invalidate all sessions
- **API Keys:** 256-bit crypto + SHA-256 hashing + timing-safe comparison
- **Webhook Signatures:** HMAC-SHA256 verification (ALWAYS verify)
- **CSRF Protection:** Auth routes protected with Next.js built-in CSRF tokens
- **Environment Validation:** All sensitive keys validated at startup (never fail silently)

### Accessibility
- **WCAG 2.1 AA Compliant:** All components meet accessibility standards
- **Keyboard Navigation:** Full keyboard support across UI components
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **Focus Management:** Clear focus indicators and logical tab order
- **Color Contrast:** Minimum 4.5:1 contrast ratio for text

---

## Feature Flags & Optional Features

Located in `src/config.js`:
- `emailVerification` - Email verification on signup
- `passwordReset` - Password reset via email
- `googleAuth` - Google OAuth (if `GOOGLE_CLIENT_ID` set)
- `subscriptions` - Subscription billing mode
- `oneTimePurchases` - One-time payment mode
- `trialPeriod` - 14-day trial
- `analytics` - PostHog integration
- `algoliaSearch` - Algolia search (if keys set)
- `sanityCMS` - Sanity CMS (if project ID set)

---

## Troubleshooting Common Issues

### Environment Variable Validation Errors
**Cause:** Missing or invalid environment variables

**Symptoms:**
```
❌ Invalid server environment variables:
{
  "NEXTAUTH_SECRET": {
    "_errors": ["String must contain at least 32 character(s)"]
  }
}
```

**Solution:**
1. Check the error message for the specific variable
2. Add or fix the variable in `.env.local`:
   ```bash
   # Generate a strong secret
   openssl rand -base64 32

   # Add to .env.local
   echo "NEXTAUTH_SECRET=your-generated-secret" >> .env.local
   ```
3. Verify format matches expectations (e.g., Stripe keys start with `sk_test_` or `sk_live_`)
4. See `/docs/ENV-VALIDATION.md` for complete validation rules

### Hydration Mismatch Errors
**Cause:** Radix UI components with different IDs on server vs client

**Solution:** Add `suppressHydrationWarning` prop to component:
```typescript
<Accordion suppressHydrationWarning type="single">
```

### Hardcoded Colors Breaking Theme
**Cause:** Used hex colors instead of CSS variables

**Solution:** Run lint to detect:
```bash
npm run scan:hex
```
Use tokens from `globals.css` instead.

### Port 3000 Already in Use
**Solution:** The dev script auto-kills processes, so just run:
```bash
npm run dev
```

### Prisma Client Out of Sync
**Solution:**
```bash
npm run db:push
```

### Stripe Webhook Testing
```bash
npm run stripe:listen    # Terminal 1: Forward webhooks
npm run dev              # Terminal 2: Start app
stripe trigger checkout.session.completed  # Terminal 3: Trigger event
```

### TypeScript Errors with Environment Variables
**Cause:** Using `process.env` instead of validated `env` object

**Solution:**
```typescript
// ❌ BAD - No type safety
const key = process.env.STRIPE_SECRET_KEY;

// ✅ GOOD - Type-safe and validated
import { env } from '@/lib/env';
const key = env.server.STRIPE_SECRET_KEY;
```

---

## Key Metrics

- **Files:** 156 (cleaner than competitors)
- **Components:** 87 (30% more than shadcn/ui's 67)
- **Themes:** 6 (switchable)
- **Test Suite:** 1500+ total tests, 1200+ passing (80% pass rate)
- **Storybook:** 95% component coverage
- **Documentation:** 400KB+ across 25+ guides
- **TypeScript:** 100% strict mode
- **Accessibility:** WCAG 2.1 AA compliant
- **Security:** Environment validation, CSRF protection, secure session management
- **Performance:** Production-ready with CI/CD

---

## Documentation Reference

**Key docs to read first:**
- `/docs/01-getting-started/QUICK-START.md` - Setup guide
- `/docs/ENV-VALIDATION.md` - Environment variable validation guide
- `/docs/COMPONENT-SHOWCASE.md` - All 87 components
- `/docs/API-REFERENCE.md` - Complete API docs
- `/docs/TESTING-GUIDE.md` - Testing setup
- `/docs/DEPLOYMENT.md` - Production deployment

**Browse all:** `/docs/` directory

---

## Philosophy

This codebase prioritizes:
1. **Simplicity** - Clean, understandable code
2. **Pragmatism** - No over-engineering
3. **Copy-paste friendly** - Customers customize, not extend
4. **Direct patterns** - Proven approaches, not clever architecture
5. **Ship-first mentality** - Production-ready from day one

When adding features, ask: "Does this help ship faster?" If no, delete it.

---

## Support & Resources

- **Discord:** Join the community for questions
- **Email:** support@fabrk.dev (<24hr response)
- **Issues:** Report bugs on GitHub
- **Docs:** 400KB comprehensive documentation

---

**Last Updated:** November 18, 2025
**Version:** 1.0.0
