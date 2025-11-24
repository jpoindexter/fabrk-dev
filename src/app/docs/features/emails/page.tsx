import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

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
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">
              Fabrk uses Resend for email delivery with React Email for templates. The system supports:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>React Email templates with full TypeScript support</li>
              <li>Dual-mode sending: immediate (auth) and queued (bulk)</li>
              <li>Pre-built templates for common emails</li>
              <li>Email previews in development</li>
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
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="Your App <noreply@yourdomain.com>"

# Optional: for email previews
EMAIL_PREVIEW_URL="http://localhost:3000/api/email-preview"`}
            </pre>
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
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">For queued emails, run the worker:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`npm run email:dev
# Watches queue and sends emails with auto-restart`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Email Templates</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Templates are in <code className="bg-muted px-2 py-1 rounded">src/emails/</code>. Pre-built templates include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><code className="bg-muted px-1 rounded">WelcomeEmail.tsx</code> - New user onboarding</li>
              <li><code className="bg-muted px-1 rounded">VerificationEmail.tsx</code> - Email verification</li>
              <li><code className="bg-muted px-1 rounded">ResetPasswordEmail.tsx</code> - Password reset</li>
              <li><code className="bg-muted px-1 rounded">PaymentConfirmation.tsx</code> - Purchase receipt</li>
              <li><code className="bg-muted px-1 rounded">InviteEmail.tsx</code> - Organization invite</li>
            </ul>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// src/emails/WelcomeEmail.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export default function WelcomeEmail({ name, loginUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {config.app.name}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome, {name}!</Heading>
          <Text style={text}>
            Thanks for signing up. We're excited to have you on board.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={loginUrl}>
              Get Started
            </Button>
          </Section>
          <Text style={footer}>
            If you didn't create this account, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f6f9fc", padding: "40px 0" };
const container = { backgroundColor: "#ffffff", padding: "40px", borderRadius: "8px" };
const h1 = { fontSize: "24px", fontWeight: "bold", margin: "0 0 20px" };
const text = { fontSize: "16px", lineHeight: "26px", margin: "0 0 20px" };
const buttonContainer = { textAlign: "center" as const, margin: "30px 0" };
const button = { backgroundColor: "#7c3aed", color: "#fff", padding: "12px 24px", borderRadius: "6px" };
const footer = { fontSize: "14px", color: "#666", margin: "20px 0 0" };`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>

        <h3 className="text-xl font-medium mb-3">Direct Sending (Auth Emails)</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">For immediate delivery (verification, password reset):</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { sendVerificationEmail, sendResetEmail } from "@/lib/email";

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
});`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Queued Sending (Transactional)</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">For non-urgent emails (welcome, receipts):</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { queueWelcomeEmail, queueConfirmationEmail } from "@/lib/email";

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
});`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Custom Email Sending</h3>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="mb-4">Send any React Email template:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { Resend } from "resend";
import { env } from "@/lib/env";
import CustomEmail from "@/emails/CustomEmail";

const resend = new Resend(env.server.RESEND_API_KEY);

await resend.emails.send({
  from: env.server.EMAIL_FROM,
  to: "user@example.com",
  subject: "Your Custom Subject",
  react: CustomEmail({
    name: "John",
    customProp: "value",
  }),
});`}
            </pre>
          </CardContent>
        </Card>

        <h3 className="text-xl font-medium mb-3">Batch Sending</h3>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Send to multiple recipients:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { Resend } from "resend";

const resend = new Resend(env.server.RESEND_API_KEY);

const emails = users.map((user) => ({
  from: env.server.EMAIL_FROM,
  to: user.email,
  subject: "Important Update",
  react: UpdateEmail({ name: user.name }),
}));

// Send up to 100 emails in one API call
await resend.batch.send(emails);`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Development Preview</h2>
        <Card className="bg-zinc-950">
          <CardContent className="pt-6">
            <p className="mb-4">Preview emails during development:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`# Start the email preview server
npx react-email dev --dir src/emails

# Opens at http://localhost:3001
# See all templates with live reload`}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>

        <div className="grid gap-4">
          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">User Onboarding Sequence</h3>
              <p className="text-muted-foreground">
                Queue a series of welcome emails with delays: Day 1 welcome, Day 3 tips, Day 7 feature highlight. Use the job queue for scheduling.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Organization Invites</h3>
              <p className="text-muted-foreground">
                Send branded invite emails with accept/decline links. Include inviter name and organization details for context.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Payment Receipts</h3>
              <p className="text-muted-foreground">
                Automatic receipt emails triggered by Stripe webhooks. Include amount, product details, and link to invoice PDF.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950">
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
        <Card className="bg-zinc-950">
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
