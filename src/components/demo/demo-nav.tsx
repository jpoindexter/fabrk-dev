/**
 * ✅ FABRK COMPONENT
 * Demo Navigation - Terminal console style
 * Production-ready ✓
 */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoAlt as Logo } from "@/components/home/logo-alt";
import { ThemeDropdown } from "@/components/theme/theme-dropdown";

interface DemoNavProps {
  backButtonText?: string;
  backButtonHref?: string;
}

export function DemoNav({
  backButtonText = "Back",
  backButtonHref = "/",
}: DemoNavProps = {}) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo/Home Link */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Logo size={24} />
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            _DEMO
          </span>
        </Link>

        {/* Right Side: Theme Controls + Back Button */}
        <div className="flex items-center gap-2">
          <ThemeDropdown />
          <Button asChild className="rounded-none font-mono text-xs">
            <Link href={backButtonHref}>&gt; {backButtonText.toUpperCase()}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
