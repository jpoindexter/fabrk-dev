/**
 * FABRK BOILERPLATE
 * Landing Page - Customize this for your SaaS
 *
 * This is a placeholder. Replace with your own landing page.
 * See /templates/landing-variations for examples.
 */

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="mb-6 font-mono text-4xl font-bold tracking-tight md:text-6xl">
          YOUR_SAAS_NAME
        </h1>
        <p className="text-muted-foreground mb-8 font-mono text-xl">
          Replace this with your value proposition. What problem do you solve?
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/templates">&gt; VIEW_TEMPLATES</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">&gt; READ_DOCS</Link>
          </Button>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Card size="auto">
            <CardHeader code="0x01" title="TEMPLATES" />
            <CardContent>
              <p className="text-muted-foreground font-mono text-xs">
                234 production-ready components and page templates.
              </p>
              <Link
                href="/templates"
                className="text-primary mt-4 block font-mono text-xs hover:underline"
              >
                &gt; BROWSE_TEMPLATES
              </Link>
            </CardContent>
          </Card>

          <Card size="auto">
            <CardHeader code="0x02" title="DASHBOARD" />
            <CardContent>
              <p className="text-muted-foreground font-mono text-xs">
                Full dashboard with auth, billing, settings, and more.
              </p>
              <Link
                href="/dashboard"
                className="text-primary mt-4 block font-mono text-xs hover:underline"
              >
                &gt; VIEW_DASHBOARD
              </Link>
            </CardContent>
          </Card>

          <Card size="auto">
            <CardHeader code="0x03" title="DOCS" />
            <CardContent>
              <p className="text-muted-foreground font-mono text-xs">
                Complete documentation for customization and deployment.
              </p>
              <Link
                href="/docs"
                className="text-primary mt-4 block font-mono text-xs hover:underline"
              >
                &gt; READ_DOCS
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t py-8">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <p className="text-muted-foreground font-mono text-xs">
            Built with Fabrk Boilerplate
          </p>
        </div>
      </footer>
    </div>
  );
}
