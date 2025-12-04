/**
 * FABRK COMPONENT
 * Features Card - Display template features
 */

import { StyledCard, StyledCardHeader } from "@/components/ui/card";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function FeaturesCard() {
  return (
    <StyledCard>
      <StyledCardHeader code="0x00" title="TEMPLATE_FEATURES" />
      <div className="p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
          [TEMPLATE_FEATURES]:
        </div>
        <div className={cn(mode.font, "space-y-1.5 text-xs")}>
          <div>
            <span className="text-success">&gt;</span> 5-step onboarding wizard
          </div>
          <div>
            <span className="text-success">&gt;</span> Progress bar with step indicators
          </div>
          <div>
            <span className="text-success">&gt;</span> Form state management
          </div>
          <div>
            <span className="text-success">&gt;</span> Multiple input types (text, select, checkbox)
          </div>
          <div>
            <span className="text-success">&gt;</span> Back/Next navigation
          </div>
          <div>
            <span className="text-success">&gt;</span> Completion summary
          </div>
          <div>
            <span className="text-success">&gt;</span> Terminal console aesthetic
          </div>
        </div>
        <div className={cn(mode.font, "text-muted-foreground mt-4 text-xs")}>
          [NOTE]: Connect to your API to persist onboarding data.
        </div>
      </div>
    </StyledCard>
  );
}
