/**
 * Implementation Note Component - Features list
 */

import { StyledCardHeader } from "@/components/ui/card";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export function ImplementationNote() {
  return (
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="FEATURES" />
      <div className="p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
          [TEMPLATE_FEATURES]:
        </div>
        <div className={cn(mode.font, "space-y-1.5 text-xs")}>
          <div>
            <span className="text-success">&gt;</span> Security score dashboard with recommendations
          </div>
          <div>
            <span className="text-success">&gt;</span> Two-factor authentication setup (TOTP
            placeholder)
          </div>
          <div>
            <span className="text-success">&gt;</span> Active sessions viewer with device details
            and IP addresses
          </div>
          <div>
            <span className="text-success">&gt;</span> Session revocation and bulk sign-out
          </div>
          <div>
            <span className="text-success">&gt;</span> Privacy controls (profile, cookies, emails)
          </div>
          <div>
            <span className="text-success">&gt;</span> Security audit log with timestamps and status
            badges
          </div>
          <div>
            <span className="text-success">&gt;</span> GDPR compliance (data export, access request,
            policies)
          </div>
          <div>
            <span className="text-success">&gt;</span> Account deletion with confirmation modal
          </div>
          <div>
            <span className="text-success">&gt;</span> 4-tab navigation (Security, Privacy, Audit
            Log, Compliance)
          </div>
          <div>
            <span className="text-success">&gt;</span> Terminal console aesthetic
          </div>
        </div>
        <div className={cn(mode.font, "text-muted-foreground mt-4 text-xs")}>
          [NOTE]: Integrate with src/components/security/. Add API routes for session management and
          2FA.
        </div>
      </div>
    </div>
  );
}
