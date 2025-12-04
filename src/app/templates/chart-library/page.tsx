/**
 * ✅ FABRK COMPONENT
 * Chart Library Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
      <div className="border-border bg-card border p-4 font-mono text-xs">
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

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="border-border inline-block border px-4 py-1">
              <span className="text-muted-foreground font-mono text-xs">
                [TEMPLATE]: CHART_LIBRARY
              </span>
            </div>
            <h1 className="font-mono text-4xl font-semibold tracking-tight">Chart Library</h1>
            <p className="text-muted-foreground font-mono text-sm">
              Recharts visualization components for data-driven dashboards
            </p>
          </div>
          <Button className="rounded-none font-mono text-xs">
            <Download className="mr-2 h-4 w-4" />
            &gt; VIEW_DOCS
          </Button>
        </div>

        {/* Stats - Terminal Style */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="border-border bg-card border p-4">
            <div className="text-muted-foreground mb-1 font-mono text-xs">[TOTAL_REVENUE]:</div>
            <div className="text-3xl font-bold">$91.9K</div>
            <div className="text-success mt-1 flex items-center gap-1 font-mono text-xs">
              <TrendingUp className="h-3 w-3" />
              +23.5%
            </div>
          </div>
          <div className="border-border bg-card border p-4">
            <div className="text-muted-foreground mb-1 font-mono text-xs">[ACTIVE_USERS]:</div>
            <div className="text-3xl font-bold">12.5K</div>
            <div className="text-success mt-1 flex items-center gap-1 font-mono text-xs">
              <TrendingUp className="h-3 w-3" />
              +941%
            </div>
          </div>
          <div className="border-border bg-card border p-4">
            <div className="text-muted-foreground mb-1 font-mono text-xs">[CONVERSION_RATE]:</div>
            <div className="text-3xl font-bold">4.5%</div>
            <div className="text-success mt-1 flex items-center gap-1 font-mono text-xs">
              <TrendingUp className="h-3 w-3" />
              +0.8%
            </div>
          </div>
          <div className="border-border bg-card border p-4">
            <div className="text-muted-foreground mb-1 font-mono text-xs">[AVG_ORDER_VALUE]:</div>
            <div className="text-3xl font-bold">$89</div>
            <div className="text-destructive mt-1 flex items-center gap-1 font-mono text-xs">
              <TrendingUp className="h-3 w-3 rotate-180" />
              -2.3%
            </div>
          </div>
        </div>

        {/* Chart Tabs - Terminal Style */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-border bg-card border">
            <div className="border-border border-b px-4 py-2">
              <span className="text-muted-foreground font-mono text-xs">
                [ [0x00] CHART_NAVIGATION ]
              </span>
            </div>

            {/* Tab Navigation */}
            <TabsList className="h-auto w-full justify-start rounded-none border-0 bg-transparent p-0">
              {(["line", "area", "bar", "pie"] as const).map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground rounded-none border-r px-4 py-2 font-mono text-xs"
                >
                  [{tab.toUpperCase()}_CHART]
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Line Chart */}
          <TabsContent value="line" className="mt-0">
            <div className="border-border bg-card border border-t-0 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-muted-foreground font-mono text-xs">[REVENUE_OVERVIEW]:</div>
                  <div className="text-muted-foreground mt-1 font-mono text-xs">
                    Monthly revenue, expenses, and profit (2024)
                  </div>
                </div>
                <span className="border-border border px-2 py-0.5 font-mono text-xs">
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
          </TabsContent>

          {/* Area Chart */}
          <TabsContent value="area" className="mt-0">
            <div className="border-border bg-card border border-t-0 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-muted-foreground font-mono text-xs">[USER_GROWTH]:</div>
                  <div className="text-muted-foreground mt-1 font-mono text-xs">
                    Total active users over time
                  </div>
                </div>
                <span className="border-border border px-2 py-0.5 font-mono text-xs">
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
          </TabsContent>

          {/* Bar Chart */}
          <TabsContent value="bar" className="mt-0">
            <div className="border-border bg-card border border-t-0 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-muted-foreground font-mono text-xs">
                    [CONVERSION_FUNNEL]:
                  </div>
                  <div className="text-muted-foreground mt-1 font-mono text-xs">
                    User journey from visitor to retained customer
                  </div>
                </div>
                <span className="border-border border px-2 py-0.5 font-mono text-xs">
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
          </TabsContent>

          {/* Pie Chart */}
          <TabsContent value="pie" className="mt-0">
            <div className="border-border bg-card border border-t-0 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-muted-foreground font-mono text-xs">[TRAFFIC_SOURCES]:</div>
                  <div className="text-muted-foreground mt-1 font-mono text-xs">
                    Distribution of website visitors by source
                  </div>
                </div>
                <span className="border-border border px-2 py-0.5 font-mono text-xs">
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
                    <div key={idx} className="flex items-center gap-4 font-mono text-sm">
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
          </TabsContent>
        </Tabs>

        {/* Implementation Note */}
        <div className="border-border bg-card border">
          <div className="border-border border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs">
              [ [0x01] TEMPLATE_FEATURES ]
            </span>
          </div>
          <div className="p-4">
            <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> 4 chart types (Line, Area, Bar,
                Pie/Donut)
              </div>
              <div>
                <span className="text-success">&gt;</span> Recharts library (npm install recharts)
              </div>
              <div>
                <span className="text-success">&gt;</span> Custom tooltips with terminal styling
              </div>
              <div>
                <span className="text-success">&gt;</span> Solid fills with theme colors
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive containers (adapts to screen
                size)
              </div>
              <div>
                <span className="text-success">&gt;</span> Custom color schemes matching design
                system
              </div>
              <div>
                <span className="text-success">&gt;</span> Formatted axes (K notation for large
                numbers)
              </div>
              <div>
                <span className="text-success">&gt;</span> Tab navigation between chart types
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal console aesthetic
              </div>
            </div>
            <div className="text-muted-foreground mt-4 font-mono text-xs">
              [NOTE]: Replace mock data with your API. Recharts supports Scatter, Radar, Composed,
              Treemap, and more.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
