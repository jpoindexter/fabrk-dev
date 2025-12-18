# Setup Wizard - Screen Designs

Each section = one screen (clears terminal before showing)

---

## Screen 1: Welcome

```text
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║  ███████████   █████████   ███████████  ███████████   █████   ████   ║
║  ░░███░░░░░░█  ███░░░░░███ ░░███░░░░░███░░███░░░░░███ ░░███   ███░   ║
║   ░███   █ ░  ░███    ░███  ░███    ░███ ░███    ░███  ░███  ███     ║
║   ░███████    ░███████████  ░██████████  ░██████████   ░███████      ║
║   ░███░░░█    ░███░░░░░███  ░███░░░░░███ ░███░░░░░███  ░███░░███     ║
║   ░███  ░     ░███    ░███  ░███    ░███ ░███    ░███  ░███ ░░███    ║
║   █████       █████   █████ ███████████  █████   █████ █████ ░░████  ║
║  ░░░░░       ░░░░░   ░░░░░ ░░░░░░░░░░░  ░░░░░   ░░░░░ ░░░░░   ░░░░   ║
║                                                                      ║
║                        SETUP WIZARD v1.0                             ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝

  Terminal-first SaaS boilerplate. Ship fast. Look sharp.

  This wizard will help you:
  ┌────────────────────────────────────────┐
  │  ✓ Choose your stack (30s - 8min)      │
  │  ✓ Configure API keys                  │
  │  ✓ Generate .env.local                 │
  │  ✓ Copy a starter landing page         │
  └────────────────────────────────────────┘

  ─────────────────────────────────────────
  Press ENTER to start    Ctrl+C to cancel
  ─────────────────────────────────────────
```

---

## Screen 2: Template Selection

```text
╔══════════════════════════════════════════════════════════════════════╗
║  STEP 1 OF 3                                              TEMPLATE   ║
╚══════════════════════════════════════════════════════════════════════╝

  What are you building?

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  [1]  STARTER                                    ⏱ 30s · 0 keys  │
  │       ──────────────────────────────────────────────────────     │
  │       SQLite database + NextAuth                                 │
  │       Perfect for: demos, prototypes, learning                   │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [2]  SAAS                                     ⏱ 4-5m · 3 keys   │
  │       ──────────────────────────────────────────────────────     │
  │       PostgreSQL + Stripe + Resend + PostHog                     │
  │       Perfect for: subscription apps, paid products              │
  │       ★ RECOMMENDED                                              │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [3]  AI APP                                   ⏱ 5-6m · 4 keys   │
  │       ──────────────────────────────────────────────────────     │
  │       Everything in SaaS + OpenAI integration                    │
  │       Perfect for: AI wrappers, chat apps, AI tools              │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [4]  MARKETPLACE                              ⏱ 6-7m · 5 keys   │
  │       ──────────────────────────────────────────────────────     │
  │       Everything in SaaS + Algolia + S3 Storage                  │
  │       Perfect for: directories, platforms, multi-vendor          │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [5]  CUSTOM                                      ⏱ varies       │
  │       ──────────────────────────────────────────────────────     │
  │       Mix and match: pick each module yourself                   │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  Enter 1-5: █
```

---

## Screen 3a: Marketplace Style (only if #4 selected)

```text
╔══════════════════════════════════════════════════════════════════════╗
║  STEP 2 OF 4                                     MARKETPLACE STYLE   ║
╚══════════════════════════════════════════════════════════════════════╝

  What style of marketplace are you building?

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  [1]  AMAZON / ETSY STYLE                                        │
  │       ──────────────────────────────────────────────────────     │
  │       ┌─────────┬─────────┬─────────┐                            │
  │       │ Product │ Product │ Product │  ← Grid layout             │
  │       ├─────────┼─────────┼─────────┤                            │
  │       │ Product │ Product │ Product │  ← Category sidebar        │
  │       └─────────┴─────────┴─────────┘  ← Filters & search        │
  │                                                                  │
  │       Best for: physical products, digital goods, e-commerce     │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [2]  AIRBNB / ZILLOW STYLE                                      │
  │       ──────────────────────────────────────────────────────     │
  │       ┌───────────────────────────┐                              │
  │       │      Large Image          │  ← Image-focused cards       │
  │       │      $150/night ★4.9      │  ← Location search           │
  │       └───────────────────────────┘  ← Date pickers              │
  │                                                                  │
  │       Best for: rentals, services, experiences, bookings         │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [3]  GUMROAD STYLE                                              │
  │       ──────────────────────────────────────────────────────     │
  │       ┌───────────────────────────┐                              │
  │       │  Clean, minimal layout    │  ← Creator profiles          │
  │       │  $29 - Buy Now            │  ← Simple checkout           │
  │       └───────────────────────────┘  ← Digital delivery          │
  │                                                                  │
  │       Best for: digital creators, courses, templates, ebooks     │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  Enter 1-3: █
```

---

## Screen 3b: Custom Flow - Database

```text
╔══════════════════════════════════════════════════════════════════════╗
║  CUSTOM SETUP                                        1 OF 5 DATABASE ║
╠══════════════════════════════════════════════════════════════════════╣
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  20%  ║
╚══════════════════════════════════════════════════════════════════════╝

  Where will you store your data?

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  [1]  SQLITE                                        ★ QUICK START│
  │       ──────────────────────────────────────────────────────     │
  │       Local file database - zero configuration needed            │
  │                                                                  │
  │       ✓ No account required                                      │
  │       ✓ Works offline                                            │
  │       ✓ Great for development                                    │
  │       ✗ Not for production                                       │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [2]  POSTGRESQL                                    ★ PRODUCTION │
  │       ──────────────────────────────────────────────────────     │
  │       Cloud database for production apps                         │
  │                                                                  │
  │       ✓ Scales to millions of users                              │
  │       ✓ Free tiers available                                     │
  │       ✓ Required for Vercel deployment                           │
  │                                                                  │
  │       ┌─ GET A FREE DATABASE ─────────────────────────────────┐  │
  │       │                                                       │  │
  │       │  Vercel Postgres    vercel.com/storage                │  │
  │       │  Supabase           supabase.com        (recommended) │  │
  │       │  Neon               neon.tech                         │  │
  │       │                                                       │  │
  │       └───────────────────────────────────────────────────────┘  │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  Enter 1-2: █
```

---

## Screen 3b: Custom Flow - Payments

```text
╔══════════════════════════════════════════════════════════════════════╗
║  CUSTOM SETUP                                        2 OF 5 PAYMENTS ║
╠══════════════════════════════════════════════════════════════════════╣
║  ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  40%  ║
╚══════════════════════════════════════════════════════════════════════╝

  How will you charge customers?

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  [1]  NONE - SKIP FOR NOW                                        │
  │       Add payments later when you're ready to monetize           │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [2]  STRIPE                                       ★ RECOMMENDED │
  │       ──────────────────────────────────────────────────────     │
  │       Industry standard for SaaS payments                        │
  │                                                                  │
  │       ✓ Subscriptions & one-time payments                        │
  │       ✓ Customer portal built-in                                 │
  │       ✓ 2.9% + 30¢ per transaction                               │
  │                                                                  │
  │       ┌─ GET YOUR KEYS ───────────────────────────────────────┐  │
  │       │  1. Go to dashboard.stripe.com/register               │  │
  │       │  2. Create account (email verification)               │  │
  │       │  3. Go to Developers → API Keys                       │  │
  │       │  4. Copy Secret key (sk_test_...) & Publishable key   │  │
  │       └───────────────────────────────────────────────────────┘  │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [3]  POLAR                                                      │
  │       Developer-focused, great for open source monetization      │
  │       → polar.sh                                                 │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [4]  LEMON SQUEEZY                                              │
  │       Simple pricing, handles tax compliance for you             │
  │       → lemonsqueezy.com                                         │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  Enter 1-4: █
```

---

## Screen 3b: Custom Flow - AI Provider

```text
╔══════════════════════════════════════════════════════════════════════╗
║  CUSTOM SETUP                                     3 OF 5 AI PROVIDER ║
╠══════════════════════════════════════════════════════════════════════╣
║  ████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  60%  ║
╚══════════════════════════════════════════════════════════════════════╝

  Add AI/LLM capabilities to your app?

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  [1]  NONE - SKIP FOR NOW                                        │
  │       Add AI features later                                      │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [2]  OPENAI                                       ★ RECOMMENDED │
  │       ──────────────────────────────────────────────────────     │
  │       GPT-4, GPT-4o, DALL-E, Whisper                             │
  │                                                                  │
  │       ┌─ GET YOUR API KEY ────────────────────────────────────┐  │
  │       │  1. Go to platform.openai.com                         │  │
  │       │  2. Sign up / Log in                                  │  │
  │       │  3. Add payment method (pay-as-you-go)                │  │
  │       │  4. Go to API Keys → Create new secret key            │  │
  │       │  5. Copy key (starts with sk-...)                     │  │
  │       │                                                       │  │
  │       │  💰 Cost: ~$0.01 per 1K tokens (GPT-4o-mini)          │  │
  │       └───────────────────────────────────────────────────────┘  │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [3]  ANTHROPIC                                                  │
  │       Claude 3.5 Sonnet, Claude 3 Opus                           │
  │       → console.anthropic.com                                    │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [4]  GOOGLE AI                                                  │
  │       Gemini Pro, Gemini Ultra                                   │
  │       → aistudio.google.com                                      │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  Enter 1-4: █
```

---

## Screen 3b: Custom Flow - Analytics

```text
╔══════════════════════════════════════════════════════════════════════╗
║  CUSTOM SETUP                                       4 OF 5 ANALYTICS ║
╠══════════════════════════════════════════════════════════════════════╣
║  ████████████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░  80%  ║
╚══════════════════════════════════════════════════════════════════════╝

  Track user behavior and product usage?

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  [1]  NONE - SKIP FOR NOW                                        │
  │       Add analytics later                                        │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [2]  POSTHOG                                      ★ RECOMMENDED │
  │       ──────────────────────────────────────────────────────     │
  │       Privacy-friendly product analytics                         │
  │                                                                  │
  │       ✓ 1 million events FREE per month                          │
  │       ✓ Session recordings                                       │
  │       ✓ Feature flags                                            │
  │       ✓ A/B testing                                              │
  │                                                                  │
  │       ┌─ GET YOUR API KEY ────────────────────────────────────┐  │
  │       │  1. Go to app.posthog.com                             │  │
  │       │  2. Sign up (free, no credit card)                    │  │
  │       │  3. Create a project                                  │  │
  │       │  4. Go to Settings → Project API Key                  │  │
  │       │  5. Copy key (starts with phc_...)                    │  │
  │       └───────────────────────────────────────────────────────┘  │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [3]  GOOGLE ANALYTICS                                           │
  │       Free, widely used, but less privacy-friendly               │
  │       → analytics.google.com                                     │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  Enter 1-3: █
```

---

## Screen 3b: Custom Flow - Email

```text
╔══════════════════════════════════════════════════════════════════════╗
║  CUSTOM SETUP                                            5 OF 5 EMAIL║
╠══════════════════════════════════════════════════════════════════════╣
║  ████████████████████████████████████████████████████████████  100%  ║
╚══════════════════════════════════════════════════════════════════════╝

  Send transactional emails (password resets, receipts, notifications)?

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  [1]  NONE - SKIP FOR NOW                                        │
  │       Add email later (auth will work without email sending)     │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [2]  RESEND                                       ★ RECOMMENDED │
  │       ──────────────────────────────────────────────────────     │
  │       Developer-first email API                                  │
  │                                                                  │
  │       ✓ 3,000 emails FREE per month                              │
  │       ✓ React email templates                                    │
  │       ✓ Great deliverability                                     │
  │                                                                  │
  │       ┌─ GET YOUR API KEY ────────────────────────────────────┐  │
  │       │  1. Go to resend.com                                  │  │
  │       │  2. Sign up (free, no credit card)                    │  │
  │       │  3. Go to API Keys → Create API Key                   │  │
  │       │  4. Copy key (starts with re_...)                     │  │
  │       │                                                       │  │
  │       │  ⚠️  For production: verify your domain first          │  │
  │       └───────────────────────────────────────────────────────┘  │
  │                                                                  │
  ├──────────────────────────────────────────────────────────────────┤
  │                                                                  │
  │  [3]  SENDGRID                                                   │
  │       Enterprise-scale email delivery                            │
  │       → sendgrid.com                                             │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  Enter 1-3: █
```

---

## Screen 4: API Keys Input

```text
╔══════════════════════════════════════════════════════════════════════╗
║  STEP 2 OF 3                                              API KEYS   ║
╚══════════════════════════════════════════════════════════════════════╝

  Enter your API keys below.

  ┌─ TIP ─────────────────────────────────────────────────────────────┐
  │  Leave blank to skip - you can add keys to .env.local later       │
  │  Keys are stored locally and never sent anywhere                  │
  └───────────────────────────────────────────────────────────────────┘

  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃  DATABASE_URL                                                    ┃
  ┃  ────────────────────────────────────────────────────────────    ┃
  ┃  Format:   postgresql://user:password@host:5432/database         ┃
  ┃  Get from: Vercel Storage, Supabase, or Neon dashboard           ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  > █

  ────────────────────────────────────────────────────────────────────

  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃  STRIPE_SECRET_KEY                                               ┃
  ┃  ────────────────────────────────────────────────────────────    ┃
  ┃  Format:   sk_test_... (use test key for development)            ┃
  ┃  Get from: dashboard.stripe.com/apikeys                          ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  > █

  ────────────────────────────────────────────────────────────────────

  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃  STRIPE_WEBHOOK_SECRET                                           ┃
  ┃  ────────────────────────────────────────────────────────────    ┃
  ┃  Format:   whsec_...                                             ┃
  ┃  Get from: dashboard.stripe.com/webhooks → Add endpoint          ┃
  ┃            → Reveal signing secret                               ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  > █
```

---

## Screen 5: Starter Page Prompt

```text
╔══════════════════════════════════════════════════════════════════════╗
║  STEP 3 OF 3                                          STARTER PAGE   ║
╚══════════════════════════════════════════════════════════════════════╝

  Would you like a pre-built landing page?

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  We'll copy a ready-to-customize landing page for your template. │
  │                                                                  │
  │  WHAT YOU GET:                                                   │
  │  ─────────────                                                   │
  │  ✓ Hero section with headline + CTA                              │
  │  ✓ Features grid                                                 │
  │  ✓ Pricing preview                                               │
  │  ✓ Testimonials section                                          │
  │  ✓ Final CTA                                                     │
  │                                                                  │
  │  FILES CREATED:                                                  │
  │  ──────────────                                                  │
  │  → src/app/(marketing)/page.tsx     Your new landing page        │
  │  → src/app/(marketing)/page.tsx.backup   Your old page (backup)  │
  │  → FABRK-PROMPTS.md                 AI prompts to customize      │
  │                                                                  │
  │  ┌─ FABRK-PROMPTS.md ──────────────────────────────────────────┐ │
  │  │                                                             │ │
  │  │  Paste these prompts into Cursor, Claude Code, or Windsurf  │ │
  │  │  to customize your landing page with your own content.      │ │
  │  │                                                             │ │
  │  └─────────────────────────────────────────────────────────────┘ │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  Copy starter landing page? (Y/n): █
```

---

## Screen 6: Complete (Success)

```text
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║                        ✓ SETUP COMPLETE                              ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝

  ┌─ CREATED ─────────────────────────────────────────────────────────┐
  │                                                                   │
  │  ✓ .env.local                          12 environment variables   │
  │  ✓ src/app/(marketing)/page.tsx        SaaS landing page          │
  │  ✓ FABRK-PROMPTS.md                    AI customization prompts   │
  │                                                                   │
  └───────────────────────────────────────────────────────────────────┘

  ┌─ NEXT STEPS ──────────────────────────────────────────────────────┐
  │                                                                   │
  │  1. Push database schema                                          │
  │     ┌─────────────────────────────────────────────────────────┐   │
  │     │  npm run db:push                                        │   │
  │     └─────────────────────────────────────────────────────────┘   │
  │                                                                   │
  │  2. Start development server                                      │
  │     ┌─────────────────────────────────────────────────────────┐   │
  │     │  npm run dev                                            │   │
  │     └─────────────────────────────────────────────────────────┘   │
  │                                                                   │
  │  3. Customize your landing page                                   │
  │     Open FABRK-PROMPTS.md and paste prompts into your AI editor   │
  │                                                                   │
  └───────────────────────────────────────────────────────────────────┘

  ┌─ NEED HELP? ──────────────────────────────────────────────────────┐
  │                                                                   │
  │  Docs      fabrk.dev/docs                                         │
  │  Discord   discord.gg/fabrk                                       │
  │  GitHub    github.com/fabrk-dev/fabrk                             │
  │                                                                   │
  └───────────────────────────────────────────────────────────────────┘

  Happy building! 🚀
```

---

## Screen: Dry Run Preview

```text
╔══════════════════════════════════════════════════════════════════════╗
║                          DRY RUN COMPLETE                            ║
╚══════════════════════════════════════════════════════════════════════╝

  ⚠ No files were written. This was a preview.

  ┌─ WOULD CREATE: .env.local ────────────────────────────────────────┐
  │                                                                   │
  │  DATABASE_URL              = postgresql://...                     │
  │  NEXTAUTH_SECRET           = ******* (auto-generated)             │
  │  NEXTAUTH_URL              = http://localhost:3000                │
  │  STRIPE_SECRET_KEY         = sk_test_...                          │
  │  STRIPE_WEBHOOK_SECRET     = whsec_...                            │
  │  STRIPE_PUBLISHABLE_KEY    = pk_test_...                          │
  │  RESEND_API_KEY            = re_...                               │
  │  POSTHOG_KEY               = phc_...                              │
  │  ...                                                              │
  │                                                                   │
  │  Total: 12 variables                                              │
  │                                                                   │
  └───────────────────────────────────────────────────────────────────┘

  To apply these changes, run:
  ┌─────────────────────────────────────────────────────────────────┐
  │  npm run setup                                                  │
  └─────────────────────────────────────────────────────────────────┘
```

---

## Screen: Cancelled

```text
╔══════════════════════════════════════════════════════════════════════╗
║                          SETUP CANCELLED                             ║
╚══════════════════════════════════════════════════════════════════════╝

  No changes were made.

  To restart setup, run:
  ┌─────────────────────────────────────────────────────────────────┐
  │  npm run setup                                                  │
  └─────────────────────────────────────────────────────────────────┘
```

---

## Design System

### Box Characters

```text
Single line:  ┌ ─ ┐ │ └ ┘ ├ ┤ ┬ ┴ ┼
Double line:  ╔ ═ ╗ ║ ╚ ╝ ╠ ╣ ╦ ╩ ╬
Heavy line:   ┏ ━ ┓ ┃ ┗ ┛ ┣ ┫ ┳ ┻ ╋
```

### Usage

- **Double line (═)**: Main screen headers
- **Single line (─)**: Content boxes, sections
- **Heavy line (━)**: Important callouts (API key inputs)

### Colors (ANSI)

- **Cyan (\x1b[36m)**: Logo, highlights, prompts, commands
- **Green (\x1b[32m)**: Success checkmarks, completion
- **Yellow (\x1b[33m)**: Warnings, tips, dry-run mode
- **Red (\x1b[31m)**: Errors
- **Dim (\x1b[2m)**: Secondary text, hints
- **Bold (\x1b[1m)**: Titles, emphasis

### Indicators

- `✓` - Success/included
- `✗` - Not included/excluded
- `★` - Recommended option
- `⏱` - Time estimate
- `→` - Link/reference
- `⚠️` - Warning/caution
- `💰` - Cost info
- `█` - Cursor/input position

### Typography

- ALL CAPS: Headers, step indicators
- Sentence case: Descriptions
- Monospace: Everything (terminal aesthetic)

### Spacing

- 2 spaces: Standard indent
- Blank line: Between major sections
- Box padding: 2 spaces inside boxes
