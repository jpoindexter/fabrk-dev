/**
 * ✅ FABRK COMPONENT
 * Chart Library Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  TrendingUp,
  Download,
} from "lucide-react";

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="border border-border bg-card p-3 font-mono text-xs">
        <p className="mb-1 font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
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
  const [activeTab, setActiveTab] = useState<"line" | "area" | "bar" | "pie">("line");

  return (
    <div className="min-h-screen bg-background">
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: CHART_LIBRARY</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Chart Library
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
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
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[TOTAL_REVENUE]:</div>
            <div className="text-3xl font-bold">$91.9K</div>
            <div className="flex items-center gap-1 font-mono text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3" />
              +23.5%
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[ACTIVE_USERS]:</div>
            <div className="text-3xl font-bold">12.5K</div>
            <div className="flex items-center gap-1 font-mono text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3" />
              +941%
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[CONVERSION_RATE]:</div>
            <div className="text-3xl font-bold">4.5%</div>
            <div className="flex items-center gap-1 font-mono text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3" />
              +0.8%
            </div>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[AVG_ORDER_VALUE]:</div>
            <div className="text-3xl font-bold">$89</div>
            <div className="flex items-center gap-1 font-mono text-xs text-destructive mt-1">
              <TrendingUp className="h-3 w-3 rotate-180" />
              -2.3%
            </div>
          </div>
        </div>

        {/* Chart Tabs - Terminal Style */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">charts.tsx</span>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-border font-mono text-xs">
            {(["line", "area", "bar", "pie"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 border-r border-border transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                [{tab.toUpperCase()}_CHART]
              </button>
            ))}
          </div>

          <div className="p-4">
            {/* Line Chart */}
            {activeTab === "line" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[REVENUE_OVERVIEW]:</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">Monthly revenue, expenses, and profit (2024)</div>
                  </div>
                  <span className="border border-border px-2 py-0.5 font-mono text-xs">MULTI_LINE</span>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={{ stroke: "oklch(var(--border))" }} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "oklch(var(--border))" }} tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Line type="monotone" dataKey="revenue" stroke="oklch(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="expenses" stroke="oklch(var(--destructive))" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="profit" stroke="oklch(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Area Chart */}
            {activeTab === "area" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[USER_GROWTH]:</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">Total active users over time</div>
                  </div>
                  <span className="border border-border px-2 py-0.5 font-mono text-xs">SOLID_FILL</span>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={{ stroke: "oklch(var(--border))" }} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "oklch(var(--border))" }} tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`} />
                    <Tooltip contentStyle={{ background: "oklch(var(--card))", border: "1px solid oklch(var(--border))", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="users" stroke="oklch(var(--primary))" strokeWidth={2} fillOpacity={0.3} fill="oklch(var(--primary))" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Bar Chart */}
            {activeTab === "bar" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[CONVERSION_FUNNEL]:</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">User journey from visitor to retained customer</div>
                  </div>
                  <span className="border border-border px-2 py-0.5 font-mono text-xs">HORIZONTAL_BARS</span>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={conversionFunnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 12 }} tickLine={{ stroke: "oklch(var(--border))" }} tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`} />
                    <YAxis type="category" dataKey="stage" tick={{ fontSize: 12 }} tickLine={{ stroke: "oklch(var(--border))" }} />
                    <Tooltip contentStyle={{ background: "oklch(var(--card))", border: "1px solid oklch(var(--border))", fontSize: "12px" }} />
                    <Bar dataKey="count" fill="oklch(var(--primary))" radius={[0, 0, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Pie Chart */}
            {activeTab === "pie" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[TRAFFIC_SOURCES]:</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">Distribution of website visitors by source</div>
                  </div>
                  <span className="border border-border px-2 py-0.5 font-mono text-xs">DONUT_CHART</span>
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
                      <Tooltip contentStyle={{ background: "oklch(var(--card))", border: "1px solid oklch(var(--border))", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {trafficSourceData.map((source, idx) => (
                      <div key={idx} className="flex items-center gap-4 font-mono text-sm">
                        <div className="h-4 w-4 border border-border" style={{ backgroundColor: source.color }} />
                        <span className="w-32">{source.name}</span>
                        <div className="text-right">
                          <div className="font-bold">{source.value.toLocaleString()}</div>
                          <div className="text-muted-foreground">
                            {((source.value / trafficSourceData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Implementation Note */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">features.md</span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div><span className="text-success">&gt;</span> 4 chart types (Line, Area, Bar, Pie/Donut)</div>
              <div><span className="text-success">&gt;</span> Recharts library (npm install recharts)</div>
              <div><span className="text-success">&gt;</span> Custom tooltips with terminal styling</div>
              <div><span className="text-success">&gt;</span> Solid fills with theme colors</div>
              <div><span className="text-success">&gt;</span> Responsive containers (adapts to screen size)</div>
              <div><span className="text-success">&gt;</span> Custom color schemes matching design system</div>
              <div><span className="text-success">&gt;</span> Formatted axes (K notation for large numbers)</div>
              <div><span className="text-success">&gt;</span> Tab navigation between chart types</div>
              <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Replace mock data with your API. Recharts supports Scatter, Radar, Composed, Treemap, and more.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
