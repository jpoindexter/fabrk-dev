/**
 * Email preview component with iframe and template details
 */

import { TabsContent } from "@/components/ui/tabs";
import type { EmailTemplate } from "./email-template-data";

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
  return html.replace('</head>', `${scrollbarStyles}</head>`);
}

interface EmailPreviewProps {
  template: EmailTemplate;
  primaryColor: string;
}

export function EmailPreview({ template, primaryColor }: EmailPreviewProps) {
  return (
    <TabsContent value={template.id} className="mt-6">
      <div className="border border-border bg-card">
        {/* Tab Header */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-destructive/50" />
            <div className="size-2 rounded-full bg-warning/50" />
            <div className="size-2 rounded-full bg-success/50" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">{template.id}_email.html</span>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-mono text-lg font-bold">{template.name}</h2>
                <span className="border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {template.category}
                </span>
              </div>
              <p className="font-mono text-sm text-muted-foreground">{template.description}</p>
            </div>
          </div>

          {/* Email Preview */}
          <div className="border border-border bg-muted p-8 rounded-none mb-6">
            <iframe
              srcDoc={injectScrollbarStyles(template.preview, primaryColor)}
              title={template.name}
              className="min-h-[600px] w-full max-w-[600px] mx-auto block border border-border bg-white shadow-sm"
            />
          </div>

          {/* Template Details */}
          <div className="grid md:grid-cols-2 gap-6 border-t border-border pt-6 font-mono text-xs">
            <div>
              <div className="text-muted-foreground mb-2">[TRIGGER_EVENTS]:</div>
              <div className="flex flex-wrap gap-2">
                {template.triggers.map((trigger, idx) => (
                  <span key={idx} className="border border-border bg-muted/30 px-2 py-1">
                    &gt; {trigger}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-muted-foreground mb-2">[VARIABLES]:</div>
              <div className="flex flex-wrap gap-2">
                {template.variables.map((variable, idx) => (
                  <span key={idx} className="border border-primary/30 bg-primary/5 px-2 py-1 text-primary">
                    {`{${variable}}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
