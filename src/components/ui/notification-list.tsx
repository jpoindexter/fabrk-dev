/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - Error/loading states ✓
 *
 * @example
 * ```tsx
 * <NotificationList />
 * ```
 */

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, Bell, Check, X } from "lucide-react";
import * as React from "react";

export interface Notification {
  id: string;
  title: string;
  description?: string;
  time: string;
  read?: boolean;
  type?: "info" | "success" | "warning" | "error";
}

export interface NotificationListProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const NotificationList = React.forwardRef<HTMLDivElement, NotificationListProps>(
  (
    {
      className,
      loading = false,
      error = false,
      notifications = [],
      onMarkAsRead,
      onDismiss,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          data-slot="notification-list"
          ref={ref}
          className={cn(`space-y-2`, className, "")}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`animate-pulse  `}>
              <div className={`flex gap-6 `}>
                <div className={`"h-8 w-8" rounded-full border border-border bg-card`} />
                <div className={`flex-1 space-y-2 `}>
                  <div className="h-4 w-3/4 rounded border border-border bg-card" />
                  <div className="h-3 w-1/2 rounded border border-border bg-card" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className={cn("p-6 text-destructive", className, "")}>Error loading notifications</div>
      );
    }

    const getIcon = (type?: string) => {
      switch (type) {
        case "success":
          return <Check className={`"h-4 w-4" text-primary`} />;
        case "warning":
          return (
            <AlertCircle
              className={`"h-4 w-4" text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
            />
          );
        case "error":
          return <X className={`"h-4 w-4" text-destructive`} />;
        default:
          return <Bell className={`"h-4 w-4" text-primary dark:text-primary`} />;
      }
    };

    return (
      <div ref={ref} className={cn("", className, "")} {...props}>
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground dark:text-muted-foreground">
            No notifications
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "cursor-pointer p-6 transition-all duration-200",
                  "hover:translate-x-1 hover:bg-accent/50",
                  "focus-within:ring-2 focus-within:ring-ring focus-visible:outline-none",
                  !notification.read && "bg-accent/10 dark:bg-accent/5",
                  ""
                )}
                onClick={() => onMarkAsRead?.(notification.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onMarkAsRead?.(notification.id);
                  }
                }}
                aria-label={`Notification: ${notification.title}${!notification.read ? " (unread)" : ""}`}
              >
                <div className={`flex gap-6 `}>
                  <div
                    className={`"h-8 w-8" flex items-center justify-center rounded-full border border-border bg-card transition-transform hover:scale-110`}
                  >
                    {getIcon(notification.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 font-medium transition-colors hover:text-primary dark:text-muted-foreground dark:hover:text-primary">
                      {notification.title}
                    </p>
                    {notification.description && (
                      <p
                        className={`"text-sm" line-clamp-2 text-muted-foreground transition-colors dark:text-muted-foreground dark:hover:text-muted-foreground`}
                      >
                        {notification.description}
                      </p>
                    )}
                    <p
                      className={`"text-xs" mt-2 text-muted-foreground transition-colors dark:text-muted-foreground dark:hover:text-muted-foreground`}
                    >
                      {notification.time}
                    </p>
                  </div>
                  {onDismiss && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss(notification.id);
                      }}
                      className="text-muted-foreground transition-all hover:scale-110 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-muted-foreground dark:hover:text-destructive"
                      aria-label="Dismiss notification"
                    >
                      <X className={`"h-4 w-4"`} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
NotificationList.displayName = "NotificationList";
