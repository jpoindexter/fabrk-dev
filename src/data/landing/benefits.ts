/**
 * Benefits Data - Unique value propositions
 * Focus on differentiators, not commodity features
 * REDESIGNED: 3 cards instead of 4 (less cramped, more impact)
 */

import { Terminal, Zap, Rocket } from 'lucide-react';

export const CORE_BENEFITS = [
  {
    id: 'terminal-aesthetic',
    icon: Terminal,
    module: 'TERMINAL_AESTHETIC',
    code: '0x10',
    title: 'Terminal Aesthetic',
    benefit: 'The only boilerplate that looks like this',
    description:
      'Monospace everything. Sharp edges, no shadows, console-inspired design. 18 theme variants with CRT scanlines. 58-file design system + automated git hooks enforce patterns. Stand out visually from every other SaaS.',
    timeSaved: 'UNIQUE',
    costSaved: '$12K+',
    features: [
      'JetBrains Mono Site-Wide',
      'Zero Rounded Corners',
      'CRT Scanline Effects',
      '58 Automated Design Audits',
      'Pre-Commit Pattern Enforcement',
      '18 Theme Variants (6×3)',
    ],
    ctaLabel: '> View Design System',
    ctaHref: '/docs/design-system',
  },
  {
    id: 'production-components',
    icon: Zap,
    module: 'SHIP_FAST',
    code: '0x11',
    title: 'Ship 10x Faster',
    benefit: '60 production-ready components, not starter templates',
    description:
      "Don't build dashboards, auth flows, admin panels, and billing pages from scratch. Copy-paste production components with live previews. Docs pages, settings pages, analytics - it's all done. Ship in days, not months.",
    timeSaved: '80+ HRS',
    costSaved: '$16K',
    features: [
      '60 Production Components',
      'Live Interactive Previews',
      'Dashboard + Admin Templates',
      'Auth Flows (6 variants)',
      'Billing Pages (Stripe/Polar/LS)',
      'Marketing Landing Pages',
    ],
    ctaLabel: '> Browse Component Library',
    ctaHref: '/library',
  },
  {
    id: 'future-proof',
    icon: Rocket,
    module: 'FUTURE_PROOF',
    code: '0x12',
    title: 'Built For 2025+',
    benefit: 'AI monetization + payment flexibility + modern stack',
    description:
      'AI credits with token metering. 3 payment providers (Stripe, Lemon Squeezy, Polar). Next.js 15, React 19, TypeScript strict. Git hooks block bad code. This is the stack winners use in 2025.',
    timeSaved: '70 HRS',
    costSaved: '$14K',
    features: [
      'AI Token Metering Built-In',
      '3 Payment Providers',
      'Next.js 15 + React 19',
      'TypeScript Strict Mode',
      '10 Git Hook Validators',
      'Zero-Config Vercel Deploy',
    ],
    ctaLabel: '> Explore Tech Stack',
    ctaHref: '/docs/tech-stack',
  },
] as const;
