/**
 * FABRK COMPONENT
 * Features Card - List of template features
 */

import { TerminalCard, TerminalCardHeader } from "@/components/ui/card";

export function FeaturesCard() {
  return (
    <TerminalCard>
      <TerminalCardHeader code="0x00" title="TEMPLATE_FEATURES" />
      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
        <div className="space-y-1.5 font-mono text-xs">
          <div>
            <span className="text-success">&gt;</span> Confirmation dialog for destructive actions
          </div>
          <div>
            <span className="text-success">&gt;</span> Form dialog with inputs and validation
          </div>
          <div>
            <span className="text-success">&gt;</span> Side sheet for settings/navigation
          </div>
          <div>
            <span className="text-success">&gt;</span> Popover for contextual content
          </div>
          <div>
            <span className="text-success">&gt;</span> Accessible with keyboard navigation
          </div>
          <div>
            <span className="text-success">&gt;</span> Terminal-styled headers and labels
          </div>
        </div>
        <div className="text-muted-foreground mt-4 font-mono text-xs">
          [NOTE]: All patterns use Radix UI primitives for accessibility.
        </div>
      </div>
    </TerminalCard>
  );
}
