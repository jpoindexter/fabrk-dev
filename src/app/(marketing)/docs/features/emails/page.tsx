import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Mail, Users, CreditCard, Bell } from 'lucide-react';

export const metadata = {
  title: 'Email with Resend - Fabrk Docs',
  description:
    'Send transactional emails with Resend. Welcome emails, password resets, notifications, and custom templates.',
};

export default function EmailsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x40]"
      category="Features"
      title="Email With Resend"
      description="Production-ready email system with React Email templates, queue-based sending, and beautiful transactional emails."
      overview="Fabrk uses Resend for email delivery with lightweight HTML templates. The system supports lightweight HTML templates for maximum performance, dual-mode sending (immediate for auth emails, queued for bulk), pre-built templates for common emails, zero-dependency template system, and automatic retry and error handling."
      features={[
        {
          icon: Mail,
          title: 'User Onboarding Sequence',
          description:
            'Queue a series of welcome emails with delays: Day 1 welcome, Day 3 tips, Day 7 feature highlight.',
        },
        {
          icon: Users,
          title: 'Organization Invites',
          description:
            'Send branded invite emails with accept/decline links. Include inviter name and organization details.',
        },
        {
          icon: CreditCard,
          title: 'Payment Receipts',
          description:
            'Automatic receipt emails triggered by Stripe webhooks. Include amount, product details, and invoice PDF link.',
        },
        {
          icon: Bell,
          title: 'Activity Notifications',
          description:
            'Notify users of important events: new team member joined, project updated, comment received.',
        },
      ]}
      setup={[
        {
          title: 'Set Up Resend',
          description: 'Add your Resend API key to .env.local',
          code: `RESEND_API_KEY="re_xxxxxxxxxxxx"
EMAIL_FROM="Your App <noreply@yourdomain.com>"`,
          language: 'bash',
        },
        {
          title: 'Configure Domain',
          description:
            'Set up your sending domain in Resend dashboard: Go to Resend Dashboard → Domains, add your domain, add the DNS records (SPF, DKIM, DMARC), and verify domain status.',
        },
        {
          title: 'Start Email Worker',
          description: 'For queued emails, run the worker',
          code: `npm run email:dev
# Watches queue and sends emails with auto-restart`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Email Template Example',
          description:
            'Templates are in src/emails/. Pre-built templates include welcome, verify-email, reset-password, purchase-confirmation, and subscription-update.',
          code: `// src/emails/welcome-html.ts
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
}`,
          language: 'typescript',
        },
        {
          title: 'Direct Sending (Auth Emails)',
          description: 'For immediate delivery (verification, password reset)',
          code: `import { sendVerificationEmail, sendResetEmail } from "@/lib/email";

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
});`,
          language: 'typescript',
        },
        {
          title: 'Queued Sending (Transactional)',
          description: 'For non-urgent emails (welcome, receipts)',
          code: `import { queueWelcomeEmail, queueConfirmationEmail } from "@/lib/email";

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
});`,
          language: 'typescript',
        },
        {
          title: 'Custom Email Sending',
          description: 'Send any HTML content',
          code: `import { Resend } from "resend";
import { env } from "@/lib/env";

const resend = new Resend(env.server.RESEND_API_KEY);

await resend.emails.send({
  from: env.server.EMAIL_FROM,
  to: "user@example.com",
  subject: "Your Custom Subject",
  html: "<h1>Hello World</h1><p>This is a custom email.</p>",
});`,
          language: 'typescript',
        },
        {
          title: 'Batch Sending',
          description: 'Send to multiple recipients',
          code: `import { Resend } from "resend";
import { env } from "@/lib/env";

const resend = new Resend(env.server.RESEND_API_KEY);

const emails = users.map((user) => ({
  from: env.server.EMAIL_FROM,
  to: user.email,
  subject: "Important Update",
  html: \`<h1>Hello \${user.name}</h1>\`,
}));

// Send up to 100 emails in one API call
await resend.batch.send(emails);`,
          language: 'typescript',
        },
      ]}
      previous={{ title: 'Google OAuth', href: '/docs/features/google-oauth' }}
      next={{ title: 'Organizations', href: '/docs/features/organizations' }}
    >
      {/* Provider Guides Section */}
      <DocsSection title="Email Provider Guides">
        <p className="text-muted-foreground mb-4">
          Fabrk supports multiple email providers. Choose based on your needs:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DocsCard title="RESEND" className="h-full">
            <p className="text-muted-foreground mb-2">Currently configured</p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• React Email support</li>
              <li>• Developer-first API</li>
              <li>• Free tier: 3,000/month</li>
            </ul>
          </DocsCard>
          <a href="/docs/features/postmark">
            <DocsCard title="POSTMARK" className="hover:border-primary/50 h-full transition-all">
              <p className="text-muted-foreground mb-2">Best deliverability</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• 99%+ inbox placement</li>
                <li>• Transactional focus</li>
                <li>• Message streams</li>
              </ul>
            </DocsCard>
          </a>
          <a href="/docs/features/sendgrid">
            <DocsCard title="SENDGRID" className="hover:border-primary/50 h-full transition-all">
              <p className="text-muted-foreground mb-2">Most popular</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• 100B+ emails/year</li>
                <li>• Marketing + transactional</li>
                <li>• Free tier: 100/day</li>
              </ul>
            </DocsCard>
          </a>
          <a href="/docs/features/ses">
            <DocsCard title="AMAZON SES" className="hover:border-primary/50 h-full transition-all">
              <p className="text-muted-foreground mb-2">Lowest cost</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• $0.10 per 1,000</li>
                <li>• AWS ecosystem</li>
                <li>• Unlimited scale</li>
              </ul>
            </DocsCard>
          </a>
          <a href="/docs/features/mailgun">
            <DocsCard title="MAILGUN" className="hover:border-primary/50 h-full transition-all">
              <p className="text-muted-foreground mb-2">Developer favorite</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Email validation API</li>
                <li>• Powerful routing</li>
                <li>• Great analytics</li>
              </ul>
            </DocsCard>
          </a>
        </div>
      </DocsSection>

      {/* Best Practices Section */}
      <DocsSection title="Best Practices">
        <DocsCard title="BEST PRACTICES">
          <ul className="space-y-1">
            <li>├─ Use direct send for auth emails, queue for everything else</li>
            <li>├─ Always include unsubscribe links for marketing emails</li>
            <li>├─ Test emails with real inboxes (Gmail, Outlook) before launch</li>
            <li>├─ Keep subjects under 50 characters for mobile</li>
            <li>├─ Use preheader text for email preview optimization</li>
            <li>├─ Include plain text fallback for accessibility</li>
            <li>├─ Monitor delivery rates in Resend dashboard</li>
            <li>└─ Set up webhooks for bounce and complaint handling</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
