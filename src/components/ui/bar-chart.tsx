'use client';

import * as React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
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
          `oklch(${style.getPropertyValue('--secondary').trim()})`,
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

export interface BarChartDataPoint {
  [key: string]: string | number;
}

export interface BarChartSeries {
  /** Data key in the data points */
  dataKey: string;
  /** Display name for the legend */
  name?: string;
  /** Bar color (CSS color or HSL variable) */
  color?: string;
  /** Stack ID for stacked bars */
  stackId?: string;
  /** Bar radius [topLeft, topRight, bottomRight, bottomLeft] */
  radius?: number | [number, number, number, number];
}

export interface BarChartProps {
  /** Chart data */
  data: BarChartDataPoint[];
  /** X-axis data key */
  xAxisKey: string;
  /** Bar series configuration */
  series: BarChartSeries[];
  /** Chart height */
  height?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Show tooltip */
  showTooltip?: boolean;
  /** Horizontal layout */
  horizontal?: boolean;
  /** Bar size */
  barSize?: number;
  /** Gap between bars */
  barGap?: number;
  /** Y-axis formatter */
  yAxisFormatter?: (value: number) => string;
  /** X-axis formatter */
  xAxisFormatter?: (value: string) => string;
  /** Tooltip formatter */
  tooltipFormatter?: (value: number, name: string) => string;
  /** Margin */
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Color each bar differently based on index */
  colorByIndex?: boolean;
  /** Custom colors array for colorByIndex */
  colors?: string[];
  /** Additional className */
  className?: string;
}

export function BarChart({
  data,
  xAxisKey,
  series,
  height = 300,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  horizontal = false,
  barSize,
  barGap = 4,
  yAxisFormatter,
  xAxisFormatter,
  tooltipFormatter,
  margin = { top: 10, right: 30, left: 0, bottom: 0 },
  colorByIndex = false,
  colors: customColors,
  className,
}: BarChartProps) {
  const theme = useThemeColors();
  /* eslint-disable-next-line design-system/no-hardcoded-colors -- Fallback colors before theme loads */
  const fallbackColors = ['#6366f1', '#8b5cf6', '#22c55e', '#eab308', '#ef4444', '#64748b'];
  const colors = customColors || (theme.chart.length > 0 ? theme.chart : fallbackColors);
  // Memoize tooltip to prevent recreation on every render
  const CustomTooltip = React.useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Recharts TooltipContentProps is complex
      ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
          return (
            <div className={cn('border-border bg-card border p-3', mode.radius)}>
              <p className={cn('text-foreground mb-2 text-xs font-semibold', mode.font)}>
                {xAxisFormatter ? xAxisFormatter(label) : label}
              </p>
              <div className="space-y-1">
                {/* eslint-disable design-system/no-inline-styles -- Dynamic color from Recharts entry */}
                {payload.map((entry: any, index: number) => (
                  <p key={index} className={cn('text-muted-foreground text-xs', mode.font)}>
                    <span
                      className="mr-2 inline-block h-2 w-2"
                      style={{ backgroundColor: entry.fill }}
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
        <RechartsBarChart
          data={data}
          margin={margin}
          layout={horizontal ? 'vertical' : 'horizontal'}
          barGap={barGap}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.border}
              opacity={0.5}
              horizontal={!horizontal}
              vertical={horizontal}
            />
          )}
          {horizontal ? (
            <>
              <XAxis
                type="number"
                tick={{ fill: theme.muted, fontSize: 12 }}
                tickLine={{ stroke: theme.border }}
                axisLine={{ stroke: theme.border }}
                tickFormatter={yAxisFormatter}
              />
              <YAxis
                type="category"
                dataKey={xAxisKey}
                tick={{ fill: theme.muted, fontSize: 12 }}
                tickLine={{ stroke: theme.border }}
                axisLine={{ stroke: theme.border }}
                tickFormatter={xAxisFormatter}
                width={80}
              />
            </>
          ) : (
            <>
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
            </>
          )}
          {showTooltip && (
            <Tooltip content={CustomTooltip} cursor={{ fill: theme.border, opacity: 0.3 }} />
          )}
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} iconType="square" />}
          {series.map((s, seriesIndex) => (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.name || s.dataKey}
              fill={colorByIndex ? undefined : s.color || colors[seriesIndex % colors.length]}
              stackId={s.stackId}
              barSize={barSize}
              radius={s.radius ?? 0}
            >
              {colorByIndex &&
                data.map((_, dataIndex) => (
                  <Cell key={`cell-${dataIndex}`} fill={colors[dataIndex % colors.length]} />
                ))}
            </Bar>
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ----- Bar Chart Card Wrapper ----- */

export interface BarChartCardProps extends BarChartProps {
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

export function BarChartCard({
  title,
  description,
  code = '0x00',
  icon,
  headerActions,
  cardClassName,
  className,
  ...chartProps
}: BarChartCardProps) {
  return (
    <div className={cn('border-border bg-card border', mode.radius, cardClassName)}>
      {/* Terminal Header */}
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
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
        <BarChart className={className} {...chartProps} />
      </div>
    </div>
  );
}

/* ----- Stacked Bar Chart Variant ----- */

export interface StackedBarChartProps extends Omit<BarChartProps, 'series'> {
  /** Data keys for each stack segment */
  stackKeys: string[];
  /** Labels for each stack segment */
  stackLabels?: string[];
  /** Colors for each stack segment */
  stackColors?: string[];
}

export function StackedBarChart({
  stackKeys,
  stackLabels,
  stackColors,
  ...props
}: StackedBarChartProps) {
  const theme = useThemeColors();
  /* eslint-disable-next-line design-system/no-hardcoded-colors -- Fallback colors before theme loads */
  const fallbackColors = ['#6366f1', '#8b5cf6', '#22c55e', '#eab308', '#ef4444', '#64748b'];
  const colors = stackColors || (theme.chart.length > 0 ? theme.chart : fallbackColors);

  const series: BarChartSeries[] = stackKeys.map((key, index) => ({
    dataKey: key,
    name: stackLabels?.[index] || key,
    color: colors[index % colors.length],
    stackId: 'stack',
    radius: index === stackKeys.length - 1 ? [4, 4, 0, 0] : 0,
  }));

  return <BarChart {...props} series={series} showLegend />;
}
