/**
 * ✅ FABRK COMPONENT
 * Dashboards Category - Terminal console style
 * Production-ready ✓
 */
"use client";

import Link from "next/link";
import { getCategoryInfo, getTemplatesByCategory } from "../template-data";

export default function DashboardsPage() {
  const categoryTemplates = getTemplatesByCategory("dashboard");
  const categoryInfo = getCategoryInfo("dashboard");

  return (
 <div >
      <main className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
        {/* Category Header */}
        <section className="space-y-4">
          <div className="inline-block border border-border px-4 py-1">
            <span className="font-mono text-xs text-muted-foreground">[CATEGORY]: DASHBOARDS</span>
          </div>
          <div className="flex items-center gap-4">
            {categoryInfo && <categoryInfo.icon className="h-6 w-6 text-primary" />}
            <h1 className="text-3xl font-bold">Dashboards</h1>
            <span className="border border-border px-2 py-0.5 font-mono text-xs">
              COUNT: {categoryTemplates.length}
            </span>
          </div>
        </section>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {categoryTemplates.map((template) => (
            <Link key={template.id} href={template.href}>
              <div className="group border border-border bg-card transition-colors hover:border-primary/50">
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    [TEMPLATE]: {template.id.toUpperCase().replace(/-/g, "_")}
                  </span>
                  <template.icon className="size-4 text-muted-foreground" />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Status & Badge */}
                  <div className="mb-4 flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="text-muted-foreground">STATUS: </span>
                      <span className="text-success">READY</span>
                    </div>
                    {template.badge && (
                      <div className="border border-primary/50 px-2 py-0.5 text-primary">
                        {template.badge.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-semibold">{template.name}</h3>

                  {/* Description */}
                  <div className="mb-4 font-mono text-xs">
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{template.description}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="mb-2 font-mono text-xs text-muted-foreground">[FEATURES]:</div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <span
                          key={feature}
                          className="border border-border px-2 py-0.5 font-mono text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-primary transition-colors group-hover:text-primary/80">
                      &gt; VIEW_TEMPLATE
                    </span>
                    <span className="font-mono text-xs text-muted-foreground group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Template Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2 rounded-none bg-destructive/50" />
              <div className="size-2 rounded-none bg-warning/50" />
              <div className="size-2 rounded-none bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">features.md</span>
          </div>
          <div className="p-6">
            <div className="mb-4 font-mono text-xs text-muted-foreground">[DASHBOARD_TEMPLATES]:</div>
            <div className="space-y-2 font-mono text-xs">
              <div><span className="text-success">&gt;</span> Analytics Dashboard with charts and metrics</div>
              <div><span className="text-success">&gt;</span> Team Dashboard for collaboration and task tracking</div>
              <div><span className="text-success">&gt;</span> Billing Dashboard for subscription management</div>
              <div><span className="text-success">&gt;</span> Real-time data visualization and reporting</div>
              <div><span className="text-success">&gt;</span> Responsive grid layouts with tabbed sections</div>
              <div><span className="text-success">&gt;</span> Activity feeds and user interaction tracking</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
