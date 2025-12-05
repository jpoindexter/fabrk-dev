/**
 * ✅ FABRK COMPONENT
 * Conversion funnel visualization component.
 *
 * @example
 * ```tsx
 * <FunnelVisualizer
 *   stages={[
 *     { name: "Visitors", value: 10000 },
 *     { name: "Sign Ups", value: 2500 },
 *     { name: "Conversions", value: 500 }
 *   ]}
 * />
 * ```
 */

"use client";

import * as React from "react";
import { TrendingDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { mode } from "@/design-system";
export interface FunnelStage {
  name: string;
  value: number;
  color?: string;
}

interface FunnelVisualizerProps {
  stages: FunnelStage[];
  title?: string;
  description?: string;
  className?: string;
}

const DEFAULT_COLORS = [
  "hsl(var(--primary))",
  "oklch(var(--chart-6))",
  "oklch(var(--chart-7))",
  "oklch(var(--chart-8))",
  "oklch(var(--chart-9))",
];

export function FunnelVisualizer({
  stages,
  title = "Conversion Funnel",
  description,
  className,
}: FunnelVisualizerProps) {
  const maxValue = Math.max(...stages.map((s) => s.value));

  const calculateConversionRate = (currentValue: number, previousValue: number | null) => {
    if (!previousValue) return 100;
    return ((currentValue / previousValue) * 100).toFixed(1);
  };

  const calculateDropOff = (currentValue: number, previousValue: number | null) => {
    if (!previousValue) return 0;
    return (((previousValue - currentValue) / previousValue) * 100).toFixed(1);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
          </div>
          <Badge variant="outline" className="font-medium">
            {stages.length} Stages
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {stages.map((stage, index) => {
          const previousValue = index > 0 ? stages[index - 1].value : null;
          const conversionRate = calculateConversionRate(stage.value, previousValue);
          const dropOff = calculateDropOff(stage.value, previousValue);
          const widthPercentage = (stage.value / maxValue) * 100;
          const color = stage.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

          return (
            <div key={index} className="space-y-2">
              {/* Stage Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn("border-border h-3 w-3 border", mode.radius)}
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-foreground text-sm font-semibold">{stage.name}</span>
                  </div>
                  {index > 0 && (
                    <Badge variant="secondary" className="text-xs font-medium">
                      {conversionRate}% conversion
                    </Badge>
                  )}
                </div>
                <span className="text-foreground text-lg font-bold">
                  {stage.value.toLocaleString()}
                </span>
              </div>

              {/* Funnel Bar */}
              <div className="relative">
                <div
                  className={cn(
                    "border-border h-12 border transition-all duration-500 ease-out",
                    mode.radius
                  )}
                  style={{
                    width: `${widthPercentage}%`,
                    backgroundColor: color,
                    opacity: 1 - index * 0.1,
                  }}
                />
              </div>

              {/* Drop-off indicator */}
              {index > 0 && previousValue && (
                <div className="text-muted-foreground flex items-center gap-2 pl-2 text-xs">
                  <TrendingDown className="text-destructive h-3 w-3" />
                  <span>
                    {(previousValue - stage.value).toLocaleString()} drop-off ({dropOff}%)
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Overall Conversion */}
        <div className="border-border border-t pt-4">
          <div className={cn("bg-accent/50 flex items-center justify-between p-4", mode.radius)}>
            <span className="text-foreground text-sm font-medium">Overall Conversion Rate</span>
            <span className="text-primary text-2xl font-bold">
              {((stages[stages.length - 1].value / stages[0].value) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
