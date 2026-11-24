"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Cpu,
  Layers,
  Award,
  Send,
  Download,
  ExternalLink,
  Eye,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Terminal,
  Server,
  Wifi,
  Home,
  Code,
  CheckCircle2,
  Shield,
  Mail,
  Phone,
  Sparkles,
  Trophy,
  GraduationCap,
  Briefcase,
  FolderOpen,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface Certificate {
  name: string;
  issuer: string;
  year: string;
  file: string;
  badge: string;
}

const CERTIFICATES: Certificate[] = [
  {
    name: "CCNA: Switching, Routing & Wireless",
    issuer: "Cisco Networking Academy",
    year: "2023",
    file: "/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_romanroskanuk74-gmail-com_e80aed37-e333-4122-b4bc-421135b63e38.pdf",
    badge: "Cisco CCNA",
  },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    year: "2023",
    file: "/CCNA-_Introduction_to_Networks_certificate_romanroskanuk74-gmail-com_5a9cfc9a-62ce-40e9-9023-0e67ef368e8b.pdf",
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

// Matches exact 0..4 order in LanguageContext.tsx
const PROJECT_DOMAINS = [
  "Self-Hosted Linux · Zero-Trust",
  "bowlingovyclubsv.cz",
  "luxury-cleaning-solutions.ca",
  "nikita-box.cz",
  "honzapokusil.cz",
];

const PROJECT_TYPES: ("web" | "infra")[] = ["infra", "web", "web", "web", "web"];

const PROJECT_TAGS = [
  ["Docker Compose", "GitHub Actions CI/CD", "MikroTik WireGuard", "OSPF/VLAN", "Zero-Trust"],
  ["Next.js", "TypeScript", "SSR/SSG", "Schema.org SEO", "Reservations"],
  ["Next.js", "TypeScript", "Price Calculator", "Google Reviews", "Core Web Vitals"],
  ["Next.js", "React", "i18n (CZ/UA)", "Tailwind CSS", "Responsive UI"],
  ["Next.js", "React", "Modular UI", "Image Optimization", "Transitions"],
];

const PROJECT_URLS = [
  "#infra",
  "https://bowlingovyclubsv.cz/",
  "https://www.luxury-cleaning-solutions.ca/",
  "https://nikita-box.cz/",
  "https://honzapokusil.cz/",
];

const TOOL_LOGOS = [
  { name: "Docker", logo: "/images/docker.png", width: 84, height: 24 },
  { name: "Figma", logo: "/images/figma.png", width: 68, height: 24 },
  { name: "VS Code", logo: "/images/vscode.png", width: 92, height: 24 },
  { name: "Swagger", logo: "/images/swagger.png", width: 80, height: 24 },
  { name: "Node.js", logo: "/images/nodejs.png", width: 74, height: 24 },
  { name: "WordPress", logo: "/images/wordpress.png", width: 84, height: 24 },
];

const TECH_TAGS = [
  { name: "C# (.NET)", cat: "Web" },
  { name: "System.Reflection", cat: "Web" },
  { name: "OOP & SOLID", cat: "Web" },
  { name: "Next.js 15", cat: "Web" },
  { name: "TypeScript", cat: "Web" },
  { name: "Node.js", cat: "Web" },
  { name: "Linux (systemd)", cat: "Infra" },
  { name: "Docker & Compose", cat: "Infra" },
  { name: "GitHub Actions CI/CD", cat: "Infra" },
  { name: "Cloudflare Zero-Trust", cat: "Infra" },
  { name: "AD DS & GPO", cat: "Infra" },
  { name: "VMware", cat: "Infra" },
  { name: "MikroTik RouterOS", cat: "Network" },
  { name: "OSPF & VRF", cat: "Network" },
  { name: "WireGuard VPN", cat: "Network" },
  { name: "802.1Q VLAN", cat: "Network" },
  { name: "2× Cisco CCNA", cat: "Network" },
  { name: "Wireshark", cat: "Network" },
  { name: "Home Assistant & MQTT", cat: "IoT" },
  { name: "Frigate AI NVR", cat: "IoT" },
];

const CAT_STYLES: Record<string, string> = {
  Web: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  Infra: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  Network: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  IoT: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Design: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const NODE_COUNT = 5;

const DRUM_SPRING = {
  type: "spring" as const,
  stiffness: 175,
  damping: 24,
  mass: 0.85,
};

export default function WheelPortfolio() {
  const { t, lang, setLang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const activeIndexRef = useRef<number>(0);

  // Sub-states inside sections
  const [projectFilter, setProjectFilter] = useState<"all" | "web" | "infra">("all");
  const [qualFilter, setQualFilter] = useState<"all" | "certs" | "skills" | "edu">("all");
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const leftDrumRef = useRef<HTMLDivElement>(null);
  const mainBlockStageRef = useRef<HTMLDivElement>(null);
  const scrollerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wheelCooldownRef = useRef<number>(0);
  const edgeAccumRef = useRef<number>(0);
  const lastMidScrollTimeRef = useRef<number>(0);
  const dragStartYRef = useRef<number | null>(null);
  const mobileTouchStartXRef = useRef<number | null>(null);

  const wheelNodes = [
    {
      id: "about",
      num: "01",
      title: lang === "cs" ? "O mně" : "Про мене",
      sub: lang === "cs" ? "Inženýrský profil" : "Інженерний профіль",
      icon: User,
    },
    {
      id: "services",
      num: "02",
      title: lang === "cs" ? "Architektura" : "Архітектура",
      sub: lang === "cs" ? "DevOps, Sítě & C#" : "DevOps, Мережі & C#",
      icon: Cpu,
    },
    {
      id: "projects",
      num: "03",
      title: lang === "cs" ? "Produkce" : "Продакшн",
      sub: lang === "cs" ? "5 živých nasazení" : "5 живих релізів",
      icon: Layers,
    },
    {
      id: "skills-section",
      num: "04",
      title: lang === "cs" ? "Certifikáty & Praxe" : "Сертифікати & Досвід",
      sub: lang === "cs" ? "CCNA, VUT & ISSS" : "CCNA, VUT & ISSS",
      icon: Award,
    },
    {
      id: "contact",
      num: "05",
      title: lang === "cs" ? "Kontakt" : "Контакт",
      sub: lang === "cs" ? "Přímé spojení" : "Прямий зв'язок",
      icon: Send,
    },
  ];

  const selectNode = useCallback((nextIdx: number, explicitDir?: number) => {
    const normalized = ((nextIdx % NODE_COUNT) + NODE_COUNT) % NODE_COUNT;
    const prevIdx = activeIndexRef.current;
    if (normalized === prevIdx) return;

    let diff = normalized - prevIdx;
    if (diff > NODE_COUNT / 2) diff -= NODE_COUNT;
    if (diff < -NODE_COUNT / 2) diff += NODE_COUNT;

    const dir = explicitDir ?? (diff > 0 ? 1 : -1);
    setDirection(dir);
    activeIndexRef.current = normalized;
    setActiveIndex(normalized);
    edgeAccumRef.current = 0;

    const targetScroller = scrollerRefs.current[normalized];
    if (targetScroller) {
      targetScroller.scrollTop = 0;
    }
  }, []);

  const stepWheel = useCallback(
    (delta: 1 | -1) => {
      selectNode(activeIndexRef.current + delta, delta);
    },
    [selectNode]
  );

  // Sync initial URL hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const map: Record<string, number> = {
      hero: 0,
      about: 0,
      services: 1,
      projects: 2,
      "skills-section": 3,
      contact: 4,
    };
    if (map[hash] !== undefined) {
      selectNode(map[hash]);
    }
  }, [selectNode]);

  // Direct mouse wheel rotation on the Left 3D Drum
  useEffect(() => {
    const el = leftDrumRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      e.preventDefault();
      const now = Date.now();
      if (now - wheelCooldownRef.current < 400) return;
      if (Math.abs(e.deltaY) < 12) return;

      wheelCooldownRef.current = now;
      stepWheel(e.deltaY > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [stepWheel]);

  // Smart 3D Drum Scroll on the Main Content Stage
  useEffect(() => {
    const stageEl = mainBlockStageRef.current;
    if (!stageEl) return;

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024 || previewCert) return;
      const scroller = scrollerRefs.current[activeIndexRef.current];
      if (!scroller) return;

      const now = Date.now();
      if (now - wheelCooldownRef.current < 500) {
        e.preventDefault();
        return;
      }

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      const hasOverflow = maxScroll > 6;

      if (!hasOverflow) {
        if (Math.abs(e.deltaY) < 15) return;
        e.preventDefault();
        wheelCooldownRef.current = now;
        stepWheel(e.deltaY > 0 ? 1 : -1);
        return;
      }

      const atTop = scroller.scrollTop <= 2;
      const atBottom = scroller.scrollTop >= maxScroll - 4;

      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        lastMidScrollTimeRef.current = now;
        edgeAccumRef.current = 0;
        return;
      }

      if (now - lastMidScrollTimeRef.current < 170) {
        edgeAccumRef.current = 0;
        return;
      }

      e.preventDefault();
      edgeAccumRef.current += e.deltaY;

      if (Math.abs(edgeAccumRef.current) >= 70) {
        const dir: 1 | -1 = edgeAccumRef.current > 0 ? 1 : -1;
        edgeAccumRef.current = 0;
        wheelCooldownRef.current = now;
        stepWheel(dir);
      }
    };

    stageEl.addEventListener("wheel", onWheel, { passive: false });
    return () => stageEl.removeEventListener("wheel", onWheel);
  }, [stepWheel, previewCert]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && previewCert) {
        setPreviewCert(null);
        return;
      }
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        stepWheel(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        stepWheel(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [stepWheel, previewCert]);

  // Pointer drag on left drum
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartYRef.current = e.clientY;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartYRef.current === null) return;
    const dy = e.clientY - dragStartYRef.current;
    dragStartYRef.current = null;
    if (Math.abs(dy) > 30) {
      stepWheel(dy < 0 ? 1 : -1);
    }
  };

  // Contact Submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.error || (lang === "cs" ? "Něco se pokazilo." : "Щось пішло не так.")
        );
      }
      setIsSubmitted(true);
      setFormData({ subject: "", name: "", phone: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : lang === "cs"
          ? "Neznámá chyba."
          : "Невідома помилка."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects = t.projects.map((p, i) => ({
    id: i + 1,
    title: p.title,
    domain: PROJECT_DOMAINS[i],
    category: p.category,
    type: PROJECT_TYPES[i],
    description: p.description,
    tags: PROJECT_TAGS[i],
    liveUrl: PROJECT_URLS[i],
  }));

  const filteredProjects = projects.filter((p) =>
    projectFilter === "all" ? true : p.type === projectFilter
  );

  // Renders compact, high-density content for any section index (0..4)
  const renderSectionBody = (sectionIdx: number) => {
    switch (sectionIdx) {
      /* ── 01: OVERVIEW / ABOUT ME ── */
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
              {/* Left 8 Cols: Compact Greeting, Bio & Stats */}
              <div className="xl:col-span-8 flex flex-col justify-between space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-[10px] sm:text-[11px] font-medium text-amber-300 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="truncate max-w-[250px] sm:max-w-none">{t.heroStatus}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      {t.heroGreeting},{" "}
                      <span className="text-gold-gradient">Roman Roshkanyuk</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                      <span className="text-amber-400 font-bold">{t.heroSubtitle}</span>
                      <span className="hidden sm:inline"> · {t.heroSubtitleDesc}</span>
                    </p>
                  </div>

                  {/* Compact Mobile Avatar beside title (< xl) */}
                  <div className="xl:hidden relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-amber-400/45 shrink-0">
                    <Image
                      src="/images/roman-profile.jpg"
                      alt="Roman Roshkanyuk"
                      fill
                      sizes="80px"
                      priority
                      className="object-cover object-[50%_32%]"
                    />
                  </div>
                </div>

                {/* High-Signal Engineering Bio */}
                <div className="space-y-2.5 text-xs sm:text-[13.5px] text-zinc-200 leading-relaxed bg-zinc-900/50 border border-white/[0.06] rounded-xl p-3.5 sm:p-4">
                  <p>
                    {t.aboutBio1.map((part, i) =>
                      i % 2 === 0 ? (
                        part
                      ) : (
                        <span
                          key={i}
                          className={
                            i === 1 ? "text-white font-bold" : "text-amber-400 font-semibold"
                          }
                        >
                          {part}
                        </span>
                      )
                    )}
                  </p>
                  <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed">
                    {t.aboutBio2.map((part, i) =>
                      i % 2 === 0 ? (
                        part
                      ) : (
                        <span key={i} className="text-white font-semibold">
                          {part}
                        </span>
                      )
                    )}
                  </p>
                </div>

                {/* Compact 3-Metric Strip */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {t.aboutStats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900/65 border border-zinc-800/90 rounded-xl px-2.5 py-2.5 text-center"
                    >
                      <div className="text-base sm:text-xl font-extrabold text-gold-gradient leading-none">
                        {stat.number}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-zinc-400 leading-tight mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 4 Cols: Main Portrait (xl+) + Live Production Telemetry */}
              <div className="xl:col-span-4 flex flex-col justify-between gap-3">
                <div className="hidden xl:block p-[1px] rounded-2xl bg-gradient-to-b from-amber-400/50 via-zinc-800 to-zinc-900 shadow-xl">
                  <div className="relative w-full h-[172px] rounded-[15px] overflow-hidden bg-zinc-950 group">
                    <Image
                      src="/images/roman-profile.jpg"
                      alt="Roman Roshkanyuk"
                      fill
                      sizes="340px"
                      priority
                      className="object-cover object-[50%_30%] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-white drop-shadow">
                        {t.aboutPhotoName}
                      </span>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-black/70 text-amber-300 border border-amber-400/40">
                        {t.aboutPhotoBadge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 font-mono text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800/80">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <Terminal size={12} className="text-amber-400" />
                      {t.heroInfraTitle}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-sans flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {t.heroInfraStatus}
                    </span>
                  </div>
                  {t.heroInfraRows.map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2">
                      <span className="text-zinc-400 truncate">{row.label}</span>
                      <span
                        className={`text-right shrink-0 ${
                          idx === 1
                            ? "text-amber-400"
                            : idx === 2
                            ? "text-emerald-400"
                            : "text-zinc-200"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Compact Engineering Pillars */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {t.aboutDomains.map((d, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/55 border border-zinc-800/80 rounded-xl p-3 hover:border-amber-400/35 transition-colors"
                >
                  <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    {d.tag}
                  </span>
                  <div className="text-xs font-bold text-white mt-1.5 mb-0.5 leading-snug">
                    {d.label}
                  </div>
                  <div className="text-[10.5px] text-zinc-400 leading-snug">{d.desc}</div>
                </div>
              ))}
            </div>

            {/* Compact CTA Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/cv"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs shadow-gold-sm transition-all"
                >
                  <Download size={14} />
                  <span>{t.heroCvBtn}</span>
                </Link>
                <button
                  onClick={() => selectNode(2, 1)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900 border border-zinc-700 hover:border-amber-400/50 text-zinc-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>{lang === "cs" ? "Produkční projekty" : "Продакшн-проєкти"}</span>
                  <ArrowRight size={13} className="text-amber-400" />
                </button>
                <button
                  onClick={() => selectNode(3, 1)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-900 border border-zinc-700 hover:border-amber-400/50 text-zinc-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>{lang === "cs" ? "Certifikáty (6)" : "Сертифікати (6)"}</span>
                  <Award size={13} className="text-amber-400" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/rizzer18"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/roshka_jr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        );

      /* ── 02: ARCHITECTURE & STACK ── */
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {t.servicesTitle[0]}
                <span className="text-gold-gradient">{t.servicesTitle[1]}</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">{t.servicesDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.services.map((svc, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900/60 border border-zinc-800/90 hover:border-amber-400/45 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/25 text-amber-400 font-mono text-[10px] font-bold">
                        {svc.num}
                      </span>
                      {idx === 0 && <Wifi size={16} className="text-amber-400" />}
                      {idx === 1 && <Server size={16} className="text-sky-400" />}
                      {idx === 2 && <Code size={16} className="text-violet-400" />}
                      {idx === 3 && <Home size={16} className="text-emerald-400" />}
                    </div>
                    <h3 className="text-sm font-bold text-white">{svc.title}</h3>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                      {svc.subtitle}
                    </p>
                    <p className="text-[11.5px] text-zinc-300 leading-relaxed mb-2.5">
                      {svc.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-zinc-800/80">
                    {svc.highlights.map((h, hi) => (
                      <span
                        key={hi}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-950 text-zinc-300 border border-zinc-800"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2.5 border-t border-zinc-800/80 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {t.techLabel}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {TOOL_LOGOS.map((tool) => (
                    <div
                      key={tool.name}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 flex items-center justify-center"
                    >
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        width={tool.width}
                        height={tool.height}
                        className="max-h-4 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TECH_TAGS.map((item) => (
                  <span
                    key={item.name}
                    className={`text-[10.5px] font-medium px-2.5 py-0.5 rounded-full border ${
                      CAT_STYLES[item.cat]
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      /* ── 03: PRODUCTION PROJECTS ── */
      case 2:
        return (
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>{t.projectsTitle1}</span>
                  <span className="text-gold-gradient">{t.projectsTitle2}</span>
                  <Trophy size={19} className="text-amber-400" />
                </h2>
                <p className="text-[11.5px] text-zinc-400 mt-0.5">{t.projectsDesc}</p>
              </div>

              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-0.5 self-start shrink-0">
                {(
                  [
                    { id: "all", label: `${t.filterAll} (${projects.length})` },
                    { id: "web", label: t.filterWeb },
                    { id: "infra", label: t.filterInfra },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setProjectFilter(f.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      projectFilter === f.id
                        ? "bg-amber-400 text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredProjects.map((project) => {
                const isExternal = project.liveUrl.startsWith("http");
                return (
                  <div
                    key={project.id}
                    className="group rounded-xl border border-zinc-800/90 hover:border-amber-400/50 bg-zinc-900/55 p-3.5 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {t.liveProduction}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 truncate">
                          {project.domain}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-[9.5px] font-bold uppercase tracking-wider text-amber-400/90 mt-0.5 mb-1.5">
                        {project.category}
                      </p>
                      <p className="text-[11px] text-zinc-300 leading-relaxed mb-2.5 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9.5px] px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                        {isExternal ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold transition-colors"
                          >
                            <span>{t.projectLiveBtn}</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <button
                            onClick={() => selectNode(1, -1)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            <span>{t.projectViewBtn}</span>
                            <Server size={12} className="text-amber-400" />
                          </button>
                        )}
                        <span className="text-[10px] font-mono text-zinc-500">
                          {isExternal ? t.projectLiveStatus : t.projectSelfHosted}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      /* ── 04: CERTIFICATES, SKILLS & EXPERIENCE ── */
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {t.tabsTitlePrefix}{" "}
                <span className="text-gold-gradient">{t.tabsTitleParts[0]}</span>,{" "}
                <span className="text-gold-gradient">{t.tabsTitleParts[1]}</span>{" "}
                {t.tabsTitleConjunction}{" "}
                <span className="text-gold-gradient">{t.tabsTitleParts[2]}</span>
              </h2>

              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-0.5 self-start shrink-0 overflow-x-auto no-scrollbar max-w-full">
                {(
                  [
                    { id: "all", label: lang === "cs" ? "Vše" : "Все" },
                    {
                      id: "certs",
                      label: `${lang === "cs" ? "Certifikáty" : "Сертифікати"} (6)`,
                    },
                    { id: "skills", label: t.tabLabels[0] },
                    {
                      id: "edu",
                      label: lang === "cs" ? "VUT & Praxe" : "VUT & Досвід",
                    },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setQualFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      qualFilter === tab.id
                        ? "bg-amber-400 text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {(qualFilter === "all" || qualFilter === "edu") && (
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {t.schools.map((school, idx) => (
                    <div
                      key={idx}
                      className="bg-zinc-900/60 border border-zinc-800/90 rounded-xl p-3.5"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                          <GraduationCap size={13} />
                          {school.period}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            school.active
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : "bg-zinc-800 border-zinc-700 text-zinc-300"
                          }`}
                        >
                          {school.badge}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-white">{school.name}</h3>
                      <p className="text-[11px] text-zinc-300">{school.desc}</p>
                      <p className="text-[10.5px] text-zinc-500 mt-1 leading-snug">{school.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {t.expCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3.5"
                    >
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        {card.tag}
                      </span>
                      <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                        <Briefcase size={12} className="text-amber-400 shrink-0" />
                        <span>{card.title}</span>
                      </h4>
                      <p className="text-[11px] text-zinc-300 leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(qualFilter === "all" || qualFilter === "certs") && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2 flex items-center gap-1.5">
                  <Shield size={13} className="text-amber-400" />
                  <span>
                    {t.certsTitle} ({CERTIFICATES.length})
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {CERTIFICATES.map((cert, i) => (
                    <div
                      key={i}
                      onClick={() => setPreviewCert(cert)}
                      className="bg-zinc-900/70 border border-zinc-800/90 hover:border-amber-400/50 rounded-xl p-3 flex flex-col justify-between gap-2.5 cursor-pointer group transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                            {cert.badge}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">{cert.year}</span>
                        </div>
                        <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                          {cert.name}
                        </p>
                        <p className="text-[10px] text-zinc-400">{cert.issuer}</p>
                      </div>

                      <div
                        className="flex items-center gap-1.5 pt-2 border-t border-zinc-800/70"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setPreviewCert(cert)}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400 text-amber-300 hover:text-black text-[11px] font-bold transition-all cursor-pointer"
                        >
                          <Eye size={12} />
                          <span>{t.certView}</span>
                        </button>
                        <a
                          href={cert.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all"
                          title="Open"
                        >
                          <ExternalLink size={12} />
                        </a>
                        <a
                          href={cert.file}
                          download
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all"
                          title={t.certDownload}
                        >
                          <Download size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(qualFilter === "all" || qualFilter === "skills") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {t.skillCats.map((cat, ci) => (
                  <div
                    key={ci}
                    className="bg-zinc-900/55 border border-zinc-800/80 rounded-xl p-3"
                  >
                    <h4 className="text-[10.5px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                      {cat.title}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="text-[10.5px] px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-200 border border-zinc-700/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-zinc-900/55 border border-zinc-800/80 rounded-xl p-3">
                  <h4 className="text-[10.5px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={12} />
                    {t.skillLangsTitle}
                  </h4>
                  <ul className="text-[11px] text-zinc-300 space-y-1">
                    {t.skillLangs.map((l, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>
                          <strong className="text-white">{l.lang}</strong> — {l.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      /* ── 05: CONTACT ── */
      default:
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {t.contactTitle[0]}
                <span className="text-gold-gradient">{t.contactTitle[1]}</span>
                {t.contactTitle[2]}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">{t.contactSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              <div className="lg:col-span-5 space-y-2.5">
                <a
                  href="mailto:romanroskanuk74@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-amber-400/50 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9.5px] uppercase tracking-wider text-zinc-500 font-semibold">
                      {t.emailLabel}
                    </div>
                    <div className="text-xs font-semibold text-white group-hover:text-amber-300 truncate">
                      romanroskanuk74@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+420605447445"
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-amber-400/50 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-[9.5px] uppercase tracking-wider text-zinc-500 font-semibold">
                      {t.phoneLabel}
                    </div>
                    <div className="text-xs font-semibold text-white group-hover:text-amber-300">
                      +420 605 447 445
                    </div>
                  </div>
                </a>

                <div className="hidden sm:block relative w-full h-32 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                  <Image
                    src="/images/classroom.png"
                    alt="Roman Roshkanyuk — ISSS & Team"
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="lg:col-span-7 space-y-2.5">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                  placeholder={t.formSubject}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/85 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder={t.formName}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/85 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    placeholder={t.formPhone}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/85 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder={t.formEmail}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/85 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  placeholder={t.formMessage}
                  rows={3}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/85 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm shadow-gold-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 transition-all"
                >
                  <span>{isSubmitting ? t.formSending : t.formSend}</span>
                  <Send size={14} />
                </button>

                {isSubmitted && (
                  <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-400/10 border border-amber-400/30 p-2.5 rounded-xl">
                    <CheckCircle2 size={14} className="text-amber-400" />
                    <span>{t.formSuccess}</span>
                  </div>
                )}

                {submitError && (
                  <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 p-2.5 rounded-xl">
                    ⚠ {submitError}
                  </div>
                )}
              </form>
            </div>
          </div>
        );
    }
  };

  const prevNode = wheelNodes[(activeIndex - 1 + NODE_COUNT) % NODE_COUNT];
  const nextNode = wheelNodes[(activeIndex + 1) % NODE_COUNT];

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#060609] text-white relative flex flex-col">
      {/* Background Telemetry & Ambient Glows */}
      <div className="fixed inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      <div className="fixed top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.09)_0%,rgba(217,119,6,0.03)_45%,transparent_72%)] pointer-events-none" />
      <div className="fixed bottom-[-12%] right-[12%] w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(56,189,248,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* ── TOP COMPACT HUD HEADER ── */}
      <header className="relative z-40 h-14 shrink-0 border-b border-white/[0.06] bg-[#07070b]/90 backdrop-blur-xl px-3 sm:px-6 xl:px-10">
        <div className="max-w-[1480px] h-full mx-auto flex items-center justify-between gap-2">
          {/* Brand */}
          <button
            onClick={() => selectNode(0, -1)}
            className="flex items-center gap-2.5 text-left group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:border-amber-400/60 transition-all shrink-0">
              <span className="font-mono font-bold text-[11px]">&lt;/&gt;</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors truncate">
                  Roman Roshkanyuk
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[9px] font-medium text-emerald-400 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  VUT FEKT
                </span>
              </div>
              <p className="text-[9.5px] font-mono text-zinc-400 tracking-wider uppercase truncate">
                DevOps · Network · C# (.NET)
              </p>
            </div>
          </button>

          {/* Right HUD Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/70 border border-zinc-800/80 text-[11px] font-mono">
              <span className="text-amber-400 font-bold">{wheelNodes[activeIndex].num}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-500">05</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700 mx-0.5" />
              <span className="text-zinc-300 font-sans font-medium">
                {wheelNodes[activeIndex].title}
              </span>
            </div>

            {/* Language Switcher (CZ / UA) */}
            <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-full p-0.5 text-[10.5px] font-bold">
              <button
                onClick={() => setLang("cs")}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === "cs"
                    ? "bg-amber-400 text-black shadow-gold-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                CZ
              </button>
              <button
                onClick={() => setLang("uk")}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  lang === "uk"
                    ? "bg-amber-400 text-black shadow-gold-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                UA
              </button>
            </div>

            {/* File Server Shortcut */}
            <Link
              href="/uploadFile"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-medium text-zinc-300 hover:text-amber-400 hover:border-amber-400/40 transition-all"
              title="File Server"
            >
              <FolderOpen size={12} className="text-amber-400" />
              <span className="hidden sm:inline">Files</span>
            </Link>

            {/* CV Link */}
            <Link
              href="/cv"
              className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-[11px] font-bold text-zinc-200 hover:text-black hover:bg-amber-400 hover:border-amber-400 transition-all"
            >
              CV
            </Link>

            {/* Contact Quick Jump */}
            <button
              onClick={() => selectNode(4, 1)}
              className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[11px] font-extrabold shadow-gold-sm hover:shadow-gold-md transition-all cursor-pointer"
            >
              <Sparkles size={11} />
              <span>{t.headerCta}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE 3D MINI-DRUM DIAL (< lg) ── */}
      <div className="lg:hidden sticky top-0 z-30 bg-[#08080c]/95 backdrop-blur-xl border-b border-white/[0.07] px-3 py-2">
        {/* Mini 3D Drum Row: Prev tilted | Active Gold Pill | Next tilted */}
        <div
          style={{ perspective: "600px" }}
          className="flex items-center justify-between gap-1.5 mb-2"
        >
          <button
            onClick={() => stepWheel(-1)}
            style={{ transform: "rotateY(22deg) scale(0.92)" }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800/90 text-[10.5px] text-zinc-400 truncate max-w-[30%] cursor-pointer"
          >
            <ChevronLeft size={12} className="text-amber-400 shrink-0" />
            <span className="truncate">{prevNode.title}</span>
          </button>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-gold-sm shrink-0">
            <span className="font-mono text-[10px] bg-black/15 px-1.5 py-0.5 rounded">
              {wheelNodes[activeIndex].num}
            </span>
            <span>{wheelNodes[activeIndex].title}</span>
          </div>

          <button
            onClick={() => stepWheel(1)}
            style={{ transform: "rotateY(-22deg) scale(0.92)" }}
            className="flex items-center justify-end gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800/90 text-[10.5px] text-zinc-400 truncate max-w-[30%] cursor-pointer"
          >
            <span className="truncate">{nextNode.title}</span>
            <ChevronRight size={12} className="text-amber-400 shrink-0" />
          </button>
        </div>

        {/* 5 Quick Tap Dots/Chips */}
        <div className="grid grid-cols-5 gap-1">
          {wheelNodes.map((n, idx) => {
            const Icon = n.icon;
            const isActive = idx === activeIndex;
            return (
              <button
                key={n.id}
                onClick={() => selectNode(idx)}
                className={`flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-400/20 border border-amber-400/50 text-amber-300"
                    : "bg-zinc-900/60 border border-zinc-800/70 text-zinc-500"
                }`}
              >
                <Icon size={11} />
                <span className="font-mono">{n.num}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN STAGE ── */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 sm:px-6 xl:px-10 py-3 lg:py-0 flex flex-col lg:flex-row gap-5 xl:gap-7 items-center relative z-10 lg:h-[calc(100vh-3.5rem)] min-h-0">
        {/* ═══════════════════════════════════════════════════════════════════
            LEFT RAIL: COMPACT 3D VERTICAL CYLINDER WHEEL (Desktop lg+)
        ═══════════════════════════════════════════════════════════════════ */}
        <aside
          ref={leftDrumRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="hidden lg:flex lg:w-[210px] xl:w-[230px] shrink-0 flex-col items-center justify-center h-full select-none relative"
        >
          {/* Compact Core Avatar Badge */}
          <div className="flex items-center gap-2.5 w-full px-3 py-2 mb-4 rounded-xl bg-zinc-900/60 border border-white/[0.07] backdrop-blur-md">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-amber-400/50 shrink-0">
              <Image
                src="/images/roman-profile.jpg"
                alt="Roman Roshkanyuk"
                fill
                sizes="40px"
                priority
                className="object-cover object-[50%_32%]"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-white truncate">Roman Roshkanyuk</div>
              <div className="text-[9.5px] font-mono text-amber-400 truncate">
                VUT FEKT · 1. ročník
              </div>
            </div>
          </div>

          {/* 3D Vertical Cylinder Barrel Selector */}
          <div
            style={{ perspective: "900px" }}
            className="relative w-full h-[300px] flex items-center justify-center"
          >
            <div className="absolute left-3 top-3 bottom-3 w-[2px] bg-gradient-to-b from-transparent via-amber-400/35 to-transparent pointer-events-none" />

            {/* Connector Beam to Main 3D Drum */}
            <div className="absolute right-[-20px] xl:right-[-26px] top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-30">
              <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-amber-400 mr-0.5" />
              <div className="w-5 xl:w-7 h-[2px] bg-gradient-to-r from-amber-400 to-transparent shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
            </div>

            {wheelNodes.map((node, idx) => {
              let rel = idx - activeIndex;
              if (rel > NODE_COUNT / 2) rel -= NODE_COUNT;
              if (rel < -NODE_COUNT / 2) rel += NODE_COUNT;

              const absRel = Math.abs(rel);
              const isActive = rel === 0;
              const rotateX = rel === 0 ? 0 : rel < 0 ? absRel * 32 : -absRel * 32;
              const yOffset = rel === 0 ? 0 : rel * (absRel === 1 ? 64 : 56);
              const scale = rel === 0 ? 1.03 : absRel === 1 ? 0.9 : 0.78;
              const opacity = rel === 0 ? 1 : absRel === 1 ? 0.62 : 0.25;
              const zIndex = 20 - absRel * 5;
              const Icon = node.icon;

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  onClick={() => selectNode(idx)}
                  animate={{
                    y: yOffset,
                    rotateX,
                    scale,
                    opacity,
                  }}
                  transition={DRUM_SPRING}
                  style={{ zIndex }}
                  className={`absolute inset-x-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left cursor-pointer transition-colors will-composite ${
                    isActive
                      ? "bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 text-black shadow-[0_8px_28px_rgba(251,191,36,0.38)] ring-2 ring-amber-300/50"
                      : "bg-[#121218]/90 border border-zinc-800/90 text-zinc-300 hover:border-amber-400/40 hover:text-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-black/15 text-black"
                        : "bg-zinc-900 border border-zinc-800 text-amber-400"
                    }`}
                  >
                    <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[11.5px] font-extrabold truncate ${
                          isActive ? "text-black" : "text-zinc-100"
                        }`}
                      >
                        {node.title}
                      </span>
                      <span
                        className={`text-[9.5px] font-mono font-bold ${
                          isActive ? "text-black/75" : "text-zinc-500"
                        }`}
                      >
                        {node.num}
                      </span>
                    </div>
                    <p
                      className={`text-[9.5px] truncate ${
                        isActive ? "text-black/75 font-medium" : "text-zinc-500"
                      }`}
                    >
                      {node.sub}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/70 border border-zinc-800/80">
            <button
              onClick={() => stepWheel(-1)}
              className="w-6 h-6 rounded-full bg-zinc-800 hover:bg-amber-400 text-zinc-300 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous section"
            >
              <ChevronUp size={13} />
            </button>
            <span className="text-[9.5px] font-mono text-zinc-400 px-1">
              {lang === "cs" ? "Kolečko / Klik" : "Скрол / Клік"}
            </span>
            <button
              onClick={() => stepWheel(1)}
              className="w-6 h-6 rounded-full bg-zinc-800 hover:bg-amber-400 text-zinc-300 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next section"
            >
              <ChevronDown size={13} />
            </button>
          </div>
        </aside>

        {/* ═══════════════════════════════════════════════════════════════════
            DESKTOP RIGHT STAGE (lg+): LIVE 5-CARD 3D CYLINDER WHEEL!
            Moves identically to the Left 3D Wheel — all 5 blocks sit in 3D
            depth (rel = -2, -1, 0, +1, +2) and glide physically toward & away!
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          ref={mainBlockStageRef}
          style={{ perspective: "1500px" }}
          className="hidden lg:flex flex-1 w-full min-w-0 h-full items-center justify-center relative"
        >
          <div className="relative w-full max-w-[1060px] h-[63vh] max-h-[545px] min-h-[430px] flex items-center justify-center">
            {wheelNodes.map((node, idx) => {
              let rel = idx - activeIndex;
              if (rel > NODE_COUNT / 2) rel -= NODE_COUNT;
              if (rel < -NODE_COUNT / 2) rel += NODE_COUNT;

              const absRel = Math.abs(rel);
              const isActive = rel === 0;

              // Identical 3D cylinder mechanics to the Left Wheel!
              const rotateX = rel === 0 ? 0 : rel < 0 ? absRel * 31 : -absRel * 31;
              const yPct = rel === 0 ? "0%" : rel < 0 ? `${rel * (absRel === 1 ? 30 : 25)}%` : `${rel * (absRel === 1 ? 30 : 25)}%`;
              const scale = rel === 0 ? 1 : absRel === 1 ? 0.89 : 0.78;
              const opacity = rel === 0 ? 1 : absRel === 1 ? 0.36 : 0.11;
              const zIndex = 30 - absRel * 10;

              return (
                <motion.section
                  key={node.id}
                  onClick={!isActive ? () => selectNode(idx) : undefined}
                  animate={{
                    y: yPct,
                    rotateX,
                    scale,
                    opacity,
                  }}
                  transition={DRUM_SPRING}
                  style={{ zIndex }}
                  className={`absolute inset-0 flex flex-col rounded-[1.6rem] overflow-hidden will-composite transition-colors duration-300 ${
                    isActive
                      ? "bg-[#0e0e14]/95 border border-amber-400/35 shadow-[0_24px_75px_rgba(0,0,0,0.92),0_0_38px_-10px_rgba(251,191,36,0.22)] backdrop-blur-2xl"
                      : "bg-[#111118]/90 border border-zinc-800/90 hover:border-amber-400/40 cursor-pointer select-none shadow-2xl"
                  }`}
                >
                  {/* Top gold laser accent on active block */}
                  {isActive && (
                    <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pointer-events-none" />
                  )}

                  {/* Compact Block Header */}
                  <div
                    className={`flex items-center justify-between px-6 py-2.5 border-b shrink-0 ${
                      isActive
                        ? "border-white/[0.07] bg-zinc-950/60"
                        : "border-white/[0.04] bg-zinc-950/80"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive
                            ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                            : "bg-zinc-600"
                        }`}
                      />
                      <span
                        className={`text-[10.5px] font-mono uppercase tracking-widest font-bold ${
                          isActive ? "text-amber-400" : "text-zinc-400"
                        }`}
                      >
                        {node.num} // {node.title} — {node.sub}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-500">
                        {isActive
                          ? `${idx + 1} / ${NODE_COUNT}`
                          : lang === "cs"
                          ? "Kliknutím otočit"
                          : "Клік — прокрутити"}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-emerald-400" : "bg-zinc-800"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Card Inner Body */}
                  <div
                    ref={(el) => {
                      scrollerRefs.current[idx] = el;
                    }}
                    className={`flex-1 px-6 xl:px-8 py-4 sm:py-5 ${
                      isActive
                        ? "overflow-y-auto pointer-events-auto"
                        : "overflow-hidden pointer-events-none"
                    }`}
                  >
                    {renderSectionBody(idx)}
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            MOBILE STAGE (< lg): COMPACT 3D TILT + SWIPE SUPPORT
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          style={{ perspective: "1100px" }}
          onTouchStart={(e) => {
            mobileTouchStartXRef.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (mobileTouchStartXRef.current === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? 0) - mobileTouchStartXRef.current;
            mobileTouchStartXRef.current = null;
            if (Math.abs(dx) > 65) {
              stepWheel(dx < 0 ? 1 : -1);
            }
          }}
          className="lg:hidden w-full pb-16"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.section
              key={wheelNodes[activeIndex].id}
              custom={direction}
              initial={{
                rotateX: direction > 0 ? -24 : 24,
                y: direction > 0 ? 36 : -36,
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                rotateX: 0,
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                rotateX: direction > 0 ? 24 : -24,
                y: direction > 0 ? -36 : 36,
                scale: 0.95,
                opacity: 0,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full rounded-2xl bg-[#0e0e14]/95 border border-amber-400/30 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-zinc-950/60">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  {wheelNodes[activeIndex].num} // {wheelNodes[activeIndex].sub}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {activeIndex + 1}/{NODE_COUNT}
                </span>
              </div>
              <div className="p-4">{renderSectionBody(activeIndex)}</div>
            </motion.section>
          </AnimatePresence>
        </div>
      </main>

      {/* ── MOBILE BOTTOM THUMB WHEEL BAR (< lg) ── */}
      <div className="lg:hidden fixed bottom-3 inset-x-3 z-30 flex items-center justify-between px-3 py-2 rounded-2xl bg-zinc-950/95 border border-zinc-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        <button
          onClick={() => stepWheel(-1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 active:bg-amber-400 active:text-black cursor-pointer"
        >
          <ChevronUp size={14} className="text-amber-400" />
          <span className="truncate max-w-[90px]">{prevNode.title}</span>
        </button>

        <span className="text-[10px] font-mono text-zinc-500">
          {wheelNodes[activeIndex].num} / 05
        </span>

        <button
          onClick={() => stepWheel(1)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 text-black text-xs font-extrabold cursor-pointer"
        >
          <span className="truncate max-w-[90px]">{nextNode.title}</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* ── IN-BROWSER CERTIFICATE PDF MODAL (NO DOWNLOAD REQUIRED) ── */}
      {previewCert && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-zinc-800 bg-zinc-950/95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white truncate">
                {previewCert.name}
              </p>
              <p className="text-[11px] text-zinc-400">
                {previewCert.issuer} · {previewCert.year}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={previewCert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 hover:border-amber-400/50"
              >
                <ExternalLink size={13} />
                <span className="hidden sm:inline">
                  {lang === "cs" ? "Nová záložka" : "Нова вкладка"}
                </span>
              </a>
              <a
                href={previewCert.file}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-black text-xs font-bold"
              >
                <Download size={13} />
                <span className="hidden sm:inline">{t.certDownload}</span>
              </a>
              <button
                onClick={() => setPreviewCert(null)}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>
          </div>
          <div
            className="flex-1 p-2 sm:p-5 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={previewCert.file}
              title={previewCert.name}
              className="w-full max-w-5xl h-full rounded-2xl border border-zinc-800 bg-white shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
