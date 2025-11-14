import type { Meta, StoryObj } from "@storybook/react";
import { SystemHealthWidget } from "./system-health-widget";

const meta: Meta<typeof SystemHealthWidget> = {
  title: "Admin/SystemHealthWidget",
  component: SystemHealthWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SystemHealthWidget>;

export const Healthy: Story = {
  args: {
    uptime: 99.9,
    avgResponseTime: 145,
    errorRate: 0.2,
    requestsPerMinute: 1250,
    lastUpdated: new Date(),
  },
};

export const Warning: Story = {
  args: {
    uptime: 99.2,
    avgResponseTime: 350,
    errorRate: 1.5,
    requestsPerMinute: 2800,
    lastUpdated: new Date(),
  },
};

export const Critical: Story = {
  args: {
    uptime: 98.5,
    avgResponseTime: 850,
    errorRate: 3.8,
    requestsPerMinute: 450,
    lastUpdated: new Date(),
  },
};

export const PerfectHealth: Story = {
  args: {
    uptime: 100,
    avgResponseTime: 45,
    errorRate: 0.0,
    requestsPerMinute: 5000,
    lastUpdated: new Date(),
  },
};

export const MixedStatus: Story = {
  args: {
    uptime: 99.8,
    avgResponseTime: 520,
    errorRate: 0.1,
    requestsPerMinute: 1850,
    lastUpdated: new Date(),
  },
};
