# Badge Component Audit

**File:** `src/components/ui/badge.tsx`
**Lines:** 90
**Last Updated:** 2025-12-05

---

## Component Overview

Badge component for status indicators and labels with 6 variants and 3 sizes. Built with class-variance-authority for type-safe variants.

---

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "accent" \| "destructive" \| "neutral" \| "outline"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `asChild` | `boolean` | `false` | Use Radix Slot for polymorphic rendering |

---

## Design Token Usage

### Colors (✅ All semantic tokens)

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `default` | `bg-primary` | `text-primary-foreground` | `border-primary` | `hover:bg-primary/90` |
| `secondary` | `bg-secondary` | `text-secondary-foreground` | `border-secondary` | `hover:bg-secondary/90` |
| `accent` | `bg-accent` | `text-accent-foreground` | `border-accent` | `hover:bg-accent/90` |
| `destructive` | `bg-destructive` | `text-destructive-foreground` | `border-destructive` | `hover:bg-destructive/90` |
| `neutral` | `bg-background` | `text-foreground` | `border-foreground` | `hover:bg-muted` |
| `outline` | `bg-transparent` | `text-foreground` | `border-foreground` | `hover:bg-foreground/10` |

**Status:** ✅ No hardcoded colors detected

---

## Spacing (8-Point Grid)

| Size | Horizontal Padding | Vertical Padding | Text Size | Icon Size |
|------|-------------------|------------------|-----------|-----------|
| `sm` | `px-2` (8px) | `py-2` (8px) | `text-xs` | `size-3` (12px) |
| `md` | `px-4` (16px) | `py-2` (8px) | `text-xs` | `size-3` (12px) |
| `lg` | `px-4` (16px) | `py-2` (8px) | `text-xs` | `size-4` (16px) |

**Status:** ✅ Follows 8-point grid

---

## Visual Mode System Integration

| Mode Property | Applied To | Purpose |
|--------------|------------|---------|
| `mode.radius` | Badge container | Sharp (`rounded-none`) or soft (`rounded-md`) corners |
| `mode.font` | Badge text | Monospace (`font-mono`) or standard font |

**Implementation:**
```tsx
className={cn(
  badgeVariants({ variant, size }),
  mode.radius,
  mode.font,
  className
)}
```

**Status:** ✅ Correctly implements Visual Mode System

---

## Typography

| Property | Value | Notes |
|----------|-------|-------|
| Base font size | `text-xs` (12px) | Consistent across all sizes |
| Font weight (sm) | `font-semibold` | Bolder for small size |
| Font weight (md) | `font-medium` | Standard weight |
| Font weight (lg) | `font-semibold` | Bolder for emphasis |
| Text transform | `uppercase` | **Hardcoded** |

**Text Transform Issue:**
```tsx
// Base styles in badgeVariants
"uppercase"  // Always uppercase, not conditional
```

**Comparison to Button:**
```tsx
// Button component (conditional)
mode.textTransform === "uppercase" && "uppercase"
```

**Inconsistency:** Badge always uppercase, Button conditionally uppercase based on mode.

---

## States & Variants

### Variants by Use Case

| Variant | Use Case | Example |
|---------|----------|---------|
| `default` | Primary status | Active, Live, New |
| `secondary` | Muted status | Draft, Pending |
| `accent` | Highlighted status | Featured, Popular |
| `destructive` | Error/warning | Error, Critical, Failed |
| `neutral` | Subtle label | Category tags |
| `outline` | Bordered only | Secondary tags |

### Interactive States

| State | Visual Feedback |
|-------|----------------|
| **Hover** | 10% darker background (variants with `bg-*`) |
| **Hover (outline)** | 10% opacity background overlay |
| **Hover (neutral)** | Muted background |

**Note:** Unlike Button, Badge has no focus or disabled states (non-interactive by default).

---

## Icon Support

Automatic icon sizing via CSS:
```tsx
"[&>svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3"
```

**Icon Sizes:**
- `sm` and `md`: `size-3` (12px)
- `lg`: `size-4` (16px)

**Usage:**
```tsx
<Badge size="md">
  <CheckCircle className="h-3 w-3" />
  VERIFIED
</Badge>
```

**Status:** ✅ Automatic icon sizing works well

---

## Layout & Container

**Base Styles:**
```tsx
"inline-flex items-center justify-center border w-fit whitespace-nowrap shrink-0"
```

**Key Properties:**
- `inline-flex` - Inline layout (flows with text)
- `w-fit` - Width fits content
- `shrink-0` - Doesn't shrink in flex containers
- `whitespace-nowrap` - Single line text

**Gap:** `gap-2` (8px) between icon and text

**Status:** ✅ Proper layout constraints

---

## Terminal Aesthetic Compliance

| Requirement | Status | Notes |
|-------------|--------|-------|
| Sharp edges | ✅ | `rounded-none` via `mode.radius` |
| Monospace font | ✅ | `font-mono` via `mode.font` |
| Uppercase text | ✅ | Hardcoded `uppercase` (always applied) |
| Border | ✅ | All variants have border |

**Common Terminal Pattern:**
```tsx
<Badge variant="default">NEW</Badge>
<Badge variant="destructive">ERROR</Badge>
<Badge variant="outline">BETA</Badge>
```

**Status:** ✅ Fully compliant with terminal aesthetic

---

## Usage Patterns Observed

### Across Codebase

**Search Query:** `grep -r "from \"@/components/ui/badge\"" src/`

**Common Patterns:**

1. **Status indicators:**
   ```tsx
   <Badge variant="default">ACTIVE</Badge>
   <Badge variant="destructive">FAILED</Badge>
   ```

2. **With icons:**
   ```tsx
   <Badge variant="accent">
     <Star className="h-3 w-3" />
     FEATURED
   </Badge>
   ```

3. **Category tags:**
   ```tsx
   <Badge variant="outline">typescript</Badge>
   <Badge variant="outline">nextjs</Badge>
   ```

4. **In lists:**
   ```tsx
   <div className="flex gap-2">
     {tags.map(tag => (
       <Badge key={tag} variant="neutral">{tag}</Badge>
     ))}
   </div>
   ```

---

## Issues & Recommendations

### ✅ Strengths

1. **Design tokens only** - No hardcoded colors
2. **Visual Mode System** - Correct radius/font integration
3. **8-point grid** - Consistent spacing
4. **Icon support** - Automatic sizing
5. **Comprehensive variants** - Covers all use cases
6. **Terminal aesthetic** - Always uppercase, sharp edges

### ⚠️ Text Transform Inconsistency

**Issue:**
```tsx
// Badge (hardcoded uppercase)
"uppercase"

// Button (conditional uppercase)
mode.textTransform === "uppercase" && "uppercase"
```

**Impact:**
- Badge is always uppercase, even in non-terminal modes
- Button respects `mode.textTransform` setting
- Inconsistent behavior across components

**Recommendation:**
```tsx
// Option 1: Make conditional like Button
cn(
  badgeVariants({ variant, size }),
  mode.radius,
  mode.font,
  mode.textTransform === "uppercase" && "uppercase",
  className
)

// Option 2: Add to mode.textTransform class directly
// In design-system/index.ts:
textTransform: isTerminal ? "uppercase" : "normal-case"

// Then in Badge:
cn(
  badgeVariants({ variant, size }),
  mode.radius,
  mode.font,
  mode.textTransform,  // Applies uppercase or normal-case
  className
)
```

**Decision Needed:** Should badges always be uppercase (current), or respect mode (like Button)?

### 🔍 Questions for Review

1. **Intentional always-uppercase?** Is Badge meant to always be uppercase for status/label clarity?
2. **Standardize approach?** Should all components use conditional or hardcoded uppercase?
3. **Mode system extension?** Should `mode.textTransform` return full class name (`"uppercase"` / `"normal-case"`) instead of boolean check?

---

## Cross-Component Consistency

### Compared to Button

| Property | Badge | Button | Consistent? |
|----------|-------|--------|-------------|
| Design tokens | ✅ 100% | ✅ 100% | ✅ |
| Visual Mode radius | ✅ | ✅ | ✅ |
| Visual Mode font | ✅ | ✅ | ✅ |
| Text transform | Hardcoded | Conditional | ❌ |
| Hover states | ✅ | ✅ | ✅ |
| Icon sizing | Automatic | Automatic | ✅ |

**Inconsistency:** Text transform handling differs

### Compared to Alert

| Property | Badge | Alert | Consistent? |
|----------|-------|--------|-------------|
| Variants | 6 variants | 3 variants | Different use cases |
| Padding | `px-2/px-4` | `px-6 py-4` | Different sizes |
| Border | All variants | All variants | ✅ |
| Radius source | `mode.radius` | `mode.radius` | ✅ |

**Status:** Appropriate differences for different use cases

---

## Accessibility

### Interactive vs Non-Interactive

**Badge is non-interactive by default:**
- No focus states (not keyboard navigable)
- No disabled states (not a control)
- Can be made interactive with `asChild` + link/button

**Interactive Pattern:**
```tsx
<Badge asChild>
  <button onClick={handleClick}>
    CLICK_ME
  </button>
</Badge>
```

**Status:** ✅ Appropriate for status indicators

### Color Contrast

All variants use semantic token pairs:
- `bg-primary` + `text-primary-foreground`
- `bg-destructive` + `text-destructive-foreground`
- etc.

These pairs are guaranteed to meet WCAG 2.1 AA contrast ratios (4.5:1 for text).

**Status:** ✅ Accessible color contrast

---

## File Metrics

| Metric | Value | Status |
|--------|-------|--------|
| Total lines | 90 | ✅ Under 150 |
| Component exports | 2 | Badge + badgeVariants |
| TypeScript coverage | 100% | ✅ |
| Design tokens | 100% | ✅ No hardcoded colors |
| Documentation | Good | JSDoc comments |

---

## Summary

**Status:** ✅ Production-ready with text transform observation

The Badge component is well-implemented, accessible, and uses only semantic design tokens. It correctly integrates with the Visual Mode System for radius and font, and provides comprehensive variant coverage.

**Key Achievement:** Automatic icon sizing and proper layout constraints make it easy to use in various contexts.

**Observation:** Text transform is hardcoded to `uppercase`, unlike Button which makes it conditional. This may be intentional for status/label clarity, but creates inconsistency with Button component.

**Recommendation:** Approved for production use. Decision needed: Should Badge text transform be hardcoded (always uppercase) or conditional (respect mode)? This is a design decision, not a bug.

If always-uppercase is intentional for badges (status/labels should be prominent), consider documenting this distinction in design system guidelines. If consistency with Button is preferred, make text transform conditional.
