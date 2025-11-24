import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function EmailTemplatesTutorialPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Email Templates</h1>
        <p className="text-lg text-muted-foreground">
          Create and send beautiful transactional emails with Resend and React Email templates.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">What's Included</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Resend API integration for reliable email delivery</li>
            <li>React Email templates for beautiful, responsive emails</li>
            <li>Direct sending for immediate emails (auth)</li>
            <li>Queue system for background sending (notifications)</li>
            <li>Pre-built templates (welcome, verification, reset)</li>
            <li>Email tracking and delivery status</li>
          </ul>
        </CardContent>
      </Card>

      {/* Basic Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Setup</h2>
        <p className="text-muted-foreground">
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
        <CodeBlock language="bash" code={`# .env.local

RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"`} />
        <p className="text-sm text-muted-foreground">
          Without a Resend API key, emails will be logged to the console in development mode.
        </p>
      </div>

      {/* Email Service Functions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Sending Emails</h2>
        <p className="text-muted-foreground">
          Use the email service functions from{" "}
          <code className="rounded bg-muted px-1 py-0.5">src/lib/email.ts</code>:
        </p>
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

      {/* Queue System */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Email Queue System</h2>
        <p className="text-muted-foreground">
          For non-critical emails (notifications, bulk), use the queue system for background sending
          with automatic retries:
        </p>
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
        <p className="text-sm text-muted-foreground">
          Run the email worker with <code className="rounded bg-muted px-1 py-0.5">npm run email:dev</code> to process queued emails.
        </p>
      </div>

      {/* Creating Custom Templates */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Creating Custom Email Templates</h2>
        <p className="text-muted-foreground">
          Create React Email templates in <code className="rounded bg-muted px-1 py-0.5">src/emails/</code> for
          complex, reusable email designs:
        </p>
        <CodeBlock language="tsx" code={`// src/emails/invoice.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";

interface InvoiceEmailProps {
  customerName: string;
  amount: number;
  invoiceUrl: string;
}

export default function InvoiceEmail({
  customerName,
  amount,
  invoiceUrl,
}: InvoiceEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Invoice Paid</Text>
            <Text style={text}>
              Hi {customerName}, your payment of
              \${amount.toFixed(2)} was successful.
            </Text>
            <Button href={invoiceUrl} style={button}>
              View Invoice
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Thanks for your business!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
};

const section = {
  padding: "24px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
};

const button = {
  backgroundColor: "#6366f1",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
  marginTop: "16px",
};

const hr = {
  borderTop: "1px solid #e5e7eb",
  margin: "24px 0",
};

const footer = {
  fontSize: "14px",
  color: "#6b7280",
};`} />
      </div>

      {/* Using React Email Templates */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Sending React Email Templates</h2>
        <p className="text-muted-foreground">
          Render your React Email templates and send them with Resend:
        </p>
        <CodeBlock language="typescript" code={`// src/app/api/send-invoice/route.ts

import { Resend } from "resend";
import { render } from "@react-email/render";
import InvoiceEmail from "@/emails/invoice";
import { env } from "@/lib/env";

const resend = new Resend(env.server.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, customerName, amount, invoiceUrl } = await request.json();

  try {
    // Render React component to HTML
    const html = await render(
      InvoiceEmail({
        customerName,
        amount,
        invoiceUrl,
      })
    );

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

      {/* Email Types */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Email Types</h2>
        <p className="text-muted-foreground">
          The queue system supports these email types for categorization:
        </p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li><code className="rounded bg-muted px-1 py-0.5">WELCOME</code> - Post-purchase welcome emails</li>
          <li><code className="rounded bg-muted px-1 py-0.5">VERIFICATION</code> - Email verification</li>
          <li><code className="rounded bg-muted px-1 py-0.5">RESET</code> - Password reset</li>
          <li><code className="rounded bg-muted px-1 py-0.5">INVOICE</code> - Payment receipts</li>
          <li><code className="rounded bg-muted px-1 py-0.5">NOTIFICATION</code> - General notifications</li>
        </ul>
      </div>

      {/* Organization Invites */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Organization Invites</h2>
        <p className="text-muted-foreground">
          Send beautiful organization invitation emails:
        </p>
        <CodeBlock language="typescript" code={`import { sendOrganizationInvite } from "@/lib/email";

await sendOrganizationInvite("newmember@example.com", {
  organizationName: "Acme Corp",
  inviterName: "John Doe",
  role: "MEMBER",  // OWNER, ADMIN, MEMBER, GUEST
  token: "invite-token-abc",
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});`} />
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <Card>
          <CardContent className="p-6">
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                <strong>Use direct sending</strong> for time-sensitive emails (auth, password reset)
              </li>
              <li>
                <strong>Use queuing</strong> for bulk emails, notifications, and post-purchase emails
              </li>
              <li>
                <strong>Track user/purchase IDs</strong> for email analytics and debugging
              </li>
              <li>
                <strong>Set appropriate maxAttempts</strong> - 3 for important emails, 1 for notifications
              </li>
              <li>
                <strong>Test templates locally</strong> - without RESEND_API_KEY, emails log to console
              </li>
              <li>
                <strong>Verify domain</strong> in Resend dashboard for better deliverability
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/tutorials/authentication">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Set up email verification and password reset
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/stripe-payments">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold">Stripe Payments</h3>
                <p className="text-sm text-muted-foreground">
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
