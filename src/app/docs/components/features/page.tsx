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
        <h1 className="text-3xl font-bold tracking-tight">Features Sections</h1>
        <p className="mt-2 text-muted-foreground">
          Showcase your product features with beautiful grid and list layouts.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">FeaturesSection</code> - Grid layout with feature cards</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">EnterpriseFeaturesSection</code> - Enterprise-focused features with icons</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">DeveloperExperienceSection</code> - Developer-focused features and benefits</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">QualitySection</code> - Quality metrics and standards</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">TechStack</code> - Technology stack showcase</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">ComparisonSection</code> - Feature comparison table</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Import Examples</h2>
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
        <h2 className="text-xl font-semibold">Usage Examples</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Features Section</h3>
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
          <h3 className="text-lg font-medium">Enterprise Features</h3>
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
          <h3 className="text-lg font-medium">Tech Stack</h3>
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
          <h3 className="text-lg font-medium">Comparison Section</h3>
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
          <h3 className="text-lg font-medium">Complete Landing Page</h3>
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
