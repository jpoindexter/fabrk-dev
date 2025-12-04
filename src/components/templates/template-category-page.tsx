/**
 * FABRK COMPONENT
 * Template Category Page - Standard wrapper for category listing pages
 * Provides consistent layout for template category grids
 */

"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  href: string;
  features: string[];
}

interface TemplateCategoryPageProps {
  /** Category code for display (e.g., "DASHBOARDS", "AUTHENTICATION") */
  categoryCode: string;
  /** Display title of the category */
  title: string;
  /** Category icon component */
  icon?: LucideIcon;
  /** List of templates in this category */
  templates: Template[];
  /** Features to display in the bottom card */
  features: string[];
  /** Feature card title (e.g., "[DASHBOARD_TEMPLATES]:") */
  featureCardTitle: string;
}

export function TemplateCategoryPage({
  categoryCode,
  title,
  icon: CategoryIcon,
  templates,
  features,
  featureCardTitle,
}: TemplateCategoryPageProps) {
  return (
    <div>
      <main className="container mx-auto max-w-7xl space-y-12 px-6 py-12">
        {/* Category Header */}
        <section className="space-y-4">
          <div className="border-border inline-block border px-4 py-1">
            <span className="text-muted-foreground font-mono text-xs">
              [CATEGORY]: {categoryCode}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {CategoryIcon && <CategoryIcon className="text-primary h-6 w-6" />}
            <h1 className="font-mono text-3xl font-bold">{title}</h1>
            <span className="border-border border px-2 py-0.5 font-mono text-xs">
              COUNT: {templates.length}
            </span>
          </div>
        </section>

        {/* Templates Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <Link key={template.id} href={template.href}>
              <div className="border-border bg-card hover:border-primary/50 group border transition-colors">
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
          <div className="border-border flex items-center gap-2 border-b px-4 py-2">
            <span className="text-muted-foreground font-mono text-xs">[ features.md ]</span>
          </div>
          <div className="p-6">
            <div className="text-muted-foreground mb-4 font-mono text-xs">{featureCardTitle}</div>
            <div className="space-y-2 font-mono text-xs">
              {features.map((feature, index) => (
                <div key={index}>
                  <span className="text-success">&gt;</span> {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
