# Spacing Quick Reference

> 8-Point Grid System - Print this out!

---

## Allowed Values (On-Grid)

```
┌─────────┬────────┬─────────────┬──────────────────────┐
│ Tailwind│ Pixels │ Rem         │ Use Case             │
├─────────┼────────┼─────────────┼──────────────────────┤
│ 0       │ 0      │ 0           │ No spacing           │
│ 1       │ 4px    │ 0.25rem     │ Icon gaps, micro     │
│ 2       │ 8px    │ 0.5rem      │ Button padding, form │
│ 4       │ 16px   │ 1rem        │ Card padding, gaps   │
│ 6       │ 24px   │ 1.5rem      │ Section gaps         │
│ 8       │ 32px   │ 2rem        │ Large sections       │
│ 10      │ 40px   │ 2.5rem      │ Hero elements        │
│ 12      │ 48px   │ 3rem        │ Page sections        │
│ 16      │ 64px   │ 4rem        │ Major sections       │
│ 20      │ 80px   │ 5rem        │ Hero sections        │
│ 24      │ 96px   │ 6rem        │ Page spacing         │
│ 32      │ 128px  │ 8rem        │ Large gaps           │
└─────────┴────────┴─────────────┴──────────────────────┘
```

---

## BANNED Values (Off-Grid)

```
❌ p-3   (12px)  → Use p-2 (8px) or p-4 (16px)
❌ p-5   (20px)  → Use p-4 (16px) or p-6 (24px)
❌ p-7   (28px)  → Use p-6 (24px) or p-8 (32px)
❌ p-9   (36px)  → Use p-8 (32px) or p-10 (40px)
❌ p-11  (44px)  → Use p-10 (40px) or p-12 (48px)
❌ p-14  (56px)  → Use p-12 (48px) or p-16 (64px)
❌ p-18  (72px)  → Use p-16 (64px) or p-20 (80px)

❌ py-1.5 (6px)  → Use py-1 (4px) or py-2 (8px)
❌ px-2.5 (10px) → Use px-2 (8px) or px-4 (16px)
❌ py-28  (112px)→ Use py-24 (96px) or py-32 (128px)
```

---

## Common Patterns

### Cards
```tsx
<Card className="p-6">           // Default card padding
<Card className="p-4">           // Compact card
<Card className="p-8">           // Large card
```

### Forms
```tsx
<form className="space-y-4">     // Default form spacing
<form className="space-y-6">     // Relaxed form spacing
```

### Grids
```tsx
<div className="gap-4">          // Default grid gap
<div className="gap-6">          // Large grid gap
```

### Sections
```tsx
<section className="py-16">      // Default section
<section className="py-20">      // Large section
<section className="py-24">      // Hero section
```

### Container
```tsx
<div className="px-4 sm:px-6 lg:px-8">  // Responsive padding
```

---

## Exception: Inline Code

`px-1.5 py-0.5` is allowed ONLY for inline `<code>` and `<kbd>` elements:

```tsx
<code className="bg-muted px-1.5 py-0.5 text-xs">example</code>
```

---

## Import Usage

```tsx
import { spacing, semanticSpacing } from '@/design-system';

// Access scale
spacing.scale[4].tailwind  // "4"
spacing.scale[4].px        // 16

// Use semantic tokens
semanticSpacing.component.md.padding  // "p-4"
semanticSpacing.gap.grid              // "gap-6"
semanticSpacing.section.lg.py         // "py-20"

// Validation helpers
import { isOnGrid, suggestReplacement } from '@/design-system';

isOnGrid(3)                   // false
isOnGrid(4)                   // true
suggestReplacement("3")       // { smaller: "2", larger: "4" }
```

---

*Quick reference for Fabrk 8-point grid system*
