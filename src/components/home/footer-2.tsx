"use client"

import { Logo } from "./logo"
import Link from "next/link"

export function Footer2() {
  return (
    <footer className="bg-background py-16 md:py-20" role="contentinfo" aria-label="Site footer">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-8">
            <Link href="/" aria-label="Go to homepage">
              <Logo />
            </Link>

            <nav className="flex flex-wrap justify-center items-center gap-6 md:gap-8" aria-label="Footer navigation">
              <Link href="#features" className="text-muted-foreground hover:text-foreground smooth-transition text-sm">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground smooth-transition text-sm">
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-muted-foreground hover:text-foreground smooth-transition text-sm"
              >
                Testimonials
              </Link>
              <Link href="#faq" className="text-muted-foreground hover:text-foreground smooth-transition text-sm">
                FAQ
              </Link>
            </nav>
          </div>

          <div className="h-px bg-primary/10" role="presentation" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-sm font-light">
              © {new Date().getFullYear()} Fabrk. All rights reserved.
            </p>

            <nav className="flex flex-wrap justify-center gap-6 md:gap-8" aria-label="Legal links">
              <Link href="#" className="text-muted-foreground hover:text-foreground smooth-transition text-sm">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground smooth-transition text-sm">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
