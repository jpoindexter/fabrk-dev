# Design System Audit Prompt v6.0
## Zero-Tolerance Compliance Check

> **Related Documentation:**
> - `DESIGN_SYSTEM.md` - Formal design system specification
> - `CLAUDE.md` - Quick reference for Claude Code

---

# PART 1: QUICK SEARCH PATTERNS

Use these regex patterns to find violations:

```bash
# Rounded corners (banned except traffic dots)
rounded-(?:sm|lg|xl|2xl|3xl|\[)

# Hardcoded colors
#[0-9a-fA-F]{3,8}
rgb\(|rgba\(|hsl\(|hsla\(
(bg|text|border)-(red|blue|green|yellow|purple|pink|orange|gray|slate|zinc)-\d+

# Missing terminal styling
<Button(?![^>]*rounded-none)
<Input(?![^>]*rounded-none)
<Card(?![^>]*rounded-none)

# Native elements (should use UI components)
<button(?!\s+type=)
<input(?!\s+type=\"hidden)
<select\s+

# Code quality
console\.(log|warn|error|info|debug)
//\s*(TODO|FIXME|HACK|XXX)
@ts-ignore|@ts-expect-error
process\.env\.(?!NODE_ENV)
style=\{

# Banned shadows
shadow-(?:md|lg|xl|2xl)
```

---

# PART 2: PRE-AUDIT CHECKLIST

Before starting, verify:
- [ ] `npm run dev` - Dev server runs without errors
- [ ] `npm run type-check` - TypeScript passes
- [ ] `npm run lint` - ESLint passes
- [ ] `npm run scan:hex` - No hardcoded colors
- [ ] `npm run build` - Build succeeds
- [ ] `npm test` - Tests pass
- [ ] `git status` - Branch is clean
- [ ] Note git SHA for rollback

**If any fail, STOP and report the failure first.**

---

# PART 3: AUDIT RULES

## 3.1 File Size Limits

| Lines | Severity | Action |
|-------|----------|--------|
| 400+ | CRITICAL | MUST split immediately |
| 300-399 | HIGH | MUST split |
| 200-299 | MEDIUM | Review for split |
| 150-199 | LOW | Monitor |

## 3.2 Terminal Design System

**Full specification in `DESIGN_SYSTEM.md`. Key checks:**

### Shape & Corners
- `rounded-none` on ALL elements
- EXCEPTION: Traffic light dots (`rounded-full`)
- EXCEPTION: CTA buttons (`primaryCta`, `secondaryCta`, `ghostOnDark`)

### Button Format
```tsx
// REQUIRED: > PREFIX + UPPERCASE + UNDERSCORES
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>
```

### Label Format
```tsx
// REQUIRED: Bracket notation
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>
```

### Color Tokens
- ONLY use design tokens from `globals.css`
- BANNED: `#hex`, `rgb()`, `hsl()`, `bg-gray-*`, `text-purple-*`, etc.
- See `DESIGN_SYSTEM.md` for full token list

### Shadows
- ALLOWED: `shadow-sm`, `shadow-[4px_4px_0px_0px_var(--border)]`
- BANNED: `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`

## 3.3 Component Patterns

### The `cn()` Utility
```tsx
// REQUIRED for all className merging
import { cn } from "@/lib/utils";
<div className={cn("base-classes", className, { "opacity-50": disabled })} />

// BANNED
<div className={`base ${className}`} />  // String concatenation
```

### forwardRef Components
```tsx
// REQUIRED: displayName for all forwardRef components
const Component = React.forwardRef<HTMLElement, Props>((props, ref) => { ... });
Component.displayName = "Component";
```

### data-slot Attributes
```tsx
// Required for CSS targeting
<button data-slot="button" />
<input data-slot="input" />
```

## 3.4 React Patterns

### Server vs Client Components
- Default is server component (no directive)
- Add `"use client"` ONLY when using hooks, event handlers, or browser APIs
- NEVER import `prisma` in client components

### suppressHydrationWarning
Required on:
- `<html>`, `<body>` (theme switching)
- `<Tabs>`, `<Accordion>` (Radix hydration)

## 3.5 Code Quality

### Must NOT Contain
- [ ] `console.log/error/warn` (use `logger` instead)
- [ ] `// TODO` / `// FIXME` / `// HACK`
- [ ] `@ts-ignore` without justification
- [ ] `any` type without justification
- [ ] Unused imports/variables
- [ ] Commented-out code blocks (>2 lines)
- [ ] Magic numbers without constants
- [ ] Duplicate component definitions

### Import Order
1. React/Next imports
2. External libraries (alphabetical)
3. Internal UI components (`@/components/ui/`)
4. Internal feature components
5. Utilities & hooks
6. Types (last)

## 3.6 Accessibility (WCAG 2.1 AA)

- [ ] All interactive elements have focus visible indicators
- [ ] Icon-only buttons have `aria-label`
- [ ] Form inputs have associated labels
- [ ] Color contrast meets 4.5:1 for text, 3:1 for UI
- [ ] No `outline-none` without `focus-visible` replacement
- [ ] Logical focus order (tab navigation)

## 3.7 Security

- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] No API keys in client code
- [ ] No `eval()` or `new Function()`
- [ ] Environment variables properly prefixed (`NEXT_PUBLIC_` only for client)
- [ ] Use `env.server.*` not `process.env`

## 3.8 Documentation Pages

**ALL docs pages MUST use templates:**
- `ComponentShowcaseTemplate` for `/docs/components/*`
- `FeatureGuideTemplate` for `/docs/features/*`, `/docs/security/*`
- `TutorialTemplate` for `/docs/tutorials/*`

**DocsCard MUST have `title` prop:**
```tsx
// REQUIRED
<DocsCard title="SECTION_NAME">Content</DocsCard>

// BANNED - missing terminal header
<DocsCard>Content</DocsCard>
```

---

# PART 4: FILES TO AUDIT

## Priority 1: Foundation
```
src/components/ui/*.tsx      # Base UI (LOCKED - check only)
src/app/globals.css          # Design tokens
src/lib/utils.ts             # cn() utility
```

## Priority 2: Configuration
```
src/config.js                # Central config
src/lib/env.ts               # Environment validation
src/lib/auth.ts              # Auth config
```

## Priority 3: Layouts
```
src/app/layout.tsx           # Root layout
src/app/(dashboard)/layout.tsx
src/app/docs/layout.tsx
```

## Priority 4: Public-Facing
```
src/app/page.tsx             # Landing page
src/components/landing/*.tsx
```

## Priority 5: Templates
```
src/app/templates/**/page.tsx
```

## Priority 6: Documentation
```
src/app/docs/**/page.tsx
src/components/docs/*.tsx
```

## Priority 7: Dashboard
```
src/app/(dashboard)/**/page.tsx
src/components/dashboard/*.tsx
```

## Priority 8: Auth & Account
```
src/app/(auth)/**/page.tsx
src/components/auth/*.tsx
src/components/account/*.tsx
```

## Priority 9: API Routes
```
src/app/api/**/*.ts
src/middleware.ts
```

## Priority 10: Error Pages
```
src/app/error.tsx
src/app/not-found.tsx
src/app/loading.tsx
```

---

# PART 5: EXCEPTIONS REGISTRY

| Exception | Where | Reason |
|-----------|-------|--------|
| `rounded-full` | Traffic light dots only | Terminal chrome metaphor |
| `rounded-md` | Base UI variants | Shadcn default (override in usage) |
| `rounded-md` | CTA buttons | Marketing emphasis |
| `text-sm` without mono | Legal pages | Long-form readability |
| `console.error` | Error boundaries | Error reporting |
| `suppressHydrationWarning` | html, body, Tabs, Accordion | Hydration fixes |
| **shadow-md** | **NEVER** | **NO EXCEPTIONS** |
| **Hardcoded colors** | **NEVER** | **NO EXCEPTIONS** |

---

# PART 6: OUTPUT FORMAT

## Issue Format
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ISSUE #001                                         ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ File:     src/components/landing/hero.tsx          ┃
┃ Line:     47-49                                    ┃
┃ Category: STYLING                                  ┃
┃ Severity: CRITICAL                                 ┃
┃ Rule:     No rounded corners                       ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ CURRENT:                                           ┃
┃   <div className="rounded-lg bg-blue-500">         ┃
┃                                                    ┃
┃ REQUIRED:                                          ┃
┃   <div className="rounded-none bg-primary">        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## Summary Tables

**Generate these tables:**
1. File Size Violations
2. Rounded Corner Violations
3. Color Token Violations
4. Typography Violations
5. Base UI Bypasses
6. Accessibility Issues
7. Code Quality Issues
8. Security Issues

## Metrics Dashboard
```
╔════════════════════════════════════════════════════════════════╗
║                    AUDIT COMPLETE - METRICS                     ║
╠════════════════════════════════════════════════════════════════╣
║  FILES                             ISSUES BY SEVERITY           ║
║  Total Scanned:        XXX         Critical:           XX       ║
║  Lines of Code:      X,XXX         High:               XX       ║
║  Compliant:        XX (XX%)        Medium:             XX       ║
║  With Issues:      XX (XX%)        Low:                XX       ║
║                                                                 ║
║  COMPLIANCE SCORE:  XX.X%                                       ║
╚════════════════════════════════════════════════════════════════╝
```

---

# PART 7: EXECUTION PROTOCOL

## Phase 1: Pre-Flight
```bash
npm run dev && npm run type-check && npm run lint && npm run scan:hex && npm run build
git rev-parse HEAD   # Save for rollback
```

## Phase 2: Audit
1. Scan files in priority order (Part 4)
2. Log EVERY issue - no exceptions
3. Generate summary tables
4. Calculate metrics
5. **DO NOT FIX ANYTHING YET**

## Phase 3: Report
Present to user:
- Complete issue list
- Summary tables
- Metrics dashboard
- Recommended fix order

## Phase 4: Await Approval
**STOP.** Do not proceed without user saying:
- "proceed" / "fix all"
- "fix critical only"
- Or specific instructions

## Phase 5: Fix
1. Critical issues first
2. By category to minimize context switching
3. Run `npm run type-check` after each file
4. Run `npm run lint` after each category

## Phase 6: Verify
```bash
npm run type-check && npm run lint && npm run scan:hex && npm run build && npm test
```
Visual check: landing page, templates, mobile viewport

## Phase 7: Commit
```bash
git add -A && git commit -m "Design system audit: Full compliance achieved"
```

## Phase 8: Rollback Plan
```bash
git reset --hard [SAVED_SHA]
```

---

# QUICK REFERENCE

## Terminal Styling Checklist
```tsx
// Every form element
className="rounded-none font-mono text-xs"

// Every label
className="font-mono text-xs"  // Format: [LABEL]:

// Every button
className="rounded-none font-mono text-xs"  // Format: > ACTION

// Every card/dialog/sheet
className="rounded-none"
```

## Common Patterns
```tsx
// Loading button
<Button loading loadingText="> SAVING..." className="rounded-none font-mono text-xs">

// Error message
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>

// Success message
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>

// Helper text
<p className="font-mono text-xs text-muted-foreground">Helper text</p>
```

---

**DO NOT EXECUTE** until user explicitly says:
- "run audit" / "start audit" / "audit now" / "execute"

**VERSION:** 6.0
**REDUCED FROM:** 4057 lines to ~400 lines (90% reduction)
**FOCUSES ON:** Audit rules and execution, not library documentation
