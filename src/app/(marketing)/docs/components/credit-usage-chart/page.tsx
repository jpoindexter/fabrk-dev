"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { UsageChart } from "@/components/credits";

// Generate mock data for previews
function generateMockData(pattern: "normal" | "spike" | "low" | "empty" = "normal") {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    let credits = 0;
    if (pattern === "normal") {
      credits = Math.floor(Math.random() * 30) + 5;
    } else if (pattern === "spike") {
      credits = i === 10 || i === 5 ? 80 : Math.floor(Math.random() * 20);
    } else if (pattern === "low") {
      credits = Math.floor(Math.random() * 5);
    }

    data.push({ date: dateStr, credits });
  }

  return data;
}

const normalData = generateMockData("normal");
const spikeData = generateMockData("spike");
const lowData = generateMockData("low");
const emptyData = generateMockData("empty");

export default function CreditUsageChartPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.121]"
      category="Credits"
      title="Credit Usage Chart"
      description="Bar chart visualization of daily AI credit consumption over the past 14 days. Includes hover tooltips showing exact values."
      importCode={`import { UsageChart } from "@/components/credits"`}
      mainPreview={{
        preview: (
          <div className="mx-auto max-w-lg p-4">
            <UsageChart data={normalData} />
          </div>
        ),
        code: `<UsageChart data={usageStats} />`,
      }}
      variants={[
        {
          title: "High Usage Spikes",
          description: "Chart handles outlier days with high consumption.",
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <UsageChart data={spikeData} />
            </div>
          ),
          code: `// Bars scale relative to max value`,
        },
        {
          title: "Low Usage",
          description: "Minimal usage still shows visible bars.",
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <UsageChart data={lowData} />
            </div>
          ),
          code: `// Minimum bar height ensures visibility`,
        },
        {
          title: "No Usage",
          description: "Days with zero usage show muted bars.",
          preview: (
            <div className="mx-auto max-w-lg p-4">
              <UsageChart data={emptyData} />
            </div>
          ),
          code: `// Zero-usage days shown as muted bars`,
        },
      ]}
      props={[
        {
          name: "data",
          type: "{ date: string; credits: number }[]",
          required: true,
          description: "Array of daily usage data with ISO date strings and credit counts.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply.",
        },
      ]}
      accessibility={[
        "Hover tooltips show exact credit values",
        "Color-coded bars (primary for usage, muted for zero)",
        "Date labels on x-axis for orientation",
        "Relative bar heights for visual comparison",
      ]}
      previous={{ title: "Balance Display", href: "/docs/components/balance-display" }}
      next={{
        title: "Credit Transaction Table",
        href: "/docs/components/credit-transaction-table",
      }}
    />
  );
}
