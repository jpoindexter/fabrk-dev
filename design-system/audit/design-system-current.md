# Design System Current State Audit

> Generated: 2025-12-06 | Phase 1: Design System Freeze + Normalize
> Purpose: Document existing tokens, locations, duplicates, and inconsistencies before normalization

---

## Executive Summary

The current design system has a **solid foundation** but suffers from:
1. **Multiple sources of truth** - tokens defined in TS, CSS, and JSON
2. **Inconsistent naming** - mix of camelCase, kebab-case, and flat names
3. **Theme-specific hardcoding** - `mode` object locked to terminal theme
4. **Duplicate definitions** - same tokens defined in multiple files
5. **Missing runtime theme switching** - `CURRENT_THEME` is compile-time constant

---

## File Inventory

### Token Definition Files

| File | Format | Purpose | Status |
|------|--------|---------|--------|
| `/design-system/tokens/primitives.ts` | TS | Raw values (colors, spacing, etc.) | **KEEP** |
| `/design-system/tokens/semantic.ts` | TS | Type definitions for semantic tokens | **KEEP** |
| `/design-system/spec/tokens.json` | JSON | Machine-readable spec (duplicates primitives.ts) | **MERGE** |
| `/src/app/globals.css` | CSS | Runtime CSS variables + 20 DaisyUI themes | **KEEP** |

### Theme Files

| File | Format | Purpose | Status |
|------|--------|---------|--------|
| `/design-system/themes/terminal.ts` | TS | Terminal theme values + utilities | **KEEP** |
| `/design-system/themes/modern.ts` | TS | Modern theme values + utilities | **KEEP** |
| `/design-system/themes/soft.ts` | TS | Soft theme values + utilities | **KEEP** |
| `/design-system/themes/index.ts` | TS | Theme registry + exports | **REFACTOR** |
| `/design-system/index.ts` | TS | Main export + backwards compat `mode` | **REFACTOR** |

### Specification Files

| File | Purpose | Status |
|------|---------|--------|
| `/design-system/spec/overview.md` | Philosophy & naming conventions | **UPDATE** |
| `/design-system/spec/foundations.md` | Token definitions (markdown) | **UPDATE** |
| `/design-system/spec/themes.md` | Theme architecture | **UPDATE** |
| `/design-system/spec/components.md` | Component token mappings | **UPDATE** |
| `/design-system/spec/components-*.md` | Individual component specs (11 files) | **KEEP** |

---

## Token Inventory

### 1. Color Tokens

**Primitives (primitives.ts)**
```typescript
colors.white, colors.black
colors.gray[50-950]      // 11 stops
colors.primary[50-950]   // 11 stops
colors.red[50-950]       // 11 stops
colors.green[50-950]     // 11 stops
colors.amber[50-950]     // 11 stops
colors.blue[50-950]      // 11 stops
```

**Semantic (semantic.ts types)**
```typescript
color.bg.{base, surface, surfaceRaised, surfaceSunken, muted, 
          accent, accentMuted, accentHover,
          danger, dangerMuted, success, successMuted, 
          warning, warningMuted, info, infoMuted}

color.text.{primary, secondary, muted, disabled, inverse,
            accent, accentHover, danger, success, warning, info}

color.border.{default, muted, strong, accent, danger, success, focus}
```

**CSS Variables (globals.css)**
```css
--background, --foreground
--card, --card-foreground
--popover, --popover-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--success, --success-foreground
--warning, --warning-foreground
--info, --info-foreground
--border, --input, --ring
--chart-1 through --chart-9
```

**INCONSISTENCY FOUND:**
- TS uses `color.bg.surface` but CSS uses `--card`
- TS uses `color.text.primary` but CSS uses `--foreground`
- TS uses `color.bg.danger` but CSS uses `--destructive`
- TS uses `color.border.default` but CSS uses `--border`

**RECOMMENDATION:** Align CSS variable names with semantic token names.

---

### 2. Spacing Tokens

**Primitives (primitives.ts)**
```typescript
space.{0, px, 0.5, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64}
```

**Semantic (defined in theme files)**
```typescript
spacing.component.{paddingXs, paddingSm, paddingMd, paddingLg, paddingXl}
spacing.component.{gapXs, gapSm, gapMd, gapLg}
spacing.section.{sm, md, lg, xl}
spacing.page.padding
```

**INCONSISTENCY FOUND:**
- Primitives use numbers (1, 2, 4) while semantic uses sizes (xs, sm, md)
- No `space-3` in primitives but referenced in some component specs
- Semantic spacing defined in themes, not centrally

**RECOMMENDATION:** Define semantic spacing tokens centrally.

---

### 3. Typography Tokens

**Primitives (primitives.ts)**
```typescript
fontFamily.{sans, mono, display}
fontSize.{2xs, xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl}
fontWeight.{normal, medium, semibold, bold}
lineHeight.{none, tight, snug, normal, relaxed, loose}
letterSpacing.{tighter, tight, normal, wide, wider, widest}
```

**Semantic (defined in themes)**
```typescript
font.{body, heading, code, ui}
textTransform.{button, label, heading}
```

**CSS Variables (globals.css)**
```css
--font-sans, --font-mono
```

**INCONSISTENCY FOUND:**
- No composite typography tokens in TS (only in spec markdown)
- `font.ui` defined but not consistently used
- Missing heading scale tokens

**RECOMMENDATION:** Add composite typography tokens.

---

### 4. Radius Tokens

**Primitives (primitives.ts)**
```typescript
radius.{none, sm, md, lg, xl, 2xl, 3xl, full}
```

**Semantic (defined in themes)**
```typescript
radius.{button, input, card, modal, badge, avatar}
```

**CSS Variables (globals.css)**
```css
--radius: 0.5rem  // Only one!
```

**INCONSISTENCY FOUND:**
- CSS has single `--radius` but TS has full scale
- Semantic radius tokens are theme-specific (correct)
- Components hardcode `rounded-none` instead of using tokens

**RECOMMENDATION:** Add full radius scale to CSS variables.

---

### 5. Shadow Tokens

**Primitives (primitives.ts)**
```typescript
shadow.{none, xs, sm, md, lg, xl, 2xl, inner}
```

**Semantic (defined in themes)**
```typescript
shadow.{card, dropdown, modal, button}
```

**INCONSISTENCY FOUND:**
- No shadow CSS variables in globals.css
- Tailwind shadow classes used directly

**RECOMMENDATION:** Add semantic shadow tokens.

---

### 6. Motion Tokens

**Primitives (primitives.ts)**
```typescript
duration.{instant, fast, normal, slow, slower, slowest}
easing.{linear, in, out, inOut, bounce, spring}
```

**CSS (globals.css)**
- Keyframes defined but no duration/easing variables

**INCONSISTENCY FOUND:**
- Motion tokens not exposed as CSS variables
- Components use Framer Motion with hardcoded values

**RECOMMENDATION:** Add motion CSS variables.

---

### 7. Layout Tokens

**Primitives (primitives.ts)**
```typescript
breakpoint.{xs, sm, md, lg, xl, 2xl, 3xl}
container.{xs, sm, md, lg, xl, 2xl, 3xl, full, prose}
zIndex.{behind, base, raised, dropdown, sticky, overlay, modal, popover, toast, tooltip, max}
borderWidth.{none, default, 2, 4}
```

**CSS (globals.css)**
- No layout tokens exposed

**INCONSISTENCY FOUND:**
- Layout tokens only in TS, not CSS

**RECOMMENDATION:** Keep layout tokens in TS (used at build time).

---

## Theme System Issues

### Current Architecture
```
design-system/index.ts
├── exports `mode` object (HARDCODED to terminal)
├── exports theme utilities
└── CURRENT_THEME = "terminal" (compile-time constant)
```

### Problems

1. **`mode` is not reactive** - Changing theme requires code change
2. **`CURRENT_THEME` is a constant** - Cannot switch at runtime
3. **Components import `mode` directly** - No way to swap
4. **Theme classes hardcoded** - `terminalClasses` always used

### Current `mode` Object
```typescript
export const mode: ModeConfig = {
  radius: "rounded-none",        // Hardcoded
  font: "font-mono",             // Hardcoded
  shadow: "",
  buttonPrefix: "> ",
  labelFormat: "brackets",
  cardHeader: "bracketed",
  textTransform: "uppercase",
  inputStyle: "rounded-none font-mono border-border",
  borderWidth: "border",
};
```

**RECOMMENDATION:** Make `mode` derive from active theme at runtime.

---

## Duplicate/Conflicting Definitions

| Token | Location 1 | Location 2 | Conflict |
|-------|-----------|------------|----------|
| Gray palette | primitives.ts | tokens.json | Identical (duplicate) |
| Primary palette | primitives.ts | tokens.json | Identical (duplicate) |
| Spacing scale | primitives.ts | tokens.json | Identical (duplicate) |
| Semantic colors | semantic.ts (types) | terminals.ts (values) | Correct separation |
| CSS color vars | globals.css | None | Unique (good) |

**RECOMMENDATION:** Remove tokens.json as it duplicates primitives.ts.

---

## Naming Convention Issues

### Current Mixed Conventions

| Type | Current | Example | Issue |
|------|---------|---------|-------|
| TS primitives | dot notation | `colors.gray.500` | OK |
| TS semantic | camelCase | `surfaceRaised` | OK |
| CSS vars | kebab-case | `--muted-foreground` | OK |
| Tailwind | kebab-case | `bg-muted` | OK |
| Mode classes | Tailwind | `rounded-none` | OK |

### Inconsistent Semantic Names

| TS Semantic | CSS Variable | Tailwind |
|-------------|--------------|----------|
| `color.bg.surface` | `--card` | `bg-card` |
| `color.text.primary` | `--foreground` | `text-foreground` |
| `color.bg.danger` | `--destructive` | `bg-destructive` |
| `color.bg.accent` | `--primary` | `bg-primary` |

**ISSUE:** CSS uses shadcn/ui naming, TS uses semantic naming.

**RECOMMENDATION:** Keep both - CSS matches Tailwind ecosystem, TS is internal.

---

## Files to Normalize

### Phase 1 Actions

1. **CREATE** `/design-system/audit/design-system-current.md` - This file
2. **UPDATE** `/design-system/spec/overview.md` - Finalize naming conventions
3. **UPDATE** `/design-system/spec/foundations.md` - Clean token definitions
4. **UPDATE** `/design-system/spec/tokens.json` - Single source of truth
5. **UPDATE** `/design-system/spec/themes.md` - Theme architecture
6. **REFACTOR** `/design-system/index.ts` - Make mode theme-aware

### Files NOT Changed in Phase 1

- `/src/app/globals.css` - CSS variables (keep as-is, apps depend on it)
- `/design-system/tokens/primitives.ts` - Already clean
- `/design-system/tokens/semantic.ts` - Already clean
- `/design-system/themes/*.ts` - Already clean

---

## Recommendations Summary

| Issue | Priority | Action |
|-------|----------|--------|
| `mode` object hardcoded | HIGH | Refactor to use active theme |
| Duplicate tokens.json | MEDIUM | Make it the single source, remove TS duplicates |
| Missing CSS variables for radius/shadow | MEDIUM | Add to globals.css |
| Inconsistent semantic names | LOW | Document mapping, don't change |
| Motion tokens not in CSS | LOW | Add CSS variables for motion |

---

*Audit completed: 2025-12-06*
*Next step: Normalize foundations and freeze design system*
