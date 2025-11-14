/**
 * Switch Organization API Route
 * POST - Switch user's active organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isOrganizationMember } from "@/lib/teams/organizations";

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

    // In a production app, you'd update the user's activeOrganizationId in the session
    // For now, we'll return success and let the client handle the context
    // TODO: Implement session update with activeOrganizationId

    return NextResponse.json({
      success: true,
      organizationId,
    });
  } catch (error) {
    console.error("Failed to switch organization:", error);
    return NextResponse.json(
      { error: "Failed to switch organization" },
      { status: 500 }
    );
  }
}
