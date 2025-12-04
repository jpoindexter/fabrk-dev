/**
 * ✅ FABRK COMPONENT
 * Activity Feed - Recent user activity log
 */

import { StyledCardHeader } from "@/components/ui/card";

export interface ActivityItem {
  user: string;
  action: string;
  time: string;
  type: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="border-border bg-card border lg:col-span-3">
      <StyledCardHeader code="0x00" title="ACTIVITY_LOG" />
      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">
          [RECENT_ACTIVITY]: COUNT={activities.length}
        </div>

        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-4 font-mono text-xs">
              <div className="border-border bg-muted flex h-8 w-8 items-center justify-center border">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground truncate">{activity.user}</span>
                  <span className="border-border text-muted-foreground border px-1.5 py-0.5">
                    {activity.type}
                  </span>
                </div>
                <span className="text-muted-foreground">{activity.action}</span>
              </div>
              <span className="text-muted-foreground shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
