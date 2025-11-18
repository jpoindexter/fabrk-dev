/**
 * Pusher Client Hooks
 * React hooks for real-time subscriptions
 */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import PusherClient from "pusher-js";
import { useSession } from "next-auth/react";
import { logger } from "@/lib/logger";

// Singleton client instance
let pusherClient: PusherClient | null = null;

/**
 * Get or create Pusher client instance
 */
function getPusherClient(): PusherClient | null {
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!key || !cluster) {
    logger.warn("Pusher credentials not configured. Real-time features disabled.");
    return null;
  }

  if (!pusherClient) {
    pusherClient = new PusherClient(key, {
      cluster,
      authEndpoint: "/api/pusher/auth",
    });
  }

  return pusherClient;
}

/**
 * Hook to subscribe to user notifications
 */
interface PusherChannel {
  bind: (event: string, callback: (data: unknown) => void) => void;
  unbind: (event: string, callback: (data: unknown) => void) => void;
  unbind_all: () => void;
}

export function useNotifications(
  onNotification: (notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    createdAt: Date;
  }) => void
) {
  const { data: session } = useSession();
  const channelRef = useRef<PusherChannel | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const client = getPusherClient();
    if (!client) return;

    const channelName = `private-user-${session.user.id}`;
    const channel = client.subscribe(channelName);

    const notificationHandler = (data: unknown) => {
      onNotification(data as {
        id: string;
        type: string;
        title: string;
        message: string;
        createdAt: Date;
      });
    };

    channel.bind("notification", notificationHandler);
    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind("notification", notificationHandler);
        client.unsubscribe(channelName);
        channelRef.current = null;
      }
    };
  }, [session?.user?.id, onNotification]);
}

/**
 * Hook to subscribe to organization activity feed
 */
export function useOrgActivity(
  organizationId: string | undefined,
  onActivity: (activity: {
    id: string;
    type: string;
    description: string;
    userId: string;
    userName: string;
    timestamp: Date;
  }) => void
) {
  const channelRef = useRef<PusherChannel | null>(null);

  useEffect(() => {
    if (!organizationId) return;

    const client = getPusherClient();
    if (!client) return;

    const channelName = `private-org-${organizationId}`;
    const channel = client.subscribe(channelName);

    const activityHandler = (data: unknown) => {
      onActivity(data as {
        id: string;
        type: string;
        description: string;
        userId: string;
        userName: string;
        timestamp: Date;
      });
    };

    channel.bind("activity", activityHandler);
    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind("activity", activityHandler);
        client.unsubscribe(channelName);
        channelRef.current = null;
      }
    };
  }, [organizationId, onActivity]);
}

/**
 * Hook to track online presence in an organization
 */
interface PusherMemberInfo {
  id: string;
  info: {
    name: string;
    email?: string;
  };
}

interface PusherMembers {
  each: (callback: (member: PusherMemberInfo) => void) => void;
}

export function usePresence(organizationId: string | undefined) {
  const { data: session } = useSession();
  const [members, setMembers] = useState<
    Array<{
      id: string;
      name: string;
      email?: string;
    }>
  >([]);
  const channelRef = useRef<PusherChannel | null>(null);

  useEffect(() => {
    if (!organizationId || !session?.user?.id) return;

    const client = getPusherClient();
    if (!client) return;

    const channelName = `presence-org-${organizationId}`;
    const channel = client.subscribe(channelName);

    // Handle successful subscription
    channel.bind("pusher:subscription_succeeded", (members: unknown) => {
      const membersList: Array<{ id: string; name: string; email?: string }> =
        [];
      (members as PusherMembers).each((member: PusherMemberInfo) => {
        membersList.push({
          id: member.id,
          name: member.info.name,
          email: member.info.email,
        });
      });
      setMembers(membersList);
    });

    // Handle member added
    channel.bind("pusher:member_added", (member: unknown) => {
      const memberInfo = member as PusherMemberInfo;
      setMembers((prev) => [
        ...prev,
        {
          id: memberInfo.id,
          name: memberInfo.info.name,
          email: memberInfo.info.email,
        },
      ]);
    });

    // Handle member removed
    channel.bind("pusher:member_removed", (member: unknown) => {
      const memberInfo = member as PusherMemberInfo;
      setMembers((prev) => prev.filter((m) => m.id !== memberInfo.id));
    });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        client.unsubscribe(channelName);
        channelRef.current = null;
      }
    };
  }, [organizationId, session?.user?.id]);

  return { members, count: members.length };
}

/**
 * Hook to get Pusher connection status
 */
type PusherConnectionState = "connecting" | "connected" | "disconnected" | "unavailable";

export function usePusherStatus() {
  // Initialize state based on client availability (industry-standard pattern)
  const client = getPusherClient();
  const [status, setStatus] = useState<PusherConnectionState>(
    !client ? "unavailable" : "connecting"
  );

  useEffect(() => {
    if (!client) return;

    const updateStatus = () => {
      setStatus(client.connection.state as PusherConnectionState);
    };

    client.connection.bind("state_change", updateStatus);
    updateStatus();

    return () => {
      client.connection.unbind("state_change", updateStatus);
    };
  }, [client]);

  return status;
}
