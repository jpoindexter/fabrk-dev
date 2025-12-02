/**
 * Polar.sh Discount Usage API
 * Returns current usage count for the discount
 */

import { NextResponse } from 'next/server';
import { polar, FABRK_DISCOUNT_ID, isPolarConfigured } from '@/lib/polar';
import { logger } from '@/lib/logger';

export async function GET() {
  // Return mock data when Polar isn't configured (dev mode)
  if (!isPolarConfigured()) {
    return NextResponse.json({
      used: 42,
      total: 1000,
      remaining: 958,
      _mock: true,
    });
  }

  try {
    const discount = await polar.discounts.get({
      id: FABRK_DISCOUNT_ID,
    });

    return NextResponse.json({
      used: discount.redemptionsCount,
      total: discount.maxRedemptions,
      remaining: discount.maxRedemptions
        ? discount.maxRedemptions - discount.redemptionsCount
        : null,
    });
  } catch (error) {
    logger.error('Discount usage fetch error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch discount usage',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
