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
      question: "What is a boilerplate?",
      answer:
        "It's a foundational codebase with all non-core features (Auth, Payments, DB) pre-wired. You focus only on your unique product features.",
    },
    {
      question: "Can I use this for multiple projects?",
      answer:
        "Yes. Your one-time purchase grants you a lifetime license to use Fabrk on an unlimited number of commercial and personal projects.",
    },
    {
      question: "What if I need help?",
      answer:
        "All customers get access to the private Discord community for support, updates, and direct access to the maintainer.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "No. Due to the nature of digital products, all sales are final once you gain access to the source code. We encourage you to review the documentation and feature list before purchasing.",
    },
  ];

  const colors = [
    { bg: "bg-primary", text: "text-primary-foreground" },
    { bg: "bg-accent", text: "text-accent-foreground" },
    { bg: "bg-secondary", text: "text-secondary-foreground" },
    { bg: "bg-primary", text: "text-primary-foreground" },
  ];

  return (
    <section
      id="faq"
      className="scroll-mt-16 bg-background px-6 py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-3xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mb-12 text-center text-lg text-muted-foreground">
          Everything you need to know about Fabrk
        </p>

        <Accordion type="single" collapsible className="w-full space-y-3" suppressHydrationWarning>
          {faqs.map((faq, index) => {
            return (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="px-6 text-left text-base font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 font-normal text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
