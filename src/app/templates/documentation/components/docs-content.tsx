/**
 * ✅ FABRK COMPONENT
 * Documentation Content Area
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Copy,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { parseContent } from "./content-parser";

interface DocsContentProps {
  currentDoc: {
    title: string;
    description: string;
    lastUpdated: string;
    content: string;
  };
}

export function DocsContent({ currentDoc }: DocsContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <main className="flex-1 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Template Label */}
        <div className="inline-block border border-border px-4 py-1">
          <span className="font-mono text-xs text-muted-foreground">
            [TEMPLATE]: DOCUMENTATION
          </span>
        </div>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs">
          <span className="text-muted-foreground">Docs</span>
          <ChevronRight className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
          <span className="text-muted-foreground">Getting Started</span>
          <ChevronRight className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
          <span className="text-foreground" aria-current="page">
            {currentDoc.title}
          </span>
        </nav>

        {/* Page Header */}
        <header>
          <h1 className="text-4xl font-semibold tracking-tight mb-4 text-foreground">
            {currentDoc.title}
          </h1>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            {currentDoc.description}
          </p>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="rounded-none font-mono text-xs">
              <time dateTime={currentDoc.lastUpdated}>
                Last updated: {currentDoc.lastUpdated}
              </time>
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none font-mono text-xs"
              aria-label="Edit this page on GitHub"
            >
              <ExternalLink className="mr-2 h-3 w-3" aria-hidden="true" />
              &gt; EDIT_ON_GITHUB
            </Button>
          </div>
        </header>

        <Separator />

        {/* Content */}
        <article className="max-w-none space-y-4">
          {parseContent(currentDoc.content).map((section, idx) => {
            if (section.type === "heading") {
              return (
                <h2
                  key={idx}
                  className="font-mono text-sm font-bold mt-8 mb-4 text-foreground scroll-mt-20"
                  id={section.content.toLowerCase().replace(/\s+/g, "-")}
                >
                  [{section.content.toUpperCase().replace(/ /g, "_")}]:
                </h2>
              );
            }

            if (section.type === "code") {
              return (
                <div
                  key={idx}
                  className="not-prose my-6"
                  role="region"
                  aria-label={`Code example in ${section.language || "code"}`}
                >
                  <div className="border border-border overflow-hidden bg-card">
                    <div className="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="size-2 rounded-full bg-destructive/50" />
                          <div className="size-2 rounded-full bg-warning/50" />
                          <div className="size-2 rounded-full bg-success/50" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {section.language || "code"}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(section.content, `code-${idx}`)}
                        className="rounded-none font-mono text-xs h-7"
                        aria-label={
                          copiedCode === `code-${idx}`
                            ? "Code copied"
                            : "Copy code to clipboard"
                        }
                      >
                        {copiedCode === `code-${idx}` ? (
                          <>
                            <CheckCircle2 className="mr-1 h-3 w-3" aria-hidden="true" />
                            COPIED
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-3 w-3" aria-hidden="true" />
                            &gt; COPY
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-card">
                      <pre className="overflow-auto p-4 m-0 text-xs leading-relaxed" tabIndex={0}>
                        <code className="font-mono text-foreground">{section.content}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <p key={idx} className="font-mono text-xs leading-relaxed text-muted-foreground">
                {section.content}
              </p>
            );
          })}
        </article>

        {/* Page Navigation */}
        <Separator className="my-12" />

        <nav aria-label="Page navigation" className="flex items-center justify-between">
          <Button
            variant="outline"
            className="rounded-none font-mono text-xs"
            aria-label="Go to previous page: Installation"
          >
            &lt; PREVIOUS: INSTALLATION
          </Button>
          <Button
            variant="default"
            className="rounded-none font-mono text-xs"
            aria-label="Go to next page: Environment Setup"
          >
            NEXT: ENVIRONMENT_SETUP &gt;
          </Button>
        </nav>

        {/* Help Section */}
        <div className="mt-12 border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">help.tsx</span>
          </div>
          <div className="p-4">
            <div className="font-mono text-xs text-muted-foreground mb-1">[NEED_HELP]:</div>
            <div className="font-mono text-xs text-muted-foreground mb-4">
              Can't find what you're looking for?
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="rounded-none w-full justify-start font-mono text-xs"
                aria-label="Ask question on GitHub Discussions"
              >
                <ExternalLink className="mr-2 h-3 w-3" aria-hidden="true" />
                &gt; ASK_ON_GITHUB_DISCUSSIONS
              </Button>
              <Button
                variant="outline"
                className="rounded-none w-full justify-start font-mono text-xs"
                aria-label="Report an issue on GitHub"
              >
                <ExternalLink className="mr-2 h-3 w-3" aria-hidden="true" />
                &gt; REPORT_AN_ISSUE
              </Button>
              <Button
                variant="outline"
                className="rounded-none w-full justify-start font-mono text-xs"
                aria-label="Contact support team"
              >
                <ExternalLink className="mr-2 h-3 w-3" aria-hidden="true" />
                &gt; CONTACT_SUPPORT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
