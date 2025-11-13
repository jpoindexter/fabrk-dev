import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "./pie-chart";
import { useState } from "react";

const meta: Meta<typeof PieChart> = {
  title: "UI/PieChart",
  component: PieChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PieChart>;

const sampleData = [
  { label: "Product A", value: 30 },
  { label: "Product B", value: 25 },
  { label: "Product C", value: 20 },
  { label: "Product D", value: 15 },
  { label: "Product E", value: 10 },
];

const browserData = [
  { label: "Chrome", value: 65 },
  { label: "Safari", value: 18 },
  { label: "Firefox", value: 8 },
  { label: "Edge", value: 5 },
  { label: "Other", value: 4 },
];

const categoryData = [
  { label: "Electronics", value: 42, color: "oklch(70% 0.15 240)" },
  { label: "Clothing", value: 28, color: "oklch(70% 0.15 160)" },
  { label: "Food", value: 18, color: "oklch(70% 0.15 60)" },
  { label: "Home", value: 12, color: "oklch(70% 0.20 340)" },
];

export const Default: Story = {
  args: {
    data: sampleData,
    size: 300,
  },
};

export const WithLabels: Story = {
  args: {
    data: sampleData,
    size: 350,
    showLabels: true,
    showPercentages: true,
  },
};

export const WithoutLegend: Story = {
  args: {
    data: browserData,
    size: 300,
    showLegend: false,
    showLabels: true,
  },
};

export const CustomColors: Story = {
  args: {
    data: categoryData,
    size: 300,
  },
};

export const SmallSize: Story = {
  args: {
    data: sampleData,
    size: 200,
  },
};

export const LargeSize: Story = {
  args: {
    data: browserData,
    size: 500,
    showLabels: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
      <div className="p-4">
        {selected !== null && (
          <div className="mb-4 p-3 border-brutal rounded-brutal bg-card">
            <p className="text-sm font-bold">Selected:</p>
            <p className="text-sm text-muted-foreground">
              {sampleData[selected].label} -{" "}
              {(
                (sampleData[selected].value /
                  sampleData.reduce((sum, item) => sum + item.value, 0)) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        )}
        <PieChart
          data={sampleData}
          size={300}
          onSegmentClick={(item, index) => setSelected(index)}
        />
      </div>
    );
  },
};

export const BrowserUsage: Story = {
  render: () => (
    <div className="w-[500px] rounded-brutal border-brutal bg-card p-6">
      <h3 className="font-bold mb-4 text-center">Browser Market Share</h3>
      <PieChart data={browserData} size={300} showLabels={true} />
      <p className="text-xs text-muted-foreground text-center mt-4">
        Data based on global usage statistics
      </p>
    </div>
  ),
};

export const SalesByCategory: Story = {
  render: () => (
    <div className="w-[500px] rounded-brutal border-brutal bg-card p-6">
      <h3 className="font-bold mb-4 text-center">Sales by Category</h3>
      <PieChart data={categoryData} size={300} showPercentages={true} />
      <div className="mt-4 pt-4 border-t-2 border-brutal">
        <div className="flex justify-between text-sm">
          <span className="font-bold">Total Sales:</span>
          <span>
            $
            {categoryData
              .reduce((sum, item) => sum + item.value, 0)
              .toLocaleString()}
            K
          </span>
        </div>
      </div>
    </div>
  ),
};

export const ProjectAllocation: Story = {
  render: () => {
    const projectData = [
      { label: "Development", value: 45, color: "oklch(70% 0.15 240)" },
      { label: "Design", value: 20, color: "oklch(70% 0.15 160)" },
      { label: "Marketing", value: 18, color: "oklch(70% 0.15 60)" },
      { label: "Support", value: 12, color: "oklch(70% 0.20 340)" },
      { label: "Admin", value: 5, color: "oklch(60% 0.20 25)" },
    ];

    return (
      <div className="w-[500px] rounded-brutal border-brutal bg-card p-6">
        <h3 className="font-bold mb-4 text-center">Team Time Allocation</h3>
        <PieChart data={projectData} size={300} showLabels={true} />
        <div className="mt-4 pt-4 border-t-2 border-brutal space-y-2">
          {projectData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm items-center"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm border-brutal"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </div>
              <span className="font-bold">{item.value}h/week</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const TwoSegments: Story = {
  render: () => {
    const conversionData = [
      { label: "Converted", value: 68, color: "oklch(70% 0.15 160)" },
      { label: "Not Converted", value: 32, color: "hsl(var(--muted))" },
    ];

    return (
      <div className="w-[400px] rounded-brutal border-brutal bg-card p-6">
        <h3 className="font-bold mb-4 text-center">Conversion Rate</h3>
        <PieChart
          data={conversionData}
          size={250}
          showLabels={true}
          showPercentages={true}
        />
        <div className="mt-4 text-center">
          <p className="text-3xl font-black text-primary">68%</p>
          <p className="text-xs text-muted-foreground">Overall Conversion Rate</p>
        </div>
      </div>
    );
  },
};

export const ManySegments: Story = {
  render: () => {
    const countryData = [
      { label: "USA", value: 28 },
      { label: "UK", value: 18 },
      { label: "Canada", value: 14 },
      { label: "Australia", value: 12 },
      { label: "Germany", value: 10 },
      { label: "France", value: 8 },
      { label: "Spain", value: 5 },
      { label: "Italy", value: 3 },
      { label: "Other", value: 2 },
    ];

    return (
      <div className="w-[500px] rounded-brutal border-brutal bg-card p-6">
        <h3 className="font-bold mb-4 text-center">Traffic by Country</h3>
        <PieChart data={countryData} size={350} showPercentages={false} />
      </div>
    );
  },
};
