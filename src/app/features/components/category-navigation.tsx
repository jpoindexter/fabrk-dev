/**
 * ✅ FABRK COMPONENT
 * Category Navigation - Sticky navigation for feature categories
 * Production-ready ✓
 */

"use client";

import Link from "next/link";
import { FEATURE_CATEGORIES } from "./feature-data";

export function CategoryNavigation() {
  return (
    <section className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 py-4">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {FEATURE_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`#${category.id}`}
                className="flex items-center gap-2 whitespace-nowrap border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="size-4" />
                {category.title.split(' ')[0]}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
