# Color System

Design token-based color system. NEVER use hardcoded colors.

---

## Quick Reference

| Topic | File |
|-------|------|
| Design Tokens | [`colors-tokens.md`](colors-tokens.md) |
| Accessibility & Usage | [`colors-accessibility.md`](colors-accessibility.md) |

---

## Allowed Tokens

### Backgrounds
`bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `bg-destructive`, `bg-success`

### Text
`text-foreground`, `text-muted-foreground`, `text-primary`, `text-destructive`, `text-success`

### Borders
`border-border`, `border-input`, `border-primary`

---

## BANNED (No Exceptions)

```tsx
// ❌ Hex colors
#8b5cf6, #ffffff

// ❌ Tailwind palette
bg-gray-500, text-purple-600

// ❌ Named colors
bg-white, text-black
```

---

## Semantic Meaning

| Token | Use |
|-------|-----|
| `primary` | Brand, CTAs |
| `success` | Completion |
| `warning` | Caution |
| `destructive` | Error |
| `muted` | Secondary |

---

## Critical Rule

**Never convey information by color alone.** Always pair with icons or text.

```tsx
// ✅ CORRECT
<div className="text-destructive flex items-center gap-2">
  <AlertCircle /> [ERROR]: Message
</div>

// ❌ WRONG
<p className="text-destructive">Error</p>
```

---

## Checklist

- [ ] No hardcoded hex colors
- [ ] No Tailwind palette colors
- [ ] No `bg-white` or `text-black`
- [ ] Status messages have icons
- [ ] Links distinguishable beyond color
