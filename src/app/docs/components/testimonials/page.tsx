import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Testimonials - Fabrk Docs",
  description: "Social proof components for customer reviews. Cards, carousels, and quote layouts for landing pages.",
};

export default function TestimonialsComponentsPage() {
  return (
    <div className="space-y-16">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x60] COMPONENTS ] TESTIMONIALS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">TESTIMONIALS</h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Social proof components to showcase customer reviews and testimonials.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary mb-3">AVAILABLE_COMPONENTS</h2>
          <ul className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">TestimonialsSection</code> - Grid of testimonial cards with avatars</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">Avatar</code> - User avatar component</li>
            <li>└─ <code className="bg-muted px-1 font-mono text-xs">AvatarGroup</code> - Stacked avatar display</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">IMPORT_EXAMPLES</h2>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="typescript" code={`// Testimonials section
import { TestimonialsSection } from "@/components/landing/testimonials-section";

// Avatar components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

// Card for custom testimonials
import { Card, CardContent } from "@/components/ui/card";`} />
        </div>
      </div>

      <div className="space-y-16">
        <h2 className="font-mono text-lg font-bold text-primary">USAGE_EXAMPLES</h2>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">TESTIMONIALS_SECTION</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { TestimonialsSection } from "@/components/landing/testimonials-section";

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
// - Scroll animations`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">CUSTOM_TESTIMONIAL_CARD</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="rounded-none">
      <CardContent className="p-6">
        <p className="text-muted-foreground italic mb-4">
          "{quote}"
        </p>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>
              {name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              {role} at {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Usage
<TestimonialCard
  quote="This boilerplate saved us weeks of development time."
  name="Sarah Chen"
  role="CTO"
  company="TechStart"
  avatar="/avatars/sarah.jpg"
/>`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">AVATAR_GROUP_SOCIAL_PROOF</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { AvatarGroup } from "@/components/ui/avatar-group";

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
      <p className="font-mono text-sm text-muted-foreground leading-relaxed">
        Trusted by 500+ developers
      </p>
    </div>
  );
}`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">TESTIMONIAL_GRID</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Best investment for our startup.",
    name: "Alex Johnson",
    role: "Founder",
    company: "LaunchFast",
  },
  // ... more testimonials
];

export function TestimonialGrid() {
  return (
    <section className="py-24">
      <div className="container">
        <h2 className="font-mono text-lg font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
