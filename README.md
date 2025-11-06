# Fabrk - The Anti-Bloat Next.js Boilerplate

**161 files. Not 1000. Ship your SaaS in hours, not weeks.**

A production-ready Next.js 15 boilerplate with authentication, payments, database, and email built-in. TypeScript strict mode. PostgreSQL. 80+ components. **$79** (60-77% cheaper than competitors).

---

## ✨ What's Included

- ⚡ **Next.js 15** - Latest App Router with Server Components
- 🔐 **Authentication** - NextAuth v5 (Email/password + Google OAuth)
- 💳 **Payments** - Stripe checkout, webhooks, customer portal
- 🗄️ **Database** - PostgreSQL + Prisma ORM (type-safe queries)
- 📊 **Data Table** - Sortable, filterable, paginated (TanStack Table)
- 📧 **Emails** - Transactional emails with Resend
- 🎨 **80+ Components** - Radix UI primitives + dashboards + charts
- 🎯 **Landing Page** - Hero, pricing, FAQ, comparison sections
- 📱 **Fully Responsive** - Mobile-first design
- 🌓 **Dark Mode** - Built-in theme switching
- 📄 **Legal Pages** - Terms, Privacy, Refund (EU/GDPR compliant)
- 🚨 **Error Pages** - 404, 500, Maintenance mode
- 📚 **Comprehensive Docs** - Quick start, deployment, architecture guides

---

## 🎯 Why Fabrk?

### The Anti-Bloat Promise

| Feature | DIY | ShipFast | Supastarter | **Fabrk** |
|---------|-----|----------|-------------|-----------|
| **Time** | 3-4 weeks | Days | Days | **Hours** |
| **Price** | $0 | $199 | $349 | **$79** |
| **Savings** | - | - | - | **60-77%** |
| **TypeScript** | ✓ | ✗ | ✓ | **✓ Strict** |
| **Database** | Your choice | MongoDB | PostgreSQL | **PostgreSQL** |
| **File Count** | 1000+ | 500+ | 800+ | **161** |
| **Components** | 0 | 30-50 | 100+ | **80+** |
| **Data Table** | ✗ | ✓ | ✓ | **✓** |
| **Next.js** | 15 | 13/14 | 14 | **15** |
| **Auth Library** | DIY | NextAuth v4 | Clerk/Supabase | **NextAuth v5** |
| **Updates** | None | Lifetime | Lifetime | **Lifetime v1.x** |
| **Source Code** | ✓ | ✗ Closed | ✓ | **✓ Open** |

**Bottom Line:** Same features as $199-349 competitors, but 60-77% cheaper with the latest stack.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database ([Supabase](https://database.new) or [Railway](https://railway.app/) free tier works)
- [Stripe account](https://stripe.com/)
- [Resend account](https://resend.com/) for emails

### Automated Setup (60 seconds)

```bash
# Clone and run setup script
git clone https://github.com/yourusername/fabrk.git
cd fabrk
chmod +x setup.sh && ./setup.sh
```

### Manual Setup (5 minutes)

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# 3. Initialize database
npx prisma db push

# 4. Run development server
npm run dev
```

**Detailed instructions:** See [docs/QUICK-START.md](docs/QUICK-START.md)

---

## 📦 Component Inventory (80+)

### UI Components (23)
Radix UI primitives: Button, Card, Input, Dialog, Dropdown, Select, Tabs, Accordion, Toast, Label, Textarea, and more.

### Data & Tables (1)
- **Data Table** - Sortable columns, filterable rows, pagination, bulk actions, export to CSV

### Landing Page (8)
- Hero (centered + 2 variations: split-screen, video background)
- Features section (benefit-focused)
- Pricing section (+ comparison table variation)
- FAQ section (8 competitive questions)
- Tech stack showcase
- Comparison table (vs competitors)
- Navigation + Footer

### Dashboard (7)
- Usage limits tracker
- Tier badge
- Purchase status
- License card
- Billing overview
- Stats cards
- Admin panel example

### Auth & Account (9)
- Login/register forms
- Password strength indicator
- Email verification flow
- Password reset flow
- Profile settings
- Security settings
- Billing settings
- API keys management
- Session management

### Settings (6)
- Appearance (theme toggle)
- Notifications
- Language preferences
- Privacy controls
- Data export
- Danger zone (account deletion)

### Charts (3)
- Area chart
- Bar chart
- Line chart

### Error Pages (3)
- 404 Not Found
- 500 Server Error
- Maintenance Mode

### Legal Pages (3)
- Terms of Service (EU/GDPR compliant)
- Privacy Policy (GDPR-compliant)
- Refund Policy (30-day guarantee)

### Email Templates (5)
- Welcome email
- Email verification
- Password reset
- Purchase confirmation
- Subscription update

---

## 📚 Documentation

- **[QUICK-START.md](docs/QUICK-START.md)** - Get running locally in 5 minutes
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deploy to production (Vercel guide)
- **[CLAUDE.md](CLAUDE.md)** - Detailed architecture and patterns
- **[LAUNCH-STATUS.md](LAUNCH-STATUS.md)** - Launch readiness tracker

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
- **Language:** TypeScript (strict mode)
- **Auth:** NextAuth v5 (Credentials + OAuth)
- **Database:** PostgreSQL + Prisma ORM
- **Payments:** Stripe (checkout + webhooks + customer portal)
- **Email:** Resend (transactional emails)
- **UI:** Radix UI + Tailwind CSS + next-themes
- **Tables:** TanStack Table v8
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

---

## 🎨 Design System

- **Style:** Clean, minimal (not neobrutalism in production - reserved for marketing site)
- **Colors:** Customizable via Tailwind config
- **Typography:** System fonts for performance
- **Components:** Radix UI (accessible, composable, unstyled primitives)
- **Responsive:** Mobile-first breakpoints
- **Dark Mode:** Built-in with next-themes

---

## 📊 File Structure (161 Essential Files)

```
fabrk/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages (login, register, reset)
│   │   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── (legal)/           # Terms, privacy, refund
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── stripe/        # Stripe checkout, portal
│   │   │   └── webhooks/      # Stripe webhooks
│   │   ├── error.tsx          # 500 error page
│   │   ├── not-found.tsx      # 404 error page
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # 23 Radix UI components
│   │   ├── landing/           # Landing page sections
│   │   ├── dashboard/         # Dashboard components
│   │   └── settings/          # Settings pages
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Database client
│   │   ├── stripe.ts          # Stripe helpers
│   │   └── email.ts           # Email service
│   ├── emails/                # Email templates (5)
│   └── config.js              # Central configuration
├── prisma/
│   └── schema.prisma          # Database schema (7 models)
├── docs/                      # Comprehensive guides
└── public/                    # Static assets
```

**Philosophy:** 161 essential files. No 1000-file maze. Clean, readable TypeScript you can actually understand.

---

## ⚡ Time Savings

| Task | DIY | Fabrk |
|------|-----|-------|
| NextAuth setup | 4-6 hours | ✅ Done |
| Stripe integration | 6-8 hours | ✅ Done |
| Database schema | 2-4 hours | ✅ Done |
| Email system | 3-4 hours | ✅ Done |
| Dashboard UI | 8-12 hours | ✅ Done |
| Data tables | 4-6 hours | ✅ Done |
| Legal pages | 2-3 hours | ✅ Done |
| Error handling | 2-3 hours | ✅ Done |
| **Total** | **31-46 hours** | **~3 hours** |

**Result:** 3-4 weeks of dev work → 3 hours of setup. Get to your unique features 10x faster.

---

## 💰 Pricing

**$79** - One-time payment

**What you get:**
- ✅ Complete source code (80+ components)
- ✅ Lifetime updates for v1.x
- ✅ Unlimited projects (personal + commercial)
- ✅ No attribution required
- ✅ Discord community access
- ✅ Email support
- ✅ 30-day money-back guarantee

**What you DON'T get:**
- ❌ Monthly fees ($0 recurring)
- ❌ Per-project licensing (use on unlimited projects)
- ❌ Vendor lock-in (it's your code, modify freely)

---

## 🔐 License

**Commercial License** - Use on unlimited projects, no attribution required.

**Can:**
- ✅ Use for personal projects
- ✅ Use for client projects
- ✅ Sell products built with Fabrk
- ✅ Modify and extend the code
- ✅ Use on unlimited domains/projects

**Cannot:**
- ❌ Resell/redistribute Fabrk itself as a boilerplate
- ❌ Create competing boilerplate products
- ❌ Share your license with others

See [Terms of Service](/terms) for full details.

---

## 🚢 Deployment

Deploy to Vercel in under 15 minutes:

```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# Go to vercel.com/new

# 3. Add environment variables
# DATABASE_URL, NEXTAUTH_SECRET, STRIPE keys, etc.

# 4. Deploy
# Vercel will build and deploy automatically
```

**Full deployment guide:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

**Recommended stack:**
- **Hosting:** Vercel (free tier)
- **Database:** Supabase or Railway (free tier)
- **Email:** Resend (3,000 emails/month free)
- **Domain:** Namecheap, Cloudflare, or any registrar

---

## 🤝 Support

- **Email:** [support@fabrk.dev](mailto:support@fabrk.dev)
- **Discord:** [discord.gg/fabrk](https://discord.gg/fabrk)
- **Docs:** Check [CLAUDE.md](CLAUDE.md) and [docs/](docs/)

---

## 🎬 What's Next?

After purchasing Fabrk:

1. **Setup (5 min)** - Follow [QUICK-START.md](docs/QUICK-START.md)
2. **Customize (30 min)** - Update branding, colors, copy in `src/config.js`
3. **Build (your time)** - Add your unique SaaS features
4. **Deploy (15 min)** - Follow [DEPLOYMENT.md](docs/DEPLOYMENT.md)
5. **Launch** - Get customers, make money

**The boring stuff is done. Focus on what makes your SaaS unique.**

---

## 📝 Changelog

See [LAUNCH-STATUS.md](LAUNCH-STATUS.md) for detailed component inventory and launch readiness status.

---

## ❤️ Built With

This boilerplate is built with love for indie hackers and solo developers who want to ship fast without sacrificing quality.

**No bloat. No BS. Just the essentials to launch your SaaS.**

---

**Ready to ship?** Get Fabrk for **$79** → [Buy Now](#pricing)
