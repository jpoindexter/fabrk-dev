/**
 * Content-Related JSON-LD Schema Generators
 * Article, BlogPost, HowTo, Review, Video, Course schemas
 */

import appConfig from '@/config/app';

const siteConfig = {
  name: appConfig.app.name,
  description: appConfig.app.description,
  url: appConfig.app.url,
};

interface Article {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  articleSection?: string;
  wordCount?: number;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface Review {
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: {
    ratingValue: number;
    bestRating?: number;
  };
}

/**
 * Generate Article schema (for blog posts and content pages)
 * Critical for AEO - helps content appear in featured snippets
 */
export function generateArticleSchema(data: Article) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    image: data.image || `${baseUrl}/og-image.png`,
    articleSection: data.articleSection,
    wordCount: data.wordCount,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': baseUrl,
    },
  };
}

/**
 * Generate BlogPosting JSON-LD structured data
 */
export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: { name: string; url?: string };
  image?: string;
  tags?: string[];
}) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${baseUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || appConfig.app.author,
      url: post.author?.url || baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    image: post.image || `${baseUrl}/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
  };
}

/**
 * Generate HowTo schema (for tutorial content)
 */
export function generateHowToSchema(data: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  estimatedCost?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    totalTime: data.totalTime,
    estimatedCost: data.estimatedCost && {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: data.estimatedCost,
    },
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
    })),
  };
}

/**
 * Generate Review schema (for testimonials)
 */
export function generateReviewSchema(reviews: Review[], productName?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName || siteConfig.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (
        reviews.reduce((sum, r) => sum + r.reviewRating.ratingValue, 0) / reviews.length
      ).toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.reviewRating.ratingValue,
        bestRating: review.reviewRating.bestRating || 5,
      },
    })),
  };
}

/**
 * Generate VideoObject schema (for video content)
 */
export function generateVideoSchema(data: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: data.name,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    uploadDate: data.uploadDate,
    duration: data.duration,
    contentUrl: data.contentUrl,
    embedUrl: data.contentUrl,
  };
}

/**
 * Generate Course schema (for educational content)
 */
export function generateCourseSchema(data: {
  name: string;
  description: string;
  provider: string;
}) {
  const baseUrl = siteConfig.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: data.provider,
      sameAs: baseUrl,
    },
  };
}
