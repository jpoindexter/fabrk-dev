import Link from "next/link";
import { Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#EEEEEE] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1: Logo & Copyright */}
          <div>
            <Link href="/" className="mb-4 inline-block text-xl font-bold text-black">
              Fabrk
            </Link>
            <p className="text-sm text-[#666666]">
              © 2025 Fabrk. All rights reserved.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <nav className="flex flex-col gap-3">
              <Link
                href="#features"
                className="text-sm text-[#333333] transition-colors hover:text-[#007AFF]"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm text-[#333333] transition-colors hover:text-[#007AFF]"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[#333333] transition-colors hover:text-[#007AFF]"
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
                className="text-[#333333] transition-colors hover:text-[#007AFF]"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/fabrk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#333333] transition-colors hover:text-[#007AFF]"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
