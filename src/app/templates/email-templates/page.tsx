/**
 * ✅ FABRK COMPONENT
 * Email Templates Showcase - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState, useEffect } from "react";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
import { emailTemplates } from "./components/email-template-data";
import { EmailStats } from "./components/email-stats";
import { EmailFeatures } from "./components/email-features";
import { TemplatePageHeader, TerminalCard, TerminalCardContent } from "@/components/ui/card";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

// Inject custom scrollbar styling into email HTML
function injectScrollbarStyles(html: string, primaryColor: string): string {
  const scrollbarStyles = `
    <style>
      /* Custom scrollbar styling - matches main site */
      * {
        scrollbar-width: thin;
        scrollbar-color: hsl(var(--border, 0 0% 90%)) transparent;
      }
      *:hover {
        scrollbar-color: hsl(${primaryColor} / 0.5) transparent;
      }
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: hsl(var(--border, 0 0% 90%));
        border-radius: 4px;
        transition: background 0.2s;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: hsl(${primaryColor} / 0.5);
      }
    </style>
  `;
  return html.replace("</head>", `${scrollbarStyles}</head>`);
}

const tabs = emailTemplates.map((template) => ({
  id: template.id,
  label: template.name.toUpperCase().replace(/ /g, "_"),
  icon: template.icon,
}));

export default function EmailTemplatesShowcase() {
  const [activeTab, setActiveTab] = useState(emailTemplates[0].id);
  const [primaryColor, setPrimaryColor] = useState("271.5 81.3% 55.9%");

  useEffect(() => {
    const updatePrimaryColor = () => {
      const color = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
      if (color) setPrimaryColor(color);
    };

    updatePrimaryColor();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          updatePrimaryColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="EMAIL_TEMPLATES"
          title="Email Templates"
          description="5 production-ready transactional email templates with HTML and text versions"
        />

        {/* Stats - Terminal Style */}
        <EmailStats />

        {/* Terminal Tab Navigation */}
        <StyledTabs
          code="0x00"
          title="EMAIL_TABS"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {/* Email Previews */}
          {emailTemplates.map((template) => (
            <StyledTabsContent key={template.id} value={template.id}>
              <TerminalCard>
                {/* Content Area */}
                <TerminalCardContent padding="lg">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <h2 className={cn(mode.font, "text-lg font-semibold")}>{template.name}</h2>
                        <span
                          className={cn(
                            mode.font,
                            "border-border text-muted-foreground border px-2 py-0.5 text-xs"
                          )}
                        >
                          {template.category}
                        </span>
                      </div>
                      <p className={cn(mode.font, "text-muted-foreground text-sm")}>
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Email Preview */}
                  <div className={cn(mode.radius, "border-border bg-muted mb-6 border p-8")}>
                    <iframe
                      srcDoc={injectScrollbarStyles(template.preview, primaryColor)}
                      title={template.name}
                      className="border-border bg-background mx-auto block min-h-[600px] w-full max-w-[600px] border"
                    />
                  </div>

                  {/* Template Details */}
                  <div
                    className={cn(
                      mode.font,
                      "border-border grid gap-6 border-t pt-6 text-xs md:grid-cols-2"
                    )}
                  >
                    <div>
                      <div className="text-muted-foreground mb-2">[TRIGGER_EVENTS]:</div>
                      <div className="flex flex-wrap gap-2">
                        {template.triggers.map((trigger, idx) => (
                          <span key={idx} className="border-border bg-muted/30 border px-2 py-1">
                            &gt; {trigger}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted-foreground mb-2">[VARIABLES]:</div>
                      <div className="flex flex-wrap gap-2">
                        {template.variables.map((variable, idx) => (
                          <span
                            key={idx}
                            className="border-primary/30 bg-primary/5 text-primary border px-2 py-1"
                          >
                            {`{${variable}}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TerminalCardContent>
              </TerminalCard>
            </StyledTabsContent>
          ))}
        </StyledTabs>

        {/* Implementation Note */}
        <EmailFeatures />
      </div>
    </div>
  );
}
