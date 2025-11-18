/**
 * Create Organization API Route
 * POST - Create a new organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withCsrfProtection } from "@/lib/security/csrf";
import { createOrganization } from "@/lib/teams/organizations";
import { trackOrgCreated } from "@/lib/analytics/events";
import { logOrgCreated } from "@/lib/audit/logger";
import { logger } from "@/lib/logger";
import { z } from "zod";

const createOrgSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  slug: z.string()
    .min(1, "Slug is required")
    .max(50, "Slug must be less than 50 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
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
    const validatedData = createOrgSchema.parse(body);
    const { name, slug, description } = validatedData;

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
      },
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Failed to create organization";
    logger.error("Failed to create organization:", errorMessage);

    // Handle Prisma unique constraint violations
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
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
});
