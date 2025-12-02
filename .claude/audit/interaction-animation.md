# Interaction: Animation

Transitions, Framer Motion, and reduced motion.

---

## Transition Timing

| Duration | Use | Token |
|----------|-----|-------|
| 75ms | Micro-feedback | `duration-75` |
| 100ms | Quick feedback | `duration-100` |
| 150ms | Hover states | `duration-150` |
| 200ms | Standard | `duration-200` |
| 300ms | Complex | `duration-300` |
| 500ms+ | ⚠️ Too slow | - |

### Examples

```tsx
// Standard
<Button className="transition-colors duration-200">

// Multi-property
<Card className="transition-all duration-200">

// Transform
<div className="transition-transform duration-200 hover:scale-105">
```

---

## Easing Functions

| Easing | Use | Token |
|--------|-----|-------|
| `ease-out` | Entry (default) | - |
| `ease-in` | Exit | `ease-in` |
| `ease-in-out` | State changes | `ease-in-out` |
| `linear` | Continuous | `ease-linear` |

---

## Reduced Motion (REQUIRED)

```tsx
// Tailwind utilities
className="motion-safe:animate-fadeIn"
className="motion-reduce:animate-none"
className="motion-reduce:transform-none"

// Framer Motion hook
const shouldReduceMotion = useReducedMotion();

<motion.div
  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
/>
```

---

## Framer Motion Patterns

### Basic Animation

```tsx
// REQUIRED: initial + animate together
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
```

### Exit Animations

```tsx
// REQUIRED: AnimatePresence wrapper
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

### List Reordering

```tsx
// REQUIRED: layout prop
{items.map((item) => (
  <motion.div key={item.id} layout>
    {item.content}
  </motion.div>
))}
```

### Staggered Children

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((i) => (
    <motion.li key={i.id} variants={item}>
      {i.content}
    </motion.li>
  ))}
</motion.ul>
```

---

## Common Animations

```tsx
// Fade in up
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}

// Fade in scale
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}

// Slide from left
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
```

---

## Microinteractions

### Success Feedback

```tsx
<Button onClick={handleSave}>
  {isSaved ? (
    <span className="text-success flex items-center gap-1">
      <Check className="h-4 w-4" /> SAVED
    </span>
  ) : (
    <span>> SAVE</span>
  )}
</Button>
```

### Progress Bar

```tsx
<div className="w-full bg-muted h-2 rounded-none">
  <div
    className="bg-primary h-full transition-all duration-300"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## Checklist

- [ ] Transitions use `duration-200` or less
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Framer Motion: `initial` + `animate` paired
- [ ] Exit animations wrapped in `AnimatePresence`
- [ ] List reordering has `layout` prop
