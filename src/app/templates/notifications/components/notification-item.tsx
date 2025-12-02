import { type Notification } from "./notification-types"; // Correct import path
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Trash2 } from "lucide-react"; // Import Lucide icons used directly in NotificationItem
import Link from "next/link";
import { useMemo } from "react";
import { getTypeIcon, getTypeColor } from "./notification-types"; // Import getTypeIcon and getTypeColor

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  // Use useMemo to ensure Icon and colorClass are stable across renders
  const { Icon, colorClass } = useMemo(
    () => ({
      Icon: getTypeIcon(notification.type),
      colorClass: getTypeColor(notification.type),
    }),
    [notification.type]
  );

  return (
    <div
      className={cn(
        "border-border bg-card relative flex w-full items-start gap-4 rounded-none border p-4 shadow-sm transition-colors",
        !notification.read && "bg-primary/5 hover:bg-primary/10"
      )}
    >
      {/* Icon */}
      <div
        className={`border-border bg-background flex size-8 flex-shrink-0 items-center justify-center rounded-none border ${colorClass}`}
      >
        <Icon className={`h-4 w-4 ${colorClass}`} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="border-border rounded-none px-2 py-0.5 font-mono text-xs uppercase"
          >
            {notification.type.replace(/_/g, " ")}
          </Badge>
          <span className="text-muted-foreground font-mono text-xs">{notification.timestamp}</span>
        </div>
        <h4 className="text-foreground mt-2 font-mono text-sm font-semibold">
          {notification.title}
        </h4>
        <p className="text-muted-foreground mt-1 font-mono text-xs">{notification.message}</p>

        {notification.actionUrl && (
          <Button
            variant="link"
            size="sm"
            asChild
            className="mt-2 rounded-none px-0 font-mono text-xs font-semibold"
          >
            <Link href={notification.actionUrl}>VIEW_DETAILS</Link>
          </Button>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {!notification.read && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-none font-mono text-xs"
              onClick={() => onMarkAsRead(notification.id)}
            >
              <Check className="mr-2 size-3" /> Mark as Read
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            className="rounded-none font-mono text-xs"
            onClick={() => onDelete(notification.id)}
          >
            <Trash2 className="mr-2 size-3" /> Delete
          </Button>
        </div>
      </div>

      {/* Read indicator */}
      {!notification.read && (
        <span className="bg-primary absolute top-2 right-2 size-2 rounded-none" />
      )}
    </div>
  );
}
