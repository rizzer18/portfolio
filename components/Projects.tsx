"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  ExternalLink,
  Globe,
  Server,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const gradients = [
  "from-amber-500/20 via-zinc-900 to-zinc-950",
  "from-red-500/15 via-zinc-900 to-zinc-950",
  "from-purple-500/15 via-zinc-900 to-zinc-950",
  "from-emerald-500/15 via-zinc-900 to-zinc-950",
  "from-amber-400/20 via-zinc-900 to-zinc-950",
];

const domains = [
  "bowlingovyclubsv.cz",
  "nikita-box.cz",
  "honzapokusil.cz",
  "luxury-cleaning-solutions.ca",
  "Local Linux Server & Cloudflare",
];

const types: ("web" | "infra")[] = ["web", "web", "web", "web", "infra"];

const tags = [
  ["Next.js", "React", "Tailwind CSS", "SEO Schema", "Reservations"],
  ["Next.js", "React", "Tailwind CSS", "Multilingual (CZ/UA)", "Dark Mode"],
  ["Next.js", "React", "CSS Modules", "Responsive Design", "Page Transitions"],
  ["Next.js", "React", "Tailwind CSS", "Instant Calculator", "Google Reviews"],
  ["Home Assistant", "Zigbee2MQTT", "Cost-Effective IoT", "Linux", "MikroTik", "Frigate NVR", "Cloudflare"],
];

const liveUrls = [
  "https://bowlingovyclubsv.cz/",
  "https://nikita-box.cz/",
  "https://honzapokusil.cz/",
  "https://www.luxury-cleaning-solutions.ca/",
  "#about",
];

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "web" | "infra">("all");

  const projects = t.projects.map((p, i) => ({
    id: i + 1,
    title: p.title,
    domain: domains[i],
    category: p.category,
    type: types[i],
    description: p.description,
    tags: tags[i],
    gradient: gradients[i],
    liveUrl: liveUrls[i],
    isProduction: true,
  }));

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.type === filter;
  });

  return (
    <section id="projects" className="relative py-28 bg-[#09090b] overflow-hidden">
      {/* Background ambient lighting - optimized with radial gradient */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-amber-400 inline-block"></span>
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                {t.projectsTag}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>{t.projectsTitle1}</span> <span className="text-gold-gradient">{t.projectsTitle2}</span>
              <Trophy size={24} className="text-amber-400" />
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
              {t.projectsDesc}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full p-1.5 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-amber-400 text-black shadow-gold-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.filterAll} ({projects.length})
            </button>
            <button
              onClick={() => setFilter("web")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === "web"
                  ? "bg-amber-400 text-black shadow-gold-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.filterWeb}
            </button>
            <button
              onClick={() => setFilter("infra")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === "infra"
                  ? "bg-amber-400 text-black shadow-gold-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.filterInfra}
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isExternal = project.liveUrl.startsWith("http");
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className={`group relative rounded-[2rem] border transition-[transform,box-shadow,border-color] duration-500 flex flex-col justify-between overflow-hidden bg-gradient-to-b ${
                    project.gradient
                  } border-zinc-800/90 hover:border-amber-400/50 hover:shadow-gold-sm hover:-translate-y-1.5 backdrop-blur-xl`}
                >
                  {/* Top content */}
                  <div className="p-6 pb-4">
                    
                    {/* Badge row */}
                    <div className="flex items-center justify-between mb-4">
                      {project.isProduction && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {t.liveProduction}
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                        <Globe size={11} className="text-zinc-500" />
                        {project.domain}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-3">
                      {project.category}
                    </p>

                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-4 mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech tags & Actions */}
                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                      {isExternal ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-gold-sm hover:shadow-gold-md"
                        >
                          <span>{t.projectLiveBtn}</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <a
                          href={project.liveUrl}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-all"
                        >
                          <span>{t.projectViewBtn}</span>
                          <Server size={13} className="text-amber-400" />
                        </a>
                      )}

                      <span className="text-[10px] font-mono text-zinc-500">
                        {isExternal ? t.projectLiveStatus : t.projectSelfHosted}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom live stats banner */}
        <div className="mt-12 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 backdrop-blur-md">
          <div className="flex items-center gap-2 text-zinc-300">
            <CheckCircle size={16} className="text-amber-400" />
            <span>{t.projectsBanner}</span>
          </div>
          <a
            href="#contact"
            className="text-amber-400 hover:text-amber-300 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>{t.projectsBannerCta}</span>
            <ExternalLink size={12} />
          </a>
        </div>

      </div>
    </section>
  );
}
