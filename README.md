# Facilazo AI — sitio web

Sitio de marketing de Facilazo AI: portada con buscador de "dolores de cabeza", líneas
de producto, portafolio, precios de referencia, condiciones de uso/entrega y contacto.
Español e inglés con selector. Construido con Next.js 14 (App Router) + Tailwind CSS,
listo para desplegar en Vercel.

## Cómo desplegar en Vercel

1. Subí esta carpeta a un repositorio de GitHub (o subila directo a Vercel con
   `vercel` desde la terminal, sin necesidad de GitHub).
2. En [vercel.com](https://vercel.com), "Add New… → Project" e importá el repositorio.
   Vercel detecta que es Next.js automáticamente — no hace falta configurar nada más.
3. Vercel te da un subdominio gratis (`algo.vercel.app`) de inmediato. Cuando tengas
   el dominio final (facilazo.ai / .com.ni), lo agregás en Project Settings → Domains,
   sin volver a tocar el código.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

## Qué falta agregar (información real de la empresa)

Todo lo siguiente vive en **un solo archivo**, `lib/catalog.ts`, para que sea fácil de
actualizar sin tocar el resto del proyecto:

- `contactInfo` — número de WhatsApp (formato `50588887777`, sin `+` ni espacios),
  correo de contacto, y redes sociales. Mientras estén en `null` / vacío, el sitio
  muestra "Próximamente" en vez de inventar un dato.
- `portfolio` — poné `hasRealMedia: true` y agregá la imagen real en cada proyecto
  cuando tengas las capturas (por ahora se muestra un marcador visual, nunca una
  captura falsa).
- `pricingTiers` — cambiá `rangeLabel` por el rango real cuando esté confirmado por
  línea de producto.

Las condiciones de uso/entrega (revisiones incluidas, anticipo/saldo, plazos, forma de
pago) están en `lib/i18n/es.ts` y `lib/i18n/en.ts`, dentro de `terms.pendingNote` — hay
que reemplazar ese texto una vez estén definidas por escrito.

## Agregar un proyecto nuevo al portafolio o una línea de producto nueva

Abrí `lib/catalog.ts` y agregá un objeto más al arreglo correspondiente
(`portfolio`, `productLines` o `solutions`). No hace falta tocar ningún componente:
las secciones se generan solas a partir de esos datos. Recordá completar los campos
`es` y `en` de cada texto.

## Buscador de "dolores de cabeza"

- **Capa 1 (activa por defecto):** coincidencia local por palabras clave/sinónimos
  contra `lib/catalog.ts` → `solutions[].painPoints`. No necesita configuración ni
  clave de API — funciona apenas se despliega.
- **Capa 2 (opcional, apagada por defecto):** recomendación con un modelo de IA real
  vía `app/api/ai-search/route.ts`. Para activarla:
  1. Configurá `ANTHROPIC_API_KEY` y `ANTHROPIC_MODEL` en Vercel → Project Settings →
     Environment Variables (revisá el identificador de modelo vigente en la
     documentación de Anthropic al momento de activarla).
  2. Conectá `components/SearchBar.tsx` a esa ruta (hoy solo usa la Capa 1).

## Idioma

El selector ES/EN vive en `components/LanguageToggle.tsx`. Todos los textos fijos
están en `lib/i18n/es.ts` y `lib/i18n/en.ts`; el contenido del catálogo (`lib/catalog.ts`)
tiene sus propios campos `es`/`en` por cada texto.
