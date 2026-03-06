/**
 * Embedding Generation
 *
 * Generates vector embeddings for memory entries using the Vercel AI SDK.
 * Falls back to empty array if no embedding model is available.
 */

import { logger } from '@/lib/logger';

/**
 * Generate a vector embedding for the given text.
 * Returns an empty array if no embedding provider is configured.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // Try OpenAI embeddings first (most common for vector search)
  if (process.env.OPENAI_API_KEY) {
    try {
      const { embed } = await import('ai');
      const { createOpenAI } = await import('@ai-sdk/openai');
      const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const model = openai.embedding('text-embedding-3-small');

      const { embedding } = await embed({ model, value: text });
      return embedding;
    } catch (error) {
      logger.error('[Memory] OpenAI embedding failed', error);
    }
  }

  // Try Google embeddings as fallback
  if (process.env.GOOGLE_AI_API_KEY) {
    try {
      const { embed } = await import('ai');
      const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
      const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
      const model = google.textEmbeddingModel('text-embedding-004');

      const { embedding } = await embed({ model, value: text });
      return embedding;
    } catch (error) {
      logger.error('[Memory] Google embedding failed', error);
    }
  }

  // No embedding provider available - return empty array
  logger.warn('[Memory] No embedding provider configured, using empty embedding');
  return [];
}

/**
 * Get the embedding dimension for the configured provider.
 * Used when creating vector store collections.
 */
export function getEmbeddingDimension(): number {
  if (process.env.OPENAI_API_KEY) return 1536; // text-embedding-3-small
  if (process.env.GOOGLE_AI_API_KEY) return 768; // text-embedding-004
  return 1536; // default
}
