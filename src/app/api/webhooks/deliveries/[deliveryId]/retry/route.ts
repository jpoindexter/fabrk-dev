/**
 * Retry Webhook Delivery API Route
 * POST - Retry a failed webhook delivery
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { withCsrfProtection } from "@/lib/security/csrf";
import { hasOrganizationRole } from "@/lib/teams/organizations";
import { OrgRole } from "@prisma/client";
import { retryWebhookDelivery } from "@/lib/webhooks";
import { logger } from "@/lib/logger";

interface RouteContext {
  params: Promise<{ deliveryId: string }>;
}

export const POST = withCsrfProtection(async (
  req: NextRequest,
  context: RouteContext
) => {
  try {
    const { deliveryId } = await context.params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const delivery = await prisma.webhookDelivery.findUnique({
      where: { id: deliveryId },
      include: {
        webhook: true,
      },
    });

    if (!delivery) {
      return NextResponse.json(
        { error: "Delivery not found" },
        { status: 404 }
      );
    }

    // Verify user has ADMIN role
    const canRetry = await hasOrganizationRole(
      delivery.webhook.organizationId,
      session.user.id,
      OrgRole.ADMIN
    );

    if (!canRetry) {
      return NextResponse.json(
        { error: "You don't have permission to retry deliveries" },
        { status: 403 }
      );
    }

    // Check if already succeeded
    if (delivery.status === "success") {
      return NextResponse.json(
        { error: "Cannot retry successful delivery" },
        { status: 400 }
      );
    }

    // Check max attempts
    if (delivery.attempts >= 5) {
      return NextResponse.json(
        { error: "Maximum retry attempts reached" },
        { status: 400 }
      );
    }

    // Retry delivery
    await retryWebhookDelivery(deliveryId);

    return NextResponse.json({
      success: true,
      message: "Delivery retry initiated",
    });
  } catch (error: unknown) {
    logger.error("Failed to retry delivery:", error);
    return NextResponse.json(
      { error: "Failed to retry delivery" },
      { status: 500 }
    );
  }
});
