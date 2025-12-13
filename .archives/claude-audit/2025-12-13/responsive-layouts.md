# Responsive: Layouts

Grid systems, navigation, and container patterns for responsive design.

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
