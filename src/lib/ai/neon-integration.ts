/**
 * Neon PostgreSQL Integration for AI Cost Tracking
 *
 * Optional high-performance database layer using Neon's serverless driver.
 * Automatically used if DATABASE_URL points to Neon.
 */

import { Client } from '@neondatabase/serverless';

let neonClient: Client | null = null;

/**
 * Initialize Neon serverless client for cost tracking
 * Falls back to Prisma if not using Neon
 */
export async function getNeonClient(): Promise<Client | null> {
  try {
    if (neonClient) return neonClient;

    const databaseUrl = process.env.DATABASE_URL;

    // Check if DATABASE_URL is a Neon connection
    if (!databaseUrl || !databaseUrl.includes('neon.tech')) {
      return null; // Use Prisma instead
    }

    neonClient = new Client({
      connectionString: databaseUrl,
    });

    await neonClient.connect();
    return neonClient;
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
    const result = await client.query(
      `INSERT INTO "AICostEvent" (
        model, provider, "promptTokens", "completionTokens",
        "totalTokens", "costUSD", feature, success, "durationMs",
        "userId", "errorMessage", metadata, timestamp
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()
      )
      RETURNING id;`,
      [
        event.model,
        event.provider,
        event.promptTokens,
        event.completionTokens,
        event.totalTokens,
        event.costUSD,
        event.feature,
        event.success,
        event.durationMs,
        event.userId || null,
        event.errorMessage || null,
        JSON.stringify(event.metadata || {}),
      ]
    );

    return result.rows[0]?.id;
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
    const query = `
      SELECT
        COALESCE(SUM("costUSD"), 0)::float as total_cost,
        COALESCE(SUM("totalTokens"), 0)::int as total_tokens,
        COUNT(*)::int as request_count,
        COUNT(CASE WHEN success = true THEN 1 END)::int as success_count
      FROM "AICostEvent"
      WHERE timestamp > NOW() - INTERVAL '1 day' * $1
      ${userId ? `AND "userId" = $2` : ''}
    `;

    const params = userId ? [days, userId] : [days];
    const result = await client.query(query, params);

    const row = result.rows[0];
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
    const query = `
      SELECT
        feature,
        COALESCE(SUM("costUSD"), 0)::float as cost_usd,
        COUNT(*)::int as request_count,
        (COALESCE(SUM("costUSD"), 0) / NULLIF(COUNT(*), 0))::float as avg_cost_per_request
      FROM "AICostEvent"
      WHERE timestamp > NOW() - INTERVAL '1 day' * $1
      ${userId ? `AND "userId" = $2` : ''}
      GROUP BY feature
      ORDER BY cost_usd DESC;
    `;

    const params = userId ? [days, userId] : [days];
    const result = await client.query(query, params);

    return result.rows.map((row) => ({
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
