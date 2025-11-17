/**
 * Pusher Server Client
 * Handles server-side real-time event triggering
 */

import Pusher from "pusher";

// Singleton instance
let pusherInstance: Pusher | null = null;

/**
 * Get Pusher server instance
 * Returns null if Pusher credentials are not configured
 */
export function getPusherServer(): Pusher | null {
  // Check if credentials are configured
  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!appId || !key || !secret || !cluster) {
    console.warn(
      "Pusher credentials not configured. Real-time features disabled."
    );
    return null;
  }

  // Return existing instance or create new one
  if (!pusherInstance) {
    pusherInstance = new Pusher({
      appId,
      key,
      secret,
      cluster,
      useTLS: true,
    });
  }

  return pusherInstance;
}

/**
 * Check if Pusher is configured
 */
export function isPusherConfigured(): boolean {
  return getPusherServer() !== null;
}

/**
 * Trigger a notification event for a user
 */
export async function triggerNotification(
  userId: string,
  notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    createdAt: Date;
  }
): Promise<boolean> {
  const pusher = getPusherServer();
  if (!pusher) return false;

  try {
    await pusher.trigger(`private-user-${userId}`, "notification", notification);
    return true;
  } catch (error: unknown) {
    console.error("Failed to trigger notification:", error);
    return false;
  }
}

/**
 * Trigger an organization activity event
 */
export async function triggerOrgActivity(
  organizationId: string,
  activity: {
    id: string;
    type: string;
    description: string;
    userId: string;
    userName: string;
    timestamp: Date;
  }
): Promise<boolean> {
  const pusher = getPusherServer();
  if (!pusher) return false;

  try {
    await pusher.trigger(
      `private-org-${organizationId}`,
      "activity",
      activity
    );
    return true;
  } catch (error: unknown) {
    console.error("Failed to trigger org activity:", error);
    return false;
  }
}

/**
 * Trigger presence update for an organization
 */
export async function triggerPresenceUpdate(
  organizationId: string,
  userId: string,
  status: "online" | "offline"
): Promise<boolean> {
  const pusher = getPusherServer();
  if (!pusher) return false;

  try {
    await pusher.trigger(`presence-org-${organizationId}`, "presence-update", {
      userId,
      status,
      timestamp: new Date(),
    });
    return true;
  } catch (error: unknown) {
    console.error("Failed to trigger presence update:", error);
    return false;
  }
}

/**
 * Authorize Pusher channel access (for private/presence channels)
 * This should be called from an API route
 */
export function authorizeChannel(
  socketId: string,
  channel: string,
  userId: string,
  userInfo?: { name: string; email?: string }
): string | null {
  const pusher = getPusherServer();
  if (!pusher) return null;

  try {
    // Handle presence channels differently
    if (channel.startsWith("presence-")) {
      return JSON.stringify(
        pusher.authorizeChannel(socketId, channel, {
          user_id: userId,
          user_info: userInfo || { name: "User" },
        })
      );
    }

    // Private channels
    return JSON.stringify(pusher.authorizeChannel(socketId, channel));
  } catch (error: unknown) {
    console.error("Failed to authorize channel:", error);
    return null;
  }
}
