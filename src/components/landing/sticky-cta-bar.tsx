"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import config from "@/config";
import { Small } from "@/components/ui/typography";

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
        "fixed bottom-0 left-0 right-0 z-40 transform transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="border-t-2 border-border bg-card/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            {/* Message */}
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <Small className="text-center font-medium sm:text-left">
                {message}
              </Small>
              {showPrice && (
                <div className="flex items-center gap-2">
                  <Badge variant="default" size="sm" className="rounded-none">
                    {config.pricing.fabrk.display.current}
                  </Badge>
                  <Small className="text-muted-foreground line-through">
                    {config.pricing.fabrk.display.original}
                  </Small>
                </div>
              )}
            </div>

            {/* CTA + Dismiss */}
            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="rounded-none">
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none h-8 w-8"
                onClick={handleDismiss}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
