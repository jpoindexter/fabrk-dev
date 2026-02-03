import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Complete documentation for Fabrk boilerplate. Learn how to customize, deploy, and extend your SaaS application.',
  openGraph: {
    title: 'Documentation | Fabrk',
    description:
      'Complete documentation for customizing, deploying, and extending your Fabrk SaaS app.',
    type: 'website',
    url: `${baseUrl}/docs`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation | Fabrk',
    description: 'Complete documentation for the Fabrk Next.js SaaS boilerplate.',
  },
  alternates: {
    canonical: `${baseUrl}/docs`,
  },
};

export default function DocsPage() {
  redirect('/docs/getting-started');
}
