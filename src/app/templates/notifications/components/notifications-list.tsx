/**
 * FABRK COMPONENT
 * Notifications list with empty state
 */

import { Bell } from "lucide-react";
import { Notification } from "./notification-types";
import { NotificationItem } from "./notification-item";

interface NotificationsListProps {
  notifications: Notification[];
  activeTab: string;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationsList({
  notifications,
  activeTab,
  onMarkAsRead,
  onDelete,
}: NotificationsListProps) {
  if (notifications.length === 0) {
    return (
      <div className="border border-border bg-muted/30 p-8 text-center">
        <Bell className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <div className="font-mono text-sm text-muted-foreground">
          {activeTab === "unread"
            ? "[NO_UNREAD_NOTIFICATIONS]"
            : "[NO_NOTIFICATIONS]"}
        </div>
        <div className="font-mono text-xs text-muted-foreground mt-1">
          You&apos;re all caught up!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
