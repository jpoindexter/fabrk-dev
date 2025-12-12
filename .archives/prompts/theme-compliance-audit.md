# Theme Compliance Audit Prompt

> **Version:** 1.0
> **Last Updated:** 2025-12-07
> **Purpose:** Ensure all themes are 100% compliant and working correctly

---

We are in **THEME COMPLIANCE AUDIT MODE**.

## Goal

Find and fix ALL theme-related issues:
- Missing CSS variables in any theme
- Hardcoded colors breaking theme switching
- Inconsistent token values across themes
- Components not responding to theme changes
- Contrast/accessibility issues per theme

## Permissions

You are allowed to:
- READ any files in the repo
- FIX theme-related issues in:
  - `src/app/globals.css`
  - `src/components/ui/**/*.tsx`
  - `tailwind.config.ts`
  - Any theme configuration files

You are **NOT** allowed to:
- Change component functionality (only fix theme/color issues)
- Remove components

---

## 0. GROUNDING - Read Theme Architecture

First, read the theme source of truth files:

### Primary Paths:
- `src/app/globals.css` - CSS variables and theme definitions
- `tailwind.config.ts` - Tailwind theme configuration
- `src/design-system/index.ts` - Mode exports (mode.font, mode.radius)
- `DESIGN_SYSTEM.md` - Design system rules

### Check for theme configuration:
- Look for `[data-theme="..."]` selectors in CSS
- Look for DaisyUI theme config in tailwind.config
- Identify ALL available themes

---

## 1. PHASE 1 – THEME INVENTORY

### 1.1 List All Themes

Scan and document every theme available:

```markdown
| Theme Name | Type | Source |
|------------|------|--------|
| terminal | dark | globals.css |
| light | light | globals.css |
| cyberpunk | dark | daisyui |
```

### 1.2 Extract All CSS Variables

For EACH theme, extract every CSS variable defined:

```markdown
## Theme: terminal
- --background: 0 0% 3.9%
- --foreground: 0 0% 98%
- --card: ...
- --primary: ...
(list ALL variables)
```

### 1.3 Find Missing Variables

Compare variables across themes. Flag any that are:
- Present in one theme but missing in another
- Have different names/structures between themes

Output:
- `design-system/audit/theme-variables-matrix.md`

---

## 2. PHASE 2 – HARDCODED COLOR SCAN

### 2.1 Scan All Components

Scan every file in `src/components/ui/**/*.tsx` for:

**VIOLATIONS:**
```tsx
// Hardcoded hex colors
className="bg-[#1a1a1a]"
style={{ color: '#ffffff' }}

// Raw Tailwind colors (not semantic)
className="bg-gray-900 text-white"
className="bg-purple-500"
className="border-slate-700"

// Hardcoded oklch without CSS var
fill="oklch(0.7 0.2 280)"
stroke="#6366f1"
```

**ALLOWED (with eslint-disable comment):**
```tsx
{/* eslint-disable design-system/no-hardcoded-colors -- Brand colors required */}
<path fill="#4285F4" /> // Google blue
{/* eslint-enable design-system/no-hardcoded-colors */}
```

**ALLOWED (using CSS variables):**
```tsx
className="bg-primary text-primary-foreground"
className="bg-card border-border"
fill="oklch(var(--primary))"
stroke="var(--border)"
```

### 2.2 Generate Violations Report

Create:
- `design-system/audit/hardcoded-colors-report.md`

```markdown
# Hardcoded Colors Report

## Critical Violations (must fix)

| File | Line | Code | Fix |
|------|------|------|-----|
| button.tsx | 45 | bg-gray-900 | bg-background |
| card.tsx | 12 | #1a1a1a | bg-card |

## Acceptable Exceptions (with eslint-disable)

| File | Line | Reason |
|------|------|--------|
| sign-in-form.tsx | 89 | Google brand colors |
```

---

## 3. PHASE 3 – FIX VIOLATIONS

For each violation found in Phase 2:

### 3.1 Fix Strategy

| Violation Type | Fix |
|----------------|-----|
| `bg-gray-*` | Replace with `bg-background`, `bg-card`, or `bg-muted` |
| `text-gray-*` | Replace with `text-foreground` or `text-muted-foreground` |
| `border-gray-*` | Replace with `border-border` |
| `bg-white` | Replace with `bg-background` or `bg-card` |
| `text-white` | Replace with `text-foreground` or `text-primary-foreground` |
| `bg-black` | Replace with `bg-background` |
| `text-black` | Replace with `text-foreground` |
| Hex in className | Replace with semantic token |
| Hex in style/fill/stroke | Use `oklch(var(--token))` or `var(--token)` |

### 3.2 Apply Fixes

Actually edit the files to fix violations. For each fix:
1. Read the file
2. Find the violation
3. Replace with correct semantic token
4. Verify the fix makes sense in context

### 3.3 Handle Chart/SVG Colors

Charts often need dynamic colors. The correct pattern:

```tsx
// CORRECT - Use CSS variables with fallback
const theme = useThemeColors(); // Hook that reads CSS vars
stroke={theme.primary}
fill={`oklch(${theme.chart[0]})`}

// CORRECT - With eslint-disable for fallbacks
/* eslint-disable design-system/no-hardcoded-colors -- Fallback before theme loads */
const fallbackColors = ["#6366f1", "#8b5cf6"];
/* eslint-enable design-system/no-hardcoded-colors */
```

---

## 4. PHASE 4 – THEME SWITCHING VERIFICATION

### 4.1 Check Theme Toggle Implementation

Verify theme switching works:
- Find theme toggle component(s)
- Verify it sets `data-theme` attribute on `<html>` or `<body>`
- Check if theme persists (localStorage, cookie, etc.)

### 4.2 Component Theme Response Checklist

For each component category, verify they respond to theme changes:

```markdown
## Category: Buttons
- [ ] Button - bg-primary changes with theme
- [ ] Button outline - border-border changes with theme
- [ ] Button destructive - bg-destructive changes with theme

## Category: Cards
- [ ] Card - bg-card changes with theme
- [ ] CardHeader - border-border changes with theme

## Category: Charts
- [ ] LineChart - colors update on theme change
- [ ] BarChart - colors update on theme change
- [ ] PieChart - colors update on theme change

## Category: Forms
- [ ] Input - bg-background, border-border respond
- [ ] Select - dropdown colors respond
- [ ] Checkbox - checked state colors respond
```

---

## 5. PHASE 5 – CONTRAST & ACCESSIBILITY

### 5.1 Check Contrast Ratios

For each theme, verify:
- Text on background meets WCAG AA (4.5:1 for normal text)
- Text on primary/accent meets contrast requirements
- Disabled states are still readable (3:1 minimum)

### 5.2 Flag Issues

```markdown
## Contrast Issues

| Theme | Element | Foreground | Background | Ratio | Required | Status |
|-------|---------|------------|------------|-------|----------|--------|
| light | muted-foreground on background | oklch(...) | oklch(...) | 3.2:1 | 4.5:1 | FAIL |
```

---

## 6. PHASE 6 – GENERATE FINAL REPORT

Create:
- `design-system/audit/THEME_AUDIT_SUMMARY.md`

```markdown
# Theme Compliance Audit — Summary

**Audit Date:** YYYY-MM-DD
**Auditor:** Claude Code

## Quick Status

| Metric | Count |
|--------|-------|
| Total themes | X |
| Themes 100% compliant | X |
| Total violations found | X |
| Violations fixed | X |
| Remaining issues | X |

## Themes Audited

| Theme | Status | Issues |
|-------|--------|--------|
| terminal | ✅ PASS | 0 |
| light | ⚠️ WARN | 2 minor |
| cyberpunk | ❌ FAIL | 5 critical |

## Violations Fixed

| File | Issue | Fix Applied |
|------|-------|-------------|
| button.tsx:45 | bg-gray-900 | bg-background |
| card.tsx:12 | #1a1a1a | bg-card |

## Remaining Issues

| File | Issue | Reason Not Fixed |
|------|-------|------------------|
| chart.tsx:89 | Hardcoded fallback | Required for SSR |

## Recommendations

1. [List any architectural improvements]
2. [List any missing tokens that should be added]
3. [List any components that need refactoring]
```

---

## 7. EXECUTION CHECKLIST

Run through each phase in order:

- [ ] **Phase 0:** Read theme architecture files
- [ ] **Phase 1:** Create theme inventory and variable matrix
- [ ] **Phase 2:** Scan for hardcoded colors, generate report
- [ ] **Phase 3:** Fix all violations (actually edit files)
- [ ] **Phase 4:** Verify theme switching works for all components
- [ ] **Phase 5:** Check contrast/accessibility per theme
- [ ] **Phase 6:** Generate final summary report

---

## 8. Non-Negotiable Rules

- ❌ Do NOT change component functionality
- ❌ Do NOT remove components
- ✅ DO fix all hardcoded colors with semantic tokens
- ✅ DO add eslint-disable comments for legitimate exceptions (brand colors, chart fallbacks)
- ✅ DO ensure every theme has consistent variable coverage
- ✅ DO report any unfixable issues with explanation

---

## 9. Quick Reference: Semantic Token Map

| Instead of... | Use... |
|---------------|--------|
| `bg-white`, `bg-gray-50` | `bg-background` |
| `bg-gray-100`, `bg-gray-200` | `bg-muted` |
| `bg-gray-800`, `bg-gray-900`, `bg-black` | `bg-background` (dark) or `bg-card` |
| `text-white` | `text-foreground` or `text-primary-foreground` |
| `text-black`, `text-gray-900` | `text-foreground` |
| `text-gray-500`, `text-gray-600` | `text-muted-foreground` |
| `border-gray-*` | `border-border` |
| `bg-blue-500`, `bg-purple-500` | `bg-primary` |
| `bg-red-500` | `bg-destructive` |
| `bg-green-500` | `bg-success` |
| `bg-yellow-500` | `bg-warning` |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-07 | Initial theme audit prompt |
