/**
 * Search Providers - Unified Interface
 *
 * Supports: Algolia, Typesense, Meilisearch, Elasticsearch, Fuse.js
 *
 * Usage:
 *   import { search, getSearchProvider } from '@/lib/search'
 */

export type SearchProvider = 'algolia' | 'typesense' | 'meilisearch' | 'elasticsearch' | 'fuse';

export interface SearchOptions {
  query: string;
  index?: string;
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
}

export interface SearchResult<T = any> {
  hits: T[];
  total: number;
  page?: number;
  processingTimeMs?: number;
}

export interface SearchProviderClient {
  search<T = any>(options: SearchOptions): Promise<SearchResult<T>>;
  index?(indexName: string, documents: any[]): Promise<void>;
  delete?(indexName: string, ids: string[]): Promise<void>;
}

// Re-export individual providers
export { AlgoliaProvider } from './algolia';
export { TypesenseProvider } from './typesense';
export { MeilisearchProvider } from './meilisearch';
export { ElasticsearchProvider } from './elasticsearch';
export { FuseProvider } from './fuse';

/**
 * Get search provider based on environment config
 */
export function getSearchProvider(): SearchProviderClient {
  const provider = process.env.SEARCH_PROVIDER as SearchProvider || 'algolia';

  switch (provider) {
    case 'algolia':
      return new (require('./algolia').AlgoliaProvider)();
    case 'typesense':
      return new (require('./typesense').TypesenseProvider)();
    case 'meilisearch':
      return new (require('./meilisearch').MeilisearchProvider)();
    case 'elasticsearch':
      return new (require('./elasticsearch').ElasticsearchProvider)();
    case 'fuse':
      return new (require('./fuse').FuseProvider)();
    default:
      throw new Error('Unknown search provider: ' + provider);
  }
}

/**
 * Search using the configured provider
 */
export async function search<T = any>(options: SearchOptions): Promise<SearchResult<T>> {
  const provider = getSearchProvider();
  return provider.search<T>(options);
}
