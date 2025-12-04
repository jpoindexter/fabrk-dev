/**
 * ✅ FABRK COMPONENT
 * Activity Feed - Recent team activity log
 */

import { Clock } from "lucide-react";
import { StyledCardHeader } from "@/components/ui/card";

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
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="ACTIVITY_LOG" />
      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">[ACTIVITY_FEED]:</div>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="border-primary flex gap-4 border-l-2 pl-4">
              <Clock className="text-muted-foreground mt-0.5 h-3 w-3 shrink-0" />
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
                {activity.details && <p className="text-muted-foreground">{activity.details}</p>}
                <p className="text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
