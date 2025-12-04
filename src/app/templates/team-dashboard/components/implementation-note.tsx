/**
 * ✅ FABRK COMPONENT
 * Implementation Note - Template features documentation
 */

import { TerminalCardHeader } from "@/components/ui/card";

export function ImplementationNote() {
  return (
    <div className="border-border bg-card border">
      <TerminalCardHeader code="0x00" title="FEATURES" />
      <div className="p-6">
        <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
        <div className="space-y-2 font-mono text-xs">
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
        <div className="text-muted-foreground mt-4 font-mono text-xs">
          [NOTE]: Add API routes in src/app/api/teams/. Create Team and TeamMember Prisma models.
        </div>
      </div>
    </div>
  );
}
