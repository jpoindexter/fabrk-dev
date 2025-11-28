import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Footer Components - Fabrk Docs",
  description: "Site footer with navigation links, social icons, newsletter signup, and legal pages. Multiple layouts.",
};

export default function FooterComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Footer</h1>
        <p className="mt-2 text-muted-foreground">
          Footer components with links, branding, and legal information.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Footer</code> - Landing page footer with link columns</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Logo</code> - Brand logo component</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Separator</code> - Visual divider</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Import Examples</h2>
          <CodeBlock language="typescript" code={`// Landing page footer
import { Footer } from "@/components/landing/footer";

// Alternative footer location
import { Footer } from "@/components/home/footer";

// Logo component
import { Logo } from "@/components/home/logo";

// Separator
import { Separator } from "@/components/ui/separator";`} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">Landing Page Footer</h3>
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

          <h3 className="text-lg font-medium mt-6 mb-3">Custom Footer</h3>
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

          <h3 className="text-lg font-medium mt-6 mb-3">Simple Footer</h3>
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
        </CardContent>
      </Card>
    </div>
  );
}
