import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Fabrk team. Contact us for sales inquiries, technical support, or partnership opportunities.',
  openGraph: {
    title: 'Contact Us | Fabrk',
    description:
      'Get in touch with the Fabrk team for sales, support, or partnership opportunities.',
    type: 'website',
    url: `${baseUrl}/contact`,
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
