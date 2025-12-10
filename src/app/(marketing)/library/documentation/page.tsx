/**
 * FABRK COMPONENT
 * Documentation Layout Template - Terminal console style
 * Production-ready
 */

'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { TemplatePageHeader, Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { DocsSidebar } from './components/docs-sidebar';
import { DocsContent } from './components/docs-content';
import { TableOfContents } from './components/table-of-contents';
import { docContent } from './components/docs-data';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const docNavItems = [
  { id: "quick-start", label: "Quick Start", section: "Getting Started" },
  { id: "installation", label: "Installation", section: "Getting Started" },
  { id: "components", label: "Components", section: "Guides" },
  { id: "api-reference", label: "API Reference", section: "Reference" },
];

export default function DocumentationLayout() {
  const [activeDoc, setActiveDoc] = useState("quick-start");

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border">
        <Card className="border-0 border-r">
          <CardHeader code="0x00" title="DOCUMENTATION" />
          <div className="p-4">
            {docNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveDoc(item.id)}
                className={cn(
                  mode.font,
                  "w-full text-left px-3 py-2 text-xs",
                  activeDoc === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Card>
          <CardHeader code="0x01" title={activeDoc.toUpperCase()} />
          <CardContent padding="lg">
            {/* Documentation content */}
          </CardContent>
        </Card>
      </main>

      {/* Table of Contents */}
      <aside className="w-64 border-l border-border">
        <Card className="border-0 border-l">
          <CardHeader code="0x02" title="ON THIS PAGE" />
          <div className="p-4">
            {/* TOC links */}
          </div>
        </Card>
      </aside>
    </div>
  );
}`;

function DocsLayoutPreview() {
  const [activeDoc, setActiveDoc] = useState('quick-start');
  const currentDoc = docContent[activeDoc as keyof typeof docContent];

  return (
    <div className="bg-background/50 min-h-[600px]">
      <div className="flex">
        {/* Sidebar */}
        <DocsSidebar activeDoc={activeDoc} onDocChange={setActiveDoc} />

        {/* Main Content */}
        <DocsContent currentDoc={currentDoc} />

        {/* Table of Contents (Right Sidebar) */}
        <TableOfContents />
      </div>
    </div>
  );
}

export default function DocumentationLayoutTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="DOCUMENTATION LAYOUT"
          title="Documentation Layout"
          description="Three-column documentation layout with sidebar navigation and table of contents"
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
              <DocsLayoutPreview />
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
                  <span className="text-muted-foreground">docs/</span>
                  <span className="text-foreground">layout.tsx</span>
                  <span className="text-muted-foreground ml-4">← Copy template here</span>
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
                <span className="text-success">&gt;</span> Three-column layout (sidebar, content,
                TOC)
              </div>
              <div>
                <span className="text-success">&gt;</span> Hierarchical navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Active link highlighting
              </div>
              <div>
                <span className="text-success">&gt;</span> Table of contents with auto-scroll
              </div>
              <div>
                <span className="text-success">&gt;</span> Markdown-friendly content area
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive collapsible sidebars
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
