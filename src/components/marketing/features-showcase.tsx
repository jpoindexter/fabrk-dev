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

export function FeaturesShowcase() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="CORE FEATURES"
          code="0x10"
          title="WHAT YOU GET"
          description="Stop rebuilding the same features. Get 100+ hours of development work done in 5 minutes. Everything you need to ship a production SaaS, not just components."
          align="center"
        />

        {/* 3-Column Benefits Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <Stat label="Total Time Saved" value="120+ HOURS" />
                <Stat label="Total Cost Saved" value="$24K+" />
                <Stat label="Your Investment" value={PRICING.display.current} />
              </StatGroup>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
