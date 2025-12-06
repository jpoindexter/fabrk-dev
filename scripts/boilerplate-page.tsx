/**
 * FABRK BOILERPLATE
 * Landing Page - Customize this for your SaaS
 *
 * This is a placeholder. Replace with your own landing page.
 * See /templates/landing-variations for examples.
 */

import { Button } from "@/components/ui/button";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          Your SaaS Name
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Replace this with your value proposition. What problem do you solve?
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/templates">View Templates</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">Read Docs</Link>
          </Button>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <TerminalCard>
            <TerminalCardHeader code="0x01" title="TEMPLATES" />
            <TerminalCardContent>
              <p className="text-muted-foreground">
                87 production-ready components and page templates.
              </p>
              <Link
                href="/templates"
                className="mt-4 block text-primary hover:underline"
              >
                Browse templates &rarr;
              </Link>
            </TerminalCardContent>
          </TerminalCard>

          <TerminalCard>
            <TerminalCardHeader code="0x02" title="DASHBOARD" />
            <TerminalCardContent>
              <p className="text-muted-foreground">
                Full dashboard with auth, billing, settings, and more.
              </p>
              <Link
                href="/dashboard"
                className="mt-4 block text-primary hover:underline"
              >
                View dashboard &rarr;
              </Link>
            </TerminalCardContent>
          </TerminalCard>

          <TerminalCard>
            <TerminalCardHeader code="0x03" title="DOCS" />
            <TerminalCardContent>
              <p className="text-muted-foreground">
                Complete documentation for customization and deployment.
              </p>
              <Link
                href="/docs"
                className="mt-4 block text-primary hover:underline"
              >
                Read docs &rarr;
              </Link>
            </TerminalCardContent>
          </TerminalCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            Built with Fabrk Boilerplate
          </p>
        </div>
      </footer>
    </div>
  );
}
