"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">
          Fabrk
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-black transition-colors hover:text-[#007AFF]"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-black transition-colors hover:text-[#007AFF]"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-black transition-colors hover:text-[#007AFF]"
          >
            FAQ
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden border border-[#007AFF] text-black hover:bg-[#007AFF]/5 md:inline-flex"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            className="bg-[#007AFF] text-white hover:bg-[#0066CC]"
            asChild
          >
            <Link href="#pricing">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
