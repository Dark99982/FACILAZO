import { es } from "./es";
import { en } from "./en";

export type Locale = "es" | "en";

export const dictionaries = { es, en };

export type Dictionary = typeof es;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
