"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  CheckCircle2,
  Download,
  ExternalLink,
  Server,
  Wifi,
  Home,
  Shield,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type TabType = "skills" | "education" | "experience";

interface Certificate {
  name: string;
  issuer: string;
  year: string;
  file: string;
  badge: string;
}

const certificates: Certificate[] = [
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    year: "2023",
    file: "/CCNA-_Introduction_to_Networks_certificate_romanroskanuk74-gmail-com_5a9cfc9a-62ce-40e9-9023-0e67ef368e8b.pdf",
    badge: "Cisco CCNA",
  },
  {
    name: "CCNA: Switching, Routing & Wireless",
    issuer: "Cisco Networking Academy",
    year: "2023",
    file: "/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_romanroskanuk74-gmail-com_e80aed37-e333-4122-b4bc-421135b63e38.pdf",
    badge: "Cisco CCNA",
  },
  {
    name: "Linux Essentials",
    issuer: "Cisco Networking Academy",
    year: "2023",
    file: "/Linux_Essentials_certificate_romanroskanuk74-gmail-com_5a0dbc61-fe9f-4751-a37d-3fb31d6e4cba.pdf",
    badge: "Linux",
  },
  {
    name: "IT Essentials",
    issuer: "Cisco Networking Academy",
    year: "2022",
    file: "/IT_Essentials_certificate_romanroskanuk74-gmail-com_f6ecc3a9-bf2d-4e90-a410-6c10abca6399.pdf",
    badge: "Hardware & OS",
  },
  {
    name: "ECDL Certificate",
    issuer: "European Computer Driving Licence",
    year: "2022",
    file: "/CertECDL.pdf",
    badge: "ECDL",
  },
  {
    name: "English Language Certificate",
    issuer: "Language Assessment",
    year: "2022",
    file: "/CertEnglish.pdf",
    badge: "English B1",
  },
];

export default function TabsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("skills");

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "skills", label: t.tabLabels[0], icon: <Code size={17} /> },
    { id: "education", label: t.tabLabels[1], icon: <GraduationCap size={17} /> },
    { id: "experience", label: t.tabLabels[2], icon: <Briefcase size={17} /> },
  ];

  return (
    <section id="skills-section" className="relative py-28 bg-[#09090b] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-amber-400 inline-block"></span>
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                {t.tabsTag}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Moje <span className="text-gold-gradient">{t.tabsTitleParts[0]}</span>,{" "}
              <span className="text-gold-gradient">{t.tabsTitleParts[1]}</span> a{" "}
              <span className="text-gold-gradient">{t.tabsTitleParts[2]}</span>
            </h2>
          </div>

          {/* User icon badge */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-900/80 border border-zinc-800 shrink-0 backdrop-blur-md">
            <div className="w-8 h-8 relative">
              <Image
                src="/images/user_icon.png"
                alt="Roman Roshkanyuk"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">{t.userBadgeName}</div>
              <div className="text-[10px] text-amber-400">{t.userBadgeRole}</div>
            </div>
          </div>
        </div>

        {/* Tab Buttons & Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vertical Tab Navigation (Left) */}
          <div className="lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-2.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5 lg:gap-3 px-2 sm:px-4 lg:px-5 py-3 lg:py-3.5 rounded-2xl font-medium text-[10px] sm:text-xs lg:text-sm transition-all duration-300 w-full text-center lg:text-left cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-gold-sm font-bold"
                      : "bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? "text-black" : "text-amber-400"}`}>
                    {tab.icon}
                  </span>
                  <span className="leading-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Content Card (Right) */}
          <div className="lg:col-span-9">
            <div className="relative bg-[#121215]/90 border border-zinc-800/90 rounded-[2rem] p-6 sm:p-8 lg:p-9 shadow-card-glow backdrop-blur-xl min-h-[460px] flex flex-col justify-center">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* 3D Character Sitting in Chair (Shown on skills & experience) */}
                {activeTab !== "education" && (
                  <div className="md:col-span-4 flex justify-center">
                    <div className="relative w-44 h-56 sm:w-52 sm:h-64 transform hover:scale-105 transition-transform duration-500">
                      <Image
                        src="/images/chair_character.png"
                        alt="Roman Roshkanyuk pracující"
                        fill
                        sizes="(max-width: 640px) 176px, 208px"
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                )}

                {/* Tab Content Panes */}
                <div className={activeTab === "education" ? "md:col-span-12" : "md:col-span-8"}>
                  <AnimatePresence mode="wait">
                    
                    {/* ── SKILLS TAB ── */}
                    {activeTab === "skills" && (
                      <motion.div
                        key="skills"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                            <span>{t.skillsTitle}</span>
                            <Sparkles size={18} className="text-amber-400" />
                          </h3>
                          <p className="text-xs text-zinc-400 mb-4">
                            {t.skillsDesc}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {t.skillCats.map((cat: any, ci: number) => (
                              <div key={ci} className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-colors">
                                <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                  {ci === 0 && <Code size={13} />}
                                  {ci === 1 && <Wifi size={13} />}
                                  {ci === 2 && <Server size={13} />}
                                  {cat.title}
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {cat.items.map((item: string) => (
                                    <span key={item} className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/90 text-zinc-200 border border-zinc-700/40">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-colors">
                              <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                <CheckCircle2 size={13} />
                                {t.skillLangsTitle}
                              </h4>
                              <ul className="text-xs text-zinc-300 space-y-1.5 mb-3">
                                {t.skillLangs.map((l: any, i: number) => (
                                  <li key={i} className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                    <span className="font-medium text-white">{l.lang}</span> — {l.level}
                                  </li>
                                ))}
                              </ul>
                              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800">
                                {t.skillDesignItems.map((item: string) => (
                                  <span key={item} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-300">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── EDUCATION & CERTS TAB ── */}
                    {activeTab === "education" && (
                      <motion.div
                        key="education"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-7"
                      >
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {t.eduTitle}
                          </h3>
                          <p className="text-xs text-zinc-400">
                            {t.eduDesc}
                          </p>
                        </div>

                        {/* Academic timeline */}
                        <div className="space-y-3">
                          {t.schools.map((school: any, idx: number) => (
                            <div key={idx} className="bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-4 relative group hover:border-amber-400/40 transition-colors">
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <span className="text-xs font-bold text-amber-400">{school.period}</span>
                                {school.active ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    {school.badge}
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">{school.badge}</span>
                                )}
                              </div>
                              <h4 className="text-base font-bold text-white mb-1">{school.name}</h4>
                              <p className="text-xs text-zinc-300">{school.desc}</p>
                              <p className="text-[11px] text-zinc-500 mt-1">{school.sub}</p>
                            </div>
                          ))}
                        </div>

                        {/* Certificates Grid */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                              <Shield size={14} className="text-amber-400" />
                              {t.certsTitle} ({certificates.length})
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {certificates.map((cert, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-zinc-900/70 border border-zinc-800/90 hover:border-amber-400/40 rounded-2xl p-3.5 flex flex-col justify-between gap-3 group transition-all duration-300 shadow-sm hover:bg-zinc-900/90"
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                                      {cert.badge}
                                    </span>
                                    <span className="text-[10px] text-zinc-500 font-mono">
                                      {cert.year}
                                    </span>
                                  </div>
                                  <p className="text-xs font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                                    {cert.name}
                                  </p>
                                  <p className="text-[10px] text-zinc-400 mt-0.5">
                                    {cert.issuer}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/70">
                                  <a
                                    href={cert.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-zinc-800/90 hover:bg-amber-400 hover:text-black text-[11px] font-semibold text-zinc-200 transition-all"
                                  >
                                    <ExternalLink size={12} />
                                    <span>{t.certView}</span>
                                  </a>
                                  <a
                                    href={cert.file}
                                    download
                                    aria-label={`Stáhnout ${cert.name}`}
                                    className="p-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all"
                                  >
                                    <Download size={13} />
                                  </a>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── EXPERIENCE TAB ── */}
                    {activeTab === "experience" && (
                      <motion.div
                        key="experience"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {t.expTitle}
                          </h3>
                          <p className="text-xs text-zinc-400">
                            {t.expDesc}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {t.expCards.map((card: any, idx: number) => (
                            <div key={idx} className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-colors">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                                {idx === 2 && <Home size={12} />}
                                {idx === 3 && <Wifi size={12} />}
                                <span>{card.tag}</span>
                              </div>
                              <h4 className="text-sm font-bold text-white mb-1.5">
                                {card.title}
                              </h4>
                              <p className="text-xs text-zinc-300 leading-relaxed">
                                {card.desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Quick Contact snippet */}
                        <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
                          <a
                            href={`mailto:${t.expEmail}`}
                            className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                          >
                            <Mail size={14} className="text-amber-400" />
                            <span>{t.expEmail}</span>
                          </a>
                          <a
                            href="tel:+420605447445"
                            className="flex items-center gap-2 hover:text-amber-400 transition-colors"
                          >
                            <Phone size={14} className="text-amber-400" />
                            <span>{t.expPhone}</span>
                          </a>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}