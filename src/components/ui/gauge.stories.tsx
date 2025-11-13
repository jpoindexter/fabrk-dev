import type { Meta, StoryObj } from "@storybook/react";
import { Gauge, ScoreGauge } from "./gauge";

const meta: Meta<typeof Gauge> = {
  title: "UI/Gauge",
  component: Gauge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Gauge>;

export const Default: Story = {
  args: {
    value: 65,
    size: 200,
  },
};

export const WithLabel: Story = {
  args: {
    value: 78,
    label: "CPU Usage",
    unit: "%",
    size: 200,
  },
};

export const WithMinMax: Story = {
  args: {
    value: 45,
    min: 0,
    max: 100,
    showMinMax: true,
    label: "Temperature",
    unit: "°C",
    size: 220,
  },
};

export const CustomColors: Story = {
  args: {
    value: 82,
    color: "oklch(70% 0.15 160)",
    backgroundColor: "hsl(var(--muted))",
    label: "Success Rate",
    unit: "%",
    size: 200,
  },
};

export const SmallGauge: Story = {
  args: {
    value: 42,
    size: 120,
    thickness: 12,
    label: "Speed",
    unit: "km/h",
  },
};

export const LargeGauge: Story = {
  args: {
    value: 88,
    size: 300,
    thickness: 30,
    label: "Performance Score",
    showMinMax: true,
  },
};

export const HalfCircle: Story = {
  args: {
    value: 65,
    startAngle: -180,
    endAngle: 0,
    size: 250,
    label: "Speedometer",
    unit: "mph",
    showMinMax: true,
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
    startAngle: -225,
    endAngle: 45,
    size: 220,
    label: "Progress",
    unit: "%",
    showMinMax: true,
  },
};

export const SegmentedGauge: Story = {
  args: {
    value: 65,
    max: 100,
    size: 220,
    label: "Overall Score",
    segments: [
      { value: 25, color: "oklch(60% 0.20 25)", label: "Poor" },
      { value: 25, color: "oklch(70% 0.15 30)", label: "Fair" },
      { value: 25, color: "oklch(70% 0.15 60)", label: "Good" },
      { value: 25, color: "oklch(70% 0.15 160)", label: "Excellent" },
    ],
  },
};

export const ScoreVariant: Story = {
  render: () => (
    <div className="flex gap-8">
      <ScoreGauge score={45} label="Poor" />
      <ScoreGauge score={65} label="Fair" />
      <ScoreGauge score={82} label="Good" />
      <ScoreGauge score={95} label="Excellent" />
    </div>
  ),
};

export const DashboardMetrics: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-[600px]">
      <div className="rounded-brutal border-2 border-brutal bg-card p-4">
        <h3 className="font-bold text-center mb-2">CPU Usage</h3>
        <Gauge
          value={68}
          size={180}
          thickness={18}
          color="oklch(70% 0.15 240)"
          label="Current"
          unit="%"
        />
        <div className="mt-3 pt-3 border-t-2 border-brutal flex justify-between text-xs">
          <span className="text-muted-foreground">Avg: 52%</span>
          <span className="text-muted-foreground">Max: 95%</span>
        </div>
      </div>

      <div className="rounded-brutal border-2 border-brutal bg-card p-4">
        <h3 className="font-bold text-center mb-2">Memory</h3>
        <Gauge
          value={72}
          size={180}
          thickness={18}
          color="oklch(70% 0.15 160)"
          label="8.6 GB"
          unit=" / 12 GB"
        />
        <div className="mt-3 pt-3 border-t-2 border-brutal flex justify-between text-xs">
          <span className="text-muted-foreground">Available: 3.4 GB</span>
        </div>
      </div>

      <div className="rounded-brutal border-2 border-brutal bg-card p-4">
        <h3 className="font-bold text-center mb-2">Disk I/O</h3>
        <Gauge
          value={34}
          size={180}
          thickness={18}
          color="oklch(70% 0.15 60)"
          label="Read/Write"
          unit=" MB/s"
        />
        <div className="mt-3 pt-3 border-t-2 border-brutal flex justify-between text-xs">
          <span className="text-muted-foreground">Read: 28 MB/s</span>
          <span className="text-muted-foreground">Write: 6 MB/s</span>
        </div>
      </div>

      <div className="rounded-brutal border-2 border-brutal bg-card p-4">
        <h3 className="font-bold text-center mb-2">Network</h3>
        <Gauge
          value={15}
          size={180}
          thickness={18}
          color="oklch(70% 0.20 340)"
          label="Bandwidth"
          unit=" Mbps"
        />
        <div className="mt-3 pt-3 border-t-2 border-brutal flex justify-between text-xs">
          <span className="text-muted-foreground">Down: 12 Mbps</span>
          <span className="text-muted-foreground">Up: 3 Mbps</span>
        </div>
      </div>
    </div>
  ),
};

export const SpeedometerStyle: Story = {
  render: () => (
    <div className="w-[400px] rounded-brutal border-2 border-brutal bg-card p-6">
      <h3 className="font-bold text-center mb-4">Vehicle Speed</h3>
      <Gauge
        value={85}
        max={200}
        size={300}
        thickness={25}
        startAngle={-135}
        endAngle={135}
        color="oklch(70% 0.15 240)"
        label="Current Speed"
        unit=" km/h"
        showMinMax={true}
      />
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Avg Speed</p>
          <p className="text-sm font-bold">72 km/h</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Max Speed</p>
          <p className="text-sm font-bold">142 km/h</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Trip Time</p>
          <p className="text-sm font-bold">2h 15m</p>
        </div>
      </div>
    </div>
  ),
};

export const PerformanceScore: Story = {
  render: () => (
    <div className="w-[450px] rounded-brutal border-2 border-brutal bg-card p-6">
      <h3 className="font-bold text-center mb-4">Website Performance</h3>
      <Gauge
        value={88}
        size={250}
        thickness={22}
        color="oklch(70% 0.15 160)"
        label="Lighthouse Score"
        segments={[
          { value: 50, color: "oklch(60% 0.20 25)" },
          { value: 40, color: "oklch(70% 0.15 60)" },
          { value: 10, color: "oklch(70% 0.15 160)" },
        ]}
      />
      <div className="mt-4 space-y-2">
        {[
          { label: "Performance", value: 92, color: "oklch(70% 0.15 160)" },
          { label: "Accessibility", value: 88, color: "oklch(70% 0.15 240)" },
          { label: "Best Practices", value: 84, color: "oklch(70% 0.15 60)" },
          { label: "SEO", value: 90, color: "oklch(70% 0.20 340)" },
        ].map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-brutal border-2 border-brutal"
          >
            <span className="text-sm font-medium">{metric.label}</span>
            <span className="text-sm font-bold" style={{ color: metric.color }}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BatteryLevel: Story = {
  render: () => (
    <div className="w-[350px] rounded-brutal border-2 border-brutal bg-card p-6">
      <h3 className="font-bold text-center mb-4">Battery Status</h3>
      <Gauge
        value={42}
        size={200}
        thickness={20}
        startAngle={-90}
        endAngle={270}
        color="oklch(70% 0.15 60)"
        label="Remaining"
        unit="%"
        showMinMax={true}
      />
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Time Left</p>
          <p className="text-sm font-bold">3h 24m</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Health</p>
          <p className="text-sm font-bold">Good</p>
        </div>
      </div>
    </div>
  ),
};

export const ServerLoad: Story = {
  render: () => (
    <div className="w-[500px] rounded-brutal border-2 border-brutal bg-card p-6">
      <h3 className="font-bold text-center mb-6">Server Load Distribution</h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Server 1", value: 45, color: "oklch(70% 0.15 240)" },
          { label: "Server 2", value: 72, color: "oklch(70% 0.15 160)" },
          { label: "Server 3", value: 28, color: "oklch(70% 0.15 60)" },
        ].map((server, index) => (
          <div key={index} className="text-center">
            <Gauge
              value={server.value}
              size={140}
              thickness={16}
              color={server.color}
              label={server.label}
              unit="%"
            />
          </div>
        ))}
      </div>
    </div>
  ),
};
