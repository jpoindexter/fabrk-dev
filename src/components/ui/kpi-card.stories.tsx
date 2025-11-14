/**
 * ✅ FABRK COMPONENT
 * KPI Card Stories - Key Performance Indicator display cards
 *
 * @see KpiCard component documentation
 */

import { KpiCard } from "@/components/ui/kpi-card";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof KpiCard> = {
  title: "UI/Data Display/KpiCard",
  component: KpiCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    trend: {
      control: "select",
      options: ["up", "down"],
    },
    loading: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof KpiCard>;

/**
 * Default KPI card
 */
export const Default: Story = {
  args: {
    title: "Total Revenue",
    value: "$45,231",
    change: 12.5,
    trend: "up",
  },
};

/**
 * Revenue metric
 */
export const Revenue: Story = {
  args: {
    title: "Revenue",
    value: "$54,239",
    change: 12,
    trend: "up",
    description: "vs. last month",
  },
};

/**
 * Users metric
 */
export const Users: Story = {
  args: {
    title: "Active Users",
    value: "2,543",
    change: 8.2,
    trend: "up",
    description: "+201 from last week",
  },
};

/**
 * Orders metric
 */
export const Orders: Story = {
  args: {
    title: "Total Orders",
    value: "1,234",
    change: 15.3,
    trend: "up",
    description: "All time orders",
  },
};

/**
 * Conversion rate
 */
export const ConversionRate: Story = {
  args: {
    title: "Conversion Rate",
    value: "3.24%",
    change: 2.1,
    trend: "up",
    description: "Based on 10,453 visitors",
  },
};

/**
 * Decreasing trend
 */
export const DecreasingTrend: Story = {
  args: {
    title: "Bounce Rate",
    value: "42.3%",
    change: 5.2,
    trend: "down",
    description: "Lower is better",
  },
};

/**
 * Negative performance
 */
export const NegativePerformance: Story = {
  args: {
    title: "Cart Abandonment",
    value: "68.5%",
    change: 3.7,
    trend: "up",
    description: "Increased from last month",
  },
};

/**
 * Large number
 */
export const LargeNumber: Story = {
  args: {
    title: "Total Views",
    value: "1.2M",
    change: 23.4,
    trend: "up",
    description: "Last 30 days",
  },
};

/**
 * Small percentage
 */
export const SmallPercentage: Story = {
  args: {
    title: "Error Rate",
    value: "0.03%",
    change: 0.01,
    trend: "down",
    description: "System-wide errors",
  },
};

/**
 * No change indicator
 */
export const NoChange: Story = {
  args: {
    title: "Average Rating",
    value: "4.8",
    change: 0,
    description: "Out of 5 stars",
  },
};

/**
 * Currency format
 */
export const Currency: Story = {
  args: {
    title: "Average Order Value",
    value: "$127.50",
    change: 8.7,
    trend: "up",
    description: "Per customer",
  },
};

/**
 * Time metric
 */
export const TimeMetric: Story = {
  args: {
    title: "Avg Response Time",
    value: "1.2s",
    change: 15.2,
    trend: "down",
    description: "Faster than last week",
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
};

/**
 * Error state
 */
export const Error: Story = {
  args: {
    error: true,
  },
};

/**
 * Without description
 */
export const NoDescription: Story = {
  args: {
    title: "Total Sales",
    value: "$89,432",
    change: 18.9,
    trend: "up",
  },
};

/**
 * Dashboard grid
 */
export const DashboardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="rounded-lg border">
        <KpiCard
          title="Revenue"
          value="$54.2K"
          change={12}
          trend="up"
          description="vs. last month"
        />
      </div>
      <div className="rounded-lg border">
        <KpiCard
          title="Orders"
          value="1,234"
          change={8.5}
          trend="up"
          description="This month"
        />
      </div>
      <div className="rounded-lg border">
        <KpiCard
          title="Customers"
          value="2,543"
          change={5.2}
          trend="up"
          description="Active users"
        />
      </div>
      <div className="rounded-lg border">
        <KpiCard
          title="Conversion"
          value="3.24%"
          change={2.1}
          trend="down"
          description="Site-wide"
        />
      </div>
    </div>
  ),
};

/**
 * Sales dashboard
 */
export const SalesDashboard: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <h2 className="text-2xl font-bold">Sales Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="Total Revenue"
            value="$125,430"
            change={15.2}
            trend="up"
            description="Last 30 days"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="New Customers"
            value="342"
            change={23.1}
            trend="up"
            description="This month"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="Avg Order Value"
            value="$156.20"
            change={8.4}
            trend="up"
            description="Per transaction"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Marketing metrics
 */
export const MarketingMetrics: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <h2 className="text-2xl font-bold">Marketing Performance</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="Website Traffic"
            value="124.5K"
            change={18.3}
            trend="up"
            description="Monthly visitors"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="Email CTR"
            value="12.4%"
            change={3.2}
            trend="up"
            description="Click-through rate"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="Social Engagement"
            value="8.2K"
            change={5.7}
            trend="down"
            description="Total interactions"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="Ad Spend ROI"
            value="4.2x"
            change={12.8}
            trend="up"
            description="Return on investment"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * System health
 */
export const SystemHealth: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-4">
      <h2 className="text-2xl font-bold">System Health</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="Uptime"
            value="99.98%"
            change={0.02}
            trend="up"
            description="Last 30 days"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="Response Time"
            value="145ms"
            change={8.3}
            trend="down"
            description="Average latency"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard
            title="Error Rate"
            value="0.02%"
            change={0.01}
            trend="down"
            description="System-wide"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * E-commerce metrics
 */
export const EcommerceMetrics: Story = {
  render: () => (
    <div className="w-full max-w-5xl space-y-4">
      <h2 className="text-2xl font-bold">E-commerce Overview</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-lg border bg-card">
          <KpiCard title="Revenue" value="$89.4K" change={12.5} trend="up" />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard title="Orders" value="1,234" change={8.2} trend="up" />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard title="AOV" value="$72.45" change={5.3} trend="up" />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard title="Conversion" value="3.24%" change={2.1} trend="down" />
        </div>
        <div className="rounded-lg border bg-card">
          <KpiCard title="Cart Abandon" value="68.5%" change={4.2} trend="up" />
        </div>
      </div>
    </div>
  ),
};
