/**
 * ✅ FABRK COMPONENT
 * Implementation Note - Template features documentation
 */

import { StyledCardHeader } from "@/components/ui/card";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function ImplementationNote() {
  return (
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="FEATURES" />
      <div className="p-6">
        <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
          [TEMPLATE_FEATURES]:
        </div>
        <div className={cn(mode.font, "space-y-2 text-xs")}>
          <div>
            <span className="text-success">&gt;</span> 4 stat cards (Organization, Team Size,
            Pending, Active)
          </div>
          <div>
            <span className="text-success">&gt;</span> Invite team member form with email and role
            selector
          </div>
          <div>
            <span className="text-success">&gt;</span> Team members table with avatars, roles, last
            active
          </div>
          <div>
            <span className="text-success">&gt;</span> Role badges with icons (Owner, Admin, Member,
            Guest)
          </div>
          <div>
            <span className="text-success">&gt;</span> Dropdown actions (change role, remove member)
          </div>
          <div>
            <span className="text-success">&gt;</span> Pending invitations list with revoke
            functionality
          </div>
          <div>
            <span className="text-success">&gt;</span> Activity feed with recent team changes
          </div>
          <div>
            <span className="text-success">&gt;</span> Role permissions reference card
          </div>
          <div>
            <span className="text-success">&gt;</span> RBAC system (Owner → Admin → Member → Guest)
          </div>
          <div>
            <span className="text-success">&gt;</span> Multi-tenancy organization structure
          </div>
        </div>
        <div className={cn(mode.font, "text-muted-foreground mt-4 text-xs")}>
          [NOTE]: Add API routes in src/app/api/teams/. Create Team and TeamMember Prisma models.
        </div>
      </div>
    </div>
  );
}
