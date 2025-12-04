/**
 * Email template features section
 */

import { StyledCardHeader } from "@/components/ui/card";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function EmailFeatures() {
  return (
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="FEATURES" />
      <div className="p-4">
        <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>
          [TEMPLATE_FEATURES]:
        </div>
        <div className={cn(mode.font, "space-y-1.5 text-xs")}>
          <div>
            <span className="text-success">&gt;</span> 5 email templates (Welcome, Verification,
            Password Reset, Purchase, Subscription)
          </div>
          <div>
            <span className="text-success">&gt;</span> Both HTML and plain text versions for all
            templates
          </div>
          <div>
            <span className="text-success">&gt;</span> Mobile-responsive table-based layouts (works
            in all email clients)
          </div>
          <div>
            <span className="text-success">&gt;</span> Consistent branding with Fabrk color scheme
          </div>
          <div>
            <span className="text-success">&gt;</span> Dynamic variables for personalization
          </div>
          <div>
            <span className="text-success">&gt;</span> CTA buttons with proper link tracking
          </div>
          <div>
            <span className="text-success">&gt;</span> Security notices and expiry warnings
          </div>
          <div>
            <span className="text-success">&gt;</span> Resend integration ready (src/lib/email.ts)
          </div>
          <div>
            <span className="text-success">&gt;</span> Terminal console aesthetic
          </div>
        </div>
        <div className={cn(mode.font, "text-muted-foreground mt-4 text-xs")}>
          [NOTE]: All templates in src/emails/. Add your Resend API key to start sending emails.
        </div>
      </div>
    </div>
  );
}
