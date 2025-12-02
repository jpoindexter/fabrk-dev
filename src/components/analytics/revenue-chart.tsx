/**
 * ✅ FABRK COMPONENT
 * MRR/ARR chart with period selection.
 *
 * @example
 * ```tsx
 * <RevenueChart data={revenueData} />
 * ```
 */

"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DollarSign, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface RevenueDataPoint {
  period: string;
  mrr: number;
  arr?: number;
  growth?: number;
}

type Period = "week" | "month" | "quarter" | "year";

interface RevenueChartProps {
  data: RevenueDataPoint[];
  initialPeriod?: Period;
  showArr?: boolean;
  className?: string;
}

export function RevenueChart({
  data,
  initialPeriod = "month",
  showArr = true,
  className,
}: RevenueChartProps) {
  const [selectedPeriod, setSelectedPeriod] = React.useState<Period>(initialPeriod);
  const [chartType, setChartType] = React.useState<"line" | "area">("area");

  const periods: { label: string; value: Period }[] = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Quarter", value: "quarter" },
    { label: "Year", value: "year" },
  ];

  const calculateTotalRevenue = () => {
    return data.reduce((sum, item) => sum + item.mrr, 0);
  };

  const calculateGrowthRate = () => {
    if (data.length < 2) return 0;
    const latest = data[data.length - 1].mrr;
    const previous = data[data.length - 2].mrr;
    return (((latest - previous) / previous) * 100).toFixed(1);
  };

  const totalRevenue = calculateTotalRevenue();
  const growthRate = calculateGrowthRate();
  const latestMRR = data[data.length - 1]?.mrr || 0;
  const latestARR = latestMRR * 12;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  // Memoize tooltip component to prevent recreation on every render (industry-standard pattern)
  const CustomTooltip = React.useMemo(
    () =>
      ({ active, payload }: any) => {
        if (active && payload && payload.length) {
          return (
            <div className="rounded-none border border-border bg-card p-4 shadow-sm">
              <p className="text-sm font-bold text-foreground mb-2">
                {payload[0].payload.period}
              </p>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  MRR: <span className="font-bold text-primary">{formatCurrency(payload[0].value)}</span>
                </p>
                {showArr && payload[1] && (
                  <p className="text-xs text-muted-foreground">
                    ARR: <span className="font-bold text-accent">{formatCurrency(payload[1].value)}</span>
                  </p>
                )}
              </div>
            </div>
          );
        }
        return null;
      },
    [showArr]
  );

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-black flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Revenue Analytics
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Monthly Recurring Revenue (MRR) {showArr && "and Annual Recurring Revenue (ARR)"}
            </p>
          </div>
          <Badge variant="default" className="font-medium">
            <TrendingUp className="mr-1 h-3 w-3" />
            {growthRate}% growth
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-none border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">Current MRR</p>
            <p className="text-2xl font-black text-foreground">
              {formatCompactCurrency(latestMRR)}
            </p>
          </div>
          {showArr && (
            <div className="rounded-none border border-border bg-accent/50 p-4">
              <p className="text-xs font-medium text-muted-foreground mb-1">Projected ARR</p>
              <p className="text-2xl font-black text-foreground">
                {formatCompactCurrency(latestARR)}
              </p>
            </div>
          )}
        </div>

        {/* Period & Type Selector */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {periods.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period.value)}
              >
                {period.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant={chartType === "area" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("area")}
            >
              Area
            </Button>
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
            >
              Line
            </Button>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-none border border-border p-4 bg-card">
          <ResponsiveContainer width="100%" height={300}>
            {chartType === "area" ? (
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  {showArr && (
                    <linearGradient id="colorArr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  )}
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="period"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={formatCompactCurrency}
                />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorMrr)"
                  strokeWidth={2}
                  name="MRR"
                />
                {showArr && (
                  <Area
                    type="monotone"
                    dataKey="arr"
                    stroke="hsl(var(--accent))"
                    fillOpacity={1}
                    fill="url(#colorArr)"
                    strokeWidth={2}
                    name="ARR"
                  />
                )}
              </AreaChart>
            ) : (
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="period"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={formatCompactCurrency}
                />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="MRR"
                />
                {showArr && (
                  <Line
                    type="monotone"
                    dataKey="arr"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--accent))", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="ARR"
                  />
                )}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
