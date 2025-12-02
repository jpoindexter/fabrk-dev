# Interaction Design

Comprehensive interaction patterns including hover, focus, active, disabled, and loading states.

---

## Click/Touch Targets

### Minimum Sizes

| Device | Minimum Size | Recommended |
|--------|--------------|-------------|
| Mobile touch | 44×44px | 48×48px |
| Desktop click | 24×24px | 32×32px |
| Icon button | 32×32px | 40×40px |

### Adequate Touch Targets

```tsx
// ✅ CORRECT: Adequate touch target
<Button className="h-10 min-w-[44px]">  // 40px height
  > SUBMIT
</Button>

// ✅ CORRECT: Icon button with sufficient size
<Button size="icon" className="h-10 w-10">  // 40×40px
  <X className="h-4 w-4" />
</Button>

// ✅ CORRECT: List item with full-width clickable area
<button className="w-full px-4 py-3 text-left">
  {/* Content */}
</button>

// ❌ WRONG: Tiny target
<button className="h-4 w-4">×</button>  // 16px - too small!
```

### Fitts's Law Application

```
Time = a + b × log2(1 + D/W)
- D = Distance to target
- W = Width (size) of target
```

```tsx
// Larger targets = faster selection
// Position important targets near edges/corners (infinite edge)

// ✅ CORRECT: Clickable card (larger target)
<Card className="cursor-pointer hover:border-primary" onClick={handleClick}>
  {/* Entire card is clickable */}
</Card>

// ✅ CORRECT: Full-width navigation items
<nav className="flex flex-col">
  <a className="px-4 py-3 hover:bg-muted w-full">Item 1</a>
  <a className="px-4 py-3 hover:bg-muted w-full">Item 2</a>
</nav>
```

---

## Hover States

### Required on All Interactive Elements

```tsx
// Button hover
<Button className="hover:bg-primary/90 transition-colors">
  > ACTION
</Button>

// Card hover
<Card className="hover:border-primary transition-colors cursor-pointer">
  {/* Content */}
</Card>

// Link hover
<a className="text-primary hover:underline transition-colors">
  Link text
</a>

// List item hover
<li className="hover:bg-muted transition-colors">
  {/* Content */}
</li>

// Tab hover (CRITICAL for contrast)
<TabsTrigger className="hover:text-foreground transition-colors">
  Tab Name
</TabsTrigger>
```

### Hover State Patterns

```tsx
// Background change
className="hover:bg-muted"
className="hover:bg-primary/90"
className="hover:bg-accent"

// Border change
className="hover:border-primary"
className="hover:border-foreground"

// Text change
className="hover:text-foreground"
className="hover:text-primary"

// Underline
className="hover:underline"

// Scale (use sparingly)
className="hover:scale-105"
```

---

## Focus States (CRITICAL)

### Visible Focus Indicator Required

```tsx
// Visible focus indicator on ALL interactive elements
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// Alternative ring style
className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

### BANNED Focus Patterns

```tsx
// ❌ NEVER remove focus without alternative
className="outline-none"
className="focus:outline-none"

// ❌ WRONG: No visible focus
<Button className="outline-none">Click</Button>

// ✅ CORRECT: Custom focus style
<Button className="focus-visible:ring-2 focus-visible:ring-primary">
  Click
</Button>
```

### Focus Management

```tsx
// Move focus to modal on open
const modalRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);

// Return focus to trigger on close
const triggerRef = useRef<HTMLButtonElement>(null);
useEffect(() => {
  if (!isOpen && triggerRef.current) {
    triggerRef.current.focus();
  }
}, [isOpen]);

// Tab order (NEVER use tabIndex > 0)
tabIndex={0}   // In natural DOM order
tabIndex={-1}  // Programmatically focusable only
```

---

## Active/Pressed States

### Button Pressed

```tsx
<Button className="active:scale-95 transition-transform">
  > SUBMIT
</Button>
```

### Card Pressed

```tsx
<Card className="active:bg-muted/50 transition-colors cursor-pointer">
  {/* Content */}
</Card>
```

### Link Pressed

```tsx
<a className="active:opacity-70 transition-opacity">
  Link text
</a>
```

---

## Disabled States

### Visual Indicators

```tsx
// Disabled button
<Button disabled className="opacity-50 cursor-not-allowed">
  > SUBMIT
</Button>

// Disabled input
<Input disabled className="opacity-50 cursor-not-allowed" />

// Disabled card
<Card className="opacity-50 pointer-events-none">
  {/* Content */}
</Card>
```

### Disabled with Explanation

```tsx
// Disabled with tooltip explaining why
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span tabIndex={0}>  {/* Wrapper for disabled button */}
        <Button disabled>> SUBMIT</Button>
      </span>
    </TooltipTrigger>
    <TooltipContent>
      Complete required fields first
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Accessibility for Disabled Elements

```tsx
// Use aria-disabled for programmatic disabling
<Button
  aria-disabled={!isValid}
  onClick={isValid ? handleSubmit : undefined}
  className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
>
  > SUBMIT
</Button>

// Or native disabled attribute
<Button disabled={!isValid}>
  > SUBMIT
</Button>
```

---

## Loading States

### Button Loading

```tsx
<Button disabled>
  <Loader2 className="h-4 w-4 animate-spin mr-2" />
  > LOADING...
</Button>

// Alternative: Replace text
<Button disabled>
  {isLoading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      > SAVING...
    </>
  ) : (
    <>> SAVE</>
  )}
</Button>
```

### Skeleton Loading

```tsx
// Single element
<Skeleton className="h-4 w-[200px]" />

// Card skeleton
<Card className="p-4 space-y-4">
  <Skeleton className="h-6 w-[150px]" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</Card>
```

### Content Loading

```tsx
<div aria-busy={isLoading}>
  {isLoading ? (
    <Skeleton className="h-20 w-full" />
  ) : (
    <Content />
  )}
</div>
```

### Page/Section Loading

```tsx
// Full page loading
<div className="flex items-center justify-center min-h-screen">
  <Loader2 className="h-8 w-8 animate-spin text-primary" />
</div>

// Section loading
<section className="py-12">
  {isLoading ? (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  ) : (
    <Content />
  )}
</section>
```

---

## Transition Timing

### Duration Guidelines

| Duration | Use | Token |
|----------|-----|-------|
| 75ms | Micro-feedback | `duration-75` |
| 100ms | Quick feedback | `duration-100` |
| 150ms | Hover states | `duration-150` |
| 200ms | Standard transitions | `duration-200` |
| 300ms | Complex animations | `duration-300` |
| 500ms+ | ⚠️ Too slow (avoid) | - |

### Transition Examples

```tsx
// Standard transition
<Button className="transition-colors duration-200">
  > ACTION
</Button>

// Multi-property transition
<Card className="transition-all duration-200">
  {/* Content */}
</Card>

// Transform transition
<div className="transition-transform duration-200 hover:scale-105">
  {/* Content */}
</div>
```

### BANNED Durations

```tsx
// ❌ Too slow - feels sluggish
duration-500
duration-700
duration-1000
```

---

## Easing Functions

| Easing | Use | Token |
|--------|-----|-------|
| `ease-out` | Entry animations (default) | - |
| `ease-in` | Exit animations | `ease-in` |
| `ease-in-out` | State changes | `ease-in-out` |
| `linear` | Continuous animations | `ease-linear` |

```tsx
// Entry animation (ease-out is default)
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
/>

// Exit animation (ease-in)
<motion.div
  exit={{ opacity: 0, y: -12 }}
  transition={{ duration: 0.2, ease: "easeIn" }}
/>
```

---

## Reduced Motion Support

### REQUIRED for Accessibility

```tsx
// Respect prefers-reduced-motion
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="motion-reduce:transform-none"
/>

// Or use motion-safe
className="motion-safe:animate-fadeIn"

// BANNED: Animation without reduced-motion consideration
className="animate-bounce"  // Must add motion-safe: or motion-reduce:
```

### CSS Media Query

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Framer Motion Standards

### Required Patterns

```tsx
// REQUIRED: initial + animate together
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* Content */}
</motion.div>

// REQUIRED: AnimatePresence for exit animations
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>

// REQUIRED: layout prop for list reordering
{items.map((item) => (
  <motion.div key={item.id} layout>
    {item.content}
  </motion.div>
))}
```

### Common Patterns

```tsx
// Fade in up (most common)
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Fade in scale
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3 }}

// Slide in from left
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.4 }}

// Staggered children
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

## Microinteractions

### Successful Action Feedback

```tsx
<Button
  onClick={handleSave}
  className="transition-all duration-200"
>
  {isSaved ? (
    <span className="text-success flex items-center gap-1">
      <Check className="h-4 w-4" /> SAVED
    </span>
  ) : (
    <span>> SAVE</span>
  )}
</Button>
```

### Progress Feedback

```tsx
// Progress bar
<div className="w-full bg-muted h-2 rounded-none">
  <div
    className="bg-primary h-full transition-all duration-300"
    style={{ width: `${progress}%` }}
  />
</div>

// Step indicator
<div className="flex gap-2">
  {steps.map((_, i) => (
    <div
      key={i}
      className={cn(
        "h-1 w-8 transition-colors",
        i <= currentStep ? "bg-primary" : "bg-muted"
      )}
    />
  ))}
</div>
```

### Error Recovery

```tsx
<Button variant="outline" onClick={retry}>
  > TRY_AGAIN
</Button>
```

---

## Quick Reference Checklist

### Before Every Commit

- [ ] All interactive elements have hover states
- [ ] All interactive elements have visible focus indicators
- [ ] No `outline-none` without `focus-visible` alternative
- [ ] Touch targets are at least 44×44px on mobile
- [ ] Transitions use `duration-200` or less
- [ ] Disabled elements have `opacity-50 cursor-not-allowed`
- [ ] Loading states have spinner or skeleton
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Focus management works in modals

### Interaction Checklist by Component

| Component | Hover | Focus | Active | Disabled | Loading |
|-----------|-------|-------|--------|----------|---------|
| Button | ✓ | ✓ | ✓ | ✓ | ✓ |
| Link | ✓ | ✓ | ✓ | - | - |
| Input | ✓ | ✓ | - | ✓ | - |
| Card (clickable) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tab | ✓ | ✓ | ✓ | ✓ | - |
| Checkbox | ✓ | ✓ | ✓ | ✓ | - |
| Select | ✓ | ✓ | - | ✓ | ✓ |
