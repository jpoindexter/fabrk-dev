/**
 * ✅ FABRK COMPONENT
 * Chart Library Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
import { TemplatePageHeader, FeaturesCard } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp, Download } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

// Mock data
const revenueData = [
  { month: "Jan", revenue: 4500, expenses: 2800, profit: 1700 },
  { month: "Feb", revenue: 5200, expenses: 3100, profit: 2100 },
  { month: "Mar", revenue: 4800, expenses: 2900, profit: 1900 },
  { month: "Apr", revenue: 6100, expenses: 3400, profit: 2700 },
  { month: "May", revenue: 7200, expenses: 3800, profit: 3400 },
  { month: "Jun", revenue: 6800, expenses: 3600, profit: 3200 },
  { month: "Jul", revenue: 7500, expenses: 4000, profit: 3500 },
  { month: "Aug", revenue: 8200, expenses: 4300, profit: 3900 },
  { month: "Sep", revenue: 7800, expenses: 4100, profit: 3700 },
  { month: "Oct", revenue: 8500, expenses: 4500, profit: 4000 },
  { month: "Nov", revenue: 9100, expenses: 4800, profit: 4300 },
  { month: "Dec", revenue: 10200, expenses: 5200, profit: 5000 },
];

const userGrowthData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1850 },
  { month: "Mar", users: 2300 },
  { month: "Apr", users: 3100 },
  { month: "May", users: 4200 },
  { month: "Jun", users: 5100 },
  { month: "Jul", users: 6300 },
  { month: "Aug", users: 7500 },
  { month: "Sep", users: 8400 },
  { month: "Oct", users: 9800 },
  { month: "Nov", users: 11200 },
  { month: "Dec", users: 12500 },
];

const trafficSourceData = [
  { name: "Organic Search", value: 4200, color: "oklch(var(--success))" },
  { name: "Direct", value: 2800, color: "oklch(var(--muted-foreground))" },
  { name: "Social Media", value: 1900, color: "oklch(var(--primary))" },
  { name: "Referral", value: 1200, color: "oklch(var(--warning))" },
  { name: "Email", value: 800, color: "oklch(var(--destructive))" },
];

const conversionFunnelData = [
  { stage: "Visitors", count: 10000 },
  { stage: "Sign Ups", count: 2500 },
  { stage: "Trial", count: 1200 },
  { stage: "Paid", count: 450 },
  { stage: "Retained", count: 380 },
];

// Recharts tooltip props type
interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className={cn(mode.font, "border-border bg-card border p-4 text-xs")}>
        <p className="mb-1 font-bold">{label}</p>
        {payload.map((entry: TooltipPayload, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            <span className="font-bold">{entry.name}:</span> ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartLibraryTemplate() {
  const [activeTab, setActiveTab] = useState("line");

  const tabs = [
    { id: "line", label: "LINE_CHART" },
    { id: "area", label: "AREA_CHART" },
    { id: "bar", label: "BAR_CHART" },
    { id: "pie", label: "PIE_CHART" },
  ];

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <TemplatePageHeader
            badge="CHART_LIBRARY"
            title="Chart Library"
            description="Recharts visualization components for data-driven dashboards"
          />
          <Button className={cn(mode.radius, mode.font, "text-xs")}>
            <Download className="mr-2 h-4 w-4" />
            &gt; VIEW_DOCS
          </Button>
        </div>

        {/* Stats - Terminal Style */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="border-border bg-card border p-4">
            <div className={cn(mode.font, "text-muted-foreground mb-1 text-xs")}>
              [TOTAL_REVENUE]:
            </div>
            <div className="text-3xl font-bold">$91.9K</div>
            <div className={cn(mode.font, "text-success mt-1 flex items-center gap-1 text-xs")}>
              <TrendingUp className="h-3 w-3" />
              +23.5%
            </div>
          </div>
          <div className="border-border bg-card border p-4">
            <div className={cn(mode.font, "text-muted-foreground mb-1 text-xs")}>
              [ACTIVE_USERS]:
            </div>
            <div className="text-3xl font-bold">12.5K</div>
            <div className={cn(mode.font, "text-success mt-1 flex items-center gap-1 text-xs")}>
              <TrendingUp className="h-3 w-3" />
              +941%
            </div>
          </div>
          <div className="border-border bg-card border p-4">
            <div className={cn(mode.font, "text-muted-foreground mb-1 text-xs")}>
              [CONVERSION_RATE]:
            </div>
            <div className="text-3xl font-bold">4.5%</div>
            <div className={cn(mode.font, "text-success mt-1 flex items-center gap-1 text-xs")}>
              <TrendingUp className="h-3 w-3" />
              +0.8%
            </div>
          </div>
          <div className="border-border bg-card border p-4">
            <div className={cn(mode.font, "text-muted-foreground mb-1 text-xs")}>
              [AVG_ORDER_VALUE]:
            </div>
            <div className="text-3xl font-bold">$89</div>
            <div className={cn(mode.font, "text-destructive mt-1 flex items-center gap-1 text-xs")}>
              <TrendingUp className="h-3 w-3 rotate-180" />
              -2.3%
            </div>
          </div>
        </div>

        {/* Chart Tabs - Terminal Style */}
        <StyledTabs
          code="0x00"
          title="CHART_NAVIGATION"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {/* Line Chart */}
          <StyledTabsContent value="line">
            <div className="border-border bg-card border border-t-0 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className={cn(mode.font, "text-muted-foreground text-xs")}>
                    [REVENUE_OVERVIEW]:
                  </div>
                  <div className={cn(mode.font, "text-muted-foreground mt-1 text-xs")}>
                    Monthly revenue, expenses, and profit (2024)
                  </div>
                </div>
                <span className={cn(mode.font, "border-border border px-2 py-0.5 text-xs")}>
                  MULTI_LINE
                </span>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "oklch(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "oklch(var(--border))" }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="oklch(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="oklch(var(--destructive))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="oklch(var(--success))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </StyledTabsContent>

          {/* Area Chart */}
          <StyledTabsContent value="area">
            <div className="border-border bg-card border border-t-0 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className={cn(mode.font, "text-muted-foreground text-xs")}>
                    [USER_GROWTH]:
                  </div>
                  <div className={cn(mode.font, "text-muted-foreground mt-1 text-xs")}>
                    Total active users over time
                  </div>
                </div>
                <span className={cn(mode.font, "border-border border px-2 py-0.5 text-xs")}>
                  SOLID_FILL
                </span>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "oklch(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "oklch(var(--border))" }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="oklch(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={0.3}
                    fill="oklch(var(--primary))"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </StyledTabsContent>

          {/* Bar Chart */}
          <StyledTabsContent value="bar">
            <div className="border-border bg-card border border-t-0 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className={cn(mode.font, "text-muted-foreground text-xs")}>
                    [CONVERSION_FUNNEL]:
                  </div>
                  <div className={cn(mode.font, "text-muted-foreground mt-1 text-xs")}>
                    User journey from visitor to retained customer
                  </div>
                </div>
                <span className={cn(mode.font, "border-border border px-2 py-0.5 text-xs")}>
                  HORIZONTAL_BARS
                </span>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={conversionFunnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "oklch(var(--border))" }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                  />
                  <YAxis
                    type="category"
                    dataKey="stage"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "oklch(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="oklch(var(--primary))" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </StyledTabsContent>

          {/* Pie Chart */}
          <StyledTabsContent value="pie">
            <div className="border-border bg-card border border-t-0 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className={cn(mode.font, "text-muted-foreground text-xs")}>
                    [TRAFFIC_SOURCES]:
                  </div>
                  <div className={cn(mode.font, "text-muted-foreground mt-1 text-xs")}>
                    Distribution of website visitors by source
                  </div>
                </div>
                <span className={cn(mode.font, "border-border border px-2 py-0.5 text-xs")}>
                  DONUT_CHART
                </span>
              </div>
              <div className="flex items-center justify-center gap-12">
                <ResponsiveContainer width={400} height={400}>
                  <PieChart>
                    <Pie
                      data={trafficSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "oklch(var(--card))",
                        border: "1px solid oklch(var(--border))",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-4">
                  {trafficSourceData.map((source, idx) => (
                    <div key={idx} className={cn(mode.font, "flex items-center gap-4 text-sm")}>
                      <div
                        className="border-border h-4 w-4 border"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="w-32">{source.name}</span>
                      <div className="text-right">
                        <div className="font-bold">{source.value.toLocaleString()}</div>
                        <div className="text-muted-foreground">
                          {(
                            (source.value / trafficSourceData.reduce((a, b) => a + b.value, 0)) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </StyledTabsContent>
        </StyledTabs>

        {/* Implementation Note */}
        <FeaturesCard
          code="0x01"
          features={[
            "4 chart types (Line, Area, Bar, Pie/Donut)",
            "Recharts library (npm install recharts)",
            "Custom tooltips with terminal styling",
            "Solid fills with theme colors",
            "Responsive containers (adapts to screen size)",
            "Custom color schemes matching design system",
            "Formatted axes (K notation for large numbers)",
            "Tab navigation between chart types",
            "Terminal console aesthetic",
          ]}
          note="Replace mock data with your API. Recharts supports Scatter, Radar, Composed, Treemap, and more."
        />
      </div>
    </div>
  );
}
