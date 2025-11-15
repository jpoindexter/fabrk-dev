/**
 * ✅ FABRK COMPONENT
 * SimpleIcon - Renders SVG icons from simple-icons package
 *
 * @example
 * ```tsx
 * import { siReact } from 'simple-icons';
 * <SimpleIcon path={siReact.path} className="h-6 w-6" />
 * ```
 */

import { cn } from "@/lib/utils";

interface SimpleIconProps {
  path: string;
  className?: string;
  title?: string;
}

export function SimpleIcon({ path, className, title }: SimpleIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
    >
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  );
}
