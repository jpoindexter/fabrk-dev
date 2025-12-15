/**
 * Benefits Data - Unique value propositions
 * Focus on differentiators, not commodity features
 * REDESIGNED: Lead with AI monetization, payment flexibility, production quality
 */

import { Sparkles, CreditCard, Rocket } from 'lucide-react';

export const CORE_BENEFITS = [
  {
    id: 'ai-monetization',
    icon: Sparkles,
    module: 'AI_MONETIZATION',
    code: '0x10',
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
    id: 'payment-flexibility',
    icon: CreditCard,
    module: 'PAYMENT_FLEXIBILITY',
    code: '0x11',
    title: 'Payment Flexibility',
    benefit: '3 payment providers. Zero vendor lock-in.',
    description:
      'Stripe (industry standard, global). Polar (built for developers, repo access). LemonSqueezy (Merchant of Record, no tax headaches). Switch providers without rewriting code. 22 webhook handlers with retry logic.',
    timeSaved: '120+ HRS',
    costSaved: '$12K',
    features: [
      'Stripe (Global Standard)',
      'Polar (Dev-Focused, Repo Access)',
      'LemonSqueezy (MoR, Tax Handling)',
      'Switch Without Rewriting Code',
      '22 Webhook Handlers + Retry',
      'Subscriptions + Usage + One-Time',
    ],
    ctaLabel: '> View Billing System',
    ctaHref: '/docs/features/payments',
  },
  {
    id: 'production-quality',
    icon: Rocket,
    module: 'SHIP_FAST',
    code: '0x12',
    title: 'Production Quality',
    benefit: '70+ components that actually work in production',
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
] as const;
