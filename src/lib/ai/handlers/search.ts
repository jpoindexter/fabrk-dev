/**
 * AI Search/Research Handler
 * Web search + AI synthesis for research queries.
 *
 * When SERVICE_SEARCH env var is set, queries a SearXNG instance for web results
 * and synthesizes them with AI. When no search service is available, gracefully
 * degrades to an AI-only response.
 */

import { generateText } from 'ai';
import { getModel, isAIConfigured } from '@/lib/ai';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SearchOptions {
  query: string;
  context?: string;
  maxResults?: number;
  userId?: string;
  feature?: string;
}

export interface SearchResult {
  answer: string;
  sources: Array<{ title: string; url: string; snippet: string }>;
  searchAvailable: boolean;
}

interface SearXNGResult {
  title: string;
  url: string;
  content: string;
}

interface SearXNGResponse {
  results: SearXNGResult[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSearchServiceUrl(): string | null {
  return process.env.SERVICE_SEARCH || null;
}

/**
 * Use AI to plan effective search queries from the user's input.
 * Returns 1-3 focused queries for the search engine.
 */
async function planSearchQueries(query: string, context?: string): Promise<string[]> {
  const contextBlock = context ? `\nAdditional context: ${context}` : '';

  const { text } = await generateText({
    model: getModel(),
    system:
      'You are a search query planner. Given a user question, output 1 to 3 concise search engine queries that would best answer it. Return ONLY the queries, one per line. No numbering, no explanations.',
    prompt: `User question: ${query}${contextBlock}`,
  });

  return text
    .split('\n')
    .map((q) => q.trim())
    .filter(Boolean)
    .slice(0, 3);
}

/**
 * Execute a single search query against the SearXNG instance.
 */
async function executeSearch(
  serviceUrl: string,
  query: string,
  maxResults: number
): Promise<Array<{ title: string; url: string; snippet: string }>> {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    categories: 'general',
  });

  const response = await fetch(`${serviceUrl}/search?${params.toString()}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error(`[Search] SearXNG returned ${response.status} for query: ${query}`);
    return [];
  }

  const data = (await response.json()) as SearXNGResponse;

  return (data.results || []).slice(0, maxResults).map((r) => ({
    title: r.title || '',
    url: r.url || '',
    snippet: r.content || '',
  }));
}

/**
 * Deduplicate sources by URL, keeping the first occurrence.
 */
function deduplicateSources(
  sources: Array<{ title: string; url: string; snippet: string }>
): Array<{ title: string; url: string; snippet: string }> {
  const seen = new Set<string>();
  return sources.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
}

/**
 * Synthesize search results into a coherent answer using AI.
 */
async function synthesize(
  query: string,
  sources: Array<{ title: string; url: string; snippet: string }>,
  context?: string
): Promise<string> {
  const sourcesBlock = sources
    .map((s, i) => `[${i + 1}] ${s.title}\n    ${s.url}\n    ${s.snippet}`)
    .join('\n\n');

  const contextBlock = context ? `\nAdditional context from the user: ${context}` : '';

  const { text } = await generateText({
    model: getModel(),
    system:
      'You are a research assistant. Synthesize the provided search results into a clear, well-structured answer. Cite sources using [1], [2], etc. when referencing specific information. If the search results are insufficient, say so honestly.',
    prompt: `Question: ${query}${contextBlock}\n\nSearch Results:\n${sourcesBlock}`,
  });

  return text;
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

/**
 * Execute a search + AI synthesis flow.
 *
 * 1. Plan search queries from the user's input (using AI).
 * 2. Execute queries against the configured search service.
 * 3. Synthesize results into a coherent answer.
 *
 * When no search service is configured, falls back to AI-only response.
 */
export async function handleSearch(options: SearchOptions): Promise<SearchResult> {
  const { query, context, maxResults = 5 } = options;

  if (!isAIConfigured()) {
    throw new Error('No AI provider configured');
  }

  const serviceUrl = getSearchServiceUrl();

  // -- Graceful degradation: AI-only when no search service is available --
  if (!serviceUrl) {
    const { text } = await generateText({
      model: getModel(),
      system:
        'You are a helpful research assistant. Answer the question to the best of your knowledge. Note: you do not have access to live web search, so your answer is based solely on your training data.',
      prompt: context ? `${query}\n\nContext: ${context}` : query,
    });

    return {
      answer: text,
      sources: [],
      searchAvailable: false,
    };
  }

  // -- Full search + synthesis flow --
  // Step 1: Plan queries
  const queries = await planSearchQueries(query, context);

  // Step 2: Execute searches in parallel
  const searchPromises = queries.map((q) => executeSearch(serviceUrl, q, maxResults));
  const searchResultArrays = await Promise.all(searchPromises);

  // Flatten and deduplicate
  const allSources = deduplicateSources(searchResultArrays.flat()).slice(0, maxResults);

  // Step 3: Synthesize (or fall back if no results came back)
  let answer: string;
  if (allSources.length === 0) {
    const { text } = await generateText({
      model: getModel(),
      system:
        'You are a helpful research assistant. The search returned no results. Answer the question to the best of your knowledge and mention that no web sources were found.',
      prompt: context ? `${query}\n\nContext: ${context}` : query,
    });
    answer = text;
  } else {
    answer = await synthesize(query, allSources, context);
  }

  return {
    answer,
    sources: allSources,
    searchAvailable: true,
  };
}
