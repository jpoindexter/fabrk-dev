import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Webhooks Setup - Fabrk Docs",
  description: "Build production webhooks with HMAC verification, automatic retries, and delivery tracking. 22 built-in event types.",
};

export default function WebhooksTutorialPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x50] TUTORIALS ] WEBHOOKS_SETUP</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">WEBHOOKS_SETUP</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Build a production-grade webhook system with 22 event types, HMAC-SHA256 verification, and automatic retries.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h3 className="mb-2 font-mono text-xs font-semibold">WHAT'S_INCLUDED</h3>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ 22 webhook event types across 5 categories</div>
            <div>├─ HMAC-SHA256 signature verification</div>
            <div>├─ Automatic retry with exponential backoff</div>
            <div>├─ Delivery tracking and status monitoring</div>
            <div>├─ Per-organization webhook management</div>
            <div>└─ Event filtering and subscription</div>
          </div>
        </CardContent>
      </Card>

      {/* Available Events */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">AVAILABLE_WEBHOOK_EVENTS</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Events are organized into 5 categories. Subscribe to specific events or entire categories:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Triggering Webhooks */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">TRIGGERING_WEBHOOKS</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Trigger webhooks from your application code using{" "}
            <code className="bg-muted px-1 font-mono text-xs">src/lib/webhooks/server.ts</code>:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
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
);`} />
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Webhook deliveries are fire-and-forget - they don't block your application code.
        </p>
      </div>

      {/* HMAC Signature Verification */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">HMAC_SHA256_VERIFICATION</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            All webhooks are signed with HMAC-SHA256. Recipients must verify the signature to ensure authenticity:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// Webhook receiver example (Node.js)

import crypto from "crypto";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("X-Webhook-Signature");
  const event = request.headers.get("X-Webhook-Event");

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

  return new Response("OK", { status: 200 });
}`} />
        </div>
      </div>

      {/* Webhook Headers */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">WEBHOOK_HEADERS</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Every webhook delivery includes these headers:
        </p>
        <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Signature</code> - HMAC-SHA256 signature</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Event</code> - Event type (e.g., payment.succeeded)</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Delivery-ID</code> - Unique delivery ID</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Retry</code> - Retry attempt number (if retrying)</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">Content-Type</code> - application/json</div>
          <div>└─ <code className="bg-muted px-1 font-mono text-xs">User-Agent</code> - Fabrk-Webhooks/1.0</div>
        </div>
      </div>

      {/* Payload Structure */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">PAYLOAD_STRUCTURE</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            All webhook payloads follow this structure:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Retry Logic */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">AUTOMATIC_RETRY_LOGIC</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Failed deliveries are automatically retried with exponential backoff:
        </p>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
              <div>├─ <strong>Attempt 1:</strong> Immediate</div>
              <div>├─ <strong>Retry 1:</strong> After 1 minute</div>
              <div>├─ <strong>Retry 2:</strong> After 5 minutes</div>
              <div>├─ <strong>Retry 3:</strong> After 15 minutes</div>
              <div>├─ <strong>Retry 4:</strong> After 1 hour</div>
              <div>└─ <strong>Retry 5:</strong> After 6 hours (max)</div>
            </div>
            <p className="mt-3 font-mono text-xs">
              Maximum 5 attempts total. After 5 failures, the delivery is marked as permanently failed.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Security Best Practices */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">SECURITY_BEST_PRACTICES</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
              <div>├─ <strong>Always verify signatures</strong> - Never process unverified webhooks</div>
              <div>├─ <strong>Use timing-safe comparison</strong> - Prevents timing attacks</div>
              <div>├─ <strong>Store secrets securely</strong> - Use environment variables</div>
              <div>├─ <strong>Use HTTPS endpoints</strong> - Never accept webhooks over HTTP</div>
              <div>├─ <strong>Respond quickly</strong> - Return 200 within 10 seconds</div>
              <div>├─ <strong>Process asynchronously</strong> - Queue heavy processing</div>
              <div>├─ <strong>Handle duplicates</strong> - Webhooks may be delivered multiple times</div>
              <div>└─ <strong>Log delivery IDs</strong> - For debugging and deduplication</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testing Webhooks */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">TESTING_WEBHOOKS</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Use tools like ngrok to test webhooks locally:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
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
      </div>

      {/* Next Steps */}
      <div className="space-y-3">
        <h2 className="font-mono text-lg font-bold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/api-routes">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-xs font-semibold">API_ROUTES</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Build more API endpoints
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/stripe-payments">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-xs font-semibold">STRIPE_PAYMENTS</h3>
                <p className="font-mono text-xs text-muted-foreground">
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
