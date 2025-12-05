/**
 * ✅ FABRK COMPONENT
 * Account Pages Category - Terminal console style
 * Production-ready ✓
 */
"use client";

import Link from "next/link";
import { StyledCard, StyledCardHeader } from "@/components/ui/card";
import { getCategoryInfo, getTemplatesByCategory } from "../template-data";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export default function AccountPagesPage() {
  const categoryTemplates = getTemplatesByCategory("account");
  const categoryInfo = getCategoryInfo("account");

  return (
    <div>
      <main className="container mx-auto max-w-7xl space-y-12 px-6 py-12">
        {/* Category Header */}
        <section className="space-y-4">
          <div className="border-border inline-block border px-4 py-1">
            <span className={cn(mode.font, "text-muted-foreground text-xs")}>
              [CATEGORY]: ACCOUNT_PAGES
            </span>
          </div>
          <div className="flex items-center gap-4">
            {categoryInfo && <categoryInfo.icon className="text-primary h-6 w-6" />}
            <h1 className={cn(mode.font, "text-4xl font-semibold")}>Account Pages</h1>
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
          <StyledCardHeader code="0x00" title="ACCOUNT_PAGE_FEATURES" />
          <div className="p-6">
            <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
              [ACCOUNT_PAGE_TEMPLATES]:
            </div>
            <div className={cn(mode.font, "space-y-2 text-xs")}>
              <div>
                <span className="text-success">&gt;</span> Settings page with 4-tab navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Appearance settings (theme, font size,
                layout)
              </div>
              <div>
                <span className="text-success">&gt;</span> Notification preferences (email, push,
                in-app)
              </div>
              <div>
                <span className="text-success">&gt;</span> Privacy controls (data sharing, cookies,
                analytics)
              </div>
              <div>
                <span className="text-success">&gt;</span> Language & region settings
              </div>
              <div>
                <span className="text-success">&gt;</span> Account security (password, 2FA,
                sessions)
              </div>
              <div>
                <span className="text-success">&gt;</span> Subscription and billing management
              </div>
            </div>
          </div>
        </StyledCard>
      </main>
    </div>
  );
}
