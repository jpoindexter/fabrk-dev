/**
 * Organization Member Management API Route
 * PATCH - Update member role
 * DELETE - Remove member from organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  hasOrganizationRole,
  removeMember,
  updateMemberRole,
} from "@/lib/teams/organizations";
import { OrgRole } from "@prisma/client";
import { notifyRoleChanged, createOrgActivity } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; memberId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify user has permission (must be OWNER or ADMIN)
    const canUpdate = await hasOrganizationRole(
      params.id,
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
      params.id,
      params.memberId,
      role as OrgRole,
      session.user.id
    );

    // Get organization and member details for notifications
    try {
      const [org, member] = await Promise.all([
        prisma.organization.findUnique({
          where: { id: params.id },
          select: { name: true },
        }),
        prisma.organizationMember.findUnique({
          where: { id: params.memberId },
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
          params.id
        );

        // Create activity event
        await createOrgActivity(params.id, {
          type: "role_changed",
          description: `role was changed to ${role}`,
          userId: member.userId,
          userName: member.user.name || member.user.email || "User",
        });
      }
    } catch (notifyError) {
      console.error("Failed to send notifications:", notifyError);
    }

    return NextResponse.json({
      success: true,
      message: "Member role updated successfully",
    });
  } catch (error: any) {
    console.error("Failed to update member role:", error);

    if (error.message?.includes("permission")) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update member role" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; memberId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify user has permission (must be OWNER or ADMIN)
    const canRemove = await hasOrganizationRole(
      params.id,
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
      where: { id: params.memberId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    await removeMember(params.id, params.memberId, session.user.id);

    // Create activity event for member removal
    if (member) {
      try {
        await createOrgActivity(params.id, {
          type: "member_removed",
          description: `was removed from the organization`,
          userId: member.userId,
          userName: member.user.name || member.user.email || "User",
        });
      } catch (activityError) {
        console.error("Failed to create activity:", activityError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error: any) {
    console.error("Failed to remove member:", error);

    if (error.message?.includes("permission") || error.message?.includes("owner")) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to remove member" },
      { status: 500 }
    );
  }
}
