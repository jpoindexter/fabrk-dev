import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard, DocsLinkCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { FileText, Search, Bell, Database } from "lucide-react";

export const metadata = {
  title: "Audit Logging - Fabrk Docs",
  description: "Track user actions for compliance. Immutable audit trail with 18+ event types and admin viewer.",
};

export default function AuditLoggingPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Security"
      title="Audit_Logging"
      description="Track security-relevant events and user actions for compliance and debugging."
      overview="Audit logging creates an immutable record of security-relevant events. Track logins, payments, admin actions, and more for compliance requirements and security investigations."
      features={[
        { icon: Database, title: "Persistent Storage", description: "Database-backed audit log storage." },
        { icon: FileText, title: "Event Types", description: "18+ pre-defined security event types." },
        { icon: Search, title: "Searchable", description: "Filter by user, action, category, and date." },
        { icon: Bell, title: "Alerts", description: "Send alerts for critical security events." },
      ]}
      usage={[
        {
          title: "Database Schema",
          description: "The AuditLog model in Prisma",
          code: `// prisma/schema.prisma

model AuditLog {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())

  // Event details
  action      String   // e.g., "user.login", "payment.created"
  category    String   // e.g., "auth", "billing", "admin"
  severity    String   @default("info") // info, warning, error, critical

  // Actor information
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  actorType   String   @default("user") // user, system, api

  // Context
  ipAddress   String?
  userAgent   String?

  // Event data
  targetType  String?  // e.g., "user", "organization", "payment"
  targetId    String?
  metadata    Json?    // Additional event-specific data

  // Result
  status      String   @default("success") // success, failure
  errorMessage String?

  @@index([userId])
  @@index([action])
  @@index([category])
  @@index([createdAt])
}`,
          language: "prisma",
        },
        {
          title: "Audit Service",
          description: "Create a service to log events",
          code: `// src/lib/audit.ts

import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export type AuditAction =
  | "user.login"
  | "user.logout"
  | "user.register"
  | "user.password_reset"
  | "user.email_verified"
  | "user.updated"
  | "user.deleted"
  | "payment.created"
  | "payment.failed"
  | "subscription.created"
  | "subscription.cancelled"
  | "api_key.created"
  | "api_key.revoked"
  | "organization.created"
  | "organization.member_added"
  | "organization.member_removed"
  | "admin.user_impersonated"
  | "admin.settings_changed";

export type AuditCategory = "auth" | "billing" | "admin" | "organization" | "api";
export type AuditSeverity = "info" | "warning" | "error" | "critical";

interface AuditLogInput {
  action: AuditAction;
  category: AuditCategory;
  severity?: AuditSeverity;
  userId?: string;
  actorType?: "user" | "system" | "api";
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  status?: "success" | "failure";
  errorMessage?: string;
  request?: NextRequest;
}

export async function createAuditLog(input: AuditLogInput) {
  const {
    action,
    category,
    severity = "info",
    userId,
    actorType = "user",
    targetType,
    targetId,
    metadata,
    status = "success",
    errorMessage,
    request,
  } = input;

  // Extract request context
  let ipAddress: string | undefined;
  let userAgent: string | undefined;

  if (request) {
    ipAddress = request.ip ??
      request.headers.get("x-forwarded-for")?.split(",")[0] ??
      undefined;
    userAgent = request.headers.get("user-agent") ?? undefined;
  }

  return prisma.auditLog.create({
    data: {
      action,
      category,
      severity,
      userId,
      actorType,
      ipAddress,
      userAgent,
      targetType,
      targetId,
      metadata,
      status,
      errorMessage,
    },
  });
}`,
          language: "typescript",
        },
        {
          title: "Usage Examples",
          description: "Log events throughout your application",
          code: `// Login event
// src/app/api/auth/login/route.ts

import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const user = await authenticateUser(body.email, body.password);

    await createAuditLog({
      action: "user.login",
      category: "auth",
      userId: user.id,
      metadata: { email: body.email },
      request,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    await createAuditLog({
      action: "user.login",
      category: "auth",
      severity: "warning",
      status: "failure",
      metadata: { email: body.email },
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      request,
    });

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}

// Payment event
// src/app/api/stripe/webhook/route.ts

await createAuditLog({
  action: "payment.created",
  category: "billing",
  userId: payment.userId,
  targetType: "payment",
  targetId: payment.id,
  metadata: {
    amount: payment.amount,
    currency: payment.currency,
    stripePaymentId: payment.stripeId,
  },
});

// Admin action
await createAuditLog({
  action: "admin.user_impersonated",
  category: "admin",
  severity: "warning",
  userId: adminUser.id,
  targetType: "user",
  targetId: impersonatedUser.id,
  metadata: {
    reason: "Customer support request",
  },
  request,
});`,
          language: "typescript",
        },
        {
          title: "Querying Logs",
          description: "API endpoint to search and filter audit logs",
          code: `// src/app/api/admin/audit-logs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();

  // Admin only
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const userId = searchParams.get("userId");
  const action = searchParams.get("action");
  const category = searchParams.get("category");
  const severity = searchParams.get("severity");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: any = {};

  if (userId) where.userId = userId;
  if (action) where.action = action;
  if (category) where.category = category;
  if (severity) where.severity = severity;

  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) where.createdAt.lte = new Date(to);
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    }),
    prisma.auditLog.count({ where }),
  ]);

  return NextResponse.json({
    logs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}`,
          language: "typescript",
        },
        {
          title: "Log Retention",
          description: "Set up automatic cleanup of old logs",
          code: `// scripts/cleanup-audit-logs.ts

import { prisma } from "@/lib/db";

const RETENTION_DAYS = {
  info: 30,      // Keep info logs for 30 days
  warning: 90,   // Keep warning logs for 90 days
  error: 180,    // Keep error logs for 180 days
  critical: 365, // Keep critical logs for 1 year
};

async function cleanupAuditLogs() {
  const now = new Date();

  for (const [severity, days] of Object.entries(RETENTION_DAYS)) {
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const result = await prisma.auditLog.deleteMany({
      where: {
        severity,
        createdAt: { lt: cutoffDate },
      },
    });

    console.log(\`Deleted \${result.count} \${severity} logs older than \${days} days\`);
  }
}

cleanupAuditLogs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

// Run as cron job:
// 0 0 * * * npx ts-node scripts/cleanup-audit-logs.ts`,
          language: "typescript",
        },
        {
          title: "Security Alerts",
          description: "Send alerts for critical events",
          code: `// src/lib/audit.ts

import { sendEmail } from "@/lib/email";

const ALERT_ACTIONS = [
  "user.password_reset",
  "admin.user_impersonated",
  "api_key.created",
];

export async function createAuditLog(input: AuditLogInput) {
  const log = await prisma.auditLog.create({ /* ... */ });

  // Send alerts for critical actions
  if (
    input.severity === "critical" ||
    ALERT_ACTIONS.includes(input.action)
  ) {
    await sendSecurityAlert(log);
  }

  return log;
}

async function sendSecurityAlert(log: AuditLog) {
  const adminEmails = process.env.SECURITY_ALERT_EMAILS?.split(",") || [];

  for (const email of adminEmails) {
    await sendEmail({
      to: email,
      subject: \`Security Alert: \${log.action}\`,
      text: \`
        Action: \${log.action}
        Category: \${log.category}
        Severity: \${log.severity}
        User ID: \${log.userId || "N/A"}
        IP: \${log.ipAddress || "N/A"}
        Time: \${log.createdAt.toISOString()}

        Metadata: \${JSON.stringify(log.metadata, null, 2)}
      \`,
    });
  }
}`,
          language: "typescript",
        },
      ]}
      previous={{ title: "Rate Limiting", href: "/docs/security/rate-limiting" }}
      next={{ title: "CSRF Protection", href: "/docs/security/csrf" }}
    >
      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/security/validation"
            title="Schema Validation"
            description="Validate all inputs with Zod"
          />
          <DocsLinkCard
            href="/docs/deployment/database"
            title="Database Setup"
            description="Set up production database"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
