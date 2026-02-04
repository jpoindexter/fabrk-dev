/**
 * Neon PostgreSQL Integration for AI Cost Tracking
 *
 * Optional high-performance database layer using Neon's serverless driver.
 * Automatically used if NEON_API_KEY is configured.
 */

import { sql } from '@neondatabase/serverless';
import { env } from '@/lib/env';

export type NeonClient = ReturnType<typeof sql>;

/**
 * Initialize Neon serverless client for cost tracking
 * Falls back to Prisma if Neon credentials not configured
 */
export async function getNeonClient(): Promise<NeonClient | null> {
  try {
    if (!env.NEON_API_KEY) {
      return null; // Use Prisma instead
    }

    // Client is lazy-initialized by @neondatabase/serverless
    return sql;
  } catch (error) {
    console.warn('Neon initialization failed, falling back to Prisma:', error);
    return null;
  }
}

/**
 * Insert cost event into Neon (with fallback to Prisma)
 */
export async function insertCostEvent(event: {
  model: string;
  provider: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUSD: number;
  feature: string;
  success: boolean;
  durationMs: number;
  userId?: string;
  errorMessage?: string;
  metadata?: Record<string, unknown>;
}) {
  const client = await getNeonClient();

  if (!client) {
    // Use Prisma (default)
    return null;
  }

  try {
    const result = await client`
      INSERT INTO "AICostEvent" (
        model, provider, "promptTokens", "completionTokens",
        "totalTokens", "costUSD", feature, success, "durationMs",
        "userId", "errorMessage", metadata, timestamp
      )
      VALUES (
        ${event.model},
        ${event.provider},
        ${event.promptTokens},
        ${event.completionTokens},
        ${event.totalTokens},
        ${event.costUSD},
        ${event.feature},
        ${event.success},
        ${event.durationMs},
        ${event.userId || null},
        ${event.errorMessage || null},
        ${JSON.stringify(event.metadata || {})},
        NOW()
      )
      RETURNING id;
    `;

    return result[0]?.id;
  } catch (error) {
    console.error('Neon insert failed:', error);
    return null;
  }
}

/**
 * Get cost summary from Neon (with fallback to Prisma)
 */
export async function getCostSummary(
  days: number = 30,
  userId?: string
): Promise<{
  totalCost: number;
  totalTokens: number;
  requestCount: number;
  successCount: number;
} | null> {
  const client = await getNeonClient();

  if (!client) {
    return null;
  }

  try {
    const result = await client`
      SELECT
        COALESCE(SUM("costUSD"), 0)::float as total_cost,
        COALESCE(SUM("totalTokens"), 0)::int as total_tokens,
        COUNT(*)::int as request_count,
        COUNT(CASE WHEN success = true THEN 1 END)::int as success_count
      FROM "AICostEvent"
      WHERE timestamp > NOW() - INTERVAL '${days} days'
      ${userId ? sql`AND "userId" = ${userId}` : sql``}
    `;

    const row = result[0];
    return {
      totalCost: row?.total_cost ?? 0,
      totalTokens: row?.total_tokens ?? 0,
      requestCount: row?.request_count ?? 0,
      successCount: row?.success_count ?? 0,
    };
  } catch (error) {
    console.error('Neon query failed:', error);
    return null;
  }
}

/**
 * Get costs by feature from Neon
 */
export async function getCostsByFeature(
  days: number = 30,
  userId?: string
): Promise<
  Array<{
    feature: string;
    costUSD: number;
    requestCount: number;
    avgCostPerRequest: number;
  }>
> {
  const client = await getNeonClient();

  if (!client) {
    return [];
  }

  try {
    const result = await client`
      SELECT
        feature,
        COALESCE(SUM("costUSD"), 0)::float as cost_usd,
        COUNT(*)::int as request_count,
        (COALESCE(SUM("costUSD"), 0) / NULLIF(COUNT(*), 0))::float as avg_cost_per_request
      FROM "AICostEvent"
      WHERE timestamp > NOW() - INTERVAL '${days} days'
      ${userId ? sql`AND "userId" = ${userId}` : sql``}
      GROUP BY feature
      ORDER BY cost_usd DESC;
    `;

    return result.map((row) => ({
      feature: row.feature,
      costUSD: row.cost_usd,
      requestCount: row.request_count,
      avgCostPerRequest: row.avg_cost_per_request,
    }));
  } catch (error) {
    console.error('Neon query failed:', error);
    return [];
  }
}
