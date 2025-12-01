/**
 * ✅ FABRK COMPONENT
 * Email Templates Showcase - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { emailTemplates } from "./components/email-template-data";
import { EmailStats } from "./components/email-stats";
import { EmailTabNavigation } from "./components/email-tab-navigation";
import { EmailPreview } from "./components/email-preview";
import { EmailFeatures } from "./components/email-features";

export default function EmailTemplatesShowcase() {
  const [activeTab, setActiveTab] = useState(emailTemplates[0].id);
  const [primaryColor, setPrimaryColor] = useState('271.5 81.3% 55.9%');

  useEffect(() => {
    const updatePrimaryColor = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim();
      if (color) setPrimaryColor(color);
    };

    updatePrimaryColor();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updatePrimaryColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: EMAIL_TEMPLATES</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Email Templates
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              5 production-ready transactional email templates with HTML and text versions
            </p>
          </div>
          <Button className="rounded-none font-mono text-xs">
            <Download className="mr-2 h-4 w-4" />
            &gt; DOWNLOAD_ALL
          </Button>
        </div>

        {/* Stats - Terminal Style */}
        <EmailStats />

        {/* Terminal Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <EmailTabNavigation templates={emailTemplates} />

          {/* Email Previews */}
          {emailTemplates.map((template) => (
            <EmailPreview
              key={template.id}
              template={template}
              primaryColor={primaryColor}
            />
          ))}
        </Tabs>

        {/* Implementation Note */}
        <EmailFeatures />
      </div>
    </div>
  );
}
