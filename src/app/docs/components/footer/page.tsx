"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import Link from "next/link";

// Simplified Footer Demo
function FooterDemo() {
  return (
    <footer className="w-full border border-border bg-background">
      {/* Tech Stack Bar */}
      <div className="border-b border-border p-4">
        <div className="mb-2 font-mono text-xs text-muted-foreground">[ TECH_STACK ]</div>
        <div className="flex flex-wrap gap-2">
          {["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND"].map((tech) => (
            <span key={tech} className="border border-border bg-card px-2 py-1 font-mono text-xs">
              {tech} <span className="text-success">[OK]</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto]">
        {/* Logo & Status */}
        <div>
          <span className="inline-block border border-border bg-card px-4 py-1 font-mono text-xs text-muted-foreground">
            [ SYSTEM_INFO ]
          </span>
          <Link href="#" className="mt-4 flex items-center gap-2 font-mono">
            <span className="text-primary">&gt;</span>
            <span className="text-lg font-bold">FABRK</span>
          </Link>
          <div className="mt-2 flex items-center gap-2 font-mono text-xs">
            <span className="text-muted-foreground">└─ [STATUS]:</span>
            <span className="text-success">■ OPERATIONAL</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-2">
              <div className="size-2 rounded-none bg-destructive/50" />
              <div className="size-2 rounded-none bg-warning/50" />
              <div className="size-2 rounded-none bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">nav_links.exe</span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="p-4">
              <div className="mb-2 font-mono text-xs text-muted-foreground">[ PRODUCT ]</div>
              <div className="flex flex-col gap-1">
                <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">&gt; FEATURES</Link>
                <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">&gt; PRICING</Link>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 font-mono text-xs text-muted-foreground">[ COMPANY ]</div>
              <div className="flex flex-col gap-1">
                <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">&gt; ABOUT</Link>
                <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">&gt; CONTACT</Link>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 font-mono text-xs text-muted-foreground">[ LEGAL ]</div>
              <div className="flex flex-col gap-1">
                <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">&gt; TERMS</Link>
                <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">&gt; PRIVACY</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border p-4">
        <span className="font-mono text-xs text-muted-foreground">
          [ COPYRIGHT ] © 2024 Fabrk │ All rights reserved
        </span>
      </div>
    </footer>
  );
}

// Simple Footer variant
function SimpleFooterDemo() {
  return (
    <footer className="w-full border border-border bg-background p-4">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-mono text-xs text-muted-foreground">© 2024 Your Company</span>
        <nav className="flex gap-4">
          <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">Privacy</Link>
          <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">Terms</Link>
          <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}

export default function FooterPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.07]"
      title="Footer"
      description="Site footer with navigation links, tech stack display, and copyright information."
      mainPreview={{
        preview: <FooterDemo />,
        code: `import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}`,
      }}
      variants={[
        {
          title: "Simple Footer",
          description: "Minimal footer with essentials",
          preview: <SimpleFooterDemo />,
          code: `<footer className="border-t p-6">
  <div className="flex justify-between items-center">
    <p className="text-sm text-muted-foreground">
      © 2024 Your Company
    </p>
    <nav className="flex gap-4">
      <Link href="/privacy">Privacy</Link>
      <Link href="/terms">Terms</Link>
    </nav>
  </div>
</footer>`,
        },
        {
          title: "Social Links",
          description: "Footer social media buttons",
          preview: (
            <div className="flex gap-2">
              <Link href="#" className="flex items-center gap-2 border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground">
                X
              </Link>
              <Link href="#" className="flex items-center gap-2 border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground">
                GitHub
              </Link>
              <Link href="#" className="flex items-center gap-2 border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground">
                Discord
              </Link>
            </div>
          ),
          code: `<div className="flex gap-2">
  <a href="https://x.com" className="border px-4 py-1.5">
    <XIcon className="h-4 w-4" />
    X
  </a>
  <a href="https://github.com" className="border px-4 py-1.5">
    <GithubIcon className="h-4 w-4" />
    GitHub
  </a>
</div>`,
        },
      ]}
      props={[
        {
          name: "links",
          type: "{ category: string; items: { label: string; href: string }[] }[]",
          description: "Organized link columns",
        },
        {
          name: "showTechStack",
          type: "boolean",
          description: "Display tech stack badges",
          default: "true",
        },
        {
          name: "socialLinks",
          type: "{ platform: string; href: string }[]",
          description: "Social media links",
        },
      ]}
      accessibility={[
        "Footer uses semantic footer element",
        "All links are keyboard accessible",
        "Social links open in new tabs with proper rel attributes",
        "Navigation links are grouped logically",
      ]}
      previous={{ title: "FAQ", href: "/docs/components/faq" }}
      next={{ title: "Overview", href: "/docs/components/overview" }}
    />
  );
}
