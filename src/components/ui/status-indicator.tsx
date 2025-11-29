"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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
        <div
          className={cn(
            "rounded-full",
            sizeMap[size],
            statusColors[status]
          )}
        />
        {showPulse && status === "online" && (
          <div
            className={cn(
              "absolute rounded-full animate-ping",
              sizeMap[size],
              statusColors[status],
              "opacity-75"
            )}
          />
        )}
      </div>
      {label !== undefined && (
        <span className="text-sm text-muted-foreground">
          {label || statusLabels[status]}
        </span>
      )}
    </div>
  );
}
