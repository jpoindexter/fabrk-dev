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
  deviceBreakdown
}: AnalyticsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <div className="border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-destructive/50" />
            <div className="size-2 rounded-full bg-warning/50" />
            <div className="size-2 rounded-full bg-success/50" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">analytics_tabs.tsx</span>
        </div>

        {/* Terminal Tab Navigation */}
        <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0 h-auto">
          {(["overview", "analytics", "reports"] as const).map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="px-4 py-2 border-r border-border rounded-none font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground"
            >
              [{tab.toUpperCase()}]
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Overview Tab */}
      <TabsContent value="overview" className="mt-0">
        <div className="border border-border border-t-0 bg-card p-4">
          <div className="font-mono text-xs text-muted-foreground mb-4">
            [TOP_PAGES]: SORTED_BY=VIEWS
          </div>

          {/* Terminal Table */}
          <div className="border border-border">
            <div className="grid grid-cols-4 border-b border-border bg-muted/30 px-4 py-2 font-mono text-xs">
              <span className="text-muted-foreground">[PAGE]</span>
              <span className="text-muted-foreground">[VIEWS]</span>
              <span className="text-muted-foreground">[BOUNCE]</span>
              <span className="text-muted-foreground">[CONVERSION]</span>
            </div>
            <div className="divide-y divide-border">
              {pageData.map((row, i) => (
                <div key={i} className="grid grid-cols-4 px-4 py-3 font-mono text-xs hover:bg-muted/30">
                  <span className="text-foreground">{row.page}</span>
                  <span className="text-muted-foreground">{row.views}</span>
                  <span className="text-muted-foreground">{row.bounce}</span>
                  <span className="border border-border px-2 py-0.5 text-center w-fit">{row.conversion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Analytics Tab */}
      <TabsContent value="analytics" className="mt-0">
        <div className="border border-border border-t-0 bg-card p-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Traffic Sources */}
            <div className="border border-border p-4">
              <div className="font-mono text-xs text-muted-foreground mb-4">
                [TRAFFIC_SOURCES]:
              </div>
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
            <div className="border border-border p-4">
              <div className="font-mono text-xs text-muted-foreground mb-4">
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
        <div className="border border-border border-t-0 bg-card p-4">
          <div className="font-mono text-xs text-muted-foreground mb-4">
            [AVAILABLE_REPORTS]:
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "MONTHLY_SUMMARY", desc: "Overview of all metrics" },
              { name: "USER_BEHAVIOR", desc: "Detailed user journey analysis" },
              { name: "REVENUE_REPORT", desc: "Financial performance breakdown" },
              { name: "CUSTOM_REPORT", desc: "Build your own report" },
            ].map((report, i) => (
              <div key={i} className="border border-border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono text-xs text-foreground">[{report.name}]</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">
                      {report.desc}
                    </div>
                  </div>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <Button size="sm" variant="outline" className="rounded-none w-full font-mono text-xs">
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
