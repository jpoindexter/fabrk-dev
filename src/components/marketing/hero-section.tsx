/**
 * ✅ FABRK COMPONENT
 * Hero Section - Terminal console [SYSTEM INIT] style
 * Production-ready ✓
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { motion } from 'framer-motion';
import { SimpleIcon } from '@/components/ui/simple-icon';
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siTypescript,
  siStripe,
  siResend,
} from 'simple-icons';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Badge as CardBadge } from '@/components/ui/card';
import { LayeredWindows } from './layered-windows';
import { PRICING } from '@/data/landing';

const techStack = [
  { name: 'NEXT.JS', path: siNextdotjs.path },
  { name: 'REACT', path: siReact.path },
  { name: 'TYPESCRIPT', path: siTypescript.path },
  { name: 'TAILWIND', path: siTailwindcss.path },
  { name: 'PRISMA', path: siPrisma.path },
  { name: 'STRIPE', path: siStripe.path },
  { name: 'RESEND', path: siResend.path },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden py-16 lg:min-h-[90vh] lg:py-20">
      <Container size="2xl">
        {/* Single column with layered windows */}
        <div className="relative">
          <LayeredWindows />
        </div>

        {/* Tech Stack - Below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <CardBadge code="0x02" label="POWERED BY" meta="FIB[1,1,2,3,5,8,13]" className="mb-6" />
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className={cn(
                  'flex items-center gap-2 border px-2 py-1',
                  mode.color.border.default,
                  mode.color.bg.surface
                )}
              >
                <SimpleIcon path={tech.path} className="size-3.5" />
                <span className={cn('text-xs', mode.font)}>{tech.name}</span>
                <span className={cn('text-xs', mode.color.text.success, mode.font)}>[OK]</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
