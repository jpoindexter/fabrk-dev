/**
 * ✅ FABRK COMPONENT
 * Hero Section - Terminal console [SYSTEM INIT] style
 * Production-ready ✓
 */
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { motion, useInView } from 'framer-motion';
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
import {
  Card,
  CardHeader,
  CardContent,
  Stat,
  StatGroup,
  Badge as CardBadge,
} from '@/components/ui/card';

// Typewriter effect component
function TypeWriter({
  text,
  delay = 0,
  speed = 30,
  showCursor = false,
}: {
  text: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
}) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [isInView, delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [started, text, speed]);

  return (
    <span ref={ref}>
      {displayText}
      {showCursor && displayText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className={mode.color.text.accent}
        >
          █
        </motion.span>
      )}
    </span>
  );
}

const techStack = [
  { name: 'NEXT.JS', path: siNextdotjs.path },
  { name: 'REACT', path: siReact.path },
  { name: 'TYPESCRIPT', path: siTypescript.path },
  { name: 'TAILWIND', path: siTailwindcss.path },
  { name: 'PRISMA', path: siPrisma.path },
  { name: 'STRIPE', path: siStripe.path },
  { name: 'RESEND', path: siResend.path },
];

// Terminal content showing git clone flow
function HeroCodeDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timers = [
      setTimeout(() => setStep(1), 2000), // Clone done
      setTimeout(() => setStep(2), 3200), // cd done, show npm install
      setTimeout(() => setStep(3), 5500), // npm install done
      setTimeout(() => setStep(4), 6500), // show npm run dev
      setTimeout(() => setStep(5), 8000), // server ready
    ];

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={ref} className="text-code-m p-6">
      {/* git clone */}
      <div className={mode.color.text.muted}>
        <span className={mode.color.text.success}>~</span>{' '}
        <TypeWriter
          text="git clone https://github.com/you/fabrk my-saas"
          delay={0.3}
          speed={30}
          showCursor
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 1 : 0 }}
        className={cn('mt-1', mode.color.text.muted)}
      >
        Cloning into &apos;my-saas&apos;... <span className={mode.color.text.success}>done</span>
      </motion.div>

      {/* cd && npm install */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
        className={cn('mt-4', mode.color.text.muted)}
      >
        <span className={mode.color.text.success}>~</span>{' '}
        <span className={mode.color.text.primary}>cd my-saas && npm install</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 && step < 3 ? 1 : 0 }}
        className={cn('mt-1', mode.color.text.muted)}
      >
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ⠋ Installing dependencies...
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 3 ? 1 : 0 }}
        className={cn('mt-1', mode.color.text.muted)}
      >
        added <span className={mode.color.text.primary}>847</span> packages in{' '}
        <span className={mode.color.text.primary}>12s</span>
      </motion.div>

      {/* npm run dev */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 4 ? 1 : 0 }}
        className={cn('mt-4', mode.color.text.muted)}
      >
        <span className={mode.color.text.success}>~/my-saas</span>{' '}
        <span className={mode.color.text.primary}>npm run dev</span>
      </motion.div>

      {/* Server ready */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 5 ? 1 : 0 }}
        className="border-success/30 bg-success/10 mt-4 border p-4"
      >
        <div className={mode.color.text.success}>▲ Ready</div>
        <div className={cn('mt-1', mode.color.text.muted)}>
          Local: <span className={mode.color.text.accent}>http://localhost:3000</span>
        </div>
      </motion.div>

      {/* Blinking cursor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 5 ? 1 : 0 }}
        className={cn('mt-4', mode.color.text.muted)}
      >
        <span className={mode.color.text.success}>~/my-saas</span>{' '}
        <motion.span
          className={cn(mode.color.text.accent, 'inline-block')}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          █
        </motion.span>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Terminal Content */}
          <div className="flex flex-col justify-center">
            {/* System Init Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <CardBadge code="0x00" label="SYSTEM INIT" meta="SAAS BOILERPLATE v2.0" />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className={cn('text-body-m mb-2', mode.color.text.muted)}>[FABRK INIT]</h1>
              <h2 className="text-display mb-6">
                BUILDING YOUR SAAS
                <br />
                <span className={mode.color.text.accent}>JUST GOT UNFAIRLY EASY.</span>
              </h2>
            </motion.div>

            {/* Status Block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Card size="auto">
                <CardHeader code="0x01" title="STATUS" />
                <CardContent>
                  <p className={cn('text-body-m mb-4', mode.color.text.muted)}>
                    Why spend valuable time tackling auth, billing, emails, organizations, invites
                    and onboarding? Focus on your business and skip the noise.
                  </p>
                  <StatGroup>
                    <Stat label="Speed" value="OPTIMIZED" />
                    <Stat label="Integration" value="SEAMLESS" />
                  </StatGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 flex flex-col gap-4 sm:flex-row"
            >
              <PolarCheckoutButton className={cn('text-xs', mode.radius, mode.font)}>
                &gt; GET FABRK
              </PolarCheckoutButton>
              <Button variant="outline" asChild className={cn('text-xs', mode.radius, mode.font)}>
                <Link href="/docs/components/overview">&gt; VIEW LIBRARY</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Dashboard Preview / Discount */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* Terminal Window Frame */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card size="auto">
                <CardHeader code="0x03" title="terminal — ~/projects" />
                {/* Terminal Content */}
                <HeroCodeDemo />
              </Card>
            </motion.div>
          </motion.div>
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
      </div>
    </section>
  );
}
