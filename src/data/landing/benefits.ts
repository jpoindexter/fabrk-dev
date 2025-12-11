/**
 * Benefits Data - Unique value propositions
 * Focus on differentiators, not commodity features
 * Commodity features (Auth/Billing/Multi-tenancy) moved to included-features.ts
 */

import { Terminal, Box, Sparkles, CreditCard } from 'lucide-react';

export const CORE_BENEFITS = [
  {
    id: 'terminal-ui',
    icon: Terminal,
    module: 'TERMINAL_UI',
    code: '0x10',
    title: 'Command-Line Aesthetic',
    benefit: 'The only boilerplate with terminal-native design',
    description:
      'Monospace fonts, sharp edges, console-inspired components. 18 theme variants (6 colors × 3 styles). 58-file design system with automated pattern enforcement. No other boilerplate looks like this.',
    timeSaved: 'N/A',
    costSaved: 'UNIQUE',
    features: [
      '58 Design System Audit Files',
      'Automated Pattern Enforcement',
      '18 Theme Variants',
      'WCAG 2.1 AA Compliant',
      'Terminal Card Components',
    ],
    ctaLabel: 'Explore Design System',
    ctaHref: '/docs/design-system',
  },
  {
    id: 'component-library',
    icon: Box,
    module: 'DEMO_LIBRARY',
    code: '0x11',
    title: '31 Interactive Demos',
    benefit: 'Try before you buy - explore every component live',
    description:
      "Dashboards, auth flows, admin panels, billing pages, marketing templates. See exactly what you're getting with live, interactive previews at /library. No login required.",
    timeSaved: '0 HRS',
    costSaved: 'RISK-FREE',
    features: [
      'Live Component Previews',
      'Copy-Paste Code',
      '26 Categories',
      'No Login Required',
      'Full Documentation',
    ],
    ctaLabel: 'Browse Library',
    ctaHref: '/library',
  },
  {
    id: 'ai-credits',
    icon: Sparkles,
    module: 'AI_CREDITS',
    code: '0x12',
    title: 'AI Credits & Usage Tracking',
    benefit: 'Monetize AI features with built-in credit system',
    description:
      'Token metering, usage tracking, tier allowances, and AI gateway integration. Most boilerplates ignore AI monetization - we built it in. Future-proof your SaaS.',
    timeSaved: '40 HRS',
    costSaved: '$8K',
    features: [
      'Token Metering System',
      'Usage Dashboard',
      'Tier Allowances',
      'AI Gateway Integration',
      'Rate Limiting',
    ],
    ctaLabel: 'View AI Features',
    ctaHref: '/docs/features/ai-credits',
  },
  {
    id: 'payment-flexibility',
    icon: CreditCard,
    module: 'PAYMENTS',
    code: '0x13',
    title: '3 Payment Providers',
    benefit: 'Switch payment providers without rewriting code',
    description:
      'Most boilerplates lock you into Stripe. We support Stripe, Lemon Squeezy, and Polar.sh with unified webhooks, customer portals, and subscription management. Choose what works for your market.',
    timeSaved: '30 HRS',
    costSaved: '$6K',
    features: [
      '3 Payment Providers',
      'Unified Webhook Handlers',
      'Customer Portal',
      'Subscription Management',
      'One-Time Payments',
    ],
    ctaLabel: 'See Payment Integration',
    ctaHref: '/docs/features/billing',
  },
] as const;
