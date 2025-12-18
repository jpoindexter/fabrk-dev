import { FeatureGuideTemplate } from '@/components/docs';
import { Mail, DollarSign, Server, Shield, BarChart3, Settings } from 'lucide-react';

export const metadata = {
  title: 'AWS SES Email - Fabrk Docs',
  description:
    'Send transactional emails with Amazon SES. Lowest cost at scale, enterprise reliability, and AWS integration.',
};

export default function SESPage() {
  return (
    <FeatureGuideTemplate
      code="[0x43]"
      category="Email Providers"
      title="Amazon SES"
      description="Lowest cost email delivery with enterprise-grade reliability."
      overview="Amazon Simple Email Service (SES) offers the lowest per-email cost at scale, making it ideal for high-volume senders. It integrates seamlessly with other AWS services and provides enterprise-grade reliability. Features include $0.10 per 1,000 emails pricing, AWS infrastructure reliability, built-in bounce/complaint handling, configuration sets for tracking, dedicated IPs available, and native AWS IAM integration."
      features={[
        {
          icon: DollarSign,
          title: 'Lowest Cost',
          description:
            '$0.10 per 1,000 emails. No monthly minimums. Free tier includes 62,000 emails/month from EC2.',
        },
        {
          icon: Server,
          title: 'AWS Integration',
          description:
            'Native integration with Lambda, S3, SNS, and CloudWatch. Build serverless email workflows.',
        },
        {
          icon: Shield,
          title: 'Enterprise Security',
          description:
            'IAM policies, VPC endpoints, encryption at rest. Meet compliance requirements.',
        },
        {
          icon: BarChart3,
          title: 'Deliverability Dashboard',
          description:
            'Track reputation, bounces, complaints, and deliverability metrics in CloudWatch.',
        },
        {
          icon: Settings,
          title: 'Configuration Sets',
          description:
            'Group sending settings, apply IP pools, and track events per configuration.',
        },
        {
          icon: Mail,
          title: 'Receiving Email',
          description:
            'SES can also receive emails. Route to S3, Lambda, or SNS for processing.',
        },
      ]}
      setup={[
        {
          title: 'Create AWS Account',
          description:
            'Sign up at aws.amazon.com. You\'ll need an AWS account with billing enabled.',
        },
        {
          title: 'Navigate to SES',
          description:
            'In AWS Console, search for "SES" or go to Simple Email Service. Select your preferred region (us-east-1 is common).',
        },
        {
          title: 'Create IAM User',
          description:
            'Go to IAM, create a new user with programmatic access. Attach the AmazonSESFullAccess policy. Save the Access Key ID and Secret Access Key.',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your AWS SES credentials to .env.local',
          code: `# AWS SES Credentials
AWS_SES_ACCESS_KEY="AKIAXXXXXXXXXXXXXXXX"
AWS_SES_SECRET_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_SES_REGION="us-east-1"

# Set SES as your email provider
EMAIL_PROVIDER="ses"

# Default from address (must match verified identity)
EMAIL_FROM="Your App <noreply@yourdomain.com>"`,
          language: 'bash',
        },
        {
          title: 'Verify Domain or Email',
          description:
            'In SES Console, go to Verified Identities, then Create Identity. Verify either a domain (recommended) or individual email address. For domains, add the provided DNS records.',
        },
        {
          title: 'Request Production Access',
          description:
            'New SES accounts are in "sandbox" mode (can only send to verified addresses). Go to Account Dashboard and request production access to send to any address.',
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
          description: 'SES supports up to 50 recipients per API call.',
          code: `import { sendEmail } from '@/lib/email';

await sendEmail({
  to: ['user1@example.com', 'user2@example.com'],
  cc: ['manager@example.com'],
  subject: 'Team Notification',
  html: '<p>This is a team-wide notification.</p>',
});`,
          language: 'typescript',
        },
        {
          title: 'Cost Calculation',
          description: 'Estimate your monthly SES costs.',
          code: `// SES Pricing (as of 2024)
// - $0.10 per 1,000 emails sent
// - $0.12 per GB of attachments
// - Free: 62,000 emails/month from EC2

// Example: 100,000 emails/month
// Cost: 100,000 / 1,000 * $0.10 = $10/month

// Compare to other providers:
// - SendGrid: $19.95/month for 50,000 emails
// - Postmark: $15/month for 10,000 emails
// - Resend: $20/month for 50,000 emails`,
          language: 'typescript',
        },
      ]}
    />
  );
}
