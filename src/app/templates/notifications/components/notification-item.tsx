/**
 * FABRK COMPONENT
 * Individual notification item
 */

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Trash2 } from "lucide-react";
import { Notification, getTypeIcon, getTypeColor } from "./notification-types";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) {
  const Icon = getTypeIcon(notification.type);
  const colorClass = getTypeColor(notification.type);

  return (
    <div
      className={`border border-border p-4 transition-colors hover:bg-muted/30 ${
        !notification.read ? "bg-primary/5" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`p-2 border border-border ${
            notification.type === "error"
              ? "bg-destructive/10"
              : notification.type === "warning"
                ? "bg-warning/10"
                : notification.type === "success"
                  ? "bg-success/10"
                  : "bg-muted/30"
          }`}
        >
          <Icon className={`h-4 w-4 ${colorClass}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-sm font-medium">
              {notification.title}
            </span>
            {!notification.read && (
              <Badge variant="default" size="sm" className="rounded-none font-mono text-[10px] px-1 h-4">
                NEW
              </Badge>
            )}
          </div>
          <p className="font-mono text-xs text-muted-foreground mb-2">
            {notification.message}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-muted-foreground">
              {notification.timestamp}
            </span>
            {notification.actionUrl && (
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 font-mono text-[10px] text-primary"
              >
                &gt; VIEW_DETAILS
              </Button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {!notification.read && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkAsRead(notification.id)}
              className="h-7 w-7 p-0 rounded-none"
              title="Mark as read"
            >
              <Check className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(notification.id)}
            className="h-7 w-7 p-0 rounded-none text-destructive hover:text-destructive"
            title="Delete"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
