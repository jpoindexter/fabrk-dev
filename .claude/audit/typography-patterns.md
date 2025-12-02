# Typography: Terminal Patterns

Terminal typography patterns, code styling, and accessibility.

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

## Text Decoration

### Links

```tsx
// Standard link
<a className="text-primary underline hover:text-foreground transition-colors">
  Link text
</a>

// Link without underline
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
  Very long text that will be truncated...
</p>
```

### Multi-Line Truncation

```tsx
<p className="line-clamp-2">
  Text truncated after two lines...
</p>
```

### Word Breaking

```tsx
// Break long words (use wrap-break-word, not deprecated break-words)
<p className="wrap-break-word">
  Superlongwordthatneedstobreak
</p>

// Break anywhere if needed
<p className="break-all">
  Technical/code/paths-need-break-all
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
```

### Text Resizing

```tsx
// Text MUST be resizable to 200% without loss
// Always use relative units (rem via Tailwind)

// ✅ CORRECT
className="text-sm"   // Uses rem

// ❌ WRONG
style={{ fontSize: '14px' }}  // Fixed pixels
```

---

## Terminal Format Rules

- Button text: `> UPPERCASE_UNDERSCORES`
- Labels: `[LABEL]:`
- Status: `[TYPE]: Message`
- Card headers: `[ [0x00] TITLE ]`
