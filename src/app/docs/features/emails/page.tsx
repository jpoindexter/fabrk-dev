import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Email with Resend - Fabrk Docs",
  description: "Send transactional emails with Resend. Welcome emails, password resets, notifications, and custom templates.",
};

export default function EmailsPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x40] FEATURES ] EMAILS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">EMAIL_WITH_RESEND</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Production-ready email system with React Email templates, queue-based sending, and beautiful transactional emails.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">OVERVIEW</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <p className="font-mono text-sm text-muted-foreground mb-4">
              Fabrk uses Resend for email delivery with lightweight HTML templates. The system supports:
            </p>
            <ul className="font-mono text-sm text-muted-foreground space-y-1">
              <li>├─ Lightweight HTML templates for maximum performance</li>
              <li>├─ Dual-mode sending: immediate (auth) and queued (bulk)</li>
              <li>├─ Pre-built templates for common emails</li>
              <li>├─ Zero-dependency template system</li>
              <li>└─ Automatic retry and error handling</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CONFIGURATION</h2>

        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">1</span>
          <h3 className="font-mono text-base font-semibold text-foreground">SET_UP_RESEND</h3>
        </div>
        <p className="font-mono text-sm text-muted-foreground mb-3">
          Add your Resend API key to <code className="bg-muted px-1.5 py-0.5 font-mono text-xs">.env.local</code>:
        </p>
        <CodeBlock language="bash" code={`RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="Your App <noreply@yourdomain.com>"

EMAIL_FROM="Your App <noreply@yourdomain.com>"`} />

        <div className="flex items-center gap-2 mb-3 mt-6">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">2</span>
          <h3 className="font-mono text-base font-semibold text-foreground">CONFIGURE_DOMAIN</h3>
        </div>
        <Card className="rounded-none mb-6">
          <CardContent className="p-6">
            <p className="font-mono text-sm text-muted-foreground mb-3">Set up your sending domain in Resend dashboard:</p>
            <ul className="font-mono text-sm text-muted-foreground space-y-1">
              <li>├─ Go to Resend Dashboard → Domains</li>
              <li>├─ Add your domain (e.g., yourdomain.com)</li>
              <li>├─ Add the DNS records (SPF, DKIM, DMARC)</li>
              <li>└─ Verify domain status</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-6 w-6 items-center justify-center bg-primary text-xs font-mono font-bold text-primary-foreground">3</span>
          <h3 className="font-mono text-base font-semibold text-foreground">START_EMAIL_WORKER</h3>
        </div>
        <p className="font-mono text-sm text-muted-foreground mb-3">
          For queued emails, run the worker:
        </p>
        <CodeBlock language="bash" code={`npm run email:dev
# Watches queue and sends emails with auto-restart`} />
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">EMAIL_TEMPLATES</h2>
        <p className="font-mono text-sm text-muted-foreground mb-3">
          Templates are in <code className="bg-muted px-1.5 py-0.5 font-mono text-xs">src/emails/</code>. Pre-built templates include:
        </p>
        <ul className="font-mono text-sm text-muted-foreground space-y-1 mb-6">
          <li>├─ <code className="bg-muted px-1 text-xs">welcome-html.ts</code> - New user onboarding</li>
          <li>├─ <code className="bg-muted px-1 text-xs">verify-email.ts</code> - Email verification</li>
          <li>├─ <code className="bg-muted px-1 text-xs">reset-password.ts</code> - Password reset</li>
          <li>├─ <code className="bg-muted px-1 text-xs">purchase-confirmation.ts</code> - Purchase receipt</li>
          <li>└─ <code className="bg-muted px-1 text-xs">subscription-update.ts</code> - Subscription changes</li>
        </ul>
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

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CODE_EXAMPLES</h2>

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">DIRECT_SENDING_AUTH_EMAILS</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">For immediate delivery (verification, password reset):</p>
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

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">QUEUED_SENDING_TRANSACTIONAL</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">For non-urgent emails (welcome, receipts):</p>
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

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">CUSTOM_EMAIL_SENDING</h3>
        <div className="space-y-4 mb-6">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">Send any HTML content:</p>
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

        <h3 className="font-mono text-base font-semibold text-foreground mb-3">BATCH_SENDING</h3>
        <div className="space-y-4">
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">Send to multiple recipients:</p>
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



      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">COMMON_USE_CASES</h2>

        <div className="grid gap-4">
          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">User Onboarding Sequence</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Queue a series of welcome emails with delays: Day 1 welcome, Day 3 tips, Day 7 feature highlight. Use the job queue for scheduling.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">Organization Invites</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Send branded invite emails with accept/decline links. Include inviter name and organization details for context.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">Payment Receipts</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Automatic receipt emails triggered by Stripe webhooks. Include amount, product details, and link to invoice PDF.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="p-6">
              <h3 className="font-mono text-base font-semibold text-foreground mb-2">Activity Notifications</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Notify users of important events: new team member joined, project updated, comment received. Respect notification preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">BEST_PRACTICES</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <ul className="font-mono text-sm text-muted-foreground space-y-1 pl-4">
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
