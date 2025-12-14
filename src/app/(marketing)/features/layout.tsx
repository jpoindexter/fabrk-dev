import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore all Fabrk features: 77 UI components, 12 themes, multi-provider payments, authentication, and more. Everything you need to ship your SaaS.',
  openGraph: {
    title: 'Features | Fabrk',
    description:
      '77 UI components, 12 themes, multi-provider payments, and everything you need to ship your SaaS.',
    type: 'website',
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
