# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fabrk** is a Next.js 15 SaaS boilerplate with 87 production-ready components, Tailwind CSS 4, DaisyUI themes, NextAuth v5, Polar.sh payments, and Prisma ORM.

**Tech Stack:** Next.js 15 (App Router, React 19) • TypeScript strict • NextAuth v5 • Polar.sh • Prisma + PostgreSQL • Resend • Framer Motion • Radix UI + Tailwind CSS 4 + DaisyUI

## Essential Commands

```bash
# Development
npm run dev              # Start dev server (auto-kills port 3000)
npm run build            # Production build
npm run type-check       # TypeScript validation

# Code Quality
npm run lint             # ESLint + hex color scan
npm run scan:hex         # Detect hardcoded colors (must use design tokens)
npm run format           # Prettier format

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed test data
npm run db:reset         # Reset and reseed

# Testing
npm test                 # Vitest unit tests
npm run test:e2e         # Playwright E2E tests
npm run test:all         # Run all tests

# Single test file
npm test -- path/to/file.test.ts
npx playwright test tests/e2e/specific.spec.ts
```

## Critical Rules

### Protected Files - DO NOT MODIFY

**`src/components/ui/*` is LOCKED.** These are base UI components (shadcn/ui vanilla). If modification seems required:
1. STOP and ASK the user
2. SUGGEST alternatives
3. Only proceed if user explicitly says "modify base UI"

```
🔒 LOCKED: src/components/ui/*

✅ OK to modify:
   src/components/landing/*
   src/components/dashboard/*
   src/components/docs/*
   src/app/*
```

### Design System - NO Hardcoded Colors

Use design tokens from `globals.css`, never hex colors:

```tsx
// ✅ GOOD
<Button className="bg-primary text-primary-foreground">

// ❌ BAD (breaks theme switching)
<Button className="bg-purple-500 text-white">
```

Run `npm run scan:hex` to detect violations.

## High-Level Architecture

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
│   ├── (legal)/           # Legal pages
│   ├── templates/         # Copy-paste templates
│   ├── api/               # API routes
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Radix UI primitives (LOCKED)
│   ├── landing/           # Landing sections
│   ├── dashboard/         # Dashboard components
│   └── docs/              # Docs layout components
├── lib/
│   ├── auth.ts            # NextAuth config
│   ├── db/                # Prisma client
│   ├── polar.ts           # Payment utilities
│   ├── env.ts             # Environment validation
│   └── utils/             # General utilities
├── config.js              # Central configuration ⭐
└── globals.css            # Tailwind + DaisyUI themes
```

## Critical Files

### `src/config.js` - Central Configuration
Single source of truth for app settings, pricing, feature flags. **Always update this first** when adding features.

### `src/lib/env.ts` - Environment Validation
All env vars validated with Zod. Use `env.server.*` or `env.client.*` instead of `process.env`:

```typescript
import { env } from '@/lib/env';

// ✅ GOOD
const key = env.server.POLAR_ACCESS_TOKEN;

// ❌ BAD
const key = process.env.POLAR_ACCESS_TOKEN;
```

### `src/lib/auth.ts` - Authentication
NextAuth v5 with JWT sessions (30-day), credentials + Google OAuth.

Protected route pattern:
```typescript
const session = await auth();
if (!session?.user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

## Key Patterns

### Animation (Framer Motion)
```typescript
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
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

### Hydration Safety (Radix UI)
```typescript
<Accordion suppressHydrationWarning>
```

## Documentation Component Props

```tsx
// ✅ CORRECT
<ComponentShowcaseTemplate
  code="[UI.01]"
  title="Button"
  mainPreview={{ preview: <Button>Click</Button>, code: "..." }}
  previous={{ title: "Alert", href: "/docs/components/alert" }}
/>

// ❌ WRONG - don't use 'component' prop or 'previousComponent'
```

## Payment Flow (Polar.sh)

1. Create checkout session via `/api/polar/checkout`
2. User pays on Polar hosted checkout
3. Webhook triggers at `/api/webhooks/polar`
4. Payment record created, welcome email queued

Webhook events: `checkout.created`, `order.created`, `order.paid`, `order.refunded`

## Troubleshooting

### Port 3000 in use
```bash
npm run dev  # Auto-kills existing processes
```

### Prisma out of sync
```bash
npm run db:push
```

### Hardcoded colors
```bash
npm run scan:hex
```

### Environment validation errors
Check error message, add/fix var in `.env.local`. See `/docs/ENV-VALIDATION.md`.

## Design System Rules

### 🔒 ABSOLUTE RULES - NEVER VIOLATE

1. **NEVER modify `src/components/ui/*`** - These are locked base components
2. **NEVER use hardcoded colors** - Always use design tokens
3. **ALWAYS use UI components** - Never raw HTML for buttons, inputs, cards, etc.

### Color Tokens (from globals.css)

```css
/* Use these tokens, NEVER hex values */
--background          /* Page backgrounds */
--foreground          /* Primary text */
--card                /* Card backgrounds */
--card-foreground     /* Card text */
--primary             /* Brand color, CTAs */
--primary-foreground  /* Text on primary */
--secondary           /* Secondary actions */
--muted               /* Subtle backgrounds */
--muted-foreground    /* Secondary text */
--accent              /* Highlights */
--destructive         /* Errors, danger */
--border              /* All borders */
--success             /* Success states */
--warning             /* Warning states */
```

```tsx
// ✅ CORRECT
className="bg-background text-foreground border-border"
className="bg-primary text-primary-foreground"
className="text-muted-foreground hover:text-foreground"

// ❌ WRONG - NEVER DO THIS
className="bg-white text-black border-gray-200"
className="bg-purple-600 text-white"
style={{ color: '#8b5cf6' }}
```

### Component Usage

Always import from `@/components/ui/`:

```tsx
// ✅ CORRECT
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ❌ WRONG - raw HTML
<button className="...">Click</button>
<div className="rounded border p-4">Card</div>
<input className="..." />
```

### Terminal Console Aesthetic (Templates Section)

All templates use this consistent style:

```tsx
// Labels
<span className="font-mono text-xs text-muted-foreground">[LABEL]: VALUE</span>

// Section headers
<div className="font-mono text-xs text-muted-foreground">[SECTION_NAME]:</div>

// Terminal window header (traffic lights)
<div className="flex items-center gap-2 border-b border-border px-4 py-2">
  <div className="flex gap-1.5">
    <div className="size-2 rounded-full bg-destructive/50" />
    <div className="size-2 rounded-full bg-warning/50" />
    <div className="size-2 rounded-full bg-success/50" />
  </div>
  <span className="font-mono text-xs text-muted-foreground">filename.tsx</span>
</div>

// Action text
<span className="font-mono text-xs text-primary">&gt; ACTION_NAME</span>

// Feature lists
<div><span className="text-success">&gt;</span> Feature description</div>
```

### Spacing & Layout Conventions

```tsx
// Standard page container
<div className="container mx-auto max-w-7xl px-6 py-12 space-y-12">

// Card structure
<div className="border border-border bg-card">
  <div className="border-b border-border px-4 py-2">Header</div>
  <div className="p-4">Content</div>
</div>

// Grid layouts
<div className="grid md:grid-cols-2 gap-4">
<div className="grid md:grid-cols-3 gap-6">
```

### Typography

```tsx
// Headings
<h1 className="text-4xl font-bold">           // Page titles
<h2 className="text-lg font-semibold">        // Section titles
<h3 className="font-mono text-xs font-bold">  // Terminal-style headers

// Body text
<p className="font-mono text-sm text-muted-foreground">  // Descriptions
<span className="font-mono text-xs">                     // Labels, metadata
```

### When Creating New Components

1. Check if a similar component exists in `src/components/ui/`
2. If yes, USE IT - don't recreate
3. If no, create in appropriate folder (`landing/`, `dashboard/`, `docs/`)
4. Follow existing patterns in that folder
5. Use design tokens exclusively
6. Run `npm run scan:hex` before committing

## Philosophy

1. **Simplicity** - Clean, understandable code
2. **Pragmatism** - No over-engineering
3. **Ship-first** - Production-ready from day one

When adding features: "Does this help ship faster?" If no, delete it.

---

## 🚨 STRICT DESIGN SYSTEM ENFORCEMENT

**CRITICAL: Read `AUDIT_PROMPT.md` for the complete design system specification.**

Before writing ANY code, internalize these rules. Violations are NOT acceptable.

### Quick Reference - Terminal Design System

#### Shape & Corners
```tsx
// ✅ REQUIRED: rounded-none on ALL elements
<Button className="rounded-none font-mono text-xs">
<Card className="rounded-none">
<Input className="rounded-none">

// ❌ BANNED (except in src/components/ui/)
rounded-sm, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl

// ⚠️ EXCEPTION: Traffic light dots ONLY
<div className="size-2 rounded-full bg-destructive/50" />
```

#### Typography - MUST Use
```tsx
// Page title
<h1 className="text-4xl font-semibold tracking-tight">

// Section heading
<h2 className="text-2xl font-semibold tracking-tight">

// Card/form labels - ALWAYS this format
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>

// Body text
<p className="font-mono text-sm">

// Helper/caption text
<span className="font-mono text-xs text-muted-foreground">

// Error text
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>

// Success text
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>
```

#### Button Text Format - MANDATORY
```tsx
// ✅ CORRECT - uppercase, underscores, leading >
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>
<Button className="rounded-none font-mono text-xs">> DELETE_ACCOUNT</Button>

// Loading states
<Button loading className="rounded-none font-mono text-xs">> LOADING...</Button>

// ❌ WRONG
<Button>Submit</Button>
<Button>Save Changes</Button>
```

#### Terminal Card Pattern - USE EVERYWHERE
```tsx
// Single-line header format: [ [0xXX] TITLE ]
<div className="border border-border bg-card">
  <div className="border-b border-border px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">
      [ [0x00] SECTION_TITLE ]
    </span>
  </div>
  <div className="p-4">
    {content}
  </div>
</div>
```

#### Color Tokens - ONLY THESE ALLOWED
```tsx
// Backgrounds
bg-background, bg-card, bg-muted, bg-popover, bg-primary, bg-secondary, bg-accent, bg-destructive

// Foregrounds
text-foreground, text-card-foreground, text-muted-foreground, text-primary-foreground
text-destructive, text-success, text-warning

// Borders
border-border, border-primary, border-destructive

// ❌ BANNED - Will break theme switching
bg-white, bg-black, bg-gray-*, bg-slate-*, bg-purple-*, text-gray-*, border-gray-*
#hexvalues, rgb(), hsl(), oklch() without var()
```

#### Shadows - RESTRICTED
```tsx
// ✅ ALLOWED
shadow-sm
shadow-[4px_4px_0px_0px_var(--border)]  // Terminal hard shadow

// ❌ BANNED
shadow-md, shadow-lg, shadow-xl, shadow-2xl
```

### Documentation Pages Pattern

When creating component documentation (`src/app/docs/components/*/page.tsx`):

```tsx
// ✅ CORRECT - Component renders directly, NO wrapper divs
<ComponentShowcaseTemplate
  code="[UI.XX]"
  title="ComponentName"
  description="Description here"
  importCode={`import { Component } from "@/components/ui/component"`}
  mainPreview={{
    preview: <Component />,  // Direct component, no wrapper!
    code: `<Component />`,
  }}
  variants={[
    {
      title: "Variant Name",
      description: "Description",
      preview: <Component variant="x" />,  // Direct component!
      code: `<Component variant="x" />`,
    },
  ]}
  props={[...]}
  accessibility={[...]}
  previous={{ title: "Prev", href: "/docs/components/prev" }}
  next={{ title: "Next", href: "/docs/components/next" }}
/>

// ❌ WRONG - Extra wrapper divs duplicate DocsPreview styling
mainPreview={{
  preview: (
    <div className="border border-border bg-card p-4">  // NO!
      <Component />
    </div>
  ),
}}
```

### Before Committing Checklist

```bash
# Run these before EVERY commit
npm run type-check      # TypeScript
npm run lint            # ESLint
npm run scan:hex        # No hardcoded colors

# Manually verify
- [ ] All buttons use "> ACTION_NAME" format
- [ ] All elements use rounded-none (except traffic dots)
- [ ] All colors use design tokens
- [ ] All cards use terminal pattern with single-line header
- [ ] No duplicate wrapper divs in documentation previews
```

### Regex Patterns to Search for Violations

```bash
# Find banned rounded corners
grep -r "rounded-\(sm\|lg\|xl\|2xl\|3xl\)" src/app src/components --include="*.tsx"

# Find hardcoded colors
grep -r "#[0-9a-fA-F]\{3,8\}" src/ --include="*.tsx"
grep -r "bg-\(gray\|slate\|purple\|blue\|red\)-" src/ --include="*.tsx"

# Find raw HTML elements
grep -r "<button " src/app src/components/landing src/components/dashboard --include="*.tsx"
grep -r "<input " src/app src/components/landing src/components/dashboard --include="*.tsx"
```

**Full specification: See `AUDIT_PROMPT.md` for complete rules on all patterns.**
