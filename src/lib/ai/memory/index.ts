/**
 * Vector Memory / RAG System
 *
 * Multi-scope memory with vector search and graceful degradation.
 * Uses Qdrant when SERVICE_VECTOR_DB=true, falls back to in-memory store.
 *
 * Usage:
 *   import { addMemory, searchMemory, isMemoryAvailable } from '@/lib/ai/memory';
 *
 *   await addMemory('User prefers dark mode', 'user', userId);
 *   const results = await searchMemory('theme preferences', 'user', userId);
 */

import { logger } from '@/lib/logger';
import { getEmbeddingDimension } from './embeddings';
import { InMemoryStore } from './in-memory-store';
import { QdrantStore } from './qdrant-store';
import type { MemoryScope, MemoryEntry, MemorySearchResult, VectorStore } from './types';

// Re-export types
export type { MemoryScope, MemoryEntry, MemorySearchResult, VectorStore } from './types';

let storeInstance: VectorStore | null = null;

/**
 * Check if a vector database is configured and available.
 */
export function isMemoryAvailable(): boolean {
  return process.env.SERVICE_VECTOR_DB === 'true';
}

/**
 * Get the memory store singleton.
 * Returns Qdrant if SERVICE_VECTOR_DB=true, in-memory store otherwise.
 * Falls back to in-memory if Qdrant connection fails.
 */
export function getMemoryStore(): VectorStore {
  if (storeInstance) return storeInstance;

  if (isMemoryAvailable()) {
    try {
      storeInstance = new QdrantStore({
        host: process.env.QDRANT_HOST || 'localhost',
        port: parseInt(process.env.QDRANT_PORT || '6333', 10),
        collection: process.env.QDRANT_COLLECTION || 'fabrk_memories',
        dimension: getEmbeddingDimension(),
      });
      logger.info('[Memory] Using Qdrant vector store');
    } catch (error) {
      logger.error('[Memory] Qdrant init failed, falling back to in-memory', error);
      storeInstance = new InMemoryStore();
    }
  } else {
    storeInstance = new InMemoryStore();
    logger.info('[Memory] Using in-memory vector store (set SERVICE_VECTOR_DB=true for Qdrant)');
  }

  return storeInstance;
}

/**
 * Add a memory entry to the store.
 * Convenience wrapper with auto-generated ID and timestamp.
 */
export async function addMemory(
  content: string,
  scope: MemoryScope,
  scopeId: string,
  metadata?: Record<string, unknown>
): Promise<MemoryEntry> {
  const store = getMemoryStore();
  const entry: MemoryEntry = {
    id: crypto.randomUUID(),
    content,
    scope,
    scopeId,
    metadata,
    createdAt: new Date(),
  };

  try {
    await store.add([entry]);
    return entry;
  } catch (error) {
    logger.error('[Memory] Failed to add memory, attempting fallback', error);

    // If Qdrant fails, fall back to in-memory
    if (storeInstance instanceof QdrantStore) {
      storeInstance = new InMemoryStore();
      logger.warn('[Memory] Fell back to in-memory store after Qdrant failure');
      await storeInstance.add([entry]);
      return entry;
    }

    throw error;
  }
}

/**
 * Search for relevant memories by semantic similarity.
 * Returns results sorted by relevance score (highest first).
 */
export async function searchMemory(
  query: string,
  scope: MemoryScope,
  scopeId: string,
  limit: number = 5
): Promise<MemorySearchResult[]> {
  const store = getMemoryStore();

  try {
    return await store.search(query, scope, scopeId, limit);
  } catch (error) {
    logger.error('[Memory] Search failed, attempting fallback', error);

    // If Qdrant fails, fall back to in-memory (which may have no data)
    if (storeInstance instanceof QdrantStore) {
      storeInstance = new InMemoryStore();
      logger.warn('[Memory] Fell back to in-memory store after Qdrant search failure');
      return [];
    }

    throw error;
  }
}

/**
 * Delete memory entries by ID.
 */
export async function deleteMemory(ids: string[]): Promise<void> {
  const store = getMemoryStore();
  await store.delete(ids);
}
