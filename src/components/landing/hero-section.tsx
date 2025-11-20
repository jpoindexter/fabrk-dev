"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SimpleIcon } from "@/components/ui/simple-icon";
import { motion } from "framer-motion";
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siStripe,
  siAuth0,
  siResend,
} from "simple-icons";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Massive Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Ship Your SaaS in 48 Hours, Not 4 Weeks
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-12 max-w-2xl text-lg font-normal leading-relaxed text-muted-foreground sm:text-xl"
          >
            Stop wrestling with complex setups. Fabrk gives you{" "}
            <span className="font-medium text-foreground">
              100 production-ready components
            </span>
            , authentication, payments, and everything you need. Ship your SaaS in{" "}
            <span className="font-medium text-foreground">
              days, not weeks
            </span>.
          </motion.p>

          {/* Primary CTA - Scroll to pricing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="#pricing">
              <Button size="xl" className="text-lg">
                Get Fabrk
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof with Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            {/* Avatar Stack */}
            <div className="flex -space-x-2">
              {[
                { initials: "JD", bgColor: "bg-primary", textColor: "text-primary-foreground" },
                { initials: "SK", bgColor: "bg-accent", textColor: "text-accent-foreground" },
                { initials: "AM", bgColor: "bg-secondary", textColor: "text-secondary-foreground" },
                { initials: "TC", bgColor: "bg-primary/80", textColor: "text-primary-foreground" },
                { initials: "+95", bgColor: "bg-muted", textColor: "text-muted-foreground" },
              ].map((avatar, idx) => (
                <motion.div
                  key={avatar.initials}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.05 }}
                  className={`h-10 w-10 rounded-full border-2 border-background ${avatar.bgColor} flex items-center justify-center ${avatar.textColor} font-medium text-xs shadow-sm`}
                >
                  {avatar.initials}
                </motion.div>
              ))}
            </div>

            {/* Text */}
            <p className="text-sm font-medium text-muted-foreground">
              Join 100+ developers who ship faster.
            </p>
          </motion.div>

          {/* Tech Stack - A Modern Stack You Can Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-center text-lg font-semibold text-foreground">
              A Modern Stack You Can Trust.
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
              {[
                { name: "Next.js", path: siNextdotjs.path },
                { name: "React", path: siReact.path },
                { name: "Tailwind CSS", path: siTailwindcss.path },
                { name: "Prisma", path: siPrisma.path },
                { name: "Stripe", path: siStripe.path },
                { name: "NextAuth", path: siAuth0.path },
                { name: "Resend", path: siResend.path },
              ].map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.05 }}
                  className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                >
                  <SimpleIcon
                    path={tech.path}
                    className="h-6 w-6 text-foreground transition-colors group-hover:text-primary"
                  />
                  <span className="text-xs font-medium text-muted-foreground">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
