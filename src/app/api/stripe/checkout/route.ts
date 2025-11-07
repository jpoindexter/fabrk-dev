/**
 * Stripe Checkout API - ShipFast Style
 * Creates a checkout session for one-time payments
 */

import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized - Please sign in" }, { status: 401 });
    }

    // Get price ID from request
    const { priceId } = await req.json();
    if (!priceId) {
      return NextResponse.json({ error: "Price ID required" }, { status: 400 });
    }

    // Validate price ID against environment variables
    const validPriceIds = [
      process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
      process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL,
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,
    ].filter(Boolean);

    if (!validPriceIds.includes(priceId)) {
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 });
    }

    // Create checkout session
    const checkoutUrl = await createCheckoutSession(
      session.user.id!,
      priceId,
      session.user.email,
      session.user.name
    );

    if (!checkoutUrl) {
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
