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

# Fabrk - Development Repository

> Terminal-first SaaS boilerplate. Ship fast. Look sharp.

**⚠️ This is the private development repository. The customer-facing boilerplate is at: https://github.com/Theft-SUDO/fabrk-official**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![CI](https://github.com/jpoindexter/fabrk_plate/actions/workflows/ci.yml/badge.svg)](https://github.com/jpoindexter/fabrk_plate/actions/workflows/ci.yml)

---

## 📁 Dual Repository Architecture

This project uses a **two-repo model** to separate the product (boilerplate) from the private development environment:

| Repo | Purpose | URL |
|------|---------|-----|
| **fabrk_plate** (this repo) | Development + Marketing | Private |
| **fabrk-official** | Customer-facing boilerplate | https://github.com/Theft-SUDO/fabrk-official |

### What's Private (Stays Here)
- ✗ Your marketing site (`src/app/(marketing)/*`)
- ✗ Marketing components (`src/components/landing/`, `marketing/`, `home/`)
- ✗ Internal scripts and tools (`.internal/`, `.claude/`, `.dev-plans/`)
- ✗ Development plans and audit files
- ✗ Private environment variables (`.env.local`)

### What's Public (Syncs to Official)
- ✓ Core boilerplate (`src/app/(platform)/`, `src/app/(auth)/`)
- ✓ API routes (`src/app/api/*`)
- ✓ UI components (`src/components/ui/`, `dashboard/`)
- ✓ Documentation (`src/app/docs/*`, `src/app/library/*`)
- ✓ Database schema (`prisma/`)
- ✓ Templates and examples
- ✓ Configuration files

---

## 🚀 Quick Start (Development)

```bash
# Clone and install
git clone https://github.com/jpoindexter/fabrk_plate.git
cd fabrk_plate
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

## 🔄 Syncing to Official Repo

After making changes to the boilerplate:

```bash
# Sync boilerplate to customer repo
./scripts/sync-to-official.sh

# Then push official repo
cd ../fabrk-official
git add -A && git commit -m "Sync updates from dev"
git push
```

**What gets synced:**
- Core app, auth, and API routes
- UI components (excluding marketing)
- Documentation and templates
- Database schema and configs
- **Test files excluded automatically**

See `scripts/sync-to-official.sh` for the complete whitelist.

---

## 🔒 Security Setup (Official Repo)

The official repo has enterprise-grade security configured:

### Automated Security (Active)
- ✅ **CodeQL Analysis** - Scans on every push/PR
- ✅ **CI Pipeline** - TypeScript, linting, build checks
- ✅ **Dependabot** - Auto-creates PRs for dependency updates
- ✅ **Secret Scanning** - Blocks credential leaks
- ✅ **Branch Protection** - Requires PR reviews to merge

### Manual Setup Required
**⚠️ IMPORTANT**: Complete these GitHub settings for full protection:

1. **Enable Security Features** (Settings → Code security and analysis)
   - Enable Dependabot alerts/updates
   - Enable Secret scanning + push protection
   - Enable Code scanning

2. **Configure Branch Protection** (Settings → Branches)
   - Require PR reviews (1 approval minimum)
   - Require CodeQL + build checks to pass
   - Block force pushes
   - Restrict push access

**Full checklist:** `.internal/GITHUB_SECURITY_CHECKLIST.md`

---

## 🛠️ Commands

```bash
# Development
npm run dev              # Start dev server (auto-kills port 3000)
npm run build            # Production build
npm run type-check       # TypeScript validation

# Code Quality
npm run lint             # ESLint + hex color scan
npm run scan:hex         # Detect hardcoded colors
npm run format           # Prettier formatting

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed test data
npm run db:reset         # Reset and reseed

# Testing
npm test                 # Vitest unit tests
npm run test:e2e         # Playwright E2E tests

# Sync
./scripts/sync-to-official.sh  # Sync to customer repo
```

---

## 📋 Pre-Commit Hooks

Git commits automatically run these checks via **Husky + lint-staged**:

| Check | Blocks Commit? |
|-------|----------------|
| TypeScript (`tsc --noEmit`) | ✅ |
| ESLint + auto-fix | ✅ |
| Prettier formatting | ✅ |
| Hardcoded colors (`bg-white`, etc.) | ✅ |
| `console.log` statements | ✅ |
| Direct `process.env` access | ✅ |

**Bypass (emergency):** `git commit --no-verify`

---

## 🎨 Design System

Fabrk uses a **terminal-first design system** with strict rules:

### Core Principles
1. **Sharp edges** - `rounded-none` on all elements
2. **Monospace** - `font-mono` for UI text
3. **Design tokens only** - No hardcoded colors
4. **8-point grid** - Consistent spacing

### Design Tokens
```tsx
import { mode } from "@/design-system";

// Use mode tokens in className
<Button className={cn(mode.radius, mode.font, "w-full text-xs")}>
  > SUBMIT
</Button>
```

### Allowed Colors
```tsx
// GOOD
bg-background, bg-card, bg-primary, text-foreground, border-border

// BAD (will fail pre-commit)
bg-white, bg-gray-500, text-black, #hexvalues
```

**Full guide:** `DESIGN_SYSTEM.md`

---

## 📚 Documentation

All docs are in `CLAUDE.md` for AI assistance. Key sections:

- **Quick Reference** - Commands and common patterns
- **Architecture** - Three-layer design (UI → API → Service)
- **Design System** - Terminal aesthetic rules
- **Dual Repo Workflow** - How to sync between repos
- **Pre-Commit Hooks** - What's automatically checked
- **Troubleshooting** - Common issues and fixes

**For users:** Customer-facing docs are in `src/app/docs/*` and sync to official repo.

---

## 🧪 Testing

```bash
# Unit/integration tests
npm test

# E2E tests (Playwright)
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📁 Project Structure

```
fabrk_plate/ (dev repo)
├── .internal/               # Private scripts and tools
│   ├── scripts/
│   │   ├── sync-to-official.sh          # Sync script
│   │   ├── customer-library-layout.tsx  # Boilerplate layouts
│   │   └── utilities/                   # Dev utilities
│   └── GITHUB_SECURITY_CHECKLIST.md     # Security setup
├── scripts/                 # Public utility scripts
│   └── sync-to-official.sh  # Main sync script
├── src/
│   ├── app/
│   │   ├── (platform)/      # ✓ Syncs to official
│   │   ├── (auth)/          # ✓ Syncs to official
│   │   ├── (marketing)/     # ✗ Private (your landing)
│   │   ├── api/             # ✓ Syncs to official
│   │   ├── docs/            # ✓ Syncs to official
│   │   ├── library/         # ✓ Syncs to official
│   │   └── page.tsx         # ✗ Private (replaced with boilerplate)
│   ├── components/
│   │   ├── ui/              # ✓ Syncs to official
│   │   ├── dashboard/       # ✓ Syncs to official
│   │   ├── landing/         # ✗ Private (your marketing)
│   │   ├── marketing/       # ✗ Private
│   │   └── home/            # ✗ Private
│   ├── lib/                 # ✓ Syncs to official
│   └── config.js            # ✓ Syncs to official
├── prisma/                  # ✓ Syncs to official
├── public/                  # ✓ Syncs to official
├── CLAUDE.md                # ✓ Syncs to official
└── README.md                # ✗ Private (this file)
```

---

## 🔄 Adding New Features

### For Boilerplate (Will Sync)
1. Make changes in boilerplate directories
2. Commit to dev repo
3. Run `./scripts/sync-to-official.sh`
4. Push official repo

### For Marketing (Stays Private)
1. Add files to `src/app/(marketing)/`, `src/components/landing/`, etc.
2. Commit to dev repo
3. No sync needed - stays private

### Adding New Exclusions
If you add new private files, update the sync script:

```bash
# Edit scripts/sync-to-official.sh
rsync -a --exclude='your-new-private-folder/' ...
```

---

## 🛟 Support

**Internal Issues:**
- Check `.internal/GITHUB_SECURITY_CHECKLIST.md` for security setup
- See `CLAUDE.md` for development guidance
- Review `DESIGN_SYSTEM.md` for styling rules

**Customer Support:**
- Email: support@fabrek.dev
- Issues: https://github.com/Theft-SUDO/fabrk-official/issues

---

## 📝 License

**Commercial License** - See `LICENSE.md` for full terms.

---

## 🚢 Deployment

The official repo deploys to production. This dev repo is for development only.

**Official repo deployment:**
```bash
cd ../fabrk-official
vercel
```

---

**Built with ❤️ by indie hackers, for indie hackers.**

**Ship fast. Stay lean. Build what matters.**

---

**© 2025 THEFT BV. All rights reserved.**
