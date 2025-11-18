/**
 * Invite to Organization API Route
 * POST - Send invitation to join organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withCsrfProtection } from "@/lib/security/csrf";
import { inviteToOrganization, hasOrganizationRole, getOrganizationBySlug } from "@/lib/teams/organizations";
import { sendOrganizationInvite } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { OrgRole } from "@prisma/client";
import { createOrgActivity } from "@/lib/notifications";
import { triggerWebhook, WEBHOOK_EVENTS } from "@/lib/webhooks";
import { logger } from "@/lib/logger";
import { z } from "zod";

const inviteSchema = z.object({
  organizationId: z.string().min(1, "Organization ID is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["OWNER", "ADMIN", "MEMBER", "GUEST"]).optional(),
});

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = inviteSchema.parse(body);
    const { organizationId, email, role } = validatedData;

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
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      });
    } catch (emailError: unknown) {
      logger.error("Failed to send invitation email:", emailError);
      // Don't fail the request if email fails - invitation is already created
    }

    // Create real-time activity notification
    try {
      await createOrgActivity(organizationId, {
        type: "member_invited",
        description: `invited ${email} to join`,
        userId: session.user.id,
        userName: session.user.name || session.user.email || "User",
      });
    } catch (activityError: unknown) {
      logger.error("Failed to create activity:", activityError);
    }

    // Trigger webhook
    try {
      await triggerWebhook(organizationId, WEBHOOK_EVENTS.ORG_MEMBER_INVITED, {
        email,
        role: inviteRole,
        invitedBy: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        },
        inviteId: invite.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      });
    } catch (webhookError: unknown) {
      logger.error("Failed to trigger webhook:", webhookError);
    }

    return NextResponse.json({
      success: true,
      invite: {
        id: invite.id,
        email,
        role: inviteRole,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Failed to send invitation";
    logger.error("Failed to send invitation:", errorMessage);

    // Handle Prisma duplicate invitations
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
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
});
