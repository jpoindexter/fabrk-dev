# UI Components Design Audit

> **Location:** `src/components/ui/`
> **Compliance Score:** 95/100

---

## Summary

The UI component library demonstrates excellent design system compliance. Components properly use the Visual Mode System (`mode.radius`, `mode.font`) for flexible theming. Only minor issues found.

---

## Critical Findings

### 1. InputGroup Shadow Violation

**File:** `src/components/ui/input-group.tsx`
**Line:** 45

**Issue:** Uses `shadow-xs` on static element

```tsx
className={cn(
  "group/input-group border-input dark:bg-input/30 relative flex w-full items-center border shadow-xs transition-[color,box-shadow]...",
)}
```

**Problems:**
1. `shadow-xs` is not a standard Tailwind utility (only shadow, shadow-sm, shadow-md, etc.)
2. Terminal aesthetic prohibits shadows on static elements
3. Current Visual Mode is "sharp" which specifies `shadow: ""` (no shadows)

**Fix:**
```tsx
// Remove shadow-xs entirely
className={cn(
  "group/input-group border-input dark:bg-input/30 relative flex w-full items-center border transition-[color,box-shadow]...",
)}
```

---

### 2. Grid Component Off-Grid Variants

**File:** `src/components/ui/grid.tsx`
**Lines:** 38-43

**Issue:** Defines off-grid gap values

```tsx
const gapVariants = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-5",   // OFF-GRID (20px)
  "3xl": "gap-7",   // OFF-GRID (28px)
  "4xl": "gap-9",   // OFF-GRID (36px)
  "5xl": "gap-10",  // OFF-GRID (40px)
};
```

**Fix:** Remove or remap off-grid values:
```tsx
const gapVariants = {
  none: "gap-0",
  sm: "gap-2",    // 8px
  md: "gap-4",    // 16px
  lg: "gap-6",    // 24px
  xl: "gap-8",    // 32px
  "2xl": "gap-12", // 48px (corrected)
  "3xl": "gap-16", // 64px (corrected)
};
```

---

### 3. Stack Component Off-Grid Variants

**File:** `src/components/ui/stack.tsx`
**Lines:** 29-34

**Issue:** Same as Grid component - defines off-grid gap values

**Fix:** Apply same correction as Grid component.

---

## Compliant Patterns

### Button Component
**File:** `src/components/ui/button.tsx`

Properly implements Visual Mode System:
```tsx
className={cn(
  buttonVariants({ variant, size }),
  mode.radius,    // Gets from design system
  mode.font,      // Gets from design system
  mode.textTransform === "uppercase" && "uppercase",
  className
)}
```

### Card Component
**File:** `src/components/ui/card.tsx`

Properly implements terminal styling:
```tsx
// Card
className={cn(
  "bg-card text-card-foreground border",
  mode.radius,
  "transition-colors",
  className
)}

// StyledCardHeader
className="border-b border-border px-4 py-2"
// With proper terminal title format
```

### Input Component
**File:** `src/components/ui/input.tsx`

Properly uses design system:
```tsx
className={cn(
  "bg-background flex h-8 w-full border px-4 py-2 text-xs font-normal transition-colors",
  mode.radius,
  mode.font,
  className
)}
```

### Select Component
**File:** `src/components/ui/select.tsx`

Correctly applies terminal styling to trigger and content.

### Dialog Component
**File:** `src/components/ui/dialog.tsx`

Properly implements modal styling with design tokens.

### Alert Dialog Component
**File:** `src/components/ui/alert-dialog.tsx`

Correctly uses terminal styling for dialog content.

---

## Component Checklist

| Component | mode.radius | mode.font | Color Tokens | Shadows | Status |
|-----------|-------------|-----------|--------------|---------|--------|
| accordion | Yes | Yes | Yes | None | Compliant |
| alert | Yes | Yes | Yes | None | Compliant |
| alert-dialog | Yes | Yes | Yes | None | Compliant |
| autocomplete | Yes | Yes | Yes | None | Compliant |
| avatar | Yes (rounded-full) | Yes | Yes | None | Compliant |
| badge | Yes | Yes | Yes | None | Compliant |
| button | Yes | Yes | Yes | None | Compliant |
| calendar | Yes | Yes | Yes | None | Compliant |
| card | Yes | Yes | Yes | None | Compliant |
| checkbox | Yes | Yes | Yes | None | Compliant |
| combobox | Yes | Yes | Yes | None | Compliant |
| command | Yes | Yes | Yes | shadow-sm (allowed) | Compliant |
| dialog | Yes | Yes | Yes | None | Compliant |
| dropdown-menu | Yes | Yes | Yes | shadow-sm (allowed) | Compliant |
| form | Yes | Yes | Yes | None | Compliant |
| grid | Yes | Yes | Yes | None | **Off-grid gaps** |
| input | Yes | Yes | Yes | None | Compliant |
| input-group | Yes | Yes | Yes | **shadow-xs** | **Violation** |
| label | Yes | Yes | Yes | None | Compliant |
| menubar | Yes | Yes | Yes | shadow-sm (allowed) | Compliant |
| navigation-menu | Yes | Yes | Yes | shadow-sm (allowed) | Compliant |
| popover | Yes | Yes | Yes | None | Compliant |
| progress | Yes | Yes | Yes | None | Compliant |
| radio-group | Yes | Yes | Yes | None | Compliant |
| scroll-area | Yes | Yes | Yes | None | Compliant |
| select | Yes | Yes | Yes | None | Compliant |
| separator | N/A | N/A | Yes | None | Compliant |
| sheet | Yes | Yes | Yes | None | Compliant |
| skeleton | Yes | Yes | Yes | None | Compliant |
| slider | Yes | Yes | Yes | shadow-sm (thumb only) | Compliant |
| stack | Yes | Yes | Yes | None | **Off-grid gaps** |
| switch | Yes | Yes | Yes | shadow-sm (thumb only) | Compliant |
| table | Yes | Yes | Yes | None | Compliant |
| tabs | Yes | Yes | Yes | None | Compliant |
| textarea | Yes | Yes | Yes | None | Compliant |
| toast | Yes | Yes | Yes | None | Compliant |
| tooltip | Yes | Yes | Yes | None | Compliant |

---

## Shadow Usage Analysis

### Allowed Shadows (Floating Interactive Elements)

Per design system, `shadow-sm` is allowed on:
- Slider thumb (`slider.tsx`)
- Switch toggle (`switch.tsx`)
- Command palette (`command.tsx`)
- Navigation dropdowns (`navigation-menu.tsx`, `menubar.tsx`)

### Violation

- `input-group.tsx` - Uses `shadow-xs` on static container

---

## Recommended Fixes

### Priority 1: Critical

1. **Remove shadow-xs from input-group.tsx**
   - Line 45: Remove `shadow-xs` from className

2. **Fix Grid gap variants**
   - Lines 38-43: Remove or remap off-grid values

3. **Fix Stack spacing variants**
   - Lines 29-34: Remove or remap off-grid values

### Priority 2: Enhancement

4. **Document allowed shadow exceptions**
   - Add comments in slider, switch, command, navigation-menu, menubar explaining why shadow-sm is allowed

---

## Files to Update

| File | Priority | Change |
|------|----------|--------|
| `input-group.tsx` | Critical | Remove shadow-xs |
| `grid.tsx` | Critical | Fix gap variants |
| `stack.tsx` | Critical | Fix spacing variants |
