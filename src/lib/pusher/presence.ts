/**
 * Presence Utilities
 * Helper functions for managing presence state
 */

"use client";

import { usePresence } from "./client";

/**
 * Hook to get formatted presence info for an organization
 */
export function useOrgPresence(organizationId: string | undefined) {
  const { members, count } = usePresence(organizationId);

  const getPresenceText = () => {
    if (count === 0) return "No one online";
    if (count === 1) return "1 person online";
    return `${count} people online`;
  };

  const getPresenceBadgeColor = () => {
    if (count === 0) return "secondary";
    if (count < 3) return "default";
    return "default";
  };

  return {
    members,
    count,
    text: getPresenceText(),
    badgeColor: getPresenceBadgeColor(),
  };
}

/**
 * Check if a specific user is online
 */
export function isUserOnline(
  userId: string,
  members: Array<{ id: string; name: string; email?: string }>
): boolean {
  return members.some((m) => m.id === userId);
}

/**
 * Get online status indicator color
 */
export function getPresenceColor(isOnline: boolean): string {
  return isOnline ? "bg-success" : "bg-gray-400";
}
