import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "FAQ Components - Fabrk Docs",
  description: "Frequently asked questions with accordion-style expandable answers. SEO-friendly and accessible.",
};

export default function FAQComponentsPage() {
  return (
    <div className="space-y-16">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-sm text-muted-foreground">[ [0x60] COMPONENTS ] FAQ</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">FAQ_SECTION</h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground leading-relaxed">
          &gt; Frequently asked questions component with accordion-style answers.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold text-primary mb-3">AVAILABLE_COMPONENTS</h2>
          <ul className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">FAQSection</code> - Complete FAQ section with accordion</li>
            <li>├─ <code className="bg-muted px-1 font-mono text-xs">Accordion</code> - Base accordion component for custom FAQs</li>
            <li>└─ <code className="bg-muted px-1 font-mono text-xs">Collapsible</code> - Simple collapsible content</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-primary">IMPORT_EXAMPLES</h2>
        </div>
        <div className="[&>div]:rounded-none">
        <CodeBlock language="typescript" code={`// FAQ section for landing pages
import { FAQSection } from "@/components/landing/faq-section";

// Accordion for custom FAQs
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Simple collapsible
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";`} />
        </div>
      </div>

      <div className="space-y-16">
        <h2 className="font-mono text-lg font-bold text-primary">USAGE_EXAMPLES</h2>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">FAQ_SECTION</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import { FAQSection } from "@/components/landing/faq-section";

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
// - Keyboard accessible`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">CUSTOM_ACCORDION_FAQ</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in the boilerplate?",
    answer: "The boilerplate includes authentication, payments, email, database, and 100+ UI components ready for production."
  },
  {
    question: "Do I need to pay for updates?",
    answer: "No, all updates are included with your one-time purchase. You get lifetime access to all future updates."
  },
  {
    question: "Can I use this for client projects?",
    answer: "Yes, you can use Fabrk for unlimited personal and client projects with a single license."
  },
];

export function CustomFAQ() {
  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <h2 className="font-mono text-lg font-bold text-center mb-8">
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
}`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">MULTIPLE_OPEN_ITEMS</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import {
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
}`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">COLLAPSIBLE_COMPONENT</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`import {
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
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          Additional details that are hidden by default...
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}`} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">HYDRATION_NOTE</h3>
          <div className="[&>div]:rounded-none">
          <CodeBlock language="tsx" code={`// To prevent hydration warnings with Radix UI components,
// add suppressHydrationWarning prop:

<Accordion
  type="single"
  collapsible
  suppressHydrationWarning
>
  {/* items */}
</Accordion>`} />
          </div>
        </div>
      </div>
    </div>
  );
}
