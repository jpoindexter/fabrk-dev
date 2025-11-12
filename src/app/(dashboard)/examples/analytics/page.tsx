import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Analytics
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track your SaaS performance and growth metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-md border-2 border-black px-4 py-2 text-sm font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockAnalytics.stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";

          return (
            <Card
              key={stat.label}
              className="border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
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
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-4 flex items-center justify-between border-b-2 border-black/10 pb-4">
            <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
            <button className="text-sm font-semibold text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockAnalytics.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded border-2 border-black/10 bg-muted p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Pages */}
        <Card className="border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-4 flex items-center justify-between border-b-2 border-black/10 pb-4">
            <h3 className="text-xl font-bold text-foreground">Top Pages</h3>
            <button className="text-sm font-semibold text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {mockAnalytics.topPages.map((page, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded border-2 border-black/10 bg-muted p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {page.path}
                  </p>
                  <p className="text-xs text-muted-foreground">{page.views} views</p>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    page.change.startsWith("+")
                      ? "text-success"
                      : "text-destructive"
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
      <Card className="border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4 border-b-2 border-black/10 pb-4">
          <h3 className="text-xl font-bold text-foreground">Revenue Over Time</h3>
          <p className="text-sm text-muted-foreground">
            Monthly recurring revenue trend
          </p>
        </div>
        <div className="flex h-64 items-center justify-center rounded border-2 border-dashed border-black/20 bg-muted">
          <div className="text-center">
            <TrendingUp className="mx-auto mb-2 h-12 w-12 text-primary/50" />
            <p className="text-sm font-semibold text-muted-foreground">
              Chart component goes here
            </p>
            <p className="text-xs text-muted-foreground/80">
              Integrate Recharts, Chart.js, or your preferred library
            </p>
          </div>
        </div>
      </Card>

      {/* Implementation Note */}
      <div className="rounded-lg border-2 border-primary bg-primary/5 p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">📊 Implementation Note:</span>{" "}
          This is a demo analytics page with mock data. Replace{" "}
          <code className="rounded bg-black/10 px-1 py-0.5 text-xs">
            mockAnalytics
          </code>{" "}
          with real data from your database. For charts, install Recharts:{" "}
          <code className="rounded bg-black/10 px-1 py-0.5 text-xs">
            npm install recharts
          </code>
        </p>
      </div>
    </div>
  );
}
