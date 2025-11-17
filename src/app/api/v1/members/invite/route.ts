import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/middleware/api-auth";
import { prisma } from "@/lib/prisma";
import { sendOrganizationInvite } from "@/lib/email";
import crypto from "crypto";
import { logger } from "@/lib/logger";

/**
 * POST /api/v1/members/invite
 * Invite a new member to the organization
 * Requires API key with 'write' permission
 */
export const POST = requirePermission("write", async (req: NextRequest, apiKey) => {
  try {
    const body = await req.json();
    const { email, role = "MEMBER" } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ["OWNER", "ADMIN", "MEMBER", "GUEST"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be one of: OWNER, ADMIN, MEMBER, GUEST" },
        { status: 400 }
      );
    }

    // Check if user is already a member
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        organizations: {
          where: { organizationId: apiKey.organizationId },
        },
      },
    });

    if (existingUser?.organizations.length) {
      return NextResponse.json(
        { error: "User is already a member of this organization" },
        { status: 400 }
      );
    }

    // Check if there's already a pending invite
    const existingInvite = await prisma.organizationInvite.findFirst({
      where: {
        email,
        organizationId: apiKey.organizationId,
        acceptedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (existingInvite) {
      return NextResponse.json(
        { error: "User already has a pending invite" },
        { status: 400 }
      );
    }

    // Generate invite token
    const token = crypto.randomBytes(32).toString("hex");

    // Create invite (expires in 7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invite = await prisma.organizationInvite.create({
      data: {
        organizationId: apiKey.organizationId,
        email,
        role,
        invitedBy: apiKey.userId,
        token,
        expiresAt,
      },
      include: {
        organization: {
          select: {
            name: true,
            slug: true,
          },
        },
        inviter: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Send invite email
    await sendOrganizationInvite(email, {
      organizationName: invite.organization.name,
      inviterName: invite.inviter.name || invite.inviter.email || "A team member",
      role: invite.role,
      token,
      expiresAt: invite.expiresAt,
    });

    return NextResponse.json({
      id: invite.id,
      email: invite.email,
      role: invite.role,
      expiresAt: invite.expiresAt,
      inviteUrl: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`,
    });
  } catch (error: unknown) {
    logger.error("Error creating invite:", error);
    return NextResponse.json(
      { error: "Failed to create invite" },
      { status: 500 }
    );
  }
});
