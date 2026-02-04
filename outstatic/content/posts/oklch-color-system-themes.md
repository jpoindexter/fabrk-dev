---
title: 'OKLCH Color Space: The Secret to 18 Perfect Terminal Themes'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'oklch-color-system-themes'
description: 'How OKLCH color space enables perceptually uniform themes with guaranteed accessibility. The technical foundation behind Fabrk''s 18 terminal themes.'
publishedAt: '2026-02-03T10:00:00.000Z'
---

**How OKLCH enables perfect theme consistency across 18 terminal themes.**

---

## The Problem with RGB and HSL

Traditional color systems have a fundamental flaw: they're not perceptually uniform.

In HSL, `hsl(60, 100%, 50%)` (yellow) appears much brighter than `hsl(240, 100%, 50%)` (blue) despite having the same "lightness" value.

This makes building consistent themes nearly impossible.

---

## Enter OKLCH

OKLCH (Oklab Lightness Chroma Hue) is a perceptually uniform color space. Colors with the same lightness value actually *look* equally light to human eyes.

```css
/* These colors have equal perceived brightness */
--color-accent: oklch(0.7 0.15 250);  /* Blue */
--color-warning: oklch(0.7 0.15 85);  /* Yellow */
--color-success: oklch(0.7 0.15 145); /* Green */
```

---

## Benefits for Theming

### 1. Guaranteed Contrast Ratios

When lightness is predictable, contrast math becomes simple:

```css
/* Background at 0.15 lightness, text at 0.95 = guaranteed contrast */
--color-background: oklch(0.15 0.02 250);
--color-foreground: oklch(0.95 0.01 250);
```

### 2. Theme Generation

New themes can be generated algorithmically by adjusting hue while maintaining lightness and chroma:

```
Dracula:  hue 280 (purple)
Nord:     hue 220 (blue)
Monokai:  hue 45  (warm)
```

### 3. Accessibility by Default

WCAG 2.2 AA compliance becomes automatic when lightness values are chosen correctly.

---

## Fabrk's 18 Themes

All themes share the same structure, varying only in hue and accent colors:

| Theme | Primary Hue | Accent |
|-------|-------------|--------|
| Dracula | 280° | Purple |
| Nord | 220° | Blue |
| Tokyo Night | 250° | Violet |
| Gruvbox | 45° | Orange |
| Catppuccin | 320° | Pink |
| One Dark | 220° | Blue |
| Monokai | 85° | Yellow |
| Solarized | 175° | Cyan |
| ... | ... | ... |

---

## Implementation

Fabrk uses CSS custom properties with OKLCH values:

```css
:root[data-theme="dracula"] {
  --background: oklch(0.15 0.02 280);
  --foreground: oklch(0.95 0.01 280);
  --primary: oklch(0.7 0.2 280);
  --muted: oklch(0.4 0.05 280);
}
```

Tailwind CSS 4 natively supports OKLCH, making integration seamless.

---

## Creating Custom Themes

Adding a new theme takes minutes:

1. Choose a primary hue (0-360°)
2. Define lightness levels for semantic tokens
3. Add to `globals.css`
4. Register in theme configuration

The OKLCH foundation ensures your theme will have:
- Proper contrast ratios
- Consistent brightness perception
- Accessibility compliance

---

## Why This Matters

For SaaS products offering customization, OKLCH means:

- Users can pick any brand color
- Accessibility is maintained automatically
- No manual contrast checking required
- Themes feel cohesive, not hacked together

The result: 18 beautiful themes that all just work.
