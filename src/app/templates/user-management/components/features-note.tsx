/**
 * Implementation note card showing template features
 */

import { StyledCard, StyledCardHeader } from "@/components/ui/card";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function FeaturesNote() {
  return (
    <StyledCard>
      <StyledCardHeader code="0x01" title="TEMPLATE_FEATURES" />
      <div className="p-4">
        <div className={cn(mode.font, "space-y-1.5 text-xs")}>
          <div>
            <span className="text-success">&gt;</span> TanStack Table v8 with sorting, filtering,
            pagination
          </div>
          <div>
            <span className="text-success">&gt;</span> Bulk actions (select multiple users)
          </div>
          <div>
            <span className="text-success">&gt;</span> Column visibility toggle
          </div>
          <div>
            <span className="text-success">&gt;</span> Search by name/email
          </div>
          <div>
            <span className="text-success">&gt;</span> Export to CSV functionality
          </div>
          <div>
            <span className="text-success">&gt;</span> Role badges (Admin, User, Guest)
          </div>
          <div>
            <span className="text-success">&gt;</span> Status indicators (Active, Inactive,
            Suspended)
          </div>
          <div>
            <span className="text-success">&gt;</span> Row actions menu (Edit, Suspend, Delete)
          </div>
          <div>
            <span className="text-success">&gt;</span> Stats cards (Total, Active, Admins,
            Enterprise)
          </div>
          <div>
            <span className="text-success">&gt;</span> Terminal console aesthetic
          </div>
        </div>
        <div className={cn(mode.font, "text-muted-foreground mt-4 text-xs")}>
          [NOTE]: Replace mockUsers with your API data. Add API routes for edit/delete/suspend
          actions.
        </div>
      </div>
    </StyledCard>
  );
}
