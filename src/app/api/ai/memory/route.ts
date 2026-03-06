/**
 * AI Memory API
 *
 * GET  /api/ai/memory - Search memories by query, scope, and scopeId
 * POST /api/ai/memory - Add a new memory entry
 *
 * Query params (GET):
 *   - query: search text (required)
 *   - scope: 'chat' | 'project' | 'user' (required)
 *   - scopeId: scope identifier (required)
 *   - limit: max results (default: 5)
 *
 * Body (POST):
 *   - content: memory text (required)
 *   - scope: 'chat' | 'project' | 'user' (required)
 *   - scopeId: scope identifier (required)
 *   - metadata: optional key-value metadata
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { addMemory, searchMemory, deleteMemory } from '@/lib/ai/memory';
import type { MemoryScope } from '@/lib/ai/memory';

const VALID_SCOPES: MemoryScope[] = ['chat', 'project', 'user'];

function isValidScope(scope: string): scope is MemoryScope {
  return VALID_SCOPES.includes(scope as MemoryScope);
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const scope = searchParams.get('scope');
    const scopeId = searchParams.get('scopeId');
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    if (!query || !scope || !scopeId) {
      return NextResponse.json(
        { error: 'Missing required params: query, scope, scopeId' },
        { status: 400 }
      );
    }

    if (!isValidScope(scope)) {
      return NextResponse.json(
        { error: `Invalid scope: ${scope}. Must be one of: ${VALID_SCOPES.join(', ')}` },
        { status: 400 }
      );
    }

    const results = await searchMemory(query, scope, scopeId, limit);

    return NextResponse.json({
      results: results.map((r) => ({
        id: r.entry.id,
        content: r.entry.content,
        scope: r.entry.scope,
        scopeId: r.entry.scopeId,
        metadata: r.entry.metadata,
        score: r.score,
        createdAt: r.entry.createdAt.toISOString(),
      })),
      count: results.length,
    });
  } catch (error) {
    console.error('Error searching memories:', error);
    return NextResponse.json({ error: 'Failed to search memories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { content, scope, scopeId, metadata } = body;

    if (!content || !scope || !scopeId) {
      return NextResponse.json(
        { error: 'Missing required fields: content, scope, scopeId' },
        { status: 400 }
      );
    }

    if (!isValidScope(scope)) {
      return NextResponse.json(
        { error: `Invalid scope: ${scope}. Must be one of: ${VALID_SCOPES.join(', ')}` },
        { status: 400 }
      );
    }

    const entry = await addMemory(content, scope, scopeId, metadata);

    return NextResponse.json(
      {
        id: entry.id,
        content: entry.content,
        scope: entry.scope,
        scopeId: entry.scopeId,
        metadata: entry.metadata,
        createdAt: entry.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding memory:', error);
    return NextResponse.json({ error: 'Failed to add memory' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Missing required field: ids (array of memory IDs)' },
        { status: 400 }
      );
    }

    await deleteMemory(ids);

    return NextResponse.json({ deleted: ids.length });
  } catch (error) {
    console.error('Error deleting memories:', error);
    return NextResponse.json({ error: 'Failed to delete memories' }, { status: 500 });
  }
}
