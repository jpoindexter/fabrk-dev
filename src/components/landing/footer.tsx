/**
 * ✅ FABRK COMPONENT
 * Footer - Terminal console [SYSTEM_INFO] style
 * Production-ready ✓
 */
import Link from "next/link";
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
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

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
    <footer id="footer" className="border-border bg-background border-t">
      {/* Tech Stack Bar */}
      <div className="border-border border-b px-4 py-6 sm:px-6">
        <div>
          <div className="text-muted-foreground mb-4 font-mono text-xs">
            [ [0x70] TECH_STACK ] FIB[1,1,2,3,5,8,13] DEPS
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="border-border bg-card flex items-center gap-2 border px-2 py-1"
              >
                <SimpleIcon path={tech.path} className="size-3.5" />
                <span className="font-mono text-xs">{tech.name}</span>
                <span className="text-success font-mono text-xs">[OK]</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6">
        <div>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            {/* Left: Logo + Tagline */}
            <div>
              <div className="border-border bg-card mb-4 inline-block border px-4 py-1">
                <span className="text-muted-foreground font-mono text-xs">
                  [ [0x71] SYSTEM_INFO ]
                </span>
              </div>
              <Link
                href="/"
                className="mb-4 flex items-center gap-2 font-mono transition-opacity hover:opacity-80"
              >
                <span className="text-primary text-sm">&gt;</span>
                <span className="text-xl font-bold tracking-tight">FABRK</span>
              </Link>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-muted-foreground font-mono text-xs">└─ [STATUS]:</span>
                <span className="text-success font-mono text-xs">■ OPERATIONAL</span>
              </div>
            </div>

            {/* Right: Nav Links in Terminal Box */}
            <div className="border-border bg-card border">
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <span className="text-muted-foreground font-mono text-xs">
                  [ [0x72] nav_links.exe │ PID:1024 ]
                </span>
              </div>

              <div className="divide-border grid grid-cols-3 divide-x">
                {/* Product */}
                <div className="p-4">
                  <div className="text-muted-foreground mb-4 font-mono text-xs">[ PRODUCT ]</div>
                  <nav aria-label="Product links" className="flex flex-col gap-2">
                    <Link
                      href="#features"
                      className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                    >
                      &gt; FEATURES
                    </Link>
                    <Link
                      href="#pricing"
                      className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                    >
                      &gt; PRICING
                    </Link>
                    <Link
                      href="/docs"
                      className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                    >
                      &gt; DOCS
                    </Link>
                  </nav>
                </div>

                {/* Company */}
                <div className="p-4">
                  <div className="text-muted-foreground mb-4 font-mono text-xs">[ COMPANY ]</div>
                  <nav aria-label="Company links" className="flex flex-col gap-2">
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                    >
                      &gt; ABOUT
                    </Link>
                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                    >
                      &gt; CONTACT
                    </Link>
                  </nav>
                </div>

                {/* Legal */}
                <div className="p-4">
                  <div className="text-muted-foreground mb-4 font-mono text-xs">[ LEGAL ]</div>
                  <nav aria-label="Legal links" className="flex flex-col gap-2">
                    <Link
                      href="/terms"
                      className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                    >
                      &gt; TERMS
                    </Link>
                    <Link
                      href="/privacy"
                      className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
                    >
                      &gt; PRIVACY
                    </Link>
                    <Link
                      href="/cookies"
                      className="text-muted-foreground hover:text-foreground font-mono text-xs transition-colors"
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
      <div className="border-border border-t px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-muted-foreground font-mono text-xs">
            <span>
              [ [0x7F] COPYRIGHT ] © {new Date().getFullYear()} Fabrk │ All rights reserved
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/fabrk"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-muted-foreground hover:border-primary/50 hover:text-foreground flex items-center gap-2 border px-4 py-2 font-mono text-xs transition-colors"
            >
              <SimpleIcon path={siX.path} className="size-3.5" />
              <span>X</span>
            </a>
            <a
              href="https://github.com/fabrk"
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-muted-foreground hover:border-primary/50 hover:text-foreground flex items-center gap-2 border px-4 py-2 font-mono text-xs transition-colors"
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
