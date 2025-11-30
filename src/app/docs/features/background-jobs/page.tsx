import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Clock, RefreshCw, Mail, Database } from "lucide-react";

export const metadata = {
  title: "Background Jobs - Fabrk Documentation",
  description: "Learn how to implement background job processing with queues, workers, and the email worker system.",
};

export default function BackgroundJobsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Features"
      title="Background_Jobs"
      description="Process time-consuming tasks asynchronously with job queues, workers, and the email worker system."
      overview="Background jobs allow you to offload time-consuming tasks from your API routes to dedicated workers. This improves response times and provides better reliability with automatic retries and error handling."
      features={[
        { icon: Database, title: "Job Queues", description: "Persistent queue with priority support for organizing tasks." },
        { icon: RefreshCw, title: "Workers", description: "Process jobs asynchronously with dedicated worker processes." },
        { icon: Mail, title: "Email Worker", description: "Dedicated email sending queue with template support." },
        { icon: Clock, title: "Retries", description: "Automatic retry with exponential backoff on failures." },
      ]}
      usage={[
        {
          title: "Database Schema",
          description: "Job model in Prisma schema",
          code: `// prisma/schema.prisma
model Job {
  id          String   @id @default(cuid())
  queue       String   // "default", "email", "webhooks"
  type        String   // Job type identifier
  payload     Json     // Job data

  status      String   @default("pending") // pending, processing, completed, failed
  priority    Int      @default(0)

  attempts    Int      @default(0)
  maxAttempts Int      @default(3)

  error       String?  // Last error message
  result      Json?    // Job result

  runAt       DateTime @default(now())
  startedAt   DateTime?
  completedAt DateTime?

  createdAt   DateTime @default(now())

  @@index([queue, status, runAt])
  @@index([status, runAt])
}`,
          language: "prisma",
        },
        {
          title: "Job Queue Service",
          description: "Core service for managing job queues",
          code: `// src/lib/jobs/queue.ts
import { prisma } from "@/lib/db";

interface JobOptions {
  queue?: string;
  priority?: number;
  delay?: number; // milliseconds
  maxAttempts?: number;
}

export async function enqueueJob(
  type: string,
  payload: Record<string, any>,
  options: JobOptions = {}
) {
  const {
    queue = "default",
    priority = 0,
    delay = 0,
    maxAttempts = 3,
  } = options;

  const runAt = new Date(Date.now() + delay);

  const job = await prisma.job.create({
    data: {
      queue,
      type,
      payload,
      priority,
      maxAttempts,
      runAt,
    },
  });

  return job;
}

export async function getNextJob(queue: string = "default") {
  // Get the next pending job that's ready to run
  const job = await prisma.job.findFirst({
    where: {
      queue,
      status: "pending",
      runAt: { lte: new Date() },
    },
    orderBy: [
      { priority: "desc" },
      { createdAt: "asc" },
    ],
  });

  if (!job) return null;

  // Mark as processing
  return prisma.job.update({
    where: { id: job.id },
    data: {
      status: "processing",
      startedAt: new Date(),
      attempts: { increment: 1 },
    },
  });
}

export async function completeJob(
  jobId: string,
  result?: Record<string, any>
) {
  return prisma.job.update({
    where: { id: jobId },
    data: {
      status: "completed",
      completedAt: new Date(),
      result,
    },
  });
}

export async function failJob(
  jobId: string,
  error: string
) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) return;

  // Check if we should retry
  if (job.attempts < job.maxAttempts) {
    // Exponential backoff: 1min, 2min, 4min...
    const delay = Math.pow(2, job.attempts) * 60 * 1000;

    return prisma.job.update({
      where: { id: jobId },
      data: {
        status: "pending",
        runAt: new Date(Date.now() + delay),
        error,
      },
    });
  }

  // Max retries exceeded
  return prisma.job.update({
    where: { id: jobId },
    data: {
      status: "failed",
      error,
    },
  });
}`,
          language: "typescript",
        },
        {
          title: "Worker Implementation",
          description: "Create workers to process jobs",
          code: `// scripts/worker.ts
import { getNextJob, completeJob, failJob } from "@/lib/jobs/queue";

// Job handlers
const handlers: Record<string, (payload: any) => Promise<any>> = {
  "send-welcome-email": async (payload) => {
    const { userId, email } = payload;
    await sendWelcomeEmail(email);
    return { sent: true };
  },

  "process-payment": async (payload) => {
    const { paymentId } = payload;
    // Process payment logic...
    return { processed: true };
  },

  "generate-report": async (payload) => {
    const { userId, reportType } = payload;
    // Generate report logic...
    return { reportUrl: "/reports/123.pdf" };
  },

  "webhook-delivery": async (payload) => {
    const { webhookId, event, data } = payload;
    // Deliver webhook logic...
    return { delivered: true };
  },
};

async function processJobs(queue: string = "default") {
  console.log(\`Worker started for queue: \${queue}\`);

  while (true) {
    const job = await getNextJob(queue);

    if (!job) {
      // No jobs, wait before polling again
      await sleep(1000);
      continue;
    }

    console.log(\`Processing job \${job.id}: \${job.type}\`);

    try {
      const handler = handlers[job.type];

      if (!handler) {
        throw new Error(\`Unknown job type: \${job.type}\`);
      }

      const result = await handler(job.payload);
      await completeJob(job.id, result);

      console.log(\`Completed job \${job.id}\`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      await failJob(job.id, message);

      console.error(\`Failed job \${job.id}: \${message}\`);
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Start worker
processJobs(process.env.QUEUE || "default");`,
          language: "typescript",
        },
        {
          title: "Email Worker",
          description: "Dedicated worker for processing email queue",
          code: `// scripts/email-worker.ts
import { Resend } from "resend";
import { getNextJob, completeJob, failJob } from "@/lib/jobs/queue";
import { WelcomeEmail } from "@/emails/welcome";
import { PasswordResetEmail } from "@/emails/password-reset";
import { InvoiceEmail } from "@/emails/invoice";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplates: Record<string, React.ComponentType<any>> = {
  welcome: WelcomeEmail,
  "password-reset": PasswordResetEmail,
  invoice: InvoiceEmail,
};

async function processEmailQueue() {
  console.log("Email worker started");

  while (true) {
    const job = await getNextJob("email");

    if (!job) {
      await sleep(1000);
      continue;
    }

    const { template, to, subject, props } = job.payload;

    try {
      const EmailTemplate = emailTemplates[template];

      if (!EmailTemplate) {
        throw new Error(\`Unknown email template: \${template}\`);
      }

      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to,
        subject,
        react: EmailTemplate(props),
      });

      if (error) {
        throw new Error(error.message);
      }

      await completeJob(job.id, { emailId: data?.id });
      console.log(\`Email sent to \${to}\`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      await failJob(job.id, message);
      console.error(\`Failed to send email: \${message}\`);
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

processEmailQueue();`,
          language: "typescript",
        },
        {
          title: "Queueing Jobs",
          description: "Queue jobs from your API routes",
          code: `// In API routes
import { enqueueJob } from "@/lib/jobs/queue";

// Queue an email
export async function POST(req: Request) {
  const { email, name } = await req.json();

  // Create user...
  const user = await prisma.user.create({ ... });

  // Queue welcome email (processed by email worker)
  await enqueueJob(
    "send-email",
    {
      template: "welcome",
      to: email,
      subject: "Welcome to Fabrk!",
      props: { name },
    },
    { queue: "email" }
  );

  return Response.json({ user });
}

// Queue a report with delay
await enqueueJob(
  "generate-report",
  {
    userId: user.id,
    reportType: "monthly",
  },
  {
    queue: "default",
    delay: 5000, // Wait 5 seconds
    priority: 10, // Higher priority
  }
);

// Queue webhook delivery
await enqueueJob(
  "webhook-delivery",
  {
    webhookId: webhook.id,
    event: "user.created",
    data: { userId: user.id },
  },
  {
    queue: "webhooks",
    maxAttempts: 5,
  }
);`,
          language: "typescript",
        },
        {
          title: "Running Workers",
          description: "Start workers for different queues",
          code: `# Development (with auto-restart)
npm run jobs:dev        # Default queue worker
npm run email:dev       # Email queue worker

# Production
node scripts/worker.js
QUEUE=email node scripts/worker.js
QUEUE=webhooks node scripts/worker.js

# Docker Compose example
# docker-compose.yml
services:
  app:
    build: .
    command: npm start

  worker-default:
    build: .
    command: node scripts/worker.js
    environment:
      - QUEUE=default

  worker-email:
    build: .
    command: node scripts/worker.js
    environment:
      - QUEUE=email

  worker-webhooks:
    build: .
    command: node scripts/worker.js
    environment:
      - QUEUE=webhooks`,
          language: "bash",
        },
      ]}
      previous={{ title: "Realtime", href: "/docs/features/realtime" }}
      next={{ title: "Analytics", href: "/docs/features/analytics" }}
    >
      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST_PRACTICES">
          <ul className="font-mono text-sm text-muted-foreground space-y-1">
            <li>├─ <strong>Keep payloads small:</strong> Store IDs and fetch data in the worker</li>
            <li>├─ <strong>Make jobs idempotent:</strong> Safe to retry without side effects</li>
            <li>├─ <strong>Set appropriate retries:</strong> More for transient errors, fewer for permanent</li>
            <li>├─ <strong>Monitor queue depth:</strong> Alert when jobs are backing up</li>
            <li>├─ <strong>Use separate queues:</strong> Isolate critical jobs from bulk operations</li>
            <li>├─ <strong>Log everything:</strong> Track job lifecycle for debugging</li>
            <li>├─ <strong>Handle timeouts:</strong> Set reasonable timeouts for long-running jobs</li>
            <li>└─ <strong>Clean up completed jobs:</strong> Archive or delete old jobs periodically</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
