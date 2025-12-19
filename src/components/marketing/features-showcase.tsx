/**
 * ✅ FABRK COMPONENT
 * Core Benefits - 3-column grid with pagination
 * Production-ready ✓
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent, Stat, StatGroup } from '@/components/ui/card';
import { SectionHeader } from '@/components/landing/section-header';
import { BenefitCard } from '@/components/landing/benefit-card';
import { CORE_BENEFITS, PRICING } from '@/data/landing';
import { COMPONENT_COUNT_STRING, PROVIDER_COUNT_STRING } from '@/data/landing/stats';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const CARDS_PER_PAGE = 3;

export function FeaturesShowcase() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(CORE_BENEFITS.length / CARDS_PER_PAGE);

  const startIndex = page * CARDS_PER_PAGE;
  const visibleBenefits = CORE_BENEFITS.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const goPrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setPage((p) => (p + 1) % totalPages);

  return (
    <section id="features" className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="WHAT MAKES FABRK DIFFERENT"
          code="0x10"
          title="YOUR STACK. YOUR CHOICE. ZERO LOCK-IN."
          description="29 providers with unified interfaces. Switch from Stripe to Polar, Resend to SES, or OpenAI to Anthropic without rewriting code. Never get trapped by vendors again."
          align="center"
        />

        {/* 3-Column Benefits Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleBenefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              icon={benefit.icon}
              module={benefit.module}
              code={benefit.code}
              benefit={benefit.benefit}
              description={benefit.description}
              timeSaved={benefit.timeSaved}
              costSaved={benefit.costSaved}
              features={benefit.features}
              index={index}
              ctaLabel={benefit.ctaLabel}
              ctaHref={benefit.ctaHref}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={goPrev}
              className={cn(
                'border p-2 transition-colors hover:bg-muted',
                'border-border bg-background',
                mode.radius,
                mode.font
              )}
              aria-label="Previous"
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={cn(
                    'size-2 border transition-colors',
                    mode.radius,
                    i === page
                      ? 'border-primary bg-primary'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                  aria-label={`Page ${i + 1}`}
                  aria-current={i === page ? 'page' : undefined}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className={cn(
                'border p-2 transition-colors hover:bg-muted',
                'border-border bg-background',
                mode.radius,
                mode.font
              )}
              aria-label="Next"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}

        {/* Total Savings Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <Card>
            <CardHeader code="0x14" title="TOTAL VALUE" />
            <CardContent>
              <StatGroup>
                <Stat label="Components" value={COMPONENT_COUNT_STRING} />
                <Stat label="Themes" value="12" />
                <Stat label="Providers" value={PROVIDER_COUNT_STRING} />
                <Stat label="Launch Price" value={PRICING.display.launch} />
              </StatGroup>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
