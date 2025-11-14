/**
 * Organization Members API Route
 * GET - List all members of an organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isOrganizationMember } from "@/lib/teams/organizations";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify user is a member of this organization
    const isMember = await isOrganizationMember(params.id, session.user.id);

    if (!isMember) {
      return NextResponse.json(
        { error: "You are not a member of this organization" },
        { status: 403 }
      );
    }

    // Fetch all members
    const members = await prisma.organizationMember.findMany({
      where: { organizationId: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: [
        { role: "asc" }, // OWNER first
        { joinedAt: "asc" },
      ],
    });

    return NextResponse.json({
      members: members.map((m) => ({
        id: m.id,
        userId: m.userId,
        role: m.role,
        joinedAt: m.joinedAt.toISOString(),
        user: m.user,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
