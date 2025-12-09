/**
 * Utility functions for the application
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 * This allows for conditional classes and proper merging of Tailwind utilities
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
