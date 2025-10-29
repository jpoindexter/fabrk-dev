/**
 * ✅ FABRK COMPONENT
 * Navigation Component
 * Production-ready ✓
 */

"use client";

import { FabrkLogo } from "@/components/icons/fabrk-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      id="navigation"
      role="navigation"
      className="sticky top-0 z-50 w-full border-b border-border bg-background"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center">
          {/* Logo on left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2" aria-label="Fabrk Home">
              <FabrkLogo className="h-7 w-auto text-foreground" />
              <span className="text-lg font-semibold text-foreground">Fabrk</span>
            </Link>
          </div>

          {/* Right-aligned Navigation Links */}
          <div className="ml-auto hidden items-center gap-8 lg:flex">
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="ml-auto lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Toggle mobile menu"
                >
                  <div className="relative size-3">
                    <span
                      className={`absolute left-0 top-0.5 h-0.5 w-4 bg-current transition-all duration-300 ease-in-out ${
                        open ? "top-1.5 rotate-45" : ""
                      }`}
                    />
                    <span
                      className={`absolute bottom-0.5 left-0 h-0.5 w-4 bg-current transition-all duration-300 ease-in-out ${
                        open ? "bottom-1.5 -rotate-45" : ""
                      }`}
                    />
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto sm:w-96">
                <div className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Navigate through the site</SheetDescription>
                </div>

                <div className="mb-8">
                  <h2 className="text-sm font-medium text-muted-foreground">Menu</h2>
                </div>

                <nav className="flex flex-col space-y-1">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="py-1 text-lg font-medium hover:underline"
                  >
                    Home
                  </Link>
                  <Link
                    href="/components"
                    onClick={() => setOpen(false)}
                    className="py-1 text-lg font-medium hover:underline"
                  >
                    Components
                  </Link>
                  <Link
                    href="/starter-kits"
                    onClick={() => setOpen(false)}
                    className="py-1 text-lg font-medium hover:underline"
                  >
                    Starter Kits
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setOpen(false)}
                    className="py-1 text-lg font-medium hover:underline"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/roadmap"
                    onClick={() => setOpen(false)}
                    className="py-1 text-lg font-medium hover:underline"
                  >
                    Roadmap
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setOpen(false)}
                    className="py-1 text-lg font-medium hover:underline"
                  >
                    Blog
                  </Link>
                </nav>

                <div className="mt-8">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Resources</h3>
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/docs"
                      onClick={() => setOpen(false)}
                      className="py-1 text-lg font-medium hover:underline"
                    >
                      Documentation
                    </Link>
                    <Link
                      href="/examples"
                      onClick={() => setOpen(false)}
                      className="py-1 text-lg font-medium hover:underline"
                    >
                      Examples
                    </Link>
                    <Link
                      href="/showcase"
                      onClick={() => setOpen(false)}
                      className="py-1 text-lg font-medium hover:underline"
                    >
                      Showcase
                    </Link>
                  </nav>
                </div>

                <div className="mt-8">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Support</h3>
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="py-1 text-lg font-medium hover:underline"
                    >
                      Contact
                    </Link>
                  </nav>
                </div>

                <div className="mt-8 border-t pt-8">
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/demo" onClick={() => setOpen(false)}>
                      Book Demo
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
