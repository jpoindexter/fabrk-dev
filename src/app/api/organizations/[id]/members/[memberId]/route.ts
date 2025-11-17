/**
 * Organization Member Management API Route
 * PATCH - Update member role
 * DELETE - Remove member from organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withCsrfProtection } from "@/lib/security/csrf";
import {
  hasOrganizationRole,
  removeMember,
  updateMemberRole,
} from "@/lib/teams/organizations";
import { OrgRole } from "@prisma/client";
import { notifyRoleChanged, createOrgActivity } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";
import { triggerWebhook, WEBHOOK_EVENTS } from "@/lib/webhooks";

interface RouteContext {
  params: Promise<{ id: string; memberId: string }>;
}

export const PATCH = withCsrfProtection(async (
  req: NextRequest,
  context: RouteContext
) => {
  try {
    const { id, memberId } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify user has permission (must be OWNER or ADMIN)
    const canUpdate = await hasOrganizationRole(
      id,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canUpdate) {
      return NextResponse.json(
        { error: "You don't have permission to update member roles" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { role } = body;

    if (!role || !["OWNER", "ADMIN", "MEMBER", "GUEST"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    await updateMemberRole(
      id,
      memberId,
      role as OrgRole,
      session.user.id
    );

    // Get organization and member details for notifications
    try {
      const [org, member] = await Promise.all([
        prisma.organization.findUnique({
          where: { id },
          select: { name: true },
        }),
        prisma.organizationMember.findUnique({
          where: { id: memberId },
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        }),
      ]);

      if (org && member) {
        // Notify user about role change
        await notifyRoleChanged(
          member.userId,
          org.name,
          role,
          id
        );

        // Create activity event
        await createOrgActivity(id, {
          type: "role_changed",
          description: `role was changed to ${role}`,
          userId: member.userId,
          userName: member.user.name || member.user.email || "User",
        });

        // Trigger webhook
        await triggerWebhook(id, WEBHOOK_EVENTS.ORG_MEMBER_ROLE_CHANGED, {
          userId: member.userId,
          userEmail: member.user.email,
          userName: member.user.name,
          newRole: role,
          changedBy: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
          },
        });
      }
    } catch (notifyError: unknown) {
      console.error("Failed to send notifications:", notifyError);
    }

    return NextResponse.json({
      success: true,
      message: "Member role updated successfully",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update member role";
    console.error("Failed to update member role:", errorMessage);

    if (errorMessage.includes("permission")) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update member role" },
      { status: 500 }
    );
  }
});

export const DELETE = withCsrfProtection(async (
  req: NextRequest,
  context: RouteContext
) => {
  try {
    const { id, memberId } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify user has permission (must be OWNER or ADMIN)
    const canRemove = await hasOrganizationRole(
      id,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canRemove) {
      return NextResponse.json(
        { error: "You don't have permission to remove members" },
        { status: 403 }
      );
    }

    // Get member details before removing
    const member = await prisma.organizationMember.findUnique({
      where: { id: memberId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    await removeMember(id, memberId, session.user.id);

    // Create activity event for member removal
    if (member) {
      try {
        await createOrgActivity(id, {
          type: "member_removed",
          description: `was removed from the organization`,
          userId: member.userId,
          userName: member.user.name || member.user.email || "User",
        });

        // Trigger webhook
        await triggerWebhook(id, WEBHOOK_EVENTS.ORG_MEMBER_REMOVED, {
          userId: member.userId,
          userEmail: member.user.email,
          userName: member.user.name,
          removedBy: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
          },
        });
      } catch (activityError: unknown) {
        console.error("Failed to create activity:", activityError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to remove member";
    console.error("Failed to remove member:", errorMessage);

    if (errorMessage.includes("permission") || errorMessage.includes("owner")) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to remove member" },
      { status: 500 }
    );
  }
});
