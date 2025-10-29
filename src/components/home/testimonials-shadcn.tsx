/**
 * ✅ FABRK COMPONENT
 * Testimonials Section - Shadcn/ui style user quotes
 * Production-ready ✓
 */

"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Fabrk has completely transformed how we build UIs. The components are beautiful, accessible, and just work out of the box.",
    author: "Alex Rivera",
    role: "Frontend Lead",
    company: "TechCorp",
    avatar: "AR",
  },
  {
    quote:
      "The best component library I&apos;ve used. Saved our team countless hours and the code quality is exceptional.",
    author: "Sarah Chen",
    role: "Engineering Manager",
    company: "Startup Inc",
    avatar: "SC",
  },
  {
    quote:
      "Finally, a component library that doesn&apos;t get in the way. Copy, paste, customize. That&apos;s it.",
    author: "Michael Johnson",
    role: "Solo Developer",
    company: "Indie Maker",
    avatar: "MJ",
  },
  {
    quote:
      "The attention to detail is incredible. Every component feels polished and production-ready from day one.",
    author: "Emily Watson",
    role: "Design Engineer",
    company: "Creative Co",
    avatar: "EW",
  },
  {
    quote:
      "We shipped our MVP in half the time thanks to Fabrk. The components are exactly what we needed.",
    author: "David Kim",
    role: "CTO",
    company: "SaaS Startup",
    avatar: "DK",
  },
  {
    quote:
      "The best investment we made for our design system. Our whole team loves working with these components.",
    author: "Lisa Martinez",
    role: "Product Designer",
    company: "Enterprise Corp",
    avatar: "LM",
  },
];

export function TestimonialsShadcn() {
  return (
    <section aria-label="User testimonials" className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-white py-24 sm:py-32">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Loved by developers worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of developers building better products with Fabrk.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="flex h-full flex-col border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-medium text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
