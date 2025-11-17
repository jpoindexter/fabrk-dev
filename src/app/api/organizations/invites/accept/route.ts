/**
 * Accept Invite API Route
 * POST - Accept an organization invitation
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { acceptInvite } from "@/lib/teams/organizations";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to accept invitations" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Invitation token is required" },
        { status: 400 }
      );
    }

    // Verify token and get invite
    const invite = await prisma.organizationInvite.findUnique({
      where: { token },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!invite) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      );
    }

    // Verify email matches
    if (invite.email !== session.user.email) {
      return NextResponse.json(
        { error: "This invitation was sent to a different email address" },
        { status: 403 }
      );
    }

    // Accept the invite
    const membership = await acceptInvite(token, session.user.id);

    return NextResponse.json({
      success: true,
      message: "Successfully joined organization",
      organization: invite.organization,
      membership: {
        organizationId: membership.organizationId,
        role: membership.role,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to accept invitation";
    console.error("Failed to accept invitation:", errorMessage);

    // Handle specific error cases
    if (errorMessage.includes("expired")) {
      return NextResponse.json(
        { error: "This invitation has expired" },
        { status: 410 }
      );
    }

    if (errorMessage.includes("already accepted")) {
      return NextResponse.json(
        { error: "This invitation has already been accepted" },
        { status: 410 }
      );
    }

    if (errorMessage.includes("already a member")) {
      return NextResponse.json(
        { error: "You are already a member of this organization" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to accept invitation" },
      { status: 500 }
    );
  }
}
