import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductLines } from "@/components/ProductLines";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import { Terms } from "@/components/Terms";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductLines />
        <Portfolio />
        <Pricing />
        <Terms />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
