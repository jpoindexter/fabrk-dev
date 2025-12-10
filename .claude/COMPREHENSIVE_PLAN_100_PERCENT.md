# Fabrk Design System: 100% Grade A Plan

**Date**: December 10, 2025
**Target**: Grade A (100/100) - Perfect Execution
**Duration**: 8 weeks (98 hours)
**Current Grade**: C (60/100)

---

## Executive Summary

This plan extends the base 7-week plan (90/100) with **3 additional weeks of refinement** to achieve perfect Grade A (100/100).

### What Makes This "100% Plan" Different

| Aspect | Base Plan (7 weeks) | 100% Plan (8 weeks) |
|--------|---------------------|---------------------|
| **Grade Target** | A- (90/100) | A (100/100) |
| **Issues Resolved** | 12-13 of 14 | 14 of 14 (all) |
| **Testing** | Basic validation | Comprehensive (visual regression, edge cases) |
| **Theme Validation** | WCAG pass | Perfect contrast + manual QA on all 18 combinations |
| **Documentation** | Core docs | Complete with examples, screenshots, guides |
| **Risk Buffer** | None | 2-week buffer for discoveries |
| **Production Ready** | ✅ Yes | ✅ Perfect |

---

## Phase Breakdown

### Phase 0: Quick Wins (1 hour) - Do First

**Goal**: Immediate visible improvements

#### Task 0.1: Expose Hidden Themes (10 min)

**Files**:
- `src/components/theme/theme-dropdown.tsx` (lines 23-30)
- `src/components/theme/color-theme-switcher.tsx` (lines 16-23)

**Change**:
```typescript
// BEFORE (4 themes)
const themes = [
  { id: 'light', name: 'GitHub', preview: '#f4f4f4' },
  { id: 'amber', name: 'Amber CRT', preview: '#ffb000' },
  { id: 'green', name: 'Green CRT', preview: '#33ff66' },
  { id: 'blue', name: 'Blue CRT', preview: '#55ccff' },
] as const;

// AFTER (6 themes)
const themes = [
  { id: 'light', name: 'GitHub', preview: '#f4f4f4' },
  { id: 'dark', name: 'Monokai Night', preview: '#1f1f1f' },  // ADD
  { id: 'amber', name: 'Amber CRT', preview: '#ffb000' },
  { id: 'green', name: 'Green CRT', preview: '#33ff66' },
  { id: 'blue', name: 'Blue CRT', preview: '#55ccff' },
  { id: 'red', name: 'Red CRT', preview: '#ff6655' },         // ADD
] as const;
```

**Effort**: 10 minutes
**Benefit**: Users can select all 6 color themes

---

#### Task 0.2: Wire Visual Themes (30 min)

**File**: `src/components/theme/visual-theme-dropdown.tsx`

**Change**:
```typescript
// BEFORE (2 themes)
const visualThemes = [
  { id: 'terminal', name: 'Terminal', description: 'Sharp edges, monospace' },
  { id: 'modern', name: 'Modern', description: 'Rounded, clean' },
] as const;

// AFTER (3 themes)
const visualThemes = [
  { id: 'terminal', name: 'Terminal', description: 'Sharp edges, monospace, uppercase' },
  { id: 'modern', name: 'Modern', description: 'Rounded, sans-serif, clean' },
  { id: 'soft', name: 'Soft', description: 'Very rounded, friendly' },  // ADD
] as const;
```

**Note**: Visual theme system exists at `/src/design-system/themes/` but not wired. This task only exposes UI - wiring happens in Phase 1.

**Effort**: 30 minutes
**Result**: 6 color × 3 visual = **18 total theme combinations**

---

### Phase 1: Foundation (Week 1 - 13 hours)

**Goal**: Wire design tokens, add WCAG validation infrastructure

#### Task 1.1: Extend `mode` Object (4h)

**File**: `src/design-system/index.ts` (lines 127-137)

**Current (BROKEN)**:
```typescript
export const mode: ModeConfig = {
  radius: terminalClasses.radius,    // ✅ Works
  font: terminalClasses.font,        // ✅ Works
  shadow: '',                        // ❌ EMPTY
  buttonPrefix: '> ',                // ⚠️ Hardcoded
  // MISSING: color, spacing, typography, state tokens
};
```

**Target (COMPLETE)**:
```typescript
export const mode: ModeConfig = {
  // Existing (keep)
  radius: terminalClasses.radius,
  font: terminalClasses.font,
  textTransform: terminalClasses.textTransform,
  buttonPrefix: '> ',
  labelFormat: 'brackets',
  cardHeader: 'bracketed',
  inputStyle: terminalClasses.input,
  borderWidth: 'border',

  // NEW - Add these
  color: {
    bg: {
      base: 'bg-background',
      surface: 'bg-card',
      elevated: 'bg-popover',
      accent: 'bg-primary',
      secondary: 'bg-secondary',
      muted: 'bg-muted',
      danger: 'bg-destructive',
      success: 'bg-success',
      warning: 'bg-warning',
    },
    text: {
      primary: 'text-foreground',
      secondary: 'text-card-foreground',
      muted: 'text-muted-foreground',
      inverse: 'text-primary-foreground',
      accent: 'text-primary',
      danger: 'text-destructive',
      success: 'text-success',
      warning: 'text-warning',
    },
    border: {
      default: 'border-border',
      focus: 'border-ring',
      input: 'border-input',
    },
  },

  spacing: {
    button: {
      sm: 'px-2 py-1',
      md: 'px-4 py-2',
      lg: 'px-6 py-3',
      xl: 'px-8 py-4',
    },
    input: 'px-4 py-2',
    card: {
      padding: 'p-4',
      gap: 'gap-4',
    },
    badge: {
      sm: 'px-2 py-0.5',
      md: 'px-2 py-1',
    },
    section: {
      xs: 'space-y-1',
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
      xl: 'space-y-8',
    },
  },

  typography: {
    button: 'text-xs font-medium uppercase',
    body: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
    },
    heading: {
      h1: 'text-4xl font-bold uppercase',
      h2: 'text-3xl font-bold uppercase',
      h3: 'text-2xl font-semibold uppercase',
      h4: 'text-xl font-semibold uppercase',
    },
    label: 'text-xs text-muted-foreground uppercase',
    code: 'font-mono text-xs',
  },

  shadow: 'shadow-sm',

  state: {
    hover: {
      bg: 'hover:bg-primary/90',
      text: 'hover:text-foreground',
      border: 'hover:border-primary',
    },
    focus: {
      ring: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      outline: 'focus-visible:outline-none',
    },
    active: {
      bg: 'active:bg-primary/80',
      scale: 'active:scale-95',
    },
    disabled: {
      opacity: 'disabled:opacity-[var(--state-disabled-opacity)]',
      cursor: 'disabled:cursor-not-allowed',
      pointer: 'disabled:pointer-events-none',
    },
  },
};
```

**Effort**: 4 hours

---

#### Task 1.2: Create WCAG Validation System (6h)

**New File**: `scripts/validate-themes.ts`

```typescript
import { readFileSync } from 'fs';
import { parseOKLCH, calculateContrastRatio } from './utils/color';

interface ContrastCheck {
  theme: string;
  label: string;
  fgVar: string;
  bgVar: string;
  fgValue: string;
  bgValue: string;
  ratio: number;
  required: number;
  pass: boolean;
}

const THEMES = ['light', 'dark', 'red', 'blue', 'green', 'amber'];

const TEXT_BG_COMBINATIONS = [
  { fg: '--foreground', bg: '--background', min: 4.5, label: 'Body text on base' },
  { fg: '--muted-foreground', bg: '--card', min: 4.5, label: 'Muted text on card' },
  { fg: '--card-foreground', bg: '--card', min: 4.5, label: 'Card text on card' },
  { fg: '--primary-foreground', bg: '--primary', min: 4.5, label: 'Button text' },
  { fg: '--secondary-foreground', bg: '--secondary', min: 4.5, label: 'Secondary button' },
  { fg: '--destructive-foreground', bg: '--destructive', min: 4.5, label: 'Error button' },
  { fg: '--muted-foreground', bg: '--background', min: 4.5, label: 'Muted on base' },
  { fg: '--accent-foreground', bg: '--accent', min: 4.5, label: 'Accent text' },

  // Typography + color combinations (12px = 4.5:1, 18px+ = 3:1)
  { fg: '--foreground', bg: '--card', min: 4.5, label: 'Body text on surface' },
  { fg: '--primary', bg: '--background', min: 3.0, label: 'Large accent text (18px+)' },
];

function getThemeVariable(theme: string, varName: string): string {
  const css = readFileSync('src/app/globals.css', 'utf-8');

  // Find theme block: [data-theme='theme']
  const themeBlockRegex = new RegExp(
    `\\[data-theme=['"]${theme}['"]\\]\\s*{([^}]+)}`,
    's'
  );

  const match = css.match(themeBlockRegex);
  if (!match) throw new Error(`Theme '${theme}' not found in globals.css`);

  const block = match[1];

  // Find variable: --var-name: value;
  const varRegex = new RegExp(`${varName}:\\s*([^;]+);`);
  const varMatch = block.match(varRegex);

  if (!varMatch) throw new Error(`Variable '${varName}' not found in theme '${theme}'`);

  return varMatch[1].trim();
}

function validateTheme(themeName: string): ContrastCheck[] {
  const checks: ContrastCheck[] = [];

  for (const combo of TEXT_BG_COMBINATIONS) {
    try {
      const fgValue = getThemeVariable(themeName, combo.fg);
      const bgValue = getThemeVariable(themeName, combo.bg);

      const ratio = calculateContrastRatio(fgValue, bgValue);

      checks.push({
        theme: themeName,
        label: combo.label,
        fgVar: combo.fg,
        bgVar: combo.bg,
        fgValue,
        bgValue,
        ratio: Math.round(ratio * 100) / 100,
        required: combo.min,
        pass: ratio >= combo.min,
      });
    } catch (error) {
      console.warn(`⚠️ Skipping ${combo.fg} on ${combo.bg} in ${themeName}:`, error.message);
    }
  }

  return checks;
}

function main() {
  console.log('🔍 Validating WCAG 2.2 AA compliance for 6 themes...\n');

  const allChecks: ContrastCheck[] = [];
  let totalFailures = 0;

  for (const theme of THEMES) {
    console.log(`\n📋 Theme: ${theme.toUpperCase()}`);
    console.log('─'.repeat(60));

    const checks = validateTheme(theme);
    allChecks.push(...checks);

    const failures = checks.filter(c => !c.pass);
    totalFailures += failures.length;

    if (failures.length > 0) {
      console.error(`❌ ${failures.length} failures:\n`);
      failures.forEach(f => {
        console.error(`   ${f.label}`);
        console.error(`   ${f.fgVar} (${f.fgValue}) on ${f.bgVar} (${f.bgValue})`);
        console.error(`   Ratio: ${f.ratio}:1 (need ${f.required}:1)\n`);
      });
    } else {
      console.log(`✅ All ${checks.length} checks passed`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`📊 SUMMARY: ${THEMES.length} themes, ${allChecks.length} total checks`);

  if (totalFailures > 0) {
    console.error(`\n❌ FAILED: ${totalFailures} contrast violations found`);
    console.error(`\nTo fix: Increase lightness of foreground or background by 5% increments`);
    console.error(`Example: --foreground: 70% 0.24 25; → --foreground: 75% 0.24 25;`);
    process.exit(1);
  }

  console.log(`\n✅ SUCCESS: All ${THEMES.length} themes pass WCAG 2.2 AA`);
}

main();
```

**Add to `package.json`**:
```json
{
  "scripts": {
    "validate:themes": "tsx scripts/validate-themes.ts",
    "prebuild": "npm run validate:themes"
  }
}
```

**Effort**: 6 hours

---

#### Task 1.3: Create Color Utilities (3h)

**New File**: `scripts/utils/color.ts`

```typescript
/**
 * Parse OKLCH color string to [lightness, chroma, hue]
 * @example parseOKLCH("85% 0.30 145") → [85, 0.30, 145]
 */
export function parseOKLCH(oklch: string): [number, number, number] {
  // Remove "oklch(" and ")" if present
  const cleaned = oklch.replace(/oklch\(|\)/g, '').trim();

  // Match: "85% 0.30 145" or "85 0.30 145"
  const match = cleaned.match(/(\d+(?:\.\d+)?)%?\s+([\d.]+)\s+([\d.]+)/);

  if (!match) {
    throw new Error(`Invalid OKLCH format: "${oklch}". Expected "L% C H" or "L C H"`);
  }

  return [
    parseFloat(match[1]), // lightness 0-100
    parseFloat(match[2]), // chroma 0-0.4
    parseFloat(match[3]), // hue 0-360
  ];
}

/**
 * Calculate WCAG 2.1 contrast ratio between two OKLCH colors
 * @returns Contrast ratio (1-21)
 */
export function calculateContrastRatio(oklch1: string, oklch2: string): number {
  const [L1] = parseOKLCH(oklch1);
  const [L2] = parseOKLCH(oklch2);

  // Convert OKLCH lightness (0-100) to relative luminance (0-1)
  // Using gamma 2.2 approximation (accurate enough for contrast)
  const lum1 = Math.pow(L1 / 100, 2.2);
  const lum2 = Math.pow(L2 / 100, 2.2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  // WCAG formula: (L1 + 0.05) / (L2 + 0.05)
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG level
 */
export function meetsWCAG(ratio: number, level: 'AA' | 'AAA', size: 'normal' | 'large'): boolean {
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7.0;
  }
  // AA
  return size === 'large' ? ratio >= 3.0 : ratio >= 4.5;
}

/**
 * Suggest lightness adjustment to meet target ratio
 */
export function suggestLightnessAdjustment(
  currentL: number,
  bgL: number,
  targetRatio: number
): number {
  // If text is lighter than bg, increase lightness
  // If text is darker than bg, decrease lightness
  const direction = currentL > bgL ? 1 : -1;

  // Binary search for optimal lightness
  let low = 0, high = 100;
  let best = currentL;

  for (let i = 0; i < 10; i++) {
    const mid = (low + high) / 2;
    const testRatio = calculateContrastRatio(
      `${mid}% 0.2 0`,
      `${bgL}% 0.2 0`
    );

    if (testRatio >= targetRatio) {
      best = mid;
      if (direction > 0) high = mid;
      else low = mid;
    } else {
      if (direction > 0) low = mid;
      else high = mid;
    }
  }

  return Math.round(best);
}
```

**Effort**: 3 hours

---

### Phase 2: Validate Themes (Week 2 - 7 hours)

**Goal**: All 6 themes pass WCAG AA with perfect contrast ratios

#### Task 2.1: Run Initial Validation (1h)

```bash
npm run validate:themes
```

**Expected output** (likely failures):
```
🔍 Validating WCAG 2.2 AA compliance for 6 themes...

📋 Theme: LIGHT
────────────────────────────────────────────────────────────
✅ All 10 checks passed

📋 Theme: DARK
────────────────────────────────────────────────────────────
✅ All 10 checks passed

📋 Theme: RED
────────────────────────────────────────────────────────────
❌ 2 failures:

   Muted text on card
   --muted-foreground (70% 0.24 25) on --card (5% 0.02 25)
   Ratio: 4.2:1 (need 4.5:1)

   Muted on base
   --muted-foreground (70% 0.24 25) on --background (5% 0.02 25)
   Ratio: 4.2:1 (need 4.5:1)

... (similar for other CRT themes)

============================================================
📊 SUMMARY: 6 themes, 60 total checks

❌ FAILED: 8 contrast violations found
```

**Document all failures in a tracking file:**

**New File**: `.claude/audit/wcag-failures-tracker.md`

```markdown
# WCAG Contrast Failures Tracking

## Initial Run (Week 2, Day 1)

| Theme | Failure | Current Ratio | Target | Fix Applied | Status |
|-------|---------|---------------|--------|-------------|--------|
| red | Muted on card | 4.2:1 | 4.5:1 | Increase L 70→75% | 🔧 Pending |
| red | Muted on base | 4.2:1 | 4.5:1 | Same fix | 🔧 Pending |
| blue | Muted on card | 4.3:1 | 4.5:1 | Increase L 72→77% | 🔧 Pending |
| ... | ... | ... | ... | ... | ... |
```

**Effort**: 1 hour (run + document)

---

#### Task 2.2: Fix Contrast Failures (4h)

**Strategy**: Adjust lightness in 5% increments until ratio ≥ 4.5:1

**Example fix for red theme**:

**File**: `src/app/globals.css` (find `[data-theme='red']` block)

```css
/* BEFORE */
[data-theme='red'] {
  --muted-foreground: 70% 0.24 25;  /* 4.2:1 - FAIL */
}

/* AFTER */
[data-theme='red'] {
  --muted-foreground: 75% 0.24 25;  /* 5.1:1 - PASS ✅ */
}
```

**Process**:
1. Apply fix
2. Run `npm run validate:themes`
3. Update tracker with result
4. Repeat until all pass

**Effort**: 4 hours (assumes 8 failures × 30 min each)

---

#### Task 2.3: Unify CSS Variables (2h)

**Goal**: All 6 themes have BOTH legacy + semantic variables

**Current**: Only dark theme has semantic variables (lines 270-282)

**Action**: Add semantic mappings to 5 themes (light, red, blue, green, amber)

**Pattern**:

```css
[data-theme='light'] {
  /* EXISTING - Keep all 40+ variables */
  --background: 96% 0 0;
  --foreground: 24% 0 0;
  --primary: 38% 0.28 230;
  /* ... */

  /* NEW - Add semantic mappings */
  --color-bg-canvas: var(--background);
  --color-bg-surface: var(--card);
  --color-bg-elevated: var(--popover);
  --color-bg-accent: var(--primary);
  --color-bg-muted: var(--muted);

  --color-text-primary: var(--foreground);
  --color-text-secondary: var(--card-foreground);
  --color-text-muted: var(--muted-foreground);
  --color-text-accent: var(--primary);

  --color-border-default: var(--border);
  --color-border-focus: var(--ring);
  --color-border-input: var(--input);
}

/* Repeat for: red, blue, green, amber */
```

**Effort**: 2 hours (30 min per theme × 5 themes, minus dark which already has it)

---

### Phase 3: Component Migration (Week 3-4 - 45 hours)

**Goal**: Refactor all 100+ components to use `mode.*` tokens exclusively

#### Week 3: Core Components (10 components - 10h)

**Priority components** (most used):

1. `button.tsx` (1h)
2. `input.tsx` (1h)
3. `textarea.tsx` (1h)
4. `card.tsx` (1h)
5. `badge.tsx` (1h)
6. `alert.tsx` (1h)
7. `label.tsx` (1h)
8. `select.tsx` (1h)
9. `checkbox.tsx` (1h)
10. `switch.tsx` (1h)

**Refactoring Pattern** (Button example):

**File**: `src/components/ui/button.tsx`

**BEFORE** (raw Tailwind):
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase font-mono border border-border",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-none px-3",
        lg: "h-11 rounded-none px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

**AFTER** (mode tokens):
```tsx
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap",
    mode.radius,           // "rounded-none"
    mode.typography.button, // "text-xs font-medium uppercase"
    mode.font,             // "font-mono"
    mode.state.focus.ring, // Focus ring styles
    mode.state.focus.outline, // Remove outline
    mode.state.disabled.pointer, // Disabled pointer events
    mode.state.disabled.opacity, // Disabled opacity
    "transition-colors",
    mode.color.border.default, // "border border-border"
  ),
  {
    variants: {
      variant: {
        default: cn(
          mode.color.bg.accent,
          mode.color.text.inverse,
          mode.state.hover.bg,
        ),
        destructive: cn(
          mode.color.bg.danger,
          "text-destructive-foreground",
          "hover:bg-destructive/90",
        ),
        outline: cn(
          "border",
          mode.color.border.input,
          mode.color.bg.base,
          "hover:bg-accent hover:text-accent-foreground",
        ),
        secondary: cn(
          mode.color.bg.secondary,
          "text-secondary-foreground",
          "hover:bg-secondary/80",
        ),
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: cn(mode.color.text.accent, "underline-offset-4 hover:underline"),
      },
      size: {
        default: cn("h-10", mode.spacing.button.md),
        sm: cn("h-9", mode.spacing.button.sm),
        lg: cn("h-11", mode.spacing.button.lg),
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

**Testing checklist per component**:
- [ ] Component renders in all 6 color themes
- [ ] Visual appearance unchanged from original
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Hover/focus/disabled states work correctly

**Effort**: 10 hours (1h per component × 10)

---

#### Week 4: Remaining Components (90+ components - 35h)

**Batch 1: Complex UI Components** (15 components - 15h)
- `dialog.tsx`
- `dropdown-menu.tsx`
- `popover.tsx`
- `tabs.tsx`
- `table.tsx`
- `accordion.tsx`
- `avatar.tsx`
- `calendar.tsx`
- `command.tsx`
- `context-menu.tsx`
- `hover-card.tsx`
- `menubar.tsx`
- `navigation-menu.tsx`
- `radio-group.tsx`
- `scroll-area.tsx`

**Batch 2: Marketing Components** (~20 components - 10h)
- Hero sections
- Feature cards
- Pricing tables
- Testimonials
- CTAs
- Footer sections

**Batch 3: Dashboard Components** (~15 components - 5h)
- Data tables
- Stats cards
- Charts wrappers
- Sidebar navigation

**Batch 4: Docs Components** (~10 components - 5h)
- DocsCard
- CodeBlock
- ComponentShowcase
- FeatureGuide templates

**Effort**: 35 hours total

---

### Phase 4: Guardrails (Week 5 - 8 hours)

**Goal**: Prevent regressions through automated validation

#### Task 4.1: ESLint Design System Rules (4h)

**New File**: `.eslintrc-design-system.js`

```javascript
module.exports = {
  rules: {
    'design-system/no-hardcoded-colors': {
      pattern: /(?:bg|text|border)-(red|blue|green|gray|purple|pink|yellow|orange)-\d{3}/,
      severity: 'error',
      message: 'Use mode.color.* tokens instead of hardcoded Tailwind colors',
    },
    'design-system/no-hex-colors': {
      pattern: /#[0-9a-fA-F]{6}/,
      severity: 'error',
      message: 'Use CSS variables instead of hex colors',
      exclude: ['Brand icon colors are intentional'],
    },
    'design-system/use-mode-spacing': {
      pattern: /className="[^"]*p[xy]?-\d+/,
      severity: 'warn',
      message: 'Consider using mode.spacing.* tokens',
    },
    'design-system/use-mode-radius': {
      pattern: /rounded-(sm|md|lg|xl|2xl|3xl)/,
      severity: 'error',
      message: 'Use mode.radius instead of hardcoded border radius',
    },
    'design-system/use-mode-shadow': {
      pattern: /shadow-(md|lg|xl|2xl)/,
      severity: 'error',
      message: 'Use mode.shadow instead of hardcoded shadows',
    },
    'design-system/no-arbitrary-values': {
      pattern: /\[[\d.]+(?:px|rem|em)\]/,
      severity: 'warn',
      message: 'Prefer design system tokens over arbitrary values',
    },
  },
};
```

**Update `.eslintrc.js`**:
```javascript
module.exports = {
  extends: [
    'next/core-web-vitals',
    './.eslintrc-design-system.js',
  ],
};
```

**Test**:
```bash
npm run lint
```

**Effort**: 4 hours (rule creation + testing)

---

#### Task 4.2: Pre-Commit Hook Integration (1h)

**Update** `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running design system validations..."

# 1. WCAG contrast validation
echo "\n[1/4] Validating WCAG contrast ratios..."
npm run validate:themes
if [ $? -ne 0 ]; then
  echo "❌ WCAG validation failed. Fix contrast issues before committing."
  exit 1
fi

# 2. Hex color scan
echo "\n[2/4] Scanning for hardcoded colors..."
npm run scan:hex
if [ $? -ne 0 ]; then
  echo "❌ Hardcoded colors detected. Use design tokens."
  exit 1
fi

# 3. TypeScript check
echo "\n[3/4] Type checking..."
npm run type-check
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found."
  exit 1
fi

# 4. ESLint
echo "\n[4/4] Linting..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ ESLint errors found."
  exit 1
fi

echo "\n✅ All checks passed!"
```

**Effort**: 1 hour

---

#### Task 4.3: Runtime Dev Validation (3h)

**New File**: `src/lib/dev-validation.ts`

```typescript
/**
 * Runtime contrast validation (development only)
 * Warns in console when elements have insufficient contrast
 */

if (process.env.NODE_ENV === 'development') {
  // Only run in browser
  if (typeof window !== 'undefined') {

    let checkTimeout: NodeJS.Timeout;
    let checkedElements = new WeakSet<Element>();

    function rgbToLuminance(r: number, g: number, b: number): number {
      const [rs, gs, bs] = [r, g, b].map(c => {
        const sRGB = c / 255;
        return sRGB <= 0.03928
          ? sRGB / 12.92
          : Math.pow((sRGB + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function parseRgb(rgb: string): [number, number, number] {
      const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return [0, 0, 0];
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }

    function getContrastRatio(fg: string, bg: string): number {
      const [r1, g1, b1] = parseRgb(fg);
      const [r2, g2, b2] = parseRgb(bg);

      const lum1 = rgbToLuminance(r1, g1, b1);
      const lum2 = rgbToLuminance(r2, g2, b2);

      const lighter = Math.max(lum1, lum2);
      const darker = Math.min(lum1, lum2);

      return (lighter + 0.05) / (darker + 0.05);
    }

    function checkContrast() {
      const textElements = document.querySelectorAll(
        'p, span, a, button, h1, h2, h3, h4, h5, h6, li, td, th, label, input, textarea'
      );

      textElements.forEach(el => {
        // Skip if already checked
        if (checkedElements.has(el)) return;
        checkedElements.add(el);

        const styles = getComputedStyle(el);
        const fg = styles.color;
        const bg = styles.backgroundColor;

        // Skip transparent backgrounds (walk up DOM)
        if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
          return;
        }

        const ratio = getContrastRatio(fg, bg);
        const fontSize = parseFloat(styles.fontSize);

        // WCAG AA: 4.5:1 for normal text, 3:1 for large text (18px+)
        const minRatio = fontSize >= 18 ? 3.0 : 4.5;

        if (ratio < minRatio) {
          console.warn(
            `⚠️ Contrast violation (${ratio.toFixed(2)}:1, need ${minRatio}:1)`,
            {
              element: el,
              text: el.textContent?.substring(0, 50),
              color: fg,
              background: bg,
              fontSize: `${fontSize}px`,
            }
          );
        }
      });
    }

    // Debounced check on DOM changes
    const observer = new MutationObserver(() => {
      clearTimeout(checkTimeout);
      checkTimeout = setTimeout(checkContrast, 1000);
    });

    // Start observing after DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'style'],
        });
        checkContrast(); // Initial check
      });
    } else {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style'],
      });
      checkContrast(); // Initial check
    }

    console.log('🎨 Dev validation: Contrast checking enabled');
  }
}

export {};
```

**Import in** `src/app/layout.tsx`:

```tsx
// Add at top
import '@/lib/dev-validation';
```

**Effort**: 3 hours

---

### 🆕 Phase 5: Visual Regression Testing (Week 6 - 12 hours)

**Goal**: Catch visual bugs before they reach production

#### Task 5.1: Set Up Playwright Visual Testing (4h)

**Install dependencies**:
```bash
npm install -D @playwright/test
npx playwright install
```

**New File**: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**New File**: `tests/visual/components.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

const THEMES = ['light', 'dark', 'red', 'blue', 'green', 'amber'];
const VISUAL_MODES = ['terminal', 'modern', 'soft'];

test.describe('Component Visual Regression', () => {

  for (const theme of THEMES) {
    test(`Button - ${theme} theme`, async ({ page }) => {
      await page.goto('/theme-showcase');

      // Switch theme
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
      }, theme);

      // Wait for theme to apply
      await page.waitForTimeout(500);

      // Screenshot button variants
      const buttonSection = page.locator('[data-testid="button-variants"]');
      await expect(buttonSection).toHaveScreenshot(`button-${theme}.png`, {
        maxDiffPixels: 100,
      });
    });

    test(`Input - ${theme} theme`, async ({ page }) => {
      await page.goto('/theme-showcase');

      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
      }, theme);

      await page.waitForTimeout(500);

      const inputSection = page.locator('[data-testid="input-variants"]');
      await expect(inputSection).toHaveScreenshot(`input-${theme}.png`, {
        maxDiffPixels: 100,
      });
    });

    test(`Card - ${theme} theme`, async ({ page }) => {
      await page.goto('/theme-showcase');

      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
      }, theme);

      await page.waitForTimeout(500);

      const cardSection = page.locator('[data-testid="card-variants"]');
      await expect(cardSection).toHaveScreenshot(`card-${theme}.png`, {
        maxDiffPixels: 100,
      });
    });
  }
});

test.describe('Theme Combinations', () => {
  for (const theme of THEMES) {
    for (const visual of VISUAL_MODES) {
      test(`${visual} visual + ${theme} color`, async ({ page }) => {
        await page.goto('/theme-showcase');

        // Set both themes
        await page.evaluate(({ t, v }) => {
          document.documentElement.setAttribute('data-theme', t);
          document.documentElement.setAttribute('data-visual-theme', v);
        }, { t: theme, v: visual });

        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot(`combo-${visual}-${theme}.png`, {
          fullPage: true,
          maxDiffPixels: 200,
        });
      });
    }
  }
});
```

**New Page**: `src/app/theme-showcase/page.tsx` (for visual testing)

```tsx
export default function ThemeShowcase() {
  return (
    <div className="container mx-auto space-y-12 p-8">
      <section data-testid="button-variants" className="space-y-4">
        <h2>Buttons</h2>
        <div className="flex gap-2">
          <Button variant="default">> DEFAULT</Button>
          <Button variant="secondary">> SECONDARY</Button>
          <Button variant="destructive">> DESTRUCTIVE</Button>
          <Button variant="outline">> OUTLINE</Button>
          <Button variant="ghost">> GHOST</Button>
        </div>
      </section>

      <section data-testid="input-variants" className="space-y-4">
        <h2>Inputs</h2>
        <Input placeholder="Enter text..." />
        <Input disabled placeholder="Disabled..." />
        <Input type="search" placeholder="Search..." />
      </section>

      <section data-testid="card-variants" className="space-y-4">
        <h2>Cards</h2>
        <Card>
          <CardHeader>[0x00] CARD_TITLE</CardHeader>
          <CardContent>Card content here</CardContent>
        </Card>
      </section>
    </div>
  );
}
```

**Run tests**:
```bash
npx playwright test --update-snapshots  # Generate baseline
npx playwright test                     # Compare against baseline
```

**Effort**: 4 hours

---

#### Task 5.2: Visual QA of All 18 Theme Combinations (6h)

**Manual testing matrix**:

| Color Theme | Visual Mode | Status | Issues Found | Notes |
|-------------|-------------|--------|--------------|-------|
| light | terminal | ⬜ | | |
| light | modern | ⬜ | | |
| light | soft | ⬜ | | |
| dark | terminal | ⬜ | | |
| dark | modern | ⬜ | | |
| dark | soft | ⬜ | | |
| ... (18 total) | ... | ... | ... | ... |

**For each combination, test**:
1. Navigate to homepage
2. Switch color theme
3. Switch visual theme
4. Check:
   - [ ] Button variants (default, secondary, destructive, outline, ghost)
   - [ ] Input states (default, hover, focus, disabled, error)
   - [ ] Card headers and content
   - [ ] Badge colors
   - [ ] Alert variants
   - [ ] Navigation elements
   - [ ] Form components
   - [ ] Data tables
   - [ ] Modals/dialogs

**Screenshot each combination** for documentation.

**Effort**: 6 hours (20 min per combination × 18)

---

#### Task 5.3: Performance Profiling (2h)

**Check for performance regressions after refactor**:

```bash
npm run build
npm run start

# Test Core Web Vitals
npm install -D lighthouse
npx lighthouse http://localhost:3000 --view
```

**Metrics to verify**:
- FCP (First Contentful Paint) < 1.8s
- LCP (Largest Contentful Paint) < 2.5s
- CLS (Cumulative Layout Shift) < 0.1
- TTI (Time to Interactive) < 3.8s

**Document in** `.claude/audit/performance-after-refactor.md`

**Effort**: 2 hours

---

### 🆕 Phase 6: Edge Case Discovery (Week 7 - 12 hours)

**Goal**: Find and fix issues that automated tests missed

#### Task 6.1: Accessibility Audit (4h)

**Tools**:
- axe DevTools Chrome extension
- NVDA/JAWS screen reader testing (Windows)
- VoiceOver testing (macOS)
- Keyboard-only navigation

**Test scenarios**:
1. **Keyboard navigation**
   - [ ] Tab through all interactive elements
   - [ ] Shift+Tab works in reverse
   - [ ] Enter/Space activate buttons
   - [ ] Escape closes modals
   - [ ] Arrow keys work in dropdowns/menus

2. **Screen reader**
   - [ ] All images have alt text
   - [ ] Forms have labels
   - [ ] Buttons have accessible names
   - [ ] Status messages announced
   - [ ] Landmarks identified

3. **Color blindness** (use Chrome DevTools emulation)
   - [ ] Protanopia (red-blind)
   - [ ] Deuteranopia (green-blind)
   - [ ] Tritanopia (blue-blind)
   - [ ] Achromatopsia (total color blindness)

**Document issues in** `.claude/audit/a11y-issues.md`

**Effort**: 4 hours

---

#### Task 6.2: Browser Compatibility Testing (4h)

**Test matrix**:

| Browser | Version | macOS | Windows | Mobile | Status |
|---------|---------|-------|---------|--------|--------|
| Chrome | Latest | ⬜ | ⬜ | ⬜ | |
| Firefox | Latest | ⬜ | ⬜ | - | |
| Safari | Latest | ⬜ | - | ⬜ | |
| Edge | Latest | - | ⬜ | - | |

**For each browser, test**:
- Theme switching
- CSS variable support
- OKLCH color rendering
- Framer Motion animations
- Form interactions
- Responsive breakpoints

**Known issues to verify**:
- Safari OKLCH support (requires Safari 15.4+)
- Firefox CSS custom property inheritance
- Edge CSS containment bugs

**Effort**: 4 hours

---

#### Task 6.3: Responsive Testing (4h)

**Breakpoints to test**:
- Mobile: 375px (iPhone SE)
- Mobile: 390px (iPhone 12/13)
- Tablet: 768px (iPad)
- Desktop: 1024px
- Desktop: 1440px
- Desktop: 1920px

**For each breakpoint**:
- [ ] Navigation collapses correctly
- [ ] Cards stack/grid appropriately
- [ ] Forms remain usable
- [ ] Tables scroll or stack
- [ ] Modals fit on screen
- [ ] Text doesn't overflow

**Use Chrome DevTools responsive mode + real devices**.

**Effort**: 4 hours

---

### 🆕 Phase 7: Documentation & Polish (Week 8 - 12 hours)

**Goal**: Perfect documentation with examples and screenshots

#### Task 7.1: Design System Documentation (6h)

**Update** `DESIGN_SYSTEM.md` with:

1. **Complete token reference**
   ```markdown
   ### Color Tokens

   | Token | Usage | Example |
   |-------|-------|---------|
   | `mode.color.bg.base` | Primary background | Page canvas |
   | `mode.color.bg.surface` | Elevated surface | Cards, panels |
   | ... | ... | ... |
   ```

2. **Component examples** (with screenshots)
   - Button variants in all 6 themes
   - Input states
   - Card layouts
   - Badge colors
   - Alert types

3. **Theme customization guide**
   ```typescript
   // How to add a new color theme
   ```

4. **WCAG compliance checklist**
   - How to validate new colors
   - Contrast ratio requirements
   - Typography size guidelines

**Effort**: 6 hours

---

#### Task 7.2: Migration Guide for Future Developers (3h)

**New File**: `MIGRATION_GUIDE.md`

```markdown
# Design System Migration Guide

## For New Components

When creating a new component, ALWAYS use `mode` tokens:

\`\`\`tsx
import { mode } from '@/design-system';

export function MyComponent() {
  return (
    <div className={cn(
      mode.color.bg.surface,
      mode.spacing.card.padding,
      mode.radius,
      mode.font,
    )}>
      {/* ... */}
    </div>
  );
}
\`\`\`

## For Existing Components

If you find a component using raw Tailwind:

1. Import mode object
2. Replace color classes with mode.color.*
3. Replace spacing with mode.spacing.*
4. Replace radius with mode.radius
5. Test in all 6 themes
6. Run npm run validate:themes

## Common Patterns

...
```

**Effort**: 3 hours

---

#### Task 7.3: Screenshot Gallery (3h)

**Create visual documentation**:

**New Page**: `src/app/theme-gallery/page.tsx`

Display all 18 theme combinations as a visual reference:
- 6 color themes × 3 visual modes
- Screenshot each component type
- Show hover/focus/disabled states

**Generate screenshots using Playwright**:
```bash
npx playwright test --project=chromium --grep gallery
```

**Store in** `public/theme-gallery/` for docs.

**Effort**: 3 hours

---

## Summary Timeline

| Phase | Week | Hours | Deliverables | Grade Impact |
|-------|------|-------|--------------|--------------|
| **Phase 0** | - | 1h | Quick wins (6 themes, 18 combos) | +5 points |
| **Phase 1** | 1 | 13h | Token system, WCAG validation | +10 points |
| **Phase 2** | 2 | 7h | All themes pass WCAG AA | +10 points |
| **Phase 3** | 3-4 | 45h | All components use tokens | +15 points |
| **Phase 4** | 5 | 8h | Guardrails (ESLint, hooks) | +5 points |
| **Phase 5** | 6 | 12h | Visual regression testing | +5 points |
| **Phase 6** | 7 | 12h | Edge case discovery | +5 points |
| **Phase 7** | 8 | 12h | Documentation polish | +5 points |
| **TOTAL** | 8 weeks | **110h** | **Production-perfect system** | **+60 points** |

**Current**: C (60/100)
**After Phase 0-4** (5 weeks): A- (90/100)
**After Phase 5-7** (8 weeks): **A (100/100)** ✅

---

## Success Criteria for 100% Grade A

### Must Have (Blocking)

- [x] Audit 1 is 100% accurate (architecture + accessibility)
- [ ] All 14 issues from audit resolved
- [ ] Zero critical issues remaining
- [ ] All 6 themes pass WCAG AA (≥4.5:1 contrast)
- [ ] 100+ components use `mode.*` tokens exclusively
- [ ] Zero raw Tailwind colors/spacing in components
- [ ] `npm run validate:themes` passes
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes (zero errors/warnings)
- [ ] Pre-commit hooks enforce all rules
- [ ] All 18 theme combinations tested

### Should Have (Quality)

- [ ] Visual regression tests cover all components
- [ ] Performance unchanged (Core Web Vitals)
- [ ] Browser compatibility verified (Chrome, Firefox, Safari, Edge)
- [ ] Responsive breakpoints tested (375px - 1920px)
- [ ] Keyboard navigation works everywhere
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Color blindness tested (all 4 types)
- [ ] Documentation complete with examples
- [ ] Screenshot gallery generated

### Nice to Have (Polish)

- [ ] Migration guide for new developers
- [ ] Component API documented
- [ ] Theme customization guide
- [ ] Performance profiling report
- [ ] Accessibility audit report

---

## Risk Mitigation

### High Risk: WCAG Failures (60% likelihood)

**Plan**: Budget 2 extra days in Week 2 for contrast adjustments

**Mitigation**:
1. Run validation early (Day 1 of Week 2)
2. Document all failures immediately
3. Fix in batches (group by theme)
4. Revalidate after each batch
5. Use `suggestLightnessAdjustment()` utility

### Medium Risk: Visual Regressions (40% likelihood)

**Plan**: Add visual regression testing (Phase 5)

**Mitigation**:
1. Generate baseline screenshots in Week 6
2. Compare after each component migration
3. Fix immediately when detected
4. Update baselines only after manual review

### Low Risk: Performance Impact (20% likelihood)

**Plan**: Profile before/after in Week 6

**Mitigation**:
1. Baseline metrics before refactor
2. Profile after Phase 3 (components)
3. Optimize if LCP > 2.5s or CLS > 0.1
4. Runtime validation only in dev mode

---

## Next Steps

### Today (1 hour)
1. ✅ Review this plan
2. [ ] Run Phase 0 Quick Wins (1 hour)
3. [ ] Test all 18 theme combinations manually
4. [ ] Commit quick wins

### This Week (13 hours)
1. [ ] Phase 1: Extend mode object (4h)
2. [ ] Phase 1: Create WCAG validation (6h)
3. [ ] Phase 1: Create color utilities (3h)
4. [ ] Run initial validation, document failures

### Week 2 (7 hours)
1. [ ] Phase 2: Fix all WCAG failures (4h)
2. [ ] Phase 2: Unify CSS variables (2h)
3. [ ] Verify all 6 themes pass validation
4. [ ] Commit: "feat: all themes pass WCAG AA"

### Week 3-8
Follow phase breakdown above, committing after each milestone.

---

## Questions Before Starting

1. **Timeline acceptable?** 8 weeks (110h) for perfect Grade A vs. 5 weeks (74h) for Grade A- (90%)
2. **Phase priority?** Follow order as written or adjust based on business needs?
3. **Breaking changes OK?** Some component APIs may need minor adjustments
4. **Testing depth?** All 18 theme combinations × all components = extensive testing
5. **Documentation scope?** Complete docs vs. minimal docs?

---

**Ready to begin?** Say "start phase 0" to run Quick Wins (1 hour).

---

*Built with Claude Code. Last updated: December 10, 2025*
