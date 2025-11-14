/**
 * Invite to Organization API Route
 * POST - Send invitation to join organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { inviteToOrganization, hasOrganizationRole, getOrganizationBySlug } from "@/lib/teams/organizations";
import { sendOrganizationInvite } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { OrgRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { organizationId, email, role } = body;

    if (!organizationId || !email) {
      return NextResponse.json(
        { error: "Organization ID and email are required" },
        { status: 400 }
      );
    }

    // Verify user has permission to invite (must be OWNER or ADMIN)
    const canInvite = await hasOrganizationRole(
      organizationId,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canInvite) {
      return NextResponse.json(
        { error: "You don't have permission to invite members" },
        { status: 403 }
      );
    }

    // Validate role
    const validRoles: OrgRole[] = ["OWNER", "ADMIN", "MEMBER", "GUEST"];
    const inviteRole = role && validRoles.includes(role) ? role : OrgRole.MEMBER;

    const invite = await inviteToOrganization({
      organizationId,
      email,
      role: inviteRole,
      invitedBy: session.user.id,
    });

    // Fetch organization name for email
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { name: true },
    });

    // Send invitation email
    try {
      await sendOrganizationInvite(email, {
        organizationName: organization?.name || "Organization",
        inviterName: session.user.name || session.user.email || "A team member",
        role: inviteRole,
        token: invite.token,
        expiresAt: invite.expiresAt,
      });
    } catch (emailError) {
      console.error("Failed to send invitation email:", emailError);
      // Don't fail the request if email fails - invitation is already created
    }

    return NextResponse.json({
      success: true,
      invite: {
        id: invite.id,
        email: invite.email,
        role: invite.role,
        expiresAt: invite.expiresAt,
      },
    });
  } catch (error: any) {
    console.error("Failed to send invitation:", error);

    // Handle duplicate invitations
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "An invitation to this email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send invitation" },
      { status: 500 }
    );
  }
}
