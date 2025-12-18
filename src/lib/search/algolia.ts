/**
 * Algolia Search Provider
 *
 * Fastest, typo-tolerant, great UX
 *
 * Setup:
 *   1. Create account at algolia.com
 *   2. Add ALGOLIA_APP_ID, ALGOLIA_API_KEY to .env
 */

import type { SearchProviderClient, SearchOptions, SearchResult } from './index';

function getConfig() {
  const appId = process.env.ALGOLIA_APP_ID;
  const apiKey = process.env.ALGOLIA_API_KEY;

  if (!appId) throw new Error('ALGOLIA_APP_ID is required');
  if (!apiKey) throw new Error('ALGOLIA_API_KEY is required');

  return { appId, apiKey };
}

export class AlgoliaProvider implements SearchProviderClient {
  async search<T = any>(options: SearchOptions): Promise<SearchResult<T>> {
    const config = getConfig();
    const indexName = options.index || 'default';

    const res = await fetch(
      'https://' + config.appId + '-dsn.algolia.net/1/indexes/' + indexName + '/query',
      {
        method: 'POST',
        headers: {
          'X-Algolia-Application-Id': config.appId,
          'X-Algolia-API-Key': config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: options.query,
          hitsPerPage: options.limit || 20,
          page: options.offset ? Math.floor(options.offset / (options.limit || 20)) : 0,
          filters: options.filters ? Object.entries(options.filters).map(([k, v]) => k + ':' + v).join(' AND ') : undefined,
        }),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Algolia error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      hits: data.hits as T[],
      total: data.nbHits,
      page: data.page,
      processingTimeMs: data.processingTimeMS,
    };
  }

  async index(indexName: string, documents: any[]): Promise<void> {
    const config = getConfig();

    const res = await fetch(
      'https://' + config.appId + '-dsn.algolia.net/1/indexes/' + indexName + '/batch',
      {
        method: 'POST',
        headers: {
          'X-Algolia-Application-Id': config.appId,
          'X-Algolia-API-Key': config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: documents.map((doc) => ({
            action: 'updateObject',
            body: doc,
          })),
        }),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Algolia index error: ' + res.status + ' - ' + error);
    }
  }

  async delete(indexName: string, ids: string[]): Promise<void> {
    const config = getConfig();

    const res = await fetch(
      'https://' + config.appId + '-dsn.algolia.net/1/indexes/' + indexName + '/batch',
      {
        method: 'POST',
        headers: {
          'X-Algolia-Application-Id': config.appId,
          'X-Algolia-API-Key': config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: ids.map((id) => ({
            action: 'deleteObject',
            body: { objectID: id },
          })),
        }),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Algolia delete error: ' + res.status + ' - ' + error);
    }
  }
}
