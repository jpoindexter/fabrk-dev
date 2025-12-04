/**
 * FABRK COMPONENT
 * Features Card - Template documentation
 */

"use client";

import { StyledCard, StyledCardHeader } from "@/components/ui/card";

export function FeaturesCard() {
  return (
    <StyledCard>
      <StyledCardHeader code="0x00" title="TEMPLATE_FEATURES" />
      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
        <div className="space-y-1.5 font-mono text-xs">
          <div>
            <span className="text-success">&gt;</span> User info card with avatar
          </div>
          <div>
            <span className="text-success">&gt;</span> Stats display (projects, contributions,
            followers)
          </div>
          <div>
            <span className="text-success">&gt;</span> Achievement badges
          </div>
          <div>
            <span className="text-success">&gt;</span> Activity feed with timestamps
          </div>
          <div>
            <span className="text-success">&gt;</span> Projects tab with star counts
          </div>
          <div>
            <span className="text-success">&gt;</span> Edit profile and settings actions
          </div>
          <div>
            <span className="text-success">&gt;</span> Responsive layout
          </div>
        </div>
        <div className="text-muted-foreground mt-4 font-mono text-xs">
          [NOTE]: Connect to your user service to populate real data and upload avatars.
        </div>
      </div>
    </StyledCard>
  );
}
