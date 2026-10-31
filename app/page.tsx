import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import dynamic from "next/dynamic";

// Below-fold components loaded lazily to reduce initial JS bundle
const TabsSection = dynamic(() => import("@/components/TabsSection"));
const Services = dynamic(() => import("@/components/Services"));
const TechStack = dynamic(() => import("@/components/TechStack"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0c0e] text-white selection:bg-amber-400 selection:text-black">
      <Header />
      <Hero />
      <About />
      <Projects />
      <TabsSection />
      <Services />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
