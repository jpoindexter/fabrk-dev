# Spacing System (8-Point Grid)

All spacing follows the 4px base unit. Use multiples of 4px or 8px for visual consistency.

---

## Quick Reference

| Topic | File |
|-------|------|
| Grid & Patterns | [`spacing-grid.md`](spacing-grid.md) |
| Layout Recipes | [`spacing-layouts.md`](spacing-layouts.md) |

---

## Preferred Values

| Name | Value | Tailwind |
|------|-------|----------|
| xs | 4px | `p-1`, `gap-1` |
| sm | 8px | `p-2`, `gap-2` |
| md | 16px | `p-4`, `gap-4` |
| lg | 24px | `p-6`, `gap-6` |
| xl | 32px | `p-8`, `gap-8` |
| 2xl | 48px | `p-12`, `gap-12` |

---

## BANNED Values

```tsx
// ❌ Non-8-point values
p-3, p-5, p-7, p-9, p-11

// ✅ 8-point grid values
p-2, p-4, p-6, p-8, p-12
```

---

## Common Patterns

| Context | Spacing |
|---------|---------|
| Label to input | `space-y-2` |
| Form groups | `space-y-6` |
| Card padding | `p-4` |
| Header bar | `px-4 py-2` |
| Page section | `py-12` |
| Grid gaps | `gap-4` or `gap-6` |

---

## Checklist

- [ ] Using 8-point grid values
- [ ] No banned values (p-3, p-5, etc.)
- [ ] Form fields: `space-y-2`
- [ ] Form groups: `space-y-6`
- [ ] Touch targets >= 40px
