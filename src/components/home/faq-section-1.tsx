"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What's included in the boilerplate?",
    answer:
      "Next.js 15, TypeScript, Tailwind CSS, NextAuth v5, Stripe, Prisma, email templates, testing setup, and full authentication flows.",
  },
  {
    question: "Do I get the source code?",
    answer: "Yes, you get complete access to all source code. No obfuscation, no hidden dependencies.",
  },
  {
    question: "Can I use this for client projects?",
    answer: "Absolutely. Build unlimited projects for yourself or clients with any plan.",
  },
  {
    question: "What if I need help?",
    answer: "All plans include email support. Pro and Enterprise get priority support and Discord access.",
  },
]

export function FaqSection1() {
  return (
    <section id="faq" className="bg-background py-24 md:py-32 lg:py-40" aria-labelledby="faq-heading">
      <div className="max-w-3xl gap-16 md:gap-20 mx-auto px-6 flex flex-col">
        <div className="flex flex-col text-center gap-6">
          <h1 id="faq-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Questions & Answers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light">Everything you need to know</p>
        </div>

        <Accordion type="single" defaultValue="item-1" aria-label="FAQ items" className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`} className="glass-card rounded-2xl px-6 border-0">
              <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground font-light pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="glass-card w-full rounded-3xl p-10 md:p-12 flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Still have questions?</h2>
            <p className="text-lg text-muted-foreground font-light">Our team is here to help</p>
          </div>
          <Button
            size="lg"
            aria-label="Contact our support team"
            className="rounded-full smooth-transition hover:scale-105 mt-2"
          >
            Contact us
          </Button>
        </div>
      </div>
    </section>
  )
}
