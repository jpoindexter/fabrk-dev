"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "How is Fabrk different from ShipFast?",
      answer:
        "Fabrk uses TypeScript (ShipFast is JavaScript only), PostgreSQL (ShipFast uses MongoDB), and costs $79 vs $199. We have 80+ components in 161 files, while ShipFast has 30-50 components in 500+ files. Plus, we're on Next.js 15 and NextAuth v5 (latest stack).",
    },
    {
      question: "Can I use this for client projects?",
      answer:
        "Yes! Unlimited projects, no attribution required. Build as many SaaS products as you want for yourself or clients. The only restriction is you can't resell or redistribute Fabrk itself as a competing boilerplate.",
    },
    {
      question: "Do I get updates?",
      answer:
        "Yes. Lifetime updates for v1.x (e.g., 1.0, 1.1, 1.2... 1.99). When we release v2.0 (major version), you'll get a 50% discount. Updates include bug fixes, new components, security patches, and framework upgrades.",
    },
    {
      question: "What if I need help?",
      answer:
        "You get access to our Discord community for peer support, plus email support at support@fabrk.dev. We also provide comprehensive documentation with step-by-step guides, code examples, and video tutorials.",
    },
    {
      question: "What tech stack knowledge do I need?",
      answer:
        "Basic Next.js, React, and TypeScript knowledge. We handle the complex parts (authentication, payments, database, emails) so you can focus on building your product features. If you can build a Next.js app, you can use Fabrk.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes. We offer a 30-day money-back guarantee, no questions asked. If Fabrk doesn't meet your needs, just email support@fabrk.dev and we'll process your refund within 5-7 business days.",
    },
    {
      question: "What's included in the $79 price?",
      answer:
        "Everything: 80+ components, complete authentication (email/password + OAuth), Stripe payments, PostgreSQL database with Prisma, email system, dashboard, settings pages, legal pages, error pages, and full source code. No upsells, no monthly fees.",
    },
    {
      question: "Is this just a template or a full boilerplate?",
      answer:
        "Full boilerplate. It's a complete, working Next.js application with authentication, payments, database, and email already connected. Not just UI components—it's the entire backend infrastructure you need to launch a SaaS.",
    },
  ];

  return (
    <section
      id="faq"
      className="scroll-mt-16 bg-background px-6 py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-4xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
