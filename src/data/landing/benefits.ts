/**
 * Benefits Data - Unique value propositions
 * Focus on differentiators, not commodity features
 */

import { Sparkles, CreditCard, Rocket, Shield, Palette, Users } from 'lucide-react';
import { COMPONENT_COUNT_STRING, PROVIDER_COUNT_STRING, THEME_COUNT_STRING } from './stats';

export const CORE_BENEFITS = [
  {
    id: 'provider-flexibility',
    icon: CreditCard,
    module: 'ZERO_LOCK_IN',
    code: '0x10',
    title: 'Provider Flexibility',
    benefit: `${PROVIDER_COUNT_STRING} providers. Zero vendor lock-in.`,
    description:
      'Switch Stripe to Polar in one line. Swap Resend for SES. Replace OpenAI with Anthropic. Unified interfaces mean you never rewrite integration code. Your stack, your choice.',
    timeSaved: '120+ HRS',
    costSaved: '$12K',
    features: [
      '5 Payment (Stripe, Polar, Lemonsqueezy...)',
      '5 Email (Resend, SES, SendGrid...)',
      '9 AI (OpenAI, Anthropic, Google...)',
      '5 Search (Algolia, Meilisearch...)',
      '5 Storage (S3, R2, Supabase...)',
      'Unified Interfaces + Webhooks',
    ],
    ctaLabel: '> View All Providers',
    ctaHref: '/docs/features/providers',
  },
  {
    id: 'production-quality',
    icon: Rocket,
    module: 'SHIP_FAST',
    code: '0x11',
    title: 'Production Quality',
    benefit: `${COMPONENT_COUNT_STRING} components that actually work in production`,
    description:
      'Full dashboards: analytics, billing, user management, profile. TypeScript strict mode (no "any" soup). Git hooks BLOCK bad code before commit. 130+ tests with accessibility validation. Real error handling, loading states, edge cases.',
    timeSaved: '200+ HRS',
    costSaved: '$16K',
    features: [
      '70+ Production Components',
      'TypeScript Strict (No "Any" Soup)',
      'Git Hooks Block Bad Code',
      '130+ Tests + A11y Validation',
      'Multi-Tenant Orgs + RBAC',
      'Enterprise Audit Logging (SOC 2)',
    ],
    ctaLabel: '> Browse Component Library',
    ctaHref: '/library',
  },
  {
    id: 'ai-monetization',
    icon: Sparkles,
    module: 'AI_MONETIZATION',
    code: '0x12',
    title: 'AI Monetization',
    benefit: 'Launch AI features that actually make money',
    description:
      'Token metering for OpenAI, Google, Ollama. Credit-based billing system built-in. Usage tracking & analytics dashboard. Automatic credit deduction per AI call. The #1 problem in AI apps - solved.',
    timeSaved: '80+ HRS',
    costSaved: '$8K',
    features: [
      'Token Metering (OpenAI/Google/Ollama)',
      'Credit-Based Billing System',
      'Usage Tracking & Analytics',
      'Automatic Credit Deduction',
      'Monthly Refills By Tier',
      'AI Credit Dashboard Built-In',
    ],
    ctaLabel: '> Explore AI Features',
    ctaHref: '/docs/features/ai-integration',
  },
  {
    id: 'multi-tenancy',
    icon: Users,
    module: 'MULTI_TENANT',
    code: '0x13',
    title: 'Multi-Tenancy',
    benefit: 'Organizations, teams, and permissions out of the box',
    description:
      'Full B2B SaaS architecture ready to go. Create organizations, invite team members, assign roles. Granular permissions with RBAC. Audit logs for compliance. No more building tenant isolation from scratch.',
    timeSaved: '100+ HRS',
    costSaved: '$10K',
    features: [
      'Organization Management',
      'Team Invites + Member Roles',
      'Role-Based Access Control',
      'Tenant Data Isolation',
      'Audit Logging Built-In',
      'Admin Dashboard Included',
    ],
    ctaLabel: '> See Multi-Tenancy',
    ctaHref: '/docs/features/multi-tenancy',
  },
  {
    id: 'terminal-design',
    icon: Palette,
    module: 'TERMINAL_UI',
    code: '0x14',
    title: 'Terminal Design',
    benefit: `${THEME_COUNT_STRING} themes that make your SaaS stand out`,
    description:
      'Distinctive terminal aesthetic that developers love. Sharp corners, monospace typography, hex codes. Stand out from generic gradient landing pages. Theme switcher included. Your product will be memorable.',
    timeSaved: '60+ HRS',
    costSaved: '$6K',
    features: [
      '12 Pre-Built Terminal Themes',
      'Theme Generator Tool',
      'OKLCH Color System',
      'Dark Mode Built-In',
      'Consistent Design Tokens',
      'Zero Rounded Corners',
    ],
    ctaLabel: '> Preview Themes',
    ctaHref: '/docs/themes',
  },
  {
    id: 'auth-security',
    icon: Shield,
    module: 'AUTH_SECURE',
    code: '0x15',
    title: 'Auth & Security',
    benefit: 'Enterprise-grade authentication in minutes',
    description:
      'NextAuth v5 pre-configured with Google OAuth, magic links, and email/password. JWT sessions with 30-day expiry. Rate limiting, CSRF protection, security headers. SOC 2 compliance patterns built-in.',
    timeSaved: '80+ HRS',
    costSaved: '$8K',
    features: [
      'NextAuth v5 Pre-Configured',
      'Google OAuth + Magic Links',
      'JWT Sessions (30-Day)',
      'Rate Limiting (Upstash)',
      'Security Headers + CSP',
      'SOC 2 Compliance Patterns',
    ],
    ctaLabel: '> View Auth Docs',
    ctaHref: '/docs/features/authentication',
  },
] as const;
