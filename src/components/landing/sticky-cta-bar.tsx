"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import config from "@/config";

interface StickyCTABarProps {
  /**
   * Show the bar after scrolling this many pixels
   * @default 300
   */
  showAfterScroll?: number;
  /**
   * CTA button text
   * @default "Get Started"
   */
  ctaText?: string;
  /**
   * CTA button href
   * @default "#pricing"
   */
  ctaHref?: string;
  /**
   * Message to display next to CTA
   * @default "Launch your SaaS faster with Fabrk"
   */
  message?: string;
  /**
   * Show price next to message
   * @default true
   */
  showPrice?: boolean;
}

export function StickyCTABar({
  showAfterScroll = 300,
  ctaText = "Get Started",
  ctaHref = "#pricing",
  message = "Launch your SaaS faster with Fabrk",
  showPrice = true,
}: StickyCTABarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("sticky-cta-dismissed");
    if (dismissed === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: Initialize state from localStorage on mount
      setIsDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > showAfterScroll;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("sticky-cta-dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <div
      className={cn(
        "fixed right-0 bottom-0 left-0 z-40 transform transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div
        className={cn(
          mode.radius,
          mode.font,
          "border-border bg-card/95 border-t-2 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Message */}
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <span className="text-center text-xs font-medium sm:text-left">{message}</span>
              {showPrice && (
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      mode.radius,
                      "border-primary bg-primary text-primary-foreground border px-2 py-0.5 text-xs"
                    )}
                  >
                    {config.pricing.fabrk.display.current}
                  </span>
                  <span className="text-muted-foreground text-xs line-through">
                    {config.pricing.fabrk.display.original}
                  </span>
                </div>
              )}
            </div>

            {/* CTA + Dismiss */}
            <div className="flex items-center gap-2">
              <Button asChild size="sm" className={cn(mode.radius, mode.font, "text-xs")}>
                <Link href={ctaHref}>
                  &gt; {ctaText.toUpperCase().replace(/ /g, "_")}
                  <ArrowRight className="ml-2 size-3" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(mode.radius, "size-8")}
                onClick={handleDismiss}
                aria-label="Dismiss"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
