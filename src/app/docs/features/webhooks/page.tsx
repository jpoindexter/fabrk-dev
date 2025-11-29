import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Webhooks System - Fabrk Documentation",
  description: "Learn how to use the production-grade webhooks system with 22 event types, HMAC verification, and automatic retries.",
};

export default function WebhooksPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Documentation
        </Link>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x70] FEATURES ] WEBHOOKS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">WEBHOOKS_SYSTEM</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Production-grade webhook system with 22 event types, HMAC-SHA256 signature verification, and automatic retry with exponential backoff.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold mb-4">OVERVIEW</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            The webhooks system allows your application to send HTTP callbacks to external services when
            specific events occur. This is essential for integrating with third-party services, triggering
            external workflows, and keeping systems in sync.
          </p>
          <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>22 Event Types:</strong> User, payment, organization, and system events</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>HMAC-SHA256 Verification:</strong> Secure signature verification for all deliveries</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Automatic Retries:</strong> Exponential backoff with configurable retry limits</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Delivery Tracking:</strong> Full history of webhook deliveries and responses</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold mb-4">EVENT_TYPES</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Available webhook event types organized by category:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-mono font-semibold mb-2">USER_EVENTS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
                <li>user.created</li>
                <li>user.updated</li>
                <li>user.deleted</li>
                <li>user.email_verified</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono font-semibold mb-2">PAYMENT_EVENTS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
                <li>payment.completed</li>
                <li>payment.failed</li>
                <li>subscription.created</li>
                <li>subscription.cancelled</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono font-semibold mb-2">ORGANIZATION_EVENTS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
                <li>organization.created</li>
                <li>organization.updated</li>
                <li>member.invited</li>
                <li>member.joined</li>
                <li>member.removed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono font-semibold mb-2">SYSTEM_EVENTS</h3>
              <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
                <li>webhook.test</li>
                <li>api_key.created</li>
                <li>api_key.revoked</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold mb-4">CREATING_WEBHOOKS</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Register a webhook endpoint to receive events:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// API Route: POST /api/v1/webhooks
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateWebhookSecret } from "@/lib/webhooks/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, events, description } = await req.json();

  // Generate a unique secret for this webhook
  const secret = generateWebhookSecret();

  const webhook = await prisma.webhook.create({
    data: {
      url,
      events,
      description,
      secret,
      userId: session.user.id,
      isActive: true,
    },
  });

  return Response.json({
    id: webhook.id,
    url: webhook.url,
    events: webhook.events,
    secret: webhook.secret, // Show once on creation
  });
}`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold mb-4">SENDING_WEBHOOKS</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Trigger webhook deliveries from your application:
          </p>
        </div>
        <CodeBlock language="json" code={`// src/lib/webhooks/server.ts
import crypto from "crypto";
import { prisma } from "@/lib/db";

export async function sendWebhook(
  event: string,
  payload: Record<string, any>,
  userId?: string
) {
  // Find all active webhooks subscribed to this event
  const webhooks = await prisma.webhook.findMany({
    where: {
      isActive: true,
      events: { has: event },
      ...(userId && { userId }),
    },
  });

  for (const webhook of webhooks) {
    await deliverWebhook(webhook, event, payload);
  }
}

async function deliverWebhook(
  webhook: Webhook,
  event: string,
  payload: Record<string, any>
) {
  const body = JSON.stringify({
    event,
    payload,
    timestamp: new Date().toISOString(),
  });

  // Generate HMAC signature
  const signature = crypto
    .createHmac("sha256", webhook.secret)
    .update(body)
    .digest("hex");

  try {
    const response = await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": signature,
        "X-Webhook-Event": event,
      },
      body,
    });

    // Log delivery
    await prisma.webhookDelivery.create({
      data: {
        webhookId: webhook.id,
        event,
        payload,
        statusCode: response.status,
        success: response.ok,
      },
    });
  } catch (error) {
    // Queue for retry
    await queueWebhookRetry(webhook.id, event, payload);
  }
}

// Usage in your code
await sendWebhook("user.created", {
  id: user.id,
  email: user.email,
  name: user.name,
});`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold mb-4">VERIFYING_WEBHOOKS_RECEIVER_SIDE</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            When receiving webhooks, always verify the signature:
          </p>
        </div>
        <CodeBlock language="bash" code={`// In your webhook receiver endpoint
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("X-Webhook-Signature");
  const event = req.headers.get("X-Webhook-Event");

  // Your webhook secret (stored securely)
  const secret = process.env.WEBHOOK_SECRET!;

  // Verify signature using timing-safe comparison
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  const isValid = crypto.timingSafeEquals(
    Buffer.from(signature || ""),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Process the webhook
  const data = JSON.parse(body);
  console.log(\`Received \${event}:\`, data.payload);

  return Response.json({ received: true });
}`} />
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="font-mono text-lg font-bold mb-4">RETRY_LOGIC</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Failed webhooks are automatically retried with exponential backoff:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 5,
  initialDelay: 60,    // 1 minute
  maxDelay: 3600,      // 1 hour
  backoffMultiplier: 2,
};

// Retry delays: 1min, 2min, 4min, 8min, 16min

async function queueWebhookRetry(
  webhookId: string,
  event: string,
  payload: Record<string, any>,
  attempt: number = 1
) {
  if (attempt > RETRY_CONFIG.maxRetries) {
    // Mark webhook as failed after max retries
    await prisma.webhookDelivery.update({
      where: { id: deliveryId },
      data: { status: "FAILED" },
    });
    return;
  }

  const delay = Math.min(
    RETRY_CONFIG.initialDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt - 1),
    RETRY_CONFIG.maxDelay
  );

  // Schedule retry (using your job queue)
  await scheduleJob("webhook:retry", {
    webhookId,
    event,
    payload,
    attempt: attempt + 1,
  }, { delay: delay * 1000 });
}`} />
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold mb-4">SECURITY_BEST_PRACTICES</h2>
          <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Always verify signatures:</strong> Use HMAC-SHA256 with timing-safe comparison</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Use HTTPS only:</strong> Never send webhooks to HTTP endpoints</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Rotate secrets:</strong> Allow users to regenerate webhook secrets</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Validate payloads:</strong> Sanitize and validate all webhook payloads</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Set timeouts:</strong> Use short timeouts (5-10s) for webhook deliveries</li>
            <li className="font-mono text-sm text-muted-foreground leading-relaxed"><strong>Log everything:</strong> Track all deliveries for debugging and audit</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
