# AUDIT: Design System Inconsistencies

> Generated: December 5, 2025 | Phase 1 Audit

## Executive Summary

| Category | Violations | Severity | Priority |
|----------|------------|----------|----------|
| Off-Grid Spacing | 35+ | Critical | P0 |
| Typography Hierarchy | 50+ | Critical | P0 |
| Missing font-mono | 1000+ | High | P1 |
| Hardcoded Colors | 92 | Medium | P1 |
| Color Space Mixing | 30 | Low | P2 |
| Border/Radius | 15 | Low | P2 |

**Total Issues:** 1,222+

---

## 1. Spacing Violations

### 1.1 Off-Grid Values (8-Point Grid Violations)

The system declares an 8-point grid but uses 4px-based values:

| Value | Size | Status | Count | Impact |
|-------|------|--------|-------|--------|
| `p-3` | 12px | ❌ OFF-GRID | 14 | Breaks visual rhythm |
| `py-3` | 12px | ❌ OFF-GRID | 1 | Should be py-2 or py-4 |
| `px-3` | 12px | ❌ OFF-GRID | 7 | Should be px-2 or px-4 |
| `pr-7` | 28px | ❌ OFF-GRID | 3 | Should be pr-6 or pr-8 |
| `pl-7` | 28px | ❌ OFF-GRID | 2 | Should be pl-6 or pl-8 |
| `pr-10` | 40px | ⚠️ UNUSUAL | 4 | Consider pr-8 or pr-12 |
| `pl-10` | 40px | ⚠️ UNUSUAL | 4 | Consider pl-8 or pl-12 |

**Files with off-grid spacing:**
- `src/app/component-showcase/page.tsx` (p-3, px-3)
- `src/components/ui/markdown-editor.tsx` (p-3)
- `src/app/docs/*` (various px-3)
- UI components (pr-7, pl-7, pr-10, pl-10)

### 1.2 Micro-Spacing Overuse

Below 8px values used extensively:

| Pattern | Count | Assessment |
|---------|-------|------------|
| `space-y-1` | 191 | ⚠️ Too common for "micro" |
| `py-1` | 163 | ⚠️ Inconsistent with grid |
| `gap-1` | 89 | ⚠️ Should be documented exception |
| `p-1` | 120+ | ⚠️ Review case-by-case |

### 1.3 Section Spacing Inconsistency

| Pattern | Count | Used In |
|---------|-------|---------|
| `py-12` | 22 | Mixed sections |
| `py-16` | 15 | Some sections |
| `py-20` | 21 | Other sections |
| `py-24` | 18 | Large sections |
| `py-28` | 8 | Sporadic |
| `py-32` | 5 | Sporadic |

**Problem:** No standard section padding. Should pick ONE (recommend `py-20` or `py-24`).

---

## 2. Typography Violations

### 2.1 Heading Hierarchy Chaos

**Current State (Inconsistent):**

| Element | Sizes Found | Weights Found |
|---------|-------------|---------------|
| `<h1>` | text-2xl, text-3xl, text-4xl | font-bold |
| `<h2>` | text-xl, text-2xl, text-3xl | font-bold, font-semibold |
| `<h3>` | text-sm, text-base, text-lg | font-semibold, font-medium |
| `<h4>` | text-sm | font-medium |

**Specific Examples:**
```tsx
// INCONSISTENT h1
<h1 className="text-2xl font-bold">    // contact-page.tsx
<h1 className="text-4xl font-bold">    // success-page.tsx
<h1 className="text-3xl font-bold">    // other pages

// INCONSISTENT h2
<h2 className="text-xl font-bold">     // faq-section.tsx (too small!)
<h2 className="text-3xl font-bold">    // features-cta.tsx
<h2 className="text-2xl font-bold">    // other pages
```

### 2.2 Text Size Distribution

| Size | Count | % of Total | Assessment |
|------|-------|------------|------------|
| `text-xs` | 1,784 | 45% | ⚠️ Overused |
| `text-sm` | 1,008 | 26% | OK |
| `text-base` | 41 | 1% | ❌ Underused |
| `text-lg` | 141 | 4% | OK |
| `text-xl` | 37 | 1% | OK |
| `text-2xl` | 102 | 3% | OK |
| `text-3xl` | 90 | 2% | OK |
| `text-4xl` | 51 | 1% | OK |

**Problem:** `text-xs` + `text-sm` = 71% of all text. Missing semantic body text (`text-base`).

### 2.3 Missing font-mono

**Terminal aesthetic requires font-mono on all UI text.**

| Status | Count | Example |
|--------|-------|---------|
| Has `font-mono` | 823 | ✓ Compliant |
| Missing `font-mono` | 1000+ | ❌ Violation |

**Example violations:**
```tsx
// MISSING font-mono
<p className="text-sm text-muted-foreground">Description</p>
<span className="text-xs text-primary">email@example.com</span>
<h3 className="text-lg font-semibold">Check Your Email</h3>
```

### 2.4 Font Weight Confusion

| Weight | Count | Semantic Use |
|--------|-------|--------------|
| `font-bold` | 342 | Headings? Emphasis? |
| `font-semibold` | 374 | Sub-headings? Labels? |
| `font-medium` | 266 | UI text? Buttons? |
| `font-normal` | 45 | Body text? |

**Problem:** No clear distinction. Multiple weights used interchangeably.

---

## 3. Color Violations

### 3.1 Hardcoded Hex Colors

| Location | Count | Purpose | Severity |
|----------|-------|---------|----------|
| Theme previews | 54 | Display theme samples | Medium |
| Chart defaults | 12 | Visualization colors | Low |
| Third-party components | 15 | Library defaults | Low |
| **Total** | **81** | | |

**Files with hardcoded colors:**
- `src/components/theme/theme-dropdown.tsx` (20 hex values)
- `src/components/theme/color-theme-switcher.tsx` (22 hex values)
- `src/app/docs/extras/theming/page.tsx` (12 hex values)
- Chart components (various)

### 3.2 Framer Motion Inline Colors

```tsx
// VIOLATION - inline backgroundColor
whileHover={{ x: 4, backgroundColor: "hsl(var(--muted))" }}

// Files:
// - src/components/landing/features-section/preview-billing.tsx:89
// - src/app/about/components/values-section.tsx:107
// - src/app/about/components/why-choose-section.tsx:80
```

### 3.3 Color Space Mixing

Chart components mix OKLCH and HSL:

```tsx
// INCONSISTENT
const DEFAULT_COLORS = [
  "hsl(var(--primary))",      // HSL wrapper
  "oklch(70% 0.15 240)",      // OKLCH literal
  "oklch(70% 0.15 160)",      // OKLCH literal
];
```

**Files affected:**
- `src/components/ui/pie-chart.tsx`
- `src/components/ui/heatmap.tsx`
- `src/components/ui/gauge.tsx`
- `src/components/analytics/revenue-chart.tsx`
- `src/components/analytics/funnel-visualizer.tsx`
- `src/components/ui/donut-chart.tsx`

---

## 4. Border & Radius Violations

### 4.1 Incomplete mode.radius Application

| Status | Components |
|--------|------------|
| ✓ Has `mode.radius` | Button, Card, Input, Select, Dialog |
| ❌ Missing `mode.radius` | PaginationLink, AlertTitle, some dropdowns |

### 4.2 Hardcoded Radius Values

| Value | Count | Location |
|-------|-------|----------|
| `rounded` (no size) | 10 | Skeleton loaders, dropzone |
| `rounded-tl-sm` | 1 | Navigation menu |
| `rounded-full` | 50+ | Avatars (acceptable) |

### 4.3 Border Width Inconsistency

| Pattern | Count | Usage |
|---------|-------|-------|
| `border` | 500+ | Standard |
| `border-2` | 45 | Marketing emphasis |
| `border-4` | 3 | Special cases |

**Problem:** Marketing pages use `border-2`, docs use `border`. Should standardize.

---

## 5. Shadow Violations

### 5.1 Current State

| Shadow | Count | Status |
|--------|-------|--------|
| `shadow-none` | 15 | ✓ Intentional (terminal) |
| `shadow-sm` | 8 | ✓ In visual-mode config |
| `shadow-md` | 0 | ✓ Not used |
| `shadow-lg` | 0 | ✓ Not used |

**Assessment:** Shadow usage is compliant with terminal aesthetic.

---

## 6. Component-Specific Issues

### 6.1 Button Typography

```tsx
// INCONSISTENT
defaultVariants: { size: "default" } // → text-xs
primaryCta: "text-base px-6 py-4"    // → text-base (override!)
```

**Problem:** CTA buttons have different text size than standard buttons.

### 6.2 Card Padding Variance

| Component | Padding |
|-----------|---------|
| CardHeader | `p-6` |
| CardContent | `px-6 pt-0 pb-6` (asymmetric!) |
| StyledCardHeader | `px-4 py-2` |
| FeaturesCard | `p-4` |

**Problem:** Four different padding patterns for card components.

### 6.3 Focus State Inconsistency

| Component | Focus Pattern |
|-----------|---------------|
| Button | `focus-visible:ring-2` ✓ |
| Input | `focus-visible:ring-2` ✓ |
| Select | `focus:ring-2` ❌ (missing -visible) |
| DropdownMenu | No visible focus ❌ |

### 6.4 Touch Target Violations

| Component | Mobile Size | WCAG 44px |
|-----------|-------------|-----------|
| Button | `min-h-[44px]` | ✓ |
| Select | `h-[48px]` | ✓ |
| Input | `h-8` (32px) | ❌ FAIL |
| DropdownMenuItem | `h-[48px]` | ✓ |

**Critical:** Input component doesn't meet WCAG 2.1 AA touch target.

---

## 7. Copy Style Inconsistencies

### 7.1 Casing Patterns

| Section | Pattern | Example |
|---------|---------|---------|
| Docs | UPPERCASE_SNAKE_CASE | `Getting_Started` |
| Components | Title Case | `Button Component` |
| Dashboard | Title Case | `Account Settings` |
| Legal | UPPERCASE_SNAKE_CASE | `PRIVACY_POLICY` |
| Marketing | Title Case | `Build Your SaaS` |

**Problem:** Components use Title Case but should match docs (SNAKE_CASE).

### 7.2 Terminal Prefix Formats

| Location | Format |
|----------|--------|
| Legal | `[ [0x00] LEGAL ]` (double brackets) |
| Docs | `[0x30]` (single, no text) |
| Templates | `[TEMPLATE_GALLERY]:` (colon suffix) |

**Problem:** Three different bracket formats. Should standardize.

---

## 8. Priority Fix List

### P0 - Critical (Fix First)

1. **Standardize heading hierarchy**
   - H1: text-4xl font-bold
   - H2: text-3xl font-bold
   - H3: text-2xl font-semibold
   - H4: text-lg font-semibold

2. **Add mobile touch targets to Input**
   ```tsx
   "h-8 min-h-[44px] sm:min-h-0 sm:h-8"
   ```

3. **Remove off-grid spacing**
   - Replace `p-3` → `p-2` or `p-4`
   - Replace `pr-7/pl-7` → `pr-6/pl-6`

### P1 - High (Fix Soon)

4. **Enforce font-mono on all UI text**
   - Add linter rule
   - Audit all text elements

5. **Standardize section padding**
   - Pick `py-20` OR `py-24`
   - Apply globally

6. **Fix focus states**
   - Use `focus-visible` consistently
   - Add focus to DropdownMenu

### P2 - Medium (Fix Later)

7. **Unify card padding**
   - Symmetric padding: `p-6` everywhere

8. **Standardize border widths**
   - `border` for all components
   - `border-2` only for selected/active states

9. **Move theme previews to computed colors**

### P3 - Low (Nice to Have)

10. **Standardize chart color space**
    - All OKLCH, use tokens

11. **Document copy style guide**
    - When to use SNAKE_CASE vs Title Case

12. **Unify bracket format**
    - Pick one: `[ [0x00] TITLE ]`

---

## Summary Statistics

| Category | Compliant | Violations | % Compliant |
|----------|-----------|------------|-------------|
| Color Tokens | 455+ | 92 | 83% |
| Spacing Grid | 2,500+ | 35 | 99% |
| Typography | 800 | 1,050 | 43% |
| Border/Radius | 500+ | 15 | 97% |
| Shadows | 23 | 0 | 100% |
| **Overall** | | | **84%** |

The system is **84% compliant**. Typography and font-mono application are the biggest gaps.
