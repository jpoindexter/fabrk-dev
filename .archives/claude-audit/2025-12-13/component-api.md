# Component API Consistency Audit

Standards for prop naming, variants, and component interfaces.

---

## Quick Reference

| Check | Severity | Pattern |
|-------|----------|---------|
| Inconsistent prop names | HIGH | `loading` vs `isLoading` |
| Missing variant prop | MEDIUM | No variant system |
| Inconsistent sizes | HIGH | `sm/md/lg` vs `small/medium/large` |
| Undocumented props | MEDIUM | Props without JSDoc |

---

## Prop Naming Conventions

### Boolean Props

```typescript
// ✅ CORRECT - Use `is` prefix for boolean state
interface ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
}

// ✅ CORRECT - Use `has` prefix for presence
interface CardProps {
  hasHeader?: boolean;
  hasBorder?: boolean;
}

// ✅ CORRECT - Use `show` prefix for visibility
interface ModalProps {
  showCloseButton?: boolean;
  showOverlay?: boolean;
}

// ❌ WRONG - Inconsistent naming
interface ButtonProps {
  loading?: boolean;     // Should be isLoading
  disabled?: boolean;    // Native HTML, acceptable
  active?: boolean;      // Should be isActive
}
```

### Event Handler Props

```typescript
// ✅ CORRECT - Use `on` prefix
interface ButtonProps {
  onClick?: () => void;
  onHover?: () => void;
  onChange?: (value: string) => void;
}

// ✅ CORRECT - Include event context when needed
interface SelectProps {
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
}

// ❌ WRONG - Missing prefix or inconsistent
interface ButtonProps {
  click?: () => void;        // Should be onClick
  handleClick?: () => void;  // Should be onClick
}
```

### Size Props

```typescript
// ✅ CORRECT - Consistent size tokens
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  size?: Size;
}

interface InputProps {
  size?: Size;
}

// ❌ WRONG - Inconsistent size naming
interface ButtonProps {
  size?: "small" | "medium" | "large";  // Should be sm/md/lg
}

interface InputProps {
  size?: "s" | "m" | "l";  // Should be sm/md/lg
}
```

---

## Variant System

### Standard Variants

```typescript
// All interactive components should support these variants
type Variant =
  | "default"      // Primary action
  | "secondary"    // Secondary action
  | "outline"      // Bordered, transparent bg
  | "ghost"        // No border, transparent bg
  | "destructive"  // Danger/delete actions
  | "link";        // Text link style

interface ButtonProps {
  variant?: Variant;
}

interface BadgeProps {
  variant?: Variant;
}
```

### Status Variants

```typescript
// For feedback components
type StatusVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info";

interface AlertProps {
  variant?: StatusVariant;
}

interface ToastProps {
  variant?: StatusVariant;
}
```

---

## Required Props Documentation

### JSDoc for All Props

```typescript
interface ButtonProps {
  /**
   * The content to display inside the button.
   */
  children: React.ReactNode;

  /**
   * Visual style variant of the button.
   * @default "default"
   */
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";

  /**
   * Size of the button.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the button is in a loading state.
   * Shows a spinner and disables interaction.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Handler called when the button is clicked.
   */
  onClick?: () => void;
}
```

---

## Compound Components

### Pattern for Complex Components

```typescript
// ✅ CORRECT - Compound component pattern
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// ❌ WRONG - Props for everything
<Card
  title="Title"
  content="Content"
  footerAction={<Button>Action</Button>}
/>
```

### Export Pattern

```typescript
// card.tsx
export { Card, CardHeader, CardTitle, CardContent, CardFooter };
export type { CardProps };

// ❌ WRONG - Default export
export default Card;  // Prevents tree shaking
```

---

## Consistency Checklist

### Every Component Must Have:

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `className` | `string` | - | For style overrides |
| `children` | `ReactNode` | - | When applicable |
| `variant` | `string` | `"default"` | For visual variants |
| `size` | `string` | `"md"` | When size matters |

### Interactive Components Must Have:

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `disabled` | `boolean` | `false` | Native HTML prop |
| `isLoading` | `boolean` | `false` | For async actions |
| `onClick` | `function` | - | For button-like elements |

### Form Components Must Have:

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Uncontrolled default |
| `onChange` | `function` | - | Value change handler |
| `onBlur` | `function` | - | Focus loss handler |
| `error` | `string` | - | Error message |
| `required` | `boolean` | `false` | Required indicator |

---

## Detection Patterns

```bash
# Inconsistent boolean prop names
grep -rE '(loading|active|disabled)=\{' src/components --include="*.tsx" | grep -v "is"

# Missing variant prop
grep -rL 'variant' src/components/ui --include="*.tsx"

# Inconsistent size tokens
grep -rE 'size="(small|medium|large|s|m|l)"' src --include="*.tsx"

# Missing JSDoc
grep -rE 'interface.*Props' src/components --include="*.tsx" | head -20
```

---

## Migration Guide

### Renaming Props

```typescript
// Before
interface ButtonProps {
  loading?: boolean;
}

// After (with backwards compatibility)
interface ButtonProps {
  /**
   * @deprecated Use `isLoading` instead
   */
  loading?: boolean;
  isLoading?: boolean;
}

function Button({ loading, isLoading, ...props }: ButtonProps) {
  const showLoading = isLoading ?? loading;
  // ...
}
```

---

## Common Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| `loading` vs `isLoading` | Inconsistent API | Standardize on `isLoading` |
| `sm/md/lg` vs `small/medium` | Confusion | Use short form `sm/md/lg` |
| Missing `className` | Can't override styles | Always accept className |
| Default export | Tree shaking broken | Use named exports |
| No JSDoc | Hard to use | Document all props |
