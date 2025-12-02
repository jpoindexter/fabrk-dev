# Comprehensive Site Audit - Design System & Architecture v5.5
## Zero-Tolerance Full-Stack Compliance Check

Perform an exhaustive audit with zero tolerance for gaps.
Check EVERY file, EVERY line, EVERY component, EVERY pattern.

> **Related Documentation:**
> - `DESIGN_SYSTEM.md` - Formal design system specification (colors, typography, spacing, terminal aesthetic)
> - `CLAUDE.md` - Quick reference for Claude Code

---

# QUICK SEARCH PATTERNS (Regex)

Use these patterns to quickly find violations:

```bash
# Rounded corners (except rounded-none, rounded-md, rounded-full traffic dots)
rounded-(?:sm|lg|xl|2xl|3xl|\[)

# Hardcoded colors
#[0-9a-fA-F]{3,8}
rgb\(|rgba\(|hsl\(|hsla\(
(bg|text|border)-(red|blue|green|yellow|purple|pink|orange|gray|slate|zinc)-\d+

# Missing terminal styling
<Button(?![^>]*font-mono)
<Input(?![^>]*rounded-none)
<Card(?![^>]*rounded-none)

# Console statements (use logger instead)
console\.(log|warn|error|info|debug)

# TODO/FIXME comments
//\s*(TODO|FIXME|HACK|XXX)

# TypeScript escape hatches
@ts-ignore|@ts-expect-error|any(?!\w)

# Native elements that should use UI components
<button(?!\s+type=)
<input(?!\s+type=\"hidden)
<select\s+

# Missing auth checks in API routes
export async function (GET|POST|PUT|DELETE|PATCH)(?!.*auth\(\))

# Direct process.env usage (should use env.ts)
process\.env\.(?!NODE_ENV)

# Missing "use client" for hooks
use(State|Effect|Context|Ref|Callback|Memo)\((?!.*"use client")

# Inline styles (should use className)
style=\{
```

---

# PART A: PRE-AUDIT CHECKLIST

Before starting, verify:
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] Type check passes (`npm run type-check`)
- [ ] Lint passes (`npm run lint`)
- [ ] Hex scan passes (`npm run scan:hex`)
- [ ] Build succeeds (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] Current branch is clean (no uncommitted changes)
- [ ] Note current git SHA for rollback

If any fail, STOP and report the failure first.

---

# PART B: AUDIT RULES

---

## 1. FILE SIZE, STRUCTURE & MODULARITY

### Size Limits
| Lines | Severity | Action |
|-------|----------|--------|
| 400+  | 🔴 CRITICAL | MUST split immediately |
| 300-399 | 🟠 HIGH | MUST split |
| 200-299 | 🟡 MEDIUM | Review for split |
| 150-199 | 🔵 LOW | Monitor |

### Naming Conventions
```
Files:       kebab-case.tsx         hero-section.tsx
Components:  PascalCase             HeroSection
Hooks:       use-kebab-case.ts      use-toast.ts
Utils:       kebab-case.ts          format-date.ts
Types:       PascalCase             UserProfile
Constants:   SCREAMING_SNAKE        MAX_FILE_SIZE
Tests:       *.test.ts(x)           button.test.tsx
Stories:     *.stories.tsx          button.stories.tsx
API Routes:  route.ts               app/api/users/route.ts
Config:      kebab-case.ts/js       config.js, auth.ts
```

### Export Patterns
- Components: Named exports (`export function Component`)
- Pages: Default exports (`export default function Page`)
- Types: Named exports (`export type Props = ...`)
- Utils: Named exports (`export function util()`)
- Barrel exports (`index.ts`) for component folders with 3+ files
- Config: Named default export (`const config = {}; export default config`)

### File Organization (strict order)
```tsx
// ━━━ 1. Directives ━━━
"use client"; // Only if needed!

// ━━━ 2. React/Next imports ━━━
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// ━━━ 3. External libraries (alphabetical) ━━━
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ━━━ 4. Internal UI components ━━━
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ━━━ 5. Internal feature components ━━━
import { HeroSection } from "@/components/landing/hero-section";

// ━━━ 6. Utilities & hooks ━━━
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// ━━━ 7. Types (last) ━━━
import type { User } from "@/types";

// ━━━ 8. Local type definitions ━━━
interface ComponentProps {
  // ...
}

// ━━━ 9. Constants ━━━
const MAX_ITEMS = 10;

// ━━━ 10. Component ━━━
export function Component({ prop }: ComponentProps) {
  // State first
  // Effects second
  // Handlers third
  // Render last
}
Component.displayName = "Component"; // REQUIRED for forwardRef components

// ━━━ 11. Sub-components (if <50 lines each) ━━━
function SubComponent() {}
```

### Modularity Rules
- Single responsibility per component
- Extract repeated code (3+ lines appearing 2+ times)
- No inline styles - all via className
- No anonymous components in JSX (extract to named functions)
- Props interface required for all components with 2+ props
- `displayName` required for all `forwardRef` components

---

## 2. TERMINAL DESIGN SYSTEM - 100% COMPLIANCE

### 2.1 Shape & Corners

**RULE:** `rounded-none` on ALL elements EXCEPT:
1. Traffic light dots in terminal chrome
2. Base UI component default variants (they use `rounded-md`)

**IMPORTANT:** When using base UI components, ADD `rounded-none` to override:
```tsx
// Base component has rounded-md by default
<Button className="rounded-none font-mono text-xs">

// Override ANY rounded class from base
<Card className="rounded-none">
<Input className="rounded-none">
```

**BANNED PATTERNS (search regex):**
```regex
rounded-(?:sm|lg|xl|2xl|3xl|full|\[)
```

**Note:** `rounded-md` is allowed ONLY in base UI component definitions (`src/components/ui/`).
Feature components MUST override with `rounded-none`.

**SINGLE EXCEPTION:**
```tsx
// Traffic light dots in terminal window chrome ONLY
<div className="size-2 rounded-full bg-destructive/50" />
<div className="size-2 rounded-full bg-warning/50" />
<div className="size-2 rounded-full bg-success/50" />
```

### 2.2 Typography Hierarchy

| Element | Classes | Format |
|---------|---------|--------|
| Page title | `text-4xl font-semibold tracking-tight` | Title Case |
| Section heading | `text-2xl font-semibold tracking-tight` | Title Case |
| Subsection | `text-xl font-semibold` | Title Case |
| Card title | `font-mono text-xs` | `[TITLE]:` |
| Form label | `font-mono text-xs` | `[LABEL]:` |
| Body text | `font-mono text-sm` | Normal |
| Helper text | `font-mono text-xs text-muted-foreground` | Normal |
| Error text | `font-mono text-xs text-destructive` | `[ERROR]: msg` |
| Success text | `font-mono text-xs text-success` | `[SUCCESS]: msg` |
| Code/output | `font-mono text-xs` | `> OUTPUT` |
| Tiny/badge | `font-mono text-[10px]` | `[TAG]` |
| Breadcrumb | `font-mono text-xs text-muted-foreground` | `path / to / page` |
| Timestamp | `font-mono text-xs text-muted-foreground` | Normal |
| Legal body | `text-sm` (exception - readability) | Normal prose |

### 2.3 Button Standards

**Text Format:** `> ACTION_NAME`
- Uppercase
- Underscores for spaces
- Leading `>` and space
- Examples: `> SUBMIT`, `> SAVE_CHANGES`, `> DELETE_ACCOUNT`

**Loading States:**
- `> LOADING...`
- `> SAVING...`
- `> DELETING...`
- Use `loading` prop when available: `<Button loading loadingText="> SAVING...">`

**Required Classes:**
```tsx
<Button className="rounded-none font-mono text-xs">
  > ACTION
</Button>
```

**Variants:**
| Variant | Use Case |
|---------|----------|
| `default` | Primary actions |
| `outline` | Secondary actions |
| `ghost` | Tertiary/subtle actions |
| `destructive` | Delete/dangerous actions |
| `link` | Inline text links |
| `primaryCta` | Landing page hero CTA |
| `secondaryCta` | Landing page secondary CTA |
| `ghostOnDark` | CTA on dark backgrounds |

**CTA Variants Exception:**
`primaryCta`, `secondaryCta`, `ghostOnDark` intentionally use `rounded-md` for marketing emphasis. Do NOT add `rounded-none` to these.

### 2.4 Terminal Window Chrome

**Standard Pattern:**
```tsx
<div className="border border-border bg-card">
  {/* Header */}
  <div className="flex items-center gap-2 border-b border-border px-4 py-2">
    <div className="flex gap-1.5">
      <div className="size-2 rounded-full bg-destructive/50" />
      <div className="size-2 rounded-full bg-warning/50" />
      <div className="size-2 rounded-full bg-success/50" />
    </div>
    <span className="font-mono text-xs text-muted-foreground">filename.tsx</span>
  </div>
  {/* Content */}
  <div className="p-4">
    {children}
  </div>
</div>
```

**Terminal Preview Class:**
Use `.terminal-preview` wrapper class to force terminal styling on all children (via globals.css):
```tsx
<div className="terminal-preview">
  {/* All children will have rounded-none forced via CSS */}
</div>
```

### 2.5 Terminal Prefixes

| Context | Prefix | Example |
|---------|--------|---------|
| Commands/buttons | `>` | `> SUBMIT` |
| Success output | `✓` | `✓ Saved` |
| Comments | `//` | `// All sales final` |
| Errors | `✗` or `[ERROR]:` | `[ERROR]: Invalid` |
| Prompts | `$` | `$ npm install` |
| List items | `>` | `> Item one` |

### 2.6 Color Tokens

**BANNED (search patterns):**
```regex
#[0-9a-fA-F]{3,8}
rgb\(|rgba\(
hsl\(|hsla\(
oklch\([^v]  // Direct oklch values (must use var)
(bg|text|border|fill|stroke)-(red|blue|green|yellow|purple|pink|orange|gray|slate|zinc|stone|neutral|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose|lime|amber)-\d+
```

**ALLOWED ONLY:**
```
Background/Surface:
  background, foreground
  card, card-foreground
  muted, muted-foreground
  popover, popover-foreground

Interactive:
  primary, primary-foreground
  secondary, secondary-foreground
  accent, accent-foreground

Semantic:
  destructive, destructive-foreground
  success, success-foreground
  warning, warning-foreground
  info, info-foreground (if defined)

Structural:
  border, input, ring

Chart Colors (for data visualization):
  chart-1 through chart-5 (if defined)
```

**CSS Variable Format (OKLCH):**
```css
/* In globals.css - OKLCH format required */
--primary: 70.28% 0.1753 295.36;  /* lightness chroma hue */

/* Usage in components */
oklch(var(--primary))
```

### 2.7 Borders

| Type | Classes |
|------|---------|
| Standard | `border border-border` |
| Emphasis | `border-2 border-border` |
| Strong | `border-2 border-foreground` |
| Destructive | `border border-destructive` |
| Top divider | `border-t border-border` |
| Bottom divider | `border-b border-border` |
| Dashed (empty states) | `border border-dashed border-border` |

**BANNED:** Custom border colors (`border-gray-200`, etc.)

### 2.8 Shadows

| Type | Classes |
|------|---------|
| None | (default) |
| Subtle | `shadow-sm` |
| Terminal hard | `shadow-[4px_4px_0px_0px_var(--border)]` |

**BANNED:** `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`

### 2.9 Spacing Scale

**Component Gaps:**
- Micro: `gap-1`, `gap-1.5`, `gap-2` (4-8px)
- Small: `gap-3`, `gap-4` (12-16px)
- Medium: `gap-6`, `gap-8` (24-32px)
- Large: `gap-10`, `gap-12` (40-48px)

**Section Padding:**
- Compact: `py-8` (32px)
- Standard: `py-12`, `py-16` (48-64px)
- Generous: `py-20`, `py-24` (80-96px)

**Container:**
```tsx
<div className="container mx-auto max-w-7xl px-6">
// OR use base Container component
<Container>
```

**Text Max Width (for readability):**
- Prose: `max-w-prose` or `max-w-2xl`
- Headings: `max-w-3xl` or `max-w-4xl`

### 2.10 Z-Index Scale

| Layer | Z-Index | Use |
|-------|---------|-----|
| Base | `z-0` | Default content |
| Raised | `z-10` | Sticky elements, cards |
| Dropdown | `z-20` | Dropdowns, popovers |
| Sticky | `z-30` | Sticky nav, CTAs |
| Modal backdrop | `z-40` | Dialog overlays |
| Modal | `z-50` | Dialogs, sheets |
| Toast | `z-[100]` | Notifications |
| Tooltip | `z-[110]` | Tooltips (highest) |

---

## 3. COMPONENT PATTERNS

### 3.1 The `cn()` Utility (CRITICAL)
Always use `cn()` from `@/lib/utils` for className merging:
```tsx
import { cn } from "@/lib/utils";

// ✅ GOOD - Merges classes with Tailwind conflict resolution
<div className={cn("p-4 bg-primary", className, { "opacity-50": disabled })} />

// ❌ BAD - String concatenation loses conflict resolution
<div className={`p-4 bg-primary ${className}`} />

// ❌ BAD - Array join doesn't resolve conflicts
<div className={["p-4", "p-2"].join(" ")} /> // Both p-4 and p-2 applied

// ✅ GOOD - cn resolves conflicts (p-2 wins)
<div className={cn("p-4", "p-2")} /> // Only p-2 applied
```

### 3.2 CVA (class-variance-authority) Pattern
Used in base UI components for variant management:
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const componentVariants = cva(
  "base-classes rounded-md text-sm", // Base styles
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-foreground/20",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-7 px-2 text-xs",
        lg: "h-9 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

// Usage - variants automatically type-safe
<Component variant="outline" size="sm" />
```

### 3.3 Empty States
```tsx
<EmptyState
  icon={<Icon className="h-6 w-6" />}
  title="[NO_DATA]:"
  description="No items found"
  action={
    <Button className="rounded-none font-mono text-xs" variant="outline">
      > ADD_FIRST_ITEM
    </Button>
  }
/>

// Or manual pattern:
<div className="border border-dashed border-border p-8 text-center">
  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-border bg-muted">
    <Icon className="h-6 w-6 text-muted-foreground" />
  </div>
  <p className="font-mono text-xs text-muted-foreground">
    [NO_DATA]: No items found
  </p>
  <Button className="mt-4 rounded-none font-mono text-xs" variant="outline">
    > ADD_FIRST_ITEM
  </Button>
</div>
```

### 3.4 Loading States
```tsx
// Use Loading component when available
<Loading />
<Loading size="sm" />
<Loading size="lg" />

// Inline text
<span className="font-mono text-xs text-muted-foreground">> LOADING...</span>

// Skeleton (use base component)
<Skeleton className="h-4 w-32 rounded-none" />

// Full section
<div className="space-y-3">
  <Skeleton className="h-8 w-48 rounded-none" />
  <Skeleton className="h-4 w-full rounded-none" />
  <Skeleton className="h-4 w-2/3 rounded-none" />
</div>

// Button loading (use loading prop)
<Button loading loadingText="> SAVING..." className="rounded-none font-mono text-xs">
  > SAVE
</Button>

// Suspense boundary (in loading.tsx files)
export default function Loading() {
  return <Loading />;
}
```

### 3.5 Error States
```tsx
// Form field error (use FormError component when available)
<FormError message="Invalid email address" />

// Or manual:
<div className="space-y-2">
  <Label className="font-mono text-xs">[EMAIL]:</Label>
  <Input className="rounded-none border-destructive font-mono text-xs" />
  <p className="font-mono text-xs text-destructive">[ERROR]: Invalid email address</p>
</div>

// Error banner
<div className="border border-destructive bg-destructive/10 p-4">
  <p className="font-mono text-xs text-destructive">
    [ERROR]: Something went wrong. Please try again.
  </p>
</div>

// Error page (error.tsx pattern)
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="font-mono text-6xl font-bold">500</h1>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        [ERROR]: {error.message}
      </p>
      <Button onClick={reset} className="mt-8 rounded-none font-mono text-xs">
        > TRY_AGAIN
      </Button>
    </div>
  );
}
```

### 3.6 Success States
```tsx
// Success banner
<div className="border border-success bg-success/10 p-4">
  <p className="font-mono text-xs text-success">
    [SUCCESS]: Your changes have been saved
  </p>
</div>

// Inline success
<span className="font-mono text-xs text-success">✓ Verified</span>
```

### 3.7 Toast/Notifications

**Sonner Integration:**
The app uses Sonner for toasts. Global styling is applied via `globals.css`:
```css
[data-sonner-toast] {
  border-radius: 0 !important;
  font-family: var(--font-mono) !important;
  font-size: 0.75rem !important;
}
```

**Usage (Direct Sonner):**
```tsx
import { toast } from "sonner";

// Success
toast.success("[SUCCESS]: Settings saved");

// Error
toast.error("[ERROR]: Failed to save changes");

// Custom
toast("[INFO]: Processing...");
```

**Usage (useToast Hook - Preferred):**
```tsx
import { useToast } from "@/hooks/use-toast";

export function Component() {
  const { toast, success, error, warning, info } = useToast();

  // Methods
  success("Settings saved", "Your changes have been applied");
  error("Failed to save", "Please try again");
  warning("Warning", "This action cannot be undone");
  info("Info", "Processing your request");

  // Generic toast
  toast({ title: "Title", description: "Description" });
}
```

### 3.8 Pagination
```tsx
// Use Pagination component when available
<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />

// Or manual:
<div className="flex items-center justify-center gap-2">
  <Button variant="outline" size="sm" className="rounded-none font-mono text-xs" disabled>
    > PREV
  </Button>
  <span className="font-mono text-xs text-muted-foreground">Page 1 of 10</span>
  <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
    > NEXT
  </Button>
</div>
```

### 3.9 Breadcrumbs
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### 3.10 Keyboard Shortcuts
```tsx
<kbd className="inline-flex h-5 items-center gap-1 rounded-none border border-border bg-muted px-1.5 font-mono text-[10px]">
  <span className="text-xs">⌘</span>K
</kbd>
```

### 3.11 Badges/Tags
```tsx
<Badge className="rounded-none font-mono text-xs">[TAG]</Badge>
<Badge variant="outline" className="rounded-none font-mono text-xs">[DRAFT]</Badge>
<Badge variant="destructive" className="rounded-none font-mono text-xs">[URGENT]</Badge>
```

### 3.12 Avatar
```tsx
<Avatar className="rounded-none border border-border">
  <AvatarImage src={user.avatar} alt={user.name} />
  <AvatarFallback className="rounded-none font-mono text-xs">
    {user.initials}
  </AvatarFallback>
</Avatar>

// Avatar group - use AvatarGroup component
<AvatarGroup users={users} max={3} />
```

### 3.13 Tables
```tsx
<Table>
  <TableHeader>
    <TableRow className="border-b-2 border-foreground hover:bg-transparent">
      <TableHead className="font-mono text-xs">[NAME]</TableHead>
      <TableHead className="font-mono text-xs">[STATUS]</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="border-border hover:bg-muted/50">
      <TableCell className="font-mono text-xs">Item</TableCell>
      <TableCell className="font-mono text-xs">Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 3.14 Code Blocks
```tsx
<div className="border border-border bg-card">
  <div className="flex items-center justify-between border-b border-border px-4 py-2">
    <span className="font-mono text-xs text-muted-foreground">example.tsx</span>
    <CopyButton text={code} />
  </div>
  <pre className="overflow-x-auto p-4">
    <code className="font-mono text-xs">{code}</code>
  </pre>
</div>
```

### 3.15 Stat Cards & Charts
```tsx
<StatCard title="[TOTAL_USERS]:" value="1,234" change="+12%" trend="up" />
<Gauge value={75} max={100} />
<DonutChart data={chartData} />
<Sparkline data={trendData} />
// All charts should use chart color tokens: chart-1, chart-2, etc.
```

---

## 4. INTERACTIVE STATES

### 4.1 Hover States
| Element | Classes |
|---------|---------|
| Primary button | `hover:bg-primary/90` |
| Outline button | `hover:bg-accent hover:text-accent-foreground` |
| Ghost button | `hover:bg-accent hover:text-accent-foreground` |
| Link | `hover:text-primary` or `hover:underline underline-offset-4` |
| Card (clickable) | `hover:border-primary/50 transition-colors` |
| List item | `hover:bg-accent/50` |
| Table row | `hover:bg-muted/50` |
| Nav item | `hover:bg-accent hover:text-accent-foreground` |

### 4.2 Focus States (REQUIRED)
```tsx
// Standard focus ring
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2

// Primary focus (used in Button)
focus-visible:ring-2 focus-visible:ring-primary

// Input focus
focus:ring-2 focus:ring-ring focus:ring-offset-0
```

**BANNED:** `outline-none` or `focus:outline-none` without focus-visible replacement

### 4.3 Active States
```tsx
// Tabs
data-[state=active]:bg-primary data-[state=active]:text-primary-foreground

// Nav links
aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground

// Buttons (optional)
active:scale-[0.98]
```

### 4.4 Disabled States
```tsx
disabled:pointer-events-none disabled:opacity-50
// or
disabled:cursor-not-allowed disabled:opacity-50
```

### 4.5 Selected States
```tsx
// Checkbox/radio
data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground

// List selection
aria-selected:bg-accent aria-selected:text-accent-foreground
```

### 4.6 Loading States
```tsx
// Button with loading prop
<Button loading>Submitting</Button>

// aria-busy for screen readers
aria-busy={isLoading}
```

---

## 5. BASE UI COMPONENTS

### 5.1 Core Components (`src/components/ui/`)

**LOCKED - DO NOT MODIFY** unless user explicitly approves.

| Component | File | Notes |
|-----------|------|-------|
| Button | button.tsx | Has `loading` prop, `asChild` support |
| Input | input.tsx | Override with `rounded-none` |
| Textarea | textarea.tsx | Override with `rounded-none` |
| Label | label.tsx | Add `font-mono text-xs` |
| Select | select.tsx | Override trigger/content |
| Checkbox | checkbox.tsx | Override with `rounded-none` |
| Switch | switch.tsx | Override with `rounded-none` |
| RadioGroup | radio-group.tsx | Override with `rounded-none` |
| Card | card.tsx | Override with `rounded-none` |
| Badge | badge.tsx | Override with `rounded-none` |
| Dialog | dialog.tsx | Override content |
| AlertDialog | alert-dialog.tsx | Override content |
| Sheet | sheet.tsx | Override content |
| Tabs | tabs.tsx | Override list/trigger, has `suppressHydrationWarning` |
| Accordion | accordion.tsx | Override items, has `suppressHydrationWarning` |
| Tooltip | tooltip.tsx | Override content |
| Popover | popover.tsx | Override content |
| DropdownMenu | dropdown-menu.tsx | Override content/items |
| Separator | separator.tsx | - |
| Avatar | avatar.tsx | Override with `rounded-none` |
| Skeleton | skeleton.tsx | Override with `rounded-none` |
| Table | table.tsx | - |
| Form | form.tsx | Has `data-slot` attributes |
| Toast/Toaster | toaster.tsx | Sonner-based |
| ScrollArea | scroll-area.tsx | - |
| Progress | progress.tsx | Override with `rounded-none` |
| Slider | slider.tsx | Override with `rounded-none` |
| Command | command.tsx | For command palette |
| Collapsible | collapsible.tsx | - |
| Breadcrumb | breadcrumb.tsx | - |

### 5.2 Layout Components
| Component | File | Use |
|-----------|------|-----|
| Container | container.tsx | Page-level wrapper |
| Section | section.tsx | Content sections |
| Grid | grid.tsx | Grid layouts |
| Stack | stack.tsx | Flex stack layouts |
| PageWrapper | page-wrapper.tsx | Full page wrapper |

### 5.3 Input Variants
| Component | File | Use |
|-----------|------|-----|
| InputPassword | input-password.tsx | Password with toggle |
| InputSearch | input-search.tsx | Search with icon |
| InputNumber | input-number.tsx | Numeric input |
| InputColor | input-color.tsx | Color picker input |
| InputOTP | input-otp.tsx | OTP/verification codes |
| InputGroup | input-group.tsx | Grouped inputs |

### 5.4 Date/Time Components
| Component | File | Use |
|-----------|------|-----|
| DatePicker | date-picker.tsx | Single date |
| DateRangePicker | date-range-picker.tsx | Date range |
| TimePicker | time-picker.tsx | Time selection |
| DatetimePicker | datetime-picker.tsx | Date + time |

### 5.5 File Upload Components
| Component | File | Use |
|-----------|------|-----|
| FileUpload | file-upload.tsx | Generic file upload |
| ImageDropzone | image-dropzone.tsx | Image-specific dropzone |
| ImageUploader | image-uploader.tsx | Full image uploader |
| Cropper | cropper.tsx | Image cropping |

### 5.6 Data Visualization
| Component | File | Use |
|-----------|------|-----|
| Gauge | gauge.tsx | Gauge/meter |
| DonutChart | donut-chart.tsx | Donut/pie chart |
| Sparkline | sparkline.tsx | Inline trends |
| PieChart | pie-chart.tsx | Pie chart |
| Heatmap | heatmap.tsx | Heat map |
| StatCard | stat-card.tsx | KPI cards |

### 5.7 Feedback Components
| Component | File | Use |
|-----------|------|-----|
| Loading | loading.tsx | Loading spinner |
| EmptyState | empty-state.tsx | Empty state pattern |
| FormError | form-error.tsx | Form error message |
| PasswordStrength | password-strength.tsx | Password meter |
| Rating | rating.tsx | Star rating |

### 5.8 Utility Components
| Component | File | Use |
|-----------|------|-----|
| CopyButton | copy-button.tsx | Copy to clipboard |
| Typography | typography.tsx | Text styles |
| Combobox | combobox.tsx | Searchable select |
| MultiSelect | multi-select.tsx | Multi-selection |
| ColorPicker | color-picker.tsx | Color selection |
| MarkdownViewer | markdown-viewer.tsx | MD rendering |
| RichTextEditor | rich-text-editor.tsx | WYSIWYG |
| Mermaid | mermaid.tsx | Diagrams |
| ActivityTimeline | activity-timeline.tsx | Event timeline |
| NotificationList | notification-list.tsx | Notification feed |

### 5.9 Violation Patterns

**SEARCH FOR:**
```tsx
// Native elements that should use base components
<button           // → <Button>
<input            // → <Input>
<textarea         // → <Textarea>
<select           // → <Select>
<label            // → <Label>

// Custom implementations
className="modal  // → <Dialog>
className="card   // → <Card>
className="tab    // → <Tabs>
className="badge  // → <Badge>
className="toast  // → Toast system
```

### 5.10 Component Documentation Pattern
```tsx
/**
 * ✅ FABRK COMPONENT
 * Brief description of the component.
 *
 * @example
 * ```tsx
 * <Component prop="value">Content</Component>
 * ```
 */
```

---

## 6. REACT PATTERNS

### 6.1 Server vs Client Components
```tsx
// Server Component (DEFAULT - no directive needed)
// ✅ Can: fetch data, access backend, use async/await
// ❌ Cannot: useState, useEffect, onClick, browser APIs
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component (needs "use client")
// ✅ Can: useState, useEffect, onClick, browser APIs
// ❌ Cannot: async component, direct DB access
"use client";
export function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState(...)}>Click</button>;
}
```

**When to use "use client":**
- Using hooks (useState, useEffect, useContext, etc.)
- Using event handlers (onClick, onChange, etc.)
- Using browser APIs (window, document, localStorage)
- Using third-party libs that need browser

**When NOT to use "use client":**
- Just rendering props
- Fetching data
- Accessing database/backend
- Rendering other server components

### 6.2 The `asChild` Pattern (Radix)
```tsx
// asChild passes props to child instead of rendering wrapper
<Button asChild>
  <Link href="/page">> GO_TO_PAGE</Link>
</Button>

// Renders: <a href="/page" class="...button styles...">
// NOT: <button><a href="/page">
```

### 6.3 `forwardRef` Pattern
```tsx
// Required when component needs to forward refs to DOM element
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("rounded-none font-mono text-xs", className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input"; // REQUIRED!
```

### 6.4 `suppressHydrationWarning`
```tsx
// Use when content differs between server and client (theme, timestamps, etc.)
<html suppressHydrationWarning>
<body suppressHydrationWarning>
<Tabs suppressHydrationWarning>
<Accordion suppressHydrationWarning>

// Also use for Radix components that have hydration issues
```

### 6.5 `data-slot` Attributes
Used for CSS targeting in globals.css:
```tsx
// In component
<button data-slot="button" className={...}>

// In globals.css
[data-slot="button"] { ... }
.terminal-preview [data-slot="button"] { border-radius: 0 !important; }
```

### 6.6 Custom Hooks Pattern
```tsx
// hooks/use-example.ts
import { useState, useEffect } from "react";

export function useExample(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Side effect
  }, [value]);

  return { value, setValue };
}
```

### 6.7 Context Pattern
```tsx
// contexts/example-context.tsx
"use client";
import { createContext, useContext, useState } from "react";

interface ExampleContextType {
  value: string;
  setValue: (v: string) => void;
}

const ExampleContext = createContext<ExampleContextType | undefined>(undefined);

export function ExampleProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState("");
  return (
    <ExampleContext.Provider value={{ value, setValue }}>
      {children}
    </ExampleContext.Provider>
  );
}

export function useExample() {
  const context = useContext(ExampleContext);
  if (!context) throw new Error("useExample must be used within ExampleProvider");
  return context;
}
```

### 6.7.1 Root Providers Pattern (`src/components/providers/`)
```tsx
// src/components/providers/index.tsx
"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: "!rounded-none border border-border font-mono text-xs",
          style: { borderRadius: 0 },
        }}
      />
    </SessionProvider>
  );
}

// Usage in app/layout.tsx
import { Providers } from "@/components/providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 6.8 Suspense & Lazy Loading
```tsx
import { Suspense, lazy } from "react";

// Dynamic import with lazy
const HeavyComponent = lazy(() => import("./heavy-component"));

// In component
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>

// Next.js dynamic import (preferred in Next.js)
import dynamic from "next/dynamic";

const DynamicChart = dynamic(() => import("@/components/ui/chart"), {
  loading: () => <Skeleton className="h-64 w-full rounded-none" />,
  ssr: false, // Disable SSR for browser-only components
});
```

### 6.9 useRef Pattern
```tsx
"use client";
import { useRef, useEffect } from "react";

export function ComponentWithRef() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Access DOM element
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <div ref={containerRef}>
      <Input ref={inputRef} className="rounded-none font-mono text-xs" />
    </div>
  );
}
```

### 6.10 Portal Pattern (Radix)
```tsx
// Dialogs, Sheets, Popovers use portals automatically via Radix
// Content renders at document.body level
<Dialog>
  <DialogTrigger asChild>
    <Button className="rounded-none font-mono text-xs">> OPEN</Button>
  </DialogTrigger>
  <DialogContent> {/* Portaled to body */}
    Content here
  </DialogContent>
</Dialog>

// For custom portals
import { createPortal } from "react-dom";

// Only in client components
{mounted && createPortal(<div>Portaled content</div>, document.body)}
```

### 6.11 Next.js Navigation Hooks
```tsx
"use client";
import { usePathname, useRouter, useSearchParams, useParams } from "next/navigation";

export function NavigationAwareComponent() {
  const pathname = usePathname();           // Current path: "/dashboard"
  const router = useRouter();               // Programmatic navigation
  const searchParams = useSearchParams();   // URL query params
  const params = useParams();               // Dynamic route params [id]

  // Navigate programmatically
  router.push("/new-page");
  router.replace("/new-page");
  router.back();
  router.refresh(); // Refresh current route

  // Read query params
  const query = searchParams.get("q");

  // Read dynamic params
  const { id } = params;
}
```

---

## 7. NEXT.JS PATTERNS

### 7.1 Route Structure
```
app/
├── page.tsx              # / (home)
├── layout.tsx            # Root layout
├── loading.tsx           # Loading UI
├── error.tsx             # Error UI
├── not-found.tsx         # 404 UI
├── (group)/              # Route group (no URL segment)
│   └── page.tsx
├── [id]/                 # Dynamic route
│   └── page.tsx
├── [...slug]/            # Catch-all route
│   └── page.tsx
├── [[...slug]]/          # Optional catch-all
│   └── page.tsx
└── api/                  # API routes
    └── route.ts
```

### 7.2 API Route Pattern
```tsx
// app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await fetchData();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate with Zod
    const validated = schema.parse(body);
    // Process...
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

### 7.3 Server Actions Pattern
```tsx
// In server component or separate file
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
});

export async function createItem(formData: FormData) {
  const validated = schema.parse({
    name: formData.get("name"),
  });

  await db.item.create({ data: validated });
  revalidatePath("/items");
}

// In client component
"use client";
import { createItem } from "./actions";

export function Form() {
  return (
    <form action={createItem}>
      <Input name="name" className="rounded-none font-mono text-xs" />
      <Button type="submit" className="rounded-none font-mono text-xs">
        > CREATE
      </Button>
    </form>
  );
}
```

### 7.4 Environment Variables
```tsx
// Use validated env from src/lib/env.ts
import { env } from "@/lib/env";

// Server-side only
const secret = env.server.DATABASE_URL;

// Client-side (must be NEXT_PUBLIC_)
const apiUrl = env.client.NEXT_PUBLIC_APP_URL;

// ❌ NEVER use process.env directly
const bad = process.env.SECRET; // No validation, could be undefined
```

### 7.5 Metadata Pattern
```tsx
// Static metadata
export const metadata: Metadata = {
  title: "Page Title - Site Name",
  description: "Description under 160 chars",
  openGraph: {
    title: "Page Title",
    description: "Description for social",
    images: ["/og-image.jpg"],
  },
};

// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const item = await getItem(params.id);
  return {
    title: `${item.name} - Site Name`,
    description: item.description,
  };
}
```

### 7.6 Config Pattern (`src/config.js`)
```js
const config = {
  app: {
    name: "App Name",
    url: env?.client?.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  features: {
    analytics: true,
    payments: true,
  },
};
export default config;
```

### 7.7 Authentication Patterns (NextAuth v5)

**Server-Side Auth Check:**
```tsx
// In Server Components or API routes
import { auth } from "@/lib/auth";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <div>Welcome, {session.user.name}</div>;
}
```

**Client-Side Auth (useSession):**
```tsx
"use client";
import { useSession } from "next-auth/react";

export function ProfileButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton />;
  if (!session) return <SignInButton />;

  return <span>{session.user.name}</span>;
}
```

**API Route Protection:**
```tsx
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check role
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ data: "..." });
}
```

**Type Extensions (`src/types/next-auth.d.ts`):**
```tsx
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: "USER" | "ADMIN" | "SUPER_ADMIN";
    tier?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN" | "SUPER_ADMIN";
      tier?: string | null;
    } & DefaultSession["user"];
  }
}
```

---

## 8. DATABASE & PRISMA

### 8.1 Prisma Client Pattern
```tsx
// src/lib/prisma.ts - Singleton pattern
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 8.2 Database Queries
```tsx
import { prisma } from "@/lib/prisma";

// In Server Components or API routes ONLY
const users = await prisma.user.findMany({
  where: { active: true },
  select: { id: true, name: true, email: true },
});

// ❌ NEVER in client components
// ❌ NEVER import prisma in "use client" files
```

### 8.3 Database Commands
```bash
npm run db:push     # Push schema changes
npm run db:studio   # Open Prisma Studio
npm run db:seed     # Seed test data
npm run db:reset    # Reset and reseed
```

### 8.4 Email Service (`src/lib/email.ts`)
```tsx
import {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  queueEmail,
} from "@/lib/email";

// Direct send (for auth flows)
await sendEmail(to, subject, html);
await sendWelcomeEmail("user@example.com", "John", "LICENSE-KEY");
await sendPasswordResetEmail("user@example.com", "reset-token");

// Queue for background sending (purchases, notifications)
await queueEmail({
  to: "user@example.com",
  subject: "Welcome",
  template: "welcome",
  data: { name: "John" },
});
```

**Email Configuration:**
- Resend API for production
- Console logging in development
- FROM_EMAIL from `env.server.EMAIL_FROM`

---

## 9. FORM VALIDATION

### 9.1 Zod + React Hook Form Pattern
```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("[ERROR]: Invalid email"),
  password: z.string().min(8, "[ERROR]: Password must be 8+ chars"),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: FormData) {
    // Submit logic
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono text-xs">[EMAIL]:</FormLabel>
              <FormControl>
                <Input {...field} className="rounded-none font-mono text-xs" />
              </FormControl>
              <FormMessage className="font-mono text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-none font-mono text-xs">
          > LOGIN
        </Button>
      </form>
    </Form>
  );
}
```

---

## 10. ICONS & ASSETS

### 10.1 Icon Library
- **ONLY:** `lucide-react`
- **ALSO:** `simple-icons` via SimpleIcon component (for brand icons)
- **BANNED:** Font Awesome, Heroicons, custom SVGs (except logos)

### 10.2 Icon Sizes
| Context | Classes |
|---------|---------|
| Inline with text-xs | `h-3 w-3` |
| Inline with text-sm | `h-4 w-4` |
| Button icon | `h-4 w-4` |
| Feature icon | `h-5 w-5` or `h-6 w-6` |
| Hero icon | `h-8 w-8` or `h-10 w-10` |

### 10.3 Icon Styling
```tsx
<Icon className="h-4 w-4" />
<Icon className="h-4 w-4 text-primary" />
<Icon className="h-4 w-4 text-muted-foreground" />

// In button
<Button className="rounded-none font-mono text-xs">
  <Icon className="mr-2 h-4 w-4" />
  > ACTION
</Button>

// Icon-only button (MUST have aria-label)
<Button variant="ghost" size="icon" className="rounded-none" aria-label="Close">
  <X className="h-4 w-4" />
</Button>
```

### 10.4 Images
```tsx
import Image from "next/image";

<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"  // REQUIRED
  width={800}
  height={600}
  className="rounded-none"
/>

// With fill
<div className="relative aspect-video">
  <Image
    src="/path/to/image.jpg"
    alt="Description"
    fill
    className="rounded-none object-cover"
  />
</div>
```

---

## 11. ANIMATIONS & TRANSITIONS

### 11.1 Simple Transitions
```tsx
transition-colors duration-200
transition-all duration-200
transition-transform duration-200
```

### 11.2 Framer Motion Patterns
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>

// Stagger children
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
```

### 11.3 Duration Scale
| Speed | Duration | Use |
|-------|----------|-----|
| Fast | `duration-150` | Hovers, focus |
| Normal | `duration-200` | Most transitions |
| Slow | `duration-300` | Page elements |
| **BANNED** | `duration-500`+ | Too slow |

### 11.4 Banned
- Bounce animations
- Elastic/spring with high bounce
- Infinite animations (except loading spinners)
- Animations without `prefers-reduced-motion` support

---

## 12. RESPONSIVE DESIGN

### 12.1 Breakpoints (Mobile-First)
```tsx
// Base (mobile) → sm (640px) → md (768px) → lg (1024px) → xl (1280px) → 2xl (1536px)

className="
  grid-cols-1      // Mobile: 1 column
  sm:grid-cols-2   // 640px+: 2 columns
  lg:grid-cols-3   // 1024px+: 3 columns
  xl:grid-cols-4   // 1280px+: 4 columns
"
```

### 12.2 Touch Targets
- Minimum 44x44px for mobile interactive elements
- Use `min-h-[44px] min-w-[44px]` if needed
- Adequate spacing between targets (`gap-2` minimum)

### 12.3 Common Patterns
| Pattern | Mobile | Desktop |
|---------|--------|---------|
| Navigation | Hamburger + Sheet | Horizontal nav |
| Sidebar | Hidden or Sheet | Fixed sidebar |
| Grid | 1 column | 2-4 columns |
| Stack | Vertical | Horizontal |
| Tables | Cards or scroll | Full table |
| Forms | Full width | Constrained width |

---

## 13. ACCESSIBILITY (WCAG 2.1 AA)

### 13.1 Keyboard Navigation
- [ ] All interactive elements reachable via Tab
- [ ] Logical focus order (left→right, top→bottom)
- [ ] Escape closes modals/dropdowns/sheets
- [ ] Enter/Space activates buttons and links
- [ ] Arrow keys navigate within components

### 13.2 Focus Visibility
- [ ] All focusable elements have visible focus indicator
- [ ] **BANNED:** `outline-none` without `focus-visible` replacement
- [ ] Focus rings have sufficient contrast

### 13.3 Screen Readers
```tsx
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

<div aria-busy="true" aria-live="polite">Loading...</div>

<Input aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" className="text-destructive">Invalid email</p>

<Input aria-required="true" />

<div aria-live="polite" aria-atomic="true">{message}</div>
```

### 13.4 Color & Contrast
- Text: 4.5:1 contrast ratio minimum
- Large text (18px+ bold, 24px+ normal): 3:1 minimum
- UI components: 3:1 minimum
- Don't use color alone to convey information

### 13.5 Forms
- [ ] All inputs have associated labels
- [ ] Required fields indicated (not just by color)
- [ ] Error messages descriptive and linked to inputs
- [ ] Autocomplete attributes where appropriate

### 13.6 Motion
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Or CSS
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 14. CODE QUALITY

### 14.1 Must NOT Contain
- [ ] `console.log` / `console.error` / `console.warn` (use `logger` instead)
- [ ] `// TODO` / `// FIXME` / `// HACK` comments
- [ ] `// @ts-ignore` without justification comment
- [ ] `// @ts-expect-error` without justification comment
- [ ] `// eslint-disable` without justification comment
- [ ] Commented-out code blocks (>2 lines)
- [ ] Unused imports (run `npm run lint`)
- [ ] Unused variables
- [ ] Unused function parameters (use `_param` if intentional)
- [ ] `any` type without explicit justification
- [ ] Empty functions without comment explaining why
- [ ] Duplicate component definitions
- [ ] Magic numbers without constants

**Logger Pattern (Use Instead of console):**
```tsx
import { logger } from "@/lib/logger";

// ✅ GOOD - Use logger
logger.info("User logged in", { userId: "123" });
logger.warn("Rate limit approaching", { remaining: 10 });
logger.error("API request failed", error);
logger.debug("Debug info"); // Only logs in development

// ❌ BAD - Raw console (except in logger.ts itself)
console.log("User logged in");
console.error("Error:", error);
```

**Allowed Exceptions:**
- `src/lib/logger.ts` - Logger implementation itself
- `src/app/error.tsx` - Error boundary logging

### 14.2 Import Rules
```tsx
// ✅ GOOD
import { Button } from "@/components/ui/button";

// ❌ BAD - relative imports for shared
import { Button } from "../../components/ui/button";

// ❌ BAD - namespace import when not needed
import * as React from "react";

// ✅ GOOD - only what's used
import { useState, useEffect } from "react";
```

### 14.3 TypeScript
- Strict mode enabled
- No implicit any
- Props interfaces for all components
- Return types on complex functions
- Proper event typing (`React.MouseEvent<HTMLButtonElement>`)

**Props Type Patterns:**
```tsx
// Named interface (preferred for components)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
  size?: "default" | "sm" | "lg";
}

// With CVA VariantProps
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// Extending Radix props
export type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

// Type alias for simple props
type LoadingProps = { size?: "sm" | "default" | "lg" };

// Export type for external use
export type { ButtonProps };
```

### 14.4 Performance
- [ ] Use `next/image` for all images
- [ ] Use `next/link` for internal links
- [ ] Lazy load below-fold content (`dynamic()` or intersection observer)
- [ ] No inline object/array creation in JSX props (memoize or extract)
- [ ] `useMemo` for expensive computations
- [ ] `useCallback` for functions passed to children

### 14.5 Error Boundaries
Every route should have error handling:
- `error.tsx` for route-level errors
- `global-error.tsx` for root-level errors
- `ErrorBoundary` component for component-level

---

## 15. SEO & METADATA

### 15.1 Page Metadata
```tsx
export const metadata: Metadata = {
  title: "Page Title - Site Name",
  description: "Clear, compelling description under 160 chars",
  openGraph: {
    title: "Page Title",
    description: "Description for social sharing",
    images: ["/og-image.jpg"],
  },
};
```

### 15.2 Semantic HTML
- [ ] One `<h1>` per page
- [ ] Logical heading hierarchy (h1 → h2 → h3, no skips)
- [ ] `<main>` for primary content
- [ ] `<nav>` for navigation
- [ ] `<article>` for self-contained content
- [ ] `<section>` for thematic groupings
- [ ] `<footer>` for footer content

### 15.3 Required Files
- [ ] `/app/sitemap.ts` or `sitemap.xml`
- [ ] `/app/robots.ts` or `robots.txt`
- [ ] `/public/favicon.ico`
- [ ] `/app/manifest.ts` or `manifest.json` (PWA)
- [ ] `/public/og-image.jpg` (Open Graph default)

### 15.4 Metadata Utilities (`src/lib/metadata.ts`)
```tsx
import { siteConfig, defaultMetadata, generateMetadata } from "@/lib/metadata";

// Use siteConfig for consistent site info
const { name, description, url } = siteConfig;

// Use defaultMetadata for root layout
export const metadata = defaultMetadata;

// Generate page-specific metadata
export const metadata = generateMetadata({
  title: "Page Title",
  description: "Page description",
  path: "/page-path",
});
```

---

## 16. SECURITY

### 16.1 Check For
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] No API keys or secrets in client code
- [ ] No `eval()` or `new Function()`
- [ ] No direct SQL/database access in client components
- [ ] Environment variables properly prefixed (`NEXT_PUBLIC_` only for client)

### 16.2 Forms
- [ ] CSRF protection (Next.js handles for Server Actions)
- [ ] Input validation (client AND server)
- [ ] Rate limiting on API routes

### 16.3 CSP & Headers
- NonceScript component for inline scripts
- Security headers in middleware/next.config

### 16.4 Middleware Pattern (`src/middleware.ts`)
```tsx
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateNonce, getNonceHeaderName } from '@/lib/security/csp-nonce';

export function middleware(req: NextRequest) {
  // Generate CSP nonce
  const nonce = generateNonce();
  const response = NextResponse.next();

  // Inject nonce for server components
  response.headers.set(getNonceHeaderName(), nonce);

  // CSRF token management
  const existingCsrfToken = req.cookies.get('csrf_token')?.value;
  if (!existingCsrfToken) {
    // Generate and set CSRF token cookie
    response.cookies.set('csrf_token', generateToken(), {
      httpOnly: false, // Must be readable by JS for fetch headers
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_static|.*\\..*|favicon.ico).*)'],
};
```

### 16.5 NonceScript Component
```tsx
// For inline scripts with CSP nonce
import { NonceScript } from "@/components/security/nonce-script";

// ✅ GOOD - Script with nonce
<NonceScript type="application/ld+json">
  {JSON.stringify(schemaData)}
</NonceScript>

// ❌ BAD - Raw inline script (blocked by CSP)
<script dangerouslySetInnerHTML={{ __html: ... }} />
```

### 16.6 Security Library (`src/lib/security/`)
| File | Purpose |
|------|---------|
| `csp-nonce.ts` | CSP nonce generation |
| `csrf.ts` | CSRF token validation |
| `rate-limit.ts` | Rate limiting utilities |
| `validation.ts` | Input sanitization |
| `headers.ts` | Security header config |
| `bot-protection.ts` | Bot detection |
| `gdpr.ts` | GDPR compliance helpers |
| `audit-log.ts` | Security event logging |

### 16.7 CSRF Token Usage (Client-Side)
```tsx
"use client";
import { useCsrfToken, useCsrfFetch } from "@/hooks/use-csrf-token";

// Option 1: Manual header
const csrfToken = useCsrfToken();
fetch("/api/endpoint", {
  method: "POST",
  headers: {
    "x-csrf-token": csrfToken || "",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

// Option 2: Auto-injected fetch wrapper (preferred)
const fetchWithCsrf = useCsrfFetch();
fetchWithCsrf("/api/endpoint", {
  method: "POST",
  body: JSON.stringify(data),
});
```

### 16.8 Cache Utility (`src/lib/cache.ts`)
```tsx
import { cache } from "@/lib/cache";

// Set with TTL (seconds)
await cache.set("user:123", userData, 3600); // 1 hour

// Get (returns null if expired)
const user = await cache.get<User>("user:123");

// Delete
await cache.delete("user:123");

// Clear all
await cache.clear();
```

### 16.9 API Response Utilities (`src/lib/api/response.ts`)
```tsx
import {
  successResponse,
  createdResponse,
  noContentResponse,
  errorResponse,
  validationError,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
  rateLimitResponse,
} from "@/lib/api/response";

// Success responses
return successResponse(data);                    // 200
return createdResponse(data);                    // 201
return noContentResponse();                      // 204

// Error responses
return errorResponse("Something went wrong");    // 500
return validationError("Invalid input");         // 400
return notFoundResponse("User not found");       // 404
return unauthorizedResponse("Not logged in");    // 401
return forbiddenResponse("No permission");       // 403
return rateLimitResponse("Too many requests");   // 429
```

### 16.10 API Error Classes (`src/lib/api/error-handler.ts`)
```tsx
import {
  ApiError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  RateLimitError,
  withErrorHandler,
  handleError,
} from "@/lib/api/error-handler";

// Throw typed errors
throw new ValidationError("Email is required");
throw new NotFoundError("User not found");
throw new UnauthorizedError();
throw new ForbiddenError("Admin only");

// Wrap route handler with error handling
export const GET = withErrorHandler(async (req: NextRequest) => {
  // Handler logic - errors auto-converted to responses
  return successResponse(data);
});
```

### 16.11 Security Library Full Reference (`src/lib/security/`)

**Rate Limiting:**
```tsx
import {
  checkRateLimit,
  rateLimit,
  RateLimiters,
  getClientIdentifier,
  isWhitelisted,
  isBlacklisted,
  calculateBackoff,
} from "@/lib/security";

// Check rate limit
const result = await checkRateLimit(req, RateLimiters.API_GENERAL);
if (!result.success) {
  return rateLimitResponse("Too many requests");
}
```

**Input Validation:**
```tsx
import {
  ValidationSchemas,
  sanitizeString,
  sanitizeHTML,
  validateEmail,
  validatePassword,
  detectSQLInjection,
  detectXSS,
  detectPathTraversal,
  validateFileUpload,
  sanitizeFilename,
} from "@/lib/security";

// Validate and sanitize
const clean = sanitizeString(input);
const isValid = validateEmail(email);
const isSafe = !detectXSS(input) && !detectSQLInjection(input);
```

**Bot Protection:**
```tsx
import {
  detectBot,
  shouldAllowBot,
  verifyHoneypot,
  verifyHCaptcha,
  verifyRecaptcha,
  verifyTurnstile,
} from "@/lib/security";

// Check for bots
const botResult = await detectBot(req);
if (botResult.isBot && !shouldAllowBot(botResult.type)) {
  return forbiddenResponse("Bot detected");
}
```

**Audit Logging:**
```tsx
import { logAuditEvent, queryAuditLogs, AuditLog } from "@/lib/security";

// Log security events
await logAuditEvent({
  type: "USER_LOGIN",
  userId: user.id,
  ipAddress: req.ip,
  details: { method: "password" },
});
```

**GDPR Compliance:**
```tsx
import {
  exportUserData,
  deleteUserData,
  anonymizeUserData,
  recordConsent,
  hasConsent,
  revokeConsent,
  detectPII,
  redactPII,
} from "@/lib/security";

// GDPR data export
const userData = await exportUserData(userId);

// Check/record consent
await recordConsent(userId, "marketing_emails", true);
const hasMarketingConsent = await hasConsent(userId, "marketing_emails");
```

---

## 17. FEATURE FLAGS (`src/lib/feature-flags/`)

### 17.1 Feature Flag Usage
```tsx
import {
  isFeatureEnabled,
  getFeatureVariant,
  getFeatureValue,
  getEnabledFlags,
  FeatureFlags,
} from "@/lib/feature-flags";

// Check if feature is enabled
const showNewDashboard = isFeatureEnabled("new_dashboard", {
  userId: user.id,
  role: user.role,
  environment: process.env.NODE_ENV,
});

// Get A/B test variant
const variant = getFeatureVariant("onboarding_flow", { userId: user.id });

// Get all enabled flags
const enabledFlags = getEnabledFlags({ userId: user.id });
```

### 17.2 Feature Flag Types
```tsx
interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number;    // 0-100 percentage
  targetUsers?: string[];        // Specific user IDs
  targetRoles?: string[];        // User roles
  environments?: ("development" | "production" | "staging")[];
  variants?: Record<string, FeatureFlagValue>;  // A/B testing
  expiresAt?: Date;
}
```

### 17.3 Admin Functions
```tsx
import {
  updateFeatureFlag,
  enableFeature,
  disableFeature,
  setRolloutPercentage,
  getAllFlags,
  exportFlags,
  importFlags,
} from "@/lib/feature-flags";

// Toggle features
enableFeature("dark_mode");
disableFeature("beta_features");

// Gradual rollout
setRolloutPercentage("new_dashboard", 50); // 50% of users

// Export/import for backup
const flagsJson = exportFlags();
importFlags(flagsJson);
```

### 17.4 React Hook (`src/lib/feature-flags/hooks.ts`)
```tsx
"use client";
import { useFeatureFlag, useFeatureVariant } from "@/lib/feature-flags/hooks";

export function Component() {
  const showNewUI = useFeatureFlag("new_ui");
  const variant = useFeatureVariant("checkout_flow");

  if (!showNewUI) return <OldComponent />;
  return variant === "A" ? <VariantA /> : <VariantB />;
}
```

---

## 18. ANALYTICS (`src/lib/analytics/`)

### 18.1 Core Tracking
```tsx
import {
  initAnalytics,
  trackEvent,
  trackPageView,
  identifyUser,
  trackRevenue,
} from "@/lib/analytics";

// Initialize (in app init)
initAnalytics();

// Track events
trackEvent("button_click", { button: "signup", location: "hero" });
trackPageView("/pricing");
identifyUser(userId, { name, email, plan });
trackRevenue(amount, { orderId, product });
```

### 18.2 Funnel Tracking
```tsx
import {
  startFunnel,
  completeFunnelStep,
  abandonFunnel,
  trackFunnelStep,
  signupFunnel,
  checkoutFunnel,
  Funnels,
} from "@/lib/analytics";

// Pre-built funnels
await signupFunnel.start(userId);
await signupFunnel.complete("email_entered");
await signupFunnel.complete("password_set");
await signupFunnel.complete("profile_created");

// Custom funnel
startFunnel("onboarding", { userId });
completeFunnelStep("onboarding", "step1");
```

### 18.3 React Hooks
```tsx
"use client";
import {
  usePageTracking,
  useTrackClick,
  useTrackForm,
  useTrackFeature,
  useTrackError,
  useTrackEvent,
} from "@/lib/analytics";

export function Component() {
  // Auto page view tracking
  usePageTracking();

  // Track clicks
  const trackClick = useTrackClick("cta_button");

  // Track form submissions
  const { trackSubmit, trackError } = useTrackForm("contact_form");

  // Track feature usage
  useTrackFeature("dark_mode");

  return <button onClick={trackClick}>> SIGN_UP</button>;
}
```

### 18.4 Analytics Provider
```tsx
// In app/layout.tsx or providers
import { AnalyticsProvider } from "@/lib/analytics";

export function Providers({ children }) {
  return (
    <AnalyticsProvider>
      {children}
    </AnalyticsProvider>
  );
}
```

---

## 19. NOTIFICATIONS (`src/lib/notifications/`)

### 19.1 Notification Manager
```tsx
import {
  createNotification,
  showToast,
  notify,
  toast,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getNotifications,
  getUnreadCount,
  subscribeToNotifications,
} from "@/lib/notifications";

// Create persistent notification
await createNotification({
  type: "info",
  title: "New feature available",
  message: "Check out the new dashboard",
  userId: user.id,
  priority: "normal",
});

// Show toast (ephemeral)
showToast("Settings saved", { type: "success" });

// Mark as read
await markAsRead(notificationId);
await markAllAsRead(userId);

// Get notifications
const unread = await getUnreadCount(userId);
const notifications = await getNotifications(userId, { limit: 10 });
```

### 19.2 Notification Types
```tsx
type NotificationType = "info" | "success" | "warning" | "error" | "system";
type NotificationPriority = "low" | "normal" | "high" | "urgent";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  userId: string;
  priority: NotificationPriority;
  read: boolean;
  createdAt: Date;
  expiresAt?: Date;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}
```

### 19.3 React Hooks
```tsx
"use client";
import { useNotifications, useToast, useNotify } from "@/lib/notifications";

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, refresh } = useNotifications();
  const { toast: showToast } = useToast();
  const notify = useNotify();

  // Show inline notification
  notify("Update available", { type: "info" });

  return (
    <Badge>{unreadCount}</Badge>
  );
}
```

---

## 20. MONITORING (`src/lib/monitoring/`)

### 20.1 Error Tracking
```tsx
import {
  initErrorTracking,
  captureError,
  captureWarning,
  captureInfo,
  setUserContext,
  clearUserContext,
  getErrorStats,
} from "@/lib/monitoring";

// Initialize (in app init)
initErrorTracking();

// Capture errors
try {
  await riskyOperation();
} catch (error) {
  captureError(error, { context: "payment_processing" });
}

// Set user context for error reports
setUserContext({ id: user.id, email: user.email });
```

### 20.2 Performance Monitoring
```tsx
import {
  measureAsync,
  measure,
  PerformanceMarker,
  trackWebVitals,
  trackAPIPerformance,
  trackQueryPerformance,
  usePerformanceTracker,
} from "@/lib/monitoring";

// Measure async operation
const result = await measureAsync("api_call", async () => {
  return await fetch("/api/data");
});

// Measure sync operation
const data = measure("data_transform", () => {
  return transformData(raw);
});

// Track API performance
trackAPIPerformance("/api/users", 234, "GET", 200);

// React hook for component performance
const { startMeasure, endMeasure } = usePerformanceTracker("MyComponent");
```

---

## 21. SEO LIBRARY (`src/lib/seo/`)

### 21.1 Structured Data (JSON-LD)
```tsx
import {
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";

// Generate FAQ schema
const faqSchema = generateFAQSchema([
  { question: "What is Fabrk?", answer: "A Next.js boilerplate..." },
]);

// Use with NonceScript
<NonceScript type="application/ld+json">
  {JSON.stringify(faqSchema)}
</NonceScript>
```

### 21.2 Content Optimization
```tsx
import {
  calculateReadingTime,
  countWords,
  calculateKeywordDensity,
  calculateReadabilityScore,
  analyzeContent,
  scoreContent,
  isFeaturedSnippetOptimized,
} from "@/lib/seo";

// Analyze content
const analysis = analyzeContent(articleText);
const score = scoreContent(articleText);
const readTime = calculateReadingTime(articleText);
const isSnippetReady = isFeaturedSnippetOptimized(articleText);
```

### 21.3 AI Optimization (GEO/AIEO)
```tsx
import {
  AI_CRAWLERS,
  isAICrawler,
  generateAIMetadata,
  generateCitableFormat,
  formatPeopleAlsoAsk,
  calculateAICitationScore,
} from "@/lib/seo";

// Check for AI crawlers
if (isAICrawler(userAgent)) {
  // Serve AI-optimized content
}

// Generate AI-friendly metadata
const aiMeta = generateAIMetadata({
  title: "Page Title",
  summary: "Concise summary for AI",
  keyFacts: ["Fact 1", "Fact 2"],
});
```

---

## 22. TEAMS & ORGANIZATIONS (`src/lib/teams/`)

### 22.1 Organization Types
```tsx
type OrgRole = "OWNER" | "ADMIN" | "MEMBER" | "GUEST";

interface Organization {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  createdAt: Date;
}

interface OrgMember {
  userId: string;
  orgId: string;
  role: OrgRole;
  joinedAt: Date;
}
```

### 22.2 Organization Management
```tsx
import {
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganization,
  getUserOrganizations,
} from "@/lib/teams/organizations";

// Create org
const org = await createOrganization({
  name: "My Company",
  ownerId: user.id,
});

// Get user's orgs
const orgs = await getUserOrganizations(userId);
```

### 22.3 Member Management
```tsx
import {
  addMember,
  removeMember,
  updateMemberRole,
  getMembers,
  getMember,
} from "@/lib/teams/members";

// Add member
await addMember(orgId, userId, "MEMBER");

// Update role
await updateMemberRole(orgId, userId, "ADMIN");

// Get all members
const members = await getMembers(orgId);
```

### 22.4 Invitations
```tsx
import {
  createInvite,
  acceptInvite,
  declineInvite,
  cancelInvite,
  getPendingInvites,
} from "@/lib/teams/invites";

// Send invite
const invite = await createInvite({
  orgId,
  email: "user@example.com",
  role: "MEMBER",
  invitedBy: currentUserId,
});

// Accept invite
await acceptInvite(inviteToken, userId);
```

---

## 23. WEBHOOKS (`src/lib/webhooks/`)

### 23.1 Webhook Events
```tsx
import {
  WebhookEvents,
  createWebhookEvent,
  dispatchWebhook,
  validateWebhookSignature,
} from "@/lib/webhooks";

// Available events
const events = [
  "user.created",
  "user.updated",
  "user.deleted",
  "subscription.created",
  "subscription.updated",
  "subscription.cancelled",
  "payment.succeeded",
  "payment.failed",
];

// Dispatch webhook
await dispatchWebhook("user.created", {
  userId: user.id,
  email: user.email,
});
```

### 23.2 Webhook Server
```tsx
import { registerWebhook, unregisterWebhook, listWebhooks } from "@/lib/webhooks/server";

// Register endpoint
await registerWebhook({
  url: "https://example.com/webhook",
  events: ["user.created", "payment.succeeded"],
  secret: generateSecret(),
});
```

### 23.3 Retry Worker
```tsx
import { retryFailedWebhooks, getFailedWebhooks } from "@/lib/webhooks/retry-worker";

// Get failed webhooks
const failed = await getFailedWebhooks();

// Retry failed webhooks
await retryFailedWebhooks();
```

---

## 24. UTILITIES (`src/lib/utils/`)

### 24.1 Format Utilities (`format.ts`)
```tsx
import {
  formatCurrency,
  formatNumber,
  formatRelativeTime,
  formatDate,
  formatDateTime,
  formatFileSize,
  formatPercentage,
  formatPhoneNumber,
} from "@/lib/utils/format";

formatCurrency(9999);           // "$99.99"
formatNumber(1234567);          // "1.2M"
formatRelativeTime(date);       // "2 hours ago"
formatDate(date);               // "Nov 6, 2025"
formatDateTime(date);           // "Nov 6, 2025, 10:30 AM"
formatFileSize(1536);           // "1.5 KB"
formatPercentage(0.1234);       // "12.34%"
formatPhoneNumber("5551234567"); // "(555) 123-4567"
```

### 24.2 String Utilities (`string.ts`)
```tsx
import {
  slugify,
  truncate,
  capitalize,
  titleCase,
  camelToKebab,
  kebabToCamel,
} from "@/lib/utils/string";
```

### 24.3 Array Utilities (`array.ts`)
```tsx
import {
  chunk,
  unique,
  groupBy,
  sortBy,
  shuffle,
} from "@/lib/utils/array";
```

### 24.4 Async Utilities (`async.ts`)
```tsx
import {
  sleep,
  retry,
  debounce,
  throttle,
  timeout,
} from "@/lib/utils/async";

// Retry with backoff
const result = await retry(
  () => fetchData(),
  { maxAttempts: 3, backoff: "exponential" }
);
```

### 24.5 Validation Utilities (`validation.ts`)
```tsx
import {
  isValidEmail,
  isValidUrl,
  isValidUUID,
  isValidPhone,
} from "@/lib/utils/validation";
```

---

## 25. HOOKS REFERENCE

### 25.1 Core Hooks (`src/hooks/`)
| Hook | File | Purpose |
|------|------|---------|
| `useToast` | `use-toast.ts` | Toast notifications (Sonner wrapper) |
| `useCheckout` | `use-checkout.ts` | Stripe checkout flow |
| `useCsrfToken` | `use-csrf-token.ts` | CSRF token access |
| `useCsrfFetch` | `use-csrf-token.ts` | Auto-CSRF fetch wrapper |

### 25.2 useCheckout Hook
```tsx
"use client";
import { useCheckout } from "@/hooks/use-checkout";

export function PricingCard({ priceId }) {
  const { createCheckoutSession, isLoading, error } = useCheckout();

  return (
    <Button
      onClick={() => createCheckoutSession(priceId)}
      loading={isLoading}
      loadingText="> PROCESSING..."
      className="rounded-none font-mono text-xs"
    >
      > SUBSCRIBE
    </Button>
  );
}
```

---

## 26. DESIGN SYSTEM CONSTANTS (`src/lib/design-system/constants.ts`)

Reference for standardized values:

```tsx
import {
  TYPOGRAPHY,
  SPACING,
  BUTTON_SIZES,
  PAGINATION,
  SCROLL,
  BREAKPOINTS,
  ACCESSIBILITY,
} from "@/lib/design-system/constants";

// Typography
TYPOGRAPHY.pageTitle.className      // "text-4xl font-semibold tracking-tight"
TYPOGRAPHY.sectionHeading.className // "text-2xl font-semibold"
TYPOGRAPHY.body.className           // "text-base"

// Spacing
SPACING.containerMaxWidth           // "max-w-6xl"
SPACING.gridGap                     // "gap-6"
SPACING.cardPadding                 // "p-6"

// Button sizes (WCAG compliant)
BUTTON_SIZES.icon.className         // "h-10 w-10"
BUTTON_SIZES.default.className      // "h-8 px-3 py-1.5"

// Scroll styling
SCROLL.containerClass               // Styled scrollbar classes

// Accessibility
ACCESSIBILITY.minTouchTarget        // "44x44px"
```

---

## 27. AI INTEGRATION (`src/lib/ai/`)

### 27.1 AI Providers
```tsx
import {
  chatWithOpenAI,
  chatWithClaude,
  chat,
  generateEmbeddings,
  moderateContent,
  generateImage,
  textToSpeech,
  speechToText,
  streamToString,
  estimateTokens,
} from "@/lib/ai";

// OpenAI Chat
const response = await chatWithOpenAI({
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello!" },
  ],
  model: "gpt-4",
  temperature: 0.7,
});

// Claude Chat
const claudeResponse = await chatWithClaude({
  messages: [{ role: "user", content: "Hello!" }],
  model: "claude-3-sonnet-20240229",
});

// Streaming
const stream = await chatWithOpenAI({
  messages: [{ role: "user", content: "Tell me a story" }],
  stream: true,
});
for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

### 27.2 AI Response Types
```tsx
interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  cost?: number;        // Calculated cost in dollars
  model: string;
  provider: "openai" | "anthropic";
}
```

### 27.3 Model Options
```tsx
type OpenAIModel = "gpt-4" | "gpt-4-turbo" | "gpt-3.5-turbo";
type AnthropicModel =
  | "claude-3-opus-20240229"
  | "claude-3-sonnet-20240229"
  | "claude-3-haiku-20240307";
```

### 27.4 Additional AI Features
```tsx
// Generate embeddings
const embeddings = await generateEmbeddings("Hello world");

// Content moderation
const modResult = await moderateContent("Some text to check");
if (modResult.flagged) {
  console.log("Content flagged:", modResult.categories);
}

// Image generation (DALL-E)
const imageUrls = await generateImage({
  prompt: "A sunset over mountains",
  model: "dall-e-3",
  size: "1024x1024",
});

// Text to speech
const audioBuffer = await textToSpeech({
  text: "Hello world",
  voice: "alloy",
});

// Speech to text (Whisper)
const transcription = await speechToText(audioFile);
```

---

## 28. BACKGROUND JOBS (`src/lib/jobs/`)

### 28.1 Job Queue System
```tsx
import {
  enqueueJob,
  getJobStatus,
  cancelJob,
  retryJob,
  getJobStats,
  cleanupOldJobs,
  startJobWorker,
  registerJobHandler,
} from "@/lib/jobs/queue";

// Enqueue a job
const jobId = await enqueueJob({
  type: "email.send",
  payload: {
    to: "user@example.com",
    subject: "Welcome!",
    html: "<h1>Hello</h1>",
  },
  priority: "high",
  maxAttempts: 5,
});

// Check job status
const status = await getJobStatus(jobId);
console.log(`Status: ${status?.status}, Attempts: ${status?.attempts}`);

// Cancel pending job
await cancelJob(jobId);

// Retry failed job
await retryJob(jobId);

// Get queue statistics
const stats = await getJobStats();
console.log(`Pending: ${stats.pending}, Failed: ${stats.failed}`);
```

### 28.2 Job Types
```tsx
type JobPriority = "low" | "normal" | "high" | "critical";

interface JobData<T = unknown> {
  type: string;
  payload: T;
  priority?: JobPriority;
  maxAttempts?: number;
  scheduledFor?: Date;
}
```

### 28.3 Registering Job Handlers
```tsx
import { registerJobHandler } from "@/lib/jobs/handlers";

// Register a handler for job type
registerJobHandler("email.send", async (payload) => {
  await sendEmail(payload.to, payload.subject, payload.html);
  return { success: true };
});

// Start worker
import { startJobWorker } from "@/lib/jobs/processor";
startJobWorker({ pollInterval: 1000 });
```

---

## 29. REAL-TIME (PUSHER) (`src/lib/pusher/`)

### 29.1 Client Hooks
```tsx
"use client";
import {
  useNotifications,
  useOrgActivity,
  usePresence,
  usePusherStatus,
} from "@/lib/pusher/client";

// Subscribe to user notifications
function NotificationListener() {
  useNotifications((notification) => {
    console.log("New notification:", notification.title);
  });
  return null;
}

// Subscribe to org activity feed
function ActivityFeed({ orgId }: { orgId: string }) {
  useOrgActivity(orgId, (activity) => {
    console.log("Activity:", activity.description);
  });
  return null;
}

// Track online presence
function OnlineMembers({ orgId }: { orgId: string }) {
  const { members, count } = usePresence(orgId);
  return <span>{count} online</span>;
}

// Connection status
function ConnectionStatus() {
  const status = usePusherStatus();
  return <Badge>{status}</Badge>;
}
```

### 29.2 Server-Side Pusher
```tsx
import { triggerEvent, triggerBatch } from "@/lib/pusher/server";

// Send notification to user
await triggerEvent(`private-user-${userId}`, "notification", {
  id: "notif_123",
  type: "info",
  title: "New message",
  message: "You have a new message",
});

// Broadcast to organization
await triggerEvent(`private-org-${orgId}`, "activity", {
  type: "member_joined",
  description: "John joined the team",
  userId: user.id,
  userName: user.name,
});
```

---

## 30. API KEYS (`src/lib/api-keys/`)

### 30.1 Key Generation
```tsx
import { generateApiKey, isValidApiKeyFormat } from "@/lib/api-keys/generator";

// Generate new API key
const { key, prefix, hash } = generateApiKey("live");
// key: "sk_live_abc123..." (full key, show once)
// prefix: "sk_live_abc1" (for display)
// hash: "sha256..." (store in database)

// Validate key format
const isValid = isValidApiKeyFormat("sk_live_abc123...");
```

### 30.2 Key Hashing
```tsx
import { hashApiKey, verifyApiKey } from "@/lib/api-keys/hasher";

// Hash key for storage (never store raw keys!)
const hash = hashApiKey(rawKey);

// Verify key against hash
const isMatch = verifyApiKey(providedKey, storedHash);
```

### 30.3 Key Authentication Middleware
```tsx
import { withApiKeyAuth } from "@/lib/api-keys/auth";

// Protect API route with API key
export const GET = withApiKeyAuth(async (req, apiKey) => {
  // apiKey contains validated key info
  return NextResponse.json({ data: "protected" });
});
```

---

## 31. MFA (MULTI-FACTOR AUTH) (`src/lib/auth/mfa.ts`)

### 31.1 TOTP Setup
```tsx
import {
  enableMFA,
  verifyMFADevice,
  verifyMFAToken,
  disableMFA,
  hasMFAEnabled,
} from "@/lib/auth/mfa";

// Enable MFA for user
const { secret, qrCodeUri, backupCodes } = await enableMFA(userId, userEmail);
// Display QR code using qrCodeUri
// Show backup codes once (user must save them)

// Verify initial setup (user enters code from authenticator)
const verified = await verifyMFADevice(userId, userEmail, "123456");

// Verify during login
const isValid = await verifyMFAToken(userId, userEmail, "123456", ipAddress);

// Check if user has MFA enabled
const hasMFA = await hasMFAEnabled(userId);

// Disable MFA
await disableMFA(userId, userEmail);
```

### 31.2 Backup Codes
```tsx
import {
  verifyBackupCodeForUser,
  getBackupCodeStats,
  regenerateBackupCodes,
} from "@/lib/auth/mfa";

// Verify backup code (marks as used)
const valid = await verifyBackupCodeForUser(userId, userEmail, "XXXX-XXXX");

// Get remaining backup codes
const stats = await getBackupCodeStats(userId);
console.log(`${stats.remaining}/${stats.total} codes remaining`);

// Regenerate all backup codes
const newCodes = await regenerateBackupCodes(userId, userEmail);
```

---

## 32. FILE UPLOADS (`src/lib/uploads/`)

### 32.1 Upload Validation
```tsx
import {
  validateUpload,
  validateMultipleUploads,
  detectExecutable,
  detectFileType,
  sanitizeFilename,
  FILE_TYPE_CONFIGS,
} from "@/lib/uploads/validation";

// Validate single file
const result = await validateUpload(file, {
  allowedTypes: FILE_TYPE_CONFIGS.image,
  maxSize: 5 * 1024 * 1024, // 5MB
});

if (!result.valid) {
  console.error(result.error);
}

// Validate multiple files
const multiResult = await validateMultipleUploads(files, {
  allowedTypes: FILE_TYPE_CONFIGS.document,
  maxFiles: 10,
});

// Detect file type from buffer (magic bytes)
const detectedType = detectFileType(buffer);

// Sanitize filename (prevent path traversal)
const safeName = sanitizeFilename(unsafeFilename);
```

### 32.2 File Type Configs
```tsx
const FILE_TYPE_CONFIGS = {
  image: {
    mimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    extensions: ["jpg", "jpeg", "png", "gif", "webp"],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  avatar: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    extensions: ["jpg", "jpeg", "png", "webp"],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  document: {
    mimeTypes: ["application/pdf", "application/vnd.openxmlformats-*"],
    extensions: ["pdf", "docx", "xlsx", "txt"],
    maxSize: 25 * 1024 * 1024, // 25MB
  },
  video: {
    mimeTypes: ["video/mp4", "video/webm"],
    extensions: ["mp4", "webm"],
    maxSize: 100 * 1024 * 1024, // 100MB
  },
};
```

### 32.3 Image Dimension Validation
```tsx
import { validateImageDimensions } from "@/lib/uploads/validation";

const dimResult = await validateImageDimensions(buffer, {
  minWidth: 200,
  minHeight: 200,
  maxWidth: 4096,
  maxHeight: 4096,
});
```

---

## 33. USER FEEDBACK (`src/lib/feedback/`)

### 33.1 Feedback System
```tsx
import {
  analyzeSentiment,
  categorizeFeedback,
  extractTags,
  prioritizeFeedback,
  groupFeedbackByCategory,
  getFeedbackStats,
  generateFeedbackReport,
} from "@/lib/feedback";

// Analyze sentiment
const sentiment = analyzeSentiment("This app is amazing!");
// Returns: "positive" | "neutral" | "negative"

// Auto-categorize feedback
const category = categorizeFeedback("The dashboard is slow to load");
// Returns: "performance"

// Extract feature request tags
const tags = extractTags("I want dark mode and mobile app support");
// Returns: ["dark-mode", "mobile-app"]

// Get feedback statistics
const stats = getFeedbackStats(feedbackList);
console.log(`Average rating: ${stats.avgRating}`);
console.log(`Sentiment breakdown:`, stats.sentimentBreakdown);
```

### 33.2 NPS (Net Promoter Score)
```tsx
import {
  calculateNPS,
  categorizeNPSResponse,
  getNPSStats,
} from "@/lib/feedback/nps";

// Calculate NPS score (-100 to 100)
const npsScore = calculateNPS(responses);

// Categorize individual response
const category = categorizeNPSResponse(8);
// Returns: "promoter" (9-10), "passive" (7-8), "detractor" (0-6)

// Get NPS statistics
const npsStats = getNPSStats(responses);
```

---

## 34. TIER CONFIGURATION (`src/lib/features/`)

### 34.1 Tier System
```tsx
import { TIER_NAMES, TIER_BADGES } from "@/lib/features/tier-config";

// Tier display names
TIER_NAMES.free          // "Free"
TIER_NAMES.trial         // "Trial"
TIER_NAMES.starter       // "Starter"
TIER_NAMES.professional  // "Professional"
TIER_NAMES.enterprise    // "Enterprise"

// Badge variants for each tier
TIER_BADGES.free         // "neutral"
TIER_BADGES.trial        // "accent"
TIER_BADGES.professional // "default"
```

### 34.2 Access Control
```tsx
import { checkFeatureAccess, TIER_LIMITS } from "@/lib/features/access-control";

// Check if user can access feature
const canAccess = checkFeatureAccess(user.tier, "advanced_analytics");

// Get tier limits
const limits = TIER_LIMITS[user.tier];
console.log(`Max projects: ${limits.maxProjects}`);
console.log(`Max team members: ${limits.maxTeamMembers}`);
```

---

## 35. SEARCH (ALGOLIA) (`src/lib/algolia/`)

### 35.1 Algolia Client
```tsx
import { searchClient, searchIndex, indexContent } from "@/lib/algolia/client";

// Search content
const results = await searchIndex.search("query", {
  hitsPerPage: 10,
  filters: "type:docs",
});

// Index new content
await indexContent({
  objectID: "doc_123",
  title: "Getting Started",
  content: "Learn how to...",
  type: "docs",
});
```

---

## 36. SANITY CMS (`src/lib/sanity/`)

### 36.1 Sanity Client
```tsx
import { sanityClient, getDocBySlug, getAllDocs } from "@/lib/sanity/client";

// Fetch single document
const doc = await getDocBySlug("getting-started");

// Fetch all documents
const docs = await getAllDocs();

// Custom query
const result = await sanityClient.fetch(`*[_type == "post"]`);
```

---

## 37. COMPLETE COMPONENT CATALOG

### 37.1 UI Components (106 total - `src/components/ui/`)

**Core Form Components:**
| Component | File | Terminal Styling Required |
|-----------|------|---------------------------|
| Button | `button.tsx` | `rounded-none font-mono text-xs` |
| Input | `input.tsx` | `rounded-none font-mono text-xs` |
| Textarea | `textarea.tsx` | `rounded-none font-mono text-xs` |
| Select | `select.tsx` | `rounded-none font-mono text-xs` |
| Checkbox | `checkbox.tsx` | `rounded-none` |
| Switch | `switch.tsx` | `rounded-none` |
| Radio Group | `radio-group.tsx` | `rounded-none` |
| Slider | `slider.tsx` | `rounded-none` |
| Label | `label.tsx` | `font-mono text-xs` |
| Form | `form.tsx` | Uses FormField pattern |
| Form Error | `form-error.tsx` | `font-mono text-xs text-destructive` |
| Field | `field.tsx` | Wrapper for form fields |

**Input Variants:**
| Component | File | Purpose |
|-----------|------|---------|
| Input Password | `input-password.tsx` | Password with toggle visibility |
| Input Number | `input-number.tsx` | Numeric input with +/- buttons |
| Input Search | `input-search.tsx` | Search input with icon |
| Input Color | `input-color.tsx` | Color picker input |
| Input OTP | `input-otp.tsx` | One-time password input |
| Input Group | `input-group.tsx` | Input with addons |
| Autocomplete | `autocomplete.tsx` | Search with suggestions |
| Combobox | `combobox.tsx` | Searchable select |
| Multi Select | `multi-select.tsx` | Multiple selection |

**Date/Time Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Calendar | `calendar.tsx` | Date selection calendar |
| Date Picker | `date-picker.tsx` | Single date picker |
| Date Range Picker | `date-range-picker.tsx` | Date range selection |
| Time Picker | `time-picker.tsx` | Time selection |
| DateTime Picker | `datetime-picker.tsx` | Combined date & time |

**Layout Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Card | `card.tsx` | Content container - `rounded-none` |
| Container | `container.tsx` | Page width container |
| Section | `section.tsx` | Page section wrapper |
| Grid | `grid.tsx` | CSS Grid wrapper |
| Stack | `stack.tsx` | Flex stack layout |
| Separator | `separator.tsx` | Visual divider |
| Aspect Ratio | `aspect-ratio.tsx` | Fixed aspect container |
| Page Wrapper | `page-wrapper.tsx` | Full page layout |
| Scroll Area | `scroll-area.tsx` | Custom scrollbar area |

**Navigation Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Tabs | `tabs.tsx` | Tab navigation |
| Accordion | `accordion.tsx` | Expandable sections |
| Breadcrumb | `breadcrumb.tsx` | Path navigation |
| Navigation Menu | `navigation-menu.tsx` | Main navigation |
| Dropdown Menu | `dropdown-menu.tsx` | Action dropdown |
| Context Menu | `context-menu.tsx` | Right-click menu |
| Menubar | `menubar.tsx` | Horizontal menu bar |
| Sidebar | `sidebar.tsx` | Side navigation |
| Pagination | `pagination.tsx` | Page navigation |
| Collapsible | `collapsible.tsx` | Collapsible content |

**Feedback Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Alert | `alert.tsx` | Status messages |
| Alert Dialog | `alert-dialog.tsx` | Confirmation dialogs |
| Banner | `banner.tsx` | Full-width notifications |
| Toast | `toast.tsx` | Ephemeral notifications |
| Toaster | `toaster.tsx` | Toast container (Sonner) |
| Badge | `badge.tsx` | Status/count indicators |
| Progress | `progress.tsx` | Progress bar |
| Skeleton | `skeleton.tsx` | Loading placeholders |
| Loading | `loading.tsx` | Loading spinner |
| Empty State | `empty-state.tsx` | No data placeholder |

**Overlay Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Dialog | `dialog.tsx` | Modal dialogs |
| Sheet | `sheet.tsx` | Side panel |
| Popover | `popover.tsx` | Floating content |
| Tooltip | `tooltip.tsx` | Hover hints |
| Hover Card | `hover-card.tsx` | Preview on hover |
| Command | `command.tsx` | Command palette (⌘K) |
| Lightbox | `lightbox.tsx` | Image gallery viewer |

**Data Display Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Table | `table.tsx` | Data table |
| Data Table | `data-table/` | Full-featured table (TanStack) |
| Data Table Header | `data-table-header.tsx` | Table column header |
| Avatar | `avatar.tsx` | User avatar |
| Avatar Group | `avatar-group.tsx` | Stacked avatars |
| Member Card | `member-card.tsx` | Team member display |
| KPI Card | `kpi-card.tsx` | Metric display with trend |
| Stat Card | `stat-card.tsx` | Alias for KPI Card |
| Status Indicator | `status-indicator.tsx` | Online/offline/busy status |
| Notification Badge | `notification-badge.tsx` | Count badge |
| Notification List | `notification-list.tsx` | Notification items |
| Notification Center | `notification-center.tsx` | Full notification panel |

**Chart Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Gauge | `gauge.tsx` | Circular gauge chart |
| Donut Chart | `donut-chart.tsx` | Donut/pie chart |
| Pie Chart | `pie-chart.tsx` | Pie chart |
| Sparkline | `sparkline.tsx` | Inline mini chart |
| Funnel Chart | `funnel-chart.tsx` | Funnel visualization |
| Heatmap | `heatmap.tsx` | Heat map grid |

**Content Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Typography | `typography.tsx` | Text components (H1-H4, P, etc.) |
| Code Block | `code-block.tsx` | Syntax highlighted code |
| Markdown Viewer | `markdown-viewer.tsx` | Render markdown |
| Markdown Editor | `markdown-editor.tsx` | Edit markdown |
| Rich Text Editor | `rich-text-editor.tsx` | WYSIWYG editor |
| Mermaid | `mermaid.tsx` | Mermaid diagram renderer |
| Activity Timeline | `activity-timeline.tsx` | Event timeline |

**Media Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Image Uploader | `image-uploader.tsx` | Image upload |
| Image Dropzone | `image-dropzone.tsx` | Drag & drop images |
| File Upload | `file-upload.tsx` | General file upload |
| Cropper | `cropper.tsx` | Image cropping |
| Cropper Controls | `cropper-controls.tsx` | Cropping controls |

**Utility Components:**
| Component | File | Purpose |
|-----------|------|---------|
| Copy Button | `copy-button.tsx` | Copy to clipboard |
| Color Picker | `color-picker.tsx` | Color selection |
| Rating | `rating.tsx` | Star rating input |
| Password Strength | `password-strength.tsx` | Password meter |
| Role Selector | `role-selector.tsx` | Role/permission picker |
| Invite Form | `invite-form.tsx` | User invitation form |
| Multi Step Form | `multi-step-form.tsx` | Wizard-style form |
| Prompt Builder | `prompt-builder.tsx` | AI prompt builder |
| Code Generator | `code-generator.tsx` | Code generation UI |
| Simple Icon | `simple-icon.tsx` | Icon wrapper |

### 37.2 Feature Components (108 total)

**Auth Components (`src/components/auth/`):**
- `password-strength.tsx` - Password validation meter
- `reset-status.tsx` - Password reset status
- `signup-success.tsx` - Registration success

**Account Components (`src/components/account/`):**
- `profile-form.tsx` - User profile editing
- `security-form.tsx` - Password/2FA settings
- `billing-section.tsx` - Billing management
- `sessions-section.tsx` - Active sessions
- `api-keys-section.tsx` - API key management

**Admin Components (`src/components/admin/`):**
- `user-management-table.tsx` - User admin table
- `feature-flags-manager.tsx` - Feature flag admin

**Analytics Components (`src/components/analytics/`):**
- `posthog-pageview.tsx` - Page view tracking
- `purchase-tracker.tsx` - Purchase event tracking

**Billing Components (`src/components/billing/`):**
- `trial-banner.tsx` - Trial status banner

**Dashboard Components (`src/components/dashboard/`):**
- `purchase-status.tsx` - Purchase status display
- `tier-badge.tsx` - Subscription tier badge
- `usage-limits.tsx` - Usage meter/limits
- `purchase-status/license-card.tsx` - License display
- `purchase-status/access-card.tsx` - Access info
- `purchase-status/resources-card.tsx` - Resources list

**Feature Flags (`src/components/feature-flags/`):**
- `feature-gate.tsx` - Conditional feature wrapper

**Feedback Components (`src/components/feedback/`):**
- Feedback collection forms

**Landing Components (`src/components/landing/`):**
- `terminal-background.tsx` - Animated background
- Hero sections, feature sections, etc.

**Navigation Components (`src/components/navigation/`):**
- Header, footer, mobile menu

**Notifications (`src/components/notifications/`):**
- Notification bell, dropdown

**Organization Components (`src/components/organization/`):**
- Team management, member lists, invites

**Pricing Components (`src/components/pricing/`):**
- `checkout-button.tsx` - Purchase button

**Providers (`src/components/providers/`):**
- `analytics-provider.tsx` - Analytics context
- Root providers wrapper

**Security Components (`src/components/security/`):**
- `nonce-script.tsx` - CSP nonce scripts
- `client-schema-script.tsx` - Client-side JSON-LD
- `schema-script.tsx` - Server-side JSON-LD

**SEO Components (`src/components/seo/`):**
- Schema markup components

**Settings Components (`src/components/settings/`):**
- `language-form.tsx` - Language preferences
- `privacy-form.tsx` - Privacy/cookie settings
- `notifications-form.tsx` - Notification preferences
- `appearance-form.tsx` - Theme/appearance settings
- `data-export.tsx` - GDPR data export
- `danger-zone.tsx` - Account deletion

**Theme Components (`src/components/theme/`):**
- `color-theme-switcher.tsx` - Theme toggle

### 37.3 Component Patterns Checklist

**Every UI Component MUST have:**
```tsx
// 1. Terminal styling (where applicable)
className="rounded-none font-mono text-xs"

// 2. data-slot attribute for CSS targeting
data-slot="button"

// 3. cn() for class merging
className={cn("base-classes", className)}

// 4. forwardRef for ref forwarding
const Component = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

// 5. displayName for debugging
Component.displayName = "Component";

// 6. Proper TypeScript interface
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}
```

**Terminal Label Format:**
```tsx
// Cards, sections, forms use bracket notation
<CardTitle className="font-mono text-xs">[SECTION_NAME]:</CardTitle>
<h3 className="font-mono text-xs">[LABEL_NAME]:</h3>

// Buttons use > PREFIX format
<Button className="rounded-none font-mono text-xs">> ACTION_NAME</Button>
```

### 37.4 Component Directory Structure
```
src/components/
├── ui/                    # 106 base UI components (LOCKED)
│   ├── data-table/        # Data table subcomponents
│   └── file-upload/       # File upload subcomponents
├── account/               # Account/profile components
├── activity/              # Activity feeds
├── admin/                 # Admin panel components
├── analytics/             # Analytics tracking
├── auth/                  # Authentication flows
├── billing/               # Billing/subscription
├── dashboard/             # Dashboard widgets
├── demo/                  # Demo/showcase components
├── developer/             # Developer tools
├── docs/                  # Documentation layout
├── feature-flags/         # Feature gating
├── feedback/              # User feedback
├── home/                  # Homepage sections
├── landing/               # Landing page sections
├── marketing/             # Marketing components
├── navigation/            # Nav/header/footer
├── notifications/         # Notification UI
├── organization/          # Team/org management
├── polar/                 # Polar.sh integration
├── pricing/               # Pricing tables
├── providers/             # React context providers
├── security/              # Security components
├── seo/                   # SEO/schema components
├── settings/              # Settings forms
├── showcase/              # Component showcase
└── theme/                 # Theme switcher
```

---

## 38. CSS ARCHITECTURE

### 38.1 Tailwind v4 Structure
```css
/* globals.css structure */
@import "tailwindcss";
@import "tw-animate-css";

@plugin "@tailwindcss/typography";

@keyframes custom-animation { ... }

@layer base {
  /* Base styles */
}

@theme {
  /* Theme variables */
}

/* Theme definitions */
:root, [data-theme="default"] { ... }
[data-theme="purple"] { ... }
```

### 38.2 Color Format (OKLCH)
```css
--primary: 70.28% 0.1753 295.36;  /* lightness chroma hue */
```

### 38.3 Data Attribute Selectors
```css
[data-slot="button"] { ... }
[data-state="active"] { ... }
[data-sonner-toast] { ... }
```

### 38.4 Terminal Preview Forcing
```css
.terminal-preview [data-slot="button"],
.terminal-preview [data-slot="input"],
.terminal-preview [data-slot="card"] {
  border-radius: 0 !important;
}
```

### 38.5 DaisyUI Theme System
```tsx
// Theme is set via data-theme attribute on html/body
<html data-theme="default">

// Available themes defined in globals.css:
// :root, [data-theme="default"] { ... }
// [data-theme="purple"] { ... }
// [data-theme="dark"] { ... }
// etc.

// Theme switching (typically via ThemeDropdown component)
document.documentElement.setAttribute("data-theme", "purple");
```

### 38.6 Custom Keyframes
```css
/* Defined in globals.css */
@keyframes bar-grow { ... }
@keyframes fade-in-up { ... }
@keyframes gradient-shift { ... }
@keyframes terminal-blink { ... }

/* Usage */
.animate-bar-grow { animation: bar-grow ... }
```

---

## 39. TESTING

### 39.1 Test Files
- Unit tests: `*.test.ts(x)` - colocated with components
- E2E tests: `tests/e2e/*.spec.ts`
- Stories: `*.stories.tsx` - for Storybook

### 39.2 Test Requirements
- [ ] All utility functions have unit tests
- [ ] Critical user flows have E2E tests
- [ ] Components with complex logic have tests

### 39.3 Test Pattern
```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

---

## 40. FILES TO AUDIT

### Priority 1: Base UI (foundation)
```
src/components/ui/*.tsx
src/app/globals.css
tailwind.config.ts (if exists)
src/lib/utils.ts
```

### Priority 2: Configuration
```
src/config.js
src/lib/env.ts
src/lib/auth.ts
```

### Priority 3: Layout (affects all pages)
```
src/app/layout.tsx
src/app/(legal)/layout.tsx
src/app/(dashboard)/layout.tsx
src/app/docs/layout.tsx
```

### Priority 4: Landing/Marketing (public-facing)
```
src/app/page.tsx
src/components/landing/*.tsx
```

### Priority 5: Templates (showcase)
```
src/app/templates/**/page.tsx
src/components/settings/*.tsx
```

### Priority 6: Docs
```
src/app/docs/**/page.tsx
src/components/docs/*.tsx
```

### Priority 7: Dashboard
```
src/app/(dashboard)/**/page.tsx
src/components/dashboard/*.tsx
```

### Priority 8: Auth & Account
```
src/app/(auth)/**/page.tsx
src/components/auth/*.tsx
src/components/account/*.tsx
```

### Priority 9: Admin & Billing
```
src/components/admin/*.tsx
src/components/billing/*.tsx
src/components/pricing/*.tsx
```

### Priority 10: Utilities & Hooks
```
src/hooks/*.ts
src/lib/*.ts
src/types/*.ts
```

### Priority 11: API & Server
```
src/app/api/**/*.ts
src/middleware.ts
src/lib/security/*.ts
src/lib/prisma.ts
src/lib/cache.ts
src/lib/logger.ts
```

### Priority 12: Error Pages
```
src/app/error.tsx
src/app/global-error.tsx
src/app/not-found.tsx
src/app/loading.tsx
```

---

## 41. OUTPUT FORMAT

### 41.1 Issue Format
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ISSUE #001                                         ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ File:     src/components/landing/hero.tsx          ┃
┃ Line:     47-49                                    ┃
┃ Category: STYLING                                  ┃
┃ Severity: 🔴 CRITICAL                              ┃
┃ Rule:     No rounded corners except traffic lights ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ CURRENT:                                           ┃
┃   <div className="rounded-lg bg-blue-500">         ┃
┃                                                    ┃
┃ REQUIRED:                                          ┃
┃   <div className="rounded-none bg-primary">        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### 41.2 Summary Tables

**Table 1: File Size Violations**
| # | Severity | File | Lines | Action |
|---|----------|------|-------|--------|

**Table 2: Rounded Corner Violations**
| # | File | Line | Current | Fix |
|---|------|------|---------|-----|

**Table 3: Color Token Violations**
| # | File | Line | Hardcoded | Token |
|---|------|------|-----------|-------|

**Table 4: Typography Violations**
| # | File | Line | Current | Required |
|---|------|------|---------|----------|

**Table 5: Base UI Bypasses**
| # | File | Line | Custom | Use Instead |
|---|------|------|--------|-------------|

**Table 6: Accessibility Issues**
| # | File | Line | Issue | WCAG | Fix |
|---|------|------|-------|------|-----|

**Table 7: Code Quality Issues**
| # | File | Line | Type | Issue |
|---|------|------|------|-------|

**Table 8: SEO/Metadata Issues**
| # | File | Issue | Fix |
|---|------|-------|-----|

**Table 9: Security Issues**
| # | File | Line | Issue | Fix |
|---|------|------|-------|-----|

### 41.3 Metrics Dashboard
```
╔════════════════════════════════════════════════════════════════╗
║                    AUDIT COMPLETE - METRICS                     ║
╠════════════════════════════════════════════════════════════════╣
║  📁 FILES                          📊 ISSUES BY SEVERITY        ║
║  Total Scanned:        XXX         🔴 Critical:         XX      ║
║  Lines of Code:      X,XXX         🟠 High:             XX      ║
║  Compliant:        XX (XX%)        🟡 Medium:           XX      ║
║  With Issues:      XX (XX%)        🔵 Low:              XX      ║
║                                                                 ║
║  🎯 COMPLIANCE SCORE:  XX.X%                                    ║
║  [████████████████░░░░░░░░░░░░░░░░░░░░░░░░] XX%                 ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 42. EXECUTION PROTOCOL

### Phase 1: PRE-FLIGHT ✈️
```bash
npm run dev          # Must start without errors
npm run type-check   # Must pass
npm run lint         # Note any existing issues
npm run scan:hex     # Check for hardcoded colors
npm run build        # Must succeed
npm test             # Run tests
git rev-parse HEAD   # Save SHA for rollback
```

### Phase 2: AUDIT 🔍
1. Scan files in priority order (Section 39)
2. Log EVERY issue found - no exceptions
3. Generate all tables (Section 40.2)
4. Calculate metrics (Section 40.3)
5. DO NOT FIX ANYTHING YET

### Phase 3: REPORT 📊
Present to user:
- Complete issue list
- All summary tables
- Metrics dashboard
- Recommended fix order

### Phase 4: AWAIT APPROVAL ⏸️
**STOP HERE.** Do not proceed without explicit user confirmation:
- "proceed"
- "fix all"
- "fix critical only"
- Or specific instructions

### Phase 5: FIX 🔧
1. **Critical** issues first
2. **By category** to minimize context switching
3. Run `npm run type-check` after each file
4. Run `npm run lint` after each category

### Phase 6: VERIFY ✅
```bash
npm run type-check && npm run lint && npm run scan:hex && npm run build && npm test
```
Visual verification: landing page, template pages, mobile viewport

### Phase 7: COMMIT 📝
```bash
git add -A && git commit -m "Design system audit: Full compliance achieved"
```

### Phase 8: ROLLBACK PLAN 🔄
```bash
git reset --hard [SAVED_SHA]
```

---

## 43. EXCEPTIONS REGISTRY

| Exception | Where | Reason |
|-----------|-------|--------|
| `rounded-full` | Traffic light dots only | Terminal chrome metaphor |
| `rounded-md` | Base UI component variants | Shadcn default (override in usage) |
| `rounded-md` | `primaryCta`, `secondaryCta`, `ghostOnDark` | Marketing emphasis |
| Inline SVG | Brand logos only | Not in lucide/simple-icons |
| `text-sm` without mono | Legal pages body | Long-form readability |
| `console.error` | Error boundaries only | Error reporting |
| `suppressHydrationWarning` | html, body, Tabs, Accordion | Theme/Radix hydration |
| `shadow-md` | Never | **NO EXCEPTIONS** |
| Hardcoded colors | Never | **NO EXCEPTIONS** |

---

## 44. QUICK REFERENCE CHEAT SHEET

### Terminal Styling Checklist
```tsx
// ✅ Every form element needs:
className="rounded-none font-mono text-xs"

// ✅ Every label needs:
className="font-mono text-xs"
// With bracket format: [LABEL]:

// ✅ Every button needs:
className="rounded-none font-mono text-xs"
// With text format: > ACTION_NAME

// ✅ Every card/dialog/sheet needs:
className="rounded-none"
```

### Import Cheat Sheet
```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
```

### Common Patterns
```tsx
// Loading button
<Button loading loadingText="> SAVING..." className="rounded-none font-mono text-xs">

// Error message
<p className="font-mono text-xs text-destructive">[ERROR]: Message</p>

// Success message
<p className="font-mono text-xs text-success">[SUCCESS]: Message</p>

// Helper text
<p className="font-mono text-xs text-muted-foreground">Helper text</p>
```

---

# END OF AUDIT SPECIFICATION

**DO NOT EXECUTE** until user explicitly says:
- "run audit"
- "start audit"
- "audit now"
- "execute"
- Or similar clear instruction

**VERSION:** 5.5
**TOTAL RULES:** 700+
**TOTAL PATTERNS:** 350+
**TOTAL UI COMPONENTS:** 106
**TOTAL FEATURE COMPONENTS:** 108
**TOTAL COMPONENTS TRACKED:** 214
**TOTAL HOOKS DOCUMENTED:** 35+
**TOTAL UTILITIES DOCUMENTED:** 90+
**TOTAL LIB MODULES:** 20+
**TOTAL SECTIONS:** 44
**ZERO TOLERANCE FOR GAPS**
