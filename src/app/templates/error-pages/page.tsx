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
    description:
      "We're sorry, but something unexpected happened. This error has been logged and we're looking into it.",
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

  const _currentError = errorPages.find((e) => e.id === activeError) || errorPages[0];

  return (
    <div>
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="border-border inline-block border px-4 py-1">
            <span className="text-muted-foreground font-mono text-xs">[TEMPLATE]: ERROR_PAGES</span>
          </div>
          <h1 className="font-mono text-4xl font-semibold tracking-tight">Error Pages</h1>
          <p className="text-muted-foreground font-mono text-sm">
            Terminal-styled error pages for generic errors, 404, 500, and maintenance states
          </p>
        </div>

        {/* Error Type Selector with Tabs */}
        <Tabs value={activeError} onValueChange={setActiveError}>
          <div className="border-border bg-card border">
            <div className="border-border border-b px-4 py-2">
              <span className="text-muted-foreground font-mono text-xs">
                [ [0x00] ERROR_TYPES ]
              </span>
            </div>
            <TabsList className="h-auto w-full justify-start rounded-none border-0 bg-transparent p-0">
              {errorPages.map((error) => (
                <TabsTrigger
                  key={error.id}
                  value={error.id}
                  className="border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 rounded-none border-r px-4 py-2 font-mono text-xs"
                >
                  <error.icon className="h-3 w-3" />[{error.code}]
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Error Preview */}
          {errorPages.map((error) => {
            const Icon = error.icon;
            return (
              <TabsContent key={error.id} value={error.id} className="mt-6">
                <div className="border-border bg-card border">
                  <div className="border-border border-b px-4 py-2">
                    <span className="text-muted-foreground font-mono text-xs">
                      [ [0x0
                      {error.id === "error"
                        ? "0"
                        : error.id === "404"
                          ? "1"
                          : error.id === "500"
                            ? "2"
                            : "3"}
                      ] ERROR_{error.code} ]
                    </span>
                  </div>

                  <div className="p-8">
                    {/* Error Content */}
                    <div className="mx-auto max-w-lg space-y-6 text-center">
                      {/* Icon */}
                      <div
                        className={`mx-auto flex h-20 w-20 items-center justify-center border ${
                          error.id === "503"
                            ? "border-warning bg-warning/10"
                            : "border-destructive bg-destructive/10"
                        }`}
                      >
                        <Icon
                          className={`h-10 w-10 ${
                            error.id === "503" ? "text-warning" : "text-destructive"
                          }`}
                        />
                      </div>

                      {/* Error Code */}
                      <div className="font-mono">
                        <span
                          className={`text-6xl font-bold ${
                            error.id === "503" ? "text-warning" : "text-destructive"
                          }`}
                        >
                          {error.code}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h2 className="mb-2 font-mono text-2xl font-semibold">{error.title}</h2>
                        <p className="text-muted-foreground font-mono text-sm">
                          {error.description}
                        </p>
                      </div>

                      {/* Terminal Output */}
                      <div className="border-border bg-card border text-left">
                        <div className="border-border/50 flex items-center gap-2 border-b px-4 py-1.5">
                          <div className="flex gap-2">
                            <div className="bg-destructive/50 size-2 rounded-none" />
                            <div className="bg-warning/50 size-2 rounded-none" />
                            <div className="bg-success/50 size-2 rounded-none" />
                          </div>
                          <span className="text-muted-foreground font-mono text-xs">terminal</span>
                        </div>
                        <div className="text-foreground space-y-0.5 p-4 font-mono text-xs">
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
                            <Home className="mr-1 h-3 w-3" />
                            &gt; GO_HOME
                          </Button>
                        )}
                        {error.actions.includes("GO_BACK") && (
                          <Button variant="outline" className="rounded-none font-mono text-xs">
                            <ArrowLeft className="mr-1 h-3 w-3" />
                            &gt; GO_BACK
                          </Button>
                        )}
                        {error.actions.includes("TRY_AGAIN") && (
                          <Button className="rounded-none font-mono text-xs">
                            <RefreshCw className="mr-1 h-3 w-3" />
                            &gt; TRY_AGAIN
                          </Button>
                        )}
                        {error.actions.includes("REFRESH") && (
                          <Button className="rounded-none font-mono text-xs">
                            <RefreshCw className="mr-1 h-3 w-3" />
                            &gt; REFRESH
                          </Button>
                        )}
                        {error.actions.includes("STATUS_PAGE") && (
                          <Button variant="outline" className="rounded-none font-mono text-xs">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            &gt; STATUS_PAGE
                          </Button>
                        )}
                      </div>

                      {/* Request ID */}
                      <div className="text-muted-foreground font-mono text-xs">
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
        <div className="grid gap-4 md:grid-cols-3">
          {errorPages.map((error) => {
            const ErrorIcon = error.icon;
            return (
              <div key={error.id} className="border-border bg-card border">
                <div className="border-border border-b px-4 py-2">
                  <span className="text-muted-foreground font-mono text-xs">
                    [ [0x0
                    {error.id === "error"
                      ? "4"
                      : error.id === "404"
                        ? "5"
                        : error.id === "500"
                          ? "6"
                          : "7"}
                    ] {error.code}_EXAMPLE ]
                  </span>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ErrorIcon
                      className={`h-4 w-4 ${
                        error.id === "503" ? "text-warning" : "text-destructive"
                      }`}
                    />
                    <span className="font-mono text-sm font-semibold">
                      {error.code} - {error.title}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 font-mono text-xs">
                    {error.description}
                  </p>
                  <div className="text-muted-foreground font-mono text-xs">[USE_CASE]:</div>
                  <div className="mt-1 font-mono text-xs">
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
        <div className="border-border bg-card border">
          <div className="border-border border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs">
              [ [0x08] TEMPLATE_FEATURES ]
            </span>
          </div>
          <div className="p-4">
            <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
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
            </div>
            <div className="text-muted-foreground mt-4 font-mono text-xs">
              [NOTE]: Copy these to app/not-found.tsx, app/error.tsx, and app/maintenance/page.tsx
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
