import type { Meta, StoryObj } from "@storybook/react";
import {
  DonutChart,
  MetricDonutChart,
  ProgressDonutChart,
} from "./donut-chart";
import { TrendingUp, TrendingDown } from "lucide-react";

const meta: Meta<typeof DonutChart> = {
  title: "UI/DonutChart",
  component: DonutChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

const sampleData = [
  { label: "Product A", value: 30 },
  { label: "Product B", value: 25 },
  { label: "Product C", value: 20 },
  { label: "Product D", value: 15 },
  { label: "Product E", value: 10 },
];

const revenueData = [
  { label: "Subscriptions", value: 45, color: "oklch(70% 0.15 240)" },
  { label: "One-time Sales", value: 30, color: "oklch(70% 0.15 160)" },
  { label: "Add-ons", value: 15, color: "oklch(70% 0.15 60)" },
  { label: "Other", value: 10, color: "oklch(60% 0.20 25)" },
];

export const Default: Story = {
  args: {
    data: sampleData,
    size: 300,
    thickness: 60,
  },
};

export const ThinDonut: Story = {
  args: {
    data: sampleData,
    size: 300,
    thickness: 30,
  },
};

export const ThickDonut: Story = {
  args: {
    data: sampleData,
    size: 300,
    thickness: 100,
  },
};

export const WithCenterText: Story = {
  args: {
    data: sampleData,
    size: 300,
    thickness: 60,
    centerContent: (
      <div className="text-center">
        <p className="text-3xl font-black">$12.4K</p>
        <p className="text-xs text-muted-foreground">Total Revenue</p>
      </div>
    ),
  },
};

export const MetricVariant: Story = {
  render: () => (
    <MetricDonutChart
      data={revenueData}
      size={300}
      thickness={60}
      metric={{
        value: "$48.2K",
        label: "Total Revenue",
        sublabel: "+12% from last month",
      }}
    />
  ),
};

export const SmallMetric: Story = {
  render: () => (
    <div className="flex gap-4">
      <MetricDonutChart
        data={[
          { label: "Active", value: 78, color: "oklch(70% 0.15 160)" },
          { label: "Inactive", value: 22, color: "hsl(var(--muted))" },
        ]}
        size={180}
        thickness={35}
        metric={{
          value: "78%",
          label: "Active Users",
        }}
        showLegend={false}
      />
      <MetricDonutChart
        data={[
          { label: "Completed", value: 92, color: "oklch(70% 0.15 240)" },
          { label: "Pending", value: 8, color: "hsl(var(--muted))" },
        ]}
        size={180}
        thickness={35}
        metric={{
          value: "92%",
          label: "Tasks Done",
        }}
        showLegend={false}
      />
    </div>
  ),
};

export const ProgressVariant: Story = {
  render: () => (
    <ProgressDonutChart
      value={68}
      size={200}
      thickness={30}
      label="Goal Progress"
    />
  ),
};

export const MultipleProgress: Story = {
  render: () => (
    <div className="flex gap-6">
      <ProgressDonutChart
        value={25}
        size={150}
        thickness={25}
        label="Q1"
        color="oklch(70% 0.15 240)"
      />
      <ProgressDonutChart
        value={58}
        size={150}
        thickness={25}
        label="Q2"
        color="oklch(70% 0.15 160)"
      />
      <ProgressDonutChart
        value={87}
        size={150}
        thickness={25}
        label="Q3"
        color="oklch(70% 0.15 60)"
      />
      <ProgressDonutChart
        value={94}
        size={150}
        thickness={25}
        label="Q4"
        color="oklch(70% 0.20 340)"
      />
    </div>
  ),
};

export const DashboardCard: Story = {
  render: () => (
    <div className="w-[400px] rounded-brutal border-2 border-brutal bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Revenue Breakdown</h3>
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-bold">+12%</span>
        </div>
      </div>
      <MetricDonutChart
        data={revenueData}
        size={250}
        thickness={50}
        metric={{
          value: "$48.2K",
          label: "Total",
          sublabel: "This month",
        }}
      />
      <div className="mt-4 pt-4 border-t-2 border-brutal space-y-2">
        {revenueData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm items-center"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm border-2 border-brutal"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </div>
            <span className="font-bold">
              $
              {((item.value / 100) * 48.2).toFixed(1)}K
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const GoalTracker: Story = {
  render: () => {
    const goals = [
      { label: "Sales Target", current: 8500, target: 10000, color: "oklch(70% 0.15 240)" },
      { label: "New Signups", current: 156, target: 200, color: "oklch(70% 0.15 160)" },
      { label: "Support Tickets", current: 42, target: 50, color: "oklch(70% 0.15 60)" },
    ];

    return (
      <div className="w-[500px] rounded-brutal border-2 border-brutal bg-card p-6">
        <h3 className="font-bold mb-6 text-center">Monthly Goals</h3>
        <div className="flex justify-around">
          {goals.map((goal, index) => (
            <div key={index} className="text-center">
              <ProgressDonutChart
                value={goal.current}
                max={goal.target}
                size={120}
                thickness={20}
                color={goal.color}
              />
              <p className="text-sm font-bold mt-3">{goal.label}</p>
              <p className="text-xs text-muted-foreground">
                {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const UserActivity: Story = {
  render: () => {
    const activityData = [
      { label: "Very Active", value: 28, color: "oklch(70% 0.15 160)" },
      { label: "Active", value: 35, color: "oklch(70% 0.15 240)" },
      { label: "Moderate", value: 22, color: "oklch(70% 0.15 60)" },
      { label: "Inactive", value: 15, color: "hsl(var(--muted))" },
    ];

    return (
      <div className="w-[450px] rounded-brutal border-2 border-brutal bg-card p-6">
        <h3 className="font-bold mb-4 text-center">User Activity Levels</h3>
        <MetricDonutChart
          data={activityData}
          size={280}
          thickness={55}
          metric={{
            value: "1,247",
            label: "Total Users",
            sublabel: "+8% this week",
          }}
        />
      </div>
    );
  },
};

export const StorageUsage: Story = {
  render: () => (
    <div className="w-[400px] rounded-brutal border-2 border-brutal bg-card p-6">
      <h3 className="font-bold mb-4 text-center">Storage Usage</h3>
      <ProgressDonutChart
        value={72.4}
        max={100}
        size={250}
        thickness={40}
        label="Used"
        color="oklch(70% 0.15 240)"
      />
      <div className="mt-4 pt-4 border-t-2 border-brutal">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Used</span>
          <span className="font-bold">72.4 GB</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Available</span>
          <span className="font-bold">27.6 GB</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span>Total</span>
          <span>100 GB</span>
        </div>
      </div>
    </div>
  ),
};

export const TaskCompletion: Story = {
  render: () => {
    const taskData = [
      { label: "Completed", value: 65, color: "oklch(70% 0.15 160)" },
      { label: "In Progress", value: 25, color: "oklch(70% 0.15 240)" },
      { label: "Not Started", value: 10, color: "hsl(var(--muted))" },
    ];

    return (
      <div className="w-[450px] rounded-brutal border-2 border-brutal bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Project Tasks</h3>
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-bold">On Track</span>
          </div>
        </div>
        <MetricDonutChart
          data={taskData}
          size={280}
          thickness={50}
          metric={{
            value: "65%",
            label: "Complete",
            sublabel: "156 of 240 tasks",
          }}
        />
      </div>
    );
  },
};
