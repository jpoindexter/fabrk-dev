# Responsive Design

Mobile-first approach with Tailwind CSS breakpoints for consistent cross-device experiences.

---

## Breakpoint Reference

| Breakpoint | Width | Target | Use |
|------------|-------|--------|-----|
| Default | <640px | Mobile phones | Base styles |
| `sm:` | ≥640px | Large phones | Minor adjustments |
| `md:` | ≥768px | Tablets | 2-column layouts |
| `lg:` | ≥1024px | Laptops | Full navigation |
| `xl:` | ≥1280px | Desktops | Wide layouts |
| `2xl:` | ≥1536px | Large screens | Max-width containers |

---

## Mobile-First Approach (REQUIRED)

### The Pattern

```tsx
// ✅ CORRECT: Mobile-first, add complexity upward
<div className="flex flex-col md:flex-row">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="text-sm md:text-base lg:text-lg">
<div className="px-4 md:px-6 lg:px-8">

// ❌ WRONG: Desktop-first, subtract downward
<div className="flex-row md:flex-col">  // Confusing cascade
<div className="grid-cols-3 md:grid-cols-2 sm:grid-cols-1">  // Backwards
```

### Why Mobile-First?

1. Forces content prioritization
2. Smaller CSS bundle (less overrides)
3. Better performance on mobile networks
4. Progressive enhancement pattern

---

## Grid Layouts

### Responsive Grids

```tsx
// Standard responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

// Feature cards
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// Dashboard layout
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">{/* Main content */}</div>
  <aside>{/* Sidebar */}</aside>
</div>

// ❌ BANNED: Non-responsive grids
<div className="grid grid-cols-3">  // Breaks on mobile
<div className="grid-cols-4">       // Missing responsive variants
```

### Column Spanning

```tsx
// Responsive spanning
<div className="col-span-1 md:col-span-2 lg:col-span-3">

// Full width on mobile, contained on desktop
<div className="col-span-full lg:col-span-2">
```

---

## Typography Scaling

### Heading Sizes

```tsx
// Page title - scales dramatically
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">

// Section title - moderate scaling
<h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">

// Subsection - minimal scaling
<h3 className="text-lg md:text-xl font-semibold">

// ❌ BANNED: Large text without responsive
<h1 className="text-5xl">  // Too large on mobile
<h2 className="text-4xl">  // Overflows on small screens
```

### Body Text

```tsx
// Body text typically doesn't need responsive sizing
<p className="text-sm font-mono text-muted-foreground">

// But ensure containers accommodate it
<p className="text-sm md:text-base">
```

---

## Container & Spacing

### Page Container

```tsx
// Standard page container
<div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">

// Full-width with max container
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Content container (narrower)
<div className="container mx-auto max-w-4xl px-4 md:px-6">
```

### Section Spacing

```tsx
// Section vertical padding
<section className="py-12 md:py-16 lg:py-20">

// Hero section (larger)
<section className="py-16 md:py-24 lg:py-32">

// Compact section
<section className="py-8 md:py-12">
```

### Element Spacing

```tsx
// Gap increases with screen size
<div className="space-y-4 md:space-y-6 lg:space-y-8">

// Grid gap scaling
<div className="grid gap-4 md:gap-6 lg:gap-8">
```

---

## Navigation Patterns

### Responsive Navigation

```tsx
// Mobile hamburger + Desktop nav
<header>
  {/* Desktop nav - hidden on mobile */}
  <nav className="hidden md:flex items-center gap-6">
    <Link>Home</Link>
    <Link>Features</Link>
    <Link>Pricing</Link>
  </nav>

  {/* Mobile menu button - hidden on desktop */}
  <Button
    className="md:hidden"
    size="icon"
    aria-label="Open menu"
  >
    <Menu className="h-5 w-5" />
  </Button>
</header>

// Mobile nav panel (Sheet or sidebar)
<Sheet>
  <SheetContent side="left" className="md:hidden">
    <nav className="flex flex-col gap-4">
      <Link>Home</Link>
      <Link>Features</Link>
      <Link>Pricing</Link>
    </nav>
  </SheetContent>
</Sheet>
```

### Sidebar Patterns

```tsx
// Collapsible sidebar
<aside className="hidden lg:block w-64">
  {/* Full sidebar on desktop */}
</aside>

// Mobile: Full-screen overlay
// Tablet: Narrow sidebar
// Desktop: Full sidebar
<aside className={cn(
  "fixed inset-y-0 left-0 z-50",
  "w-full sm:w-64 lg:w-72",
  "transform transition-transform",
  isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
)}>
```

---

## Content Visibility

### Show/Hide Patterns

```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">
  Desktop-only content
</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">
  Mobile-only content
</div>

// CRITICAL: Always provide alternative for hidden content
// ❌ WRONG: Hide important info without alternative
<nav className="hidden md:flex">Main Nav</nav>
// No mobile alternative = accessibility issue

// ✅ CORRECT: Mobile gets hamburger menu
<nav className="hidden md:flex">Main Nav</nav>
<MobileMenu className="md:hidden" />  // Alternative for mobile
```

### Progressive Disclosure

```tsx
// Full content on desktop, truncated on mobile
<p className="line-clamp-2 md:line-clamp-none">
  Long text content that gets truncated on mobile...
</p>

// Show more on larger screens
<div className="hidden lg:block">
  Additional details only visible on large screens
</div>
```

---

## Images & Media

### Responsive Images

```tsx
// Different sizes for different breakpoints
<Image
  src="/hero.jpg"
  alt="Hero image"
  className="w-full h-48 md:h-64 lg:h-96 object-cover"
/>

// Hide decorative images on mobile
<Image
  src="/decoration.svg"
  alt=""
  className="hidden md:block absolute right-0"
/>
```

### Aspect Ratios

```tsx
// Consistent aspect ratio across breakpoints
<div className="aspect-video md:aspect-[16/9] lg:aspect-[21/9]">
  <Image className="object-cover w-full h-full" />
</div>
```

---

## Form Layouts

### Single Column to Multi-Column

```tsx
// Form fields: 1 column mobile, 2 columns tablet+
<form className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label>[FIRST_NAME]:</Label>
      <Input />
    </div>
    <div className="space-y-2">
      <Label>[LAST_NAME]:</Label>
      <Input />
    </div>
  </div>

  {/* Full width fields */}
  <div className="space-y-2">
    <Label>[EMAIL]:</Label>
    <Input type="email" />
  </div>
</form>
```

### Button Groups

```tsx
// Stack on mobile, inline on desktop
<div className="flex flex-col md:flex-row gap-2 md:gap-4">
  <Button variant="outline" className="w-full md:w-auto">> CANCEL</Button>
  <Button className="w-full md:w-auto">> SUBMIT</Button>
</div>
```

---

## Table Responsiveness

### Horizontal Scroll

```tsx
// Wrap table in scrollable container
<div className="overflow-x-auto">
  <Table className="min-w-[600px]">
    {/* Table content */}
  </Table>
</div>
```

### Stack Pattern (Alternative)

```tsx
// Table on desktop, cards on mobile
<div className="hidden md:block">
  <Table>{/* Full table */}</Table>
</div>

<div className="md:hidden space-y-4">
  {items.map(item => (
    <Card key={item.id} className="p-4">
      <div className="flex justify-between">
        <span className="font-mono text-xs text-muted-foreground">[NAME]:</span>
        <span>{item.name}</span>
      </div>
      {/* More card content */}
    </Card>
  ))}
</div>
```

---

## Testing Checklist

### Viewport Testing

| Viewport | Width | Must Test |
|----------|-------|-----------|
| Small mobile | 320px | ✅ Required |
| Mobile | 375px | ✅ Required |
| Large mobile | 428px | Optional |
| Tablet portrait | 768px | ✅ Required |
| Tablet landscape | 1024px | ✅ Required |
| Desktop | 1280px | ✅ Required |
| Large desktop | 1440px | Optional |
| Ultra-wide | 1920px | Optional |

### Manual Test Checklist

- [ ] Content readable at 320px
- [ ] No horizontal scrolling (except tables)
- [ ] Touch targets ≥ 44px on mobile
- [ ] Navigation accessible on all sizes
- [ ] Images don't overflow
- [ ] Forms usable on mobile
- [ ] Text doesn't overflow containers

### Chrome DevTools Testing

```
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test at: iPhone SE (375px), iPad (768px), Desktop (1024px+)
4. Also test: Responsive mode, drag to resize
```

---

## WCAG Reflow (1.4.10)

Content must reflow at 320px width (equivalent to 400% zoom on 1280px display):

```tsx
// ✅ CORRECT: Content reflows
<div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-2">
    {/* Content stacks on mobile */}
  </div>
</div>

// ❌ WRONG: Fixed width causes overflow
<div className="w-[800px]">
  {/* Forces horizontal scroll on mobile */}
</div>

// ❌ WRONG: Non-responsive grid
<div className="grid grid-cols-4">
  {/* Content squished or overflows */}
</div>
```

---

## Quick Reference

### Common Responsive Classes

| Pattern | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Grid | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` |
| Flex direction | `flex-col` | `md:flex-row` | - |
| Padding | `px-4` | `md:px-6` | `lg:px-8` |
| Text size | `text-2xl` | `md:text-4xl` | `lg:text-5xl` |
| Visibility | `block` | `md:hidden` | - |
| Width | `w-full` | `md:w-auto` | - |

### Banned Patterns

```tsx
// ❌ Non-responsive fixed widths
w-[800px], w-[600px], min-w-[500px]

// ❌ Large text without scaling
text-5xl, text-6xl (without md:/lg: variants)

// ❌ Multi-column grids without responsive
grid-cols-3, grid-cols-4, grid-cols-6

// ❌ Hidden content without alternative
hidden md:block (if content is essential)
```
