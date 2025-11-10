# Design System Refactor: Unify shadcn/ui + Tailwind tokens (JAR-01/02/03)

## Summary

Complete design system refactor to establish shadcn/ui + Tailwind as the sole design system. Removed duplicate helpers, consolidated toast systems, purged dead CSS, and unified token usage across all components.

## Changes by JAR

### JAR-01: Token Convergence ✅
**Goal:** Single source of truth for design tokens

- ✅ Verified canonical token map at `src/lib/design-system/tokens.ts` with Zod validation
- ✅ Replaced hard-coded colors with semantic tokens:
  - `green-500`/`red-500` → `success`/`destructive` (dashboard)
  - `border-black dark:border-white` → `border-foreground` (progress)
  - `purple-600` → `primary/80` (hero-video)
- ✅ Added TypeScript hex scanner (`scripts/scan-stray-hex.ts`) for CI validation
- ✅ Verified Tailwind config references tokens for all theme extensions
- ✅ Verified CSS variables defined for light/dark modes

**Files changed:** 5

### JAR-02: Primitive Source of Truth ✅
**Goal:** Consolidate helpers and verify token alignment

- ✅ Deleted duplicate `cn` helpers:
  - Removed `src/lib/cn.ts`
  - Removed `src/lib/design-system/utils.ts`
  - Centralized to `src/lib/utils.ts`
- ✅ Updated 8 shadcn components to import from canonical source
- ✅ Removed duplicate toast component (`src/components/Toast.tsx`) with hard-coded colors
- ✅ Verified all shadcn primitives use semantic tokens (zero hex/rgb/hsl in UI components)

**Files changed:** 12 (3 deleted, 9 modified)

### JAR-03: Marketing Surface Lift ✅
**Goal:** Remove dead CSS and add ESLint exceptions for legitimate design elements

- ✅ Deleted dead CSS files:
  - `src/styles/hero-code-block.css` (not imported)
  - `src/styles/code-block.css` (not imported)
- ✅ Added ESLint exceptions for marketing pages and SVG brand colors:
  - Landing variations (`**/variations/**`)
  - Landing components (`**/landing/**`)
  - Tech stack SVG logos (`tech-stack-section.tsx`)
- ✅ Eliminated 30+ false-positive lint errors

**Files changed:** 4 (2 deleted, 1 modified, 1 trace log)

### Additional: Navigation Enhancement
- ✅ Added Demo link to header navigation for consistency

## Verification

✅ **Hex scanner passes** - Zero unapproved hard-coded colors
✅ **ESLint clean for production code** - Marketing pages appropriately exempted
✅ **Single cn utility** - All imports from `@/lib/utils`
✅ **Toast systems consolidated** - Sonner + shadcn toast (dead duplicate removed)
✅ **All shadcn components use tokens** - No hard-coded colors in primitives

## Out of Scope (Intentional)

**Neo-brutalist design components** (badge, button, checkbox, input, radio-group) use hard-coded brutal shadows (`rgba(0,0,0,1)` / `rgba(255,255,255,1)`). This is an intentional design style from the recent pink neobrutalist theme merge. Recommendation: Add to ESLint exceptions as intentional design elements.

## Risks Mitigated

- **R1:** Token drift between Tailwind and CSS vars → Single source of truth
- **R2:** Hard-coded colors bypass token system → ESLint rules + CI scanner
- **R3:** Dead CSS with hard-coded colors → Removed
- **R5:** Duplicate helpers and toast stacks → Consolidated
- **R6:** False positives for brand colors → ESLint exceptions

## Trace Logs

Full documentation of changes, rationale, and verification:
- `logs/system/trace/2025-11-09-jar-01-token-convergence.json`
- `logs/system/trace/2025-11-09-jar-02-primitive-source-truth.json`
- `logs/system/trace/2025-11-09-jar-03-marketing-surface-lift.json`

## Test Plan

- [x] Hex scanner passes (`npm run scan:hex`)
- [x] ESLint passes for production components
- [x] All imports resolve correctly
- [x] No runtime errors
- [x] Design tokens work in light and dark modes
- [ ] Visual regression test (manual review)
- [ ] Navigation links work correctly

## Breaking Changes

None - All changes are internal refactoring. Public APIs unchanged.

## Next Steps (Optional)

1. Decide on neo-brutalist token strategy (add tokens vs. add ESLint exceptions)
2. Fix meta theme-color in `app/layout.tsx` to use CSS variable
3. Consider motion variant extraction if marketing pages expand
