/**
 * ✅ FABRK COMPONENT
 * Analytics Tabs - Overview, Analytics, and Reports sections
 */

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, BarChart3 } from "lucide-react";

export interface PageData {
  page: string;
  views: string;
  bounce: string;
  conversion: string;
}

export interface TrafficSource {
  source: string;
  percentage: number;
}

export interface DeviceData {
  device: string;
  percentage: number;
}

interface AnalyticsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  pageData: PageData[];
  trafficSources: TrafficSource[];
  deviceBreakdown: DeviceData[];
}

export function AnalyticsTabs({
  activeTab,
  onTabChange,
  pageData,
  trafficSources,
  deviceBreakdown,
}: AnalyticsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <div className="border-border bg-card border">
        <div className="border-border flex items-center gap-2 border-b px-4 py-2">
          <div className="flex gap-2">
            <div className="bg-destructive/50 size-2 rounded-full" />
            <div className="bg-warning/50 size-2 rounded-full" />
            <div className="bg-success/50 size-2 rounded-full" />
          </div>
          <span className="text-muted-foreground font-mono text-xs">analytics_tabs.tsx</span>
        </div>

        {/* Terminal Tab Navigation */}
        <TabsList className="h-auto w-full justify-start rounded-none border-0 bg-transparent p-0">
          {(["overview", "analytics", "reports"] as const).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground rounded-none border-r px-4 py-2 font-mono text-xs"
            >
              [{tab.toUpperCase()}]
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Overview Tab */}
      <TabsContent value="overview" className="mt-0">
        <div className="border-border bg-card border border-t-0 p-4">
          <div className="text-muted-foreground mb-4 font-mono text-xs">
            [TOP_PAGES]: SORTED_BY=VIEWS
          </div>

          {/* Terminal Table */}
          <div className="border-border border">
            <div className="border-border bg-muted/30 grid grid-cols-4 border-b px-4 py-2 font-mono text-xs">
              <span className="text-muted-foreground">[PAGE]</span>
              <span className="text-muted-foreground">[VIEWS]</span>
              <span className="text-muted-foreground">[BOUNCE]</span>
              <span className="text-muted-foreground">[CONVERSION]</span>
            </div>
            <div className="divide-border divide-y">
              {pageData.map((row, i) => (
                <div
                  key={i}
                  className="hover:bg-muted/30 grid grid-cols-4 px-4 py-3 font-mono text-xs"
                >
                  <span className="text-foreground">{row.page}</span>
                  <span className="text-muted-foreground">{row.views}</span>
                  <span className="text-muted-foreground">{row.bounce}</span>
                  <span className="border-border w-fit border px-2 py-0.5 text-center">
                    {row.conversion}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="analytics" className="mt-0">
        <div className="border-border bg-card border border-t-0 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Traffic Sources */}
            <div className="border-border border p-4">
              <div className="text-muted-foreground mb-4 font-mono text-xs">[TRAFFIC_SOURCES]:</div>
              <div className="space-y-3">
                {trafficSources.map((source, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-foreground">{source.source}</span>
                      <span className="text-muted-foreground">{source.percentage}%</span>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="border-border border p-4">
              <div className="text-muted-foreground mb-4 font-mono text-xs">
                [DEVICE_BREAKDOWN]:
              </div>
              <div className="space-y-3">
                {deviceBreakdown.map((device, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-foreground">{device.device}</span>
                      <span className="text-muted-foreground">{device.percentage}%</span>
                    </div>
                    <Progress value={device.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Reports Tab */}
      <TabsContent value="reports" className="mt-0">
        <div className="border-border bg-card border border-t-0 p-4">
          <div className="text-muted-foreground mb-4 font-mono text-xs">[AVAILABLE_REPORTS]:</div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: "MONTHLY_SUMMARY", desc: "Overview of all metrics" },
              { name: "USER_BEHAVIOR", desc: "Detailed user journey analysis" },
              { name: "REVENUE_REPORT", desc: "Financial performance breakdown" },
              { name: "CUSTOM_REPORT", desc: "Build your own report" },
            ].map((report, i) => (
              <div key={i} className="border-border border p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="text-foreground font-mono text-xs">[{report.name}]</div>
                    <div className="text-muted-foreground mt-1 font-mono text-xs">
                      {report.desc}
                    </div>
                  </div>
                  <BarChart3 className="text-muted-foreground h-4 w-4" />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full rounded-none font-mono text-xs"
                >
                  <Download className="mr-2 h-3 w-3" />
                  &gt; GENERATE
                </Button>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
