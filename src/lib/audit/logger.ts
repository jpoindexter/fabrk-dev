/**
 * Audit Logger Service
 * Immutable audit trail for sensitive operations
 */

import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export type AuditAction =
  | 'org.created'
  | 'org.updated'
  | 'org.deleted'
  | 'org.member.added'
  | 'org.member.removed'
  | 'org.member.role_changed'
  | 'user.password_changed'
  | 'user.email_changed'
  | 'user.role_changed'
  | 'user.deleted'
  | 'user.impersonation_started'
  | 'user.impersonation_ended'
  | 'mfa.enabled'
  | 'mfa.disabled'
  | 'api_key.created'
  | 'api_key.revoked'
  | 'feature_flag.created'
  | 'feature_flag.updated'
  | 'feature_flag.deleted';

interface AuditLogOptions {
  userId: string;
  action: AuditAction;
  resource?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Create an immutable audit log entry
 */
export async function logAudit(options: AuditLogOptions): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: options.userId,
        action: options.action,
        resource: options.resource,
        resourceId: options.resourceId,
        metadata: {
          ...options.metadata,
          ipAddress: options.ipAddress,
          userAgent: options.userAgent,
          timestamp: new Date().toISOString(),
        },
      },
    });
  } catch (error: unknown) {
    logger.error('Failed to create audit log', error);
    // Don't throw - audit logging should not break the main flow
  }
}

/**
 * Retrieve audit logs with filters
 */
export async function getAuditLogs(options: {
  userId?: string;
  action?: AuditAction;
  resource?: string;
  limit?: number;
  offset?: number;
}) {
  const where: { userId?: string; action?: AuditAction; resource?: string } = {};

  if (options.userId) {
    where.userId = options.userId;
  }

  if (options.action) {
    where.action = options.action;
  }

  if (options.resource) {
    where.resource = options.resource;
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: options.limit || 50,
      skip: options.offset || 0,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return { logs, total };
}

/**
 * Convenience functions for common audit events
 */

export async function logOrgCreated(
  userId: string,
  orgId: string,
  orgName: string,
  metadata?: Record<string, unknown>
) {
  await logAudit({
    userId,
    action: 'org.created',
    resource: 'organization',
    resourceId: orgId,
    metadata: { orgName, ...metadata },
  });
}

export async function logOrgDeleted(
  userId: string,
  orgId: string,
  orgName: string,
  metadata?: Record<string, unknown>
) {
  await logAudit({
    userId,
    action: 'org.deleted',
    resource: 'organization',
    resourceId: orgId,
    metadata: { orgName, ...metadata },
  });
}

export async function logMemberRemoved(
  userId: string,
  orgId: string,
  removedUserId: string,
  metadata?: Record<string, unknown>
) {
  await logAudit({
    userId,
    action: 'org.member.removed',
    resource: 'organization',
    resourceId: orgId,
    metadata: { removedUserId, ...metadata },
  });
}

export async function logUserImpersonation(
  adminUserId: string,
  targetUserId: string,
  action: 'started' | 'ended',
  metadata?: Record<string, unknown>
) {
  await logAudit({
    userId: adminUserId,
    action: action === 'started' ? 'user.impersonation_started' : 'user.impersonation_ended',
    resource: 'user',
    resourceId: targetUserId,
    metadata,
  });
}

export async function logFeatureFlagChange(
  userId: string,
  flagId: string,
  action: 'created' | 'updated' | 'deleted',
  metadata?: Record<string, unknown>
) {
  const auditAction =
    action === 'created'
      ? 'feature_flag.created'
      : action === 'updated'
        ? 'feature_flag.updated'
        : 'feature_flag.deleted';

  await logAudit({
    userId,
    action: auditAction,
    resource: 'feature_flag',
    resourceId: flagId,
    metadata,
  });
}
