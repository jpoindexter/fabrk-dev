/**
 * Notification Center
 * Display persistent in-app notifications
 */

"use client";

import { useState } from "react";
import { useNotifications } from "@/lib/notifications/hooks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  DollarSign,
  Shield,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  feature: Settings,
  payment: DollarSign,
  security: Shield,
  system: Settings,
};

const colorMap = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-orange-500",
  info: "text-blue-500",
  feature: "text-purple-500",
  payment: "text-green-500",
  security: "text-orange-500",
  system: "text-gray-500",
};

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications();

  const [open, setOpen] = useState(false);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(id);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 min-w-5 px-1 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between p-4 pb-2">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAllAsRead()}
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearAll()}
                className="text-destructive"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-[500px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="mb-2 h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = iconMap[notification.type];
              const iconColor = colorMap[notification.type];

              return (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "cursor-pointer flex-col items-start gap-2 p-4",
                    !notification.read && "bg-muted/50"
                  )}
                  onClick={() => {
                    handleMarkAsRead(notification.id);
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl;
                    }
                  }}
                >
                  <div className="flex w-full items-start gap-3">
                    <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor)} />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-semibold">{notification.title}</div>
                        <button
                          onClick={(e) => handleDelete(notification.id, e)}
                          className="shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(notification.createdAt)}
                        </span>

                        {!notification.read && (
                          <Badge variant="default" className="h-5 px-1 text-xs">
                            New
                          </Badge>
                        )}

                        {notification.priority === "urgent" && (
                          <Badge variant="destructive" className="h-5 px-1 text-xs">
                            Urgent
                          </Badge>
                        )}

                        {notification.priority === "high" && (
                          <Badge variant="default" className="h-5 px-1 text-xs">
                            Important
                          </Badge>
                        )}
                      </div>

                      {notification.actionUrl && notification.actionLabel && (
                        <div className="mt-2">
                          <span className="text-sm font-medium text-primary underline">
                            {notification.actionLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
