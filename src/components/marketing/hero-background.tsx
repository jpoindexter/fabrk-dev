/**
 * ✅ FABRK COMPONENT
 * Hero Background - Animated terminal code snippets
 * Production-ready ✓
 */
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

const codeSnippets = [
  '// Initialize SaaS infrastructure',
  'const auth = await NextAuth.configure();',
  'const db = await prisma.connect();',
  'export const api = new APIRouter();',
  '// Multi-tenant architecture',
  'function createTenant(userId: string) {',
  '  return prisma.tenant.create({ ... });',
  '}',
  '// Billing integration',
  'const checkout = await stripe.checkout();',
  'const subscription = await polar.purchase();',
  '// Production ready',
  'export default function Dashboard() {',
  '  return <Layout>{children}</Layout>;',
  '}',
  '// AI Credits system',
  'const credits = await deductUsage(userId);',
  'if (credits < 0) throw new Error();',
  '// Real-time analytics',
  'const metrics = await analytics.track();',
];

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      {/* Grid overlay */}
      <div className="bg-grid-pattern absolute inset-0 opacity-30" />

      {/* Floating code snippets */}
      <div className="relative h-full w-full">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [-100, -500],
            }}
            transition={{
              duration: 15 + index * 2,
              repeat: Infinity,
              delay: index * 1.5,
              ease: 'linear',
            }}
            className={cn('absolute text-xs whitespace-nowrap', mode.font, mode.color.text.muted)}
            style={{
              left: `${(index * 37) % 100}%`,
              top: '100%',
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay from bottom */}
      <div className="from-background via-background/50 absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
    </div>
  );
}
