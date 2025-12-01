/**
 * ✅ FABRK COMPONENT
 * Activity Feed - Recent user activity log
 */

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
    <div className="lg:col-span-3 border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">activity_log.txt</span>
      </div>
      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-4">
          [RECENT_ACTIVITY]: COUNT={activities.length}
        </div>

        <div className="space-y-3">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-3 font-mono text-xs">
              <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted">
                {activity.user.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-foreground truncate">{activity.user}</span>
                  <span className="border border-border px-1.5 py-0.5 text-muted-foreground">
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
