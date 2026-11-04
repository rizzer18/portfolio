"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { Download, ChevronDown, Sparkles, Terminal, ArrowRight } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();
  const techPills = t.heroPills;


  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-xs text-zinc-300 mb-6 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>{t.heroStatus}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-2 leading-[1.1]">
              {t.heroGreeting}, <br className="hidden sm:inline" />
              <span className="text-gold-gradient drop-shadow-sm">
                Roman Roshkanyuk
              </span>
            </h1>

            {/* Versatile Title Subtitle */}
            <p className="text-base sm:text-xl font-bold text-zinc-200 mb-4 flex flex-wrap items-center gap-2">
              <span className="text-amber-400">{t.heroSubtitle}</span>
              <span className="text-zinc-600 hidden sm:inline">·</span>
              <span className="text-zinc-400 text-xs sm:text-sm font-normal">
                {t.heroSubtitleDesc}
              </span>
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-300 max-w-xl mb-6 leading-relaxed">
              {t.heroDesc.map((part, i) => (<React.Fragment key={i}>{part}</React.Fragment>))}
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {techPills.map((pill, i) => (
                <span
                  key={i}
                  className={`text-[11px] font-medium px-3 py-1 rounded-full border backdrop-blur-sm ${pill.color}`}
                >
                  {pill.label}
                </span>
              ))}
            </div>

            {/* Buttons & Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/cv"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 text-black font-bold text-sm shadow-gold-sm hover:shadow-gold-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                <span>{t.heroCvBtn}</span>
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-medium text-sm transition-all duration-300 backdrop-blur-sm"
              >
                <span>{t.heroCompBtn}</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Scroll Down Indicator */}
            <motion.a
              href="#about"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              aria-label="Scroll down"
              className="mt-12 text-zinc-500 hover:text-amber-400 transition-colors p-2 hidden sm:inline-block"
            >
              <ChevronDown size={26} />
            </motion.a>
          </motion.div>

          {/* Right Column: Avatar Card & Social Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500/25 via-amber-400/10 to-transparent rounded-[2.2rem] blur-xl opacity-75"></div>

              {/* Main Card */}
              <div className="relative bg-[#131317]/90 border border-zinc-800/90 rounded-[2rem] p-6 sm:p-7 flex flex-col items-center text-center shadow-card-glow backdrop-blur-xl">
                
                {/* Header chip */}
                <div className="w-full flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block"></span>
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">
                    roman.sys-matrix
                  </span>
                </div>

                {/* Avatar Image */}
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 mb-1 transform hover:scale-105 transition-transform duration-500 cursor-pointer">
                  <Image
                    src="/images/avatar.png"
                    alt="Roman Roshkanyuk - Všestranný IT Specialista"
                    fill
                    sizes="(max-width: 640px) 176px, 192px"
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Live Node Matrix Status Panel */}
                <div className="w-full mt-2 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 text-left font-mono text-[10px] sm:text-[11px] space-y-1.5 backdrop-blur-sm shadow-inner">
                  <div className="flex items-center justify-between text-zinc-400 pb-1.5 border-b border-zinc-800/60">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-sans font-bold flex items-center gap-1.5">
                      <Terminal size={12} className="text-amber-400" />
                      {t.heroInfraTitle}
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {t.heroInfraStatus}
                    </span>
                  </div>
                  {t.heroInfraRows.map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-zinc-400">{row.label}</span>
                      <span className={idx === 1 ? "text-amber-400" : idx === 2 ? "text-emerald-400" : "text-zinc-200"}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Social media icons below the cartoon avatar */}
                <div className="flex items-center justify-center gap-5 mt-4 pt-4 border-t border-zinc-800/70 w-full">
                  <a
                    href="https://www.instagram.com/roshka_jr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 hover:shadow-gold-sm transition-all transform hover:scale-110"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/rizzer18"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 hover:shadow-gold-sm transition-all transform hover:scale-110"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
