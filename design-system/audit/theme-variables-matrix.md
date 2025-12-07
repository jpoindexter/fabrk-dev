# Theme Variables Matrix

**Audit Date:** 2025-12-07
**Auditor:** Claude Code

## Summary

This matrix documents which CSS variables are defined in each theme. Variables not explicitly defined in a theme will inherit from `:root`.

---

## Variables Defined in `:root` (Default/Black Light Theme)

| Category | Variables |
|----------|-----------|
| **Core UI** | `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground` |
| **Brand** | `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `accent`, `accent-foreground` |
| **Muted** | `muted`, `muted-foreground` |
| **Status** | `destructive`, `destructive-foreground`, `success`, `success-foreground`, `warning`, `warning-foreground`, `info`, `info-foreground` |
| **Inputs** | `border`, `input`, `ring` |
| **Charts** | `chart-1`, `chart-2`, `chart-3`, `chart-4`, `chart-5`, `chart-6`, `chart-7`, `chart-8`, `chart-9` |
| **Misc** | `status-away` |

**Total variables in `:root`:** 27

---

## Theme Coverage Matrix

| Theme | Core UI | Brand | Muted | Status | Inputs | Charts | Status-Away |
|-------|---------|-------|-------|--------|--------|--------|-------------|
| `:root` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `light` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `dark` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `cupcake` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `bumblebee` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `emerald` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `corporate` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `synthwave` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `retro` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `cyberpunk` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `valentine` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `halloween` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `forest` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `aqua` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `lofi` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `pastel` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `fantasy` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `luxury` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `dracula` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `autumn` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `business` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |

---

## Missing Variables Per Theme

**ALL 20 themes are missing the following 14 variables:**

### Status Colors (CRITICAL)
- `--destructive` - Error/danger states
- `--destructive-foreground` - Text on destructive background
- `--success` - Success states
- `--success-foreground` - Text on success background
- `--warning` - Warning states
- `--warning-foreground` - Text on warning background
- `--info` - Info states
- `--info-foreground` - Text on info background

### Chart Colors (CRITICAL)
- `--chart-1` through `--chart-9` - Nine chart color slots

### Status Indicator
- `--status-away` - Away/idle status color

---

## Impact Assessment

### What Breaks When Themes Are Missing Variables

1. **Status Colors Inherit from Black Light Theme**
   - `destructive` = `45% 0.22 13.428` (red)
   - `success` = `45% 0.15 163.223` (green)
   - `warning` = `82% 0.189 84.429` (yellow)
   - `info` = `74% 0.16 232.661` (blue)

   These colors were designed for the light `:root` theme and may have poor contrast in dark themes like `synthwave`, `dracula`, or `business`.

2. **Chart Colors Identical Across All Themes**
   - All charts use the same color palette regardless of theme
   - Charts may clash with theme color schemes

3. **Status Indicators Don't Adapt**
   - `status-away` indicator stays the same color

---

## Variables Each Theme Actually Defines (17 of 27)

```
--background
--foreground
--card
--card-foreground
--popover
--popover-foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--border
--input
--ring
```

---

## Recommended Fix

Add the missing 10 variables to ALL 20 themes:

```css
[data-theme="THEME_NAME"] {
  /* ... existing variables ... */

  /* Status Colors */
  --destructive: /* theme-appropriate red */;
  --destructive-foreground: /* contrasting text */;
  --success: /* theme-appropriate green */;
  --success-foreground: /* contrasting text */;
  --warning: /* theme-appropriate yellow/orange */;
  --warning-foreground: /* contrasting text */;
  --info: /* theme-appropriate blue */;
  --info-foreground: /* contrasting text */;

  /* Chart Colors */
  --chart-1: /* primary-derived */;
  --chart-2: /* secondary-derived */;
  --chart-3: /* accent-derived */;
  --chart-4: /* complementary 1 */;
  --chart-5: /* complementary 2 */;
  --chart-6: /* complementary 3 */;
  --chart-7: /* complementary 4 */;
  --chart-8: /* complementary 5 */;
  --chart-9: /* complementary 6 */;

  /* Status Indicator */
  --status-away: /* theme-appropriate amber/yellow */;
}
```
