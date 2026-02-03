import type { Metadata } from 'next';
import { COMPONENT_COUNT_STRING, THEME_COUNT_STRING } from '@/data/landing/stats';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Features',
  description: `Explore all Fabrk features: ${COMPONENT_COUNT_STRING} UI components, ${THEME_COUNT_STRING} themes, multi-provider payments, authentication, and more. Everything you need to ship your SaaS.`,
  openGraph: {
    title: 'Features | Fabrk',
    description: `${COMPONENT_COUNT_STRING} UI components, ${THEME_COUNT_STRING} themes, multi-provider payments, and everything you need to ship your SaaS.`,
    type: 'website',
    url: `${baseUrl}/features`,
  },
  alternates: {
    canonical: `${baseUrl}/features`,
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
