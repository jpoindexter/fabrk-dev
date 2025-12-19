/**
 * Comparison Section - Fabrk vs building from scratch
 * Two side-by-side terminal cards following the standard pattern
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/landing/section-header';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Zap, Clock, ArrowRight } from 'lucide-react';

export function ComparisonSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="COMPARISON"
          code="0x70"
          title="FABRK VS. BUILDING FROM SCRATCH"
          description="Save months of development time and thousands in opportunity cost"
          align="center"
        />

        {/* Two Side-by-Side Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* WITH FABRK Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="h-full"
          >
            <Card className="h-full" tone="primary">
              <CardHeader
                code="0x71"
                title="WITH_FABRK"
                icon={
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Zap className={cn('size-5', mode.color.text.accent)} />
                  </motion.div>
                }
              />
              <CardContent className="flex h-full flex-col p-0">
                {/* Headline & Description Section */}
                <div className="px-6 pt-6 pb-2">
                  <h3
                    className={cn(
                      'mb-2 min-h-[48px] text-sm font-bold leading-tight',
                      mode.font,
                      mode.color.text.primary
                    )}
                  >
                    Ship your SaaS in 30 minutes
                  </h3>
                  <p
                    className={cn(
                      'min-h-[72px] text-sm leading-relaxed',
                      mode.font,
                      mode.color.text.muted
                    )}
                  >
                    Pre-built authentication, payments, multi-tenancy, and 77+ production components. Clone, configure, deploy.
                  </p>
                </div>

                {/* Stats Band - Visually separated section */}
                <div
                  className={cn(
                    'flex items-start gap-8 border-y px-6 py-4',
                    'border-border',
                    mode.font
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        mode.typography.caption, 'font-medium uppercase tracking-[0.05em]',
                        mode.color.text.muted
                      )}
                    >
                      SETUP TIME
                    </span>
                    <span className={cn('text-xl font-bold leading-none', mode.color.text.accent)}>
                      30 MIN
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        mode.typography.caption, 'font-medium uppercase tracking-[0.05em]',
                        mode.color.text.muted
                      )}
                    >
                      COST
                    </span>
                    <span className={cn('text-xl font-bold leading-none', mode.color.text.accent)}>
                      $199
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className={cn('flex flex-col gap-4 px-6 py-6', mode.font, 'flex-grow')}>
                  <span
                    className={cn(mode.typography.caption, 'font-bold uppercase', mode.color.text.muted)}
                  >
                    [READY_TO_USE]:
                  </span>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.accent)}>✓</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>Auth (OAuth + Magic Links)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.accent)}>✓</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>Payments (Stripe/Polar)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.accent)}>✓</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>Multi-Tenancy + RBAC</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.accent)}>✓</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>77+ UI Components</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.accent)}>✓</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>Email Templates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.accent)}>✓</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>AI Token Metering</span>
                    </li>
                  </ul>
                </div>

                {/* CTA Button - Always at bottom */}
                <div className="mt-auto px-6 pb-6">
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className={cn(
                      'group h-10 w-full text-xs font-medium tracking-wide',
                      mode.radius,
                      mode.font
                    )}
                  >
                    <Link href="/pricing" className="flex items-center justify-center gap-2">
                      <span>&gt; GET FABRK NOW</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* FROM SCRATCH Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="h-full"
          >
            <Card className="h-full">
              <CardHeader
                code="0x72"
                title="FROM_SCRATCH"
                icon={
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Clock className={cn('size-5', mode.color.text.muted)} />
                  </motion.div>
                }
              />
              <CardContent className="flex h-full flex-col p-0">
                {/* Headline & Description Section */}
                <div className="px-6 pt-6 pb-2">
                  <h3
                    className={cn(
                      'mb-2 min-h-[48px] text-sm font-bold leading-tight',
                      mode.font,
                      mode.color.text.primary
                    )}
                  >
                    Build everything yourself over 18-24 weeks
                  </h3>
                  <p
                    className={cn(
                      'min-h-[72px] text-sm leading-relaxed',
                      mode.font,
                      mode.color.text.muted
                    )}
                  >
                    Implement authentication, payment integration, multi-tenancy, component library, and infrastructure from scratch.
                  </p>
                </div>

                {/* Stats Band - Visually separated section */}
                <div
                  className={cn(
                    'flex items-start gap-8 border-y px-6 py-4',
                    'border-border',
                    mode.font
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        mode.typography.caption, 'font-medium uppercase tracking-[0.05em]',
                        mode.color.text.muted
                      )}
                    >
                      DEV TIME
                    </span>
                    <span className={cn('text-xl font-bold leading-none', mode.color.text.muted)}>
                      600 HRS
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        mode.typography.caption, 'font-medium uppercase tracking-[0.05em]',
                        mode.color.text.muted
                      )}
                    >
                      OPP. COST
                    </span>
                    <span className={cn('text-xl font-bold leading-none', mode.color.text.muted)}>
                      $60K+
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className={cn('flex flex-col gap-4 px-6 py-6', mode.font, 'flex-grow')}>
                  <span
                    className={cn(mode.typography.caption, 'font-bold uppercase', mode.color.text.muted)}
                  >
                    [REQUIRED_WORK]:
                  </span>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.warning)}>○</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>Auth implementation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.warning)}>○</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>Payment integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.warning)}>○</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>Multi-tenancy setup</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.warning)}>○</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>Component library</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.warning)}>○</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>Email infrastructure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={cn('text-sm font-bold', mode.color.text.warning)}>○</span>
                      <span className={cn('text-sm', mode.color.text.muted)}>AI usage tracking</span>
                    </li>
                  </ul>
                </div>

                {/* Disabled CTA - Always at bottom */}
                <div className="mt-auto px-6 pb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className={cn(
                      'h-10 w-full border-border text-xs font-medium tracking-wide opacity-50',
                      mode.radius,
                      mode.font
                    )}
                  >
                    <span>&gt; START FROM SCRATCH</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
