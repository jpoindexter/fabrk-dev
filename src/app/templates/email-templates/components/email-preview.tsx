/**
 * Email preview component with iframe and template details
 */

import { TabsContent } from "@/components/ui/tabs";
import type { EmailTemplate } from "./email-template-data";
import { TerminalCardHeader } from "@/components/ui/card";

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

interface EmailPreviewProps {
  template: EmailTemplate;
  primaryColor: string;
}

export function EmailPreview({ template, primaryColor }: EmailPreviewProps) {
  return (
    <TabsContent value={template.id} className="mt-0">
      <div className="border-border bg-card border border-t-0">
        {/* Tab Header */}
        <TerminalCardHeader code="0x00" title="EMAIL_PREVIEW" />

        {/* Content Area */}
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h2 className="font-mono text-lg font-bold">{template.name}</h2>
                <span className="border-border text-muted-foreground border px-2 py-0.5 font-mono text-xs">
                  {template.category}
                </span>
              </div>
              <p className="text-muted-foreground font-mono text-sm">{template.description}</p>
            </div>
          </div>

          {/* Email Preview */}
          <div className="border-border bg-muted mb-6 rounded-none border p-8">
            <iframe
              srcDoc={injectScrollbarStyles(template.preview, primaryColor)}
              title={template.name}
              className="border-border bg-background mx-auto block min-h-[600px] w-full max-w-[600px] border"
            />
          </div>

          {/* Template Details */}
          <div className="border-border grid gap-6 border-t pt-6 font-mono text-xs md:grid-cols-2">
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
        </div>
      </div>
    </TabsContent>
  );
}
