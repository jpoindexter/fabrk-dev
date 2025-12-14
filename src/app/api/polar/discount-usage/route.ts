/**
 * Polar.sh Discount Usage API
 * Returns current usage count for the discount
 */

import { NextResponse } from 'next/server';
import { polar, isPolarConfigured, FABRK_DISCOUNT_ID } from '@/lib/polar';
import { logger } from '@/lib/logger';

export async function GET() {
  // Check if Polar is configured
  if (!isPolarConfigured()) {
    logger.warn('Discount usage requested but POLAR_ACCESS_TOKEN not configured');
    return NextResponse.json({ error: 'Payment system not configured' }, { status: 503 });
  }

  try {
    // Get discount details from Polar
    const discount = await polar.discounts.get({
      id: FABRK_DISCOUNT_ID,
    });

    // Calculate usage from discount data
    const maxRedemptions = discount.maxRedemptions || 100;
    const redemptionsCount = discount.redemptionsCount || 0;
    const remaining = Math.max(0, maxRedemptions - redemptionsCount);

    logger.info('Discount usage fetched', {
      used: redemptionsCount,
      total: maxRedemptions,
      remaining,
    });

    return NextResponse.json({
      used: redemptionsCount,
      total: maxRedemptions,
      remaining,
    });
  } catch (error) {
    logger.error('Failed to fetch discount usage:', error);

    // Return a fallback response so the UI doesn't break
    return NextResponse.json({
      used: 0,
      total: 100,
      remaining: 100,
      _error: true,
    });
  }
}
