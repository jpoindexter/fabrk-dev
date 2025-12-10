/**
 * Error Pages Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, TemplatePageHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import {
  FileQuestion,
  ServerCrash,
  Construction,
  Home,
  RefreshCw,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  FileQuestion,
  ServerCrash,
  Construction,
  Home,
  RefreshCw,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function ErrorPage() {
  // Choose one: 'error', '404', '500', '503'
  const errorType = 'error';

  const errorPages = {
    error: {
      code: "ERROR",
      title: "Something Went Wrong",
      description: "We're sorry, but something unexpected happened. This error has been logged and we're looking into it.",
      icon: AlertTriangle,
      terminal: [
        "$ process.run --component=App",
        "STATUS: EXCEPTION CAUGHT",
        "TYPE: RuntimeError",
        "",
        "ERROR: Unexpected application error",
        "DIGEST: err_1921274745",
        "LOGGED: true",
        "TIMESTAMP: 2024-11-12T14:23:45Z",
      ],
      actions: ["TRY AGAIN", "GO HOME"],
    },
    "404": {
      code: "404",
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      icon: FileQuestion,
      terminal: [
        "$ curl -I https://fabrk.ai/unknown-page",
        "HTTP/1.1 404 Not Found",
        "Content-Type: text/html",
        "X-Request-ID: abc123",
        "",
        "ERROR: Resource not found in database",
        "PATH: /unknown-page",
        "TIMESTAMP: 2024-11-12T14:23:45Z",
      ],
      actions: ["GO HOME", "GO BACK"],
    },
    "500": {
      code: "500",
      title: "Server Error",
      description: "Something went wrong on our end. We're working to fix it.",
      icon: ServerCrash,
      terminal: [
        "$ systemctl status fabrk-api",
        "● fabrk-api.service - Fabrk API Server",
        "   Status: ERROR",
        "   Memory: 512MB",
        "",
        "ERROR: Internal server exception",
        "TRACE: DatabaseConnectionError",
        "TIMESTAMP: 2024-11-12T14:23:45Z",
      ],
      actions: ["TRY AGAIN", "GO HOME"],
    },
    "503": {
      code: "503",
      title: "Under Maintenance",
      description: "We're performing scheduled maintenance. Be back soon!",
      icon: Construction,
      terminal: [
        "$ fabrk status",
        "SERVICE: maintenance_mode=true",
        "DOWNTIME: ~30 minutes",
        "REASON: Database migration",
        "",
        "SCHEDULED: 2024-11-12T14:00:00Z",
        "ESTIMATED_END: 2024-11-12T14:30:00Z",
        "STATUS: IN PROGRESS",
      ],
      actions: ["REFRESH", "STATUS PAGE"],
    },
  };

  const error = errorPages[errorType];
  const Icon = error.icon;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-lg space-y-6 text-center">
        {/* Icon */}
        <div
          className={\`mx-auto flex h-20 w-20 items-center justify-center border \${
            errorType === "503"
              ? "border-warning bg-warning/10"
              : "border-destructive bg-destructive/10"
          }\`}
        >
          <Icon
            className={\`h-10 w-10 \${
              errorType === "503" ? "text-warning" : "text-destructive"
            }\`}
          />
        </div>

        {/* Error Code */}
        <div className={cn(mode.font)}>
          <span
            className={\`text-6xl font-semibold \${
              errorType === "503" ? "text-warning" : "text-destructive"
            }\`}
          >
            {error.code}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className={cn(mode.font, "mb-2 text-2xl font-semibold tracking-tight")}>
            {error.title}
          </h2>
          <p className={cn(mode.font, "text-muted-foreground text-sm")}>
            {error.description}
          </p>
        </div>

        {/* Terminal Output */}
        <Card>
          <CardHeader code="0x00" title="OUTPUT" />
          <CardContent>
            <div className="space-y-0.5 text-xs">
              {error.terminal.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith("ERROR")
                      ? "text-destructive"
                      : line.startsWith("$")
                        ? "text-success"
                        : line === ""
                          ? "h-2"
                          : ""
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          {error.actions.includes("GO HOME") && (
            <Button className={cn(mode.radius, mode.font, "text-xs")}>
              <Home className="mr-1 h-3 w-3" />
              &gt; GO HOME
            </Button>
          )}
          {error.actions.includes("GO BACK") && (
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, "text-xs")}
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              &gt; GO BACK
            </Button>
          )}
          {error.actions.includes("TRY AGAIN") && (
            <Button className={cn(mode.radius, mode.font, "text-xs")}>
              <RefreshCw className="mr-1 h-3 w-3" />
              &gt; TRY AGAIN
            </Button>
          )}
          {error.actions.includes("REFRESH") && (
            <Button className={cn(mode.radius, mode.font, "text-xs")}>
              <RefreshCw className="mr-1 h-3 w-3" />
              &gt; REFRESH
            </Button>
          )}
          {error.actions.includes("STATUS PAGE") && (
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, "text-xs")}
            >
              <AlertTriangle className="mr-1 h-3 w-3" />
              &gt; STATUS PAGE
            </Button>
          )}
        </div>

        {/* Request ID */}
        <div className={cn(mode.font, "text-muted-foreground text-xs")}>
          [REQUEST ID]: req_abc123def456
        </div>
      </div>
    </div>
  );
}`;

function ErrorPagesPreview() {
  const error = {
    code: '404',
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist or has been moved.",
    icon: FileQuestion,
    terminal: [
      '$ curl -I https://fabrk.ai/unknown-page',
      'HTTP/1.1 404 Not Found',
      'Content-Type: text/html',
      'X-Request-ID: abc123',
      '',
      'ERROR: Resource not found in database',
      'PATH: /unknown-page',
      'TIMESTAMP: 2024-11-12T14:23:45Z',
    ],
  };

  const Icon = error.icon;

  return (
    <div className="bg-background/50 flex min-h-[600px] items-center justify-center p-8">
      <div className="mx-auto max-w-lg space-y-6 text-center">
        {/* Icon */}
        <div className="border-destructive bg-destructive/10 mx-auto flex h-20 w-20 items-center justify-center border">
          <Icon className="text-destructive h-10 w-10" />
        </div>

        {/* Error Code */}
        <div className={cn(mode.font)}>
          <span className="text-destructive text-6xl font-semibold">{error.code}</span>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className={cn(mode.font, 'mb-2 text-2xl font-semibold tracking-tight')}>
            {error.title}
          </h2>
          <p className={cn(mode.font, 'text-muted-foreground text-sm')}>{error.description}</p>
        </div>

        {/* Terminal Output */}
        <Card>
          <CardHeader code="0x00" title="OUTPUT" />
          <CardContent>
            <div className="space-y-0.5 text-xs">
              {error.terminal.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith('ERROR')
                      ? 'text-destructive'
                      : line.startsWith('$')
                        ? 'text-success'
                        : line === ''
                          ? 'h-2'
                          : ''
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button className={cn(mode.radius, mode.font, 'text-xs')}>
            <Home className="mr-1 h-3 w-3" />
            &gt; GO HOME
          </Button>
          <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
            <ArrowLeft className="mr-1 h-3 w-3" />
            &gt; GO BACK
          </Button>
        </div>

        {/* Request ID */}
        <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
          [REQUEST ID]: req_abc123def456
        </div>
      </div>
    </div>
  );
}

export default function ErrorPagesTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="ERROR PAGES"
          title="Error Pages"
          description="Terminal-styled error pages for generic errors, 404, 500, and maintenance states"
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
              <ErrorPagesPreview />
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
                  <span className="text-foreground">not-found.tsx</span>
                  <span className="text-muted-foreground ml-4">← 404 errors</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-foreground">error.tsx</span>
                  <span className="text-muted-foreground ml-4">← Generic errors</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">maintenance/</span>
                  <span className="text-foreground">page.tsx</span>
                  <span className="text-muted-foreground ml-4">← 503 maintenance</span>
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
                <span className="text-success">&gt;</span> Generic error, 404, 500, 503 templates
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal-style error output
              </div>
              <div>
                <span className="text-success">&gt;</span> Contextual action buttons
              </div>
              <div>
                <span className="text-success">&gt;</span> Request ID for debugging
              </div>
              <div>
                <span className="text-success">&gt;</span> Color-coded severity (error vs warning)
              </div>
              <div>
                <span className="text-success">&gt;</span> Maintenance mode with ETA
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
