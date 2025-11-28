/* 💡 COPY TIP: Update your company name, copyright year, and footer links.
 * Add your social media links and any legal pages required for your region.
 * The tagline should reinforce your main value proposition.
 */
import Link from "next/link";
import { LogoAlt as Logo } from "@/components/home/logo-alt";
import { H4, Small } from "@/components/ui/typography";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="flex w-full flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-start">
        {/* Left: Logo & Copyright Section */}
          <div className="lg:w-64 flex-shrink-0">
            <Link href="/" className="inline-flex transition-opacity hover:opacity-80">
              <Logo size={28} />
            </Link>
            <Small className="mt-4 block text-muted-foreground">
              © 2025 Fabrk. All rights reserved.
            </Small>
            <Small className="mt-2 block text-muted-foreground">
              Made with ❤️ by indie developers
            </Small>
          </div>

          {/* Center: Navigation Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16 flex-grow lg:justify-self-center lg:mx-auto lg:max-w-3xl">
            {/* Column 1: Product */}
          <div>
            <H4 className="mb-4">
              Product
            </H4>
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
                href="/demo"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Demo
              </Link>
            </nav>
          </div>

          {/* Column 2: Resources */}
          <div>
            <H4 className="mb-4">
              Resources
            </H4>
            <nav className="flex flex-col gap-3">
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
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div>
            <H4 className="mb-4">
              Legal
            </H4>
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
    </footer>
  );
}
