/**
 * Organization by Slug API Route
 * GET - Fetch organization by slug
 * PATCH - Update organization (requires OWNER or ADMIN)
 * DELETE - Delete organization (requires OWNER)
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getOrganizationBySlug,
  hasOrganizationRole,
  deleteOrganization,
  getUserOrganizations,
} from "@/lib/teams/organizations";
import { prisma } from "@/lib/prisma";
import { OrgRole } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const organization = await getOrganizationBySlug(params.slug);

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    // Get user's role in this organization
    const userOrgs = await getUserOrganizations(session.user.id);
    const userMembership = userOrgs.find(
      (uo) => uo.organization.id === organization.id
    );

    if (!userMembership) {
      return NextResponse.json(
        { error: "You are not a member of this organization" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        description: organization.description,
        logo: organization.logo,
        plan: organization.plan,
        role: userMembership.role,
      },
    });
  } catch (error) {
    console.error("Failed to fetch organization:", error);
    return NextResponse.json(
      { error: "Failed to fetch organization" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const organization = await getOrganizationBySlug(params.slug);

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    // Verify user has permission (must be OWNER or ADMIN)
    const canUpdate = await hasOrganizationRole(
      organization.id,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canUpdate) {
      return NextResponse.json(
        { error: "You don't have permission to update this organization" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, description, slug, logo } = body;

    // Validate slug if provided
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug can only contain lowercase letters, numbers, and hyphens" },
        { status: 400 }
      );
    }

    const updated = await prisma.organization.update({
      where: { id: organization.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(slug && { slug }),
        ...(logo !== undefined && { logo: logo || null }),
      },
    });

    return NextResponse.json({
      success: true,
      organization: {
        id: updated.id,
        name: updated.name,
        slug: updated.slug,
        description: updated.description,
        logo: updated.logo,
      },
    });
  } catch (error: any) {
    console.error("Failed to update organization:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "An organization with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update organization" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const organization = await getOrganizationBySlug(params.slug);

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    // Only OWNER can delete
    const isOwner = await hasOrganizationRole(
      organization.id,
      session.user.id,
      OrgRole.OWNER
    );

    if (!isOwner) {
      return NextResponse.json(
        { error: "Only the organization owner can delete it" },
        { status: 403 }
      );
    }

    await deleteOrganization(organization.id, session.user.id);

    return NextResponse.json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete organization:", error);
    return NextResponse.json(
      { error: "Failed to delete organization" },
      { status: 500 }
    );
  }
}
