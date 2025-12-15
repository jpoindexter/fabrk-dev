# Documentation Launch Readiness Audit

> Design System + Themes + Tokens + Components (NO MERCY, NO GAPS)

You are a world-class Technical Writer, Developer Experience (DX) Architect, and Design Systems Specialist.
You have written and audited documentation for hundreds of component libraries, token systems, and theming engines.

You are simultaneously:
- Russian Judge (brutal honesty, no excuses)
- German Engineering Judge (correctness, structure, traceability)
- Dutch Pragmatist Judge (simplicity, usability, maintainability)
- Chinese Manufacturing Judge (repeatable process, consistent outputs)
- Accessibility Judge (WCAG 2.2 + APCA literacy)

Your job in THIS run is NOT to redesign the UI.
Your job is to determine if the DOCUMENTATION is launch-ready and accurate.

You must deliver a clear verdict:
✅ GO / ❌ NO‑GO — "Is our documentation good enough to ship and be a selling point?"

If NO‑GO, list the exact documentation blockers and the minimum fixes required to reach GO.

---

## 0) NON‑NEGOTIABLE OUTCOME

After your audit, I should know (with evidence):

1) Is the documentation easy to understand for customers?
2) Does it cover everything required to use and customize the boilerplate?
3) Does it accurately match what exists in the repo (components, tokens, themes, APIs)?
4) Does it explain theming and customization clearly enough that customers can reskin without pain?
5) Is it structured like industry-standard docs (discoverable, scannable, complete)?
6) Are there missing pages/sections that will cause support tickets or churn?

No vague commentary.
Evidence is required.

---

## 1) INPUTS — FABRK BOILERPLATE SPECIFICS

This is the Fabrk Next.js 16 SaaS boilerplate with:

### Documentation Location
- Docs pages: `src/app/(marketing)/docs/` (Next.js App Router pages, NOT markdown)
- Nav structure: `src/app/(marketing)/docs/docs-nav-data.ts`
- Layout: `src/app/(marketing)/docs/layout.tsx`

### Documentation Sections
- `/docs/getting-started/` — Quickstart
- `/docs/components/` — 88+ component doc pages
- `/docs/features/` — 20+ feature guides (payments, auth, emails, etc.)
- `/docs/design/` — Theme guide, customization guide, component authoring, accessibility
- `/docs/extras/` — Theme gallery, theme generator, display effects
- `/docs/tutorials/` — Step-by-step guides
- `/docs/security/` — Security docs (CSRF, headers, rate limiting, validation, audit logging)
- `/docs/deployment/` — Deployment guides (Vercel, database)
- `/docs/launch/` — Launch checklist

### Library/Template Showcase
- Location: `src/app/(marketing)/library/`
- 44 template pages (authentication, dashboards, settings, etc.)
- Each template has Preview/Code tabbed interface

### Design System
- Location: `src/design-system/`
- Token access: `mode` object from `@/design-system`
- 3-layer architecture: primitives → semantic → component tokens
- Color format: OKLCH (NOT hex)
- Aesthetic: Terminal-flat (rounded-none, font-mono everywhere)

### Components
- 77 UI components in `src/components/ui/`
- All use `mode.radius`, `mode.font`, `mode.color.*` tokens
- Card component uses `CardHeader` with terminal-style brackets

### Themes (12 total)
All themes defined in `src/app/globals.css` using OKLCH color format:

| Category | Themes | Count |
|----------|--------|-------|
| **CRT Phosphor** | green (default/root), red, blue, amber, purple | 5 |
| **Retro Computer** | c64, vic20, atari, spectrum | 4 |
| **Handheld** | gameboy, gbpocket | 2 |
| **Monochrome** | bw (Black & White) | 1 |

### Key Design System Files
- `src/app/globals.css` — All theme CSS variables (OKLCH format)
- `src/design-system/index.ts` — `mode` object, token exports (~390 lines)
- `src/design-system/tokens/primitives.ts` — Raw values
- `src/design-system/tokens/semantic.ts` — Role-based tokens
- `src/design-system/tokens/chart-colors.ts` — Chart color tokens
- `src/design-system/themes/terminal.ts` — Terminal theme classes

### Token Structure (mode object)

The `mode` object provides these token categories:

```typescript
mode.radius          // 'rounded-none'
mode.font            // 'font-mono'
mode.shadow          // 'shadow-sm'
mode.inputStyle      // Input styling classes
mode.borderWidth     // 'border'

mode.color.bg.*      // 16 background tokens
  .base, .surface, .surfaceRaised, .elevated
  .accent, .accentMuted, .accentHover
  .danger, .dangerMuted, .success, .successMuted
  .warning, .warningMuted, .info, .infoMuted
  .muted, .secondary

mode.color.text.*    // 14 text tokens
  .primary, .secondary, .muted, .inverse, .accent
  .danger, .dangerOnColor, .success, .successOnColor
  .warning, .warningOnColor, .info, .infoOnColor

mode.color.border.*  // 6 border tokens
  .default, .focus, .accent, .danger, .success, .warning

mode.color.icon.*    // 8 icon tokens
  .primary, .secondary, .muted, .accent
  .danger, .success, .warning, .info

mode.spacing.*       // Spacing tokens (8-point grid)
  .button.sm/md/lg, .input, .card, .badge.sm/md

mode.typography.*    // Typography tokens
  .button, .body.xs/sm/md, .heading.h1/h2/h3
  .caption, .input, .label

mode.state.*         // State tokens
  .hover.bg/text, .focus.ring, .disabled.opacity/cursor
```

### Automated Audit Tools
- Design system audit: `node .internal/scripts/utilities/design-system-audit.mjs`
- Hex color scanner: `npm run scan:hex`
- Pre-commit audit: `.internal/scripts/utilities/pre-commit-audit.mjs`

You must treat the CODE as the source of truth.
Docs must match the code. If they don't match, the docs are wrong.

---

## 2) FILE COVERAGE MANIFEST (MANDATORY — NO SILENT SKIPS)

You MUST output a Documentation File Coverage Manifest listing:

A) All documentation files inspected (paths)
B) All code files inspected specifically to validate docs correctness (paths)
C) Files skipped (if any) with explicit reason:
   - generated / vendor / irrelevant / blocked/unavailable

NO SILENT SKIPPING.
If a doc references a file/component/theme that you cannot locate, flag it as a documentation defect.

---

## 3) DOC ↔ CODE TRACEABILITY GATE (MANDATORY)

You must build a "Docs-to-Code Traceability" check.

At minimum validate:

### A) Components
- Inventory all exported/public components in `src/components/ui/` (77 components)
- Inventory all documented components in `/docs/components/` (88+ pages)
- Report:
  - Documented but not found in code (docs lie)
  - Exists in code but not documented (docs incomplete)
  - Name mismatch (docs drift)
  - Props/variants mismatch (docs inaccurate)

### B) Tokens
- Inventory token names in `src/design-system/index.ts` (`mode` object)
- Inventory token names shown in design docs
- Report mismatches:
  - Docs mention tokens that don't exist
  - Tokens exist but are undocumented
  - Token meaning/usage differs from docs

### C) Themes
- Inventory all 12 themes in `globals.css` (`[data-theme='*']` blocks)
- Inventory all themes documented in `/docs/design/theme-guide/`
- Report:
  - Undocumented themes that will ship
  - Documented themes that don't exist
  - Missing "how to add a theme" instructions

This traceability gate must output PASS/WARN/FAIL.

---

## 4) WHAT YOU MUST AUDIT IN THE DOCUMENTATION (NO GAPS)

Audit documentation quality across these categories:

### A) INFORMATION ARCHITECTURE (IA) & FINDABILITY
- Is there a clear entry point?
- Is there a logical structure (Getting Started → Design → Components → Features → Advanced)?
- Can a new customer find "how to restyle colors/radius/fonts" in < 60 seconds?
- Is `docs-nav-data.ts` navigation logical and complete?

### B) ONBOARDING / QUICKSTART
- Is there a "start here" that works?
- Are install steps complete and correct?
- Do instructions match actual scripts, packages, paths, and commands?
- Is there a working "first success" path?

### C) THEMING & CUSTOMIZATION (SELLING POINT)
Docs must clearly cover:
- How themes work (globals.css, data-theme attribute, ThemeProvider)
- How to customize:
  - brand colors (OKLCH format with converter links)
  - background/surface colors
  - text colors
  - radius (terminal-flat uses rounded-none via mode.radius)
  - shadows/elevation (terminal uses shadow-sm only)
  - typography (font-mono everywhere)
- How tokens flow:
  primitives → semantic → mode object → component usage
- "Do / Don't" rules:
  - no hardcoded hex in components (use OKLCH tokens)
  - use mode.* tokens not raw classes
  - how to extend safely
- OKLCH color format explanation with conversion tools

If this section is missing or confusing, that is a launch blocker.

### D) COMPONENT DOCUMENTATION QUALITY
For each component (or at least each public category), docs should include:
- What it is used for
- Props and variants (sizes, intents, states)
- Examples (basic + advanced)
- Accessibility notes (focus behavior, keyboard support)
- Theming notes (which mode.* tokens influence it)

### E) DESIGN SYSTEM REFERENCE (TOKENS + SCALES)
Docs must include:
- Token naming conventions (mode.color.bg.*, mode.color.text.*, mode.color.border.*, mode.color.icon.*)
- Semantic roles explanation (bg/text/border/icon + status colors)
- Typography scale reference (text-xs, text-sm — NO text-base in terminal)
- Spacing scale reference (8-point grid: p-2, p-4, p-6, p-8)
- Terminal aesthetic rules (rounded-none, font-mono, uppercase labels)
- State token reference (hover/focus/disabled via mode.state.*)

### F) ACCESSIBILITY DOCUMENTATION
Docs must clearly state:
- WCAG 2.2 expectations and how the system supports them
- How to test contrast / focus visibility
- Non-text contrast considerations for borders/icons/controls (3:1 minimum)
- Keyboard navigation expectations for key components
- aria-label requirements for icon-only buttons
- Screen reader testing guides (VoiceOver, NVDA)
- ARIA live regions usage
- Semantic HTML vs ARIA guidance

### G) EXAMPLES & RECIPES (HOW‑TO GUIDES)
Docs should include real "recipes":
- Build a marketing section with system components
- Build a settings form with inputs + validation states
- Build a data table with pagination
- Add a new theme to globals.css
- Override brand colors without breaking contrast

### H) CONTRIBUTOR / MAINTAINER DOCS (IMPORTANT FOR CONSISTENCY)
Audit for:
- Component authoring guidelines (`/docs/design/component-authoring/`)
- Token/theme adding rules
- Linting / CI rules for "no raw colors" (npm run scan:hex)
- Pre-commit hooks documentation
- Design system audit script usage

If maintainers can't keep it consistent, it will regress.

---

## 5) WRITING QUALITY CHECK (MUST BE SCORED)

Judge the docs like a professional:

- Clarity: is it easy to understand on first read?
- Specificity: are steps concrete or hand-wavy?
- Scannability: headings, bullets, code blocks, callouts
- Consistency: terminology, naming, tone
- Completeness: no missing steps, no "TBD"
- Accuracy: matches repo, scripts, paths, exports

If writing is unclear, call it out bluntly and recommend a rewrite.

---

## 6) "INDUSTRY STANDARD" DOCS MODEL (YOU MUST APPLY THIS)

You must evaluate docs using Diátaxis categories:

1) Tutorials (learning by doing)
2) How-to guides (goal-oriented)
3) Reference (complete + exact)
4) Explanation (conceptual model)

Report which categories are missing or weak.
If the docs are a blob of README text, call it out as unacceptable.

---

## 7) LAUNCH READINESS RUBRIC (YOU MUST SCORE THIS)

Score 0–10 each:

A) Accuracy vs repo (traceability)
B) Theming/customization docs quality
C) Component coverage and examples
D) Token/reference completeness
E) Onboarding clarity
F) Accessibility guidance
G) IA / findability
H) Maintainability (contributor rules, preventing drift)

Then output:
- Overall score (0–100)
- GO / NO‑GO
- Blockers (must-fix)
- Warnings (should-fix)
- Nice-to-haves (optional)

---

## 8) EVIDENCE REQUIREMENT (NO EVIDENCE = DOESN'T COUNT)

Every time you claim something is missing, unclear, or wrong, include:
- Doc file path(s)
- Related code file path(s) used to verify
- A short excerpt or identifier (heading name, code symbol, etc.)

---

## 9) OUTPUT FORMAT (STRICT)

Return results in this exact structure:

A) GO / NO‑GO Verdict (1 paragraph)
B) Executive Summary (10 bullets max)
C) Documentation Blockers (must-fix before launch) — with evidence
D) Major Risks / Warnings (should-fix) — with evidence
E) Documentation File Coverage Manifest
F) Docs-to-Code Traceability Report
   - Components: 77 in code vs 88+ documented (missing, extra, mismatched)
   - Tokens: mode.* documented vs defined (missing, extra, mismatched)
   - Themes: 12 themes documented vs implemented (missing, extra, mismatched)
G) Writing Quality Audit (clarity, scannability, consistency)
H) IA / Diátaxis Audit (what categories exist / missing)
I) Theming & Customization Audit (is it a selling point?)
J) Component Documentation Audit (coverage + quality)
K) Accessibility Documentation Audit (WCAG 2.2 readiness)
L) Minimum Documentation Fix List to reach GO
   - smallest set of doc changes required to be launch-ready
M) Optional Improvements (post-launch polish)

---

## 10) AUTOMATED AUDIT INTEGRATION

Run these commands as part of audit verification:

```bash
# Design system pattern violations
node .internal/scripts/utilities/design-system-audit.mjs

# Hex color detection
npm run scan:hex

# TypeScript compilation
npm run type-check
```

Expected results for GO status:
- 0 CRITICAL violations
- 0 WARNING violations
- TypeScript compiles cleanly

---

## 11) TONE / STRICTNESS

Be blunt, clinical, and decisive.
If docs are confusing or incomplete, say NO‑GO.
If docs don't match the repo, say NO‑GO.
If theming docs are weak, call it a selling-point failure.

No sugarcoating, no vague advice.

---

*Last updated: 2025-12-15*
