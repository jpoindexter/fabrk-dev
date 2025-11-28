import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "FAQ Components - Fabrk Docs",
  description: "Frequently asked questions with accordion-style expandable answers. SEO-friendly and accessible.",
};

export default function FAQComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">FAQ Section</h1>
        <p className="mt-2 text-muted-foreground">
          Frequently asked questions component with accordion-style answers.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">FAQSection</code> - Complete FAQ section with accordion</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Accordion</code> - Base accordion component for custom FAQs</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Collapsible</code> - Simple collapsible content</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Import Examples</h2>
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
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">FAQ Section</h3>
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

          <h3 className="text-lg font-medium mt-6 mb-3">Custom Accordion FAQ</h3>
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
        <h2 className="text-3xl font-bold text-center mb-8">
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

          <h3 className="text-lg font-medium mt-6 mb-3">Multiple Open Items</h3>
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

          <h3 className="text-lg font-medium mt-6 mb-3">Collapsible Component</h3>
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
        <p className="text-muted-foreground">
          Additional details that are hidden by default...
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Hydration Note</h3>
          <CodeBlock language="tsx" code={`// To prevent hydration warnings with Radix UI components,
// add suppressHydrationWarning prop:

<Accordion
  type="single"
  collapsible
  suppressHydrationWarning
>
  {/* items */}
</Accordion>`} />
        </CardContent>
      </Card>
    </div>
  );
}
