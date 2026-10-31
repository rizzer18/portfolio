"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070709] border-t border-zinc-800/80 py-12">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
          
          {/* Copyright & Info */}
          <div className="text-center md:text-left">
            <p className="flex items-center gap-1.5 justify-center md:justify-start">
              <span>{t.footerMade}</span>
              <span className="text-amber-400 font-semibold">Next.js &amp; Tailwind</span>
              <span>{t.footerBy}</span>
              <span className="text-white font-bold">Roman Roshkanyuk</span>
              <span>© {new Date().getFullYear()}</span>
            </p>
            <p className="text-[11px] text-zinc-500 mt-1">
              {t.footerDesc}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            {t.footerNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/40 hover:shadow-gold-sm transition-all hover:scale-110 cursor-pointer"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
