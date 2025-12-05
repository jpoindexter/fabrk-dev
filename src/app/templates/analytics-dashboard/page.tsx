/**
 * ✅ FABRK COMPONENT
 * Analytics Dashboard Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TemplatePageHeader, FeaturesCard } from "@/components/ui/card";

// Components
import { MetricCards } from "./components/metric-cards";
import { RevenueChart } from "./components/revenue-chart";
import { ActivityFeed } from "./components/activity-feed";
import { AnalyticsTabs } from "./components/analytics-tabs";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

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
          <TemplatePageHeader
            badge="ANALYTICS_DASHBOARD"
            title="Analytics Dashboard"
            description="Track revenue, users, conversions, and growth metrics"
          />
          <Button className={cn(mode.radius, mode.font, "text-xs")}>
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
        <FeaturesCard
          code="0x00"
          features={[
            "4 key metric cards (revenue, users, conversions, growth)",
            "Revenue overview chart with 6-month data",
            "Recent activity feed with user avatars",
            "Tabbed analytics section (Overview, Analytics, Reports)",
            "Top performing pages table with bounce rates",
            "Traffic sources breakdown with progress bars",
            "Device breakdown statistics",
            "Report generation templates",
            "Terminal console aesthetic",
          ]}
        />
      </main>
    </div>
  );
}
