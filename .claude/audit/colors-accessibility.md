# Colors: Accessibility & Usage

Color accessibility rules and usage patterns.

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
| Normal text (<18px) | 4.5:1 | Body text |
| Large text (>=18px) | 3:1 | Headings |
| UI components | 3:1 | Focus rings |
| Graphical objects | 3:1 | Charts |
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

// ✅ CORRECT: Token-based (auto-themes)
<Card className="border-border bg-card">
  <CardContent className="text-card-foreground">

// ❌ WRONG: Won't switch with theme
<Card className="border-gray-200 bg-white">
  <CardContent className="text-gray-900">
```

### Testing Theme Switching

Every component should work in:
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
  Read the <a className="text-primary underline">documentation</a>
</p>
```

### Badges

```tsx
// Use variants, not custom colors
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>

// ❌ WRONG: Custom colors
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

## Violation Search

```bash
# Find hardcoded colors
grep -rE "(bg|text|border)-(red|blue|gray|green|purple)-\d+" src/ --include="*.tsx"

# Find hex colors
grep -rE "#[0-9a-fA-F]{3,8}" src/ --include="*.tsx"

# Find rgb/hsl
grep -rE "(rgb|hsl|oklch)\s*\(" src/ --include="*.tsx"
```
