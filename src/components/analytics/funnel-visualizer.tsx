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
  "oklch(65% 0.22 295)",
  "oklch(70% 0.20 340)",
  "oklch(70% 0.15 60)",
  "oklch(65% 0.15 160)",
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
            <CardTitle className="text-base font-black">{title}</CardTitle>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
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
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-bold text-foreground">{stage.name}</span>
                  </div>
                  {index > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {conversionRate}% conversion
                    </Badge>
                  )}
                </div>
                <span className="text-lg font-black text-foreground">
                  {stage.value.toLocaleString()}
                </span>
              </div>

              {/* Funnel Bar */}
              <div className="relative">
                <div
                  className="h-12 rounded-md border border-border transition-all duration-500 ease-out shadow-sm"
                  style={{
                    width: `${widthPercentage}%`,
                    backgroundColor: color,
                    opacity: 1 - index * 0.1,
                  }}
                />
              </div>

              {/* Drop-off indicator */}
              {index > 0 && previousValue && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground pl-1">
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  <span>
                    {(previousValue - stage.value).toLocaleString()} drop-off ({dropOff}%)
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Overall Conversion */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between rounded-md bg-accent/50 p-4">
            <span className="text-sm font-medium text-foreground">Overall Conversion Rate</span>
            <span className="text-2xl font-black text-primary">
              {((stages[stages.length - 1].value / stages[0].value) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
