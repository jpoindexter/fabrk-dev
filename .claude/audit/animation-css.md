# Animation: CSS Transitions

CSS transition patterns and timing guidelines.

---

## Transition Timing

### Duration Guidelines

| Duration | Use | Tailwind |
|----------|-----|----------|
| 75ms | Micro-feedback (color shifts) | `duration-75` |
| 100ms | Quick feedback | `duration-100` |
| 150ms | Hover states | `duration-150` |
| 200ms | Standard transitions | `duration-200` |
| 300ms | Complex animations | `duration-300` |

### BANNED Durations

```tsx
// ❌ Too slow - feels sluggish
duration-500
duration-700
duration-1000

// These should be avoided unless for special cases
// (page transitions, modals, etc.)
```

---

## CSS Transitions

### Required on Interactive Elements

```tsx
// ALL hover states MUST have transitions
<Button className="hover:bg-primary/90 transition-colors duration-200">

// Cards with hover
<Card className="hover:border-primary transition-colors duration-200">

// Links
<a className="text-primary hover:underline transition-colors duration-200">

// List items
<li className="hover:bg-muted transition-colors duration-200">

// Tabs (CRITICAL for contrast)
<TabsTrigger className="hover:text-foreground transition-colors duration-200">
```

### Transition Properties

```tsx
// Color only (most common)
className="transition-colors"

// All properties
className="transition-all"

// Transform only (scale, translate)
className="transition-transform"

// Opacity only
className="transition-opacity"

// Multiple specific properties
className="transition-[color,background-color,border-color]"
```

### BANNED: Hover Without Transition

```tsx
// ❌ WRONG: Instant state change
<Button className="hover:bg-muted">  // Missing transition

// ✅ CORRECT: Smooth transition
<Button className="hover:bg-muted transition-colors duration-200">
```

---

## Easing Functions

| Easing | Use | Tailwind |
|--------|-----|----------|
| `ease-out` | Entry animations | Default |
| `ease-in` | Exit animations | `ease-in` |
| `ease-in-out` | State changes | `ease-in-out` |
| `linear` | Continuous (loaders) | `ease-linear` |

```tsx
// Entry animation (ease-out is default)
className="transition-all duration-300 ease-out"

// Exit animation
className="transition-all duration-200 ease-in"

// Toggle states
className="transition-all duration-200 ease-in-out"

// Loading spinner
className="animate-spin ease-linear"
```

---

## Tailwind Animations

### Built-in Animations

```tsx
animate-spin      // Continuous rotation
animate-ping      // Ping/pulse effect
animate-pulse     // Subtle fade pulse
animate-bounce    // Bouncing effect
animate-none      // Disable animation
```

### Custom Animations (globals.css)

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}
```

---

## Loading Animations

### Spinner

```tsx
<Loader2 className="h-4 w-4 animate-spin" />

// With reduced motion
<Loader2 className="h-4 w-4 motion-safe:animate-spin" />
```

### Skeleton Pulse

```tsx
<Skeleton className="h-4 w-full animate-pulse" />

// Already respects reduced motion via CSS
```

### Progress Bar

```tsx
<div className="w-full bg-muted h-2 rounded-none overflow-hidden">
  <motion.div
    className="bg-primary h-full"
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 0.3 }}
  />
</div>
```

---

## Performance Guidelines

### Animate Transform Properties

```tsx
// ✅ GOOD: GPU-accelerated (cheap)
transform: translateX(), translateY(), scale(), rotate()
opacity

// ❌ AVOID: Triggers layout (expensive)
width, height, top, left, margin, padding
```

### Will-Change Hint

```tsx
// For heavy animations, hint to browser
className="will-change-transform"

// Remove after animation
// Don't use will-change on everything (counterproductive)
```

### Avoid Layout Thrashing

```tsx
// ❌ BAD: Animating width causes layout recalculation
animate={{ width: "100%" }}

// ✅ GOOD: Transform doesn't trigger layout
animate={{ scaleX: 1 }}  // Scale from 0 to 1
```

---

## Animation Property Reference

| Property | Duration | Easing |
|----------|----------|--------|
| Hover color | 150-200ms | ease-out |
| Button press | 100-150ms | ease-out |
| Modal enter | 200-300ms | ease-out |
| Modal exit | 150-200ms | ease-in |
| Scroll reveal | 400-600ms | ease-out |
| Accordion | 200-300ms | ease-in-out |
