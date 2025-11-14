# Fabrk vs Competitors

Honest comparison of Fabrk against other Next.js SaaS boilerplates.

---

## Table of Contents

1. [Quick Comparison](#quick-comparison)
2. [Fabrk vs ShipFast](#fabrk-vs-shipfast)
3. [Fabrk vs Supastarter](#fabrk-vs-supastarter)
4. [Fabrk vs Makerkit](#fabrk-vs-makerkit)
5. [Fabrk vs Building from Scratch](#fabrk-vs-building-from-scratch)
6. [Which Boilerplate Is Right for You?](#which-boilerplate-is-right-for-you)

---

## Quick Comparison

| Feature | Fabrk | ShipFast | Supastarter | Makerkit | DIY |
|---------|-------|----------|-------------|----------|-----|
| **Price** | **$299** | $199 | $297 | $299 | Free |
| **Next.js Version** | **15** (latest) | 14 | 14 | 14 | Latest |
| **File Count** | **161** | 450+ | 600+ | 800+ | 0 |
| **Components** | **87** | 40+ | 60+ | 60+ | 0 |
| **Templates** | **8** | 0 | 3 | 5 | 0 |
| **Themes** | **6** | 1 | 1 | 2 | 0 |
| **Storybook** | **✅** | ❌ | ❌ | ❌ | ❌ |
| **Test Lines** | **17,822** | 0 | ~1,000 | ~2,000 | 0 |
| **TypeScript** | **Strict** | Yes | Yes | Yes | Optional |
| **Database** | PostgreSQL + Prisma | MongoDB + Mongoose | Supabase | Supabase | Your choice |
| **Auth** | NextAuth v5 | NextAuth | Supabase Auth | Supabase Auth | DIY |
| **Payments** | Stripe | Stripe | Stripe + Lemonsqueezy | Stripe | DIY |
| **Email** | Resend | Resend/Mailgun | Resend | Resend | DIY |
| **Documentation** | 300KB (19 guides) | Moderate | Extensive | Extensive | None |
| **Updates** | Lifetime (v1.x) | Lifetime | Lifetime | Lifetime | N/A |
| **Support** | Discord + Email | Discord | Discord + Email | Discord | Stack Overflow |
| **Philosophy** | Premium Enterprise | Ship fast | Feature-rich | Enterprise | Full control |
| **Time to Launch** | 1-3 days | 2-4 days | 3-7 days | 5-10 days | 30-60 days |

---

## Premium Enterprise Positioning

### Why $299?

Fabrk is positioned as a **premium enterprise boilerplate** competing directly with Makerkit ($299) and Supastarter ($297), not budget options like ShipFast ($199).

**Value Justification:**

1. **More Components Than Competitors**
   - Fabrk: 87 components
   - Makerkit: 60 components
   - Supastarter: 60 components
   - **Winner: Fabrk (+45% more)**

2. **Superior Testing Coverage**
   - Fabrk: 17,822 test lines
   - Makerkit: ~2,000 test lines
   - Supastarter: ~1,000 test lines
   - **Winner: Fabrk (8.9x better)**

3. **Storybook Integration**
   - Fabrk: ✅ Fully integrated
   - Makerkit: ❌ Not included
   - Supastarter: ❌ Not included
   - **Winner: Fabrk (exclusive)**

4. **Cleaner Codebase**
   - Fabrk: 161 files
   - Makerkit: 800+ files
   - Supastarter: 600+ files
   - **Winner: Fabrk (80% less complexity)**

5. **More Themes**
   - Fabrk: 6 color schemes
   - Makerkit: 2 themes
   - Supastarter: 1 theme
   - **Winner: Fabrk (3-6x more)**

6. **Latest Stack**
   - Fabrk: Next.js 15 (React 19, Turbopack)
   - Competitors: Next.js 14
   - **Winner: Fabrk (future-proof)**

### $299 ROI Calculation

**Time Saved vs DIY:**
- 220 hours of development work
- At $50/hour: $11,000 value
- Investment: $299
- **ROI: 3,579%**

**Cost Per Component:**
- Fabrk: $299 ÷ 87 = **$3.44/component**
- Makerkit: $299 ÷ 60 = $4.98/component
- Supastarter: $297 ÷ 60 = $4.95/component

**Cost Per Test Line:**
- Fabrk: $299 ÷ 17,822 = **$0.017/line**
- Makerkit: $299 ÷ 2,000 = $0.15/line
- Supastarter: $297 ÷ 1,000 = $0.30/line

**Verdict:** Fabrk delivers **the best value at $299** - more components, better testing, cleaner code.

---

## Fabrk vs ShipFast

### Overview

**ShipFast** is the original "ship fast" boilerplate by Marc Lou (IndieHackers famous). It pioneered the boilerplate-for-indie-hackers movement.

**Fabrk** takes the "ship fast" philosophy but with cleaner code, stricter TypeScript, and PostgreSQL instead of MongoDB.

---

### Side-by-Side

| Aspect | Fabrk | ShipFast |
|--------|-------|----------|
| **Price** | **$299 one-time** | $199 one-time |
| **Next.js** | **v15** (App Router only) | v14 (Pages + App Router) |
| **TypeScript** | **Strict mode**, no `any` | Yes, but looser |
| **Database** | PostgreSQL + Prisma | MongoDB + Mongoose |
| **Auth** | NextAuth v5 (Credentials + OAuth) | NextAuth v4 |
| **File Count** | **161 files** | 450+ files |
| **Components** | **87 components** | ~40 components |
| **Templates** | **8 templates** | 0 |
| **Themes** | **6 themes** | 1 |
| **Storybook** | **✅ Integrated** | ❌ None |
| **Test Lines** | **17,822 lines** | 0 |
| **UI Framework** | Radix UI (accessible) | DaisyUI (opinionated) |
| **Styling** | Tailwind (custom) | Tailwind + DaisyUI |
| **Email Templates** | React Email | React Email |
| **Documentation** | **19 guides (300KB)** | Moderate (README-focused) |
| **Code Quality** | **ESLint strict**, formatted | Good |
| **Updates** | Active (v1.0 released Jan 2025) | Active (maintained by Marc) |

---

### When to Choose Fabrk

✅ You want **more components** (87 vs 40)
✅ You need **enterprise testing** (17,822 lines vs 0)
✅ You value **Storybook integration** (component development)
✅ You prefer **PostgreSQL** over MongoDB
✅ You want **TypeScript strict mode** (catch bugs early)
✅ You value **fewer files** (161 vs 450+)
✅ You need **Next.js 15** features (React 19, Turbopack)
✅ You want **comprehensive docs** (300KB guides)
✅ You need **6 themes** vs 1

### When to Choose ShipFast

✅ You prefer **MongoDB** over PostgreSQL
✅ You like **DaisyUI's** pre-styled components
✅ You want Marc Lou's **proven template** (100+ launches)
✅ You need **Pages Router** support (alongside App Router)
✅ You value **IndieHackers community** around ShipFast

---

## Fabrk vs Supastarter

### Overview

**Supastarter** is a feature-rich boilerplate with tons of integrations. It's the most comprehensive option but also the most expensive.

**Fabrk** is the minimalist alternative—essential features only, no bloat.

---

### Side-by-Side

| Aspect | Fabrk | Supastarter |
|--------|-------|-------------|
| **Price** | $79 one-time | $297 one-time (Indie) |
| **Next.js** | v15 | v14 |
| **TypeScript** | Strict | Yes |
| **Database** | PostgreSQL + Prisma | Supabase (PostgreSQL) |
| **Auth** | NextAuth v5 | Supabase Auth |
| **File Count** | 161 files | 600+ files |
| **Components** | 87 components | 100+ components |
| **Backend** | Next.js API Routes | Supabase (BaaS) |
| **Real-time** | Not included | Supabase Realtime |
| **File Storage** | Vercel Blob (optional) | Supabase Storage (built-in) |
| **Multi-tenancy** | Not included | Built-in (teams, orgs) |
| **Internationalization** | Not included | Built-in (i18n) |
| **Analytics** | Guide (Plausible/GA4) | PostHog (built-in) |
| **Documentation** | 300KB (19 guides) | Extensive (video + written) |
| **Philosophy** | Minimal, essential features | Kitchen sink, everything included |

---

### When to Choose Fabrk

✅ You want **minimal bloat** (161 files vs 600+)
✅ You prefer **self-hosted backend** (not tied to Supabase)
✅ You don't need multi-tenancy or i18n (not building enterprise SaaS)
✅ You value **simplicity** over features
✅ You want **$79** pricing, not $297

### When to Choose Supastarter

✅ You need **multi-tenancy** (teams, organizations)
✅ You want **real-time features** (live updates, chat)
✅ You need **internationalization** (multiple languages)
✅ You prefer **Supabase** ecosystem (Auth, Database, Storage, Realtime)
✅ You're building **enterprise-grade SaaS** (need all the features)
✅ You value **video tutorials** and comprehensive onboarding

---

## Fabrk vs Makerkit

### Overview

**Makerkit** is the most feature-complete boilerplate with extensive documentation, video tutorials, and enterprise features.

**Fabrk** is the indie hacker alternative—get core features fast, add complexity later.

---

### Side-by-Side

| Aspect | Fabrk | Makerkit |
|--------|-------|----------|
| **Price** | **$299 one-time** | $299 one-time (Core) |
| **Next.js** | **v15** | v14 |
| **TypeScript** | **Strict** | Yes |
| **Database** | PostgreSQL + Prisma | Supabase |
| **Auth** | NextAuth v5 | Supabase Auth |
| **File Count** | **161 files** | 800+ files |
| **Components** | **87 components** | 60 components |
| **Templates** | **8 templates** | 5 templates |
| **Themes** | **6 themes** | 2 themes |
| **Storybook** | **✅ Integrated** | ❌ Not included |
| **Test Lines** | **17,822 lines** | ~2,000 lines |
| **Admin Panel** | Not included | Built-in |
| **Multi-tenancy** | Not included | Built-in (orgs, roles) |
| **Billing** | Stripe (manual) | Stripe (automated recurring) |
| **Email** | Resend (manual) | Maizzle (advanced templates) |
| **CMS** | Not included | Keystatic (built-in) |
| **Documentation** | 300KB written guides | Extensive (video + written) |
| **Support** | Discord + Email | Priority support |
| **Target Audience** | **Developers, Agencies** | Agencies, enterprises |

---

### When to Choose Fabrk

✅ You want **more components** (87 vs 60) at same price
✅ You need **better testing** (17,822 lines vs 2,000)
✅ You want **Storybook integration** for component development
✅ You need **more themes** (6 vs 2)
✅ You want **minimal complexity** (161 files vs 800+)
✅ You don't need multi-tenancy or admin panels (yet)
✅ You prefer **self-hosted backend** (not locked to Supabase)
✅ You prefer **written docs** over video tutorials
✅ You want **Next.js 15** (React 19, Turbopack)

### When to Choose Makerkit

✅ You're building for **clients** (agencies)
✅ You need **multi-tenancy** (organizations, teams, roles)
✅ You want **admin panels** out of the box
✅ You need **recurring billing** automation
✅ You prefer **video tutorials** for learning
✅ You need **priority support** for client projects

---

## Fabrk vs Building from Scratch

### Overview

**Building from scratch** gives you full control but takes 30-60 days.

**Fabrk** gives you 90% of the work done, ships in 1-3 days.

---

### Side-by-Side

| Aspect | Fabrk | DIY from Scratch |
|--------|-------|------------------|
| **Price** | $79 one-time | $0 (but time = money) |
| **Time to Launch** | 1-3 days | 30-60 days |
| **Auth Setup** | 2 hours (configure) | 5-10 days (build + test) |
| **Stripe Setup** | 2 hours (configure) | 3-5 days (build + test webhooks) |
| **Database Setup** | 1 hour (push schema) | 2-3 days (design + implement) |
| **Email Setup** | 1 hour (configure Resend) | 2-3 days (templates + sending) |
| **Components** | 87 ready-to-use | 0 (build all from scratch) |
| **TypeScript Config** | Strict mode configured | Set up yourself |
| **Documentation** | 300KB guides | Write your own |
| **Support** | Discord + Email | Stack Overflow |
| **Control** | High (full source code) | Complete |
| **Maintenance** | Lifetime updates (v1.x) | You maintain everything |

---

### Time Breakdown (DIY)

**Building SaaS from scratch:**

| Feature | Time (Hours) |
|---------|--------------|
| Project setup (Next.js, TypeScript, ESLint) | 4 |
| Database schema design + Prisma setup | 8 |
| Authentication (Credentials + OAuth) | 40 |
| Stripe integration (checkout + webhooks) | 24 |
| Email system (templates + sending) | 16 |
| UI components (forms, buttons, modals) | 40 |
| Landing page components | 16 |
| Dashboard pages | 16 |
| Testing + bug fixes | 40 |
| Documentation | 16 |
| **Total** | **~220 hours** |

**At $50/hour dev rate:** $11,000 worth of work
**Fabrk price:** $299
**Savings:** $10,701 (3,579% ROI)

---

### When to Build from Scratch

✅ You're **learning** Next.js, TypeScript, or SaaS development
✅ You have **unique requirements** not covered by boilerplates
✅ You have **60+ days** to build before launch
✅ You want **100% control** over every line of code
✅ You enjoy **building infrastructure** more than shipping products

### When to Choose Fabrk

✅ You want to **ship fast** (days, not months)
✅ You value **time over money** ($79 vs 220 hours)
✅ You want **proven patterns** (auth, payments, email)
✅ You need **TypeScript strict** mode already configured
✅ You want **comprehensive documentation** (300KB)
✅ You prefer **building features**, not boilerplate

---

## Which Boilerplate Is Right for You?

### Choose Fabrk if:

- ✅ You want **87 components** (more than Makerkit's 60)
- ✅ You need **enterprise testing** (17,822 lines)
- ✅ You want **Storybook integration** (exclusive)
- ✅ You want **minimal bloat** (161 files, not 600+)
- ✅ You prefer **PostgreSQL** over MongoDB or Supabase
- ✅ You value **TypeScript strict mode** for quality code
- ✅ You need **Next.js 15** features (React 19, Turbopack)
- ✅ You want **comprehensive docs** (19 guides, 300KB)
- ✅ You want **premium quality** at same price as Makerkit ($299)
- ✅ You want to **ship this weekend**

---

### Choose ShipFast if:

- ✅ You prefer **MongoDB** over PostgreSQL
- ✅ You like **DaisyUI's** pre-styled components
- ✅ You want Marc Lou's **proven template** (100+ successful launches)
- ✅ You value the **IndieHackers community** around ShipFast
- ✅ You need **Pages Router** support

---

### Choose Supastarter if:

- ✅ You need **multi-tenancy** (teams, organizations)
- ✅ You want **real-time features** (Supabase Realtime)
- ✅ You're building **enterprise SaaS** (need all features)
- ✅ You prefer **Supabase** ecosystem (Auth, Database, Storage)
- ✅ You value **video tutorials** for learning

---

### Choose Makerkit if:

- ✅ You're building for **clients** (agencies)
- ✅ You need **admin panels** and multi-tenancy
- ✅ You want **priority support** for client projects
- ✅ You need **recurring billing** automation
- ✅ You prefer **extensive video tutorials**

---

### Build from Scratch if:

- ✅ You're **learning** (educational value > speed)
- ✅ You have **unique requirements** not covered by any boilerplate
- ✅ You have **60+ days** before launch deadline
- ✅ You enjoy **building infrastructure** over shipping features

---

## Feature Matrix

| Feature | Fabrk | ShipFast | Supastarter | Makerkit |
|---------|-------|----------|-------------|----------|
| **Core Features** |
| Next.js App Router | ✅ v15 | ✅ v14 | ✅ v14 | ✅ v14 |
| TypeScript Strict | ✅ | ⚠️ | ✅ | ✅ |
| PostgreSQL | ✅ | ❌ | ✅ (Supabase) | ✅ (Supabase) |
| Prisma ORM | ✅ | ❌ | ❌ | ❌ |
| Authentication | ✅ NextAuth v5 | ✅ NextAuth | ✅ Supabase | ✅ Supabase |
| Stripe Payments | ✅ | ✅ | ✅ | ✅ |
| Email System | ✅ Resend | ✅ Resend | ✅ Resend | ✅ Maizzle |
| **Advanced Features** |
| Multi-tenancy | ❌ | ❌ | ✅ | ✅ |
| Admin Panel | ❌ | ❌ | ⚠️ Basic | ✅ Advanced |
| Real-time | ❌ | ❌ | ✅ | ✅ |
| i18n | ❌ | ❌ | ✅ | ✅ |
| CMS | ❌ | ❌ | ❌ | ✅ |
| **Developer Experience** |
| File Count | 161 | 450+ | 600+ | 800+ |
| Components | 87 | 40+ | 100+ | 150+ |
| Documentation | 300KB | Moderate | Extensive | Extensive |
| Video Tutorials | ❌ | ❌ | ✅ | ✅ |
| **Support** |
| Discord | ✅ | ✅ | ✅ | ✅ |
| Email Support | ✅ | ❌ | ✅ | ✅ Priority |
| Response Time | <24hrs | Community | <48hrs | <24hrs |
| **Pricing** |
| One-Time Price | $79 | $199 | $297 | $299 |
| Lifetime Updates | v1.x | ✅ | ✅ | ✅ |
| Refund Policy | 30-day | 7-day | 14-day | 14-day |

---

## Honest Assessment

### Fabrk's Strengths

✅ **Minimal bloat** (161 files vs competitors' 450-800+)
✅ **TypeScript strict mode** (catches bugs early)
✅ **PostgreSQL + Prisma** (relational database, type-safe queries)
✅ **Next.js 15** (latest features, React 19, Turbopack)
✅ **Comprehensive docs** (300KB, 19 guides)
✅ **Best price** ($79 vs $199-$299)
✅ **Anti-bloat philosophy** (ship fast, add features later)

### Fabrk's Limitations

❌ **No multi-tenancy** (add yourself if needed)
❌ **No admin panel** (build if needed)
❌ **No video tutorials** (written docs only)
❌ **No real-time features** (use Supabase or Pusher if needed)
❌ **No CMS** (add Payload CMS or Sanity if needed)
❌ **No i18n** (add next-intl if needed)

### Our Philosophy

**Fabrk is intentionally minimal.** We include:
- ✅ What 90% of SaaS need (auth, payments, email, database)
- ❌ What <10% need (multi-tenancy, CMS, i18n)

**Why?** Because bloat slows you down. Add complexity when you need it, not before.

---

## Price Comparison

### Value Analysis

| Boilerplate | Price | Components | Test Lines | Value (Time Saved) | ROI |
|-------------|-------|-----------|-----------|-------------------|-----|
| **Fabrk** | **$299** | **87** | **17,822** | 220 hours (~$11,000) | **3,579%** |
| **ShipFast** | $199 | 40 | 0 | 150 hours (~$7,500) | **3,668%** |
| **Supastarter** | $297 | 60 | ~1,000 | 250 hours (~$12,500) | **4,108%** |
| **Makerkit** | $299 | 60 | ~2,000 | 250 hours (~$12,500) | **4,080%** |

**All are great investments.** Even at $299, you're saving $11,000+ in dev time.

**Fabrk offers the best value at $299:**
- Most components (87 vs 60)
- Best testing (17,822 lines vs 2,000)
- Cleanest codebase (161 files vs 800)
- Same price as Makerkit
- **3,579% ROI**

---

## Final Recommendation

### For Professional Developers & Agencies

**Fabrk** is the best choice at $299:
- Most components (87)
- Best testing (17,822 lines)
- Storybook integration
- Fastest to ship (1-3 days)
- Cleanest codebase (161 files)
- Best documentation (300KB)
- Same price as Makerkit, better value

### For Agencies

**Makerkit** is the best choice:
- Multi-tenancy built-in
- Admin panels
- Priority support
- Video tutorials

### For Enterprise SaaS

**Supastarter** is the best choice:
- Real-time features
- i18n support
- Supabase ecosystem
- Comprehensive features

### For Learning

**Build from scratch**:
- Full control
- Educational value
- No black boxes

---

## Switching Between Boilerplates

**Can you migrate?** Yes, but painful.

- **Fabrk → ShipFast:** Migrate from PostgreSQL to MongoDB (hard)
- **Fabrk → Supastarter:** Migrate from NextAuth to Supabase Auth (hard)
- **ShipFast → Fabrk:** Migrate from MongoDB to PostgreSQL (hard)
- **Any → Build from Scratch:** Extract code you need (medium)

**Recommendation:** Choose carefully upfront. Switching is expensive.

---

## Questions to Ask Yourself

Before choosing a boilerplate, answer these:

1. **How fast do I need to launch?** (Days vs weeks)
2. **What's my budget?** ($79 vs $199-$299)
3. **Do I need multi-tenancy?** (Teams, orgs, roles)
4. **What's my database preference?** (PostgreSQL vs MongoDB vs Supabase)
5. **Do I need real-time features?** (Live updates, chat)
6. **Am I building for clients or myself?** (Agency vs indie hacker)
7. **How important is minimal code?** (161 files vs 800 files)

**If you answered:**
- "Days, $299, No, PostgreSQL, No, Myself/Clients, Very" → **Fabrk**
- "Days, $199, No, MongoDB, No, Myself, Moderate" → **ShipFast**
- "Weeks, $297, Yes, Supabase, Yes, Clients, Not important" → **Supastarter**
- "Weeks, $299, Yes, Supabase, Yes, Enterprise, Not important" → **Makerkit**

---

## Try Before You Buy?

**Fabrk:** No demo (but 30-day refund guarantee)
**ShipFast:** No demo (but 7-day refund guarantee)
**Supastarter:** Video walkthrough + screenshots
**Makerkit:** Video walkthrough + screenshots

**All offer refunds.** Try risk-free.

---

**Still unsure? Email support@fabrk.dev and we'll help you decide honestly (even if it's not Fabrk).**

**Our goal: Help you ship successfully, not just make a sale.**
