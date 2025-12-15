/**
 * ✅ FABRK COMPONENT
 * Navigation - Terminal console style with [NAVIGATE] labels
 * Production-ready ✓
 */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { ThemeDropdown } from '@/components/theme/theme-dropdown';
import { MonitorEffectsDropdown } from '@/components/theme/monitor-effects-dropdown';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Logo } from '@/components/shared/logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: 'FEATURES', href: '#features' },
    { label: 'PRICING', href: '#pricing' },
    { label: 'DOCS', href: '/docs' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 w-full items-center px-4 sm:px-6">
        {/* Mobile Menu Trigger - Left side */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn('mr-2 h-10 w-10 md:hidden', mode.radius)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className={cn('w-[280px] p-0', mode.radius)}>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Header */}
            <div className="border-border border-b p-4">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col p-4">
              <span className={cn('text-muted-foreground mb-3 text-xs', mode.font)}>
                [NAVIGATE]:
              </span>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-foreground hover:bg-muted hover:text-primary block px-3 py-2 text-sm transition-colors',
                        mode.font,
                        mode.radius
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      &gt; {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {/* Display Options */}
              <div className="border-border mt-6 border-t pt-4">
                <span className={cn('text-muted-foreground mb-3 block text-xs', mode.font)}>
                  [DISPLAY]:
                </span>
                <div className="flex gap-2">
                  <ThemeDropdown />
                  <MonitorEffectsDropdown />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-border mt-6 border-t pt-4">
                <span className={cn('text-muted-foreground mb-3 block text-xs', mode.font)}>
                  [ACTIONS]:
                </span>
                <div className="space-y-2">
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className={cn('w-full text-xs', mode.radius, mode.font)}
                      asChild
                    >
                      <Link href="/library">&gt; VIEW LIBRARY</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className={cn('w-full text-xs', mode.radius, mode.font)} asChild>
                      <Link href="#pricing">&gt; GET STARTED</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo with Terminal Style */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Link
            href="/"
            className={cn('flex items-center gap-2 transition-opacity hover:opacity-80', mode.font)}
          >
            <Logo />
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
          {/* Navigation Links with [NAVIGATE]: prefix */}
          <div className="flex items-center gap-1">
            <span className={cn('text-muted-foreground text-xs', mode.font)}>[NAVIGATE]:</span>
            <div className="flex items-center">
              {navLinks.map((link, _index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-muted-foreground hover:text-foreground px-4 py-1 text-sm transition-colors',
                    mode.font
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="bg-border h-6 w-px" />

          {/* Theme + Monitor Effects + CTA Buttons */}
          <div className="flex items-center gap-2">
            <ThemeDropdown />
            <MonitorEffectsDropdown />
            <Button variant="outline" asChild className={cn('text-xs', mode.radius, mode.font)}>
              <Link href="/demo">&gt; VIEW DEMO</Link>
            </Button>
            <Button asChild className={cn('text-xs', mode.radius, mode.font)}>
              <Link href="#pricing" className="scroll-smooth">
                &gt; GET STARTED
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Mobile CTA Button */}
        <Button asChild className={cn('text-xs md:hidden', mode.radius, mode.font)}>
          <Link href="#pricing" className="scroll-smooth">
            &gt; START
          </Link>
        </Button>
      </div>
    </nav>
  );
}
