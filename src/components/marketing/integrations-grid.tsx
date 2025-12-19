/**
 * Integrations Grid - Unified terminal HUD card using Card UI primitives
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

const INTEGRATIONS = [
  {
    id: 'payments',
    code: '0x30',
    module: 'PAYMENT_PROVIDERS',
    providers: ['Stripe', 'Polar', 'Lemonsqueezy', 'Paddle', 'Gumroad'],
    ctaHref: '/docs/features/payments',
  },
  {
    id: 'email',
    code: '0x31',
    module: 'EMAIL_PROVIDERS',
    providers: ['Resend', 'AWS SES', 'SendGrid', 'Postmark', 'Mailgun'],
    ctaHref: '/docs/features/email',
  },
  {
    id: 'ai',
    code: '0x32',
    module: 'AI_PROVIDERS',
    providers: ['OpenAI', 'Anthropic', 'Google AI', 'Mistral', 'Groq'],
    ctaHref: '/docs/features/ai-integration',
  },
  {
    id: 'search',
    code: '0x33',
    module: 'SEARCH_PROVIDERS',
    providers: ['Algolia', 'Meilisearch', 'Typesense', 'Elasticsearch', 'Orama'],
    ctaHref: '/docs/features/search',
  },
  {
    id: 'storage',
    code: '0x34',
    module: 'STORAGE_PROVIDERS',
    providers: ['AWS S3', 'Cloudflare R2', 'Supabase', 'Uploadthing', 'B2'],
    ctaHref: '/docs/features/storage',
  },
];

export function IntegrationsGrid() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="INTEGRATIONS"
          code="0x30"
          title="29 PROVIDERS. ZERO LOCK-IN."
          description="Unified interfaces for every category. Switch providers without rewriting code."
          align="center"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((integration, index) => (
            <motion.div
              key={integration.id}
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
                    {integration.module.replace(/_/g, ' ')}
                  </span>
                  <span className={cn(mode.typography.caption, mode.color.text.accent, mode.font)}>
                    {integration.providers.length}
                  </span>
                </div>

                {/* Code snippet - uses mode.typography.caption */}
                <div className={cn('border-b px-4 py-2', mode.color.border.default, mode.color.bg.muted)}>
                  <code className={cn(mode.typography.caption, mode.font, mode.color.text.muted)}>
                    <span className={mode.color.text.accent}>await</span> {integration.id}
                    {'({ provider: env.PROVIDER })'}
                  </code>
                </div>

                {/* Providers - Tags */}
                <CardContent padding="md" className="flex-grow">
                  <div className="flex flex-wrap gap-1.5">
                    {integration.providers.map((provider) => (
                      <span
                        key={provider}
                        className={cn(
                          'flex h-6 items-center border px-2',
                          mode.color.border.default,
                          mode.typography.caption,
                          mode.color.text.muted,
                          mode.font
                        )}
                      >
                        {provider}
                      </span>
                    ))}
                  </div>
                </CardContent>

                {/* Footer CTA */}
                <CardFooter className="p-0">
                  <Link
                    href={integration.ctaHref}
                    className={cn(
                      'flex w-full px-4 py-2 transition-colors',
                      'hover:bg-muted/50',
                      mode.typography.caption,
                      mode.color.text.muted,
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
