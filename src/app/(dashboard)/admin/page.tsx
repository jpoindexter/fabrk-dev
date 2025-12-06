/**
 * Admin Overview Dashboard
 * High-level system statistics and health
 */

import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import { Users, CreditCard, Activity, Building, Zap } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

async function getStats() {
  const [totalUsers, totalOrganizations, totalPayments, recentUsers, recentPayments, activeUsers] =
    await Promise.all([
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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      <TerminalCard tone="primary">
        <TerminalCardHeader code="0x01" title="TOTAL_USERS" icon={<Users className="h-4 w-4" />} />
        <TerminalCardContent>
          <div className="text-2xl font-semibold">{stats.totalUsers}</div>
          <p className="text-muted-foreground text-xs">+{stats.recentUsers} in last 7 days</p>
        </TerminalCardContent>
      </TerminalCard>

      <TerminalCard tone="neutral">
        <TerminalCardHeader
          code="0x02"
          title="ORGANIZATIONS"
          icon={<Building className="h-4 w-4" />}
        />
        <TerminalCardContent>
          <div className="text-2xl font-semibold">{stats.totalOrganizations}</div>
          <p className="text-muted-foreground text-xs">Total workspaces</p>
        </TerminalCardContent>
      </TerminalCard>

      <TerminalCard tone="success">
        <TerminalCardHeader
          code="0x03"
          title="ACTIVE_USERS"
          icon={<Activity className="h-4 w-4" />}
        />
        <TerminalCardContent>
          <div className="text-2xl font-semibold">{stats.activeUsers}</div>
          <p className="text-muted-foreground text-xs">With active sessions</p>
        </TerminalCardContent>
      </TerminalCard>

      <TerminalCard tone="primary">
        <TerminalCardHeader code="0x04" title="MRR" icon={<CreditCard className="h-4 w-4" />} />
        <TerminalCardContent>
          <div className="text-2xl font-semibold">${(stats.monthlyRevenue / 100).toFixed(2)}</div>
          <p className="text-muted-foreground text-xs">Last 30 days revenue</p>
        </TerminalCardContent>
      </TerminalCard>

      <TerminalCard tone="success">
        <TerminalCardHeader
          code="0x05"
          title="TOTAL_REVENUE"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <TerminalCardContent>
          <div className="text-2xl font-semibold">${(stats.totalRevenue / 100).toFixed(2)}</div>
          <p className="text-muted-foreground text-xs">{stats.totalPayments} payments</p>
        </TerminalCardContent>
      </TerminalCard>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your application's health and metrics</p>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <TerminalCard key={i} tone="neutral">
                <TerminalCardHeader code={`0x0${i + 1}`} title="LOADING" />
                <TerminalCardContent>
                  <div className="bg-muted h-8 w-16 animate-pulse rounded" />
                </TerminalCardContent>
              </TerminalCard>
            ))}
          </div>
        }
      >
        <AdminStats />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <TerminalCard tone="neutral">
          <TerminalCardHeader
            code="0x06"
            title="QUICK_ACTIONS"
            meta="Common tasks"
            icon={<Zap className="h-4 w-4" />}
          />
          <TerminalCardContent className="space-y-2">
            <a href="/admin/users" className={cn("hover:bg-muted block border p-4", mode.radius)}>
              <div className="font-semibold">Manage Users</div>
              <div className="text-muted-foreground text-sm">
                View, edit, and manage user accounts
              </div>
            </a>
            <a
              href="/admin/feature-flags"
              className={cn("hover:bg-muted block border p-4", mode.radius)}
            >
              <div className="font-semibold">Feature Flags</div>
              <div className="text-muted-foreground text-sm">
                Toggle features and manage rollouts
              </div>
            </a>
            <a
              href="/admin/security"
              className={cn("hover:bg-muted block border p-4", mode.radius)}
            >
              <div className="font-semibold">Security Logs</div>
              <div className="text-muted-foreground text-sm">
                Review security events and audit logs
              </div>
            </a>
          </TerminalCardContent>
        </TerminalCard>

        <TerminalCard tone="success">
          <TerminalCardHeader
            code="0x07"
            title="SYSTEM_HEALTH"
            meta="Status & Performance"
            icon={<Activity className="h-4 w-4" />}
          />
          <TerminalCardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <span
                className={cn(
                  "bg-success/10 text-success px-2 py-1 text-xs font-semibold",
                  mode.radius
                )}
              >
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Authentication</span>
              <span
                className={cn(
                  "bg-success/10 text-success px-2 py-1 text-xs font-semibold",
                  mode.radius
                )}
              >
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Payments</span>
              <span
                className={cn(
                  "bg-success/10 text-success px-2 py-1 text-xs font-semibold",
                  mode.radius
                )}
              >
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Service</span>
              <span
                className={cn(
                  "bg-success/10 text-success px-2 py-1 text-xs font-semibold",
                  mode.radius
                )}
              >
                Healthy
              </span>
            </div>
          </TerminalCardContent>
        </TerminalCard>
      </div>
    </div>
  );
}
