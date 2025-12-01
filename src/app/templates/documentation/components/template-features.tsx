/**
 * ✅ FABRK COMPONENT
 * Template Features Display
 * Production-ready ✓
 */

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
      <div className="border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-destructive/50" />
            <div className="size-2 rounded-full bg-warning/50" />
            <div className="size-2 rounded-full bg-success/50" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">features.md</span>
        </div>
        <div className="p-4">
          <div className="mb-3 font-mono text-xs text-muted-foreground">
            [TEMPLATE_FEATURES]:
          </div>
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
