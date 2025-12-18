/**
 * Benefits Data - Unique value propositions
 * Focus on differentiators, not commodity features
 * REDESIGNED: Lead with AI monetization, payment flexibility, production quality
 */

import { Sparkles, CreditCard, Rocket } from 'lucide-react';
import { COMPONENT_COUNT_STRING, PROVIDER_COUNT_STRING } from './stats';

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
] as const;
