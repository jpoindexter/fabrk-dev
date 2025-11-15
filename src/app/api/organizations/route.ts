/**
 * Organizations API Route
 * GET - Fetch user's organizations
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserOrganizations } from "@/lib/teams/organizations";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const organizations = await getUserOrganizations(session.user.id);

    return NextResponse.json({
      organizations: organizations.map((org) => ({
        id: org.id,
        name: org.name,
        slug: org.slug,
        logo: org.logo,
        role: org.role,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}
