/**
 * ✅ FABRK COMPONENT
 * Stats Cards - Organization metrics
 */

import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  organization: {
    name: string;
    plan: string;
    memberLimit: number;
  };
  membersCount: number;
  pendingInvitationsCount: number;
  activeNowCount: number;
}

export function StatsCards({
  organization,
  membersCount,
  pendingInvitationsCount,
  activeNowCount,
}: StatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-1 text-xs")}>[ORGANIZATION]:</div>
        <div className={cn(mode.font, "text-2xl font-bold")}>{organization.name}</div>
        <div className={cn(mode.font, "text-muted-foreground mt-2 text-xs")}>
          PLAN: <span className="text-primary">{organization.plan.toUpperCase()}</span>
        </div>
      </div>
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-1 text-xs")}>[TEAM_SIZE]:</div>
        <div className={cn(mode.font, "text-2xl font-bold")}>
          {membersCount} / {organization.memberLimit}
        </div>
        <div className={cn(mode.font, "text-muted-foreground mt-2 text-xs")}>
          STATUS:{" "}
          <span className="text-success">
            {organization.memberLimit - membersCount}_SEATS_AVAILABLE
          </span>
        </div>
      </div>
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-1 text-xs")}>
          [PENDING_INVITES]:
        </div>
        <div className={cn(mode.font, "text-2xl font-bold")}>{pendingInvitationsCount}</div>
        <div className={cn(mode.font, "text-muted-foreground mt-2 text-xs")}>
          STATUS: <span className="text-warning">AWAITING_RESPONSE</span>
        </div>
      </div>
      <div className="border-border bg-card border p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-1 text-xs")}>[ACTIVE_NOW]:</div>
        <div className={cn(mode.font, "text-2xl font-bold")}>{activeNowCount}</div>
        <div className={cn(mode.font, "text-muted-foreground mt-2 text-xs")}>
          STATUS: <span className="text-success">ONLINE</span>
        </div>
      </div>
    </div>
  );
}
