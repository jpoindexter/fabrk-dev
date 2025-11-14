/**
 * Create Organization API Route
 * POST - Create a new organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createOrganization } from "@/lib/teams/organizations";
import { trackOrgCreated } from "@/lib/analytics/events";
import { logOrgCreated } from "@/lib/audit/logger";

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
    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug can only contain lowercase letters, numbers, and hyphens" },
        { status: 400 }
      );
    }

    const organization = await createOrganization({
      name,
      slug,
      description,
      ownerId: session.user.id,
    });

    // Track in analytics
    await trackOrgCreated(session.user.id, organization.id, organization.name, {
      slug: organization.slug,
    });

    // Log in audit trail
    await logOrgCreated(session.user.id, organization.id, organization.name);

    return NextResponse.json({
      success: true,
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        description: organization.description,
      },
    });
  } catch (error: any) {
    console.error("Failed to create organization:", error);

    // Handle unique constraint violations
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "An organization with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create organization" },
      { status: 500 }
    );
  }
}
