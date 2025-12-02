# Accessibility: Perceivable (WCAG 1.x)

Content must be presentable in ways users can perceive.

---

## 1.1.1 Non-text Content (Level A)

```tsx
// ALL images MUST have alt text
<Image src="/logo.png" alt="Fabrk logo - terminal-inspired design system" />

// Decorative images use empty alt
<Image src="/decoration.svg" alt="" aria-hidden="true" />

// Icons with meaning need labels
<AlertTriangle className="h-4 w-4" aria-label="Warning" />

// Icon-only buttons MUST have aria-label
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// SVG sprites need title
<svg role="img" aria-labelledby="icon-title">
  <title id="icon-title">Settings</title>
  <use href="#settings-icon" />
</svg>
```

---

## 1.3.1 Info and Relationships (Level A)

```tsx
// Form inputs MUST have associated labels
<Label htmlFor="email">[EMAIL]:</Label>
<Input id="email" type="email" aria-describedby="email-hint" />
<p id="email-hint" className="text-xs text-muted-foreground">
  We'll never share your email.
</p>

// Related form controls use fieldset/legend
<fieldset>
  <legend>[NOTIFICATION_PREFERENCES]:</legend>
  <Checkbox id="email-notif" />
  <Label htmlFor="email-notif">Email notifications</Label>
</fieldset>

// Tables need proper headers
<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Project Alpha</th>
      <td>Active</td>
    </tr>
  </tbody>
</table>

// Use semantic HTML
<main id="main-content">
  <article>
    <header><h1>Page Title</h1></header>
    <section aria-labelledby="section-1">
      <h2 id="section-1">Section Title</h2>
    </section>
  </article>
</main>
```

---

## 1.3.2 Meaningful Sequence (Level A)

```tsx
// DOM order MUST match visual order
// WRONG: Using CSS to reorder
<div className="flex flex-col-reverse">  // Avoid

// CORRECT: Logical DOM order
<header>Header first</header>
<main>Main content second</main>
<footer>Footer last</footer>
```

---

## 1.3.3 Sensory Characteristics (Level A)

```tsx
// NEVER rely on color alone
// WRONG:
<p>Fields in red are required</p>

// CORRECT:
<Label>
  [EMAIL]: <span className="text-destructive">*</span>
  <span className="sr-only">(required)</span>
</Label>

// NEVER rely on position alone
// WRONG:
<p>Click the button on the right</p>

// CORRECT:
<p>Click the "Submit" button to continue</p>
```

---

## 1.4.1 Use of Color (Level A)

```tsx
// Error states need icon + color + text
<div className="text-destructive flex items-center gap-2">
  <AlertCircle className="h-4 w-4" aria-hidden="true" />
  <span>[ERROR]: Invalid email format</span>
</div>

// Links need more than color
<a className="underline hover:text-foreground">Link text</a>

// Status indicators need labels
<Badge variant="success" className="flex items-center gap-1">
  <CheckCircle className="h-3 w-3" aria-hidden="true" />
  <span>Active</span>
</Badge>
```

---

## 1.4.3 Contrast (Level AA) (CRITICAL)

| Content Type | Minimum Ratio | Example |
|--------------|---------------|---------|
| Normal text (<18px) | 4.5:1 | Body text, labels |
| Large text (≥18px/14px bold) | 3:1 | Headings, buttons |
| UI components | 3:1 | Focus rings, borders |
| Graphical objects | 3:1 | Charts, icons |
| Decorative | None | Background patterns |

```tsx
// Design tokens are pre-validated for contrast
// ALWAYS use tokens, never hardcode colors

// Check contrast with:
// - Chrome DevTools > Elements > Contrast
// - WebAIM Contrast Checker
// - axe DevTools extension
```

---

## 1.4.4 Resize Text (Level AA)

```tsx
// Use relative units (rem, em), not px for text
// Text MUST be resizable to 200% without loss of content

// CORRECT:
className="text-sm"   // Uses rem
className="text-base"

// AVOID for text:
style={{ fontSize: '14px' }}  // Fixed pixels

// Container MUST NOT clip on zoom
className="overflow-auto"  // Allow scroll if needed
```

---

## 1.4.10 Reflow (Level AA)

```tsx
// Content MUST reflow at 320px width (400% zoom on 1280px)
// No horizontal scrolling for text content

// CORRECT: Responsive design
<div className="container mx-auto px-4 md:px-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Test at: Chrome DevTools > Device Toolbar > 320px width
```

---

## 1.4.11 Non-text Contrast (Level AA)

```tsx
// UI components need 3:1 against background
// - Focus indicators
// - Form field boundaries
// - Icons conveying information

// CORRECT: Visible borders
<Input className="border-input" />  // Border visible against bg

// WRONG: Low contrast border
<Input className="border-gray-200" />  // May fail on light backgrounds
```

---

## 1.4.12 Text Spacing (Level AA)

```tsx
// Content MUST remain usable when users apply:
// - Line height: 1.5x font size
// - Paragraph spacing: 2x font size
// - Letter spacing: 0.12x font size
// - Word spacing: 0.16x font size

// DON'T set fixed heights on text containers
// WRONG:
<p className="h-20">Text that might wrap</p>

// CORRECT:
<p className="min-h-fit">Text that might wrap</p>
```

---

## Quick Reference

### Scan Commands

```bash
# Find images without alt
grep -rn "<img\|<Image" src/ --include="*.tsx" | grep -v "alt="

# Find icon buttons without aria-label
grep -rn 'size="icon"' src/ --include="*.tsx" | grep -v "aria-label"

# Check for hardcoded colors
npm run scan:hex
```

### Checklist

- [ ] All images have descriptive alt text
- [ ] Decorative images have `alt=""`
- [ ] Icon-only buttons have `aria-label`
- [ ] Tables have proper headers with `scope`
- [ ] Semantic HTML used (nav, main, section, etc.)
- [ ] Color contrast meets 4.5:1 for text
- [ ] UI component contrast meets 3:1
- [ ] Text resizes to 200% without clipping
- [ ] Content reflows at 320px width
