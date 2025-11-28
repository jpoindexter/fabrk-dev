/**
 * ✅ FABRK COMPONENT
 * Analytics Dashboard Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Download,
  BarChart3,
} from "lucide-react";
import { TerminalBackground } from "@/components/landing/terminal-background";

// Mock data
const metrics = [
  {
    id: "revenue",
    title: "TOTAL_REVENUE",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    status: "INCREASING",
  },
  {
    id: "users",
    title: "ACTIVE_USERS",
    value: "2,350",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    status: "GROWING",
  },
  {
    id: "conversions",
    title: "CONVERSIONS",
    value: "12.5%",
    change: "-2.4%",
    trend: "down",
    icon: Activity,
    status: "DECLINING",
  },
  {
    id: "growth",
    title: "GROWTH_RATE",
    value: "+28%",
    change: "+8.2%",
    trend: "up",
    icon: TrendingUp,
    status: "ACCELERATING",
  },
];

const revenueData = [
  { month: "JAN", revenue: 32000, height: 55 },
  { month: "FEB", revenue: 42000, height: 70 },
  { month: "MAR", revenue: 38000, height: 65 },
  { month: "APR", revenue: 54000, height: 85 },
  { month: "MAY", revenue: 57000, height: 90 },
  { month: "JUN", revenue: 63000, height: 100 },
];

const activityData = [
  { user: "John Doe", action: "Purchased Pro Plan", time: "2m ago", type: "PURCHASE" },
  { user: "Jane Smith", action: "Signed up", time: "15m ago", type: "SIGNUP" },
  { user: "Bob Wilson", action: "Upgraded account", time: "1h ago", type: "UPGRADE" },
  { user: "Alice Brown", action: "Left feedback", time: "2h ago", type: "FEEDBACK" },
  { user: "Charlie Davis", action: "Referred friend", time: "3h ago", type: "REFERRAL" },
];

const pageData = [
  { page: "/landing", views: "12,453", bounce: "32%", conversion: "8.2%" },
  { page: "/pricing", views: "8,932", bounce: "28%", conversion: "12.5%" },
  { page: "/features", views: "6,721", bounce: "45%", conversion: "3.1%" },
  { page: "/about", views: "4,562", bounce: "52%", conversion: "1.8%" },
  { page: "/blog", views: "3,891", bounce: "38%", conversion: "4.2%" },
];

const trafficSources = [
  { source: "Organic Search", percentage: 45 },
  { source: "Direct", percentage: 30 },
  { source: "Social Media", percentage: 15 },
  { source: "Referral", percentage: 10 },
];

const deviceBreakdown = [
  { device: "Desktop", percentage: 55 },
  { device: "Mobile", percentage: 35 },
  { device: "Tablet", percentage: 10 },
];

export default function AnalyticsDashboardTemplate() {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "reports">("overview");

  return (
    <div className="relative isolate min-h-screen bg-background">
      <TerminalBackground />
      {/* Page Content */}
      <main className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: ANALYTICS_DASHBOARD</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Analytics Dashboard</h1>
            <p className="font-mono text-sm text-muted-foreground">
              Track revenue, users, conversions, and growth metrics
            </p>
          </div>
          <Button className="rounded-none font-mono text-xs">
            <Download className="mr-2 h-4 w-4" />
            &gt; EXPORT_DATA
          </Button>
        </div>

        {/* Metric Cards - Terminal Style */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-xs text-muted-foreground">[{metric.title}]:</div>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2 mt-2 font-mono text-xs">
                <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>
                  {metric.trend === "up" ? <TrendingUp className="inline h-3 w-3 mr-1" /> : <TrendingDown className="inline h-3 w-3 mr-1" />}
                  {metric.change}
                </span>
                <span className="text-muted-foreground">
                  STATUS: <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>{metric.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 lg:grid-cols-7">
          {/* Revenue Chart - Terminal Style */}
          <div className="lg:col-span-4 border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">revenue_chart.tsx</span>
            </div>
            <div className="p-4">
              <div className="font-mono text-xs text-muted-foreground mb-4">
                [REVENUE_OVERVIEW]: PERIOD=6_MONTHS
              </div>

              {/* Bar Chart */}
              <div className="relative pl-10">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs font-mono text-muted-foreground">
                  <span>$60k</span>
                  <span>$40k</span>
                  <span>$20k</span>
                  <span>$0</span>
                </div>

                {/* Chart area */}
                <div className="h-[200px] flex items-end justify-between gap-2 border-b border-l border-border">
                  {revenueData.map((data, i) => (
                    <div key={i} className="flex-1 flex items-end justify-center h-full">
                      <div
                        className="w-full max-w-12 bg-primary hover:bg-primary/80 transition-colors"
                        style={{
                          height: `${data.height}%`,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* X-axis labels */}
                <div className="flex justify-between gap-2 mt-2">
                  {revenueData.map((data, i) => (
                    <div key={i} className="flex-1 text-center font-mono text-xs text-muted-foreground">
                      {data.month}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border font-mono text-xs">
                <div>
                  <span className="text-muted-foreground">[AVG]:</span> <span className="text-foreground">$47,667</span>
                </div>
                <div>
                  <span className="text-muted-foreground">[MAX]:</span> <span className="text-foreground">$63,000</span>
                </div>
                <div>
                  <span className="text-muted-foreground">[GROWTH]:</span> <span className="text-success">+96.9%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed - Terminal Style */}
          <div className="lg:col-span-3 border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">activity_log.txt</span>
            </div>
            <div className="p-4">
              <div className="font-mono text-xs text-muted-foreground mb-4">
                [RECENT_ACTIVITY]: COUNT={activityData.length}
              </div>

              <div className="space-y-3">
                {activityData.map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 font-mono text-xs">
                    <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted">
                      {activity.user.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground truncate">{activity.user}</span>
                        <span className="border border-border px-1.5 py-0.5 text-muted-foreground">
                          {activity.type}
                        </span>
                      </div>
                      <span className="text-muted-foreground">{activity.action}</span>
                    </div>
                    <span className="text-muted-foreground shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section - Terminal Style */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">analytics_tabs.tsx</span>
          </div>

          {/* Terminal Tab Navigation */}
          <div className="flex border-b border-border font-mono text-xs">
            {(["overview", "analytics", "reports"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 border-r border-border transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                [{tab.toUpperCase()}]
              </button>
            ))}
          </div>

          <div className="p-4">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-4">
                  [TOP_PAGES]: SORTED_BY=VIEWS
                </div>

                {/* Terminal Table */}
                <div className="border border-border">
                  <div className="grid grid-cols-4 border-b border-border bg-muted/30 px-4 py-2 font-mono text-xs">
                    <span className="text-muted-foreground">[PAGE]</span>
                    <span className="text-muted-foreground">[VIEWS]</span>
                    <span className="text-muted-foreground">[BOUNCE]</span>
                    <span className="text-muted-foreground">[CONVERSION]</span>
                  </div>
                  <div className="divide-y divide-border">
                    {pageData.map((row, i) => (
                      <div key={i} className="grid grid-cols-4 px-4 py-3 font-mono text-xs hover:bg-muted/30">
                        <span className="text-foreground">{row.page}</span>
                        <span className="text-muted-foreground">{row.views}</span>
                        <span className="text-muted-foreground">{row.bounce}</span>
                        <span className="border border-border px-2 py-0.5 text-center w-fit">{row.conversion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="grid gap-4 md:grid-cols-2">
                {/* Traffic Sources */}
                <div className="border border-border p-4">
                  <div className="font-mono text-xs text-muted-foreground mb-4">
                    [TRAFFIC_SOURCES]:
                  </div>
                  <div className="space-y-3">
                    {trafficSources.map((source, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-foreground">{source.source}</span>
                          <span className="text-muted-foreground">{source.percentage}%</span>
                        </div>
                        <Progress value={source.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device Breakdown */}
                <div className="border border-border p-4">
                  <div className="font-mono text-xs text-muted-foreground mb-4">
                    [DEVICE_BREAKDOWN]:
                  </div>
                  <div className="space-y-3">
                    {deviceBreakdown.map((device, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-foreground">{device.device}</span>
                          <span className="text-muted-foreground">{device.percentage}%</span>
                        </div>
                        <Progress value={device.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === "reports" && (
              <div>
                <div className="font-mono text-xs text-muted-foreground mb-4">
                  [AVAILABLE_REPORTS]:
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "MONTHLY_SUMMARY", desc: "Overview of all metrics" },
                    { name: "USER_BEHAVIOR", desc: "Detailed user journey analysis" },
                    { name: "REVENUE_REPORT", desc: "Financial performance breakdown" },
                    { name: "CUSTOM_REPORT", desc: "Build your own report" },
                  ].map((report, i) => (
                    <div key={i} className="border border-border p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-mono text-xs text-foreground">[{report.name}]</div>
                          <div className="font-mono text-xs text-muted-foreground mt-1">
                            {report.desc}
                          </div>
                        </div>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Button size="sm" variant="outline" className="rounded-none w-full font-mono text-xs">
                        <Download className="mr-2 h-3 w-3" />
                        &gt; GENERATE
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Template Features Card */}
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
              <div><span className="text-success">&gt;</span> 4 key metric cards (revenue, users, conversions, growth)</div>
              <div><span className="text-success">&gt;</span> Revenue overview chart with 6-month data</div>
              <div><span className="text-success">&gt;</span> Recent activity feed with user avatars</div>
              <div><span className="text-success">&gt;</span> Tabbed analytics section (Overview, Analytics, Reports)</div>
              <div><span className="text-success">&gt;</span> Top performing pages table with bounce rates</div>
              <div><span className="text-success">&gt;</span> Traffic sources breakdown with progress bars</div>
              <div><span className="text-success">&gt;</span> Device breakdown statistics</div>
              <div><span className="text-success">&gt;</span> Report generation templates</div>
              <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
