# Design System Gaps

> Generated: 2025-12-06
> Source: PHASE 2 Full Rescan
> Status: DOCUMENTED (Not yet addressed)

---

## Overview

This document tracks gaps identified in the design system during the Phase 2 audit. These are NOT violations, but rather missing tokens, patterns, or documentation that could improve the system.

---

## Identified Gaps

### 1. Mode Object Theme Switching

**Gap**: The `mode` object in `/design-system/index.ts` is hardcoded to terminal theme.

**Current State**:
```typescript
export const mode = {
  radius: "rounded-none",
  font: "font-mono",
  // ... always terminal
};
```

**Desired State**: Dynamic theme switching based on context/user preference.

**Impact**: Low (single theme works for current product)
**Priority**: Phase 3 (IMPLEMENTATION)

---

### 2. Missing CSS Variables for Radius/Shadow

**Gap**: Semantic radius and shadow tokens exist in TS but not as CSS variables.

**Current State**:
- `primitives.radius.none` exists in TS
- `--radius-none` CSS variable does not exist

**Desired State**: All tokens available as both TS and CSS variables for full interoperability.

**Impact**: Low (components use Tailwind classes directly)
**Priority**: Phase 4 (POLISH)

---

### 3. Animation Token Standardization

**Gap**: Animation tokens (duration, easing) are defined in primitives but not consistently applied.

**Current State**:
- `primitives.animation.duration.fast = 150ms`
- Components use various hardcoded values (`duration-200`, `transition-all`)

**Suggested Standard**:
```typescript
animation: {
  duration: {
    instant: "0ms",
    fast: "150ms",
    normal: "300ms",
    slow: "500ms"
  },
  easing: {
    default: "[0.21, 0.47, 0.32, 0.98]",
    spring: "spring(1, 80, 10)"
  }
}
```

**Impact**: Medium (affects perceived quality)
**Priority**: Phase 4 (POLISH)

---

### 4. Z-Index Scale Documentation

**Gap**: No formal z-index scale documented.

**Current State**: Components use arbitrary z-index values.

**Suggested Scale**:
```typescript
zIndex: {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
  toast: 600,
  overlay: 700,
  max: 999
}
```

**Impact**: Low (no current conflicts)
**Priority**: Phase 4 (POLISH)

---

### 5. Component API Standardization

**Gap**: Some components accept different prop naming patterns.

**Examples**:
- Some: `isLoading`, Others: `loading`
- Some: `isDisabled`, Others: `disabled`
- Some: `onValueChange`, Others: `onChange`

**Suggested Standard**:
- Boolean props: no `is` prefix (`loading`, `disabled`, `selected`)
- Callbacks: match native HTML (`onChange`, `onClick`, `onBlur`)
- Custom callbacks: `onXChange` pattern

**Impact**: Medium (developer experience)
**Priority**: Phase 4 (POLISH)

---

### 6. Icon Size Tokens

**Gap**: Icon sizes are inconsistent across components.

**Current State**:
- Buttons: `h-4 w-4`
- Cards: `h-5 w-5` or `h-6 w-6`
- Headers: `size-4` or `size-5`

**Suggested Scale**:
```typescript
icon: {
  xs: "h-3 w-3",  // 12px
  sm: "h-4 w-4",  // 16px
  md: "h-5 w-5",  // 20px
  lg: "h-6 w-6",  // 24px
  xl: "h-8 w-8"   // 32px
}
```

**Impact**: Low (visual consistency)
**Priority**: Phase 4 (POLISH)

---

## Non-Gaps (Clarifications)

### Components Not Using `mode` Import

21 components don't import `mode` from `@/design-system`. This is **intentional**, not a gap:

- **Primitives**: `separator.tsx`, `skeleton.tsx`, `aspect-ratio.tsx`
- **Containers**: `container.tsx`, `stack.tsx`, `grid.tsx`
- **Utilities**: `lazy.tsx`, `scroll-area.tsx`
- **Third-party wrappers**: Components wrapping external libraries

These components either:
1. Don't need theming (utilities)
2. Inherit theming from parent components
3. Are low-level primitives without visual opinions

---

## Gap Resolution Timeline

| Gap | Priority | Target Phase |
|-----|----------|--------------|
| Mode theme switching | Phase 3 | IMPLEMENTATION |
| CSS variable parity | Phase 4 | POLISH |
| Animation tokens | Phase 4 | POLISH |
| Z-index scale | Phase 4 | POLISH |
| Prop standardization | Phase 4 | POLISH |
| Icon size tokens | Phase 4 | POLISH |

---

## Process for New Gaps

When identifying new gaps during development:

1. Add to this file with:
   - Clear description
   - Current vs desired state
   - Impact assessment
   - Priority level

2. Do NOT fix immediately unless:
   - It's a blocking issue
   - It's in the current phase scope

3. Review gaps at start of each phase

---

*Document maintained by design system team. Last updated: 2025-12-06*
