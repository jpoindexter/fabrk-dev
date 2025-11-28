/**
 * ✅ FABRK COMPONENT
 * FAQ Section - Achromatic-style tabbed FAQ
 * Production-ready ✓
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { H2, Body, Small } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type FAQCategory = "general" | "technical" | "payment" | "license";

interface FAQ {
  question: string;
  answer: string;
  category: FAQCategory;
}

const faqs: FAQ[] = [
  // General
  {
    category: "general",
    question: "What is a starter kit?",
    answer:
      "A starter kit is a foundational codebase with all non-core features (authentication, payments, database) pre-configured. You focus only on your unique product features instead of reinventing the wheel.",
  },
  {
    category: "general",
    question: "What is the difference between a starter kit and boilerplate?",
    answer:
      "They're essentially the same thing. A starter kit or boilerplate provides a pre-built foundation so you don't have to build common features from scratch. Fabrk is a production-ready Next.js starter kit.",
  },
  {
    category: "general",
    question: "How often are the starter kits updated?",
    answer:
      "We regularly update the starter kits to keep up with the latest Next.js releases, security patches, and feature improvements. All updates are included with your lifetime purchase.",
  },
  {
    category: "general",
    question: "Do I need to be an expert to use it?",
    answer:
      "No. The starter kit is designed to be accessible to developers of all skill levels. We include comprehensive documentation, code comments, and a Discord community for support.",
  },
  // Technical
  {
    category: "technical",
    question: "What authentication options are available?",
    answer:
      "Fabrk includes NextAuth v5 with email/password, Google OAuth, Microsoft OAuth, magic link passwordless login, and 2FA/MFA support. All authentication flows are production-ready.",
  },
  {
    category: "technical",
    question: "What database does it use?",
    answer:
      "Fabrk uses PostgreSQL with Prisma ORM. The schema includes 13+ pre-built models for users, organizations, payments, webhooks, and more. You can easily extend it for your needs.",
  },
  {
    category: "technical",
    question: "Can I use it if my tech stack is different?",
    answer:
      "Fabrk is built on Next.js 15, React, Tailwind CSS, and TypeScript. If your stack differs significantly, you may need to adapt parts of the code. However, most modern web projects can integrate these technologies.",
  },
  {
    category: "technical",
    question: "Is it compatible with Vercel deployment?",
    answer:
      "Yes! Fabrk is optimized for Vercel deployment with zero-config setup. It also works with other platforms like Railway, Render, AWS, and self-hosted options.",
  },
  // Payment
  {
    category: "payment",
    question: "Is it a one-time payment or subscription?",
    answer:
      "One-time payment. You pay once and get lifetime access to the starter kit, all updates, and the Discord community. No recurring fees ever.",
  },
  {
    category: "payment",
    question: "Do you offer refunds?",
    answer:
      "No. Due to the nature of digital products, all sales are final once you gain access to the source code. We encourage you to review the documentation and feature list before purchasing.",
  },
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and various international payment methods through our payment processor Polar. Apple Pay and Google Pay are also supported.",
  },
  // License
  {
    category: "license",
    question: "Can I use this for multiple projects?",
    answer:
      "Yes. Your one-time purchase grants you a lifetime license to use Fabrk on unlimited commercial and personal projects. No per-project fees.",
  },
  {
    category: "license",
    question: "How many people have purchased a license so far?",
    answer:
      "We're just getting started! Early adopters get the best price and direct access to the maintainer. Join our growing community of indie hackers and startup founders.",
  },
  {
    category: "license",
    question: "Can I use it for client projects?",
    answer:
      "Absolutely. You can use Fabrk to build projects for clients. You cannot, however, resell or redistribute the starter kit itself as a competing product.",
  },
];

const categories: { id: FAQCategory; label: string }[] = [
  { id: "general", label: "General" },
  { id: "technical", label: "Technical" },
  { id: "payment", label: "Payment" },
  { id: "license", label: "License" },
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("general");

  const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section
      id="faq"
      className="scroll-mt-16 border-t border-border bg-background px-6 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <H2 className="mb-4">Frequently Asked Questions</H2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-12">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-row gap-2 lg:flex-col lg:gap-1"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "rounded-md px-4 py-2 text-left text-sm font-medium transition-colors",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={`${activeCategory}-${index}`}
                  value={`item-${index}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-4 text-left text-base font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
