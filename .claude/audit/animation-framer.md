# Animation: Framer Motion

Framer Motion patterns and reduced motion accessibility.

---

## Basic Animation Pattern

```tsx
// REQUIRED: initial + animate together
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

---

## whileInView (Scroll Animations)

```tsx
// Animate when element enters viewport
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}  // Only animate once
>
  Content appears on scroll
</motion.div>
```

---

## Exit Animations (AnimatePresence Required)

```tsx
// REQUIRED: Wrap with AnimatePresence for exit animations
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>

// ❌ WRONG: Exit without AnimatePresence
{isVisible && (
  <motion.div exit={{ opacity: 0 }}>  // Exit won't work!
    Content
  </motion.div>
)}
```

---

## Layout Animations

```tsx
// REQUIRED: layout prop for list reordering
{items.map((item) => (
  <motion.div key={item.id} layout>
    {item.content}
  </motion.div>
))}

// Layout with animation
<motion.div layout transition={{ duration: 0.3 }}>
  Content that resizes
</motion.div>
```

---

## Staggered Children

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1  // 100ms between each child
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.ul
  variants={container}
  initial="hidden"
  animate="show"
>
  {items.map((i) => (
    <motion.li key={i.id} variants={item}>
      {i.content}
    </motion.li>
  ))}
</motion.ul>
```

---

## Hover & Tap Animations

```tsx
// Scale on hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click me
</motion.button>

// Subtle lift on hover
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
>
  Hoverable card
</motion.div>
```

---

## Common Animation Patterns

### Fade In Up (Most Common)

```tsx
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Fade In Scale

```tsx
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3 }}
```

### Slide In From Side

```tsx
// From left
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}

// From right
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
```

### Modal/Dialog Animation

```tsx
// Overlay
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.2 }}

// Content
initial={{ opacity: 0, scale: 0.95, y: 10 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 10 }}
transition={{ duration: 0.2 }}
```

### Accordion/Collapse

```tsx
<motion.div
  initial={false}
  animate={{
    height: isOpen ? "auto" : 0,
    opacity: isOpen ? 1 : 0
  }}
  transition={{ duration: 0.3 }}
  style={{ overflow: "hidden" }}
>
  Collapsible content
</motion.div>
```

---

## Reduced Motion (CRITICAL)

### Accessibility Requirement

Users with vestibular disorders can be affected by motion. WCAG requires respecting `prefers-reduced-motion`.

### Tailwind Utilities

```tsx
// Only animate if motion is OK
className="motion-safe:animate-fadeIn"

// Remove animation if reduced motion preferred
className="motion-reduce:animate-none"
className="motion-reduce:transform-none"
className="motion-reduce:transition-none"
```

### Framer Motion Reduced Motion

```tsx
// Hook for reduced motion
import { useReducedMotion } from "framer-motion";

function Component() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
    >
      Content
    </motion.div>
  );
}
```

### CSS Media Query

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Patterns to Flag

```tsx
// ❌ BANNED: Animation without reduced-motion consideration
className="animate-bounce"  // Missing motion-safe:
className="animate-pulse"   // Need motion-safe: prefix

// ✅ CORRECT
className="motion-safe:animate-bounce"
className="motion-safe:animate-pulse motion-reduce:animate-none"
```

---

## Framer Motion Checklist

- [ ] `initial` present when using `animate`
- [ ] `AnimatePresence` wraps conditional renders with `exit`
- [ ] `viewport={{ once: true }}` for scroll animations
- [ ] `layout` prop on items that reorder
- [ ] Stagger uses `variants` pattern
- [ ] Reduced motion checked with `useReducedMotion`
