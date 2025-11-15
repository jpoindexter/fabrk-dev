/**
 * ✅ FABRK COMPONENT
 * avatar-group component
 *
 * @example
 * ```tsx
 * <avatar-group />
 * ```
 */

/**
 * Avatar Group Component
 * Display multiple avatars with overlap
 */

"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: Array<{
    src?: string;
    alt?: string;
    fallback: string;
  }>;
  max?: number;
  size?: "sm" | "md" | "lg";
  overlap?: boolean;
  /**
   * Accessible label for the avatar group
   * @default "Avatar group"
   */
  "aria-label"?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, avatars = [], max = 4, size = "md", overlap = true, "aria-label": ariaLabel = "Avatar group", ...props }, ref) => {
    const displayAvatars = avatars.slice(0, max);
    const remainingCount = Math.max(0, avatars.length - max);

    return (
      <div
        data-slot="avatar-group"
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={cn("flex items-center", overlap ? "-space-x-3" : "space-x-2", className)}
        {...props}
      >
        {displayAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            className={cn(
              sizeClasses[size],
              overlap && "ring-2 ring-background",
              "transition-transform hover:z-10 hover:scale-110"
            )}
          >
            {avatar.src && <AvatarImage src={avatar.src} alt={avatar.alt || avatar.fallback} />}
            <AvatarFallback>{avatar.fallback}</AvatarFallback>
          </Avatar>
        ))}

        {remainingCount > 0 && (
          <div
            className={cn(
              sizeClasses[size],
              "flex items-center justify-center rounded-full border bg-card text-xs font-medium",
              overlap && "ring-2 ring-background"
            )}
            aria-label={`${remainingCount} more ${remainingCount === 1 ? "person" : "people"}`}
            role="img"
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
