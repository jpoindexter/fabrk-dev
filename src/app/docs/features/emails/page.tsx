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

      <h1 className="text-4xl font-bold mb-4">Email System with Resend</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Production-ready email system with React Email templates, queue-based sending, and beautiful transactional emails.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
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
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>

        <h3 className="text-xl font-medium mb-3">1. Set Up Resend</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Add your Resend API key to <code className="bg-muted px-2 py-1 rounded">.env.local</code>:</p>
            <CodeBlock language="bash" code={`RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="Your App <noreply@yourdomain.com>"

EMAIL_FROM="Your App <noreply@yourdomain.com>"`} />
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">2. Configure Domain</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Set up your sending domain in Resend dashboard:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Go to Resend Dashboard → Domains</li>
              <li>Add your domain (e.g., yourdomain.com)</li>
              <li>Add the DNS records (SPF, DKIM, DMARC)</li>
              <li>Verify domain status</li>
            </ol>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">3. Start Email Worker</h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">For queued emails, run the worker:</p>
            <CodeBlock language="bash" code={`npm run email:dev
# Watches queue and sends emails with auto-restart`} />
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Email Templates</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Templates are in <code className="bg-muted px-2 py-1 rounded">src/emails/</code>. Pre-built templates include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><code className="bg-muted px-1 rounded">welcome-html.ts</code> - New user onboarding</li>
              <li><code className="bg-muted px-1 rounded">verify-email.ts</code> - Email verification</li>
              <li><code className="bg-muted px-1 rounded">reset-password.ts</code> - Password reset</li>
              <li><code className="bg-muted px-1 rounded">purchase-confirmation.ts</code> - Purchase receipt</li>
              <li><code className="bg-muted px-1 rounded">subscription-update.ts</code> - Subscription changes</li>
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
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>

        <h3 className="text-xl font-medium mb-3">Direct Sending (Auth Emails)</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">For immediate delivery (verification, password reset):</p>
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
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Queued Sending (Transactional)</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">For non-urgent emails (welcome, receipts):</p>
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
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Custom Email Sending</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Send any HTML content:</p>
            <CodeBlock language="typescript" code={`import { Resend } from "resend";
import { env } from "@/lib/env";

const resend = new Resend(env.server.RESEND_API_KEY);

await resend.emails.send({
  from: env.server.EMAIL_FROM,
  to: "user@example.com",
  subject: "Your Custom Subject",
  html: "<h1>Hello World</h1><p>This is a custom email.</p>",
});`} />
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Batch Sending</h3>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">Send to multiple recipients:</p>
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
          </CardContent>
        </Card>
      </section>



      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>

        <div className="grid gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">User Onboarding Sequence</h3>
              <p className="text-muted-foreground">
                Queue a series of welcome emails with delays: Day 1 welcome, Day 3 tips, Day 7 feature highlight. Use the job queue for scheduling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Organization Invites</h3>
              <p className="text-muted-foreground">
                Send branded invite emails with accept/decline links. Include inviter name and organization details for context.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Payment Receipts</h3>
              <p className="text-muted-foreground">
                Automatic receipt emails triggered by Stripe webhooks. Include amount, product details, and link to invoice PDF.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Activity Notifications</h3>
              <p className="text-muted-foreground">
                Notify users of important events: new team member joined, project updated, comment received. Respect notification preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <Card>
          <CardContent className="pt-6">
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
