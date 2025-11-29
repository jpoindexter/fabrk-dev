import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Grid, Building2, Code2, Shield } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Feature Sections - Fabrk Docs",
  description: "Showcase product features with grid layouts, icons, and descriptions. Perfect for landing pages.",
};

export default function FeaturesComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Feature_Sections"
      description="Showcase your product features with beautiful grid and list layouts."
      overview="6 feature section components: grid layout, enterprise features, developer experience, quality metrics, tech stack showcase, and comparison tables."
      features={[
        { icon: Grid, title: "FeaturesSection", description: "Grid of feature cards." },
        { icon: Building2, title: "Enterprise", description: "Enterprise-focused features." },
        { icon: Code2, title: "DevExperience", description: "Developer-focused benefits." },
        { icon: Shield, title: "Quality", description: "Quality metrics display." },
      ]}
      usage={[
        {
          title: "Features Section",
          description: "Grid layout with feature cards",
          code: `import { FeaturesSection } from "@/components/landing/features-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      {/* Other sections */}
    </main>
  );
}

// FeaturesSection displays a grid of feature cards
// Each card has an icon, title, and description
// Includes scroll animations via Framer Motion`,
          language: "tsx",
        },
        {
          title: "Enterprise Features",
          description: "Enterprise-focused feature section",
          code: `import { EnterpriseFeaturesSection } from "@/components/landing/enterprise-features-section";

export default function LandingPage() {
  return (
    <main>
      <FeaturesSection />
      <EnterpriseFeaturesSection />
      {/* Other sections */}
    </main>
  );
}

// Perfect for highlighting:
// - Security features
// - Compliance certifications
// - Team collaboration tools
// - Admin controls`,
          language: "tsx",
        },
        {
          title: "Tech Stack",
          description: "Technology stack showcase",
          code: `import { TechStack } from "@/components/landing/tech-stack";

export default function LandingPage() {
  return (
    <main>
      <FeaturesSection />
      <TechStack />
      {/* Other sections */}
    </main>
  );
}

// Displays technology logos and names
// Great for showcasing your stack:
// - Next.js, React, TypeScript
// - Prisma, PostgreSQL
// - Stripe, Resend
// - Tailwind CSS, Radix UI`,
          language: "tsx",
        },
        {
          title: "Complete Landing Page",
          description: "All feature sections together",
          code: `import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { EnterpriseFeaturesSection } from "@/components/landing/enterprise-features-section";
import { TechStack } from "@/components/landing/tech-stack";
import { QualitySection } from "@/components/landing/quality-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <TechStack />
      <EnterpriseFeaturesSection />
      <QualitySection />
      {/* Pricing, Testimonials, FAQ, Footer */}
    </main>
  );
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Hero", href: "/docs/components/hero" }}
      next={{ title: "Pricing", href: "/docs/components/pricing" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">FeaturesSection</code> - Grid layout with feature cards</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">EnterpriseFeaturesSection</code> - Enterprise-focused features with icons</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">DeveloperExperienceSection</code> - Developer-focused features and benefits</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">QualitySection</code> - Quality metrics and standards</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">TechStack</code> - Technology stack showcase</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">ComparisonSection</code> - Feature comparison table</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/pricing">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Pricing</h3>
                <p className={docsTypography.body}>Pricing table components</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/testimonials">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Testimonials</h3>
                <p className={docsTypography.body}>Customer testimonials</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
