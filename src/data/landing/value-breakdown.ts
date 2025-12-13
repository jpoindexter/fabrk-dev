/**
 * Value Breakdown Data - Receipt-style value proposition
 * Used by: ValueBreakdownSection
 * Shows $51K+ value for $399 price to anchor perceived value
 */

export const VALUE_ITEMS = [
  { item: '75+ Production Components', value: '$15,000' },
  { item: 'Authentication System (NextAuth v5)', value: '$6,000' },
  { item: 'Payment Processing (3 providers)', value: '$8,000' },
  { item: 'Multi-Tenancy Architecture', value: '$10,000' },
  { item: 'AI Credits System', value: '$4,000' },
  { item: 'Terminal Design System (18 themes)', value: '$5,000' },
  { item: 'WCAG 2.1 AA Compliance', value: '$3,000' },
] as const;

export const VALUE_TOTALS = {
  total: '$51,000',
  price: '$399',
  savings: '$50,601',
  discount: '99.2%',
} as const;
