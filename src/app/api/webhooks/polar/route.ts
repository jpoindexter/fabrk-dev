/**
 * Polar.sh Webhook Handler
 * Processes order completion events
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/polar';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('polar-signature');

    if (!signature) {
      logger.error('Polar webhook: Missing signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // Verify webhook signature
    const secret = process.env.POLAR_WEBHOOK_SECRET;
    if (!secret) {
      logger.error('Polar webhook: POLAR_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const isValid = verifyWebhookSignature(body, signature, secret);
    if (!isValid) {
      logger.error('Polar webhook: Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse event
    const event = JSON.parse(body);
    logger.info('Polar webhook event:', { type: event.type });

    // Handle different event types
    switch (event.type) {
      case 'checkout.created':
        await handleCheckoutCreated(event.data);
        break;

      case 'order.created':
        await handleOrderCreated(event.data);
        break;

      case 'order.paid':
        await handleOrderPaid(event.data);
        break;

      case 'order.refunded':
        await handleOrderRefunded(event.data);
        break;

      default:
        logger.info(`Unhandled Polar event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Polar webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle checkout creation (funnel tracking)
 */
async function handleCheckoutCreated(checkout: any) {
  logger.info('Polar checkout created:', {
    checkoutId: checkout.id,
    customerEmail: checkout.customer_email,
  });

  // TODO: Add your custom logic here
  // - Track conversion funnel
  // - Analytics event
}

/**
 * Handle order creation
 */
async function handleOrderCreated(order: any) {
  logger.info('Polar order created:', {
    orderId: order.id,
    customerEmail: order.customer_email,
    amount: order.amount,
  });

  // TODO: Add your custom logic here
  // - Send confirmation email
  // - Add to CRM
  // - Track analytics
}

/**
 * Handle order payment (CRITICAL - grant access here)
 */
async function handleOrderPaid(order: any) {
  logger.info('Polar order paid:', {
    orderId: order.id,
    customerEmail: order.customer_email,
    amount: order.amount,
  });

  // TODO: Add your custom logic here
  // - Grant product access (ZIP download)
  // - Send welcome email with download link
  // - Track conversion
  // - Add to customer database
}

/**
 * Handle order refund
 */
async function handleOrderRefunded(order: any) {
  logger.info('Polar order refunded:', {
    orderId: order.id,
    customerEmail: order.customer_email,
    refundAmount: order.refund_amount,
  });

  // TODO: Add your custom logic here
  // - Revoke product access
  // - Update customer records
  // - Send refund confirmation email
}
