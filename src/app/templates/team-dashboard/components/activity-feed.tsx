/**
 * ✅ FABRK COMPONENT
 * Activity Feed - Recent team activity log
 */

import { Clock } from "lucide-react";

interface Activity {
  id: string;
  type: string;
  user: string;
  target: string;
  details?: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">activity.log</span>
      </div>
      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-4">[ACTIVITY_FEED]:</div>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-4 border-l-2 border-primary pl-4"
            >
              <Clock className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
              <div className="font-mono text-xs">
                <p>
                  <span className="text-foreground">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">
                    {activity.type === "member_added" && "ADDED"}
                    {activity.type === "role_changed" && "CHANGED_ROLE"}
                    {activity.type === "invitation_sent" && "INVITED"}
                    {activity.type === "member_removed" && "REMOVED"}
                  </span>{" "}
                  <span className="text-foreground">{activity.target}</span>
                </p>
                {activity.details && (
                  <p className="text-muted-foreground">{activity.details}</p>
                )}
                <p className="text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
