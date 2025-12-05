/**
 * FABRK COMPONENT
 * Template Category Page - Standard wrapper for category listing pages
 * Provides consistent layout for template category grids
 */

"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
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
            <span className={cn("text-muted-foreground text-xs", mode.font)}>
              [CATEGORY]: {categoryCode}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {CategoryIcon && <CategoryIcon className="text-primary h-6 w-6" />}
            <h1 className={cn("text-3xl font-bold", mode.font)}>{title}</h1>
            <span className={cn("border-border border px-2 py-0.5 text-xs", mode.font)}>
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
                  <span className={cn("text-muted-foreground text-xs", mode.font)}>
                    [TEMPLATE]: {template.id.toUpperCase().replace(/-/g, "_")}
                  </span>
                  <template.icon className="text-muted-foreground size-4" />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Status & Badge */}
                  <div className={cn("mb-4 flex items-center justify-between text-xs", mode.font)}>
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
                  <h3 className={cn("mb-2 text-lg font-semibold", mode.font)}>{template.name}</h3>

                  {/* Description */}
                  <div className={cn("mb-4 text-xs", mode.font)}>
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{template.description}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className={cn("text-muted-foreground mb-2 text-xs", mode.font)}>
                      [FEATURES]:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <span
                          key={feature}
                          className={cn("border-border border px-2 py-0.5 text-xs", mode.font)}
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
                        "text-primary group-hover:text-primary/80 text-xs transition-colors",
                        mode.font
                      )}
                    >
                      &gt; VIEW_TEMPLATE
                    </span>
                    <span
                      className={cn(
                        "text-muted-foreground text-xs transition-transform group-hover:translate-x-1",
                        mode.font
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
        <div className="border-border bg-card border">
          <div className="border-border flex items-center gap-2 border-b px-4 py-2">
            <span className={cn("text-muted-foreground text-xs", mode.font)}>[ features.md ]</span>
          </div>
          <div className="p-6">
            <div className={cn("text-muted-foreground mb-4 text-xs", mode.font)}>
              {featureCardTitle}
            </div>
            <div className={cn("space-y-2 text-xs", mode.font)}>
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
