import { algoliasearch } from 'algoliasearch';

// Algolia client configuration
export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
);

// Index names
export const INDICES = {
  PAGES: 'pages',
  COMPONENTS: 'components',
  TEMPLATES: 'templates',
  DOCS: 'docs',
} as const;

// Check if Algolia is configured
export function isAlgoliaConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );
}

// Search configuration
export const searchConfig = {
  hitsPerPage: 10,
  attributesToSnippet: ['content:20'],
  snippetEllipsisText: '...',
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',
};

// Type definitions for search results
export interface SearchHit {
  objectID: string;
  title: string;
  description?: string;
  url: string;
  category: string;
  content?: string;
  _highlightResult?: {
    title?: {
      value: string;
      matchLevel: string;
    };
    description?: {
      value: string;
      matchLevel: string;
    };
  };
}

export interface PageHit extends SearchHit {
  type: 'page';
}

export interface ComponentHit extends SearchHit {
  type: 'component';
  componentName: string;
}

export interface TemplateHit extends SearchHit {
  type: 'template';
  templateName: string;
}

export interface DocHit extends SearchHit {
  type: 'doc';
  section: string;
}
