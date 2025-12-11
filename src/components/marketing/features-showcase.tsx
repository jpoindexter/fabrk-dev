/**
 * ✅ FABRK COMPONENT
 * Core Benefits - 3 major value propositions
 * Production-ready ✓
 */

'use client';

import { motion } from 'framer-motion';
import { Lock, CreditCard, Users, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardContent, Stat, StatGroup } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

const CORE_BENEFITS = [
  {
    id: 'auth',
    icon: Lock,
    module: 'AUTH & SECURITY',
    code: '0x10',
    title: 'Authentication & Security',
    benefit: 'Launch with enterprise-grade auth in minutes, not months',
    description:
      'NextAuth v5 with Google, GitHub, email magic links, and JWT sessions. Role-based access control, password reset flows, and email verification built-in.',
    timeSaved: '40 HOURS',
    costSaved: '$8K',
    features: ['Social OAuth', 'Magic Links', 'RBAC', 'Password Reset', 'Email Verification'],
  },
  {
    id: 'billing',
    icon: CreditCard,
    module: 'BILLING & PAYMENTS',
    code: '0x11',
    title: 'Billing & Payments',
    benefit: 'Start monetizing day one with production-ready payments',
    description:
      'Polar.sh integration with subscription management, one-time payments, and webhook handling. Customer portal, invoice generation, and payment history included.',
    timeSaved: '60 HOURS',
    costSaved: '$12K',
    features: ['Subscriptions', 'One-Time Payments', 'Webhooks', 'Customer Portal', 'Invoices'],
  },
  {
    id: 'multitenancy',
    icon: Users,
    module: 'MULTI-TENANCY',
    code: '0x12',
    title: 'Multi-Tenancy & Teams',
    benefit: 'Scale to enterprise with B2B team features out of the box',
    description:
      'Organization management with invites, role permissions, and team switching. Member management, audit logs, and organization-level billing ready to go.',
    timeSaved: '80 HOURS',
    costSaved: '$15K',
    features: ['Organizations', 'Team Invites', 'Role Permissions', 'Team Switching', 'Audit Logs'],
  },
  {
    id: 'ai',
    icon: Sparkles,
    module: 'AI FEATURES',
    code: '0x13',
    title: 'AI-Powered Generation',
    benefit: 'Ship AI features without building infrastructure from scratch',
    description:
      'Credit-based AI system with multi-provider support (OpenAI, Google, Ollama). Pre-built UI components, streaming responses, and usage tracking. Generate forms, dashboards, and content with AI.',
    timeSaved: '50 HOURS',
    costSaved: '$10K',
    features: [
      'Credit System',
      'Multi-Provider (OpenAI, Google, Ollama)',
      'Streaming UI',
      'Usage Tracking',
      'Pre-built Components',
    ],
  },
];

interface BenefitCardProps {
  icon: React.ComponentType<{ className?: string }>;
  module: string;
  code: string;
  benefit: string;
  description: string;
  timeSaved: string;
  costSaved: string;
  features: string[];
  index: number;
}

function BenefitCard({
  icon: Icon,
  module,
  code,
  benefit,
  description,
  timeSaved,
  costSaved,
  features,
  index,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader
          code={code}
          title={module}
          icon={
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Icon className={cn('size-5', mode.color.text.accent)} />
            </motion.div>
          }
        />
        <CardContent>
          {/* Benefit Statement */}
          <h3 className={cn('mb-4 text-sm font-semibold', mode.font, mode.color.text.primary)}>
            {benefit}
          </h3>

          {/* Description */}
          <p className={cn('mb-4 text-xs leading-relaxed', mode.color.text.muted)}>{description}</p>

          {/* Time/Cost Savings */}
          <div className="mb-4">
            <StatGroup>
              <Stat label="Time Saved" value={timeSaved} size="sm" />
              <Stat label="Cost Saved" value={costSaved} size="sm" />
            </StatGroup>
          </div>

          {/* Features List */}
          <div className={cn('text-xs', mode.color.text.muted)}>
            <span className="mb-2 block font-semibold">[INCLUDES]:</span>
            <ul className="space-y-1">
              {features.map((feature) => (
                <li key={feature}>
                  <span className={mode.color.text.success}>✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function FeaturesShowcase() {
  return (
    <section className="border-border border-t py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className={cn('mb-4 text-3xl font-bold tracking-tight', mode.font)}>WHAT YOU GET</h2>
          <p className={cn('text-muted-foreground mx-auto max-w-2xl text-sm', mode.font)}>
            Stop rebuilding the same features. Get 180+ hours of development work done in 5 minutes.
            <br />
            Save $35K+ in development costs with production-ready infrastructure.
          </p>
        </motion.div>

        {/* 4-Column Benefits Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <Stat label="Total Time Saved" value="230+ HOURS" />
                <Stat label="Total Cost Saved" value="$45K+" />
                <Stat label="Your Investment" value="$399" />
              </StatGroup>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
