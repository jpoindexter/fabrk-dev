"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size={28} />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
          <Link
            href="/demo"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Live Demo
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="hidden md:inline-flex"
            asChild
          >
            <Link href="/demo">View Live Demo</Link>
          </Button>
          <Button
            asChild
          >
            <Link href="#pricing" className="scroll-smooth">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
