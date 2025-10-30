import * as React from "react";
import { cn } from "@/lib/utils";
import { CardContent } from "./card";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  trend?: "up" | "down" | "neutral";
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function KpiCard({
  title,
  value,
  change,
  trend = "neutral",
  description,
  icon,
  className,
}: KpiCardProps) {
  const changeColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-muted-foreground",
  };

  return (
    <CardContent className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {(change !== undefined || description) && (
            <p className={cn("text-xs font-medium", changeColors[trend])}>
              {change !== undefined && `${trend === "up" ? "+" : ""}${change}%`}
              {description && (
                <span className="ml-1 text-muted-foreground">{description}</span>
              )}
            </p>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </CardContent>
  );
}
