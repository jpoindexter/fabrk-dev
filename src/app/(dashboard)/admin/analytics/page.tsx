/**
 * Admin Analytics Dashboard
 * View application analytics and user behavior
 */

import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

async function getAnalytics() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    usersLast30Days,
    usersLast7Days,
    totalRevenue,
    revenueLast30Days,
    revenueLast7Days,
    totalPayments,
    paymentsLast30Days,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "succeeded" },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "succeeded", createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "succeeded", createdAt: { gte: sevenDaysAgo } },
    }),
    prisma.payment.count({ where: { status: "succeeded" } }),
    prisma.payment.count({
      where: { status: "succeeded", createdAt: { gte: thirtyDaysAgo } },
    }),
  ]);

  // Get user growth by day (last 30 days)
  const userGrowth = await prisma.user.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  // Group by day
  const growthByDay: Record<string, number> = {};
  userGrowth.forEach((user) => {
    const day = user.createdAt.toISOString().split("T")[0];
    growthByDay[day] = (growthByDay[day] || 0) + 1;
  });

  return {
    totalUsers,
    usersLast30Days,
    usersLast7Days,
    totalRevenue: totalRevenue._sum.amount || 0,
    revenueLast30Days: revenueLast30Days._sum.amount || 0,
    revenueLast7Days: revenueLast7Days._sum.amount || 0,
    totalPayments,
    paymentsLast30Days,
    growthByDay,
  };
}

async function AnalyticsDashboard() {
  const analytics = await getAnalytics();

  const avgRevenuePerUser = analytics.totalUsers > 0
    ? analytics.totalRevenue / analytics.totalUsers / 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +{analytics.usersLast7Days} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(analytics.totalRevenue / 100).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              ${(analytics.revenueLast7Days / 100).toFixed(2)} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Revenue/User
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${avgRevenuePerUser.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime value per user
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payments
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPayments}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.paymentsLast30Days} in last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart (Simple Text Representation) */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth (Last 30 Days)</CardTitle>
          <CardDescription>New user signups by day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(analytics.growthByDay)
              .sort(([a], [b]) => b.localeCompare(a))
              .slice(0, 10)
              .map(([day, count]) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{day}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: count }, (_, i) => (
                        <div
                          key={i}
                          className="h-4 w-2 rounded-none bg-primary"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Period Comparisons */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Last 7 Days</CardTitle>
            <CardDescription>Recent activity summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">New Users</span>
              <span className="text-2xl font-bold">
                {analytics.usersLast7Days}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenue</span>
              <span className="text-2xl font-bold">
                ${(analytics.revenueLast7Days / 100).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last 30 Days</CardTitle>
            <CardDescription>Monthly activity summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">New Users</span>
              <span className="text-2xl font-bold">
                {analytics.usersLast30Days}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Revenue</span>
              <span className="text-2xl font-bold">
                ${(analytics.revenueLast30Days / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Payments</span>
              <span className="text-2xl font-bold">
                {analytics.paymentsLast30Days}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track user growth, revenue, and engagement
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <div className="text-muted-foreground">Loading analytics...</div>
          </div>
        }
      >
        <AnalyticsDashboard />
      </Suspense>
    </div>
  );
}
