/**
 * Changelog Page
 * Shows product updates, new features, and bug fixes
 */

import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Bug, Zap, Shield, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoNav } from "@/components/demo/demo-nav";

export const metadata: Metadata = {
  title: "Changelog - Product Updates | Fabrk",
  description:
    "Stay updated with the latest features, improvements, and bug fixes in Fabrk SaaS boilerplate.",
};

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: "major" | "minor" | "patch";
  changes: {
    category: "feature" | "improvement" | "bugfix" | "security" | "breaking";
    description: string;
  }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "1.2.0",
    date: "2025-11-17",
    title: "Conversion Optimization & Transparency",
    type: "minor",
    changes: [
      {
        category: "feature",
        description: "Added sticky CTA bar for improved conversion rates",
      },
      {
        category: "feature",
        description: "Created comprehensive changelog page for transparency",
      },
      {
        category: "feature",
        description: "Centralized all pricing in config.js for easy updates",
      },
      {
        category: "improvement",
        description: "Mobile navigation now fully functional with hamburger menu",
      },
      {
        category: "improvement",
        description: "Replaced 80+ console statements with logger utility",
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2025-11-14",
    title: "Security Hardening & UX Improvements",
    type: "minor",
    changes: [
      {
        category: "security",
        description:
          "Replaced Math.random() with crypto.randomInt() for license key generation",
      },
      {
        category: "security",
        description: "Removed unsafe Stripe secret key fallback",
      },
      {
        category: "security",
        description: "Fixed 2FA API routes to use correct endpoints",
      },
      {
        category: "improvement",
        description: "Replaced 8 browser confirm() dialogs with AlertDialog component",
      },
      {
        category: "improvement",
        description: "License keys now persisted in database after purchase",
      },
      {
        category: "bugfix",
        description: "Fixed 2FA enable/disable buttons functionality",
      },
      {
        category: "bugfix",
        description: "Fixed session invalidation on password change",
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2025-11-01",
    title: "Initial Production Release",
    type: "major",
    changes: [
      {
        category: "feature",
        description: "Next.js 15 with App Router and React 19",
      },
      {
        category: "feature",
        description: "NextAuth v5 with credentials, OAuth, and magic link",
      },
      {
        category: "feature",
        description: "Multi-tenancy with organization management and RBAC",
      },
      {
        category: "feature",
        description: "Stripe integration for one-time and subscription payments",
      },
      {
        category: "feature",
        description: "Webhooks system with 22 events and automatic retries",
      },
      {
        category: "feature",
        description: "API keys with read/write/admin permission levels",
      },
      {
        category: "feature",
        description: "Two-factor authentication (2FA/MFA) with backup codes",
      },
      {
        category: "feature",
        description: "Real-time features with Pusher integration",
      },
      {
        category: "feature",
        description: "Comprehensive admin dashboard with analytics",
      },
      {
        category: "feature",
        description: "100 production-ready UI components",
      },
      {
        category: "feature",
        description: "95% Storybook story coverage for component development",
      },
      {
        category: "feature",
        description: "64% test coverage with 931+ comprehensive tests",
      },
    ],
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "feature":
      return <Sparkles className="h-4 w-4" />;
    case "improvement":
      return <Zap className="h-4 w-4" />;
    case "bugfix":
      return <Bug className="h-4 w-4" />;
    case "security":
      return <Shield className="h-4 w-4" />;
    case "breaking":
      return <Code className="h-4 w-4" />;
    default:
      return null;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "feature":
      return "bg-primary/10 text-primary border-primary/20";
    case "improvement":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "bugfix":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
    case "security":
      return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
    case "breaking":
      return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
    default:
      return "";
  }
};

const getVersionBadgeVariant = (type: string) => {
  switch (type) {
    case "major":
      return "default";
    case "minor":
      return "secondary";
    case "patch":
      return "outline";
    default:
      return "outline";
  }
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <DemoNav backButtonText="Back to Home" backButtonHref="/" />

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">Changelog</h1>
          <p className="text-xl text-muted-foreground">
            Track all updates, new features, and improvements to Fabrk. We believe in
            transparency and keeping our community informed.
          </p>
        </div>
      </div>

      {/* Changelog Entries */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-12">
          {changelog.map((entry) => (
            <Card key={entry.version} className="overflow-hidden">
              <CardHeader className="border-b border-border bg-muted/30">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-2xl">v{entry.version}</CardTitle>
                      <Badge variant={getVersionBadgeVariant(entry.type)}>
                        {entry.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-lg font-medium text-foreground">{entry.title}</p>
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {entry.changes.map((change, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 rounded-md border p-1.5 ${getCategoryColor(
                          change.category
                        )}`}
                      >
                        {getCategoryIcon(change.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {change.category}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-foreground">
                          {change.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 rounded-lg border-2 border-border bg-card p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold">Stay Updated</h2>
          <p className="mb-6 text-muted-foreground">
            We ship updates regularly. Follow our development or get started today.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/#pricing">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="https://twitter.com/fabrk" target="_blank" rel="noopener">
                Follow on Twitter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
