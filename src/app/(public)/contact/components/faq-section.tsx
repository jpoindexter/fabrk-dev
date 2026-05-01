/**
 * FAQ Section Component
 * Frequently asked questions with accordion
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FaqSection() {
  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <span
          className={cn(
            'border-border bg-card text-muted-foreground mb-4 inline-block border px-4 py-1 text-xs',
            mode.font,
            mode.radius
          )}
        >
          [ [0x04] FAQ ]
        </span>
        <h2 className={cn('mb-2 text-xs font-semibold tracking-tight', mode.font)}>
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className={cn('text-muted-foreground text-xs', mode.font)}>
          Everything you need to know
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AccordionItem
              value="open-source"
              className={cn('border-border bg-card border transition-all', mode.radius)}
            >
              <AccordionTrigger
                className={cn(
                  'text-foreground px-6 text-left text-xs font-semibold hover:no-underline',
                  mode.font
                )}
              >
                [Q] IS FABRK REALLY OPEN SOURCE?
              </AccordionTrigger>
              <AccordionContent className={cn('text-muted-foreground px-6 text-xs', mode.font)}>
                [A] Yes. MIT licensed. Fork it, ship it, modify it, sell what you build with it. No
                fees, no attribution required.
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
              className={cn('border-border bg-card border transition-all', mode.radius)}
            >
              <AccordionTrigger
                className={cn(
                  'text-foreground px-6 text-left text-xs font-semibold hover:no-underline',
                  mode.font
                )}
              >
                [Q] WHERE DO I GET SUPPORT?
              </AccordionTrigger>
              <AccordionContent className={cn('text-muted-foreground px-6 text-xs', mode.font)}>
                [A] GitHub Issues for bugs, GitHub Discussions for questions. Community-driven. PRs
                welcome.
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
              className={cn('border-border bg-card border transition-all', mode.radius)}
            >
              <AccordionTrigger
                className={cn(
                  'text-foreground px-6 text-left text-xs font-semibold hover:no-underline',
                  mode.font
                )}
              >
                [Q] CAN I USE FABRK FOR CLIENT PROJECTS?
              </AccordionTrigger>
              <AccordionContent className={cn('text-muted-foreground px-6 text-xs', mode.font)}>
                [A] Yes. MIT covers unlimited personal and commercial use.
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
              className={cn('border-border bg-card border transition-all', mode.radius)}
            >
              <AccordionTrigger
                className={cn(
                  'text-foreground px-6 text-left text-xs font-semibold hover:no-underline',
                  mode.font
                )}
              >
                [Q] HOW DO I GET UPDATES?
              </AccordionTrigger>
              <AccordionContent className={cn('text-muted-foreground px-6 text-xs', mode.font)}>
                [A] Pull from the GitHub repo. New components and features land in main.
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        </Accordion>
      </div>
    </section>
  );
}
