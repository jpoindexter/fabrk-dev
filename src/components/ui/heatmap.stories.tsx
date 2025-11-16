import type { Meta, StoryObj } from "@storybook/nextjs";
import { Heatmap } from "./heatmap";

const meta: Meta<typeof Heatmap> = {
  title: "UI/Heatmap",
  component: Heatmap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Heatmap>;

const generateWeeklyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const data = [];

  for (const day of days) {
    for (const hour of hours) {
      data.push({
        x: hour,
        y: day,
        value: Math.floor(Math.random() * 100),
      });
    }
  }
  return data;
};

const generateMonthlyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const weeks = ["W1", "W2", "W3", "W4"];
  const data = [];

  for (const month of months) {
    for (const week of weeks) {
      data.push({
        x: month,
        y: week,
        value: Math.floor(Math.random() * 500),
      });
    }
  }
  return data;
};

export const Default: Story = {
  args: {
    data: generateMonthlyData(),
  },
};

export const WithValues: Story = {
  args: {
    data: generateMonthlyData().slice(0, 24),
    showValues: true,
  },
};

export const LargeCells: Story = {
  args: {
    data: generateMonthlyData().slice(0, 12),
    cellSize: 60,
    gap: 4,
    showValues: true,
  },
};

export const GithubContributions: Story = {
  render: () => {
    const weeks = Array.from({ length: 52 }, (_, i) => `W${i + 1}`);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const data = weeks.flatMap((week) =>
      days.map((day) => ({
        x: week,
        y: day,
        value: Math.floor(Math.random() * 10),
      }))
    );

    return (
      <div className="w-full overflow-auto p-4 rounded-md border border-border bg-card">
        <h3 className="font-semibold mb-4">Contribution Activity</h3>
        <Heatmap
          data={data}
          cellSize={12}
          gap={2}
          colorScale={[
            "hsl(var(--muted))",
            "oklch(85% 0.1 160)",
            "oklch(75% 0.15 160)",
            "oklch(65% 0.20 160)",
            "oklch(55% 0.25 160)",
          ]}
          showLabels={false}
        />
        <p className="text-xs text-muted-foreground mt-2">
          365 contributions in the last year
        </p>
      </div>
    );
  },
};

export const ServerLoad: Story = {
  render: () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const servers = ["Server 1", "Server 2", "Server 3", "Server 4", "Server 5"];
    const data = servers.flatMap((server) =>
      hours.map((hour) => ({
        x: hour,
        y: server,
        value: Math.floor(Math.random() * 100),
      }))
    );

    return (
      <div className="w-full overflow-auto p-4 rounded-md border border-border bg-card">
        <h3 className="font-semibold mb-4">Server Load (24 Hours)</h3>
        <Heatmap data={data} cellSize={32} gap={2} />
      </div>
    );
  },
};

export const SalesHeatmap: Story = {
  render: () => {
    const products = ["Product A", "Product B", "Product C", "Product D"];
    const regions = ["North", "South", "East", "West"];
    const data = products.flatMap((product) =>
      regions.map((region) => ({
        x: region,
        y: product,
        value: Math.floor(Math.random() * 1000),
      }))
    );

    return (
      <div className="w-[500px] p-6 rounded-md border border-border bg-card">
        <h3 className="font-semibold mb-4 text-center">Regional Sales by Product</h3>
        <Heatmap
          data={data}
          cellSize={80}
          gap={4}
          showValues={true}
          colorScale={[
            "hsl(var(--muted))",
            "oklch(80% 0.1 240)",
            "oklch(70% 0.15 240)",
            "oklch(60% 0.20 240)",
          ]}
        />
      </div>
    );
  },
};
