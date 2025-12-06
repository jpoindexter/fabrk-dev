# Admin Monitoring Page Audit

**File**: `src/app/(dashboard)/admin/monitoring/page.tsx`

## Purpose
Error tracking and performance monitoring dashboard.

## Layout Overview
- **Container**: `space-y-6` (24px vertical spacing)
- **Client Component**: Uses `"use client"` with hooks
- **Grids**:
  - Error stats: `grid gap-4 md:grid-cols-2 lg:grid-cols-4`
  - Performance metrics: `grid gap-4 md:grid-cols-2 lg:grid-cols-3`

## Key Components Used
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`
- `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`
- `Badge` from `@/components/ui/badge`
- `Button` from `@/components/ui/button`
- `AlertDialog` components for clear logs confirmation
- Monitoring functions: `getErrorStats`, `getPerformanceStats`, `clearErrorLogs`
- Icons: `AlertTriangle`, `Activity`, `Trash2`
- React: `useState`, `useEffect`, `startTransition`
- `mode` from `@/design-system`
- `cn` from `@/lib/utils`

## Typography Scale
- `text-3xl` - Page title "Monitoring" (note: inconsistent with `text-4xl` on other pages)
- `text-muted-foreground` - Subtitle, icon colors, table cells, empty state
- `text-xs` - Table cells, badge text, error messages
- `text-sm` - Card titles, table component labels, empty state subtitle
- `text-2xl` - Stat values (font-bold), performance metric values (font-bold)
- `text-lg` - Empty state heading
- `font-bold` - Page title (tracking-tight), stat values, empty state heading
- `font-medium` - Card titles, table headings
- `font-semibold` - Stat labels, badge text, performance metric labels, capitalize utility

## Spacing Patterns
- `space-y-6` - Main container (24px)
- `space-y-0` - Stat card headers (0px - uses flex row)
- `gap-4` - All grids (16px)
- `gap-2` - Button icon-text gap (8px)
- `pb-2` - Stat card header bottom padding (8px)
- `p-4` - Performance metric card padding, border padding (16px)
- `mt-4` - Empty state heading top margin (16px)

## Font Weights and Families
- `font-bold` - Page title, stat values
- `font-medium` - Card titles
- `font-semibold` - Stat labels, badges, performance metrics

## Colors Used (Semantic Tokens)
- `text-muted-foreground` - Subtitles, icons, secondary text, table cells
- `text-destructive` - Error icon, clear button text, AlertDialog action button
- `text-warning` - Warning icon
- `text-info` - Info icon
- `text-destructive-foreground` - AlertDialog action button text
- `bg-destructive` - AlertDialog action button background
- `hover:bg-destructive/90` - AlertDialog action button hover
- `border-border` - Table borders

## Hardcoded Values
- `h-4 w-4` - All small icons (16px × 16px)
- `h-8 w-8` - Performance metric icons (32px × 32px)
- `h-12 w-12` - Empty state icon (48px × 48px)
- `h-48` - Empty state card height (192px)
- `max-w-md` - Error message max width (28rem / 448px)

## State Management
```typescript
const [errorStats, setErrorStats] = useState<ReturnType<typeof getErrorStats>>();
const [perfStats, setPerformanceStats] = useState<ReturnType<typeof getPerformanceStats>>();
const [refreshKey, setRefreshKey] = useState(0);
const [clearLogsDialogOpen, setClearLogsDialogOpen] = useState(false);
```

## Data Loading Pattern
Uses `startTransition` for non-urgent updates:
```typescript
useEffect(() => {
  startTransition(() => {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const errors = getErrorStats(since);
    const perf = getPerformanceStats(since);
    // ...
  });
}, [refreshKey]);
```

## Error Stats Display
4 stat cards:
1. Total Errors (24h)
2. Errors (destructive icon)
3. Warnings (warning icon)
4. Info (info icon)

## Performance Metrics
Dynamic grid based on available metrics:
- Metric name (capitalized, underscores replaced)
- Average value in milliseconds
- Activity icon

## Tables
1. **Top Errors**: Most frequent (sorted by count)
2. **Recent Errors**: Last 20 chronological

Badge variants based on type:
- error → default
- warning → accent
- else → secondary

## Helper Function
```typescript
formatDate(date: Date) → string
  // Intl.DateTimeFormat with dateStyle + timeStyle
```

## Empty State
"No errors recorded" with Activity icon and success message

## Clear Logs Flow
1. Click "Clear Logs" button
2. Confirmation dialog
3. On confirm: `clearErrorLogs()` + increment `refreshKey`
4. Re-fetch data

## Design System Integration
- ✅ Uses `mode.radius` for cards, borders, badges
- ✅ Uses `mode.font` for monospace error messages and timestamps
- ✅ Uses `cn()` utility
- ✅ Semantic color tokens with conditional variants

## Inconsistencies
- **Title size**: Uses `text-3xl` instead of `text-4xl`
- **Badge variant mapping**: Hardcoded conditional logic for error types
- **Max-width on errors**: May truncate important error messages
