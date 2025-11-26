/**
 * Polar.sh Discount Usage API
 * Returns current usage count for the discount
 */

import { NextResponse } from 'next/server';
import { polar, FABRK_DISCOUNT_ID } from '@/lib/polar';
import { logger } from '@/lib/logger';

export async function GET() {
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
