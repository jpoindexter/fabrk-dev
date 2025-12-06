/**
 * ✅ FABRK COMPONENT
 * KPI Card - Key Performance Indicator card with optional trend
 *
 * @example
 * ```tsx
 * <KpiCard title="Revenue" value="$45,231" change={12} trend="up" />
 * ```
 */

"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import * as React from "react";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "./card";

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  icon?: React.ReactNode;
}

const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  ({ title, value, change, trend, subtitle, icon, className, ...props }, ref) => {
    const getTrendIcon = () => {
      switch (trend) {
        case "up":
          return <ArrowUp className="h-4 w-4" />;
        case "down":
          return <ArrowDown className="h-4 w-4" />;
        case "neutral":
          return <Minus className="h-4 w-4" />;
        default:
          return null;
      }
    };

    const getTrendColor = () => {
      switch (trend) {
        case "up":
          return "text-success";
        case "down":
          return "text-destructive";
        case "neutral":
          return "text-muted-foreground";
        default:
          return "";
      }
    };

    return (
      <TerminalCard data-slot="kpi-card" ref={ref} className={cn(className)} {...props}>
        <TerminalCardHeader code="0x00" title={title} icon={icon} />
        <TerminalCardContent padding="md">
          <div className="text-2xl font-semibold">{value}</div>
          {(change !== undefined || subtitle) && (
            <div className="flex items-center gap-2 text-xs">
              {change !== undefined && (
                <span className={cn("flex items-center gap-1 font-medium", getTrendColor())}>
                  {getTrendIcon()}
                  {Math.abs(change)}%
                </span>
              )}
              {subtitle && <span className="text-muted-foreground">{subtitle}</span>}
            </div>
          )}
        </TerminalCardContent>
      </TerminalCard>
    );
  }
);
KpiCard.displayName = "KpiCard";

export { KpiCard };
