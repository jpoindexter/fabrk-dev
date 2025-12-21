'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { INCLUDED_FEATURES } from '@/data/landing/included-features';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/**
 * What's Included Section
 * Terminal-style feature cards with stats and checklists
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
            const hexCode = `0x${(80 + index).toString(16).toUpperCase()}`;

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
                className="group flex h-full flex-col"
              >
                {/* Card Container */}
                <div
                  className={cn(
                    'border-border bg-card flex h-full flex-col border transition-colors',
                    'hover:border-border/80',
                    mode.radius
                  )}
                >
                  {/* Terminal Header */}
                  <div
                    className={cn(
                      'border-border flex h-11 items-center justify-between border-b px-4',
                      'bg-muted/30'
                    )}
                  >
                    <span className={cn('text-muted-foreground text-xs tracking-wide', mode.font)}>
                      [{hexCode}] {item.category}
                    </span>
                    <Icon className={cn('text-primary size-5 animate-pulse')} />
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col p-6 pb-0">
                    <h3
                      className={cn(
                        'text-foreground text-sm font-bold uppercase leading-tight tracking-wide',
                        mode.font
                      )}
                    >
                      {item.category}
                    </h3>
                    <p
                      className={cn(
                        'text-muted-foreground mt-2 min-h-[72px] text-sm leading-relaxed',
                        mode.font
                      )}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Stats Section */}
                  <div className="border-border bg-card mt-2 flex gap-4 border-y px-6 py-4">
                    {item.stats.map((stat, statIndex) => (
                      <div key={stat.label} className="flex flex-1 flex-col gap-1">
                        <p
                          className={cn(
                            'text-muted-foreground text-[11px] font-medium uppercase tracking-wider',
                            mode.font
                          )}
                        >
                          {stat.label}
                        </p>
                        <p
                          className={cn(
                            'text-primary text-xl font-bold leading-none tracking-tight',
                            mode.font
                          )}
                        >
                          {stat.value}
                        </p>
                        {statIndex < item.stats.length - 1 && (
                          <div className="bg-border absolute right-0 top-0 h-full w-px" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="flex flex-grow flex-col gap-3 p-6 pt-4">
                    <p
                      className={cn(
                        'text-muted-foreground mb-1 text-[11px] font-bold uppercase tracking-wider',
                        mode.font
                      )}
                    >
                      [INCLUDES]:
                    </p>
                    <ul className="flex flex-col gap-2">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="group/item flex items-start gap-3">
                          <span className={cn('text-primary mt-[1px] text-sm font-bold', mode.font)}>
                            ✓
                          </span>
                          <span
                            className={cn(
                              'text-muted-foreground text-xs transition-colors',
                              'group-hover/item:text-foreground',
                              mode.font
                            )}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
