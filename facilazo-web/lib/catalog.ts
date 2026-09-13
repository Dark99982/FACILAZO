// Catálogo central de Facilazo AI.
// Para agregar un proyecto o línea nueva: agrega un objeto más a la lista
// correspondiente. No hace falta tocar ningún otro archivo.

export type Bilingual = { es: string; en: string };

export interface ProductLine {
  id: string;
  name: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  examples: Bilingual[];
  accent: "terracota" | "ambar" | "navy";
}

export interface Solution {
  id: string;
  lineId: ProductLine["id"];
  title: Bilingual;
  summary: Bilingual;
  /** Palabras y frases que un cliente real usaría para describir este dolor de cabeza. */
  painPoints: { es: string[]; en: string[] };
}

export interface PortfolioItem {
  id: string;
  name: Bilingual;
  category: Bilingual;
  description: Bilingual;
  /** true = ya tenemos captura/foto real que mostrar; false = placeholder marcado. */
  hasRealMedia: boolean;
}

export interface PricingTier {
  lineId: ProductLine["id"];
  rangeLabel: Bilingual;
  note: Bilingual;
}

export const productLines: ProductLine[] = [
  {
    id: "excel",
    name: { es: "Excel y automatización de hojas", en: "Excel & spreadsheet automation" },
    tagline: {
      es: "Tus números, sin que se te vayan las horas en fórmulas.",
      en: "Your numbers, without losing hours to formulas.",
    },
    description: {
      es: "Plantillas y macros hechas a la medida de tu negocio: calculan, ordenan y avisan por ti.",
      en: "Templates and macros built around your business: they calculate, sort, and alert for you.",
    },
    examples: [
      { es: "Calculadora de IR para planilla", en: "Payroll income-tax calculator" },
      { es: "Cotizador automático", en: "Automatic quote builder" },
      { es: "Control de caja diario", en: "Daily cash-register control" },
      { es: "Control de inventario con alertas", en: "Inventory control with alerts" },
    ],
    accent: "ambar",
  },
  {
    id: "software",
    name: { es: "Software a medida", en: "Custom software" },
    tagline: {
      es: "Un sistema hecho para cómo trabajas vos, no al revés.",
      en: "A system built around how you work, not the other way around.",
    },
    description: {
      es: "Aplicaciones de escritorio para gestionar ventas, inventario y caja sin depender de internet.",
      en: "Desktop applications to manage sales, inventory, and cash flow without depending on the internet.",
    },
    examples: [
      { es: "Punto de venta para tu negocio", en: "Point of sale for your business" },
      { es: "Control de rutas y entregas", en: "Route and delivery tracking" },
      { es: "Recibos y contratos automáticos", en: "Automatic receipts and contracts" },
    ],
    accent: "navy",
  },
  {
    id: "apps",
    name: { es: "Apps", en: "Apps" },
    tagline: {
      es: "Lo que antes hacías con papel, ahora en el bolsillo.",
      en: "What used to run on paper, now in your pocket.",
    },
    description: {
      es: "Aplicaciones móviles y web para que tus clientes o tu equipo hagan más desde el teléfono.",
      en: "Mobile and web apps so your customers or your team can do more from their phone.",
    },
    examples: [
      { es: "Turnos y citas", en: "Appointments & scheduling" },
      { es: "Punto de venta web con asistente de voz", en: "Web POS with a voice assistant" },
      { es: "Seguimiento de pedidos", en: "Order tracking" },
    ],
    accent: "terracota",
  },
  {
    id: "web",
    name: { es: "Páginas web", en: "Websites" },
    tagline: {
      es: "Tu negocio, encontrable y creíble en internet.",
      en: "Your business, findable and credible online.",
    },
    description: {
      es: "Sitios rápidos, claros y hechos para convertir visitas en clientes, no solo para verse bonitos.",
      en: "Fast, clear sites built to turn visits into customers, not just to look pretty.",
    },
    examples: [
      { es: "Sitio de presentación de tu negocio", en: "Business presentation site" },
      { es: "Catálogo de productos en línea", en: "Online product catalog" },
      { es: "Landing page para una campaña", en: "Landing page for a campaign" },
    ],
    accent: "ambar",
  },
  {
    id: "ia",
    name: { es: "Automatizaciones de IA a medida", en: "Custom AI automation" },
    tagline: {
      es: "La parte repetitiva, resuelta por una IA que trabaja para vos.",
      en: "The repetitive part, handled by an AI that works for you.",
    },
    description: {
      es: "Desde asistentes de WhatsApp hasta indicadores y robots de trading, hechos a la medida de un caso real.",
      en: "From WhatsApp assistants to trading indicators and bots, built around a real use case.",
    },
    examples: [
      { es: "Asistente de WhatsApp con IA", en: "AI WhatsApp assistant" },
      { es: "Indicador de trading (Pine Script)", en: "Trading indicator (Pine Script)" },
      { es: "Robot de trading (MQL5)", en: "Trading bot (MQL5)" },
    ],
    accent: "navy",
  },
];

export const solutions: Solution[] = [
  {
    id: "sol-inventario",
    lineId: "excel",
    title: { es: "Control de inventario que no se te va de las manos", en: "Inventory that doesn't get away from you" },
    summary: {
      es: "Una hoja o sistema que te avisa cuándo algo se está por acabar, sin que tengas que contar todo a mano.",
      en: "A sheet or system that warns you before something runs out, without counting everything by hand.",
    },
    painPoints: {
      es: ["se me pierde el inventario", "no sé qué me queda", "se me acaba el producto sin avisar", "control de inventario", "control de stock"],
      en: ["i lose track of inventory", "i don't know what's left", "stock runs out without warning", "inventory control"],
    },
  },
  {
    id: "sol-caja",
    lineId: "excel",
    title: { es: "Control de caja diario sin dolores de cabeza", en: "Daily cash control without headaches" },
    summary: {
      es: "Sabé cuánto entró, cuánto salió y cuánto debería haber, todos los días, sin cuadrar todo a mano.",
      en: "Know what came in, what went out, and what should be left, every day, without reconciling by hand.",
    },
    painPoints: {
      es: ["no cuadra la caja", "control de caja", "se me pierde el dinero", "no sé cuánto vendí"],
      en: ["cash register doesn't add up", "cash control", "i don't know how much i sold"],
    },
  },
  {
    id: "sol-planilla",
    lineId: "excel",
    title: { es: "Cálculo de planilla e IR sin errores", en: "Error-free payroll and income tax" },
    summary: {
      es: "La retención se calcula sola según la tabla progresiva, sin hacerlo a mano cada mes.",
      en: "Withholding is calculated automatically from the tax table, no manual work every month.",
    },
    painPoints: {
      es: ["calcular planilla a mano", "calcular ir", "impuesto sobre la renta", "se me complica la planilla"],
      en: ["calculating payroll by hand", "income tax calculation", "payroll is a headache"],
    },
  },
  {
    id: "sol-pos",
    lineId: "apps",
    title: { es: "Vender más rápido en el mostrador", en: "Sell faster at the counter" },
    summary: {
      es: "Un punto de venta simple, hasta con asistente de voz, para cobrar sin perder tiempo ni clientes.",
      en: "A simple point of sale, even with a voice assistant, so you charge without losing time or customers.",
    },
    painPoints: {
      es: ["se me hace fila en la caja", "necesito un punto de venta", "cobrar más rápido", "vender rápido"],
      en: ["long checkout lines", "i need a point of sale", "sell faster"],
    },
  },
  {
    id: "sol-entregas",
    lineId: "software",
    title: { es: "Rutas y entregas bajo control", en: "Routes and deliveries under control" },
    summary: {
      es: "Sabé quién entrega qué, dónde y cuándo, sin depender de mensajes de WhatsApp sueltos.",
      en: "Know who delivers what, where and when, without relying on loose WhatsApp messages.",
    },
    painPoints: {
      es: ["se me pierden las entregas", "control de rutas", "no sé dónde va cada pedido"],
      en: ["deliveries get lost", "route control", "i don't know where each order is"],
    },
  },
  {
    id: "sol-sitio",
    lineId: "web",
    title: { es: "Un sitio que de verdad traiga clientes", en: "A site that actually brings customers" },
    summary: {
      es: "Presentación clara de tu negocio en internet, pensada para convertir visitas en mensajes reales.",
      en: "A clear presentation of your business online, built to turn visits into real messages.",
    },
    painPoints: {
      es: ["no aparezco en internet", "necesito una página web", "no tengo página", "quiero vender en línea"],
      en: ["i'm not online", "i need a website", "i don't have a site", "i want to sell online"],
    },
  },
  {
    id: "sol-whatsapp",
    lineId: "ia",
    title: { es: "Un asistente que responde por vos en WhatsApp", en: "An assistant that answers for you on WhatsApp" },
    summary: {
      es: "Responde preguntas frecuentes y separa a los clientes listos para comprar, incluso fuera de horario.",
      en: "Answers frequent questions and flags ready-to-buy customers, even outside business hours.",
    },
    painPoints: {
      es: ["no me alcanza el tiempo para responder", "asistente de whatsapp", "atender clientes por whatsapp", "responder mensajes"],
      en: ["i don't have time to reply", "whatsapp assistant", "answering customers on whatsapp"],
    },
  },
  {
    id: "sol-trading",
    lineId: "ia",
    title: { es: "Estrategias de trading que operan solas", en: "Trading strategies that run on their own" },
    summary: {
      es: "Indicadores y robots hechos a la medida de tu propia estrategia, no una plantilla genérica.",
      en: "Indicators and bots built around your own strategy, not a generic template.",
    },
    painPoints: {
      es: ["indicador de trading", "automatizar mi estrategia", "robot de trading", "ea mql5", "pine script"],
      en: ["trading indicator", "automate my strategy", "trading bot", "mql5 ea"],
    },
  },
];

export const portfolio: PortfolioItem[] = [
  {
    id: "pulperiapro-desktop",
    name: { es: "PulperíaPro (escritorio)", en: "PulperíaPro (desktop)" },
    category: { es: "Software a medida", en: "Custom software" },
    description: {
      es: "Aplicación de escritorio para Windows que gestiona ventas, inventario y caja de un negocio familiar.",
      en: "A Windows desktop application that manages sales, inventory, and cash flow for a family business.",
    },
    hasRealMedia: false,
  },
  {
    id: "pulperiapro-pos-web",
    name: { es: "PulperíaPro POS (web)", en: "PulperíaPro POS (web)" },
    category: { es: "App", en: "App" },
    description: {
      es: "Punto de venta web con asistente de voz con IA para cobrar más rápido en el mostrador.",
      en: "A web point of sale with an AI voice assistant, for faster checkout at the counter.",
    },
    hasRealMedia: false,
  },
  {
    id: "niffe-indicator",
    name: { es: "N.I.F.F.E.", en: "N.I.F.F.E." },
    category: { es: "Automatización de IA", en: "AI automation" },
    description: {
      es: "Indicador de trading a la medida en Pine Script (TradingView).",
      en: "A custom trading indicator in Pine Script (TradingView).",
    },
    hasRealMedia: false,
  },
  {
    id: "niffe-ea",
    name: { es: "N.I.F.F.E. EA", en: "N.I.F.F.E. EA" },
    category: { es: "Automatización de IA", en: "AI automation" },
    description: {
      es: "Conversión del indicador N.I.F.F.E. a un robot de trading en MQL5.",
      en: "A conversion of the N.I.F.F.E. indicator into an MQL5 trading bot.",
    },
    hasRealMedia: false,
  },
];

// Datos de contacto reales. Se dejan en null hasta que se confirmen —
// no se inventa ningún número, correo o usuario de red social.
export const contactInfo: {
  whatsapp: string | null; // formato: "50588887777" (sin espacios ni +)
  email: string | null;
  social: { label: string; url: string }[];
} = {
  whatsapp: null,
  email: null,
  social: [],
};

export const pricingTiers: PricingTier[] = productLines.map((line) => ({
  lineId: line.id,
  rangeLabel: { es: "A confirmar", en: "To be confirmed" },
  note: {
    es: "El precio depende del alcance de tu proyecto. Te lo confirmamos en la cotización.",
    en: "Price depends on your project's scope. We'll confirm it in your quote.",
  },
}));
