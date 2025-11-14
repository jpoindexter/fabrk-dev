/**
 * Webhook Details API Route
 * GET - Get webhook details
 * PATCH - Update webhook
 * DELETE - Delete webhook
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasOrganizationRole } from "@/lib/teams/organizations";
import { OrgRole } from "@prisma/client";
import { isValidEvent } from "@/lib/webhooks/events";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const webhook = await prisma.webhook.findUnique({
      where: { id: params.id },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            deliveries: true,
          },
        },
      },
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

    return NextResponse.json({
      id: webhook.id,
      url: webhook.url,
      events: webhook.events,
      secret: webhook.secret, // Expose secret in detail view
      enabled: webhook.enabled,
      organization: webhook.organization,
      deliveryCount: webhook._count.deliveries,
      createdAt: webhook.createdAt,
      updatedAt: webhook.updatedAt,
    });
  } catch (error: any) {
    console.error("Failed to fetch webhook:", error);
    return NextResponse.json(
      { error: "Failed to fetch webhook" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const webhook = await prisma.webhook.findUnique({
      where: { id: params.id },
    });

    if (!webhook) {
      return NextResponse.json(
        { error: "Webhook not found" },
        { status: 404 }
      );
    }

    // Verify user has ADMIN role
    const canUpdate = await hasOrganizationRole(
      webhook.organizationId,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canUpdate) {
      return NextResponse.json(
        { error: "You don't have permission to update webhooks" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { url, events, enabled } = body;

    const updateData: any = {};

    if (url !== undefined) {
      // Validate URL
      try {
        const parsedUrl = new URL(url);
        if (process.env.NODE_ENV === "production" && parsedUrl.protocol !== "https:") {
          return NextResponse.json(
            { error: "Webhook URL must use HTTPS in production" },
            { status: 400 }
          );
        }
        updateData.url = url;
      } catch (error) {
        return NextResponse.json(
          { error: "Invalid webhook URL" },
          { status: 400 }
        );
      }
    }

    if (events !== undefined) {
      if (!Array.isArray(events)) {
        return NextResponse.json(
          { error: "Events must be an array" },
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

      updateData.events = events;
    }

    if (enabled !== undefined) {
      updateData.enabled = enabled;
    }

    const updatedWebhook = await prisma.webhook.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({
      id: updatedWebhook.id,
      url: updatedWebhook.url,
      events: updatedWebhook.events,
      enabled: updatedWebhook.enabled,
      updatedAt: updatedWebhook.updatedAt,
    });
  } catch (error: any) {
    console.error("Failed to update webhook:", error);
    return NextResponse.json(
      { error: "Failed to update webhook" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const webhook = await prisma.webhook.findUnique({
      where: { id: params.id },
    });

    if (!webhook) {
      return NextResponse.json(
        { error: "Webhook not found" },
        { status: 404 }
      );
    }

    // Verify user has ADMIN role
    const canDelete = await hasOrganizationRole(
      webhook.organizationId,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canDelete) {
      return NextResponse.json(
        { error: "You don't have permission to delete webhooks" },
        { status: 403 }
      );
    }

    await prisma.webhook.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Webhook deleted successfully",
    });
  } catch (error: any) {
    console.error("Failed to delete webhook:", error);
    return NextResponse.json(
      { error: "Failed to delete webhook" },
      { status: 500 }
    );
  }
}
