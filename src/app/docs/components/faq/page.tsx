import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { HelpCircle, ChevronDown, Layers, Accessibility } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "FAQ Components - Fabrk Docs",
  description: "Frequently asked questions with accordion-style expandable answers. SEO-friendly and accessible.",
};

export default function FAQComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="FAQ_Section"
      description="Frequently asked questions component with accordion-style answers."
      overview="3 FAQ components: complete FAQ section, base accordion component, and simple collapsible. All keyboard accessible."
      features={[
        { icon: HelpCircle, title: "FAQSection", description: "Complete FAQ with accordion." },
        { icon: ChevronDown, title: "Accordion", description: "Expandable content sections." },
        { icon: Layers, title: "Collapsible", description: "Simple collapsible content." },
        { icon: Accessibility, title: "Accessible", description: "Keyboard navigation support." },
      ]}
      usage={[
        {
          title: "FAQ Section",
          description: "Complete FAQ section for landing pages",
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
}

// FAQSection includes:
// - Section title and description
// - Accordion with common questions
// - Smooth expand/collapse animations
// - Keyboard accessible`,
          language: "tsx",
        },
        {
          title: "Custom Accordion FAQ",
          description: "Build your own FAQ with accordion",
          code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in the boilerplate?",
    answer: "Authentication, payments, email, database, and 100+ UI components."
  },
  {
    question: "Do I need to pay for updates?",
    answer: "No, all updates are included with your one-time purchase."
  },
  {
    question: "Can I use this for client projects?",
    answer: "Yes, unlimited personal and client projects with a single license."
  },
];

export function CustomFAQ() {
  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={\`item-\${index}\`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}`,
          language: "tsx",
        },
        {
          title: "Multiple Open Items",
          description: "Allow multiple items open at once",
          code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Allow multiple items to be open simultaneously
export function MultipleFAQ() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Question</AccordionTrigger>
        <AccordionContent>First answer...</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Question</AccordionTrigger>
        <AccordionContent>Second answer...</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
          language: "tsx",
        },
        {
          title: "Collapsible Component",
          description: "Simple collapsible for custom triggers",
          code: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function CollapsibleFAQ() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
          Show more details
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4">
        <p className="text-sm text-muted-foreground">
          Additional details that are hidden by default...
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Testimonials", href: "/docs/components/testimonials" }}
      next={{ title: "Footer", href: "/docs/components/footer" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">FAQSection</code> - Complete FAQ section with accordion</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Accordion</code> - Base accordion component for custom FAQs</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">Collapsible</code> - Simple collapsible content</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/footer">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Footer</h3>
                <p className={docsTypography.body}>Site footer components</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/overview">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>All Components</h3>
                <p className={docsTypography.body}>Full component library</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
