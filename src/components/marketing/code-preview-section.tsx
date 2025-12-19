/**
 * Code Preview Section - Full-width terminal-style code showcase
 * Shows the power of unified APIs with impressive visual presentation
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/landing/section-header';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Shield, CreditCard, Sparkles, Mail, Terminal, Copy, Check } from 'lucide-react';

const CODE_EXAMPLES = [
  {
    id: 'auth',
    label: 'AUTH',
    icon: Shield,
    filename: 'middleware.ts',
    description: 'Protect routes in 2 lines. OAuth, magic links, and JWT sessions included.',
    code: `import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <Dashboard user={session.user} />
  );
}`,
  },
  {
    id: 'payments',
    label: 'PAYMENTS',
    icon: CreditCard,
    filename: 'checkout.ts',
    description: 'Same API for Stripe, Polar, and Lemonsqueezy. Switch without rewriting.',
    code: `import { createCheckout } from '@/lib/payments';
import { env } from '@/lib/env';

export async function POST(req: Request) {
  const { priceId, userId } = await req.json();

  // Works with ANY payment provider
  const checkout = await createCheckout({
    provider: env.PAYMENT_PROVIDER, // 'stripe' | 'polar' | 'lemonsqueezy'
    priceId,
    userId,
    successUrl: '/dashboard?success=true',
  });

  return Response.json({ url: checkout.url });
}`,
  },
  {
    id: 'ai',
    label: 'AI',
    icon: Sparkles,
    filename: 'generate.ts',
    description: 'Token metering and credit billing built-in. No usage tracking code needed.',
    code: `import { generateWithCredits } from '@/lib/ai';

export async function POST(req: Request) {
  const { prompt, userId } = await req.json();

  // Credits auto-deducted based on token usage
  const result = await generateWithCredits({
    userId,
    model: 'gpt-4o', // or 'claude-3-opus', 'gemini-pro'
    messages: [{ role: 'user', content: prompt }],
    // Automatically tracks: input tokens, output tokens, cost
  });

  return Response.json({
    content: result.content,
    creditsUsed: result.creditsUsed,
    creditsRemaining: result.creditsRemaining,
  });
}`,
  },
  {
    id: 'email',
    label: 'EMAIL',
    icon: Mail,
    filename: 'send-email.ts',
    description: 'React Email templates with any provider. Resend, SES, SendGrid, Postmark.',
    code: `import { sendEmail } from '@/lib/email';
import { WelcomeEmail } from '@/emails/welcome';

export async function sendWelcomeEmail(user: User) {
  await sendEmail({
    to: user.email,
    subject: 'Welcome to our platform!',
    react: WelcomeEmail({
      name: user.name,
      loginUrl: '/login',
    }),
    // Works with: resend, ses, sendgrid, postmark, mailgun
  });
}`,
  },
];

export function CodePreviewSection() {
  const [activeTab, setActiveTab] = useState('auth');
  const [copied, setCopied] = useState(false);
  const activeExample = CODE_EXAMPLES.find((e) => e.id === activeTab) || CODE_EXAMPLES[0];
  const Icon = activeExample.icon;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-border border-t py-20 lg:py-24">
      <Container>
        <SectionHeader
          badge="CODE PREVIEW"
          code="0x20"
          title="UNIFIED APIS. ZERO BOILERPLATE."
          description="Import and use. Switch providers without changing code. Every integration shares the same clean interface."
          align="center"
        />

        {/* Tab Navigation - Full width cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CODE_EXAMPLES.map((example) => {
            const TabIcon = example.icon;
            const isActive = activeTab === example.id;
            return (
              <motion.button
                key={example.id}
                onClick={() => setActiveTab(example.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'border p-4 text-left transition-all',
                  'border-border',
                  mode.radius,
                  isActive ? 'bg-primary/10 border-primary' : 'bg-card hover:bg-muted/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <TabIcon
                    className={cn(
                      'size-5',
                      isActive ? mode.color.text.accent : mode.color.text.muted
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-bold',
                      mode.font,
                      isActive ? mode.color.text.primary : mode.color.text.muted
                    )}
                  >
                    {example.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Main Code Display */}
        <Card>
          <CardHeader
            code="0x21"
            title={activeExample.label}
            icon={<Icon className={cn('size-4', mode.color.text.accent)} />}
          />

          {/* Description Bar */}
          <div className={cn('border-border border-b px-4 py-3', 'bg-muted/30')}>
            <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
              {activeExample.description}
            </p>
          </div>

          {/* Terminal Header */}
          <div
            className={cn(
              'flex items-center justify-between border-b px-4 py-2',
              'border-border bg-muted/50'
            )}
          >
            <div className="flex items-center gap-2">
              <Terminal className={cn('size-3', mode.color.text.muted)} />
              <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                {activeExample.filename}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 text-xs transition-colors',
                'hover:bg-muted',
                mode.radius,
                mode.font,
                mode.color.text.muted
              )}
            >
              {copied ? (
                <>
                  <Check className="size-3" />
                  COPIED
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  COPY
                </>
              )}
            </button>
          </div>

          {/* Code Content with Line Numbers */}
          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExample.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="overflow-x-auto"
              >
                <pre className="p-4">
                  <code className={cn('text-sm leading-relaxed', mode.font)}>
                    {activeExample.code.split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span
                          className={cn(
                            'mr-4 inline-block w-6 select-none text-right',
                            mode.color.text.muted
                          )}
                        >
                          {i + 1}
                        </span>
                        <span className={mode.color.text.primary}>{line}</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {[
            { label: 'PAYMENT PROVIDERS', value: '5' },
            { label: 'EMAIL PROVIDERS', value: '5' },
            { label: 'AI PROVIDERS', value: '9' },
            { label: 'SEARCH PROVIDERS', value: '5' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn('border p-4 text-center', 'border-border bg-card', mode.radius)}
            >
              <div className={cn('text-2xl font-bold', mode.font, mode.color.text.accent)}>
                {stat.value}
              </div>
              <div className={cn('text-xs', mode.font, mode.color.text.muted)}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
