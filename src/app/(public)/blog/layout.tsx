import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Latest articles, tutorials, and updates from the Fabrk team. Learn about Next.js, SaaS development, and building production-ready applications.',
  openGraph: {
    title: 'Blog | Fabrk',
    description:
      'Articles and tutorials on Next.js, SaaS development, and building production apps.',
    type: 'website',
    url: `${baseUrl}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Fabrk',
    description: 'Articles and tutorials on Next.js and SaaS development.',
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
    types: {
      'application/rss+xml': `${baseUrl}/feed.xml`,
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
