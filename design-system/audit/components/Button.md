# Button Component Audit

**File:** `src/components/ui/button.tsx`  
**Category:** atom  
**Severity:** COMPLIANT

---

## A. Token Usage

| Token | Status | Notes |
|-------|--------|-------|
| `mode.radius` | ✅ Compliant | Uses `mode.radius` |
| `mode.font` | ✅ Compliant | Uses `mode.font` |
| Colors | ✅ Compliant | Uses semantic tokens |
| Spacing | ✅ Compliant | Uses token scale |

**Violations:** None

---

## B. Naming & API

| Aspect | Status | Notes |
|--------|--------|-------|
| Component name | ✅ | `Button` is industry standard |
| `variant` prop | ✅ | Standard values |
| `size` prop | ✅ | Standard values |
| `asChild` prop | ✅ | Radix pattern |

### Variants

| Variant | Standard? |
|---------|-----------|
| `default` | ✅ |
| `destructive` | ✅ |
| `outline` | ✅ |
| `secondary` | ✅ |
| `ghost` | ✅ |
| `link` | ✅ |

### Sizes

| Size | Standard? |
|------|-----------|
| `default` | ✅ |
| `sm` | ✅ |
| `lg` | ✅ |
| `xl` | ✅ |
| `icon` | ✅ |

**Violations:** None

---

## C. Themeability

| Aspect | Status |
|--------|--------|
| Uses mode.radius | ✅ |
| Uses mode.font | ✅ |
| No hardcoded styling | ✅ |

Fully themeable.

---

## D. Layout & Responsibilities

| Aspect | Status |
|--------|--------|
| Single responsibility | ✅ |
| No layout hardcoding | ✅ |

---

## E. Copy / Microcopy

Button text formatting ("> ACTION_NAME") is expected to be applied by consumers using `formatButtonText()` from design system.

---

## Summary

**Button is a model component.** It correctly:
- Uses `mode.radius` for theming
- Uses `mode.font` for theming
- Has generic, industry-standard naming
- Has standard variant/size props
- Is fully themeable
