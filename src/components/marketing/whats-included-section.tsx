'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { INCLUDED_FEATURES } from '@/data/landing/included-features';
import { Check } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/**
 * What's Included Section
 * Checklist of table-stakes features (Auth/Billing/Multi-tenancy)
 * Moves commodity features from spotlight to "included, not featured"
 */
export function WhatsIncludedSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="INCLUDED"
          code="0x45"
          title="EVERYTHING YOU NEED TO SHIP"
          description="Full-stack SaaS infrastructure, no assembly required"
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INCLUDED_FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="h-full"
              >
                <Card className="h-full">
                  <CardHeader
                    code={`0x${(80 + index).toString(16).toUpperCase()}`}
                    title={item.category}
                    icon={
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Icon className={cn('size-5', mode.color.text.accent)} />
                      </motion.div>
                    }
                  />
                  <CardContent>
                    <ul className="space-y-4">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <Check
                            className={cn('mt-0.5 size-4 shrink-0', mode.color.text.success)}
                          />
                          <span className={cn('text-xs', mode.font, mode.color.text.primary)}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
