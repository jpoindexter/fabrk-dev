"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b-4 border-black bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="transition-transform hover:-translate-y-1">
          <Logo size={32} />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-bold uppercase tracking-wide text-foreground transition-all hover:-translate-y-1"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-bold uppercase tracking-wide text-foreground transition-all hover:-translate-y-1"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-bold uppercase tracking-wide text-foreground transition-all hover:-translate-y-1"
          >
            FAQ
          </Link>
          <Link
            href="/templates"
            className="text-sm font-bold uppercase tracking-wide text-foreground transition-all hover:-translate-y-1"
          >
            Demo
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
