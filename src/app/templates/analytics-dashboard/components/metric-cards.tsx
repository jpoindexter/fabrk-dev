/**
 * ✅ FABRK COMPONENT
 * Metric Cards - Display key metrics with trend indicators
 */

import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

export interface MetricData {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  status: string;
}

interface MetricCardsProps {
  metrics: MetricData[];
}

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.id} className="border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-xs text-muted-foreground">[{metric.title}]:</div>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{metric.value}</div>
          <div className="flex items-center gap-2 mt-2 font-mono text-xs">
            <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>
              {metric.trend === "up" ? <TrendingUp className="inline h-3 w-3 mr-1" /> : <TrendingDown className="inline h-3 w-3 mr-1" />}
              {metric.change}
            </span>
            <span className="text-muted-foreground">
              STATUS: <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>{metric.status}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
