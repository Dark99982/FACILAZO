import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Tokens de shadcn/ui, mapeados a la paleta de marca vía CSS vars
        // (definidas en app/globals.css). Los colores terracota/ambar/navy/crema
        // de abajo siguen siendo la fuente de verdad para el resto del sitio.
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        terracota: {
          DEFAULT: "#D9603B",
          50: "#FCEEE8",
          100: "#F8DBCE",
          300: "#E89A7C",
          500: "#D9603B",
          600: "#BE4C2A",
          700: "#973B21",
        },
        ambar: {
          DEFAULT: "#F2B441",
          100: "#FCEBC7",
          300: "#F6CE7F",
          500: "#F2B441",
          600: "#D89A28",
        },
        navy: {
          DEFAULT: "#1F3A5F",
          400: "#345580",
          500: "#1F3A5F",
          600: "#162B47",
          700: "#0F1F33",
          900: "#0A1522",
        },
        crema: {
          DEFAULT: "#FBF3EA",
          100: "#FFFDFB",
          200: "#FBF3EA",
          300: "#F3E6D5",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        "8xl": "1400px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "orbit-spin": {
          "0%": { transform: "rotateZ(0deg)" },
          "100%": { transform: "rotateZ(360deg)" },
        },
        "orbit-spin-reverse": {
          "0%": { transform: "rotateZ(360deg)" },
          "100%": { transform: "rotateZ(0deg)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 28s linear infinite",
        "orbit-spin": "orbit-spin 38s linear infinite",
        "orbit-spin-reverse": "orbit-spin-reverse 26s linear infinite",
        scanline: "scanline 3.2s cubic-bezier(0.65,0,0.35,1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
