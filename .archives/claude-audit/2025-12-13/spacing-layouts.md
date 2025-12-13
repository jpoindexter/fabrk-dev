# Spacing: Layout Recipes

Common layout patterns and responsive spacing.

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
  <div className="border-b border-border px-4 py-2">
    <span className="font-mono text-xs">[TITLE]</span>
  </div>
  <div className="p-4">
    {/* Card content */}
  </div>
</div>
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
```

### Section Spacing

```tsx
<section className="py-8 md:py-12 lg:py-16">
```

### Grid Gaps

```tsx
<div className="grid gap-4 md:gap-6 lg:gap-8">
```

---

## Common Recipes

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
    {/* Content */}
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
| Mobile | 44x44px | 48x48px |
| Desktop | 24x24px | 32x32px |

```tsx
// Button with adequate spacing
<Button className="h-10 px-4">
  > SUBMIT
</Button>

// Icon button
<Button size="icon" className="h-10 w-10">
  <X className="h-4 w-4" />
</Button>

// Clickable list item
<button className="w-full px-4 py-3 text-left hover:bg-muted">
  {/* Content */}
</button>
```

---

## Quick Reference

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
