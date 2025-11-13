"use client";

import * as React from "react";
import { PieChart, PieChartDataItem } from "./pie-chart";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  data: PieChartDataItem[];
  size?: number;
  thickness?: number;
  showLabels?: boolean;
  showPercentages?: boolean;
  showLegend?: boolean;
  centerContent?: React.ReactNode;
  className?: string;
  onSegmentClick?: (item: PieChartDataItem, index: number) => void;
}

export function DonutChart({
  data,
  size = 300,
  thickness = 60,
  showLabels = false,
  showPercentages = true,
  showLegend = true,
  centerContent,
  className,
  onSegmentClick,
}: DonutChartProps) {
  const radius = size / 2 - 10;
  const innerRadius = radius - thickness;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={cn("relative", className)}>
      <PieChart
        data={data}
        size={size}
        innerRadius={innerRadius}
        showLabels={showLabels}
        showPercentages={showPercentages}
        showLegend={showLegend}
        onSegmentClick={onSegmentClick}
      />
      {centerContent && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none"
          style={{
            width: innerRadius * 2,
            height: innerRadius * 2,
          }}
        >
          {centerContent}
        </div>
      )}
    </div>
  );
}

interface MetricDonutChartProps {
  data: PieChartDataItem[];
  size?: number;
  thickness?: number;
  metric: {
    value: string | number;
    label: string;
    sublabel?: string;
  };
  showLegend?: boolean;
  className?: string;
  onSegmentClick?: (item: PieChartDataItem, index: number) => void;
}

export function MetricDonutChart({
  data,
  size = 300,
  thickness = 60,
  metric,
  showLegend = true,
  className,
  onSegmentClick,
}: MetricDonutChartProps) {
  return (
    <DonutChart
      data={data}
      size={size}
      thickness={thickness}
      showLegend={showLegend}
      onSegmentClick={onSegmentClick}
      centerContent={
        <div className="text-center px-4">
          <p className="text-3xl font-black leading-none mb-1">{metric.value}</p>
          <p className="text-xs font-bold text-muted-foreground">{metric.label}</p>
          {metric.sublabel && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {metric.sublabel}
            </p>
          )}
        </div>
      }
      className={className}
    />
  );
}

interface ProgressDonutChartProps {
  value: number;
  max?: number;
  size?: number;
  thickness?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

export function ProgressDonutChart({
  value,
  max = 100,
  size = 200,
  thickness = 30,
  label,
  showPercentage = true,
  color = "hsl(var(--primary))",
  backgroundColor = "hsl(var(--muted))",
  className,
}: ProgressDonutChartProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const data: PieChartDataItem[] = [
    { label: "Progress", value: percentage, color },
    { label: "Remaining", value: 100 - percentage, color: backgroundColor },
  ];

  return (
    <DonutChart
      data={data}
      size={size}
      thickness={thickness}
      showLegend={false}
      centerContent={
        <div className="text-center px-4">
          {showPercentage && (
            <p className="text-3xl font-black leading-none mb-1">
              {percentage.toFixed(0)}%
            </p>
          )}
          {label && (
            <p className="text-xs font-bold text-muted-foreground">{label}</p>
          )}
        </div>
      }
      className={className}
    />
  );
}
