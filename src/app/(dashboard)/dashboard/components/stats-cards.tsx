/**
 * Stats Cards Component
 * Displays dashboard statistics in card format
 */

"use client";

import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import { DollarSign, Users, Upload, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  activeUsers: number;
  usersChange: number;
  totalUploads: number;
  uploadsChange: number;
  storageUsed: number;
  storageLimit: number;
}

interface StatsCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
}

interface StatCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  change?: number;
  loading: boolean;
  customContent?: React.ReactNode;
}

function StatCard({ title, icon: Icon, value, change, loading, customContent }: StatCardProps) {
  const terminalTitle = title.toUpperCase().replace(/ /g, "_");
  return (
    <TerminalCard>
      <TerminalCardHeader code="0x00" title={terminalTitle} icon={<Icon className="h-4 w-4" />} />
      <TerminalCardContent>
        <div className="font-mono text-2xl font-semibold">{loading ? "..." : value}</div>
        {!loading && change !== undefined && (
          <p className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
            {change >= 0 ? (
              <>
                <ArrowUpRight className="text-success h-3 w-3" />
                <span className="text-success">+{change}%</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="text-destructive h-3 w-3" />
                <span className="text-destructive">{change}%</span>
              </>
            )}
            <span>from last month</span>
          </p>
        )}
        {!loading && customContent}
      </TerminalCardContent>
    </TerminalCard>
  );
}

export function StatsCards({ stats, loading }: StatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        icon={DollarSign}
        value={`$${stats?.totalRevenue.toLocaleString()}`}
        change={stats?.revenueChange}
        loading={loading}
      />

      <StatCard
        title="Active Users"
        icon={Users}
        value={stats?.activeUsers.toLocaleString() || ""}
        change={stats?.usersChange}
        loading={loading}
      />

      <StatCard
        title="Total Uploads"
        icon={Upload}
        value={stats?.totalUploads.toLocaleString() || ""}
        change={stats?.uploadsChange}
        loading={loading}
      />

      <StatCard
        title="Storage Used"
        icon={TrendingUp}
        value={`${stats?.storageUsed} / ${stats?.storageLimit} GB`}
        loading={loading}
        customContent={
          stats && (
            <div className="mt-2">
              <div className={cn("bg-secondary h-2 w-full overflow-hidden", mode.radius)}>
                <div
                  className="bg-primary h-full transition-all duration-300"
                  data-storage-percent={(stats.storageUsed / stats.storageLimit) * 100}
                  style={{
                    width: `${(stats.storageUsed / stats.storageLimit) * 100}%`,
                  }}
                />
              </div>
            </div>
          )
        }
      />
    </div>
  );
}
