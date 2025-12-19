/**
 * Tech Stack Section - Unified terminal HUD card using Card UI primitives
 *
 * Design System Compliance:
 * - Uses mode.typography.* tokens (no hardcoded text-[Xpx])
 * - Uses Card, CardContent, CardFooter primitives
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/landing/section-header';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const TECH_STACK = [
  {
    code: '0x60',
    module: 'NEXT_JS',
    version: '16.0.10',
    specs: ['App Router', 'React 19', 'RSC', 'Streaming', 'Turbopack'],
    ctaHref: '/docs/getting-started/architecture',
  },
  {
    code: '0x61',
    module: 'TYPESCRIPT',
    version: '5.x',
    specs: ['Strict', 'Zod', 'Type-Safe', 'Git Hooks', 'No Any'],
    ctaHref: '/docs/getting-started/typescript',
  },
  {
    code: '0x62',
    module: 'TAILWIND',
    version: '4.x',
    specs: ['OKLCH', '12 Themes', 'CSS Vars', 'Dark Mode', 'PostCSS'],
    ctaHref: '/docs/themes',
  },
  {
    code: '0x63',
    module: 'PRISMA',
    version: '7.x',
    specs: ['PostgreSQL', 'Type-Safe', 'Migrations', 'Pooling', 'Neon'],
    ctaHref: '/docs/getting-started/database',
  },
  {
    code: '0x64',
    module: 'NEXTAUTH',
    version: '5.x',
    specs: ['OAuth', 'Magic Links', 'JWT', 'Rate Limit', 'RBAC'],
    ctaHref: '/docs/features/authentication',
  },
  {
    code: '0x65',
    module: 'RADIX_UI',
    version: 'Latest',
    specs: ['ARIA', 'Keyboard', 'Focus', 'a11y', 'WCAG'],
    ctaHref: '/library',
  },
];

export function TechStackSection() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="TECH STACK"
          code="0x60"
          title="BUILT ON MODERN FOUNDATIONS"
          description="Production-tested technologies. No experimental dependencies."
          align="center"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.code}
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
                    {tech.module.replace(/_/g, ' ')}
                  </span>
                  <span className={cn(mode.typography.caption, mode.color.text.accent, mode.font)}>
                    v{tech.version}
                  </span>
                </div>

                {/* Specs - Tags */}
                <CardContent padding="md" className="flex-grow">
                  <div className="flex flex-wrap gap-1.5">
                    {tech.specs.map((spec) => (
                      <span
                        key={spec}
                        className={cn(
                          'flex h-6 items-center border px-2',
                          mode.color.border.default,
                          mode.typography.caption,
                          mode.font
                        )}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </CardContent>

                {/* Footer CTA */}
                <CardFooter className="p-0">
                  <Link
                    href={tech.ctaHref}
                    className={cn(
                      'flex w-full px-4 py-2 transition-colors',
                      'hover:bg-muted/50',
                      mode.typography.caption,
                      mode.font
                    )}
                  >
                    &gt; VIEW DOCS
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
