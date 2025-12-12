# Fabrk - AI Context (Gemini) - Development Version

**Note:** This is the DEVELOPMENT version with sync workflow. Customer-facing version is in root: `GEMINI.md`.

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

```tsx
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

// GOOD
<Button className={cn(mode.radius, mode.font, "text-xs")}>
  > SUBMIT
</Button>

// BAD - will fail pre-commit checks
<Button className="rounded-lg bg-purple-500 text-white">
  Submit
</Button>
```

### 3. Component Architecture
*   **Templates:** All pages in `src/app/templates/` must use the Preview/Code tabbed interface pattern.
*   **Docs:** All documentation pages in `src/app/docs/` must use standard templates (`ComponentShowcaseTemplate`, `FeatureGuideTemplate`, etc.).
*   **DocsCard:** Must always include a `title` prop to render the terminal header `[ [0x00] TITLE ]`.

## Architecture & Directory Structure

### Key Directories
*   **`src/app/`**: App Router pages.
    *   `(platform)/`: Protected app routes (dashboard, settings, billing).
    *   `(auth)/`: Authentication pages (login, register, forgot-password).
    *   `templates/`: Copy-pasteable boilerplate templates.
    *   `docs/`: Documentation site.
    *   `api/`: API routes for backend logic.
*   **`src/components/`**:
    *   `ui/`: Locked Radix UI primitives (button, input, card, etc.).
    *   `dashboard/`: App-specific components.
    *   `shared/`: Reusable components across the app.
*   **`src/lib/`**: Core logic (Auth, DB, Env validation, utilities).
*   **`prisma/`**: Database schema and seed scripts.

## Dual Repo Architecture

### Quick Reference
| Repo | Purpose |
|---------|---------|
| fabrk_plate (this repo) | Development + Marketing |
| fabrk-official | Customer-facing boilerplate |

### What Syncs to Official
- Core boilerplate: `src/app/(platform)/*`, `(auth)/*`, `api/*`
- UI components: `src/components/ui/*`, `dashboard/*`, `shared/*`
- Documentation: `src/app/docs/*`, `library/*`
- Libraries: `src/lib/*` (test files excluded automatically)
- Configs, prisma, public assets

### What Stays Private
- Marketing: `src/app/(marketing)/*`, `src/app/page.tsx`
- Marketing components: `src/components/landing/*`, `marketing/*`, `home/*`
- Internal tools: `.internal/*`, `.claude/*`
- This file

### Sync Workflow
```bash
# After boilerplate changes:
./scripts/sync-to-official.sh

# Then push official repo:
cd ../fabrk-official
git add -A && git commit -m "Sync updates"
git push
```

---

## Key Commands

### Development
*   `npm run dev`: Start development server (auto-handles port conflicts).
*   `npm run build`: Build for production.
*   `npm run type-check`: Run TypeScript compiler validation.

### Database
*   `npm run db:push`: Push schema changes to the database.
*   `npm run db:seed`: Seed the database with test data.
*   `npm run db:reset`: Reset database and re-seed.
*   `npm run db:studio`: Open Prisma Studio (database GUI).

### Testing & Quality
*   `npm test`: Run unit tests (Vitest).
*   `npm run test:e2e`: Run E2E tests (Playwright).
*   `npm run lint`: Run ESLint with auto-fix.
*   `npm run scan:hex`: **CRITICAL** - Scan for banned hardcoded hex colors.

## Common Patterns

### Environment Variables
**Never** use `process.env` directly. Use the validated env helper:

```ts
import { env } from "@/lib/env";

// GOOD
const key = env.server.DATABASE_URL;
const publicKey = env.client.NEXT_PUBLIC_APP_URL;

// BAD - will fail pre-commit
const key = process.env.DATABASE_URL;
```

### Protected API Routes
```ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Your protected logic here
  return NextResponse.json({ data: "..." });
}
```

### Component Pattern
```tsx
"use client"; // Only when client interactivity needed

import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  onAction?: () => void;
}

export function ExampleComponent({ title, onAction }: Props) {
  return (
    <div className={cn("border border-border bg-card p-4", mode.radius)}>
      <span className={cn("text-xs text-muted-foreground", mode.font)}>
        [ {title} ]
      </span>
      {onAction && (
        <button
          onClick={onAction}
          className={cn(mode.radius, mode.font, "mt-2 text-xs")}
        >
          > ACTION
        </button>
      )}
    </div>
  );
}
```

## Pre-Commit Hooks

Git commits automatically run these checks:
- TypeScript compilation (`tsc --noEmit`)
- ESLint with auto-fix
- Prettier formatting
- Design system audit (no hardcoded colors, no `console.log`, etc.)

**Bypass (emergency only):** `git commit --no-verify`

## For More Details

See `CLAUDE.md` for comprehensive documentation including:
- Complete architecture overview
- Design system specifications
- Template patterns for docs/templates pages
- Troubleshooting guide
