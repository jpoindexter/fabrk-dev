/**
 * FAQ Section Component
 * Optimized for AEO - appears in "People Also Ask"
 *
 * Features:
 * - Automatic JSON-LD schema generation
 * - Accessible accordion UI
 * - SEO-friendly markup
 */

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateFAQSchema } from "@/lib/seo/structured-data";
import { SchemaScript } from "./schema-script";

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
  className?: string;
}

/**
 * AEO-optimized FAQ component
 * Automatically includes JSON-LD schema for featured snippets
 *
 * @example
 * <FAQSection
 *   title="Frequently Asked Questions"
 *   faqs={[
 *     { question: "What is Fabrk?", answer: "A Next.js SaaS boilerplate..." }
 *   ]}
 * />
 */
export function FAQSection({ faqs, title, description, className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = generateFAQSchema(faqs);

  return (
    <>
      <SchemaScript schema={schema} />

      <section className={cn("mx-auto max-w-3xl", className)}>
        {title && (
          <h2 className="mb-2 text-3xl font-bold text-black">{title}</h2>
        )}
        {description && (
          <p className="mb-8 text-lg text-gray-600">{description}</p>
        )}

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border-2 border-gray-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold text-black pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 flex-shrink-0 text-gray-600 transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>

              {openIndex === index && (
                <div className="border-t border-gray-200 p-6 pt-4">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
