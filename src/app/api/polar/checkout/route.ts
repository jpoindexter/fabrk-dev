/**
 * Polar.sh Checkout API
 * Creates a checkout session for Fabrk purchase
 */

import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/polar';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerEmail, discountId, metadata } = body;

    // Get base URL for success redirect
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/purchase/success`;

    // Create checkout session
    const checkout = await createCheckoutSession({
      customerEmail,
      successUrl,
      discountId, // Pass custom discount if provided (e.g., exit intent special offer)
      metadata: {
        source: 'fabrk_website',
        ...metadata,
      },
    });

    logger.info('Polar checkout created:', {
      checkoutId: checkout.id,
      customerEmail,
    });

    return NextResponse.json({
      checkoutUrl: checkout.url,
      checkoutId: checkout.id,
    });
  } catch (error) {
    logger.error('Polar checkout error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
