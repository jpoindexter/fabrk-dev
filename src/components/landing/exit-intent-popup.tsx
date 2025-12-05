"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { PolarCheckoutButton } from "@/components/polar/checkout-button";

/* 💡 EXIT INTENT TIP: This popup offers an extra discount to visitors about to leave.
 * Update the EXTRA_DISCOUNT_ID with your Polar coupon ID for special offers.
 * Current offer: $175 (additional $24 off the regular $199 price)
 */
const EXIT_INTENT_DISCOUNT_ID = "4ef6f4e5-e11e-46bc-97a2-e5c15fe25173";

interface ExitIntentPopupProps {
  /**
   * Title of the popup
   * @default "Wait! Before You Go..."
   */
  title?: string;
  /**
   * Description/offer text
   * @default "Get access to the complete Fabrk boilerplate and launch your SaaS faster."
   */
  description?: string;
  /**
   * Primary CTA text
   * @default "Get Started Now"
   */
  ctaText?: string;
  /**
   * Primary CTA href
   * @default "#pricing"
   */
  ctaHref?: string;
  /**
   * Secondary CTA text (optional)
   * @default "No thanks, I'll build from scratch"
   */
  secondaryCtaText?: string;
  /**
   * Show pricing in the popup
   * @default true
   */
  showPricing?: boolean;
  /**
   * Delay before showing popup after exit intent (ms)
   * @default 300
   */
  delay?: number;
  /**
   * Cookie expiry in days (to prevent showing again)
   * @default 7
   */
  cookieExpiry?: number;
}

export function ExitIntentPopup({
  title = "Wait! Before You Go...",
  description = "Get Fabrk and launch your SaaS 10x faster. 234 components, authentication, payments, and more.",
  secondaryCtaText = "No thanks, I'll build from scratch",
  showPricing = true,
  delay = 300,
  cookieExpiry = 7,
}: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if user already saw popup recently
    const exitIntentShown = localStorage.getItem("exit-intent-shown");
    if (exitIntentShown) {
      const shownDate = new Date(exitIntentShown);
      const expiryDate = new Date(shownDate.getTime() + cookieExpiry * 24 * 60 * 60 * 1000);
      if (new Date() < expiryDate) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Initialize state from localStorage on mount
        setHasShown(true);
      }
    }
  }, [cookieExpiry]);

  useEffect(() => {
    if (hasShown) return;

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves to top of viewport (common exit behavior)
      if (e.clientY <= 0 && !hasShown) {
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
          localStorage.setItem("exit-intent-shown", new Date().toISOString());
        }, delay);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasShown, delay]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn(mode.radius, "max-w-md")}>
        <DialogHeader>
          <div className="mb-4 flex justify-center">
            <div className={cn(mode.radius, "bg-primary/10 p-4")}>
              <Sparkles className="text-primary h-8 w-8" />
            </div>
          </div>
          <DialogTitle className={cn(mode.font, "text-center text-2xl")}>{title}</DialogTitle>
          <DialogDescription className={cn(mode.font, "text-center text-sm")}>
            {description}
          </DialogDescription>
        </DialogHeader>

        {showPricing && (
          <div className={cn(mode.radius, "border-border bg-card my-4 border p-4")}>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-4">
                <span className={cn(mode.font, "text-foreground text-4xl font-semibold")}>$175</span>
                <span className={cn(mode.font, "text-muted-foreground text-lg line-through")}>
                  $299
                </span>
              </div>
              <span className="text-muted-foreground block text-xs">
                One-time payment. Lifetime access.
              </span>
            </div>
          </div>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <PolarCheckoutButton
            discountId={EXIT_INTENT_DISCOUNT_ID}
            className={cn(mode.radius, mode.font, "w-full text-xs")}
          >
            &gt; GET_FABRK_NOW
          </PolarCheckoutButton>
          <Button
            onClick={handleClose}
            variant="ghost"
            className={cn(mode.radius, mode.font, "w-full text-xs")}
            size="sm"
          >
            {secondaryCtaText}
          </Button>
        </DialogFooter>

        {/* 30-day guarantee badge */}
        <div className="mt-4 text-center">
          <span className="text-muted-foreground text-xs">
            30-day money-back guarantee • No questions asked
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
