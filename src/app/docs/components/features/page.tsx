import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Feature Sections - Fabrk Docs",
  description: "Showcase product features with grid layouts, icons, and descriptions. Perfect for landing pages.",
};

export default function FeaturesComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x60] COMPONENTS ] FEATURES</span>
        </div>
        <h1 className="font-mono text-3xl font-bold tracking-tight">FEATURE_SECTIONS</h1>
        <p className="font-mono text-sm text-muted-foreground mt-2">
          &gt; Showcase your product features with beautiful grid and list layouts.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="font-mono text-xl font-semibold mb-4">AVAILABLE_COMPONENTS</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">FeaturesSection</code> - Grid layout with feature cards</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">EnterpriseFeaturesSection</code> - Enterprise-focused features with icons</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">DeveloperExperienceSection</code> - Developer-focused features and benefits</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">QualitySection</code> - Quality metrics and standards</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">TechStack</code> - Technology stack showcase</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">ComparisonSection</code> - Feature comparison table</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-xl font-semibold">IMPORT_EXAMPLES</h2>
        </div>
        <CodeBlock language="typescript" code={`// Main features section
import { FeaturesSection } from "@/components/landing/features-section";

// Enterprise features
import { EnterpriseFeaturesSection } from "@/components/landing/enterprise-features-section";

// Developer experience
import { DeveloperExperienceSection } from "@/components/landing/developer-experience-section";

// Quality metrics
import { QualitySection } from "@/components/landing/quality-section";

// Tech stack display
import { TechStack } from "@/components/landing/tech-stack";

// Comparison table
import { ComparisonSection } from "@/components/landing/comparison-section";`} />
      </div>

      <div className="space-y-8">
        <h2 className="font-mono text-xl font-semibold">USAGE_EXAMPLES</h2>

        <div className="space-y-4">
          <h3 className="font-mono text-xl font-medium">FEATURES_SECTION</h3>
          <CodeBlock language="tsx" code={`import { FeaturesSection } from "@/components/landing/features-section";

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
// Includes scroll animations via Framer Motion`} />
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-xl font-medium">ENTERPRISE_FEATURES</h3>
          <CodeBlock language="tsx" code={`import { EnterpriseFeaturesSection } from "@/components/landing/enterprise-features-section";

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
// - Admin controls`} />
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-xl font-medium">TECH_STACK</h3>
          <CodeBlock language="tsx" code={`import { TechStack } from "@/components/landing/tech-stack";

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
// - Tailwind CSS, Radix UI`} />
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-xl font-medium">COMPARISON_SECTION</h3>
          <CodeBlock language="tsx" code={`import { ComparisonSection } from "@/components/landing/comparison-section";

export default function LandingPage() {
  return (
    <main>
      <PricingSection />
      <ComparisonSection />
      {/* Other sections */}
    </main>
  );
}

// Shows feature comparison table
// Compare your product vs competitors
// Or compare different pricing tiers`} />
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-xl font-medium">COMPLETE_LANDING_PAGE</h3>
          <CodeBlock language="tsx" code={`import { HeroSection } from "@/components/landing/hero-section";
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
}`} />
        </div>
      </div>
    </div>
  );
}
