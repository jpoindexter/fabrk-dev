# Admin Analytics Page Audit

**File**: `src/app/(dashboard)/admin/analytics/page.tsx`

## Purpose
Analytics dashboard showing user growth, revenue metrics, and trend visualization.

## Layout Overview
- **Container**: `space-y-6` (24px vertical spacing)
- **Server Component**: Uses `async` with Suspense
- **Grids**:
  - Key metrics: `grid gap-4 md:grid-cols-2 lg:grid-cols-4`
  - Period comparisons: `grid gap-4 md:grid-cols-2`

## Key Components Used
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Suspense` for async loading
- `prisma` - Database queries
- Icons: `TrendingUp`, `Users`, `DollarSign`, `Activity`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale
- `text-3xl` - Page title "Analytics" (note: different from `text-4xl` on other pages)
- `text-muted-foreground` - Subtitle, stat descriptions, chart labels, dates
- `text-xs` - Stat descriptions, period labels, growth chart values
- `text-2xl` - Stat values (bold), period values (bold)
- `text-sm` - Card titles, period labels, growth chart values (font-semibold)
- `font-bold` - Page title (tracking-tight), stat values, period values
- `font-semibold` - Growth chart values

## Spacing Patterns
- `space-y-6` - Main container (24px)
- `space-y-2` - Growth chart rows (8px)
- `space-y-4` - Period card content (16px)
- `space-y-0` - Stat card headers (0px - uses flex row)
- `gap-4` - Grids (16px)
- `gap-2` - Icon-value gaps, bar chart gaps (8px)
- `gap-0.5` - Bar chart individual bars (2px)
- `pb-2` - Stat card header bottom padding (8px)

## Font Weights and Families
- `font-bold` - Page title, stat values
- `font-semibold` - Growth chart values

## Colors Used (Semantic Tokens)
- `text-muted-foreground` - Subtitles, icons, labels, dates
- `bg-primary` - Growth chart bars

## Hardcoded Values
- `h-4 w-4` - Stat card icons (16px × 16px)
- `h-4 w-2` - Growth chart bars (16px × 8px)
- `h-96` - Loading placeholder height (384px)

## Complex Data Processing
Time-based aggregations:
```typescript
// Date calculations
const now = new Date();
const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

// User growth grouping by day
const growthByDay: Record<string, number> = {};
userGrowth.forEach((user) => {
  const day = user.createdAt.toISOString().split("T")[0];
  growthByDay[day] = (growthByDay[day] || 0) + 1;
});
```

## Analytics Metrics Calculated
1. **Total users** + last 30/7 days
2. **Total revenue** + last 30/7 days (from payments)
3. **Average revenue per user**
4. **Total payments** + last 30 days
5. **User growth by day** (last 30 days)

## Growth Chart Pattern
- Record of date → count
- Sorted descending (most recent first)
- Shows top 10 days
- Visual bars using repeated divs with `bg-primary`
- Bar count = actual signups (1 bar = 1 user)

## Loading State
- 384px tall centered div
- Simple "Loading analytics..." text

## Design System Integration
- ✅ Uses `mode.radius` for chart bars
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens
- ✅ Consistent grid patterns

## Inconsistencies
- **Title size**: Uses `text-3xl` instead of `text-4xl` (inconsistent with other admin pages)
- **Chart visualization**: Simple div bars instead of chart library
- **Growth data display**: Only shows top 10 days
