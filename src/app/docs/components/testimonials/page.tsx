import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function TestimonialsComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
        <p className="mt-2 text-muted-foreground">
          Social proof components to showcase customer reviews and testimonials.
        </p>
      </div>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">TestimonialsSection</code> - Grid of testimonial cards with avatars</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Avatar</code> - User avatar component</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">AvatarGroup</code> - Stacked avatar display</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Import Examples</h2>
          <CodeBlock language="typescript" code={`// Testimonials section
import { TestimonialsSection } from "@/components/landing/testimonials-section";

// Avatar components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

// Card for custom testimonials
import { Card, CardContent } from "@/components/ui/card";`} />
        </CardContent>
      </Card>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">Testimonials Section</h3>
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

          <h3 className="text-lg font-medium mt-6 mb-3">Custom Testimonial Card</h3>
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
    <Card className="bg-zinc-950">
      <CardContent className="pt-6">
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
            <p className="text-sm text-muted-foreground">
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

          <h3 className="text-lg font-medium mt-6 mb-3">Avatar Group (Social Proof)</h3>
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
      <p className="text-sm text-muted-foreground">
        Trusted by 500+ developers
      </p>
    </div>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Testimonial Grid</h3>
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
        <h2 className="text-3xl font-bold text-center mb-12">
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
        </CardContent>
      </Card>
    </div>
  );
}
