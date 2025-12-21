/**
 * Hero Variation 10: SPEED RUN
 * Hook: Show the actual workflow with timestamps
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Play, Clock, Check, Terminal } from 'lucide-react';

const STEPS = [
  {
    time: '0:00',
    title: 'PURCHASE & DOWNLOAD',
    command: '> Payment confirmed. Downloading...',
    desc: 'One-click checkout, instant access',
    duration: 30,
  },
  {
    time: '0:30',
    title: 'INSTALL DEPENDENCIES',
    command: '$ npm install',
    desc: 'All packages pre-configured',
    duration: 45,
  },
  {
    time: '1:15',
    title: 'RUN SETUP WIZARD',
    command: '$ npm run setup',
    desc: 'Interactive configuration',
    duration: 60,
  },
  {
    time: '2:15',
    title: 'CONFIGURE ENV',
    command: '> .env.local generated',
    desc: 'Guided environment setup',
    duration: 30,
  },
  {
    time: '2:45',
    title: 'PUSH DATABASE',
    command: '$ npm run db:push',
    desc: 'Schema auto-applied',
    duration: 15,
  },
  {
    time: '3:00',
    title: 'START DEV SERVER',
    command: '$ npm run dev',
    desc: 'Hot reload enabled',
    duration: 15,
  },
  {
    time: '3:15',
    title: 'OPEN BROWSER',
    command: '> http://localhost:3000',
    desc: 'Your SaaS is live!',
    duration: 15,
  },
  {
    time: '3:30',
    title: 'DEPLOY TO VERCEL',
    command: '$ vercel --prod',
    desc: 'One command deployment',
    duration: 30,
  },
];

function TimelineStep({
  step,
  index,
  activeIndex,
}: {
  step: typeof STEPS[0];
  index: number;
  activeIndex: number;
}) {
  const isActive = index === activeIndex;
  const isComplete = index < activeIndex;
  const isPending = index > activeIndex;

  return (
    <div
      className={cn(
        'relative flex gap-4 pb-8 transition-all duration-300',
        isPending && 'opacity-40'
      )}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'h-8 w-8 border-2 flex items-center justify-center shrink-0 transition-colors',
            isComplete && 'bg-success border-success',
            isActive && 'border-primary animate-pulse',
            isPending && 'border-muted'
          )}
        >
          {isComplete ? (
            <Check className="h-4 w-4 text-success-foreground" />
          ) : (
            <span className={cn('text-xs', mode.font, isActive && 'text-primary')}>
              {index + 1}
            </span>
          )}
        </div>
        {index < STEPS.length - 1 && (
          <div
            className={cn(
              'w-0.5 flex-1 transition-colors',
              isComplete ? 'bg-success' : 'bg-muted'
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <div className={cn('flex items-center gap-4 mb-2', mode.font)}>
          <span className={cn('text-xs', isActive ? 'text-primary' : mode.color.text.muted)}>
            [{step.time}]
          </span>
          <span className={cn('text-sm font-bold', isActive && 'text-primary')}>
            {step.title}
          </span>
        </div>

        {/* Command */}
        <div
          className={cn(
            'border px-3 py-2 mb-2 text-xs transition-colors',
            mode.font,
            isActive && 'border-primary bg-primary/5'
          )}
        >
          <code className={isActive ? 'text-primary' : mode.color.text.muted}>
            {step.command}
          </code>
        </div>

        <p className={cn('text-xs', mode.font, mode.color.text.muted)}>{step.desc}</p>
      </div>
    </div>
  );
}

export function HeroSpeedRun() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const totalDuration = STEPS.reduce((acc, s) => acc + s.duration, 0);
    let currentTime = 0;
    let stepIndex = 0;

    const interval = setInterval(() => {
      currentTime += 1;
      setElapsedTime(currentTime);

      // Calculate which step we should be on
      let timeAccum = 0;
      for (let i = 0; i < STEPS.length; i++) {
        timeAccum += STEPS[i].duration / 10; // Speed up for demo
        if (currentTime < timeAccum) {
          if (i !== stepIndex) {
            stepIndex = i;
            setActiveStep(i);
          }
          break;
        }
      }

      if (currentTime >= totalDuration / 10) {
        setActiveStep(STEPS.length);
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setActiveStep(0);
    setElapsedTime(0);
    setIsRunning(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Container size="2xl">
      <div className="grid gap-12 lg:grid-cols-5 items-start">
        {/* LEFT: Timeline (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className={cn('flex items-center justify-between', mode.font)}>
            <div className="flex items-center gap-2">
              <Terminal className={cn('h-4 w-4', mode.color.text.primary)} />
              <span className={cn('text-xs', mode.color.text.muted)}>SPEED RUN</span>
            </div>
            <div className={cn('flex items-center gap-4', mode.font)}>
              <Clock className={cn('h-4 w-4', mode.color.text.muted)} />
              <span className="text-xs">
                ELAPSED: <span className="font-bold">{formatTime(Math.floor(elapsedTime))}</span>
              </span>
            </div>
          </div>

          {/* Play Button */}
          {!isRunning && activeStep === 0 && (
            <button
              onClick={handleStart}
              className={cn(
                'w-full border-2 border-dashed border-primary p-8 flex items-center justify-center gap-4 transition-colors',
                mode.state.hover.card,
                mode.font
              )}
            >
              <Play className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">START SPEED RUN</span>
            </button>
          )}

          {/* Timeline */}
          {(isRunning || activeStep > 0) && (
            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <TimelineStep key={step.time} step={step} index={i} activeIndex={activeStep} />
              ))}
            </div>
          )}

          {/* Completion */}
          {activeStep >= STEPS.length && (
            <Card size="auto" className="border-success">
              <CardContent padding="lg">
                <div className="text-center space-y-4">
                  <Check className="h-12 w-12 text-success mx-auto" />
                  <div className={cn('text-2xl font-bold', mode.font)}>
                    DEPLOYED IN 4 MINUTES
                  </div>
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    Your production-ready SaaS is now live on Vercel.
                  </p>
                  <Button onClick={handleStart} variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                    REPLAY
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT: Copy (2 cols) */}
        <div className="lg:col-span-2 space-y-8 lg:sticky lg:top-24">
          <h1 className={cn('text-4xl font-bold tracking-tight leading-tight', mode.font)}>
            FROM ZERO TO
            <br />
            <span className="text-primary">DEPLOYED</span>
            <br />
            IN 4 MINUTES
          </h1>

          <p className={cn('text-sm leading-relaxed', mode.font, mode.color.text.muted)}>
            Watch the full journey from purchase to production deployment.
            No tutorials, no config hell, no wasted weekends.
            Just run the commands and ship.
          </p>

          {/* Key Stats */}
          <Card size="auto">
            <CardHeader code="0x01" title="TIME BREAKDOWN" />
            <CardContent padding="md">
              <div className={cn('space-y-2 text-xs', mode.font)}>
                <div className="flex justify-between">
                  <span className={mode.color.text.muted}>Download + Install</span>
                  <span>1:15</span>
                </div>
                <div className="flex justify-between">
                  <span className={mode.color.text.muted}>Setup Wizard</span>
                  <span>1:30</span>
                </div>
                <div className="flex justify-between">
                  <span className={mode.color.text.muted}>Deploy to Vercel</span>
                  <span>0:45</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>TOTAL</span>
                  <span className="text-success">4:00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="space-y-4">
            <PolarCheckoutButton
              className={cn(
                'w-full bg-primary text-primary-foreground px-6 py-4 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; START YOUR SPEED RUN
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="ghost"
              asChild
              className={cn('w-full px-4 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/docs/getting-started">&gt; READ THE DOCS</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
