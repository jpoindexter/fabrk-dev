# Building an Accessible Terminal Design System: Font Pairings, 18 Themes, and WCAG Compliance

> How I built a themeable design system with 34 font combinations, 18 color themes, and full WCAG AA accessibility for a Next.js SaaS boilerplate.

---

## The Challenge

When building [Fabrk](https://fabrk.dev), a terminal-inspired SaaS boilerplate, I faced an interesting design challenge: how do you create a cohesive design system that:

1. Embraces the monospace, terminal aesthetic developers love
2. Supports 18 different color themes (from CRT phosphors to retro computers to futuristic UIs)
3. Maintains WCAG AA accessibility across all themes
4. Allows typographic flexibility without breaking the terminal feel

This post covers how I solved each of these challenges.

---

## Part 1: Runtime Font Swapping (The Hard Part)

### The Problem

Fabrk started as a purely monospace design system. Every element - headlines, body text, buttons, inputs - used `font-mono`. That's the terminal aesthetic.

But users wanted options. Some wanted bold display fonts for headlines. Others wanted proportional fonts for long-form content. The challenge: **how do you add font flexibility to a monospace-first system without breaking everything?**

### The Original System

Everything was hardcoded to monospace:

```css
body {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
}

h1, h2, h3, p, span, div, button, input {
  font-family: inherit; /* All mono, all the time */
}
```

This worked great for the terminal look, but was inflexible.

### The Solution: CSS Variables + Runtime Injection

I introduced two CSS variables that could be swapped at runtime:

```css
:root {
  --font-body: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  --font-headline: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
}

body, p, span, div, li {
  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-headline);
}
```

Now fonts can be changed without touching component code.

### Runtime Font Injection

The theme customizer swaps fonts by injecting styles directly:

```typescript
// When user selects a new font
function applyFonts(bodyFont: string, headlineFont: string) {
  // Update CSS variables
  document.documentElement.style.setProperty('--font-body', bodyFont);
  document.documentElement.style.setProperty('--font-headline', headlineFont);

  // Inject Google Fonts dynamically
  const link = document.createElement('link');
  link.href = generateGoogleFontsUrl([bodyFont, headlineFont]);
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}
```

### Auto-Generated Google Fonts URL

Instead of manually maintaining font URLs, I built a generator:

```typescript
export const FONT_OPTIONS: FontOption[] = [
  {
    value: 'jetbrains',
    label: 'JetBrains Mono',
    googleFamily: 'JetBrains Mono',
    cssValue: "'JetBrains Mono', ui-monospace, monospace",
    category: 'mono',
    weights: [400, 500, 700],
  },
  // ... 20+ more fonts
];

// Auto-generates: https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&...
export const GOOGLE_FONTS_URL = generateGoogleFontsUrl();
```

Adding a new font is just adding an object to the array. The URL updates automatically.

### Bidirectional Pairings

The final piece: smart font pairing. When you select a body font, the headline font auto-updates to a complementary choice:

```typescript
export const FONT_PAIRINGS: Record<string, string> = {
  // Sans-serif body → Display headline
  'inter': 'bebas-neue',
  'roboto': 'oswald',
  'poppins': 'russo-one',

  // Monospace body → Same mono (terminal consistency)
  'jetbrains': 'jetbrains',
  'fira-code': 'fira-code',

  // Works both directions
  'bebas-neue': 'inter',  // Display headline → Sans body
};
```

Users can override, but they get sensible defaults. This gives 34+ combinations without decision fatigue.

---

## Part 2: 18 Color Themes with OKLCH

### Why OKLCH?

I use OKLCH (Lightness, Chroma, Hue) instead of HSL or RGB for one critical reason: **perceptual uniformity**. When you change hue in OKLCH, the perceived brightness stays consistent. This is crucial for accessibility.

```css
/* OKLCH format: lightness% chroma hue */
--primary: 70% 0.28 25;    /* Red phosphor */
--primary: 70% 0.28 145;   /* Green phosphor */
--primary: 70% 0.28 200;   /* Blue phosphor */
```

Same lightness, same chroma, different hues = consistent visual weight across themes.

### The Theme Categories

**CRT Phosphor Themes (5)**
- P1 Green (classic terminal)
- Amber (warm, nostalgic)
- P3 Blue (cool, professional)
- P2 Red (warning/alert focus)
- P39 Purple (creative/gaming)

**Retro Computer Themes (6)**
- Gameboy (4-shade green LCD)
- C64 (Commodore blue)
- Spectrum (ZX Spectrum)
- VIC-20 (brown/tan)
- Atari (orange/brown)
- Black & White (high contrast)

**FUI Themes (6)** - Futuristic User Interface
- Blueprint (technical drawing blue)
- Cyberpunk (neon pink/magenta)
- Navigator (military HUD amber)
- Phosphor (matrix green)
- Holographic (iridescent cyan)
- Infrared (thermal imaging red)

**Light Theme (1)**
- Light mode for those who prefer it

---

## Part 3: WCAG AA Accessibility Audit

This is where things get interesting. Having 18 themes means you need to verify **each one** meets accessibility requirements.

### The Audit Process

I ran a multi-agent accessibility audit checking:

1. **Text Contrast (4.5:1 minimum)** - All foreground/background combinations
2. **UI Component Contrast (3:1 minimum)** - Borders, inputs, focus rings
3. **Code Syntax Highlighting** - Comments must be readable
4. **Chart Colors** - Distinguishable data visualization

### What I Found

The FUI themes had border contrast issues. Futuristic UIs often use subtle, low-contrast borders for that "holographic" feel. But subtle doesn't mean inaccessible.

**Before:**
```css
/* Cyberpunk - TOO LOW */
--border: 25% 0.1 330;  /* 1.8:1 contrast - FAIL */

/* Blueprint - TOO LOW */
--border: 45% 0.08 230; /* 2.4:1 contrast - FAIL */
```

**After:**
```css
/* Cyberpunk - FIXED */
--border: 38% 0.1 330;  /* 3.2:1 contrast - PASS */

/* Blueprint - FIXED */
--border: 55% 0.08 230; /* 3.5:1 contrast - PASS */
```

The fix: increase lightness while maintaining the same chroma and hue. The borders still look "on-brand" but are now perceivable by users with low vision.

### Complete Fix List

| Theme | Issue | Before | After |
|-------|-------|--------|-------|
| Blueprint | Border contrast | 45% | 55% |
| Cyberpunk | Border contrast | 25% | 38% |
| Navigator | Border contrast | 30% | 36% |
| Phosphor | Border contrast | 25% | 35% |
| Holographic | Border contrast | 35% | 40% |
| Red | Code comments | 40% | 50% |
| Infrared | Code comments | 35% | 28% |

---

## Part 4: Code Syntax Highlighting

Every theme needs consistent code syntax highlighting. I defined a standard set of CSS variables:

```css
/* Code syntax variables */
--code-fg: oklch(65% 0.25 230);      /* Default text */
--code-bg: oklch(8% 0.02 230);       /* Background */
--code-comment: oklch(50% 0.15 230); /* Comments */
--code-string: oklch(60% 0.22 230);  /* Strings */
--code-number: oklch(55% 0.22 230);  /* Numbers */
--code-keyword: oklch(70% 0.28 230); /* Keywords */
--code-function: oklch(72% 0.24 230);/* Functions */
--code-operator: oklch(60% 0.2 230); /* Operators */
```

These map to Prism.js token classes while maintaining theme-consistent hues.

---

## Part 5: Dynamic Border Radius

One more piece of the puzzle: **dynamic border radius**. Terminal UIs typically have sharp corners, but some developers want softer edges.

I created a `mode.radius` system that maps to a CSS variable:

```tsx
import { mode } from '@/design-system';

// Components use mode.radius instead of hardcoded values
<Card className={cn("border", mode.radius)}>
  Content
</Card>
```

```css
/* Themes can override */
:root {
  --radius: 0px;  /* Sharp terminal look */
}

[data-theme="soft"] {
  --radius: 8px;  /* Softer edges */
}
```

This gives users runtime control over border radius across all 78+ components.

---

## The Results

After these updates, Fabrk v1.1.0 includes:

- **34 font pairings** - Mix and match display/body fonts
- **18 color themes** - CRT, retro, FUI, and light
- **100% WCAG AA compliance** - Every theme passes accessibility audit
- **Dynamic radius system** - Sharp or rounded, user's choice
- **Consistent code highlighting** - All themes support syntax highlighting

---

## Key Takeaways

### 1. OKLCH is Your Friend
Perceptually uniform color spaces make theming SO much easier. Changing hue while maintaining lightness means consistent contrast ratios.

### 2. Audit Every Theme
If you have multiple themes, audit them ALL. What looks good on one might fail accessibility on another.

### 3. Bidirectional Flexibility > Rigid Pairing
Don't force one typographic style. Let developers mix monospace and proportional fonts in either direction.

### 4. Dynamic Systems Beat Static Rules
`mode.radius` is more flexible than `rounded-none`. CSS variables let users customize without forking.

### 5. Terminal Aesthetic != Inaccessible
You can have the retro terminal look AND be accessible. It just requires intentional contrast choices.

---

## Try It Yourself

Fabrk is available at [fabrk.dev](https://fabrk.dev). The design system is fully documented with:

- Live theme switcher (try all 18 themes)
- Font pairing selector
- Complete component library
- Style guide reference

All source code is TypeScript, built on Next.js 16, with Tailwind CSS 4.

---

*What design system challenges are you facing? Drop a comment below.*

---

**Tags:** #css #designsystems #accessibility #nextjs
