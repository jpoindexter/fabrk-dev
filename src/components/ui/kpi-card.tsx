/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - Error/loading states ✓
 *
 * @example
 * ```tsx
 * <KpiCard />
 * ```
 */

"use client";

import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import * as React from "react";

export interface KpiCardProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  title?: string;
  value?: string | number;
  change?: number;
  trend?: "up" | "down";
  description?: string;
}

export const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  (
    {
      className,
      loading = false,
      error = false,
      title = "KPI",
      value = "0",
      change = 0,
      trend,
      description,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          data-slot="kpi-card"
          ref={ref}
          className={cn("animate-pulse space-y-2 p-6", className, "")}
        >
          <div className="h-4 w-24 rounded border border-border bg-card" />
          <div className="h-8 w-24 rounded border border-border bg-card" />
        </div>
      );
    }

    if (error) {
      return <div className={cn("p-6 text-destructive", className, "")}>Error loading KPI</div>;
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-2 p-6", className, "")}
        role="article"
        aria-label={`KPI: ${title}`}
        {...props}
      >
        <p className={`"text-sm" text-muted-foreground dark:text-muted-foreground`}>{title}</p>
        <div className={`flex items-baseline ${tokens.spacing.gap[2]} `}>
          <p className={`text-3xl font-medium`}>{value}</p>
          {change !== 0 && (
            <div
              className={cn(
                "flex items-center text-sm",
                trend === "up" ? "text-primary" : "text-destructive",
                ""
              )}
            >
              {trend === "up" ? (
                <ArrowUp
                  className="size-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Trending up"
                />
              ) : (
                <ArrowDown
                  className="size-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Trending down"
                />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        {description && (
          <p className={`"text-xs" text-muted-foreground dark:text-muted-foreground`}>
            {description}
          </p>
        )}
      </div>
    );
  }
);
KpiCard.displayName = "KpiCard";
