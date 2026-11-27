"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  Eye,
  FolderOpen,
  Globe,
  Layers,
  Mail,
  Menu,
  Network,
  Phone,
  Send,
  Server,
  Shield,
  Terminal,
  X,
} from "lucide-react";
import { useLanguage, type Lang, type Translations } from "../context/LanguageContext";

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
    badge: "HW & OS",
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

const TOOL_LOGOS = [
  { name: "Docker", logo: "/images/docker.png", width: 84, height: 24 },
  { name: "VS Code", logo: "/images/vscode.png", width: 92, height: 24 },
  { name: "Node.js", logo: "/images/nodejs.png", width: 74, height: 24 },
  { name: "Swagger", logo: "/images/swagger.png", width: 80, height: 24 },
  { name: "Figma", logo: "/images/figma.png", width: 68, height: 24 },
  { name: "WordPress", logo: "/images/wordpress.png", width: 84, height: 24 },
];

/**
 * Geometric 8-point starburst brand mark (Nordic architectural emblem)
 */
function StarburstMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2.5V8.5M12 15.5V21.5M2.5 12H8.5M15.5 12H21.5M5.28 5.28L9.52 9.52M14.48 14.48L18.72 18.72M18.72 5.28L14.48 9.52M9.52 14.48L5.28 18.72"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Contact Modal (wired to /api/contact)
 */
const ContactModal = memo(function ContactModal({
  open,
  onClose,
  lang,
  t,
}: {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  t: Translations;
}) {
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

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#161310]/95 border border-white/[0.14] shadow-[0_30px_80px_rgba(0,0,0,0.75)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.09]">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9b968f] block">
              {lang === "cs" ? "Přímé spojení" : "Прямий зв'язок"}
            </span>
            <h3 className="font-serif text-2xl text-[#f5f4f1] tracking-[-0.02em]">
              {lang === "cs" ? "Napište mi zprávu" : "Напишіть мені"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/[0.14] bg-white/[0.04] flex items-center justify-center text-[#f5f4f1]/70 hover:text-[#f5f4f1] hover:bg-white/[0.1] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12.5px]">
            <a
              href="mailto:romanroskanuk74@gmail.com"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[#f5f4f1]/85 hover:border-white/[0.28] transition-colors truncate"
            >
              <Mail size={14} className="text-[#3fbf7f] shrink-0" />
              <span className="truncate">romanroskanuk74@gmail.com</span>
            </a>
            <a
              href="tel:+420605447445"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[#f5f4f1]/85 hover:border-white/[0.28] transition-colors"
            >
              <Phone size={14} className="text-[#3fbf7f] shrink-0" />
              <span>+420 605 447 445</span>
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
              placeholder={t.formSubject}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-[13.5px] text-[#f5f4f1] placeholder-[#9b968f] focus:outline-none focus:border-white/[0.38] transition-colors"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder={t.formName}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-[13.5px] text-[#f5f4f1] placeholder-[#9b968f] focus:outline-none focus:border-white/[0.38] transition-colors"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                placeholder={t.formPhone}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-[13.5px] text-[#f5f4f1] placeholder-[#9b968f] focus:outline-none focus:border-white/[0.38] transition-colors"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              placeholder={t.formEmail}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-[13.5px] text-[#f5f4f1] placeholder-[#9b968f] focus:outline-none focus:border-white/[0.38] transition-colors"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              placeholder={t.formMessage}
              rows={4}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-[13.5px] text-[#f5f4f1] placeholder-[#9b968f] focus:outline-none focus:border-white/[0.38] transition-colors resize-none"
            />

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-[12px] text-[#9b968f] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3fbf7f]" />
                <span>{lang === "cs" ? "Odpovídám obratem" : "Відповідаю оперативно"}</span>
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] font-medium text-[13.5px] inline-flex items-center gap-2 cursor-pointer disabled:opacity-60 transition-all"
              >
                <span>{isSubmitting ? t.formSending : t.formSend}</span>
                <Send size={13} />
              </button>
            </div>

            {isSubmitted && (
              <div className="flex items-center gap-2 text-[13px] text-[#3fbf7f] bg-[#3fbf7f]/10 border border-[#3fbf7f]/30 p-3 rounded-xl">
                <Check size={15} />
                <span>{t.formSuccess}</span>
              </div>
            )}

            {submitError && (
              <div className="text-[13px] text-[#e8674a] bg-[#e8674a]/10 border border-[#e8674a]/30 p-3 rounded-xl">
                {submitError}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
});

export default function WheelPortfolio() {
  const { t, lang, setLang } = useLanguage();
  const isCs = lang === "cs";

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [activeWebShowcase, setActiveWebShowcase] = useState<0 | 1>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#contact") {
      setContactOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!previewCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewCert(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewCert]);

  const openContact = useCallback(() => {
    setMobileNavOpen(false);
    setContactOpen(true);
  }, []);

  return (
    <div id="top" className="min-h-screen text-[#f5f4f1] relative">
      {/* ═══════════════════════════════════════════════════════════════════════
          1. SLIM TOP PRODUCT / DOMAIN STRIP + STICKY GLASS NAVBAR
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="border-b border-white/[0.07] bg-[#100e0b]/40 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-9 flex items-center justify-between gap-4 text-[12px]">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
            <a
              href="#top"
              className="text-[#f5f4f1] font-medium h-9 inline-flex items-center border-b-2 border-[#f5f4f1] whitespace-nowrap"
            >
              {isCs ? "Přehled systémů" : "Огляд систем"}
            </a>
            <a
              href="#homelab"
              className="text-[#9b968f] hover:text-[#f5f4f1] transition-colors whitespace-nowrap"
            >
              Home Lab CI/CD
            </a>
            <a
              href="#commercial"
              className="text-[#9b968f] hover:text-[#f5f4f1] transition-colors whitespace-nowrap"
            >
              {isCs ? "Komerční produkce (4)" : "Комерційний веб (4)"}
            </a>
            <Link
              href="/uploadFile"
              className="text-[#9b968f] hover:text-[#f5f4f1] transition-colors whitespace-nowrap hidden sm:inline"
            >
              File Server
            </Link>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#a39e96]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3fbf7f]" />
              <span>VUT Brno FEKT · 2× Cisco CCNA</span>
            </span>

            <div className="flex items-center gap-1 font-mono text-[11.5px]">
              <button
                type="button"
                onClick={() => setLang("cs")}
                className={`px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                  isCs
                    ? "bg-white/[0.14] text-[#f5f4f1]"
                    : "text-[#9b968f] hover:text-[#f5f4f1]"
                }`}
              >
                CZ
              </button>
              <button
                type="button"
                onClick={() => setLang("uk")}
                className={`px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                  !isCs
                    ? "bg-white/[0.14] text-[#f5f4f1]"
                    : "text-[#9b968f] hover:text-[#f5f4f1]"
                }`}
              >
                UA
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Glassmorphic Main Navbar */}
      <header className="sticky top-0 z-40 h-14 bg-[#100e0b]/72 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-full flex items-center justify-between gap-4">
          <a href="#top" className="inline-flex items-center gap-2.5 group shrink-0">
            <StarburstMark className="w-5 h-5 text-[#f5f4f1] group-hover:rotate-45 transition-transform duration-500" />
            <span className="font-serif text-[21px] tracking-[-0.02em] text-[#f5f4f1]">
              Roman Roshkanyuk
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] text-[#f5f4f1]/75">
            <a href="#overview" className="editorial-link hover:text-[#f5f4f1] transition-colors">
              {isCs ? "Domény" : "Домени"}
            </a>
            <a href="#homelab" className="editorial-link hover:text-[#f5f4f1] transition-colors">
              Home Lab &amp; Sítě
            </a>
            <a href="#commercial" className="editorial-link hover:text-[#f5f4f1] transition-colors">
              {isCs ? "Komerční projekty" : "Комерційні проєкти"}
            </a>
            <a href="#metrics" className="editorial-link hover:text-[#f5f4f1] transition-colors">
              {isCs ? "Praxe & ISSS" : "Досвід & ISSS"}
            </a>
            <a href="#credentials" className="editorial-link hover:text-[#f5f4f1] transition-colors">
              {isCs ? "Certifikáty (6)" : "Сертифікати (6)"}
            </a>
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/cv"
              className="hidden sm:inline-flex items-center h-9 px-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-[13px] font-medium text-[#f5f4f1] transition-colors"
            >
              CV / PDF
            </Link>
            <button
              type="button"
              onClick={openContact}
              className="h-9 px-4 sm:px-5 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] text-[13px] font-medium transition-colors cursor-pointer"
            >
              {t.headerCta}
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="lg:hidden w-9 h-9 rounded-full border border-white/[0.14] flex items-center justify-center text-[#f5f4f1] cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileNavOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileNavOpen && (
          <div className="lg:hidden border-b border-white/[0.1] bg-[#14110d]/95 backdrop-blur-2xl px-6 py-5 space-y-3 text-[14px]">
            <a
              href="#overview"
              onClick={() => setMobileNavOpen(false)}
              className="block py-1.5 text-[#f5f4f1]/85"
            >
              {isCs ? "Inženýrské domény" : "Інженерні домени"}
            </a>
            <a
              href="#homelab"
              onClick={() => setMobileNavOpen(false)}
              className="block py-1.5 text-[#f5f4f1]/85"
            >
              Home Lab &amp; CI/CD
            </a>
            <a
              href="#commercial"
              onClick={() => setMobileNavOpen(false)}
              className="block py-1.5 text-[#f5f4f1]/85"
            >
              {isCs ? "Komerční projekty (4)" : "Комерційні проєкти (4)"}
            </a>
            <a
              href="#credentials"
              onClick={() => setMobileNavOpen(false)}
              className="block py-1.5 text-[#f5f4f1]/85"
            >
              {isCs ? "Certifikáty & VUT" : "Сертифікати & VUT"}
            </a>
            <div className="pt-2 flex items-center gap-3 border-t border-white/[0.08]">
              <Link
                href="/cv"
                onClick={() => setMobileNavOpen(false)}
                className="px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] text-[13px]"
              >
                CV / PDF
              </Link>
              <Link
                href="/uploadFile"
                onClick={() => setMobileNavOpen(false)}
                className="px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] text-[13px]"
              >
                File Server
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. HERO SECTION (DOT MATRIX + DUAL-TONE SERIF H1 + 4-TILE BENTO GRID)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 border-b border-white/[0.09]">
        <div className="absolute inset-0 hero-dot-matrix pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 space-y-10 sm:space-y-12">
          {/* Asymmetric 1.45fr / 1fr Editorial Header */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-6 lg:gap-12 items-end">
            <h1 className="font-serif font-normal text-[clamp(38px,5vw,76px)] leading-[1.02] tracking-[-0.028em]">
              {isCs ? (
                <>
                  <span className="text-[#f5f4f1]">Spolehlivá infrastruktura</span>{" "}
                  <span className="text-[#9b968f] block sm:inline">od paketů až po kód.</span>
                </>
              ) : (
                <>
                  <span className="text-[#f5f4f1]">Надійна інфраструктура</span>{" "}
                  <span className="text-[#9b968f] block sm:inline">від пакетів до коду.</span>
                </>
              )}
            </h1>

            <p className="text-[15.5px] sm:text-[17.5px] leading-[1.48] text-[#a39e96] max-w-xl lg:pb-1">
              <span className="text-[#f5f4f1] font-medium">
                {isCs
                  ? "DevOps, Linux, sítě (2× Cisco CCNA / MikroTik) a vývoj v C# (.NET) & Next.js"
                  : "DevOps, Linux, мережі (2× Cisco CCNA / MikroTik) та розробка на C# (.NET) і Next.js"}
              </span>{" "}
              {isCs
                ? "— student VUT FEKT v Brně se 4+ komerčními nasazeními v ČR a Kanadě a vlastním 24/7 Home Labem."
                : "— студент VUT FEKT у Брно з 4+ комерційними релізами в Чехії та Канаді й власним 24/7 Home Lab."}
            </p>
          </div>

          {/* 4-Card Bento Grid (2 Tall Left Columns + 2 Stacked Right Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.68fr] lg:grid-rows-2 gap-3.5 sm:gap-4">
            {/* TILE 01 — DevOps, Linux & CI/CD (Spans 2 rows on desktop) */}
            <div className="lg:row-span-2 group relative rounded-[8px] border border-white/[0.14] bg-gradient-to-b from-[#1e1b17]/75 via-[#151310]/80 to-[#0e0c0a]/92 backdrop-blur-xl p-5 sm:p-6 min-h-[380px] lg:min-h-[450px] flex flex-col justify-between overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"
              />

              <div className="flex items-center justify-between gap-2 relative z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-black/30 backdrop-blur-md border border-white/[0.24] text-[#f5f4f1]">
                  {isCs ? "01 · DevOps & Vlastní CI/CD" : "01 · DevOps & Власний CI/CD"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#3fbf7f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fbf7f] animate-pulse" />
                  24/7 Live
                </span>
              </div>

              {/* Centerpiece Frosted Glass Icon Dock */}
              <div className="my-8 flex items-center justify-center relative z-10">
                <div className="p-2.5 rounded-[22px] bg-white/[0.14] backdrop-blur-xl border border-white/[0.34] shadow-[0_14px_34px_rgba(0,0,0,0.35)] flex items-center gap-2.5">
                  <div className="w-14 h-14 rounded-[14px] bg-[#0d1824] border border-sky-400/30 flex flex-col items-center justify-center text-sky-300">
                    <Server size={22} />
                    <span className="text-[9px] font-mono mt-0.5">Docker</span>
                  </div>
                  <div className="w-14 h-14 rounded-[14px] bg-[#142019] border border-emerald-400/30 flex flex-col items-center justify-center text-[#3fbf7f]">
                    <Terminal size={22} />
                    <span className="text-[9px] font-mono mt-0.5">Linux</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div>
                  <h2 className="text-[22px] sm:text-[24px] font-semibold tracking-[-0.02em] text-[#f5f4f1]">
                    Linux, Docker &amp; Zero-Trust
                  </h2>
                  <p className="text-[13.5px] leading-[1.5] text-[#f5f4f1]/72 mt-1.5">
                    {isCs
                      ? "Self-hosted GitHub Actions runner pod systemd, multi-stage non-root Alpine obrazy a Cloudflare Tunnels s 0 otevřenými WAN porty."
                      : "Self-hosted GitHub Actions runner під systemd, multi-stage non-root Alpine образи та Cloudflare Tunnels із 0 відкритих WAN-портів."}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.16] flex flex-wrap items-center gap-2.5">
                  <a
                    href="#homelab"
                    className="h-11 pl-4 pr-2 rounded-full border border-white/[0.28] bg-white/[0.06] hover:bg-white/[0.15] hover:border-white/[0.55] inline-flex items-center gap-3 text-[13px] font-medium text-[#f5f4f1] transition-all"
                  >
                    <span>{isCs ? "Detail architektury" : "Деталі архітектури"}</span>
                    <span className="w-7 h-7 rounded-full bg-[#f5f4f1] text-[#100e0b] flex items-center justify-center">
                      <ArrowRight size={14} />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* TILE 02 — L2/L3 Networking & Cisco CCNA (Spans 2 rows on desktop) */}
            <div className="lg:row-span-2 group relative rounded-[8px] border border-white/[0.14] bg-gradient-to-b from-[#1d1914]/75 via-[#15120f]/80 to-[#0d0c0a]/92 backdrop-blur-xl p-5 sm:p-6 min-h-[380px] lg:min-h-[450px] flex flex-col justify-between overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
              <div
                aria-hidden="true"
                className="absolute -top-20 -left-16 w-64 h-64 rounded-full bg-amber-400/12 blur-3xl pointer-events-none"
              />

              <div className="flex items-center justify-between gap-2 relative z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-black/30 backdrop-blur-md border border-white/[0.24] text-[#f5f4f1]">
                  {isCs ? "02 · Sítě L2/L3 & Bezpečnost" : "02 · Мережі L2/L3 & Безпека"}
                </span>
                <span className="text-[11px] font-mono text-[#f5f4f1]/65">2× Cisco CCNA</span>
              </div>

              {/* Centerpiece Frosted Glass Icon Dock */}
              <div className="my-8 flex items-center justify-center relative z-10">
                <div className="p-2.5 rounded-[22px] bg-white/[0.14] backdrop-blur-xl border border-white/[0.34] shadow-[0_14px_34px_rgba(0,0,0,0.35)] flex items-center gap-2.5">
                  <div className="w-14 h-14 rounded-[14px] bg-[#211a10] border border-amber-400/35 flex flex-col items-center justify-center text-amber-300">
                    <Network size={22} />
                    <span className="text-[9px] font-mono mt-0.5">OSPF</span>
                  </div>
                  <div className="w-14 h-14 rounded-[14px] bg-[#1c1626] border border-violet-400/35 flex flex-col items-center justify-center text-violet-300">
                    <Shield size={22} />
                    <span className="text-[9px] font-mono mt-0.5">VPN</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div>
                  <h2 className="text-[22px] sm:text-[24px] font-semibold tracking-[-0.02em] text-[#f5f4f1]">
                    MikroTik, OSPF/VRF &amp; VLAN
                  </h2>
                  <p className="text-[13.5px] leading-[1.5] text-[#f5f4f1]/72 mt-1.5">
                    {isCs
                      ? "Šifrované WireGuard site-to-site tunely, dynamické směrování OSPF, izolace VRF tabulek, 802.1Q VLAN (CZ/UA) a AD DS / GPO."
                      : "Шифровані WireGuard site-to-site тунелі, динамічна маршрутизація OSPF, ізоляція таблиць VRF, 802.1Q VLAN (CZ/UA) та AD DS / GPO."}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.16] flex flex-wrap items-center gap-2.5">
                  <a
                    href="#credentials"
                    className="h-11 pl-4 pr-2 rounded-full border border-white/[0.28] bg-white/[0.06] hover:bg-white/[0.15] hover:border-white/[0.55] inline-flex items-center gap-3 text-[13px] font-medium text-[#f5f4f1] transition-all"
                  >
                    <span>Cisco CCNA (2×)</span>
                    <span className="w-7 h-7 rounded-full bg-[#f5f4f1] text-[#100e0b] flex items-center justify-center">
                      <ArrowRight size={14} />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* TILE 03 — C# (.NET) & Backend Engineering (Top-right stacked card) */}
            <div className="group relative rounded-[8px] border border-white/[0.14] bg-gradient-to-br from-[#1d1822]/75 to-[#100e0d]/90 backdrop-blur-xl p-5 flex flex-col justify-between min-h-[215px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-black/30 backdrop-blur-md border border-white/[0.24] text-[#f5f4f1]">
                  03 · C# (.NET) &amp; API
                </span>
                <Code2 size={17} className="text-[#9b968f]" />
              </div>

              <div className="pt-6">
                <h2 className="text-[18px] font-semibold tracking-[-0.015em] text-[#f5f4f1]">
                  OOP, SOLID &amp; Reflection
                </h2>
                <p className="text-[12.5px] leading-[1.45] text-[#f5f4f1]/68 mt-1">
                  {isCs
                    ? "Generics, LINQ, async/await, System.Reflection a vlastní HTTP 206 streamovací File Server."
                    : "Generics, LINQ, async/await, System.Reflection та власний HTTP 206 потоковий File Server."}
                </p>

                <div className="mt-4 pt-3 border-t border-white/[0.14] flex items-center justify-between">
                  <span className="text-[12px] font-mono text-[#9b968f]">.NET · TypeScript</span>
                  <Link
                    href="/uploadFile"
                    className="w-8 h-8 rounded-full bg-[#f5f4f1] text-[#100e0b] flex items-center justify-center group-hover:scale-105 transition-transform"
                    aria-label="Open File Server"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* TILE 04 — 4x Commercial Web Production (Bottom-right stacked card) */}
            <div className="group relative rounded-[8px] border border-white/[0.14] bg-gradient-to-br from-[#161f1b]/75 to-[#100e0d]/90 backdrop-blur-xl p-5 flex flex-col justify-between min-h-[215px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-black/30 backdrop-blur-md border border-white/[0.24] text-[#f5f4f1]">
                  {isCs ? "04 · Komerční weby" : "04 · Комерційний веб"}
                </span>
                <Globe size={17} className="text-[#3fbf7f]" />
              </div>

              <div className="pt-6">
                <h2 className="text-[18px] font-semibold tracking-[-0.015em] text-[#f5f4f1]">
                  {isCs ? "4× živé nasazení (ČR & CA)" : "4× живі релізи (ЧР & Канада)"}
                </h2>
                <p className="text-[12.5px] leading-[1.45] text-[#f5f4f1]/68 mt-1">
                  {isCs
                    ? "Next.js 15 platformy s rezervacemi, kalkulačkami ceny, Schema.org SEO a i18n."
                    : "Next.js 15 платформи з бронюванням, калькуляторами вартості, Schema.org SEO та i18n."}
                </p>

                <div className="mt-4 pt-3 border-t border-white/[0.14] flex items-center justify-between">
                  <span className="text-[12px] font-mono text-[#3fbf7f]">200 OK · Prod</span>
                  <a
                    href="#commercial"
                    className="w-8 h-8 rounded-full bg-[#f5f4f1] text-[#100e0b] flex items-center justify-center group-hover:scale-105 transition-transform"
                    aria-label="View commercial projects"
                  >
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. DOMAIN OVERVIEW CHIPS & ENGINEERING ECOSYSTEM STRIP
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="overview" className="py-16 sm:py-24 border-b border-white/[0.09]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 space-y-10">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-serif text-[clamp(30px,3.5vw,52px)] leading-[1.05] tracking-[-0.025em] text-[#f5f4f1]">
              {isCs ? (
                <>
                  Jeden inženýrský přesah,{" "}
                  <span className="text-[#9b968f]">čtyři propojené vrstvy.</span>
                </>
              ) : (
                <>
                  Єдиний інженерний підхід,{" "}
                  <span className="text-[#9b968f]">чотири пов&apos;язані рівні.</span>
                </>
              )}
            </h2>
            <p className="text-[15px] sm:text-[16.5px] text-[#a39e96] leading-[1.55]">
              {t.servicesDesc}
            </p>
          </div>

          {/* 4 Crisp Frosted Domain Jump Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {t.aboutDomains.map((d, idx) => (
              <a
                key={idx}
                href={idx < 2 ? "#homelab" : "#commercial"}
                className="group rounded-[6px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.11] hover:border-white/[0.28] p-4 flex items-start gap-3.5 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-[6px] bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-[#f5f4f1] shrink-0 mt-0.5">
                  {idx === 0 && <Cpu size={16} />}
                  {idx === 1 && <Network size={16} />}
                  {idx === 2 && <Code2 size={16} />}
                  {idx === 3 && <Layers size={16} />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-[#f5f4f1] truncate">
                      {d.label}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#9b968f] mt-0.5 leading-snug">{d.desc}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Tooling & Stack Strip */}
          <div className="pt-6 border-t border-white/[0.09] flex flex-wrap items-center justify-between gap-4">
            <span className="text-[12px] font-mono uppercase tracking-[0.12em] text-[#9b968f]">
              {t.techLabel}
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {TOOL_LOGOS.map((tool) => (
                <div
                  key={tool.name}
                  className="px-3 py-1.5 rounded-[5px] bg-white/[0.05] border border-white/[0.1] flex items-center justify-center"
                >
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    width={tool.width}
                    height={tool.height}
                    className="max-h-4 w-auto object-contain opacity-85"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. SHOWCASE 01 (5fr / 7fr SPLIT) — HOME LAB, CI/CD & MIKROTIK
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="homelab" className="py-20 sm:py-28 border-b border-white/[0.09]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 5 Cols: Copy + Hairline Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[12px] font-medium border border-white/[0.2] bg-white/[0.05] text-[#f5f4f1]/90">
              01 · Home Lab · 24/7 Self-Hosted
            </span>

            <h3 className="font-serif text-[32px] sm:text-[40px] leading-[1.05] tracking-[-0.025em] text-[#f5f4f1]">
              {t.projects[0].title}
            </h3>

            <p className="text-[15px] leading-[1.58] text-[#a39e96]">
              {t.projects[0].description}
            </p>

            {/* Hairline-divided checklist (Aira .pr-pts principle) */}
            <div className="divide-y divide-white/[0.09] border-y border-white/[0.09] text-[14px]">
              {[
                {
                  num: "01",
                  text: isCs
                    ? "Self-hosted systemd GitHub Actions Runner + multi-stage Alpine Docker (non-root)"
                    : "Self-hosted systemd GitHub Actions Runner + multi-stage Alpine Docker (non-root)",
                },
                {
                  num: "02",
                  text: isCs
                    ? "Cloudflare Zero-Trust Tunnels — publikace bez jediného otevřeného WAN portu"
                    : "Cloudflare Zero-Trust Tunnels — публікація без жодного відкритого WAN-порту",
                },
                {
                  num: "03",
                  text: isCs
                    ? "MikroTik RouterOS: WireGuard Site-to-Site VPN, OSPF, VRF a 802.1Q CZ/UA VLAN"
                    : "MikroTik RouterOS: WireGuard Site-to-Site VPN, OSPF, VRF та 802.1Q CZ/UA VLAN",
                },
                {
                  num: "04",
                  text: isCs
                    ? "Home Assistant, Mosquitto MQTT, Zigbee2MQTT a Frigate AI NVR v Docker Compose"
                    : "Home Assistant, Mosquitto MQTT, Zigbee2MQTT та Frigate AI NVR у Docker Compose",
                },
              ].map((pt) => (
                <div key={pt.num} className="py-3 flex items-baseline gap-3.5">
                  <span className="font-mono text-[11.5px] text-[#9b968f] shrink-0">
                    {pt.num}
                  </span>
                  <span className="text-[#f5f4f1]/85">{pt.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={openContact}
                className="px-5 py-2.5 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] text-[13.5px] font-medium transition-colors cursor-pointer"
              >
                {isCs ? "Probrat architekturu" : "Обговорити архітектуру"}
              </button>
              <Link
                href="/cv"
                className="px-5 py-2.5 rounded-full border border-white/[0.22] hover:bg-white/[0.07] text-[#f5f4f1] text-[13.5px] font-medium transition-colors"
              >
                {t.heroCvBtn}
              </Link>
            </div>
          </div>

          {/* Right 7 Cols: Atmospheric Framed Showcase + Floating iOS Glass Notification */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[8px] border border-white/[0.14] bg-gradient-to-br from-[#231f1a]/80 via-[#151310]/90 to-[#0d0c0a]/95 p-5 sm:p-8 shadow-[0_26px_60px_-20px_rgba(0,0,0,0.75)] overflow-hidden">
              {/* Floating Frosted Glass Push Alert (Aira .px-note-ios principle) */}
              <div className="sm:absolute sm:top-5 sm:right-5 z-20 mb-5 sm:mb-0 max-w-[290px] rounded-[16px] bg-white/[0.13] backdrop-blur-2xl border border-white/[0.32] px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.35)] animate-soft-float">
                <div className="flex items-center justify-between gap-3 text-[10.5px] font-mono uppercase tracking-wider text-[#f5f4f1]/70">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#3fbf7f]" />
                    GITHUB RUNNER · PROD
                  </span>
                  <span>now</span>
                </div>
                <div className="text-[13px] font-semibold text-[#f5f4f1] mt-1">
                  {isCs ? "CI/CD Deploy dokončen (200 OK)" : "CI/CD Деплой завершено (200 OK)"}
                </div>
                <div className="text-[11.5px] text-[#f5f4f1]/70">
                  Alpine non-root · Zero-Trust tunnel active
                </div>
              </div>

              {/* Terminal & Network Matrix Card */}
              <div className="rounded-[12px] border border-white/[0.1] bg-[#0b0a09]/90 p-5 sm:p-6 font-mono text-[12px] space-y-5 sm:mt-14">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2 text-[#f5f4f1]/80">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="ml-2 text-[11px] text-[#9b968f]">
                      GET /infra/topology — roman-homelab
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#3fbf7f]/15 text-[#3fbf7f] text-[10.5px]">
                    VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-sans">
                  {t.heroInfraRows.map((row, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3.5 space-y-1"
                    >
                      <div className="text-[11.5px] text-[#9b968f]">{row.label}</div>
                      <div className="text-[13.5px] font-semibold text-[#f5f4f1]">{row.value}</div>
                    </div>
                  ))}
                </div>

                <pre className="text-[11.5px] leading-relaxed text-[#f5f4f1]/75 overflow-x-auto">
{`{
  "ingress": "Cloudflare Zero-Trust (0 open WAN ports)",
  "routing": ["MikroTik RouterOS", "WireGuard", "OSPF", "VRF", "802.1Q CZ/UA"],
  "runtime": "Docker Compose · systemd runner · SSH key-only"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          5. SHOWCASE 02 & SUBGRID 03 / 04 — 4 LIVE COMMERCIAL WEB SYSTEMS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="commercial" className="py-20 sm:py-28 border-b border-white/[0.09]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 space-y-20">
          {/* Top Featured Split (Bowlingový Club SV + Luxury Cleaning Solutions CA) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 7 Cols: Interactive Browser Showcase Frame */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="rounded-[8px] border border-white/[0.14] bg-gradient-to-b from-[#211d18]/80 to-[#0e0c0a]/95 p-4 sm:p-7 shadow-[0_26px_60px_-20px_rgba(0,0,0,0.75)] space-y-4">
                {/* Switcher Tabs inside Showcase */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex p-1 rounded-full bg-black/40 border border-white/[0.12]">
                    <button
                      type="button"
                      onClick={() => setActiveWebShowcase(0)}
                      className={`px-3.5 py-1 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                        activeWebShowcase === 0
                          ? "bg-[#f5f4f1] text-[#100e0b]"
                          : "text-[#9b968f] hover:text-[#f5f4f1]"
                      }`}
                    >
                      bowlingovyclubsv.cz
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveWebShowcase(1)}
                      className={`px-3.5 py-1 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                        activeWebShowcase === 1
                          ? "bg-[#f5f4f1] text-[#100e0b]"
                          : "text-[#9b968f] hover:text-[#f5f4f1]"
                      }`}
                    >
                      luxury-cleaning-solutions.ca
                    </button>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3fbf7f]/15 border border-[#3fbf7f]/35 text-[11px] font-mono text-[#3fbf7f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3fbf7f]" />
                    200 OK · LIVE
                  </span>
                </div>

                {/* Browser Window Preview */}
                {activeWebShowcase === 0 ? (
                  <div className="rounded-[12px] border border-white/[0.12] bg-[#0b0a09] overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#9b968f]">
                      <span>https://bowlingovyclubsv.cz</span>
                      <span>Next.js · SSR/SSG · Schema.org</span>
                    </div>
                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#9b968f]">
                          Týniště nad Orlicí · ČR
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-[11px] text-[#f5f4f1]/80">
                          Core Web Vitals 99/100
                        </span>
                      </div>
                      <h4 className="font-serif text-2xl sm:text-3xl text-[#f5f4f1]">
                        {t.projects[1].title}
                      </h4>
                      <p className="text-[13.5px] text-[#a39e96] leading-relaxed">
                        {t.projects[1].description}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 font-mono text-[11px]">
                        {["Dráha 01 · Volno", "Dráha 02 · 19:00", "Dráha 03 · Volno", "Dráha 04 · Turnaj"].map(
                          (slot, i) => (
                            <div
                              key={slot}
                              className={`rounded-lg border p-2.5 text-center ${
                                i === 1
                                  ? "border-[#3fbf7f]/50 bg-[#3fbf7f]/10 text-[#3fbf7f]"
                                  : "border-white/[0.09] bg-white/[0.02] text-[#f5f4f1]/75"
                              }`}
                            >
                              {slot}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[12px] border border-white/[0.12] bg-[#0b0a09] overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#9b968f]">
                      <span>https://www.luxury-cleaning-solutions.ca</span>
                      <span>Edmonton, Alberta · Canada</span>
                    </div>
                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#9b968f]">
                          B2B &amp; B2C Platform · Canada
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-[11px] text-[#3fbf7f]">
                          ★ 5.0 Google Reviews
                        </span>
                      </div>
                      <h4 className="font-serif text-2xl sm:text-3xl text-[#f5f4f1]">
                        {t.projects[2].title}
                      </h4>
                      <p className="text-[13.5px] text-[#a39e96] leading-relaxed">
                        {t.projects[2].description}
                      </p>
                      <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-mono uppercase text-[#9b968f]">
                            Real-Time Quote Calculator
                          </div>
                          <div className="text-[13px] text-[#f5f4f1]/80 mt-0.5">
                            Deep Clean · 3 Bedrooms · Eco Package
                          </div>
                        </div>
                        <div className="font-serif text-2xl text-[#f5f4f1]">$185 CAD</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Cols: Editorial Narrative + Live Links */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-5">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[12px] font-medium border border-white/[0.2] bg-white/[0.05] text-[#f5f4f1]/90">
                {isCs ? "02 · Komerční produkce · ČR & Kanada" : "02 · Комерційний продакшн · ЧР & Канада"}
              </span>

              <h3 className="font-serif text-[32px] sm:text-[40px] leading-[1.05] tracking-[-0.025em] text-[#f5f4f1]">
                {isCs
                  ? "Komerční systémy postavené pro reálný provoz."
                  : "Комерційні системи, створені для реального бізнесу."}
              </h3>

              <p className="text-[15px] leading-[1.58] text-[#a39e96]">
                {t.projectsDesc}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://bowlingovyclubsv.cz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Bowlingový Club SV</span>
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href="https://www.luxury-cleaning-solutions.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-white/[0.22] hover:bg-white/[0.08] text-[#f5f4f1] text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Luxury Cleaning CA</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Equal 2-Column Subgrid (03 Boxing Club Nikita & 04 TDHP — Aira .sx-p2 principle) */}
          <div className="pt-12 border-t border-white/[0.09] grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 03 — Boxing Club Nikita */}
            <div className="rounded-[8px] border border-white/[0.12] bg-white/[0.03] backdrop-blur-lg p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-medium border border-white/[0.2] bg-white/[0.04] text-[#f5f4f1]/85">
                  03 · nikita-box.cz · CZ / UA i18n
                </span>

                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-serif text-[28px] sm:text-[32px] leading-[1.08] tracking-[-0.02em] text-[#f5f4f1]">
                    {t.projects[3].title}
                  </h3>
                  <a
                    href="https://nikita-box.cz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] text-[12.5px] font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{t.projectLiveBtn}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>

                <p className="text-[14.5px] leading-[1.55] text-[#a39e96]">
                  {t.projects[3].description}
                </p>
              </div>

              <div className="rounded-[10px] border border-white/[0.1] bg-[#0c0b09]/85 p-4 space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#9b968f]">
                  <span>HRADEC KRÁLOVÉ · SPORT CLUB</span>
                  <span className="text-[#3fbf7f]">CZ / UA</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <div className="rounded bg-white/[0.04] p-2.5 text-[#f5f4f1]/85">
                    Po/St · 16:30
                  </div>
                  <div className="rounded bg-white/[0.04] p-2.5 text-[#f5f4f1]/85">
                    Út/Čt · 18:00
                  </div>
                  <div className="rounded bg-white/[0.04] p-2.5 text-[#f5f4f1]/85">
                    Pá · Sparing
                  </div>
                </div>
              </div>
            </div>

            {/* 04 — Taneční divadlo Honzy Pokusila */}
            <div className="rounded-[8px] border border-white/[0.12] bg-white/[0.03] backdrop-blur-lg p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11.5px] font-medium border border-white/[0.2] bg-white/[0.04] text-[#f5f4f1]/85">
                  04 · honzapokusil.cz · Stage &amp; Repertoire
                </span>

                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-serif text-[28px] sm:text-[32px] leading-[1.08] tracking-[-0.02em] text-[#f5f4f1]">
                    {t.projects[4].title}
                  </h3>
                  <a
                    href="https://honzapokusil.cz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] text-[12.5px] font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{t.projectLiveBtn}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>

                <p className="text-[14.5px] leading-[1.55] text-[#a39e96]">
                  {t.projects[4].description}
                </p>
              </div>

              <div className="rounded-[10px] border border-white/[0.1] bg-[#0c0b09]/85 p-4 space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#9b968f]">
                  <span>TDHP · CONTEMPORARY THEATRE</span>
                  <span className="text-[#3fbf7f]">200 OK</span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="rounded bg-white/[0.04] p-2.5 text-[#f5f4f1]/85">
                    Repertoár &amp; Premiéry
                  </div>
                  <div className="rounded bg-white/[0.04] p-2.5 text-[#f5f4f1]/85">
                    Workshopy &amp; Kurzy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          6. ARCHITECTURAL METRICS + VUT / ISSS EXPERIENCE BAND
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="metrics" className="py-20 sm:py-28 border-b border-white/[0.09]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-serif text-[clamp(32px,3.8vw,56px)] leading-[1.04] tracking-[-0.025em]">
              <span className="text-[#f5f4f1]">
                {isCs ? "Ověřeno v produkci," : "Перевірено в продакшні,"}
              </span>{" "}
              <span className="text-[#9b968f]">
                {isCs
                  ? "v živých sálech ISSS i na VUT FEKT."
                  : "у залах конференції ISSS та у VUT FEKT."}
              </span>
            </h2>
            <p className="text-[15.5px] text-[#a39e96]">
              {isCs
                ? "Kombinace vysokoškolského studia v Brně, Cisco CCNA certifikací a reálné odpovědnosti za běžící systémy."
                : "Поєднання університетської підготовки в Брно, сертифікацій Cisco CCNA та реальної відповідальності за живі системи."}
            </p>
          </div>

          {/* 4 Clean Architectural Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-white/[0.1] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.1]">
            {[
              {
                val: "4+",
                label: isCs
                  ? "Komerční weby v produkci (ČR & Kanada)"
                  : "Комерційні сайти в продакшні (ЧР & Канада)",
              },
              {
                val: "6×",
                label: isCs
                  ? "Oficiální Cisco CCNA, Linux & IT certifikáty"
                  : "Офіційні Cisco CCNA, Linux & IT сертифікати",
              },
              {
                val: "24/7",
                label: isCs
                  ? "Vlastní Linux, Docker CI/CD & Zero-Trust Home Lab"
                  : "Власний Linux, Docker CI/CD & Zero-Trust Home Lab",
              },
              {
                val: "3×",
                label: isCs
                  ? "Ročníky 2024–2026 v IT Support týmu konference ISSS"
                  : "Роки 2024–2026 в IT Support міжнародної конференції ISSS",
              },
            ].map((m, i) => (
              <div key={i} className="p-6 sm:p-8 text-center space-y-2">
                <div className="text-[40px] sm:text-[52px] font-normal tracking-[-0.03em] text-[#f5f4f1] leading-none">
                  {m.val}
                </div>
                <p className="text-[13px] sm:text-[14px] text-[#a39e96] max-w-[230px] mx-auto leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* Portrait + Education (VUT FEKT & SŠ Kyberna) + ISSS Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Profile & Bio Card */}
            <div className="lg:col-span-5 rounded-[8px] border border-white/[0.12] bg-white/[0.03] backdrop-blur-lg p-6 flex flex-col justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/[0.2] shrink-0">
                  <Image
                    src="/images/roman-profile.jpg"
                    alt="Roman Roshkanyuk"
                    fill
                    sizes="64px"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#f5f4f1]">Roman Roshkanyuk</h3>
                  <p className="text-[12.5px] text-[#3fbf7f] font-mono">{t.aboutPhotoBadge}</p>
                </div>
              </div>

              <p className="text-[14px] leading-[1.6] text-[#f5f4f1]/75">
                {t.aboutBio1.join("")}
              </p>

              <div className="pt-4 border-t border-white/[0.09] space-y-1.5 text-[12.5px]">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#9b968f] mb-2">
                  {t.skillLangsTitle}
                </div>
                {t.skillLangs.map((l) => (
                  <div key={l.lang} className="flex items-center justify-between gap-2">
                    <span className="text-[#f5f4f1] font-medium">{l.lang}</span>
                    <span className="text-[#9b968f] text-right">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schools + ISSS Live Ops */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.schools.map((school, idx) => (
                  <div
                    key={idx}
                    className="rounded-[8px] border border-white/[0.12] bg-white/[0.03] backdrop-blur-lg p-5 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11.5px] font-mono">
                      <span className="text-[#9b968f]">{school.period}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full border ${
                          school.active
                            ? "border-[#3fbf7f]/40 bg-[#3fbf7f]/10 text-[#3fbf7f]"
                            : "border-white/[0.14] text-[#f5f4f1]/70"
                        }`}
                      >
                        {school.badge}
                      </span>
                    </div>
                    <h4 className="font-serif text-xl text-[#f5f4f1]">{school.name}</h4>
                    <p className="text-[13px] font-medium text-[#f5f4f1]/80">{school.desc}</p>
                    <p className="text-[12.5px] text-[#9b968f] leading-relaxed">{school.sub}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[8px] border border-white/[0.12] bg-white/[0.03] backdrop-blur-lg p-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                <div className="sm:col-span-7 space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#3fbf7f]">
                    {t.expCards[0].tag}
                  </span>
                  <h4 className="font-serif text-xl text-[#f5f4f1]">{t.expCards[0].title}</h4>
                  <p className="text-[13px] text-[#a39e96] leading-relaxed">
                    {t.expCards[0].desc}
                  </p>
                </div>
                <div className="sm:col-span-5 relative h-36 rounded-[6px] overflow-hidden border border-white/[0.12]">
                  <Image
                    src="/images/classroom.png"
                    alt="Roman Roshkanyuk — ISSS IT Support"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          7. EDITORIAL CERTIFICATES (6× PDF) & TECHNICAL STACK
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="credentials" className="py-20 sm:py-28 border-b border-white/[0.09]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 space-y-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11.5px] font-mono uppercase tracking-[0.14em] text-[#9b968f] block mb-2">
                CISCO NETWORKING ACADEMY · LINUX · ECDL
              </span>
              <h2 className="font-serif text-[34px] sm:text-[44px] leading-[1.05] tracking-[-0.025em] text-[#f5f4f1]">
                {t.certsTitle} ({CERTIFICATES.length})
              </h2>
            </div>
            <Link
              href="/cv"
              className="editorial-link inline-flex items-center gap-2 text-[14px] font-medium text-[#f5f4f1]"
            >
              <span>{t.heroCvBtn}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* 3-Column Editorial Certificate Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.name}
                onClick={() => setPreviewCert(cert)}
                className="group rounded-[6px] border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.26] p-5 flex flex-col justify-between gap-5 cursor-pointer transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#9b968f]">
                    <span className="px-2.5 py-0.5 rounded-full border border-white/[0.15] text-[#f5f4f1]/85">
                      {cert.badge}
                    </span>
                    <span>{cert.year}</span>
                  </div>
                  <h3 className="font-serif text-[21px] leading-[1.2] text-[#f5f4f1] group-hover:opacity-80 transition-opacity pt-1">
                    {cert.name}
                  </h3>
                  <p className="text-[13px] text-[#9b968f]">{cert.issuer}</p>
                </div>

                <div
                  className="pt-3.5 border-t border-white/[0.09] flex items-center justify-between text-[13px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setPreviewCert(cert)}
                    className="inline-flex items-center gap-1.5 font-medium text-[#f5f4f1] group-hover:gap-2.5 transition-all cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>{t.certView} →</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full border border-white/[0.14] text-[#9b968f] hover:text-[#f5f4f1] transition-colors"
                      title="Open PDF"
                    >
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={cert.file}
                      download
                      className="p-1.5 rounded-full border border-white/[0.14] text-[#9b968f] hover:text-[#f5f4f1] transition-colors"
                      title={t.certDownload}
                    >
                      <Download size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 5 Skill Category Columns */}
          <div className="pt-10 border-t border-white/[0.09] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.skillCats.map((cat) => (
              <div key={cat.title} className="space-y-3">
                <h4 className="text-[12px] font-medium text-[#9b968f]">{cat.title}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-[11.5px] px-2.5 py-1 rounded-[5px] bg-white/[0.04] border border-white/[0.1] text-[#f5f4f1]/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          8. EDITORIAL MULTI-COLUMN FOOTER (AIRA SERIF LINKS PRINCIPLE)
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="pt-16 sm:pt-24 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 min-h-[300px]">
            {/* Left Column: Brand Mark + Bottom Legal/Location */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-10">
              <div className="space-y-4">
                <a href="#top" className="inline-flex items-center gap-2.5">
                  <StarburstMark className="w-5 h-5 text-[#f5f4f1]" />
                  <span className="font-serif text-[22px] tracking-[-0.02em] text-[#f5f4f1]">
                    Roman Roshkanyuk
                  </span>
                </a>
                <p className="text-[14px] text-[#9b968f] max-w-sm leading-relaxed">
                  {t.contactSubtitle}
                </p>
              </div>

              <div className="text-[12.5px] text-[#9b968f] space-y-1">
                <p>© 2026 Roman Roshkanyuk · Brno / Hradec Králové, Česká republika</p>
                <p>VUT v Brně (FEKT) · DevOps, Network &amp; Software Engineering</p>
              </div>
            </div>

            {/* Right Column: 2x2 Editorial Serif Navigation Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-x-10 gap-y-10">
              <div className="space-y-2.5">
                <span className="text-[12px] text-[#9b968f] block">
                  {isCs ? "Komerční produkce" : "Комерційний продакшн"}
                </span>
                <ul className="space-y-1.5 font-serif text-[20px] sm:text-[22px] text-[#f5f4f1]">
                  <li>
                    <a
                      href="https://bowlingovyclubsv.cz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                    >
                      Bowlingový Club SV
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.luxury-cleaning-solutions.ca/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                    >
                      Luxury Cleaning CA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://nikita-box.cz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                    >
                      Boxing Club Nikita
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://honzapokusil.cz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                    >
                      Taneční divadlo HP
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <span className="text-[12px] text-[#9b968f] block">
                  {isCs ? "Systémy & Dokumenty" : "Системи & Документи"}
                </span>
                <ul className="space-y-1.5 font-serif text-[20px] sm:text-[22px] text-[#f5f4f1]">
                  <li>
                    <Link href="/cv" className="editorial-link">
                      {isCs ? "Technické CV (PDF)" : "Технічне CV (PDF)"}
                    </Link>
                  </li>
                  <li>
                    <Link href="/uploadFile" className="editorial-link inline-flex items-center gap-2">
                      <span>File Server</span>
                      <FolderOpen size={16} className="text-[#9b968f]" />
                    </Link>
                  </li>
                  <li>
                    <a href="#homelab" className="editorial-link">
                      Home Lab CI/CD
                    </a>
                  </li>
                  <li>
                    <a href="#credentials" className="editorial-link">
                      Cisco CCNA (2×)
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5 col-span-2 sm:col-span-2 pt-2 border-t border-white/[0.08]">
                <span className="text-[12px] text-[#9b968f] block">
                  {isCs ? "Přímý kontakt" : "Прямий контакт"}
                </span>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-serif text-[20px] sm:text-[22px] text-[#f5f4f1]">
                  <button
                    type="button"
                    onClick={openContact}
                    className="editorial-link cursor-pointer text-left"
                  >
                    {isCs ? "Napsat zprávu" : "Написати повідомлення"}
                  </button>
                  <a href="mailto:romanroskanuk74@gmail.com" className="editorial-link">
                    romanroskanuk74@gmail.com
                  </a>
                  <a href="tel:+420605447445" className="editorial-link">
                    +420 605 447 445
                  </a>
                  <a
                    href="https://github.com/rizzer18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.instagram.com/roshka_jr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent Floating Bottom-Right Pill CTA (Aira floating badge principle) */}
      <button
        type="button"
        onClick={openContact}
        className="fixed right-5 bottom-4 z-40 h-11 px-5 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] text-[13.5px] font-semibold shadow-[0_6px_24px_rgba(0,0,0,0.45)] inline-flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
      >
        <span className="w-2 h-2 rounded-full bg-[#3fbf7f]" />
        <span>{t.headerCta}</span>
      </button>

      {/* Contact Form Modal */}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        lang={lang}
        t={t}
      />

      {/* In-Browser Certificate PDF Modal */}
      {previewCert && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/[0.1] bg-[#14110e]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="font-serif text-[18px] text-[#f5f4f1] truncate">
                {previewCert.name}
              </p>
              <p className="font-mono text-[11px] text-[#9b968f]">
                {previewCert.issuer} · {previewCert.year}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={previewCert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.16] text-[12px] text-[#f5f4f1]/85 hover:bg-white/[0.08] transition-colors"
              >
                <ExternalLink size={12} />
                <span className="hidden sm:inline">
                  {isCs ? "Nová záložka" : "Нова вкладка"}
                </span>
              </a>
              <a
                href={previewCert.file}
                download
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#f5f4f1] text-[#100e0b] text-[12px] font-semibold"
              >
                <Download size={12} />
                <span>{t.certDownload}</span>
              </a>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="w-8 h-8 rounded-full border border-white/[0.16] flex items-center justify-center text-[#f5f4f1]/70 hover:text-[#f5f4f1] cursor-pointer"
                aria-label="Close"
              >
                <X size={15} />
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
              className="w-full max-w-5xl h-full rounded-xl border border-white/[0.14] bg-white shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
