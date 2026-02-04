---
title: 'Building Dashboards: Patterns and Components'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'building-dashboards-patterns'
description: 'How to build effective SaaS dashboards with Fabrk. KPI cards, data tables, charts, and layout patterns.'
publishedAt: '2026-01-11T10:00:00.000Z'
---

**Dashboard patterns that work.**

---

## Dashboard Anatomy

Effective dashboards have clear structure:

```
┌─────────────────────────────────────┐
│  Header (title, filters, actions)   │
├─────────────────────────────────────┤
│  KPI Cards (4-6 key metrics)        │
├─────────────────────────────────────┤
│  Charts (2-4 visualizations)        │
├─────────────────────────────────────┤
│  Data Table (recent activity)       │
└─────────────────────────────────────┘
```

---

## KPI Cards

Show key metrics at a glance:

```tsx
import { Card } from '@/components/ui/card';
import { Sparkline } from '@/components/charts/sparkline';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  trend: number[];
}

export function KPICard({ label, value, change, trend }: KPICardProps) {
  return (
    <Card className={cn('p-4', mode.radius)}>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground font-mono text-xs uppercase">
          [ {label} ]
        </span>
        <Sparkline data={trend} className="w-16" />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold">
          {value}
        </span>
        <span className={cn(
          'font-mono text-xs',
          change > 0 ? 'text-success' : 'text-destructive'
        )}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
    </Card>
  );
}
```

---

## KPI Grid

Arrange KPIs in a responsive grid:

```tsx
export function KPIGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPICard
        label="Revenue"
        value="$12,450"
        change={12}
        trend={stats.revenueTrend}
      />
      <KPICard
        label="Users"
        value="1,247"
        change={8}
        trend={stats.userTrend}
      />
      <KPICard
        label="Conversion"
        value="3.2%"
        change={-2}
        trend={stats.conversionTrend}
      />
      <KPICard
        label="Churn"
        value="1.8%"
        change={-5}
        trend={stats.churnTrend}
      />
    </div>
  );
}
```

---

## Chart Section

Organize charts logically:

```tsx
export function ChartSection({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className={cn('p-4', mode.radius)}>
        <div className="border-b border-border pb-2 mb-4">
          <span className="font-mono text-xs text-muted-foreground">
            [ REVENUE TREND ]
          </span>
        </div>
        <LineChart
          data={data.revenue}
          xKey="date"
          yKey="amount"
          height={200}
        />
      </Card>

      <Card className={cn('p-4', mode.radius)}>
        <div className="border-b border-border pb-2 mb-4">
          <span className="font-mono text-xs text-muted-foreground">
            [ USER GROWTH ]
          </span>
        </div>
        <BarChart
          data={data.users}
          xKey="month"
          yKey="count"
          height={200}
        />
      </Card>
    </div>
  );
}
```

---

## Activity Table

Show recent activity:

```tsx
export function ActivityTable({ activities }) {
  return (
    <Card className={cn('overflow-hidden', mode.radius)}>
      <div className="border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          [ RECENT ACTIVITY ]
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-mono text-xs">
                {activity.event}
              </TableCell>
              <TableCell className="font-mono text-xs">
                {activity.user}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {formatRelativeTime(activity.timestamp)}
              </TableCell>
              <TableCell>
                <Badge variant={activity.status === 'success' ? 'default' : 'destructive'}>
                  {activity.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

## Dashboard Header

Include title, filters, and actions:

```tsx
export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="font-mono text-2xl font-semibold">
          DASHBOARD
        </h1>
        <p className="text-muted-foreground text-xs font-mono">
          Overview of your business metrics
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Select defaultValue="7d">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">> EXPORT</Button>
      </div>
    </div>
  );
}
```

---

## Complete Dashboard

Put it all together:

```tsx
export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6 p-6">
      <DashboardHeader />
      <KPIGrid stats={stats.kpis} />
      <ChartSection data={stats.charts} />
      <ActivityTable activities={stats.activities} />
    </div>
  );
}
```

---

## Loading States

Show skeletons while loading:

```tsx
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* KPI Skeletons */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>

      {/* Chart Skeletons */}
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>

      {/* Table Skeleton */}
      <Skeleton className="h-96" />
    </div>
  );
}
```

---

## Empty States

Handle no data gracefully:

```tsx
export function EmptyDashboard() {
  return (
    <Card className={cn('p-8 text-center', mode.radius)}>
      <div className="text-muted-foreground font-mono">
        <span className="text-4xl">[ ]</span>
        <p className="mt-4">No data yet</p>
        <p className="text-xs">
          Start using your app to see metrics here
        </p>
      </div>
      <Button className="mt-4">> GET STARTED</Button>
    </Card>
  );
}
```

---

## Responsive Design

Dashboards adapt to screen size:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Cards stack on mobile, grid on larger screens */}
</div>
```

---

## Data Fetching

Server-side for initial load:

```tsx
// app/(platform)/dashboard/page.tsx
export default async function DashboardPage() {
  const stats = await prisma.stats.findFirst({
    where: { organizationId: currentOrg.id },
  });

  return <Dashboard stats={stats} />;
}
```

Client-side for real-time:

```tsx
// Real-time updates
const { data: stats, mutate } = useSWR('/api/stats', fetcher, {
  refreshInterval: 30000, // 30 seconds
});
```

---

## Best Practices

1. **Lead with KPIs** - Most important metrics first
2. **Use appropriate charts** - Line for trends, bar for comparison
3. **Keep it scannable** - Users should understand at a glance
4. **Handle states** - Loading, empty, error
5. **Make it actionable** - Link to detailed views

Dashboards that inform.

