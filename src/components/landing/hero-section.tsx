/**
 * ✅ FABRK COMPONENT
 * Hero Section - Terminal console [SYSTEM_INIT] style
 * Production-ready ✓
 */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PolarCheckoutButton } from "@/components/polar/checkout-button";
import { DiscountCounter } from "@/components/polar/discount-counter";
import { motion, useInView } from "framer-motion";
import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siTypescript,
  siStripe,
  siResend,
} from "simple-icons";

// Typewriter effect component
function TypeWriter({
  text,
  delay = 0,
  speed = 30,
  showCursor = false
}: {
  text: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
}) {
  const [displayText, setDisplayText] = useState("");
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
          className="text-primary"
        >
          █
        </motion.span>
      )}
    </span>
  );
}

const techStack = [
  { name: "NEXT.JS", path: siNextdotjs.path },
  { name: "REACT", path: siReact.path },
  { name: "TYPESCRIPT", path: siTypescript.path },
  { name: "TAILWIND", path: siTailwindcss.path },
  { name: "PRISMA", path: siPrisma.path },
  { name: "STRIPE", path: siStripe.path },
  { name: "RESEND", path: siResend.path },
];

// Terminal content showing git clone flow
function TerminalContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timers = [
      setTimeout(() => setStep(1), 2000),  // Clone done
      setTimeout(() => setStep(2), 3200),  // cd done, show npm install
      setTimeout(() => setStep(3), 5500),  // npm install done
      setTimeout(() => setStep(4), 6500),  // show npm run dev
      setTimeout(() => setStep(5), 8000),  // server ready
    ];

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={ref} className="p-6 font-mono text-xs">
      {/* git clone */}
      <div className="text-muted-foreground">
        <span className="text-success">~</span> <TypeWriter text="git clone https://github.com/you/fabrk my-saas" delay={0.3} speed={30} showCursor />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 1 : 0 }}
        className="mt-1 text-muted-foreground"
      >
        Cloning into &apos;my-saas&apos;... <span className="text-success">done</span>
      </motion.div>

      {/* cd && npm install */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
        className="mt-3 text-muted-foreground"
      >
        <span className="text-success">~</span> <span className="text-foreground">cd my-saas && npm install</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 && step < 3 ? 1 : 0 }}
        className="mt-1 text-muted-foreground"
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
        className="mt-1 text-muted-foreground"
      >
        added <span className="text-foreground">847</span> packages in <span className="text-foreground">12s</span>
      </motion.div>

      {/* npm run dev */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 4 ? 1 : 0 }}
        className="mt-3 text-muted-foreground"
      >
        <span className="text-success">~/my-saas</span> <span className="text-foreground">npm run dev</span>
      </motion.div>

      {/* Server ready */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 5 ? 1 : 0 }}
        className="mt-3 border border-success/30 bg-success/10 p-3"
      >
        <div className="text-success">▲ Ready</div>
        <div className="mt-1 text-muted-foreground">
          Local: <span className="text-primary">http://localhost:3000</span>
        </div>
      </motion.div>

      {/* Blinking cursor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 5 ? 1 : 0 }}
        className="mt-3 text-muted-foreground"
      >
        <span className="text-success">~/my-saas</span>{" "}
        <motion.span
          className="inline-block text-primary"
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
    <section className="relative overflow-hidden px-6 py-16 lg:py-24">
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
              <span className="inline-block border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
                [ [0x00] SYSTEM_INIT ] SAAS_BOILERPLATE_v2.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="mb-2 font-mono text-sm text-muted-foreground">
                FABRK_INIT:
              </h1>
              <h2 className="mb-6 font-mono text-3xl font-bold tracking-tight lg:text-4xl">
                BUILDING_YOUR_SAAS
                <br />
                <span className="text-primary">JUST_GOT_UNFAIRLY_EASY.</span>
              </h2>
            </motion.div>

            {/* Status Block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 border border-border bg-card p-4"
            >
              <div className="mb-3 font-mono text-xs text-muted-foreground">
                [ [0x01] STATUS ]────────────────────────
              </div>
              <p className="mb-4 font-mono text-sm text-muted-foreground">
                Why spend valuable time tackling auth, billing, emails, organizations,
                invites and onboarding? Focus on your business and skip the noise.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-sm">
                <span>
                  <span className="text-muted-foreground">Speed:</span>{" "}
                  <span className="text-primary">OPTIMIZED</span>
                </span>
                <span>
                  <span className="text-muted-foreground">Integration:</span>{" "}
                  <span className="text-primary">SEAMLESS</span>
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 flex flex-col gap-3 sm:flex-row"
            >
              <PolarCheckoutButton className="rounded-none font-mono text-xs">
                &gt; EXECUTE: GET_FABRK
              </PolarCheckoutButton>
              <Button variant="outline" asChild className="rounded-none font-mono text-xs">
                <Link href="/demo">
                  &gt; VIEW: LIVE_DEMO
                </Link>
              </Button>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-3 font-mono text-xs text-muted-foreground">
                [ [0x02] POWERED_BY ] FIB[1,1,2,3,5,8,13]
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-1.5 border border-border bg-card px-2 py-1"
                  >
                    <SimpleIcon path={tech.path} className="size-3.5" />
                    <span className="font-mono text-xs">{tech.name}</span>
                    <span className="font-mono text-xs text-success">[OK]</span>
                  </div>
                ))}
              </div>
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
              className="border border-border bg-card"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Window Title Bar */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <motion.div
                    className="size-3 rounded-full bg-destructive/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="size-3 rounded-full bg-warning/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="size-3 rounded-full bg-success/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  terminal — ~/projects
                </span>
              </div>

              {/* Terminal Content */}
              <TerminalContent />
            </motion.div>

            {/* Discount Counter Below */}
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
            >
              <DiscountCounter />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
