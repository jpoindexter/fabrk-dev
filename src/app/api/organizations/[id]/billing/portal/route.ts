/**
 * Organization Billing Portal API Route
 * POST - Create Stripe billing portal session for organization
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withCsrfProtection } from "@/lib/security/csrf";
import { hasOrganizationRole } from "@/lib/teams/organizations";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { OrgRole } from "@prisma/client";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const POST = withCsrfProtection(async (
  req: NextRequest,
  context: RouteContext
) => {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify user has permission (OWNER or ADMIN)
    const canManageBilling = await hasOrganizationRole(
      id,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canManageBilling) {
      return NextResponse.json(
        { error: "You don't have permission to manage billing" },
        { status: 403 }
      );
    }

    // Fetch organization
    const organization = await prisma.organization.findUnique({
      where: { id },
      select: { customerId: true, slug: true },
    });

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    if (!organization.customerId) {
      return NextResponse.json(
        { error: "No customer ID found for this organization" },
        { status: 400 }
      );
    }

    // Create Stripe billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: organization.customerId,
      return_url: `${process.env.NEXTAUTH_URL}/organizations/${organization.slug}/billing`,
    });

    return NextResponse.json({
      url: portalSession.url,
    });
  } catch (error: unknown) {
    console.error("Failed to create portal session:", error);
    return NextResponse.json(
      { error: "Failed to create billing portal session" },
      { status: 500 }
    );
  }
});
