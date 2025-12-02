# Audit Rules

Quick reference and index to all design system compliance rules.

---

## File Reference

| File | Contents |
|------|----------|
| [`accessibility.md`](accessibility.md) | WCAG 2.1 AA compliance, keyboard navigation, screen readers, ARIA |
| [`design-principles.md`](design-principles.md) | UX heuristics, visual design, Gestalt, cognitive load, inclusive design |
| [`colors.md`](colors.md) | Design tokens, allowed/banned colors, contrast, theme switching |
| [`typography.md`](typography.md) | Font scale, weights, terminal patterns, responsive type |
| [`spacing.md`](spacing.md) | 8-point grid, padding, margins, gaps, layout patterns |
| [`interaction.md`](interaction.md) | Hover, focus, active, disabled, loading states, transitions |
| [`components.md`](components.md) | Form, button, card, dialog, tab, Radix UI patterns |
| [`responsive.md`](responsive.md) | Mobile-first, breakpoints, grids, navigation patterns |
| [`animation.md`](animation.md) | Framer Motion, CSS transitions, reduced motion, performance |
| [`enterprise.md`](enterprise.md) | Error boundaries, Suspense, data fetching, performance patterns |

---

## Critical Rules Summary

### Terminal Aesthetic

```tsx
// REQUIRED on ALL elements
className="rounded-none"        // Sharp corners
className="font-mono text-xs"   // Monospace typography

// Button format
<Button className="rounded-none font-mono text-xs">> SUBMIT</Button>

// Label format
<span className="font-mono text-xs text-muted-foreground">[LABEL]:</span>

// Status messages
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>
```

### Design Token Colors Only

```tsx
// ✅ ALLOWED
bg-background, bg-card, bg-muted, bg-primary
text-foreground, text-muted-foreground, text-primary
border-border, border-input, border-primary

// ❌ BANNED
bg-white, text-black, bg-purple-500, #8b5cf6
```

### Focus Indicators Required

```tsx
// ✅ REQUIRED on ALL interactive elements
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

// ❌ BANNED
className="outline-none"  // Never without alternative
```

### 8-Point Grid Spacing

```tsx
// ✅ PREFERRED
p-2, p-4, p-6, p-8, p-12, p-16
gap-2, gap-4, gap-6, gap-8
space-y-2, space-y-4, space-y-6, space-y-8

// ⚠️ AVOID
p-3, p-5, p-7, p-9  // Non-grid values
```

---

## File Organization

### Size Limits

| Lines | Severity | Action |
|-------|----------|--------|
| 400+ | CRITICAL | MUST split immediately |
| 300-399 | HIGH | MUST split before next release |
| 200-299 | MEDIUM | Review for split opportunities |
| 150-199 | LOW | Monitor, split if growing |

### Modular Design

- **Single Responsibility**: Each file does ONE thing well
- **Composition over Inheritance**: Prefer small, composable components
- **Barrel Exports**: Every component folder has `index.ts`
- **Colocation**: Keep related files together

---

## Security (CRITICAL)

### Environment Variables

```tsx
// ✅ REQUIRED: Use env.ts validation
import { env } from "@/lib/env";
const apiKey = env.server.API_KEY;

// ❌ BANNED: Direct access
const apiKey = process.env.API_KEY;
```

### Dangerous Patterns

```tsx
// ❌ BANNED without sanitization
dangerouslySetInnerHTML={{ __html: content }}

// ✅ REQUIRED: Sanitize first
import DOMPurify from "dompurify";
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}

// ❌ NEVER USE
eval(code)
new Function(code)
```

---

## Code Quality

### Must NOT Contain

| Pattern | Reason | Alternative |
|---------|--------|-------------|
| `console.log` | Debug code | Remove or use logger |
| `// TODO` | Incomplete work | Create issue instead |
| `// FIXME` | Known bug | Create issue instead |
| `@ts-ignore` | Type bypass | Fix the type |
| `: any` | Loose typing | Use proper type |

---

## Documentation Pages

### Template Requirements

| Template | Use For |
|----------|---------|
| `ComponentShowcaseTemplate` | `/docs/components/*` |
| `FeatureGuideTemplate` | `/docs/features/*`, `/docs/security/*` |

### DocsCard Rules

```tsx
// ✅ REQUIRED: title prop
<DocsCard title="SECTION_NAME">Content</DocsCard>

// ❌ BANNED: Missing title
<DocsCard>Content</DocsCard>
```

---

## Quick Scan Commands

```bash
# Critical: Hardcoded colors
npm run scan:hex

# Critical: Banned shadows
grep -rE "shadow-(md|lg|xl|2xl)" src/ --include="*.tsx"

# High: Rounded corners
grep -rE "rounded-(sm|md|lg|xl)" src/ --include="*.tsx"

# High: Missing focus
grep -rE "outline-none" src/ --include="*.tsx"

# Medium: Code quality
grep -rE "console\.(log|warn|error)|TODO|FIXME" src/ --include="*.tsx"
```

---

## Pre-Commit Checklist

### Automated

- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run scan:hex` passes

### Design System

- [ ] All buttons use `> ACTION` format
- [ ] All elements use `rounded-none`
- [ ] All colors use design tokens
- [ ] Spacing uses 8-point grid

### Accessibility

- [ ] All images have `alt` text
- [ ] Form inputs have labels
- [ ] Icon buttons have `aria-label`
- [ ] Focus indicators visible
- [ ] Tab navigation works

### UX

- [ ] Loading states present
- [ ] Hover states have transitions
- [ ] Error messages are helpful

---

## Anti-Patterns (NEVER DO)

### Design System Violations

```tsx
// ❌ Hardcoded colors
className="bg-purple-500 text-white"
style={{ color: '#8b5cf6' }}

// ❌ Rounded corners
className="rounded-lg"

// ❌ Heavy shadows
className="shadow-lg"

// ❌ Non-grid spacing
className="p-3 m-5 gap-7"
```

### Accessibility Violations

```tsx
// ❌ Remove outline without alternative
className="outline-none"

// ❌ Icon button without label
<Button size="icon"><X /></Button>

// ❌ Image without alt
<Image src="/logo.png" />

// ❌ Click on non-interactive element
<div onClick={handleClick}>Click me</div>
```

### Performance Violations

```tsx
// ❌ Inline objects in render
<Component style={{ margin: 10 }} />

// ❌ Anonymous functions without useCallback
<Button onClick={() => doThing()}>

// ❌ Missing key in map
{items.map((item) => <Item />)}
```

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Overview and quick start |
| `patterns.md` | Regex patterns for violation detection |
| `files.md` | File priority order for auditing |
| `output.md` | Report format templates |
| `protocol.md` | Step-by-step audit execution |
