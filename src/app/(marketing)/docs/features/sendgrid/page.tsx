import { FeatureGuideTemplate } from '@/components/docs';
import { Mail, Users, BarChart3, Layout, Webhook, Globe } from 'lucide-react';

export const metadata = {
  title: 'SendGrid Email - Fabrk Docs',
  description:
    'Send transactional and marketing emails with SendGrid. High volume, templates, and powerful analytics.',
};

export default function SendGridPage() {
  return (
    <FeatureGuideTemplate
      code="[0x42]"
      category="Email Providers"
      title="SendGrid"
      description="High-volume email delivery for transactional and marketing."
      overview="SendGrid (by Twilio) handles both transactional and marketing emails at scale. It's the go-to choice for high-volume senders who need reliable delivery and detailed analytics. Features include scalable infrastructure (billions of emails/month), dynamic templates with handlebars, email validation API, dedicated IPs for enterprise, comprehensive analytics, and suppression management."
      features={[
        {
          icon: Globe,
          title: 'Massive Scale',
          description:
            'Send billions of emails per month. SendGrid powers email for companies like Uber, Airbnb, and Spotify.',
        },
        {
          icon: Layout,
          title: 'Dynamic Templates',
          description:
            'Create reusable templates with Handlebars syntax. Manage templates in the dashboard.',
        },
        {
          icon: BarChart3,
          title: 'Advanced Analytics',
          description:
            'Track delivery, opens, clicks, bounces, and unsubscribes. Export data for analysis.',
        },
        {
          icon: Users,
          title: 'Contact Management',
          description:
            'Built-in contact lists for marketing campaigns. Segment by engagement and behavior.',
        },
        {
          icon: Webhook,
          title: 'Event Webhooks',
          description:
            'Real-time notifications for delivery, opens, clicks, bounces, and spam reports.',
        },
        {
          icon: Mail,
          title: 'Email Validation',
          description:
            'Validate email addresses before sending. Reduce bounces and protect your reputation.',
        },
      ]}
      setup={[
        {
          title: 'Create SendGrid Account',
          description:
            'Sign up at sendgrid.com. Free tier includes 100 emails/day forever.',
        },
        {
          title: 'Create API Key',
          description:
            'Go to Settings, then API Keys, then Create API Key. Select "Full Access" or customize permissions. Copy the key immediately (it won\'t be shown again).',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your SendGrid API key to .env.local',
          code: `# SendGrid API Key
SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxx"

# Set SendGrid as your email provider
EMAIL_PROVIDER="sendgrid"

# Default from address (must match verified sender)
EMAIL_FROM="Your App <noreply@yourdomain.com>"`,
          language: 'bash',
        },
        {
          title: 'Verify Sender Identity',
          description:
            'Go to Settings, then Sender Authentication. Either verify a single sender email or authenticate your entire domain (recommended for production).',
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
          title: 'Send to Multiple Recipients',
          description: 'Send to multiple recipients with CC and BCC.',
          code: `import { sendEmail } from '@/lib/email';

await sendEmail({
  to: ['user1@example.com', 'user2@example.com'],
  cc: ['manager@example.com'],
  bcc: ['archive@example.com'],
  subject: 'Team Update',
  html: '<p>Here is the weekly team update...</p>',
});`,
          language: 'typescript',
        },
        {
          title: 'With Reply-To Address',
          description: 'Set a different reply-to address.',
          code: `import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'customer@example.com',
  from: 'noreply@yourapp.com',
  replyTo: 'support@yourapp.com',
  subject: 'Your Support Ticket #1234',
  html: '<p>We received your request and will respond soon.</p>',
});`,
          language: 'typescript',
        },
      ]}
    />
  );
}
