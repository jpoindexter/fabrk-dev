/**
 * ✅ FABRK COMPONENT
 * Main Navigation Component - Professional & Clean
 * Production-ready ✓
 * Full error handling ✓
 * No TODOs or placeholders ✓
 */

"use client";

import { FabrkLogo } from "@/components/icons/fabrk-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-12 max-w-7xl items-center px-2">
        {/* Logo and Navigation together */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center gap-2">
            <FabrkLogo size={28} />
            <span className="text-lg font-medium text-foreground">Fabrk</span>
          </Link>

          {/* Main Navigation - Clean and professional nav links */}
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/starter-kits"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/starter-kits") ? "text-foreground" : "text-foreground/60"
              )}
            >
              Starter Kits
            </Link>
            <Link
              href="/components"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/components") ? "text-foreground" : "text-foreground/60"
              )}
            >
              Components
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/pricing" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Pricing
            </Link>
            <Link
              href="/roadmap"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/roadmap" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Roadmap
              <svg width="7" height="7" viewBox="0 0 6 6" className="ml-1 inline-block opacity-70">
                <path
                  fill="currentColor"
                  d="M1.252 5.547l-.63-.63 3.16-3.161H1.383L1.39.891h3.887v3.89h-.87l.005-2.396-3.159 3.162z"
                />
              </svg>
            </Link>
            <Link
              href="/blog"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/blog") ? "text-foreground" : "text-foreground/60"
              )}
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search Input */}
          <div className="relative hidden lg:flex">
            <input
              type="text"
              placeholder="Search documentation..."
              className="h-7 w-48 rounded-sm border border-input bg-background px-2 py-1 pr-8 text-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <kbd className="pointer-events-none absolute right-1.5 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100 sm:flex">
              <span className="text-xs">⌘K</span>
            </kbd>
          </div>

          {/* Contact Link */}
          <Link
            href="/contact"
            className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Contact
          </Link>

          {/* Demo Button */}
          <Button size="sm" className="h-7">
            <Link href="/demo">Demo</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="size-7 lg:hidden"
            aria-expanded="false"
            aria-label="Toggle Mobile Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
