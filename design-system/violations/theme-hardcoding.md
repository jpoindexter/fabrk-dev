# Theme Hardcoding Audit

> Generated: 2025-12-06 (PHASE 6)
> Purpose: Identify terminal-specific values that would need changing for theme switching

---

## Summary

| Category | Hardcoded Instances | Using `mode.*` | Theme-Ready |
|----------|---------------------|----------------|-------------|
| `rounded-none` | ~60 | via `mode.radius` | PARTIAL |
| `font-mono` | ~40 | via `mode.font` | PARTIAL |
| `uppercase` | ~30 | via `mode.textTransform` | PARTIAL |
| **UI Components** | 8 direct | 285 via mode | **YES** |
| **Pages/Templates** | ~100 | ~50 | **PARTIAL** |

---

## Impact Assessment

### LOW IMPACT (Components)

UI components in `/components/ui/` properly use the `mode` object:

```tsx
// Example from button.tsx
className={cn(mode.radius, mode.font, ...)}
```

**Metrics:**
- 84 components import `mode` from `@/design-system`
- 285 `mode.*` usages across UI components
- Only 8 hardcoded `rounded-none` in UI (all in low-level primitives)

**Verdict:** Theme switching in components works automatically via `mode` object.

### MEDIUM IMPACT (Pages/Templates)

Pages and templates have some hardcoded terminal values:

```tsx
// Example hardcoding found
<div className="rounded-none font-mono text-xs">
```

Instead of:
```tsx
<div className={cn(mode.radius, mode.font, "text-xs")}>
```

---

## Detailed Findings

### Hardcoded `rounded-none` in Pages

| File | Count | Context |
|------|-------|---------|
| `contact/components/faq-section.tsx` | 4 | FAQ cards |
| `contact/components/contact-form.tsx` | 8 | Form inputs, alerts |
| `success/page.tsx` | 3 | Success state elements |
| `docs/features/trial/page.tsx` | 4 | Status indicators |
| `docs/features/realtime/page.tsx` | 2 | Badge, avatar |
| `docs/features/cookie-consent/page.tsx` | 4 | Cookie type indicators |
| `docs/features/notifications/page.tsx` | 2 | Notification badge |
| `docs/components/notification-badge/page.tsx` | 8 | Demo placeholders |
| `docs/components/toaster/page.tsx` | 5 | Toast demos |

**Total:** ~60 instances

### Hardcoded `font-mono` in Pages

| File | Count | Context |
|------|-------|---------|
| `demo/layout.tsx` | 1 | Demo wrapper |
| `contact/components/faq-section.tsx` | 3 | Section headers |
| `success/page.tsx` | 5 | Success messages |
| `component-showcase/cards/page.tsx` | 1 | Page wrapper |
| `about/components/*.tsx` | 4 | Section content |
| `docs/features/*.tsx` | ~15 | Various docs |

**Total:** ~40 instances

### Hardcoded `uppercase` in Pages

| File | Count | Context |
|------|-------|---------|
| `docs/features/organizations/page.tsx` | 5 | Table headers |
| `docs/components/overview/page.tsx` | 1 | Component names |
| `templates/profile/components/*.tsx` | 1 | Profile labels |
| `templates/authentication/*.tsx` | 2 | Dividers |
| `not-found.tsx` | 3 | Error page text |
| `components/ui/activity-timeline.tsx` | 1 | Timeline label |
| `components/docs/blocks/docs-header.tsx` | 3 | Header formatting |

**Total:** ~30 instances

---

## Theme Switching Readiness

### Fully Ready (No Changes Needed)

1. **UI Components** - Use `mode.*` abstraction
2. **Design System** - Theme files exist (terminal, modern, soft)
3. **Token System** - Semantic tokens properly defined
4. **Theme Infrastructure** - `CURRENT_THEME` switchable

### Partially Ready (Changes Needed for Multi-Theme)

1. **Marketing Pages** - ~30 hardcoded values
2. **Documentation Pages** - ~40 hardcoded values
3. **Template Examples** - ~20 hardcoded values
4. **Dashboard Pages** - ~10 hardcoded values

---

## Remediation Plan (Future Phase)

To enable full theme switching, these pages would need updates:

### Priority 1: Marketing Pages
- `contact/components/*.tsx` (12 instances)
- `success/page.tsx` (8 instances)
- `about/components/*.tsx` (4 instances)
- `not-found.tsx` (3 instances)

### Priority 2: Dashboard/App Pages
- `templates/profile/components/*.tsx`
- `templates/authentication/*.tsx`

### Priority 3: Documentation (Lower Priority)
- `docs/features/*.tsx` (many instances, but docs can stay terminal-styled)
- `docs/components/*.tsx`

---

## Recommended Approach

### Option A: Ship Terminal Only (Current State)
- No changes needed
- Terminal theme works perfectly
- ~100 hardcoded values are consistent with theme

### Option B: Enable Theme Switching (Future)
1. Search and replace in pages:
   - `rounded-none` → `{mode.radius}`
   - `font-mono` → `{mode.font}`
2. Import `mode` in affected files
3. Test each theme visually
4. Estimated effort: 2-4 hours

---

## Files That Import `mode` Correctly

These are the gold standard - they work with any theme:

```
src/components/ui/button.tsx
src/components/ui/card.tsx
src/components/ui/input.tsx
src/components/ui/badge.tsx
src/components/ui/alert.tsx
... (84 total)
```

---

## Conclusion

**Theme-Readiness Status: CONDITIONAL PASS**

- **Component level:** READY (mode abstraction works)
- **Page level:** NEEDS WORK (~100 hardcoded values)
- **Ship recommendation:** Safe to ship with terminal theme
- **Future work:** Focused 2-4 hour sweep for multi-theme support

---

*Audit generated by PHASE 6: FINAL COMPLIANCE SWEEP - 2025-12-06*
