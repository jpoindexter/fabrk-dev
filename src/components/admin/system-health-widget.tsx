/**
 * ✅ FABRK COMPONENT
 * Dashboard widget showing system metrics (uptime, response time, error rate).
 *
 * @example
 * ```tsx
 * <SystemHealthWidget uptime={99.9} avgResponseTime={145} errorRate={0.2} />
 * ```
 */

"use client";

import * as React from "react";
import { Activity, AlertTriangle, CheckCircle2, Clock, TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface SystemHealthMetric {
  label: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  trend?: "up" | "down";
  trendValue?: number;
}

interface SystemHealthWidgetProps {
  uptime?: number;
  avgResponseTime?: number;
  errorRate?: number;
  requestsPerMinute?: number;
  lastUpdated?: Date;
  className?: string;
}

export function SystemHealthWidget({
  uptime = 99.9,
  avgResponseTime = 145,
  errorRate = 0.2,
  requestsPerMinute = 1250,
  lastUpdated = new Date(),
  className,
}: SystemHealthWidgetProps) {
  const getUptimeStatus = (uptime: number): "healthy" | "warning" | "critical" => {
    if (uptime >= 99.5) return "healthy";
    if (uptime >= 99.0) return "warning";
    return "critical";
  };

  const getResponseTimeStatus = (time: number): "healthy" | "warning" | "critical" => {
    if (time <= 200) return "healthy";
    if (time <= 500) return "warning";
    return "critical";
  };

  const getErrorRateStatus = (rate: number): "healthy" | "warning" | "critical" => {
    if (rate <= 0.5) return "healthy";
    if (rate <= 2.0) return "warning";
    return "critical";
  };

  const uptimeStatus = getUptimeStatus(uptime);
  const responseTimeStatus = getResponseTimeStatus(avgResponseTime);
  const errorRateStatus = getErrorRateStatus(errorRate);

  const overallStatus =
    [uptimeStatus, responseTimeStatus, errorRateStatus].includes("critical")
      ? "critical"
      : [uptimeStatus, responseTimeStatus, errorRateStatus].includes("warning")
        ? "warning"
        : "healthy";

  const StatusIcon = overallStatus === "healthy" ? CheckCircle2 : AlertTriangle;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-black flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            System Health
          </CardTitle>
          <Badge
            variant={overallStatus === "healthy" ? "default" : "accent"}
            className="font-medium"
          >
            <StatusIcon className="mr-1 h-3 w-3" />
            {overallStatus.toUpperCase()}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Uptime */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-foreground">{uptime}%</span>
              {uptime >= 99.9 && (
                <TrendingUp className="h-4 w-4 text-primary" />
              )}
            </div>
          </div>
          <Progress
            value={uptime}
            className={cn(
              "h-2",
              uptimeStatus === "healthy" && "bg-primary/20",
              uptimeStatus === "warning" && "bg-warning/20",
              uptimeStatus === "critical" && "bg-destructive/20"
            )}
          />
        </div>

        {/* Response Time */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Avg Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-foreground">{avgResponseTime}ms</span>
              <TrendingDown className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 flex-1 rounded-none",
                  i < Math.floor((avgResponseTime / 1000) * 10)
                    ? responseTimeStatus === "healthy"
                      ? "bg-primary"
                      : responseTimeStatus === "warning"
                        ? "bg-warning"
                        : "bg-destructive"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Error Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Error Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-foreground">{errorRate}%</span>
              {errorRate <= 0.5 && (
                <TrendingDown className="h-4 w-4 text-primary" />
              )}
            </div>
          </div>
          <Progress
            value={errorRate * 20}
            className={cn(
              "h-2",
              errorRateStatus === "healthy" && "bg-primary/20",
              errorRateStatus === "warning" && "bg-warning/20",
              errorRateStatus === "critical" && "bg-destructive/20"
            )}
          />
        </div>

        {/* Requests Per Minute */}
        <div className="rounded-none border border-border bg-accent/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Requests/min</span>
            <span className="text-xl font-black text-foreground">
              {requestsPerMinute.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-none bg-primary/5 blur-3xl" />
    </Card>
  );
}
