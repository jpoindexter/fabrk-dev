/**
 * Pusher Channel Authorization
 * Authorizes private and presence channel subscriptions
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { authorizeChannel } from "@/lib/pusher/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.text();
    const params = new URLSearchParams(body);
    const socketId = params.get("socket_id");
    const channel = params.get("channel_name");

    if (!socketId || !channel) {
      return NextResponse.json(
        { error: "Missing socket_id or channel_name" },
        { status: 400 }
      );
    }

    // Validate channel access
    // User can access:
    // - Their own private channel: private-user-{userId}
    // - Organization channels they're a member of: private-org-{orgId} or presence-org-{orgId}
    if (channel.startsWith("private-user-")) {
      const channelUserId = channel.replace("private-user-", "");
      if (channelUserId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } else if (
      channel.startsWith("private-org-") ||
      channel.startsWith("presence-org-")
    ) {
      // Extract org ID from channel name
      const orgId = channel
        .replace("private-org-", "")
        .replace("presence-org-", "");

      // Verify user is a member of this organization
      const membership = await prisma.organizationMember.findFirst({
        where: {
          userId: session.user.id,
          organizationId: orgId,
        },
      });

      if (!membership) {
        return NextResponse.json(
          { error: "You are not a member of this organization" },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json({ error: "Invalid channel" }, { status: 403 });
    }

    // Authorize the channel
    const authData = authorizeChannel(socketId, channel, session.user.id, {
      name: session.user.name || "User",
      email: session.user.email || undefined,
    });

    if (!authData) {
      return NextResponse.json(
        { error: "Pusher not configured" },
        { status: 503 }
      );
    }

    return new NextResponse(authData, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Pusher auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
