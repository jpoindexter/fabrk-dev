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
        "Yes. We offer a full 30-day money-back guarantee, no questions asked. We only want happy customers.",
    },
  ];

  return (
    <section
      id="faq"
      className="scroll-mt-16 bg-background px-6 py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-4xl font-black text-foreground">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-brutal border-4 border-black bg-background shadow-brutal transition-brutal hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg data-[state=open]:shadow-brutal-lg"
            >
              <AccordionTrigger className="px-6 text-left text-lg font-black text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 font-bold text-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
