import { clsx, type ClassValue } from "clsx";

// Simple class name merger for SCSS Modules
// Works with both string classes and SCSS Module objects
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
    .split(' ')
    .filter(Boolean)
    .join(' ');
}
