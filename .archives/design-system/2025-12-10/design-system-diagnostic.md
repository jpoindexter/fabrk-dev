# Fabrk Design System Diagnostic

## Architecture Overview

**Dual Theme System:**
- **2 Color Themes:** Light and Dark (controls colors via `data-theme` attribute)
- **2 Visual Themes:** Terminal and Modern (controls borders/fonts via `data-visual-mode` attribute)

## Audit Scope

### 1. Color Theme Validation (Light/Dark)

**Check in `src/app/globals.css`:**
- [ ] Both `[data-theme='light']` and `[data-theme='dark']` exist
- [ ] All required CSS variables defined in both themes:
  - `--background`, `--foreground`
  - `--primary`, `--primary-foreground`
  - `--secondary`, `--secondary-foreground`
  - `--accent`, `--accent-foreground`
  - `--muted`, `--muted-foreground`
  - `--card`, `--card-foreground`
  - `--popover`, `--popover-foreground`
  - `--border`, `--input`, `--ring`
  - `--destructive`, `--destructive-foreground`
  - `--success`, `--success-foreground`
  - `--warning`, `--warning-foreground`
- [ ] OKLCH format used consistently
- [ ] No references to removed themes (cupcake, bumblebee, synthwave, etc.)

### 2. Visual Theme Validation (Terminal/Modern)

**Check for `[data-visual-mode='terminal']` and `[data-visual-mode='modern']`:**
- [ ] Terminal mode enforces `rounded-none` globally
- [ ] Modern mode allows rounded corners
- [ ] Font switching logic exists (mono vs sans)
- [ ] Shadow rules defined per visual mode

### 3. Component Compliance (234 components)

**Critical Rules:**
1. **NO hardcoded colors** - Use design tokens only
2. **NO rounded classes** - Use `mode.radius` from `@/design-system`
3. **NO explicit fonts** - Use `mode.font` from `@/design-system`
4. **ALL buttons** - Must have `> ` prefix and UPPERCASE text

**Scan for violations:**
```bash
# Hardcoded colors
npm run scan:hex

# Banned Tailwind classes
grep -r "bg-white\|bg-black\|text-white\|text-black" src/components/ src/app/

# Hardcoded rounded values
grep -r "rounded-sm\|rounded-md\|rounded-lg\|rounded-xl" src/components/ src/app/

# Missing mode imports
grep -L "from '@/design-system'" src/components/**/*.tsx src/app/**/*.tsx
```

### 4. Typography Standards

**Terminal Text Casing:**
- [ ] UI Labels/Badges: UPPERCASE `[SYSTEM INIT]`
- [ ] Button Text: UPPERCASE with `> ` prefix
- [ ] Headlines (H1/H2): UPPERCASE
- [ ] Body Text: Normal sentence case
- [ ] Tech Stack Labels: UPPERCASE

**Font Application:**
- [ ] `<body>` tag has `className="font-mono antialiased"`
- [ ] JetBrains Mono applied globally
- [ ] Components inherit font automatically

### 5. Design Token Usage

**Check all components use semantic tokens:**
```tsx
// GOOD
className="bg-primary text-primary-foreground"
className="bg-card text-card-foreground"
className="border-border"

// BAD
className="bg-purple-500 text-white"
className="bg-gray-100"
className="border-gray-300"
```

### 6. Theme Switcher Components

**Verify these work correctly:**
- [ ] `ThemeDropdown` - Light/Dark switching
- [ ] `VisualThemeDropdown` - Terminal/Modern switching
- [ ] `ColorThemeSwitcher` - Alternative color switcher
- [ ] Theme persistence to localStorage
- [ ] No theme flash on page load

### 7. Documentation Accuracy

**Check these pages reflect 2-theme system:**
- [ ] `/docs/extras/theming` - Should say "2 Color Themes"
- [ ] `/theme-showcase` - Shows only Light/Dark options
- [ ] `DESIGN_SYSTEM.md` - Accurate architecture description
- [ ] `CLAUDE.md` - Updated theme documentation

### 8. ESLint & Pre-commit Hooks

**Verify enforcement:**
- [ ] `design-system/no-hardcoded-colors` rule active
- [ ] Pre-commit audit catches violations
- [ ] Appropriate eslint-disable comments where needed

## Automated Scan Commands

Run these to find violations:

```bash
# 1. Hardcoded hex colors
npm run scan:hex

# 2. Tailwind color classes (should use tokens)
grep -rn "bg-\(white\|black\|gray\|slate\|zinc\|red\|blue\|green\|yellow\|purple\)" src/components/ src/app/ \
  --include="*.tsx" \
  | grep -v "bg-background\|bg-card\|bg-primary\|bg-secondary\|bg-muted\|bg-accent\|bg-destructive\|bg-success\|bg-warning"

# 3. Hardcoded rounded values (should use mode.radius)
grep -rn "rounded-\(sm\|md\|lg\|xl\|2xl\|3xl\)" src/components/ src/app/ \
  --include="*.tsx" \
  | grep -v "eslint-disable"

# 4. Direct font classes (should use mode.font)
grep -rn "font-sans\|font-serif" src/components/ src/app/ \
  --include="*.tsx" \
  | grep -v "eslint-disable"

# 5. Missing 'use client' with useState/useEffect
grep -rn "useState\|useEffect" src/components/ src/app/ \
  --include="*.tsx" \
  | while read line; do
      file=$(echo "$line" | cut -d: -f1)
      if ! grep -q "'use client'" "$file"; then
        echo "$line (missing 'use client')"
      fi
    done

# 6. References to removed themes
grep -rn "cupcake\|bumblebee\|emerald\|corporate\|synthwave\|retro\|cyberpunk\|valentine\|halloween\|garden\|forest\|aqua\|lofi\|pastel\|fantasy\|wireframe\|luxury\|dracula\|amber" src/ \
  --include="*.tsx" --include="*.ts" --include="*.css"

# 7. TypeScript compilation
npm run type-check

# 8. ESLint
npm run lint
```

## Visual Discrepancy Checklist

**Test in browser with all 4 combinations:**
1. Light + Terminal
2. Light + Modern
3. Dark + Terminal
4. Dark + Modern

**Check for:**
- [ ] All text readable (sufficient contrast)
- [ ] Borders visible in all modes
- [ ] Buttons have consistent styling
- [ ] Cards have proper backgrounds
- [ ] Inputs have clear boundaries
- [ ] Hover states work
- [ ] Focus states visible
- [ ] No layout shifts between themes
- [ ] No color bleeding (backgrounds matching text)

## Expected File Changes

After running this diagnostic, expect to fix:

1. **Color Token Violations** - Replace hardcoded colors with tokens
2. **Border Radius Issues** - Replace `rounded-*` with `mode.radius`
3. **Font Issues** - Replace `font-sans` with `mode.font`
4. **Button Text** - Add `> ` prefix and UPPERCASE
5. **Missing 'use client'** - Add to components with hooks
6. **Documentation Updates** - Reflect 2-theme architecture
7. **Type Definitions** - Update from `DaisyUITheme` to `ColorTheme`

## Success Criteria

- ✅ Zero hardcoded colors (hex values or Tailwind color classes)
- ✅ All components use `mode.radius` and `mode.font`
- ✅ All buttons follow `> UPPERCASE` pattern
- ✅ Both color themes (Light/Dark) work perfectly
- ✅ Both visual themes (Terminal/Modern) work perfectly
- ✅ All 4 combinations tested visually
- ✅ TypeScript compiles with no errors
- ✅ ESLint passes with no errors
- ✅ Pre-commit hooks pass
- ✅ Documentation accurate
