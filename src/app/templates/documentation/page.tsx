/**
 * Documentation Layout Template
 * Comprehensive docs interface with sidebar navigation, search, and code blocks
 */

"use client";

import { useState } from "react";
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
import { DemoNav } from "@/components/demo/demo-nav";
import { Footer } from "@/components/landing/footer";
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
} from "lucide-react";

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
      { id: "payments", title: "Stripe Payments", badge: "Important" },
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
- 💬 [GitHub Discussions](https://github.com/fabrk/fabrk/discussions)
- 🐛 [Report Issues](https://github.com/fabrk/fabrk/issues)
    `,
  },
};

export default function DocumentationLayoutTemplate() {
  const [activeDoc, setActiveDoc] = useState("quick-start");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
    <div className="min-h-screen bg-background">
      {/* Demo Navigation */}
      <DemoNav backButtonText="Back" backButtonHref="/templates" />

      {/* Page Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r-2 border-border bg-card">
          <nav className="space-y-6 p-6">
            {docsStructure.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx}>
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">{section.section}</h3>
                  </div>
                  <ul className="space-y-1">
                    {section.pages.map((page) => {
                      const hasContent = page.id in docContent;
                      return (
                        <li key={page.id}>
                          <button
                            onClick={() => hasContent && setActiveDoc(page.id)}
                            disabled={!hasContent}
                            className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                              activeDoc === page.id
                                ? "bg-primary text-primary-foreground font-bold"
                                : hasContent
                                ? "text-muted-foreground hover:bg-muted hover:text-foreground font-bold"
                                : "text-muted-foreground/50 cursor-not-allowed font-bold"
                            }`}
                          >
                            <span>{page.title}</span>
                            {page.badge && (
                              <Badge
                                variant={activeDoc === page.id ? "secondary" : "outline"}
                                className="text-xs font-semibold"
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
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-foreground/80">Docs</span>
              <ChevronRight className="h-4 w-4 text-foreground/60" aria-hidden="true" />
              <span className="font-semibold text-foreground/80">Getting Started</span>
              <ChevronRight className="h-4 w-4 text-foreground/60" aria-hidden="true" />
              <span className="font-semibold text-foreground" aria-current="page">{currentDoc.title}</span>
            </nav>

            {/* Page Header */}
            <header>
              <h1 className="text-4xl font-bold leading-tight tracking-tight mb-3 text-foreground">{currentDoc.title}</h1>
              <p className="text-lg leading-relaxed text-foreground/85 mb-4">
                {currentDoc.description}
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="font-semibold">
                  <time dateTime={currentDoc.lastUpdated}>Last updated: {currentDoc.lastUpdated}</time>
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Edit this page on GitHub"
                >
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  Edit on GitHub
                </Button>
              </div>
            </header>

            <Separator />

            {/* Content */}
            <article className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
              {parseContent(currentDoc.content).map((section, idx) => {
                if (section.type === "heading") {
                  return (
                    <h2 key={idx} className="text-3xl font-bold leading-tight tracking-tight mt-12 mb-4 text-foreground scroll-mt-20" id={section.content.toLowerCase().replace(/\s+/g, "-")}>
                      {section.content}
                    </h2>
                  );
                }

                if (section.type === "code") {
                  return (
                    <div key={idx} className="not-prose my-6" role="region" aria-label={`Code example in ${section.language || "code"}`}>
                      <div className="rounded-lg border-2 border-border overflow-hidden bg-card">
                        <div className="flex items-center justify-between bg-muted px-4 py-2.5 border-b-2 border-border">
                          <Badge variant="secondary" className="font-mono text-xs font-bold" aria-label="Programming language">
                            {section.language || "code"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyCode(section.content, `code-${idx}`)}
                            className="font-semibold h-8 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            aria-label={copiedCode === `code-${idx}` ? "Code copied" : "Copy code to clipboard"}
                          >
                            {copiedCode === `code-${idx}` ? (
                              <>
                                <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="bg-muted/30">
                          <pre className="overflow-auto p-4 m-0 text-[13px] leading-[1.7]" tabIndex={0}>
                            <code className="font-mono text-foreground">{section.content}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <p key={idx} className="text-base leading-[1.75] text-foreground">
                    {section.content}
                  </p>
                );
              })}
            </article>

            {/* Page Navigation */}
            <Separator className="my-12" />

            <nav aria-label="Page navigation" className="flex items-center justify-between">
              <Button
                variant="secondary"
                className="font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Go to previous page: Installation"
              >
                ← Previous: Installation
              </Button>
              <Button
                variant="default"
                className="font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Go to next page: Environment Setup"
              >
                Next: Environment Setup →
              </Button>
            </nav>

            {/* Help Section */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="font-bold text-foreground">Need Help?</CardTitle>
                <CardDescription className="text-foreground/75">
                  Can't find what you're looking for?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Ask question on GitHub Discussions"
                >
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  Ask on GitHub Discussions
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Report an issue on GitHub"
                >
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  Report an Issue
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Contact support team"
                >
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Table of Contents (Right Sidebar) */}
        <aside
          className="hidden w-64 border-l-2 border-border bg-card p-6 xl:block"
          aria-label="Table of contents"
        >
          <h3 className="mb-4 font-bold text-foreground">On This Page</h3>
          <nav>
            <ul className="space-y-2.5 text-sm">
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
                    className="block text-foreground/80 hover:text-foreground font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm px-1 py-0.5"
                  >
                    {heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      {/* Implementation Note (Fixed at bottom) */}
      <aside className="fixed bottom-4 right-4 max-w-sm" aria-label="Template features">
        <Card>
          <CardContent className="pt-4">
            <h4 className="mb-3 text-sm font-bold text-foreground">📚 Template Features</h4>
            <ul className="space-y-1.5 text-xs text-foreground/80" role="list">
              <li className="font-semibold">✓ WCAG 2.1 AA compliant</li>
              <li className="font-semibold">✓ 3-column layout (sidebar, content, TOC)</li>
              <li className="font-semibold">✓ Semantic HTML structure</li>
              <li className="font-semibold">✓ Keyboard navigation support</li>
              <li className="font-semibold">✓ Code blocks with copy functionality</li>
              <li className="font-semibold">✓ Focus indicators on all interactive elements</li>
              <li className="font-semibold">✓ Proper heading hierarchy (h1→h2)</li>
              <li className="font-semibold">✓ ARIA labels for screen readers</li>
            </ul>
          </CardContent>
        </Card>
      </aside>

      <Footer />
    </div>
  );
}
