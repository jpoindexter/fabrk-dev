/**
 * ✅ FABRK COMPONENT
 * Activity Feed - Recent user activity log
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

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
    <Card className="lg:col-span-3">
      <CardHeader code="0x01" title="ACTIVITY LOG" />
      <CardContent>
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [RECENT ACTIVITY]: COUNT={activities.length}
        </div>

        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div key={i} className={cn(mode.font, 'flex items-center gap-4 text-xs')}>
              <div className="border-border bg-muted flex h-8 w-8 items-center justify-center border">
                {activity.user
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-foreground">{activity.user}</div>
                <span className="text-muted-foreground">{activity.action}</span>
              </div>
              <span className="border-border text-muted-foreground inline-flex w-[90px] items-center justify-center border px-1 py-0.5 text-center text-[10px]">
                {activity.type}
              </span>
              <span className="text-muted-foreground shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
