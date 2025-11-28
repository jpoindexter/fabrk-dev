/**
 * ✅ FABRK COMPONENT
 * Footer - Terminal console [SYSTEM_INFO] style
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
  siX,
  siGithub,
} from "simple-icons";

const techStack = [
  { name: "NEXT.JS", path: siNextdotjs.path },
  { name: "REACT", path: siReact.path },
  { name: "TYPESCRIPT", path: siTypescript.path },
  { name: "TAILWIND", path: siTailwindcss.path },
  { name: "PRISMA", path: siPrisma.path },
  { name: "STRIPE", path: siStripe.path },
  { name: "RESEND", path: siResend.path },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Tech Stack Bar */}
      <div className="border-b border-border px-4 sm:px-6 lg:px-8 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 font-mono text-xs text-muted-foreground">[TECH_STACK]:</div>
          <div className="flex flex-wrap items-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-1.5 border border-border px-2 py-1"
              >
                <SimpleIcon path={tech.path} className="size-3.5" />
                <span className="font-mono text-xs">{tech.name}</span>
                <span className="font-mono text-xs text-success">[OK]</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            {/* Left: Logo + Tagline */}
            <div>
              <div className="mb-4 inline-block border border-border px-3 py-1">
                <span className="font-mono text-xs text-muted-foreground">[SYSTEM_INFO]</span>
              </div>
              <Link href="/" className="mb-4 inline-block transition-opacity hover:opacity-80">
                <Logo size={32} />
              </Link>
              <p className="mt-4 max-w-xs font-mono text-sm text-muted-foreground">
                [TAGLINE]: Ship your SaaS in days, not weeks.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">[STATUS]:</span>
                <span className="font-mono text-xs text-success">OPERATIONAL</span>
              </div>
            </div>

            {/* Right: Nav Links in Terminal Box */}
            <div className="border border-border">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">nav_links.exe</span>
              </div>

              <div className="grid grid-cols-3 divide-x divide-border">
                {/* Product */}
                <div className="p-4">
                  <div className="mb-3 font-mono text-xs text-muted-foreground">[PRODUCT]:</div>
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="#features"
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      &gt; FEATURES
                    </Link>
                    <Link
                      href="#pricing"
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      &gt; PRICING
                    </Link>
                    <Link
                      href="/docs"
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      &gt; DOCS
                    </Link>
                  </nav>
                </div>

                {/* Company */}
                <div className="p-4">
                  <div className="mb-3 font-mono text-xs text-muted-foreground">[COMPANY]:</div>
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="/about"
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      &gt; ABOUT
                    </Link>
                    <Link
                      href="/contact"
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      &gt; CONTACT
                    </Link>
                  </nav>
                </div>

                {/* Legal */}
                <div className="p-4">
                  <div className="mb-3 font-mono text-xs text-muted-foreground">[LEGAL]:</div>
                  <nav className="flex flex-col gap-2">
                    <Link
                      href="/terms"
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      &gt; TERMS
                    </Link>
                    <Link
                      href="/privacy"
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      &gt; PRIVACY
                    </Link>
                    <Link
                      href="/cookies"
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      &gt; COOKIES
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright + Social */}
      <div className="border-t border-border px-4 sm:px-6 lg:px-8 py-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="font-mono text-xs text-muted-foreground">
            <span>[COPYRIGHT]: © {new Date().getFullYear()} Fabrk. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/fabrk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <SimpleIcon path={siX.path} className="size-3.5" />
              <span>X</span>
            </a>
            <a
              href="https://github.com/fabrk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <SimpleIcon path={siGithub.path} className="size-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
