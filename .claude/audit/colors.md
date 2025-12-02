# Color System

Design token-based color system. NEVER use hardcoded colors.

---

## Allowed Color Tokens

### Backgrounds

```tsx
bg-background      // Page background
bg-card            // Card surfaces
bg-muted           // Subtle backgrounds
bg-primary         // Brand/CTA backgrounds
bg-secondary       // Secondary action backgrounds
bg-destructive     // Error state backgrounds
bg-success         // Success state backgrounds
bg-warning         // Warning state backgrounds
bg-info            // Info state backgrounds
```

### Text Colors

```tsx
text-foreground           // Primary text
text-muted-foreground     // Secondary text, descriptions
text-primary              // Brand color text
text-primary-foreground   // Text on primary background
text-destructive          // Error text
text-destructive-foreground // Text on destructive background
text-success              // Success text
text-warning              // Warning text
text-info                 // Info text
```

### Border Colors

```tsx
border-border      // Standard borders
border-input       // Input borders
border-primary     // Accent borders
```

### Chart Colors

```tsx
chart-1 through chart-5  // For data visualizations
```

---

## BANNED Colors (No Exceptions)

### Hardcoded Hex Values

```tsx
// ❌ NEVER use hardcoded colors
#8b5cf6
#ffffff
#000000
#ef4444
```

### Tailwind Palette Colors

```tsx
// ❌ NEVER use raw Tailwind colors
bg-gray-500
text-purple-600
border-slate-200
bg-red-500
text-blue-400
bg-green-600
```

### Raw Color Functions

```tsx
// ❌ NEVER use raw color functions
rgb(255, 255, 255)
hsl(280, 100%, 50%)
oklch(70% 0.15 300)

// ✅ ONLY use var() with CSS variables
oklch(var(--primary))
```

### Named Colors

```tsx
// ❌ NEVER use named colors
bg-white
text-black
border-gray
```

---

## Semantic Color Meaning

| Color | Use | Token | Psychology |
|-------|-----|-------|------------|
| **Primary** | Brand, CTAs, links | `bg-primary` | Trust, action, identity |
| **Success** | Completion, positive | `text-success` | Growth, go, approval |
| **Warning** | Caution, attention | `text-warning` | Alert, proceed carefully |
| **Destructive** | Error, danger, delete | `text-destructive` | Stop, critical, urgent |
| **Info** | Information, neutral | `text-info` | Calm, informational |
| **Muted** | Secondary, disabled | `text-muted-foreground` | De-emphasized |

---

## Color Accessibility Rules

### Never Convey Information by Color Alone

```tsx
// CRITICAL: Always pair color with icon/text

// ✅ CORRECT: Color + icon + text
<div className="text-destructive flex items-center gap-2">
  <AlertCircle className="h-4 w-4" aria-hidden="true" />
  <span>[ERROR]: Invalid email</span>
</div>

// ❌ WRONG: Color only
<p className="text-destructive">Invalid email</p>

// ✅ CORRECT: Status with icon
<Badge className="flex items-center gap-1">
  <CheckCircle className="h-3 w-3" aria-hidden="true" />
  <span>Active</span>
</Badge>

// ❌ WRONG: Color-only status
<Badge variant="success">Active</Badge>
```

### Color Blindness Considerations

```
- 8% of men, 0.5% of women have color vision deficiency
- Red-green most common (deuteranopia, protanopia)
- Always use icons, patterns, or text labels alongside color
- Test with color blindness simulators
```

---

## Contrast Requirements (WCAG)

| Content Type | Minimum Ratio | Example |
|--------------|---------------|---------|
| Normal text (<18px) | 4.5:1 | Body text, labels |
| Large text (≥18px/14px bold) | 3:1 | Headings, buttons |
| UI components | 3:1 | Focus rings, borders |
| Graphical objects | 3:1 | Charts, icons |
| Decorative | None | Background patterns |

### Checking Contrast

```bash
# Tools for checking contrast:
# - Chrome DevTools > Elements > Contrast
# - WebAIM Contrast Checker
# - axe DevTools extension
# - Stark browser extension
```

---

## Theme Switching

### CSS Variables Auto-Switch

```tsx
// Design tokens automatically switch with theme
// No explicit dark: classes needed for token-based styles

// ✅ CORRECT: Token-based styling (auto-themes)
<Card className="border-border bg-card">
  <CardContent className="text-card-foreground">

// ❌ WRONG: Won't switch with theme
<Card className="border-gray-200 bg-white">
  <CardContent className="text-gray-900">
```

### Testing Theme Switching

Every component should work correctly in:
- [ ] Light theme (default)
- [ ] Dark theme
- [ ] All 20 DaisyUI themes (spot check 3-4)

---

## Color Usage Patterns

### Status Messages

```tsx
// Error
<p className="font-mono text-xs text-destructive">
  [ERROR]: Message here
</p>

// Success
<p className="font-mono text-xs text-success">
  [SUCCESS]: Operation completed
</p>

// Warning
<p className="font-mono text-xs text-warning">
  [WARNING]: Proceed with caution
</p>

// Info
<p className="font-mono text-xs text-info">
  [INFO]: Additional information
</p>
```

### Traffic Light Dots (Only Exception)

```tsx
// Traffic lights use semantic colors with opacity
<div className="flex gap-1.5">
  <div className="size-2 rounded-full bg-destructive/50" />
  <div className="size-2 rounded-full bg-warning/50" />
  <div className="size-2 rounded-full bg-success/50" />
</div>
```

### Links

```tsx
// Standard link
<a className="text-primary hover:underline transition-colors">
  Link text
</a>

// Link in body text
<p className="text-muted-foreground">
  Read the <a className="text-primary underline">documentation</a> for more.
</p>
```

### Badges

```tsx
// Use variants, not custom colors
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>

// ❌ WRONG: Custom background colors
<Badge className="bg-purple-500">Custom</Badge>
```

### Interactive States

```tsx
// Hover
<Button className="hover:bg-primary/90">

// Focus
<Input className="focus:border-primary focus:ring-1 focus:ring-primary">

// Selected
<Card className="border-primary bg-primary/5">
```

---

## Quick Reference Checklist

### Before Every Commit

- [ ] No hardcoded hex colors (`#`)
- [ ] No Tailwind palette colors (`bg-gray-`, `text-purple-`)
- [ ] No raw color functions (`rgb()`, `hsl()`)
- [ ] No `bg-white` or `text-black`
- [ ] Status messages have icons, not just color
- [ ] Links are distinguishable beyond just color

### Violation Search

```bash
# Find hardcoded colors
grep -rE "(bg|text|border)-(red|blue|gray|green|purple|pink|orange|yellow|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-\d+" src/ --include="*.tsx"

# Find hex colors
grep -rE "#[0-9a-fA-F]{3,8}" src/ --include="*.tsx"

# Find rgb/hsl
grep -rE "(rgb|hsl|oklch)\s*\(" src/ --include="*.tsx"
```

---

## Common Fixes

| Wrong | Correct |
|-------|---------|
| `bg-purple-500` | `bg-primary` |
| `text-white` | `text-primary-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `border-gray-200` | `border-border` |
| `bg-white` | `bg-background` or `bg-card` |
| `text-black` | `text-foreground` |
| `bg-red-500` | `bg-destructive` |
| `text-green-500` | `text-success` |
| `bg-yellow-500` | `bg-warning` |
