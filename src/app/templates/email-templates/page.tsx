/**
 * ✅ FABRK COMPONENT
 * Email Templates Showcase - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { emailTemplates } from "./components/email-template-data";
import { EmailStats } from "./components/email-stats";
import { EmailTabNavigation } from "./components/email-tab-navigation";
import { EmailPreview } from "./components/email-preview";
import { EmailFeatures } from "./components/email-features";

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
        <div className="space-y-2">
          <div className="border-border inline-block border px-4 py-1">
            <span className="text-muted-foreground font-mono text-xs">
              [TEMPLATE]: EMAIL_TEMPLATES
            </span>
          </div>
          <h1 className="font-mono text-4xl font-semibold tracking-tight">Email Templates</h1>
          <p className="text-muted-foreground font-mono text-sm">
            5 production-ready transactional email templates with HTML and text versions
          </p>
        </div>

        {/* Stats - Terminal Style */}
        <EmailStats />

        {/* Terminal Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <EmailTabNavigation templates={emailTemplates} />

          {/* Email Previews */}
          {emailTemplates.map((template) => (
            <EmailPreview key={template.id} template={template} primaryColor={primaryColor} />
          ))}
        </Tabs>

        {/* Implementation Note */}
        <EmailFeatures />
      </div>
    </div>
  );
}
