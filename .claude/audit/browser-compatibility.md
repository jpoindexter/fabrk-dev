# Browser Compatibility Audit

Baseline browser support and feature detection requirements.

---

## Quick Reference

| Browser | Minimum Version | Market Share |
|---------|-----------------|--------------|
| Chrome | 90+ | ~65% |
| Safari | 14+ | ~19% |
| Firefox | 88+ | ~3% |
| Edge | 90+ | ~5% |
| Mobile Chrome | Last 2 versions | - |
| Mobile Safari | Last 2 versions | - |

---

## Browserslist Configuration

### package.json

```json
{
  "browserslist": [
    ">0.3%",
    "not dead",
    "not op_mini all",
    "Chrome >= 90",
    "Firefox >= 88",
    "Safari >= 14",
    "Edge >= 90",
    "iOS >= 14",
    "Android >= 90"
  ]
}
```

### .browserslistrc

```
>0.3%
not dead
not op_mini all
Chrome >= 90
Firefox >= 88
Safari >= 14
Edge >= 90
iOS >= 14
Android >= 90
```

---

## Feature Support Matrix

### CSS Features

| Feature | Chrome | Firefox | Safari | Notes |
|---------|--------|---------|--------|-------|
| CSS Grid | 57+ | 52+ | 10.1+ | ✅ Safe |
| Flexbox | 29+ | 22+ | 9+ | ✅ Safe |
| CSS Variables | 49+ | 31+ | 9.1+ | ✅ Safe |
| `gap` in Flexbox | 84+ | 63+ | 14.1+ | ✅ Safe |
| Container Queries | 105+ | 110+ | 16+ | ⚠️ Check |
| `:has()` selector | 105+ | 121+ | 15.4+ | ⚠️ Check |
| `@layer` | 99+ | 97+ | 15.4+ | ⚠️ Check |

### JavaScript APIs

| Feature | Chrome | Firefox | Safari | Notes |
|---------|--------|---------|--------|-------|
| `fetch` | 42+ | 39+ | 10.1+ | ✅ Safe |
| `Promise` | 32+ | 29+ | 8+ | ✅ Safe |
| `async/await` | 55+ | 52+ | 10.1+ | ✅ Safe |
| `IntersectionObserver` | 51+ | 55+ | 12.1+ | ✅ Safe |
| `ResizeObserver` | 64+ | 69+ | 13.1+ | ✅ Safe |
| `localStorage` | 4+ | 3.5+ | 4+ | ✅ Safe |
| `crypto.randomUUID` | 92+ | 95+ | 15.4+ | ⚠️ Check |
| `structuredClone` | 98+ | 94+ | 15.4+ | ⚠️ Check |

---

## Feature Detection

### Check Before Using

```typescript
// ✅ CORRECT - Feature detection
if (typeof window !== "undefined" && "IntersectionObserver" in window) {
  // Use IntersectionObserver
} else {
  // Fallback behavior
}

// ✅ CORRECT - localStorage check
function getStorageItem(key: string) {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    // localStorage might be blocked
    return null;
  }
}

// ❌ WRONG - No check
const item = localStorage.getItem("key");  // Crashes on SSR
```

### Common Checks

```typescript
// Check for service workers
const supportsServiceWorker = "serviceWorker" in navigator;

// Check for WebP support
async function supportsWebP() {
  const elem = document.createElement("canvas");
  if (elem.getContext && elem.getContext("2d")) {
    return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }
  return false;
}

// Check for touch support
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

---

## Polyfills

### When to Use

| Scenario | Action |
|----------|--------|
| Critical feature, no support | Add polyfill |
| Nice-to-have feature | Progressive enhancement |
| Old browser only | Consider dropping support |

### Common Polyfills

```typescript
// next.config.js - Core polyfills included by Next.js automatically:
// - Promise
// - fetch
// - Object.assign
// - Array.from
// - Symbol

// For additional polyfills, add to _app.tsx:
import "core-js/features/array/at";
import "core-js/features/object/has-own";
```

---

## Mobile Considerations

### Touch Targets

```typescript
// ✅ CORRECT - 48px minimum touch target
<Button className="min-h-[48px] min-w-[48px]">
  Tap me
</Button>

// ❌ WRONG - Too small
<Button className="h-6 w-6">X</Button>
```

### Viewport

```html
<!-- Always include in layout -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Safe Areas (Notch)

```css
/* For devices with notches */
.container {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## Testing Requirements

### Manual Testing

| Device | Browser | Test |
|--------|---------|------|
| Desktop | Chrome latest | Full test |
| Desktop | Safari latest | Full test |
| Desktop | Firefox latest | Smoke test |
| iPhone | Safari | Full test |
| Android | Chrome | Full test |

### Automated Testing

```bash
# Check browserslist coverage
npx browserslist

# Check for compatibility issues
npx eslint-plugin-compat

# Run Lighthouse
npx lighthouse http://localhost:3000 --output=html
```

---

## Detection Patterns

```bash
# Find unsupported APIs without checks
grep -rE '\blocalStorage\b|\bsessionStorage\b' src --include="*.tsx" | grep -v "typeof window"

# Find direct window access
grep -rE '\bwindow\.' src --include="*.tsx" | grep -v "typeof window"

# Find document access without SSR check
grep -rE '\bdocument\.' src --include="*.tsx" | grep -v "typeof document"

# Find potentially unsupported CSS
grep -rE '@container|:has\(' src --include="*.css"
```

---

## Checklist

### Before Release:

- [ ] Test on Chrome 90+ (desktop and mobile)
- [ ] Test on Safari 14+ (desktop and iOS)
- [ ] Test on Firefox 88+ (desktop)
- [ ] All localStorage access has SSR check
- [ ] All window/document access has typeof check
- [ ] Touch targets are minimum 48px
- [ ] Viewport meta tag is set
- [ ] No unsupported CSS features without fallback

### For Each Feature:

- [ ] Check caniuse.com for browser support
- [ ] Add feature detection if needed
- [ ] Add polyfill or fallback if critical
- [ ] Test on oldest supported browser

---

## Common Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| localStorage on SSR | Crash | Check typeof window |
| Small touch targets | Unusable on mobile | Min 48px |
| No viewport meta | Wrong scale | Add meta tag |
| Unsupported CSS | Broken layout | Use fallback |
