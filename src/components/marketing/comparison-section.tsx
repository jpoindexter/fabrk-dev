/**
 * ✅ FABRK COMPONENT
 * Comparison Section - Terminal console table style
 * Production-ready ✓
 */
'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

// Animated counter component
function AnimatedCounter({
  value,
  suffix = '',
  duration = 1.5,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function ComparisonSection() {
  const features = [
    {
      name: 'Price',
      scratch: '$0 (but $50K+ dev time)',
      shipfast: '$169',
      nextbase: '$399',
      fabrk: '$199',
    },
    {
      name: 'Components',
      scratch: '0 (build everything)',
      shipfast: '~50',
      nextbase: '~100',
      fabrk: '234',
    },
    {
      name: 'Multi-Tenancy',
      scratch: '25+ hours',
      shipfast: '✗',
      nextbase: '✓',
      fabrk: '✓',
    },
    {
      name: 'Auth (Social + Magic Links)',
      scratch: '20+ hours',
      shipfast: '✓',
      nextbase: '✓',
      fabrk: '✓',
    },
    {
      name: 'Payments Integration',
      scratch: '15+ hours',
      shipfast: '✓',
      nextbase: '✓',
      fabrk: '✓',
    },
    {
      name: 'WCAG 2.1 AA Accessible',
      scratch: '30+ hours',
      shipfast: '✗',
      nextbase: '✗',
      fabrk: '✓',
    },
    {
      name: 'Design System',
      scratch: '30+ hours',
      shipfast: 'Basic',
      nextbase: 'Advanced',
      fabrk: 'Terminal-first',
    },
    {
      name: 'Time to Ship',
      scratch: '3-6 months',
      shipfast: '1-2 weeks',
      nextbase: '1-2 weeks',
      fabrk: '48 hours',
    },
  ];

  return (
    <section className="border-border border-t px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <Badge
            code="0x50"
            label="COMPETITIVE ANALYSIS"
            meta="MARKET COMPARISON │ FIB[21,34,55,89]"
            className="mb-4"
          />
          <h2 className={cn(mode.font, 'mb-4 text-4xl font-semibold tracking-tight')}>
            HOW FABRK COMPARES
          </h2>
          <p className={cn(mode.font, 'text-muted-foreground mx-auto max-w-2xl text-sm')}>
            More components, better accessibility, and faster shipping than competitors—at half the
            price of premium alternatives.
          </p>
        </motion.div>

        {/* Terminal Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card size="auto">
            <CardHeader code="0x51" title="COMPARISON TABLE" />
            <CardContent padding="sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>FEATURE</TableHead>
                      <TableHead className="text-muted-foreground text-center">
                        FROM SCRATCH
                      </TableHead>
                      <TableHead className="text-muted-foreground text-center">SHIPFAST</TableHead>
                      <TableHead className="text-muted-foreground text-center">NEXTBASE</TableHead>
                      <TableHead className="text-success text-center">FABRK</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {features.map((feature, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-foreground font-medium">
                          {feature.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-center text-xs">
                          {feature.scratch}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-center text-xs">
                          {feature.shipfast}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-center text-xs">
                          {feature.nextbase}
                        </TableCell>
                        <TableCell className="text-success text-center font-semibold">
                          {feature.fabrk}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <Card size="auto">
            <CardContent padding="sm">
              <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
                [NOTE]: Fabrk offers 4x more components than Shipfast, better accessibility than
                both competitors, and ships in 48 hours—all at 50% the cost of Nextbase.
              </span>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
