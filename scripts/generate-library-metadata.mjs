#!/usr/bin/env node
/**
 * Generate Metadata for Library Pages
 * Creates layout.tsx files with SEO metadata for each library template
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Template metadata configurations
const metadataTemplates = {
  'admin-panels': {
    title: 'Admin Panel Templates',
    description: 'Production-ready admin panel templates with stats, user management, and system monitoring. Terminal-styled components for SaaS dashboards.',
  },
  'documentation': {
    title: 'Documentation Page Templates',
    description: 'Complete documentation site templates with search, navigation, and code blocks. Built for technical documentation and API references.',
  },
  'security-privacy': {
    title: 'Security & Privacy Templates',
    description: 'GDPR-compliant security and privacy page templates. Includes privacy policy, terms of service, and cookie consent pages.',
  },
  'search-results': {
    title: 'Search Results Templates',
    description: 'Advanced search interface templates with filters, sorting, and pagination. Perfect for data-heavy applications.',
  },
  'pricing-page': {
    title: 'Pricing Page Templates',
    description: 'Conversion-optimized pricing page templates with tier comparisons, feature lists, and CTAs. Ready for Stripe integration.',
  },
  'billing-dashboard': {
    title: 'Billing Dashboard Templates',
    description: 'Complete billing management interfaces with invoice history, payment methods, and subscription control.',
  },
  'email-templates': {
    title: 'Email Templates',
    description: 'Responsive HTML email templates for transactional emails. Welcome, reset password, billing notifications, and more.',
  },
  'chart-library': {
    title: 'Chart & Data Visualization Templates',
    description: 'Interactive charts and data visualization components. Line charts, bar charts, pie charts with terminal aesthetic.',
  },
  'modals': {
    title: 'Modal Dialog Templates',
    description: 'Accessible modal dialog templates for confirmations, forms, and alerts. Keyboard navigation and focus management included.',
  },
  'account-pages': {
    title: 'Account Management Templates',
    description: 'User account settings pages with profile editing, security settings, and preferences. Complete CRUD interfaces.',
  },
  'landing-variations': {
    title: 'Landing Page Variations',
    description: 'High-converting landing page templates with hero sections, features, testimonials, and CTAs. Multiple layout variations.',
  },
  'blog': {
    title: 'Blog Templates',
    description: 'Modern blog templates with post listings, individual post pages, and author profiles. SEO-optimized for content marketing.',
  },
  'blog/post': {
    title: 'Blog Post Template',
    description: 'Individual blog post template with rich formatting, code syntax highlighting, and responsive images.',
  },
  'error-pages': {
    title: 'Error Page Templates',
    description: '404, 500, and maintenance page templates with helpful navigation and terminal-style error messages.',
  },
  'profile': {
    title: 'User Profile Templates',
    description: 'User profile page templates with avatars, bio, activity feeds, and social links.',
  },
  'dashboards': {
    title: 'Dashboard Templates',
    description: 'Analytics dashboard templates with metrics, charts, and real-time data displays. Perfect for SaaS applications.',
  },
  'ai-forms': {
    title: 'AI Form Generator Templates',
    description: 'AI-powered form generation templates with validation, multi-step flows, and dynamic fields.',
  },
  'marketing': {
    title: 'Marketing Page Templates',
    description: 'Marketing website templates with feature showcases, integrations, and conversion-focused layouts.',
  },
  'settings-page': {
    title: 'Settings Page Templates',
    description: 'Comprehensive settings interfaces with tabs, form validation, and save states. User preferences and app configuration.',
  },
  'analytics-dashboard': {
    title: 'Analytics Dashboard Templates',
    description: 'Advanced analytics dashboards with KPIs, trends, and data breakdowns. Ideal for metrics tracking.',
  },
  'user-management': {
    title: 'User Management Templates',
    description: 'Admin user management interfaces with role assignment, permissions, and user search.',
  },
  'team-dashboard': {
    title: 'Team Dashboard Templates',
    description: 'Team collaboration dashboards with member lists, activity feeds, and project overviews.',
  },
  'empty-states': {
    title: 'Empty State Templates',
    description: 'Engaging empty state designs for zero data scenarios. Onboarding prompts and helpful CTAs.',
  },
  'authentication': {
    title: 'Authentication Templates',
    description: 'Complete authentication flow templates including sign in, sign up, password reset, and 2FA.',
  },
  'authentication/sign-in': {
    title: 'Sign In Page Template',
    description: 'Production-ready sign in page with social auth, password visibility toggle, and remember me option.',
  },
  'authentication/sign-up': {
    title: 'Sign Up Page Template',
    description: 'User registration page with real-time validation, password strength meter, and terms acceptance.',
  },
  'authentication/forgot-password': {
    title: 'Forgot Password Template',
    description: 'Password reset request page with email verification and secure token handling.',
  },
  'authentication/two-factor': {
    title: 'Two-Factor Authentication Template',
    description: '2FA verification page with code input, backup codes, and recovery options.',
  },
  'notifications': {
    title: 'Notification Templates',
    description: 'In-app notification center with read/unread states, filtering, and real-time updates.',
  },
  'onboarding': {
    title: 'Onboarding Flow Templates',
    description: 'Multi-step onboarding sequences with progress tracking and skip options.',
  },
  'docs': {
    title: 'Documentation Hub Template',
    description: 'Documentation homepage with category navigation, quick start guides, and search.',
  },
  'docs/customization': {
    title: 'Customization Guide Template',
    description: 'Template customization documentation with code examples and configuration options.',
  },
  'docs/integration/polar': {
    title: 'Polar Integration Guide',
    description: 'Step-by-step guide for integrating Polar payments with webhooks and subscription management.',
  },
  'docs/integration/prisma': {
    title: 'Prisma Integration Guide',
    description: 'Database setup guide with Prisma schema, migrations, and type-safe queries.',
  },
  'docs/integration/posthog': {
    title: 'PostHog Integration Guide',
    description: 'Analytics integration guide for PostHog with event tracking and feature flags.',
  },
  'docs/integration/nextauth': {
    title: 'NextAuth Integration Guide',
    description: 'Authentication setup guide with NextAuth v5, providers, and session management.',
  },
  'docs/integration/resend': {
    title: 'Resend Integration Guide',
    description: 'Email service integration with Resend for transactional emails.',
  },
  'docs/troubleshooting': {
    title: 'Troubleshooting Guide',
    description: 'Common issues and solutions for template setup and deployment.',
  },
  'docs/getting-started': {
    title: 'Getting Started Guide',
    description: 'Quick start guide for setting up and customizing your Fabrk template.',
  },
};

function generateLayoutContent(templateKey, metadata) {
  const title = metadata.title || formatTitle(templateKey);
  const description = metadata.description || `${title} - Fabrk terminal-styled template`;

  return `/**
 * ${title} - Layout with Metadata
 * Auto-generated SEO metadata for optimal discoverability
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} | Fabrk',
  description: '${description}',
  openGraph: {
    title: '${title} | Fabrk',
    description: '${description}',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title} | Fabrk',
    description: '${description}',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;
}

function formatTitle(slug) {
  return slug
    .split('/')
    .pop()
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function createLayoutForDirectory(dirPath, templateKey) {
  const layoutPath = path.join(dirPath, 'layout.tsx');

  // Skip if layout already exists
  if (fs.existsSync(layoutPath)) {
    console.log(`⏭️  Skipping ${templateKey} (layout exists)`);
    return false;
  }

  const metadata = metadataTemplates[templateKey] || {};
  const content = generateLayoutContent(templateKey, metadata);

  fs.writeFileSync(layoutPath, content, 'utf8');
  console.log(`✅ Created layout for ${templateKey}`);
  return true;
}

function main() {
  const libraryPath = path.join(projectRoot, 'src/app/(marketing)/library');

  // Get all directories with page.tsx but no layout.tsx
  const directories = [
    'admin-panels',
    'documentation',
    'security-privacy',
    'search-results',
    'pricing-page',
    'billing-dashboard',
    'email-templates',
    'chart-library',
    'modals',
    'account-pages',
    'landing-variations',
    'docs',
    'docs/customization',
    'docs/integration/polar',
    'docs/integration/prisma',
    'docs/integration/posthog',
    'docs/integration/nextauth',
    'docs/integration/resend',
    'docs/troubleshooting',
    'docs/getting-started',
    'blog',
    'blog/post',
    'error-pages',
    'profile',
    'dashboards',
    'ai-forms',
    'marketing',
    'settings-page',
    'analytics-dashboard',
    'user-management',
    'team-dashboard',
    'empty-states',
    'authentication',
    'authentication/sign-in',
    'authentication/sign-up',
    'authentication/forgot-password',
    'authentication/two-factor',
    'notifications',
    'onboarding',
  ];

  let created = 0;
  let skipped = 0;

  console.log('🚀 Generating library template metadata...\n');

  directories.forEach((dir) => {
    const fullPath = path.join(libraryPath, dir);
    if (fs.existsSync(fullPath)) {
      const result = createLayoutForDirectory(fullPath, dir);
      if (result) created++;
      else skipped++;
    }
  });

  console.log(`\n✨ Complete! Created ${created} layouts, skipped ${skipped}`);
}

main();
