# Admin Overview Dashboard Audit

**File**: `src/app/(dashboard)/admin/page.tsx`

## Purpose

High-level admin dashboard showing system statistics, quick actions, and health status.

## Layout Overview

- **Container**: `space-y-6` (24px vertical spacing)
- **Server Component**: Uses `async` for server-side stats
- **Grids**:
  - Stats: `grid gap-6 md:grid-cols-2 lg:grid-cols-5`
  - Bottom section: `grid gap-6 md:grid-cols-2`

## Key Components Used

- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Suspense` for async data loading
- `prisma` - Database queries
- Icons: `Users`, `CreditCard`, `Activity`, `Building`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale

- `text-4xl` - Page title "Admin Dashboard"
- `text-muted-foreground` - Subtitle, stat descriptions, icon colors, health labels
- `text-xs` - Stat descriptions, health status badges
- `text-2xl` - Stat values (bold)
- `text-sm` - Health labels, quick action labels, card text
- `font-semibold` - Title (tracking-tight), quick action headings, health badges

## Spacing Patterns

- `space-y-6` - Main container (24px)
- `gap-6` - All grids (24px), icon-text gaps (24px)
- `space-y-0` - Card header (0px - uses flex row with space-y-0)
- `space-y-2` - Quick actions list (8px)
- `space-y-4` - Health status list (16px)
- `pb-2` - Stat card header bottom padding (8px)
- `p-4` - Quick action links (16px)
- `px-2 py-1` - Health badges (8px horizontal, 4px vertical)

## Font Weights and Families

- `font-semibold` - Page title, quick action headings, health badges
- `font-bold` - Stat values
- `font-medium` - Card headers

## Colors Used (Semantic Tokens)

- `text-muted-foreground` - Subtitles, icons, descriptions, labels
- `bg-success/10` - Health status badge background
- `text-success` - Health status badge text
- `hover:bg-muted` - Quick action link hover
- `border` - Quick action borders

## Hardcoded Values

- `h-4 w-4` - Icons in stat cards (16px × 16px)
- `h-8 w-16` - Loading skeleton for stat values (32px × 64px)
- `h-4 w-24` - Loading skeleton for stat labels (16px × 96px)

## Server-Side Data Fetching

Parallel Prisma queries using `Promise.all()`:

- User counts (total, recent 7 days, active sessions)
- Organization count
- Payment counts and revenue aggregation
- Efficient query batching

## Stats Calculation

```typescript
totalUsers, totalOrganizations, totalPayments,
recentUsers (last 7 days), recentPayments (last 7 days),
activeUsers (with active sessions),
totalRevenue (_sum of succeeded payments),
monthlyRevenue (last 30 days)
```

## Loading States

Uses Suspense with skeleton:

- Grid of 5 cards
- Animated pulse skeletons
- Background `bg-muted` with `animate-pulse`
- Rounded bars for text placeholders

## Quick Actions Pattern

Links styled as cards:

- Hover state with muted background
- Heading + description structure
- Consistent padding and borders
- Uses `mode.radius` for rounded corners

## Health Status Display

Hard-coded "Healthy" status for:

- Database
- Authentication
- Payments
- Email Service

Each with:

- Success badge (green background/text)
- Consistent spacing and alignment

## Design System Integration

- ✅ Uses `mode.radius` for all rounded elements
- ✅ Uses `cn()` utility for conditional classes
- ✅ Semantic color tokens throughout
- ✅ 8-point spacing grid (gap-6 = 24px, space-y-6 = 24px)

## Inconsistencies

- **Hard-coded health status**: Not dynamic (all show "Healthy")
- **Revenue calculation**: Divides by 100 (assumes cents) - not documented
- **5-column grid**: Unusual grid-cols-5 (typically use even numbers for better responsive behavior)
