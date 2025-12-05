# Card Component Specification

> Version: 1.0.0
> Last Updated: 2025-12-05
> Status: CANONICAL

---

## Overview

The Card component is a container for grouping related content with consistent styling. It uses the Visual Mode System for theme-aware aesthetics.

## Component Hierarchy

```
Card
├── CardHeader
│   ├── CardTitle
│   └── CardDescription
├── CardContent
└── CardFooter
```

## Import

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
```

## Terminal Theme Defaults

| Property | Value | Token |
|----------|-------|-------|
| Border Radius | `rounded-none` | `mode.radius` |
| Shadow | none | (no shadow class) |
| Border | `border` | 1px solid border-border |
| Background | `bg-card` | semantic token |
| Text | `text-card-foreground` | semantic token |

## Spacing (8-Point Grid)

| Component | Padding | Value |
|-----------|---------|-------|
| Card | none | Container only |
| CardHeader | `p-6` | 24px all sides |
| CardHeader gap | `space-y-2` | 8px vertical |
| CardContent | `px-6 pt-0 pb-6` | 24px horizontal, 24px bottom |
| CardFooter | `px-6 pt-0 pb-6` | 24px horizontal, 24px bottom |

## Typography

| Element | Size | Weight | Font |
|---------|------|--------|------|
| CardTitle | `text-base` | `font-semibold` | `mode.font` |
| CardDescription | `text-xs` | `font-normal` | `mode.font` |

## Usage Examples

### Standard Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
    <CardDescription>Manage your preferences</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content here</p>
  </CardContent>
  <CardFooter>
    <Button>> SAVE_CHANGES</Button>
  </CardFooter>
</Card>
```

### Card Without Header

When using CardContent without CardHeader, add `pt-6`:

```tsx
<Card>
  <CardContent className="pt-6">
    <p>Content without header</p>
  </CardContent>
</Card>
```

### Empty State Card

For centered empty states with icons, use `py-12`:

```tsx
<Card>
  <CardContent className="py-12 text-center">
    <AlertIcon className="mx-auto h-12 w-12 text-muted-foreground" />
    <h3 className="mt-4 font-semibold">No items found</h3>
    <p className="text-muted-foreground">Create your first item</p>
  </CardContent>
</Card>
```

### Highlighted Card (Active/Popular State)

Use `ring-2` for highlighting, NOT shadow:

```tsx
<Card className={cn(
  isActive && "ring-primary ring-2"
)}>
  {/* content */}
</Card>
```

## Styled Variants

### StyledCard + StyledCardHeader

For terminal-aesthetic cards with hex code headers:

```tsx
import { StyledCard, StyledCardHeader } from "@/components/ui/card";

<StyledCard>
  <StyledCardHeader code="0x00" title="SECTION_TITLE" />
  <div className="p-4">
    {/* content */}
  </div>
</StyledCard>
```

Renders as: `[ [0x00] SECTION_TITLE ]`

### FeaturesCard

Pre-built card for feature lists:

```tsx
import { FeaturesCard } from "@/components/ui/card";

<FeaturesCard
  title="TEMPLATE_FEATURES"
  code="0x00"
  features={[
    "Multi-step form wizard",
    "Real-time validation",
    "Progress indicator",
  ]}
  note="Connect to your API for real data."
/>
```

## Anti-Patterns

### ❌ DON'T: Add shadow to Cards

```tsx
// WRONG - violates terminal theme
<Card className="shadow">
<Card className="shadow ring-2">
```

### ✅ DO: Use ring for emphasis

```tsx
// CORRECT - use ring for highlighting
<Card className="ring-primary ring-2">
```

### ❌ DON'T: Use arbitrary radius

```tsx
// WRONG - violates terminal theme
<Card className="rounded-lg">
<Card className="rounded-md">
```

### ✅ DO: Use mode.radius

```tsx
// CORRECT - uses theme system
<Card className={cn("...", mode.radius)}>
```

## Accessibility

- Card has `focus-within:ring-primary focus-within:ring-2` for keyboard navigation
- Use semantic heading levels in CardTitle (`as="h2"`, `as="h3"`, etc.)
- CardHeader, CardContent, CardFooter have `data-slot` attributes for testing

## Related Components

- `StyledCard` - Terminal-aesthetic card container
- `StyledCardHeader` - Hex code header for terminal cards
- `FeaturesCard` - Pre-built feature list card
- `CodeOutput` - Code/CLI output display card
