/**
 * Design System Utilities
 * Simple utility functions - NO complex design system
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 * Same as cn utility but in design-system namespace
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
