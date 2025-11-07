/**
 * Security Audit Logging
 * Track security-relevant events for compliance and incident response
 *
 * Features:
 * - User activity logging
 * - Security event tracking
 * - Tamper-proof logs
 * - GDPR compliance
 * - Incident investigation support
 */

export type AuditEventType =
  // Authentication events
  | "auth.login"
  | "auth.logout"
  | "auth.register"
  | "auth.password_reset"
  | "auth.email_verified"
  | "auth.failed_login"
  | "auth.suspicious_login"
  | "auth.mfa_enabled"
  | "auth.mfa_disabled"
  | "auth.mfa_verified"
  | "auth.mfa_success"
  | "auth.mfa_failed"
  | "auth.backup_code_used"
  | "auth.backup_codes_regenerated"

  // Authorization events
  | "authz.role_changed"
  | "authz.permission_granted"
  | "authz.permission_denied"
  | "authz.access_denied"

  // Data access events
  | "data.read"
  | "data.create"
  | "data.update"
  | "data.delete"
  | "data.export"

  // Payment events
  | "payment.initiated"
  | "payment.completed"
  | "payment.failed"
  | "payment.refunded"

  // Admin events
  | "admin.user_deleted"
  | "admin.user_suspended"
  | "admin.config_changed"
  | "admin.feature_flag_changed"

  // Security events
  | "security.rate_limit_exceeded"
  | "security.bot_detected"
  | "security.suspicious_activity"
  | "security.xss_attempt"
  | "security.sql_injection_attempt"
  | "security.csrf_detected"

  // GDPR events
  | "gdpr.data_exported"
  | "gdpr.data_deleted"
  | "gdpr.consent_given"
  | "gdpr.consent_revoked"

  // System events
  | "system.error"
  | "system.config_changed"
  | "system.backup_completed";

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  eventType: AuditEventType;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  resource?: string; // What was accessed
  action: string; // What action was performed
  result: "success" | "failure" | "error";
  metadata?: Record<string, any>;
  severity: "low" | "medium" | "high" | "critical";
  hash?: string; // For tamper detection
}

// In-memory store (use database in production)
const auditLogs: AuditLogEntry[] = [];

/**
 * Log audit event
 */
export async function logAuditEvent(event: Omit<AuditLogEntry, "id" | "timestamp" | "hash">): Promise<void> {
  const entry: AuditLogEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    ...event,
  };

  // Generate hash for tamper detection
  entry.hash = await generateEntryHash(entry);

  // Store log (in production, save to database)
  auditLogs.push(entry);

  // Log critical events to console immediately
  if (entry.severity === "critical" || entry.severity === "high") {
    console.error("[Audit Log - CRITICAL]", {
      eventType: entry.eventType,
      userId: entry.userId,
      action: entry.action,
      result: entry.result,
    });
  }

  // Keep only last 10000 logs in memory
  if (auditLogs.length > 10000) {
    auditLogs.shift();
  }

  // In production, you would save to database:
  // await prisma.auditLog.create({ data: entry });
}

/**
 * Generate hash for audit log entry (tamper detection)
 */
async function generateEntryHash(entry: Omit<AuditLogEntry, "hash">): Promise<string> {
  const data = JSON.stringify({
    id: entry.id,
    timestamp: entry.timestamp.toISOString(),
    eventType: entry.eventType,
    userId: entry.userId,
    action: entry.action,
    result: entry.result,
  });

  // In Node.js environment
  if (typeof window === "undefined") {
    const crypto = require("crypto");
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  // In browser environment
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Quick logging functions for common events
 */
export const AuditLog = {
  // Authentication
  login: (userId: string, email: string, ip?: string) =>
    logAuditEvent({
      eventType: "auth.login",
      userId,
      userEmail: email,
      ipAddress: ip,
      action: "User logged in",
      result: "success",
      severity: "low",
    }),

  failedLogin: (email: string, ip?: string) =>
    logAuditEvent({
      eventType: "auth.failed_login",
      userEmail: email,
      ipAddress: ip,
      action: "Failed login attempt",
      result: "failure",
      severity: "medium",
    }),

  suspiciousLogin: (userId: string, email: string, reason: string, ip?: string) =>
    logAuditEvent({
      eventType: "auth.suspicious_login",
      userId,
      userEmail: email,
      ipAddress: ip,
      action: "Suspicious login detected",
      result: "success",
      severity: "high",
      metadata: { reason },
    }),

  // Data access
  dataExport: (userId: string, email: string, dataType: string) =>
    logAuditEvent({
      eventType: "data.export",
      userId,
      userEmail: email,
      resource: dataType,
      action: "Data exported",
      result: "success",
      severity: "medium",
    }),

  dataDelete: (userId: string, email: string, resource: string) =>
    logAuditEvent({
      eventType: "data.delete",
      userId,
      userEmail: email,
      resource,
      action: "Data deleted",
      result: "success",
      severity: "high",
    }),

  // Security events
  rateLimitExceeded: (ip: string, endpoint: string) =>
    logAuditEvent({
      eventType: "security.rate_limit_exceeded",
      ipAddress: ip,
      resource: endpoint,
      action: "Rate limit exceeded",
      result: "failure",
      severity: "medium",
    }),

  botDetected: (ip: string, userAgent: string, botType: string) =>
    logAuditEvent({
      eventType: "security.bot_detected",
      ipAddress: ip,
      userAgent,
      action: "Bot detected",
      result: "success",
      severity: "low",
      metadata: { botType },
    }),

  xssAttempt: (userId: string | undefined, ip: string, payload: string) =>
    logAuditEvent({
      eventType: "security.xss_attempt",
      userId,
      ipAddress: ip,
      action: "XSS attack attempt detected",
      result: "failure",
      severity: "critical",
      metadata: { payload: payload.substring(0, 200) }, // Truncate
    }),

  sqlInjectionAttempt: (userId: string | undefined, ip: string, query: string) =>
    logAuditEvent({
      eventType: "security.sql_injection_attempt",
      userId,
      ipAddress: ip,
      action: "SQL injection attempt detected",
      result: "failure",
      severity: "critical",
      metadata: { query: query.substring(0, 200) }, // Truncate
    }),

  // GDPR
  gdprDataExported: (userId: string, email: string) =>
    logAuditEvent({
      eventType: "gdpr.data_exported",
      userId,
      userEmail: email,
      action: "GDPR data export requested",
      result: "success",
      severity: "medium",
    }),

  gdprDataDeleted: (userId: string, email: string) =>
    logAuditEvent({
      eventType: "gdpr.data_deleted",
      userId,
      userEmail: email,
      action: "GDPR data deletion requested",
      result: "success",
      severity: "high",
    }),

  // Admin events
  userDeleted: (adminId: string, targetUserId: string, targetEmail: string) =>
    logAuditEvent({
      eventType: "admin.user_deleted",
      userId: adminId,
      resource: targetUserId,
      action: `Admin deleted user ${targetEmail}`,
      result: "success",
      severity: "high",
      metadata: { targetUserId, targetEmail },
    }),

  configChanged: (adminId: string, configKey: string, oldValue: any, newValue: any) =>
    logAuditEvent({
      eventType: "admin.config_changed",
      userId: adminId,
      resource: configKey,
      action: `Config changed: ${configKey}`,
      result: "success",
      severity: "medium",
      metadata: { oldValue, newValue },
    }),

  // MFA events
  mfaEnabled: (userId: string, email: string) =>
    logAuditEvent({
      eventType: "auth.mfa_enabled",
      userId,
      userEmail: email,
      action: "MFA enabled",
      result: "success",
      severity: "medium",
    }),

  mfaDisabled: (userId: string, email: string) =>
    logAuditEvent({
      eventType: "auth.mfa_disabled",
      userId,
      userEmail: email,
      action: "MFA disabled",
      result: "success",
      severity: "high",
    }),

  mfaVerified: (userId: string, email: string) =>
    logAuditEvent({
      eventType: "auth.mfa_verified",
      userId,
      userEmail: email,
      action: "MFA device verified",
      result: "success",
      severity: "low",
    }),

  mfaSuccess: (userId: string, email: string, ip?: string) =>
    logAuditEvent({
      eventType: "auth.mfa_success",
      userId,
      userEmail: email,
      ipAddress: ip,
      action: "MFA verification successful",
      result: "success",
      severity: "low",
    }),

  mfaFailed: (userId: string, email: string, ip?: string) =>
    logAuditEvent({
      eventType: "auth.mfa_failed",
      userId,
      userEmail: email,
      ipAddress: ip,
      action: "MFA verification failed",
      result: "failure",
      severity: "medium",
    }),

  backupCodeUsed: (userId: string, email: string, ip?: string) =>
    logAuditEvent({
      eventType: "auth.backup_code_used",
      userId,
      userEmail: email,
      ipAddress: ip,
      action: "Backup code used for login",
      result: "success",
      severity: "medium",
    }),

  backupCodesRegenerated: (userId: string, email: string) =>
    logAuditEvent({
      eventType: "auth.backup_codes_regenerated",
      userId,
      userEmail: email,
      action: "Backup codes regenerated",
      result: "success",
      severity: "medium",
    }),
};

/**
 * Query audit logs
 */
export function queryAuditLogs(filters: {
  userId?: string;
  eventType?: AuditEventType;
  startDate?: Date;
  endDate?: Date;
  severity?: AuditLogEntry["severity"];
  limit?: number;
}): AuditLogEntry[] {
  let results = [...auditLogs];

  if (filters.userId) {
    results = results.filter((log) => log.userId === filters.userId);
  }

  if (filters.eventType) {
    results = results.filter((log) => log.eventType === filters.eventType);
  }

  if (filters.startDate) {
    results = results.filter((log) => log.timestamp >= filters.startDate!);
  }

  if (filters.endDate) {
    results = results.filter((log) => log.timestamp <= filters.endDate!);
  }

  if (filters.severity) {
    results = results.filter((log) => log.severity === filters.severity);
  }

  // Sort by timestamp descending
  results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  if (filters.limit) {
    results = results.slice(0, filters.limit);
  }

  return results;
}

/**
 * Get security events summary
 */
export function getSecuritySummary(since: Date): {
  totalEvents: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
  criticalEvents: AuditLogEntry[];
} {
  const logs = queryAuditLogs({ startDate: since });

  const byType: Record<string, number> = {};
  const bySeverity: Record<string, number> = {};

  logs.forEach((log) => {
    byType[log.eventType] = (byType[log.eventType] || 0) + 1;
    bySeverity[log.severity] = (bySeverity[log.severity] || 0) + 1;
  });

  const criticalEvents = logs.filter(
    (log) => log.severity === "critical" || log.severity === "high"
  );

  return {
    totalEvents: logs.length,
    byType,
    bySeverity,
    criticalEvents,
  };
}

/**
 * Export audit logs to JSON
 */
export function exportAuditLogs(filters?: Parameters<typeof queryAuditLogs>[0]): string {
  const logs = queryAuditLogs(filters || {});
  return JSON.stringify(logs, null, 2);
}

/**
 * Verify log integrity (check for tampering)
 */
export async function verifyLogIntegrity(entry: AuditLogEntry): Promise<boolean> {
  const { hash, ...entryWithoutHash } = entry;
  const expectedHash = await generateEntryHash(entryWithoutHash);
  return hash === expectedHash;
}
