/**
 * FABRK COMPONENT
 * Notification types reference grid
 */

import { getTypeIcon } from "./notification-types";

const notificationTypes = [
  { type: "info", label: "Info", color: "primary" },
  { type: "success", label: "Success", color: "success" },
  { type: "warning", label: "Warning", color: "warning" },
  { type: "error", label: "Error", color: "destructive" },
  { type: "message", label: "Message", color: "muted-foreground" },
] as const;

export function NotificationTypesReference() {
  return (
    <div className="grid md:grid-cols-5 gap-4">
      {notificationTypes.map((item) => {
        const Icon = getTypeIcon(item.type);
        return (
          <div key={item.type} className="border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
              <div className="flex gap-1">
                <div className="size-1.5 rounded-full bg-destructive/50" />
                <div className="size-1.5 rounded-full bg-warning/50" />
                <div className="size-1.5 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {item.type}.tsx
              </span>
            </div>
            <div className="p-3 text-center">
              <Icon className={`h-6 w-6 mx-auto mb-2 text-${item.color}`} />
              <div className="font-mono text-xs font-medium">{item.label}</div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                [{item.type.toUpperCase()}]
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
