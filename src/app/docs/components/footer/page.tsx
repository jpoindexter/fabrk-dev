import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Layout, Link as LinkIcon, Copyright, Layers } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Footer Components - Fabrk Docs",
  description: "Site footer with navigation links, social icons, newsletter signup, and legal pages. Multiple layouts.",
};

export default function FooterComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Footer_Components"
      description="Footer components with links, branding, and legal information."
      overview="3 footer components: landing page footer with link columns, logo component, and separator. Includes social links and copyright."
      features={[
        { icon: Layout, title: "Footer", description: "Full footer with link columns." },
        { icon: LinkIcon, title: "Logo", description: "Brand logo component." },
        { icon: Layers, title: "Separator", description: "Visual divider element." },
        { icon: Copyright, title: "Legal", description: "Copyright and legal links." },
      ]}
      usage={[
        {
          title: "Landing Page Footer",
          description: "Full footer for landing pages",
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
}

// Footer typically includes:
// - Logo and tagline
// - Link columns (Product, Company, Legal, etc.)
// - Social media links
// - Copyright notice
// - Newsletter signup (optional)`,
          language: "tsx",
        },
        {
          title: "Custom Footer",
          description: "Build your own footer with link columns",
          code: `import Link from "next/link";
import { Logo } from "@/components/home/logo";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function CustomFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Ship your SaaS faster.
            </p>
          </div>
          {/* Link columns */}
        </div>
        <Separator className="my-8" />
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fabrk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}`,
          language: "tsx",
        },
        {
          title: "Simple Footer",
          description: "Minimal footer with essentials",
          code: `import Link from "next/link";

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
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "FAQ", href: "/docs/components/faq" }}
      next={{ title: "Overview", href: "/docs/components/overview" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Footer</code> - Landing page footer with link columns</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Logo</code> - Brand logo component</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">Separator</code> - Visual divider</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/overview">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>All Components</h3>
                <p className={docsTypography.body}>Full component library</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/tutorials/quick-start">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Quick Start</h3>
                <p className={docsTypography.body}>Assemble landing page</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
