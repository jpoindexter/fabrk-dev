import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Feature Sections - Fabrk Docs",
  description: "Showcase product features with grid layouts, icons, and descriptions. Perfect for landing pages.",
};

export default function FeaturesComponentsPage() {
  return (
    <div className="space-y-16">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x60] COMPONENTS ] FEATURES</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">FEATURE_SECTIONS</h1>
        <p className="font-mono text-xs text-muted-foreground mt-2">
          &gt; Showcase your product features with beautiful grid and list layouts.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold mb-3">AVAILABLE_COMPONENTS</h2>
          <ul className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">FeaturesSection</code> - Grid layout with feature cards</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">EnterpriseFeaturesSection</code> - Enterprise-focused features with icons</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">DeveloperExperienceSection</code> - Developer-focused features and benefits</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">QualitySection</code> - Quality metrics and standards</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">TechStack</code> - Technology stack showcase</li>
            <li>└─ <code className="bg-muted px-1 font-mono text-xs">ComparisonSection</code> - Feature comparison table</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div>
          <h2 className="font-mono text-lg font-bold">IMPORT_EXAMPLES</h2>
        </div>
        <div className="[&>div]:rounded-none">
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
      </div>

      <div className="space-y-16">
        <h2 className="font-mono text-lg font-bold">USAGE_EXAMPLES</h2>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">FEATURES_SECTION</h3>
          <div className="[&>div]:rounded-none">
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
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">ENTERPRISE_FEATURES</h3>
          <div className="[&>div]:rounded-none">
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
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">TECH_STACK</h3>
          <div className="[&>div]:rounded-none">
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
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">COMPARISON_SECTION</h3>
          <div className="[&>div]:rounded-none">
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
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold">COMPLETE_LANDING_PAGE</h3>
          <div className="[&>div]:rounded-none">
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
    </div>
  );
}
