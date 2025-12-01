/**
 * Members Page Header Component
 * Displays page title and invite button
 */

"use client";

import { Users } from "lucide-react";
import { InviteMemberDialog } from "./invite-member-dialog";

interface MembersPageHeaderProps {
  organizationId: string;
  organizationName: string;
  isOwnerOrAdmin: boolean;
}

export function MembersPageHeader({
  organizationId,
  organizationName,
  isOwnerOrAdmin,
}: MembersPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-md border border-border bg-primary p-2">
          <Users className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground">
            Manage members and roles for {organizationName}
          </p>
        </div>
      </div>

      {isOwnerOrAdmin && (
        <InviteMemberDialog
          organizationId={organizationId}
          organizationName={organizationName}
        />
      )}
    </div>
  );
}
