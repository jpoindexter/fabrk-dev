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

    await removeMember(params.id, params.memberId, session.user.id);

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
