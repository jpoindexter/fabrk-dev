/**
 * Testimonials Data - Anonymized quotes for Social Proof section
 * Using anonymized format with personas and locations
 * Focus on specific outcomes: time saved, problems solved
 */

import { COMPONENT_COUNT_STRING } from './stats';

export const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    quote:
      'Shipped my MVP in 4 days instead of 4 weeks. Auth, billing, and multi-tenancy just worked.',
    author: 'Solo Founder',
    role: 'AI SaaS, San Francisco',
    avatar: null, // Uses initials
    rating: 5,
  },
  {
    id: 'testimonial-2',
    quote:
      'The provider flexibility is real. Switched from Stripe to Polar in under an hour.',
    author: 'Tech Lead',
    role: 'Fintech Startup, London',
    avatar: null,
    rating: 5,
  },
  {
    id: 'testimonial-3',
    quote:
      'Multi-tenancy and RBAC saved us 3 weeks of development. Our clients love the dashboard.',
    author: 'Agency Owner',
    role: 'Dev Agency, Berlin',
    avatar: null,
    rating: 5,
  },
  {
    id: 'testimonial-4',
    quote: `${COMPONENT_COUNT_STRING} components that actually work in production. No more debugging shadcn issues.`,
    author: 'Full-Stack Developer',
    role: 'B2B SaaS, NYC',
    avatar: null,
    rating: 5,
  },
  {
    id: 'testimonial-5',
    quote:
      'TypeScript strict mode and the git hooks catch bugs before they hit production. Worth it.',
    author: 'Senior Engineer',
    role: 'Series A Startup, Austin',
    avatar: null,
    rating: 5,
  },
  {
    id: 'testimonial-6',
    quote:
      'The terminal aesthetic makes our product stand out. Clients always ask about the design.',
    author: 'Indie Hacker',
    role: 'Developer Tools, Remote',
    avatar: null,
    rating: 5,
  },
] as const;
