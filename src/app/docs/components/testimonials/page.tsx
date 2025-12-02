"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Simplified Testimonials Demo
function TestimonialsDemo() {
  const testimonials = [
    {
      quote: "Fabrk saved me 2 weeks of setup time. The code quality is excellent.",
      author: "SARAH_CHEN",
      role: "Indie Developer",
      initials: "SC",
    },
    {
      quote: "Best boilerplate I've used. Clean code, modern stack.",
      author: "MARCUS_J",
      role: "Full-Stack Dev",
      initials: "MJ",
    },
    {
      quote: "Everything is accessible out of the box. Worth every penny.",
      author: "EMILY_R",
      role: "Product Designer",
      initials: "ER",
    },
  ];

  return (
    <section className="w-full font-mono">
      <div className="mb-6 text-center">
        <span className="text-xs text-muted-foreground">[0x40]</span>
        <h2 className="mt-2 text-xl font-bold">LOVED_BY_DEVELOPERS</h2>
        <p className="mt-1 text-xs text-muted-foreground">&gt; Early access customer feedback</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div key={i} className="border border-border bg-card p-4 transition-all hover:border-primary/50">
            <div className="mb-2 text-xs text-muted-foreground">[0x0{i + 1}]</div>
            <p className="mb-4 text-xs text-muted-foreground">&quot;{t.quote}&quot;</p>
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8 rounded-none">
                <AvatarFallback className="rounded-none bg-primary/10 text-xs text-primary">
                  {t.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="block text-xs font-semibold">{t.author}</span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Single Testimonial Card
function TestimonialCardDemo() {
  return (
    <div className="w-full max-w-md font-mono">
      <div className="mb-2 text-xs text-muted-foreground">[0x01]</div>
      <p className="mb-6 text-sm text-muted-foreground">
        &quot;This boilerplate helped me launch my SaaS in just 3 days. The authentication and payment
        integration worked perfectly from day one.&quot;
      </p>
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 rounded-none">
          <AvatarFallback className="rounded-none bg-primary/10 text-primary">JD</AvatarFallback>
        </Avatar>
        <div>
          <span className="block text-sm font-semibold">JOHN_DOE</span>
          <span className="block text-xs text-muted-foreground">Founder @ StartupCo</span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.05]"
      title="Testimonials Section"
      description="Social proof components with customer quotes, avatars, and grid layouts."
      mainPreview={{
        preview: <TestimonialsDemo />,
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
}`,
      }}
      variants={[
        {
          title: "Single Testimonial Card",
          description: "Individual testimonial with avatar",
          preview: <TestimonialCardDemo />,
          code: `<Card className="p-6">
  <p className="text-muted-foreground mb-4">
    "Great product, highly recommend!"
  </p>
  <div className="flex items-center gap-4">
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">John Doe</p>
      <p className="text-sm text-muted-foreground">CEO @ Company</p>
    </div>
  </div>
</Card>`,
        },
        {
          title: "Avatar Group",
          description: "Stacked avatars for social proof",
          preview: (
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["SC", "MJ", "ER", "DK"].map((initials, i) => (
                  <Avatar key={i} className="h-8 w-8 rounded-none border-2 border-background">
                    <AvatarFallback className="rounded-none bg-primary/10 text-xs text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-none border-2 border-background bg-muted font-mono text-xs">
                  +99
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground">Trusted by 500+ developers</span>
            </div>
          ),
          code: `<div className="flex items-center gap-4">
  <div className="flex -space-x-2">
    {users.map((user) => (
      <Avatar key={user.id} className="border-2 border-background">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
    ))}
    <div className="flex items-center justify-center bg-muted">
      +{remainingCount}
    </div>
  </div>
  <span>Trusted by 500+ developers</span>
</div>`,
        },
      ]}
      props={[
        {
          name: "testimonials",
          type: "{ quote: string; author: string; role: string; avatar?: string }[]",
          description: "Array of testimonials to display",
        },
        {
          name: "columns",
          type: "2 | 3",
          description: "Number of columns in the grid",
          default: "3",
        },
      ]}
      accessibility={[
        "Quotes are properly attributed with cite elements",
        "Avatar images have alt text fallbacks",
        "Cards are not focusable unless interactive",
        "Color contrast meets WCAG AA standards",
      ]}
      previous={{ title: "Pricing", href: "/docs/components/pricing" }}
      next={{ title: "FAQ", href: "/docs/components/faq" }}
    />
  );
}
