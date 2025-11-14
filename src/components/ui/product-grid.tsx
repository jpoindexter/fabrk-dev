/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - Error/loading states ✓
 *
 * @example
 * ```tsx
 * <ProductGrid />
 * ```
 */

"use client";

import { cn } from "@/lib/design-system/utils";
import * as React from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface ProductGridProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  products?: Product[];
  columns?: number;
}

export const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({ className, loading = false, error = false, products = [], columns = 4, ...props }, ref) => {
    if (loading) {
      return (
        <div
          data-slot="product-grid"
          ref={ref}
          className={cn(`grid grid-cols-2 md:grid-cols-${columns} gap-6`, className, "")}
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-2 aspect-square rounded border border-border bg-card" />
              <div className="mb-2 h-4 w-3/4 rounded border border-border bg-card" />
              <div className="h-4 w-1/2 rounded border border-border bg-card" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <div className={cn("text-destructive", className, "")}>Error loading products</div>;
    }

    return (
      <div
        ref={ref}
        className={cn(`grid grid-cols-2 md:grid-cols-${columns} gap-6`, className, "")}
        role="list"
        aria-label="Product grid"
        {...props}
      >
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer" role="listitem">
            <div className="mb-2 aspect-square overflow-hidden rounded border border-border bg-card">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-full object-cover transition-transform group-hover:scale-105"
                />
              )}
            </div>
            <h3 className="line-clamp-1 font-medium">{product.name}</h3>
            <p className="text-muted-foreground dark:text-muted-foreground">${product.price}</p>
          </div>
        ))}
      </div>
    );
  }
);
ProductGrid.displayName = "ProductGrid";
