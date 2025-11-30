"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Simplified FAQ Demo
function FAQDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is included in the boilerplate?", a: "Auth, payments, email, database, and 100+ UI components." },
    { q: "Do I need to pay for updates?", a: "No, all updates are included with your one-time purchase." },
    { q: "Can I use this for client projects?", a: "Yes, unlimited personal and client projects with a single license." },
  ];

  return (
    <section className="w-full border border-border bg-background p-6">
      <div className="mb-6">
        <span className="inline-block border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
          [ [0x50] KNOWLEDGE_BASE ] FAQ
        </span>
        <h2 className="mt-4 font-mono text-xl font-bold">FREQUENTLY_ASKED_QUESTIONS</h2>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-border bg-card">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
            >
              <span className="font-mono text-sm">
                <span className="text-primary">├─</span>
                <span className="ml-2 text-muted-foreground">[QUERY]:</span>
                <span className="ml-2">{faq.q}</span>
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openIndex === i && "rotate-180")} />
            </button>
            {openIndex === i && (
              <div className="border-t border-border bg-muted/30 p-4">
                <span className="font-mono text-xs text-muted-foreground">└─ [RESPONSE]: </span>
                <span className="font-mono text-xs">{faq.a}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Category Tabs Demo
function FAQCategoriesDemo() {
  const [active, setActive] = useState("general");
  const categories = ["GENERAL", "TECHNICAL", "PAYMENT", "LICENSE"];

  return (
    <div className="w-full border border-border bg-background p-4">
      <div className="mb-3 font-mono text-xs text-muted-foreground">[ CATEGORIES ]</div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat.toLowerCase())}
            className={cn(
              "border px-3 py-1.5 font-mono text-xs transition-colors",
              active === cat.toLowerCase()
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50"
            )}
          >
            &gt; {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.06]"
      title="FAQ Section"
      description="Accordion-style FAQ with expandable answers and category filtering."
      mainPreview={{
        preview: <FAQDemo />,
        code: `import { FAQSection } from "@/components/landing/faq-section";

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
}`,
      }}
      variants={[
        {
          title: "Category Tabs",
          description: "Filter FAQs by category",
          preview: <FAQCategoriesDemo />,
          code: `const [activeCategory, setActiveCategory] = useState("general");
const categories = ["GENERAL", "TECHNICAL", "PAYMENT", "LICENSE"];

<div className="flex gap-2">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat.toLowerCase())}
      className={cn(
        "px-3 py-1.5 border",
        activeCategory === cat.toLowerCase()
          ? "bg-primary text-primary-foreground"
          : "bg-card"
      )}
    >
      {cat}
    </button>
  ))}
</div>`,
        },
        {
          title: "Single FAQ Item",
          description: "Individual expandable question",
          preview: (
            <div className="w-full max-w-lg border border-border bg-card">
              <button className="flex w-full items-center justify-between p-4 text-left">
                <span className="font-mono text-sm">
                  <span className="text-primary">├─</span>
                  <span className="ml-2 text-muted-foreground">[QUERY]:</span>
                  <span className="ml-2">What payment methods do you accept?</span>
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          ),
          code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What payment methods?</AccordionTrigger>
    <AccordionContent>
      We accept all major credit cards via Stripe.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        },
      ]}
      props={[
        {
          name: "faqs",
          type: "{ question: string; answer: string; category?: string }[]",
          description: "Array of FAQ items",
        },
        {
          name: "showCategories",
          type: "boolean",
          description: "Show category filter tabs",
          default: "true",
        },
        {
          name: "defaultOpen",
          type: "number",
          description: "Index of initially open item",
          default: "undefined",
        },
      ]}
      accessibility={[
        "Accordion uses proper ARIA expanded states",
        "Keyboard navigation with Enter/Space to toggle",
        "Focus visible indicators on interactive elements",
        "Screen readers announce open/closed states",
      ]}
      previous={{ title: "Testimonials", href: "/docs/components/testimonials" }}
      next={{ title: "Footer", href: "/docs/components/footer" }}
    />
  );
}
