/**
 * Error Pages Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
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
    <TemplatePreviewWrapper minHeight="600px">
      <div className="mx-auto flex min-h-[600px] max-w-lg items-center justify-center space-y-6 text-center">
        <div className="space-y-6">
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
    </TemplatePreviewWrapper>
  );
}

export default function ErrorPagesTemplate() {
  return (
    <TemplateShowcasePage
      badge="ERROR PAGES"
      title="Error Pages"
      description="Terminal-styled error pages for generic errors, 404, 500, and maintenance states"
      templateId="error-pages"
      preview={<ErrorPagesPreview />}
      code={templateCode}
      fileStructure={[
        { path: ['app/', 'not-found.tsx'], label: '← 404 errors' },
        { path: ['app/', 'error.tsx'], label: '← Generic errors' },
        { path: ['app/', 'maintenance/', 'page.tsx'], label: '← 503 maintenance' },
      ]}
      features={[
        'Generic error, 404, 500, 503 templates',
        'Terminal-style error output',
        'Contextual action buttons',
        'Request ID for debugging',
        'Color-coded severity (error vs warning)',
        'Maintenance mode with ETA',
      ]}
    />
  );
}
