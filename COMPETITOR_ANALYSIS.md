# Next.js SaaS Boilerplate Feature Comparison Matrix

**Research completed:** 2025-12-03

This report compares popular Next.js SaaS boilerplates to identify what features competitors include vs exclude, and whether Fabrk has over-built features.

---

## Executive Summary

### Key Findings

1. **Fabrk is MORE feature-rich than most competitors** - particularly in enterprise features (webhooks, multi-tenancy, notifications, admin panels)
2. **Rate limiting is RARELY included** - Only 1-2 boilerplates mention it
3. **Teams/Organizations are optional** - ShipFast and create-t3-app don't include it
4. **Most boilerplates ship MINIMAL features** - They focus on "ship fast" over completeness
5. **Fabrk has features NO competitor offers:** Webhook delivery system, real-time notifications (Pusher), feature flags, 234 components, 20 themes

---

## Feature Matrix

| Feature | ShipFast | Supastarter | next-saas-starter (Official) | create-t3-app | Fabrk |
|---------|----------|-------------|------------------------------|---------------|-------|
| **AUTHENTICATION** |
| Email/Password | ✅ | ✅ | ✅ | ❌ (blank slate) | ✅ |
| Google OAuth | ✅ | ✅ | ❌ | ❌ | ✅ |
| Magic Links | ✅ | ✅ | ❌ | ❌ | ❌ |
| Email Verification | ❌ | ❌ | ❌ | ❌ | ✅ |
| Password Reset | ❌ | ❌ | ❌ | ❌ | ✅ |
| NextAuth v5 | ✅ | ❌ (Lucia) | ✅ | ❌ | ✅ |
| **PAYMENTS** |
| Stripe | ✅ | ✅ | ✅ | ❌ | ✅ |
| Lemon Squeezy | ✅ | ✅ | ❌ | ❌ | ❌ |
| Polar.sh | ❌ | ❌ | ❌ | ❌ | ✅ |
| One-time Payments | ✅ | ✅ | ❌ | ❌ | ✅ |
| Subscriptions | ✅ | ✅ | ✅ | ❌ | ✅ |
| Webhooks (Stripe) | ✅ | ✅ | ❌ | ❌ | ✅ |
| **DATABASE** |
| PostgreSQL | ❌ (Mongo) | ✅ | ✅ | ✅ (optional) | ✅ |
| MongoDB | ✅ | ❌ | ❌ | ❌ | ❌ |
| Prisma ORM | ❌ | ✅ | ❌ (Drizzle) | ✅ (optional) | ✅ |
| Drizzle ORM | ❌ | ✅ (alt) | ✅ | ❌ | ❌ |
| **EMAIL** |
| Resend | ❌ | ❌ | ❌ | ❌ | ✅ |
| Mailgun | ✅ | ❌ | ❌ | ❌ | ❌ |
| SendGrid | ❌ | ❌ | ❌ | ❌ | ❌ |
| Transactional Emails | ✅ | ❌ | ❌ | ❌ | ✅ |
| Email Queue System | ❌ | ❌ | ❌ | ❌ | ✅ |
| **MULTI-TENANCY** |
| Teams/Organizations | ❌ | ✅ | ❌ | ❌ | ✅ |
| Team Invitations | ❌ | ✅ | ❌ | ❌ | ✅ |
| RBAC (Roles & Permissions) | ❌ | ❌ | ✅ (Owner/Member) | ❌ | ✅ |
| Org Switching | ❌ | ✅ | ❌ | ❌ | ✅ |
| **SECURITY** |
| Rate Limiting | ❌ | ❌ | ❌ | ❌ | ✅ (config only) |
| CORS Handling | ❌ | ❌ | ❌ | ❌ | ❌ |
| API Key Management | ❌ | ❌ | ❌ | ❌ | ✅ |
| Bot Protection | ❌ | ❌ | ❌ | ❌ | ❌ |
| **ADVANCED FEATURES** |
| Webhooks (outbound) | ❌ | ❌ | ❌ | ❌ | ✅ (22 event types) |
| Webhook Delivery Retry | ❌ | ❌ | ❌ | ❌ | ✅ |
| Real-Time Notifications | ❌ | ❌ | ❌ | ❌ | ✅ (Pusher) |
| Admin Panel | ❌ | ✅ | ❌ | ❌ | ✅ |
| User Impersonation | ❌ | ✅ | ❌ | ❌ | ❌ |
| Feature Flags | ❌ | ❌ | ❌ | ❌ | ✅ |
| Health Check Endpoint | ❌ | ❌ | ❌ | ❌ | ✅ |
| **UI/COMPONENTS** |
| Component Count | ~30 | 100+ | ~20 | 0 (blank) | 234 |
| Radix UI | ❌ | ✅ | ✅ | ❌ | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ | ✅ | ✅ v4 |
| Theme Switching | ✅ (dark only) | ✅ | ❌ | ❌ | ✅ (20 themes) |
| Design System | ❌ | ❌ | ❌ | ❌ | ✅ (terminal) |
| **DOCUMENTATION** |
| Docs Site | ✅ | ✅ | ❌ | ✅ | ✅ |
| Video Tutorials | ✅ | ❌ | ❌ | ❌ | ❌ |
| Blog Template | ✅ | ✅ | ❌ | ❌ | ❌ |
| MDX Support | ❌ | ✅ | ❌ | ❌ | ❌ |
| **TESTING** |
| Unit Tests (Vitest) | ❌ | ❌ | ❌ | ❌ | ✅ (130+) |
| E2E Tests (Playwright) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Storybook | ❌ | ❌ | ❌ | ❌ | ✅ (95% coverage) |
| **AI FEATURES** |
| AI SDK Integration | ❌ | ✅ | ❌ | ❌ | ❌ |
| LLM Support (OpenAI/Anthropic) | ✅ (ChatGPT) | ✅ | ❌ | ❌ | ❌ |
| **PRICING** |
| One-Time Cost | $199 | $349 | Free | Free | $199 |
| License | Unlimited use | Unlimited use | MIT | MIT | Unlimited use |

---

## Detailed Analysis by Competitor

### 1. ShipFast ($199)

**What's Included:**
- Authentication: Email, Google OAuth, magic links
- Payments: Stripe + Lemon Squeezy (webhooks included)
- Database: MongoDB + Mongoose OR Supabase
- Email: Mailgun integration
- UI: Basic components (buttons, modals, pricing tables, FAQs)
- SEO optimization
- Blog system
- ChatGPT integration (AI prompts for legal pages)

**What's NOT Included:**
- ❌ Teams/Organizations (solo founder focus)
- ❌ Rate limiting
- ❌ RBAC
- ❌ Email verification flow
- ❌ Password reset flow
- ❌ Admin panel
- ❌ Webhooks (outbound)
- ❌ Real-time features
- ❌ Testing suite

**Target Audience:** Solo indie hackers who want to ship FAST

---

### 2. Supastarter ($349)

**What's Included:**
- Authentication: Lucia Auth (fully customizable)
- Payments: Stripe + Lemon Squeezy
- Database: Prisma OR Drizzle
- Multi-tenancy: Teams + user management
- Admin panel with user impersonation
- Landing page + MDX blog + MDX docs
- Newsletter signup
- Analytics integration
- AI SDK (Vercel AI SDK for OpenAI/Anthropic/HuggingFace)
- File storage (Supabase Storage + S3)
- Multi-framework: Next.js, Nuxt, SvelteKit

**What's NOT Included:**
- ❌ Rate limiting
- ❌ Webhooks (outbound)
- ❌ Real-time notifications
- ❌ Email verification
- ❌ Testing suite

**Target Audience:** Teams who want the most complete boilerplate + AI features

---

### 3. next-saas-starter (Official Next.js, FREE)

**What's Included:**
- Authentication: JWT tokens in cookies
- Payments: Stripe subscription management
- Database: PostgreSQL + Drizzle ORM
- RBAC: Owner/Member roles
- UI: shadcn/ui components
- Dashboard for logged-in users

**What's NOT Included:**
- ❌ Google OAuth (email/password only)
- ❌ Teams/Organizations
- ❌ Email system
- ❌ Rate limiting
- ❌ Admin panel
- ❌ Webhooks
- ❌ Testing
- ❌ Documentation site

**Target Audience:** Developers who want official Next.js starter with minimal opinions

---

### 4. create-t3-app (FREE)

**What's Included:**
- Next.js (App Router support)
- TypeScript (strict mode)
- Prisma (optional)
- Tailwind CSS (optional)
- tRPC (type-safe APIs)

**What's NOT Included:**
- ❌ Authentication (bring your own)
- ❌ Payments
- ❌ Email
- ❌ Database (optional)
- ❌ UI components (blank slate)
- ❌ Testing
- ❌ Documentation

**Philosophy:** NOT an all-inclusive template. Bring your own libraries.

**Target Audience:** Developers who want full-stack type safety with no opinions

---

### 5. Epic Stack (Remix, FREE)

**What's Included:**
- Remix (server-first framework)
- Full-stack type safety
- Direct access to web fundamentals (requests, responses, headers)
- Route-level error boundaries
- Nested routing

**What's NOT Included:**
- ❌ Not Next.js (Remix framework)
- ❌ No payment integration
- ❌ No UI components
- ❌ Bring your own auth/database/email

**Target Audience:** Developers who want Remix over Next.js, prefer simplicity over batteries-included

---

## What Competitors DON'T Include

These features are RARE or ABSENT in competitor boilerplates:

### 🚨 Almost NEVER Included:

1. **Rate Limiting** - Only TurboStarter and Fabrk mention it
2. **Outbound Webhooks** - Only Fabrk has a webhook delivery system with retry logic
3. **Real-Time Notifications** - Only Fabrk has Pusher integration
4. **Email Queue System** - Only Fabrk has queued email delivery
5. **Feature Flags** - Only Fabrk has a feature flag system
6. **API Key Management** - Only Fabrk has API key CRUD
7. **Health Check Endpoint** - Only Fabrk has `/api/health`
8. **Comprehensive Testing** - Only Fabrk has 130+ unit tests + E2E + Storybook
9. **20 Themes** - Most have 1-2 themes (light/dark)
10. **234 Components** - Most have 20-30 components

### 🟡 Sometimes Included:

1. **Teams/Organizations** - Supastarter, ixartz/SaaS-Boilerplate, Volca (but NOT ShipFast, create-t3-app, next-saas-starter)
2. **Admin Panel** - Supastarter (but NOT ShipFast, create-t3-app, next-saas-starter)
3. **Email Verification** - Rare (Fabrk has it, most don't)
4. **Password Reset Flow** - Rare (Fabrk has it, most don't)
5. **RBAC** - Some have basic Owner/Member roles, few have full RBAC

### ✅ Almost ALWAYS Included:

1. **Authentication (email/password)** - Standard
2. **Stripe Payments** - Standard
3. **Webhooks (Stripe inbound)** - Standard
4. **Database (PostgreSQL)** - Standard
5. **Tailwind CSS** - Standard
6. **TypeScript** - Standard

---

## Over-Built Features Analysis

### Features Fabrk Has That Competitors Don't:

**Possibly over-built:**
1. **Webhook Delivery System** (22 event types, retry logic, delivery tracking)
   - **Finding:** NO competitor has this. It's enterprise-grade.
   - **Verdict:** UNIQUE VALUE PROP ✅

2. **Real-Time Notifications (Pusher)**
   - **Finding:** NO competitor has this
   - **Verdict:** UNIQUE VALUE PROP ✅

3. **Email Queue System**
   - **Finding:** Most send emails directly (no queue)
   - **Verdict:** UNIQUE VALUE PROP ✅

4. **Feature Flags System**
   - **Finding:** NO competitor has this
   - **Verdict:** UNIQUE VALUE PROP ✅

5. **API Key Management**
   - **Finding:** NO competitor has this
   - **Verdict:** UNIQUE VALUE PROP ✅

6. **Health Check Endpoint**
   - **Finding:** NO competitor has this
   - **Verdict:** ENTERPRISE FEATURE ✅

7. **130+ Unit Tests + E2E + Storybook**
   - **Finding:** NO competitor has comprehensive testing
   - **Verdict:** UNIQUE VALUE PROP ✅

8. **20 Switchable Themes**
   - **Finding:** Most have 1-2 themes
   - **Verdict:** UNIQUE VALUE PROP ✅

9. **234 Components**
   - **Finding:** Most have 20-100 components
   - **Verdict:** UNIQUE VALUE PROP ✅

10. **Terminal Design System**
    - **Finding:** NO competitor has a unique design system
    - **Verdict:** UNIQUE VALUE PROP ✅

**Appropriately Included:**
- Authentication (NextAuth v5) ✅
- Stripe + Polar payments ✅
- Multi-tenancy (Teams/Orgs) ✅
- RBAC ✅
- Admin Panel ✅
- Email system (Resend) ✅
- Documentation site ✅

**Missing (that competitors have):**
- ❌ Magic Links (ShipFast, Supastarter)
- ❌ Lemon Squeezy (ShipFast, Supastarter)
- ❌ AI SDK Integration (Supastarter)
- ❌ MDX Blog (Supastarter)
- ❌ User Impersonation (Supastarter)
- ❌ File Storage (Supastarter)
- ❌ Multi-framework support (Supastarter)

---

## Competitive Positioning

### Fabrk's Market Position:

**Most Similar To:** Supastarter ($349) - both are "complete" boilerplates

**Differentiation:**
- **Price:** $199 vs $349 (cheaper)
- **Testing:** 130+ tests vs 0 tests (better quality)
- **Components:** 234 vs 100+ (more comprehensive)
- **Themes:** 20 vs 2-3 (more customizable)
- **Webhooks:** Full system vs none (enterprise feature)
- **Real-time:** Pusher vs none (unique)
- **Design System:** Terminal aesthetic vs generic (unique)

**Target Audience:**
- Fabrk: Enterprise-ready SaaS builders who want completeness + quality
- ShipFast: Solo indie hackers who want speed over features
- Supastarter: Teams who want AI features + multi-framework
- create-t3-app: Developers who want full control with no opinions

---

## Recommendations

### 1. Features to KEEP (Unique Value Props):
- ✅ Webhook delivery system
- ✅ Real-time notifications (Pusher)
- ✅ Email queue system
- ✅ Feature flags
- ✅ API key management
- ✅ Health check endpoint
- ✅ 130+ tests
- ✅ 20 themes
- ✅ 234 components
- ✅ Terminal design system

### 2. Features to ADD (Competitor Gaps):
- ⚠️ Magic Links (ShipFast has it, easy win)
- ⚠️ Lemon Squeezy (optional payment provider)
- ⚠️ AI SDK Integration (Supastarter's advantage)
- ⚠️ MDX Blog (Supastarter has it)
- ⚠️ User Impersonation (Supastarter's admin feature)
- ⚠️ File Storage (S3/Supabase Storage)

### 3. Features to CONSIDER REMOVING (if simplifying):
- None. All features are either:
  1. Standard (auth, payments, database)
  2. Unique value props (webhooks, real-time, testing)
  3. Expected for $199 (teams, RBAC, admin)

### 4. Marketing Angle:
**Position Fabrk as:** "The ONLY enterprise-ready Next.js boilerplate with production-grade webhooks, real-time notifications, and 130+ tests - at HALF the price of Supastarter"

**Tagline:** "Supastarter quality, ShipFast price, UNIQUE enterprise features"

---

## Sources

- [ShipFast - NextJS SaaS Boilerplate](https://shipfa.st/)
- [Supastarter - Next.js SaaS starter kit](https://supastarter.dev/)
- [Next.js SaaS Starter - Official Template](https://github.com/nextjs/saas-starter)
- [Create T3 App](https://create.t3.gg/)
- [Remix vs NextJS 2025 comparison](https://merge.rocks/blog/remix-vs-nextjs-2025-comparison)
- [8 Best NextJS Boilerplates for Developers (2025)](https://snappify.com/blog/nextjs-boilerplates)
- [21+ Best Next.js SaaS Boilerplates for 2025](https://uideck.com/blog/saas-boilerplates)
- [I Compared the Top SaaS Boilerplates — Here's What I Discovered](https://rafael-padovani.medium.com/i-compared-the-top-saas-boilerplates-heres-what-i-discovered-ee52a88b45c4)
- [Multi-tenancy SaaS Boilerplate comparison](https://saasboilerplates.dev/tags/multi-tenancy/)
- [Next.js + Hono SaaS Boilerplate | TurboStarter](https://www.turbostarter.dev/stacks/nextjs-hono-saas-boilerplate)
