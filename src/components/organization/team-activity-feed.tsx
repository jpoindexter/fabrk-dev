/**
 * ✅ FABRK COMPONENT
 * Real-time feed of team actions with avatars.
 *
 * @example
 * ```tsx
 * <TeamActivityFeed activities={activities} />
 * ```
 */

"use client";

import * as React from "react";
import {
  FileText,
  MessageSquare,
  UserPlus,
  Settings,
  Upload,
  Trash2,
  Edit,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export type ActivityType =
  | "created"
  | "updated"
  | "deleted"
  | "commented"
  | "uploaded"
  | "invited"
  | "completed"
  | "configured";

export interface TeamActivity {
  id: string;
  type: ActivityType;
  user: {
    name: string;
    email?: string;
    avatar?: string;
  };
  action: string;
  target?: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

interface TeamActivityFeedProps {
  activities: TeamActivity[];
  maxHeight?: number;
  showTimestamp?: boolean;
  className?: string;
}

const activityConfig: Record<
  ActivityType,
  { icon: React.ElementType; color: string; bgColor: string }
> = {
  created: {
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  updated: {
    icon: Edit,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  deleted: {
    icon: Trash2,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  commented: {
    icon: MessageSquare,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  uploaded: {
    icon: Upload,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  invited: {
    icon: UserPlus,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  completed: {
    icon: CheckCircle2,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  configured: {
    icon: Settings,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
};

export function TeamActivityFeed({
  activities,
  maxHeight = 400,
  showTimestamp = true,
  className,
}: TeamActivityFeedProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimestamp = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-black">
            <Activity className="text-primary h-4 w-4" />
            Team Activity
          </CardTitle>
          <Badge variant="outline" className="font-medium">
            {activities.length} event{activities.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-full" style={{ maxHeight }}>
          <div className="space-y-0 p-6 pt-0">
            {activities.length === 0 ? (
              <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
                <Activity className="mb-2 h-8 w-8" />
                <p className="text-sm">No recent activity</p>
              </div>
            ) : (
              <div className="relative space-y-4">
                {/* Timeline line */}
                <div className="bg-border absolute top-0 bottom-0 left-[19px] w-0.5" />

                {activities.map((activity, _index) => {
                  const config = activityConfig[activity.type];
                  const Icon = config.icon;

                  return (
                    <div key={activity.id} className="group relative flex gap-4">
                      {/* Avatar with icon badge */}
                      <div className="relative flex-shrink-0">
                        <Avatar className="border-border h-10 w-10 border">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                            {getInitials(activity.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={cn(
                            "border-border absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center border",
                            mode.radius,
                            config.bgColor
                          )}
                        >
                          <Icon className={cn("h-3 w-3", config.color)} />
                        </div>
                      </div>

                      {/* Activity content */}
                      <div className="min-w-0 flex-1 space-y-1 pt-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-foreground text-sm">
                              <span className="font-bold">{activity.user.name}</span>{" "}
                              <span className="text-muted-foreground">{activity.action}</span>
                              {activity.target && (
                                <span className="text-foreground font-medium">
                                  {" "}
                                  {activity.target}
                                </span>
                              )}
                            </p>
                          </div>
                          {showTimestamp && (
                            <time className="text-muted-foreground flex-shrink-0 text-xs">
                              {formatTimestamp(activity.timestamp)}
                            </time>
                          )}
                        </div>

                        {/* Metadata */}
                        {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {Object.entries(activity.metadata).map(([key, value]) => (
                              <Badge key={key} variant="secondary" className="text-xs font-normal">
                                {key}: {String(value)}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
