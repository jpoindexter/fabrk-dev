/**
 * Metadata Configuration
 * SEO and social media metadata for the application
 *
 * Schema generators live in @/lib/seo/structured-data.ts
 * This file handles Next.js Metadata objects only.
 */

import type { Metadata } from 'next';
import appConfig from '@/config/app';

export const siteConfig = {
  name: appConfig.app.name,
  description: appConfig.app.description,
  url: appConfig.app.url,
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/yourusername/fabrk-boilerplate',
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'SaaS',
    'Boilerplate',
    'Authentication',
    'Stripe',
    'Prisma',
  ],
  authors: [
    {
      name: appConfig.app.author,
      url: siteConfig.url,
    },
  ],
  creator: appConfig.app.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

interface GenerateMetadataProps {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  path?: string;
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  path = '',
}: GenerateMetadataProps): Metadata {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const metaDescription = description || siteConfig.description;
  const ogImage = image || siteConfig.ogImage;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: metaDescription,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Re-exports from seo/structured-data for backward compatibility.
 * New code should import directly from '@/lib/seo/structured-data'.
 */
export {
  generateOrganizationSchema,
  generateProductSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateBlogPostSchema,
  generateArticleSchema,
  generateWebSiteSchema,
} from '@/lib/seo/structured-data';
