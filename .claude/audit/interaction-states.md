# Interaction: States

Hover, focus, active, disabled, and loading states.

---

## Click/Touch Targets

| Device | Minimum | Recommended |
|--------|---------|-------------|
| Mobile touch | 44×44px | 48×48px |
| Desktop click | 24×24px | 32×32px |
| Icon button | 32×32px | 40×40px |

```tsx
// ✅ CORRECT: Adequate touch target
<Button className="h-10 min-w-[44px]">
  > SUBMIT
</Button>

// ❌ WRONG: Tiny target
<button className="h-4 w-4">×</button>
```

---

## Hover States

### Required on All Interactive Elements

```tsx
// Button
<Button className="hover:bg-primary/90 transition-colors">

// Card
<Card className="hover:border-primary transition-colors cursor-pointer">

// Link
<a className="text-primary hover:underline transition-colors">

// List item
<li className="hover:bg-muted transition-colors">

// Tab (CRITICAL for contrast)
<TabsTrigger className="hover:text-foreground transition-colors">
```

### Patterns

```tsx
// Background
className="hover:bg-muted"
className="hover:bg-primary/90"

// Border
className="hover:border-primary"

// Text
className="hover:text-foreground"

// Underline
className="hover:underline"
```

---

## Focus States (CRITICAL)

### Visible Indicator Required

```tsx
// Standard
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// Ring style
className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

### BANNED Patterns

```tsx
// ❌ NEVER remove focus without alternative
className="outline-none"
className="focus:outline-none"
```

### Focus Management

```tsx
// Move focus to modal on open
useEffect(() => {
  if (isOpen) modalRef.current?.focus();
}, [isOpen]);

// Tab order (NEVER use tabIndex > 0)
tabIndex={0}   // In natural DOM order
tabIndex={-1}  // Programmatically focusable only
```

---

## Active States

```tsx
// Button pressed
<Button className="active:scale-95 transition-transform">

// Card pressed
<Card className="active:bg-muted/50 transition-colors">

// Link pressed
<a className="active:opacity-70 transition-opacity">
```

---

## Disabled States

```tsx
// Button
<Button disabled className="opacity-50 cursor-not-allowed">

// Input
<Input disabled className="opacity-50 cursor-not-allowed" />

// Card
<Card className="opacity-50 pointer-events-none">

// With tooltip explaining why
<Tooltip>
  <TooltipTrigger asChild>
    <span tabIndex={0}>
      <Button disabled>> SUBMIT</Button>
    </span>
  </TooltipTrigger>
  <TooltipContent>Complete required fields first</TooltipContent>
</Tooltip>
```

---

## Loading States

### Button Loading

```tsx
<Button disabled>
  <Loader2 className="h-4 w-4 animate-spin mr-2" />
  > LOADING...
</Button>
```

### Skeleton Loading

```tsx
<Skeleton className="h-4 w-[200px]" />

<Card className="p-4 space-y-4">
  <Skeleton className="h-6 w-[150px]" />
  <Skeleton className="h-4 w-full" />
</Card>
```

### Content Loading

```tsx
<div aria-busy={isLoading}>
  {isLoading ? <Skeleton /> : <Content />}
</div>
```

---

## Checklist

- [ ] All interactive elements have hover states
- [ ] All interactive elements have visible focus
- [ ] No `outline-none` without `focus-visible`
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Disabled elements have `opacity-50 cursor-not-allowed`
- [ ] Loading states have spinner or skeleton
