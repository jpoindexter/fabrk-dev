"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PieChartDataItem {
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieChartDataItem[];
  size?: number;
  showLabels?: boolean;
  showPercentages?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
  className?: string;
  onSegmentClick?: (item: PieChartDataItem, index: number) => void;
}

const DEFAULT_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--secondary))",
  "oklch(70% 0.15 240)",
  "oklch(70% 0.15 160)",
  "oklch(70% 0.15 60)",
  "oklch(70% 0.20 340)",
  "oklch(60% 0.20 25)",
];

export function PieChart({
  data,
  size = 300,
  showLabels = false,
  showPercentages = true,
  showLegend = true,
  innerRadius = 0,
  className,
  onSegmentClick,
}: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const radius = size / 2 - 10;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const color = item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
    return { ...item, percentage, color };
  });

  const getPath = (
    startAngle: number,
    endAngle: number,
    outerRadius: number,
    innerRadius: number
  ) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = center + outerRadius * Math.cos(startAngleRad);
    const y1 = center + outerRadius * Math.sin(startAngleRad);
    const x2 = center + outerRadius * Math.cos(endAngleRad);
    const y2 = center + outerRadius * Math.sin(endAngleRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    if (innerRadius === 0) {
      // Pie chart (solid)
      return `M ${center} ${center} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    } else {
      // Donut chart (hollow)
      const x3 = center + innerRadius * Math.cos(endAngleRad);
      const y3 = center + innerRadius * Math.sin(endAngleRad);
      const x4 = center + innerRadius * Math.cos(startAngleRad);
      const y4 = center + innerRadius * Math.sin(startAngleRad);

      return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    }
  };

  const getLabelPosition = (startAngle: number, endAngle: number) => {
    const angle = (startAngle + endAngle) / 2;
    const angleRad = (angle * Math.PI) / 180;
    const labelRadius = radius * 0.7;

    return {
      x: center + labelRadius * Math.cos(angleRad),
      y: center + labelRadius * Math.sin(angleRad),
    };
  };

  let currentAngle = -90; // Start at top

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto"
      >
        {segments.map((segment, index) => {
          const startAngle = currentAngle;
          const angle = (segment.value / total) * 360;
          const endAngle = startAngle + angle;
          currentAngle = endAngle;

          const isHovered = hoveredIndex === index;
          const segmentRadius = isHovered ? radius + 5 : radius;

          const path = getPath(startAngle, endAngle, segmentRadius, innerRadius);

          return (
            <g key={index}>
              <path
                d={path}
                fill={segment.color}
                stroke="hsl(var(--background))"
                strokeWidth={2}
                className={cn(
                  "transition-all cursor-pointer",
                  isHovered && "opacity-90"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSegmentClick?.(segment, index)}
              />
              {showLabels && segment.percentage > 5 && (
                <text
                  x={getLabelPosition(startAngle, endAngle).x}
                  y={getLabelPosition(startAngle, endAngle).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-background text-xs font-bold pointer-events-none"
                >
                  {showPercentages
                    ? `${segment.percentage.toFixed(0)}%`
                    : segment.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {showLegend && (
        <div className="flex flex-wrap gap-3 justify-center">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 cursor-pointer transition-opacity",
                hoveredIndex !== null &&
                  hoveredIndex !== index &&
                  "opacity-50"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onSegmentClick?.(segment, index)}
            >
              <div
                className="w-3 h-3 rounded-sm border-2 border-brutal"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-xs font-medium">
                {segment.label}
                {showPercentages && (
                  <span className="text-muted-foreground ml-1">
                    ({segment.percentage.toFixed(1)}%)
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
