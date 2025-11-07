"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b-3 border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-foreground">
          Fabrk
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            FAQ
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="hidden md:inline-flex"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="#pricing">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
