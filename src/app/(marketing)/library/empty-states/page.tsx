/**
 * Empty States Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { LibraryNavigation } from '@/components/library';
import { Inbox, Plus } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Inbox, Plus } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function EmptyStatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-lg text-center">
        {/* Icon */}
        <div className="border-border bg-muted/30 mx-auto flex h-16 w-16 items-center justify-center border">
          <Inbox className="text-muted-foreground h-8 w-8" />
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <h3 className={cn(mode.font, "mb-1 text-lg font-semibold")}>
            No Data Yet
          </h3>
          <p className={cn(mode.font, "text-muted-foreground text-xs")}>
            Start by adding your first item to see it appear here.
          </p>
        </div>

        {/* Terminal Output */}
        <Card className="mt-4">
          <CardHeader code="0x00" title="OUTPUT" />
          <CardContent>
            <div className="space-y-0.5 text-xs">
              <div className="text-success">$ query --table=items</div>
              <div>RESULT: 0 rows returned</div>
              <div>STATUS: empty dataset</div>
            </div>
          </CardContent>
        </Card>

        {/* Action */}
        <div className="mt-4 flex items-center justify-center">
          <Button className={cn(mode.radius, mode.font, "text-xs")}>
            <Plus className="mr-1 h-3 w-3" />
            &gt; ADD FIRST ITEM
          </Button>
        </div>
      </div>
    </div>
  );
}`;

function EmptyStatesPreview() {
  return (
    <div className="bg-background/50 flex min-h-[600px] items-center justify-center p-8">
      <div className="mx-auto max-w-lg text-center">
        {/* Icon */}
        <div className="border-border bg-muted/30 mx-auto flex h-16 w-16 items-center justify-center border">
          <Inbox className="text-muted-foreground h-8 w-8" />
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <h3 className={cn(mode.font, 'mb-1 text-lg font-semibold')}>No Data Yet</h3>
          <p className={cn(mode.font, 'text-muted-foreground text-xs')}>
            Start by adding your first item to see it appear here.
          </p>
        </div>

        {/* Terminal Output */}
        <Card className="mt-4">
          <CardHeader code="0x00" title="OUTPUT" />
          <CardContent>
            <div className="space-y-0.5 text-xs">
              <div className="text-success">$ query --table=items</div>
              <div>RESULT: 0 rows returned</div>
              <div>STATUS: empty dataset</div>
            </div>
          </CardContent>
        </Card>

        {/* Action */}
        <div className="mt-4 flex items-center justify-center">
          <Button className={cn(mode.radius, mode.font, 'text-xs')}>
            <Plus className="mr-1 h-3 w-3" />
            &gt; ADD FIRST ITEM
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EmptyStatesTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Navigation */}
        <LibraryNavigation templateName="Empty States" />

        {/* Header */}
        <TemplatePageHeader
          badge="EMPTY STATES"
          title="Empty States"
          description="Helpful empty state patterns for various scenarios"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="preview">Preview
                </TabsTrigger>
                <TabsTrigger value="code">Code
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE PREVIEW" />
              <EmptyStatesPreview />
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

        {/* Use Cases Reference */}
        <Card>
          <CardHeader code="0x02" title="USE CASES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-4 text-xs')}>
              <div className="space-y-2">
                <div className="font-semibold">[NO DATA]</div>
                <div className="text-muted-foreground">
                  Tables, lists, dashboards with zero items
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[FIRST TIME USER]</div>
                <div className="text-muted-foreground">
                  New accounts, fresh workspaces, onboarding
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[SEARCH NO RESULTS]</div>
                <div className="text-muted-foreground">
                  Search, filters, queries with no matches
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[ERROR STATE]</div>
                <div className="text-muted-foreground">API failures, network errors, timeouts</div>
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
                <span className="text-success">&gt;</span> Common empty state patterns
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal-style status output
              </div>
              <div>
                <span className="text-success">&gt;</span> Contextual action buttons
              </div>
              <div>
                <span className="text-success">&gt;</span> Error state differentiation
              </div>
              <div>
                <span className="text-success">&gt;</span> First-time user guidance
              </div>
              <div>
                <span className="text-success">&gt;</span> Search result fallback
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
