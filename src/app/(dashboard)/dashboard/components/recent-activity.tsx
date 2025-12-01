/**
 * Recent Activity Component
 * Displays recent account activities
 */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  DollarSign,
  Upload,
  Settings,
  Shield,
  Clock,
} from "lucide-react";

export interface ActivityItem {
  id: string;
  type: "login" | "upload" | "payment" | "setting" | "security";
  description: string;
  timestamp: Date;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

function getActivityIcon(type: ActivityItem["type"]) {
  switch (type) {
    case "login":
      return Activity;
    case "upload":
      return Upload;
    case "payment":
      return DollarSign;
    case "setting":
      return Settings;
    case "security":
      return Shield;
  }
}

function formatTimestamp(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle as="h2">Recent Activity</CardTitle>
        <CardDescription>
          Your recent account activity and actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="flex items-center gap-6 rounded-none border p-3"
              >
                <div className="rounded-full bg-secondary p-2">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimestamp(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
