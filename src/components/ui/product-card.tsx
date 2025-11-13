/**
 * ✅ FABRK COMPONENT
 * Product Card component for e-commerce displays.
 * Features: image hover, pricing, ratings, stock status, quick actions.
 *
 * @example
 * ```tsx
 * <ProductCard
 *   product={product}
 *   onAddToCart={(p) => console.log('Add to cart:', p)}
 *   showRating={true}
 * />
 * ```
 */

import * as React from "react";
import { ShoppingCart, Eye, Heart, Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  hoverImage?: string;
  price: number;
  salePrice?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  badge?: { text: string; variant: "new" | "sale" | "hot" };
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
  showRating?: boolean;
  showStock?: boolean;
  variant?: "default" | "compact";
  className?: string;
}

// Price formatting utility
export function formatPrice(
  price: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

// Star rating component with half-star support
function StarRating({ rating = 0, max = 5 }: { rating?: number; max?: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />
    );
  }

  if (hasHalfStar && fullStars < max) {
    stars.push(
      <StarHalf key="half" className="h-4 w-4 fill-primary text-primary" />
    );
  }

  const emptyStars = max - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className="h-4 w-4 text-muted-foreground/30"
      />
    );
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
}

// Stock status component with color coding
function StockStatus({ stock = 0 }: { stock?: number }) {
  if (stock === 0) {
    return (
      <Badge variant="outline" className="border-destructive text-destructive">
        Out of Stock
      </Badge>
    );
  }

  if (stock <= 5) {
    return (
      <Badge variant="accent" className="bg-accent/20 text-accent-foreground">
        Low Stock ({stock} left)
      </Badge>
    );
  }

  return (
    <Badge variant="accent" className="bg-accent/20 text-accent-foreground">
      In Stock
    </Badge>
  );
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      product,
      onAddToCart,
      onQuickView,
      onToggleFavorite,
      isFavorite = false,
      showRating = true,
      showStock = true,
      variant = "default",
      className,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    const currentImage =
      isHovered && product.hoverImage ? product.hoverImage : product.image;

    const discountPercentage = product.salePrice
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

    const isOutOfStock = product.stock === 0;

    const isCompact = variant === "compact";

    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-brutal border-2 border-brutal bg-card shadow-brutal transition-all duration-200 hover:shadow-brutal-lg",
          isCompact ? "max-w-[280px]" : "max-w-sm",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge overlay */}
        {product.badge && (
          <div className="absolute left-3 top-3 z-10">
            <Badge
              variant={
                product.badge.variant === "new"
                  ? "accent"
                  : product.badge.variant === "sale"
                    ? "secondary"
                    : "default"
              }
              className="shadow-brutal-lg"
            >
              {product.badge.text}
            </Badge>
          </div>
        )}

        {/* Discount badge */}
        {product.salePrice && discountPercentage > 0 && (
          <div className="absolute right-3 top-3 z-10">
            <Badge
              variant="default"
              className="bg-destructive text-destructive-foreground shadow-brutal-lg"
            >
              -{discountPercentage}%
            </Badge>
          </div>
        )}

        {/* Product image */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            isCompact ? "aspect-square" : "aspect-[4/3]"
          )}
        >
          <img
            src={imageError ? "/placeholder.png" : currentImage}
            alt={product.name}
            onError={() => setImageError(true)}
            className={cn(
              "h-full w-full object-cover transition-transform duration-300",
              isHovered && "scale-110"
            )}
          />

          {/* Action buttons on hover */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center gap-2 bg-background/80 backdrop-blur-sm transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            {onQuickView && (
              <Button
                size="icon"
                variant="outline"
                onClick={() => onQuickView(product)}
                className="h-10 w-10"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}

            {onToggleFavorite && (
              <Button
                size="icon"
                variant="outline"
                onClick={() => onToggleFavorite(product)}
                className="h-10 w-10"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isFavorite && "fill-destructive text-destructive"
                  )}
                />
              </Button>
            )}
          </div>
        </div>

        {/* Product details */}
        <div className={cn("p-4", isCompact && "p-3")}>
          {/* Name and description */}
          <div className="mb-3">
            <h3
              className={cn(
                "font-bold text-foreground line-clamp-1",
                isCompact ? "text-sm" : "text-base"
              )}
            >
              {product.name}
            </h3>
            <p
              className={cn(
                "mt-1 text-muted-foreground line-clamp-2",
                isCompact ? "text-xs" : "text-sm"
              )}
            >
              {product.description}
            </p>
          </div>

          {/* Rating */}
          {showRating && product.rating !== undefined && (
            <div className="mb-3 flex items-center gap-2">
              <StarRating rating={product.rating} />
              {product.reviewCount !== undefined && (
                <span className="text-xs text-muted-foreground">
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Stock status */}
          {showStock && product.stock !== undefined && (
            <div className="mb-3">
              <StockStatus stock={product.stock} />
            </div>
          )}

          {/* Price and add to cart */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              {product.salePrice ? (
                <>
                  <span
                    className={cn(
                      "font-bold text-destructive",
                      isCompact ? "text-lg" : "text-xl"
                    )}
                  >
                    {formatPrice(product.salePrice, product.currency)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.price, product.currency)}
                  </span>
                </>
              ) : (
                <span
                  className={cn(
                    "font-bold text-foreground",
                    isCompact ? "text-lg" : "text-xl"
                  )}
                >
                  {formatPrice(product.price, product.currency)}
                </span>
              )}
            </div>

            {onAddToCart && (
              <Button
                size={isCompact ? "sm" : "default"}
                onClick={() => onAddToCart(product)}
                disabled={isOutOfStock}
                className="shrink-0"
              >
                <ShoppingCart className="h-4 w-4" />
                {!isCompact && <span className="ml-1">Add</span>}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard, StarRating, StockStatus };
