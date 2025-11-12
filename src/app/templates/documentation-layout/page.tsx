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
- [UI Components](/docs/ui-components) - Browse 87+ components

## Need Help?

- 📚 [Full Documentation](/docs)
- 💬 [GitHub Discussions](https://github.com/fabrk/fabrk/discussions)
- 🐛 [Report Issues](https://github.com/fabrk/fabrk/issues)
    `,
  },
};

export default function DocumentationLayoutTemplate() {
  const [activeDoc, setActiveDoc] = useState("quick-start");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      {/* Header */}
      <div className="sticky top-0 z-50 border-b-2 border-brutal bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="font-bold lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Fabrk Documentation</h1>
              <p className="text-sm text-muted-foreground">
                Complete guide to building your SaaS
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 font-bold"
              />
            </div>
            <Button variant="outline" size="sm" className="font-bold">
              <ExternalLink className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } w-64 border-r-2 border-brutal bg-card lg:block`}
        >
          <nav className="space-y-6 p-6">
            {docsStructure.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx}>
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <h3 className="font-bold">{section.section}</h3>
                  </div>
                  <ul className="space-y-1">
                    {section.pages.map((page) => (
                      <li key={page.id}>
                        <button
                          onClick={() => setActiveDoc(page.id)}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            activeDoc === page.id
                              ? "bg-primary text-primary-foreground font-bold"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground font-bold"
                          }`}
                        >
                          <span>{page.title}</span>
                          {page.badge && (
                            <Badge
                              variant={activeDoc === page.id ? "secondary" : "outline"}
                              className="text-xs font-bold"
                            >
                              {page.badge}
                            </Badge>
                          )}
                        </button>
                      </li>
                    ))}
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-bold">Docs</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-bold">Getting Started</span>
              <ChevronRight className="h-4 w-4" />
              <span className="font-bold text-foreground">{currentDoc.title}</span>
            </div>

            {/* Page Header */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{currentDoc.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                {currentDoc.description}
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="font-bold">
                  Last updated: {currentDoc.lastUpdated}
                </Badge>
                <Button variant="ghost" size="sm" className="font-bold">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Edit on GitHub
                </Button>
              </div>
            </div>

            <Separator />

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
              {parseContent(currentDoc.content).map((section, idx) => {
                if (section.type === "heading") {
                  return (
                    <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">
                      {section.content}
                    </h2>
                  );
                }

                if (section.type === "code") {
                  return (
                    <div key={idx} className="relative">
                      <div className="flex items-center justify-between rounded-t-lg border-2 border-b-0 border-brutal bg-muted px-4 py-2">
                        <Badge variant="outline" className="font-mono text-xs font-bold">
                          {section.language || "code"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(section.content, `code-${idx}`)}
                          className="font-bold"
                        >
                          {copiedCode === `code-${idx}` ? (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="overflow-auto rounded-b-lg border-2 border-brutal bg-muted p-4 text-sm">
                        <code className="font-mono">{section.content}</code>
                      </pre>
                    </div>
                  );
                }

                return (
                  <p key={idx} className="leading-relaxed">
                    {section.content}
                  </p>
                );
              })}
            </div>

            {/* Page Navigation */}
            <Separator className="my-12" />

            <div className="flex items-center justify-between">
              <Button variant="outline" className="font-bold">
                ← Previous: Installation
              </Button>
              <Button variant="outline" className="font-bold">
                Next: Environment Setup →
              </Button>
            </div>

            {/* Help Section */}
            <Card className="mt-12 border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="font-bold">Need Help?</CardTitle>
                <CardDescription>
                  Can't find what you're looking for?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start font-bold">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ask on GitHub Discussions
                </Button>
                <Button variant="outline" className="w-full justify-start font-bold">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Report an Issue
                </Button>
                <Button variant="outline" className="w-full justify-start font-bold">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Table of Contents (Right Sidebar) */}
        <aside className="hidden w-64 border-l-2 border-brutal bg-card p-6 xl:block">
          <h3 className="mb-4 font-bold">On This Page</h3>
          <ul className="space-y-2 text-sm">
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
                  className="text-muted-foreground hover:text-foreground font-bold transition-colors"
                >
                  {heading}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Implementation Note (Fixed at bottom) */}
      <div className="fixed bottom-4 right-4 max-w-sm">
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <h4 className="mb-2 text-sm font-bold">📚 Template Features</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="font-bold">✓ 3-column layout (sidebar, content, TOC)</li>
              <li className="font-bold">✓ Nested navigation with icons and badges</li>
              <li className="font-bold">✓ Search bar (placeholder)</li>
              <li className="font-bold">✓ Syntax-highlighted code blocks with copy</li>
              <li className="font-bold">✓ Breadcrumb navigation</li>
              <li className="font-bold">✓ Previous/Next page navigation</li>
              <li className="font-bold">✓ Mobile-responsive with collapsible sidebar</li>
              <li className="font-bold">✓ Markdown-style content parsing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
