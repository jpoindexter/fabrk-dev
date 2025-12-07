# Design System Tokens Audit

> Phase 1 Inventory - Observation Only (No Changes)

## Color System

### Theme Architecture

- **20 color themes** defined in `globals.css`
- **Color format**: OKLCH (Oklab Lightness Chroma Hue)
- **Switching mechanism**: DaisyUI data-theme attribute

### Base Semantic Colors (per theme)

| Token                      | Purpose               |
| -------------------------- | --------------------- |
| `--background`             | Page background       |
| `--foreground`             | Primary text          |
| `--card`                   | Card backgrounds      |
| `--card-foreground`        | Card text             |
| `--popover`                | Popover backgrounds   |
| `--popover-foreground`     | Popover text          |
| `--primary`                | Primary brand color   |
| `--primary-foreground`     | Text on primary       |
| `--secondary`              | Secondary brand color |
| `--secondary-foreground`   | Text on secondary     |
| `--muted`                  | Muted backgrounds     |
| `--muted-foreground`       | Muted text            |
| `--accent`                 | Accent color          |
| `--accent-foreground`      | Text on accent        |
| `--destructive`            | Error/danger color    |
| `--destructive-foreground` | Text on destructive   |
| `--success`                | Success color         |
| `--warning`                | Warning color         |
| `--border`                 | Border color          |
| `--input`                  | Input border color    |
| `--ring`                   | Focus ring color      |

### Available Themes

1. light (default)
2. dark
3. cupcake
4. bumblebee
5. emerald
6. corporate
7. synthwave
8. retro
9. cyberpunk
10. valentine
11. halloween
12. garden
13. forest
14. aqua
15. lofi
16. pastel
17. fantasy
18. wireframe
19. black
20. luxury

### Color Usage Patterns Found

- Semantic tokens: `bg-primary`, `text-foreground`, `border-border`
- Opacity variants: `bg-primary/10`, `text-muted-foreground/80`
- Chart colors: `--chart-1` through `--chart-5`

---

## Typography System

### Font Families

| Token       | Value                     | CSS Variable        |
| ----------- | ------------------------- | ------------------- |
| `font-sans` | System sans-serif stack   | `--font-geist-sans` |
| `font-mono` | JetBrains Mono, monospace | `--font-geist-mono` |

### Font Size Scale (Major Third - 1.25 ratio)

| Class       | Size            | Line Height    | Use Case                 |
| ----------- | --------------- | -------------- | ------------------------ |
| `text-xs`   | 12px (0.75rem)  | 16px (1rem)    | Captions, labels, badges |
| `text-sm`   | 14px (0.875rem) | 20px (1.25rem) | Body small, UI elements  |
| `text-base` | 16px (1rem)     | 24px (1.5rem)  | Body default             |
| `text-lg`   | 18px (1.125rem) | 28px (1.75rem) | Lead text                |
| `text-xl`   | 20px (1.25rem)  | 28px (1.75rem) | Small headings           |
| `text-2xl`  | 24px (1.5rem)   | 32px (2rem)    | Section headings         |
| `text-3xl`  | 30px (1.875rem) | 36px (2.25rem) | Page headings            |
| `text-4xl`  | 36px (2.25rem)  | 40px (2.5rem)  | Hero headings            |
| `text-5xl`  | 48px (3rem)     | 48px (1)       | Display                  |
| `text-6xl`  | 60px (3.75rem)  | 60px (1)       | Display large            |
| `text-7xl`  | 72px (4.5rem)   | 72px (1)       | Display xl               |
| `text-8xl`  | 96px (6rem)     | 96px (1)       | Display 2xl              |
| `text-9xl`  | 128px (8rem)    | 128px (1)      | Display 3xl              |

### Font Weights

| Class           | Weight | Use Case         |
| --------------- | ------ | ---------------- |
| `font-normal`   | 400    | Body text        |
| `font-medium`   | 500    | Emphasized text  |
| `font-semibold` | 600    | Headings, labels |
| `font-bold`     | 700    | Strong emphasis  |

### Typography Hierarchy (from typography/scale.ts)

#### Headings - App Context

| Level | Classes                                 |
| ----- | --------------------------------------- |
| h1    | `text-3xl font-semibold tracking-tight` |
| h2    | `text-2xl font-semibold tracking-tight` |
| h3    | `text-xl font-semibold`                 |
| h4    | `text-lg font-semibold`                 |

#### Headings - Docs Context

| Level | Classes                                 |
| ----- | --------------------------------------- |
| h1    | `text-4xl font-semibold tracking-tight` |
| h2    | `text-3xl font-semibold tracking-tight` |
| h3    | `text-2xl font-semibold`                |
| h4    | `text-xl font-semibold`                 |

#### Headings - Marketing Context

| Level | Classes                                 |
| ----- | --------------------------------------- |
| h1    | `text-5xl font-semibold tracking-tight` |
| h2    | `text-4xl font-semibold tracking-tight` |
| h3    | `text-3xl font-semibold`                |
| h4    | `text-2xl font-semibold`                |

#### Body Text Variants

| Variant | Classes                         |
| ------- | ------------------------------- |
| lead    | `text-lg text-muted-foreground` |
| default | `text-base`                     |
| small   | `text-sm`                       |
| xs      | `text-xs`                       |
| muted   | `text-sm text-muted-foreground` |

#### UI Text Variants

| Variant | Classes                         |
| ------- | ------------------------------- |
| button  | `text-sm font-semibold`         |
| label   | `text-sm font-semibold`         |
| caption | `text-xs text-muted-foreground` |
| badge   | `text-xs font-semibold`         |
| nav     | `text-sm font-medium`           |
| tab     | `text-sm font-medium`           |

---

## Spacing System

### 8-Point Grid Foundation

Base unit: 4px (0.25rem)

### Allowed Spacing Values

| Tailwind | Pixels | Rem     |
| -------- | ------ | ------- |
| 0        | 0px    | 0       |
| 1        | 4px    | 0.25rem |
| 2        | 8px    | 0.5rem  |
| 4        | 16px   | 1rem    |
| 6        | 24px   | 1.5rem  |
| 8        | 32px   | 2rem    |
| 10       | 40px   | 2.5rem  |
| 12       | 48px   | 3rem    |
| 16       | 64px   | 4rem    |
| 20       | 80px   | 5rem    |
| 24       | 96px   | 6rem    |
| 32       | 128px  | 8rem    |
| 40       | 160px  | 10rem   |
| 48       | 192px  | 12rem   |
| 64       | 256px  | 16rem   |

### BANNED Spacing Values (Off-Grid)

| Value | Pixels | Alternative                |
| ----- | ------ | -------------------------- |
| 3     | 12px   | Use 2 (8px) or 4 (16px)    |
| 5     | 20px   | Use 4 (16px) or 6 (24px)   |
| 7     | 28px   | Use 6 (24px) or 8 (32px)   |
| 9     | 36px   | Use 8 (32px) or 10 (40px)  |
| 11    | 44px   | Use 10 (40px) or 12 (48px) |
| 14    | 56px   | Use 12 (48px) or 16 (64px) |
| 18    | 72px   | Use 16 (64px) or 20 (80px) |

### Semantic Spacing Tokens

| Token                  | Value | Use Case                |
| ---------------------- | ----- | ----------------------- |
| `component.xs.padding` | p-1   | Tight components        |
| `component.sm.padding` | p-2   | Small components        |
| `component.md.padding` | p-4   | Default components      |
| `component.lg.padding` | p-6   | Large components        |
| `component.xl.padding` | p-8   | Extra large components  |
| `gap.tight`            | gap-1 | Inline elements         |
| `gap.items`            | gap-2 | List items              |
| `gap.default`          | gap-4 | Default gap             |
| `gap.grid`             | gap-6 | Grid layouts            |
| `gap.section`          | gap-8 | Between sections        |
| `section.sm`           | py-8  | Small section padding   |
| `section.md`           | py-12 | Default section padding |
| `section.lg`           | py-16 | Large section padding   |
| `section.xl`           | py-24 | Hero section padding    |

---

## Border Radius System

### Available Values

| Token          | Value  | Use Case                    |
| -------------- | ------ | --------------------------- |
| `rounded-none` | 0px    | **Terminal mode (PRIMARY)** |
| `rounded-sm`   | 2px    | Subtle rounding             |
| `rounded`      | 4px    | Default rounding            |
| `rounded-md`   | 6px    | Medium rounding             |
| `rounded-lg`   | 8px    | Large rounding              |
| `rounded-xl`   | 12px   | Extra large                 |
| `rounded-2xl`  | 16px   | 2x extra large              |
| `rounded-3xl`  | 24px   | 3x extra large              |
| `rounded-full` | 9999px | Circular                    |

### Terminal Mode Enforcement

- **Current mode**: `sharp` (rounded-none)
- **Enforcement**: All components should use `mode.radius` from design-system
- **CSS utility**: `.terminal-preview` forces `rounded-none` on all children

---

## Shadow System

### Available Values

| Token         | Value                                                               |
| ------------- | ------------------------------------------------------------------- |
| `shadow-none` | none                                                                |
| `shadow-sm`   | 0 1px 2px 0 rgb(0 0 0 / 0.05)                                       |
| `shadow`      | 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)       |
| `shadow-md`   | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)    |
| `shadow-lg`   | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)  |
| `shadow-xl`   | 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) |
| `shadow-2xl`  | 0 25px 50px -12px rgb(0 0 0 / 0.25)                                 |

### Terminal Mode

- **Preferred**: `shadow-sm` or `shadow-none`
- **BANNED**: `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl` (too soft for terminal aesthetic)

---

## Visual Mode System

### Current Configuration

```typescript
export const CURRENT_MODE: VisualMode = "sharp";

export const mode = {
  radius: "rounded-none",
  font: "font-mono",
  buttonPrefix: "> ",
  labelFormat: "brackets",
  cardHeader: "bracketed",
  textTransform: "uppercase",
};
```

### Available Modes

| Mode    | Radius       | Font      | Button Prefix | Text Transform |
| ------- | ------------ | --------- | ------------- | -------------- |
| sharp   | rounded-none | font-mono | "> "          | uppercase      |
| soft    | rounded-lg   | font-sans | ""            | capitalize     |
| playful | rounded-2xl  | font-sans | ""            | normal         |

### Helper Functions

- `formatLabel(text)` - Applies bracket format: `[TEXT]:`
- `formatButtonText(text)` - Applies prefix and case: `> TEXT`
- `formatCardTitle(text)` - Applies header format: `[ [0x00] TEXT ]`

---

## CSS Custom Properties

### From globals.css

```css
:root {
  --radius: 0rem; /* Terminal mode */
  --background: oklch(100% 0 0);
  --foreground: oklch(14.9% 0.028 264.07);
  /* ... 20+ semantic color tokens */
}
```

### Chart Colors

- `--chart-1` through `--chart-5` for data visualization

---

## Terminal Utilities (from globals.css)

### Custom Classes

| Class               | Purpose                         |
| ------------------- | ------------------------------- |
| `.terminal-label`   | `[LABEL]:` format styling       |
| `.terminal-bracket` | Bracket styling                 |
| `.terminal-cmd`     | Command prefix styling          |
| `.terminal-preview` | Forces rounded-none on children |

### Accessibility Utilities

| Class          | Purpose                  |
| -------------- | ------------------------ |
| `.sr-only`     | Screen reader only       |
| `.not-sr-only` | Remove sr-only           |
| `.focus-ring`  | Consistent focus styling |

---

## Duplicates and Near-Duplicates Found

### Typography

1. **TYPOGRAPHY object** (legacy) vs **typography/scale.ts** (new)
   - Both define heading hierarchies
   - TYPOGRAPHY marked as @deprecated

2. **TERMINAL_TYPOGRAPHY** vs **DOCS_TYPOGRAPHY**
   - Both marked as @deprecated
   - Overlap with typography/scale.ts

### Spacing

1. **SPACING object** (legacy) vs **spacing/scale.ts** (new)
   - SPACING marked as @deprecated
   - spacing/scale.ts is authoritative

### Mode Configuration

1. **mode object** (simple export) vs **legacyVisualModes** (full config)
   - mode is derived from legacyVisualModes[CURRENT_MODE]
   - Some components import mode, others use tokens directly

---

## Token Count Summary

| Category                 | Count                              |
| ------------------------ | ---------------------------------- |
| Color themes             | 20                                 |
| Semantic color tokens    | 21 per theme                       |
| Font sizes               | 13 (xs through 9xl)                |
| Font weights             | 4 (normal, medium, semibold, bold) |
| Spacing values (allowed) | 17                                 |
| Spacing values (banned)  | 7                                  |
| Border radius options    | 9                                  |
| Shadow levels            | 7                                  |
| Visual modes             | 3                                  |
| Typography hierarchies   | 3 (app, docs, marketing)           |
| Body text variants       | 5                                  |
| UI text variants         | 6                                  |

---

_Generated: Phase 1 Audit - Observation Only_
