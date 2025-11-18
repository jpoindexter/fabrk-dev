/**
 * ✅ FABRK COMPONENT
 * Testimonials Section - Customer testimonials with photos
 * Production-ready ✓
 *
 * EASY UPDATE: Add real customer testimonials to TESTIMONIALS array below
 */

"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

/**
 * TESTIMONIALS DATA - Easy to update!
 *
 * To add real testimonials:
 * 1. Get customer feedback and photos
 * 2. Add entries to TESTIMONIALS array below
 * 3. Replace placeholder images and names
 *
 * Example:
 * {
 *   id: "customer1",
 *   quote: "Fabrk saved us 3 months of development time...",
 *   author: "John Doe",
 *   role: "Founder & CEO",
 *   company: "StartupXYZ",
 *   image: "/testimonials/john-doe.jpg",
 *   rating: 5,
 * }
 */
const TESTIMONIALS: TestimonialProps[] = [];

interface TestimonialProps {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
  image,
  rating,
}: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      {/* Rating */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="size-4 fill-yellow-400 text-yellow-400"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mb-6">
        <p className="text-foreground">"{quote}"</p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={author}
          className="size-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">
            {role} at {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Join early adopters building with Fabrk
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Production-ready Next.js boilerplate trusted by indie developers and agencies worldwide
            </p>
          </div>

          {/* Testimonials Grid - Only show if testimonials exist */}
          {TESTIMONIALS.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((testimonial) => (
                <TestimonialCard key={testimonial.id} {...testimonial} />
              ))}
            </div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg border border-border bg-muted/50 p-6 text-center sm:p-8"
          >
            <p className="text-sm text-muted-foreground">
              Built by indie developers, for indie developers. Start shipping faster with 87 production-ready components.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
