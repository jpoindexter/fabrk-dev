/**
 * ✅ FABRK COMPONENT
 * Polar.sh Integration Guide
 */
'use client';

import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

export default function PolarIntegrationPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <section className="space-y-4">
        <div className="border-border inline-block border px-4 py-1">
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [INTEGRATION]: POLAR_PAYMENTS
          </span>
        </div>
        <div className="flex items-start gap-4">
          <div className={cn('bg-primary/10 p-4', mode.radius)}>
            <CreditCard className="text-primary h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className={cn(mode.font, 'text-3xl font-semibold tracking-tight')}>
              Polar.sh Integration
            </h1>
            <p className={cn(mode.font, 'text-muted-foreground text-base')}>
              Add subscription management and payments to billing templates.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader code="0x00" title="OVERVIEW" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Fabrk uses Polar.sh for subscription billing. Configure it to enable the Billing
              Dashboard and Pricing Page templates.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x01" title="ENVIRONMENT VARIABLES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <CodeBlock
              code={`# .env.local
POLAR_ACCESS_TOKEN="your-polar-access-token"
POLAR_WEBHOOK_SECRET="your-webhook-secret"
NEXT_PUBLIC_POLAR_ORGANIZATION_ID="your-org-id"`}
              language="bash"
              maxHeight="120px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x02" title="CREATE CHECKOUT SESSION" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <CodeBlock
              code={`// app/api/polar/checkout/route.ts
import { polar } from "@/lib/polar";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceId } = await req.json();

  const checkout = await polar.checkouts.create({
    priceId,
    customerEmail: session.user.email,
    successUrl: \`\${process.env.NEXT_PUBLIC_URL}/billing?success=true\`,
  });

  return Response.json({ url: checkout.url });
}`}
              language="typescript"
              maxHeight="350px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x03" title="WEBHOOK HANDLER" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Handle subscription events in{' '}
              <code className="bg-muted px-1">app/api/webhooks/polar/route.ts</code>
            </p>
            <CodeBlock
              code={`import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const event = await req.json();

  if (event.type === "checkout.completed") {
    await prisma.payment.create({
      data: {
        userId: event.data.customerId,
        amount: event.data.amount,
        status: "completed",
      },
    });
  }

  return Response.json({ received: true });
}`}
              language="typescript"
              maxHeight="300px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x04" title="NEXT STEPS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
              <li>
                <Link
                  href="/library/docs/integration/resend"
                  className="text-primary hover:underline"
                >
                  Add Resend
                </Link>{' '}
                to send payment confirmation emails
              </li>
              <li>
                <Link href="/library/billing-dashboard" className="text-primary hover:underline">
                  View Billing Dashboard template
                </Link>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
