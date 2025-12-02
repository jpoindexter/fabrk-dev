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

# CLAUDE.md

> Terminal-first SaaS boilerplate. Ship fast. Look sharp.

## Quick Reference

| Need | Do This |
|------|---------|
| Sync to official repo | `./scripts/sync-to-official.sh` |
| Design system rules | See `DESIGN_SYSTEM.md` |
| Run full audit | See `.claude/audit/README.md` |
| Pre-commit checks | Automatic via Husky (see below) |
| Add memory | Type `# your instruction here` |

---

## Project Overview

**Fabrk** is a Next.js 15 SaaS boilerplate with 234 production-ready components, terminal-inspired design, and full-stack features.

**Tech Stack:** Next.js 15 (App Router, React 19) • TypeScript strict • NextAuth v5 • Polar.sh • Prisma + PostgreSQL • Resend • Framer Motion • Radix UI + Tailwind CSS 4 + DaisyUI (20 themes)

---

## Critical Rules

### 1. Terminal Style EVERYWHERE

All components use terminal aesthetic:
- `rounded-none` on all elements
- `font-mono` for UI text
- Design tokens only (no hardcoded colors)

### 2. NEVER hardcode colors

Use design tokens from `globals.css`. Run `npm run scan:hex` to detect violations.

```tsx
// GOOD
className="bg-primary text-primary-foreground"

// BAD (breaks theme switching)
className="bg-purple-500 text-white"
```

### 3. ALWAYS use templates for docs pages

See [Documentation Templates](#documentation-templates) section.

### 4. ALWAYS include `title` prop on `DocsCard`

Every card needs a terminal header.

---

## Commands

```bash
# Development
npm run dev              # Start dev server (auto-kills port 3000)
npm run build            # Production build
npm run type-check       # TypeScript validation

# Code Quality (automated on commit)
npm run lint             # ESLint + hex color scan
npm run scan:hex         # Detect hardcoded colors
npm run format           # Prettier format
npm run audit:staged     # Design system audit (runs on commit)

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed test data
npm run db:reset         # Reset and reseed

# Testing
npm test                 # Vitest unit tests
npm run test:e2e         # Playwright E2E tests

# Sync to Official Repo
./scripts/sync-to-official.sh    # Sync boilerplate to customer repo
```

---

## Architecture

```
UI Layer (src/app/)
   ↓
API Layer (src/app/api/)
   ↓
Service Layer (src/lib/)
```

### Key Directories

```
src/
├── app/
│   ├── templates/         # Copy-paste templates
│   ├── docs/              # Documentation site
│   └── api/               # API routes
├── components/
│   ├── ui/                # Radix primitives (LOCKED)
│   ├── landing/           # Landing sections
│   ├── dashboard/         # Dashboard components
│   └── docs/              # Docs components & templates
├── lib/
│   ├── auth.ts            # NextAuth config
│   ├── db/                # Prisma client
│   └── env.ts             # Environment validation
├── config.js              # Central configuration
└── globals.css            # Design system CSS
```

### Critical Files

- **`src/config.js`** - Central configuration (update first when adding features)
- **`src/lib/env.ts`** - Environment validation with Zod
- **`src/lib/auth.ts`** - NextAuth v5 with JWT sessions (30-day)
- **`DESIGN_SYSTEM.md`** - Complete design system specification
- **`.claude/audit/`** - 58 modular audit files (see Resources)
- **`.husky/pre-commit`** - Git hook entry point
- **`scripts/utilities/pre-commit-audit.mjs`** - Design system pattern checker

---

## Design System Quick Reference

> Full documentation: `DESIGN_SYSTEM.md`

### Terminal Aesthetic

1. **Sharp edges** - `rounded-none` on all elements
2. **Monospace** - `font-mono` for all UI text
3. **Command-line feel** - Brackets, prefixes, uppercase

### Allowed Colors

```tsx
// Backgrounds
bg-background, bg-card, bg-muted, bg-primary, bg-secondary, bg-destructive

// Text
text-foreground, text-muted-foreground, text-primary, text-destructive, text-success, text-warning

// Borders
border-border, border-primary

// BANNED
bg-white, bg-gray-*, text-gray-*, #hexvalues
```

### Button Format

```tsx
// CORRECT
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>

// WRONG
<Button>Submit</Button>
```

### Label Format

```tsx
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>
```

### Card Header

```tsx
<div className="border border-border bg-card">
  <div className="border-b border-border px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">
      [ [0x00] SECTION_TITLE ]
    </span>
  </div>
  <div className="p-4">{content}</div>
</div>
```

### Spacing (8-Point Grid)

| Size | Value | Classes |
|------|-------|---------|
| xs | 4px | `p-1`, `gap-1` |
| sm | 8px | `p-2`, `gap-2` |
| md | 16px | `p-4`, `gap-4` |
| lg | 24px | `p-6`, `gap-6` |
| xl | 32px | `p-8`, `gap-8` |

---

## Documentation Templates

**ALL docs pages in `src/app/docs/` MUST use a template.**

| Template | Use For |
|----------|---------|
| `ComponentShowcaseTemplate` | `/docs/components/*` |
| `FeatureGuideTemplate` | `/docs/features/*`, `/docs/security/*` |
| `TutorialTemplate` | `/docs/tutorials/*` |
| `GettingStartedTemplate` | `/docs/getting-started/*` |

### Component Documentation Example

```tsx
import { ComponentShowcaseTemplate } from "@/components/docs";
import { Button } from "@/components/ui/button";

export default function ButtonPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.01]"
      title="Button"
      description="Interactive button component"
      importCode={`import { Button } from "@/components/ui/button"`}
      mainPreview={{
        preview: <Button>> CLICK_ME</Button>,  // Direct component, NO wrapper
        code: `<Button>> CLICK_ME</Button>`,
      }}
      props={[
        { name: "variant", type: "string", default: '"default"', description: "Visual style" },
      ]}
      previous={{ title: "Badge", href: "/docs/components/badge" }}
      next={{ title: "Card", href: "/docs/components/card" }}
    />
  );
}
```

### DocsCard Title Requirement

```tsx
// CORRECT
<DocsCard title="SECTION_NAME">Content</DocsCard>

// WRONG - missing terminal header
<DocsCard>Content</DocsCard>
```

---

## Key Patterns

### Environment Variables

```typescript
import { env } from '@/lib/env';

// GOOD
const key = env.server.POLAR_ACCESS_TOKEN;

// BAD
const key = process.env.POLAR_ACCESS_TOKEN;
```

### Protected Routes

```typescript
const session = await auth();
if (!session?.user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

### API Routes

```typescript
try {
  return NextResponse.json({ data }, { status: 200 });
} catch (error) {
  console.error("Description:", error);
  return NextResponse.json({ error: "Message" }, { status: 500 });
}
```

### Animation (Framer Motion)

```typescript
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
```

---

## Payment Flow (Polar.sh)

1. Create checkout session via `/api/polar/checkout`
2. User pays on Polar hosted checkout
3. Webhook triggers at `/api/webhooks/polar`
4. Payment record created, welcome email queued

---

## Pre-Commit Hooks (Automatic)

Git commits automatically run these checks via **Husky + lint-staged**:

| Check | Blocks Commit? |
|-------|----------------|
| TypeScript (`tsc --noEmit`) | ✅ |
| ESLint + auto-fix | ✅ |
| Prettier formatting | ✅ |
| `console.log` statements | ✅ |
| `target="_blank"` without noopener | ✅ |
| `rounded-sm/md/lg/xl` (use `rounded-none`) | ✅ |
| `shadow-md/lg/xl` (use `shadow-sm`) | ✅ |
| `bg/text-white/black` (use tokens) | ✅ |
| `process.env` direct access | ✅ |
| Missing `aria-label` on icon buttons | ⚠️ Warning |
| `<img>` without `alt` | ⚠️ Warning |

**Bypass (emergency only):** `git commit --no-verify`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev` (auto-kills) |
| Prisma out of sync | `npm run db:push` |
| Hardcoded colors | `npm run scan:hex` |
| Env validation errors | Check `.env.local`, see `/docs/ENV-VALIDATION.md` |

---

## Dual Repo Architecture

This project uses a **two-repo model** to separate the product (boilerplate) from the marketing site.

### Repos

| Repo | Purpose | URL |
|------|---------|-----|
| `Fabrk_plate` | Development repo (you are here) | Private |
| `fabrk-official` | Customer-facing boilerplate | https://github.com/Theft-SUDO/fabrk-official |

### What Goes Where

**Boilerplate (syncs to official):**
- `src/components/ui/*` - Base UI components
- `src/app/templates/*` - Template library
- `src/app/(dashboard)/*` - Dashboard system
- `src/app/docs/*` - Documentation
- `src/app/api/*` - API routes
- `src/lib/*` - Libraries
- Config files, prisma, public assets

**Marketing (stays private):**
- `src/app/page.tsx` - Your landing page
- `src/app/about/*`, `contact/*`, `features/*`, `pricing/*`, `purchase/*`, `success/*`
- `src/components/landing/*` - Your landing components
- `src/components/home/*`, `marketing/*`
- `/marketing/*` - Launch assets
- `.claude/*`, `.internal/*` - Internal docs

### Sync Workflow

```bash
# After making boilerplate changes:
./scripts/sync-to-official.sh

# Then in official repo:
cd ../fabrk-official
git add -A && git commit -m "Sync updates"
git push
```

The sync script (`scripts/sync-to-official.sh`):
1. Excludes all marketing/private files
2. Copies boilerplate placeholder landing page
3. Creates empty `src/components/landing/` for customers

### Adding Boilerplate vs Marketing Files

When creating new files, ask:
- **Is this for customers?** → Goes to boilerplate, will sync
- **Is this for YOUR Fabrk marketing?** → Add to exclude list in sync script

To exclude new marketing files, edit `scripts/sync-to-official.sh`:
```bash
EXCLUDE_PATTERNS=(
    # ... existing patterns
    "src/app/your-new-marketing-page/"
)
```

---

## Philosophy

1. **Simplicity** - Clean, understandable code
2. **Pragmatism** - No over-engineering
3. **Ship-first** - Production-ready from day one

When adding features: "Does this help ship faster?" If no, delete it.

---

## Resources

### Design System
- `DESIGN_SYSTEM.md` - Complete design system specification
- `src/app/globals.css` - CSS variables and utilities
- `/docs/components/overview` - Component documentation

### Audit Framework (58 files in `.claude/audit/`)

| Category | Files | Coverage |
|----------|-------|----------|
| **Core** | `README.md`, `protocol.md`, `rules.md`, `files.md`, `output.md` | Entry points |
| **Patterns** | `patterns.md`, `patterns-critical.md`, `patterns-medium.md` | Regex for violations |
| **Accessibility** | `accessibility.md`, `a11y-*.md` (4 files) | WCAG 2.1 AA |
| **Colors** | `colors.md`, `colors-*.md` | Design tokens, contrast |
| **Typography** | `typography.md`, `typography-*.md` | Font scale, patterns |
| **Spacing** | `spacing.md`, `spacing-*.md` | 8-point grid |
| **Components** | `components.md`, `components-*.md` (5 files) | Forms, buttons, cards, validation, empty states |
| **Animation** | `animation.md`, `animation-*.md` | Framer Motion, CSS |
| **Responsive** | `responsive.md`, `responsive-*.md` | Mobile-first, breakpoints |
| **Enterprise** | `enterprise.md`, `enterprise-*.md` | Error boundaries, data fetching |
| **Extended** | `seo-metadata.md`, `react-patterns.md`, `nextjs-patterns.md`, `performance-metrics.md`, `testing-coverage.md`, `component-api.md`, `browser-compatibility.md` | SEO, React, Next.js, Core Web Vitals |

**Run audit:** Say "run audit" or see `.claude/audit/README.md`
