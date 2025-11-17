/**
 * Test Webhook API Route
 * POST - Send test webhook delivery
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasOrganizationRole } from "@/lib/teams/organizations";
import { OrgRole } from "@prisma/client";
import { deliverWebhook } from "@/lib/webhooks";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const webhook = await prisma.webhook.findUnique({
      where: { id },
    });

    if (!webhook) {
      return NextResponse.json(
        { error: "Webhook not found" },
        { status: 404 }
      );
    }

    // Verify user has ADMIN role
    const canTest = await hasOrganizationRole(
      webhook.organizationId,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canTest) {
      return NextResponse.json(
        { error: "You don't have permission to test webhooks" },
        { status: 403 }
      );
    }

    // Send test webhook
    const testPayload = {
      test: true,
      message: "This is a test webhook delivery",
      triggeredBy: session.user.email,
      timestamp: new Date().toISOString(),
    };

    // Use the first subscribed event for testing
    const testEvent = webhook.events[0] || "org.member.added";

    await deliverWebhook(webhook.id, testEvent as any, testPayload);

    return NextResponse.json({
      success: true,
      message: "Test webhook sent successfully",
    });
  } catch (error: unknown) {
    console.error("Failed to send test webhook:", error);
    return NextResponse.json(
      { error: "Failed to send test webhook" },
      { status: 500 }
    );
  }
}
