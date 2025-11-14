import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/middleware/api-auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/v1/members
 * List organization members
 * Requires API key with 'read' permission
 */
export const GET = requirePermission("read", async (req: NextRequest, apiKey) => {
  try {
    // Fetch members for the API key's organization
    const members = await prisma.organizationMember.findMany({
      where: {
        organizationId: apiKey.organizationId,
      },
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
      orderBy: { joinedAt: "asc" },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
});
