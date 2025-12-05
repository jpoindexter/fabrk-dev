/**
 * ✅ FABRK COMPONENT
 * Marketing Category - Terminal console style
 * Production-ready ✓
 */
"use client";

import Link from "next/link";
import { StyledCard, StyledCardHeader } from "@/components/ui/card";
import { getCategoryInfo, getTemplatesByCategory } from "../template-data";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function MarketingPage() {
  const categoryTemplates = getTemplatesByCategory("marketing");
  const categoryInfo = getCategoryInfo("marketing");

  return (
    <div>
      <main className="container mx-auto max-w-7xl space-y-12 px-6 py-12">
        {/* Category Header */}
        <section className="space-y-4">
          <div className="border-border inline-block border px-4 py-1">
            <span className={cn(mode.font, "text-muted-foreground text-xs")}>
              [CATEGORY]: MARKETING
            </span>
          </div>
          <div className="flex items-center gap-4">
            {categoryInfo && <categoryInfo.icon className="text-primary h-6 w-6" />}
            <h1 className={cn(mode.font, "text-3xl font-bold")}>Marketing</h1>
            <span className={cn(mode.font, "border-border border px-2 py-0.5 text-xs")}>
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
                  <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                    [TEMPLATE]: {template.id.toUpperCase().replace(/-/g, "_")}
                  </span>
                  <template.icon className="text-muted-foreground size-4" />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Status & Badge */}
                  <div className={cn(mode.font, "mb-4 flex items-center justify-between text-xs")}>
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
                  <h3 className={cn(mode.font, "mb-2 text-lg font-semibold")}>{template.name}</h3>

                  {/* Description */}
                  <div className={cn(mode.font, "mb-4 text-xs")}>
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{template.description}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className={cn(mode.font, "text-muted-foreground mb-2 text-xs")}>
                      [FEATURES]:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <span
                          key={feature}
                          className={cn(mode.font, "border-border border px-2 py-0.5 text-xs")}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        mode.font,
                        "text-primary group-hover:text-primary/80 text-xs transition-colors"
                      )}
                    >
                      &gt; VIEW_TEMPLATE
                    </span>
                    <span
                      className={cn(
                        mode.font,
                        "text-muted-foreground text-xs transition-transform group-hover:translate-x-1"
                      )}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Template Features Card */}
        <StyledCard>
          <StyledCardHeader code="0x00" title="MARKETING_FEATURES" />
          <div className="p-6">
            <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
              [MARKETING_TEMPLATES]:
            </div>
            <div className={cn(mode.font, "space-y-2 text-xs")}>
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
        </StyledCard>
      </main>
    </div>
  );
}
