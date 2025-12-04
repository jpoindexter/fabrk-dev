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
import { TemplatePageHeader } from "@/components/ui/card";

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
