import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Fabrk - the terminal-first SaaS boilerplate built for developers who ship fast. Our mission, values, and story.',
  openGraph: {
    title: 'About Us | Fabrk',
    description:
      'Learn about Fabrk - the terminal-first SaaS boilerplate built for developers who ship fast.',
    type: 'website',
    url: `${baseUrl}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Fabrk',
    description: 'Learn about Fabrk - the terminal-first SaaS boilerplate for developers.',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
