/**
 * Elasticsearch Provider
 *
 * Full-text search, enterprise grade
 *
 * Setup:
 *   1. Create account at cloud.elastic.co or self-host
 *   2. Add ELASTICSEARCH_URL to .env
 */

import type { SearchProviderClient, SearchOptions, SearchResult } from './index';

function getConfig() {
  const url = process.env.ELASTICSEARCH_URL;
  if (!url) throw new Error('ELASTICSEARCH_URL is required');
  return { url };
}

export class ElasticsearchProvider implements SearchProviderClient {
  async search<T = any>(options: SearchOptions): Promise<SearchResult<T>> {
    const config = getConfig();
    const indexName = options.index || 'default';

    const query: any = {
      query: {
        multi_match: {
          query: options.query,
          fields: ['*'],
          fuzziness: 'AUTO',
        },
      },
      from: options.offset || 0,
      size: options.limit || 20,
    };

    if (options.filters) {
      query.query = {
        bool: {
          must: query.query,
          filter: Object.entries(options.filters).map(([k, v]) => ({
            term: { [k]: v },
          })),
        },
      };
    }

    const res = await fetch(
      config.url + '/' + indexName + '/_search',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Elasticsearch error: ' + res.status + ' - ' + error);
    }

    const data = await res.json();
    return {
      hits: data.hits.hits.map((h: any) => ({ ...h._source, _id: h._id })) as T[],
      total: data.hits.total?.value || data.hits.total || 0,
      processingTimeMs: data.took,
    };
  }

  async index(indexName: string, documents: any[]): Promise<void> {
    const config = getConfig();

    // Bulk index
    const body = documents.flatMap((doc) => [
      { index: { _index: indexName, _id: doc.id || doc._id } },
      doc,
    ]);

    const res = await fetch(
      config.url + '/_bulk',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-ndjson' },
        body: body.map((line) => JSON.stringify(line)).join('\n') + '\n',
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Elasticsearch index error: ' + res.status + ' - ' + error);
    }
  }

  async delete(indexName: string, ids: string[]): Promise<void> {
    const config = getConfig();

    const body = ids.flatMap((id) => [
      { delete: { _index: indexName, _id: id } },
    ]);

    const res = await fetch(
      config.url + '/_bulk',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-ndjson' },
        body: body.map((line) => JSON.stringify(line)).join('\n') + '\n',
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error('Elasticsearch delete error: ' + res.status + ' - ' + error);
    }
  }
}
