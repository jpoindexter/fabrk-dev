/**
 * ✅ FABRK COMPONENT
 * Demo Navigation - Terminal console style
 * Production-ready ✓
 */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeDropdown } from "@/components/theme/theme-dropdown";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

interface DemoNavProps {
  backButtonText?: string;
  backButtonHref?: string;
  suffix?: string;
}

export function DemoNav({
  backButtonText = "Back",
  backButtonHref = "/",
  suffix = "DEMO",
}: DemoNavProps = {}) {
  return (
    <nav
      aria-label="Demo navigation"
      className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
    >
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo/Home Link - Terminal Style */}
        <Link
          href="/"
          className={cn("flex items-center gap-2 transition-opacity hover:opacity-80", mode.font)}
        >
          <span className="text-primary text-xs">&gt;</span>
          <span className="text-sm font-bold tracking-tight">FABRK</span>
          <span className="text-muted-foreground hidden text-xs sm:inline">_{suffix}</span>
        </Link>

        {/* Right Side: Theme Controls + Back Button */}
        <div className="flex items-center gap-2">
          <ThemeDropdown />
          <Button asChild className={cn("text-xs", mode.radius, mode.font)}>
            <Link href={backButtonHref}>&gt; {backButtonText.toUpperCase()}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
