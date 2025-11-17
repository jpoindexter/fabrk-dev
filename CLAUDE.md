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
- Vitest (931+ tests, 64% coverage)
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

### Testing Strategy
- **Vitest** - Unit/integration tests (931+ tests)
- **Playwright** - E2E tests (critical user flows)
- **Storybook** - Visual testing (95% coverage)
- **Accessibility** - axe/playwright a11y tests

**Run all tests:**
```bash
npm run test:all
```

---

## Commonly Modified Files

1. **`src/config.js`** - App settings, pricing, feature flags
2. **`src/app/[locale]/page.tsx`** - Landing page content
3. **`src/components/landing/*`** - Landing page sections (with animations)
4. **`src/components/ui/*`** - Theme-using UI components
5. **`src/lib/auth.ts`** - Auth configuration
6. **`src/app/api/*`** - API endpoints
7. **`prisma/schema.prisma`** - Database schema
8. **`src/app/globals.css`** - Theme colors & design tokens
9. **`src/emails/*`** - Email templates

---

## Key Technical Decisions

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

---

## Key Metrics

- **Files:** 156 (cleaner than competitors)
- **Components:** 87 (30% more than shadcn/ui's 67)
- **Themes:** 6 (switchable)
- **Test Coverage:** 64% with 931+ tests
- **Storybook:** 95% coverage
- **Documentation:** 400KB across 24 guides
- **TypeScript:** 100% strict mode
- **Performance:** Production-ready with CI/CD

---

## Documentation Reference

**Key docs to read first:**
- `/docs/QUICK-START.md` - Setup guide
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

**Last Updated:** November 17, 2025
**Version:** 1.0.0
