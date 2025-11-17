/**
 * Switch Organization API Route
 * POST - Switch user's active organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withCsrfProtection } from "@/lib/security/csrf";
import { isOrganizationMember } from "@/lib/teams/organizations";
import { logger } from "@/lib/logger";

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
    const { organizationId } = body;

    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

    // Verify user is a member of this organization
    const isMember = await isOrganizationMember(organizationId, session.user.id);

    if (!isMember) {
      return NextResponse.json(
        { error: "You are not a member of this organization" },
        { status: 403 }
      );
    }

    // Session update with activeOrganizationId is handled client-side
    // The organization context is stored in localStorage and managed by the OrganizationProvider
    // To persist across sessions, add 'activeOrganizationId' field to User model and update here:
    // await prisma.user.update({
    //   where: { id: session.user.id },
    //   data: { activeOrganizationId: organizationId }
    // });

    return NextResponse.json({
      success: true,
      organizationId,
    });
  } catch (error: unknown) {
    logger.error("Failed to switch organization:", error);
    return NextResponse.json(
      { error: "Failed to switch organization" },
      { status: 500 }
    );
  }
});
