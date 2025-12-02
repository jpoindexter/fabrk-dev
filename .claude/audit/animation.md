# Animation & Motion

Framer Motion patterns, CSS transitions, and reduced motion accessibility.

---

## Quick Reference

| Topic | File |
|-------|------|
| CSS Transitions | [`animation-css.md`](animation-css.md) |
| Framer Motion | [`animation-framer.md`](animation-framer.md) |

---

## Duration Guidelines

| Duration | Use | Tailwind |
|----------|-----|----------|
| 75ms | Micro-feedback | `duration-75` |
| 100ms | Quick feedback | `duration-100` |
| 150ms | Hover states | `duration-150` |
| 200ms | Standard | `duration-200` |
| 300ms | Complex | `duration-300` |

**BANNED**: `duration-500`, `duration-700`, `duration-1000`

---

## Critical Rules

### 1. All Hover States Need Transitions

```tsx
// ✅ CORRECT
<Button className="hover:bg-muted transition-colors duration-200">

// ❌ WRONG
<Button className="hover:bg-muted">
```

### 2. Framer Motion Requires Pairs

```tsx
// ✅ CORRECT: initial + animate
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

// ✅ CORRECT: exit needs AnimatePresence
<AnimatePresence>
  {show && <motion.div exit={{ opacity: 0 }}>}
</AnimatePresence>
```

### 3. Reduced Motion is Required

```tsx
// ✅ CORRECT
className="motion-safe:animate-bounce"

// ❌ WRONG
className="animate-bounce"
```

---

## Quick Checklist

- [ ] All hover states have `transition-colors`
- [ ] No transitions > 300ms (except page/modal)
- [ ] Framer: `initial` + `animate` paired
- [ ] Exit animations use `AnimatePresence`
- [ ] All animations have `motion-safe:` prefix
