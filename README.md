```
███████████   █████████   ███████████  ███████████   █████   ████
░░███░░░░░░█  ███░░░░░███ ░░███░░░░░███░░███░░░░░███ ░░███   ███░
 ░███   █ ░  ░███    ░███  ░███    ░███ ░███    ░███  ░███  ███
 ░███████    ░███████████  ░██████████  ░██████████   ░███████
 ░███░░░█    ░███░░░░░███  ░███░░░░░███ ░███░░░░░███  ░███░░███
 ░███  ░     ░███    ░███  ░███    ░███ ░███    ░███  ░███ ░░███
 █████       █████   █████ ███████████  █████   █████ █████ ░░████
░░░░░       ░░░░░   ░░░░░ ░░░░░░░░░░░  ░░░░░   ░░░░░ ░░░░░   ░░░░
```

# Fabrk

> Terminal-first SaaS boilerplate. Ship fast. Look sharp.

234 production-ready components. 28 copy-paste templates. 20 color themes. TypeScript strict. $299.

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Commercial-green)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./docs/CONTRIBUTING.md)
[![CI](https://github.com/jpoindexter/fabrk_plate/actions/workflows/ci.yml/badge.svg)](https://github.com/jpoindexter/fabrk_plate/actions/workflows/ci.yml)
[![Deploy](https://github.com/jpoindexter/fabrk_plate/actions/workflows/deploy.yml/badge.svg)](https://github.com/jpoindexter/fabrk_plate/actions/workflows/deploy.yml)
[![E2E Tests](https://github.com/jpoindexter/fabrk_plate/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/jpoindexter/fabrk_plate/actions/workflows/e2e-tests.yml)

---

## 🎨 **NEW: Interactive Showcases** ⭐

**See everything before you build:**

- **[/demo](http://localhost:3000/demo)** - Complete feature overview - What's Included
- **[/components](http://localhost:3000/components)** - All 234 production-ready UI components with variants
- **[/library](http://localhost:3000/library)** - 28 copy-paste ready page templates ⭐ NEW
- **[/variations](http://localhost:3000/variations)** - 3 hero styles + 2 pricing layouts
- **[/examples/admin](http://localhost:3000/examples/admin)** - Admin dashboard with data table
- **[/examples/analytics](http://localhost:3000/examples/analytics)** - Analytics dashboard

**Preview everything interactively before purchasing!**

---

## What is Fabrk?

Fabrk is a **premium enterprise-grade Next.js 15 SaaS boilerplate** built for professional developers and agencies. Terminal-first design. Clean code. Ship fast.

**164 Production-Ready Components** - Complete UI library with everything you need
**13 Unique AI/Code + Image Tools** - code-block, code-generator, prompt-builder, markdown-editor, markdown-viewer, rich-text-editor, copy-button, cropper, image-dropzone, image-uploader, lightbox, color-picker, input-color
**28 Copy-Paste Templates** - Analytics, team management, billing, security
**20 Color Themes** - Purple, Ocean Blue, Forest Green, Sunset Orange, Hot Pink, Ruby Red
**Storybook Integration** - 95% Storybook story coverage (234+ components with stories)
**Complete Testing Suite** - Comprehensive test suite with 72 test files covering UI components, accessibility, and E2E flows

**Enterprise Features:**

✅ **Authentication** - NextAuth v5 (Credentials + Google OAuth)
✅ **Payments** - Stripe (one-time payments + subscriptions)
✅ **Database** - PostgreSQL + Prisma ORM
✅ **Email** - Resend with React Email templates
✅ **UI Components** - 234+ production-ready components with a cohesive design system + Storybook
✅ **Admin Dashboard** - User management, analytics, monitoring
✅ **TypeScript** - Strict mode, zero `any` types
✅ **Documentation** - 400KB comprehensive guides
✅ **Testing** - Complete test suite with Vitest + Playwright + Storybook

**Professional-grade code. Launch-ready. $299.**

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone https://github.com/yourusername/fabrk.git
cd fabrk
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 3. Set up database
npm run db:push
npm run db:seed  # Optional: Add test data

# 4. Start development
npm run dev
```

Visit **http://localhost:3000** 🎉

**Detailed setup:** See [docs/01-getting-started/QUICK-START.md](./docs/01-getting-started/QUICK-START.md)

**What's new:** See [CHANGELOG.md](./CHANGELOG.md) for v1.0.0 release notes (security fixes, performance improvements, environment validation)

---

## 📁 Repository Structure

### Core Directories

- **`/src`** - Application source code
- **`/docs`** - Comprehensive documentation (400KB+)
- **`/tests`** - Vitest + Playwright tests
- **`/prisma`** - Database schema
- **`/scripts`** - Utility scripts
- **`/public`** - Static assets

### Organization

- **`/assets`** - Images, logos, release archives
- **`.agent-workspace`** - Agent configs (gitignored)
- **`.dev-plans`** - Development plans (gitignored)
- **`.integrations`** - Third-party integration docs
- **`.archive`** - Preserved old code (gitignored)
- **`/Boilerplate`** - Reference boilerplates (gitignored)

---

## 📦 What's Included

### Core Features

- **Next.js 15** - App Router, Server Components, React 19
- **Authentication** - NextAuth v5 with email/password + OAuth
- **Payments** - Stripe Checkout + Webhooks
- **Database** - PostgreSQL with Prisma ORM
- **Email** - Transactional emails via Resend
- **TypeScript** - Strict mode for type safety
- **ESLint** - Code quality enforcement

### 164 Production-Ready Components

**Landing Page (9 components):**
- 3 Hero variations (Centered, Split, Video)
- Features section
- 2 Pricing layouts (Cards, Comparison Table)
- FAQ accordion
- Tech stack showcase
- Comparison table
- Navigation + Footer

**Dashboard (8 components):**
- Account settings
- Billing management
- Profile editing
- Usage limits tracker
- Stats cards
- License card
- Admin panel
- Data tables (TanStack Table)

**UI Primitives (25 components):**
- Button, Card, Input, Dialog, Dropdown, Select, Tabs, Accordion, Toast, Label, Textarea, Badge, Alert, Avatar, Checkbox, Radio, Switch, Slider, Progress, Separator, Sheet, Skeleton, Table, Tooltip, Command

**AI & Code Tools (7 components):**
- Code block, Code generator, Prompt builder, Markdown editor, Markdown viewer, Rich text editor, Copy button

**Image Tools (6 components):**
- Image cropper, Image dropzone, Image uploader, Lightbox, Color picker, Input color

**Auth & Account (9 components):**
- Login/register forms
- Email verification
- Password reset
- Profile settings
- Security settings
- Session management
- API keys management

**Settings (6 components):**
- Appearance (theme toggle)
- Notifications
- Privacy controls
- Data export
- Danger zone

**Charts (3 components):**
- Area chart
- Bar chart
- Line chart

### 28 Copy-Paste Ready Templates ⭐ NEW

Production-ready page templates for common SaaS use cases. Each template is fully functional, responsive, and built with the same components and design system.

**Dashboards (3 templates):**
- **Analytics Dashboard** - Metrics, charts, data tables, traffic analysis
- **Team Dashboard** - Multi-tenancy, RBAC, member management, activity feed
- **Chart Library** - Recharts showcase (line, area, bar, pie charts)

**Admin Panels (1 template):**
- **User Management** - TanStack Table with sorting, filtering, pagination, bulk actions

**Account Pages (3 templates):**
- **Settings Page** - 4-tab interface (General, Account, Privacy, Billing)
- **Billing Dashboard** - Subscriptions, usage tracking, payment history
- **Security & Privacy** - 2FA, OAuth, sessions, audit log, GDPR compliance

**Marketing (2 templates):**
- **Email Templates** - Interactive showcase of 5 transactional emails
- **Documentation Layout** - 3-column docs site with markdown parsing

**View all templates:** [/library](http://localhost:3000/library) | [Template README](./src/app/library/README.md)

**Email Templates (5):**
- Welcome email
- Email verification
- Password reset
- Purchase confirmation
- Subscription update

**Error Pages (3):**
- 404 Not Found
- 500 Server Error
- Maintenance Mode

**Legal Pages (3):**
- Terms of Service (GDPR compliant)
- Privacy Policy
- Refund Policy

### 400KB Comprehensive Documentation (24 guides)

**Getting Started:**
- Quick Start (8KB)
- Component Showcase (11KB)
- Quick Reference (7KB)
- API Reference (19KB)

**Launch & Marketing:**
- Launch Timeline (16KB)
- Social Media Templates (15KB)
- Product Hunt Guide (14KB)
- SEO Optimization (12KB)
- Marketing Strategy (18KB)

**Operations:**
- Analytics Setup (15KB)
- Post-Launch Monitoring (18KB)
- Customer Onboarding (19KB)
- Troubleshooting (18KB)

**Optimization & Growth:**
- Performance Optimization (20KB)
- Conversion Optimization (23KB)
- Growth Tactics (21KB)

**Security & Reliability:**
- Security Best Practices (21KB)
- Security Overview (8KB)
- Backup & Recovery (16KB)

**Development:**
- Deployment Guide (12KB)
- Alternative Deployments (22KB)
- Component Best Practices (16KB)
- Testing Guide (19KB)
- Architecture Overview (19KB)

**Project Info:**
- Changelog (10KB)
- Contributing Guide (12KB)
- Documentation Index (18KB)

### Automation & CI/CD

- **GitHub Actions** - CI pipeline with linting, type checking, testing, and building
- **Lighthouse CI** - Automated performance audits on every PR
- **Database Backups** - Daily automated backups with S3 support
- **Dependabot** - Automated dependency updates
- **Database Seeding** - Test data for development
- **Setup Scripts** - One-command local setup
- **Health Checks** - Environment validation

---

## 🎯 Why Fabrk?

### vs Building from Scratch

| Task | DIY | Fabrk |
|------|-----|-------|
| Setup Next.js + TypeScript | 4 hours | ✅ Done |
| Database + Prisma | 8 hours | ✅ Done |
| Authentication | 40 hours | ✅ Done |
| Payment integration | 24 hours | ✅ Done |
| Email system | 16 hours | ✅ Done |
| UI components | 40 hours | ✅ Done |
| Landing pages | 16 hours | ✅ Done |
| Testing + bugs | 40 hours | ✅ Done |
| Documentation | 16 hours | ✅ Done |
| CI/CD setup | 12 hours | ✅ Done |
| **Total** | **216 hours** | **1-3 days** |

**Time saved:** 213 hours
**Money saved:** $10,650 (at $50/hour)
**Investment:** $299
**ROI:** 3,463%

### What's Included

| Feature | Details |
|---------|---------|
| **Components** | 234 production-ready |
| **Templates** | 28 copy-paste ready |
| **Themes** | 6 color schemes |
| **Test Coverage** | 85+ tests (Vitest + Playwright) |
| **Storybook** | 95% coverage |
| **Unique Tools** | 13 AI/Code + Image tools |
| **Framework** | Next.js 15 |
| **Database** | PostgreSQL + Prisma |
| **TypeScript** | Strict mode |
| **Documentation** | 400KB+ guides |
| **CI/CD** | GitHub Actions |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 (strict mode) |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | NextAuth v5 |
| **Payments** | Stripe |
| **Email** | Resend |
| **UI** | Radix UI + Tailwind CSS |
| **Styling** | Tailwind CSS + next-themes |
| **Forms** | React Hook Form + Zod |
| **Tables** | TanStack Table v8 |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Testing** | Vitest + Playwright |
| **CI/CD** | GitHub Actions |
| **Deployment** | Vercel (recommended) |

---

## 📊 Project Stats

- **Files:** 156 clean, organized files
- **Components:** 234 production-ready
- **Unique Tools:** 13 AI/Code + Image tools
- **Test Coverage:** 85+ unit tests with Vitest + Playwright E2E
- **Storybook:** 95% coverage with interactive stories
- **Templates:** 28 copy-paste ready page layouts
- **Themes:** 6 color schemes with instant switching
- **Documentation:** 24 guides, 400KB, ~12,000 lines
- **TypeScript:** 100% strict mode
- **GitHub Actions:** 4 workflows (CI, Lighthouse, Backup, Dependabot)
- **License:** Commercial use allowed

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel

# Or use one-click deploy:
# https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fabrk
```

### Other Platforms

Fabrk works on all major platforms:
- Railway
- Fly.io
- Render
- DigitalOcean App Platform
- AWS Amplify
- Self-hosted (VPS + Docker)

See [docs/ALTERNATIVE-DEPLOYMENTS.md](./docs/ALTERNATIVE-DEPLOYMENTS.md) for step-by-step guides.

---

## 💰 Pricing

**One-time payment:** $299

**What you get:**
- ✅ Complete source code (234 components, 28 templates, 20 themes)
- ✅ Storybook integration (95% story coverage)
- ✅ Complete testing suite (Vitest unit tests + Playwright E2E)
- ✅ Lifetime updates (v1.x)
- ✅ Unlimited projects (personal + commercial)
- ✅ 400KB documentation (24 guides)
- ✅ Discord community access
- ✅ Email support (<24hr response)
- ✅ 30-day money-back guarantee

**Why $299?**
- **234 production-ready components** - everything you need to ship
- **13 unique AI/Code + Image tools** for modern SaaS features
- **Complete testing suite** with Vitest + Playwright
- **95% Storybook coverage** for component development
- **20 color themes** with instant switching
- **Clean, organized codebase** - 156 files, no bloat

---

## 📚 Documentation

**Browse all documentation:** [docs/README.md](./docs/README.md)

**Quick links:**
- [Getting Started](./docs/QUICK-START.md) - Setup in 1 hour
- [Component Showcase](./docs/COMPONENT-SHOWCASE.md) - All 234 components
- [API Reference](./docs/API-REFERENCE.md) - Complete API docs
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deploy to production
- [Troubleshooting](./docs/TROUBLESHOOTING.md) - Fix common issues
- [Testing Guide](./docs/TESTING-GUIDE.md) - Set up tests
- [Growth Tactics](./docs/GROWTH-TACTICS.md) - $0 to $10k MRR

---

## 🧪 Testing

Testing infrastructure is ready to go:

```bash
# Unit/integration tests (Vitest)
npm test

# E2E tests (Playwright)
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

See [docs/TESTING-GUIDE.md](./docs/TESTING-GUIDE.md) for complete setup guide.

---

## 🤖 Automation

Included GitHub Actions workflows:

- **CI Pipeline** - Lint, type check, test, and build on every push/PR
- **Lighthouse Audits** - Performance monitoring with score enforcement
- **Database Backups** - Daily automated backups to S3
- **Dependabot** - Weekly dependency updates with intelligent grouping

---

## 🎨 File Structure

```
fabrk/
├── .github/
│   ├── workflows/           # CI/CD pipelines
│   ├── dependabot.yml      # Dependency updates
│   └── ISSUE_TEMPLATE/     # Issue templates
├── docs/                   # 400KB documentation
├── prisma/
│   ├── schema.prisma       # Database schema (7 models)
│   └── seed.ts             # Database seeding
├── scripts/
│   ├── setup-local.sh      # Automated local setup
│   └── health-check.sh     # Environment validation
├── src/
│   ├── app/
│   │   ├── (auth)/         # Auth pages
│   │   ├── (dashboard)/    # Protected pages
│   │   ├── (legal)/        # Legal pages
│   │   ├── api/            # API routes
│   │   ├── variations/     # Component variations
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   ├── ui/             # 25 Radix UI components
│   │   ├── landing/        # Landing sections
│   │   ├── dashboard/      # Dashboard components
│   │   └── settings/       # Settings pages
│   ├── emails/             # 5 email templates
│   ├── lib/                # Utilities (auth, db, polar, email)
│   └── config.js           # Central configuration
└── public/                 # Static assets
```

**161 essential files.** Clean, organized, and easy to navigate.

---

## 🛟 Support

**Need help?**

- 📖 **Documentation:** [docs/](./docs/)
- 📧 **Email:** support@fabrek.dev (<24hr response)
- 🐛 **Bug reports:** [GitHub Issues](https://github.com/yourusername/fabrk/issues)

---

## 🎉 Success Stories

**Want to be featured here?**

We're looking for Fabrk customers who want to share their experience.

Tell us your story: success@fabrek.dev

---

## 🗺️ Roadmap

### v1.1 (Next 60 days)
- [ ] Command palette component
- [ ] Calendar/date picker
- [ ] Rich text editor
- [ ] File upload component
- [ ] Video tutorial series

### v1.2 (Next 90 days)
- [ ] Admin dashboard enhancements
- [ ] Team/organization support
- [ ] Role-based access control (RBAC)
- [ ] i18n (internationalization)

### v2.0 (6 months)
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework
- [ ] Email marketing integration
- [ ] Mobile app (React Native)

**Vote on features:** [GitHub Discussions](https://github.com/yourusername/fabrk/discussions)

---

## 📝 License

**Commercial License** - Use on unlimited projects, no attribution required.

**You can:**
- ✅ Use for personal and commercial projects
- ✅ Use for client work (agencies)
- ✅ Modify and extend the code
- ✅ Sell products built with Fabrk

**You cannot:**
- ❌ Resell/redistribute Fabrk as a boilerplate
- ❌ Create competing boilerplate products
- ❌ Share your license with others

See [LICENSE](./LICENSE) for full terms.

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- Report bugs via GitHub issues
- Suggest features
- Submit pull requests
- Improve documentation
- Share your success story

---

## ⭐ Star this repo!

If you find Fabrk helpful, give it a star on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/yourusername/fabrk?style=social)](https://github.com/yourusername/fabrk/stargazers)

---

## 🙏 Acknowledgments

Fabrk builds on amazing open-source projects:
- [Next.js](https://nextjs.org/) by Vercel
- [Prisma](https://www.prisma.io/) by Prisma
- [Radix UI](https://www.radix-ui.com/) by WorkOS
- [Tailwind CSS](https://tailwindcss.com/) by Tailwind Labs
- [Stripe](https://stripe.com/) for payments
- [Resend](https://resend.com/) for email

**Thank you to all contributors and supporters! 🙌**

---

**Built with ❤️ by indie hackers, for indie hackers.**

**Ship fast. Stay lean. Build what matters.**

---

**Ready to ship?** Get Fabrk for **$299** → [fabrk.dev](https://fabrk.dev)

---

**© 2025 THEFT BV. All rights reserved.**

See [LICENSE.md](./LICENSE.md) for complete license terms.
