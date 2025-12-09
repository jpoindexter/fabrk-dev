import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard, DocsLinkCard } from '@/components/docs';
import { Webhook, Shield, RefreshCw, Bell } from 'lucide-react';

export const metadata = {
  title: 'Webhooks Setup - Fabrk Docs',
  description:
    'Build production webhooks with HMAC verification, automatic retries, and delivery tracking. 22 built-in event types.',
};

export default function WebhooksTutorialPage() {
  return (
    <FeatureGuideTemplate
      code="[0x50]"
      category="Tutorials"
      title="Webhooks_Setup"
      description="Build a production-grade webhook system with 22 event types, HMAC-SHA256 verification, and automatic retries."
      overview="22 webhook event types across 5 categories, HMAC-SHA256 signature verification, automatic retry with exponential backoff, delivery tracking and status monitoring, per-organization webhook management."
      features={[
        {
          icon: Webhook,
          title: '22 Events',
          description: 'Event types across 5 categories.',
        },
        {
          icon: Shield,
          title: 'HMAC-SHA256',
          description: 'Signature verification for security.',
        },
        {
          icon: RefreshCw,
          title: 'Auto Retry',
          description: 'Exponential backoff on failures.',
        },
        {
          icon: Bell,
          title: 'Tracking',
          description: 'Delivery status monitoring.',
        },
      ]}
      usage={[
        {
          title: 'Triggering Webhooks',
          description: 'Use src/lib/webhooks/server.ts to trigger events',
          code: `import { triggerWebhook } from "@/lib/webhooks/server";
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
);`,
          language: 'typescript',
        },
        {
          title: 'HMAC Signature Verification',
          description: 'Verify webhook signatures in your receiver',
          code: `import crypto from "crypto";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("X-Webhook-Signature");

  const secret = process.env.WEBHOOK_SECRET;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const isValid = crypto.timingSafeEquals(
    Buffer.from(signature || ""),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    return new Response("Invalid signature", { status: 401 });
  }

  const data = JSON.parse(payload);
  return new Response("OK", { status: 200 });
}`,
          language: 'typescript',
        },
        {
          title: 'Testing Webhooks',
          description: 'Use ngrok to test webhooks locally',
          code: `# Expose local server
ngrok http 3000

# Trigger a test webhook
curl -X POST http://localhost:3000/api/test-webhook \\
  -H "Content-Type: application/json" \\
  -d '{"event": "payment.succeeded"}'`,
          language: 'bash',
        },
      ]}
      previous={{
        title: 'Stripe Payments',
        href: '/docs/tutorials/stripe-payments',
      }}
      next={{ title: 'API Routes', href: '/docs/tutorials/api-routes' }}
    >
      <DocsSection title="Webhook Headers">
        <DocsCard title="HEADERS">
          <div className="space-y-1">
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Signature</code> -
              HMAC-SHA256 signature
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Event</code> - Event
              type
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Delivery-ID</code> -
              Unique delivery ID
            </div>
            <div>
              ├─ <code className="bg-muted px-1 font-mono text-xs">X-Webhook-Retry</code> - Retry
              attempt number
            </div>
            <div>
              └─ <code className="bg-muted px-1 font-mono text-xs">User-Agent</code> -
              Fabrk-Webhooks/1.0
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Retry Schedule">
        <DocsCard title="RETRY_SCHEDULE">
          <div className="space-y-1">
            <div>
              ├─ <strong>Attempt 1:</strong> Immediate
            </div>
            <div>
              ├─ <strong>Retry 1:</strong> After 1 minute
            </div>
            <div>
              ├─ <strong>Retry 2:</strong> After 5 minutes
            </div>
            <div>
              ├─ <strong>Retry 3:</strong> After 15 minutes
            </div>
            <div>
              ├─ <strong>Retry 4:</strong> After 1 hour
            </div>
            <div>
              └─ <strong>Retry 5:</strong> After 6 hours (max)
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/api-routes"
            title="API Routes"
            description="Build more API endpoints"
          />
          <DocsLinkCard
            href="/docs/tutorials/stripe-payments"
            title="Stripe Payments"
            description="Trigger payment webhooks"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
