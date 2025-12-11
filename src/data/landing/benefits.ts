/**
 * Benefits Data - Core value propositions
 * Moved from features-showcase.tsx for data layer
 */

import { Lock, CreditCard, Users } from 'lucide-react';

export const CORE_BENEFITS = [
  {
    id: 'auth',
    icon: Lock,
    module: 'AUTH & SECURITY',
    code: '0x10',
    title: 'Authentication & Security',
    benefit: 'Launch with enterprise-grade auth in minutes, not months',
    description:
      'NextAuth v5 with Google, GitHub, email magic links, and JWT sessions. Role-based access control, password reset flows, and email verification built-in.',
    timeSaved: '30 HOURS',
    costSaved: '$6K',
    features: ['Social OAuth', 'Magic Links', 'RBAC', 'Password Reset', 'Email Verification'],
  },
  {
    id: 'billing',
    icon: CreditCard,
    module: 'BILLING & PAYMENTS',
    code: '0x11',
    title: 'Billing & Payments',
    benefit: 'Start monetizing day one with production-ready payments',
    description:
      'Polar.sh integration with subscription management, one-time payments, and webhook handling. Customer portal, invoice generation, and payment history included.',
    timeSaved: '40 HOURS',
    costSaved: '$8K',
    features: ['Subscriptions', 'One-Time Payments', 'Webhooks', 'Customer Portal', 'Invoices'],
  },
  {
    id: 'multitenancy',
    icon: Users,
    module: 'MULTI-TENANCY',
    code: '0x12',
    title: 'Multi-Tenancy & Teams',
    benefit: 'Scale to enterprise with B2B team features out of the box',
    description:
      'Organization management with invites, role permissions, and team switching. Member management, audit logs, and organization-level billing ready to go.',
    timeSaved: '50 HOURS',
    costSaved: '$10K',
    features: ['Organizations', 'Team Invites', 'Role Permissions', 'Team Switching', 'Audit Logs'],
  },
] as const;
