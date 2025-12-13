# Typography: Scale & Hierarchy

Font stack, type scale, weights, and hierarchy.

---

## Font Stack

| Category | Font | Tailwind | Use |
|----------|------|----------|-----|
| **Monospace** | JetBrains Mono | `font-mono` | Terminal UI, code, labels, body |
| **Sans-serif** | Geist Sans | `font-sans` | Marketing, headings |

---

## Type Scale

| Token | Size | Line Height | Weight | Use |
|-------|------|-------------|--------|-----|
| `text-xs` | 12px | 1rem | 400-700 | Labels, captions, metadata |
| `text-sm` | 14px | 1.25rem | 400-600 | Body text, descriptions |
| `text-base` | 16px | 1.5rem | 400-600 | Default, paragraphs |
| `text-lg` | 18px | 1.75rem | 600-700 | Card titles, emphasis |
| `text-xl` | 20px | 1.75rem | 600 | Subsection headings |
| `text-2xl` | 24px | 2rem | 600 | Section headings |
| `text-3xl` | 30px | 2.25rem | 700 | Large headings |
| `text-4xl` | 36px | 2.5rem | 700 | Page titles |

---

## Font Weight

| Weight | Token | Use |
|--------|-------|-----|
| 400 | `font-normal` | Body text, descriptions |
| 500 | `font-medium` | Emphasis, links |
| 600 | `font-semibold` | Headings, buttons |
| 700 | `font-bold` | Strong emphasis, titles |

---

## Line Height

| Token | Value | Use |
|-------|-------|-----|
| `leading-none` | 1 | Single-line headings |
| `leading-tight` | 1.25 | Compact text |
| `leading-snug` | 1.375 | Buttons, short labels |
| `leading-normal` | 1.5 | Body text |
| `leading-relaxed` | 1.625 | Long-form content |

---

## Letter Spacing

| Token | Value | Use |
|-------|-------|-----|
| `tracking-tighter` | -0.05em | Large headings |
| `tracking-tight` | -0.025em | Headings |
| `tracking-normal` | 0 | Body text |
| `tracking-wide` | 0.025em | Labels, buttons |

---

## Typography Hierarchy

| Level | Use | Terminal Style |
|-------|-----|----------------|
| H1 | Page title | `text-4xl font-bold` |
| H2 | Section title | `text-2xl font-semibold` |
| H3 | Subsection | `text-xl font-semibold` |
| H4 | Card title | `text-lg font-bold font-mono` |
| Body | Content | `text-sm font-mono text-muted-foreground` |
| Label | Form labels | `text-xs font-mono text-muted-foreground` |
| Caption | Metadata | `text-xs font-mono text-muted-foreground` |

---

## Text Colors

| Token | Use |
|-------|-----|
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary text |
| `text-primary` | Brand color |
| `text-destructive` | Error text |
| `text-success` | Success text |
| `text-warning` | Warning text |
| `text-info` | Info text |

---

## Responsive Typography

### Scaling Headings

```tsx
// Large headings MUST scale down on mobile
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

// Section headings
<h2 className="text-xl md:text-2xl lg:text-3xl">
  Section Title
</h2>
```

### Body Text

```tsx
// Body text typically doesn't need responsive sizing
<p className="text-sm md:text-base">
  Body text that's slightly larger on desktop
</p>
```
