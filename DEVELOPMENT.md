# Fabrk Development Repository

> Internal development repo for Fabrk SaaS boilerplate. Contains marketing site + boilerplate product.

**⚠️ This is the private development repository. The customer-facing boilerplate is at: https://github.com/Theft-SUDO/fabrk-official**

---

## 📁 Dual Repository Architecture

This project uses a **two-repo model** to separate the product (boilerplate) from the private development environment:

| Repo | Purpose | URL |
|------|---------|-----|
| **fabrk-dev** (this repo) | Development + Marketing | Private |
| **fabrk-official** | Customer-facing boilerplate | https://github.com/Theft-SUDO/fabrk-official |

### What's Private (Stays Here)

- ✗ Marketing site (`src/app/(marketing)/*`)
- ✗ Marketing components (`src/components/landing/`, `marketing/`, `home/`)
- ✗ Internal scripts and tools (`.internal/`, `.claude/`, `.dev-plans/`)
- ✗ Development plans and audit files
- ✗ Private environment variables (`.env.local`)
- ✗ Boilerplate reference code (`.internal/boilerplate-references/`)

### What's Public (Syncs to Official)

- ✓ Core boilerplate (`src/app/(platform)/`, `src/app/(auth)/`)
- ✓ API routes (`src/app/api/*`)
- ✓ UI components (`src/components/ui/`, dashboard/) # 77 UI components
- ✓ Documentation (`src/app/docs/*`, `src/app/library/*`)
- ✓ Database schema (`prisma/`)
- ✓ Templates and examples
- ✓ Configuration files
- ✓ `README.md` (automatically cleaned for customers)
- ✓ `CLAUDE.md` (AI assistant guidance)

---

## 🚀 Development Quick Start

```bash
# Clone and install
git clone https://github.com/jpoindexter/fabrk-dev.git
cd fabrk-dev
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

After making changes to the boilerplate (NOT marketing):

```bash
# 1. Review what will be synced (dry-run)
./scripts/sync-to-official.sh --dry-run

# 2. Sync files to customer repo
./scripts/sync-to-official.sh

# 3. Review changes in official repo
cd ../fabrk-official
git status
git diff

# 4. Commit and push official repo
git add -A
git commit -m "Sync updates from dev"
git push
```

### What the Sync Script Does

1. **Copies core files** - App, auth, API routes, UI components
2. **Copies documentation** - Docs pages, library templates
3. **Copies config** - Database schema, Tailwind, TypeScript config
4. **Cleans README.md** - Removes development-specific sections
5. **Removes private folders** - `.internal/`, `.claude/`, `marketing/`
6. **Scans for secrets** - Blocks sync if secrets detected

**Whitelist approach**: Only explicitly listed files are copied. See `scripts/sync-to-official.sh` lines 100-260 for the complete list.

### Secret Scanning (Security)

The sync script automatically scans for hardcoded secrets before syncing:

```bash
# Patterns detected and blocked:
sk_live_*              # Stripe live keys
ghp_*                  # GitHub personal access tokens
AKIA*                  # AWS access keys
-----BEGIN PRIVATE KEY # Private keys
postgres://            # Database URLs with credentials
```

If secrets are detected, the sync is **blocked** until you remove them.

---

## 🛠️ Commands

```bash
# Development
npm run dev              # Start dev server (auto-kills port 3000)
npm run build            # Production build
npm run type-check       # TypeScript validation

# Code Quality (automated on commit)
npm run lint             # ESLint + hex color scan
npm run scan:hex         # Detect hardcoded colors
npm run format           # Prettier formatting
npm run audit:staged     # Design system audit (runs on commit)

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed test data
npm run db:reset         # Reset and reseed

# Testing
npm test                 # Vitest unit tests
npm run test:e2e         # Playwright E2E tests

# Sync
./scripts/sync-to-official.sh           # Sync to customer repo
./scripts/sync-to-official.sh --dry-run # Preview sync changes
```

---

## 📂 Project Structure

```
fabrk-dev/ (dev repo)
├── .internal/                    # PRIVATE - Never syncs
│   ├── scripts/
│   │   ├── sync-to-official.sh           # Main sync script
│   │   ├── customer-library-layout.tsx   # Boilerplate layouts
│   │   └── utilities/                    # Dev utilities (clean-readme, etc.)
│   ├── boilerplate-references/           # Competitor research
│   ├── agent-tools/                      # Browser automation tools
│   └── GITHUB_SECURITY_CHECKLIST.md      # Security setup guide
│
├── .claude/                      # PRIVATE - Never syncs
│   └── audit/                    # Design system audit framework (58 files)
│
├── scripts/                      # PUBLIC - Syncs to official
│   └── sync-to-official.sh       # Copy of main sync script
│
├── src/
│   ├── app/
│   │   ├── (platform)/           # SYNCS - Dashboard and app pages
│   │   ├── (auth)/               # SYNCS - Auth pages
│   │   ├── (marketing)/          # PRIVATE - Your landing pages
│   │   │   ├── page.tsx          # PRIVATE - Homepage
│   │   │   ├── about/            # PRIVATE
│   │   │   ├── contact/          # PRIVATE
│   │   │   ├── features/         # PRIVATE
│   │   │   ├── pricing/          # PRIVATE
│   │   │   ├── success/          # PRIVATE
│   │   │   ├── docs/             # SYNCS - Component documentation
│   │   │   └── library/          # SYNCS - Template showcase
│   │   └── api/                  # SYNCS - 30+ API routes
│   │
│   ├── components/
│   │   ├── ui/                   # SYNCS - 77 UI components
│   │   ├── docs/                 # SYNCS - Documentation templates
│   │   ├── dashboard/            # SYNCS - Dashboard components
│   │   ├── landing/              # PRIVATE - Marketing sections
│   │   ├── marketing/            # PRIVATE - Marketing navigation
│   │   ├── home/                 # PRIVATE - Homepage components
│   │   └── shared/               # SYNCS - Logo, Footer, etc.
│   │
│   ├── lib/                      # SYNCS - Utilities and clients
│   ├── config/                   # SYNCS - App configuration
│   └── design-system/            # SYNCS - 12 terminal themes
│
├── prisma/                       # SYNCS - Database schema
├── public/                       # SYNCS - Static assets
│
├── README.md                     # SYNCS (cleaned for customers)
├── DEVELOPMENT.md                # PRIVATE (this file)
├── CLAUDE.md                     # SYNCS - AI assistant guidance
└── docs/                         # SYNCS - Design system docs
```

---

## 🔒 Security Setup (Official Repo)

The official repo has enterprise-grade security configured. After syncing, verify these settings:

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

## 📝 Pre-Commit Hooks

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

## 🎨 Design System Compliance

### Terminal Aesthetic Rules

1. **Sharp edges** - `rounded-none` on all elements (never `rounded-md/lg/xl`)
2. **Monospace** - `font-mono` for ALL UI text (body tag enforces globally)
3. **Design tokens only** - No hardcoded colors (enforced by pre-commit)
4. **8-point grid** - All spacing values must be multiples of 4px

### Detecting Violations

```bash
# Scan for hardcoded hex colors
npm run scan:hex

# Run full design system audit
npm run audit:staged  # Runs on git add
```

### Protected Components (DO NOT MODIFY)

These components are **LOCKED** - always ask before editing:

```
src/components/ui/           # 77 UI components - ALL LOCKED
src/components/marketing/    # Marketing navigation
src/components/navigation/   # Site navigation
src/components/shared/       # Logo, Footer, etc.
```

**Safe to modify:**
- `/src/app/` - All page files
- Demo components inside docs pages
- New components you create

---

## 🚢 Deployment

### Development Site (Private)

Deploys automatically from this repo (marketing + boilerplate):

```bash
git push origin main
# → Vercel auto-deploys to fabrk.dev (or your domain)
```

### Official Site (Customer Repo)

Deploys from `fabrk-official` repo:

```bash
# After syncing changes
cd ../fabrk-official
git push origin main
# → Vercel auto-deploys to fabrk-official.vercel.app
```

---

## 🔧 Adding New Features

### For Boilerplate (Will Sync to Customers)

1. Make changes in boilerplate directories:
   - `src/app/(platform)/` - Dashboard pages
   - `src/app/(auth)/` - Auth pages
   - `src/app/api/` - API routes
   - `src/components/ui/` - UI components
   - `src/components/dashboard/` - Dashboard components

2. Commit to dev repo:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push
   ```

3. Sync to customer repo:
   ```bash
   ./scripts/sync-to-official.sh
   cd ../fabrk-official
   git add -A && git commit -m "Sync updates from dev"
   git push
   ```

### For Marketing (Stays Private)

1. Add files to private directories:
   - `src/app/(marketing)/` - Landing pages
   - `src/components/landing/` - Marketing sections
   - `src/components/marketing/` - Marketing nav
   - `src/components/home/` - Homepage components

2. Commit to dev repo:
   ```bash
   git add .
   git commit -m "feat: add marketing section"
   git push
   ```

3. **No sync needed** - stays private automatically

### Adding New Sync Exclusions

If you add new private directories, update the sync script:

```bash
# Edit scripts/sync-to-official.sh
# Add to exclusion list around line 100-130
rsync -a --exclude='your-new-private-folder/' ...
```

---

## 📊 Security Audit Status (10/10)

Fabrk achieved **perfect 10/10** on comprehensive STOP-SHIP security audit covering:

| Gate | Score | Status |
|------|-------|--------|
| A: Secrets Hygiene | 10/10 | ✅ |
| B: Client/Server Boundaries | 10/10 | ✅ |
| C: Web Attacks (XSS, CSRF, Open Redirect) | 10/10 | ✅ |
| D: API Security | 10/10 | ✅ (fixed admin routes) |
| E: Auth/Session Management | 10/10 | ✅ |
| F: Security Headers | 10/10 | ✅ |
| G: Dependency Vulnerabilities | 10/10 | ✅ (0 vulnerabilities) |
| H: CI/CD Security | 10/10 | ✅ (14 GitHub Actions workflows) |
| I: Sync Script Security | 10/10 | ✅ (enterprise-grade with scanning) |

**Verdict:** ✅ GO - Production ready, zero blockers

---

## 🛟 Support

### Internal Development

- **Linear**: https://linear.app/theft-bv (issue tracking)
- **Figma**: (design files)
- **Documentation**: `CLAUDE.md`, `docs/08-design/DESIGN_SYSTEM.md`

### Customer Support

- **GitHub Issues**: https://github.com/Theft-SUDO/fabrk-official/issues
- **Email**: support@fabrek.dev
- **Discord**: Coming soon

---

## 📚 Key Documentation

| File | Purpose |
|------|---------|
| `README.md` | Customer-facing getting started guide (syncs to official) |
| `DEVELOPMENT.md` | This file - Development repo guide (private) |
| `CLAUDE.md` | AI assistant guidance (syncs to official) |
| `docs/08-design/DESIGN_SYSTEM.md` | Complete design system spec (syncs) |
| `.internal/GITHUB_SECURITY_CHECKLIST.md` | Security setup checklist (private) |
| `.claude/audit/README.md` | Design system audit framework (private) |

---

## 🎯 Development Workflow

### Daily Development

1. **Check Linear** - What's in current sprint?
2. **Create feature branch** - `git checkout -b feat/feature-name`
3. **Make changes** - Follow design system rules
4. **Test locally** - Desktop, mobile, dark mode
5. **Commit** - Pre-commit hooks run automatically
6. **Push** - `git push origin feat/feature-name`
7. **Create PR** - Review before merging to main

### Before Syncing to Customers

1. **Test boilerplate thoroughly** - Use `/src/app/(platform)/` pages
2. **Check for secrets** - Run `npm run scan:hex`
3. **Verify design compliance** - Run `npm run audit:staged`
4. **Review sync preview** - `./scripts/sync-to-official.sh --dry-run`
5. **Sync** - `./scripts/sync-to-official.sh`
6. **Test official repo** - Clone, install, run
7. **Push official repo** - `cd ../fabrk-official && git push`

---

## 🔍 Troubleshooting

### Port 3000 Already in Use

```bash
npm run dev  # Auto-kills old process
```

### Sync Script Blocked (Secrets Detected)

```bash
# Find the secret
grep -r "sk_live_" src/
grep -r "ghp_" src/

# Remove it, use environment variables instead
# Then try sync again
```

### Pre-Commit Hooks Failing

```bash
# Fix TypeScript errors
npm run type-check

# Fix ESLint errors
npm run lint

# Fix hardcoded colors
npm run scan:hex
# Replace with design tokens (bg-primary, text-foreground, etc.)
```

### README Not Syncing Correctly

```bash
# Test clean script manually
node .internal/scripts/utilities/clean-readme.mjs README.md

# Check output - should remove development sections
cat README.md
```

---

**Built with ❤️ by indie hackers, for indie hackers.**

**Ship fast. Stay lean. Build what matters.**

---

**© 2025 THEFT BV. All rights reserved.**
