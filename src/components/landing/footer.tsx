import Link from "next/link";
import { SimpleIcon } from "@/components/ui/simple-icon";
import { siX, siGithub } from "simple-icons";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1: Logo & Copyright */}
          <div>
            <Link href="/" className="mb-4 inline-block transition-transform hover:-translate-y-1">
              <Logo size={24} />
            </Link>
            <p className="text-sm font-bold text-foreground">
              © 2025 Fabrk. All rights reserved.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <nav className="flex flex-col gap-3">
              <Link
                href="#features"
                className="text-sm font-bold text-foreground transition-transform hover:-translate-x-1"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-bold text-foreground transition-transform hover:-translate-x-1"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold text-foreground transition-transform hover:-translate-x-1"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Social */}
          <div>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/fabrk"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-brutal border-3 border-black bg-background p-3 shadow-brutal transition-all hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1"
                aria-label="X (Twitter)"
              >
                <SimpleIcon path={siX.path} size={24} />
              </a>
              <a
                href="https://github.com/fabrk"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-brutal border-3 border-black bg-background p-3 shadow-brutal transition-all hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <SimpleIcon path={siGithub.path} size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
