/**
 * ✅ FABRK COMPONENT
 * Marketing Category - Terminal console style
 * Production-ready ✓
 */
"use client";

import Link from "next/link";
import { getCategoryInfo, getTemplatesByCategory } from "../template-data";

export default function MarketingPage() {
  const categoryTemplates = getTemplatesByCategory("marketing");
  const categoryInfo = getCategoryInfo("marketing");

  return (
    <div>
      <main className="container mx-auto max-w-7xl space-y-12 px-6 py-12">
        {/* Category Header */}
        <section className="space-y-4">
          <div className="border-border inline-block border px-4 py-1">
            <span className="text-muted-foreground font-mono text-xs">[CATEGORY]: MARKETING</span>
          </div>
          <div className="flex items-center gap-4">
            {categoryInfo && <categoryInfo.icon className="text-primary h-6 w-6" />}
            <h1 className="font-mono text-3xl font-bold">Marketing</h1>
            <span className="border-border border px-2 py-0.5 font-mono text-xs">
              COUNT: {categoryTemplates.length}
            </span>
          </div>
        </section>

        {/* Templates Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {categoryTemplates.map((template) => (
            <Link key={template.id} href={template.href}>
              <div className="group border-border bg-card hover:border-primary/50 border transition-colors">
                {/* Card Header */}
                <div className="border-border flex items-center justify-between border-b px-4 py-2">
                  <span className="text-muted-foreground font-mono text-xs">
                    [TEMPLATE]: {template.id.toUpperCase().replace(/-/g, "_")}
                  </span>
                  <template.icon className="text-muted-foreground size-4" />
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
                      <div className="border-primary/50 text-primary border px-2 py-0.5">
                        {template.badge.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-mono text-lg font-semibold">{template.name}</h3>

                  {/* Description */}
                  <div className="mb-4 font-mono text-xs">
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{template.description}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-muted-foreground mb-2 font-mono text-xs">[FEATURES]:</div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <span
                          key={feature}
                          className="border-border border px-2 py-0.5 font-mono text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-primary group-hover:text-primary/80 font-mono text-xs transition-colors">
                      &gt; VIEW_TEMPLATE
                    </span>
                    <span className="text-muted-foreground font-mono text-xs transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Template Features Card */}
        <div className="border-border bg-card border">
          <div className="border-border border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs">
              [ [0x00] MARKETING_TEMPLATES ]
            </span>
          </div>
          <div className="p-6">
            <div className="text-muted-foreground mb-4 font-mono text-xs">
              [MARKETING_TEMPLATES]:
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> Landing pages with hero sections
              </div>
              <div>
                <span className="text-success">&gt;</span> Feature showcase sections with icons
              </div>
              <div>
                <span className="text-success">&gt;</span> Testimonials and social proof
              </div>
              <div>
                <span className="text-success">&gt;</span> Pricing tables with plan comparison
              </div>
              <div>
                <span className="text-success">&gt;</span> Call-to-action sections and buttons
              </div>
              <div>
                <span className="text-success">&gt;</span> Newsletter signup forms
              </div>
              <div>
                <span className="text-success">&gt;</span> Footer with site navigation and links
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
