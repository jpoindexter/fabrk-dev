/**
 * Fuse.js Search Provider
 *
 * Client-side fuzzy search, no API needed
 *
 * Setup:
 *   No API keys required - works entirely client-side
 */

import Fuse from 'fuse.js';
import type { SearchProviderClient, SearchOptions, SearchResult } from './index';

// In-memory data store (in a real app, this would be loaded from somewhere)
const dataStore: Map<string, any[]> = new Map();

export class FuseProvider implements SearchProviderClient {
  async search<T = any>(options: SearchOptions): Promise<SearchResult<T>> {
    const indexName = options.index || 'default';
    const data = dataStore.get(indexName) || [];

    const startTime = Date.now();

    const fuse = new Fuse(data, {
      keys: Object.keys(data[0] || {}),
      threshold: 0.3,
      includeScore: true,
    });

    let results = fuse.search(options.query);

    // Apply filters
    if (options.filters) {
      results = results.filter((r) => {
        return Object.entries(options.filters || {}).every(([key, value]) => {
          return (r.item as any)[key] === value;
        });
      });
    }

    // Apply pagination
    const offset = options.offset || 0;
    const limit = options.limit || 20;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      hits: paginatedResults.map((r) => r.item) as T[],
      total: results.length,
      processingTimeMs: Date.now() - startTime,
    };
  }

  async index(indexName: string, documents: any[]): Promise<void> {
    const existing = dataStore.get(indexName) || [];
    
    // Merge/upsert documents
    const merged = [...existing];
    for (const doc of documents) {
      const existingIdx = merged.findIndex((d) => d.id === doc.id);
      if (existingIdx >= 0) {
        merged[existingIdx] = doc;
      } else {
        merged.push(doc);
      }
    }

    dataStore.set(indexName, merged);
  }

  async delete(indexName: string, ids: string[]): Promise<void> {
    const existing = dataStore.get(indexName) || [];
    const filtered = existing.filter((doc) => !ids.includes(doc.id));
    dataStore.set(indexName, filtered);
  }
}
