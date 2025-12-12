/**
 * Analytics Dashboard Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { LibraryNavigation } from '@/components/library';

// Components
import { MetricCards } from './components/metric-cards';
import { RevenueChart } from './components/revenue-chart';
import { ActivityFeed } from './components/activity-feed';
import { AnalyticsTabs } from './components/analytics-tabs';

// Mock data
import {
  metrics,
  revenueData,
  activityData,
  pageData,
  trafficSources,
  deviceBreakdown,
} from './components/mock-data';

const templateCode = `"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

// Import your components
import { MetricCards } from "./components/metric-cards";
import { RevenueChart } from "./components/revenue-chart";
import { ActivityFeed } from "./components/activity-feed";
import { AnalyticsTabs } from "./components/analytics-tabs";

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn(mode.font, "text-2xl font-semibold")}>
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Track revenue, users, conversions, and growth metrics
          </p>
        </div>
        <Button className={cn(mode.radius, mode.font, "text-xs")}>
          <Download className="mr-2 h-4 w-4" />
          &gt; EXPORT DATA
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
    </div>
  );
}`;

function AnalyticsDashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-background/50 p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn(mode.font, 'text-2xl font-semibold')}>Analytics Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Track revenue, users, conversions, and growth metrics
            </p>
          </div>
          <Button className={cn(mode.radius, mode.font, 'text-xs')}>
            <Download className="mr-2 h-4 w-4" />
            &gt; EXPORT DATA
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
      </div>
    </div>
  );
}

export default function AnalyticsDashboardTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Navigation */}
        <LibraryNavigation
          templateName="Analytics Dashboard"
          category="Dashboards"
          categoryHref="/library/dashboards"
        />

        {/* Header */}
        <TemplatePageHeader
          badge="ANALYTICS DASHBOARD"
          title="Analytics Dashboard"
          description="Track revenue, users, conversions, and growth metrics"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE PREVIEW" />
              <AnalyticsDashboardPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock code={templateCode} language="tsx" maxHeight="600px" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(dashboard)/</span>
                  <span className="text-foreground">analytics/page.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">metric-cards.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">revenue-chart.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">activity-feed.tsx</span>
                </div>
                <div>
                  <span className="text-primary">components/</span>
                  <span className="text-foreground">analytics-tabs.tsx</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
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
                <span className="text-success">&gt;</span> DS-compliant (mode.font, mode.radius)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
