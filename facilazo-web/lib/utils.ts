import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind sin colisiones (patrón estándar de shadcn/ui).
 * clsx arma la lista condicional, tailwind-merge resuelve conflictos
 * (ej. "px-2" vs "px-4" gana el último).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
