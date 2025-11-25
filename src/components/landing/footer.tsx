import Link from "next/link";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Logo & Copyright Section */}
        <div className="mb-12">
          <Link href="/" className="mb-4 inline-block transition-opacity hover:opacity-80">
            <Logo size={28} />
          </Link>
          <p className="text-sm font-normal text-muted-foreground mb-6">
            Ship your SaaS in days, not weeks.
          </p>
          <p className="text-xs font-normal text-muted-foreground">
            © 2025 Fabrk. All rights reserved.
          </p>
        </div>

        {/* Centered Navigation Columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
          {/* Column 1: Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Product
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="#features"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="/templates"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Demo
              </Link>
              <Link
                href="/components"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Components
              </Link>
            </nav>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Resources
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/blog"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </Link>
              <Link
                href="/templates"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Templates
              </Link>
              <Link
                href="/changelog"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Changelog
              </Link>
              <Link
                href="/about"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
              <a
                href="https://github.com/fabrk/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Documentation
              </a>
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Legal
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/terms"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-center">
            <p className="text-xs font-normal text-muted-foreground">
              Made with ❤️ by indie developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
