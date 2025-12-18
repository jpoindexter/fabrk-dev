import { FeatureGuideTemplate } from '@/components/docs';
import { Mail, Code, Shield, BarChart3, Webhook, Search } from 'lucide-react';

export const metadata = {
  title: 'Mailgun Email - Fabrk Docs',
  description:
    'Send transactional emails with Mailgun. Developer-friendly APIs, email validation, and powerful routing.',
};

export default function MailgunPage() {
  return (
    <FeatureGuideTemplate
      code="[0x44]"
      category="Email Providers"
      title="Mailgun"
      description="Developer-friendly email delivery with powerful APIs."
      overview="Mailgun is built by developers, for developers. It offers clean APIs, comprehensive documentation, and powerful features like email validation and inbound routing. Features include RESTful API with SDKs for all languages, email validation to reduce bounces, inbound email routing and parsing, detailed logs and analytics, mailing list management, and A/B testing for templates."
      features={[
        {
          icon: Code,
          title: 'Developer First',
          description:
            'Clean REST API with SDKs for Python, Ruby, PHP, Node.js, Go, Java, and C#.',
        },
        {
          icon: Search,
          title: 'Email Validation',
          description:
            'Validate addresses before sending. Check syntax, domain, and mailbox existence.',
        },
        {
          icon: Mail,
          title: 'Inbound Routing',
          description:
            'Receive and parse emails. Route to webhooks, store in Mailgun, or forward.',
        },
        {
          icon: BarChart3,
          title: 'Detailed Logs',
          description:
            'Search and filter logs by recipient, subject, tags. Debug delivery issues easily.',
        },
        {
          icon: Webhook,
          title: 'Webhooks',
          description:
            'Real-time notifications for delivered, opened, clicked, bounced, and complained events.',
        },
        {
          icon: Shield,
          title: 'Suppressions',
          description:
            'Automatic handling of bounces, complaints, and unsubscribes. Protect your reputation.',
        },
      ]}
      setup={[
        {
          title: 'Create Mailgun Account',
          description:
            'Sign up at mailgun.com. Free trial includes 5,000 emails for 3 months.',
        },
        {
          title: 'Add Your Domain',
          description:
            'Go to Sending, then Domains, then Add New Domain. Enter your domain (e.g., mail.yourapp.com).',
        },
        {
          title: 'Configure DNS',
          description:
            'Add the provided DNS records: TXT records for SPF and DKIM, MX records if receiving email, CNAME for tracking (optional).',
        },
        {
          title: 'Get API Key',
          description:
            'Go to Settings, then API Security, then Add new key. Copy your Private API key.',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your Mailgun credentials to .env.local',
          code: `# Mailgun Credentials
MAILGUN_API_KEY="key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
MAILGUN_DOMAIN="mail.yourapp.com"

# Set Mailgun as your email provider
EMAIL_PROVIDER="mailgun"

# Default from address (must match verified domain)
EMAIL_FROM="Your App <noreply@mail.yourapp.com>"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Send Single Email',
          description: 'Send a transactional email using the unified interface.',
          code: `import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome to Our App',
  html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
  text: 'Welcome! Thanks for signing up.',
});`,
          language: 'typescript',
        },
        {
          title: 'With Attachments',
          description: 'Mailgun supports file attachments via multipart form data.',
          code: `import { sendEmail } from '@/lib/email';
import { readFileSync } from 'fs';

const pdfBuffer = readFileSync('./invoice.pdf');

await sendEmail({
  to: 'customer@example.com',
  subject: 'Your Invoice',
  html: '<p>Please find your invoice attached.</p>',
  attachments: [
    {
      filename: 'invoice.pdf',
      content: pdfBuffer,
      contentType: 'application/pdf',
    },
  ],
});`,
          language: 'typescript',
        },
        {
          title: 'With CC and BCC',
          description: 'Send copies to additional recipients.',
          code: `import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'customer@example.com',
  cc: ['sales@yourapp.com'],
  bcc: ['records@yourapp.com'],
  replyTo: 'support@yourapp.com',
  subject: 'Order Confirmation #12345',
  html: '<p>Thank you for your order!</p>',
});`,
          language: 'typescript',
        },
      ]}
    />
  );
}
