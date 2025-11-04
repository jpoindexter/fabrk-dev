# Copilot Instructions - Fabrk Boilerplate

## Project Context

Fabrk is a **production-ready Next.js 15 SaaS boilerplate** being simplified to match successful boilerplates like ShipFast, SaaSBold, and Supastarter. 

**Current State**: Over-engineered (190+ TS files in src/)  
**Target**: ~30-40 essential files following the "ShipFast Philosophy"

## Core Philosophy: RADICAL SIMPLICITY

Learn from **ShipFast** (the most successful boilerplate):
- **~30 components total** (not 32 UI primitives)
- **Single config.js file** for all settings (no scattered env management)
- **Copy-paste friendly** code (customers customize, not extend)
- **Zero abstractions** until you need them twice
- **Documentation over architecture** - simple patterns anyone can modify

**When adding ANY code, ask**: "Would Marc from ShipFast include this?" If no, delete it.

### Why ShipFast Wins (Learn from this)

**ShipFast's Winning Pattern**:
```javascript
// config.js - EVERYTHING in one file
const config = {
  appName: "ShipFast",
  stripe: { plans: [...] },
  mailgun: { fromNoReply: "..." },
  auth: { loginUrl: "/api/auth/signin" }
};
```

**NOT this** (current over-engineered approach):
```
src/config.js
src/lib/email/config.ts
src/lib/stripe/config.ts
docs/ENVIRONMENT.md
docs/CONFIGURATION.md
```

**ShipFast Component Count**: 27 components (ButtonCheckout, ButtonSignin, CTA, FAQ, Footer, Header, Hero, Modal, Pricing, Testimonials, etc.)
**Your Current**: 32 UI primitives + 20+ feature components = **52 components**

**Target**: Delete 40% of components immediately.

## Tech Stack (Keep It Minimal)

- **Framework**: Next.js 15 (App Router, Server Components)
- **Auth**: NextAuth v5 (Credentials + Google OAuth)
- **Database**: Prisma ORM + PostgreSQL (or MongoDB like ShipFast)
- **Payments**: Stripe (one-time purchases priority, subscriptions optional)
- **Email**: Resend (simple, no queue complexity initially)
- **UI**: Tailwind CSS + DaisyUI OR shadcn/ui (NOT both, pick one)
- **Testing**: NONE initially - customers add their own

**🚨 SIMPLIFICATION TARGETS**:
1. Remove 80% of Radix UI components - keep only: Button, Card, Dialog, Dropdown, Input, Label, Textarea
2. Delete entire logger system - use `console.log` in dev, basic Sentry in prod
3. Remove rate limiting, security middleware, audit logs - add when needed
4. Delete WebAuthn, MFA, Organizations, multi-tenancy models
5. Simplify Prisma schema to 5 core models: User, Account, Session, Payment, Purchase

## Critical Architecture Patterns

### 1. Authentication Flow

- **Session**: JWT-based via NextAuth (`src/lib/auth.ts`)
- **Middleware**: Protects `/dashboard`, `/admin`, `/billing`, `/settings` (`src/middleware.ts`)
- **Providers**: Credentials (bcrypt, 12 rounds) + Google OAuth
- **Email verification**: 24-hour token expiry
- **Password reset**: Secure token-based flow

**Example**: All protected routes automatically redirect unauthenticated users to `/`:

```typescript
// src/middleware.ts - path matcher handles protection
matcher: ["/dashboard/:path*", "/admin/:path*", "/billing/:path*", "/settings/:path*"]
```

### 2. Payment Flow (Stripe)

**Dual Architecture**: Supports BOTH one-time payments AND subscriptions

**One-Time Purchase Flow**:
1. `POST /api/stripe/checkout` → Creates Stripe Checkout (mode: "payment")
2. User pays → Stripe redirects to success page
3. Webhook `checkout.session.completed` → Creates `Purchase` + `Customer` + license key
4. Queues welcome email via `EmailQueue`

**Critical**: All checkout sessions use **idempotency keys** (`src/lib/stripe/idempotency.ts`) stored in `CheckoutIdempotency` table to prevent duplicate charges on refresh/retry.

```typescript
// Pattern for payment endpoints
const idempotencyKey = generateCheckoutIdempotencyKey(userId, priceId);
const existing = await getExistingCheckoutSession(idempotencyKey);
if (existing) return NextResponse.json({ url: existing });
```

**Webhook Security**: MUST verify signatures:
```typescript
const signature = req.headers.get("stripe-signature");
const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
```

### 3. Database Access Pattern

**Always use singleton Prisma client**: `import { prisma } from "@/lib/prisma"`
- Prevents multiple instances in development
- No manual connection management needed

**Schema Note**: Intentionally comprehensive but can be simplified. Minimal SaaS needs: `User`, `Account`, `Session`, `VerificationToken`, `Payment`, `Subscription`. Models like `Organization`, `WebAuthnCredential`, `SecurityKey` are optional for basic use.

### 4. Logger Pattern (MARKED FOR DELETION)

**❌ Current Over-Engineered Approach** (`src/lib/logger.ts` - 247 lines):
- Singleton pattern with sanitization
- Buffered logs, flush intervals
- Color coding, Sentry integration
- 247 lines of complexity

**✅ ShipFast Approach** (0 lines):
```javascript
// Development
console.log("Checkout created:", { userId, priceId });

// Production
if (error) {
  console.error("Stripe webhook failed:", error);
  // Optional: throw to Sentry middleware
}
```

**SIMPLIFICATION PLAN**: Delete `src/lib/logger.ts` entirely. Use console.log in dev, add Sentry error boundary for production.

### 5. API Error Handling Standard

**All API routes follow this pattern**:
```typescript
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Business logic
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    logger.error("Action description", error);
    return NextResponse.json({ error: "User-friendly message" }, { status: 500 });
  }
}
```

## Route Organization

```
src/app/
├── (auth)/              # Auth pages: login, register, forgot-password, reset-password
├── (dashboard)/         # Protected: settings, account (middleware auto-protects)
├── api/
│   ├── auth/           # register, verify-email, reset-password, resend-verification
│   │   └── [...nextauth]/  # NextAuth catch-all
│   ├── stripe/         # checkout, portal, verify
│   └── webhooks/
│       └── stripe/     # Payment webhook handler
└── page.tsx            # Landing page
```

## Path Aliases

```typescript
@/*           // src/*
@/components  // src/components
@/lib         // src/lib
@/app         // src/app
```

## Development Workflow

### Essential Commands

```bash
npm run dev              # Dev server (localhost:3000)
npm run db:push          # Push Prisma schema (no migrations)
npm run db:studio        # Prisma Studio GUI
npm run build            # Production build (includes prisma generate)
npm run lint:fix         # Auto-fix ESLint
npm run type-check       # TypeScript validation
```

### Stripe Local Testing

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run stripe:listen    # Forwards webhooks to localhost:3000/api/webhooks/stripe

# Terminal 3
stripe trigger checkout.session.completed  # Test event
```

### Database Schema Changes

```bash
# 1. Edit prisma/schema.prisma
# 2. Push to DB (no migration files)
npm run db:push
# Prisma Client auto-regenerates
```

## Code Style & Conventions

- **No emojis** in code/comments (unless explicitly requested)
- **TypeScript strict mode** enabled
- **Comments**: Focus on "why", not "what"
- **Security**: Never log/commit secrets, always sanitize sensitive data
- **Error messages**: User-friendly (external) vs detailed (logged internally)

## Environment Variables

**Required** (see `.env.example` for full list):
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `RESEND_API_KEY`, `EMAIL_FROM`

**Optional**: Google OAuth (`GOOGLE_CLIENT_ID/SECRET`), Sentry (`NEXT_PUBLIC_SENTRY_DSN`)

**Configuration**: Central config in `src/config.js` for app-wide settings (pricing tiers, feature flags, etc.)

## Adding New Features

### Protected Route
1. Create page in `src/app/(dashboard)/your-page/`
2. Middleware auto-protects based on path matcher

### API Endpoint
1. Create in `src/app/api/your-endpoint/route.ts`
2. Follow error handling pattern above
3. Use `logger.error()` for all exceptions

### Stripe Webhook Event
1. Add handler in `src/app/api/webhooks/stripe/route.ts`
2. Follow switch-case pattern
3. Test with `stripe trigger <event-name>`

### Database Model
1. Edit `prisma/schema.prisma`
2. Run `npm run db:push` (no migration files)
3. Update TypeScript types if needed

## Testing Strategy

**Minimal examples provided** (2 tests: register, verify-email). Customers add comprehensive tests.

- **Unit**: Vitest (`npm run test`) - see `tests/unit/`
- **E2E**: Playwright (`npm run test:e2e`) - see `tests/e2e/`
- **Manual**: Checklist in `docs/02-development/TESTING.md`

## Security Headers

Configured in `next.config.ts`: HSTS, X-Frame-Options, CSP, X-Content-Type-Options, etc.

## Deployment Notes

- **Vercel**: Auto-deploys from `main` branch (see `docs/03-deployment/VERCEL.md`)
- **Stripe webhook**: Configure `https://yourdomain.com/api/webhooks/stripe` in dashboard
- **Production**: Set all env vars, enable Sentry, consider Redis rate limiting (Upstash)
- **Build**: `output: "standalone"` enabled for Docker/containers

## Documentation

- **Setup**: `docs/01-getting-started/SETUP.md` (20-30 min guide)
- **Env Vars**: `docs/01-getting-started/ENVIRONMENT.md` (every var explained)
- **Daily Dev**: `docs/02-development/RUNNING-LOCALLY.md` (workflows + troubleshooting)
- **Stripe**: `docs/03-deployment/STRIPE-SETUP.md` (complete integration guide)

## Simplification Roadmap (Priority Order)

### 1. Delete Immediately
- [ ] `src/lib/logger.ts` - Replace with console.log
- [ ] `src/lib/rate-limit/` - Not needed for boilerplate
- [ ] `src/lib/security/` - Over-engineered
- [ ] `src/lib/middleware.ts` (API middleware) - Keep ONLY auth middleware
- [ ] `src/lib/features/` - Delete entire folder
- [ ] 26 of 32 UI components (keep: button, card, dialog, input, label, select, textarea, toast)
- [ ] All WebAuthn/MFA/Security models from Prisma schema
- [ ] `tests/` folder - Customers write their own
- [ ] Multiple email templates - Keep ONE welcome email example

### 2. Simplify Next
- [ ] Merge `src/lib/email/` into single 100-line `email.ts` file
- [ ] Replace React Email with plain HTML templates (like ShipFast uses Mailgun)
- [ ] Combine all Stripe logic into `src/lib/stripe.ts` (one file, ~150 lines)
- [ ] Flatten `src/app/api/auth/` - 3 routes max (register, verify, reset-password)
- [ ] Convert `src/config.js` to ShipFast style - ALL settings in one file

### 3. Component Philosophy
```javascript
// ❌ WRONG - Abstract component library
<Button variant="primary" size="lg" disabled={loading} />

// ✅ RIGHT - Plain, customizable code
<button className="btn btn-primary" disabled={loading}>
  {loading ? "Loading..." : "Sign Up"}
</button>
```

### 4. Documentation Strategy
- [ ] Delete `docs/` folder - Move to single README.md
- [ ] Single `.env.example` with inline comments (no separate ENVIRONMENT.md)
- [ ] Inline code comments instead of architecture docs

## When Making Changes

1. **DELETE FIRST, ADD NEVER**: Remove 3 files before adding 1
2. **No abstractions**: Direct, copy-paste code > clever architecture
3. **Would ShipFast do this?**: If Marc wouldn't include it, delete it
4. **Keep it hackable**: Customers should understand every line in 5 minutes
5. **Fewer files > clean architecture**: 1 file with 200 lines > 5 files with 40 lines each
