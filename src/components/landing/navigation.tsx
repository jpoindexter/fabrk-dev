/* 💡 NAV TIP: Update the navLinks array to match your site sections.
 * Replace the Logo component with your own logo.
 * The navigation is responsive - mobile menu handled via Sheet component.
 */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { LogoAlt as Logo } from "@/components/home/logo-alt";
import { ThemeDropdown } from "@/components/theme/theme-dropdown";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center px-4 sm:px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Logo size={28} />
          </Link>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop Navigation Links + Theme Controls + CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden items-center gap-6 md:flex"
        >
          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Vertical Separator */}
          <div className="h-6 w-px bg-border" />

          {/* Theme + CTA Buttons */}
          <div className="flex items-center gap-2">
            <ThemeDropdown />
            <Button
              variant="outline"
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
        </motion.div>

        {/* Mobile Menu Trigger & CTA */}
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
                className="h-10 w-10"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className="text-base font-medium text-foreground transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="border-t border-border pt-6">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Theme</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <ThemeDropdown />
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="/demo">View Live Demo</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="mt-3 w-full"
                      asChild
                    >
                      <Link href="#pricing">Get Started</Link>
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Mobile CTA Button */}
          <Button
            asChild
            className="md:hidden"
          >
            <Link href="#pricing" className="scroll-smooth">Get Started</Link>
          </Button>
        </motion.div>
      </div>
    </nav>
  );
}
