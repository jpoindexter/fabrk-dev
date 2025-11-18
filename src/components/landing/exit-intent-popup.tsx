"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Sparkles } from "lucide-react";
import config from "@/config";

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
  description = "Get access to the complete Fabrk boilerplate and launch your SaaS faster.",
  ctaText = "Get Started Now",
  ctaHref = "#pricing",
  secondaryCtaText = "No thanks, I'll build from scratch",
  showPricing = true,
  delay = 300,
  cookieExpiry = 7,
}: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(() => {
    // Check if user already saw popup recently
    const exitIntentShown = localStorage.getItem("exit-intent-shown");
    if (exitIntentShown) {
      const shownDate = new Date(exitIntentShown);
      const expiryDate = new Date(
        shownDate.getTime() + cookieExpiry * 24 * 60 * 60 * 1000
      );
      if (new Date() < expiryDate) {
        return true;
      }
    }
    return false;
  });

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

  const handleCTA = () => {
    window.location.href = ctaHref;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-center text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        {showPricing && (
          <div className="my-4 rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  {config.pricing.product.display.current}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {config.pricing.product.display.original}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                One-time payment. Lifetime access.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={handleCTA} className="w-full" size="lg">
            {ctaText}
          </Button>
          <Button
            onClick={handleClose}
            variant="ghost"
            className="w-full"
            size="sm"
          >
            {secondaryCtaText}
          </Button>
        </DialogFooter>

        {/* 30-day guarantee badge */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            30-day money-back guarantee • No questions asked
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
