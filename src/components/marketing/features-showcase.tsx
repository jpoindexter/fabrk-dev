/**
 * ✅ FABRK COMPONENT
 * Core Benefits - 3 major value propositions
 * Production-ready ✓
 */

'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent, Stat, StatGroup } from '@/components/ui/card';
import { SectionHeader } from '@/components/landing/section-header';
import { BenefitCard } from '@/components/landing/benefit-card';
import { CORE_BENEFITS, PRICING } from '@/data/landing';
import { COMPONENT_COUNT_STRING } from '@/data/landing/stats';

export function FeaturesShowcase() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="WHAT MAKES FABRK DIFFERENT"
          code="0x10"
          title="SHIP YOUR AI SAAS BEFORE YOUR RUNWAY ENDS"
          description="AI credit system: done. Multi-provider billing: done. Production components: done. 215+ hours of work you don't have to do. Launch this weekend, not next quarter."
          align="center"
        />

        {/* 3-Column Benefits Grid (reduced from 4 for better spacing) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CORE_BENEFITS.map((benefit, index) => (
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
                <Stat label="Providers" value="3" />
                <Stat label="Launch Price" value={PRICING.display.launch} />
              </StatGroup>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
