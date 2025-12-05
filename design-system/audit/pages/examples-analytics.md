# Examples Analytics Page Audit

**File**: `src/app/(dashboard)/examples/analytics/page.tsx`

## Purpose
Demo analytics dashboard with mock data showing stats, activity, and placeholder chart.

## Layout Overview
- **Container**: `space-y-8 p-8` (32px spacing, 32px padding)
- **Server Component**: Uses `async` with auth check
- **Grids**:
  - Stats: `grid gap-6 sm:grid-cols-2 lg:grid-cols-4`
  - Content sections: `grid gap-6 lg:grid-cols-2`

## Key Components Used
- `Card` from `@/components/ui/card`
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`
- `auth` from `@/lib/auth`
- Icons: `TrendingUp`, `Users`, `DollarSign`, `Activity`, `ShoppingCart`, `ArrowUpRight`, `ArrowDownRight`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale
- `text-foreground` - Explicit primary text color throughout
- `text-muted-foreground` - Subtitle, stat labels, activity details, chart note
- `text-muted-foreground/80` - Note secondary text (reduced opacity)
- `text-3xl` - Page title, stat values
- `text-xl` - Section headings
- `text-sm` - Subtitle, stat labels, activity text, links, note text, Select trigger, badge text
- `text-xs` - Activity timestamps, top pages views, note code, Select items
- `font-bold` - Page title (tracking-tight), stat values
- `font-semibold` - Activity actions, page paths, change percentages, links, note highlight, Select text

## Spacing Patterns
- `space-y-8` - Main page container (32px)
- `space-y-4` - Activity list, top pages list (16px)
- `gap-6` - Stats grid, content grid (24px)
- `gap-2` - Time range select, icon-percentage gap (8px)
- `gap-1` - Icon-percentage gap (4px)
- `p-8` - Page padding (32px)
- `p-6` - Card padding (24px)
- `p-4` - Activity items, top pages items, note padding, section padding (16px)
- `py-2` - Select trigger vertical padding (8px)
- `px-1 py-0.5` - Note code padding (4px horizontal, 2px vertical)
- `pb-4` - Section header bottom padding (16px)
- `mt-2` - Subtitle top margin (8px)
- `mt-1` - Stat label top margin (4px)
- `mt-4` - Icon top margin (16px)
- `mb-2` - Chart icon bottom margin (8px)
- `mb-4` - Chart description bottom margin (16px)

## Font Weights and Families
- `font-bold` - Page title, stat values
- `font-semibold` - Activity, pages, change %, links, note, Select

## Colors Used (Semantic Tokens)
- `text-foreground` - Primary text (explicitly set)
- `text-muted-foreground` - Secondary text, icons, labels
- `text-primary` - "View All" links
- `text-primary/50` - Chart placeholder icon (50% opacity)
- `text-success` - Positive change indicators
- `text-destructive` - Negative change indicators
- `bg-card` - Card backgrounds
- `bg-muted` - Activity/page items, chart placeholder, note code
- `bg-primary/10` - Stat icon containers
- `bg-primary/5` - Note background
- `border-border` - All borders (cards, activity items, chart, Select)
- `border-primary` - Note border (2px)
- `hover:underline` - Link hover states

## Hardcoded Values
- `h-12 w-12` - Stat card icons (48px × 48px)
- `h-6 w-6` - Stat icons (24px × 24px)
- `h-4 w-4` - Change indicator icons (16px × 16px)
- `h-64` - Chart placeholder height (256px)
- `w-[140px]` - Select trigger width (140px)

## Mock Data Structure
```typescript
const mockAnalytics = {
  stats: [
    { label, value, change, trend: "up" | "down", icon: LucideIcon }
  ],
  recentActivity: [
    { action, user, time }
  ],
  topPages: [
    { path, views, change }
  ]
}
```

## Stat Cards Pattern
Each stat card:
- Icon container (primary/10 background)
- Icon (primary color)
- Change indicator (success/destructive with arrow icon)
- Label (muted)
- Value (bold, 3xl)

## Change Indicator Logic
```typescript
const isPositive = stat.trend === "up";
// Color: isPositive ? text-success : text-destructive
// Icon: isPositive ? ArrowUpRight : ArrowDownRight
```

## Recent Activity Pattern
Card with bordered list items:
- Action (bold) + user (muted)
- Timestamp (muted, xs)

## Top Pages Pattern
Card with bordered list items:
- Path (bold) + views (muted)
- Change percentage (success/destructive based on +/-)

## Chart Placeholder
Dashed border card with:
- TrendingUp icon (primary/50)
- Instructions text
- Note about integrating chart libraries

## Time Range Select
Select component with:
- Options: Last 7 days, 30 days, 90 days, All time
- Styled with border, py-2, font-semibold
- Uses `mode.radius`

## Implementation Note
Final card with primary border explaining demo data and Recharts installation

## Metadata
Static export:
- Title: "Analytics - Fabrk Dashboard"
- Description: "View your SaaS analytics and metrics"

## Design System Integration
- ✅ Uses `mode.radius` for cards, Select, activity items, chart, note
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens throughout
- ✅ Consistent 8-point spacing grid

## Inconsistencies
- **Explicit text-foreground**: Most pages don't explicitly set
- **Template literals**: Uses template literals for conditional classes:
  ```typescript
  className={`flex items-center gap-1 ${isPositive ? "..." : "..."}`}
  ```
- **Change calculation**: Assumes + prefix means positive (string-based, not numeric)
- **No data validation**: Mock data structure not type-checked
