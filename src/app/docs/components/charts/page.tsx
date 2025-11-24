import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function ChartsComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Charts & Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          Chart components for visualizing data and analytics.
        </p>
      </div>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">DonutChart</code> - Donut/pie chart for proportions</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Gauge</code> - Gauge chart for single values</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">AnalyticsChart</code> - Line/bar charts for trends</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">FunnelVisualizer</code> - Funnel chart for conversions</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">StatCard</code> - Stats with trend indicators</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Progress</code> - Linear progress indicator</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Import Examples</h2>
          <CodeBlock language="typescript" code={`// Donut chart
import { DonutChart } from "@/components/ui/donut-chart";

// Gauge chart
import { Gauge } from "@/components/ui/gauge";

// Analytics charts
import { AnalyticsChart } from "@/components/analytics/analytics-chart";

// Funnel visualization
import { FunnelVisualizer } from "@/components/analytics/funnel-visualizer";

// Stat card with trends
import { StatCard } from "@/components/ui/stat-card";

// Progress bar
import { Progress } from "@/components/ui/progress";`} />
        </CardContent>
      </Card>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">Donut Chart</h3>
          <CodeBlock language="tsx" code={`import { DonutChart } from "@/components/ui/donut-chart";

const data = [
  { name: "Desktop", value: 65, color: "hsl(var(--primary))" },
  { name: "Mobile", value: 25, color: "hsl(var(--secondary))" },
  { name: "Tablet", value: 10, color: "hsl(var(--muted))" },
];

export function DeviceBreakdown() {
  return (
    <Card className="bg-zinc-950">
      <CardHeader>
        <CardTitle>Traffic by Device</CardTitle>
      </CardHeader>
      <CardContent>
        <DonutChart data={data} />
      </CardContent>
    </Card>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Gauge Chart</h3>
          <CodeBlock language="tsx" code={`import { Gauge } from "@/components/ui/gauge";

export function PerformanceGauge() {
  return (
    <Card className="bg-zinc-950">
      <CardHeader>
        <CardTitle>Performance Score</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Gauge
          value={85}
          max={100}
          label="Score"
        />
      </CardContent>
    </Card>
  );
}

// Gauge is great for:
// - Performance scores
// - Completion percentages
// - Health indicators
// - Goal tracking`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Analytics Chart</h3>
          <CodeBlock language="tsx" code={`import { AnalyticsChart } from "@/components/analytics/analytics-chart";

const chartData = [
  { date: "Jan", users: 400, revenue: 2400 },
  { date: "Feb", users: 300, revenue: 1398 },
  { date: "Mar", users: 500, revenue: 9800 },
  { date: "Apr", users: 780, revenue: 3908 },
  { date: "May", users: 890, revenue: 4800 },
  { date: "Jun", users: 1390, revenue: 3800 },
];

export function RevenueChart() {
  return (
    <Card className="bg-zinc-950">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue and user growth</CardDescription>
      </CardHeader>
      <CardContent>
        <AnalyticsChart
          data={chartData}
          xKey="date"
          lines={[
            { key: "users", color: "hsl(var(--primary))" },
            { key: "revenue", color: "hsl(var(--secondary))" },
          ]}
        />
      </CardContent>
    </Card>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Funnel Visualizer</h3>
          <CodeBlock language="tsx" code={`import { FunnelVisualizer } from "@/components/analytics/funnel-visualizer";

const funnelData = [
  { stage: "Visitors", value: 10000 },
  { stage: "Sign Ups", value: 3000 },
  { stage: "Activated", value: 1500 },
  { stage: "Subscribed", value: 500 },
  { stage: "Retained", value: 400 },
];

export function ConversionFunnel() {
  return (
    <Card className="bg-zinc-950">
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>User journey from visitor to retention</CardDescription>
      </CardHeader>
      <CardContent>
        <FunnelVisualizer data={funnelData} />
      </CardContent>
    </Card>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Stats Dashboard</h3>
          <CodeBlock language="tsx" code={`import { StatCard } from "@/components/ui/stat-card";
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";

export function StatsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value="$45,231.89"
        icon={DollarSign}
        trend={{ value: 20.1, isPositive: true }}
        description="vs last month"
      />
      <StatCard
        title="Subscriptions"
        value="+2350"
        icon={Users}
        trend={{ value: 180.1, isPositive: true }}
        description="vs last month"
      />
      <StatCard
        title="Active Users"
        value="+12,234"
        icon={Activity}
        trend={{ value: 19, isPositive: true }}
        description="vs last month"
      />
      <StatCard
        title="Conversion Rate"
        value="3.2%"
        icon={TrendingUp}
        trend={{ value: 4.5, isPositive: false }}
        description="vs last month"
      />
    </div>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Progress with Label</h3>
          <CodeBlock language="tsx" code={`import { Progress } from "@/components/ui/progress";

export function StorageProgress() {
  const used = 7.5;
  const total = 10;
  const percentage = (used / total) * 100;

  return (
    <Card className="bg-zinc-950">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{used} GB used</span>
          <span>{total} GB total</span>
        </div>
        <Progress value={percentage} />
        <p className="text-xs text-muted-foreground">
          {percentage}% of storage used
        </p>
      </CardContent>
    </Card>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Chart Color Tokens</h3>
          <CodeBlock language="typescript" code={`// Always use CSS variables for chart colors to support theming

const chartColors = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  muted: "hsl(var(--muted))",
  destructive: "hsl(var(--destructive))",
  success: "hsl(var(--success))",
};

// This ensures charts look correct in all 6 themes`} />
        </CardContent>
      </Card>
    </div>
  );
}
