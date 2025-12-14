/**
 * Modal Patterns Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function ModalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className={cn(mode.radius, mode.font, "text-xs")}>
            <Trash2 className="mr-1 h-3 w-3" />
            &gt; DELETE ITEM
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={cn(mode.radius, "border-border")}>
          <AlertDialogHeader>
            <div className="mb-2 flex items-center gap-2">
              <div className="border-destructive bg-destructive/10 border p-2">
                <AlertTriangle className="text-destructive h-5 w-5" />
              </div>
            </div>
            <AlertDialogTitle className={cn(mode.font)}>
              [CONFIRM DELETE]
            </AlertDialogTitle>
            <AlertDialogDescription className={cn(mode.font, "text-sm")}>
              This action cannot be undone. This will permanently delete the item
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={cn(mode.radius, mode.font, "text-xs")}>
              &gt; CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(
                mode.radius,
                mode.font,
                "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs"
              )}
            >
              &gt; DELETE
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}`;

function ModalsPreview() {
  return (
    <div className="bg-background/50 flex min-h-[600px] items-center justify-center p-8">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className={cn(mode.radius, mode.font, 'text-xs')}>
            <Trash2 className="mr-1 h-3 w-3" />
            &gt; DELETE ITEM
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={cn(mode.radius, 'border-border')}>
          <AlertDialogHeader>
            <div className="mb-2 flex items-center gap-2">
              <div className="border-destructive bg-destructive/10 border p-2">
                <AlertTriangle className="text-destructive h-5 w-5" />
              </div>
            </div>
            <AlertDialogTitle className={cn(mode.font)}>[CONFIRM DELETE]</AlertDialogTitle>
            <AlertDialogDescription className={cn(mode.font, 'text-sm')}>
              This action cannot be undone. This will permanently delete the item and remove all
              associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={cn(mode.radius, mode.font, 'text-xs')}>
              &gt; CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(
                mode.radius,
                mode.font,
                'bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs'
              )}
            >
              &gt; DELETE
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function ModalsTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="MODAL PATTERNS"
          title="Modal Patterns"
          description="Dialog, alert, sheet, and popover patterns for common interactions"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE PREVIEW" />
              <ModalsPreview />
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

        {/* Pattern Comparison */}
        <Card>
          <CardHeader code="0x02" title="MODAL TYPES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-4 text-xs')}>
              <div className="space-y-2">
                <div className="font-semibold">[ALERT DIALOG]</div>
                <div className="text-muted-foreground">
                  Destructive confirmations (delete, logout, reset)
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[DIALOG]</div>
                <div className="text-muted-foreground">
                  Forms, multi-step wizards, content display
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[SHEET]</div>
                <div className="text-muted-foreground">
                  Side panels for filters, settings, navigation
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">[POPOVER]</div>
                <div className="text-muted-foreground">Contextual menus, dropdowns, tooltips</div>
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
                <span className="text-success">&gt;</span> AlertDialog for destructive actions
              </div>
              <div>
                <span className="text-success">&gt;</span> Dialog for forms and content
              </div>
              <div>
                <span className="text-success">&gt;</span> Sheet for side panels
              </div>
              <div>
                <span className="text-success">&gt;</span> Popover for contextual menus
              </div>
              <div>
                <span className="text-success">&gt;</span> Keyboard navigation (ESC to close)
              </div>
              <div>
                <span className="text-success">&gt;</span> Focus trap and accessibility
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
