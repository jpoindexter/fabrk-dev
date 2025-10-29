/**
 * ✅ FABRK COMPONENT
 * FAQ Section - Shadcn/ui style accordion
 * Production-ready ✓
 */

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What's included in the lifetime license?",
    answer:
      "All current components, design tokens, documentation, and all future updates. One-time payment, no recurring fees.",
  },
  {
    question: "Can I use this for client projects?",
    answer:
      "Yes! All licenses (Starter, Pro, and Team) allow you to use Fabrk in unlimited client projects.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If Fabrk doesn't meet your needs, we'll refund your purchase.",
  },
  {
    question: "How do updates work?",
    answer:
      "All license holders get lifetime access to updates. New components, improvements, and bug fixes are yours forever.",
  },
  {
    question: "What's the difference between licenses?",
    answer:
      "Starter has essential components, Pro includes everything with priority support, and Team adds collaboration features and custom requests.",
  },
  {
    question: "Do I need a subscription?",
    answer:
      "No! All our licenses are one-time purchases with lifetime access. No recurring fees, ever.",
  },
  {
    question: "Is it accessible?",
    answer:
      "Yes. All components are WCAG 2.1 AA compliant and tested with screen readers. Accessibility is built-in, not an afterthought.",
  },
  {
    question: "What makes Fabrk AI-optimized?",
    answer:
      "llms.txt context files, MCP server integration, and Copy Prompt features. Works seamlessly with v0, Bolt, Cursor, and Lovable.",
  },
];

export function FaqShadcn() {
  return (
    <section
      aria-label="Frequently asked questions"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Fabrk.
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-lg border border-border bg-white px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
