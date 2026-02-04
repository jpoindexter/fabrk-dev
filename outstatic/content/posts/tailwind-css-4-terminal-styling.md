---
title: 'Tailwind CSS 4: Native OKLCH and Modern Styling'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'tailwind-css-4-terminal-styling'
description: 'Fabrk uses Tailwind CSS 4 with native OKLCH support, CSS variables, and modern features for efficient terminal-inspired styling.'
publishedAt: '2026-01-20T10:00:00.000Z'
---

**The latest Tailwind with native OKLCH support.**

---

## Tailwind CSS 4

Fabrk uses Tailwind CSS 4, which brings:

- Native OKLCH color support
- CSS-first configuration
- Improved performance
- Better dark mode handling
- Container queries

---

## OKLCH Integration

Tailwind 4 natively supports OKLCH colors:

```css
/* globals.css */
:root {
  --background: oklch(0.15 0.02 280);
  --foreground: oklch(0.95 0.01 280);
  --primary: oklch(0.7 0.2 280);
  --muted: oklch(0.4 0.05 280);
}
```

all 18 themes use OKLCH for perceptually uniform colors.

---

## CSS Variables

Tailwind 4 uses CSS variables by default:

```css
/* Theme colors map to CSS variables */
.bg-background {
  background-color: var(--background);
}

.text-foreground {
  color: var(--foreground);
}

.border-border {
  border-color: var(--border);
}
```

Theme switching updates variables, not classes.

---

## Dynamic Radius

The `rounded-dynamic` class uses a CSS variable:

```css
/* globals.css */
:root {
  --radius: 0px; /* Sharp corners (terminal) */
}

[data-theme="modern"] {
  --radius: 8px; /* Rounded corners */
}

/* Tailwind class */
.rounded-dynamic {
  border-radius: var(--radius);
}
```

One class, dynamic values per theme.

---

## Configuration

Tailwind 4 uses CSS-first configuration:

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* Define custom colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-muted: var(--muted);

  /* Define custom spacing */
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
}
```

---

## Using Theme Colors

Apply colors with Tailwind classes:

```tsx
// Background colors
<div className="bg-background" />
<div className="bg-card" />
<div className="bg-muted" />
<div className="bg-primary" />

// Text colors
<span className="text-foreground" />
<span className="text-muted-foreground" />
<span className="text-primary" />

// Border colors
<div className="border border-border" />
<div className="border border-primary" />
```

---

## Monospace Typography

Terminal styling uses monospace fonts:

```css
/* globals.css */
@theme {
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

```tsx
// Apply monospace
<p className="font-mono">Terminal text</p>

// Body has it globally
<body className="font-mono antialiased">
```

---

## Dark Mode

Tailwind 4 handles dark mode elegantly:

```css
/* Light mode */
:root {
  --background: oklch(0.98 0.01 280);
  --foreground: oklch(0.15 0.02 280);
}

/* Dark mode */
.dark {
  --background: oklch(0.15 0.02 280);
  --foreground: oklch(0.95 0.01 280);
}
```

Terminal themes are dark by default.

---

## Container Queries

Tailwind 4 includes container queries:

```tsx
// Parent defines container
<div className="@container">
  {/* Child responds to container size */}
  <div className="@md:flex @lg:grid">
    Responsive to container, not viewport
  </div>
</div>
```

Useful for responsive components in any context.

---

## Common Patterns

### Card with Terminal Styling

```tsx
<div className="border border-border bg-card p-4 rounded-dynamic font-mono">
  <span className="text-muted-foreground text-xs">[ CARD ]</span>
  <p className="text-foreground">Content</p>
</div>
```

### Button

```tsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-dynamic font-mono text-xs uppercase">
  > ACTION
</button>
```

### Input

```tsx
<input
  className="border border-border bg-background text-foreground px-3 py-2 rounded-dynamic font-mono focus:ring-2 focus:ring-primary"
/>
```

---

## Arbitrary Values

When you need custom values:

```tsx
// Use brackets for arbitrary values
<div className="w-[347px] h-[72px]" />

// But prefer design tokens when possible
<div className="w-full h-16" />
```

---

## Responsive Design

Standard Tailwind breakpoints:

```tsx
<div className="
  p-4
  md:p-6
  lg:p-8
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
">
```

---

## Pseudo-Classes

Tailwind handles states naturally:

```tsx
<button className="
  bg-primary
  hover:bg-primary/90
  focus:ring-2
  focus:ring-primary
  disabled:opacity-50
  disabled:cursor-not-allowed
">
```

---

## The cn() Utility

Combine classes safely with `cn()`:

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  // Base styles
  'border border-border',
  // Mode styles
  mode.radius,
  // Conditional styles
  isActive && 'bg-primary',
  isDisabled && 'opacity-50',
  // Custom className
  className
)}>
```

`cn()` merges Tailwind classes without conflicts.

---

## Performance

Tailwind 4 improves performance:

- Smaller CSS output
- Better tree-shaking
- Faster build times
- Optimized runtime

---

## Best Practices

1. **Use design tokens** - `bg-primary` not `bg-purple-500`
2. **Use CSS variables** - For theme-aware values
3. **Use cn()** - For conditional classes
4. **Avoid arbitrary values** - When tokens exist
5. **Keep classes organized** - Base, state, responsive

---

## Resources

- `src/app/globals.css` - All CSS variable definitions
- `src/design-system/index.ts` - Mode object
- `src/lib/utils.ts` - cn() utility

Tailwind 4, terminal-styled.

