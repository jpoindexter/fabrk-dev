# AUDIT: Component Inventory & Analysis

> Generated: December 5, 2025 | Phase 1 Audit

## Executive Summary

| Metric | Value |
|--------|-------|
| Total UI Components | 101 files |
| Design System Compliance | 85% |
| Critical Issues | 4 |
| Components Needing Refactor | 12 |

---

## 1. Component Inventory

### 1.1 Core Form Components (12)

| Component | File | Variants | Mode Support |
|-----------|------|----------|--------------|
| Button | button.tsx | 9 variants, 5 sizes | ✓ Full |
| Input | input.tsx | error, success, loading | ✓ Full |
| Textarea | textarea.tsx | error | ✓ Full |
| Label | label.tsx | required, error | ✓ Full |
| Checkbox | checkbox.tsx | - | ✓ Full |
| Switch | switch.tsx | - | ✓ Full |
| Radio Group | radio-group.tsx | - | ✓ Full |
| Select | select.tsx | 4 sub-components | ⚠️ Partial |
| InputPassword | input-password.tsx | showToggle | ✓ Full |
| InputSearch | input-search.tsx | loading, clearable | ✓ Full |
| InputOTP | input-otp.tsx | - | ✓ Full |
| InputNumber | input-number.tsx | increment/decrement | ✓ Full |

### 1.2 Layout Components (8)

| Component | File | Sub-components | Mode Support |
|-----------|------|----------------|--------------|
| Card | card.tsx | 11 sub-components | ⚠️ Mixed |
| Dialog | dialog.tsx | 7 sub-components | ✓ Full |
| Sheet | sheet.tsx | 6 sub-components | ✓ Full |
| AlertDialog | alert-dialog.tsx | 7 sub-components | ✓ Full |
| Tabs | tabs.tsx | 3 sub-components | ✓ Full |
| Accordion | accordion.tsx | 3 sub-components | ✓ Full |
| Collapsible | collapsible.tsx | 2 sub-components | ✓ Full |
| Separator | separator.tsx | - | ✓ Full |

### 1.3 Display Components (10)

| Component | File | Variants | Mode Support |
|-----------|------|----------|--------------|
| Alert | alert.tsx | default, destructive, success | ⚠️ Partial |
| Badge | badge.tsx | 6 variants, 3 sizes | ✓ Full |
| Avatar | avatar.tsx | - | ✓ Full |
| Skeleton | skeleton.tsx | - | ✓ Full |
| Progress | progress.tsx | - | ✓ Full |
| EmptyState | empty-state.tsx | - | ✓ Full |
| Tooltip | tooltip.tsx | - | ✓ Full |
| HoverCard | hover-card.tsx | - | ✓ Full |
| AspectRatio | aspect-ratio.tsx | - | ✓ Full |
| Calendar | calendar.tsx | - | ✓ Full |

### 1.4 Navigation Components (6)

| Component | File | Variants | Mode Support |
|-----------|------|----------|--------------|
| Pagination | pagination.tsx | 5 sub-components | ⚠️ Missing radius |
| Breadcrumb | breadcrumb.tsx | 5 sub-components | ✓ Full |
| NavigationMenu | navigation-menu.tsx | 8 sub-components | ✓ Full |
| DropdownMenu | dropdown-menu.tsx | 12 sub-components | ⚠️ No focus |
| ContextMenu | context-menu.tsx | 10 sub-components | ✓ Full |
| Menubar | menubar.tsx | 10 sub-components | ✓ Full |

### 1.5 Data Display (8)

| Component | File | Features | Mode Support |
|-----------|------|----------|--------------|
| Table | table.tsx | 7 sub-components | ✓ Full |
| DataTable | data-table.tsx | sorting, filtering | ✓ Full |
| Chart (Line) | line-chart.tsx | Recharts wrapper | ⚠️ Color mixing |
| Chart (Bar) | bar-chart.tsx | Recharts wrapper | ⚠️ Color mixing |
| Chart (Pie) | pie-chart.tsx | Recharts wrapper | ⚠️ Color mixing |
| Heatmap | heatmap.tsx | Custom | ⚠️ Color mixing |
| Gauge | gauge.tsx | Custom | ⚠️ Color mixing |
| ActivityTimeline | activity-timeline.tsx | - | ✓ Full |

### 1.6 Feedback Components (5)

| Component | File | Features | Mode Support |
|-----------|------|----------|--------------|
| Toast | toast.tsx | Sonner integration | ✓ Full |
| FormError | form-error.tsx | what, why, how, retry | ⚠️ No mode.font |
| Spinner | spinner.tsx | - | ✓ Full |
| LoadingDots | loading-dots.tsx | - | ✓ Full |
| Confetti | confetti.tsx | - | ✓ Full |

### 1.7 Overlay Components (4)

| Component | File | Features | Mode Support |
|-----------|------|----------|--------------|
| Popover | popover.tsx | - | ✓ Full |
| Command | command.tsx | cmdk integration | ✓ Full |
| Lightbox | lightbox.tsx | zoom, navigation | ✓ Full |
| Modal (generic) | dialog.tsx | - | ✓ Full |

---

## 2. Card Component Analysis

### 2.1 The Card Fragmentation Problem

**11 card-related exports from card.tsx:**

```typescript
// Standard (Radix-style)
Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

// Terminal Styled
StyledCard, StyledCardHeader, StyledLabel

// Feature Components
FeatureItem, FeatureList, InfoNote, PageBadge, TemplatePageHeader, FeaturesCard, CodeOutput
```

### 2.2 Inconsistent Card APIs

| Component | Header Format | Padding | Border |
|-----------|--------------|---------|--------|
| Card + CardHeader | Plain text | p-6 | border |
| StyledCard + StyledCardHeader | `[ [0x00] TITLE ]` | px-4 py-2 | border |
| FeaturesCard | Hex code + title | p-4 | border |

### 2.3 Recommendation

Consolidate to 2 card patterns:
1. **Card** - Generic container
2. **TerminalCard** - With hex header (replaces Styled*, Features*)

---

## 3. Button Component Analysis

### 3.1 Variants

```typescript
variants: {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-foreground/20 bg-background hover:bg-accent",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    primaryCta: "bg-primary text-primary-foreground text-base px-6 py-4", // ❌ Different size!
    secondaryCta: "border-2 border-foreground/20 text-base px-6 py-4",   // ❌ Different size!
    ghostOnDark: "text-foreground/80 hover:text-foreground hover:bg-white/10",
  },
  size: {
    default: "h-8 px-4 py-1.5",
    sm: "h-7 px-3 text-xs",
    lg: "h-9 px-6",
    xl: "h-12 px-8",
    icon: "size-8",
  }
}
```

### 3.2 Issues

1. **CTA variants override text size** - `primaryCta` uses `text-base` while default is `text-xs`
2. **Inconsistent padding** - Some use numbers, some use semantic sizes
3. **Mobile touch targets** - Only default has `min-h-[44px]`

### 3.3 Recommendation

- Remove text-base from CTA variants (inherit from size)
- Add touch targets to all sizes
- Consider merging CTA into size="xl" + variant combo

---

## 4. Input Component Analysis

### 4.1 Input Variants Proliferation

| Component | File | Purpose |
|-----------|------|---------|
| Input | input.tsx | Base text input |
| InputPassword | input-password.tsx | With visibility toggle |
| InputSearch | input-search.tsx | With icon + clear |
| InputOTP | input-otp.tsx | OTP code entry |
| InputNumber | input-number.tsx | With +/- buttons |
| InputGroup | input-group.tsx | Grouping utility |

### 4.2 API Inconsistency

```typescript
// Input
<Input error success loading loadingText />

// InputPassword
<InputPassword showToggle />

// InputSearch
<InputSearch value onValueChange loading showClearButton />
```

**Problem:** Different prop patterns for similar functionality.

### 4.3 Recommendation

Create unified Input with composition:
```tsx
<Input>
  <Input.Icon icon={Search} />
  <Input.Field />
  <Input.ClearButton />
</Input>
```

---

## 5. Critical Issues

### 5.1 Touch Target Violation (WCAG)

**Input component doesn't meet 44px minimum:**

```tsx
// CURRENT
className="h-8 w-full" // 32px - FAILS WCAG

// SHOULD BE
className="h-8 min-h-[44px] w-full sm:min-h-0"
```

**Affected:** Input, potentially InputPassword, InputSearch

### 5.2 Missing Focus Indicators

**DropdownMenu lacks visible focus state:**

```tsx
// No focus-visible:ring on DropdownMenuItem
className="... focus:bg-accent focus:text-accent-foreground"
// Missing: focus-visible:ring-2 focus-visible:ring-primary
```

### 5.3 Alert Mode Application Gap

```tsx
// AlertTitle MISSING mode.font
className={cn("col-start-2 line-clamp-1 font-semibold", className)}

// SHOULD BE
className={cn("col-start-2 line-clamp-1 font-semibold", mode.font, className)}
```

### 5.4 Badge Text Transform

```tsx
// Badge ALWAYS uppercase
badgeVariants = cva("... uppercase", ...)

// Should respect mode.textTransform
```

---

## 6. Mode System Application Matrix

### 6.1 Full Compliance ✓

| Component | mode.radius | mode.font | mode.shadow |
|-----------|-------------|-----------|-------------|
| Button | ✓ | ✓ | - |
| Input | ✓ | ✓ | - |
| Card | ✓ | ✓ | - |
| Dialog | ✓ | ✓ | - |
| Select | ✓ | ✓ | - |
| Tabs | ✓ | ✓ | - |

### 6.2 Partial Compliance ⚠️

| Component | Issue |
|-----------|-------|
| Alert | AlertTitle missing mode.font |
| Badge | Always uppercase, ignores mode |
| DropdownMenu | Content only, not items |
| Pagination | Missing mode.radius on links |
| FormError | Missing mode.font |

### 6.3 Needs Review

| Component | Status |
|-----------|--------|
| All chart components | Color tokens, not mode |
| ActivityTimeline | Need to verify |
| Table | Need to verify |

---

## 7. Typography in Components

### 7.1 Font Size Usage

| Component | Size | Correct? |
|-----------|------|----------|
| Button | text-xs | ✓ |
| Input | text-xs | ✓ |
| Label | text-xs | ✓ |
| Badge | text-xs | ✓ |
| Card Title | text-base | ⚠️ Should be text-sm? |
| Card Description | text-xs | ✓ |
| Alert | text-xs | ✓ |
| Select Item | text-xs | ✓ |

### 7.2 Font Weight Patterns

| Component | Weight | Semantic |
|-----------|--------|----------|
| Button | font-medium | Interactive |
| Label | font-semibold | Label |
| Card Title | font-semibold | Heading |
| Badge | font-medium/semibold | Varies by size! |

**Problem:** Badge weight changes by size (inconsistent).

---

## 8. Accessibility Status

### 8.1 Compliant ✓

- Skip links in layout
- Focus management in dialogs
- ARIA labels on icon buttons
- Keyboard navigation in menus
- Screen reader announcements

### 8.2 Non-Compliant ❌

| Issue | Component | Impact |
|-------|-----------|--------|
| Touch target < 44px | Input | Mobile users |
| No focus ring | DropdownMenu items | Keyboard users |
| Missing aria-label | Some icon-only buttons | Screen readers |

---

## 9. Recommendations

### 9.1 Immediate Fixes

1. **Add touch targets to Input**
2. **Add focus-visible to DropdownMenu**
3. **Add mode.font to AlertTitle**
4. **Make Badge respect mode.textTransform**

### 9.2 Refactoring

1. **Consolidate Card components** (11 → 3)
2. **Unify Input variants** with composition pattern
3. **Standardize button CTA sizing**

### 9.3 Documentation

1. **Document which components need mode.***
2. **Create component checklist for new components**
3. **Add Storybook stories for all variants**

---

## 10. Component Compliance Scores

| Category | Score | Notes |
|----------|-------|-------|
| Form Components | 90% | Input touch target issue |
| Layout Components | 95% | Card fragmentation |
| Display Components | 85% | Alert mode gap |
| Navigation | 80% | Dropdown focus, pagination radius |
| Data Display | 70% | Chart color consistency |
| Feedback | 85% | FormError mode gap |
| **Overall** | **85%** | |
