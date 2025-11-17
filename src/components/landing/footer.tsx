import Link from "next/link";
import { SimpleIcon } from "@/components/ui/simple-icon";
import { siX, siGithub } from "simple-icons";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Logo & Copyright */}
          <div className="lg:col-span-1">
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

          {/* Column 2: Product */}
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
                href="/variations"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Variations
              </Link>
              <Link
                href="/components"
                className="text-sm font-normal text-muted-foreground transition-colors hover:text-foreground"
              >
                Components
              </Link>
            </nav>
          </div>

          {/* Column 3: Resources */}
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

          {/* Column 4: Legal */}
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

          {/* Column 5: Social & Community */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Community
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://twitter.com/fabrk"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3"
              >
                <div className="rounded-md border border-border bg-background p-2 transition-colors group-hover:bg-primary group-hover:border-primary">
                  <SimpleIcon path={siX.path} className="h-4 w-4 text-foreground transition-colors group-hover:text-primary-foreground" />
                </div>
                <span className="text-sm font-normal text-muted-foreground transition-colors group-hover:text-foreground">
                  Follow on X
                </span>
              </a>
              <a
                href="https://github.com/fabrk"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3"
              >
                <div className="rounded-md border border-border bg-background p-2 transition-colors group-hover:bg-primary group-hover:border-primary">
                  <SimpleIcon path={siGithub.path} className="h-4 w-4 text-foreground transition-colors group-hover:text-primary-foreground" />
                </div>
                <span className="text-sm font-normal text-muted-foreground transition-colors group-hover:text-foreground">
                  Star on GitHub
                </span>
              </a>
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
