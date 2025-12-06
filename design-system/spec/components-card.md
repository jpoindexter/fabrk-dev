# Card Component Specification

Version: 1.0.0
Last Updated: 2025-12-06

## Overview

The Card component system provides a unified API for all card-like UI patterns in Fabrk. It supports two visual modes:
- **Terminal Style** (default): Sharp edges, monospace font, hex code headers
- **Modern Style**: Rounded corners, system font (via theme tokens)

---

## Component API

### TerminalCard

The canonical card component for the terminal design system.

```tsx
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";

<TerminalCard>
  <TerminalCardHeader
    code="0x00"
    title="SECTION_TITLE"
    icon={<Icon className="size-4" />}
    meta="optional metadata"
  />
  <TerminalCardContent>
    {children}
  </TerminalCardContent>
</TerminalCard>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline" \| "ghost" \| "accent" \| "featured"` | `"default"` | Visual style variant |
| `tone` | `"neutral" \| "primary" \| "success" \| "warning" \| "danger"` | `"neutral"` | Color tone for borders/accents |
| `interactive` | `boolean` | `false` | Enable hover/focus states |
| `as` | `"div" \| "article" \| "section"` | `"div"` | Semantic HTML element |

#### Subcomponents

##### TerminalCardHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | `"0x00"` | Hex code displayed in brackets |
| `title` | `string` | required | Title in UPPERCASE_SNAKE_CASE |
| `icon` | `ReactNode` | `undefined` | Icon displayed on right |
| `meta` | `string \| ReactNode` | `undefined` | Additional metadata (e.g., "8 items") |

##### TerminalCardContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `withDesc` | `boolean` | `false` | Prepend "DESC: " prefix to content |
| `padding` | `"sm" \| "md" \| "lg"` | `"md"` | Content padding size |

---

## Visual Specifications

### Typography

| Element | Token | Value |
|---------|-------|-------|
| Header text | `text-xs` | 12px |
| Header font | `mode.font` | font-mono |
| Content title | `text-xs font-semibold` | 12px bold |
| Content body | `text-xs` | 12px |
| Description prefix | `text-muted-foreground` | "DESC: " |

### Spacing (8-Point Grid)

| Element | Token | Value |
|---------|-------|-------|
| Header padding | `px-4 py-2` | 16px / 8px |
| Content padding (sm) | `p-2` | 8px |
| Content padding (md) | `p-4` | 16px |
| Content padding (lg) | `p-6` | 24px |
| Grid gap | `gap-6` | 24px |

### Colors

| Element | Token | Description |
|---------|-------|-------------|
| Background | `bg-card` | Card background |
| Border | `border-border` | Default border |
| Border hover | `border-primary/50` | Hover state |
| Header text | `text-muted-foreground` | Subdued text |
| Content text | `text-foreground` | Primary text |
| Icon default | `text-muted-foreground` | Icon color |
| Icon hover | `text-primary` | Icon hover color |

### Border & Radius

| Element | Token | Description |
|---------|-------|-------------|
| Border width | `border` | 1px solid |
| Radius | `mode.radius` | From visual mode (rounded-none for terminal) |
| Header border | `border-b` | Bottom separator |

---

## Variants

### default
```tsx
// Standard card with border
className="border-border bg-card border"
```

### outline
```tsx
// Outline only, no background
className="border-border border bg-transparent"
```

### ghost
```tsx
// No border, subtle background on hover
className="bg-transparent hover:bg-muted/50"
```

### accent
```tsx
// Accent background
className="border-border bg-accent/30 border"
```

### featured
```tsx
// Primary border for highlighted cards
className="border-primary bg-card border"
```

---

## Tones

### neutral (default)
```tsx
borderColor: "border-border"
```

### primary
```tsx
borderColor: "border-primary"
```

### success
```tsx
borderColor: "border-success"
```

### warning
```tsx
borderColor: "border-warning"
```

### danger
```tsx
borderColor: "border-destructive"
```

---

## Usage Patterns

### Grid Card (Most Common)

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item, index) => (
    <TerminalCard key={item.id} interactive>
      <TerminalCardHeader
        code={`0x${(index).toString(16).toUpperCase().padStart(2, '0')}`}
        title={item.title.toUpperCase().replace(/ /g, '_')}
        icon={<item.icon className="size-4" />}
      />
      <TerminalCardContent withDesc>
        {item.description}
      </TerminalCardContent>
    </TerminalCard>
  ))}
</div>
```

### Feature List Card

```tsx
<TerminalCard>
  <TerminalCardHeader code="0x00" title="INCLUDED_FEATURES" meta={`${features.length} items`} />
  <TerminalCardContent>
    <ul className="space-y-2">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-xs">
          <span className="text-primary flex-shrink-0">
            {i === features.length - 1 ? "└─" : "├─"}
          </span>
          <span className="text-foreground">{feature}</span>
        </li>
      ))}
    </ul>
  </TerminalCardContent>
</TerminalCard>
```

### Metric/Stat Card

```tsx
<TerminalCard>
  <TerminalCardHeader code="0x50" title="METRIC_NAME" icon={<TrendingUp className="size-4" />} />
  <TerminalCardContent>
    <div className="text-foreground mb-2 text-3xl font-semibold">85%</div>
    <div className="text-foreground mb-3 text-xs font-semibold">TEST_COVERAGE</div>
    <div className="text-xs">
      <span className="text-muted-foreground">DESC: </span>
      <span className="text-foreground">Core components covered</span>
    </div>
  </TerminalCardContent>
</TerminalCard>
```

### Hero Status Card (Style A Exception)

```tsx
// Hero cards use inline header pattern, NOT TerminalCard
<div className="border-border bg-card mx-auto max-w-2xl border p-4 text-left">
  <div className="text-muted-foreground mb-4 text-xs">
    [ [0x01] STATUS ]────────────────────────
  </div>
  <p className="text-muted-foreground mb-4 text-sm">
    {description}
  </p>
  <div className="flex flex-wrap gap-4 text-sm">
    <span>
      <span className="text-muted-foreground">Label:</span>{" "}
      <span className="text-primary">VALUE</span>
    </span>
  </div>
</div>
```

---

## Migration Mapping

| Current Card | Migration Path |
|--------------|----------------|
| `Card` + inline styles | `TerminalCard` |
| `StyledCard` + `StyledCardHeader` | Already canonical |
| `DocsCard` | Uses `TerminalCard` internally |
| `KpiCard` | Add `TerminalCardHeader` |
| `MemberCard` | Add `TerminalCardHeader` |
| `OrgCard` | Add `TerminalCardHeader` |
| Inline grid cards | Use `TerminalCard` |

---

## Accessibility

- Cards use semantic HTML (`article` for standalone, `section` for grouped)
- Focus ring on interactive cards: `focus-within:ring-primary focus-within:ring-2`
- Headers are `<div>` not `<h*>` to avoid heading hierarchy issues
- Icons have `aria-hidden="true"` when decorative

---

## Implementation Notes

1. **Equal Heights**: Use `h-full flex flex-col` on card, `flex-1` on content
2. **Hover States**: Only apply to interactive cards
3. **Icon Transitions**: `transition-colors` for smooth hover
4. **Grid Gaps**: Always use `gap-6` for card grids
5. **Header Icons**: Always `size-4` and aligned right
