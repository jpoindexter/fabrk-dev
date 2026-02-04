---
title: '8 Chart Components: Data Visualization for Dashboards'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'charts-data-visualization'
description: 'Fabrk includes 8 pre-built chart components for dashboards: bar, line, area, pie, donut, funnel, gauge, and sparkline.'
publishedAt: '2026-01-15T10:00:00.000Z'
---

**Beautiful charts that match your terminal theme.**

---

## Chart Components

Fabrk includes 8 chart types:

```tsx
import { BarChart } from '@/components/charts/bar-chart';
import { LineChart } from '@/components/charts/line-chart';
import { AreaChart } from '@/components/charts/area-chart';
import { PieChart } from '@/components/charts/pie-chart';
import { DonutChart } from '@/components/charts/donut-chart';
import { FunnelChart } from '@/components/charts/funnel-chart';
import { Gauge } from '@/components/charts/gauge';
import { Sparkline } from '@/components/charts/sparkline';
```

---

## Bar Chart

Compare categories:

```tsx
const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 450 },
];

<BarChart
  data={data}
  xKey="name"
  yKey="value"
  title="Monthly Revenue"
/>
```

---

## Line Chart

Show trends over time:

```tsx
const data = [
  { date: '2026-01', users: 100 },
  { date: '2026-02', users: 150 },
  { date: '2026-03', users: 200 },
  { date: '2026-04', users: 280 },
];

<LineChart
  data={data}
  xKey="date"
  yKey="users"
  title="User Growth"
/>
```

---

## Area Chart

Emphasize volume:

```tsx
<AreaChart
  data={revenueData}
  xKey="month"
  yKey="amount"
  title="Revenue Over Time"
  fill="primary"
/>
```

---

## Pie Chart

Show composition:

```tsx
const data = [
  { name: 'Free', value: 400 },
  { name: 'Pro', value: 300 },
  { name: 'Enterprise', value: 100 },
];

<PieChart
  data={data}
  nameKey="name"
  valueKey="value"
  title="Users by Plan"
/>
```

---

## Donut Chart

Pie with a center hole:

```tsx
<DonutChart
  data={planData}
  nameKey="name"
  valueKey="value"
  title="Revenue by Plan"
  centerLabel="$12,450"
  centerSubLabel="MRR"
/>
```

---

## Funnel Chart

Show conversion flow:

```tsx
const data = [
  { stage: 'Visitors', value: 10000 },
  { stage: 'Signups', value: 2000 },
  { stage: 'Active', value: 800 },
  { stage: 'Paid', value: 200 },
];

<FunnelChart
  data={data}
  stageKey="stage"
  valueKey="value"
  title="Conversion Funnel"
/>
```

---

## Gauge

Show progress toward a goal:

```tsx
<Gauge
  value={75}
  max={100}
  title="Goal Progress"
  label="75%"
/>
```

---

## Sparkline

Inline trend indicator:

```tsx
const trend = [10, 15, 12, 18, 22, 19, 25];

<div className="flex items-center gap-2">
  <span>Revenue</span>
  <Sparkline data={trend} />
  <span className="text-success">+15%</span>
</div>
```

---

## Theming

All charts use design tokens:

```tsx
// Charts automatically use theme colors
<LineChart
  data={data}
  colors={{
    line: 'var(--primary)',
    grid: 'var(--border)',
    text: 'var(--muted-foreground)',
  }}
/>
```

Switch themes and charts update automatically.

---

## Common Props

All charts share common props:

| Prop | Type | Description |
|------|------|-------------|
| `data` | array | Chart data |
| `title` | string | Chart title |
| `height` | number | Chart height (px) |
| `loading` | boolean | Show skeleton |
| `className` | string | Additional classes |

---

## Loading States

Charts show skeletons while loading:

```tsx
<BarChart
  data={data}
  loading={isLoading}
  title="Revenue"
/>
```

---

## Empty States

Handle no data gracefully:

```tsx
<LineChart
  data={[]}
  emptyMessage="No data for this period"
  title="User Activity"
/>
```

---

## Responsive Design

Charts resize automatically:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <BarChart data={revenueData} title="Revenue" />
  <LineChart data={userData} title="Users" />
</div>
```

---

## Dashboard Example

Complete dashboard with charts:

```tsx
import { Card } from '@/components/ui/card';
import { BarChart, LineChart, DonutChart, Sparkline } from '@/components/charts';

export function Dashboard({ stats }) {
  return (
    <div className="space-y-6">
      {/* KPI Cards with Sparklines */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-muted-foreground text-xs">[ REVENUE ]</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl">{stats.revenue}</span>
            <Sparkline data={stats.revenueTrend} />
          </div>
        </Card>
        {/* More KPI cards... */}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <LineChart
            data={stats.userGrowth}
            xKey="date"
            yKey="users"
            title="User Growth"
          />
        </Card>
        <Card className="p-4">
          <BarChart
            data={stats.monthlyRevenue}
            xKey="month"
            yKey="amount"
            title="Monthly Revenue"
          />
        </Card>
      </div>

      {/* Composition Charts */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <DonutChart
            data={stats.planDistribution}
            title="Users by Plan"
          />
        </Card>
        <Card className="col-span-2 p-4">
          <FunnelChart
            data={stats.conversionFunnel}
            title="Conversion Funnel"
          />
        </Card>
      </div>
    </div>
  );
}
```

---

## Custom Tooltips

Customize tooltip content:

```tsx
<BarChart
  data={data}
  tooltip={({ name, value }) => (
    <div className="bg-card border border-border p-2 rounded-dynamic">
      <span className="font-mono text-xs">{name}</span>
      <span className="text-primary">${value.toLocaleString()}</span>
    </div>
  )}
/>
```

---

## Animation

Charts animate on load:

```tsx
<LineChart
  data={data}
  animate={true}
  animationDuration={500}
/>
```

Disable for performance if needed.

---

## Best Practices

1. **Choose the right chart** - Bar for comparison, line for trends
2. **Keep it simple** - One message per chart
3. **Use consistent colors** - Design tokens throughout
4. **Add context** - Titles, labels, legends
5. **Handle empty states** - Don't show broken charts

Data visualization, terminal-styled.

