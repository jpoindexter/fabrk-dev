/**
 * ✅ FABRK COMPONENT
 * Stats Cards - Organization metrics
 */

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
    <div className="grid gap-4 md:grid-cols-4">
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[ORGANIZATION]:</div>
        <div className="text-2xl font-bold">{organization.name}</div>
        <div className="font-mono text-xs text-muted-foreground mt-2">
          PLAN: <span className="text-primary">{organization.plan.toUpperCase()}</span>
        </div>
      </div>
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[TEAM_SIZE]:</div>
        <div className="text-2xl font-bold">
          {membersCount} / {organization.memberLimit}
        </div>
        <div className="font-mono text-xs text-muted-foreground mt-2">
          STATUS: <span className="text-success">{organization.memberLimit - membersCount}_SEATS_AVAILABLE</span>
        </div>
      </div>
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[PENDING_INVITES]:</div>
        <div className="text-2xl font-bold">{pendingInvitationsCount}</div>
        <div className="font-mono text-xs text-muted-foreground mt-2">
          STATUS: <span className="text-warning">AWAITING_RESPONSE</span>
        </div>
      </div>
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[ACTIVE_NOW]:</div>
        <div className="text-2xl font-bold">{activeNowCount}</div>
        <div className="font-mono text-xs text-muted-foreground mt-2">
          STATUS: <span className="text-success">ONLINE</span>
        </div>
      </div>
    </div>
  );
}
