/**
 * Notification Utilities
 * Helper functions to create notifications
 */

import { prisma } from "./prisma";
import { triggerNotification, triggerOrgActivity } from "./pusher/server";
import type { NotificationType } from "@prisma/client";

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  metadata?: any;
}

/**
 * Create a notification and trigger real-time event
 */
export async function createNotification({
  userId,
  type,
  title,
  message,
  link,
  metadata,
}: CreateNotificationParams) {
  try {
    // Create notification in database
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        link,
        metadata,
      },
    });

    // Trigger real-time notification via Pusher
    await triggerNotification(userId, {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      createdAt: notification.createdAt,
    });

    return notification;
  } catch (error: unknown) {
    console.error("Failed to create notification:", error);
    throw error;
  }
}

/**
 * Create organization activity and trigger real-time event
 */
export async function createOrgActivity(
  organizationId: string,
  activity: {
    type: string;
    description: string;
    userId: string;
    userName: string;
  }
) {
  try {
    await triggerOrgActivity(organizationId, {
      id: `${Date.now()}-${Math.random()}`,
      ...activity,
      timestamp: new Date(),
    });
  } catch (error: unknown) {
    console.error("Failed to create org activity:", error);
  }
}

/**
 * Notify user about organization invite
 */
export async function notifyOrgInvite(
  userId: string,
  orgName: string,
  inviterName: string,
  inviteToken: string
) {
  return createNotification({
    userId,
    type: "ORG_INVITE",
    title: "Organization Invitation",
    message: `${inviterName} invited you to join ${orgName}`,
    link: `/organizations/invites/${inviteToken}`,
    metadata: { orgName, inviterName, inviteToken },
  });
}

/**
 * Notify org members about new member added
 */
export async function notifyOrgMemberAdded(
  organizationId: string,
  orgName: string,
  newMemberName: string,
  memberUserIds: string[]
) {
  const promises = memberUserIds.map((userId) =>
    createNotification({
      userId,
      type: "ORG_MEMBER_ADDED",
      title: "New Team Member",
      message: `${newMemberName} joined ${orgName}`,
      link: `/organizations/${organizationId}/members`,
      metadata: { organizationId, orgName, newMemberName },
    })
  );

  await Promise.allSettled(promises);
}

/**
 * Notify user about role change
 */
export async function notifyRoleChanged(
  userId: string,
  orgName: string,
  newRole: string,
  organizationId: string
) {
  return createNotification({
    userId,
    type: "ORG_ROLE_CHANGED",
    title: "Role Updated",
    message: `Your role in ${orgName} was changed to ${newRole}`,
    link: `/organizations/${organizationId}`,
    metadata: { organizationId, orgName, newRole },
  });
}

/**
 * Notify user about successful payment
 */
export async function notifyPaymentSuccess(
  userId: string,
  amount: number,
  productName?: string
) {
  return createNotification({
    userId,
    type: "PAYMENT_SUCCESS",
    title: "Payment Successful",
    message: `Your payment of $${(amount / 100).toFixed(2)}${productName ? ` for ${productName}` : ""} was processed successfully`,
    link: "/billing/invoices",
    metadata: { amount, productName },
  });
}

/**
 * Notify user about failed payment
 */
export async function notifyPaymentFailed(
  userId: string,
  amount: number,
  productName?: string
) {
  return createNotification({
    userId,
    type: "PAYMENT_FAILED",
    title: "Payment Failed",
    message: `Your payment of $${(amount / 100).toFixed(2)}${productName ? ` for ${productName}` : ""} failed. Please update your payment method.`,
    link: "/billing/payment-methods",
    metadata: { amount, productName },
  });
}

/**
 * Notify user about security alert
 */
export async function notifySecurityAlert(
  userId: string,
  alertType: string,
  message: string
) {
  return createNotification({
    userId,
    type: "SECURITY_ALERT",
    title: "Security Alert",
    message,
    link: "/settings/security",
    metadata: { alertType },
  });
}
