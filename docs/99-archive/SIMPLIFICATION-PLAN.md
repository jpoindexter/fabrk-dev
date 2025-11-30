# Fabrk Boilerplate Simplification Plan

## The Problem

**Current State**: 190+ TypeScript files, 32 UI components, over-engineered architecture  
**Target State**: ~40 essential files, ~10 components, ShipFast-style simplicity

## Why ShipFast Wins

Marc's boilerplate succeeds because:
1. **One config.js** - Everything in one place (100 lines)
2. **27 components** - No abstract UI library, just working components
3. **Zero abstraction** - Copy/paste/modify friendly
4. **Minimal deps** - 15 deps vs your 30+
5. **No tests** - Customers add their own
6. **Simple patterns** - Anyone can understand in 5 minutes

## Immediate Deletions (Do This First)

### 🗑️ Delete These Folders
```bash
rm -rf src/lib/logger.ts              # 247 lines → console.log
rm -rf src/lib/rate-limit/            # Not needed for boilerplate
rm -rf src/lib/security/              # Over-engineered
rm -rf src/lib/features/              # Abstraction overkill
rm -rf tests/                         # Customers write their own
rm -rf docs/                          # Move to README.md
```

### 🗑️ Delete These UI Components (Keep 8, delete 24)
**KEEP**: button.tsx, card.tsx, dialog.tsx, input.tsx, label.tsx, select.tsx, textarea.tsx, toast.tsx

**DELETE**: accordion, alert-dialog, alert, aspect-ratio, avatar, badge, browser-mockup, checkbox, dropdown-menu, form, kpi-card, page-wrapper, popover, progress, radio-group, separator, sheet, skeleton, slider, switch, table, tabs, tooltip

### 🗑️ Simplify Prisma Schema (from 20+ models to 5)
**KEEP**:
- User (email, password, tier, customerId)
- Account (OAuth)
- Session (NextAuth)
- Payment (Stripe tracking)
- Purchase (one-time purchases)

**DELETE**:
- Organization, OrganizationMember, Invitation
- WebAuthnCredential, SecurityKey, TrustedDevice
- LoginHistory, OAuthConnection, SecurityQuestion, RecoveryCode
- AuditLog, Activity, DownloadLog
- EmailQueue (just send emails inline)

## File Consolidation

### Merge Email System (from 8 files → 1 file)
**Current**: `src/lib/email/` folder with service, templates, queue
**Target**: `src/lib/email.ts` (100 lines max)

```javascript
// src/lib/email.ts - ShipFast style
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to, name) {
  return resend.emails.send({
    from: "noreply@yourdomain.com",
    to,
    subject: "Welcome!",
    html: `<p>Hi ${name}, thanks for signing up!</p>`
  });
}
```

### Merge Stripe Logic (from 6 files → 1 file)
**Current**:
- `src/lib/stripe/client.ts`
- `src/lib/stripe/idempotency.ts`
- `src/lib/stripe/config.ts`
- Plus API routes

**Target**: `src/lib/stripe.ts` (150 lines)

```javascript
// src/lib/stripe.ts - Everything in one place
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckout(userId, priceId) {
  // All checkout logic here
}

export async function handleWebhook(event) {
  // All webhook logic here
}
```

### Consolidate Config (ShipFast's Killer Feature)
**Current**: Settings scattered across 5+ files
**Target**: ONE `config.js` file (100 lines) like ShipFast

```javascript
// config.js - EVERYTHING here
const config = {
  app: {
    name: "Fabrk",
    url: process.env.NEXT_PUBLIC_APP_URL
  },
  stripe: {
    plans: [
      { priceId: "price_123", name: "Starter", price: 29 }
    ]
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard"
  },
  email: {
    from: "noreply@fabrk.io"
  }
};
```

## Component Philosophy Change

### ❌ WRONG (Current Over-Engineering)
```typescript
// 32 primitive components with 10 variants each
<Button variant="default" size="lg" className="w-full" disabled={loading}>
  Sign Up
</Button>

// Requires: button.tsx, cva setup, theme config, etc.
```

### ✅ RIGHT (ShipFast Pattern)
```javascript
// Direct, modifiable components
<button className="btn btn-primary w-full" disabled={loading}>
  {loading ? "Loading..." : "Sign Up"}
</button>

// Or simple component:
// components/ButtonCheckout.js - 30 lines total
```

## File Count Target

**Current**: 190 TS files in src/  
**Target**: ~40 files total

**ShipFast Structure**:
```
app/
  api/               # 5-6 API routes
  dashboard/         # 2-3 pages
  page.js           # Landing
components/         # 27 components (all feature components, no primitives)
libs/              # 3-4 utility files
config.js          # THE SINGLE SOURCE OF TRUTH
```

## API Simplification

### Before (Over-Engineered)
```
src/app/api/
  auth/
    register/route.ts
    verify-email/route.ts
    reset-password/route.ts
    resend-verification/route.ts
    [...nextauth]/route.ts
  stripe/
    checkout/route.ts
    portal/route.ts
    verify/route.ts
  webhooks/
    stripe/route.ts
  payment/
    confirm/route.ts
```

### After (ShipFast Style)
```
app/api/
  auth/
    [...nextauth]/route.js
  stripe/
    create-checkout/route.js  # Combines checkout + verify
    webhooks/route.js          # Single webhook handler
```

## Documentation Strategy

### ❌ DELETE
- `docs/01-getting-started/` (5 files)
- `docs/02-development/` (4 files)
- `docs/03-deployment/` (3 files)
- All separate markdown guides

### ✅ CREATE
- **ONE** comprehensive README.md with:
  - 5-minute quickstart
  - Inline env var explanations
  - Code examples embedded
  - Link to official docs (ship in 5 minutes tutorial style)

**ShipFast README**: 50 lines max, links to one external tutorial

## Testing Philosophy

**Current**: Vitest + Playwright setup, example tests  
**ShipFast**: Zero tests included

**Why?** 
- Boilerplate customers test their own features
- Including tests suggests "production app" not "starter kit"
- Every customer's testing needs are different

**Action**: Delete `tests/` entirely

## The "Would Marc Do This?" Test

Before keeping ANY file/feature, ask:

1. **Is it in ShipFast?** If no, probably delete
2. **Can customers add it themselves?** If yes, delete
3. **Does it require reading docs?** If yes, simplify or delete
4. **Is it >100 lines?** Split or delete
5. **Is it an abstraction?** Delete unless used 3+ times

## Migration Checklist

### Phase 1: Delete (1 hour)
- [ ] Delete logger.ts, rate-limit/, security/, features/
- [ ] Delete 24 of 32 UI components
- [ ] Delete tests/ folder
- [ ] Delete docs/ folder (save content for README)
- [ ] Simplify Prisma schema to 5 models

### Phase 2: Consolidate (2 hours)
- [ ] Merge email system into src/lib/email.ts (100 lines)
- [ ] Merge Stripe logic into src/lib/stripe.ts (150 lines)
- [ ] Create single config.js (ShipFast style)
- [ ] Flatten API routes (5 routes max)
- [ ] Replace React Email with plain HTML

### Phase 3: Convert Components (2 hours)
- [ ] Convert remaining components to simple, flat files
- [ ] Remove all variant/size abstractions
- [ ] Make everything copy-paste friendly
- [ ] Add inline comments instead of external docs

### Phase 4: Documentation (1 hour)
- [ ] Write single comprehensive README.md
- [ ] Add inline env var comments to .env.example
- [ ] Delete all separate docs
- [ ] Create "Ship in 5 minutes" quickstart

### Phase 5: Verification (30 min)
- [ ] File count: ~40 files in src/
- [ ] Component count: ~30 total components
- [ ] Can spin up in <5 minutes?
- [ ] Can make first sale in <1 hour?
- [ ] Is every file <200 lines?
- [ ] Zero abstractions that require explanation?

## Success Metrics

**Before**: "I need to read 12 docs to understand this"  
**After**: "I can see how everything works by reading the code"

**Before**: 190 files, need to trace through 5 files to find logic  
**After**: 40 files, everything obvious and in one place

**Before**: "Enterprise-ready architecture"  
**After**: "Ship fast, refactor later"

## Key Insight from ShipFast

Marc doesn't sell architecture - he sells **speed to first dollar**.

Customers don't want:
- ✗ Comprehensive error handling
- ✗ Enterprise logging system
- ✗ Rate limiting middleware
- ✗ 32 UI primitive components
- ✗ 12 documentation pages

Customers want:
- ✓ Working auth in 5 minutes
- ✓ Accept payment in 1 hour
- ✓ Ship to production same day
- ✓ Code they can actually modify
- ✓ No magic, no abstraction, just working code

## Next Steps

1. **Backup current state**: `git branch backup-before-simplification`
2. **Start deleting**: Begin with Phase 1 (delete folders)
3. **Consolidate**: Phase 2 (merge files)
4. **Test**: Can you make a test purchase end-to-end?
5. **Document**: Single README.md
6. **Verify**: Compare to ShipFast - are you simpler or more complex?

Remember: **Every line of code is a liability**. Delete everything you can.
