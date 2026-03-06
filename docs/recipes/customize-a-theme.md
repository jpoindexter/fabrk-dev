# Customize a Theme

FABRK ships with 18 terminal themes built on OKLCH color tokens. Here is how they work and how to create your own.

---

## How Themes Work

Every theme is a set of CSS custom properties defined in `src/app/globals.css`. The default theme (Green CRT) lives in `:root`. Other themes use `[data-theme='name']` selectors.

Colors use **OKLCH format**: `lightness% chroma hue`

```css
/* OKLCH breakdown */
--primary: 40% 0.25 140;
/*          |    |    |
            |    |    └── hue (0-360, like a color wheel)
            |    └─────── chroma (0-0.4, saturation intensity)
            └──────────── lightness (0%-100%) */
```

The `data-theme` attribute on `<html>` controls which theme is active. The `ThemeDropdown` component handles switching.

### Theme Token Map

Each theme must define these tokens:

| Token | Purpose |
|-------|---------|
| `--background` | Page background |
| `--foreground` | Default text color |
| `--card` / `--card-foreground` | Card surfaces |
| `--popover` / `--popover-foreground` | Dropdown/popover surfaces |
| `--primary` / `--primary-foreground` | Primary action color |
| `--secondary` / `--secondary-foreground` | Secondary elements |
| `--muted` / `--muted-foreground` | Subdued backgrounds/text |
| `--accent` / `--accent-foreground` | Accent highlights |
| `--destructive` / `--destructive-foreground` | Error/delete actions |
| `--border` | Default border color |
| `--input` | Input border color |
| `--ring` | Focus ring color |
| `--success` / `--warning` / `--info` | Status colors |
| `--chart-1` through `--chart-9` | Chart data series |

## Modify an Existing Theme

To tweak the default green theme, edit the `:root` block in `src/app/globals.css`:

```css
:root {
  /* Make the green brighter */
  --foreground: 88% 0.32 140;
  /* Warmer green (shift hue toward yellow) */
  --primary: 40% 0.25 130;
}
```

To tweak a named theme, find its `[data-theme='...']` block:

```css
[data-theme='amber'] {
  /* Shift amber hue slightly warmer */
  --primary: 55% 0.28 50;
}
```

## Create a New Theme

### Step 1: Add CSS Variables

Add a new block in `src/app/globals.css` after the existing themes:

```css
/* Cyberpunk Neon - Hot pink on dark */
[data-theme='neon'] {
  --background: 5% 0.01 330;
  --foreground: 85% 0.3 330;
  --card: 8% 0.02 330;
  --card-foreground: 85% 0.3 330;
  --popover: 10% 0.03 330;
  --popover-foreground: 85% 0.3 330;
  --primary: 55% 0.3 330;
  --primary-foreground: 5% 0.01 330;
  --secondary: 70% 0.28 330;
  --secondary-foreground: 5% 0.01 330;
  --muted: 18% 0.05 330;
  --muted-foreground: 68% 0.22 330;
  --accent: 75% 0.3 330;
  --accent-foreground: 5% 0.01 330;
  --destructive: 80% 0.32 330;
  --destructive-foreground: 5% 0.01 330;
  --border: 42% 0.2 330;
  --input: 42% 0.2 330;
  --ring: 60% 0.25 330;

  --success: 65% 0.28 330;
  --success-foreground: 5% 0.01 330;
  --warning: 70% 0.26 330;
  --warning-foreground: 5% 0.01 330;
  --info: 60% 0.24 330;
  --info-foreground: 5% 0.01 330;

  --chart-1: 65% 0.28 330;
  --chart-2: 55% 0.24 330;
  --chart-3: 70% 0.26 330;
  --chart-4: 60% 0.22 330;
  --chart-5: 50% 0.2 330;
  --chart-6: 75% 0.3 330;
  --chart-7: 45% 0.18 330;
  --chart-8: 62% 0.25 330;
  --chart-9: 58% 0.23 330;

  /* Semantic mappings (copy from any existing theme) */
  --color-bg-canvas: var(--background);
  --color-bg-surface: var(--card);
  --color-bg-elevated: var(--popover);
  --color-bg-sunken: var(--muted);
  --color-text-primary: var(--foreground);
  --color-text-secondary: var(--muted-foreground);
  --color-text-tertiary: var(--secondary-foreground);
  --color-text-inverse: var(--primary-foreground);
  --color-text-disabled: var(--muted-foreground);
  --color-border-default: var(--border);
  --color-border-muted: var(--input);
  --color-border-strong: var(--ring);
  --color-border-focus: var(--ring);
  --color-status-success: var(--success);
  --color-status-success-bg: var(--success);
  --color-status-warning: var(--warning);
  --color-status-warning-bg: var(--warning);
  --color-status-error: var(--destructive);
  --color-status-error-bg: var(--destructive);
  --color-status-info: var(--info);
  --color-status-info-bg: var(--info);

  /* Code syntax highlighting */
  --code-fg: oklch(65% 0.25 330);
  --code-bg: oklch(8% 0.02 330);
  --code-comment: oklch(50% 0.15 330);
  --code-string: oklch(60% 0.22 330);
  --code-punctuation: oklch(50% 0.2 330);
  --code-number: oklch(55% 0.22 330);
  --code-keyword: oklch(65% 0.25 330);
  --code-function: oklch(70% 0.28 330);
  --code-selector: oklch(60% 0.22 330);
}
```

### Step 2: Register in Theme Dropdown

Find the theme list in your theme dropdown component and add your new theme:

```ts
{ value: 'neon', label: 'Neon' },
```

### Step 3: Optional -- Add CRT Body Styles

If your theme should use a custom body font or background effect, add:

```css
[data-theme='neon'] body {
  --font-body: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --font-headline: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
```

## The Mode System

Components do not reference CSS variables directly. They use the `mode` object from `@/design-system`:

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

// mode.radius  -> "rounded-dynamic" (resolves to var(--radius))
// mode.font    -> "font-mono"
// mode.color.bg.base  -> "bg-background"
// mode.color.text.primary -> "text-foreground"

<div className={cn('border border-border', mode.radius, mode.color.bg.surface)}>
  <p className={mode.color.text.muted}>Themed text</p>
</div>
```

This means your new theme works automatically -- every component already uses semantic tokens that resolve to your CSS variables.

## Quick Reference: OKLCH Hue Values

| Hue | Color |
|-----|-------|
| 0 | Red |
| 30 | Orange |
| 60 | Yellow |
| 90 | Yellow-green |
| 120-140 | Green |
| 180 | Cyan |
| 200-220 | Blue |
| 270 | Purple |
| 300 | Magenta |
| 330 | Pink/Hot pink |

## Validation

```bash
npm run validate:themes
```

This checks that all required tokens are defined for each theme.
