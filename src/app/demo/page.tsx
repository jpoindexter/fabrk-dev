/**
 * Demo Playground Page
 * Interactive showcase of key boilerplate features
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("landing");

  const demos = [
    {
      id: "landing",
      label: "Landing Page",
      url: "/variations/modern",
      description: "Modern minimal landing page with hero, features, pricing, and testimonials",
      sourceUrl: "https://github.com/yourusername/fabrk/blob/main/src/app/variations/modern/page.tsx",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      url: "/templates/team-dashboard",
      description: "Team dashboard with multi-tenancy, RBAC, and organization management",
      sourceUrl: "https://github.com/yourusername/fabrk/blob/main/src/app/templates/team-dashboard/page.tsx",
    },
    {
      id: "settings",
      label: "Settings",
      url: "/templates/settings-page",
      description: "Complete settings page with 4 tabs: profile, notifications, privacy, and team",
      sourceUrl: "https://github.com/yourusername/fabrk/blob/main/src/app/templates/settings-page/page.tsx",
    },
    {
      id: "admin",
      label: "Admin Panel",
      url: "/templates/user-management",
      description: "User management with TanStack Table, sorting, filtering, and actions",
      sourceUrl: "https://github.com/yourusername/fabrk/blob/main/src/app/templates/user-management/page.tsx",
    },
    {
      id: "charts",
      label: "Analytics",
      url: "/templates/analytics-dashboard",
      description: "Full analytics dashboard with charts, metrics, and data visualization",
      sourceUrl: "https://github.com/yourusername/fabrk/blob/main/src/app/templates/analytics-dashboard/page.tsx",
    },
  ];

  const currentDemo = demos.find((d) => d.id === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Live Demo Playground
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Interact with real pages and components. Click through tabs to explore different areas of the boilerplate.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div>
                <div className="text-2xl font-bold text-primary">102+</div>
                <div className="text-muted-foreground">Components</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">28</div>
                <div className="text-muted-foreground">Templates</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">6</div>
                <div className="text-muted-foreground">Color Themes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">30+</div>
                <div className="text-muted-foreground">API Routes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Playground */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div suppressHydrationWarning>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
              {demos.map((demo) => (
                <TabsTrigger key={demo.id} value={demo.id}>
                  {demo.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            {demos.map((demo) => (
              <TabsContent key={demo.id} value={demo.id} className="mt-6">
                <Card className="overflow-hidden">
                  {/* Demo Info Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-muted/50 p-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{demo.label}</h3>
                      <p className="text-sm text-muted-foreground">{demo.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={demo.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Full Page
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <a href={demo.sourceUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Source
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Iframe Preview */}
                  <div className="relative aspect-[16/10] w-full bg-muted">
                    <iframe
                      src={demo.url}
                      className="absolute inset-0 h-full w-full border-0"
                      title={`${demo.label} Preview`}
                      loading="lazy"
                    />
                  </div>
                </Card>
            </TabsContent>
          ))}
          </Tabs>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-2 text-lg font-semibold">Fully Interactive</h3>
            <p className="text-sm text-muted-foreground">
              These are live pages running the actual boilerplate code. Click buttons, toggle themes, interact with forms - everything works exactly as it will in your app.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-2 text-lg font-semibold">Ready to Use</h3>
            <p className="text-sm text-muted-foreground">
              All pages, components, and templates shown here are production-ready. Copy the code, customize the styling, and ship your SaaS faster.
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold">Explore More</h3>
          <p className="mt-2 text-muted-foreground">
            See our complete component library and template gallery
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/components">Browse Components</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/templates">View Templates</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="/whats-included">What's Included</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
