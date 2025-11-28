/**
 * ✅ FABRK COMPONENT
 * Footer - Clean footer with tech stack logos
 * Production-ready ✓
 */
import Link from "next/link";
import { LogoAlt as Logo } from "@/components/home/logo-alt";
import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siTypescript,
  siStripe,
  siResend,
} from "simple-icons";

const techStack = [
  { name: "Next.js", path: siNextdotjs.path },
  { name: "React", path: siReact.path },
  { name: "TypeScript", path: siTypescript.path },
  { name: "Tailwind", path: siTailwindcss.path },
  { name: "Prisma", path: siPrisma.path },
  { name: "Stripe", path: siStripe.path },
  { name: "Resend", path: siResend.path },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Tech Stack Bar */}
      <div className="border-b border-border px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <SimpleIcon path={tech.path} className="size-5" />
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

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
                    href="/docs"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Documentation
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

      {/* Bottom: Copyright */}
      <div className="border-t border-border px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Fabrk. All rights reserved.</span>
          <span>Built for indie hackers and startups</span>
        </div>
      </div>
    </footer>
  );
}
