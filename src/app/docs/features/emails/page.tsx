import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Email with Resend - Fabrk Docs",
  description: "Send transactional emails with Resend. Welcome emails, password resets, notifications, and custom templates.",
};

export default function EmailsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link href="/docs" className="text-primary hover:underline text-sm">
          ← Back to Documentation
        </Link>
      </div>

      <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
        <span className="font-mono text-xs text-muted-foreground">[ [0x40] FEATURES ] EMAILS</span>
      </div>
      <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl mb-4">EMAIL_WITH_RESEND</h1>
      <p className="font-mono text-sm text-muted-foreground mb-8">
        &gt; Production-ready email system with React Email templates, queue-based sending, and beautiful transactional emails.
      </p>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold mb-4">OVERVIEW</h2>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Fabrk uses Resend for email delivery with lightweight HTML templates. The system supports:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lightweight HTML templates for maximum performance</li>
              <li>Dual-mode sending: immediate (auth) and queued (bulk)</li>
              <li>Pre-built templates for common emails</li>
              <li>Zero-dependency template system</li>
              <li>Automatic retry and error handling</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold mb-4">CONFIGURATION</h2>

        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">1</span>
          <h3 className="font-mono text-lg font-medium">SET_UP_RESEND</h3>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">Add your Resend API key to <code className="font-mono bg-muted px-2 py-1">.env.local</code>:</p>
          </div>
        </div>
        <CodeBlock language="bash" code={`RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="Your App <noreply@yourdomain.com>"

EMAIL_FROM="Your App <noreply@yourdomain.com>"`} />

        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">2</span>
          <h3 className="font-mono text-lg font-medium">CONFIGURE_DOMAIN</h3>
        </div>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Set up your sending domain in Resend dashboard:</p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>Go to Resend Dashboard → Domains</li>
              <li>Add your domain (e.g., yourdomain.com)</li>
              <li>Add the DNS records (SPF, DKIM, DMARC)</li>
              <li>Verify domain status</li>
            </ol>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">3</span>
          <h3 className="font-mono text-lg font-medium">START_EMAIL_WORKER</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground">For queued emails, run the worker:</p>
          </div>
        </div>
        <CodeBlock language="bash" code={`npm run email:dev
# Watches queue and sends emails with auto-restart`} />
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold mb-4">EMAIL_TEMPLATES</h2>
        <div className="space-y-4 mb-6">
          <p className="mb-4">Templates are in <code className="font-mono bg-muted px-2 py-1">src/emails/</code>. Pre-built templates include:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><code className="font-mono bg-muted px-1">welcome-html.ts</code> - New user onboarding</li>
            <li><code className="font-mono bg-muted px-1">verify-email.ts</code> - Email verification</li>
            <li><code className="font-mono bg-muted px-1">reset-password.ts</code> - Password reset</li>
            <li><code className="font-mono bg-muted px-1">purchase-confirmation.ts</code> - Purchase receipt</li>
            <li><code className="font-mono bg-muted px-1">subscription-update.ts</code> - Subscription changes</li>
          </ul>
        </div>
        <CodeBlock language="typescript" code={`// src/emails/welcome-html.ts
export interface WelcomeEmailProps {
  name: string;
  licenseKey: string;
  downloadUrl: string;
}

export function generateWelcomeEmailHTML({
  name,
  licenseKey,
  downloadUrl,
}: WelcomeEmailProps): string {
  return \`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Fabrk!</title>
</head>
<body style="margin: 0; padding: 0; font-family: system-ui, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px;">
    <h1>Welcome to Fabrk, \${name}!</h1>
    <p>Thank you for your purchase.</p>

    <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <strong>Your License Key:</strong>
      <code style="display: block; font-size: 18px; margin-top: 10px;">\${licenseKey}</code>
    </div>

    <a href="\${downloadUrl}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
      Download Now
    </a>
  </div>
</body>
</html>
  \`.trim();
}`} />
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold mb-4">CODE_EXAMPLES</h2>

        <h3 className="font-mono text-lg font-medium mb-3">DIRECT_SENDING_AUTH_EMAILS</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">For immediate delivery (verification, password reset):</p>
          </div>
        </div>
        <CodeBlock language="typescript" code={`import { sendVerificationEmail, sendResetEmail } from "@/lib/email";

// Send verification email
await sendVerificationEmail({
  to: user.email,
  name: user.name,
  token: verificationToken,
});

// Send password reset email
await sendResetEmail({
  to: user.email,
  name: user.name,
  resetUrl: \`\${config.app.url}/reset-password?token=\${token}\`,
});`} />

        <h3 className="font-mono text-lg font-medium mb-3">QUEUED_SENDING_TRANSACTIONAL</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">For non-urgent emails (welcome, receipts):</p>
          </div>
        </div>
        <CodeBlock language="typescript" code={`import { queueWelcomeEmail, queueConfirmationEmail } from "@/lib/email";

// Queue welcome email
await queueWelcomeEmail({
  to: user.email,
  name: user.name,
  loginUrl: \`\${config.app.url}/login\`,
});

// Queue payment confirmation
await queueConfirmationEmail({
  to: user.email,
  name: user.name,
  amount: payment.amount,
  productName: payment.productName,
  receiptUrl: payment.receiptUrl,
});`} />

        <h3 className="font-mono text-lg font-medium mb-3">CUSTOM_EMAIL_SENDING</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-muted-foreground">Send any HTML content:</p>
          </div>
        </div>
        <CodeBlock language="typescript" code={`import { Resend } from "resend";
import { env } from "@/lib/env";

const resend = new Resend(env.server.RESEND_API_KEY);

await resend.emails.send({
  from: env.server.EMAIL_FROM,
  to: "user@example.com",
  subject: "Your Custom Subject",
  html: "<h1>Hello World</h1><p>This is a custom email.</p>",
});`} />

        <h3 className="font-mono text-lg font-medium mb-3">BATCH_SENDING</h3>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground">Send to multiple recipients:</p>
          </div>
        </div>
        <CodeBlock language="typescript" code={`import { Resend } from "resend";

const resend = new Resend(env.server.RESEND_API_KEY);

const emails = users.map((user) => ({
  from: env.server.EMAIL_FROM,
  to: user.email,
  subject: "Important Update",
  html: \`<h1>Hello \${user.name}</h1>\`,
}));

// Send up to 100 emails in one API call
await resend.batch.send(emails);`} />
      </section>



      <section className="mb-12">
        <h2 className="font-mono text-lg font-bold mb-4">COMMON_USE_CASES</h2>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">User Onboarding Sequence</h3>
              <p className="text-muted-foreground">
                Queue a series of welcome emails with delays: Day 1 welcome, Day 3 tips, Day 7 feature highlight. Use the job queue for scheduling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Organization Invites</h3>
              <p className="text-muted-foreground">
                Send branded invite emails with accept/decline links. Include inviter name and organization details for context.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Payment Receipts</h3>
              <p className="text-muted-foreground">
                Automatic receipt emails triggered by Stripe webhooks. Include amount, product details, and link to invoice PDF.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Activity Notifications</h3>
              <p className="text-muted-foreground">
                Notify users of important events: new team member joined, project updated, comment received. Respect notification preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-lg font-bold mb-4">BEST_PRACTICES</h2>
        <Card>
          <CardContent className="p-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>Use direct send for auth emails, queue for everything else</li>
              <li>Always include unsubscribe links for marketing emails</li>
              <li>Test emails with real inboxes (Gmail, Outlook) before launch</li>
              <li>Keep subjects under 50 characters for mobile</li>
              <li>Use preheader text for email preview optimization</li>
              <li>Include plain text fallback for accessibility</li>
              <li>Monitor delivery rates in Resend dashboard</li>
              <li>Set up webhooks for bounce and complaint handling</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
