# Audit Rules

Comprehensive compliance requirements for the Fabrk design system.

---

## 1. File Organization

### Size Limits

| Lines | Severity | Action |
|-------|----------|--------|
| 400+ | CRITICAL | MUST split immediately |
| 300-399 | HIGH | MUST split before next release |
| 200-299 | MEDIUM | Review for split opportunities |
| 150-199 | LOW | Monitor, split if growing |

### Modular Design Principles

- **Single Responsibility**: Each file does ONE thing well
- **Composition over Inheritance**: Prefer small, composable components
- **Barrel Exports**: Every component folder has `index.ts`
- **Colocation**: Keep related files together (component + hook + types + test)

### File Structure

```
src/components/feature-name/
├── index.ts           # Barrel export
├── FeatureName.tsx    # Main component
├── FeatureName.test.tsx
├── use-feature.ts     # Custom hook (if needed)
├── types.ts           # TypeScript types
└── constants.ts       # Feature constants
```

---

## 2. Terminal Design System

> Full specification: `DESIGN_SYSTEM.md`

### Shape & Corners (CRITICAL)

| Rule | Allowed | Banned |
|------|---------|--------|
| Default | `rounded-none` | Everything else |
| Exception | `rounded-full` (traffic dots ONLY) | `rounded-sm`, `rounded-md`, etc. |

### Button Format (HIGH)

```tsx
// REQUIRED: > PREFIX + UPPERCASE + UNDERSCORES
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>
<Button className="rounded-none font-mono text-xs">> SAVE_CHANGES</Button>
<Button className="rounded-none font-mono text-xs">> DELETE_ACCOUNT</Button>

// Loading state
<Button disabled className="rounded-none font-mono text-xs">> LOADING...</Button>

// Icon buttons need aria-label
<Button size="icon" aria-label="Close dialog" className="rounded-none">
  <X className="h-4 w-4" />
</Button>
```

### Label Format (HIGH)

```tsx
// Standard labels - ALWAYS use brackets
<span className="font-mono text-xs text-muted-foreground">[EMAIL]:</span>
<span className="font-mono text-xs text-muted-foreground">[PASSWORD]:</span>
<span className="font-mono text-xs text-muted-foreground">[STATUS]:</span>

// Status messages - Include status type
<p className="font-mono text-xs text-destructive">[ERROR]: Invalid credentials</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Saved successfully</p>
<p className="font-mono text-xs text-warning">[WARNING]: Unsaved changes</p>
<p className="font-mono text-xs text-info">[INFO]: Processing request...</p>
```

### Card Headers (HIGH)

```tsx
// Terminal-style card header
<div className="border border-border bg-card rounded-none">
  <div className="border-b border-border px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">
      [ [0x00] SECTION_TITLE ]
    </span>
  </div>
  <div className="p-4">
    {/* Content */}
  </div>
</div>
```

### Traffic Light Dots (Only Exception to rounded-full)

```tsx
<div className="flex items-center gap-2 border-b border-border px-4 py-2">
  <div className="flex gap-1.5">
    <div className="size-2 rounded-full bg-destructive/50" />
    <div className="size-2 rounded-full bg-warning/50" />
    <div className="size-2 rounded-full bg-success/50" />
  </div>
  <span className="font-mono text-xs text-muted-foreground">filename.tsx</span>
</div>
```

---

## 3. Color System (CRITICAL)

### Allowed Tokens

```tsx
// Backgrounds
bg-background      // Page background
bg-card            // Card surfaces
bg-muted           // Subtle backgrounds
bg-primary         // Brand/CTA
bg-secondary       // Secondary actions
bg-destructive     // Error states
bg-success         // Success states
bg-warning         // Warning states
bg-info            // Info states

// Text
text-foreground           // Primary text
text-muted-foreground     // Secondary text
text-primary              // Brand color
text-primary-foreground   // On primary bg
text-destructive          // Error text
text-destructive-foreground
text-success              // Success text
text-warning              // Warning text
text-info                 // Info text

// Borders
border-border      // Standard borders
border-input       // Input borders
border-primary     // Accent borders

// Charts
chart-1 through chart-5
```

### BANNED (No Exceptions)

- Hardcoded hex: `#8b5cf6`, `#ffffff`, etc.
- Tailwind palette: `bg-gray-500`, `text-purple-600`, `border-slate-200`
- Raw functions: `rgb()`, `hsl()`, `oklch()` (without var())
- White/black: `bg-white`, `text-black`

---

## 4. Shadows (HIGH)

### Allowed

```tsx
shadow-sm                                    // Subtle elevation
shadow-[4px_4px_0px_0px_var(--border)]       // Terminal hard shadow
```

### BANNED (No Exceptions)

```tsx
shadow-md
shadow-lg
shadow-xl
shadow-2xl
shadow-inner
drop-shadow-md
drop-shadow-lg
```

---

## 5. Component Patterns

### cn() Utility (HIGH)

```tsx
// REQUIRED for className merging
import { cn } from "@/lib/utils";

<div className={cn("base-styles", className, {
  "conditional-style": condition,
})} />

// BANNED - Template literals
<div className={`base ${className}`} />
<div className={"base " + className} />
```

### forwardRef Components (HIGH)

```tsx
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("base", className)} {...props} />
  )
);
Component.displayName = "Component";  // REQUIRED
```

### data-slot Attribute (MEDIUM)

```tsx
// Required for CSS targeting in compound components
<button data-slot="trigger" />
<div data-slot="content" />
<span data-slot="label" />
```

### Composition Pattern (HIGH)

```tsx
// GOOD - Compound components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// BAD - Prop overload
<Card title="Title" content="Content" headerClass="..." contentClass="..." />
```

---

## 6. Import Organization

### Order (MEDIUM)

```tsx
// 1. React/Next.js
import * as React from "react";
import { useRouter } from "next/navigation";

// 2. External libraries (alphabetical)
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";

// 3. Internal UI components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 4. Internal feature components
import { UserAvatar } from "@/components/dashboard/user-avatar";

// 5. Utilities & hooks
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

// 6. Types (last)
import type { User } from "@/types";
```

---

## 7. Accessibility (WCAG 2.1 AA) (CRITICAL)

### Focus Management

```tsx
// REQUIRED: Visible focus indicators
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// BANNED without focus-visible replacement
className="outline-none"
className="focus:outline-none"
```

### Labels & ARIA

```tsx
// Form inputs MUST have labels
<Label htmlFor="email">[EMAIL]:</Label>
<Input id="email" type="email" />

// Icon-only buttons MUST have aria-label
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Images MUST have alt text
<Image src="/logo.png" alt="Company logo" />
```

### Keyboard Navigation

- All interactive elements reachable via Tab
- No `tabIndex` greater than 0
- `tabIndex="-1"` only with `aria-hidden="true"`
- Escape closes modals/popovers

### Color Contrast

- Text: 4.5:1 minimum against background
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 against adjacent colors

### Screen Reader

```tsx
// Visually hidden but accessible
<span className="sr-only">Description for screen readers</span>

// Skip links
<a href="#main-content" className="skip-link">Skip to main content</a>
```

### Motion

```tsx
// Respect user preferences
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    duration: 0.3,
    // Reduce motion for users who prefer it
  }}
  className="motion-safe:animate-fadeIn"
/>
```

---

## 8. Security (CRITICAL)

### Environment Variables

```tsx
// REQUIRED: Use env.ts validation
import { env } from "@/lib/env";
const apiKey = env.server.API_KEY;

// BANNED: Direct access
const apiKey = process.env.API_KEY;
```

### Dangerous Patterns

```tsx
// BANNED without sanitization
dangerouslySetInnerHTML={{ __html: content }}

// REQUIRED: Sanitize first
import DOMPurify from "dompurify";
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}

// NEVER USE
eval(code)
new Function(code)
```

### Client-Side Security

- Never expose API keys in client code
- Validate all user input server-side
- Use HTTPS for all external requests
- Sanitize any user-generated content

---

## 9. Documentation Pages (HIGH)

### Template Requirements

ALL docs pages MUST use a template:

| Template | Use For |
|----------|---------|
| `ComponentShowcaseTemplate` | `/docs/components/*` |
| `FeatureGuideTemplate` | `/docs/features/*`, `/docs/security/*` |
| `TutorialTemplate` | `/docs/tutorials/*` |
| `GettingStartedTemplate` | `/docs/getting-started/*` |

### DocsCard Rules

```tsx
// REQUIRED: title prop
<DocsCard title="SECTION_NAME">Content</DocsCard>

// BANNED: Missing title
<DocsCard>Content</DocsCard>
```

### Preview Rules

```tsx
// GOOD: Direct component in preview
mainPreview={{
  preview: <Button>> CLICK_ME</Button>,
  code: `<Button>> CLICK_ME</Button>`,
}}

// BAD: Wrapper div
mainPreview={{
  preview: <div><Button>> CLICK_ME</Button></div>,
  code: `...`,
}}
```

---

## 10. Code Quality (MEDIUM)

### Must NOT Contain

| Pattern | Reason | Alternative |
|---------|--------|-------------|
| `console.log` | Debug code | Remove or use logger |
| `console.error` | Debug code | Use error boundary |
| `// TODO` | Incomplete work | Create issue instead |
| `// FIXME` | Known bug | Create issue instead |
| `// HACK` | Technical debt | Refactor properly |
| `@ts-ignore` | Type bypass | Fix the type |
| `@ts-expect-error` | Type bypass | Fix the type |
| `: any` | Loose typing | Use proper type |
| `as any` | Type assertion | Use proper cast |

### Exceptions (Must Comment)

```tsx
// @ts-expect-error - Third-party library types incorrect, reported upstream
const result = legacyLib.doThing();

// eslint-disable-next-line - Intentional for performance
const cached = useMemo(() => expensiveCalc(), []);
```

---

## 11. Enterprise Patterns (HIGH)

### Error Boundaries

Every route group should have:
- `error.tsx` - Error boundary
- `loading.tsx` - Loading state
- `not-found.tsx` - 404 state (where applicable)

### Data Fetching

```tsx
// GOOD: Error handling
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
} catch (error) {
  // Handle error
}

// BAD: No error handling
const data = await fetch(url).then(r => r.json());
```

### Suspense Boundaries

```tsx
// Wrap lazy-loaded components
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### Performance

- Use `React.memo` for list item components
- Use `useCallback` for handlers passed to children
- Use `useMemo` for expensive computations
- Add `key` prop to all mapped elements

---

## 12. Testing Requirements (MEDIUM)

### Coverage Expectations

| Type | Coverage | Priority |
|------|----------|----------|
| Utility functions | 90%+ | HIGH |
| Custom hooks | 80%+ | HIGH |
| Components | 70%+ | MEDIUM |
| Integration | Key flows | HIGH |

### Test File Location

```
src/components/button/
├── Button.tsx
├── Button.test.tsx    # Unit tests
└── Button.e2e.ts      # E2E tests (if needed)
```

---

## Quick Reference Checklist

### Before Every Commit

- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run scan:hex` passes
- [ ] No `console.log` statements
- [ ] No `// TODO` comments
- [ ] All buttons use `> ACTION` format
- [ ] All elements use `rounded-none`
- [ ] All colors use design tokens
- [ ] All images have alt text
- [ ] DocsCard components have `title` prop
