/**
 * ✅ FABRK COMPONENT
 * Revenue Chart - Terminal-style bar chart
 */

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  height: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const avgRevenue = Math.round(data.reduce((sum, d) => sum + d.revenue, 0) / data.length);
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const growthRate = ((data[data.length - 1].revenue - data[0].revenue) / data[0].revenue * 100).toFixed(1);

  return (
    <div className="lg:col-span-4 border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">revenue_chart.tsx</span>
      </div>
      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-4">
          [REVENUE_OVERVIEW]: PERIOD=6_MONTHS
        </div>

        {/* Bar Chart */}
        <div className="relative pl-10">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs font-mono text-muted-foreground">
            <span>$60k</span>
            <span>$40k</span>
            <span>$20k</span>
            <span>$0</span>
          </div>

          {/* Chart area */}
          <div className="h-[200px] flex items-end justify-between gap-2 border-b border-l border-border">
            {data.map((dataPoint, i) => (
              <div key={i} className="flex-1 flex items-end justify-center h-full">
                <div
                  className="w-full max-w-12 bg-primary hover:bg-primary/80 transition-colors"
                  style={{
                    height: `${dataPoint.height}%`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between gap-2 mt-2">
            {data.map((dataPoint, i) => (
              <div key={i} className="flex-1 text-center font-mono text-xs text-muted-foreground">
                {dataPoint.month}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border font-mono text-xs">
          <div>
            <span className="text-muted-foreground">[AVG]:</span> <span className="text-foreground">${avgRevenue.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">[MAX]:</span> <span className="text-foreground">${maxRevenue.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">[GROWTH]:</span> <span className="text-success">+{growthRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
