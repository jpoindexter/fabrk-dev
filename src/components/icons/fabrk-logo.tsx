/**
 * ✅ FABRK LOGO COMPONENT
 * Simple SVG logo component for Fabrk
 *
 * @example
 * ```tsx
 * <FabrkLogo className="h-8 w-8" />
 * ```
 */

import * as React from "react";
import { cn } from "@/lib/design-system/utils";

export interface FabrkLogoProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
}

const FabrkLogo = React.forwardRef<SVGSVGElement, FabrkLogoProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={cn("size-6", className)}
      fill="currentColor"
      {...props}
    >
      {/* Geometric Fabrk logo mark */}
      <defs>
        <linearGradient id="fabrkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Main geometric shape - stylized F */}
      <path
        d="M 50 40 L 100 40 L 100 60 L 70 60 L 70 100 L 95 100 L 95 120 L 70 120 L 70 160 L 50 160 Z"
        fill="url(#fabrkGradient)"
      />

      {/* Secondary accent - stylized bracket */}
      <path
        d="M 120 40 L 140 40 L 140 60 L 130 60 L 130 140 L 140 140 L 140 160 L 120 160 Z"
        fill="currentColor"
        opacity="0.6"
      />

      {/* Connector dot */}
      <circle cx="155" cy="100" r="6" fill="currentColor" opacity="0.8" />
    </svg>
  )
);

FabrkLogo.displayName = "FabrkLogo";

export { FabrkLogo };
