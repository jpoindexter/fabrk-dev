/**
 * ✅ FABRK COMPONENT
 * Analytics Dashboard Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Components
import { MetricCards } from "./components/metric-cards";
import { RevenueChart } from "./components/revenue-chart";
import { ActivityFeed } from "./components/activity-feed";
import { AnalyticsTabs } from "./components/analytics-tabs";

// Mock data
import {
  metrics,
  revenueData,
  activityData,
  pageData,
  trafficSources,
  deviceBreakdown,
} from "./components/mock-data";

export default function AnalyticsDashboardTemplate() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      {/* Page Content */}
      <main className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="border-border inline-block border px-4 py-1">
              <span className="text-muted-foreground font-mono text-xs">
                [TEMPLATE]: ANALYTICS_DASHBOARD
              </span>
            </div>
            <h1 className="font-mono text-4xl font-semibold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground font-mono text-sm">
              Track revenue, users, conversions, and growth metrics
            </p>
          </div>
          <Button className="rounded-none font-mono text-xs">
            <Download className="mr-2 h-4 w-4" />
            &gt; EXPORT_DATA
          </Button>
        </div>

        {/* Metric Cards */}
        <MetricCards metrics={metrics} />

        {/* Charts Section */}
        <div className="grid gap-4 lg:grid-cols-7">
          <RevenueChart data={revenueData} />
          <ActivityFeed activities={activityData} />
        </div>

        {/* Tabs Section */}
        <AnalyticsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pageData={pageData}
          trafficSources={trafficSources}
          deviceBreakdown={deviceBreakdown}
        />

        {/* Template Features Card */}
        <div className="border-border bg-card border">
          <div className="border-border flex items-center gap-2 border-b px-4 py-2">
            <div className="flex gap-2">
              <div className="bg-destructive/50 size-2 rounded-none" />
              <div className="bg-warning/50 size-2 rounded-none" />
              <div className="bg-success/50 size-2 rounded-none" />
            </div>
            <span className="text-muted-foreground font-mono text-xs">features.md</span>
          </div>
          <div className="p-4">
            <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> 4 key metric cards (revenue, users,
                conversions, growth)
              </div>
              <div>
                <span className="text-success">&gt;</span> Revenue overview chart with 6-month data
              </div>
              <div>
                <span className="text-success">&gt;</span> Recent activity feed with user avatars
              </div>
              <div>
                <span className="text-success">&gt;</span> Tabbed analytics section (Overview,
                Analytics, Reports)
              </div>
              <div>
                <span className="text-success">&gt;</span> Top performing pages table with bounce
                rates
              </div>
              <div>
                <span className="text-success">&gt;</span> Traffic sources breakdown with progress
                bars
              </div>
              <div>
                <span className="text-success">&gt;</span> Device breakdown statistics
              </div>
              <div>
                <span className="text-success">&gt;</span> Report generation templates
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal console aesthetic
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
