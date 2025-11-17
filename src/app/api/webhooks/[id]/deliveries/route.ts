/**
 * Webhook Deliveries API Route
 * GET - List webhook deliveries
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasOrganizationRole } from "@/lib/teams/organizations";
import { OrgRole } from "@prisma/client";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const skip = (page - 1) * limit;

    // Fetch webhook to verify access
    const webhook = await prisma.webhook.findUnique({
      where: { id },
    });

    if (!webhook) {
      return NextResponse.json(
        { error: "Webhook not found" },
        { status: 404 }
      );
    }

    // Verify user is member of organization
    const isMember = await hasOrganizationRole(
      webhook.organizationId,
      session.user.id,
      OrgRole.MEMBER
    );

    if (!isMember) {
      return NextResponse.json(
        { error: "You don't have access to this webhook" },
        { status: 403 }
      );
    }

    // Fetch deliveries
    const [deliveries, total] = await Promise.all([
      prisma.webhookDelivery.findMany({
        where: { webhookId: id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.webhookDelivery.count({
        where: { webhookId: id },
      }),
    ]);

    return NextResponse.json({
      deliveries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    console.error("Failed to fetch deliveries:", error);
    return NextResponse.json(
      { error: "Failed to fetch deliveries" },
      { status: 500 }
    );
  }
}
