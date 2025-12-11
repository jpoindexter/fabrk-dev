/**
 * Time Savings Data - Breakdown showing where 215 hours come from
 * Used by: TimeSavingsSection
 */

export const TIME_BREAKDOWN = [
  {
    id: 'auth',
    task: 'Authentication Setup',
    hours: 30,
    activities: ['OAuth integration', 'Magic links', 'RBAC', 'Email verification', 'MFA/TOTP'],
  },
  {
    id: 'payments',
    task: 'Payment Integration',
    hours: 40,
    activities: [
      'Stripe setup',
      'Webhooks',
      'Customer portal',
      'Invoice generation',
      'Subscription management',
    ],
  },
  {
    id: 'multitenancy',
    task: 'Multi-Tenancy Architecture',
    hours: 50,
    activities: [
      'Organizations',
      'Team invites',
      'Permissions',
      'Team switching',
      'Role management',
    ],
  },
  {
    id: 'ai-credits',
    task: 'AI Credits System',
    hours: 25,
    activities: ['Token metering', 'Usage tracking', 'Rate limiting', 'Tier allowances'],
  },
  {
    id: 'design-system',
    task: 'Design System',
    hours: 35,
    activities: ['Component library', 'Theme system', 'Accessibility', 'Audit enforcement'],
  },
  {
    id: 'email',
    task: 'Email Templates',
    hours: 15,
    activities: ['Transactional emails', 'Welcome series', 'Billing emails', 'Org invites'],
  },
  {
    id: 'admin',
    task: 'Admin Dashboard',
    hours: 20,
    activities: ['User management', 'Analytics', 'Settings', 'Audit logs'],
  },
] as const;

// Calculate total hours
export const TOTAL_HOURS = TIME_BREAKDOWN.reduce((sum, item) => sum + item.hours, 0);
export const TOTAL_WEEKS = Math.round(TOTAL_HOURS / 40);
