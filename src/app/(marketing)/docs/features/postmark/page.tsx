import { FeatureGuideTemplate } from '@/components/docs';
import { Mail, Zap, Shield, BarChart3, Clock, Server } from 'lucide-react';

export const metadata = {
  title: 'Postmark Email - Fabrk Docs',
  description:
    'Send transactional emails with Postmark. Best-in-class deliverability, fast delivery, and detailed analytics.',
};

export default function PostmarkPage() {
  return (
    <FeatureGuideTemplate
      code="[0x41]"
      category="Email Providers"
      title="Postmark"
      description="Best-in-class deliverability for transactional emails."
      overview="Postmark focuses exclusively on transactional email, achieving industry-leading deliverability rates. Unlike marketing-focused providers, Postmark maintains strict sending policies that ensure your important emails (password resets, receipts, notifications) land in the inbox, not spam. Features include 99%+ deliverability rate, sub-second delivery times, detailed bounce handling, real-time webhooks, and batch sending for high volume."
      features={[
        {
          icon: Zap,
          title: 'Lightning Fast Delivery',
          description:
            'Average delivery time under 1 second. Your users get emails instantly, not minutes later.',
        },
        {
          icon: Shield,
          title: 'Best Deliverability',
          description:
            '99%+ inbox placement rate. Postmark\'s strict policies keep their IP reputation pristine.',
        },
        {
          icon: BarChart3,
          title: 'Detailed Analytics',
          description:
            'Track opens, clicks, bounces, and spam complaints. Debug delivery issues with message events.',
        },
        {
          icon: Mail,
          title: 'Batch Sending',
          description:
            'Send up to 500 emails per API call. Perfect for notifications and bulk transactional emails.',
        },
        {
          icon: Clock,
          title: 'Message Streams',
          description:
            'Separate transactional and broadcast emails. Different streams maintain different reputations.',
        },
        {
          icon: Server,
          title: 'Bounce Handling',
          description:
            'Automatic bounce processing with webhooks. Keep your list clean and deliverability high.',
        },
      ]}
      setup={[
        {
          title: 'Create Postmark Account',
          description:
            'Sign up at postmarkapp.com. New accounts get 100 free emails to test.',
        },
        {
          title: 'Get Server API Token',
          description:
            'In Postmark dashboard, go to Servers, select your server, then API Tokens. Copy the Server API token.',
        },
        {
          title: 'Add Environment Variable',
          description: 'Add your Postmark API key to .env.local',
          code: `# Postmark API Key
POSTMARK_API_KEY="your-server-api-token"

# Set Postmark as your email provider
EMAIL_PROVIDER="postmark"

# Default from address (must match verified domain)
EMAIL_FROM="Your App <noreply@yourdomain.com>"`,
          language: 'bash',
        },
        {
          title: 'Verify Domain',
          description:
            'In Postmark, go to Sender Signatures, add your domain, then add the DNS records (DKIM, Return-Path) to your DNS provider. This improves deliverability significantly.',
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
          title: 'Send Batch Emails',
          description: 'Send multiple emails in one API call (up to 500).',
          code: `import { PostmarkProvider } from '@/lib/email';

const postmark = new PostmarkProvider();

const results = await postmark.sendBatch([
  {
    to: 'user1@example.com',
    subject: 'Notification',
    html: '<p>You have a new message.</p>',
  },
  {
    to: 'user2@example.com',
    subject: 'Notification',
    html: '<p>You have a new message.</p>',
  },
]);

console.log(results);
// [{ id: 'msg-id-1', success: true }, { id: 'msg-id-2', success: true }]`,
          language: 'typescript',
        },
        {
          title: 'With Attachments',
          description: 'Send emails with file attachments.',
          code: `import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'user@example.com',
  subject: 'Your Invoice',
  html: '<p>Please find your invoice attached.</p>',
  attachments: [
    {
      filename: 'invoice.pdf',
      content: pdfBuffer, // Buffer or base64 string
      contentType: 'application/pdf',
    },
  ],
});`,
          language: 'typescript',
        },
      ]}
    />
  );
}
