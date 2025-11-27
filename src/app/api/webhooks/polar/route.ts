/* 💡 PAYMENT TIP: This webhook handles Polar payment events.
 * Test locally with: ngrok http 3000 and configure Polar Dashboard → Webhooks.
 * CRITICAL: The order.paid event is where you grant product access!
 * Make sure POLAR_WEBHOOK_SECRET is set in your .env file.
 */

/**
 * Polar.sh Webhook Handler
 * Processes order completion events
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/polar';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { generateLicenseKey } from '@/lib/license';
import { queueWelcomeEmail } from '@/lib/email';
import { generateSecureToken, getTokenExpiration } from '@/lib/tokens';
import { createHash } from 'crypto';

// Type definitions for Polar webhook payloads
interface PolarCheckout {
  id: string;
  customer_email?: string;
  metadata?: Record<string, string>;
}

interface PolarOrder {
  id: string;
  customer_email: string;
  customer_name?: string;
  amount: number;
  currency: string;
  product_id?: string;
  metadata?: Record<string, string>;
}

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
 * Fires when customer initiates checkout but hasn't completed payment yet
 */
async function handleCheckoutCreated(checkout: PolarCheckout) {
  logger.info('Polar checkout created:', {
    checkoutId: checkout.id,
    customerEmail: checkout.customer_email,
  });

  // Track checkout initiation for funnel analytics
  // This helps measure checkout abandonment rate
}

/**
 * Handle order creation
 * Fires when order is created (payment may still be processing)
 */
async function handleOrderCreated(order: PolarOrder) {
  logger.info('Polar order created:', {
    orderId: order.id,
    customerEmail: order.customer_email,
    amount: order.amount,
  });

  // Order created but not yet paid - useful for tracking pending orders
}

/**
 * Handle order payment (CRITICAL - grant access here)
 * Fires when payment is successfully processed
 */
async function handleOrderPaid(order: PolarOrder) {
  logger.info('Polar order paid - processing access grant:', {
    orderId: order.id,
    customerEmail: order.customer_email,
    amount: order.amount,
  });

  try {
    const customerEmail = order.customer_email;

    if (!customerEmail) {
      logger.error('Polar order paid: No customer email found');
      return;
    }

    // Generate license key for the purchase
    const licenseKey = generateLicenseKey();

    // Upsert user (create or update)
    const user = await prisma.user.upsert({
      where: { email: customerEmail },
      update: {
        licenseKey,
        tier: 'professional',
        subscriptionTier: 'professional',
      },
      create: {
        email: customerEmail,
        name: order.customer_name || null,
        licenseKey,
        tier: 'professional',
        subscriptionTier: 'professional',
        emailVerified: new Date(), // Auto-verify since they paid
      },
    });

    logger.info('User upserted for Polar order:', {
      userId: user.id,
      email: customerEmail,
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: user.id,
        stripeId: `polar_${order.id}`, // Prefix to distinguish from Stripe
        stripePaymentId: order.id,
        amount: order.amount,
        status: 'succeeded',
        productId: 'professional',
      },
    });

    // Generate magic link token for one-click dashboard access
    const magicLinkToken = generateSecureToken();
    const magicLinkExpiry = getTokenExpiration(24 * 7); // Valid for 7 days

    // Hash token before storing (never store plain tokens)
    const hashedMagicToken = createHash('sha256').update(magicLinkToken).digest('hex');

    // Store hashed token in database
    await prisma.verificationToken.create({
      data: {
        identifier: customerEmail,
        token: hashedMagicToken,
        expires: magicLinkExpiry,
      },
    });

    // Build magic link URL
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/magic-signin?token=${magicLinkToken}&email=${encodeURIComponent(customerEmail)}`;

    // Queue welcome email with license key and magic link
    await queueWelcomeEmail({
      to: customerEmail,
      name: user.name || order.customer_name || 'Customer',
      licenseKey,
      magicLink,
      userId: user.id,
    });

    logger.info('Polar order processed successfully:', {
      userId: user.id,
      email: customerEmail,
      orderId: order.id,
    });
  } catch (error) {
    logger.error('Error processing Polar order.paid:', error);
    throw error;
  }
}

/**
 * Handle order refund
 * Fires when a refund is processed
 */
async function handleOrderRefunded(order: PolarOrder) {
  logger.info('Polar order refunded:', {
    orderId: order.id,
    customerEmail: order.customer_email,
  });

  try {
    const customerEmail = order.customer_email;

    if (!customerEmail) {
      logger.error('Polar refund: No customer email found');
      return;
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    if (user) {
      // Revoke access by clearing license key and tier
      await prisma.user.update({
        where: { id: user.id },
        data: {
          licenseKey: null,
          tier: 'free',
          subscriptionTier: 'free',
        },
      });

      // Update payment record to reflect refund
      await prisma.payment.updateMany({
        where: {
          userId: user.id,
          stripePaymentId: order.id,
        },
        data: {
          status: 'refunded',
        },
      });

      logger.info('Access revoked for refunded order:', {
        userId: user.id,
        email: customerEmail,
        orderId: order.id,
      });
    }
  } catch (error) {
    logger.error('Error processing Polar refund:', error);
    throw error;
  }
}
