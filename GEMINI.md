# Fabrk (Fabrk_plate) - AI Context

## Project Overview

**Fabrk** is a premium, enterprise-grade Next.js 15 SaaS boilerplate designed with a "Terminal-first" aesthetic. It features a comprehensive suite of production-ready components, templates, and full-stack integrations.

*   **Framework:** Next.js 15 (App Router, Server Components)
*   **Language:** TypeScript 5 (Strict Mode)
*   **Styling:** Tailwind CSS 4 + Radix UI + DaisyUI (20 themes)
*   **Database:** PostgreSQL + Prisma ORM
*   **Auth:** NextAuth v5 (Credentials + OAuth)
*   **Payments:** Stripe
*   **Email:** Resend
*   **Testing:** Vitest (Unit) + Playwright (E2E)

## Critical Development Rules

### 1. Terminal Aesthetic Enforcement
*   **Sharp Edges:** ALL UI elements must use `rounded-none`.
*   **Typography:** ALL UI text must use `font-mono`.
*   **Style:** Adhere to the "command-line" feel (brackets `[ ]`, prefixes `>`, uppercase headers).

### 2. Strict Design Tokens (No Hardcoded Colors)
*   **NEVER** use hardcoded hex values (e.g., `#ffffff`) or standard Tailwind color scales (e.g., `bg-blue-500`).
*   **ALWAYS** use semantic design tokens from `globals.css`:
    *   Backgrounds: `bg-background`, `bg-card`, `bg-muted`, `bg-primary`
    *   Text: `text-foreground`, `text-muted-foreground`, `text-primary`, `text-destructive`
    *   Borders: `border-border`, `border-primary`
*   **Import:** Use the `mode` object from `@/design-system` for consistent styling classes (e.g., `mode.radius`, `mode.font`).

### 3. Component Architecture
*   **Templates:** All pages in `src/app/templates/` must use the Preview/Code tabbed interface pattern.
*   **Docs:** All documentation pages in `src/app/docs/` must use standard templates (`ComponentShowcaseTemplate`, `FeatureGuideTemplate`, etc.).
*   **DocsCard:** Must always include a `title` prop to render the terminal header `[ [0x00] TITLE ]`.

## Architecture & Directory Structure

This project uses a **Dual Repo** model:
1.  **`Fabrk_plate` (Current):** Internal development repo containing both boilerplate code AND private marketing assets.
2.  **`fabrk-official`:** Customer-facing boilerplate (synced via `scripts/sync-to-official.sh`).

### Key Directories
*   **`src/app/`**: App Router pages.
    *   `(dashboard)/`: Protected app routes.
    *   `templates/`: Copy-pasteable boilerplate templates.
    *   `docs/`: Documentation site.
*   **`src/components/`**:
    *   `ui/`: Locked Radix UI primitives.
    *   `landing/`: Marketing components (private).
    *   `dashboard/`: App components.
*   **`src/lib/`**: Core logic (Auth, DB, Env validation).
*   **`prisma/`**: Database schema and seed scripts.
*   **`scripts/`**: Utility scripts (sync, audit, setup).

## Key Commands

### Development
*   `npm run dev`: Start development server (auto-handles port conflicts).
*   `npm run build`: Build for production.
*   `npm run type-check`: Run TypeScript compiler validation.

### Database
*   `npm run db:push`: Push schema changes to the database.
*   `npm run db:seed`: Seed the database with test data.
*   `npm run db:reset`: Reset database and re-seed.

### Testing & Quality
*   `npm test`: Run unit tests (Vitest).
*   `npm run test:e2e`: Run E2E tests (Playwright).
*   `npm run lint`: Run ESLint.
*   `npm run scan:hex`: **CRITICAL** - Scan for banned hardcoded hex colors.
*   `npm run audit:staged`: Run design system audit on staged files.

## Common Workflows

*   **Syncing to Official:** Run `./scripts/sync-to-official.sh` to propagate boilerplate changes while excluding private marketing files.
*   **Environment:** use `env.server.KEY` or `env.client.KEY` from `@/lib/env` instead of `process.env`.