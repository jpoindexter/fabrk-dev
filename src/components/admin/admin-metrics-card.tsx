/**
 * ✅ FABRK COMPONENT
 * Reusable metric card with trend indicators (up/down arrows, percentage change).
 *
 * @example
 * ```tsx
 * <AdminMetricsCard
 *   title="Total Users"
 *   value={1234}
 *   change={12.5}
 *   icon={<Users />}
 * />
 * ```
 */

"use client";

import * as React from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { mode } from "@/design-system";
interface AdminMetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  loading?: boolean;
  className?: string;
}

export function AdminMetricsCard({
  title,
  value,
  change,
  changeLabel = "vs last period",
  icon,
  iconClassName,
  variant = "default",
  loading = false,
  className,
}: AdminMetricsCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change !== undefined && change === 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  const variantStyles = {
    default: "border-border bg-card",
    primary: "border-primary bg-primary/5",
    success: "border-primary bg-primary/5",
    warning: "border-warning bg-warning/5",
    danger: "border-destructive bg-destructive/5",
  };

  const iconWrapperStyles = {
    default: "bg-accent text-accent-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-primary/10 text-primary",
    warning: "bg-warning/10 text-warning",
    danger: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className={cn("relative overflow-hidden", variantStyles[variant], className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-4">
            <p className="text-muted-foreground text-sm font-medium">{title}</p>

            {loading ? (
              <div className="space-y-2">
                <div className="bg-muted h-8 w-24 animate-pulse rounded" />
                <div className="bg-muted h-4 w-20 animate-pulse rounded" />
              </div>
            ) : (
              <>
                <div className="text-foreground text-3xl font-black">
                  {typeof value === "number" ? value.toLocaleString() : value}
                </div>

                {change !== undefined && (
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "border-border flex items-center gap-1 px-2 py-0.5 text-xs font-semibold",
                        mode.radius,
                        isPositive && "border-primary bg-primary/10 text-primary",
                        isNegative && "border-destructive bg-destructive/10 text-destructive",
                        isNeutral && "border-border bg-muted text-muted-foreground"
                      )}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {Math.abs(change).toFixed(1)}%
                    </div>
                    <span className="text-muted-foreground text-xs">{changeLabel}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {icon && (
            <div
              className={cn(
                "border-border flex h-12 w-12 items-center justify-center border",
                mode.radius,
                iconWrapperStyles[variant],
                iconClassName
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>

      {/* Background decoration */}
      <div
        className={cn(
          "absolute -right-8 -bottom-8 h-32 w-32 opacity-20 blur-3xl",
          mode.radius,
          variant === "primary" && "bg-primary",
          variant === "success" && "bg-primary",
          variant === "warning" && "bg-warning",
          variant === "danger" && "bg-destructive",
          variant === "default" && "bg-accent"
        )}
      />
    </Card>
  );
}
