'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge } from '@/components/ui/card';

// Animated counter component
function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted =
          decimals > 0 ? latest.toFixed(decimals) : Math.floor(latest).toLocaleString();
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix, prefix, decimals]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

export function StatsSection() {
  const stats = [
    {
      value: 500,
      suffix: '+',
      label: 'Developers',
      description: 'Using Fabrk to ship faster',
      color: 'bg-primary text-primary-foreground',
    },
    {
      value: 1000,
      suffix: '+',
      label: 'Projects Shipped',
      description: 'Built with Fabrk boilerplate',
      color: 'bg-accent text-accent-foreground',
    },
    {
      value: 4.9,
      suffix: '/5',
      decimals: 1,
      label: 'Average Rating',
      description: 'From satisfied customers',
      color: 'bg-secondary text-secondary-foreground',
    },
    {
      value: 40,
      suffix: 'hrs',
      label: 'Time Saved',
      description: 'Per project on average',
      color: 'bg-primary text-primary-foreground',
    },
  ];

  return (
    <section className="border-border bg-background border-t px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge code="0x30" label="METRICS" className="mb-4" />
            <h2 className={cn('mb-4 text-2xl font-semibold tracking-tight', mode.font)}>
              TRUSTED BY DEVELOPERS WORLDWIDE
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className={cn('text-muted-foreground text-sm', mode.font)}>
              &gt; Join hundreds of developers shipping production-ready SaaS apps
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className={cn('text-muted-foreground mt-2 block text-xs', mode.font)}>
              *Projected estimates based on early access users
            </span>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="group hover:border-primary/50 transition-colors"
            >
              <Card>
                <CardHeader
                  title={`[ [0x${(index + 31).toString(16).toUpperCase()}] ${stat.label.toUpperCase().replace(/ /g, '_')} ]`}
                />
                <CardContent>
                  <div className={cn('text-foreground mb-2 text-3xl font-semibold', mode.font)}>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  </div>
                  <div className={cn('text-xs', mode.font)}>
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
