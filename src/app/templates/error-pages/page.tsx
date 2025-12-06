/**
 * FABRK COMPONENT
 * Error Pages Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
import {
  StyledCard,
  StyledCardHeader,
  TemplatePageHeader,
  FeaturesCard,
  CodeOutput,
} from "@/components/ui/card";
import {
  FileQuestion,
  ServerCrash,
  Construction,
  Home,
  RefreshCw,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

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

  const tabs = errorPages.map((error) => ({
    id: error.id,
    label: error.code,
    icon: error.icon,
  }));

  return (
    <div>
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="ERROR_PAGES"
          title="Error Pages"
          description="Terminal-styled error pages for generic errors, 404, 500, and maintenance states"
        />

        {/* Error Type Selector with Tabs */}
        <StyledTabs
          code="0x00"
          title="ERROR_TYPES"
          tabs={tabs}
          value={activeError}
          onValueChange={setActiveError}
        >
          {/* Error Preview */}
          {errorPages.map((error) => {
            const Icon = error.icon;
            const codeMap: Record<string, string> = {
              error: "0x00",
              "404": "0x01",
              "500": "0x02",
              "503": "0x03",
            };
            return (
              <StyledTabsContent key={error.id} value={error.id}>
                <StyledCard>
                  <StyledCardHeader
                    code={codeMap[error.id] || "0x00"}
                    title={`ERROR_${error.code}`}
                  />

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
                      <div className={cn(mode.font)}>
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
                        <h2 className={cn(mode.font, "mb-2 text-2xl font-semibold")}>
                          {error.title}
                        </h2>
                        <p className={cn(mode.font, "text-muted-foreground text-sm")}>
                          {error.description}
                        </p>
                      </div>

                      {/* Terminal Output */}
                      <CodeOutput>
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
                      </CodeOutput>

                      {/* Actions */}
                      <div className="flex items-center justify-center gap-4">
                        {error.actions.includes("GO_HOME") && (
                          <Button className={cn(mode.radius, mode.font, "text-xs")}>
                            <Home className="mr-1 h-3 w-3" />
                            &gt; GO_HOME
                          </Button>
                        )}
                        {error.actions.includes("GO_BACK") && (
                          <Button
                            variant="outline"
                            className={cn(mode.radius, mode.font, "text-xs")}
                          >
                            <ArrowLeft className="mr-1 h-3 w-3" />
                            &gt; GO_BACK
                          </Button>
                        )}
                        {error.actions.includes("TRY_AGAIN") && (
                          <Button className={cn(mode.radius, mode.font, "text-xs")}>
                            <RefreshCw className="mr-1 h-3 w-3" />
                            &gt; TRY_AGAIN
                          </Button>
                        )}
                        {error.actions.includes("REFRESH") && (
                          <Button className={cn(mode.radius, mode.font, "text-xs")}>
                            <RefreshCw className="mr-1 h-3 w-3" />
                            &gt; REFRESH
                          </Button>
                        )}
                        {error.actions.includes("STATUS_PAGE") && (
                          <Button
                            variant="outline"
                            className={cn(mode.radius, mode.font, "text-xs")}
                          >
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            &gt; STATUS_PAGE
                          </Button>
                        )}
                      </div>

                      {/* Request ID */}
                      <div className={cn(mode.font, "text-muted-foreground text-xs")}>
                        [REQUEST_ID]: req_abc123def456
                      </div>
                    </div>
                  </div>
                </StyledCard>
              </StyledTabsContent>
            );
          })}
        </StyledTabs>

        {/* Usage Examples */}
        <div className="grid gap-6 md:grid-cols-3">
          {errorPages.map((error) => {
            const ErrorIcon = error.icon;
            const exampleCodeMap: Record<string, string> = {
              error: "0x04",
              "404": "0x05",
              "500": "0x06",
              "503": "0x07",
            };
            return (
              <StyledCard key={error.id}>
                <StyledCardHeader
                  code={exampleCodeMap[error.id] || "0x04"}
                  title={`${error.code}_EXAMPLE`}
                />
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ErrorIcon
                      className={`h-4 w-4 ${
                        error.id === "503" ? "text-warning" : "text-destructive"
                      }`}
                    />
                    <span className={cn(mode.font, "text-sm font-semibold")}>
                      {error.code} - {error.title}
                    </span>
                  </div>
                  <p className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
                    {error.description}
                  </p>
                  <div className={cn(mode.font, "text-muted-foreground text-xs")}>[USE_CASE]:</div>
                  <div className={cn(mode.font, "mt-1 text-xs")}>
                    {error.id === "error" && "React errors, unexpected exceptions"}
                    {error.id === "404" && "Invalid routes, deleted content"}
                    {error.id === "500" && "Server crashes, API failures"}
                    {error.id === "503" && "Planned downtime, updates"}
                  </div>
                </div>
              </StyledCard>
            );
          })}
        </div>

        {/* Features Card */}
        <FeaturesCard
          title="TEMPLATE_FEATURES"
          code="0x08"
          features={[
            "Generic error, 404, 500, 503 templates",
            "Terminal-style error output",
            "Contextual action buttons",
            "Request ID for debugging",
            "Color-coded severity (error vs warning)",
            "Maintenance mode with ETA",
          ]}
          note="Copy these to app/not-found.tsx, app/error.tsx, and app/maintenance/page.tsx"
        />
      </div>
    </div>
  );
}
