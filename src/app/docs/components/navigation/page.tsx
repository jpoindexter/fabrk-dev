"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

// Simplified Navigation Demo for docs
function NavigationDemo() {
  return (
    <nav className="w-full border border-border bg-background">
      <div className="flex h-14 items-center px-4">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-1.5 font-mono">
          <span className="text-xs text-primary">&gt;</span>
          <span className="text-sm font-bold">FABRK</span>
          <span className="text-xs text-muted-foreground">_CONSOLE</span>
        </Link>

        <div className="flex-1" />

        {/* Desktop Nav */}
        <div className="hidden items-center gap-4 md:flex">
          <span className="font-mono text-xs text-muted-foreground">[NAVIGATE]:</span>
          <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">FEATURES</Link>
          <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">PRICING</Link>
          <Link href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground">DOCS</Link>
          <div className="h-4 w-px bg-border" />
          <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
            &gt; VIEW_DEMO
          </Button>
          <Button size="sm" className="rounded-none font-mono text-xs">
            &gt; GET_STARTED
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-none">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-none w-[280px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 pt-8">
                <span className="font-mono text-xs text-muted-foreground">[NAVIGATE]:</span>
                <Link href="#" className="font-mono text-sm">&gt; FEATURES</Link>
                <Link href="#" className="font-mono text-sm">&gt; PRICING</Link>
                <Link href="#" className="font-mono text-sm">&gt; DOCS</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default function NavigationPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.01]"
      title="Navigation"
      description="Responsive navigation component with terminal-style branding, desktop links, and mobile sheet menu."
      mainPreview={{
        preview: <NavigationDemo />,
        code: `import { Navigation } from "@/components/landing/navigation";

export default function LandingPage() {
  return (
    <div>
      <Navigation />
      {/* Page content */}
    </div>
  );
}`,
      }}
      variants={[
        {
          title: "Mobile Menu Open",
          description: "Sheet-based mobile navigation",
          preview: (
            <div className="w-full border border-border bg-card p-4">
              <div className="mb-3 font-mono text-xs text-muted-foreground">[SYSTEM_MENU]</div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-muted-foreground">[NAVIGATE]:</span>
                <Link href="#" className="font-mono text-sm text-foreground hover:text-primary">&gt; FEATURES</Link>
                <Link href="#" className="font-mono text-sm text-foreground hover:text-primary">&gt; PRICING</Link>
                <Link href="#" className="font-mono text-sm text-foreground hover:text-primary">&gt; DOCS</Link>
                <Link href="#" className="font-mono text-sm text-foreground hover:text-primary">&gt; FAQ</Link>
                <div className="border-t border-border pt-4">
                  <Button className="w-full rounded-none font-mono text-xs">&gt; GET_STARTED</Button>
                </div>
              </div>
            </div>
          ),
          code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="right">
    <nav className="flex flex-col gap-4">
      <Link href="#features">FEATURES</Link>
      <Link href="#pricing">PRICING</Link>
      <Link href="/docs">DOCS</Link>
    </nav>
  </SheetContent>
</Sheet>`,
        },
      ]}
      props={[
        {
          name: "navLinks",
          type: "{ label: string; href: string }[]",
          description: "Array of navigation links to display",
          default: "Built-in links",
        },
      ]}
      accessibility={[
        "Mobile menu button has aria-label for screen readers",
        "Sheet has proper focus management when opened",
        "All links are keyboard accessible",
        "Skip to content link available for keyboard users",
      ]}
      previous={{ title: "Overview", href: "/docs/components/overview" }}
      next={{ title: "Hero", href: "/docs/components/hero" }}
    />
  );
}
