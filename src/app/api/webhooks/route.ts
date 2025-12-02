/**
 * Webhooks API Route
 * GET - List organization webhooks
 * POST - Create new webhook
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withCsrfProtection } from "@/lib/security/csrf";
import { hasOrganizationRole } from "@/lib/teams/organizations";
import { OrgRole } from "@prisma/client";
import { generateWebhookSecret } from "@/lib/webhooks";
import { isValidEvent } from "@/lib/webhooks/events";
import { logger } from "@/lib/logger";
import { env } from "@/lib/env";
import { z } from "zod";

const createWebhookSchema = z.object({
  organizationId: z.string().min(1, "Organization ID is required"),
  url: z.string().url("Invalid webhook URL"),
  events: z.array(z.string()).min(1, "At least one event is required"),
});

export async function GET(_req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(_req.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

    // Verify user is member of organization
    const isMember = await hasOrganizationRole(
      organizationId,
      session.user.id,
      OrgRole.MEMBER
    );

    if (!isMember) {
      return NextResponse.json(
        { error: "You don't have access to this organization" },
        { status: 403 }
      );
    }

    // Fetch webhooks
    const webhooks = await prisma.webhook.findMany({
      where: { organizationId },
      include: {
        _count: {
          select: {
            deliveries: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Don't expose secrets in list view
    const safeWebhooks = webhooks.map((webhook) => ({
      id: webhook.id,
      url: webhook.url,
      events: webhook.events,
      enabled: webhook.enabled,
      createdAt: webhook.createdAt,
      updatedAt: webhook.updatedAt,
      deliveryCount: webhook._count.deliveries,
    }));

    return NextResponse.json(safeWebhooks);
  } catch (error: unknown) {
    logger.error("Failed to fetch webhooks:", error);
    return NextResponse.json(
      { error: "Failed to fetch webhooks" },
      { status: 500 }
    );
  }
}

export const POST = withCsrfProtection(async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { organizationId, url, events } = createWebhookSchema.parse(body);

    // Verify user has ADMIN role
    const canCreate = await hasOrganizationRole(
      organizationId,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canCreate) {
      return NextResponse.json(
        { error: "You don't have permission to create webhooks" },
        { status: 403 }
      );
    }

    // Validate URL
    try {
      const parsedUrl = new URL(url);
      if (env.server.NODE_ENV === "production" && parsedUrl.protocol !== "https:") {
        return NextResponse.json(
          { error: "Webhook URL must use HTTPS in production" },
          { status: 400 }
        );
      }
    } catch (error: unknown) {
      return NextResponse.json(
        { error: "Invalid webhook URL" },
        { status: 400 }
      );
    }

    // Validate events
    const invalidEvents = events.filter((event: string) => !isValidEvent(event));
    if (invalidEvents.length > 0) {
      return NextResponse.json(
        { error: `Invalid events: ${invalidEvents.join(", ")}` },
        { status: 400 }
      );
    }

    // Check webhook limit (max 5 per organization)
    const existingCount = await prisma.webhook.count({
      where: { organizationId },
    });

    if (existingCount >= 5) {
      return NextResponse.json(
        { error: "Maximum 5 webhooks allowed per organization" },
        { status: 400 }
      );
    }

    // Generate secret
    const secret = generateWebhookSecret();

    // Create webhook
    const webhook = await prisma.webhook.create({
      data: {
        organizationId,
        url,
        events,
        secret,
        enabled: true,
      },
    });

    return NextResponse.json({
      id: webhook.id,
      url: webhook.url,
      events: webhook.events,
      secret: webhook.secret, // Only expose on creation
      enabled: webhook.enabled,
      createdAt: webhook.createdAt,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    logger.error("Failed to create webhook:", error);
    return NextResponse.json(
      { error: "Failed to create webhook" },
      { status: 500 }
    );
  }
});
