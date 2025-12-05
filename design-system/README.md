# Fabrk Design System

A comprehensive, token-driven design system for building consistent, themeable SaaS applications.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DESIGN SYSTEM                            │
├─────────────────────────────────────────────────────────────────┤
│  TOKENS (What)                                                  │
│  ├── primitives  → Raw values (4px, 16px, oklch colors)        │
│  ├── semantic    → Purpose-based (bg-surface, text-muted)      │
│  └── components  → Component-specific (button.size.lg)         │
├─────────────────────────────────────────────────────────────────┤
│  THEMES (How)                                                   │
│  ├── visual modes → Shape/feel (terminal, modern, minimal)     │
│  └── color themes → Colors (light, dark, dracula, etc.)        │
├─────────────────────────────────────────────────────────────────┤
│  SCALES (Standards)                                             │
│  ├── typography  → Type scale, heading hierarchy               │
│  └── spacing     → 8-point grid, semantic spacing              │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Provider Setup

In your root layout:

```tsx
import { ThemeProvider, ThemeScript } from "@/design-system/providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Prevents flash of unstyled content */}
        <ThemeScript
          storageKeyPrefix="fabrk"
          defaultColorTheme="dark"
          defaultVisualMode="terminal"
        />
      </head>
      <body>
        <ThemeProvider
          defaultColorTheme="dark"
          defaultVisualMode="terminal"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Using Theme Context (Client Components)

```tsx
"use client";

import { useThemeContext } from "@/design-system/providers";

function ThemeSwitcher() {
  const { colorTheme, setColorTheme, visualMode, setVisualMode, isDark, toggleDark } =
    useThemeContext();

  return (
    <div>
      <button onClick={toggleDark}>{isDark ? "Light" : "Dark"}</button>
      <select
        value={visualMode}
        onChange={(e) => setVisualMode(e.target.value)}
      >
        <option value="terminal">Terminal</option>
        <option value="modern">Modern</option>
        <option value="minimal">Minimal</option>
        <option value="linear">Linear</option>
      </select>
    </div>
  );
}
```

### 3. Using Static Mode (Server Components)

```tsx
import { mode } from "@/lib/design-system";

function Card({ children }) {
  return (
    <div className={cn("border bg-card", mode.radius, mode.font)}>
      {children}
    </div>
  );
}
```

### 4. Using Design Tokens Hook

```tsx
"use client";

import { useTokens } from "@/design-system/hooks";

function Button({ children }) {
  const { button, cn, spacing } = useTokens();

  return (
    <button
      className={cn(
        button.base,
        button.size.default.height,
        button.variant.default.base,
        spacing.component.md
      )}
    >
      {children}
    </button>
  );
}
```

## Visual Modes

| Mode | Description | Radius | Font | Use Case |
|------|-------------|--------|------|----------|
| `terminal` | Sharp, angular, monospace | `rounded-none` | `font-mono` | Developer tools, CLI apps |
| `modern` | Rounded, clean, shadows | `rounded-lg` | `font-sans` | SaaS dashboards |
| `minimal` | Subtle, borderless | `rounded-md` | `font-sans` | Content-focused apps |
| `linear` | Linear.app inspired | `rounded-lg` | `font-sans` | Project management |

## Color Themes

20 built-in themes from DaisyUI:

**Light:** light, cupcake, bumblebee, emerald, corporate, retro, cyberpunk, valentine, lofi, pastel, fantasy, autumn

**Dark:** dark, synthwave, halloween, forest, aqua, luxury, dracula, business

## Spacing System (8-Point Grid)

```
Base unit: 4px

Scale:
- 0: 0px
- 1: 4px   (xs)
- 2: 8px   (sm)
- 4: 16px  (md)
- 6: 24px  (lg)
- 8: 32px  (xl)
- 12: 48px (2xl)
- 16: 64px (3xl)

BANNED (off-grid):
- 3: 12px ❌
- 5: 20px ❌
- 7: 28px ❌
- 9: 36px ❌
```

## Typography Scale

```
Headings:
- h1: text-3xl (30px) font-bold
- h2: text-2xl (24px) font-semibold
- h3: text-xl (20px) font-semibold
- h4: text-lg (18px) font-medium
- h5: text-base (16px) font-medium
- h6: text-sm (14px) font-medium

Body:
- Large: text-base (16px)
- Default: text-sm (14px)
- Small: text-xs (12px)
```

## File Structure

```
design-system/
├── index.ts              # Main exports
├── tokens/
│   ├── primitives.ts     # Raw values
│   ├── semantic.ts       # Purpose-based tokens
│   └── components.ts     # Component tokens
├── themes/
│   ├── theme.types.ts    # Type definitions
│   ├── terminal.ts       # Terminal mode config
│   └── modern.ts         # Modern/minimal/linear configs
├── typography/
│   └── scale.ts          # Type scale definitions
├── spacing/
│   └── scale.ts          # Spacing scale definitions
├── css/
│   ├── tokens.css        # CSS custom properties
│   ├── utilities.css     # Utility classes
│   └── reset.css         # CSS reset
├── hooks/
│   ├── use-theme.ts      # Theme state hook
│   ├── use-visual-mode.ts # Visual mode hook
│   └── use-tokens.ts     # Token access hook
├── providers/
│   └── ThemeProvider.tsx # React context provider
└── utils/
    ├── generate-css.ts   # CSS generation utilities
    └── validate-tokens.ts # Token validation
```

## API Reference

### ThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultColorTheme` | `ColorThemeName` | `"dark"` | Initial color theme |
| `defaultVisualMode` | `VisualModeName` | `"terminal"` | Initial visual mode |
| `storageKeyPrefix` | `string` | `"fabrk"` | localStorage key prefix |
| `persist` | `boolean` | `true` | Persist to localStorage |
| `forcedColorTheme` | `ColorThemeName` | - | Force specific theme |
| `forcedVisualMode` | `VisualModeName` | - | Force specific mode |

### useThemeContext Return Value

| Property | Type | Description |
|----------|------|-------------|
| `colorTheme` | `ColorThemeName` | Current color theme |
| `setColorTheme` | `(theme) => void` | Set color theme |
| `isDark` | `boolean` | Whether theme is dark |
| `toggleDark` | `() => void` | Toggle light/dark |
| `visualMode` | `VisualModeName` | Current visual mode |
| `setVisualMode` | `(mode) => void` | Set visual mode |
| `mounted` | `boolean` | SSR hydration state |
| `reset` | `() => void` | Reset to defaults |

### useTokens Return Value

| Property | Type | Description |
|----------|------|-------------|
| `button` | `object` | Button token definitions |
| `input` | `object` | Input token definitions |
| `card` | `object` | Card token definitions |
| `colors` | `object` | Color token definitions |
| `spacing` | `object` | Spacing scale |
| `cn` | `function` | Class name utility |
| `responsive` | `function` | Responsive class builder |

## Validation

Check for design system violations:

```tsx
import { validateAll, validateFile } from "@/design-system";

// Validate a class string
const result = validateAll("p-3 m-4 gap-6");
// Returns: { spacing: { valid: false, violations: ['p-3'] }, ... }

// Validate a file
const fileResult = validateFile(fileContent);
```

## Migration Guide

### From Static Mode to Dynamic

**Before (static):**
```tsx
import { mode } from "@/lib/design-system";
<div className={mode.radius} />
```

**After (dynamic):**
```tsx
import { useThemeContext } from "@/design-system/providers";
const { visualMode } = useThemeContext();
// Use visualMode to conditionally apply classes
```

### Compatibility

The static `mode` export is still available for server components and backwards compatibility. Use `useThemeContext` for client components that need dynamic theme switching.
