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
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
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

// Animated counter for timing values
function TimingCounter({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 800, bounce: 0 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => motionValue.set(value), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, motionValue, value, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `FIB[${Math.floor(latest)}]ms`;
      }
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>FIB[0]ms</span>;
}

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
                Building your SaaS
                <br />
                <span className="text-primary">just got unfairly easy.</span>
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
                  [0x03] fabrk_dashboard.exe │ PID:2584
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6">
                <div className="mb-6 font-mono text-xs text-muted-foreground">
                  <div>
                    │ &gt; <TypeWriter text="Initializing Fabrk dashboard..." delay={0.5} speed={25} showCursor />
                  </div>
                  <div className="mt-1">
                    │ &gt; <TypeWriter text="Loading components..." delay={1.5} speed={25} />{" "}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.3 }}
                      className="text-success"
                    >
                      [OK]
                    </motion.span>{" "}
                    <TimingCounter value={21} delay={2.3} />
                  </div>
                  <div className="mt-1">
                    │ &gt; <TypeWriter text="Connecting services..." delay={2.6} speed={25} />{" "}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.4 }}
                      className="text-success"
                    >
                      [OK]
                    </motion.span>{" "}
                    <TimingCounter value={34} delay={3.4} />
                  </div>
                  <div className="mt-1">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.7 }}
                    >
                      └─ System ready. Total: <TimingCounter value={55} delay={3.7} />
                    </motion.span>
                  </div>
                </div>

                {/* Dashboard Mock */}
                <div className="grid gap-3">
                  {[
                    { id: "0x04", name: "AUTH_MODULE", prefix: "│" },
                    { id: "0x05", name: "BILLING_MODULE", prefix: "│" },
                    { id: "0x06", name: "ORG_MODULE", prefix: "│" },
                    { id: "0x07", name: "EMAIL_MODULE", prefix: "└" },
                  ].map((module, idx) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 4.0 + idx * 0.2 }}
                      whileHover={{ x: 4, backgroundColor: "hsl(var(--muted))" }}
                      className="flex items-center justify-between border border-border bg-background p-3 transition-colors"
                    >
                      <span className="font-mono text-xs">{module.prefix} [{module.id}] {module.name}</span>
                      <motion.span
                        className="font-mono text-xs text-success"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      >
                        ■ ACTIVE
                      </motion.span>
                    </motion.div>
                  ))}
                </div>

                {/* Blinking Cursor */}
                <div className="mt-4 font-mono text-xs">
                  <span className="text-muted-foreground">
                    &gt; <TypeWriter text="Ready for deployment" delay={4.8} speed={40} />
                  </span>
                  <motion.span
                    className="ml-1 inline-block text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0, 1] }}
                    transition={{ delay: 5.6, duration: 1, repeat: Infinity }}
                  >
                    █
                  </motion.span>
                </div>
              </div>
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
