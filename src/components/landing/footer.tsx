import Link from "next/link";
import { SimpleIcon } from "@/components/ui/simple-icon";
import { siX, siGithub } from "simple-icons";
import { LogoAlt as Logo } from "@/components/home/logo-alt";

export function Footer() {
  return (
    <footer className="border-t-2 border-brutal bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Logo & Copyright */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 inline-block transition-transform hover:-translate-y-1">
              <Logo size={32} />
            </Link>
            <p className="text-sm font-bold text-black mb-6">
              Ship your SaaS in days, not weeks.
            </p>
            <p className="text-xs font-bold text-black">
              © 2025 Fabrk. All rights reserved.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-black">
              Product
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="#features"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href="/templates"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Demo
              </Link>
              <Link
                href="/variations"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Variations
              </Link>
              <Link
                href="/components"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Components
              </Link>
            </nav>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-black">
              Resources
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/templates"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Templates
              </Link>
              <Link
                href="/about"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Contact
              </Link>
              <a
                href="https://github.com/fabrk/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Documentation
              </a>
            </nav>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-black">
              Legal
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/terms"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-sm font-bold text-black transition-colors hover:text-primary"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>

          {/* Column 5: Social & Community */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-black">
              Community
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://twitter.com/fabrk"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3"
              >
                <div className="rounded-brutal border-2 border-brutal bg-primary p-2.5 shadow-brutal transition-brutal group-hover:shadow-brutal-lg group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  <SimpleIcon path={siX.path} size={20} className="text-primary-foreground" />
                </div>
                <span className="text-sm font-bold text-black group-hover:text-primary">
                  Follow on X
                </span>
              </a>
              <a
                href="https://github.com/fabrk"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3"
              >
                <div className="rounded-brutal border-2 border-brutal bg-accent p-2.5 shadow-brutal transition-brutal group-hover:shadow-brutal-lg group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  <SimpleIcon path={siGithub.path} size={20} className="text-accent-foreground" />
                </div>
                <span className="text-sm font-bold text-black group-hover:text-primary">
                  Star on GitHub
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8">
          <div className="flex justify-start">
            <p className="text-xs font-bold text-black">
              Made with ❤️ by indie developers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
