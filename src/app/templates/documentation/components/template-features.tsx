/**
 * ✅ FABRK COMPONENT
 * Template Features Display
 * Production-ready ✓
 */

import { TerminalCardHeader } from "@/components/ui/card";

export function TemplateFeatures() {
  const features = [
    "WCAG 2.1 AA compliant",
    "3-column layout (sidebar, content, TOC)",
    "Semantic HTML structure",
    "Keyboard navigation support",
    "Code blocks with copy functionality",
    "Focus indicators on all interactive elements",
    "Proper heading hierarchy (h1→h2)",
    "ARIA labels for screen readers",
  ];

  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <div className="border-border bg-card border">
        <TerminalCardHeader code="0x00" title="FEATURES" />
        <div className="p-4">
          <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
          <div className="space-y-1.5 font-mono text-xs">
            {features.map((feature, idx) => (
              <div key={idx}>
                <span className="text-success">&gt;</span> {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
