# Utilities Component Family Audit

**Last Updated:** 2025-12-07
**Category:** Utilities
**Status:** ✅ DS-COMPLIANT

---

## Components in Family

| Component                 | File                              | Status                            |
| ------------------------- | --------------------------------- | --------------------------------- |
| Spinner                   | `src/components/ui/loading.tsx`   | ✅ Compliant                      |
| Skeleton (in loading.tsx) | `src/components/ui/loading.tsx`   | ✅ Compliant                      |
| LoadingContainer          | `src/components/ui/loading.tsx`   | ✅ Compliant                      |
| LoadingButton             | `src/components/ui/loading.tsx`   | ✅ Compliant                      |
| Skeleton (standalone)     | `src/components/ui/skeleton.tsx`  | ✅ Compliant                      |
| Separator                 | `src/components/ui/separator.tsx` | ✅ Compliant (accepted-exception) |

---

## Token Usage Summary

| Component              | mode import | mode.radius | mode.font   | Notes                           |
| ---------------------- | ----------- | ----------- | ----------- | ------------------------------- |
| Spinner                | ✅ Line 14  | N/A         | N/A         | SVG icon, no text/border        |
| Skeleton (loading.tsx) | ✅ Line 14  | ✅ Line 93  | N/A         | Placeholder element             |
| LoadingContainer       | ✅ Line 14  | N/A         | ✅ Line 120 | Container with text             |
| LoadingButton          | ✅ Line 14  | Via Button  | Via Button  | Uses Button component           |
| Skeleton (standalone)  | ✅ Line 3   | ✅ Line 8   | N/A         | Placeholder element             |
| Separator              | N/A         | N/A         | N/A         | 1px line, tokens not applicable |

---

## Component Details

### 1. Spinner (`loading.tsx`)

**Token Implementation:**

- Line 14: `import { mode } from "@/design-system"`
- SVG spinner - no mode.radius/mode.font needed

**Color Tokens:**

- `text-primary` - spinner color (Line 45)

**Size System:**

- `sm`: h-4 w-4 (16px)
- `md`: h-8 w-8 (32px) - default
- `lg`: h-12 w-12 (48px)

**Accessibility:**

- `role="status"` for screen readers
- `aria-label="Loading"` for context
- `aria-hidden="true"` on decorative SVG
- `<span className="sr-only">` for screen reader text

### 2. Skeleton (in loading.tsx)

**Token Implementation:**

- Line 14: `import { mode } from "@/design-system"`
- Line 93: `mode.radius`

**Color Tokens:**

- `bg-card` - background color
- `border-border` - border color

**Variant System:**

- `text`: h-4 w-full
- `circular`: custom dimensions
- `rectangular`: custom dimensions

### 3. LoadingContainer (`loading.tsx`)

**Token Implementation:**

- Line 14: `import { mode } from "@/design-system"`
- Line 120: `mode.font` on text content

**Color Tokens:**

- `text-muted-foreground` - loading message text

**Features:**

- Full-page/section loading state
- Uses Spinner size="lg"
- Optional children for custom loading message

### 4. LoadingButton (`loading.tsx`)

**Token Implementation:**

- Inherits from Button component (mode.radius, mode.font)

**Features:**

- `loading` prop shows spinner
- `loadingText` prop for custom loading text
- Automatically disables when loading

### 5. Skeleton (standalone - `skeleton.tsx`)

**Token Implementation:**

- Line 3: `import { mode } from "@/design-system"`
- Line 8: `mode.radius`

**Color Tokens:**

- `bg-muted` - background color

**Features:**

- Simpler implementation for basic skeleton needs
- `animate-pulse` animation

### 6. Separator (`separator.tsx`)

**Token Implementation:**

- No mode import - intentionally not needed
- Uses `bg-border` semantic token (Line 23)

**Why mode.radius N/A:**

- Separator is a 1px line (`h-[1px]` or `w-[1px]`)
- Border radius has no visual effect on 1px elements
- This is an accepted exception, not a violation

**Orientation Support:**

- `horizontal`: h-[1px] w-full (default)
- `vertical`: h-full w-[1px]

**Accessibility:**

- `role="separator"` or `role="none"` based on `decorative` prop
- `aria-orientation` when not decorative

---

## Violations Status

| ID   | Component | Issue                   | Status             | Notes                                                           |
| ---- | --------- | ----------------------- | ------------------ | --------------------------------------------------------------- |
| V002 | Separator | Missing mode tokens     | accepted-exception | 1px line - mode.radius not applicable; uses bg-border correctly |
| V009 | Loading   | Template literal syntax | fixed              | Commit 331656b7 - now uses plain strings                        |

---

## Theme Readiness

All Utilities family components are **theme-ready**:

1. **Radius switching**: Skeleton uses `mode.radius` - will adapt to theme radius
2. **Font switching**: LoadingContainer uses `mode.font` - will adapt to theme font
3. **Color tokens**: All colors use semantic tokens:
   - `text-primary` - Spinner
   - `bg-card`, `border-border` - Skeleton (loading.tsx)
   - `bg-muted` - Skeleton (standalone)
   - `text-muted-foreground` - LoadingContainer text
   - `bg-border` - Separator

---

## Code Quality Notes

### Template Literals (V009 - Fixed)

Previously, `loading.tsx` used template literals around static strings:

```tsx
// Before (V009)
className={`h-4 w-4`}

// After (Fixed)
sizeClasses = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" }
```

This was a code-quality issue, not a DS violation. Now fixed.

### Separator Exception (V002)

The Separator component intentionally doesn't use mode tokens:

- It's a 1px divider line
- `mode.radius` would have no visual effect on a 1px element
- `mode.font` not applicable (no text)
- Uses `bg-border` which is the correct semantic token

This is an **accepted architectural decision**, not a violation.

---

## Demo/Docs Customizations

Documentation pages may show customized utility components:

- `bg-primary` on Separator for visibility
- `h-[2px]` for thicker separators
- Custom Skeleton dimensions

These are **intentional demonstration customizations** and do not violate the design system.

---

## Final Status

**✅ UTILITIES FAMILY IS FULLY DS-COMPLIANT AND THEME-READY**

- 6 components audited (including sub-components in loading.tsx)
- 1 fixed violation (V009 - template literals)
- 1 accepted exception (V002 - Separator 1px line)
- 0 remaining real DS violations
- All components properly use semantic color tokens
- Skeleton and LoadingContainer correctly use mode.radius and mode.font
