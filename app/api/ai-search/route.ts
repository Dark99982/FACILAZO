import { NextRequest, NextResponse } from "next/server";
import { solutions } from "@/lib/catalog";

export const runtime = "nodejs";

/**
 * Capa 2 (opcional) del buscador de "dolores de cabeza": recomendación en
 * lenguaje natural usando un modelo de IA real, para cuando la Capa 1
 * (coincidencia local de palabras clave, ver lib/search.ts) no alcance.
 *
 * No hace nada mientras no se configuren estas dos variables de entorno
 * en Vercel (Project Settings → Environment Variables):
 *   - ANTHROPIC_API_KEY  → tu clave de la API de Anthropic
 *   - ANTHROPIC_MODEL    → el identificador de modelo que quieras usar
 *     (revisá el modelo vigente en la documentación de Anthropic al
 *     momento de activar esto; los identificadores de modelo cambian
 *     con el tiempo y no se fija ninguno por defecto aquí a propósito).
 *
 * El frontend (components/SearchBar.tsx) no llama a esta ruta todavía:
 * usa solo la Capa 1. Conectar esta ruta es un cambio deliberado a futuro,
 * no algo que se activa solo.
 */
export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL;

  if (!apiKey || !model) {
    return NextResponse.json(
      {
        available: false,
        reason:
          "ANTHROPIC_API_KEY y/o ANTHROPIC_MODEL no están configurados. Esta ruta queda inactiva hasta que se agreguen en Vercel.",
      },
      { status: 501 }
    );
  }

  let body: { query?: string; locale?: "es" | "en" };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ available: true, error: "JSON inválido en el body." }, { status: 400 });
  }

  const query = (body.query ?? "").slice(0, 500);
  const locale = body.locale === "en" ? "en" : "es";

  if (query.trim().length < 3) {
    return NextResponse.json({ available: true, results: [] });
  }

  const catalogForPrompt = solutions.map((solution) => ({
    id: solution.id,
    lineId: solution.lineId,
    title: solution.title[locale],
    summary: solution.summary[locale],
  }));

  const systemPrompt =
    locale === "en"
      ? "You help match a visitor's described problem to the closest solutions from Facilazo AI's catalog. Reply ONLY with compact JSON: {\"matches\": [{\"id\": string, \"reason\": string}]}, at most 3 matches, ids must come from the given catalog, reason under 20 words."
      : "Ayudás a emparejar el problema que describe un visitante con las soluciones más cercanas del catálogo de Facilazo AI. Respondé SOLO con JSON compacto: {\"matches\": [{\"id\": string, \"reason\": string}]}, máximo 3 coincidencias, los ids deben venir del catálogo dado, reason en menos de 20 palabras.";

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 400,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Catálogo: ${JSON.stringify(catalogForPrompt)}\n\nProblema del visitante: "${query}"`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { available: true, error: `Anthropic API error: ${errorText}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const textBlock = data?.content?.find((block: { type: string }) => block.type === "text");
    const raw = textBlock?.text ?? "{}";

    let parsed: { matches?: { id: string; reason: string }[] };
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { matches: [] };
    }

    return NextResponse.json({ available: true, results: parsed.matches ?? [] });
  } catch (error) {
    return NextResponse.json(
      { available: true, error: error instanceof Error ? error.message : "Error desconocido." },
      { status: 500 }
    );
  }
}
