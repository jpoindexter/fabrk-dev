---
title: 'Accessibility: WCAG 2.2 AA Compliance Across 18 Themes'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'accessibility-wcag-compliance'
description: 'How Fabrk ensures WCAG 2.2 AA accessibility across all 18 terminal themes. Contrast ratios, keyboard navigation, and screen reader support.'
publishedAt: '2026-01-12T10:00:00.000Z'
---

**Beautiful themes that everyone can use.**

---

## The Accessibility Challenge

Dark terminal themes often fail accessibility:

- Low contrast text
- Missing focus indicators
- No keyboard support
- Broken screen readers

Fabrk solves this across all 18 themes.

---

## WCAG 2.2 AA Compliance

Every theme meets WCAG 2.2 AA standards:

- **4.5:1** contrast for normal text
- **3:1** contrast for large text
- **3:1** contrast for UI components
- Visible focus indicators
- No color-only information

---

## OKLCH for Contrast

OKLCH color space makes contrast predictable:

```css
/* Guaranteed contrast through lightness values */
--background: oklch(0.15 0.02 280);  /* L=0.15 (dark) */
--foreground: oklch(0.95 0.01 280);  /* L=0.95 (light) */

/* Delta of 0.80 = high contrast */
```

---

## Contrast Ratios

Fabrk's color tokens ensure compliance:

| Pair | Ratio | Use |
|------|-------|-----|
| foreground/background | 14:1 | Body text |
| muted-foreground/background | 5.5:1 | Secondary text |
| primary/primary-foreground | 4.5:1 | Buttons |
| destructive/destructive-foreground | 4.5:1 | Alerts |

---

## Focus Indicators

All interactive elements have visible focus:

```css
/* Default focus ring */
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Custom focus for buttons */
.button:focus-visible {
  ring: 2px;
  ring-primary;
  ring-offset-2;
  ring-offset-background;
}
```

---

## Keyboard Navigation

All components are keyboard accessible:

| Key | Action |
|-----|--------|
| Tab | Move to next element |
| Shift+Tab | Move to previous |
| Enter/Space | Activate button |
| Arrow keys | Navigate within component |
| Escape | Close modals/menus |

---

## Component Accessibility

### Buttons

```tsx
<Button
  aria-label="Submit form"
  aria-disabled={isLoading}
>
  {isLoading ? 'Loading...' : '> SUBMIT'}
</Button>
```

### Forms

```tsx
<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid={!!errors.email}
  />
  {errors.email && (
    <p id="email-error" className="text-destructive text-xs">
      {errors.email}
    </p>
  )}
</div>
```

### Modals

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogTitle id="dialog-title">Title</DialogTitle>
    <DialogDescription id="dialog-description">
      Description text
    </DialogDescription>
  </DialogContent>
</Dialog>
```

---

## Screen Reader Support

Components include ARIA attributes:

```tsx
// Loading state
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading ? <Spinner /> : content}
</div>

// Status messages
<Alert role="alert" aria-live="assertive">
  {errorMessage}
</Alert>

// Navigation
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/dashboard">Dashboard</a></li>
  </ul>
</nav>
```

---

## Semantic HTML

Use proper elements:

```tsx
// GOOD - semantic
<button onClick={handleClick}>Click</button>
<a href="/page">Link</a>
<nav>...</nav>
<main>...</main>

// BAD - div soup
<div onClick={handleClick}>Click</div>
<div onClick={() => navigate('/page')}>Link</div>
```

---

## Color Independence

Never rely on color alone:

```tsx
// BAD - color only
<Badge className="bg-red-500">Error</Badge>

// GOOD - color + icon + text
<Badge className="bg-destructive">
  <AlertIcon /> Error
</Badge>
```

---

## Skip Links

Allow keyboard users to skip navigation:

```tsx
// app/layout.tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:p-2"
>
  Skip to main content
</a>

<main id="main-content">
  {children}
</main>
```

---

## Reduced Motion

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Testing Accessibility

Run automated tests:

```bash
npm run test:a11y
```

Manual testing:
1. Navigate with keyboard only
2. Use screen reader (VoiceOver/NVDA)
3. Check with browser DevTools
4. Test at 200% zoom

---

## Axe Integration

Test with Playwright:

```typescript
import AxeBuilder from '@axe-core/playwright';

test('page is accessible', async ({ page }) => {
  await page.goto('/dashboard');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
```

---

## Common Issues

| Issue | Fix |
|-------|-----|
| Low contrast | Use design tokens |
| Missing labels | Add aria-label or visible label |
| No focus visible | Add focus-visible styles |
| Div buttons | Use button element |
| Auto-playing media | Add controls, respect prefers-reduced-motion |

---

## Accessibility Tools

Recommended tools:

- **axe DevTools** - Browser extension
- **WAVE** - Web accessibility evaluator
- **Lighthouse** - Chrome DevTools
- **NVDA** - Free screen reader (Windows)
- **VoiceOver** - Built into macOS/iOS

---

## Best Practices

1. **Test early** - Don't bolt on accessibility
2. **Use semantic HTML** - Right element for the job
3. **Don't disable focus** - Users need it
4. **Provide alternatives** - Text for images, captions for video
5. **Test with real users** - Automated tools miss things

Accessibility for all 18 themes.

