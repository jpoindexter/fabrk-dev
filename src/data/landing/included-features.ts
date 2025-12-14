/**
 * Included Features Data - Checklist of table-stakes features
 * Used by: WhatsIncludedSection
 * Moves commodity features (Auth/Billing/Multi-tenancy) from hero to "included" list
 */

export const INCLUDED_FEATURES = {
  infrastructure: [
    'NextAuth v5 (Google OAuth, Magic Links, Email/Password)',
    'Stripe, Lemon Squeezy, Polar.sh payment processing',
    'Multi-Tenancy (Organizations, Teams, Permissions)',
    'Prisma ORM with PostgreSQL database',
    'Resend email integration (transactional + marketing)',
  ],
  development: [
    'TypeScript strict mode with full type safety',
    'ESLint + Prettier pre-commit hooks',
    '58-file design system audit enforcement',
    'Environment variable validation (Zod)',
    'Git hooks for quality control',
  ],
  ui: [
    '70+ production-ready UI components',
    '12 terminal-inspired themes',
    'WCAG 2.1 AA accessibility compliance',
    'Fully responsive mobile design',
    'Dark mode support',
  ],
} as const;
