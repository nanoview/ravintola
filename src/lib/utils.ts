import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Use only one cn function to avoid redeclaration errors
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
