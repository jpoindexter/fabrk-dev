---
title: 'The Mode Object: Theme-Aware Styling Made Simple'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'mode-design-system-object'
description: 'How Fabrk''s mode object provides consistent, theme-aware styling across all 62+ components. One import, perfect theming.'
publishedAt: '2026-01-25T10:00:00.000Z'
---

**One object. Perfect theming. Every component.**

---

## The Theming Problem

Building theme-aware components typically requires:

- Checking current theme context
- Conditional class names
- Multiple style variations
- Remembering which classes to use where

It's tedious and error-prone.

---

## Enter the Mode Object

Fabrk's `mode` object provides all theme-aware classes in one place:

```typescript
import { mode } from '@/design-system';

// That's it. Now use mode.* for theming.
```

---

## What Mode Provides

```typescript
const mode = {
  // Border radius (dynamic via CSS variable)
  radius: 'rounded-dynamic',

  // Font family (monospace)
  font: 'font-mono',

  // Background colors
  color: {
    bg: {
      base: 'bg-background',
      card: 'bg-card',
      muted: 'bg-muted',
      primary: 'bg-primary',
    },

    // Text colors
    text: {
      base: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
    },

    // Border colors
    border: {
      base: 'border-border',
      primary: 'border-primary',
    },
  },

  // Spacing (8-point grid)
  spacing: {
    xs: 'p-1',  // 4px
    sm: 'p-2',  // 8px
    md: 'p-4',  // 16px
    lg: 'p-6',  // 24px
    xl: 'p-8',  // 32px
  },
};
```

---

## Usage Examples

### Basic Card

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

<div className={cn(
  'border border-border bg-card p-4',
  mode.radius,
  mode.font
)}>
  Terminal-styled card
</div>
```

### Button

```tsx
<button className={cn(
  'bg-primary text-primary-foreground px-4 py-2',
  mode.radius,
  mode.font
)}>
  > SUBMIT
</button>
```

### Input

```tsx
<input
  className={cn(
    'border border-border bg-background px-3 py-2',
    'focus:ring-2 focus:ring-primary',
    mode.radius,
    mode.font
  )}
/>
```

---

## Dynamic Border Radius

The `mode.radius` class maps to a CSS variable:

```css
/* globals.css */
:root {
  --radius: 0px; /* Sharp corners (terminal) */
}

[data-theme="modern"] {
  --radius: 8px; /* Rounded corners */
}
```

Components automatically adapt to the active theme.

---

## When to Use mode.radius

**DO use mode.radius for:**
- Cards with full borders
- Buttons
- Inputs
- Modals/dialogs
- Badges

**DON'T use mode.radius for:**
- Partial borders (`border-t`, `border-b`)
- Table cells (`<td>`, `<th>`)
- Switches (always `rounded-full`)

---

## The cn() Utility

Always use `cn()` for conditional classes:

```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  // Base classes
  'border border-border',
  // Mode classes
  mode.radius,
  mode.font,
  // Conditional classes
  isActive && 'bg-primary',
  isDisabled && 'opacity-50'
)}>
```

`cn()` is a wrapper around `clsx` and `tailwind-merge`.

---

## Color Tokens

Never hardcode colors. Use design tokens:

```tsx
// GOOD - theme-aware
<div className="bg-primary text-primary-foreground" />

// BAD - breaks in other themes
<div className="bg-purple-500 text-white" />
```

Available tokens:

| Background | Text | Border |
|------------|------|--------|
| `bg-background` | `text-foreground` | `border-border` |
| `bg-card` | `text-muted-foreground` | `border-primary` |
| `bg-muted` | `text-primary` | |
| `bg-primary` | `text-destructive` | |
| `bg-secondary` | `text-success` | |
| `bg-destructive` | | |

---

## Component Integration

all 62 UI components use the mode object internally:

```tsx
// components/ui/card.tsx
export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'border border-border bg-card',
        mode.radius,
        className
      )}
      {...props}
    />
  );
}
```

When you use `<Card>`, theming is automatic.

---

## Custom Components

When building custom components, follow the pattern:

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  className?: string;
}

export function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div className={cn(
      'border border-border bg-card p-4',
      mode.radius,
      className
    )}>
      <span className="text-muted-foreground font-mono text-xs uppercase">
        [ {label} ]
      </span>
      <p className="font-mono text-2xl text-foreground">
        {value}
      </p>
    </div>
  );
}
```

---

## Theme Switching

Themes are applied via `data-theme` attribute:

```tsx
// Theme switcher sets this
document.documentElement.setAttribute('data-theme', 'dracula');
```

All components using `mode` update automatically.

---

## Best Practices

1. **Always import mode** - `import { mode } from '@/design-system'`
2. **Always use cn()** - For combining classes
3. **Never hardcode colors** - Use design tokens
4. **Apply mode.radius to full borders** - Skip for partial borders
5. **Apply mode.font for monospace** - Terminal aesthetic

---

## Getting Started

```tsx
// 1. Import
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// 2. Use
<div className={cn('border bg-card', mode.radius, mode.font)}>
  Content
</div>
```

One object. Consistent theming. Every time.

