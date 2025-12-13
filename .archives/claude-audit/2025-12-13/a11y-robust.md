# Accessibility: Robust (WCAG 4.x) & ARIA

Content must be robust and compatible with assistive technologies.

---

## 4.1.1 Parsing (Level A)

```tsx
// Valid, well-formed HTML
// - Unique IDs
// - Proper nesting
// - Complete start/end tags

// Run: npm run lint (includes HTML validation)
```

---

## 4.1.2 Name, Role, Value (Level A)

```tsx
// Custom components need ARIA

// Custom checkbox
<div
  role="checkbox"
  aria-checked={checked}
  tabIndex={0}
  onClick={toggle}
  onKeyDown={handleKeyDown}
>

// Custom switch
<button
  role="switch"
  aria-checked={enabled}
  onClick={toggle}
>

// Custom combobox
<div role="combobox" aria-expanded={isOpen} aria-haspopup="listbox">
  <input aria-controls="listbox-id" aria-activedescendant={activeId} />
  <ul role="listbox" id="listbox-id">
    <li role="option" id="opt-1" aria-selected={selected === 1}>
```

---

## ARIA Best Practices

### First Rule of ARIA

```tsx
// FIRST rule of ARIA: Don't use ARIA if native HTML works

// WRONG:
<div role="button" tabIndex={0}>Click</div>

// CORRECT:
<button>Click</button>
```

### Live Regions

```tsx
// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}  {/* Announced when changes */}
</div>

// Assertive for urgent updates
<div aria-live="assertive">
  {errorMessage}
</div>
```

### Loading States

```tsx
<div aria-busy={isLoading}>
  {isLoading ? <Skeleton /> : <Content />}
</div>
```

### Expanded/Collapsed

```tsx
<button aria-expanded={isOpen} aria-controls="panel-id">
  Toggle Panel
</button>
<div id="panel-id" hidden={!isOpen}>
  Panel content
</div>
```

### Tabs

```tsx
<div role="tablist">
  <button role="tab" aria-selected={active === 0} aria-controls="panel-0">
    Tab 1
  </button>
</div>
<div role="tabpanel" id="panel-0" aria-labelledby="tab-0">
  Panel content
</div>
```

### Form Fields

```tsx
// Required form fields
<Input aria-required="true" />

// Disabled vs readonly
<Input disabled />        // aria-disabled="true" automatic
<Input readOnly />        // aria-readonly="true" automatic
```

---

## Common ARIA Roles

| Role | Use |
|------|-----|
| `button` | Clickable element |
| `link` | Navigation element |
| `checkbox` | Toggle option |
| `radio` | Single selection |
| `switch` | On/off toggle |
| `tab/tabpanel` | Tabbed interface |
| `dialog` | Modal dialog |
| `alert` | Important message |
| `status` | Status update |
| `progressbar` | Progress indicator |

---

## Semantic HTML Elements

| Element | Use |
|---------|-----|
| `<header>` | Page or section header |
| `<nav>` | Navigation links |
| `<main>` | Main content (one per page) |
| `<article>` | Self-contained content |
| `<section>` | Thematic grouping |
| `<aside>` | Supplementary content |
| `<footer>` | Page or section footer |
| `<button>` | Clickable actions |
| `<a href>` | Navigation links |

---

## Color Blindness

| Type | Affected Colors | Percentage |
|------|-----------------|------------|
| Deuteranopia | Red-Green | 6% of men |
| Protanopia | Red-Green | 2% of men |
| Tritanopia | Blue-Yellow | 0.001% |
| Achromatopsia | All | 0.003% |

### Design Guidelines

```tsx
// NEVER convey information by color alone
// Always pair color with:
// - Icons
// - Text labels
// - Patterns or shapes

// ✅ CORRECT: Color + icon + text
<div className="text-destructive flex items-center gap-2">
  <AlertCircle className="h-4 w-4" />
  <span>[ERROR]: Invalid email</span>
</div>

// ❌ WRONG: Color only
<p className="text-destructive">Invalid email</p>

// Test with:
// - Chrome DevTools > Rendering > Emulate vision deficiencies
// - Stark browser extension
```

---

## Reduced Motion

```tsx
// REQUIRED: Respect prefers-reduced-motion
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="motion-reduce:transform-none"
/>

// Tailwind utilities
className="motion-safe:animate-fadeIn"
className="motion-reduce:animate-none"
```

---

## Screen Reader Testing Checklist

- [ ] All images have descriptive alt text
- [ ] All form fields have associated labels
- [ ] All buttons and links have accessible names
- [ ] Headings create logical outline
- [ ] Tables have proper headers
- [ ] Dynamic content announced via live regions
- [ ] Focus management in modals works correctly
- [ ] Error messages are announced
- [ ] Status changes are announced

---

## Visual Testing Checklist

- [ ] Contrast meets 4.5:1 for text
- [ ] Contrast meets 3:1 for UI components
- [ ] Color is never sole indicator
- [ ] Text resizes to 200% without clipping
- [ ] Content reflows at 320px width
- [ ] Focus indicators clearly visible
