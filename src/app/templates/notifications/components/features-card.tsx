/**
 * FABRK COMPONENT
 * Template features card
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
            <span className="text-success">&gt;</span> All/Unread tab filtering
          </div>
          <div>
            <span className="text-success">&gt;</span> Mark as read (individual or all)
          </div>
          <div>
            <span className="text-success">&gt;</span> Delete notifications
          </div>
          <div>
            <span className="text-success">&gt;</span> 5 notification types (info, success, warning,
            error, message)
          </div>
          <div>
            <span className="text-success">&gt;</span> Unread badge counter
          </div>
          <div>
            <span className="text-success">&gt;</span> Action URLs for navigation
          </div>
          <div>
            <span className="text-success">&gt;</span> Empty state handling
          </div>
        </div>
        <div className={cn(mode.font, "text-muted-foreground mt-4 text-xs")}>
          [NOTE]: Connect to your notification service (WebSockets, SSE) for real-time updates.
        </div>
      </div>
    </StyledCard>
  );
}
