/**
 * FABRK COMPONENT
 * Features Card - List of template features
 */

import { StyledCard, StyledCardHeader } from "@/components/ui/card";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function FeaturesCard() {
  return (
    <StyledCard>
      <StyledCardHeader code="0x01" title="TEMPLATE_FEATURES" />
      <div className="p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
          [TEMPLATE_FEATURES]:
        </div>
        <div className={cn(mode.font, "space-y-1.5 text-xs")}>
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
        <div className={cn(mode.font, "text-muted-foreground mt-4 text-xs")}>
          [NOTE]: All patterns use Radix UI primitives for accessibility.
        </div>
      </div>
    </StyledCard>
  );
}
