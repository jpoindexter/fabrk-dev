import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Email Templates - Fabrk Docs",
  description: "Create beautiful transactional emails. Pre-built templates for verification, password reset, and welcome emails.",
};

export default function EmailTemplatesTutorialPage() {
  return (
    <div className="space-y-16">
      <div className="space-y-2">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x40] TUTORIALS ] EMAIL_TEMPLATES</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">EMAIL_TEMPLATES</h1>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Create and send beautiful transactional emails with Resend and lightweight HTML templates.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h3 className="mb-2 font-mono text-base font-semibold text-foreground">What's Included</h3>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ Resend API integration for reliable email delivery</div>
            <div>├─ Lightweight HTML templates for maximum performance</div>
            <div>├─ Direct sending for immediate emails (auth)</div>
            <div>├─ Queue system for background sending (notifications)</div>
            <div>├─ Pre-built templates (welcome, verification, reset)</div>
            <div>└─ Email tracking and delivery status</div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Setup */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">BASIC_SETUP</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Configure your Resend API key to start sending emails. Sign up at{" "}
            <a
              href="https://resend.com"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              resend.com
            </a>{" "}
            and get your API key.
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="bash" code={`# .env.local

RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"`} />
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          Without a Resend API key, emails will be logged to the console in development mode.
        </p>
      </div>

      {/* Email Service Functions */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">SENDING_EMAILS</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Use the email service functions from{" "}
            <code className="bg-muted px-1 font-mono text-xs">src/lib/email.ts</code>:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`import {
  sendEmail,
  sendWelcomeEmail,
  sendVerificationEmail,
  sendResetEmail
} from "@/lib/email";

// Generic email
await sendEmail(
  "user@example.com",
  "Your Subject",
  "<h1>HTML Content</h1>"
);

// Welcome email (after purchase)
await sendWelcomeEmail(
  "user@example.com",
  "John Doe",
  "LICENSE-KEY-123"  // optional
);

// Email verification
await sendVerificationEmail(
  "user@example.com",
  "verification-token-abc"
);

// Password reset
await sendResetEmail(
  "user@example.com",
  "reset-token-xyz"
);`} />
        </div>
      </div>

      {/* Queue System */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">EMAIL_QUEUE_SYSTEM</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            For non-critical emails (notifications, bulk), use the queue system for background sending
            with automatic retries:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`import {
  queueEmail,
  queueWelcomeEmail,
  queueVerificationEmail
} from "@/lib/email";

// Queue a custom email
await queueEmail({
  type: "NOTIFICATION",
  to: "user@example.com",
  subject: "New Feature Available",
  html: "<p>Check out our new feature!</p>",
  userId: "user_123",  // optional tracking
  maxAttempts: 3       // retry count
});

// Queue welcome email with GitHub access
await queueWelcomeEmail({
  to: "user@example.com",
  name: "John Doe",
  licenseKey: "LICENSE-123-ABC",
  githubRepoUrl: "https://github.com/org/repo",
  githubUsername: "johndoe",
  purchaseId: "purchase_456"
});`} />
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          Run the email worker with <code className="bg-muted px-1 font-mono text-xs">npm run email:dev</code> to process queued emails.
        </p>
      </div>

      {/* Creating Custom Templates */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">CREATING_CUSTOM_EMAIL_TEMPLATES</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Create HTML template functions in <code className="bg-muted px-1 font-mono text-xs">src/emails/</code>.
            This approach keeps dependencies low and performance high.
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// src/emails/invoice-html.ts

interface InvoiceEmailProps {
  customerName: string;
  amount: number;
  invoiceUrl: string;
}

export function generateInvoiceEmailHTML({
  customerName,
  amount,
  invoiceUrl,
}: InvoiceEmailProps): string {
  return \`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #6366f1;
      color: white;
      text-decoration: none;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Invoice Paid</h1>
    <p>Hi \${customerName},</p>
    <p>Your payment of \$\${amount.toFixed(2)} was successful.</p>

    <div style="margin: 24px 0;">
      <a href="\${invoiceUrl}" class="button">View Invoice</a>
    </div>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

    <p style="color: #6b7280; font-size: 14px;">
      Thanks for your business!
    </p>
  </div>
</body>
</html>
  \`.trim();
}`} />
        </div>
      </div>

      {/* Sending Custom Templates */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">SENDING_CUSTOM_HTML_EMAILS</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Generate the HTML and send it using Resend:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`// src/app/api/send-invoice/route.ts

import { Resend } from "resend";
import { generateInvoiceEmailHTML } from "@/emails/invoice-html";
import { env } from "@/lib/env";

const resend = new Resend(env.server.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, customerName, amount, invoiceUrl } = await request.json();

  try {
    // Generate HTML
    const html = generateInvoiceEmailHTML({
      customerName,
      amount,
      invoiceUrl,
    });

    // Send with Resend
    const { data, error } = await resend.emails.send({
      from: env.server.EMAIL_FROM,
      to: email,
      subject: "Invoice Paid - Receipt",
      html,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}`} />
        </div>
      </div>

      {/* Email Types */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">EMAIL_TYPES</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          The queue system supports these email types for categorization:
        </p>
        <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">WELCOME</code> - Post-purchase welcome emails</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">VERIFICATION</code> - Email verification</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">RESET</code> - Password reset</div>
          <div>├─ <code className="bg-muted px-1 font-mono text-xs">INVOICE</code> - Payment receipts</div>
          <div>└─ <code className="bg-muted px-1 font-mono text-xs">NOTIFICATION</code> - General notifications</div>
        </div>
      </div>

      {/* Organization Invites */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">ORGANIZATION_INVITES</h2>
        <div>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Send beautiful organization invitation emails:
          </p>
        </div>
        <div className="[&>div]:rounded-none">
          <CodeBlock language="typescript" code={`import { sendOrganizationInvite } from "@/lib/email";

await sendOrganizationInvite("newmember@example.com", {
  organizationName: "Acme Corp",
  inviterName: "John Doe",
  role: "MEMBER",  // OWNER, ADMIN, MEMBER, GUEST
  token: "invite-token-abc",
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});`} />
        </div>
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">BEST_PRACTICES</h2>
        <Card className="rounded-none">
          <CardContent className="p-6">
            <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
              <div>├─ <strong>Use direct sending</strong> for time-sensitive emails (auth, password reset)</div>
              <div>├─ <strong>Use queuing</strong> for bulk emails, notifications, and post-purchase emails</div>
              <div>├─ <strong>Track user/purchase IDs</strong> for email analytics and debugging</div>
              <div>├─ <strong>Set appropriate maxAttempts</strong> - 3 for important emails, 1 for notifications</div>
              <div>├─ <strong>Test templates locally</strong> - without RESEND_API_KEY, emails log to console</div>
              <div>└─ <strong>Verify domain</strong> in Resend dashboard for better deliverability</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg font-bold text-primary">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-base font-semibold text-foreground">Authentication</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  Set up email verification and password reset
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/stripe-payments">
            <Card className="h-full rounded-none transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className="font-mono text-base font-semibold text-foreground">Stripe Payments</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  Send purchase confirmation emails
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
