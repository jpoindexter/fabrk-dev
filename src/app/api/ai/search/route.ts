/**
 * AI Search API Route
 * Web search + AI synthesis endpoint
 */

import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { isAIConfigured } from '@/lib/ai';
import { hasCredits, deductCredits, CREDIT_COSTS } from '@/lib/credits';
import { handleSearch, type SearchOptions } from '@/lib/ai/handlers/search';

interface SearchRequest {
  query: string;
  context?: string;
  maxResults?: number;
}

export async function POST(req: NextRequest) {
  try {
    // Check if AI is configured
    if (!isAIConfigured()) {
      return Response.json(
        {
          error: 'AI not configured',
          message:
            'No AI provider configured. Set OPENAI_API_KEY, GOOGLE_AI_API_KEY, or OLLAMA_ENABLED.',
        },
        { status: 503 }
      );
    }

    // SECURITY: Require authentication to prevent API cost abuse
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { error: 'Unauthorized', message: 'Authentication required to use AI features' },
        { status: 401 }
      );
    }
    const userId = session.user.id;

    // Parse request body
    const { query, context, maxResults }: SearchRequest = await req.json();

    if (!query || typeof query !== 'string') {
      return Response.json(
        { error: 'Invalid request', message: 'query is required' },
        { status: 400 }
      );
    }

    // Check credits before processing
    const hasEnough = await hasCredits(userId, CREDIT_COSTS.TEXT_OPERATION);
    if (!hasEnough) {
      return Response.json(
        { error: 'Insufficient credits', code: 'INSUFFICIENT_CREDITS' },
        { status: 402 }
      );
    }

    // Execute search + synthesis
    const searchOptions: SearchOptions = {
      query,
      context,
      maxResults,
      userId,
      feature: 'search',
    };

    const result = await handleSearch(searchOptions);

    // Deduct credits after successful operation
    await deductCredits(userId, CREDIT_COSTS.TEXT_OPERATION, {
      description: 'AI search',
      endpoint: '/api/ai/search',
    });

    return Response.json(result);
  } catch (error) {
    console.error('[AI Search Error]:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return Response.json(
          { error: 'Configuration error', message: 'AI provider API key is invalid or missing' },
          { status: 503 }
        );
      }
    }

    return Response.json(
      { error: 'Internal error', message: 'Failed to process search request' },
      { status: 500 }
    );
  }
}
