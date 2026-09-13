import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Facilazo AI — Soluciones que te hacen la vida fácil",
  description:
    "Excel, software, apps, páginas web y automatizaciones de IA hechas a la medida de tu negocio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${baloo.variable} ${jakarta.variable} ${mono.variable}`}>
      <body className="grain font-body antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
