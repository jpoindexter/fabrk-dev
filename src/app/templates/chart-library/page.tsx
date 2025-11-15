/**
 * Chart Library Template
 * Comprehensive showcase of Recharts visualization components
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
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
  { name: "Organic Search", value: 4200, color: "hsl(var(--primary))" },
  { name: "Direct", value: 2800, color: "hsl(var(--secondary))" },
  { name: "Social Media", value: 1900, color: "hsl(142, 71%, 45%)" },
  { name: "Referral", value: 1200, color: "hsl(25, 95%, 53%)" },
  { name: "Email", value: 800, color: "hsl(330, 81%, 60%)" },
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
      <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
        <p className="mb-1 font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            <span className="font-semibold">{entry.name}:</span> ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartLibraryTemplate() {
  const [activeTab, setActiveTab] = useState<string>("line");

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Chart Library
          </h1>
          <p className="mt-2 text-muted-foreground">
            Recharts visualization components for data-driven dashboards
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Total Revenue</CardDescription>
              <CardTitle className="text-3xl font-semibold">$91.9K</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+23.5%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Active Users</CardDescription>
              <CardTitle className="text-3xl font-semibold">12.5K</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+941%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Conversion Rate</CardDescription>
              <CardTitle className="text-3xl font-semibold">4.5%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+0.8%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="font-semibold">Avg. Order Value</CardDescription>
              <CardTitle className="text-3xl font-semibold">$89</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm font-semibold text-red-600">
                <TrendingUp className="h-4 w-4 rotate-180" />
                <span>-2.3%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} suppressHydrationWarning>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="line" className="font-semibold">
              Line Chart
            </TabsTrigger>
            <TabsTrigger value="area" className="font-semibold">
              Area Chart
            </TabsTrigger>
            <TabsTrigger value="bar" className="font-semibold">
              Bar Chart
            </TabsTrigger>
            <TabsTrigger value="pie" className="font-semibold">
              Pie Chart
            </TabsTrigger>
          </TabsList>

          {/* Line Chart */}
          <TabsContent value="line" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-semibold">
                      Revenue Overview
                    </CardTitle>
                    <CardDescription>
                      Monthly revenue, expenses, and profit (2024)
                    </CardDescription>
                  </div>
                  <Badge className="font-semibold">Multi-Line</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontWeight: "bold" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      tick={{ fontWeight: "bold" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ fontWeight: "bold", fontSize: "14px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--destructive))", r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="hsl(142, 71%, 45%)"
                      strokeWidth={3}
                      dot={{ fill: "hsl(142, 71%, 45%)", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Area Chart */}
          <TabsContent value="area" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-semibold">
                      User Growth
                    </CardTitle>
                    <CardDescription>
                      Total active users over time
                    </CardDescription>
                  </div>
                  <Badge className="font-semibold">Gradient Fill</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={userGrowthData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontWeight: "bold" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis
                      tick={{ fontWeight: "bold" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontWeight: "bold",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bar Chart */}
          <TabsContent value="bar" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-semibold">
                      Conversion Funnel
                    </CardTitle>
                    <CardDescription>
                      User journey from visitor to retained customer
                    </CardDescription>
                  </div>
                  <Badge className="font-semibold">Horizontal Bars</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={conversionFunnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tick={{ fontWeight: "bold" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                    />
                    <YAxis
                      type="category"
                      dataKey="stage"
                      tick={{ fontWeight: "bold" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontWeight: "bold",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="hsl(var(--primary))"
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pie Chart */}
          <TabsContent value="pie" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-semibold">
                      Traffic Sources
                    </CardTitle>
                    <CardDescription>
                      Distribution of website visitors by source
                    </CardDescription>
                  </div>
                  <Badge className="font-semibold">Donut Chart</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-8">
                  <ResponsiveContainer width="60%" height={400}>
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
                          background: "hsl(var(--card))",
                          border: "2px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontWeight: "bold",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="flex-1 space-y-3">
                    {trafficSourceData.map((source, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-4 w-4 rounded border border-border"
                            style={{ backgroundColor: source.color }}
                          />
                          <span className="font-semibold">{source.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{source.value.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {(
                              (source.value /
                                trafficSourceData.reduce((a, b) => a + b.value, 0)) *
                              100
                            ).toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Implementation Note */}
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-semibold">📊 Template Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-semibold">
                ✓ 4 chart types (Line, Area, Bar, Pie/Donut)
              </li>
              <li className="font-semibold">
                ✓ Recharts library ({" "}
                <code className="rounded bg-muted px-1 py-0.5">npm install recharts</code>)
              </li>
              <li className="font-semibold">
                ✓ Custom tooltips with neo-brutalism styling
              </li>
              <li className="font-semibold">
                ✓ Gradient fills for area charts
              </li>
              <li className="font-semibold">
                ✓ Responsive containers (adapts to screen size)
              </li>
              <li className="font-semibold">
                ✓ Custom color schemes matching design system
              </li>
              <li className="font-semibold">
                ✓ Formatted axes (K notation for large numbers)
              </li>
              <li className="font-semibold">
                ✓ Legend components with bold styling
              </li>
              <li className="font-semibold">
                ✓ Tab navigation between chart types
              </li>
              <li className="font-semibold">
                ✓ Stat cards with trend indicators
              </li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              Replace mock data with your API. Recharts supports many more chart types:
              Scatter, Radar, Composed, Treemap, and more.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
