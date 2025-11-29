import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { PieChart, Gauge, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Charts & Analytics - Fabrk Docs",
  description: "Data visualization with line, bar, pie, and area charts. Recharts integration for dashboards.",
};

export default function ChartsComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Charts_And_Analytics"
      description="Chart components for visualizing data and analytics."
      overview="6 chart components including donut/pie charts, gauges, line/bar charts, funnel visualizers, stat cards with trends, and progress bars."
      features={[
        { icon: PieChart, title: "Donut", description: "Proportional data display." },
        { icon: Gauge, title: "Gauge", description: "Single value indicators." },
        { icon: TrendingUp, title: "Analytics", description: "Line/bar trend charts." },
        { icon: BarChart3, title: "Funnel", description: "Conversion funnels." },
      ]}
      usage={[
        {
          title: "Donut Chart",
          description: "Display proportional data",
          code: `import { DonutChart } from "@/components/ui/donut-chart";

const data = [
  { name: "Desktop", value: 65, color: "hsl(var(--primary))" },
  { name: "Mobile", value: 25, color: "hsl(var(--secondary))" },
  { name: "Tablet", value: 10, color: "hsl(var(--muted))" },
];

export function DeviceBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic by Device</CardTitle>
      </CardHeader>
      <CardContent>
        <DonutChart data={data} />
      </CardContent>
    </Card>
  );
}`,
          language: "tsx",
        },
        {
          title: "Gauge Chart",
          description: "Display single values like scores",
          code: `import { Gauge } from "@/components/ui/gauge";

export function PerformanceGauge() {
  return (
    <Card>
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
// - Goal tracking`,
          language: "tsx",
        },
        {
          title: "Analytics Chart",
          description: "Line and bar charts for trends",
          code: `import { AnalyticsChart } from "@/components/analytics/analytics-chart";

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
    <Card>
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
}`,
          language: "tsx",
        },
        {
          title: "Funnel Visualizer",
          description: "Conversion funnel charts",
          code: `import { FunnelVisualizer } from "@/components/analytics/funnel-visualizer";

const funnelData = [
  { stage: "Visitors", value: 10000 },
  { stage: "Sign Ups", value: 3000 },
  { stage: "Activated", value: 1500 },
  { stage: "Subscribed", value: 500 },
  { stage: "Retained", value: 400 },
];

export function ConversionFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>User journey from visitor to retention</CardDescription>
      </CardHeader>
      <CardContent>
        <FunnelVisualizer data={funnelData} />
      </CardContent>
    </Card>
  );
}`,
          language: "tsx",
        },
        {
          title: "Stats Dashboard",
          description: "Stat cards with trend indicators",
          code: `import { StatCard } from "@/components/ui/stat-card";
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
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Data Display", href: "/docs/components/data-display" }}
      next={{ title: "Modals", href: "/docs/components/modals" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">DonutChart</code> - Donut/pie chart for proportions</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Gauge</code> - Gauge chart for single values</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">AnalyticsChart</code> - Line/bar charts for trends</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">FunnelVisualizer</code> - Funnel chart for conversions</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">StatCard</code> - Stats with trend indicators</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">Progress</code> - Linear progress indicator</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Chart Colors */}
      <DocsSection title="Chart Color Tokens">
        <DocsCard>
          <p className={docsTypography.body}>Always use CSS variables for chart colors to support theming:</p>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed mt-2">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">hsl(var(--primary))</code></div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">hsl(var(--secondary))</code></div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">hsl(var(--accent))</code></div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">hsl(var(--muted))</code></div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">hsl(var(--destructive))</code></div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/modals">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Modals</h3>
                <p className={docsTypography.body}>Dialogs and overlays</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/data-display">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Data Display</h3>
                <p className={docsTypography.body}>Tables and cards</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
