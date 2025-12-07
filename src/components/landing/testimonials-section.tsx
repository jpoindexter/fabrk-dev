/* 💡 COPY TIP: Replace these testimonials with real customer quotes!
 * Authentic testimonials convert 3-5x better than generic ones.
 * Include specific results (e.g., "saved 40 hours") when possible.
 */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Fabrk isn't just a boilerplate; it's a launch accelerator. We cut development time by 60% and achieved a perfect Lighthouse score. The attention to detail is unmatched.",
      author: "Lena Petrova",
      role: "CTO, Ascent Systems",
      initials: "LP",
      color: "bg-primary text-primary-foreground",
    },
    {
      quote:
        "The integrated payment and authentication systems alone saved us months of work. Fabrk allowed our small team to compete with much larger players from day one.",
      author: "Ben Carter",
      role: "Founder, InsightFlow",
      initials: "BC",
      color: "bg-accent text-accent-foreground",
    },
    {
      quote:
        "Accessibility was a huge concern for our project. Fabrk's WCAG-compliant components and robust testing framework ensured we met all our compliance goals effortlessly.",
      author: "Chloe Davis",
      role: "Lead UX Designer, EquiApp",
      initials: "CD",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      quote:
        "From unit tests to E2E, the testing infrastructure is comprehensive. This dramatically increased our confidence in deployments and reduced post-launch bugs.",
      author: "Omar Hassan",
      role: "Senior Software Engineer, DataPulse",
      initials: "OH",
      color: "bg-primary text-primary-foreground",
    },
    {
      quote:
        "The documentation is a goldmine. Every component, every feature, every setup step is meticulously explained. It made onboarding new developers incredibly smooth.",
      author: "Mia Rodriguez",
      role: "Engineering Manager, InnovateX",
      initials: "MR",
      color: "bg-accent text-accent-foreground",
    },
    {
      quote:
        "We needed a platform that scaled with us. Fabrk's clean architecture and performance optimizations mean we haven't hit a bottleneck yet, even with rapid user growth.",
      author: "Daniel Lee",
      role: "CEO, GrowthWave Analytics",
      initials: "DL",
      color: "bg-secondary text-secondary-foreground",
    },
  ];

  return (
    <section className={cn(mode.font, "border-border bg-background border-t px-6 py-24")}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-muted-foreground text-xs">[0x00]</span>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">LOVED_BY_DEVELOPERS</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground text-sm">&gt; Early access customer feedback</p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="group hover:border-primary/50 transition-colors"
            >
              <Card>
                <CardHeader
                  code={`0x${(index + 1).toString(16).toUpperCase().padStart(2, "0")}`}
                  title="TESTIMONIAL"
                  icon={
                    <Avatar className={cn(mode.radius, "h-6 w-6")}>
                      <AvatarFallback
                        className={cn(
                          mode.radius,
                          "bg-primary/10 text-primary text-[10px] font-medium"
                        )}
                      >
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                  }
                />
                <CardContent>
                  <div className="mb-4 text-xs">
                    <span className="text-muted-foreground">QUOTE: </span>
                    <span className="text-foreground">"{testimonial.quote}"</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">AUTHOR: </span>
                    <span className="text-foreground font-semibold">
                      {testimonial.author.toUpperCase().replace(/ /g, "_")}
                    </span>
                    <span className="text-muted-foreground"> | {testimonial.role}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
