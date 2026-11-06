"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Server, Wifi, Home, ShieldCheck, Code2, Cpu } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const domainIcons = [
  <Wifi size={14} className="text-amber-400" />,
  <Server size={14} className="text-sky-400" />,
  <Home size={14} className="text-emerald-400" />,
  <Code2 size={14} className="text-violet-400" />,
  <ShieldCheck size={14} className="text-rose-400" />,
  <Cpu size={14} className="text-amber-400" />,
];

export default function About() {
  const { t } = useLanguage();

  const stats = t.aboutStats;
  const domains = t.aboutDomains.map((d, i) => ({
    ...d,
    icon: domainIcons[i],
  }));

  return (
    <section id="about" className="relative py-28 bg-[#09090b] overflow-hidden">
      {/* Subtle ambient glows - optimized with radial gradients */}
      <div className="absolute top-1/2 right-4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(2,132,199,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Photo with floating stars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Floating golden star (Top Right) */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -top-6 -right-3 sm:-right-6 w-12 h-12 sm:w-14 sm:h-14 z-20 pointer-events-none"
            >
              <Image
                src="/images/star1.png"
                alt="Gold Star"
                width={56}
                height={56}
                className="w-full h-full object-contain glow-gold"
              />
            </motion.div>

            {/* Floating golden star (Bottom Left) */}
            <motion.div
              animate={{ y: [6, -6, 6], rotate: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-3 sm:-left-6 w-10 h-10 sm:w-12 sm:h-12 z-20 pointer-events-none"
            >
              <Image
                src="/images/star2.png"
                alt="Gold Star"
                width={48}
                height={48}
                className="w-full h-full object-contain glow-gold"
              />
            </motion.div>

            {/* Photo Container */}
            <div className="relative p-[1.5px] rounded-[1.8rem] bg-gradient-to-b from-amber-400/40 via-zinc-800 to-transparent shadow-2xl">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-[1.7rem] overflow-hidden bg-zinc-950 group">
                <Image
                  src="/images/roman.png"
                  alt="Roman Roshkanyuk"
                  fill
                  sizes="(max-width: 640px) 256px, 288px"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300">
                  <span className="text-semibold text-white">{t.aboutPhotoName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    {t.aboutPhotoBadge}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: About Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-amber-400 inline-block"></span>
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                {t.aboutTag}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              {t.aboutTitle}{" "}
              <span className="text-gold-gradient">{t.aboutTitleAccent}</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
              {t.aboutBio1.map((part, i) =>
                i % 2 === 0
                  ? part
                  : <span key={i} className={i === 1 ? "text-white font-semibold" : "text-amber-400 font-medium"}>{part}</span>
              )}
            </p>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-7">
              {t.aboutBio2.map((part, i) =>
                i % 2 === 0
                  ? part
                  : <span key={i} className="text-zinc-200 font-medium">{part}</span>
              )}
            </p>

            {/* 6-domain competency grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full mb-7">
              {domains.map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-3 hover:border-amber-400/40 hover:bg-zinc-900/90 transition-[transform,box-shadow,border-color,background-color] duration-300 group shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-1.5 rounded-xl bg-zinc-800/80 group-hover:bg-zinc-800 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-500">
                      {item.tag}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-white mb-0.5 group-hover:text-amber-300 transition-colors leading-tight">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-zinc-500 leading-tight">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Stats Counter Boxes */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full mb-7">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/50 border border-zinc-800/90 rounded-2xl p-3 sm:p-4 text-center hover:border-amber-400/40 hover:shadow-gold-sm transition-[transform,box-shadow,border-color] duration-300"
                >
                  <div className="text-lg sm:text-2xl font-extrabold text-gold-gradient mb-0.5">
                    {stat.number}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Hire Me Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-sm shadow-gold-sm hover:shadow-gold-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>{t.aboutCta}</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
