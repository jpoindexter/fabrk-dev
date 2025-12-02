/**
 * FABRK COMPONENT
 * Error Pages Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileQuestion,
  ServerCrash,
  Construction,
  Home,
  RefreshCw,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

const errorPages = [
  {
    id: "error",
    code: "ERROR",
    title: "Something Went Wrong",
    description: "We're sorry, but something unexpected happened. This error has been logged and we're looking into it.",
    icon: AlertTriangle,
    terminal: [
      "$ process.run --component=App",
      "STATUS: EXCEPTION_CAUGHT",
      "TYPE: RuntimeError",
      "",
      "ERROR: Unexpected application error",
      "DIGEST: err_1921274745",
      "LOGGED: true",
      "TIMESTAMP: 2024-11-12T14:23:45Z",
    ],
    actions: ["TRY_AGAIN", "GO_HOME"],
  },
  {
    id: "404",
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
    actions: ["GO_HOME", "GO_BACK"],
  },
  {
    id: "500",
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
    actions: ["TRY_AGAIN", "GO_HOME"],
  },
  {
    id: "503",
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
      "STATUS: IN_PROGRESS",
    ],
    actions: ["REFRESH", "STATUS_PAGE"],
  },
];

export default function ErrorPagesTemplate() {
  const [activeError, setActiveError] = useState("error");

  const currentError = errorPages.find((e) => e.id === activeError) || errorPages[0];

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-4 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: ERROR_PAGES
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Error Pages</h1>
          <p className="font-mono text-sm text-muted-foreground">
            Terminal-styled error pages for generic errors, 404, 500, and maintenance states
          </p>
        </div>

        {/* Error Type Selector with Tabs */}
        <Tabs value={activeError} onValueChange={setActiveError}>
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-2">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                error_types.tsx
              </span>
            </div>
            <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0 h-auto">
              {errorPages.map((error) => (
                <TabsTrigger
                  key={error.id}
                  value={error.id}
                  className="flex items-center gap-2 px-4 py-2 border-r border-border rounded-none font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground"
                >
                  <error.icon className="h-3 w-3" />
                  [{error.code}]
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Error Preview */}
          {errorPages.map((error) => {
            const Icon = error.icon;
            return (
              <TabsContent key={error.id} value={error.id} className="mt-6">
                <div className="border border-border bg-card">
                  <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                    <div className="flex gap-2">
                      <div className="size-2 rounded-full bg-destructive/50" />
                      <div className="size-2 rounded-full bg-warning/50" />
                      <div className="size-2 rounded-full bg-success/50" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      error_{error.code}.tsx
                    </span>
                  </div>

                  <div className="p-8">
                    {/* Error Content */}
                    <div className="max-w-lg mx-auto text-center space-y-6">
                      {/* Icon */}
                      <div
                        className={`w-20 h-20 mx-auto border flex items-center justify-center ${
                          error.id === "503"
                            ? "border-warning bg-warning/10"
                            : "border-destructive bg-destructive/10"
                        }`}
                      >
                        <Icon
                          className={`h-10 w-10 ${
                            error.id === "503"
                              ? "text-warning"
                              : "text-destructive"
                          }`}
                        />
                      </div>

                      {/* Error Code */}
                      <div className="font-mono">
                        <span
                          className={`text-6xl font-bold ${
                            error.id === "503"
                              ? "text-warning"
                              : "text-destructive"
                          }`}
                        >
                          {error.code}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h2 className="text-2xl font-semibold mb-2">
                          {error.title}
                        </h2>
                        <p className="font-mono text-sm text-muted-foreground">
                          {error.description}
                        </p>
                      </div>

                      {/* Terminal Output */}
                      <div className="border border-border bg-card text-left">
                        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-1.5">
                          <div className="flex gap-2">
                            <div className="size-2 rounded-full bg-destructive/50" />
                            <div className="size-2 rounded-full bg-warning/50" />
                            <div className="size-2 rounded-full bg-success/50" />
                          </div>
                          <span className="font-mono text-xs text-muted-foreground">
                            terminal
                          </span>
                        </div>
                        <div className="p-4 font-mono text-xs text-foreground space-y-0.5">
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
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-center gap-4">
                        {error.actions.includes("GO_HOME") && (
                          <Button className="rounded-none font-mono text-xs">
                            <Home className="h-3 w-3 mr-1" />
                            &gt; GO_HOME
                          </Button>
                        )}
                        {error.actions.includes("GO_BACK") && (
                          <Button
                            variant="outline"
                            className="rounded-none font-mono text-xs"
                          >
                            <ArrowLeft className="h-3 w-3 mr-1" />
                            &gt; GO_BACK
                          </Button>
                        )}
                        {error.actions.includes("TRY_AGAIN") && (
                          <Button className="rounded-none font-mono text-xs">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            &gt; TRY_AGAIN
                          </Button>
                        )}
                        {error.actions.includes("REFRESH") && (
                          <Button className="rounded-none font-mono text-xs">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            &gt; REFRESH
                          </Button>
                        )}
                        {error.actions.includes("STATUS_PAGE") && (
                          <Button
                            variant="outline"
                            className="rounded-none font-mono text-xs"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            &gt; STATUS_PAGE
                          </Button>
                        )}
                      </div>

                      {/* Request ID */}
                      <div className="font-mono text-xs text-muted-foreground">
                        REQUEST_ID: req_abc123def456
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Usage Examples */}
        <div className="grid md:grid-cols-3 gap-4">
          {errorPages.map((error) => {
            const ErrorIcon = error.icon;
            return (
              <div key={error.id} className="border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                  <div className="flex gap-2">
                    <div className="size-2 rounded-full bg-destructive/50" />
                    <div className="size-2 rounded-full bg-warning/50" />
                    <div className="size-2 rounded-full bg-success/50" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {error.code}.tsx
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ErrorIcon
                      className={`h-4 w-4 ${
                        error.id === "503" ? "text-warning" : "text-destructive"
                      }`}
                    />
                    <span className="font-mono text-sm font-semibold">
                      {error.code} - {error.title}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mb-4">
                    {error.description}
                  </p>
                  <div className="font-mono text-xs text-muted-foreground">
                    [USE_CASE]:
                  </div>
                  <div className="font-mono text-xs mt-1">
                    {error.id === "error" && "React errors, unexpected exceptions"}
                    {error.id === "404" && "Invalid routes, deleted content"}
                    {error.id === "500" && "Server crashes, API failures"}
                    {error.id === "503" && "Planned downtime, updates"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              features.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-4 font-mono text-xs text-muted-foreground">
              [TEMPLATE_FEATURES]:
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> Generic error, 404, 500, 503 templates
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal-style error
                output
              </div>
              <div>
                <span className="text-success">&gt;</span> Contextual action
                buttons
              </div>
              <div>
                <span className="text-success">&gt;</span> Request ID for
                debugging
              </div>
              <div>
                <span className="text-success">&gt;</span> Color-coded severity
                (error vs warning)
              </div>
              <div>
                <span className="text-success">&gt;</span> Maintenance mode with
                ETA
              </div>
            </div>
            <div className="mt-4 font-mono text-xs text-muted-foreground">
              [NOTE]: Copy these to app/not-found.tsx, app/error.tsx, and
              app/maintenance/page.tsx
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
