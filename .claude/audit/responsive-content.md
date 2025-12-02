# Responsive: Content

Typography, images, forms, and tables for responsive design.

---

## Typography Scaling

### Heading Sizes

```tsx
// Page title - scales dramatically
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">

// Section title - moderate scaling
<h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">

// Subsection - minimal scaling
<h3 className="text-lg md:text-xl font-semibold">

// ❌ BANNED: Large text without responsive
<h1 className="text-5xl">  // Too large on mobile
<h2 className="text-4xl">  // Overflows on small screens
```

### Body Text

```tsx
// Body text typically doesn't need responsive sizing
<p className="text-sm font-mono text-muted-foreground">

// But ensure containers accommodate it
<p className="text-sm md:text-base">
```

---

## Images & Media

### Responsive Images

```tsx
// Different sizes for different breakpoints
<Image
  src="/hero.jpg"
  alt="Hero image"
  className="w-full h-48 md:h-64 lg:h-96 object-cover"
/>

// Hide decorative images on mobile
<Image
  src="/decoration.svg"
  alt=""
  className="hidden md:block absolute right-0"
/>
```

### Aspect Ratios

```tsx
// Consistent aspect ratio across breakpoints
<div className="aspect-video md:aspect-[16/9] lg:aspect-[21/9]">
  <Image className="object-cover w-full h-full" />
</div>
```

---

## Form Layouts

### Single Column to Multi-Column

```tsx
// Form fields: 1 column mobile, 2 columns tablet+
<form className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label>[FIRST_NAME]:</Label>
      <Input />
    </div>
    <div className="space-y-2">
      <Label>[LAST_NAME]:</Label>
      <Input />
    </div>
  </div>

  {/* Full width fields */}
  <div className="space-y-2">
    <Label>[EMAIL]:</Label>
    <Input type="email" />
  </div>
</form>
```

### Button Groups

```tsx
// Stack on mobile, inline on desktop
<div className="flex flex-col md:flex-row gap-2 md:gap-4">
  <Button variant="outline" className="w-full md:w-auto">> CANCEL</Button>
  <Button className="w-full md:w-auto">> SUBMIT</Button>
</div>
```

---

## Table Responsiveness

### Horizontal Scroll

```tsx
// Wrap table in scrollable container
<div className="overflow-x-auto">
  <Table className="min-w-[600px]">
    {/* Table content */}
  </Table>
</div>
```

### Stack Pattern (Alternative)

```tsx
// Table on desktop, cards on mobile
<div className="hidden md:block">
  <Table>{/* Full table */}</Table>
</div>

<div className="md:hidden space-y-4">
  {items.map(item => (
    <Card key={item.id} className="p-4">
      <div className="flex justify-between">
        <span className="font-mono text-xs text-muted-foreground">[NAME]:</span>
        <span>{item.name}</span>
      </div>
      {/* More card content */}
    </Card>
  ))}
</div>
```

---

## WCAG Reflow (1.4.10)

Content must reflow at 320px width (equivalent to 400% zoom on 1280px display):

```tsx
// ✅ CORRECT: Content reflows
<div className="container mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-2">
    {/* Content stacks on mobile */}
  </div>
</div>

// ❌ WRONG: Fixed width causes overflow
<div className="w-[800px]">
  {/* Forces horizontal scroll on mobile */}
</div>

// ❌ WRONG: Non-responsive grid
<div className="grid grid-cols-4">
  {/* Content squished or overflows */}
</div>
```

---

## Testing Checklist

### Viewport Testing

| Viewport | Width | Must Test |
|----------|-------|-----------|
| Small mobile | 320px | Required |
| Mobile | 375px | Required |
| Large mobile | 428px | Optional |
| Tablet portrait | 768px | Required |
| Tablet landscape | 1024px | Required |
| Desktop | 1280px | Required |
| Large desktop | 1440px | Optional |
| Ultra-wide | 1920px | Optional |

### Manual Test Checklist

- [ ] Content readable at 320px
- [ ] No horizontal scrolling (except tables)
- [ ] Touch targets >= 44px on mobile
- [ ] Navigation accessible on all sizes
- [ ] Images don't overflow
- [ ] Forms usable on mobile
- [ ] Text doesn't overflow containers

### Chrome DevTools Testing

```
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test at: iPhone SE (375px), iPad (768px), Desktop (1024px+)
4. Also test: Responsive mode, drag to resize
```

---

## Quick Reference

### Common Responsive Classes

| Pattern | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Grid | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` |
| Flex direction | `flex-col` | `md:flex-row` | - |
| Padding | `px-4` | `md:px-6` | `lg:px-8` |
| Text size | `text-2xl` | `md:text-4xl` | `lg:text-5xl` |
| Visibility | `block` | `md:hidden` | - |
| Width | `w-full` | `md:w-auto` | - |

### Banned Patterns

```tsx
// ❌ Non-responsive fixed widths
w-[800px], w-[600px], min-w-[500px]

// ❌ Large text without scaling
text-5xl, text-6xl (without md:/lg: variants)

// ❌ Multi-column grids without responsive
grid-cols-3, grid-cols-4, grid-cols-6

// ❌ Hidden content without alternative
hidden md:block (if content is essential)
```
