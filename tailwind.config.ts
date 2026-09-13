import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
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
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
