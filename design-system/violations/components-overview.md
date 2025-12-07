# Component Design System Audit - Overview

**Audit Date:** 2025-12-06  
**Total Components Scanned:** 241  
**UI Library Components:** 100

---

## Executive Summary

The component library is **57% compliant** with the design system. The main issues are:

1. **Theme-specific naming** - Core card components use `Terminal*` prefix (61 usages across codebase)
2. **Hardcoded font-mono** - 50+ files hardcode `font-mono` instead of using `mode.font`
3. **22 UI components** don't import `@/design-system` at all

---

## Violation Statistics

| Category | Compliant | Violations | % Compliant |
|----------|-----------|------------|-------------|
| Token Usage (mode.radius) | 137 | 4 | 97% |
| Token Usage (mode.font) | 48 | 52 | 48% |
| Generic Naming | 180 | 61 | 75% |
| Design System Import | 78 | 22 | 78% |

---

## Critical Issues (Fix First)

### 1. Card Component Naming (CRITICAL)

**File:** `src/components/ui/card.tsx`

The card component exports theme-specific names that lock the boilerplate to terminal aesthetic:

| Current Name | Suggested Generic Name |
|--------------|----------------------|
| `TerminalCard` | `Card` |
| `TerminalCardHeader` | `CardHeader` |
| `TerminalCardContent` | `CardContent` |
| `TerminalCardFooter` | `CardFooter` |
| `TerminalBadge` | `InlineBadge` |
| `TerminalStat` | `Stat` |
| `StyledLabel` | `FormLabel` |

**Impact:** 61 files import these theme-specific names. Renaming will require updating all imports.

**Recommendation:** 
- Rename to generic names
- Use `variant` prop for terminal-specific styling
- Keep backwards compat exports temporarily

---

### 2. Footer Component (MAJOR)

**File:** `src/components/landing/footer.tsx`

Contains **25+ instances** of hardcoded `font-mono` instead of `mode.font`. Also has terminal-specific formatting hardcoded:
- `[ PRODUCT ]` bracket syntax
- `> ` prefix for links
- `[STATUS]:` labels

**Recommendation:** Import `mode` from design system and use `mode.font` throughout.

---

### 3. Security Components (MAJOR)

**Files:** 
- `security-recommendations-card.tsx` (6 violations)
- `security-2fa-card.tsx` (4 violations)
- `security-sessions-card.tsx` (6 violations)
- `security-password-card.tsx` (1 violation)
- `security-accounts-card.tsx` (5 violations)

All hardcode `font-mono` instead of using `mode.font`.

---

### 4. StyledTabs Component (MAJOR)

**File:** `src/components/ui/styled-tabs.tsx`

- Uses theme-specific name `StyledTabs`
- Should be `Tabs` with a `variant="styled"` prop
- Internally uses `TerminalCard` which compounds the naming issue

---

### 5. Landing Sections (MAJOR)

**Files:**
- `landing/tech-stack.tsx` - hardcoded `font-mono` on section
- `landing/quality-section.tsx` - hardcoded `font-mono` on section

---

## UI Components Missing Design System Integration

These 22 components don't import from `@/design-system`:

```
aspect-ratio.tsx      collapsible.tsx       combobox.tsx
container.tsx         copy-button.tsx       cropper-controls.tsx
data-table-header.tsx donut-chart.tsx       file-upload.tsx
gauge.tsx             grid.tsx              input-password.tsx
kpi-card.tsx          page-wrapper.tsx      pagination.tsx
password-strength.tsx section.tsx           separator.tsx
simple-icon.tsx       stack.tsx             stat-card.tsx
toaster.tsx
```

**Note:** Some of these (aspect-ratio, container, grid, separator) may be primitives that don't require mode styling.

---

## Top 5 Components to Fix First

| Priority | Component | Issue | Impact |
|----------|-----------|-------|--------|
| 1 | **Card** (card.tsx) | Theme-specific naming | 61 file imports, foundation for all cards |
| 2 | **Footer** (footer.tsx) | 25+ hardcoded font-mono | Every page shows footer |
| 3 | **StyledTabs** | Theme-specific naming | Used in notifications, search templates |
| 4 | **Security Cards** (5 files) | 22 hardcoded font-mono | All security pages |
| 5 | **Landing Sections** | Hardcoded font-mono | Landing page appearance |

---

## What's Working Well

1. **Button** - Correctly uses `mode.radius`, `mode.font`, `mode.textTransform`
2. **Input** - Correctly uses design system tokens
3. **Tabs** (base) - Correctly uses `mode.radius`, `mode.font`
4. **Switch** - Correctly uses `mode.radius`
5. **Badge** - Correctly uses design tokens
6. **137 components** properly use `mode.radius`

---

## Recommended Fix Order

### Phase 1: Rename Card Components (Breaking)
1. Rename `TerminalCard` → `Card`
2. Rename `TerminalCardHeader` → `CardHeader`
3. Rename `TerminalCardContent` → `CardContent`
4. Update all 61 import statements
5. Add backwards-compat aliases temporarily

### Phase 2: Fix Font Token Usage
1. Footer - replace 25 `font-mono` with `mode.font`
2. Security cards - replace 22 `font-mono` with `mode.font`
3. Landing sections - replace `font-mono` with `mode.font`
4. Docs components - replace `font-mono` with `mode.font`

### Phase 3: Rename StyledTabs
1. Merge into Tabs with `variant` prop
2. Update imports

### Phase 4: Add Design System to Remaining Components
1. Audit the 22 components without imports
2. Add `mode.radius`/`mode.font` where appropriate

---

## Files Created

- `design-system/audit/components/index.json` - Component inventory
- `design-system/violations/components.json` - Detailed violation data
- `design-system/violations/components-overview.md` - This file

---

*Audit completed 2025-12-06. No code was modified during this audit.*
