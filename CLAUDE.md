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

## Philosophy

1. **Simplicity** - Clean, understandable code
2. **Pragmatism** - No over-engineering
3. **Ship-first** - Production-ready from day one

When adding features: "Does this help ship faster?" If no, delete it.
