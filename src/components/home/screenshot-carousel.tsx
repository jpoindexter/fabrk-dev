/**
 * ✅ FABRK COMPONENT
 * Screenshot Carousel - Showcase product features with rotating carousel
 * Production-ready ✓
 *
 * EASY UPDATE: Replace screenshot URLs in the SCREENSHOTS array below
 */

"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * SCREENSHOT DATA - Easy to update!
 *
 * To add your screenshots:
 * 1. Upload images to /public/screenshots/
 * 2. Replace the placeholder URLs below with your image paths
 * 3. Update titles and descriptions as needed
 *
 * Example:
 * {
 *   id: "analytics",
 *   title: "Analytics Dashboard",
 *   description: "Real-time metrics and performance tracking",
 *   image: "/screenshots/analytics-dashboard.png",
 *   alt: "Analytics dashboard showing charts and KPIs"
 * }
 */
const SCREENSHOTS = [
  {
    id: "dashboard",
    title: "Team Dashboard",
    description: "Multi-tenant dashboard with real-time collaboration and RBAC",
    image: "https://via.placeholder.com/1200x675?text=Team+Dashboard",
    alt: "Team dashboard with organization management",
  },
  {
    id: "analytics",
    title: "Analytics & Reports",
    description: "Comprehensive analytics with charts, metrics, and data export",
    image: "https://via.placeholder.com/1200x675?text=Analytics+Dashboard",
    alt: "Analytics dashboard with revenue charts and KPIs",
  },
  {
    id: "components",
    title: "87 Production Components",
    description: "Complete UI library with variants, themes, and Storybook integration",
    image: "https://via.placeholder.com/1200x675?text=Components+Library",
    alt: "Component showcase with 87 production-ready UI components",
  },
  {
    id: "billing",
    title: "Billing & Subscriptions",
    description: "Stripe integration with invoicing, payment methods, and webhooks",
    image: "https://via.placeholder.com/1200x675?text=Billing+Page",
    alt: "Billing page with subscription management and invoice history",
  },
  {
    id: "admin",
    title: "Admin Panel",
    description: "Complete admin interface with user management and analytics",
    image: "https://via.placeholder.com/1200x675?text=Admin+Panel",
    alt: "Admin panel with user management table and controls",
  },
];

export function ScreenshotCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentScreenshot = SCREENSHOTS[currentIndex];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % SCREENSHOTS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? SCREENSHOTS.length - 1 : prev - 1
    );
  };

  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              See it in action
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Explore all the features that make Fabrk production-ready
            </p>
          </div>

          {/* Carousel */}
          <div className="space-y-6">
            {/* Main Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-lg border border-border bg-card shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={currentScreenshot.image}
                  alt={currentScreenshot.alt}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent px-6 py-6 sm:px-8">
                <h3 className="text-xl font-semibold text-foreground">
                  {currentScreenshot.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {currentScreenshot.description}
                </p>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              {/* Dots Navigation */}
              <div className="flex gap-2">
                {SCREENSHOTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to screenshot ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrow Controls */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prev}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={next}
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>

            {/* Counter */}
            <div className="text-center text-sm text-muted-foreground">
              {currentIndex + 1} of {SCREENSHOTS.length}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
