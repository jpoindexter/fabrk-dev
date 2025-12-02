# Spacing System (8-Point Grid)

All spacing follows the 4px base unit. Use multiples of 4px or 8px for visual consistency.

---

## Core Spacing Scale

| Token | Value | Pixels | Use |
|-------|-------|--------|-----|
| `0` | 0 | 0px | Reset |
| `0.5` | 0.125rem | 2px | Micro gaps |
| `1` | 0.25rem | 4px | Icon gaps, tight spacing |
| `1.5` | 0.375rem | 6px | Small gaps (traffic lights) |
| `2` | 0.5rem | 8px | Standard small spacing |
| `2.5` | 0.625rem | 10px | - |
| `3` | 0.75rem | 12px | ⚠️ Non-standard (use 2 or 4) |
| `4` | 1rem | 16px | Standard spacing |
| `5` | 1.25rem | 20px | ⚠️ Non-standard (use 4 or 6) |
| `6` | 1.5rem | 24px | Comfortable spacing |
| `8` | 2rem | 32px | Section spacing |
| `10` | 2.5rem | 40px | Large spacing |
| `12` | 3rem | 48px | Page section spacing |
| `16` | 4rem | 64px | Major divisions |
| `20` | 5rem | 80px | Hero spacing |
| `24` | 6rem | 96px | Extra large |

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

These break the 8-point grid and should be avoided:

```tsx
// ❌ BANNED - Use alternatives
p-3, p-5, p-7, p-9, p-11, p-13, p-14, p-15
m-3, m-5, m-7, m-9, m-11, m-13, m-14, m-15
gap-3, gap-5, gap-7, gap-9
space-y-3, space-y-5, space-y-7, space-y-9
space-x-3, space-x-5, space-x-7, space-x-9

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
<div className="p-2">     // 8px - Compact cards, tags, badges
<div className="p-4">     // 16px - Standard cards
<div className="p-6">     // 24px - Spacious cards
<div className="p-8">     // 32px - Large containers
```

### Asymmetric Padding

```tsx
<div className="px-4 py-2">   // Header bars (16px horizontal, 8px vertical)
<div className="px-4 py-3">   // Input fields (⚠️ py-3 is exception for inputs)
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

### Label to Input

```tsx
// Form field structure
<div className="space-y-2">
  <Label>[EMAIL]:</Label>
  <Input />
</div>
```

### Between Form Groups

```tsx
<form className="space-y-6">
  <div className="space-y-2">
    {/* First field group */}
  </div>
  <div className="space-y-2">
    {/* Second field group */}
  </div>
</form>
```

---

## Gap Patterns

### Flex/Grid Gaps

```tsx
<div className="gap-1">     // 4px - Icon + text
<div className="gap-1.5">   // 6px - Traffic light dots
<div className="gap-2">     // 8px - Button content, inline items
<div className="gap-4">     // 16px - Card grid, form fields
<div className="gap-6">     // 24px - Section items, card lists
<div className="gap-8">     // 32px - Major sections
```

### Space-Between (Vertical)

```tsx
<div className="space-y-1">   // 4px - Tight list (menu items)
<div className="space-y-2">   // 8px - Form fields
<div className="space-y-4">   // 16px - Standard list
<div className="space-y-6">   // 24px - Card list
<div className="space-y-8">   // 32px - Sections
<div className="space-y-12">  // 48px - Page sections
```

### Space-Between (Horizontal)

```tsx
<div className="space-x-1">   // 4px - Tight inline
<div className="space-x-2">   // 8px - Button groups
<div className="space-x-4">   // 16px - Navigation items
<div className="space-x-6">   // 24px - Section groups
```

---

## Layout Spacing

### Page Container

```tsx
<div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
  {/* Page content */}
</div>
```

### Section Container

```tsx
<section className="py-12 md:py-16 lg:py-20">
  {/* Section content */}
</section>
```

### Card with Header

```tsx
<div className="border border-border">
  <div className="border-b border-border px-4 py-2">  {/* Header */}
    <span className="font-mono text-xs">[TITLE]</span>
  </div>
  <div className="p-4">  {/* Content */}
    {/* Card content */}
  </div>
</div>
```

### Form Layout

```tsx
<form className="space-y-6">
  <div className="space-y-2">  {/* Label + input group */}
    <Label>[NAME]:</Label>
    <Input />
  </div>
  <div className="space-y-2">
    <Label>[EMAIL]:</Label>
    <Input />
  </div>
  <Button type="submit">> SUBMIT</Button>
</form>
```

---

## Grid Layouts

### Standard Grid Gaps

```tsx
// Card grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Tight grid
<div className="grid gap-2">

// Spacious grid
<div className="grid gap-6">
```

### Dashboard Layout

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    {/* Main content */}
  </div>
  <aside>
    {/* Sidebar */}
  </aside>
</div>
```

---

## Responsive Spacing

### Container Padding

```tsx
<div className="px-4 md:px-6 lg:px-8">
  {/* Increases padding on larger screens */}
</div>
```

### Section Spacing

```tsx
<section className="py-8 md:py-12 lg:py-16">
  {/* More vertical space on larger screens */}
</section>
```

### Grid Gaps

```tsx
<div className="grid gap-4 md:gap-6 lg:gap-8">
  {/* Larger gaps on larger screens */}
</div>
```

---

## Common Spacing Recipes

### Navigation Header

```tsx
<header className="border-b border-border">
  <div className="container mx-auto flex items-center justify-between px-6 py-4">
    {/* Logo */}
    <nav className="flex items-center gap-6">
      {/* Nav items */}
    </nav>
  </div>
</header>
```

### Card Component

```tsx
<div className="border border-border rounded-none">
  <div className="border-b border-border px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">[TITLE]</span>
  </div>
  <div className="p-4 space-y-4">
    {/* Content with vertical spacing */}
  </div>
  <div className="border-t border-border px-4 py-2 flex justify-end gap-2">
    <Button variant="outline">> CANCEL</Button>
    <Button>> SAVE</Button>
  </div>
</div>
```

### Feature Section

```tsx
<section className="py-16">
  <div className="container mx-auto px-6 space-y-12">
    <header className="space-y-4 text-center">
      <h2 className="text-2xl font-semibold">Section Title</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Description text
      </p>
    </header>
    <div className="grid md:grid-cols-3 gap-6">
      {/* Feature cards */}
    </div>
  </div>
</section>
```

### Form Section

```tsx
<div className="max-w-md space-y-6">
  <div className="space-y-2">
    <Label htmlFor="name">[NAME]:</Label>
    <Input id="name" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">[EMAIL]:</Label>
    <Input id="email" type="email" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="message">[MESSAGE]:</Label>
    <Textarea id="message" rows={4} />
  </div>
  <div className="flex gap-2 justify-end">
    <Button variant="outline">> CANCEL</Button>
    <Button type="submit">> SEND</Button>
  </div>
</div>
```

---

## Click Target Spacing

### Minimum Touch Targets

| Device | Minimum | Recommended |
|--------|---------|-------------|
| Mobile | 44×44px | 48×48px |
| Desktop | 24×24px | 32×32px |

```tsx
// Button with adequate spacing
<Button className="h-10 px-4">  // 40px height, 16px horizontal padding
  > SUBMIT
</Button>

// Icon button
<Button size="icon" className="h-10 w-10">  // 40×40px
  <X className="h-4 w-4" />
</Button>

// List item with clickable area
<button className="w-full px-4 py-3 text-left hover:bg-muted">
  {/* Content */}
</button>
```

---

## Quick Reference Checklist

### Before Every Commit

- [ ] Using 8-point grid values (p-2, p-4, p-6, p-8, p-12, p-16)
- [ ] No banned values (p-3, p-5, p-7, p-9, etc.)
- [ ] Form fields use `space-y-2` for label-input gap
- [ ] Form groups use `space-y-6` between groups
- [ ] Card headers use `px-4 py-2`
- [ ] Card content uses `p-4` or `p-6`
- [ ] Page sections use `py-12` or larger
- [ ] Grid gaps use `gap-4` or `gap-6`
- [ ] Touch targets are at least 40px

### Common Patterns

| Context | Spacing |
|---------|---------|
| Label to input | `space-y-2` |
| Between form fields | `space-y-6` |
| Card padding | `p-4` or `p-6` |
| Header bar | `px-4 py-2` |
| Page section | `py-12` |
| Grid gaps | `gap-4` or `gap-6` |
| Button groups | `gap-2` |
| Navigation items | `gap-6` |
