/**
 * SiteNavigation - Unified navigation for the entire site
 * Consistent global nav links across all pages
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeDropdown } from "@/components/theme/theme-dropdown";

// Global navigation links
const navLinks = [
  { label: "FEATURES", href: "/#features" },
  { label: "PRICING", href: "/#pricing" },
  { label: "DOCS", href: "/docs" },
  { label: "FAQ", href: "/#faq" },
];

// Logo suffix based on section
const sectionSuffix: Record<string, string> = {
  docs: "_DOCS",
  demo: "_DEMO",
  templates: "_TEMPLATES",
  about: "_ABOUT",
  features: "_FEATURES",
  pricing: "_PRICING",
  contact: "_CONTACT",
  terms: "_LEGAL",
  privacy: "_LEGAL",
  cookies: "_LEGAL",
  refund: "_LEGAL",
};

export function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine suffix for logo based on current section
  const currentSection = pathname.split("/").filter(Boolean)[0] || "";
  const suffix = sectionSuffix[currentSection] || "_CONSOLE";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center px-4 sm:px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-1.5 transition-opacity hover:opacity-80 font-mono">
            <span className="text-xs text-primary">&gt;</span>
            <span className="text-sm font-bold tracking-tight">FABRK</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">{suffix}</span>
          </Link>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Side: Nav Links + Theme + CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden items-center gap-6 md:flex"
        >
          {/* Global Nav Links */}
          <div className="flex items-center gap-1">
            <span className="font-mono text-xs text-muted-foreground">[NAVIGATE]:</span>
            <div className="flex items-center">
              {navLinks.map((link) => {
                // Check if this link is active
                // Hash links (/#features, etc.) don't get highlighted - only actual page routes
                const isActive = link.href.startsWith("/#")
                  ? false
                  : link.href === "/docs"
                    ? pathname.startsWith("/docs")
                    : pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1 font-mono text-sm transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Separator */}
          <div className="h-6 w-px bg-border" />

          {/* Theme + CTA Buttons */}
          <div className="flex items-center gap-2">
            <ThemeDropdown />
            <Button
              variant="outline"
              asChild
              className="rounded-none font-mono text-xs"
            >
              <Link href="/templates">&gt; VIEW_DEMO</Link>
            </Button>
            <Button
              asChild
              className="rounded-none font-mono text-xs"
            >
              <Link href="/#pricing">&gt; GET_STARTED</Link>
            </Button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 md:hidden"
        >
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none h-10 w-10"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-none w-[300px] p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="mb-6 border-b border-border pb-4">
                <span className="font-mono text-xs text-muted-foreground">[SYSTEM_MENU]</span>
              </div>
              <nav className="flex flex-col space-y-4">
                <span className="font-mono text-xs text-muted-foreground">[NAVIGATE]:</span>
                {navLinks.map((link) => {
                  // Hash links don't get highlighted - only actual page routes
                  const isActive = link.href.startsWith("/#")
                    ? false
                    : link.href === "/docs"
                      ? pathname.startsWith("/docs")
                      : pathname === link.href;

                  return (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={`font-mono text-sm px-2 py-1 transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        &gt; {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <div className="border-t border-border pt-6">
                  <span className="mb-3 block font-mono text-xs text-muted-foreground">[THEME]:</span>
                  <div className="mb-4 flex items-center gap-2">
                    <ThemeDropdown />
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <span className="mb-3 block font-mono text-xs text-muted-foreground">[ACTIONS]:</span>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="rounded-none w-full font-mono text-xs"
                      asChild
                    >
                      <Link href="/demo">&gt; VIEW_DEMO</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="rounded-none mt-3 w-full font-mono text-xs"
                      asChild
                    >
                      <Link href="/#pricing">&gt; GET_STARTED</Link>
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Mobile CTA Button */}
          <Button
            asChild
            className="rounded-none font-mono text-xs md:hidden"
          >
            <Link href="/#pricing">&gt; START</Link>
          </Button>
        </motion.div>
      </div>
    </nav>
  );
}
