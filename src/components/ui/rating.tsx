"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
}

export function Rating({
  rating = 0,
  onRatingChange,
  maxRating = 5,
  size = "md",
  readonly = false,
  disabled = false,
  showValue = false,
  className,
}: RatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const handleClick = (value: number) => {
    if (readonly || disabled) return;
    onRatingChange?.(value);
  };

  const handleMouseEnter = (value: number) => {
    if (readonly || disabled) return;
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              disabled={disabled}
              className={cn(
                "transition-all",
                !readonly && !disabled && "cursor-pointer hover:scale-110",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              <Star
                className={cn(
                  sizeMap[size],
                  "transition-all",
                  isFilled
                    ? "fill-primary text-primary"
                    : "fill-none text-muted-foreground"
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-bold text-muted-foreground ml-2">
          {rating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
}
