import type { Meta, StoryObj } from "@storybook/nextjs";
import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { AdminMetricsCard } from "./admin-metrics-card";

const meta: Meta<typeof AdminMetricsCard> = {
  title: "Admin/AdminMetricsCard",
  component: AdminMetricsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AdminMetricsCard>;

export const Default: Story = {
  args: {
    title: "Total Users",
    value: 1234,
    change: 12.5,
    icon: <Users className="h-6 w-6" />,
  },
};

export const Revenue: Story = {
  args: {
    title: "Monthly Revenue",
    value: "$45,231",
    change: 8.3,
    variant: "primary",
    icon: <DollarSign className="h-6 w-6" />,
  },
};

export const NegativeChange: Story = {
  args: {
    title: "Active Sessions",
    value: 892,
    change: -5.2,
    variant: "danger",
    icon: <TrendingUp className="h-6 w-6" />,
  },
};

export const NoChange: Story = {
  args: {
    title: "Orders",
    value: 456,
    change: 0,
    icon: <ShoppingCart className="h-6 w-6" />,
  },
};

export const WithoutTrend: Story = {
  args: {
    title: "Total Products",
    value: 789,
    icon: <ShoppingCart className="h-6 w-6" />,
  },
};

export const Loading: Story = {
  args: {
    title: "Loading Metric",
    value: 0,
    loading: true,
    icon: <Users className="h-6 w-6" />,
  },
};

export const Warning: Story = {
  args: {
    title: "Pending Reviews",
    value: 23,
    change: 45.8,
    variant: "warning",
    changeLabel: "needs attention",
    icon: <Users className="h-6 w-6" />,
  },
};

export const Success: Story = {
  args: {
    title: "Completed Tasks",
    value: "98%",
    change: 15.2,
    variant: "success",
    icon: <TrendingUp className="h-6 w-6" />,
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <AdminMetricsCard
        title="Total Users"
        value={1234}
        change={12.5}
        icon={<Users className="h-6 w-6" />}
      />
      <AdminMetricsCard
        title="Revenue"
        value="$45,231"
        change={8.3}
        variant="primary"
        icon={<DollarSign className="h-6 w-6" />}
      />
      <AdminMetricsCard
        title="Orders"
        value={892}
        change={-5.2}
        variant="danger"
        icon={<ShoppingCart className="h-6 w-6" />}
      />
      <AdminMetricsCard
        title="Growth Rate"
        value="23%"
        change={3.1}
        variant="success"
        icon={<TrendingUp className="h-6 w-6" />}
      />
    </div>
  ),
};
