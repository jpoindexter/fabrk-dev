# Audit Rules

What to check for design system compliance.

## File Size

| Lines | Severity | Action |
|-------|----------|--------|
| 400+ | CRITICAL | MUST split immediately |
| 300-399 | HIGH | MUST split |
| 200-299 | MEDIUM | Review for split |
| 150-199 | LOW | Monitor |

## Terminal Design System

> Full specification: `DESIGN_SYSTEM.md`

### Shape & Corners
- `rounded-none` on ALL elements
- EXCEPTION: Traffic light dots (`rounded-full`)
- EXCEPTION: CTA buttons (`primaryCta`, `secondaryCta`, `ghostOnDark`)

### Button Format
```tsx
// REQUIRED: > PREFIX + UPPERCASE + UNDERSCORES
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>
```

### Label Format
```tsx
// REQUIRED: Bracket notation
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>
```

### Color Tokens
- ONLY use design tokens from `globals.css`
- BANNED: `#hex`, `rgb()`, `hsl()`, `bg-gray-*`, `text-purple-*`

### Shadows
- ALLOWED: `shadow-sm`, `shadow-[4px_4px_0px_0px_var(--border)]`
- BANNED: `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`

## Component Patterns

### cn() Utility
```tsx
// REQUIRED for className merging
import { cn } from "@/lib/utils";
<div className={cn("base", className)} />

// BANNED
<div className={`base ${className}`} />
```

### forwardRef
```tsx
// REQUIRED: displayName
Component.displayName = "Component";
```

### data-slot
```tsx
// Required for CSS targeting
<button data-slot="button" />
```

## Code Quality

### Must NOT Contain
- `console.log/error/warn` (use `logger`)
- `// TODO` / `// FIXME` / `// HACK`
- `@ts-ignore` without justification
- `any` type without justification
- Unused imports/variables
- Commented-out code blocks (>2 lines)

### Import Order
1. React/Next imports
2. External libraries (alphabetical)
3. Internal UI components
4. Internal feature components
5. Utilities & hooks
6. Types (last)

## Accessibility (WCAG 2.1 AA)

- [ ] Focus visible indicators on all interactive elements
- [ ] `aria-label` on icon-only buttons
- [ ] Labels on form inputs
- [ ] 4.5:1 color contrast for text
- [ ] No `outline-none` without `focus-visible`

## Security

- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] No API keys in client code
- [ ] No `eval()` or `new Function()`
- [ ] Use `env.server.*` not `process.env`

## Documentation Pages

- ALL docs MUST use templates (`ComponentShowcaseTemplate`, etc.)
- `DocsCard` MUST have `title` prop
