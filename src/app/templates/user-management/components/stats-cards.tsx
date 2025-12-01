/**
 * Stats cards component showing user metrics
 */

import type { User } from "./types";

interface StatsCardsProps {
  users: User[];
}

export function StatsCards({ users }: StatsCardsProps) {
  const activeCount = users.filter((u) => u.status === "active").length;
  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const enterpriseCount = users.filter((u) => u.plan === "Enterprise").length;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[TOTAL_USERS]:</div>
        <div className="text-3xl font-bold">{users.length}</div>
        <div className="font-mono text-xs text-muted-foreground mt-1">
          STATUS: <span className="text-success">INDEXED</span>
        </div>
      </div>
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[ACTIVE_USERS]:</div>
        <div className="text-3xl font-bold">{activeCount}</div>
        <div className="font-mono text-xs text-muted-foreground mt-1">
          RATE: <span className="text-success">{Math.round((activeCount / users.length) * 100)}%</span>
        </div>
      </div>
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[ADMINS]:</div>
        <div className="text-3xl font-bold">{adminCount}</div>
        <div className="font-mono text-xs text-muted-foreground mt-1">
          ROLE: <span className="text-primary">ELEVATED</span>
        </div>
      </div>
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[ENTERPRISE]:</div>
        <div className="text-3xl font-bold">{enterpriseCount}</div>
        <div className="font-mono text-xs text-muted-foreground mt-1">
          PLAN: <span className="text-primary">PREMIUM</span>
        </div>
      </div>
    </div>
  );
}
