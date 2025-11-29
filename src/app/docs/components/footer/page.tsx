import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Footer Components - Fabrk Docs",
  description: "Site footer with navigation links, social icons, newsletter signup, and legal pages. Multiple layouts.",
};

export default function FooterComponentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x60] COMPONENTS ] FOOTER</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">FOOTER_COMPONENTS</h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          &gt; Footer components with links, branding, and legal information.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-4">
          <h2 className="font-mono text-lg font-bold mb-3">AVAILABLE_COMPONENTS</h2>
          <ul className="space-y-2 font-mono text-xs text-muted-foreground">
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">Footer</code> - Landing page footer with link columns</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">Logo</code> - Brand logo component</li>
            <li>└─ <code className="bg-muted px-1 font-mono text-xs">Separator</code> - Visual divider</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div>
          <h2 className="font-mono text-lg font-bold">IMPORT_EXAMPLES</h2>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="typescript" code={`// Landing page footer
import { Footer } from "@/components/landing/footer";

// Alternative footer location
import { Footer } from "@/components/home/footer";

// Logo component
import { Logo } from "@/components/home/logo";

// Separator
import { Separator } from "@/components/ui/separator";`} />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold">USAGE_EXAMPLES</h2>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">LANDING_PAGE_FOOTER</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { Footer } from "@/components/landing/footer";

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
}

// Footer typically includes:
// - Logo and tagline
// - Link columns (Product, Company, Legal, etc.)
// - Social media links
// - Copyright notice
// - Newsletter signup (optional)`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">CUSTOM_FOOTER</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import Link from "next/link";
import { Logo } from "@/components/home/logo";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export function CustomFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Ship your SaaS faster with our production-ready boilerplate.
            </p>
          </div>

          {/* Link columns */}
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fabrk. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social links */}
            <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
              Twitter
            </a>
            <a href="https://github.com" className="text-muted-foreground hover:text-foreground">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}`} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">SIMPLE_FOOTER</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import Link from "next/link";

export function SimpleFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company
          </p>
          <nav className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
