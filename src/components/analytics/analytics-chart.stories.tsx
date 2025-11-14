import type { Meta, StoryObj } from "@storybook/react";
import { AnalyticsChart } from "./analytics-chart";

const meta: Meta<typeof AnalyticsChart> = {
  title: "Analytics/AnalyticsChart",
  component: AnalyticsChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnalyticsChart>;

const lineData = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 2000, profit: 9800 },
  { month: "Apr", revenue: 2780, profit: 3908 },
  { month: "May", revenue: 1890, profit: 4800 },
  { month: "Jun", revenue: 2390, profit: 3800 },
];

const barData = [
  { name: "Mon", users: 40 },
  { name: "Tue", users: 30 },
  { name: "Wed", users: 50 },
  { name: "Thu", users: 45 },
  { name: "Fri", users: 60 },
  { name: "Sat", users: 35 },
  { name: "Sun", users: 25 },
];

const areaData = [
  { time: "00:00", visitors: 120 },
  { time: "04:00", visitors: 80 },
  { time: "08:00", visitors: 200 },
  { time: "12:00", visitors: 350 },
  { time: "16:00", visitors: 280 },
  { time: "20:00", visitors: 190 },
];

const pieData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 200 },
  { name: "Other", value: 100 },
];

export const LineChart: Story = {
  args: {
    type: "line",
    data: lineData,
    xKey: "month",
    yKeys: ["revenue", "profit"],
    title: "Revenue & Profit Trends",
    description: "Monthly comparison of revenue and profit",
  },
};

export const BarChart: Story = {
  args: {
    type: "bar",
    data: barData,
    xKey: "name",
    yKeys: ["users"],
    title: "Weekly User Activity",
    description: "Active users by day of week",
  },
};

export const AreaChart: Story = {
  args: {
    type: "area",
    data: areaData,
    xKey: "time",
    yKeys: ["visitors"],
    title: "24-Hour Traffic Pattern",
    description: "Website visitors throughout the day",
  },
};

export const PieChart: Story = {
  args: {
    type: "pie",
    data: pieData,
    yKeys: ["value"],
    title: "Device Distribution",
    description: "Traffic by device type",
  },
};

export const MultiLineChart: Story = {
  args: {
    type: "line",
    data: [
      { month: "Jan", users: 4000, sessions: 2400, pageviews: 8000 },
      { month: "Feb", users: 3000, sessions: 1398, pageviews: 6000 },
      { month: "Mar", users: 2000, sessions: 9800, pageviews: 12000 },
      { month: "Apr", users: 2780, sessions: 3908, pageviews: 9500 },
      { month: "May", users: 1890, sessions: 4800, pageviews: 7800 },
      { month: "Jun", users: 2390, sessions: 3800, pageviews: 8200 },
    ],
    xKey: "month",
    yKeys: ["users", "sessions", "pageviews"],
    title: "Engagement Metrics",
    description: "Users, sessions, and pageviews over time",
  },
};

export const WithoutGrid: Story = {
  args: {
    type: "bar",
    data: barData,
    xKey: "name",
    yKeys: ["users"],
    title: "Clean Bar Chart",
    showGrid: false,
  },
};

export const WithoutLegend: Story = {
  args: {
    type: "line",
    data: lineData,
    xKey: "month",
    yKeys: ["revenue"],
    title: "Simple Line Chart",
    showLegend: false,
  },
};

export const CustomHeight: Story = {
  args: {
    type: "area",
    data: areaData,
    xKey: "time",
    yKeys: ["visitors"],
    title: "Tall Chart",
    height: 500,
  },
};
