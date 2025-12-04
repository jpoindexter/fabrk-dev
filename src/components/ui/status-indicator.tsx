"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";

export type Status = "online" | "offline" | "busy" | "away" | "idle";

interface StatusIndicatorProps {
  status: Status;
  label?: string;
  showPulse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusColors: Record<Status, string> = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  busy: "bg-destructive",
  away: "bg-warning",
  idle: "bg-warning",
};

const statusLabels: Record<Status, string> = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  away: "Away",
  idle: "Idle",
};

const sizeMap = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

export function StatusIndicator({
  status,
  label,
  showPulse = false,
  size = "md",
  className,
}: StatusIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        <div className={cn(sizeMap[size], statusColors[status], mode.radius)} />
        {showPulse && status === "online" && (
          <div
            className={cn(
              "absolute animate-ping opacity-75",
              sizeMap[size],
              statusColors[status],
              mode.radius
            )}
          />
        )}
      </div>
      {label !== undefined && (
        <span className={cn("text-muted-foreground text-xs", mode.font)}>
          {label || statusLabels[status]}
        </span>
      )}
    </div>
  );
}
