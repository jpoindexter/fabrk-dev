# Card Component Specification

> Canonical implementation for all card-like containers in Fabrk.

---

## Overview

**Card** is a molecule-level component that groups related content with consistent visual treatment. It serves as the primary container pattern across landing pages, dashboards, documentation, and settings.

---

## Canonical Implementation

### Import

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
```

### Basic Usage

```tsx
<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
    <CardDescription>Optional description text</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

---

## Token Mappings

| Property | Token | Value (Terminal Theme) |
|----------|-------|------------------------|
| Background | `color.bg.surface` | `bg-card` |
| Text | `color.text.primary` | `text-card-foreground` |
| Border | `color.border.default` | `border` (1px) |
| Border Radius | `radius.semantic.card` | `rounded-none` (via `mode.radius`) |
| Shadow | `shadow.card` | `shadow-none` |
| Padding | `space.component.padding.lg` | `p-6` (24px) |

---

## Subcomponents

### Card (Container)

```tsx
<Card
  as="div" | "article" | "section"
  className={cn("bg-card text-card-foreground border", mode.radius)}
/>
```

**Props:**
- `as`: Semantic element (default: `"div"`)
- `className`: Additional styling

### CardHeader

```tsx
<CardHeader className="flex flex-col space-y-2 p-6" />
```

**Token Mappings:**
- Padding: `p-6` (24px)
- Gap: `space-y-2` (8px)

### CardTitle

```tsx
<CardTitle
  as="h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className="text-base font-semibold"
/>
```

**Token Mappings:**
| Property | Value | Notes |
|----------|-------|-------|
| Font Size | `text-base` (16px) | Standard card title |
| Font Weight | `font-semibold` (600) | **CANONICAL - DO NOT USE font-black** |
| Font Family | `mode.font` | `font-mono` for terminal theme |
| Color | `text-card-foreground` | Inherits from Card |

**Props:**
- `as`: Heading level (default: `"h3"`)

### CardDescription

```tsx
<CardDescription className="text-xs text-muted-foreground" />
```

**Token Mappings:**
- Font Size: `text-xs` (12px)
- Color: `text-muted-foreground`
- Font Family: `mode.font`

### CardContent

```tsx
<CardContent className="px-6 pt-0 pb-6" />
```

**Token Mappings:**
- Horizontal Padding: `px-6` (24px)
- Bottom Padding: `pb-6` (24px)
- Top Padding: `pt-0` (0 - follows CardHeader)

### CardFooter

```tsx
<CardFooter className="flex items-center px-6 pt-0 pb-6" />
```

**Token Mappings:**
- Same as CardContent
- Flex layout for action buttons

---

## Terminal-Style Cards

For terminal aesthetic cards with hex code headers, use the styled variants:

### StyledCard + StyledCardHeader

```tsx
import { StyledCard, StyledCardHeader } from "@/components/ui/card";

<StyledCard>
  <StyledCardHeader code="0x00" title="SECTION_TITLE" />
  <div className="p-4">
    {/* Content */}
  </div>
</StyledCard>
```

**Output:**
```
┌─────────────────────────────────────┐
│ [ [0x00] SECTION_TITLE ]            │
├─────────────────────────────────────┤
│ Content area                        │
└─────────────────────────────────────┘
```

---

## Visual Variants

### Default (Outline)
```tsx
<Card>...</Card>
```
- Border: 1px solid
- Shadow: none
- Background: `bg-card`

### Interactive (Hover)
```tsx
<Card className="transition-colors hover:border-primary cursor-pointer">...</Card>
```
- Adds hover state
- Use for clickable cards

### Danger Zone
```tsx
<Card className="border-destructive">
  <CardHeader>
    <CardTitle className="text-destructive">Danger Zone</CardTitle>
  </CardHeader>
</Card>
```
- Red border and title for destructive actions

---

## Size Variants (via CardTitle)

For displaying large numbers/stats, apply size directly:

```tsx
// Stat card with large number
<CardTitle className="text-3xl">1,234</CardTitle>

// Standard card title
<CardTitle>Settings</CardTitle>
```

**Allowed CardTitle sizes:**
- `text-base` - Default (16px)
- `text-lg` - Emphasis (18px)
- `text-xl` - Large (20px)
- `text-2xl` - Stats (24px)
- `text-3xl` - Hero stats (30px)

**NEVER use `font-black` on CardTitle. Always use default `font-semibold`.**

---

## Anti-Patterns (Do Not Do)

### ❌ Using font-black on CardTitle

```tsx
// WRONG - font-black is not in design system
<CardTitle className="text-base font-black">{title}</CardTitle>

// CORRECT - use default font-semibold
<CardTitle className="text-base">{title}</CardTitle>
```

### ❌ Building card-like structures with raw divs

```tsx
// WRONG - use Card component
<div className="border border-border bg-card p-4">
  <h3 className="font-semibold">Title</h3>
</div>

// CORRECT - use Card component
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>
```

### ❌ Inconsistent padding

```tsx
// WRONG - arbitrary padding
<CardContent className="p-3">...</CardContent>

// CORRECT - use component defaults (px-6 pb-6)
<CardContent>...</CardContent>
```

---

## Migration Guide

### From font-black to font-semibold

```tsx
// Before
<CardTitle className="flex items-center gap-2 text-base font-black">

// After (remove font-black)
<CardTitle className="flex items-center gap-2 text-base">
```

### From raw divs to Card

```tsx
// Before
<section className="border border-border bg-card p-6">
  <h2 className="text-lg font-semibold mb-4">Title</h2>
  <div>Content</div>
</section>

// After
<Card as="section">
  <CardHeader>
    <CardTitle as="h2">Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

---

## Accessibility

- Use semantic `as` prop for proper heading hierarchy
- Card container should not be focusable unless interactive
- Interactive cards need focus ring (`focus-within:ring-primary`)
- Color contrast meets WCAG AA (4.5:1 for text)

---

## Files

- **Component:** `src/components/ui/card.tsx`
- **Spec:** `design-system/spec/components-card.md`
- **Usage Examples:** `src/app/docs/components/card/page.tsx`

---

*Card Component Specification v1.0.0*
