/**
 * Testimonials Wall - Unified terminal HUD card using Card UI primitives
 *
 * Design System Compliance:
 * - Uses mode.typography.* tokens (no hardcoded text-[Xpx])
 * - Uses Card, CardContent, CardFooter primitives
 */

'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { TESTIMONIALS } from '@/data/landing/testimonials';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function TestimonialsWall() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="TESTIMONIALS"
          code="0x50"
          title="DEVELOPERS LOVE FABRK"
          description="Join hundreds of developers shipping faster with Fabrk"
          align="center"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <Card size="full">
                {/* Header - minimal */}
                <div
                  className={cn(
                    'flex items-center justify-between border-b px-4 py-2',
                    mode.color.border.default
                  )}
                >
                  <span className={cn(mode.typography.caption, mode.font, 'uppercase')}>
                    FEEDBACK
                  </span>
                  <span className={cn(mode.typography.caption, mode.color.text.accent, mode.font)}>
                    {'★'.repeat(testimonial.rating)}
                  </span>
                </div>

                {/* Quote - uses mode.typography.body.sm */}
                <CardContent padding="md" className="flex-grow">
                  <p className={cn(mode.typography.body.sm, mode.font, 'leading-relaxed', mode.color.text.primary)}>
                    "{testimonial.quote}"
                  </p>
                </CardContent>

                {/* Author */}
                <CardFooter>
                  <span className={cn(mode.typography.caption, mode.font)}>
                    <span className={mode.color.text.accent}>{testimonial.author}</span>
                    <span className={mode.color.text.muted}>
                      {' · '}
                      {testimonial.role.split(',')[0]}
                    </span>
                  </span>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
