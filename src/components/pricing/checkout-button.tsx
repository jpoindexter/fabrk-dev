"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CheckoutButtonProps {
  priceId: string;
  planName: string;
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({
  priceId,
  planName,
  className,
  children = "Get Started",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  async function handleCheckout() {
    // Redirect to login if not authenticated
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent("/pricing")}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      loading={loading}
      loadingText="Loading..."
      className={className}
      disabled={loading}
    >
      {children}
    </Button>
  );
}
