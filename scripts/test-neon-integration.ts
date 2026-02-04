/**
 * Test Neon Integration
 *
 * This script tests the Neon PostgreSQL integration functions directly.
 * It verifies that the cost tracking functions work with the Neon database.
 *
 * Usage:
 *   npx tsx scripts/test-neon-integration.ts
 */

import {
  getNeonClient,
  insertCostEvent,
  getCostSummary,
  getCostsByFeature,
} from '@/lib/ai/neon-integration';

async function testNeonIntegration() {
  try {
    console.log('🧪 Testing Neon Integration...\n');

    // Test 1: Check if Neon client initializes
    console.log('1️⃣ Testing getNeonClient()...');
    const client = await getNeonClient();
    if (client) {
      console.log('   ✅ Neon client initialized');
    } else {
      console.log('   ℹ️  Using Prisma instead (Neon not configured)');
    }

    // Test 2: Insert a test cost event
    console.log('\n2️⃣ Testing insertCostEvent()...');
    const eventId = await insertCostEvent({
      model: 'claude-sonnet-4-20250514',
      provider: 'anthropic',
      promptTokens: 1500,
      completionTokens: 800,
      totalTokens: 2300,
      costUSD: 0.0234,
      feature: 'test-integration',
      success: true,
      durationMs: 1250,
      metadata: {
        test: true,
        script: 'test-neon-integration.ts',
      },
    });

    if (eventId) {
      console.log(`   ✅ Event inserted with ID: ${eventId}`);
    } else {
      console.log('   ℹ️  Event not inserted (Neon not available, using Prisma)');
    }

    // Test 3: Get cost summary
    console.log('\n3️⃣ Testing getCostSummary()...');
    const summary = await getCostSummary(7);
    if (summary) {
      console.log('   ✅ Cost summary retrieved:');
      console.log(`      Total cost: $${summary.totalCost.toFixed(4)}`);
      console.log(`      Total tokens: ${summary.totalTokens}`);
      console.log(`      Requests: ${summary.requestCount}`);
      console.log(`      Success: ${summary.successCount}/${summary.requestCount}`);
    } else {
      console.log('   ℹ️  Cost summary not available (Neon not available)');
    }

    // Test 4: Get costs by feature
    console.log('\n4️⃣ Testing getCostsByFeature()...');
    const features = await getCostsByFeature(7);
    if (features && features.length > 0) {
      console.log('   ✅ Features retrieved:');
      features.slice(0, 3).forEach((feature) => {
        console.log(`      - ${feature.feature}: $${feature.costUSD.toFixed(4)}`);
      });
      if (features.length > 3) {
        console.log(`      ... and ${features.length - 3} more`);
      }
    } else {
      console.log('   ℹ️  No features found (no cost data in database)');
    }

    console.log('\n✅ Neon integration tests complete!');
    console.log('\n📋 Next steps:');
    console.log(
      '   1. Run: npx tsx scripts/seed-ai-costs.ts (to populate test data)'
    );
    console.log(
      '   2. Visit: http://localhost:3000/(platform)/admin/ai-costs (view dashboard)'
    );
    console.log('   3. Note: Dashboard requires authentication (create account first)');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testNeonIntegration();
