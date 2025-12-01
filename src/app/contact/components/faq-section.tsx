/**
 * FAQ Section Component
 * Frequently asked questions with accordion
 */

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
          [ [0x04] FAQ ]
        </span>
        <h2 className="text-xl font-bold mb-2">FREQUENTLY_ASKED_QUESTIONS</h2>
        <p className="text-sm text-muted-foreground">
          Everything you need to know
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AccordionItem
              value="refunds"
              className="rounded-none border border-border bg-card transition-all data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="px-6 text-left text-sm font-semibold text-foreground hover:no-underline">
                [Q] DO_YOU_OFFER_REFUNDS?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-xs text-muted-foreground">
                [A] No, all sales are final. Due to the nature of digital products, we do not offer refunds once you have access to the code. Please review our{" "}
                <Link href="/refund" className="text-primary hover:underline">
                  REFUND_POLICY
                </Link>{" "}
                for more details.
              </AccordionContent>
            </AccordionItem>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            viewport={{ once: true }}
          >
            <AccordionItem
              value="support"
              className="rounded-none border border-border bg-card transition-all data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="px-6 text-left text-sm font-semibold text-foreground hover:no-underline">
                [Q] IS_TECHNICAL_SUPPORT_INCLUDED?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-xs text-muted-foreground">
                [A] Yes, we provide email support for all license holders. Response time is typically within 24 hours.
              </AccordionContent>
            </AccordionItem>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            viewport={{ once: true }}
          >
            <AccordionItem
              value="client-projects"
              className="rounded-none border border-border bg-card transition-all data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="px-6 text-left text-sm font-semibold text-foreground hover:no-underline">
                [Q] CAN_I_USE_FABRK_FOR_CLIENT_PROJECTS?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-xs text-muted-foreground">
                [A] Absolutely! Your license allows you to create unlimited projects for yourself or clients.
              </AccordionContent>
            </AccordionItem>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            viewport={{ once: true }}
          >
            <AccordionItem
              value="updates"
              className="rounded-none border border-border bg-card transition-all data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="px-6 text-left text-sm font-semibold text-foreground hover:no-underline">
                [Q] DO_I_GET_LIFETIME_UPDATES?
              </AccordionTrigger>
              <AccordionContent className="px-6 text-xs text-muted-foreground">
                [A] Yes, all future updates and improvements are included at no additional cost.
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        </Accordion>
      </div>
    </section>
  );
}
