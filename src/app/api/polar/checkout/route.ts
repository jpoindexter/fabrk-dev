/**
 * Polar.sh Checkout API
 * Creates a checkout session for Fabrk purchase
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimitAuto, getClientIdentifier, RateLimiters } from '@/lib/security/rate-limit';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  // Rate limit: strict (10 requests/minute) for checkout
  const identifier = getClientIdentifier(request);
  const rateLimit = await checkRateLimitAuto(identifier, RateLimiters.strict);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many checkout attempts. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // DEVELOPMENT MODE: Always return mock checkout (Polar API disabled)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  logger.info('[DEV MODE] Mock checkout created (Polar API disabled)');
  return NextResponse.json({
    checkoutUrl: `${baseUrl}/purchase/success?mock=true`,
    checkoutId: 'mock-checkout-id',
    _mock: true,
    _dev: true,
  });
}
