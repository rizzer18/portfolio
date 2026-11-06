"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Layout, Home, Network, Shield, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const serviceIcons = [
  <Network size={22} className="text-amber-400" />,
  <Server size={22} className="text-sky-400" />,
  <Home size={22} className="text-emerald-400" />,
  <Layout size={22} className="text-violet-400" />,
  <Shield size={22} className="text-rose-400" />,
  <Globe size={22} className="text-amber-400" />,
];

const accentColors = [
  { accentColor: "from-amber-400/20 to-amber-600/5", borderHover: "hover:border-amber-400/60" },
  { accentColor: "from-sky-400/15 to-sky-600/5", borderHover: "hover:border-sky-400/50" },
  { accentColor: "from-emerald-400/15 to-emerald-600/5", borderHover: "hover:border-emerald-400/50" },
  { accentColor: "from-violet-400/15 to-violet-600/5", borderHover: "hover:border-violet-400/50" },
  { accentColor: "from-rose-400/15 to-rose-600/5", borderHover: "hover:border-rose-400/50" },
  { accentColor: "from-amber-400/20 to-amber-600/5", borderHover: "hover:border-amber-400/60" },
];

export default function Services() {
  const { t } = useLanguage();

  const competencies = t.services.map((svc, i) => ({
    ...svc,
    icon: serviceIcons[i],
    ...accentColors[i],
  }));

  return (
    <section id="services" className="relative py-28 bg-[#09090b] overflow-hidden">
      {/* Background glow - optimized with radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-[1.5px] bg-amber-400 inline-block"></span>
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
              {t.servicesTag}
            </span>
            <span className="w-5 h-[1.5px] bg-amber-400 inline-block"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
            {t.servicesTitle[0]}<span className="text-gold-gradient">{t.servicesTitle[1]}</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto">
            {t.servicesDesc}
          </p>
        </div>

        {/* 6 Competency Cards — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {competencies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className={`group relative bg-[#121215]/90 border border-zinc-800/90 rounded-[1.75rem] p-6 flex flex-col justify-between ${item.borderHover} transition-all duration-500 hover:-translate-y-1.5 backdrop-blur-xl shadow-sm`}
            >
              {/* Subtle gradient top wash */}
              <div className={`absolute inset-0 rounded-[1.75rem] bg-gradient-to-br ${item.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10">
                {/* Icon + Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-zinc-700 transition-all duration-300 shadow-sm">
                    {item.icon}
                  </div>
                  <span className="font-mono text-lg font-bold text-zinc-800 group-hover:text-zinc-600 transition-colors">
                    {item.num}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono mb-3 uppercase tracking-wide">
                  {item.subtitle}
                </p>

                <p className="text-zinc-400 text-xs leading-relaxed mb-5">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="relative z-10 pt-4 border-t border-zinc-800/70 flex flex-wrap gap-1.5">
                {item.highlights.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 group-hover:border-zinc-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
