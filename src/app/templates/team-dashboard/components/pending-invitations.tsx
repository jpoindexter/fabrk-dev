/**
 * ✅ FABRK COMPONENT
 * Pending Invitations - List of pending team invitations
 */

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StyledCardHeader } from "@/components/ui/card";

interface Invitation {
  id: string;
  email: string;
  role: string;
  sentBy: string;
  sentAt: string;
  expiresAt: string;
}

interface PendingInvitationsProps {
  invitations: Invitation[];
}

export function PendingInvitations({ invitations }: PendingInvitationsProps) {
  const handleRevokeInvitation = (_invitationId: string) => {
    toast.success(`Invitation revoked successfully`);
  };

  return (
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="PENDING_INVITES" />
      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">
          [PENDING_INVITATIONS]: COUNT={invitations.length}
        </div>
        <div className="space-y-2">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="border-border bg-muted/30 flex items-center justify-between border px-4 py-4"
            >
              <div className="font-mono text-xs">
                <span className="text-muted-foreground">EMAIL: </span>
                <span className="font-semibold">{invitation.email}</span>
                <span className="text-muted-foreground ml-4">SENT_BY: </span>
                <span>{invitation.sentBy}</span>
                <span className="text-muted-foreground ml-4">DATE: </span>
                <span>{new Date(invitation.sentAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="border-border border px-2 py-0.5 font-mono text-xs">
                  ROLE: {invitation.role.toUpperCase()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRevokeInvitation(invitation.id)}
                  className="rounded-none font-mono text-xs"
                >
                  &gt; REVOKE
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
