/**
 * Core Structured Data (JSON-LD) Generators
 * Organization, SoftwareApplication, Product, WebSite, FAQ, Breadcrumb
 *
 * Content schemas (Article, BlogPost, HowTo, etc.) are in content-schemas.ts
 */

import appConfig from '@/config/app';

const siteConfig = {
  name: appConfig.app.name,
  description: appConfig.app.description,
  url: appConfig.app.url,
  links: {
    github: 'https://github.com/yourusername/fabrk-boilerplate',
  },
};

interface Organization {
  name: string;
  description: string;
  url: string;
  logo?: string;
  foundingDate?: string;
  founders?: string[];
  sameAs?: string[];
  contactPoint?: {
    contactType: string;
    email: string;
    availableLanguage: string[];
  };
}

interface Product {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  image?: string;
  brand?: string;
  sku?: string;
  offers?: {
    price: string;
    availability: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
  };
}

interface FAQ {
  question: string;
  answer: string;
  acceptedAnswerType?: 'text' | 'html';
}

/**
 * Generate Organization schema (for company/brand)
 */
export function generateOrganizationSchema(data?: Partial<Organization>) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: data?.name || siteConfig.name,
    description: data?.description || siteConfig.description,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: data?.logo || `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    foundingDate: data?.foundingDate,
    founders: data?.founders?.map((name) => ({
      '@type': 'Person',
      name,
    })),
    sameAs: data?.sameAs || [siteConfig.links.github],
    contactPoint: data?.contactPoint || {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: appConfig.app.supportEmail,
      availableLanguage: ['English'],
    },
  };
}

/**
 * Generate SoftwareApplication schema (for SaaS products)
 */
export function generateSoftwareApplicationSchema(data?: Partial<Product>) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${baseUrl}#software`,
    name: data?.name || siteConfig.name,
    description: data?.description || siteConfig.description,
    url: baseUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web, macOS, Windows, Linux',
    softwareVersion: '1.0',
    offers: {
      '@type': 'Offer',
      price: data?.price || String(appConfig.pricing.fabrk.current),
      priceCurrency: data?.priceCurrency || appConfig.pricing.fabrk.currency,
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/pricing`,
      validFrom: new Date().toISOString(),
    },
    aggregateRating: data?.aggregateRating && {
      '@type': 'AggregateRating',
      ratingValue: data.aggregateRating.ratingValue,
      reviewCount: data.aggregateRating.reviewCount,
      bestRating: data.aggregateRating.bestRating || '5',
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };
}

/**
 * Generate Product schema (simpler than SoftwareApplication)
 * Used in root layout for basic product info
 */
export function generateProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: String(appConfig.pricing.fabrk.current),
      priceCurrency: appConfig.pricing.fabrk.currency,
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Organization',
      name: appConfig.app.author,
    },
  };
}

/**
 * Generate FAQ schema (for featured snippets)
 */
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Breadcrumb schema (for navigation)
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema() {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Re-export content schemas for backward compatibility
export {
  generateArticleSchema,
  generateBlogPostSchema,
  generateHowToSchema,
  generateReviewSchema,
  generateVideoSchema,
  generateCourseSchema,
} from './content-schemas';
