import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline, SparklineCard, SparklineGroup } from "./sparkline";

const meta: Meta<typeof Sparkline> = {
  title: "UI/Sparkline",
  component: Sparkline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

const upwardTrend = [20, 25, 22, 28, 30, 35, 32, 38, 42, 45];
const downwardTrend = [45, 42, 38, 40, 35, 32, 30, 28, 25, 20];
const volatile = [30, 35, 28, 40, 32, 45, 38, 42, 35, 48];
const steady = [30, 31, 30, 32, 31, 30, 32, 31, 30, 31];

export const Default: Story = {
  args: {
    data: upwardTrend,
    width: 100,
    height: 30,
  },
};

export const WithArea: Story = {
  args: {
    data: upwardTrend,
    width: 120,
    height: 40,
    showArea: true,
  },
};

export const WithDots: Story = {
  args: {
    data: upwardTrend,
    width: 120,
    height: 40,
    showDots: true,
  },
};

export const CustomColor: Story = {
  args: {
    data: upwardTrend,
    width: 120,
    height: 40,
    color: "oklch(70% 0.15 160)",
    showArea: true,
  },
};

export const LargeSize: Story = {
  args: {
    data: volatile,
    width: 200,
    height: 60,
    strokeWidth: 3,
    showArea: true,
  },
};

export const MultipleSparklines: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>
        <p className="text-xs text-muted-foreground mb-1">Upward Trend</p>
        <Sparkline
          data={upwardTrend}
          width={150}
          height={40}
          color="oklch(70% 0.15 160)"
          showArea={true}
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Downward Trend</p>
        <Sparkline
          data={downwardTrend}
          width={150}
          height={40}
          color="oklch(60% 0.20 25)"
          showArea={true}
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Volatile</p>
        <Sparkline
          data={volatile}
          width={150}
          height={40}
          color="oklch(70% 0.15 60)"
          showArea={true}
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">Steady</p>
        <Sparkline
          data={steady}
          width={150}
          height={40}
          color="oklch(70% 0.15 240)"
          showArea={true}
        />
      </div>
    </div>
  ),
};

export const CardVariant: Story = {
  render: () => (
    <SparklineCard
      title="Revenue"
      value="$48,235"
      change={{ value: 12.5, label: "vs last month" }}
      data={upwardTrend}
      sparklineColor="oklch(70% 0.15 160)"
    />
  ),
};

export const CardWithNegativeChange: Story = {
  render: () => (
    <SparklineCard
      title="Active Users"
      value="1,247"
      change={{ value: -8.3, label: "vs last week" }}
      data={downwardTrend}
      sparklineColor="oklch(60% 0.20 25)"
    />
  ),
};

export const DashboardCards: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      <SparklineCard
        title="Total Sales"
        value="$124.5K"
        change={{ value: 15.3 }}
        data={upwardTrend}
        sparklineColor="oklch(70% 0.15 160)"
      />
      <SparklineCard
        title="New Customers"
        value="842"
        change={{ value: 8.7 }}
        data={[20, 22, 25, 28, 32, 35, 38, 40, 42, 45]}
        sparklineColor="oklch(70% 0.15 240)"
      />
      <SparklineCard
        title="Avg Order Value"
        value="$148"
        change={{ value: -3.2 }}
        data={[45, 42, 40, 38, 36, 35, 34, 33, 32, 30]}
        sparklineColor="oklch(60% 0.20 25)"
      />
      <SparklineCard
        title="Conversion Rate"
        value="3.8%"
        change={{ value: 0.4 }}
        data={[30, 32, 31, 33, 35, 36, 37, 38, 39, 40]}
        sparklineColor="oklch(70% 0.15 60)"
      />
    </div>
  ),
};

export const GroupVariant: Story = {
  render: () => (
    <div className="w-[400px]">
      <SparklineGroup
        items={[
          {
            label: "Page Views",
            value: 12453,
            data: upwardTrend,
            color: "oklch(70% 0.15 240)",
          },
          {
            label: "Unique Visitors",
            value: 8234,
            data: volatile,
            color: "oklch(70% 0.15 160)",
          },
          {
            label: "Bounce Rate",
            value: 2.4,
            data: downwardTrend,
            color: "oklch(60% 0.20 25)",
          },
          {
            label: "Avg Session Duration",
            value: 345,
            data: steady,
            color: "oklch(70% 0.15 60)",
          },
        ]}
      />
    </div>
  ),
};

export const MetricsTable: Story = {
  render: () => {
    const metrics = [
      { name: "Revenue", value: "$48.2K", trend: upwardTrend, change: "+12%" },
      { name: "Orders", value: "1,234", trend: volatile, change: "+8%" },
      { name: "Customers", value: "842", trend: upwardTrend, change: "+15%" },
      { name: "Refunds", value: "23", trend: downwardTrend, change: "-5%" },
      { name: "Traffic", value: "45.2K", trend: upwardTrend, change: "+18%" },
    ];

    return (
      <div className="w-[600px] rounded-md border bg-card overflow-hidden">
        <div className="border-b p-4">
          <h3 className="font-semibold">Performance Metrics</h3>
        </div>
        <table className="w-full">
          <thead className="border-b bg-muted">
            <tr>
              <th className="text-left p-3 text-xs font-semibold">Metric</th>
              <th className="text-right p-3 text-xs font-semibold">Value</th>
              <th className="text-right p-3 text-xs font-semibold">Change</th>
              <th className="text-right p-3 text-xs font-semibold">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {metrics.map((metric, index) => (
              <tr key={index} className="hover:bg-accent transition-colors">
                <td className="p-3 text-sm font-medium">{metric.name}</td>
                <td className="p-3 text-sm text-right font-semibold">
                  {metric.value}
                </td>
                <td
                  className={cn(
                    "p-3 text-sm text-right font-semibold",
                    metric.change.startsWith("+")
                      ? "text-success"
                      : "text-destructive"
                  )}
                >
                  {metric.change}
                </td>
                <td className="p-3 text-right">
                  <Sparkline
                    data={metric.trend}
                    width={60}
                    height={24}
                    strokeWidth={2}
                    showArea={true}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

export const CompactMetrics: Story = {
  render: () => (
    <div className="flex gap-2">
      {[
        { label: "CPU", value: "45%", data: [30, 32, 35, 40, 42, 45] },
        { label: "Memory", value: "72%", data: [60, 65, 68, 70, 71, 72] },
        { label: "Disk", value: "28%", data: [25, 26, 27, 27, 28, 28] },
        { label: "Network", value: "15%", data: [10, 12, 14, 13, 14, 15] },
      ].map((metric, index) => (
        <div
          key={index}
          className="rounded-md border bg-card p-3 flex-1"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-muted-foreground">{metric.label}</p>
            <p className="text-sm font-semibold">{metric.value}</p>
          </div>
          <Sparkline
            data={metric.data}
            width={80}
            height={20}
            strokeWidth={2}
            showArea={true}
          />
        </div>
      ))}
    </div>
  ),
};

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
