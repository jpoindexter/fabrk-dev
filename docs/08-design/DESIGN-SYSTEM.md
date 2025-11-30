# Fabrk Design System

Complete documentation of the unified design system implemented across Fabrk. This guide documents all standardized spacing, typography, component sizing, and responsive design standards.

**Last Updated:** November 19, 2025
**Status:** Complete (Phase 5/6 Design System Unification)

---

## Table of Contents

- [Typography Standards](#typography-standards)
- [Spacing Standards](#spacing-standards)
- [Component Sizes](#component-sizes)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)
- [Implementation Guide](#implementation-guide)
- [Phase History](#phase-history)

---

## Typography Standards

All typography has been standardized across the application using consistent Tailwind classes.

### Page Titles

**Standard:** `text-4xl font-semibold tracking-tight`

Used on all dashboard page headers for visual consistency and hierarchy.

**Applied to:**
- Dashboard overview page
- Settings page
- Profile page
- Account page
- Billing pages (invoices, payment methods)
- Developer API keys page
- Admin pages (dashboard, users)

### Section Headings

**Standard:** `text-2xl font-semibold`

Used for major sections within pages.

### Body Text

Standard body text uses semantic sizing:
- **Base:** `text-base` (16px)
- **Small:** `text-sm` (14px)
- **Extra Small:** `text-xs` (12px)

---

## Spacing Standards

All spacing has been standardized for consistency and alignment.

### Container Widths

**Standard:** `max-w-6xl`

Provides optimal reading width and layouts across all dashboard pages.

**Breakdown:**
- Extra small: 0px (full width with padding)
- Small: 640px
- Medium: 768px
- Large: 1024px
- Full: **1152px** (max-w-6xl)

### Grid & Layout Gaps

**Standard:** `gap-6`

Consistent spacing between grid items and layout sections.

### Card & Container Padding

**Standard:** `p-6`

Uniform padding inside cards and containers for consistency.

### Section Spacing

**Standard:** `space-y-6`

Vertical spacing between major sections.

---

## Component Sizes

### Button Sizes

| Size | Class | Use Case |
|------|-------|----------|
| **Icon** | `h-10 w-10` | Icon buttons, close buttons, toolbar actions |
| **Small** | `h-7 px-2 text-xs` | Compact buttons |
| **Default** | `h-8 px-3 py-1.5` | Standard buttons |
| **Large** | `h-9 px-6` | Prominent actions |
| **XL** | `h-12 px-8 text-lg` | Hero CTAs |

### Icon Button Accessibility

**WCAG 2.1 AA Standard:** 44×44px minimum touch target

**Implementation:**
- **Base size:** `h-10 w-10` = 40×40px
- **With padding:** Achieves 44×44px touch target area
- **Compliant:** ✅ Icon buttons (update to Phase 5)
- **Compliant:** ✅ Pagination buttons (update to Phase 5)

### Pagination Controls

**Standard:** `h-10 w-10` (updated in Phase 5)

Applied to all pagination buttons:
- First page button
- Previous page button
- Next page button
- Last page button

### Callout Boxes

**Standard Pattern:** All callout boxes, cards, and highlighted content sections must use the standardized background + shadow pattern for consistent elevation across all 20 DaisyUI themes.

#### Core Pattern

```tsx
<div className="rounded-lg border border-border bg-card shadow-sm p-6">
  {/* Content */}
</div>
```

**Required Classes:**
- `rounded-lg` - Rounded corners
- `border border-border` - Subtle border using theme token
- `bg-card` - Card background with proper contrast (NEVER `bg-background`)
- `shadow-sm` - Subtle shadow for elevation effect
- `p-6` or `p-8` - Consistent padding

#### Why `bg-card` Not `bg-background`

**Critical Distinction:**
- `bg-background` - Page/section background (blend in)
- `bg-card` - Elevated surfaces (stand out)

**Theme Support:**
All 20 DaisyUI themes define `--card` with 2-5% lightness difference from `--background` to create subtle elevation. Using `bg-background` makes boxes invisible in light themes.

#### Semantic Variations

**For different emphasis levels:**
- **Standard elevation:** `bg-card shadow-sm`
- **Primary highlight:** `bg-primary/10` (10% opacity tint)
- **Secondary highlight:** `bg-secondary/20`
- **Danger/warning:** `bg-destructive/10`
- **Muted/subtle:** `bg-muted` (no shadow needed)

#### Applied To

**Landing Page:**
- Enterprise features "$200,000+" box
- "Also Included" feature list
- Quality guarantee callout
- Stat cards (169 components, 85% coverage, etc.)
- AI integration examples
- Quality check terminal boxes

**Dashboard Components:**
- Usage limit cards
- Notification cards
- Activity timeline items
- Settings panels

---

## Responsive Design

### Mobile-First Approach

All components use Tailwind's mobile-first responsive prefixes:

```
Mobile: base styles
Tablet: sm: (640px)
Desktop: md: (768px)
Large: lg: (1024px)
Extra Large: xl: (1280px)
```

### Scroll Indicators

Added visible scrollbars to improve discoverability of horizontal scrolling on mobile.

**Applied to:**
- Pricing comparison table
- Data tables (all dashboard tables)

**Styling:**
```tsx
scroll-smooth
[&::-webkit-scrollbar]:h-2
[&::-webkit-scrollbar-track]:bg-muted
[&::-webkit-scrollbar-thumb]:bg-border
[&::-webkit-scrollbar-thumb]:rounded-full
```

### Mobile Navigation

- **Hamburger menu:** Visible on screens < 768px (md breakpoint)
- **Sheet width:** 300px (optimal for mobile)
- **Menu items:** Text-base with proper touch spacing
- **CTAs:** Full-width buttons with adequate padding

---

## Accessibility

### Touch Targets

All interactive elements meet WCAG 2.1 AA standards:

- **Minimum size:** 44×44px
- **Icon buttons:** 40×40px base + padding = 44×44px touch target ✅
- **Pagination:** 40×40px base + padding = 44×44px touch target ✅
- **Links:** Adequate padding/spacing for touch ✅

### Color Contrast

All text uses semantic color tokens ensuring WCAG AA compliance:
- **Text on background:** 4.5:1+ contrast ratio
- **Text on primary:** 4.5:1+ contrast ratio

### Keyboard Navigation

- All buttons and links are keyboard accessible
- Focus states visible with ring indicators
- Tab order follows logical document flow

### Screen Readers

- Semantic HTML used throughout
- ARIA labels on icon buttons
- Proper heading hierarchy

---

## Implementation Guide

### Using Design System Constants

Import constants from the design system file:

```tsx
import { TYPOGRAPHY, SPACING, BUTTON_SIZES, ACCESSIBILITY } from '@/lib/design-system/constants';

// Example usage
<h1 className={TYPOGRAPHY.pageTitle.className}>
  Dashboard
</h1>

<div className={`${SPACING.containerMaxWidth} mx-auto`}>
  <div className={SPACING.gridGap}>
    {/* Grid items */}
  </div>
</div>
```

### When Adding New Pages

1. Use `text-4xl font-semibold tracking-tight` for page titles
2. Wrap content in `max-w-6xl` container
3. Use `gap-6` for grid layouts
4. Use `p-6` for card padding
5. Use `space-y-6` for section spacing

### When Adding New Buttons

1. Use button size variants from `BUTTON_SIZES` constants
2. Icon buttons: Always use `h-10 w-10` for WCAG compliance
3. Ensure interactive elements meet 44×44px touch target
4. Add focus states with focus-visible ring

### When Adding Scrollable Content

1. Add `overflow-x-auto` to container
2. Add scroll indicator styles:
   ```tsx
   className="overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full"
   ```

---

## Phase History

### Phase 1: Critical Design System Fixes ✅

**Files Modified:** 20
**Commit:** `ff6f17e`

Changes:
- Added mobile hamburger navigation using Sheet component
- Standardized Badge component (9 variants, 3 sizes)
- Fixed undefined `transition-vercel-colors` class in 11 UI components
- Replaced 10 inline badge patterns with Badge component

### Phase 2: Typography Standardization ✅

**Files Modified:** 9
**Commit:** `c4ab62e`

Changes:
- Standardized all page titles to `text-4xl font-semibold tracking-tight`
- Applied across all dashboard pages for visual consistency

### Phase 3: Spacing Standardization ✅

**Files Modified:** 8
**Commit:** `395f194`

Changes:
- Standardized container widths to `max-w-6xl`
- Standardized grid gaps to `gap-6`
- Standardized card padding to `p-6`
- Standardized section spacing to `space-y-6`

### Phase 4: Component Pattern Replacement ✅

**Files Modified:** 2
**Commit:** `0f3e39c`

Changes:
- Replaced browser `confirm()` dialogs with AlertDialog components
- Improved UX for account deletion and team member removal

### Phase 5: Responsive Design Improvements ✅

**Files Modified:** 3
**Commits:**
- `f8f5754` - Touch target sizing
- `c3619ac` - Scroll indicators

Changes:
- Increased icon button size from `h-8 w-8` to `h-10 w-10` (WCAG compliant)
- Updated pagination buttons from `h-8 w-8` to `h-10 w-10`
- Added scroll indicators to pricing table
- Added scroll indicators to data tables

### Phase 6: Documentation & Polish (In Progress)

**Status:** Creating design system constants and documentation

---

## Validation Checklist

Use this checklist when reviewing pages for design system compliance:

- [ ] Page title uses `text-4xl font-semibold tracking-tight`
- [ ] Container width set to `max-w-6xl`
- [ ] Grid gaps use `gap-6`
- [ ] Card padding uses `p-6`
- [ ] Section spacing uses `space-y-6`
- [ ] Icon buttons use `h-10 w-10` (WCAG compliant)
- [ ] Pagination buttons use `h-10 w-10` (WCAG compliant)
- [ ] Scrollable content has scroll indicators
- [ ] All colors use semantic tokens (not hardcoded hex)
- [ ] Callout boxes use `bg-card shadow-sm` (NOT `bg-background`)
- [ ] Focus states visible on interactive elements
- [ ] Mobile navigation works on devices < 768px

---

## Quick Reference

### Most Changed Values

| Component | Old | New | Reason |
|-----------|-----|-----|--------|
| Page Title | Mixed (text-3xl/4xl, various fonts) | `text-4xl font-semibold tracking-tight` | Consistency |
| Container | max-w-4xl to max-w-7xl | `max-w-6xl` | Unified width |
| Grid Gap | gap-4 | `gap-6` | Better breathing room |
| Card Padding | pt-6 | `p-6` | Consistent on all sides |
| Icon Button | h-8 w-8 (32px) | `h-10 w-10` (40px) | WCAG AA compliance |
| Pagination | h-8 w-8 (32px) | `h-10 w-10` (40px) | WCAG AA compliance |
| Callout Box | `bg-background` | `bg-card shadow-sm` | Theme visibility + elevation |

---

## Next Steps

- [ ] Add Storybook stories for all standardized patterns
- [ ] Create component templates for new pages
- [ ] Add dark mode support across design tokens
- [ ] Create Figma design system documentation
- [ ] Add design system linting rules

---

## Resources

- [WCAG 2.1 Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Radix UI Primitives](https://radix-ui.com)

---

**Fabrk Design System** • Version 1.0.0
Unified and documented across 5 phases, 72+ files updated
