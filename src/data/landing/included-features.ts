/**
 * Included Features Data - Checklist of table-stakes features
 * Used by: WhatsIncludedSection
 * Moves commodity features (Auth/Billing/Multi-tenancy) from hero to "included" list
 */

import { Server, Code, Palette } from 'lucide-react';
import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from './stats';

export const INCLUDED_FEATURES = [
  {
    id: 'infrastructure',
    category: 'INFRASTRUCTURE',
    icon: Server,
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
    category: 'UI',
    icon: Palette,
    features: [
      `${COMPONENT_COUNT_STRING} PRODUCTION-READY UI COMPONENTS`,
      `${THEME_COUNT_STRING} TERMINAL-INSPIRED THEMES`,
      'WCAG 2.1 AA ACCESSIBILITY COMPLIANCE',
      'FULLY RESPONSIVE MOBILE DESIGN',
      'DARK MODE SUPPORT',
    ],
  },
] as const;
