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

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Fabrk** is a production-ready Next.js SaaS boilerplate with a terminal-inspired design system. Built for indie hackers who want to ship fast without compromising on quality.

---

## ⚡ Quick Start

```bash
# Clone and install
git clone https://github.com/Theft-SUDO/fabrk-official.git
cd fabrk-official
npm install --legacy-peer-deps

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Set up database
npm run db:push
npm run db:seed  # Optional: Add test data

# Start development
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 🚀 What's Inside

### UI Components (77 Total)

- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Calendar, Date Picker, File Upload
- **Navigation**: Navbar, Sidebar, Tabs, Breadcrumbs, Pagination, Command Palette
- **Feedback**: Alert, Toast, Dialog, Drawer, Modal, Progress, Skeleton, Spinner
- **Data**: Table, Data Table, Card, Badge, Avatar, Chart (7 variants)
- **Layout**: Container, Grid, Stack, Divider, Separator, Scroll Area
- **Advanced**: Carousel, Combobox, Context Menu, Dropdown, Popover, Tooltip, Accordion, Collapsible

### Design System

**Terminal aesthetic** with 12 complete themes:
- 🟢 5 CRT phosphor themes (Green, Red, Blue, Amber, Purple)
- 🎮 4 retro computer themes (C64, GameBoy, VIC-20, Atari)
- 📱 2 handheld themes (GameBoy Pocket, ZX Spectrum)
- ⚫ 1 high-contrast B&W theme

**Design principles:**
- `rounded-none` - Sharp terminal edges
- `font-mono` - Monospace everywhere (JetBrains Mono)
- 100% OKLCH color tokens - Zero hardcoded colors
- 8-point spacing grid
- WCAG 2.2 AA accessible

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript strict |
| **Styling** | Tailwind CSS 4, Radix UI, Framer Motion |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL (production), SQLite (development) |
| **Auth** | NextAuth v5 (Email magic link, OAuth providers) |
| **Payments** | Stripe, Polar.sh, Lemonsqueezy (multi-provider) |
| **Email** | Resend with React Email templates |
| **Validation** | Zod schemas (runtime type safety) |

### Security Features (10/10 Audit Score)

✅ **Secrets Management** - Environment validation with Zod, .env.local exclusion
✅ **CSRF Protection** - Token-based with middleware injection
✅ **CSP Headers** - Nonce-based scripts with `strict-dynamic`
✅ **Session Security** - JWT with version invalidation, 30-day expiry
✅ **API Protection** - Role-based access control, input validation
✅ **Security Headers** - HSTS, X-Frame-Options, Permissions-Policy
✅ **Dependency Scanning** - 0 vulnerabilities (npm audit)
✅ **CI/CD Security** - CodeQL, accessibility, performance checks
✅ **Admin Route Protection** - Role checks on all sensitive endpoints
✅ **No Hardcoded Secrets** - Git history clean, sync script with scanning

### Pre-Commit Quality Checks

Git commits automatically run:
- TypeScript compilation (`tsc --noEmit`)
- ESLint + auto-fix
- Prettier formatting
- Hardcoded color detection
- `console.log` removal
- Design system compliance

**Bypass (emergency only):** `git commit --no-verify`

---

## 🛠️ Configuration

### Environment Variables

Required variables in `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://..." # Production
# DATABASE_URL="file:./dev.db"  # Development (SQLite)

# Auth (NextAuth v5)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Payments (choose one or multiple)
STRIPE_SECRET_KEY="sk_test_..."
POLAR_ACCESS_TOKEN="polar_..."
LEMONSQUEEZY_API_KEY="ls_..."

# Email
RESEND_API_KEY="re_..."
```

**Optional variables:**

```bash
# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."

# AI Features (if using AI components)
AI_PROVIDER="ollama" # or "openai" or "google"
OPENAI_API_KEY="sk-..."
GOOGLE_API_KEY="..."
OLLAMA_MODEL="llama3.1:8b"
```

Full environment schema: `src/lib/env.ts`

### Database Setup

```bash
# Development (SQLite)
npm run db:push

# Production (PostgreSQL)
# Set DATABASE_URL to PostgreSQL connection string
npm run db:push

# Seed test data
npm run db:seed

# Reset database
npm run db:reset

# Open Prisma Studio
npm run db:studio
```

### Payment Provider Configuration

Choose one or multiple payment providers in `src/config/stripe.ts`:

```typescript
export const stripeConfig = {
  provider: "stripe", // or "polar" or "lemonsqueezy"
  // ... provider-specific settings
};
```

Each provider has its own webhook endpoint:
- Stripe: `/api/webhooks/stripe`
- Polar: `/api/webhooks/polar`
- Lemonsqueezy: `/api/webhooks/lemonsqueezy`

---

## 🎨 Design System

### Importing Design Tokens

```tsx
import { mode } from "@/design-system";

// Use mode tokens in className
<Button className={cn(mode.radius, mode.font, "w-full text-xs")}>
  > SUBMIT
</Button>

<Input className={cn(mode.radius, mode.font, "text-xs")} />
```

### Allowed Colors

```tsx
// ✅ GOOD - Design tokens
bg-background, bg-card, bg-muted, bg-primary
text-foreground, text-muted-foreground, text-primary
border-border, border-primary

// ❌ BAD - Hardcoded colors (will fail pre-commit)
bg-white, bg-gray-500, text-black, #hexvalues
```

### Typography Standards

```tsx
// UI Labels/Badges - UPPERCASE
<Badge label="SYSTEM INIT" />

// Buttons - UPPERCASE with > prefix
<Button>> GET FABRK</Button>

// Headlines (H1/H2) - UPPERCASE
<h2>BUILDING YOUR SAAS</h2>

// Body Text - Normal sentence case
<p>Why spend valuable time tackling auth...</p>
```

### Theme Switching

```tsx
import { useTheme } from "next-themes";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="crt-green">CRT Green</option>
      <option value="crt-red">CRT Red</option>
      <option value="gameboy">GameBoy</option>
      {/* ... 12 total themes */}
    </select>
  );
}
```

Full design system documentation: `docs/08-design/DESIGN_SYSTEM.md`

---

## 📁 Project Structure

```
fabrk-official/
├── src/
│   ├── app/
│   │   ├── (platform)/      # Dashboard and app pages
│   │   ├── (auth)/          # Auth pages (login, register, etc.)
│   │   ├── api/             # API routes (30+ endpoints)
│   │   ├── docs/            # Documentation site
│   │   └── library/         # Template showcase
│   ├── components/
│   │   ├── ui/              # 77 UI components (Radix primitives)
│   │   ├── docs/            # Documentation templates
│   │   ├── dashboard/       # Dashboard components
│   │   └── shared/          # Shared components (Logo, Footer, etc.)
│   ├── lib/
│   │   ├── auth.ts          # NextAuth v5 configuration
│   │   ├── db/              # Prisma client
│   │   ├── env.ts           # Environment validation (Zod)
│   │   ├── stripe.ts        # Stripe client
│   │   ├── polar.ts         # Polar client
│   │   └── lemonsqueezy/    # Lemonsqueezy client
│   ├── config/
│   │   ├── index.ts         # Config exports
│   │   ├── app.ts           # App configuration
│   │   ├── stripe.ts        # Payment provider config
│   │   └── i18n.ts          # Internationalization
│   └── design-system/
│       └── themes/          # 12 terminal themes (OKLCH colors)
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding
├── public/                  # Static assets
├── CLAUDE.md                # AI assistant guidance
└── docs/                    # Design system documentation
```

---

## 🧪 Testing

```bash
# Unit/integration tests (Vitest)
npm test

# E2E tests (Playwright)
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

**Environment variables to set:**
- `DATABASE_URL` (PostgreSQL connection string)
- `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
- `NEXTAUTH_URL` (your production domain)
- Payment provider keys (Stripe, Polar, or Lemonsqueezy)
- `RESEND_API_KEY` (for email)
- OAuth credentials (if using)

### Other Platforms

Fabrk works on any platform that supports Next.js 16:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

**Build command:** `npm run build`
**Output directory:** `.next`
**Install command:** `npm install --legacy-peer-deps`

---

## 📚 Documentation

### Component Documentation

All components documented at `/docs/components`:
- Props and variants
- Copy-paste examples
- Accessibility notes
- Terminal styling patterns

### Feature Guides

Located at `/docs/features`:
- Authentication (NextAuth v5, magic link, OAuth)
- Payments (Stripe, Polar, Lemonsqueezy)
- Database (Prisma, migrations, seeding)
- Email (Resend, React Email templates)
- Security (CSRF, CSP, session management)

### Templates

28+ copy-paste ready templates at `/library`:
- Landing pages
- Dashboard layouts
- Auth flows
- Pricing pages
- Documentation sites

---

## 🛟 Support

### Issues & Questions

- **GitHub Issues**: https://github.com/Theft-SUDO/fabrk-official/issues
- **Email**: support@fabrek.dev

### Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make changes (ensure pre-commit hooks pass)
4. Submit a pull request

### Community

- **Discord**: Coming soon
- **Twitter**: [@fabrk_dev](https://twitter.com/fabrk_dev)

---

## 🎯 Next Steps

1. **Configure authentication** - Set up NextAuth providers in `.env.local`
2. **Set up payments** - Configure Stripe, Polar, or Lemonsqueezy webhooks
3. **Customize design** - Choose your terminal theme, adjust colors
4. **Add features** - Build on top of 77 UI components
5. **Deploy** - Push to Vercel, set environment variables, go live

**Read CLAUDE.md for AI assistant guidance** - Optimized for Claude Code and other AI tools.

---

## 📝 License

MIT License - see LICENSE file for details.

**Built with ❤️ by indie hackers, for indie hackers.**

**Ship fast. Stay lean. Build what matters.**

---

**© 2025 THEFT BV. All rights reserved.**
