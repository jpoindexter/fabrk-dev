# Component Value Audit Protocol

> Shifting from "is everything consistent?" to "is this boilerplate actually competitive with top SaaS starters?"

This is a **feature-level / component-level value audit** — not a design token audit.

---

## Overview

**Mode:** Product Designer + Staff Engineer at Top SaaS Company
**Goal:** Compare our component set vs top SaaS boilerplates. Keep only what adds real value, identify gaps, and propose an opinionated but lean, high-ROI component lineup.

---

## Mindset & Context

When running this audit, act as:

- A staff product designer/engineer at a top SaaS company
- Someone who understands:
  - Modern Next.js / React SaaS boilerplates
  - Common component patterns used in:
    - Admin dashboards
    - Billing/teams/auth flows
    - Onboarding, settings, analytics
  - How to keep a design system generic + themeable (terminal, modern, soft, etc.) using mode tokens, not hardcoded styling

**Your job:** Analyze components for actual product value, not just DS compliance.

---

## Phase 1: Inventory Our Current Components

### Task

Build a complete inventory of UI components from the codebase.

### Sources to Scan

```
src/components/ui/**
src/app/component-showcase/page.tsx
src/app/component-showcase/**/*.tsx (cards, foundations, templates, etc.)
Any helper "layout" or "shell" components
```

### Data to Capture Per Component

| Field | Description |
|-------|-------------|
| `name` | e.g. Button, Card, StatCard, KpiCard, Heatmap |
| `category` | foundation, form, display, navigation, feedback, overlay, chart, layout, template |
| `description` | What it's for, in plain SaaS terms |
| `complexity_level` | low \| medium \| high |
| `dependencies` | Design system tokens, chart libs, heavy dependencies |
| `used_in` | Key templates/pages where it appears |

### Output Files

| File | Purpose |
|------|---------|
| `design-system/audit/components-inventory.json` | Machine-usable inventory |
| `design-system/audit/components-inventory.md` | Human-readable overview grouped by category |

**IMPORTANT:** Do NOT modify any components in this phase. Inventory only.

---

## Phase 2: Establish Industry Baseline

### Task

Define what a "baseline SaaS UI kit" should include — the component families that almost everyone expects.

### Expected Component Families

#### Foundations
- Typography, color system, spacing, grid, container

#### Navigation
- App shell: sidebar, top bar, breadcrumbs, tabs
- Navigation menu / app switcher

#### Forms
- Input, Select, Textarea, Checkbox, Radio, Switch, Slider
- Password field, Search field
- Date/Time picker, Multi-select, Combobox/Autocomplete

#### Feedback & Status
- Alert, Toast, Banner
- Empty state, Progress, Skeleton/Loading

#### Data Display
- Table (with basic sorting/pagination hooks)
- Cards (generic + KPI/Stat variants)
- Badges/Status pills, Avatar/Avatar group
- Activity timeline / list

#### Overlays
- Dialog, Drawer/Sheet, Popover, Tooltip
- Dropdown menu, Hover card

#### Charts (optional but high-value)
- Simple Pie/Donut, Trend line or Sparkline
- Funnel, Gauge

#### Auth & Onboarding UX
- "Sign in / Sign up" layout primitives
- Steps or progress UI

#### Settings / Account / Billing UX
- Basic forms & layout patterns expected for settings pages

### Output Files

| File | Purpose |
|------|---------|
| `design-system/audit/industry-baseline.md` | List of expected component families + example use cases |
| `design-system/audit/industry-baseline.json` | Machine-usable skeleton |

### JSON Schema for Baseline

```json
[
  {
    "name": "Button",
    "category": "forms",
    "required_for": ["all"],
    "priority": "critical"
  },
  {
    "name": "KpiCard",
    "category": "data_display",
    "required_for": ["dashboards"],
    "priority": "high"
  }
]
```

**IMPORTANT:** No code changes yet. This defines the "north star" product expectations.

---

## Phase 3: Compare Inventory vs Baseline

### Task

Crosswalk our components against the industry baseline.

### Labels to Apply Per Component

#### Market Value
| Value | Meaning |
|-------|---------|
| `critical` | Almost every SaaS app needs this |
| `high` | Strong differentiator / demo value |
| `nice_to_have` | Cool but not required |
| `niche` | Interesting but specific; could be shelved |

#### Overlap with Baseline
| Value | Meaning |
|-------|---------|
| `direct_match` | Standard SaaS expectation (e.g. Button, Card, Table) |
| `variant_or_specialization` | e.g. KpiCard, StatCard, ActivityTimeline |
| `experimental` | Playground demo rather than core SaaS primitive |

#### Theme Friendly
- `true` / `false` — based on design system compliance (can we reskin easily?)

### Gap Analysis

Identify missing-but-expected blocks:

- App shell layouts: "DashboardLayout", "AuthLayout", "SettingsLayout"
- Filter bars / toolbar patterns for tables
- Notification center pattern
- Basic onboarding stepper or progress UI
- Common SaaS "empty state + primary action" combos

### Output Files

| File | Purpose |
|------|---------|
| `design-system/audit/components-market-value.json` | Machine-usable market value data |
| `design-system/audit/components-market-value.md` | Summary with recommendations |

**IMPORTANT:** Do NOT change any component code yet.

---

## Phase 4: Product Strategy Recommendations

### Task

Generate a product-focused recommendation using all previous analysis.

### 1. High-Value "Keep & Polish" List

Components that:
- Are critical or high market value
- Are theme-friendly (already tokenized) OR easy to fix

For each, suggest:
- Small improvements needed to make them "production-demo ready"
- Showcase templates that emphasize them

### 2. Shelf / Deprioritize List

Components that:
- Are niche or "playground-only"
- Add complexity without clear SaaS value

Recommendations:
- `hide_from_main_showcase: true`
- Or move under an "Experimental / Extras" section

### 3. Gaps / Missing Primitives

List 10-20 highest-impact missing primitives:

| Example | Why Important |
|---------|---------------|
| `DashboardShell` | Every SaaS needs sidebar + topbar layout |
| `SettingsPageLayout` | Standard pattern for account settings |
| `BillingSummaryCard` | SaaS billing is expected |
| `PlanSelector` | Pricing tier selection |
| `UsageMeter` | Usage-based billing display |
| `OnboardingStep` | Guided onboarding is table stakes |
| `StepIndicator` | Multi-step flow visualization |
| `FiltersBar` | Table filtering is expected |

For each:
- Explain why it's important for a paid boilerplate
- Note whether it can be composed from existing components or needs new ones

### Output File

`design-system/spec/components-product-strategy.md` with sections:

```markdown
## 1. High-Value Core Set
## 2. Secondary but Useful
## 3. Experimental / Optional
## 4. Missing Primitives & Recommended Additions
```

**IMPORTANT:** No code changes yet. Analysis & planning only.

---

## Phase 5: Executive Summary & Decision Point

### Final Output Format

#### 1. Executive Summary (in chat)

- **Top 10 "hero components"** that sell the boilerplate
- **5-10 components to hide/shelf**
- **5-10 "we really should add these" primitives**

#### 2. File Manifest

```
design-system/audit/components-inventory.json
design-system/audit/components-inventory.md
design-system/audit/industry-baseline.json
design-system/audit/industry-baseline.md
design-system/audit/components-market-value.json
design-system/audit/components-market-value.md
design-system/spec/components-product-strategy.md
```

#### 3. Decision Prompt

Ask:

> "Do you want me to:
> (A) refactor the showcase to highlight only the high-value set,
> (B) add missing primitives, or
> (C) start shelving/hiding low-value components first?"

**STOP there.** Do NOT modify any component or template until explicitly told which option to execute.

---

## Quick Reference Commands

```bash
# Run the full audit
"Run the component value audit following design-system/audit/COMPONENT_VALUE_AUDIT.md"

# Run specific phase
"Run Phase 1 of the component value audit - inventory only"
"Run Phase 2 of the component value audit - establish industry baseline"
"Run Phase 3 of the component value audit - compare inventory vs baseline"
"Run Phase 4 of the component value audit - generate product strategy"
```

---

## Related Files

- `DESIGN_SYSTEM.md` - Design token specification
- `.claude/audit/` - Design system compliance audit (different from this)
- `design-system/spec/` - Component specifications

---

## Changelog

| Date | Change |
|------|--------|
| 2025-12-07 | Initial protocol documentation |
