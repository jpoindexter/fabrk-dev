import { NextRequest, NextResponse } from "next/server";
import { requirePermission, type RouteContext } from "@/middleware/api-auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/v1/organizations/[id]
 * Get organization details
 * Requires API key with 'read' permission
 */
export const GET = requirePermission("read", async (req: NextRequest, apiKey, context?: RouteContext) => {
  try {
    if (!context) {
      return NextResponse.json(
        { error: "Missing route context" },
        { status: 500 }
      );
    }
    const params = await context.params;
    const id = typeof params.id === 'string' ? params.id : params.id[0];

    // Verify API key belongs to this organization
    if (apiKey.organizationId !== id) {
      return NextResponse.json(
        { error: "Forbidden. API key does not belong to this organization." },
        { status: 403 }
      );
    }

    // Fetch organization details (public info only)
    const organization = await prisma.organization.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        logo: true,
        plan: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(organization);
  } catch (error: unknown) {
    console.error("Error fetching organization:", error);
    return NextResponse.json(
      { error: "Failed to fetch organization" },
      { status: 500 }
    );
  }
});
