/**
 * ✅ FABRK COMPONENT
 * Resend Integration Guide
 */
'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';

export default function ResendIntegrationPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <section className="space-y-4">
        <div className="border-border inline-block border px-4 py-1">
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [INTEGRATION]: RESEND_EMAIL
          </span>
        </div>
        <div className="flex items-start gap-4">
          <div className={cn('bg-primary/10 p-4', mode.radius)}>
            <Mail className="text-primary h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className={cn(mode.font, 'text-3xl font-semibold tracking-tight')}>
              Resend Integration
            </h1>
            <p className={cn(mode.font, 'text-muted-foreground text-base')}>
              Send transactional emails from templates using Resend API.
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader code="0x00" title="OVERVIEW" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Fabrk uses Resend for transactional emails. Use it with Email Templates to send
              welcome emails, notifications, and receipts.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x01" title="SETUP" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <CodeBlock
              code={`# .env.local
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="noreply@yourdomain.com"`}
              language="bash"
              maxHeight="80px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x02" title="SEND EMAIL" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <CodeBlock
              code={`import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Welcome to Fabrk!",
    html: \`<h1>Welcome, \${name}!</h1><p>Thanks for signing up.</p>\`,
  });
}`}
              language="typescript"
              maxHeight="250px"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x03" title="USE WITH TEMPLATES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Import email templates from{' '}
              <Link href="/library/email-templates" className="text-primary hover:underline">
                Email Templates
              </Link>{' '}
              page:
            </p>
            <CodeBlock
              code={`import { WelcomeEmail } from "@/emails/welcome";

await resend.emails.send({
  from: process.env.EMAIL_FROM!,
  to: user.email,
  subject: "Welcome!",
  react: WelcomeEmail({ name: user.name }),
});`}
              language="typescript"
              maxHeight="180px"
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
                  href="/library/docs/integration/posthog"
                  className="text-primary hover:underline"
                >
                  Add PostHog
                </Link>{' '}
                to track email opens and clicks
              </li>
              <li>
                <Link href="/library/email-templates" className="text-primary hover:underline">
                  Browse Email Templates
                </Link>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
