import type { Meta, StoryObj } from "@storybook/react";
import { RevenueChart } from "./revenue-chart";

const meta: Meta<typeof RevenueChart> = {
  title: "Analytics/RevenueChart",
  component: RevenueChart,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RevenueChart>;

const monthlyData = [
  { period: "Jan", mrr: 12000, arr: 144000 },
  { period: "Feb", mrr: 15000, arr: 180000 },
  { period: "Mar", mrr: 18000, arr: 216000 },
  { period: "Apr", mrr: 22000, arr: 264000 },
  { period: "May", mrr: 28000, arr: 336000 },
  { period: "Jun", mrr: 35000, arr: 420000 },
];

const quarterlyData = [
  { period: "Q1 2024", mrr: 15000, arr: 180000 },
  { period: "Q2 2024", mrr: 28000, arr: 336000 },
  { period: "Q3 2024", mrr: 42000, arr: 504000 },
  { period: "Q4 2024", mrr: 58000, arr: 696000 },
];

const yearlyData = [
  { period: "2021", mrr: 5000, arr: 60000 },
  { period: "2022", mrr: 18000, arr: 216000 },
  { period: "2023", mrr: 35000, arr: 420000 },
  { period: "2024", mrr: 58000, arr: 696000 },
];

export const Default: Story = {
  args: {
    data: monthlyData,
  },
};

export const QuarterlyView: Story = {
  args: {
    data: quarterlyData,
    initialPeriod: "quarter",
  },
};

export const YearlyView: Story = {
  args: {
    data: yearlyData,
    initialPeriod: "year",
  },
};

export const MrrOnly: Story = {
  args: {
    data: monthlyData,
    showArr: false,
  },
};

export const HighGrowth: Story = {
  args: {
    data: [
      { period: "Jan", mrr: 10000, arr: 120000 },
      { period: "Feb", mrr: 15000, arr: 180000 },
      { period: "Mar", mrr: 25000, arr: 300000 },
      { period: "Apr", mrr: 40000, arr: 480000 },
      { period: "May", mrr: 65000, arr: 780000 },
      { period: "Jun", mrr: 100000, arr: 1200000 },
    ],
  },
};

export const Plateau: Story = {
  args: {
    data: [
      { period: "Jan", mrr: 50000, arr: 600000 },
      { period: "Feb", mrr: 51000, arr: 612000 },
      { period: "Mar", mrr: 50500, arr: 606000 },
      { period: "Apr", mrr: 51500, arr: 618000 },
      { period: "May", mrr: 50800, arr: 609600 },
      { period: "Jun", mrr: 51200, arr: 614400 },
    ],
  },
};
