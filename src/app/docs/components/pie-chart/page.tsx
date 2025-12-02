"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { PieChart, PieChartDataItem } from "@/components/ui/pie-chart";

export default function PieChartPage() {
  const sampleData: PieChartDataItem[] = [
    { label: "React", value: 45 },
    { label: "TypeScript", value: 30 },
    { label: "Node.js", value: 15 },
    { label: "PostgreSQL", value: 10 },
  ];

  const revenueData: PieChartDataItem[] = [
    { label: "Subscriptions", value: 65 },
    { label: "One-time Sales", value: 25 },
    { label: "Consulting", value: 10 },
  ];

  const trafficData: PieChartDataItem[] = [
    { label: "Direct", value: 40 },
    { label: "Search", value: 30 },
    { label: "Social", value: 20 },
    { label: "Referral", value: 10 },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.42]"
      category="Components"
      title="Pie Chart"
      description="Interactive pie chart visualization component with legend, hover effects, and donut variant support."
      importCode={`import { PieChart, PieChartDataItem } from "@/components/ui/pie-chart";`}
      mainPreview={{
        preview: <PieChart data={sampleData} />,
        code: `const data: PieChartDataItem[] = [
  { label: "React", value: 45 },
  { label: "TypeScript", value: 30 },
  { label: "Node.js", value: 15 },
  { label: "PostgreSQL", value: 10 },
];

<PieChart data={data} />`,
      }}
      variants={[
        {
          title: "Donut Chart",
          description: "Hollow center variant for modern look",
          preview: <PieChart data={revenueData} innerRadius={60} />,
          code: `<PieChart
  data={data}
  innerRadius={60}
/>`,
        },
        {
          title: "With Labels on Segments",
          description: "Display labels directly on pie segments",
          preview: (
            <PieChart
              data={revenueData}
              showLabels={true}
              showLegend={false}
            />
          ),
          code: `<PieChart
  data={data}
  showLabels={true}
  showLegend={false}
/>`,
        },
        {
          title: "Without Percentages",
          description: "Hide percentage values in legend",
          preview: (
            <PieChart
              data={trafficData}
              showPercentages={false}
            />
          ),
          code: `<PieChart
  data={data}
  showPercentages={false}
/>`,
        },
        {
          title: "Custom Size",
          description: "Adjust chart diameter",
          preview: (
            <div className="grid gap-6 md:grid-cols-2">
              <PieChart data={sampleData} size={200} />
              <PieChart data={sampleData} size={250} innerRadius={70} />
            </div>
          ),
          code: `<PieChart data={data} size={200} />
<PieChart data={data} size={250} innerRadius={70} />`,
        },
        {
          title: "Custom Colors",
          description: "Override default color scheme",
          preview: (
            <PieChart
              data={[
                { label: "Success", value: 40, color: "hsl(var(--success))" },
                { label: "Warning", value: 30, color: "hsl(var(--warning))" },
                { label: "Destructive", value: 20, color: "hsl(var(--destructive))" },
                { label: "Primary", value: 10, color: "hsl(var(--primary))" },
              ]}
            />
          ),
          code: `<PieChart
  data={[
    { label: "Success", value: 40, color: "hsl(var(--success))" },
    { label: "Warning", value: 30, color: "hsl(var(--warning))" },
    { label: "Destructive", value: 20, color: "hsl(var(--destructive))" },
    { label: "Primary", value: 10, color: "hsl(var(--primary))" },
  ]}
/>`,
        },
        {
          title: "Interactive with Click Handler",
          description: "Handle segment clicks for drill-down",
          preview: (
            <PieChart
              data={revenueData}
              onSegmentClick={(item, index) => alert(`${item.label}: ${item.value} (${((item.value / revenueData.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}%)`)}
            />
          ),
          code: `<PieChart
  data={data}
  onSegmentClick={(item, index) => {
    console.log(\`Clicked: \${item.label}\`);
  }}
/>`,
        },
      ]}
      props={[
        {
          name: "data",
          type: "PieChartDataItem[]",
          required: true,
          description: "Array of data items with label, value, and optional color",
        },
        {
          name: "size",
          type: "number",
          default: "300",
          description: "Chart diameter in pixels",
        },
        {
          name: "showLabels",
          type: "boolean",
          default: "false",
          description: "Display labels on pie segments (only if percentage > 5%)",
        },
        {
          name: "showPercentages",
          type: "boolean",
          default: "true",
          description: "Show percentage values in labels and legend",
        },
        {
          name: "showLegend",
          type: "boolean",
          default: "true",
          description: "Display interactive legend below chart",
        },
        {
          name: "innerRadius",
          type: "number",
          default: "0",
          description: "Inner radius for donut chart (0 = solid pie)",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the container",
        },
        {
          name: "onSegmentClick",
          type: "(item: PieChartDataItem, index: number) => void",
          description: "Callback when a segment is clicked",
        },
      ]}
      accessibility={[
        "SVG paths use proper fill colors from data or defaults",
        "Hover effects scale segments slightly for visual feedback",
        "Legend items have role='button' and keyboard support (Enter/Space)",
        "Each legend item has aria-label with full details",
        "Colors automatically cycle through 8-color default palette",
        "Percentages calculated automatically from values",
        "Small segments (<5%) hide labels to prevent overlap",
        "Legend highlighting dims non-hovered segments",
      ]}
      previous={{ title: "Member Card", href: "/docs/components/member-card" }}
      next={{ title: "Status Indicator", href: "/docs/components/status-indicator" }}
    />
  );
}
