/**
 * Typesense Search Provider
 *
 * Open source Algolia alternative, self-hostable
 *
 * Setup:
 *   1. Create account at cloud.typesense.org or self-host
 *   2. Add TYPESENSE_HOST, TYPESENSE_API_KEY to .env
 */

import type { SearchProviderClient, SearchOptions, SearchResult } from './index';

function getConfig() {
  const host = process.env.TYPESENSE_HOST;
  const apiKey = process.env.TYPESENSE_API_KEY;

  if (!host) throw new Error('TYPESENSE_HOST is required');
  if (!apiKey) throw new Error('TYPESENSE_API_KEY is required');

  return { host, apiKey };
}

export class TypesenseProvider implements SearchProviderClient {
  async search<T = any>(options: SearchOptions): Promise<SearchResult<T>> {
    const config = getConfig();
    const collection = options.index || 'default';

    const params = new URLSearchParams({
      q: options.query,
      query_by: '*',
      per_page: String(options.limit || 20),
      page: String(options.offset ? Math.floor(options.offset / (options.limit || 20)) + 1 : 1),
    });

    if (options.filters) {
      params.set('filter_by', Object.entries(options.filters).map(([k, v]) => k + ':=' + v).join(' && '));
    }

    const res = await fetch(
      config.host + '/collections/' + collection + '/documents/search?' + params.toString(),
      {
        headers: { 'X-TYPESENSE-API-KEY': config.apiKey },
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Typesense error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      hits: data.hits?.map((h: any) => h.document) as T[],
      total: data.found,
      page: data.page,
      processingTimeMs: data.search_time_ms,
    };
  }

  async index(indexName: string, documents: any[]): Promise<void> {
    const config = getConfig();

    // Import documents as JSONL
    const jsonl = documents.map((doc) => JSON.stringify(doc)).join('\n');

    const res = await fetch(
      config.host + '/collections/' + indexName + '/documents/import?action=upsert',
      {
        method: 'POST',
        headers: {
          'X-TYPESENSE-API-KEY': config.apiKey,
          'Content-Type': 'text/plain',
        },
        body: jsonl,
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Typesense index error: ' + res.status + ' - ' + error);
    }
  }

  async delete(indexName: string, ids: string[]): Promise<void> {
    const config = getConfig();

    for (const id of ids) {
      await fetch(
        config.host + '/collections/' + indexName + '/documents/' + id,
        {
          method: 'DELETE',
          headers: { 'X-TYPESENSE-API-KEY': config.apiKey },
        }
      );
    }
  }
}
