"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  ArrowRight,
  Terminal,
  Globe,
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

const PROJECT_DOMAINS = [
  "bowlingovyclubsv.cz",
  "nikita-box.cz",
  "honzapokusil.cz",
  "luxury-cleaning-solutions.ca",
  "Local Linux Server & Cloudflare",
];

const PROJECT_TYPES: ("web" | "infra")[] = ["web", "web", "web", "web", "infra"];

const PROJECT_TAGS = [
  ["Next.js", "React", "Tailwind CSS", "SEO Schema", "Reservations"],
  ["Next.js", "React", "Tailwind CSS", "Multilingual (CZ/UA)", "Dark Mode"],
  ["Next.js", "React", "CSS Modules", "Responsive Design", "Page Transitions"],
  ["Next.js", "React", "Tailwind CSS", "Instant Calculator", "Google Reviews"],
  ["Home Assistant", "Zigbee2MQTT", "Linux", "MikroTik", "Frigate NVR", "Cloudflare"],
];

const PROJECT_URLS = [
  "https://bowlingovyclubsv.cz/",
  "https://nikita-box.cz/",
  "https://honzapokusil.cz/",
  "https://www.luxury-cleaning-solutions.ca/",
  "#infra",
];

const TOOL_LOGOS = [
  { name: "Docker", logo: "/images/docker.png", width: 96, height: 28 },
  { name: "Figma", logo: "/images/figma.png", width: 76, height: 28 },
  { name: "VS Code", logo: "/images/vscode.png", width: 105, height: 28 },
  { name: "Swagger", logo: "/images/swagger.png", width: 90, height: 28 },
  { name: "Node.js", logo: "/images/nodejs.png", width: 82, height: 28 },
  { name: "WordPress", logo: "/images/wordpress.png", width: 95, height: 28 },
];

const TECH_TAGS = [
  { name: "C# (.NET)", cat: "Web" },
  { name: "Next.js 15", cat: "Web" },
  { name: "React 19", cat: "Web" },
  { name: "TypeScript", cat: "Web" },
  { name: "Tailwind CSS", cat: "Web" },
  { name: "Node.js", cat: "Web" },
  { name: "Linux Server", cat: "Infra" },
  { name: "Docker & Compose", cat: "Infra" },
  { name: "Cloudflare Zero-Trust", cat: "Infra" },
  { name: "Windows Server & AD", cat: "Infra" },
  { name: "VMware", cat: "Infra" },
  { name: "MikroTik RouterOS", cat: "Network" },
  { name: "OSPF & VRF", cat: "Network" },
  { name: "Site-to-Site VPN", cat: "Network" },
  { name: "Cisco CCNA", cat: "Network" },
  { name: "CZ / UA VLANs", cat: "Network" },
  { name: "Home Assistant", cat: "IoT" },
  { name: "Zigbee2MQTT", cat: "IoT" },
  { name: "Frigate NVR AI", cat: "IoT" },
  { name: "Figma", cat: "Design" },
];

const CAT_STYLES: Record<string, string> = {
  Web: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  Infra: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  Network: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  IoT: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Design: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const NODE_COUNT = 5;
const STEP_DEG = 360 / NODE_COUNT; // 72 deg

export default function WheelPortfolio() {
  const { t, lang, setLang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(0);
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

  // Continuous spring rotation for the wheel
  const targetRotation = useMotionValue(0);
  const smoothRotation = useSpring(targetRotation, {
    stiffness: 125,
    damping: 21,
    mass: 0.85,
  });
  const counterRotation = useTransform(smoothRotation, (v) => -v);
  const outerRingRotation = useTransform(smoothRotation, (v) => v * 0.35);

  const wheelZoneRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const wheelCooldownRef = useRef<number>(0);
  const dragStartYRef = useRef<number | null>(null);

  const wheelNodes = [
    {
      id: "about",
      num: "01",
      title: lang === "cs" ? "O mně" : "Про мене",
      sub: lang === "cs" ? "Celkový přehled" : "Загально про мене",
      icon: User,
    },
    {
      id: "services",
      num: "02",
      title: lang === "cs" ? "Kompetence" : "Компетенції",
      sub: lang === "cs" ? "DevOps, Sítě & Stack" : "DevOps, Мережі & Стек",
      icon: Cpu,
    },
    {
      id: "projects",
      num: "03",
      title: lang === "cs" ? "Projekty" : "Проєкти",
      sub: lang === "cs" ? "5 živých řešení" : "5 живих рішень",
      icon: Layers,
    },
    {
      id: "skills-section",
      num: "04",
      title: lang === "cs" ? "Certifikáty & Praxe" : "Сертифікати & Досвід",
      sub: lang === "cs" ? "VUT, Kyberna & Cisco" : "VUT, Kyberna & Cisco",
      icon: Award,
    },
    {
      id: "contact",
      num: "05",
      title: lang === "cs" ? "Kontakt" : "Контакт",
      sub: lang === "cs" ? "Napište mi" : "Зв'язатися",
      icon: Send,
    },
  ];

  const selectNode = useCallback(
    (nextIdx: number) => {
      const normalized = ((nextIdx % NODE_COUNT) + NODE_COUNT) % NODE_COUNT;
      const prevIdx = activeIndexRef.current;
      if (normalized === prevIdx) return;

      let diff = normalized - prevIdx;
      if (diff > NODE_COUNT / 2) diff -= NODE_COUNT;
      if (diff < -NODE_COUNT / 2) diff += NODE_COUNT;

      targetRotation.set(targetRotation.get() - diff * STEP_DEG);
      activeIndexRef.current = normalized;
      setActiveIndex(normalized);

      if (contentScrollRef.current) {
        contentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [targetRotation]
  );

  const stepWheel = useCallback(
    (delta: 1 | -1) => {
      selectNode(activeIndexRef.current + delta);
    },
    [selectNode]
  );

  // Sync initial URL hash if visited via /#contact, /#projects, etc.
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

  // Mouse wheel gesture on the Left Wheel Zone
  useEffect(() => {
    const el = wheelZoneRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      e.preventDefault();
      const now = Date.now();
      if (now - wheelCooldownRef.current < 380) return;
      if (Math.abs(e.deltaY) < 12) return;

      wheelCooldownRef.current = now;
      stepWheel(e.deltaY > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [stepWheel]);

  // Keyboard navigation (ArrowUp / ArrowDown when not focused in inputs, Esc for modal)
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

  // Pointer drag on wheel
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartYRef.current = e.clientY;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartYRef.current === null) return;
    const dy = e.clientY - dragStartYRef.current;
    dragStartYRef.current = null;
    if (Math.abs(dy) > 36) {
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

  const nextNode = wheelNodes[(activeIndex + 1) % NODE_COUNT];

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#060609] text-white relative flex flex-col select-none lg:select-auto">
      {/* Cyber-Luxury Background Telemetry & Ambient Auras */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="fixed top-1/2 left-[18%] -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-[radial-gradient(circle,rgba(245,158,11,0.11)_0%,rgba(217,119,6,0.03)_42%,transparent_72%)] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[10%] w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(56,189,248,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* ── TOP MINIMAL HUD HEADER ── */}
      <header className="relative z-30 h-16 shrink-0 border-b border-white/[0.06] bg-[#07070b]/80 backdrop-blur-xl px-4 sm:px-8">
        <div className="max-w-[1440px] h-full mx-auto flex items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={() => selectNode(0)}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:border-amber-400/60 group-hover:shadow-gold-sm transition-all">
              <span className="font-mono font-bold text-xs">&lt;/&gt;</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Roman Roshkanyuk
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-medium text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  VUT FEKT
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase">
                DevOps &amp; IT Specialist
              </p>
            </div>
          </button>

          {/* Right HUD Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Active Node Telemetry Counter */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/70 border border-zinc-800/80 text-xs font-mono">
              <span className="text-amber-400 font-bold">
                {wheelNodes[activeIndex].num}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-500">05</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700 mx-0.5" />
              <span className="text-zinc-300 font-sans font-medium">
                {wheelNodes[activeIndex].title}
              </span>
            </div>

            {/* Language Switcher (CS / UA) */}
            <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-full p-0.5 text-[11px] font-bold">
              <button
                onClick={() => setLang("cs")}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  lang === "cs"
                    ? "bg-amber-400 text-black shadow-gold-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                CZ
              </button>
              <button
                onClick={() => setLang("uk")}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-amber-400 hover:border-amber-400/40 transition-all"
              title="File Server"
            >
              <FolderOpen size={13} className="text-amber-400" />
              <span className="hidden xl:inline">Files</span>
            </Link>

            {/* CV Link */}
            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-semibold text-zinc-200 hover:text-black hover:bg-amber-400 hover:border-amber-400 transition-all"
            >
              <span>CV</span>
            </Link>

            {/* Contact Quick Jump */}
            <button
              onClick={() => selectNode(4)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-extrabold shadow-gold-sm hover:shadow-gold-md transition-all cursor-pointer"
            >
              <Sparkles size={12} />
              <span>{t.headerCta}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE ROTARY DIAL STRIP (< lg) ── */}
      <div className="lg:hidden sticky top-0 z-20 bg-[#08080c]/90 backdrop-blur-xl border-b border-white/[0.07] px-3 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {wheelNodes.map((node, idx) => {
            const Icon = node.icon;
            const isActive = idx === activeIndex;
            return (
              <button
                key={node.id}
                onClick={() => selectNode(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-gold-sm"
                    : "bg-zinc-900/80 border border-zinc-800 text-zinc-300"
                }`}
              >
                <Icon size={14} className={isActive ? "text-black" : "text-amber-400"} />
                <span>{node.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN SPLIT STAGE: LEFT WHEEL + RIGHT CONTENT ── */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center relative z-10 lg:h-[calc(100vh-4rem)]">
        {/* ═══════════════════════════════════════════════════════════════════
            LEFT COLUMN: INTERACTIVE ORBITAL ROTARY WHEEL (Desktop lg+)
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          ref={wheelZoneRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center relative h-full select-none"
        >
          <div className="relative flex items-center justify-center w-[330px] h-[330px] xl:w-[415px] xl:h-[415px]">
            {/* Outer Precision Degree Ring (Subtly coupled rotation) */}
            <motion.svg
              style={{ rotate: outerRingRotation }}
              viewBox="0 0 440 440"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <defs>
                <linearGradient id="activeGoldArc" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Outer technical dashed boundary */}
              <circle
                cx="220"
                cy="220"
                r="212"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                strokeDasharray="3 7"
              />
              {/* 36 radial precision ticks */}
              {Array.from({ length: 36 }).map((_, i) => {
                const deg = i * 10;
                const isMajor = i % 3 === 0;
                return (
                  <line
                    key={i}
                    x1="220"
                    y1={isMajor ? "12" : "16"}
                    x2="220"
                    y2="22"
                    stroke={
                      isMajor ? "rgba(251,191,36,0.35)" : "rgba(255,255,255,0.09)"
                    }
                    strokeWidth={isMajor ? "1.5" : "1"}
                    transform={`rotate(${deg} 220 220)`}
                  />
                );
              })}
            </motion.svg>

            {/* Static Orbital Track + Active 3-o'clock Sector Highlight */}
            <svg
              viewBox="0 0 440 440"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* Main orbital circle where nodes travel (41% of 440 = r ~ 180.4) */}
              <circle
                cx="220"
                cy="220"
                r="180"
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="1.5"
              />
              {/* Inner telemetry ring */}
              <circle
                cx="220"
                cy="220"
                r="104"
                fill="none"
                stroke="rgba(251,191,36,0.16)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              {/* Glowing gold arc around 3 o'clock (-32deg to +32deg) */}
              <path
                d="M 372.6 124.6 A 180 180 0 0 1 372.6 315.4"
                fill="none"
                stroke="url(#activeGoldArc)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* 3 O'Clock Active Docking Beam -> Points straight into Right Content Panel */}
            <div className="absolute right-[-28px] xl:right-[-38px] top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
              <div className="w-3 h-3 rotate-45 border-t-2 border-r-2 border-amber-400 mr-1 animate-pulse" />
              <div className="w-8 xl:w-12 h-[2px] bg-gradient-to-r from-amber-400 via-amber-400/60 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
            </div>

            {/* ROTATING WHEEL SPOKES & ORBITAL NODES */}
            <motion.div
              style={{ rotate: smoothRotation }}
              className="absolute inset-0 w-full h-full z-20 will-composite"
            >
              {wheelNodes.map((node, idx) => {
                const angleDeg = idx * STEP_DEG;
                const angleRad = (angleDeg * Math.PI) / 180;
                // 180 / 440 = 40.91% radius from center
                const xPct = 50 + 40.91 * Math.cos(angleRad);
                const yPct = 50 + 40.91 * Math.sin(angleRad);
                const isActive = idx === activeIndex;
                const Icon = node.icon;

                return (
                  <React.Fragment key={node.id}>
                    {/* Subtle radial spoke from hub toward node */}
                    <div
                      style={{
                        transform: `translateY(-50%) rotate(${angleDeg}deg)`,
                      }}
                      className="absolute left-1/2 top-1/2 w-[40.91%] h-[1px] origin-left pointer-events-none"
                    >
                      <div
                        className={`w-full h-full transition-opacity duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-amber-400/40 via-amber-400/30 to-amber-400/70 opacity-100"
                            : "bg-gradient-to-r from-transparent via-white/[0.05] to-white/[0.08] opacity-70"
                        }`}
                      />
                    </div>

                    {/* Node Position Anchor */}
                    <div
                      style={{ left: `${xPct}%`, top: `${yPct}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      {/* Upright Counter-Rotating Button */}
                      <motion.button
                        type="button"
                        style={{ rotate: counterRotation }}
                        onClick={() => selectNode(idx)}
                        className="group relative flex flex-col items-center focus:outline-none cursor-pointer will-composite"
                      >
                        {/* Orbital Orb */}
                        <div
                          className={`relative flex items-center justify-center rounded-2xl transition-all duration-300 ${
                            isActive
                              ? "w-14 h-14 xl:w-16 xl:h-16 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-black shadow-[0_0_30px_rgba(251,191,36,0.55)] ring-4 ring-amber-400/25 scale-105"
                              : "w-11 h-11 xl:w-12 xl:h-12 bg-[#121218]/95 border border-zinc-700/80 text-zinc-300 hover:border-amber-400/60 hover:text-amber-300 hover:scale-105 shadow-lg backdrop-blur-md"
                          }`}
                        >
                          <Icon size={isActive ? 22 : 18} strokeWidth={isActive ? 2.4 : 2} />
                          <span
                            className={`absolute -top-1.5 -right-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${
                              isActive
                                ? "bg-black text-amber-400 border-amber-400"
                                : "bg-zinc-900 text-zinc-400 border-zinc-700 group-hover:text-amber-300"
                            }`}
                          >
                            {node.num}
                          </span>
                        </div>

                        {/* Floating Node Label Pill */}
                        <div
                          className={`mt-2 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-300 backdrop-blur-md ${
                            isActive
                              ? "bg-amber-400/15 border border-amber-400/50 text-amber-300 shadow-gold-sm"
                              : "bg-zinc-950/85 border border-zinc-800/90 text-zinc-400 group-hover:text-white group-hover:border-zinc-700"
                          }`}
                        >
                          {node.title}
                        </div>
                      </motion.button>
                    </div>
                  </React.Fragment>
                );
              })}
            </motion.div>

            {/* STATIONARY CENTER HUB (Portrait + Telemetry Core) */}
            <div className="relative z-30 flex flex-col items-center justify-center pointer-events-none">
              <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-amber-400/60 via-zinc-800 to-amber-500/30 shadow-[0_0_45px_rgba(0,0,0,0.9)]">
                <div className="relative w-28 h-28 xl:w-36 xl:h-36 rounded-full overflow-hidden border-2 border-zinc-900 bg-zinc-950">
                  <Image
                    src="/images/roman.png"
                    alt="Roman Roshkanyuk"
                    fill
                    sizes="144px"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-2 inset-x-0 text-center">
                    <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/70 text-amber-300 border border-amber-400/30">
                      {wheelNodes[activeIndex].num} · ACTIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tactile Wheel Controls Footer (Below Wheel) */}
          <div className="mt-4 flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md">
            <button
              onClick={() => stepWheel(-1)}
              className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-amber-400 text-zinc-300 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous section"
            >
              <ChevronUp size={15} />
            </button>

            <div className="flex items-center gap-1.5 px-1">
              {wheelNodes.map((n, i) => (
                <button
                  key={n.id}
                  onClick={() => selectNode(i)}
                  aria-label={n.title}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? "w-6 bg-amber-400"
                      : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => stepWheel(1)}
              className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-amber-400 text-zinc-300 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next section"
            >
              <ChevronDown size={15} />
            </button>

            <span className="text-[10px] font-mono text-zinc-500 pl-1 border-l border-zinc-800">
              {lang === "cs" ? "Kolečko / Klik" : "Скрол / Клік"}
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            RIGHT COLUMN: DYNAMIC GLASS CONTENT STAGE
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full lg:py-5 min-h-0">
          <div className="relative flex flex-col bg-[#0e0e13]/85 border border-white/[0.08] rounded-[2rem] shadow-[0_20px_70px_rgba(0,0,0,0.75)] backdrop-blur-2xl overflow-hidden lg:max-h-[calc(100vh-6.5rem)]">
            {/* Subtle top gold laser accent */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent pointer-events-none" />

            {/* Panel HUD Top Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 border-b border-white/[0.06] bg-zinc-950/40 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  SEC // {wheelNodes[activeIndex].num} — {wheelNodes[activeIndex].sub}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              </div>
            </div>

            {/* Scrollable Dynamic Body */}
            <div
              ref={contentScrollRef}
              className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-9 space-y-6"
            >
              <AnimatePresence mode="wait">
                {/* ──────────────────────────────────────────────────────────
                    NODE 01: GENERAL ABOUT ME ("Загально про мене")
                ────────────────────────────────────────────────────────── */}
                {activeIndex === 0 && (
                  <motion.div
                    key="node-about"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Mobile Avatar + Greeting Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-[11px] font-medium text-amber-300 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{t.heroStatus}</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl xl:text-[2.65rem] font-extrabold tracking-tight text-white leading-[1.12]">
                          {t.heroGreeting},{" "}
                          <span className="text-gold-gradient">Roman Roshkanyuk</span>
                        </h1>
                        <p className="text-sm sm:text-base text-zinc-400 mt-1.5 font-medium">
                          <span className="text-amber-400 font-bold">{t.heroSubtitle}</span>{" "}
                          · {t.heroSubtitleDesc}
                        </p>
                      </div>

                      <div className="lg:hidden relative w-20 h-20 rounded-2xl overflow-hidden border border-amber-400/40 shrink-0">
                        <Image
                          src="/images/roman.png"
                          alt="Roman Roshkanyuk"
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* General Bio Narrative */}
                    <div className="space-y-3.5 text-sm sm:text-[15px] text-zinc-300 leading-relaxed bg-zinc-900/45 border border-white/[0.06] rounded-2xl p-5">
                      <p>
                        {t.aboutBio1.map((part, i) =>
                          i % 2 === 0 ? (
                            part
                          ) : (
                            <span
                              key={i}
                              className={
                                i === 1
                                  ? "text-white font-semibold"
                                  : "text-amber-400 font-semibold"
                              }
                            >
                              {part}
                            </span>
                          )
                        )}
                      </p>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        {t.aboutBio2.map((part, i) =>
                          i % 2 === 0 ? (
                            part
                          ) : (
                            <span key={i} className="text-zinc-200 font-medium">
                              {part}
                            </span>
                          )
                        )}
                      </p>
                    </div>

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-3 gap-3">
                      {t.aboutStats.map((stat, i) => (
                        <div
                          key={i}
                          className="bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-3.5 text-center hover:border-amber-400/40 transition-colors"
                        >
                          <div className="text-xl sm:text-2xl font-extrabold text-gold-gradient">
                            {stat.number}
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 2-Column Bento: Domain Highlights + Live Infrastructure Telemetry */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* 4 Quick Domains */}
                      <div className="md:col-span-7 grid grid-cols-2 gap-2.5">
                        {t.aboutDomains.map((d, i) => (
                          <div
                            key={i}
                            className="bg-zinc-900/55 border border-zinc-800/80 rounded-2xl p-3 hover:border-amber-400/35 transition-colors"
                          >
                            <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                              {d.tag}
                            </span>
                            <div className="text-xs font-bold text-white mt-2 mb-0.5">
                              {d.label}
                            </div>
                            <div className="text-[11px] text-zinc-400 leading-snug">
                              {d.desc}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Live Sys-Matrix Telemetry */}
                      <div className="md:col-span-5 p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 font-mono text-[11px] flex flex-col justify-between space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                            <Terminal size={12} className="text-amber-400" />
                            {t.heroInfraTitle}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-sans flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Online
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {t.heroInfraRows.map((row, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-2"
                            >
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

                    {/* Action Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href="/cv"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm shadow-gold-sm transition-all"
                        >
                          <Download size={15} />
                          <span>{t.heroCvBtn}</span>
                        </Link>
                        <button
                          onClick={() => selectNode(2)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 hover:border-amber-400/50 text-zinc-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                        >
                          <span>{lang === "cs" ? "Živé projekty" : "Живі проєкти"}</span>
                          <ArrowRight size={14} className="text-amber-400" />
                        </button>
                      </div>

                      {/* Social Icons */}
                      <div className="flex items-center gap-2.5">
                        <a
                          href="https://github.com/rizzer18"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 transition-all"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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
                          className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 transition-all"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ──────────────────────────────────────────────────────────
                    NODE 02: COMPETENCIES & TECH STACK
                ────────────────────────────────────────────────────────── */}
                {activeIndex === 1 && (
                  <motion.div
                    key="node-services"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        {t.servicesTitle[0]}
                        <span className="text-gold-gradient">{t.servicesTitle[1]}</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1.5">
                        {t.servicesDesc}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {t.services.map((svc, idx) => (
                        <div
                          key={idx}
                          className="bg-zinc-900/60 border border-zinc-800/90 hover:border-amber-400/45 rounded-2xl p-5 flex flex-col justify-between transition-colors"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/25 text-amber-400 font-mono text-xs font-bold">
                                {svc.num}
                              </span>
                              {idx === 0 && <Wifi size={18} className="text-amber-400" />}
                              {idx === 1 && <Server size={18} className="text-sky-400" />}
                              {idx === 2 && <Home size={18} className="text-emerald-400" />}
                              {idx === 3 && <Code size={18} className="text-violet-400" />}
                            </div>
                            <h3 className="text-base font-bold text-white mb-0.5">
                              {svc.title}
                            </h3>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5">
                              {svc.subtitle}
                            </p>
                            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                              {svc.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/80">
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

                    {/* Tool Logos + Full Tech Cloud */}
                    <div className="pt-4 border-t border-zinc-800/80 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                        {t.techLabel}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        {TOOL_LOGOS.map((tool) => (
                          <div
                            key={tool.name}
                            className="px-3.5 py-2 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-center"
                          >
                            <Image
                              src={tool.logo}
                              alt={tool.name}
                              width={tool.width}
                              height={tool.height}
                              className="max-h-6 w-auto object-contain"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {TECH_TAGS.map((item) => (
                          <span
                            key={item.name}
                            className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                              CAT_STYLES[item.cat]
                            }`}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ──────────────────────────────────────────────────────────
                    NODE 03: PRODUCTION PROJECTS
                ────────────────────────────────────────────────────────── */}
                {activeIndex === 2 && (
                  <motion.div
                    key="node-projects"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    className="space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                          <span>{t.projectsTitle1}</span>
                          <span className="text-gold-gradient">{t.projectsTitle2}</span>
                          <Trophy size={22} className="text-amber-400" />
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">{t.projectsDesc}</p>
                      </div>

                      <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full p-1 self-start">
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
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredProjects.map((project) => {
                        const isExternal = project.liveUrl.startsWith("http");
                        return (
                          <div
                            key={project.id}
                            className="group rounded-2xl border border-zinc-800/90 hover:border-amber-400/50 bg-zinc-900/55 p-5 flex flex-col justify-between transition-all"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  {t.liveProduction}
                                </span>
                                <span className="text-[11px] font-mono text-zinc-500 truncate">
                                  {project.domain}
                                </span>
                              </div>
                              <h3 className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 mt-0.5 mb-2.5">
                                {project.category}
                              </p>
                              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                                {project.description}
                              </p>
                            </div>

                            <div>
                              <div className="flex flex-wrap gap-1 mb-4">
                                {project.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-950 text-zinc-300 border border-zinc-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                                {isExternal ? (
                                  <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors"
                                  >
                                    <span>{t.projectLiveBtn}</span>
                                    <ExternalLink size={13} />
                                  </a>
                                ) : (
                                  <button
                                    onClick={() => selectNode(1)}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors cursor-pointer"
                                  >
                                    <span>{t.projectViewBtn}</span>
                                    <Server size={13} className="text-amber-400" />
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
                  </motion.div>
                )}

                {/* ──────────────────────────────────────────────────────────
                    NODE 04: SKILLS, EDUCATION, EXPERIENCE & CERTIFICATES
                ────────────────────────────────────────────────────────── */}
                {activeIndex === 3 && (
                  <motion.div
                    key="node-qualifications"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                          {t.tabsTitlePrefix}{" "}
                          <span className="text-gold-gradient">{t.tabsTitleParts[0]}</span>,{" "}
                          <span className="text-gold-gradient">{t.tabsTitleParts[1]}</span>{" "}
                          {t.tabsTitleConjunction}{" "}
                          <span className="text-gold-gradient">{t.tabsTitleParts[2]}</span>
                        </h2>
                      </div>

                      {/* Quick Sub-filter */}
                      <div className="flex flex-wrap items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full p-1 self-start">
                        {(
                          [
                            { id: "all", label: lang === "cs" ? "Vše" : "Все" },
                            {
                              id: "certs",
                              label: `${lang === "cs" ? "Certifikáty" : "Сертифікати"} (6)`,
                            },
                            { id: "skills", label: t.tabLabels[0] },
                            { id: "edu", label: lang === "cs" ? "Vzdělání & Praxe" : "Освіта & Досвід" },
                          ] as const
                        ).map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setQualFilter(tab.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
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

                    {/* Education & Experience */}
                    {(qualFilter === "all" || qualFilter === "edu") && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {t.schools.map((school, idx) => (
                            <div
                              key={idx}
                              className="bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-4"
                            >
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                                  <GraduationCap size={14} />
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
                              <h3 className="text-sm font-bold text-white">{school.name}</h3>
                              <p className="text-xs text-zinc-300 mt-0.5">{school.desc}</p>
                              <p className="text-[11px] text-zinc-500 mt-1 leading-snug">
                                {school.sub}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {t.expCards.map((card, idx) => (
                            <div
                              key={idx}
                              className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4"
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                                {card.tag}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                                <Briefcase size={13} className="text-amber-400 shrink-0" />
                                <span>{card.title}</span>
                              </h4>
                              <p className="text-[11px] text-zinc-300 leading-relaxed">
                                {card.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Verified Certificates (Inline Preview in Browser without downloading!) */}
                    {(qualFilter === "all" || qualFilter === "certs") && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
                          <Shield size={14} className="text-amber-400" />
                          <span>
                            {t.certsTitle} ({CERTIFICATES.length}) —{" "}
                            <span className="text-zinc-500 font-normal normal-case">
                              {lang === "cs"
                                ? "otevření přímo v prohlížeči bez stahování"
                                : "відкриття прямо в браузері без скачування"}
                            </span>
                          </span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {CERTIFICATES.map((cert, i) => (
                            <div
                              key={i}
                              onClick={() => setPreviewCert(cert)}
                              className="bg-zinc-900/70 border border-zinc-800/90 hover:border-amber-400/50 rounded-2xl p-3.5 flex flex-col justify-between gap-3 cursor-pointer group transition-all"
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
                                <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                                  {cert.name}
                                </p>
                                <p className="text-[10px] text-zinc-400 mt-0.5">
                                  {cert.issuer}
                                </p>
                              </div>

                              <div
                                className="flex items-center gap-1.5 pt-2 border-t border-zinc-800/70"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  onClick={() => setPreviewCert(cert)}
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400 text-amber-300 hover:text-black text-[11px] font-bold transition-all cursor-pointer"
                                >
                                  <Eye size={12} />
                                  <span>{t.certView}</span>
                                </button>
                                <a
                                  href={cert.file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all"
                                  title={
                                    lang === "cs"
                                      ? "Otevřít v nové záložce"
                                      : "Відкрити у новій вкладці"
                                  }
                                >
                                  <ExternalLink size={13} />
                                </a>
                                <a
                                  href={cert.file}
                                  download
                                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all"
                                  title={t.certDownload}
                                >
                                  <Download size={13} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Detailed Technical Skills */}
                    {(qualFilter === "all" || qualFilter === "skills") && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {t.skillCats.map((cat, ci) => (
                          <div
                            key={ci}
                            className="bg-zinc-900/55 border border-zinc-800/80 rounded-2xl p-4"
                          >
                            <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2.5">
                              {cat.title}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {cat.items.map((item) => (
                                <span
                                  key={item}
                                  className="text-[11px] px-2.5 py-0.5 rounded-lg bg-zinc-800/90 text-zinc-200 border border-zinc-700/40"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="bg-zinc-900/55 border border-zinc-800/80 rounded-2xl p-4">
                          <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <CheckCircle2 size={13} />
                            {t.skillLangsTitle}
                          </h4>
                          <ul className="text-xs text-zinc-300 space-y-1.5">
                            {t.skillLangs.map((l, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                <span className="font-semibold text-white">{l.lang}</span> —{" "}
                                {l.level}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ──────────────────────────────────────────────────────────
                    NODE 05: CONTACT
                ────────────────────────────────────────────────────────── */}
                {activeIndex === 4 && (
                  <motion.div
                    key="node-contact"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        {t.contactTitle[0]}
                        <span className="text-gold-gradient">{t.contactTitle[1]}</span>
                        {t.contactTitle[2]}
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        {t.contactSubtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href="mailto:romanroskanuk74@gmail.com"
                        className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-amber-400/50 transition-all group"
                      >
                        <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                          <Mail size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                            {t.emailLabel}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 truncate">
                            romanroskanuk74@gmail.com
                          </div>
                        </div>
                      </a>

                      <a
                        href="tel:+420605447445"
                        className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-amber-400/50 transition-all group"
                      >
                        <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                          <Phone size={18} />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                            {t.phoneLabel}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300">
                            +420 605 447 445
                          </div>
                        </div>
                      </a>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-3.5">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, subject: e.target.value }))
                        }
                        placeholder={t.formSubject}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/85 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          placeholder={t.formName}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-zinc-900/85 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, phone: e.target.value }))
                          }
                          placeholder={t.formPhone}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-900/85 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder={t.formEmail}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/85 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder={t.formMessage}
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/85 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm shadow-gold-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 transition-all"
                      >
                        <span>{isSubmitting ? t.formSending : t.formSend}</span>
                        <Send size={15} />
                      </button>

                      {isSubmitted && (
                        <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-400/10 border border-amber-400/30 p-3 rounded-xl">
                          <CheckCircle2 size={15} className="text-amber-400" />
                          <span>{t.formSuccess}</span>
                        </div>
                      )}

                      {submitError && (
                        <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
                          ⚠ {submitError}
                        </div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Panel Bottom Next-Node Stepper */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500">
                <span>© {new Date().getFullYear()} Roman Roshkanyuk</span>
                <button
                  onClick={() => stepWheel(1)}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer transition-colors"
                >
                  <span>
                    {lang === "cs" ? "Další na kole:" : "Далі на колесі:"} {nextNode.title}
                  </span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── IN-BROWSER CERTIFICATE PDF MODAL (NO DOWNLOAD REQUIRED) ── */}
      {previewCert && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-zinc-800 bg-zinc-950/95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{previewCert.name}</p>
              <p className="text-[11px] text-zinc-400">
                {previewCert.issuer} · {previewCert.year}
              </p>
            </div>
            <div className="flex items-center gap-2">
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
            className="flex-1 p-3 sm:p-6 flex items-center justify-center"
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
