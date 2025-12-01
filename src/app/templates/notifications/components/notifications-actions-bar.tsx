/**
 * FABRK COMPONENT
 * Notifications actions bar
 */

import { Button } from "@/components/ui/button";
import { CheckCheck, Archive, Settings } from "lucide-react";

interface NotificationsActionsBarProps {
  totalNotifications: number;
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export function NotificationsActionsBar({
  totalNotifications,
  unreadCount,
  onMarkAllAsRead,
  onClearAll,
}: NotificationsActionsBarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="font-mono text-xs text-muted-foreground">
        [NOTIFICATIONS]: TOTAL={totalNotifications} | UNREAD={unreadCount}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0}
          className="rounded-none font-mono text-xs h-7"
        >
          <CheckCheck className="mr-1 h-3 w-3" />
          &gt; MARK_ALL_READ
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          disabled={totalNotifications === 0}
          className="rounded-none font-mono text-xs h-7"
        >
          <Archive className="mr-1 h-3 w-3" />
          &gt; CLEAR_ALL
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-none font-mono text-xs h-7"
        >
          <Settings className="mr-1 h-3 w-3" />
          &gt; SETTINGS
        </Button>
      </div>
    </div>
  );
}
