import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Use current date
  useCdn: process.env.NODE_ENV === 'production', // CDN for production
  token: process.env.SANITY_API_TOKEN, // Optional: for write operations
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Check if Sanity is configured
export function isSanityConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
  );
}

// GROQ query helpers
export async function fetchBlogPosts() {
  if (!isSanityConfigured()) {
    return [];
  }

  try {
    return await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author-> {
          name,
          image
        },
        mainImage,
        categories[]-> {
          title,
          slug
        }
      }
    `);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPost(slug: string) {
  if (!isSanityConfigured()) {
    return null;
  }

  try {
    return await client.fetch(
      `
      *[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author-> {
          name,
          image,
          bio
        },
        mainImage,
        body,
        categories[]-> {
          title,
          slug
        }
      }
    `,
      { slug }
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function fetchDocPages() {
  if (!isSanityConfigured()) {
    return [];
  }

  try {
    return await client.fetch(`
      *[_type == "docPage"] | order(order asc) {
        _id,
        title,
        slug,
        category,
        order,
        excerpt
      }
    `);
  } catch (error) {
    console.error('Error fetching doc pages:', error);
    return [];
  }
}

export async function fetchDocPage(slug: string) {
  if (!isSanityConfigured()) {
    return null;
  }

  try {
    return await client.fetch(
      `
      *[_type == "docPage" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        category,
        order,
        excerpt,
        content
      }
    `,
      { slug }
    );
  } catch (error) {
    console.error('Error fetching doc page:', error);
    return null;
  }
}
