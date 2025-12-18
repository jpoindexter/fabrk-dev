/**
 * Meilisearch Provider
 *
 * Open source, easy to use, self-hostable
 *
 * Setup:
 *   1. Create account at cloud.meilisearch.com or self-host
 *   2. Add MEILISEARCH_HOST, MEILISEARCH_API_KEY to .env
 */

import type { SearchProviderClient, SearchOptions, SearchResult } from './index';

function getConfig() {
  const host = process.env.MEILISEARCH_HOST || 'http://localhost:7700';
  const apiKey = process.env.MEILISEARCH_API_KEY;

  return { host, apiKey };
}

export class MeilisearchProvider implements SearchProviderClient {
  async search<T = any>(options: SearchOptions): Promise<SearchResult<T>> {
    const config = getConfig();
    const indexName = options.index || 'default';

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (config.apiKey) {
      headers['Authorization'] = 'Bearer ' + config.apiKey;
    }

    const res = await fetch(
      config.host + '/indexes/' + indexName + '/search',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          q: options.query,
          limit: options.limit || 20,
          offset: options.offset || 0,
          filter: options.filters ? Object.entries(options.filters).map(([k, v]) => k + ' = "' + v + '"') : undefined,
        }),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Meilisearch error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      hits: data.hits as T[],
      total: data.estimatedTotalHits || data.hits.length,
      processingTimeMs: data.processingTimeMs,
    };
  }

  async index(indexName: string, documents: any[]): Promise<void> {
    const config = getConfig();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (config.apiKey) {
      headers['Authorization'] = 'Bearer ' + config.apiKey;
    }

    const res = await fetch(
      config.host + '/indexes/' + indexName + '/documents',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(documents),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Meilisearch index error: ' + res.status + ' - ' + error);
    }
  }

  async delete(indexName: string, ids: string[]): Promise<void> {
    const config = getConfig();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (config.apiKey) {
      headers['Authorization'] = 'Bearer ' + config.apiKey;
    }

    const res = await fetch(
      config.host + '/indexes/' + indexName + '/documents/delete-batch',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(ids),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Meilisearch delete error: ' + res.status + ' - ' + error);
    }
  }
}
