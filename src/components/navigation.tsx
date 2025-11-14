/**
 * ✅ FABRK COMPONENT
 * Navigation Component
 * Production-ready ✓
 */

"use client";

import { Logo } from "@/components/home/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('navigation');

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
              <Logo size={28} />
            </Link>
          </div>

          {/* Right-aligned Navigation Links */}
          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('docs')}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('about')}
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('blog')}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('pricing')}
            </Link>
            <LocaleSwitcher />
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
                    {t('home')}
                  </Link>
                  <Link
                    href="/components"
                    onClick={() => setOpen(false)}
                    className="py-1 text-lg font-medium hover:underline"
                  >
                    {t('components')}
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setOpen(false)}
                    className="py-1 text-lg font-medium hover:underline"
                  >
                    {t('pricing')}
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setOpen(false)}
                    className="py-1 text-lg font-medium hover:underline"
                  >
                    {t('blog')}
                  </Link>
                </nav>

                <div className="mt-8">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">{t('docs')}</h3>
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/docs"
                      onClick={() => setOpen(false)}
                      className="py-1 text-lg font-medium hover:underline"
                    >
                      {t('docs')}
                    </Link>
                  </nav>
                </div>

                <div className="mt-8">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">{t('support')}</h3>
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="py-1 text-lg font-medium hover:underline"
                    >
                      {t('contact')}
                    </Link>
                  </nav>
                </div>

                <div className="mt-8 border-t pt-8">
                  <LocaleSwitcher />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
