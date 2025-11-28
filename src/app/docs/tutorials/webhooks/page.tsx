import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Webhooks Setup - Fabrk Docs",
  description: "Build production webhooks with HMAC verification, automatic retries, and delivery tracking. 22 built-in event types.",
};

export default function WebhooksTutorialPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Webhooks</h1>
        <p className="text-lg text-muted-foreground">
          Build a production-grade webhook system with 22 event types, HMAC-SHA256 verification, and automatic retries.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">What's Included</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>22 webhook event types across 5 categories</li>
            <li>HMAC-SHA256 signature verification</li>
            <li>Automatic retry with exponential backoff</li>
            <li>Delivery tracking and status monitoring</li>
            <li>Per-organization webhook management</li>
            <li>Event filtering and subscription</li>
          </ul>
        </CardContent>
      </Card>

      {/* Available Events */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Webhook Events</h2>
        <div>
          <p className="text-muted-foreground">
            Events are organized into 5 categories. Subscribe to specific events or entire categories:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// Organization Events
org.member.invited    // Member invited to organization
org.member.added      // Member added to organization
org.member.removed    // Member removed from organization
org.member.role_changed  // Member role changed
org.created           // Organization created
org.updated           // Organization updated
org.deleted           // Organization deleted

// Payment Events
payment.succeeded     // Payment succeeded
payment.failed        // Payment failed

// Subscription Events
subscription.created    // Subscription created
subscription.updated    // Subscription updated
subscription.cancelled  // Subscription cancelled
subscription.expired    // Subscription expired

// API Key Events
api_key.created       // API key created
api_key.revoked       // API key revoked

// Security Events
security.2fa_enabled    // Two-factor authentication enabled
security.2fa_disabled   // Two-factor authentication disabled
security.password_changed  // Password changed`} />
      </div>

      {/* Triggering Webhooks */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Triggering Webhooks</h2>
        <div>
          <p className="text-muted-foreground">
            Trigger webhooks from your application code using{" "}
            <code className="rounded bg-muted px-1 py-0.5">src/lib/webhooks/server.ts</code>:
          </p>
        </div>
        <CodeBlock language="typescript" code={`import { triggerWebhook } from "@/lib/webhooks/server";
import { WEBHOOK_EVENTS } from "@/lib/webhooks/events";

// Trigger when a member is added
await triggerWebhook(
  organizationId,
  WEBHOOK_EVENTS.ORG_MEMBER_ADDED,
  {
    memberId: "mem_123",
    userId: "user_456",
    email: "newmember@example.com",
    role: "MEMBER"
  }
);

// Trigger when payment succeeds
await triggerWebhook(
  organizationId,
  WEBHOOK_EVENTS.PAYMENT_SUCCEEDED,
  {
    paymentId: "pay_789",
    amount: 9900,  // cents
    currency: "usd",
    status: "succeeded"
  }
);

// Trigger subscription update
await triggerWebhook(
  organizationId,
  WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
  {
    subscriptionId: "sub_abc",
    planId: "pro",
    status: "active",
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
);`} />
        <p className="text-sm text-muted-foreground">
          Webhook deliveries are fire-and-forget - they don't block your application code.
        </p>
      </div>

      {/* HMAC Signature Verification */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">HMAC-SHA256 Verification</h2>
        <div>
          <p className="text-muted-foreground">
            All webhooks are signed with HMAC-SHA256. Recipients must verify the signature to ensure authenticity:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// Webhook receiver example (Node.js)

import crypto from "crypto";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("X-Webhook-Signature");
  const event = request.headers.get("X-Webhook-Event");
  const deliveryId = request.headers.get("X-Webhook-Delivery-ID");

  // Your webhook secret (store securely!)
  const secret = process.env.WEBHOOK_SECRET;

  // Compute expected signature
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  // Timing-safe comparison
  const isValid = crypto.timingSafeEquals(
    Buffer.from(signature || ""),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    return new Response("Invalid signature", { status: 401 });
  }

  // Parse and process the webhook
  const data = JSON.parse(payload);
  console.log("Webhook received:", event, data);

  // Process based on event type
  switch (event) {
    case "payment.succeeded":
      await handlePaymentSuccess(data);
      break;
    case "subscription.cancelled":
      await handleSubscriptionCancel(data);
      break;
    // ... handle other events
  }

  return new Response("OK", { status: 200 });
}`} />
      </div>

      {/* Webhook Headers */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Webhook Headers</h2>
        <p className="text-muted-foreground">
          Every webhook delivery includes these headers:
        </p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li><code className="rounded bg-muted px-1 py-0.5">X-Webhook-Signature</code> - HMAC-SHA256 signature</li>
          <li><code className="rounded bg-muted px-1 py-0.5">X-Webhook-Event</code> - Event type (e.g., payment.succeeded)</li>
          <li><code className="rounded bg-muted px-1 py-0.5">X-Webhook-Delivery-ID</code> - Unique delivery ID</li>
          <li><code className="rounded bg-muted px-1 py-0.5">X-Webhook-Retry</code> - Retry attempt number (if retrying)</li>
          <li><code className="rounded bg-muted px-1 py-0.5">Content-Type</code> - application/json</li>
          <li><code className="rounded bg-muted px-1 py-0.5">User-Agent</code> - Fabrk-Webhooks/1.0</li>
        </ul>
      </div>

      {/* Payload Structure */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Payload Structure</h2>
        <div>
          <p className="text-muted-foreground">
            All webhook payloads follow this structure:
          </p>
        </div>
        <CodeBlock language="json" code={`{
  "event": "payment.succeeded",
  "data": {
    "paymentId": "pay_789",
    "amount": 9900,
    "currency": "usd",
    "status": "succeeded"
  },
  "organizationId": "org_123",
  "timestamp": "2024-01-15T10:30:00.000Z"
}`} />
      </div>

      {/* Creating Webhooks API */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Creating Webhooks via API</h2>
        <div>
          <p className="text-muted-foreground">
            Create an API endpoint for managing webhooks:
          </p>
        </div>
        <CodeBlock language="typescript" code={`// src/app/api/v1/webhooks/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateWebhookSecret } from "@/lib/webhooks/server";
import { isValidEvent } from "@/lib/webhooks/events";

// Create a webhook
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, events, organizationId } = await request.json();

  // Validate URL
  try {
    new URL(url);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook URL" },
      { status: 400 }
    );
  }

  // Validate events
  for (const event of events) {
    if (!isValidEvent(event)) {
      return NextResponse.json(
        { error: \`Invalid event: \${event}\` },
        { status: 400 }
      );
    }
  }

  // Generate secret
  const secret = generateWebhookSecret();

  // Create webhook
  const webhook = await prisma.webhook.create({
    data: {
      url,
      events,
      secret,
      organizationId,
      enabled: true,
    },
  });

  return NextResponse.json({
    id: webhook.id,
    url: webhook.url,
    events: webhook.events,
    secret,  // Only returned on creation
    enabled: webhook.enabled,
    createdAt: webhook.createdAt,
  });
}

// List webhooks
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const organizationId = searchParams.get("organizationId");

  const webhooks = await prisma.webhook.findMany({
    where: { organizationId: organizationId || undefined },
    select: {
      id: true,
      url: true,
      events: true,
      enabled: true,
      createdAt: true,
      // Don't return secret!
    },
  });

  return NextResponse.json(webhooks);
}`} />
      </div>

      {/* Retry Logic */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Automatic Retry Logic</h2>
        <p className="text-muted-foreground">
          Failed deliveries are automatically retried with exponential backoff:
        </p>
        <Card>
          <CardContent className="p-6">
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li><strong>Attempt 1:</strong> Immediate</li>
              <li><strong>Retry 1:</strong> After 1 minute</li>
              <li><strong>Retry 2:</strong> After 5 minutes</li>
              <li><strong>Retry 3:</strong> After 15 minutes</li>
              <li><strong>Retry 4:</strong> After 1 hour</li>
              <li><strong>Retry 5:</strong> After 6 hours (max)</li>
            </ul>
            <p className="mt-4 text-sm">
              Maximum 5 attempts total. After 5 failures, the delivery is marked as permanently failed.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Webhooks */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Monitoring & Statistics</h2>
        <div>
          <p className="text-muted-foreground">
            Get webhook statistics for your organization:
          </p>
        </div>
        <CodeBlock language="typescript" code={`import { getWebhookStats } from "@/lib/webhooks/server";

const stats = await getWebhookStats(organizationId);

// Returns:
{
  totalWebhooks: 5,
  activeWebhooks: 4,
  totalDeliveries: 1250,
  successfulDeliveries: 1200,
  failedDeliveries: 50,
  successRate: 96  // percentage
}`} />
      </div>

      {/* Event Categories Helper */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Event Categories Helper</h2>
        <div>
          <p className="text-muted-foreground">
            Use the events helper for UI and validation:
          </p>
        </div>
        <CodeBlock language="typescript" code={`import {
  getAllEvents,
  isValidEvent,
  getEventsByCategory,
  EVENT_DESCRIPTIONS,
  EVENT_CATEGORIES
} from "@/lib/webhooks/events";

// Get all events
const allEvents = getAllEvents();
// ["org.member.invited", "org.member.added", ...]

// Validate an event
if (isValidEvent("payment.succeeded")) {
  // valid
}

// Get events by category
const paymentEvents = getEventsByCategory("payment");
// ["payment.succeeded", "payment.failed"]

// Get description for UI
const description = EVENT_DESCRIPTIONS["payment.succeeded"];
// "Payment succeeded"

// Available categories
// organization, payment, subscription, apiKey, security`} />
      </div>

      {/* Security Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Security Best Practices</h2>
        <Card>
          <CardContent className="p-6">
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                <strong>Always verify signatures</strong> - Never process unverified webhooks
              </li>
              <li>
                <strong>Use timing-safe comparison</strong> - Prevents timing attacks
              </li>
              <li>
                <strong>Store secrets securely</strong> - Use environment variables
              </li>
              <li>
                <strong>Use HTTPS endpoints</strong> - Never accept webhooks over HTTP
              </li>
              <li>
                <strong>Respond quickly</strong> - Return 200 within 10 seconds
              </li>
              <li>
                <strong>Process asynchronously</strong> - Queue heavy processing
              </li>
              <li>
                <strong>Handle duplicates</strong> - Webhooks may be delivered multiple times
              </li>
              <li>
                <strong>Log delivery IDs</strong> - For debugging and deduplication
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Testing Webhooks */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Testing Webhooks</h2>
        <div>
          <p className="text-muted-foreground">
            Use tools like ngrok to test webhooks locally:
          </p>
        </div>
        <CodeBlock language="bash" code={`# Expose local server
ngrok http 3000

# Use the ngrok URL for webhook endpoint
# https://abc123.ngrok.io/api/webhooks/receive

# Trigger a test webhook
curl -X POST http://localhost:3000/api/test-webhook \\
  -H "Content-Type: application/json" \\
  -d '{
    "organizationId": "org_123",
    "event": "payment.succeeded",
    "data": {
      "paymentId": "pay_test",
      "amount": 9900,
      "currency": "usd",
      "status": "succeeded"
    }
  }'`} />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/api-routes">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">API Routes</h3>
                <p className="text-sm text-muted-foreground">
                  Build more API endpoints
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/stripe-payments">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Stripe Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Trigger payment webhooks
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
