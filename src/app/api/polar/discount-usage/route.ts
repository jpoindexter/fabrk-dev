/**
 * Polar.sh Discount Usage API
 * Returns current usage count for the discount
 */

import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export async function GET() {
  // DEVELOPMENT MODE: Always return mock data (Polar API disabled)
  logger.info('[DEV MODE] Mock discount usage returned (Polar API disabled)');
  return NextResponse.json({
    used: 42,
    total: 1000,
    remaining: 958,
    _mock: true,
    _dev: true,
  });
}
