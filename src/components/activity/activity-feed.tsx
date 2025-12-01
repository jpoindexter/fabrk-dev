/**
 * Activity Feed Component
 * Real-time activity feed for organizations
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { useOrgActivity } from "@/lib/pusher/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import {
  UserPlus,
  UserMinus,
  Shield,
  Mail,
  Settings,
  Activity as ActivityIcon
} from "lucide-react";

interface Activity {
  id: string;
  type: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: Date;
}

// DTO type for activities coming from API/Pusher
interface ActivityDTO {
  id: string;
  type: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: string | Date;
}

interface ActivityFeedProps {
  organizationId?: string;
  limit?: number;
  showHeader?: boolean;
}

export function ActivityFeed({
  organizationId,
  limit = 10,
  showHeader = true
}: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to real-time activity updates
  const handleNewActivity = useCallback((activity: ActivityDTO) => {
    setActivities((prev) => [
      {
        ...activity,
        timestamp: new Date(activity.timestamp),
      },
      ...prev.slice(0, limit - 1),
    ]);
  }, [limit]);

  useOrgActivity(organizationId, handleNewActivity);

  // Fetch initial activities (you would need to create this API endpoint)
  useEffect(() => {
    const fetchActivities = async () => {
      if (!organizationId) {
        setLoading(false);
        return;
      }

      try {
        // For now, use mock data
        // In production, fetch from /api/organizations/[id]/activities
        setActivities([
          {
            id: "1",
            type: "member_joined",
            description: "joined the organization",
            userId: "user1",
            userName: "Alice Johnson",
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
          },
          {
            id: "2",
            type: "member_invited",
            description: "invited a new member",
            userId: "user2",
            userName: "Bob Smith",
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
          },
          {
            id: "3",
            type: "role_changed",
            description: "role was changed to Admin",
            userId: "user3",
            userName: "Charlie Brown",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          },
        ]);
      } catch (error: unknown) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [organizationId]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "member_joined":
      case "member_added":
        return UserPlus;
      case "member_removed":
      case "member_left":
        return UserMinus;
      case "role_changed":
        return Shield;
      case "member_invited":
        return Mail;
      case "settings_changed":
        return Settings;
      default:
        return ActivityIcon;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "member_joined":
      case "member_added":
        return "text-success";
      case "member_removed":
      case "member_left":
        return "text-destructive";
      case "role_changed":
        return "text-info";
      case "member_invited":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!organizationId) {
    return (
      <Card>
        {showHeader && (
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Select an organization to view activity
            </CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No organization selected
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Real-time updates from your organization
          </CardDescription>
        </CardHeader>
      )}
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading activities...
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8">
            <ActivityIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">
              No recent activity
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                const iconColor = getActivityColor(activity.type);

                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-none border hover:bg-accent/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getUserInitials(activity.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {activity.userName}
                        </p>
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(activity.timestamp, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
