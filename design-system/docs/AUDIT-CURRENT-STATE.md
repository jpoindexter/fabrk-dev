# AUDIT: Current Design System State

> Generated: December 5, 2025 | Phase 1 Audit

## Executive Summary

The Fabrk boilerplate has a **partially implemented design system** with strong foundations but inconsistent application. The system declares standards (8-point grid, terminal aesthetic, semantic tokens) but implementation varies significantly across pages and components.

| Metric | Value | Assessment |
|--------|-------|------------|
| Unique CSS Variables | 78 | Good coverage |
| Theme Definitions | 20 complete | Excellent |
| Template Compliance | 72% | Needs improvement |
| Token Violations | 92 instances | Medium priority |
| Off-Grid Spacing | 35+ instances | High priority |

---

## 1. CSS Custom Properties Inventory

### Color Variables (OKLCH Format)

The system uses OKLCH color space for perceptual uniformity:

**Primary Colors:**
| Variable | Purpose | Format |
|----------|---------|--------|
| `--primary` | Brand color | OKLCH |
| `--primary-foreground` | Text on primary | OKLCH |
| `--secondary` | Secondary brand | OKLCH |
| `--secondary-foreground` | Text on secondary | OKLCH |
| `--accent` | Highlight color | OKLCH |
| `--accent-foreground` | Text on accent | OKLCH |

**Semantic Colors:**
| Variable | Purpose | Default Value |
|----------|---------|---------------|
| `--destructive` | Error/danger | 45% 0.22 13.428 |
| `--success` | Success states | 45% 0.15 163.223 |
| `--warning` | Warning states | 82% 0.189 84.429 |
| `--info` | Information | 74% 0.16 232.661 |

**Neutral/Structural:**
| Variable | Purpose |
|----------|---------|
| `--background` | Page background |
| `--foreground` | Primary text |
| `--card` | Card background |
| `--muted` | Disabled/muted bg |
| `--muted-foreground` | Muted text |
| `--border` | Border/divider |
| `--input` | Input field bg |
| `--ring` | Focus ring |

**Data Visualization:**
- `--chart-1` through `--chart-9`: 9 colors for charts

### Font Variables

| Variable | Value | Usage |
|----------|-------|-------|
| `--font-sans` | Geist Sans | Standard mode |
| `--font-mono` | JetBrains Mono | Terminal mode (current default) |

### Spacing Variables

| Variable | Value | Usage |
|----------|-------|-------|
| `--radius` | 0.5rem (8px) | Base border-radius |

---

## 2. Tailwind Theme Configuration

**Architecture:** Tailwind v4 CSS-first approach (no `tailwind.config.ts`)

Configuration in `globals.css` via `@theme` block:
```css
@theme {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-jetbrains-mono);
  --radius: 0.5rem;
  --color-*: oklch(var(--original-variable));
}
```

### Custom Extensions

| Category | Values | Status |
|----------|--------|--------|
| Colors | 25 semantic mappings | ✓ Complete |
| Spacing | Uses Tailwind defaults | ✓ OK |
| Fonts | 2 families (sans, mono) | ✓ Complete |
| Radii | Single `--radius` value | ⚠️ Limited |
| Shadows | Minimal (terminal aesthetic) | ✓ Intentional |

---

## 3. Token Sources

### Primary: `src/app/globals.css` (~1,800 lines)

**Structure:**
1. `@theme` block - Tailwind v4 config
2. `:root` - Base/light theme (75 lines)
3. `[data-theme="*"]` - 20 theme definitions
4. `@layer base` - Semantic resets
5. `@layer utilities` - Custom utilities

### Secondary: `src/lib/design-system/`

| File | Purpose | Lines |
|------|---------|-------|
| `constants.ts` | Typography, spacing, accessibility | 270 |
| `visual-mode.ts` | Runtime aesthetic switching | 150 |
| `index.ts` | Re-exports | 20 |

### Token Definition Locations

| Token Type | Location | Count |
|------------|----------|-------|
| Core colors | `:root` + themes | 40 unique |
| Theme colors | `[data-theme]` × 20 | 20 complete sets |
| Tailwind mapped | `@theme` block | 25 |
| Calendar overrides | `[data-slot="calendar"]` | 15 |
| **Total unique** | All sources | **~78** |

---

## 4. Theme System

### 20 Complete Themes (DaisyUI-compatible)

| Theme | Type | Primary | Best For |
|-------|------|---------|----------|
| light | Light | Purple | Default light |
| dark | Dark | Cyan | Default dark |
| cupcake | Light | Cyan | Soft aesthetic |
| bumblebee | Light | Yellow | Playful |
| emerald | Light | Green | Nature |
| corporate | Light | Blue | Business |
| synthwave | Dark | Pink | Neon retro |
| retro | Light | Red | Vintage |
| cyberpunk | Light | Red | Tech punk |
| valentine | Light | Pink | Romantic |
| halloween | Dark | Orange | Festive |
| forest | Dark | Green | Nature dark |
| aqua | Dark | Cyan | Aquatic |
| lofi | Light | Dark | Minimal |
| pastel | Light | Pink | Soft pastels |
| fantasy | Light | Purple | Whimsical |
| luxury | Dark | White | Premium |
| dracula | Dark | Pink | Developer |
| autumn | Light | Red | Warm |
| business | Dark | Blue | Professional |

### Theme Switching

- **Mechanism:** `data-theme` attribute on `<html>`
- **Performance:** CSS-only, zero JS computation
- **Layout shift:** None

---

## 5. Visual Mode System

Runtime override for aesthetic switching:

```typescript
// src/lib/design-system/visual-mode.ts
export const CURRENT_MODE: VisualMode = "sharp";

visualModes = {
  sharp:    { radius: "rounded-none", font: "font-mono", shadow: "" },
  standard: { radius: "rounded-lg",   font: "font-sans", shadow: "shadow-sm" },
  minimal:  { radius: "rounded-md",   font: "font-sans", shadow: "" },
  linear:   { radius: "rounded-lg",   font: "font-sans", shadow: "shadow-sm" },
}
```

**Usage in components:**
```tsx
import { mode } from "@/design-system";
<Card className={cn("border", mode.radius, mode.font)} />
```

---

## 6. Design System Constants

### Typography Constants

```typescript
// src/lib/design-system/constants.ts
TYPOGRAPHY = {
  pageTitle: "text-4xl font-semibold",
  sectionTitle: "text-2xl font-semibold",
  cardTitle: "text-lg font-semibold",
  body: "text-sm",
  caption: "text-xs text-muted-foreground",
  mono: "font-mono text-xs",
}
```

### Spacing Constants

```typescript
SPACING = {
  containerMaxWidth: "max-w-6xl",
  gridGap: "gap-6",
  cardPadding: "p-6",
  sectionSpacing: "space-y-6",
}
```

### Accessibility Constants

```typescript
ACCESSIBILITY = {
  minTouchTarget: "44px",
  focusRing: "focus-visible:ring-2 focus-visible:ring-primary",
  srOnly: "sr-only",
}
```

---

## 7. What's Missing

### Not Defined as Tokens

| Category | Current State | Recommendation |
|----------|---------------|----------------|
| Animation durations | Hardcoded (0.6s, 1s, etc.) | Add `--duration-*` variables |
| Z-index scale | Tailwind defaults | Add `--z-*` variables |
| Transition timing | Hardcoded (0.2s) | Add `--ease-*` variables |
| Breakpoints | Tailwind defaults | Document if custom needed |

### Underutilized Variables

| Variable | Usage | Issue |
|----------|-------|-------|
| `--font-sans` | Rare | Most UI uses mono in sharp mode |
| `--info-foreground` | Minimal | Info status rarely used |
| `--chart-6` to `--chart-9` | Limited | Not all chart colors used |

---

## 8. Files Reference

| File | Purpose | Size |
|------|---------|------|
| `src/app/globals.css` | All CSS variables + themes | ~1,800 lines |
| `src/lib/design-system/constants.ts` | Typography, spacing | 270 lines |
| `src/lib/design-system/visual-mode.ts` | Aesthetic switching | 150 lines |
| `DESIGN_SYSTEM.md` | Documentation | 500+ lines |

---

## Summary

**Strengths:**
- Comprehensive OKLCH color system
- 20 production-ready themes
- Visual mode abstraction for aesthetic switching
- Good semantic token naming

**Weaknesses:**
- Constants defined but not enforced
- No animation/timing tokens
- Mixed application of `mode.*` across components
- Typography scale defined but not consistently used

**Next Steps:**
- See `AUDIT-INCONSISTENCIES.md` for specific violations
- See `AUDIT-COMPONENTS.md` for component-level issues
- See `AUDIT-PAGES.md` for page template analysis
