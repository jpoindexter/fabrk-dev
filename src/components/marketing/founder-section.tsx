/**
 * Founder Section - Unified terminal HUD card using Card UI primitives
 * Primary trust lever for pre-launch: founder credibility
 *
 * Design System Compliance:
 * - Uses mode.typography.* tokens (no hardcoded text-[Xpx])
 * - Uses Card, CardContent, CardFooter, Stat primitives
 */

'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, Stat } from '@/components/ui/card';
import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export function FounderSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container size="md">
        <SectionHeader
          badge="BUILT BY"
          code="0x80"
          title="MADE BY A DEVELOPER, FOR DEVELOPERS"
          description="Fabrk isn't built by a marketing team. It's built by someone who ships."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-12 max-w-lg"
        >
          <Card size="auto">
            {/* Header - minimal */}
            <div
              className={cn(
                'flex items-center justify-between border-b px-4 py-2',
                mode.color.border.default
              )}
            >
              <span className={cn(mode.typography.caption, mode.font, 'uppercase')}>
                FOUNDER
              </span>
            </div>

            {/* Content */}
            <CardContent padding="lg">
              {/* Name and title */}
              <div className="mb-4 text-center">
                <div className={cn(mode.typography.body.sm, 'font-medium', mode.color.text.primary, mode.font)}>
                  JASON POINDEXTER
                </div>
                <div className={cn(mode.typography.caption, mode.font, 'mt-1')}>
                  FULL-STACK DEVELOPER · SAAS BUILDER
                </div>
              </div>

              {/* Stats */}
              <div className="mb-6 flex justify-center gap-8 border-y border-border py-4">
                <div className="text-center">
                  <Stat label="" value="10+" size="sm" />
                  <div className={cn(mode.typography.caption, mode.font, 'uppercase')}>
                    Years Building
                  </div>
                </div>
                <div className="text-center">
                  <Stat label="" value="6+" size="sm" />
                  <div className={cn(mode.typography.caption, mode.font, 'uppercase')}>
                    SaaS Shipped
                  </div>
                </div>
                <div className="text-center">
                  <Stat label="" value="Next.js" size="sm" />
                  <div className={cn(mode.typography.caption, mode.font, 'uppercase')}>
                    Since 2019
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className={cn(mode.typography.caption, mode.font, 'mb-6 text-center leading-relaxed')}>
                "I built Fabrk because I was tired of rebuilding the same infrastructure every
                project. Auth, billing, multi-tenancy, UI components — it's the same 200 hours every
                time. Now I ship in days."
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <Link
                  href="https://github.com/JasonPoindexter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex h-6 items-center gap-2 border px-3 transition-colors',
                    'hover:bg-muted/50',
                    mode.color.border.default,
                    mode.typography.caption,
                    mode.font
                  )}
                >
                  <Github className="size-3" />
                  GITHUB
                </Link>
                <Link
                  href="https://twitter.com/JasonPoindexter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex h-6 items-center gap-2 border px-3 transition-colors',
                    'hover:bg-muted/50',
                    mode.color.border.default,
                    mode.typography.caption,
                    mode.font
                  )}
                >
                  <Twitter className="size-3" />
                  TWITTER
                </Link>
              </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="justify-center">
              <span className={cn(mode.typography.caption, mode.font)}>
                BUILDING IN PUBLIC · SHIPPING WEEKLY UPDATES
              </span>
            </CardFooter>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
