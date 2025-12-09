/**
 * ✅ FABRK COMPONENT
 * FAQ Section - Terminal console [KNOWLEDGE BASE] style
 * Production-ready ✓
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { Card, CardContent, Badge } from "@/components/ui/card";

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
      "No. The starter kit is designed to be accessible to developers of all skill levels. We include comprehensive documentation, code comments, and email support.",
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
      "One-time payment. You pay once and get lifetime access to the starter kit and all updates. No recurring fees ever.",
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
  { id: "general", label: "GENERAL" },
  { id: "technical", label: "TECHNICAL" },
  { id: "payment", label: "PAYMENT" },
  { id: "license", label: "LICENSE" },
];

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card size="auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="hover:bg-muted/50 flex w-full items-center justify-between p-4 text-left transition-colors"
        >
          <span className={cn("text-sm", mode.font)}>
            <span className="text-primary">├─</span>
            <span className="text-muted-foreground ml-2">[QUERY]:</span>
            <span className="text-foreground ml-2">{question}</span>
          </span>
          <ChevronDown
            className={cn(
              "text-muted-foreground size-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen && (
          <CardContent className="border-border bg-muted/30 border-t">
            <span className={cn("text-muted-foreground text-xs", mode.font)}>└─ [RESPONSE]: </span>
            <span className={cn("text-foreground text-xs", mode.font)}>{answer}</span>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("general");

  const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section id="faq" className="border-border scroll-mt-16 border-t px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Badge
            code="0x60"
            label="KNOWLEDGE BASE"
            meta="QUERY SYSTEM │ FIB[13] ENTRIES"
            className="mb-4"
          />
          <h2 className={cn("mb-4 text-4xl font-semibold tracking-tight", mode.font)}>
            FREQUENTLY_ASKED_QUESTIONS
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-12">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={cn("text-muted-foreground mb-4 text-xs", mode.font)}>
              [ CATEGORIES ]
            </div>
            <div className="flex flex-row gap-2 lg:flex-col lg:gap-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "border px-4 py-2 text-left text-xs transition-colors",
                    mode.radius,
                    mode.font,
                    activeCategory === category.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  &gt; {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            {filteredFaqs.map((faq, index) => (
              <FAQItem
                key={`${activeCategory}-${index}`}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
