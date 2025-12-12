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
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Logo } from '@/components/shared/logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: 'FEATURES', href: '/features' },
    { label: 'PRICING', href: '#pricing' },
    { label: 'DOCS', href: '/docs' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 w-full items-center px-4 sm:px-6">
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

          {/* Theme + CTA Buttons */}
          <div className="flex items-center gap-2">
            <ThemeDropdown />
            <Button variant="outline" asChild className={cn('text-xs', mode.radius, mode.font)}>
              <Link href="/demo">&gt; VIEW DEMO</Link>
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
                className={cn('h-10 w-10', mode.radius)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={cn('w-[300px] p-6', mode.radius)}>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="border-border mb-6 border-b pb-4">
                <span className={cn('text-muted-foreground text-xs', mode.font)}>
                  [SYSTEM MENU]
                </span>
              </div>
              <nav className="flex flex-col space-y-4">
                <span className={cn('text-muted-foreground text-xs', mode.font)}>[NAVIGATE]:</span>
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-foreground hover:text-primary text-sm transition-colors',
                        mode.font
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      &gt; {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="border-border border-t pt-6">
                  <span className={cn('text-muted-foreground mb-4 block text-xs', mode.font)}>
                    [THEME]:
                  </span>
                  <div className="mb-4 flex items-center gap-2">
                    <ThemeDropdown />
                  </div>
                </div>
                <div className="border-border border-t pt-6">
                  <span className={cn('text-muted-foreground mb-4 block text-xs', mode.font)}>
                    [ACTIONS]:
                  </span>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className={cn('w-full text-xs', mode.radius, mode.font)}
                      asChild
                    >
                      <Link href="/demo">&gt; VIEW DEMO</Link>
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </nav>
  );
}
