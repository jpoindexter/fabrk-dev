import { COMPONENT_COUNT_STRING } from './stats';

export const PRICING = {
  current: 0,
  regular: 0,
  currency: 'USD',
  display: {
    current: 'FREE',
    regular: 'FREE',
  },
  promo: {
    code: 'OPENSOURCE',
    amount: 0,
    limit: 0,
    label: 'MIT licensed',
  },
  features: [
    `${COMPONENT_COUNT_STRING} PRODUCTION-READY COMPONENTS`,
    'AUTH, BILLING & MULTI-TENANCY DEMOS',
    'OPEN SOURCE — MIT LICENSED',
    'UNLIMITED PROJECTS & CLIENTS',
    'NO SUBSCRIPTION, NO ATTRIBUTION REQUIRED',
    'COMMUNITY SUPPORT & DOCUMENTATION',
    'WCAG 2.1 AA ACCESSIBLE',
  ],
  cta: {
    label: 'GET STARTED',
  },
  trustLine: 'Free forever │ MIT licensed',
} as const;
