import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Quote, User, Users, Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Testimonials - Fabrk Docs",
  description: "Social proof components for customer reviews. Cards, carousels, and quote layouts for landing pages.",
};

export default function TestimonialsComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Testimonials"
      description="Social proof components to showcase customer reviews and testimonials."
      overview="3 testimonial components: testimonials section with grid layout, avatar component, and avatar group for social proof."
      features={[
        { icon: Quote, title: "TestimonialsSection", description: "Grid of testimonial cards." },
        { icon: User, title: "Avatar", description: "User avatar component." },
        { icon: Users, title: "AvatarGroup", description: "Stacked avatar display." },
        { icon: Star, title: "Animated", description: "Framer Motion scroll effects." },
      ]}
      usage={[
        {
          title: "Testimonials Section",
          description: "Grid of testimonial cards",
          code: `import { TestimonialsSection } from "@/components/landing/testimonials-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      {/* Other sections */}
    </main>
  );
}

// TestimonialsSection displays:
// - Grid of testimonial cards
// - Customer avatars
// - Quote text
// - Name and role/company
// - Scroll animations`,
          language: "tsx",
        },
        {
          title: "Custom Testimonial Card",
          description: "Build your own testimonial card",
          code: `import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  avatar
}: TestimonialProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground italic mb-4">"{quote}"</p>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>
              {name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">
              {role} at {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}`,
          language: "tsx",
        },
        {
          title: "Avatar Group Social Proof",
          description: "Stacked avatars with count",
          code: `import { AvatarGroup } from "@/components/ui/avatar-group";

export function SocialProof() {
  const users = [
    { name: "John Doe", image: "/avatars/1.jpg" },
    { name: "Jane Smith", image: "/avatars/2.jpg" },
    { name: "Bob Wilson", image: "/avatars/3.jpg" },
    { name: "Alice Brown", image: "/avatars/4.jpg" },
  ];

  return (
    <div className="flex items-center gap-4">
      <AvatarGroup users={users} max={4} />
      <p className="text-sm text-muted-foreground">
        Trusted by 500+ developers
      </p>
    </div>
  );
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Pricing", href: "/docs/components/pricing" }}
      next={{ title: "FAQ", href: "/docs/components/faq" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">TestimonialsSection</code> - Grid of testimonial cards with avatars</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Avatar</code> - User avatar component</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">AvatarGroup</code> - Stacked avatar display</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/faq">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>FAQ</h3>
                <p className={docsTypography.body}>FAQ accordion section</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/footer">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Footer</h3>
                <p className={docsTypography.body}>Site footer components</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
