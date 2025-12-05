# Size Guidelines

> Semantic sizes and arbitrary value policies

---

## Allowed Arbitrary Values

Some pixel values are necessary and should NOT be converted to tokens:

### 1. WCAG Touch Targets (Required)
```tsx
// Mobile touch targets - 48px minimum
h-[48px]  // Menu items, touch-friendly buttons
```

### 2. Auth Form Containers (Consistent)
```tsx
// Standard auth form widths
max-w-[380px]  // Sign in, sign up, forgot password forms
min-h-[500px]  // Auth page minimum height
min-h-[600px]  // Auth page with more fields
min-h-[700px]  // Sign up with all fields
```

### 3. Documentation Demo Boxes (Examples Only)
```tsx
// Only in /docs/ pages for demonstrations
w-[250px], w-[300px], w-[350px], w-[400px]
h-[150px], h-[200px]
```

---

## Use Tailwind Classes Instead

For most cases, use standard Tailwind size classes:

### Heights
| Need | Use | Avoid |
|------|-----|-------|
| Small component | `h-8` (32px) | `h-[30px]` |
| Default component | `h-9` (36px) | `h-[35px]` |
| Large component | `h-10` (40px) | `h-[42px]` |
| Touch target | `h-12` (48px) | `h-[50px]` |
| Card preview | `h-48` (192px) | `h-[200px]` |
| Section | `h-64` (256px) | `h-[250px]` |

### Widths
| Need | Use | Avoid |
|------|-----|-------|
| Icon column | `w-10` (40px) | `w-[40px]` |
| Select trigger | `w-32` (128px) | `w-[120px]` |
| Form field | `w-full` or `max-w-md` | `w-[300px]` |
| Card | `w-full` or `max-w-sm` | `w-[350px]` |
| Sidebar | `w-64` (256px) | `w-[250px]` |

### Max Widths (Containers)
```tsx
max-w-xs   // 320px - Narrow forms
max-w-sm   // 384px - Auth forms ✓ (close to max-w-[380px])
max-w-md   // 448px - Medium forms
max-w-lg   // 512px - Wide forms
max-w-xl   // 576px - Dialogs
max-w-2xl  // 672px - Wide dialogs
max-w-4xl  // 896px - Content
max-w-6xl  // 1152px - Dashboard
```

---

## Semantic Container Tokens

For commonly used sizes, use these semantic names:

### From design-system/spacing/scale.ts
```tsx
import { containerWidths } from '@/design-system';

containerWidths.xs    // max-w-xs (320px)
containerWidths.sm    // max-w-sm (384px)
containerWidths.md    // max-w-md (448px)
containerWidths.lg    // max-w-lg (512px)
containerWidths.xl    // max-w-xl (576px)
containerWidths.2xl   // max-w-2xl (672px)
containerWidths.4xl   // max-w-4xl (896px)
containerWidths.6xl   // max-w-6xl (1152px)
containerWidths.full  // max-w-full
```

---

## When to Add New Tokens

Only add new semantic tokens when:

1. **Same value used 5+ times** across different components
2. **Value has semantic meaning** (e.g., "auth form width" not "380px")
3. **Value might change** with design updates

### Example: Adding a Token
```tsx
// If you find yourself writing max-w-[380px] everywhere:

// 1. Add to design-system/spacing/scale.ts:
export const containerWidths = {
  ...existing,
  authForm: "max-w-sm", // Using standard Tailwind
}

// 2. Use consistently:
<div className={containerWidths.authForm}>
```

---

## Migration Path for Existing Arbitrary Values

### Auth Forms (migrate to max-w-sm)
```tsx
// Before
<div className="max-w-[380px]">

// After (380px ≈ 384px = max-w-sm)
<div className="max-w-sm">
```

### Preview Heights (keep or use standard)
```tsx
// Before
<div className="min-h-[400px]">

// After
<div className="min-h-96"> // 384px, close enough
// OR keep arbitrary if exact height matters for demos
```

---

## Summary

| Category | Policy |
|----------|--------|
| WCAG targets | ✅ Keep `h-[48px]` |
| Auth containers | ⚠️ Consider `max-w-sm` migration |
| Doc demos | ✅ Acceptable in `/docs/` |
| New components | ❌ Use standard Tailwind |
| Repeated patterns | 🔄 Create semantic token |

---

*Last updated: December 5, 2025*
