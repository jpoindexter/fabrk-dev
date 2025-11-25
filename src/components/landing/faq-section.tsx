"use client";

import { motion } from "framer-motion";
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
      className="scroll-mt-16 border-t border-border bg-background px-6 py-24"
    >
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-2 text-center text-3xl font-semibold text-foreground"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-lg text-muted-foreground"
        >
          Everything you need to know about Fabrk
        </motion.p>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.06 }}
                viewport={{ once: true }}
              >
                <AccordionItem
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
              </motion.div>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
