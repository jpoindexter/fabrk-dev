# Card (TerminalCard) Component Audit

**File:** `src/components/ui/card.tsx`
**Status:** ✅ EXEMPLARY IMPLEMENTATION
**Uses Mode System:** Yes
**Violations:** 0

---

## Component Purpose

**ONE canonical card component** for the entire codebase. Implements terminal-style card pattern with header `[ [0xXX] TITLE ]`, flexible content area, and optional footer. Includes helper components for common patterns (badges, stats, feature lists).

---

## Exported Components

### Core Components
1. `TerminalCard` - Main card shell with tone/size variants
2. `TerminalCardHeader` - Header with hex code and title pattern
3. `TerminalCardContent` - Flexible content area with padding variants
4. `TerminalCardFooter` - Footer for actions/metadata

### Helper Components
5. `TerminalBadge` - Inline badge with terminal pattern
6. `TerminalStat` - Key-value stat display
7. `TerminalStatGroup` - Container for multiple stats
8. `StyledLabel` - Bracketed label `[LABEL]:`
9. `FeatureItem` - List item with prefix (>, ✓, •)
10. `FeatureList` - Container for feature items
11. `InfoNote` - Note text `[NOTE]: message`
12. `PageBadge` - Page identifier badge
13. `TemplatePageHeader` - Complete page header with badge
14. `FeaturesCard` - Complete card with features list

---

## Design System Compliance

### ✅ EXEMPLARY PATTERNS

#### 1. Mode System Integration (Lines 33, 84, 115-117, 129-130)

```typescript
import { mode } from "@/design-system";

// TerminalCard
<Component
  className={cn(
    "bg-card flex flex-col border",
    mode.radius,  // Apply radius from mode config
    toneStyles[tone],
    sizeStyles[size],
    interactive && "group hover:border-primary/50 transition-colors",
    className
  )}
/>

// TerminalCardHeader
<span className={cn("text-muted-foreground text-xs", mode.font)}>
  [ [{code}] {title} ]
</span>

// All subcomponents use mode.font consistently
```

**Why This Is Excellent:**
- ✅ Centralized mode import used across 14 components
- ✅ `mode.radius` applied to all visual elements
- ✅ `mode.font` applied to all text elements
- ✅ Consistent application pattern across file

#### 2. One Component, Multiple Compositions (Lines 36-101)

```typescript
export type TerminalCardTone = "neutral" | "primary" | "success" | "warning" | "danger";
export type TerminalCardSize = "auto" | "full";

const toneStyles: Record<TerminalCardTone, string> = {
  neutral: "border-border",
  primary: "border-primary",
  success: "border-success",
  warning: "border-warning",
  danger: "border-destructive",
};

const sizeStyles: Record<TerminalCardSize, string> = {
  auto: "",         // Natural height
  full: "h-full",   // Equal height for grids
};
```

**Why This Is Excellent:**
- ✅ Single card shell, variants control behavior
- ✅ Tone variants use design tokens only
- ✅ Size variants solve common layout problems
- ✅ No duplicate card components in codebase

#### 3. Terminal Pattern Implementation (Lines 119-141)

```typescript
const TerminalCardHeader = React.forwardRef<HTMLDivElement, TerminalCardHeaderProps>(
  ({ code = "0x00", title, icon, meta, className }, ref) => (
    <div
      ref={ref}
      data-slot="terminal-card-header"
      className={cn(
        "border-border flex items-center justify-between border-b px-4 py-2",
        className
      )}
    >
      <span className={cn("text-muted-foreground text-xs", mode.font)}>
        [ [{code}] {title} ]
      </span>
      {(icon || meta) && (
        <span className="flex items-center gap-2">
          {meta && <span className={cn("text-muted-foreground text-xs", mode.font)}>{meta}</span>}
          {icon}
        </span>
      )}
    </div>
  )
);
```

**Why This Is Excellent:**
- ✅ Consistent terminal pattern: `[ [0xXX] TITLE ]`
- ✅ Uses `mode.font` for monospace terminal aesthetic
- ✅ Flexible metadata/icon support
- ✅ 8-point grid spacing (px-4, py-2)

#### 4. Composable Helper Components (Lines 207-306)

```typescript
// TerminalStat - Semantic key-value display
<TerminalStat label="Speed" value="OPTIMIZED" />
// Renders: Speed: OPTIMIZED (with proper token colors)

// FeatureItem - Terminal-style list item
<FeatureItem icon="arrow">Multi-step form wizard</FeatureItem>
// Renders: > Multi-step form wizard

// StyledLabel - Bracketed label pattern
<StyledLabel>TEMPLATE_FEATURES</StyledLabel>
// Renders: [TEMPLATE_FEATURES]:
```

**Why This Is Excellent:**
- ✅ Small, focused helper components
- ✅ All use `mode.font` for consistency
- ✅ Enforce terminal aesthetic patterns
- ✅ Reduce code duplication across templates

#### 5. Complete Card Compositions (Lines 505-534)

```typescript
const FeaturesCard = React.forwardRef<HTMLDivElement, FeaturesCardProps>(
  ({ title = "TEMPLATE_FEATURES", code = "0x00", features, note, featureIcon = "arrow" }, ref) => (
    <TerminalCard ref={ref} className={className} {...props}>
      <TerminalCardHeader code={code} title={title} />
      <TerminalCardContent>
        <StyledLabel className="mb-4">{title}</StyledLabel>
        <FeatureList>
          {features.map((feature, index) => (
            <FeatureItem key={index} icon={featureIcon}>
              {feature}
            </FeatureItem>
          ))}
        </FeatureList>
        {note && <InfoNote>{note}</InfoNote>}
      </TerminalCardContent>
    </TerminalCard>
  )
);
```

**Why This Is Excellent:**
- ✅ Pre-composed card for common use case
- ✅ Combines multiple helper components
- ✅ Reduces boilerplate in template pages
- ✅ Maintains composition flexibility

#### 6. Design Token Usage

**ALL colors use design tokens:**
- `bg-card` - Card background
- `bg-background` - Alternative background
- `bg-muted` - Muted background
- `border-border` - Default borders
- `border-primary` - Primary accent borders
- `border-success` - Success borders
- `border-warning` - Warning borders
- `border-destructive` - Danger/error borders
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `text-primary` - Accent text
- `text-success` - Success text

**NO hardcoded colors, NO hex values, NO gray-\* utilities.**

#### 7. Spacing System (Lines 151-155, 159-165)

```typescript
const paddingStyles = {
  sm: "p-2",   // 8px
  md: "p-4",   // 16px (default)
  lg: "p-6",   // 24px
};

const TerminalCardContent = React.forwardRef<HTMLDivElement, TerminalCardContentProps>(
  ({ className, padding = "md", ...props }, ref) => (
    <div
      className={cn("flex-1", paddingStyles[padding], className)}
      {...props}
    />
  )
);
```

**Why This Is Excellent:**
- ✅ Follows 8-point grid (8px, 16px, 24px)
- ✅ Semantic padding sizes (sm, md, lg)
- ✅ Default to medium (most common)
- ✅ Easy to override per use case

---

## Summary

The `Card` component demonstrates **architectural excellence**:

1. ✅ **Single source of truth** - ONE card component, not multiple variations
2. ✅ **Composition over inheritance** - Small, focused subcomponents
3. ✅ **Mode system mastery** - Consistent use of mode.radius and mode.font
4. ✅ **100% design token usage** - NO hardcoded colors anywhere
5. ✅ **Terminal aesthetic enforcement** - Helper components ensure pattern consistency
6. ✅ **8-point grid spacing** - All padding/margin follows system
7. ✅ **Comprehensive helpers** - 14 components for common patterns
8. ✅ **Accessibility** - Proper semantic HTML, data-slot attributes

### Design System Integration Score: 10/10

### Architectural Patterns to Replicate

1. **Single Component Philosophy**: Instead of `BasicCard`, `FeatureCard`, `StatCard`, create ONE card with variants
2. **Helper Component Pattern**: Extract common patterns (badges, labels, list items) into small composable pieces
3. **Mode System Everywhere**: Apply mode.radius and mode.font to every visual/text element
4. **Token-Only Colors**: NO exceptions - every color must be a design token
5. **Composition Helpers**: Create pre-composed variants (like `FeaturesCard`) for common use cases while keeping primitives available

### This File Is Required Reading

Any developer creating new components MUST read this file to understand:
- How to structure component families
- When to create helpers vs variants
- How to apply the mode system correctly
- How to use design tokens exclusively
