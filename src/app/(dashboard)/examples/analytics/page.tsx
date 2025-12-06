import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
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
        {mockAnalytics.stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";

          return (
            <TerminalCard key={stat.label}>
              <TerminalCardHeader
                code={`0x${index.toString(16).padStart(2, "0")}`}
                title={stat.label.toUpperCase().replace(/ /g, "_")}
                icon={<Icon className="h-4 w-4" />}
              />
              <TerminalCardContent>
                <div className="flex items-center justify-between">
                  <p className="text-foreground text-4xl font-semibold">{stat.value}</p>
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
              </TerminalCardContent>
            </TerminalCard>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <TerminalCard>
          <TerminalCardHeader code="0x10" title="RECENT_ACTIVITY" />
          <TerminalCardContent>
            <div className="mb-4 flex justify-end">
              <button className="text-primary text-sm font-semibold hover:underline">
                View All
              </button>
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
          </TerminalCardContent>
        </TerminalCard>

        {/* Top Pages */}
        <TerminalCard>
          <TerminalCardHeader code="0x11" title="TOP_PAGES" />
          <TerminalCardContent>
            <div className="mb-4 flex justify-end">
              <button className="text-primary text-sm font-semibold hover:underline">
                View All
              </button>
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
          </TerminalCardContent>
        </TerminalCard>
      </div>

      {/* Chart Placeholder */}
      <TerminalCard>
        <TerminalCardHeader
          code="0x20"
          title="REVENUE_OVER_TIME"
          icon={<TrendingUp className="h-4 w-4" />}
          meta="Monthly recurring revenue trend"
        />
        <TerminalCardContent>
          <div
            className={cn(
              "border-border bg-muted flex h-64 items-center justify-center border border-dashed",
              mode.radius
            )}
          >
            <div className="text-center">
              <TrendingUp className="text-primary/50 mx-auto mb-2 h-12 w-12" />
              <p className="text-muted-foreground text-sm font-semibold">
                Chart component goes here
              </p>
              <p className="text-muted-foreground/80 text-xs">
                Integrate Recharts, Chart.js, or your preferred library
              </p>
            </div>
          </div>
        </TerminalCardContent>
      </TerminalCard>

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
