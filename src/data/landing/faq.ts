/**
 * FAQ Data - Frequently asked questions
 * Centralized FAQ data used by FAQSection component
 */

import { COMPONENT_COUNT_STRING } from './stats';

export const FAQ_QUESTIONS = [
  {
    id: 'what-is-fabrk',
    question: 'What is Fabrk?',
    answer: `Fabrk is a production-ready Next.js 16 SaaS boilerplate with ${COMPONENT_COUNT_STRING} components, authentication, billing, multi-tenancy, and a unique terminal-inspired design system. It's designed to help you ship your SaaS in days, not months.`,
  },
  {
    id: 'license',
    question: 'What is the license?',
    answer:
      'Fabrk is open source under the MIT license. Use it in personal or commercial projects, modify it, ship it. No attribution required, no royalties, no recurring fees.',
  },
  {
    id: 'updates',
    question: 'How do updates work?',
    answer:
      'Pull from the GitHub repo whenever you want. New components, features, and Next.js upgrades land in main. Fork it if you want a stable snapshot.',
  },
  {
    id: 'support',
    question: 'What kind of support do you provide?',
    answer:
      'Community support via GitHub Issues and Discussions. Documentation covers setup, deployment, and customization. PRs welcome.',
  },
  {
    id: 'tech-stack',
    question: 'What technologies are included?',
    answer:
      'Next.js 16 (App Router), React 19, TypeScript, NextAuth v5, Stripe/Lemon Squeezy/Polar.sh, Prisma, PostgreSQL, Tailwind CSS 4, Radix UI, Framer Motion, and more. Production-ready full stack.',
  },
  {
    id: 'customization',
    question: 'Can I customize the design?',
    answer:
      'Absolutely! Fabrk includes 12 terminal-inspired themes plus a theme generator for custom colors. All components are fully customizable with a centralized design system.',
  },
  {
    id: 'deployment',
    question: 'How do I deploy Fabrk?',
    answer:
      'Fabrk works with any hosting provider (Vercel, Railway, AWS, etc.). We include deployment guides and environment setup instructions for popular platforms.',
  },
] as const;
