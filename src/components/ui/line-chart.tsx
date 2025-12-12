'use client';

import * as React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Hook to get computed CSS colors that update with theme changes
function useThemeColors() {
  /* eslint-disable design-system/no-hardcoded-colors -- Initial fallback values before theme loads */
  const [colors, setColors] = React.useState<{
    chart: string[];
    muted: string;
    border: string;
  }>({ chart: [], muted: '#888', border: '#444' });
  React.useEffect(() => {
    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      setColors({
        chart: [
          `oklch(${style.getPropertyValue('--primary').trim()})`,
          `oklch(${style.getPropertyValue('--accent').trim()})`,
          `oklch(${style.getPropertyValue('--success').trim()})`,
          `oklch(${style.getPropertyValue('--warning').trim()})`,
          `oklch(${style.getPropertyValue('--error').trim()})`,
        ],
        muted: `oklch(${style.getPropertyValue('--base-content').trim()} / 0.6)`,
        border: `oklch(${style.getPropertyValue('--base-content').trim()} / 0.2)`,
      });
    };
    /* eslint-enable design-system/no-hardcoded-colors */

    updateColors();

    // Watch for theme changes via data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return colors;
}

export interface LineChartDataPoint {
  [key: string]: string | number;
}

export interface LineChartSeries {
  /** Data key in the data points */
  dataKey: string;
  /** Display name for the legend */
  name?: string;
  /** Line color (CSS color or HSL variable) */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Line type */
  type?: 'linear' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
  /** Show dots on the line */
  showDots?: boolean;
  /** Dot size */
  dotSize?: number;
  /** Dashed line */
  dashed?: boolean;
}

export interface LineChartProps {
  /** Chart data */
  data: LineChartDataPoint[];
  /** X-axis data key */
  xAxisKey: string;
  /** Line series configuration */
  series: LineChartSeries[];
  /** Chart height */
  height?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Show tooltip */
  showTooltip?: boolean;
  /** Y-axis formatter */
  yAxisFormatter?: (value: number) => string;
  /** X-axis formatter */
  xAxisFormatter?: (value: string) => string;
  /** Tooltip formatter */
  tooltipFormatter?: (value: number, name: string) => string;
  /** Margin */
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Additional className */
  className?: string;
}

export function LineChart({
  data,
  xAxisKey,
  series,
  height = 300,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  yAxisFormatter,
  xAxisFormatter,
  tooltipFormatter,
  margin = { top: 10, right: 30, left: 0, bottom: 0 },
  className,
}: LineChartProps) {
  const theme = useThemeColors();
  /* eslint-disable-next-line design-system/no-hardcoded-colors -- Fallback colors before theme loads */
  const fallbackColors = ['#6366f1', '#8b5cf6', '#22c55e', '#eab308', '#ef4444'];
  const colors = theme.chart.length > 0 ? theme.chart : fallbackColors;
  // Memoize tooltip to prevent recreation on every render
  const CustomTooltip = React.useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Recharts TooltipContentProps is complex
      ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
          return (
            <div className={cn('border-border bg-card border px-4 py-2', mode.radius)}>
              <p className={cn('text-foreground mb-2 text-xs font-semibold', mode.font)}>
                {xAxisFormatter ? xAxisFormatter(label) : label}
              </p>
              <div className="space-y-1">
                {/* eslint-disable design-system/no-inline-styles -- Dynamic color from Recharts entry */}
                {payload.map((entry: any, index: number) => (
                  <p key={index} className={cn('text-muted-foreground text-xs', mode.font)}>
                    <span
                      className="mr-2 inline-block h-2 w-2"
                      style={{ backgroundColor: entry.stroke }}
                    />
                    {entry.name}:{' '}
                    <span className="text-foreground font-semibold">
                      {tooltipFormatter ? tooltipFormatter(entry.value, entry.name) : entry.value}
                    </span>
                  </p>
                ))}
                {/* eslint-enable design-system/no-inline-styles */}
              </div>
            </div>
          );
        }
        return null;
      },
    [xAxisFormatter, tooltipFormatter]
  );

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={margin}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={theme.border} opacity={0.5} />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fill: theme.muted, fontSize: 12 }}
            tickLine={{ stroke: theme.border }}
            axisLine={{ stroke: theme.border }}
            tickFormatter={xAxisFormatter}
          />
          <YAxis
            tick={{ fill: theme.muted, fontSize: 12 }}
            tickLine={{ stroke: theme.border }}
            axisLine={{ stroke: theme.border }}
            tickFormatter={yAxisFormatter}
          />
          {showTooltip && <Tooltip content={CustomTooltip} />}
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} iconType="line" />}
          {series.map((s, index) => (
            <Line
              key={s.dataKey}
              type={s.type || 'monotone'}
              dataKey={s.dataKey}
              name={s.name || s.dataKey}
              stroke={s.color || colors[index % colors.length]}
              strokeWidth={s.strokeWidth || 2}
              strokeDasharray={s.dashed ? '5 5' : undefined}
              dot={
                s.showDots !== false
                  ? {
                      fill: s.color || colors[index % colors.length],
                      r: s.dotSize || 4,
                    }
                  : false
              }
              activeDot={{ r: (s.dotSize || 4) + 2 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ----- Line Chart Card Wrapper ----- */

export interface LineChartCardProps extends LineChartProps {
  /** Card title */
  title: string;
  /** Card description */
  description?: string;
  /** Terminal code for header */
  code?: string;
  /** Icon for header */
  icon?: React.ReactNode;
  /** Additional actions in header */
  headerActions?: React.ReactNode;
  /** Card className */
  cardClassName?: string;
}

export function LineChartCard({
  title,
  description,
  code = '0x00',
  icon,
  headerActions,
  cardClassName,
  className,
  ...chartProps
}: LineChartCardProps) {
  return (
    <div className={cn('border-border bg-card border', mode.radius, cardClassName)}>
      {/* Terminal Header */}
      <div className="border-border flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <span className={cn('text-muted-foreground text-xs', mode.font)}>
              [{code}] {title.toUpperCase()}
            </span>
            {description && (
              <p className={cn('text-muted-foreground mt-0.5 text-xs', mode.font)}>{description}</p>
            )}
          </div>
        </div>
        {headerActions}
      </div>

      {/* Chart */}
      <div className="p-4">
        <LineChart className={className} {...chartProps} />
      </div>
    </div>
  );
}
