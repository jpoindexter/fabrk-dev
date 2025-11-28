/* 💡 COPY TIP: Update your company name, copyright year, and footer links.
 * Add your social media links and any legal pages required for your region.
 * The tagline should reinforce your main value proposition.
 */
import Link from "next/link";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
          {/* Left: Logo + Tagline */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <Logo size={32} />
            </Link>
            <p className="mt-4 text-lg text-muted-foreground max-w-xs">
              Ship your SaaS in days, not weeks.
            </p>
          </div>

          {/* Right: Nav Columns in Bordered Box */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
              {/* Product */}
              <div className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Product</h4>
                <nav className="flex flex-col gap-3">
                  <Link
                    href="#features"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Features
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/demo"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Demo
                  </Link>
                </nav>
              </div>

              {/* Company */}
              <div className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Company</h4>
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contact
                  </Link>
                </nav>
              </div>

              {/* Legal */}
              <div className="p-6 col-span-2 lg:col-span-1 border-t lg:border-t-0 lg:border-l border-border">
                <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/cookies"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright + Watermark */}
      <div className="border-t border-border px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-muted-foreground">
          <span>© 2025 Fabrk. All rights reserved.</span>
          <span>Made with ❤️ by indie developers</span>
        </div>

      </div>
    </footer>
  );
}
