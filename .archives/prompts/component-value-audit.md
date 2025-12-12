# Component Value & Competitor Audit Prompt

> **Version:** 1.1
> **Last Updated:** 2025-12-07
> **Purpose:** Analyze UI component library vs modern SaaS boilerplates & design systems

---

We are in **COMPONENT VALUE & COMPETITOR AUDIT MODE**.

## Goal

Analyze our entire UI component library vs modern SaaS boilerplates & design systems (e.g. shadcn/ui, Vercel SaaS starters, modern dashboard kits), identify:

- What's **core and high-value**
- What's **nice but not worth maintaining right now**
- What's **missing but critical**
- Where we have **weird or low-value experiments**

…then write clear docs so we can ruthlessly focus.

## Permissions

You are allowed to:
- READ any files in the repo
- CREATE / UPDATE docs under `design-system/audit/` and `design-system/spec/`

You are **NOT** allowed to:
- Modify core UI components or app pages in this prompt
- This is an **analysis + documentation pass only**, not a refactor

---

## 0. Grounding

First, re-read (READ ONLY) the design system source of truth.

### Primary Paths (check first):
- `design-system/spec/overview.md`
- `design-system/spec/foundations.md`
- `design-system/spec/tokens.json`
- `design-system/spec/components.md`
- `design-system/spec/themes.md`
- `design-system/themes/*.json`
- `design-system/audit/COMPONENT_VALUE_AUDIT.md` (if exists)
- `design-system/audit/industry-baseline.md` (if exists)
- `design-system/audit/industry-baseline.json` (if exists)

### Fallback Paths (if primary don't exist):
- `DESIGN_SYSTEM.md` (root-level spec)
- `src/app/globals.css` (CSS variables and utilities)
- `src/design-system/index.ts` or `@/design-system` exports (mode object, tokens)

### Purpose:
- Re-align with our **token architecture**, **component naming**, and **theme-agnostic** rules
- Understand the existing **industry-baseline** model we're using

### Remember:
- Names must be **generic**, not theme-specific:
  - ✅ `Card`, `Badge`, `Sidebar`, `DashboardShell`
  - ❌ `TerminalCard`, `NeoSidebar`, `RetroButton`
- Tokens must stay **theme-friendly**: primitives → semantic → component usage

---

## 1. PHASE 1 – COMPONENT INVENTORY (CURRENT LIBRARY)

Scan our current component library, primarily:

- `src/components/ui/**/*.tsx`
- Any high-level layout shells/templates under:
  - `src/components/layout/**/*`
  - `src/app/**/components/**/*` (if they behave like reusable primitives)

You are still **NOT** editing any UI components. Only reading.

### 1.1 Build/Update JSON Inventory

Create or update:
- `design-system/audit/components-inventory.json`
- `design-system/audit/components-inventory.md`

For each component, capture:

```json
{
  "name": "Card",
  "file": "src/components/ui/card.tsx",
  "category": "data_display",
  "type": "primitive",
  "context": "ui",
  "props_complexity": "simple",
  "ds_compliant": true,
  "theme_friendly": true,
  "exported": true,
  "usage_count": 47,
  "depends_on": [],
  "used_by": ["KpiCard", "SettingsCard", "BillingSummaryCard"],
  "notes": "Core data display primitive. Heavily used."
}
```

### Field Definitions

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Component name (PascalCase) |
| `file` | string | Relative path from repo root |
| `category` | enum | `data_display` \| `input` \| `navigation` \| `layout` \| `overlay` \| `feedback` \| `chart` \| `utility` \| `template` \| `other` |
| `type` | enum | `primitive` \| `wrapper` \| `composite` \| `template` \| `experimental` |
| `context` | enum | `ui` (for users) \| `docs` (docs-only) \| `internal` (not exported) |
| `props_complexity` | enum | `simple` (<5 props) \| `moderate` (5-15 props) \| `complex` (>15 props) |
| `ds_compliant` | boolean | Passes design system compliance check (see below) |
| `theme_friendly` | boolean | Uses mode.*, semantic tokens, generic naming |
| `exported` | boolean | Exported from index file (public API) |
| `usage_count` | number | Count of imports across `src/app` + `src/components` |
| `depends_on` | string[] | Components this one imports |
| `used_by` | string[] | Components that import this one |
| `notes` | string | 1-2 lines, human readable |

### DS Compliance Checklist

`ds_compliant = true` if ALL of:
- Uses `mode.font` / `mode.radius` from `@/design-system`
- Uses semantic color tokens (`bg-card`, `text-muted-foreground`, etc.)
- No hardcoded hex colors or raw Tailwind colors (unless eslint-disabled with reason)
- Generic naming (no theme-specific prefixes like `Terminal*`, `Neo*`)
- Follows 8-point spacing grid

### Usage Count Methodology

```bash
# Count imports of ComponentName across src/
grep -r "from.*ComponentName\|import.*ComponentName" src/ --include="*.tsx" | wc -l
```

### Type Definitions

| Type | Definition |
|------|------------|
| `primitive` | Atomic UI element (Button, Input, Badge) |
| `wrapper` | Thin styling wrapper around primitives (CardHeader, CardContent) |
| `composite` | Combines multiple primitives (DataTable = Table + Pagination + Filters) |
| `template` | Full page/section layout (DashboardShell, AuthLayout) |
| `experimental` | Unproven, niche, or incomplete component |

### Rules:
- If `components-inventory.json` already exists, update/extend it instead of overwriting
- In `components-inventory.md`, group components by category with a simple table per group
- Focus only on components, not hooks/utilities

---

## 2. PHASE 2 – INDUSTRY BASELINE (COMPETITOR MENTAL MODEL)

We want a mental model of what serious SaaS boilerplates and popular UI kits usually provide.

### 2.1 Use Existing Baseline If Present

If this file exists:
- `design-system/audit/industry-baseline.json`

Treat it as the canonical baseline. Only extend it if you see obvious missing primitives.

Structure:

```json
{
  "name": "Card",
  "category": "data_display",
  "importance": "critical",
  "found_in": ["shadcn", "vercel_saas", "refine", "chakra"],
  "notes": "Canonical data display primitive."
}
```

### Importance Levels

| Level | Definition |
|-------|------------|
| `critical` | Must-have for any SaaS (Button, Input, Card, Table) |
| `high` | Very valuable for dashboards (Charts, DataTable, Sidebar) |
| `nice_to_have` | Cool but not MVP-critical (Rating, ColorPicker) |
| `niche` | Highly specific UX that doesn't generalize |

### 2.2 Create Baseline If Missing

If `industry-baseline.json` does not exist, create it with ~50-60 components based on:
- shadcn/ui
- Vercel SaaS templates
- Typical dashboard kits (admin + billing + analytics)

Use generic names only.

### 2.3 Optional: Validate Against Live Sources

If WebFetch is available, spot-check these URLs to validate baseline accuracy:
- `https://ui.shadcn.com/docs/components`
- `https://chakra-ui.com/docs/components`

### 2.4 Human-Readable Companion

Ensure there is:
- `design-system/audit/industry-baseline.md`

Summarize baseline families:
- Auth, Navigation, Layout, Forms, Data Display, Feedback, Charts, Templates, etc.

---

## 3. PHASE 3 – COMPARISON: OUR INVENTORY VS BASELINE

Now do the actual "competitors and shit" comparison.

Create/Update:
- `design-system/audit/components-market-value.json`
- `design-system/audit/components-market-value.md`

### 3.1 Map to Baseline

For each of our components (from `components-inventory.json`), add:

```json
{
  "name": "Heatmap",
  "file": "src/components/ui/heatmap.tsx",
  "category": "chart",
  "baseline_match": "experimental",
  "market_value": "nice_to_have",
  "usage_count": 2,
  "theme_friendly": true,
  "ds_compliant": true,
  "status_recommendation": "shelf",
  "rationale": "Niche visualization. Low usage. Not in typical SaaS starters.",
  "notes": "Keep file but remove from main showcase."
}
```

### Field Definitions

| Field | Values | Description |
|-------|--------|-------------|
| `baseline_match` | `direct_match` | Clearly maps to a standard primitive (Badge, Tabs) |
| | `variant_or_specialization` | Opinionated version of known primitive (KpiCard, StatCard) |
| | `experimental` | Not present in typical starter kits |
| `market_value` | `critical` | Must-have for almost any SaaS |
| | `high` | Very valuable for dashboards |
| | `nice_to_have` | Cool but not MVP-critical |
| | `niche` | Highly specific, doesn't generalize |
| `status_recommendation` | `keep` | Keep, but don't over-invest |
| | `keep_invest` | Hero/core components to polish and showcase |
| | `shelf` | Keep file but remove from primary docs/showcase |
| | `remove` | Consider removing if unused and off-strategy |

### 3.2 Market Value MD Summary

In `components-market-value.md`, produce:

**Summary Table:**

| Name | Category | Baseline Match | Market Value | Recommendation |
|------|----------|----------------|--------------|----------------|
| DataTable | data_display | direct_match | critical | keep_invest |
| KpiCard | data_display | variant_or_specialization | high | keep_invest |
| ColorPicker | input | experimental | niche | shelf |
| Heatmap | chart | experimental | nice_to_have | shelf |

**Sections to include:**
- "Top 10 Hero Components" (things to double down on)
- "Shelf / Experimental" (low leverage)
- "Critical Gaps" (things industry baselines have but we don't)

---

## 4. PHASE 4 – PRODUCT STRATEGY (WHAT WE ACTUALLY DO)

Create/Update:
- `design-system/spec/components-product-strategy.md`

### Structure:

```markdown
# Component Product Strategy

## Audit Metadata
- Generated: YYYY-MM-DD
- Component count: XX
- Baseline version: 1.0

## 1. Core Value Proposition

Short paragraph: what this boilerplate wants to be.
(e.g. "A modern, theme-able SaaS starter focused on dashboards, billing, and admin workflows.")

## 2. Hero Component Families (KEEP & INVEST)

List 8-12 component families we should double down on:
- What they're for
- Why they're high-value vs common boilerplates
- How they should be showcased (templates, docs, stories)

## 3. Shelf / Experimental Components (SHELF / REMOVE)

Components that:
- Are rarely used, niche, or distracting from core story
- Should be hidden from main showcase, marked experimental, or removed

### Deprecation Path

For "shelf" components:
1. Add `@deprecated` JSDoc comment
2. Remove from main docs navigation
3. Keep file for existing users
4. Add console.warn on import (optional)

For "remove" components:
1. Verify usage_count is 0
2. Check no external dependencies
3. Remove file
4. Update any index exports

## 4. Critical Gaps (MUST ADD)

From baseline comparison, list missing primitives with:
- Why it matters for SaaS
- How it composes with existing components
- Rough API sketch (props, slots) - theme-agnostic
- Effort estimate (low/medium/high)
- Dependencies

Example:
| Gap | Importance | Effort | Dependencies | Est. LOC |
|-----|------------|--------|--------------|----------|
| DashboardShell | critical | medium | Sidebar, TopBar | ~200 |
| AuthLayout | critical | low | Card, Button | ~150 |
| LineChart | high | medium | Recharts | ~250 |

## 5. Roadmap (Short)

- Phase 1: Clean up showcase to highlight hero components
- Phase 2: Implement missing critical primitives
- Phase 3: Shelf/hide experimental components
- Phase 4: Deepen docs & templates around real SaaS flows

## 6. Success Metrics

For hero components:
- [ ] Docs page exists with live preview
- [ ] At least 3 usage examples
- [ ] Appears in at least 1 template
- [ ] Has props table documented

For gaps filled:
- [ ] Component passes design system audit
- [ ] Docs page created within 1 week
- [ ] Added to at least 1 template
```

---

## 5. PHASE 5 – EXECUTIVE SUMMARY & DECISION POINT

Create/update:
- `design-system/audit/AUDIT_SUMMARY.md`

### Structure:

```markdown
# Component Value Audit — Executive Summary

## Audit Metadata
- Generated: YYYY-MM-DD
- Auditor: Claude Code
- Component count at audit: XX
- Baseline version: 1.0

## Metrics

| Metric | Count |
|--------|-------|
| Total components | XX |
| Keep (core) | XX |
| Keep & Invest (hero) | XX |
| Shelf (experimental/niche) | XX |
| Remove candidates | XX |
| Missing (critical) | XX |
| Missing (high-value) | XX |

## Hero Components

List 8-12 hero families and why they matter.

## Shelf / Experimental

List shelf components and why they're not core right now.

## Critical Gaps

List top 3-5 missing primitives/layouts.

## Risk Assessment

| Option | Benefit | Risk | Mitigation |
|--------|---------|------|------------|
| A: Refactor showcase | Quick wins, cleaner story | May miss critical gaps | Combine with B |
| B: Add missing primitives | Fills gaps, competitive | Scope creep, time sink | Timebox to top 3 |
| C: Shelf low-value first | Reduces maintenance | Users may need shelved items | Keep files, hide from docs |

## Recommendation

### Option A: Refactor Showcase
- Focus on hero components first
- Quick wins, cleaner marketing story

### Option B: Add Missing Primitives
- Fill critical gaps (DashboardShell, AuthLayout, Charts)
- More competitive with other boilerplates

### Option C: Shelf Low-Value First
- Reduce maintenance burden
- Clean up before adding more

### Suggested Next Step

Pick **one** of A, B, or C as the recommended next move.
Explain why in 3-5 sentences based on the analysis.
```

---

## 6. Non-Negotiable Rules

- ❌ Do NOT modify component implementations or design tokens
- ✅ You MAY create/update docs under:
  - `design-system/audit/*`
  - `design-system/spec/components-product-strategy.md`
- ✅ Keep all naming **generic and theme-agnostic** for easy reskinning
- ✅ Assume core DS compliance is already audited (Typography, Pagination, Overlays, Form Controls, Utilities)
- ✅ Focus on **value, overlap with competitor baselines, gaps, and product strategy**
- ✅ Include timestamps in all generated files

---

## 7. Final Report

When done, report back by summarizing:

1. **Metrics table** (total, keep, shelf, missing)
2. **Top hero components** (8-12)
3. **Top shelf/experimental components**
4. **Top 3-5 critical gaps**
5. **Recommended next step** (A/B/C) with reasoning

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-01 | Initial prompt |
| 1.1 | 2025-12-07 | Added: fallback paths, usage_count methodology, ds_compliant checklist, context field, exported field, dependency mapping, type expansion (wrapper), effort estimates for gaps, success metrics, deprecation path, risk assessment, timestamps |
