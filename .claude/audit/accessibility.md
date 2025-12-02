# Accessibility (WCAG 2.1 AA)

Comprehensive WCAG 2.1 Level AA compliance. Every component MUST meet these standards.

---

## Quick Reference

| Principle | Guidelines | Key Requirements | File |
|-----------|------------|------------------|------|
| **Perceivable** | 1.1-1.4 | Alt text, contrast, resize | [`a11y-perceivable.md`](a11y-perceivable.md) |
| **Operable** | 2.1-2.5 | Keyboard, focus, navigation | [`a11y-operable.md`](a11y-operable.md) |
| **Understandable** | 3.1-3.3 | Language, errors, labels | [`a11y-understandable.md`](a11y-understandable.md) |
| **Robust** | 4.1 | ARIA, assistive tech | [`a11y-robust.md`](a11y-robust.md) |

---

## Critical Requirements Summary

### Images (1.1.1)

```tsx
// ALL images need alt
<Image src="/logo.png" alt="Description" />

// Icon buttons need aria-label
<Button size="icon" aria-label="Close">
  <X className="h-4 w-4" />
</Button>
```

### Keyboard (2.1.1)

```tsx
// ALL interactive elements keyboard accessible
<button>Native: works</button>

// Custom needs role + tabIndex + keyDown
<div role="button" tabIndex={0} onKeyDown={handleKey}>
```

### Focus (2.4.7)

```tsx
// NEVER remove focus without replacement
className="focus-visible:outline-2 focus-visible:outline-ring"

// BANNED:
className="outline-none"  // Never alone
```

### Contrast (1.4.3)

| Content | Ratio |
|---------|-------|
| Normal text | 4.5:1 |
| Large text | 3:1 |
| UI components | 3:1 |

### Errors (3.3.1)

```tsx
<Input aria-invalid={hasError} aria-describedby="error-id" />
<p id="error-id" role="alert">[ERROR]: Message</p>
```

---

## Quick Scan

```bash
# Images without alt
grep -rn "<img\|<Image" src/ --include="*.tsx" | grep -v "alt="

# Icon buttons without aria-label
grep -rn 'size="icon"' src/ --include="*.tsx" | grep -v "aria-label"

# Outline removal
grep -rn "outline-none" src/ --include="*.tsx" | grep -v "focus-visible"

# Click without keyboard
grep -rn "onClick" src/ --include="*.tsx" | grep "<div\|<span" | grep -v "role=\|tabIndex"
```

---

## Testing Checklist

### Automated

- [ ] `npm run lint` passes
- [ ] Lighthouse accessibility ≥ 90

### Keyboard

- [ ] Tab through page - all elements reachable
- [ ] Focus indicators visible
- [ ] ESC closes modals
- [ ] No keyboard traps

### Screen Reader

- [ ] Images announced
- [ ] Form labels read
- [ ] Errors announced
- [ ] Dynamic content announced

### Visual

- [ ] Contrast meets ratios
- [ ] Color not sole indicator
- [ ] Text scales to 200%
- [ ] Reflows at 320px
