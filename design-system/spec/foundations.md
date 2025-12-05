# Design System Foundations

> Complete token definitions for colors, typography, spacing, radii, shadows, breakpoints, and layout.

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography Scale](#typography-scale)
3. [Spacing Scale](#spacing-scale)
4. [Border Radius](#border-radius)
5. [Shadows & Elevation](#shadows--elevation)
6. [Breakpoints](#breakpoints)
7. [Layout & Grid](#layout--grid)
8. [Motion & Transitions](#motion--transitions)

---

## Color System

### Architecture

Colors are organized in three layers:

```
┌─────────────────────────────────────────────────────────┐
│  SEMANTIC COLORS (what components use)                  │
│  color-bg-surface, color-text-primary, color-accent     │
├─────────────────────────────────────────────────────────┤
│  PALETTE COLORS (theme-specific)                        │
│  gray-50...gray-950, primary-50...primary-950           │
├─────────────────────────────────────────────────────────┤
│  PRIMITIVE VALUES (raw colors)                          │
│  oklch(98% 0.01 240), hsl(0, 0%, 100%)                  │
└─────────────────────────────────────────────────────────┘
```

### Semantic Color Tokens

#### Background Colors

| Token | Role | Light Default | Dark Default |
|-------|------|---------------|--------------|
| `color-bg-base` | Page background | gray-50 | gray-950 |
| `color-bg-surface` | Card/panel background | white | gray-900 |
| `color-bg-surface-raised` | Elevated surface (modals) | white | gray-850 |
| `color-bg-surface-sunken` | Inset areas | gray-100 | gray-950 |
| `color-bg-surface-overlay` | Overlays, backdrops | black/50% | black/80% |
| `color-bg-muted` | Subtle backgrounds | gray-100 | gray-800 |
| `color-bg-accent` | Primary action backgrounds | primary-600 | primary-500 |
| `color-bg-accent-muted` | Subtle accent backgrounds | primary-50 | primary-950 |
| `color-bg-accent-hover` | Accent hover state | primary-700 | primary-400 |
| `color-bg-danger` | Destructive backgrounds | red-600 | red-500 |
| `color-bg-danger-muted` | Subtle danger backgrounds | red-50 | red-950 |
| `color-bg-success` | Success backgrounds | green-600 | green-500 |
| `color-bg-success-muted` | Subtle success backgrounds | green-50 | green-950 |
| `color-bg-warning` | Warning backgrounds | amber-500 | amber-400 |
| `color-bg-warning-muted` | Subtle warning backgrounds | amber-50 | amber-950 |
| `color-bg-info` | Informational backgrounds | blue-600 | blue-500 |
| `color-bg-info-muted` | Subtle info backgrounds | blue-50 | blue-950 |

#### Text Colors

| Token | Role | Light Default | Dark Default |
|-------|------|---------------|--------------|
| `color-text-primary` | Primary content | gray-900 | gray-50 |
| `color-text-secondary` | Secondary content | gray-700 | gray-300 |
| `color-text-muted` | Tertiary, placeholder | gray-500 | gray-500 |
| `color-text-disabled` | Disabled state | gray-400 | gray-600 |
| `color-text-inverse` | Text on accent bg | white | gray-950 |
| `color-text-accent` | Links, emphasis | primary-600 | primary-400 |
| `color-text-accent-hover` | Link hover | primary-700 | primary-300 |
| `color-text-danger` | Error text | red-600 | red-400 |
| `color-text-success` | Success text | green-600 | green-400 |
| `color-text-warning` | Warning text | amber-600 | amber-400 |
| `color-text-info` | Info text | blue-600 | blue-400 |

#### Border Colors

| Token | Role | Light Default | Dark Default |
|-------|------|---------------|--------------|
| `color-border-default` | Standard borders | gray-200 | gray-800 |
| `color-border-muted` | Subtle borders | gray-100 | gray-850 |
| `color-border-strong` | Emphasized borders | gray-300 | gray-700 |
| `color-border-accent` | Accent borders | primary-600 | primary-500 |
| `color-border-danger` | Error borders | red-500 | red-500 |
| `color-border-success` | Success borders | green-500 | green-500 |
| `color-border-focus` | Focus rings | primary-500 | primary-400 |

#### Interactive Colors

| Token | Role | Usage |
|-------|------|-------|
| `color-interactive-hover` | Hover overlay | bg + 5% darken |
| `color-interactive-active` | Active/pressed | bg + 10% darken |
| `color-interactive-focus` | Focus ring | 2px ring, color-border-focus |

### Palette Scale

Each palette has 11 stops (50-950):

```
50   - Lightest (backgrounds, subtle tints)
100  - Very light (hover states on light)
200  - Light (borders on light)
300  - Light-mid
400  - Mid-light
500  - Base (icons, mid-range)
600  - Mid-dark (primary buttons light mode)
700  - Dark (hover states)
800  - Very dark (text on light)
900  - Darkest (primary text on light)
950  - Ultra dark (backgrounds on dark)
```

#### Gray Palette (Neutral)

| Stop | OKLCH Value | Hex Approx |
|------|-------------|------------|
| 50 | `oklch(98% 0.005 240)` | #fafafa |
| 100 | `oklch(96% 0.005 240)` | #f4f4f5 |
| 200 | `oklch(92% 0.005 240)` | #e4e4e7 |
| 300 | `oklch(87% 0.005 240)` | #d4d4d8 |
| 400 | `oklch(70% 0.005 240)` | #a1a1aa |
| 500 | `oklch(55% 0.005 240)` | #71717a |
| 600 | `oklch(45% 0.005 240)` | #52525b |
| 700 | `oklch(37% 0.01 240)` | #3f3f46 |
| 800 | `oklch(27% 0.01 240)` | #27272a |
| 900 | `oklch(21% 0.01 240)` | #18181b |
| 950 | `oklch(14% 0.01 240)` | #09090b |

#### Primary Palette (Accent)

Default: Purple (can be overridden per brand)

| Stop | OKLCH Value | Hex Approx |
|------|-------------|------------|
| 50 | `oklch(97% 0.02 290)` | #faf5ff |
| 100 | `oklch(94% 0.04 290)` | #f3e8ff |
| 200 | `oklch(88% 0.08 290)` | #e9d5ff |
| 300 | `oklch(79% 0.14 290)` | #d8b4fe |
| 400 | `oklch(70% 0.18 290)` | #c084fc |
| 500 | `oklch(60% 0.20 290)` | #a855f7 |
| 600 | `oklch(52% 0.22 290)` | #9333ea |
| 700 | `oklch(45% 0.22 290)` | #7e22ce |
| 800 | `oklch(38% 0.20 290)` | #6b21a8 |
| 900 | `oklch(32% 0.18 290)` | #581c87 |
| 950 | `oklch(22% 0.15 290)` | #3b0764 |

#### Status Palettes

**Red (Danger)**
| Stop | OKLCH Value |
|------|-------------|
| 500 | `oklch(60% 0.22 25)` |
| 600 | `oklch(52% 0.24 25)` |

**Green (Success)**
| Stop | OKLCH Value |
|------|-------------|
| 500 | `oklch(65% 0.18 145)` |
| 600 | `oklch(55% 0.18 145)` |

**Amber (Warning)**
| Stop | OKLCH Value |
|------|-------------|
| 500 | `oklch(80% 0.16 85)` |
| 600 | `oklch(70% 0.18 75)` |

**Blue (Info)**
| Stop | OKLCH Value |
|------|-------------|
| 500 | `oklch(60% 0.18 250)` |
| 600 | `oklch(52% 0.20 250)` |

---

## Typography Scale

### Font Families

| Token | Stack | Usage |
|-------|-------|-------|
| `font-family-sans` | `"Inter", system-ui, sans-serif` | Body text, UI |
| `font-family-mono` | `"JetBrains Mono", "Fira Code", monospace` | Code, terminal |
| `font-family-display` | `"Inter", system-ui, sans-serif` | Headlines (optional) |

### Type Scale

Based on **Major Third** ratio (1.25) with 16px base.

| Token | Size (px) | Size (rem) | Line Height | Usage |
|-------|-----------|------------|-------------|-------|
| `text-size-2xs` | 10 | 0.625 | 1.4 | Micro labels |
| `text-size-xs` | 12 | 0.75 | 1.33 | Captions, badges |
| `text-size-sm` | 14 | 0.875 | 1.43 | Body small, UI |
| `text-size-base` | 16 | 1 | 1.5 | Body default |
| `text-size-lg` | 18 | 1.125 | 1.56 | Lead text |
| `text-size-xl` | 20 | 1.25 | 1.4 | H5, section titles |
| `text-size-2xl` | 24 | 1.5 | 1.33 | H4 |
| `text-size-3xl` | 30 | 1.875 | 1.27 | H3 |
| `text-size-4xl` | 36 | 2.25 | 1.22 | H2 |
| `text-size-5xl` | 48 | 3 | 1.17 | H1 |
| `text-size-6xl` | 60 | 3.75 | 1.1 | Display |
| `text-size-7xl` | 72 | 4.5 | 1.05 | Hero |
| `text-size-8xl` | 96 | 6 | 1 | Giant |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `text-weight-normal` | 400 | Body text |
| `text-weight-medium` | 500 | Emphasized body, labels |
| `text-weight-semibold` | 600 | Headings, buttons |
| `text-weight-bold` | 700 | Strong emphasis |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `text-leading-none` | 1 | Display text |
| `text-leading-tight` | 1.25 | Headings |
| `text-leading-snug` | 1.375 | Compact body |
| `text-leading-normal` | 1.5 | Body text |
| `text-leading-relaxed` | 1.625 | Readable prose |
| `text-leading-loose` | 2 | Spacious text |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `text-tracking-tighter` | -0.05em | Large display |
| `text-tracking-tight` | -0.025em | Headings |
| `text-tracking-normal` | 0 | Body |
| `text-tracking-wide` | 0.025em | Buttons, caps |
| `text-tracking-wider` | 0.05em | All-caps labels |
| `text-tracking-widest` | 0.1em | Sparse caps |

### Composite Typography Tokens

| Token | Composition | Usage |
|-------|-------------|-------|
| `text-heading-1` | 5xl / bold / tight | Page titles |
| `text-heading-2` | 4xl / semibold / tight | Section titles |
| `text-heading-3` | 3xl / semibold / tight | Subsection titles |
| `text-heading-4` | 2xl / semibold / snug | Card titles |
| `text-heading-5` | xl / semibold / snug | Group titles |
| `text-heading-6` | lg / semibold / snug | Label titles |
| `text-body-lg` | lg / normal / relaxed | Lead paragraphs |
| `text-body` | base / normal / normal | Default body |
| `text-body-sm` | sm / normal / normal | Compact body |
| `text-caption` | xs / normal / normal | Help text, meta |
| `text-label` | sm / medium / normal | Form labels |
| `text-button` | sm / semibold / normal | Button text |
| `text-code` | sm / normal / mono | Inline code |
| `text-code-block` | xs / normal / mono | Code blocks |

---

## Spacing Scale

### Base Unit: 4px

All spacing derives from a 4px base unit, creating an **8-point grid** with half-step support.

### Spacing Tokens

| Token | Value (px) | Value (rem) | Usage |
|-------|------------|-------------|-------|
| `space-0` | 0 | 0 | Reset |
| `space-px` | 1 | 0.0625 | Hairline |
| `space-0.5` | 2 | 0.125 | Micro |
| `space-1` | 4 | 0.25 | Tight |
| `space-2` | 8 | 0.5 | Compact |
| `space-3` | 12 | 0.75 | Small |
| `space-4` | 16 | 1 | Default |
| `space-5` | 20 | 1.25 | Medium |
| `space-6` | 24 | 1.5 | Comfortable |
| `space-8` | 32 | 2 | Large |
| `space-10` | 40 | 2.5 | Extra large |
| `space-12` | 48 | 3 | Section small |
| `space-16` | 64 | 4 | Section medium |
| `space-20` | 80 | 5 | Section large |
| `space-24` | 96 | 6 | Section XL |
| `space-32` | 128 | 8 | Hero |
| `space-40` | 160 | 10 | Giant |
| `space-48` | 192 | 12 | Massive |
| `space-64` | 256 | 16 | Maximum |

### Semantic Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `space-component-padding-xs` | space-1 (4px) | Tight padding (badges) |
| `space-component-padding-sm` | space-2 (8px) | Small padding (chips) |
| `space-component-padding-md` | space-4 (16px) | Default padding (cards) |
| `space-component-padding-lg` | space-6 (24px) | Large padding (modals) |
| `space-component-padding-xl` | space-8 (32px) | Extra large |
| `space-component-gap-xs` | space-1 (4px) | Tight gaps |
| `space-component-gap-sm` | space-2 (8px) | Small gaps (icon+text) |
| `space-component-gap-md` | space-4 (16px) | Default gaps |
| `space-component-gap-lg` | space-6 (24px) | Large gaps (cards) |
| `space-section-sm` | space-8 (32px) | Small section padding |
| `space-section-md` | space-12 (48px) | Default section |
| `space-section-lg` | space-16 (64px) | Large section |
| `space-section-xl` | space-24 (96px) | Hero section |
| `space-page-padding` | space-6 (24px) | Page gutter |
| `space-stack-sm` | space-2 (8px) | Tight vertical rhythm |
| `space-stack-md` | space-4 (16px) | Default vertical rhythm |
| `space-stack-lg` | space-6 (24px) | Loose vertical rhythm |

### Grid Alignment Note

**Preferred values** (8-point grid):
- `0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64`

**Acceptable values** (4-point steps):
- `1, 3, 5` (for fine adjustments)

**Avoid:**
- Arbitrary values like `7, 9, 11, 13, 14, 15, 18`

---

## Border Radius

### Radius Scale

| Token | Value (px) | Usage |
|-------|------------|-------|
| `radius-none` | 0 | Terminal/sharp theme |
| `radius-sm` | 2 | Subtle rounding |
| `radius-md` | 6 | Default rounding |
| `radius-lg` | 8 | Prominent rounding |
| `radius-xl` | 12 | Large rounding |
| `radius-2xl` | 16 | Extra large |
| `radius-3xl` | 24 | Statement rounding |
| `radius-full` | 9999 | Circular/pill |

### Semantic Radius Tokens

| Token | Default | Terminal | Modern | Soft |
|-------|---------|----------|--------|------|
| `radius-button` | md | none | md | lg |
| `radius-input` | md | none | md | lg |
| `radius-card` | lg | none | lg | xl |
| `radius-modal` | xl | none | xl | 2xl |
| `radius-badge` | full | sm | full | full |
| `radius-avatar` | full | sm | full | full |
| `radius-chip` | full | sm | full | full |

---

## Shadows & Elevation

### Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-none` | none | Flat elements |
| `shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle lift |
| `shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Cards |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Dropdowns |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Modals |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Popovers |
| `shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | High elevation |
| `shadow-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` | Inset elements |

### Elevation Levels

| Token | Shadow | Z-Index | Usage |
|-------|--------|---------|-------|
| `elevation-0` | none | auto | Base level |
| `elevation-1` | xs | 10 | Subtle cards |
| `elevation-2` | sm | 20 | Cards, buttons |
| `elevation-3` | md | 30 | Dropdowns |
| `elevation-4` | lg | 40 | Modals, sheets |
| `elevation-5` | xl | 50 | Popovers, toasts |

### Theme-Specific Shadows

| Theme | Card Shadow | Dropdown Shadow |
|-------|-------------|-----------------|
| Terminal | none | sm |
| Modern | sm | md |
| Soft | md | lg |

---

## Breakpoints

### Breakpoint Values

| Token | Min Width | Max Width | Target |
|-------|-----------|-----------|--------|
| `breakpoint-xs` | 0 | 479px | Mobile portrait |
| `breakpoint-sm` | 480px | 639px | Mobile landscape |
| `breakpoint-md` | 640px | 767px | Tablet portrait |
| `breakpoint-lg` | 768px | 1023px | Tablet landscape |
| `breakpoint-xl` | 1024px | 1279px | Desktop |
| `breakpoint-2xl` | 1280px | 1535px | Large desktop |
| `breakpoint-3xl` | 1536px | ∞ | Ultra-wide |

### Media Query Tokens

```css
/* Mobile-first approach */
--mq-sm: (min-width: 480px);
--mq-md: (min-width: 640px);
--mq-lg: (min-width: 768px);
--mq-xl: (min-width: 1024px);
--mq-2xl: (min-width: 1280px);
--mq-3xl: (min-width: 1536px);
```

---

## Layout & Grid

### Container Widths

| Token | Max Width | Usage |
|-------|-----------|-------|
| `container-xs` | 320px | Narrow forms |
| `container-sm` | 480px | Dialogs, auth pages |
| `container-md` | 640px | Prose, articles |
| `container-lg` | 768px | Settings pages |
| `container-xl` | 1024px | Dashboard content |
| `container-2xl` | 1280px | Wide layouts |
| `container-3xl` | 1536px | Full-width tables |
| `container-full` | 100% | Edge-to-edge |
| `container-prose` | 65ch | Readable text width |

### Grid System

| Token | Value | Usage |
|-------|-------|-------|
| `grid-columns` | 12 | Standard grid |
| `grid-gutter-sm` | space-4 (16px) | Mobile gutter |
| `grid-gutter-md` | space-6 (24px) | Tablet gutter |
| `grid-gutter-lg` | space-8 (32px) | Desktop gutter |

### Page Layout Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `layout-sidebar-width` | 240px | Default sidebar |
| `layout-sidebar-collapsed` | 64px | Collapsed sidebar |
| `layout-header-height` | 64px | Top nav height |
| `layout-footer-height` | auto | Footer |
| `layout-content-max-width` | container-xl | Main content area |

---

## Motion & Transitions

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `motion-duration-instant` | 0ms | No animation |
| `motion-duration-fast` | 100ms | Micro interactions |
| `motion-duration-normal` | 200ms | Standard transitions |
| `motion-duration-slow` | 300ms | Complex animations |
| `motion-duration-slower` | 500ms | Page transitions |
| `motion-duration-slowest` | 1000ms | Loading states |

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `motion-ease-linear` | linear | Constant speed |
| `motion-ease-in` | cubic-bezier(0.4, 0, 1, 1) | Accelerate |
| `motion-ease-out` | cubic-bezier(0, 0, 0.2, 1) | Decelerate |
| `motion-ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Smooth both |
| `motion-ease-bounce` | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Playful |
| `motion-ease-spring` | cubic-bezier(0.175, 0.885, 0.32, 1.275) | Natural |

### Composite Motion Tokens

| Token | Duration + Easing | Usage |
|-------|-------------------|-------|
| `motion-hover` | fast + ease-out | Hover states |
| `motion-active` | instant + ease-out | Click feedback |
| `motion-enter` | normal + ease-out | Element appears |
| `motion-exit` | fast + ease-in | Element leaves |
| `motion-expand` | slow + ease-in-out | Accordion, drawer |
| `motion-page` | slower + ease-in-out | Route transitions |

### Reduced Motion

All motion respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility Tokens

### Focus Ring

| Token | Value | Usage |
|-------|-------|-------|
| `focus-ring-width` | 2px | Ring thickness |
| `focus-ring-offset` | 2px | Gap from element |
| `focus-ring-color` | color-border-focus | Ring color |

### Touch Targets

| Token | Value | Usage |
|-------|-------|-------|
| `touch-target-min` | 44px | WCAG minimum |
| `touch-target-comfortable` | 48px | Recommended |

### Contrast Requirements

| Context | Minimum Ratio | Standard |
|---------|---------------|----------|
| Normal text | 4.5:1 | WCAG AA |
| Large text (18px+) | 3:1 | WCAG AA |
| UI components | 3:1 | WCAG AA |
| Enhanced | 7:1 | WCAG AAA |

---

## Token Relationships

### How Tokens Connect

```
┌─────────────────────────────────────────────────────────────┐
│                      COMPONENT LEVEL                         │
│  button-bg → color-bg-accent                                │
│  button-text → color-text-inverse                           │
│  button-padding → space-component-padding-md                │
│  button-radius → radius-button                              │
├─────────────────────────────────────────────────────────────┤
│                      SEMANTIC LEVEL                          │
│  color-bg-accent → primary-600 (light) / primary-500 (dark) │
│  radius-button → radius-md (modern) / radius-none (terminal)│
├─────────────────────────────────────────────────────────────┤
│                      PRIMITIVE LEVEL                         │
│  primary-600 → oklch(52% 0.22 290)                          │
│  radius-md → 6px                                             │
└─────────────────────────────────────────────────────────────┘
```

---

*Foundations Version 1.0.0 — Complete Token Definitions*
