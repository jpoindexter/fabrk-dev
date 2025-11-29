import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Audit Logging - Fabrk Docs",
  description: "Track user actions for compliance. Immutable audit trail with 18+ event types and admin viewer.",
};

export default function AuditLoggingPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x80] SECURITY ] AUDIT_LOGGING</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">AUDIT_LOGGING</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Track security-relevant events and user actions for compliance and debugging.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h3 className="mb-2 font-mono font-semibold">WHAT'S_INCLUDED</h3>
          <ul className="font-mono text-sm text-muted-foreground space-y-1">
            <li>Database-backed audit log storage</li>
            <li>Pre-defined event types</li>
            <li>User and system action tracking</li>
            <li>IP address and user agent logging</li>
            <li>Searchable and filterable logs</li>
            <li>Retention policies</li>
          </ul>
        </CardContent>
      </Card>

      {/* Database Schema */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">DATABASE_SCHEMA</h2>
          <p className="font-mono text-muted-foreground">
            The AuditLog model in Prisma:
          </p>
        </div>
        <CodeBlock language="prisma" code={`// prisma/schema.prisma

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
}`} />
      </div>

      {/* Audit Service */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">AUDIT_SERVICE</h2>
          <p className="font-mono text-muted-foreground">
            Create a service to log events:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/audit.ts

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
}`} />
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">USAGE_EXAMPLES</h2>
          <p className="font-mono text-muted-foreground">
            Log events throughout your application:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// Login event
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
});`} />
      </div>

      {/* Querying Logs */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">QUERYING_LOGS</h2>
          <p className="font-mono text-muted-foreground">
            API endpoint to search and filter audit logs:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/app/api/admin/audit-logs/route.ts

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
}`} />
      </div>

      {/* Log Retention */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">LOG_RETENTION</h2>
          <p className="font-mono text-muted-foreground">
            Set up automatic cleanup of old logs:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// scripts/cleanup-audit-logs.ts

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
// 0 0 * * * npx ts-node scripts/cleanup-audit-logs.ts`} />
      </div>

      {/* Security Alerts */}
      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">SECURITY_ALERTS</h2>
          <p className="font-mono text-muted-foreground">
            Send alerts for critical events:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/lib/audit.ts

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
}`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/security/validation">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">Schema Validation</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Validate all inputs with Zod
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/deployment/database">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono font-semibold">Database Setup</h3>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Set up production database
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
