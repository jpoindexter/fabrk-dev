# Responsive Design

Mobile-first approach with Tailwind CSS breakpoints for consistent cross-device experiences.

---

## Quick Reference

| Topic | File |
|-------|------|
| Layouts & Navigation | [`responsive-layouts.md`](responsive-layouts.md) |
| Content & Testing | [`responsive-content.md`](responsive-content.md) |

---

## Breakpoint Reference

| Breakpoint | Width | Target |
|------------|-------|--------|
| Default | <640px | Mobile |
| `sm:` | >=640px | Large phones |
| `md:` | >=768px | Tablets |
| `lg:` | >=1024px | Laptops |
| `xl:` | >=1280px | Desktops |
| `2xl:` | >=1536px | Large screens |

---

## Mobile-First (REQUIRED)

```tsx
// ✅ CORRECT: Add complexity upward
<div className="flex flex-col md:flex-row">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ WRONG: Desktop-first
<div className="grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
```

---

## Common Patterns

| Pattern | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Grid | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` |
| Flex | `flex-col` | `md:flex-row` | - |
| Padding | `px-4` | `md:px-6` | `lg:px-8` |
| Text | `text-2xl` | `md:text-4xl` | `lg:text-5xl` |

---

## Banned Patterns

```tsx
// ❌ Non-responsive fixed widths
w-[800px], min-w-[500px]

// ❌ Large text without scaling
text-5xl, text-6xl

// ❌ Multi-column grids without responsive
grid-cols-3, grid-cols-4

// ❌ Hidden content without alternative
hidden md:block (essential content)
```

---

## Quick Checklist

- [ ] Content readable at 320px
- [ ] No horizontal scrolling
- [ ] Touch targets >= 44px
- [ ] Navigation accessible on all sizes
- [ ] Mobile-first patterns used
