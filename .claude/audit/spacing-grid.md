# Spacing: 8-Point Grid

Core spacing scale and padding/margin patterns.

---

## Core Spacing Scale

| Token | Value | Pixels | Use |
|-------|-------|--------|-----|
| `0` | 0 | 0px | Reset |
| `0.5` | 0.125rem | 2px | Micro gaps |
| `1` | 0.25rem | 4px | Icon gaps, tight spacing |
| `1.5` | 0.375rem | 6px | Small gaps (traffic lights) |
| `2` | 0.5rem | 8px | Standard small spacing |
| `4` | 1rem | 16px | Standard spacing |
| `6` | 1.5rem | 24px | Comfortable spacing |
| `8` | 2rem | 32px | Section spacing |
| `12` | 3rem | 48px | Page section spacing |
| `16` | 4rem | 64px | Major divisions |

---

## Preferred Values (8-Point Grid)

| Name | Value | Tailwind | Use |
|------|-------|----------|-----|
| xs | 4px | `p-1`, `m-1`, `gap-1` | Inline, tight groupings |
| sm | 8px | `p-2`, `m-2`, `gap-2` | Component internal |
| md | 16px | `p-4`, `m-4`, `gap-4` | Standard spacing |
| lg | 24px | `p-6`, `m-6`, `gap-6` | Comfortable sections |
| xl | 32px | `p-8`, `m-8`, `gap-8` | Major sections |
| 2xl | 48px | `p-12`, `m-12`, `gap-12` | Page sections |
| 3xl | 64px | `p-16`, `m-16`, `gap-16` | Page divisions |

---

## BANNED Spacing Values

```tsx
// ❌ BANNED - Break 8-point grid
p-3, p-5, p-7, p-9, p-11, p-13, p-14, p-15
m-3, m-5, m-7, m-9, m-11, m-13, m-14, m-15
gap-3, gap-5, gap-7, gap-9
space-y-3, space-y-5, space-y-7, space-y-9

// ✅ PREFERRED - 8-point grid
p-2, p-4, p-6, p-8, p-12, p-16
m-2, m-4, m-6, m-8, m-12, m-16
gap-2, gap-4, gap-6, gap-8
space-y-2, space-y-4, space-y-6, space-y-8
```

---

## Padding Patterns

### Component Internal Padding

```tsx
<div className="p-1">     // 4px - Icon buttons
<div className="p-2">     // 8px - Compact cards, tags
<div className="p-4">     // 16px - Standard cards
<div className="p-6">     // 24px - Spacious cards
<div className="p-8">     // 32px - Large containers
```

### Asymmetric Padding

```tsx
<div className="px-4 py-2">   // Header bars
<div className="px-4 py-3">   // Input fields (exception)
<div className="px-6 py-4">   // Card content
<div className="px-6 py-12">  // Page sections
```

### Header/Footer Bars

```tsx
// Terminal-style header
<div className="border-b border-border px-4 py-2">
  {/* Header content */}
</div>

// Card footer
<div className="border-t border-border px-4 py-2">
  {/* Footer content */}
</div>
```

---

## Margin Patterns

### Element Spacing

```tsx
<div className="mt-1">    // 4px - Tight
<div className="mt-2">    // 8px - Standard small
<div className="mt-4">    // 16px - Standard
<div className="mt-6">    // 24px - Comfortable
<div className="mt-8">    // 32px - Section gap
```

### Form Field Spacing

```tsx
// Label to input
<div className="space-y-2">
  <Label>[EMAIL]:</Label>
  <Input />
</div>

// Between form groups
<form className="space-y-6">
  <div className="space-y-2">{/* Field 1 */}</div>
  <div className="space-y-2">{/* Field 2 */}</div>
</form>
```

---

## Gap Patterns

### Flex/Grid Gaps

```tsx
<div className="gap-1">     // 4px - Icon + text
<div className="gap-1.5">   // 6px - Traffic light dots
<div className="gap-2">     // 8px - Button content
<div className="gap-4">     // 16px - Card grid
<div className="gap-6">     // 24px - Section items
<div className="gap-8">     // 32px - Major sections
```

### Space-Between

```tsx
// Vertical
<div className="space-y-2">   // Form fields
<div className="space-y-4">   // Standard list
<div className="space-y-6">   // Card list
<div className="space-y-12">  // Page sections

// Horizontal
<div className="space-x-2">   // Button groups
<div className="space-x-4">   // Navigation items
<div className="space-x-6">   // Section groups
```
