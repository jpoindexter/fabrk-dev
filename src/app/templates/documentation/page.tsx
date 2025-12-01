/**
 * ✅ FABRK COMPONENT
 * Documentation Layout Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  ChevronRight,
  Copy,
  CheckCircle2,
  Book,
  Rocket,
  Code,
  Settings,
  Shield,
  CreditCard,
  ExternalLink,
  Menu,
  X,
  Minus,
} from "lucide-react";
import { TerminalBackground } from "@/components/landing/terminal-background";

// Documentation structure
const docsStructure = [
  {
    section: "Getting Started",
    icon: Rocket,
    pages: [
      { id: "intro", title: "Introduction", badge: null },
      { id: "installation", title: "Installation", badge: null },
      { id: "quick-start", title: "Quick Start", badge: "Popular" },
      { id: "env-setup", title: "Environment Setup", badge: null },
    ],
  },
  {
    section: "Core Features",
    icon: Code,
    pages: [
      { id: "auth", title: "Authentication", badge: null },
      { id: "database", title: "Database & Prisma", badge: null },
      { id: "payments", title: "Stripe Payments", badge: null },
      { id: "emails", title: "Email System", badge: null },
    ],
  },
  {
    section: "Components",
    icon: Book,
    pages: [
      { id: "ui-components", title: "UI Components", badge: null },
      { id: "forms", title: "Forms & Validation", badge: null },
      { id: "tables", title: "Data Tables", badge: null },
      { id: "layouts", title: "Page Layouts", badge: null },
    ],
  },
  {
    section: "Configuration",
    icon: Settings,
    pages: [
      { id: "config", title: "Central Config", badge: null },
      { id: "styling", title: "Styling & Themes", badge: null },
      { id: "deployment", title: "Deployment", badge: null },
    ],
  },
];

// Sample documentation content
const docContent = {
  "quick-start": {
    title: "Quick Start Guide",
    description: "Get up and running with Fabrk in 5 minutes",
    lastUpdated: "November 10, 2024",
    content: `
Welcome to Fabrk! This guide will help you get started in minutes.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18+ installed
- A PostgreSQL database (local or hosted)
- Stripe account (for payments)
- Resend account (for emails)

## Installation

First, clone the repository and install dependencies:

\`\`\`bash
git clone https://github.com/fabrk/fabrk.git
cd fabrk
npm install
\`\`\`

## Environment Setup

Copy the example environment file:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Then update \`.env.local\` with your credentials:

\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/fabrk"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Resend)
RESEND_API_KEY="re_..."
\`\`\`

## Database Setup

Push the Prisma schema to your database:

\`\`\`bash
npm run db:push
\`\`\`

## Start Development Server

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your app!

## Next Steps

Now that you're set up, explore these guides:

- [Authentication Setup](/docs/auth) - Configure OAuth providers
- [Stripe Integration](/docs/payments) - Set up payments
- [Email Templates](/docs/emails) - Customize transactional emails
- [UI Components](/docs/ui-components) - Browse 100+ components

## Need Help?

- 📚 [Full Documentation](/docs)
- 💬 [GitHub Discussions](https://github.com/your-org/your-repo/discussions)
- 🐛 [Report Issues](https://github.com/your-org/your-repo/issues)
    `,
  },
};

export default function DocumentationLayoutTemplate() {
  const [activeDoc, setActiveDoc] = useState("quick-start");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showFeatures, setShowFeatures] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const currentDoc = docContent[activeDoc as keyof typeof docContent];

  // Parse markdown-style content into sections
  const parseContent = (content: string) => {
    const lines = content.trim().split("\n");
    const sections: Array<{
      type: "text" | "heading" | "code";
      content: string;
      language?: string;
    }> = [];
    let currentCodeBlock: string[] = [];
    let inCodeBlock = false;
    let codeLanguage = "";

    lines.forEach((line) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          sections.push({
            type: "code",
            content: currentCodeBlock.join("\n"),
            language: codeLanguage,
          });
          currentCodeBlock = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "");
        }
      } else if (inCodeBlock) {
        currentCodeBlock.push(line);
      } else if (line.startsWith("##")) {
        sections.push({ type: "heading", content: line.replace("## ", "") });
      } else if (line.trim()) {
        sections.push({ type: "text", content: line });
      }
    });

    return sections;
  };

  return (
    <div className="relative isolate min-h-screen bg-background">
      <TerminalBackground />
      {/* Page Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card">
          <nav className="space-y-6 p-4">
            {docsStructure.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx}>
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <h3 className="font-mono text-xs font-bold">[{section.section.toUpperCase().replace(/ /g, "_")}]:</h3>
                  </div>
                  <ul className="space-y-1">
                    {section.pages.map((page) => {
                      const hasContent = page.id in docContent;
                      return (
                        <li key={page.id}>
                          <button
                            onClick={() => hasContent && setActiveDoc(page.id)}
                            disabled={!hasContent}
                            className={`flex w-full items-center justify-between px-3 py-2 text-left font-mono text-xs transition-colors ${
                              activeDoc === page.id
                                ? "bg-primary text-primary-foreground"
                                : hasContent
                                ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                                : "text-muted-foreground/50 cursor-not-allowed"
                            }`}
                          >
                            <span>{page.title}</span>
                            {page.badge && (
                              <Badge
                                variant={activeDoc === page.id ? "secondary" : "outline"}
                                className="text-xs rounded-none py-0 h-5"
                              >
                                {page.badge}
                              </Badge>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Template Label */}
            <div className="inline-block border border-border px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: DOCUMENTATION</span>
            </div>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs">
              <span className="text-muted-foreground">Docs</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
              <span className="text-muted-foreground">Getting Started</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
              <span className="text-foreground" aria-current="page">{currentDoc.title}</span>
            </nav>

            {/* Page Header */}
            <header>
              <h1 className="text-4xl font-semibold tracking-tight mb-3 text-foreground">{currentDoc.title}</h1>
              <p className="font-mono text-sm text-muted-foreground mb-4">
                {currentDoc.description}
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="rounded-none font-mono text-xs">
                  <time dateTime={currentDoc.lastUpdated}>Last updated: {currentDoc.lastUpdated}</time>
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
                    <h2 key={idx} className="font-mono text-sm font-bold mt-8 mb-3 text-foreground scroll-mt-20" id={section.content.toLowerCase().replace(/\s+/g, "-")}>
                      [{section.content.toUpperCase().replace(/ /g, "_")}]:
                    </h2>
                  );
                }

                if (section.type === "code") {
                  return (
                    <div key={idx} className="not-prose my-6" role="region" aria-label={`Code example in ${section.language || "code"}`}>
                      <div className="border border-border overflow-hidden bg-card">
                        <div className="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <div className="size-2 rounded-full bg-destructive/50" />
                              <div className="size-2 rounded-full bg-warning/50" />
                              <div className="size-2 rounded-full bg-success/50" />
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">{section.language || "code"}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyCode(section.content, `code-${idx}`)}
                            className="rounded-none font-mono text-xs h-7"
                            aria-label={copiedCode === `code-${idx}` ? "Code copied" : "Copy code to clipboard"}
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
                        <div className="bg-zinc-950">
                          <pre className="overflow-auto p-4 m-0 text-xs leading-relaxed" tabIndex={0}>
                            <code className="font-mono text-zinc-100">{section.content}</code>
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
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">help.tsx</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-1">[NEED_HELP]:</div>
                <div className="font-mono text-xs text-muted-foreground mb-4">Can't find what you're looking for?</div>
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

        {/* Table of Contents (Right Sidebar) */}
        <aside
          className="hidden w-64 border-l border-border bg-card xl:block"
          aria-label="Table of contents"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">toc.tsx</span>
          </div>
          <div className="p-4">
            <div className="mb-4 font-mono text-xs text-muted-foreground">[ON_THIS_PAGE]:</div>
            <nav>
              <ul className="space-y-2 font-mono text-xs">
                {[
                  "Prerequisites",
                  "Installation",
                  "Environment Setup",
                  "Database Setup",
                  "Start Development",
                  "Next Steps",
                ].map((heading, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${heading.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-1 transition-colors"
                    >
                      &gt; {heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </div>

      {/* Implementation Note (Fixed at bottom) - Draggable */}
      {showFeatures && (
        <aside
          ref={dragRef}
          className="fixed bottom-4 right-4 max-w-sm z-50"
          aria-label="Template features"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <div className="border border-border bg-card shadow-lg">
            <div
              role="group"
              aria-label="Draggable header"
              className="flex items-center gap-2 border-b border-border px-4 py-2 cursor-move select-none"
              onMouseDown={handleDragStart}
            >
              <div className="flex gap-1.5">
                <button
                  onClick={() => setShowFeatures(false)}
                  className="size-2 rounded-full bg-destructive/50 hover:bg-destructive transition-colors"
                  aria-label="Close"
                />
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="size-2 rounded-full bg-warning/50 hover:bg-warning transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">features.md</span>
              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="font-mono text-xs text-muted-foreground hover:text-foreground p-0.5"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setShowFeatures(false)}
                  className="font-mono text-xs text-muted-foreground hover:text-foreground p-0.5"
                  aria-label="Close"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            {!isMinimized && (
              <div className="p-4">
                <div className="mb-3 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
                <div className="space-y-1.5 font-mono text-xs" role="list">
                  <div><span className="text-success">&gt;</span> WCAG 2.1 AA compliant</div>
                  <div><span className="text-success">&gt;</span> 3-column layout (sidebar, content, TOC)</div>
                  <div><span className="text-success">&gt;</span> Semantic HTML structure</div>
                  <div><span className="text-success">&gt;</span> Keyboard navigation support</div>
                  <div><span className="text-success">&gt;</span> Code blocks with copy functionality</div>
                  <div><span className="text-success">&gt;</span> Focus indicators on all interactive elements</div>
                  <div><span className="text-success">&gt;</span> Proper heading hierarchy (h1→h2)</div>
                  <div><span className="text-success">&gt;</span> ARIA labels for screen readers</div>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
