import Link from "next/link";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12">
          {/* Left: Logo & Copyright Section */}
          <div className="lg:w-64 flex-shrink-0">
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

          {/* Center: Navigation Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16 flex-grow lg:justify-self-center lg:mx-auto lg:max-w-3xl">
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
            </nav>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Resources
            </h4>
            <nav className="flex flex-col gap-3">
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
