import { solutions, productLines, type Solution } from "./catalog";
import type { Locale } from "./i18n/dictionary";

export interface SearchResult {
  solution: Solution;
  score: number;
}

const ACCENT_MAP: Record<string, string> = {
  á: "a",
  é: "e",
  í: "i",
  ó: "o",
  ú: "u",
  ü: "u",
  ñ: "n",
};

function normalize(text: string): string {
  const lower = text.toLowerCase().trim();
  let result = "";
  for (const char of lower) {
    result += ACCENT_MAP[char] ?? char;
  }
  return result;
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

/**
 * Motor de coincidencia local: capa 1 del buscador de "dolores de cabeza".
 * No necesita ninguna clave de API ni conexión externa. Ver /api/ai-search
 * para la capa 2 (opcional, con IA real) que se puede activar más adelante.
 */
export function searchSolutions(query: string, locale: Locale, limit = 3): SearchResult[] {
  const normalizedQuery = normalize(query);
  if (normalizedQuery.length < 3) return [];

  const queryTokens = new Set(tokenize(query));

  const scored: SearchResult[] = solutions.map((solution) => {
    let score = 0;
    const phrases = solution.painPoints[locale];

    for (const phrase of phrases) {
      const normalizedPhrase = normalize(phrase);
      if (normalizedQuery.includes(normalizedPhrase) || normalizedPhrase.includes(normalizedQuery)) {
        score += 4;
        continue;
      }
      const phraseTokens = tokenize(phrase);
      const overlap = phraseTokens.filter((token) => queryTokens.has(token)).length;
      score += overlap;
    }

    const title = normalize(solution.title[locale]);
    if (normalizedQuery.length > 0 && title.includes(normalizedQuery)) score += 2;

    return { solution, score };
  });

  return scored
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function lineNameFor(lineId: string, locale: Locale): string {
  const line = productLines.find((candidate) => candidate.id === lineId);
  return line ? line.name[locale] : lineId;
}
