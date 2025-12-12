# Full UI & Design System Audit

## Executive Summary
Fabrk_plate runs on Next.js 15 (App Router) with npm, Tailwind CSS, Radix primitives, Framer Motion accents, and a bespoke “Neo-Brutalism” theme defined both as CSS variables (globals.css) and a separate `tokens.ts`. Tailwind is the dominant styling layer, but large pockets of inline styles, unused legacy CSS, and duplicate primitives (toasts, `cn`) dilute consistency. Migration to shadcn/ui + Tailwind should prioritize collapsing token sources, aligning all primitives under `src/components/ui`, and slicing oversized page routes into composable sections before swapping components.

**Detected systems**: Tailwind + plugins, global CSS variables, plain CSS files (`src/styles/*`), inline React styles, class-variance-authority/tailwind-merge helpers, Radix UI wrappers, Framer Motion, TanStack Table, Next Themes, Sonner + Radix toasts, Lucide icons.

### Estimated effort by area
| Area | Scope | Effort |
| --- | --- | --- |
| Token platform | Merge globals.css, tailwind.config, tokens.ts into one map feeding CSS vars + TS exports | Medium |
| Primitive library | Bring Button/Input/etc. in line with shadcn generators, remove duplicate cn/toast utilities | Medium |
| Marketing surfaces | Landing, variations, templates, hero/feature sections with heavy motion + inline colors | Large |
| Dashboard/admin | Metrics, tables, templates pages exceeding 330–430 LOC with inline charts | Large |
| Foundation (legal/auth) | Mostly semantic content, few custom styles besides hex colors | Small |

## Heatmap – Migration Difficulty
| Area | Representative routes/modules | Difficulty | Drivers |
| --- | --- | --- | --- |
| Marketing Home & sections | `src/app/page.tsx`, `src/components/home/*` | High | Framer Motion without reduced-motion, inline gradients, bespoke CTA buttons |
| Templates & variations gallery | `src/app/templates/*`, `src/app/variations/*` | High | Large files, chart inline styles, duplicated hero components |
| Dashboard core | `src/app/(dashboard)/dashboard/page.tsx`, `src/components/dashboard/*` | Medium-High | Inline progress math, TanStack tables without semantic wrappers |
| Admin & examples | `src/app/(dashboard)/admin/*`, `src/app/(dashboard)/examples/*` | Medium | Shared primitives but no tokenized status colors, repeated cards |
| Auth stack | `src/app/(auth)/*`, `src/components/auth/*` | Medium | Hard-coded palette + duplicated form layouts |
| Legal/comms | `src/app/legal/*`, `src/app/not-found.tsx`, `src/app/error.tsx` | Low | Mostly typography + a few hex colors |

## Top 10 Blockers & Fix Paths
1. **Token drift across three sources** (`src/app/globals.css`, `tailwind.config.ts`, `src/lib/design-system/tokens.ts`): unify with generated tokens → Tailwind theme → CSS vars, then import into TS.
2. **Hard-coded hex colors on fallback/auth pages** (`src/app/not-found.tsx`, `src/app/error.tsx`): replace with semantic Tailwind classes and tokens after convergence.
3. **Dead hero/code CSS with `!important` everywhere** (`src/styles/hero-code-block.css`, `src/styles/code-block.css`): either delete or port into Tailwind plugins to avoid regressions.
4. **Inline layout + motion styles** (dashboard progress bar line 286, analytics template line 156, hero video line 50, tech stack mask line 38, progress component line 21): move to utility classes or CSS vars so shadcn variants can compose them.
5. **Duplicate toast ecosystems + duplicate `cn` helper** (`src/components/ui/toast.tsx` vs `src/components/Toast.tsx`; `src/lib/utils.ts` vs `src/lib/design-system/utils.ts`): pick the shadcn/Radix version and expose one `cn` module.
6. **Oversized marketing/dashboard pages (≥330–520 LOC)** (`src/app/whats-included/page.tsx`, `features/page.tsx`, `components/page.tsx`, `(dashboard)/dashboard/page.tsx`, `templates/analytics-dashboard/page.tsx`): refactor into sectional components before swapping primitives.
7. **Missing primitives requested by shadcn/ui** (Tooltip, ScrollArea, Skeleton): add generators now to prevent ad-hoc implementations later.
8. **Navigation duplication** (`src/components/navigation.tsx`, `src/components/landing/navigation.tsx`, `src/components/showcase/showcase-nav.tsx`): consolidate around a single nav primitive with slots for marketing vs app shells.
9. **TanStack table wrappers lack captions/aria attributes** (`src/components/ui/data-table/*`): wrap in shadcn Table primitives, add `<caption>` and `aria-sort` to headers.
10. **Multiple motion-heavy sections ignore reduced-motion** (`src/components/home/*.tsx`): gate Framer Motion animations with `useReducedMotion` and tokenized durations before re-skinning.

## Proposed JAR-sized PR Plan
1. **JAR-01 Token Convergence** (Effort M)
   - Scope: consolidate tokens into one JSON/TS map, emit CSS vars + Tailwind theme.
   - Acceptance: globals.css only references generated vars; no stray hex values.
2. **JAR-02 Primitive Source of Truth** (Effort M, depends on JAR-01)
   - Scope: regenerate shadcn primitives, remove duplicate `cn` + custom toast, expose consistent props.
   - Acceptance: `/components/ui` exports match shadcn signatures; toast + cn have single entry point.
3. **JAR-03 Marketing Surface Lift** (Effort L, depends on JAR-02)
   - Scope: break landing/variation/templates into reusable sections, replace inline/motion styles, add reduced-motion hooks.
   - Acceptance: no lint suppressions for inline styles; section components consume shared tokens.
4. **JAR-04 Dashboard Modularization** (Effort L, depends on JAR-02)
   - Scope: slice dashboard/admin/templates into feature modules, wrap TanStack tables with semantic helpers, move progress math into hooks + CSS vars.
   - Acceptance: no dashboard page exceeds 200 LOC; charts/progress use utility classes; tables expose captions + aria-sort.

## Additional Observations
- **Monorepo**: single package; pnpm scripts absent, so npm lockfile is source of truth.
- **Import aliases**: `@/*` plus scoped folders for components/lib/hooks—mostly respected, minimal deep relative paths.
- **Tailwind state**: `darkMode: ["class"]`, plugins `tailwindcss-animate` + `@tailwindcss/typography`, content scanning limited to `./src/**/*`; ensure any new packages (e.g., emails) get added.
- **A11y gaps**: Table lacks caption/scope, nav components omit `<nav role="navigation">` landmarks, progress bars miss `aria-valuenow`, motion lacks reduced-motion, and many form fields rely on implicit labels.
- **Performance**: Global CSS is ~4 KB, but unused hero/code CSS inflates build time and `framer-motion` is bundled on most marketing routes.

### ASCII UI dependency graph
```
Tailwind config ─┐
                ├─ globals.css (CSS vars) ──> components/ui primitives ──> pages & layouts
Tokens.ts  ─────┘                          ╲
                                             ╲
Radix UI packages ──> shadcn wrappers ────────╋─> Dashboard/Admin routes
Framer Motion ─> marketing sections ─────────╋─> Landing/Variations
Sonner + custom Toast ───────┐               ║
                             └─> Notification surfaces (duplicate with Radix toast)
```

### Component coverage snapshot
- 22 primitives audited (Button → Navigation) with ≥95% of UI files represented; missing Tooltip, ScrollArea, Skeleton flagged for creation.
- Detailed matrix: `logs/system/trace/ui_component_matrix.csv`.

### Data exports
- Findings CSV: `logs/system/trace/ui_findings.csv`
- Machine JSON: `logs/system/trace/ui_audit.json`
- Dependency snapshot: `logs/system/trace/ui_dependencies.json`
- Token proposal: `logs/system/trace/ui_token_map_proposal.json`
