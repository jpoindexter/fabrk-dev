/**
 * Organization Subscription API Route
 * GET - Fetch organization's Stripe subscription details
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isOrganizationMember } from "@/lib/teams/organizations";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

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

    // Verify user is a member
    const isMember = await isOrganizationMember(params.id, session.user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: "You are not a member of this organization" },
        { status: 403 }
      );
    }

    // Fetch organization
    const organization = await prisma.organization.findUnique({
      where: { id: params.id },
      select: { subscriptionId: true },
    });

    if (!organization?.subscriptionId) {
      return NextResponse.json(
        { subscription: null },
        { status: 200 }
      );
    }

    // Fetch subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(organization.subscriptionId);
    const price = subscription.items.data[0]?.price;

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        plan: {
          name: price?.nickname || "Unknown Plan",
          amount: price?.unit_amount || 0,
          interval: price?.recurring?.interval || "month",
        },
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } catch (error) {
    console.error("Failed to fetch subscription:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
