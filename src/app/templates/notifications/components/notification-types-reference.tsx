/**
 * FABRK COMPONENT
 * Notification types reference grid
 */

import { getTypeIcon } from "./notification-types";
import { WindowControls } from "@/components/ui/window-controls";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const notificationTypes = [
  { type: "info", label: "Info", color: "primary" },
  { type: "success", label: "Success", color: "success" },
  { type: "warning", label: "Warning", color: "warning" },
  { type: "error", label: "Error", color: "destructive" },
  { type: "message", label: "Message", color: "muted-foreground" },
] as const;

export function NotificationTypesReference() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {notificationTypes.map((item) => {
        const Icon = getTypeIcon(item.type);
        return (
          <div key={item.type} className="border-border bg-card border">
            <div className="border-border flex items-center gap-2 border-b px-4 py-1.5">
              <WindowControls size="xs" />
              <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                {item.type}.tsx
              </span>
            </div>
            <div className="p-4 text-center">
              <Icon className={`mx-auto mb-2 h-6 w-6 text-${item.color}`} />
              <div className={cn(mode.font, "text-xs font-medium")}>{item.label}</div>
              <div className={cn(mode.font, "text-muted-foreground mt-1 text-xs")}>
                [{item.type.toUpperCase()}]
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
