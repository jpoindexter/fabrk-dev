/**
 * FABRK COMPONENT
 * Footer Component - GDPR Compliant with Legal Links
 * Production-ready
 */

"use client";

import { Logo } from "@/components/home/logo";
import { Cookie, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const openCookieSettings = () => {
    // Trigger cookie consent modal by removing consent from localStorage
    localStorage.removeItem("cookie-consent");
    localStorage.removeItem("cookie-consent-date");
    localStorage.removeItem("cookie-preferences");
    window.location.reload();
  };

  return (
    <footer id="footer" className="mt-auto border-t border-border bg-background">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12 sm:px-8 lg:px-12">
        {/* Logo and Social - Aligned with header */}
        <div className="mb-12 space-y-4">
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Fabrk Home">
            <Logo size={28} />
          </Link>
          <p className="text-sm text-muted-foreground">
            Built with Next.js, TypeScript, Tailwind CSS
          </p>
          <div className="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="size-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Twitter"
            >
              <Twitter className="size-5" fill="none" strokeWidth={1.5} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" fill="none" strokeWidth={1.5} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="YouTube"
            >
              <Youtube className="size-5" fill="none" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/components"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links - GDPR Required */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  onClick={openCookieSettings}
                  className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Cookie className="size-3 fill-none stroke-current" />
                  Cookie Settings
                </button>
              </li>
              <li>
                <Link
                  href="/gdpr"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  GDPR Rights
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl p-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center text-sm text-muted-foreground sm:text-left">
              © {new Date().getFullYear()} Fabrk. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/sitemap" className="transition-colors hover:text-foreground">
                Sitemap
              </Link>
              <span className="text-border">•</span>
              <Link href="/accessibility" className="transition-colors hover:text-foreground">
                Accessibility
              </Link>
              <span className="text-border">•</span>
              <Link href="/status" className="transition-colors hover:text-foreground">
                Status
              </Link>
            </div>
          </div>

          {/* GDPR Compliance Notice */}
          <div className="mt-6 flex items-center justify-center rounded-lg border border-border bg-muted/30 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              We respect your privacy and comply with GDPR regulations. For data requests, contact
              our{" "}
              <a href="mailto:dpo@fabrk.dev" className="text-primary underline hover:no-underline">
                Data Protection Officer
              </a>
              . Response within 30 days guaranteed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
