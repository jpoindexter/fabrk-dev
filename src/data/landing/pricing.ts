/**
 * Pricing Data - Single source of truth
 * Used by: PricingCard (Hero, Pricing Section, ExitIntentPopup, StickyCTABar)
 */

export const PRICING = {
  original: 499,
  current: 399,
  currency: 'USD',
  display: {
    original: '$499',
    current: '$399',
  },
  discount: {
    percentage: 20,
    endsAt: new Date('2025-12-31T23:59:59Z'), // Launch pricing expires Dec 31
    label: 'LAUNCH PRICING - LIMITED AVAILABILITY',
  },
  urgency: {
    licensesLeft: 50,
    priceIncrease: '$499',
    message: 'Price increases to $499 after launch period',
  },
  features: [
    '60+ PRODUCTION-READY COMPONENTS',
    'AUTH, BILLING & MULTI-TENANCY',
    'LIFETIME UPDATES (NO SUBSCRIPTION)',
    'UNLIMITED PROJECTS & CLIENTS',
    'COMMERCIAL LICENSE INCLUDED',
    'SAVE 100+ HOURS OF DEVELOPMENT',
    'PREMIUM SUPPORT & DOCUMENTATION',
    'WCAG 2.1 AA ACCESSIBLE',
  ],
  cta: {
    label: '> BUY NOW',
  },
  trustLine: 'Secure checkout via Polar │ All sales final',
} as const;
