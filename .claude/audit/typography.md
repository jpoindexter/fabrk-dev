# Typography System

Comprehensive typography rules for the terminal-inspired design system.

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
| `text-xs` | 12px (0.75rem) | 1rem | 400-700 | Labels, captions, metadata |
| `text-sm` | 14px (0.875rem) | 1.25rem | 400-600 | Body text, descriptions |
| `text-base` | 16px (1rem) | 1.5rem | 400-600 | Default, paragraphs |
| `text-lg` | 18px (1.125rem) | 1.75rem | 600-700 | Card titles, emphasis |
| `text-xl` | 20px (1.25rem) | 1.75rem | 600 | Subsection headings |
| `text-2xl` | 24px (1.5rem) | 2rem | 600 | Section headings |
| `text-3xl` | 30px (1.875rem) | 2.25rem | 700 | Large headings |
| `text-4xl` | 36px (2.25rem) | 2.5rem | 700 | Page titles |

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
| `leading-loose` | 2 | Very spaced text |

---

## Letter Spacing

| Token | Value | Use |
|-------|-------|-----|
| `tracking-tighter` | -0.05em | Large headings |
| `tracking-tight` | -0.025em | Headings |
| `tracking-normal` | 0 | Body text |
| `tracking-wide` | 0.025em | Labels, buttons |
| `tracking-wider` | 0.05em | Small caps |
| `tracking-widest` | 0.1em | Uppercase labels |

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

## Terminal Typography Patterns

### Page Title

```tsx
<h1 className="text-4xl font-bold tracking-tight">Page Title</h1>
```

### Section Heading

```tsx
<h2 className="text-2xl font-semibold tracking-tight">Section</h2>
```

### Card/Terminal Header

```tsx
<h3 className="font-mono text-lg font-bold text-primary">
  [ [0x00] CARD_TITLE ]
</h3>
```

### Terminal Label

```tsx
<span className="font-mono text-xs text-muted-foreground">
  [LABEL]:
</span>
```

### Body Text

```tsx
<p className="font-mono text-sm text-muted-foreground leading-relaxed">
  Description text here.
</p>
```

### Code/Monospace

```tsx
<code className="font-mono text-xs bg-muted px-1 py-0.5">
  code
</code>
```

### Button Text

```tsx
<Button className="font-mono text-xs">
  > ACTION_NAME
</Button>
```

### Status Messages

```tsx
// Error
<p className="font-mono text-xs text-destructive">
  [ERROR]: Message here
</p>

// Success
<p className="font-mono text-xs text-success">
  [SUCCESS]: Operation completed
</p>

// Warning
<p className="font-mono text-xs text-warning">
  [WARNING]: Proceed with caution
</p>

// Info
<p className="font-mono text-xs text-info">
  [INFO]: Additional information
</p>
```

---

## Typography Accessibility

### Minimum Sizes

```tsx
// Minimum body text: 16px (text-base) for readability
// Never use text-xs for body paragraphs

// Exception: Labels, captions, metadata can use text-xs
// But NEVER smaller than 12px
```

### Line Length

```tsx
// Optimal line length: 45-75 characters

// Use max-w-prose for optimal reading
<p className="max-w-prose">  // ~65ch
  Long paragraph text here...
</p>

// Or explicit character width
<p className="max-w-[65ch]">
```

### Paragraph Spacing

```tsx
// Double line height between paragraphs
<div className="space-y-4">
  <p>First paragraph</p>
  <p>Second paragraph</p>
</div>
```

### Text Resizing

```tsx
// Text MUST be resizable to 200% without loss
// Always use relative units (rem via Tailwind)

// ✅ CORRECT
className="text-sm"   // Uses rem under the hood

// ❌ WRONG
style={{ fontSize: '14px' }}  // Fixed pixels don't scale
```

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
// But ensure containers accommodate it
<p className="text-sm md:text-base">
  Body text that's slightly larger on desktop
</p>
```

---

## Text Colors

| Token | Use | Example |
|-------|-----|---------|
| `text-foreground` | Primary text | Headings, important content |
| `text-muted-foreground` | Secondary text | Descriptions, labels |
| `text-primary` | Brand color | Links, emphasis |
| `text-destructive` | Error text | Error messages |
| `text-success` | Success text | Success messages |
| `text-warning` | Warning text | Warning messages |
| `text-info` | Info text | Informational messages |

---

## Text Decoration

### Links

```tsx
// Standard link
<a className="text-primary underline hover:text-foreground transition-colors">
  Link text
</a>

// Link without underline (must be obvious from context)
<a className="text-primary hover:underline transition-colors">
  Link text
</a>
```

### Emphasis

```tsx
// Strong emphasis
<strong className="font-bold">Important text</strong>

// Subtle emphasis
<em className="italic">Emphasized text</em>

// Highlight
<mark className="bg-primary/20 px-1">Highlighted</mark>
```

---

## Text Overflow

### Single Line Truncation

```tsx
<p className="truncate">
  Very long text that will be truncated with ellipsis...
</p>
```

### Multi-Line Truncation

```tsx
<p className="line-clamp-2">
  Text that will be truncated after two lines...
</p>

<p className="line-clamp-3">
  Text that will be truncated after three lines...
</p>
```

### Word Breaking

```tsx
// Break long words (use wrap-break-word, not break-words which is deprecated)
<p className="wrap-break-word">
  Superlongwordthatneedstobreak
</p>

// Break anywhere if needed
<p className="break-all">
  Technical/code/paths-need-break-all
</p>
```

---

## Code Typography

### Inline Code

```tsx
<code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-none">
  inlineCode()
</code>
```

### Code Blocks

```tsx
<pre className="font-mono text-xs bg-muted p-4 overflow-x-auto rounded-none">
  <code>
    {`function example() {
  return "code block";
}`}
  </code>
</pre>
```

### Syntax Highlighting

```tsx
// Use design token colors for syntax
<span className="text-primary">keyword</span>
<span className="text-success">string</span>
<span className="text-warning">number</span>
<span className="text-muted-foreground">comment</span>
```

---

## Quick Reference Checklist

### Before Every Commit

- [ ] Page titles use `text-4xl font-bold`
- [ ] Section headings use `text-2xl font-semibold`
- [ ] Body text uses `font-mono text-sm`
- [ ] Labels use `font-mono text-xs text-muted-foreground`
- [ ] Large headings scale responsively
- [ ] No font sizes smaller than 12px
- [ ] Line length doesn't exceed 75 characters
- [ ] Text uses design token colors
- [ ] Status messages include type prefix: `[ERROR]:`, `[SUCCESS]:`, etc.

### Terminal Format Rules

- [ ] Button text: `> UPPERCASE_UNDERSCORES`
- [ ] Labels: `[LABEL]:`
- [ ] Status: `[TYPE]: Message`
- [ ] Card headers: `[ [0x00] TITLE ]`
