/**
 * FAQ Data - Frequently asked questions
 * TODO: Extract from faq-section.tsx when refactoring
 */

export const FAQ_QUESTIONS = [
  {
    id: 'what-is-fabrk',
    question: 'What is Fabrk?',
    answer:
      "Fabrk is a production-ready Next.js 15 SaaS boilerplate with 75+ components, authentication, billing, multi-tenancy, and a unique terminal-inspired design system. It's designed to help you ship your SaaS in days, not months.",
  },
  {
    id: 'license',
    question: 'What does the commercial license include?',
    answer:
      'The commercial license includes unlimited projects, unlimited clients, lifetime updates, and no recurring fees. You can use Fabrk to build and sell as many SaaS products as you want.',
  },
  {
    id: 'updates',
    question: 'How do updates work?',
    answer:
      'You get lifetime access to all future updates via GitHub. We continuously improve Fabrk with new components, features, and Next.js upgrades. No subscription required.',
  },
  {
    id: 'support',
    question: 'What kind of support do you provide?',
    answer:
      'Premium support includes documentation, email support, and access to our Discord community. We help with setup, deployment, and customization questions.',
  },
  {
    id: 'refunds',
    question: 'Do you offer refunds?',
    answer:
      'Due to the nature of digital products, all sales are final. However, we offer a detailed demo and documentation so you can evaluate Fabrk before purchasing.',
  },
  {
    id: 'tech-stack',
    question: 'What technologies are included?',
    answer:
      'Next.js 15 (App Router), React 19, TypeScript, NextAuth v5, Stripe/Lemon Squeezy/Polar.sh, Prisma, PostgreSQL, Tailwind CSS 4, Radix UI, Framer Motion, and more. Full stack ready.',
  },
  {
    id: 'customization',
    question: 'Can I customize the design?',
    answer:
      'Absolutely! Fabrk uses a centralized design system with theme switching (6 color themes × 3 visual styles = 18 combinations). All components are fully customizable.',
  },
  {
    id: 'deployment',
    question: 'How do I deploy Fabrk?',
    answer:
      'Fabrk works with any hosting provider (Vercel, Railway, AWS, etc.). We include deployment guides and environment setup instructions for popular platforms.',
  },
] as const;
