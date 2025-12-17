/**
 * Pricing Data - Single source of truth
 * Used by: PricingCard (Hero, Pricing Section, ExitIntentPopup, StickyCTABar)
 */

import { COMPONENT_COUNT_STRING } from './stats';

export const PRICING = {
  launch: 199,
  regular: 299,
  currency: 'USD',
  display: {
    launch: '$199',
    regular: '$299',
  },
  discount: {
    amount: 100,
    totalCoupons: 100,
    label: 'LAUNCH PRICE - First 100 buyers',
  },
  features: [
    `${COMPONENT_COUNT_STRING} PRODUCTION-READY COMPONENTS`,
    'AUTH, BILLING & MULTI-TENANCY',
    'LIFETIME UPDATES (NO SUBSCRIPTION)',
    'UNLIMITED PROJECTS & CLIENTS',
    'COMMERCIAL LICENSE INCLUDED',
    'PREMIUM SUPPORT & DOCUMENTATION',
    'WCAG 2.1 AA ACCESSIBLE',
  ],
  cta: {
    label: 'BUY NOW',
  },
  trustLine: 'Secure checkout via Polar │ All sales final',
} as const;
