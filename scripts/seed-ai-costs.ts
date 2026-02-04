/**
 * Seed AI Cost Events
 *
 * This script inserts test AI cost data into the AICostEvent table
 * for testing the cost tracking dashboard.
 *
 * Usage:
 *   npx tsx scripts/seed-ai-costs.ts
 */

import dotenv from 'dotenv';
import path from 'path';

// Load .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { insertCostEvent } from '@/lib/ai/neon-integration';

const CLAUDE_MODELS = [
  'claude-opus-4-20250514',
  'claude-sonnet-4-20250514',
  'claude-haiku-4-5-20251001',
];

const FEATURES = [
  'form-generation',
  'code-analysis',
  'documentation',
  'content-creation',
  'code-review',
  'test-generation',
];

interface CostEvent {
  model: string;
  provider: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUSD: number;
  feature: string;
  success: boolean;
  durationMs: number;
  errorMessage?: string | null;
  metadata?: Record<string, unknown>;
}

function calculateCost(
  promptTokens: number,
  completionTokens: number,
  model: string
): number {
  // Approximate Claude pricing (per 1M tokens)
  const pricingMap: Record<string, { input: number; output: number }> = {
    'claude-opus-4-20250514': { input: 15, output: 45 },
    'claude-sonnet-4-20250514': { input: 3, output: 15 },
    'claude-haiku-4-5-20251001': { input: 0.8, output: 4 },
  };

  const pricing = pricingMap[model] || pricingMap['claude-sonnet-4-20250514'];
  const inputCost = (promptTokens / 1000000) * pricing.input;
  const outputCost = (completionTokens / 1000000) * pricing.output;

  return Math.round((inputCost + outputCost) * 10000) / 10000;
}

async function seedCostEvents() {
  // Suppress unhandled promise rejections from Neon client cleanup
  process.on('unhandledRejection', () => {});

  try {
    console.log('🌱 Seeding AI cost events...');

    const events: CostEvent[] = [];
    const now = new Date();

    // Generate 30 days of cost data
    for (let day = 0; day < 30; day++) {
      const date = new Date(now);
      date.setDate(date.getDate() - day);
      date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);

      // 5-15 API calls per day
      const callsPerDay = Math.floor(Math.random() * 11) + 5;

      for (let i = 0; i < callsPerDay; i++) {
        const model = CLAUDE_MODELS[Math.floor(Math.random() * CLAUDE_MODELS.length)];
        const feature = FEATURES[Math.floor(Math.random() * FEATURES.length)];
        const promptTokens = Math.floor(Math.random() * 2000) + 500;
        const completionTokens = Math.floor(Math.random() * 1000) + 100;
        const success = Math.random() > 0.05; // 95% success rate
        const durationMs = Math.floor(Math.random() * 3000) + 500;

        const event: CostEvent = {
          model,
          provider: 'anthropic',
          promptTokens,
          completionTokens,
          totalTokens: promptTokens + completionTokens,
          costUSD: calculateCost(promptTokens, completionTokens, model),
          feature,
          success,
          durationMs,
          errorMessage: success ? null : 'Rate limit exceeded',
          metadata: {
            userId: 'test-user',
            source: 'test-seed',
          },
        };

        events.push(event);
      }
    }

    // Insert all events using Neon integration
    let inserted = 0;
    for (const event of events) {
      const id = await insertCostEvent({
        model: event.model,
        provider: event.provider,
        promptTokens: event.promptTokens,
        completionTokens: event.completionTokens,
        totalTokens: event.totalTokens,
        costUSD: event.costUSD,
        feature: event.feature,
        success: event.success,
        durationMs: event.durationMs,
        errorMessage: event.errorMessage,
        metadata: event.metadata,
      });
      if (id) inserted++;
    }

    const totalCost = events.reduce((sum, e) => sum + e.costUSD, 0);
    const totalRequests = events.length;
    const successRate = (events.filter((e) => e.success).length / totalRequests) * 100;

    console.log('✅ Seeding complete!');
    console.log(`   📊 Inserted ${inserted}/${totalRequests} cost events`);
    console.log(`   💰 Total cost: $${totalCost.toFixed(4)}`);
    console.log(`   ✓ Success rate: ${successRate.toFixed(1)}%`);
    console.log(`\n🔗 View dashboard: http://localhost:3000/(platform)/admin/ai-costs`);
  } catch (error) {
    console.error('❌ Error seeding costs:', error);
    process.exit(1);
  }
}

seedCostEvents();
