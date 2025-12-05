import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Analytics - Fabrk Dashboard",
  description: "View your SaaS analytics and metrics",
};

// Mock data - replace with real data from your database
const mockAnalytics = {
  stats: [
    {
      label: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      label: "Active Users",
      value: "2,350",
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
    },
    {
      label: "Conversions",
      value: "89",
      change: "-4.2%",
      trend: "down" as const,
      icon: ShoppingCart,
    },
    {
      label: "Bounce Rate",
      value: "42.3%",
      change: "-8.1%",
      trend: "up" as const,
      icon: Activity,
    },
  ],
  recentActivity: [
    { action: "New user signed up", user: "sarah@example.com", time: "2 min ago" },
    { action: "Payment received", user: "john@example.com", time: "15 min ago" },
    { action: "New subscription", user: "mike@example.com", time: "1 hour ago" },
    { action: "Trial started", user: "emma@example.com", time: "3 hours ago" },
    { action: "Payment received", user: "alex@example.com", time: "5 hours ago" },
  ],
  topPages: [
    { path: "/pricing", views: 1234, change: "+15%" },
    { path: "/features", views: 987, change: "+8%" },
    { path: "/docs", views: 756, change: "-3%" },
    { path: "/", views: 2345, change: "+22%" },
  ],
};

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Track your SaaS performance and growth metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7">
            <SelectTrigger
              className={cn(
                "border-border w-[140px] border py-2 text-sm font-semibold",
                mode.radius
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockAnalytics.stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";

          return (
            <Card key={stat.label} className="border-border border p-6">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "border-border bg-primary/10 flex h-12 w-12 items-center justify-center border",
                    mode.radius
                  )}
                >
                  <Icon className="text-primary h-6 w-6" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    isPositive ? "text-success" : "text-destructive"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-foreground mt-1 text-3xl font-bold">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="border-border border p-6">
          <div className="border-border mb-4 flex items-center justify-between border-b pb-4">
            <h3 className="text-foreground text-xl font-bold">Recent Activity</h3>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {mockAnalytics.recentActivity.map((activity, index) => (
              <div
                key={index}
                className={cn(
                  "border-border bg-muted flex items-center justify-between border p-4",
                  mode.radius
                )}
              >
                <div>
                  <p className="text-foreground text-sm font-semibold">{activity.action}</p>
                  <p className="text-muted-foreground text-xs">{activity.user}</p>
                </div>
                <p className="text-muted-foreground text-xs">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Pages */}
        <Card className="border-border border p-6">
          <div className="border-border mb-4 flex items-center justify-between border-b pb-4">
            <h3 className="text-foreground text-xl font-bold">Top Pages</h3>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {mockAnalytics.topPages.map((page, index) => (
              <div
                key={index}
                className={cn(
                  "border-border bg-muted flex items-center justify-between border p-4",
                  mode.radius
                )}
              >
                <div className="flex-1">
                  <p className="text-foreground text-sm font-semibold">{page.path}</p>
                  <p className="text-muted-foreground text-xs">{page.views} views</p>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    page.change.startsWith("+") ? "text-success" : "text-destructive"
                  }`}
                >
                  {page.change}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="border-border border p-6">
        <div className="border-border mb-4 border-b pb-4">
          <h3 className="text-foreground text-xl font-bold">Revenue Over Time</h3>
          <p className="text-muted-foreground text-sm">Monthly recurring revenue trend</p>
        </div>
        <div
          className={cn(
            "border-border bg-muted flex h-64 items-center justify-center border border-dashed",
            mode.radius
          )}
        >
          <div className="text-center">
            <TrendingUp className="text-primary/50 mx-auto mb-2 h-12 w-12" />
            <p className="text-muted-foreground text-sm font-semibold">Chart component goes here</p>
            <p className="text-muted-foreground/80 text-xs">
              Integrate Recharts, Chart.js, or your preferred library
            </p>
          </div>
        </div>
      </Card>

      {/* Implementation Note */}
      <div className={cn("border-primary bg-primary/5 border-2 p-4", mode.radius)}>
        <p className="text-muted-foreground text-sm">
          <span className="text-foreground font-semibold">📊 Implementation Note:</span> This is a
          demo analytics page with mock data. Replace{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">mockAnalytics</code> with real data
          from your database. For charts, install Recharts:{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">npm install recharts</code>
        </p>
      </div>
    </div>
  );
}
