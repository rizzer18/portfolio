"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setIsScrolled(window.scrollY > 20);

        const sections = ["hero", "about", "services", "projects", "skills-section", "contact"];
        const current = sections.find((section) => {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });
        if (current) setActiveSection(current);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = t.nav;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-base sm:text-lg font-semibold tracking-tight group"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:border-amber-400/50 group-hover:shadow-gold-sm transition-all duration-300">
            <span className="font-mono font-bold text-xs">&lt;/&gt;</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-sm sm:text-base group-hover:text-amber-400 transition-colors leading-tight">
              Roman Roshkanyuk
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider hidden sm:block">
              DevOps &amp; IT Specialist
            </span>
          </div>
        </a>
        {/* Language Toggle */}
        <div className="hidden md:flex items-center gap-2 ml-4">
          <button
            onClick={() => setLang('cs')}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${lang === 'cs' ? 'bg-amber-400 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'} `}
          >
            CS
          </button>
          <button
            onClick={() => setLang('uk')}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${lang === 'uk' ? 'bg-amber-400 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'} `}
          >
            UA
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/70 rounded-full px-3 py-1.5 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-black font-semibold bg-amber-400 shadow-gold-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CV & Get in touch CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="/cv"
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-full hover:border-zinc-700 hover:bg-zinc-800 transition-all"
          >
            CV
          </a>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/40 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 hover:shadow-gold-sm"
          >
            <Sparkles size={12} className="text-amber-400 group-hover:text-black transition-colors" />
            <span>Kontaktujte mě</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-zinc-300 hover:text-amber-400 focus:outline-none rounded-xl bg-zinc-900/80 border border-zinc-800"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-4 bg-[#111114]/95 border border-zinc-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 px-3 py-2 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/cv"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-amber-400 hover:bg-zinc-800/50 px-3 py-2 rounded-xl transition-all flex items-center justify-between"
              >
                <span>Zobrazit CV</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">PDF</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 text-center text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 py-2.5 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-gold-sm"
              >
                Kontaktujte mě
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
