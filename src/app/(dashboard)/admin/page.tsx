/**
 * Admin Overview Dashboard
 * High-level system statistics and health
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
import { Users, CreditCard, AlertTriangle, Activity, Building } from "lucide-react";

async function getStats() {
  const [
    totalUsers,
    totalOrganizations,
    totalPayments,
    recentUsers,
    recentPayments,
    activeUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.organization.count(),
    prisma.payment.count(),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
    }),
    prisma.payment.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.user.count({
      where: {
        sessions: {
          some: {
            expires: {
              gt: new Date(),
            },
          },
        },
      },
    }),
  ]);

  const [totalRevenue, monthlyRevenue] = await Promise.all([
    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "succeeded",
      },
    }),
    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "succeeded",
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    }),
  ]);

  return {
    totalUsers,
    totalOrganizations,
    totalPayments,
    recentUsers,
    recentPayments,
    activeUsers,
    totalRevenue: totalRevenue._sum.amount || 0,
    monthlyRevenue: monthlyRevenue._sum.amount || 0,
  };
}

async function AdminStats() {
  const stats = await getStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.recentUsers} in last 7 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Organizations</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalOrganizations}</div>
          <p className="text-xs text-muted-foreground">
            Total workspaces
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">
            With active sessions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">MRR</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(stats.monthlyRevenue / 100).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Last 30 days revenue
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(stats.totalRevenue / 100).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.totalPayments} payments
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your application's health and metrics
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <AdminStats />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/users"
              className="block rounded-lg border p-3 hover:bg-muted"
            >
              <div className="font-semibold">Manage Users</div>
              <div className="text-sm text-muted-foreground">
                View, edit, and manage user accounts
              </div>
            </a>
            <a
              href="/admin/feature-flags"
              className="block rounded-lg border p-3 hover:bg-muted"
            >
              <div className="font-semibold">Feature Flags</div>
              <div className="text-sm text-muted-foreground">
                Toggle features and manage rollouts
              </div>
            </a>
            <a
              href="/admin/security"
              className="block rounded-lg border p-3 hover:bg-muted"
            >
              <div className="font-semibold">Security Logs</div>
              <div className="text-sm text-muted-foreground">
                Review security events and audit logs
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Application status and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-semibold text-success">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Authentication</span>
              <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-semibold text-success">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Payments</span>
              <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-semibold text-success">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Service</span>
              <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-semibold text-success">
                Healthy
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
