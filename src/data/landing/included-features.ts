/**
 * Included Features Data - Checklist of table-stakes features
 * Used by: WhatsIncludedSection
 * Moves commodity features (Auth/Billing/Multi-tenancy) from hero to "included" list
 */

import { Server, Code, Palette } from 'lucide-react';
import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from './stats';

export interface IncludedFeature {
  id: string;
  category: string;
  icon: typeof Server;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  features: string[];
}

export const INCLUDED_FEATURES: IncludedFeature[] = [
  {
    id: 'infrastructure',
    category: 'INFRASTRUCTURE',
    icon: Server,
    description:
      'Integrated authentication, diverse payment gateways, robust database, and seamless email. Reduce setup from weeks to hours.',
    stats: [
      { label: 'SETUP TIME', value: '~1 DAY' },
      { label: 'MAINTENANCE', value: 'MINIMAL' },
    ],
    features: [
      'NEXTAUTH V5 (GOOGLE OAUTH, MAGIC LINKS, EMAIL/PASSWORD)',
      'STRIPE, LEMON SQUEEZY, POLAR.SH PAYMENT PROCESSING',
      'MULTI-TENANCY (ORGANIZATIONS, TEAMS, PERMISSIONS)',
      'PRISMA ORM WITH POSTGRESQL DATABASE',
      'RESEND EMAIL INTEGRATION (TRANSACTIONAL + MARKETING)',
    ],
  },
  {
    id: 'development',
    category: 'DEVELOPMENT',
    icon: Code,
    description:
      'Production-grade tooling with strict TypeScript, automated linting, and quality enforcement. Ship with confidence.',
    stats: [
      { label: 'TYPE COVERAGE', value: '100%' },
      { label: 'CODE QUALITY', value: 'STRICT' },
    ],
    features: [
      'TYPESCRIPT STRICT MODE WITH FULL TYPE SAFETY',
      'ESLINT + PRETTIER PRE-COMMIT HOOKS',
      '58-FILE DESIGN SYSTEM AUDIT ENFORCEMENT',
      'ENVIRONMENT VARIABLE VALIDATION (ZOD)',
      'GIT HOOKS FOR QUALITY CONTROL',
    ],
  },
  {
    id: 'ui',
    category: 'UI LIBRARY',
    icon: Palette,
    description:
      'Complete component library with terminal-inspired design. Accessible, responsive, and theme-ready out of the box.',
    stats: [
      { label: 'COMPONENTS', value: COMPONENT_COUNT_STRING },
      { label: 'THEMES', value: THEME_COUNT_STRING },
    ],
    features: [
      `${COMPONENT_COUNT_STRING} PRODUCTION-READY UI COMPONENTS`,
      `${THEME_COUNT_STRING} TERMINAL-INSPIRED THEMES`,
      'WCAG 2.1 AA ACCESSIBILITY COMPLIANCE',
      'FULLY RESPONSIVE MOBILE DESIGN',
      'DARK MODE SUPPORT',
    ],
  },
];
