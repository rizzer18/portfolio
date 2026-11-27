"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Download,
  ExternalLink,
  Eye,
  Mail,
  Phone,
  Send,
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

const PROJECT_DOMAINS = [
  "self-hosted · zero-trust",
  "bowlingovyclubsv.cz",
  "luxury-cleaning-solutions.ca",
  "nikita-box.cz",
  "honzapokusil.cz",
];

const PROJECT_TAGS = [
  ["Docker Multi-Stage", "GitHub Actions CI/CD", "MikroTik WireGuard", "OSPF / VRF", "Cloudflare Zero-Trust"],
  ["Next.js", "TypeScript", "SSR / SSG", "Schema.org SEO", "Lane Reservations"],
  ["Next.js", "TypeScript", "Live Price Calculator", "Google Reviews", "Core Web Vitals"],
  ["Next.js", "React", "i18n (CZ / UA)", "Tailwind CSS", "Responsive UI"],
  ["Next.js", "React", "Modular Repertoire", "Image Optimization", "Editorial UI"],
];

const PROJECT_URLS = [
  "#credentials",
  "https://bowlingovyclubsv.cz/",
  "https://www.luxury-cleaning-solutions.ca/",
  "https://nikita-box.cz/",
  "https://honzapokusil.cz/",
];

/**
 * Crisp 8-bit pixel-art downward pointing hand SVG (#ffa1f7)
 * matching Akash Tyagi's iconic footer illustration.
 */
function PixelPointingHand() {
  return (
    <svg
      width="120"
      height="144"
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="select-none"
    >
      {/* Top cuff / wrist outline */}
      <rect x="4" y="0" width="7" height="1" fill="#ffa1f7" />
      <rect x="3" y="1" width="1" height="3" fill="#ffa1f7" />
      <rect x="11" y="1" width="1" height="2" fill="#ffa1f7" />
      {/* Left palm edge */}
      <rect x="2" y="4" width="1" height="6" fill="#ffa1f7" />
      {/* Thumb jutting right */}
      <rect x="12" y="3" width="1" height="3" fill="#ffa1f7" />
      <rect x="13" y="6" width="1" height="1" fill="#ffa1f7" />
      <rect x="14" y="7" width="1" height="3" fill="#ffa1f7" />
      <rect x="12" y="10" width="2" height="1" fill="#ffa1f7" />
      <rect x="11" y="8" width="1" height="2" fill="#ffa1f7" />
      {/* Curled fingers on left */}
      <rect x="3" y="10" width="2" height="1" fill="#ffa1f7" />
      <rect x="4" y="9" width="1" height="3" fill="#ffa1f7" />
      <rect x="5" y="12" width="2" height="1" fill="#ffa1f7" />
      <rect x="6" y="10" width="1" height="3" fill="#ffa1f7" />
      <rect x="7" y="13" width="2" height="1" fill="#ffa1f7" />
      {/* Extended index finger pointing straight down */}
      <rect x="8" y="10" width="1" height="8" fill="#ffa1f7" />
      <rect x="11" y="10" width="1" height="8" fill="#ffa1f7" />
      <rect x="9" y="18" width="2" height="1" fill="#ffa1f7" />
    </svg>
  );
}

/**
 * Bespoke dark showcase visual frames for each of Roman's 5 real systems,
 * styled like the rounded product mockups in Akash Tyagi's 60% right column.
 */
function ProjectVisualShowcase({ index, lang }: { index: number; lang: Lang }) {
  const isCs = lang === "cs";

  if (index === 0) {
    return (
      <div className="p-5 sm:p-8 bg-gradient-to-b from-[#0b0b0d] to-[#050506]">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#181818] font-mono text-[11px]">
          <div className="flex items-center gap-2 text-[#efe6d8]/80">
            <Terminal size={13} className="text-[#ffa1f7]" />
            <span>roman@homelab-edge ~ systemd · docker · routeros</span>
          </div>
          <div className="flex items-center gap-2 text-[#4dff00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4dff00]" />
            <span>0 OPEN WAN PORTS · 24/7 ONLINE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="rounded-lg border border-[#191919] bg-black p-4 space-y-2.5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#ffa1f7]">
              Edge &amp; CI/CD
            </div>
            <div className="text-[13px] font-semibold text-[#efe6d8]">
              Cloudflare Zero-Trust + GitHub Runner
            </div>
            <div className="space-y-1 font-mono text-[11px] text-[#efe6d8]/50">
              <div>• Tunnel ingress (TLS 1.3)</div>
              <div>• systemd self-hosted runner</div>
              <div>• Multi-stage non-root Alpine</div>
            </div>
          </div>

          <div className="rounded-lg border border-[#191919] bg-black p-4 space-y-2.5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#ffa1f7]">
              L2/L3 Routing
            </div>
            <div className="text-[13px] font-semibold text-[#efe6d8]">
              MikroTik RouterOS · WireGuard
            </div>
            <div className="space-y-1 font-mono text-[11px] text-[#efe6d8]/50">
              <div>• Site-to-Site WireGuard VPN</div>
              <div>• Dynamic OSPF + VRF tables</div>
              <div>• 802.1Q CZ / UA policy VLANs</div>
            </div>
          </div>

          <div className="rounded-lg border border-[#191919] bg-black p-4 space-y-2.5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#ffa1f7]">
              Services &amp; Telemetry
            </div>
            <div className="text-[13px] font-semibold text-[#efe6d8]">
              Docker Compose · AI NVR &amp; IoT
            </div>
            <div className="space-y-1 font-mono text-[11px] text-[#efe6d8]/50">
              <div>• Home Assistant + Mosquitto</div>
              <div>• Zigbee2MQTT coordinator</div>
              <div>• Frigate NVR + SSH key-only</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="p-6 sm:p-10 bg-[radial-gradient(ellipse_at_top,#17131c_0%,#060607_70%)]">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#efe6d8]/45">
            <span>BOWLINGOVÝ CLUB SV · TÝNIŠTĚ NAD ORLICÍ</span>
            <span className="text-[#4dff00]">CWV 99/100</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#efe6d8]">
              {isCs ? "Online rezervace drah & turnajů." : "Онлайн-бронювання доріжок і турнірів."}
            </div>
            <p className="text-[13px] text-[#efe6d8]/50">
              Next.js SSR/SSG · Schema.org LocalBusiness · Dynamic Pricing
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 pt-2">
            {["Dráha 01", "Dráha 02", "Dráha 03", "Dráha 04"].map((lane, i) => (
              <div
                key={lane}
                className={`rounded-lg border p-3 text-center font-mono text-[11px] ${
                  i === 1
                    ? "border-[#ffa1f7]/60 bg-[#ffa1f7]/10 text-[#ffa1f7]"
                    : "border-[#1b1b1b] bg-black/70 text-[#efe6d8]/65"
                }`}
              >
                <div className="font-semibold">{lane}</div>
                <div className="text-[10px] opacity-70 mt-0.5">
                  {i === 1 ? "19:00 ✓" : "Volno"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="p-6 sm:p-10 bg-[radial-gradient(ellipse_at_top_right,#111a1d_0%,#060607_72%)]">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#efe6d8]/45">
            <span>EDMONTON, ALBERTA · CANADA</span>
            <span className="text-[#ffa1f7]">★ 5.0 GOOGLE REVIEWS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-7 space-y-2">
              <div className="text-xl sm:text-2xl font-semibold tracking-tight text-[#efe6d8]">
                Luxury Cleaning Solutions
              </div>
              <p className="text-[13px] text-[#efe6d8]/50 leading-relaxed">
                {isCs
                  ? "Interaktivní kalkulačka ceny v reálném čase a konverzní B2B/B2C pipeline."
                  : "Інтерактивний калькулятор вартості в реальному часі та B2B/B2C лідогенерація."}
              </p>
            </div>
            <div className="sm:col-span-5 rounded-xl border border-[#1d1d1d] bg-black/85 p-4 font-mono space-y-2">
              <div className="text-[10px] uppercase text-[#efe6d8]/40">Instant Estimate</div>
              <div className="text-2xl font-semibold text-[#efe6d8]">$185 CAD</div>
              <div className="text-[10px] text-[#4dff00]">Deep Clean · 3 BR · Eco</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="p-6 sm:p-10 bg-[radial-gradient(ellipse_at_bottom_left,#1a1216_0%,#060607_70%)]">
        <div className="max-w-xl mx-auto space-y-5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#efe6d8]/45">
            <span>BOXING CLUB NIKITA · HRADEC KRÁLOVÉ</span>
            <span className="px-2 py-0.5 rounded border border-[#242424] text-[#efe6d8]/80">
              CZ / UA i18n
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#efe6d8]">
            {isCs ? "Tréninkové rozvrhy, ceníky & nábor." : "Розклад тренувань, абонементи та набір."}
          </div>
          <div className="grid grid-cols-3 gap-2.5 font-mono text-[11px]">
            {[
              { day: "MON / WED", group: "Junioři & Nábor", time: "16:30" },
              { day: "TUE / THU", group: "Závodní & Sparing", time: "18:00" },
              { day: "FRI", group: "Kondiční box", time: "17:30" },
            ].map((slot) => (
              <div key={slot.day} className="rounded-lg border border-[#1c1c1c] bg-black/80 p-3">
                <div className="text-[10px] text-[#ffa1f7]">{slot.day}</div>
                <div className="text-[#efe6d8] font-sans font-medium text-[12px] mt-1">
                  {slot.group}
                </div>
                <div className="text-[#efe6d8]/45 mt-0.5">{slot.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 bg-[radial-gradient(ellipse_at_center,#151412_0%,#060606_75%)]">
      <div className="max-w-xl mx-auto space-y-5">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#efe6d8]/45">
          <span>TDHP · CONTEMPORARY DANCE THEATRE</span>
          <span>REPERTOIRE &amp; WORKSHOPS</span>
        </div>
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#efe6d8]">
          Taneční divadlo Honzy Pokusila
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="rounded-lg border border-[#1d1d1d] bg-black/75 p-3.5">
            <div className="font-mono text-[10px] text-[#ffa1f7] uppercase">Repertoár</div>
            <div className="text-[13px] font-medium text-[#efe6d8] mt-1">
              {isCs ? "Inscenace & premiéry" : "Вистави та прем'єри"}
            </div>
          </div>
          <div className="rounded-lg border border-[#1d1d1d] bg-black/75 p-3.5">
            <div className="font-mono text-[10px] text-[#ffa1f7] uppercase">Ateliér</div>
            <div className="text-[13px] font-medium text-[#efe6d8] mt-1">
              {isCs ? "Kurzy & taneční workshopy" : "Курси та танцювальні воркшопи"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-black border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#161616]">
          <span className="font-pixel uppercase text-[20px] sm:text-[22px] tracking-[-0.5px] text-[#efe6d8]">
            {lang === "cs" ? "KONTAKT →" : "КОНТАКТ →"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full border border-[#1f1f1f] text-[#efe6d8]/60 hover:text-[#ffa1f7] hover:border-[#ffa1f7]/40 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-[12px]">
            <a
              href="mailto:romanroskanuk74@gmail.com"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[#181818] bg-[#070707] text-[#efe6d8]/80 hover:border-[#ffa1f7]/50 hover:text-[#ffa1f7] transition-colors truncate"
            >
              <Mail size={14} className="text-[#ffa1f7] shrink-0" />
              <span className="truncate">romanroskanuk74@gmail.com</span>
            </a>
            <a
              href="tel:+420605447445"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[#181818] bg-[#070707] text-[#efe6d8]/80 hover:border-[#ffa1f7]/50 hover:text-[#ffa1f7] transition-colors"
            >
              <Phone size={14} className="text-[#ffa1f7] shrink-0" />
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#070707] border border-[#1a1a1a] text-[13px] text-[#efe6d8] placeholder-[#efe6d8]/35 focus:outline-none focus:border-[#ffa1f7] transition-colors"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder={t.formName}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070707] border border-[#1a1a1a] text-[13px] text-[#efe6d8] placeholder-[#efe6d8]/35 focus:outline-none focus:border-[#ffa1f7] transition-colors"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                placeholder={t.formPhone}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070707] border border-[#1a1a1a] text-[13px] text-[#efe6d8] placeholder-[#efe6d8]/35 focus:outline-none focus:border-[#ffa1f7] transition-colors"
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              placeholder={t.formEmail}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#070707] border border-[#1a1a1a] text-[13px] text-[#efe6d8] placeholder-[#efe6d8]/35 focus:outline-none focus:border-[#ffa1f7] transition-colors"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              placeholder={t.formMessage}
              rows={4}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#070707] border border-[#1a1a1a] text-[13px] text-[#efe6d8] placeholder-[#efe6d8]/35 focus:outline-none focus:border-[#ffa1f7] transition-colors resize-none"
            />

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-[12px] text-[#efe6d8]/45">
                {lang === "cs" ? "Odpovídám obratem." : "Відповідаю оперативно."}
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-9 px-5 rounded-full bg-[#ffa1f7] hover:opacity-90 text-black font-semibold text-[13.5px] tracking-[-0.02em] inline-flex items-center gap-2 cursor-pointer disabled:opacity-60 transition-all"
              >
                <span>{isSubmitting ? t.formSending : t.formSend}</span>
                <Send size={13} />
              </button>
            </div>

            {isSubmitted && (
              <div className="flex items-center gap-2 text-[12.5px] text-[#4dff00] bg-[#4dff00]/10 border border-[#4dff00]/30 p-3 rounded-xl">
                <Check size={14} />
                <span>{t.formSuccess}</span>
              </div>
            )}

            {submitError && (
              <div className="text-[12.5px] text-red-300 bg-red-500/10 border border-red-500/30 p-3 rounded-xl">
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

  const [clockText, setClockText] = useState<string>("");
  const [emailCopied, setEmailCopied] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  // Live Prague/Brno local clock (tabular-nums, Akash Tyagi top-right header style)
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Europe/Prague",
        }).format(new Date());
        setClockText(formatted);
      } catch {
        const now = new Date();
        setClockText(
          now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
        );
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  // Open contact modal if URL hash is #contact
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#contact") {
      setContactOpen(true);
    }
  }, []);

  // Close certificate modal on Escape
  useEffect(() => {
    if (!previewCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewCert(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewCert]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("romanroskanuk74@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      window.location.href = "mailto:romanroskanuk74@gmail.com";
    }
  }, []);

  const expertiseItems = isCs
    ? [
        "DEVOPS, LINUX & DOCKER CI/CD",
        "SÍTĚ L2/L3 (CCNA & MIKROTIK)",
        "C# (.NET) & BACKEND ARCHITEKTURA",
        "NEXT.JS & TYPESCRIPT SYSTÉMY",
        "ENTERPRISE AD DS & LIVE IT OPS",
      ]
    : [
        "DEVOPS, LINUX & DOCKER CI/CD",
        "МЕРЕЖІ L2/L3 (CCNA & MIKROTIK)",
        "C# (.NET) & BACKEND АРХІТЕКТУРА",
        "NEXT.JS & TYPESCRIPT СИСТЕМИ",
        "ENTERPRISE AD DS & LIVE IT OPS",
      ];

  return (
    <div id="top" className="min-h-screen bg-black text-[#efe6d8] flex flex-col lg:flex-row">
      {/* ═══════════════════════════════════════════════════════════════════════
          LEFT PANE (40% STICKY EDITORIAL BIO, AVAILABILITY STRIP & LINKS)
      ═══════════════════════════════════════════════════════════════════════ */}
      <aside className="w-full lg:w-[40%] lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-[#141414] flex flex-col justify-between bg-black z-20 shrink-0">
        {/* 1. Top Editorial Name + 3-Paragraph Justified Bio */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col xl:flex-row justify-between items-start gap-6 xl:gap-8">
          <div className="flex items-center justify-between w-full xl:w-auto gap-3 shrink-0 xl:pr-4">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 text-[15px] leading-[20px] font-semibold tracking-[-0.2px] text-[#efe6d8] hover:text-[#ffa1f7] transition-colors"
            >
              <span className="relative w-6 h-6 rounded-full overflow-hidden border border-[#262626] shrink-0">
                <Image
                  src="/images/roman-profile.jpg"
                  alt="Roman Roshkanyuk"
                  fill
                  sizes="24px"
                  priority
                  className="object-cover object-[50%_30%]"
                />
              </span>
              <span>Roman Roshkanyuk</span>
            </a>

            {/* Mobile Language Switcher */}
            <div className="flex xl:hidden items-center gap-1.5 font-mono text-[12px]">
              <button
                type="button"
                onClick={() => setLang("cs")}
                className={`cursor-pointer transition-colors ${
                  isCs ? "text-[#ffa1f7]" : "text-[#efe6d8]/40 hover:text-[#efe6d8]"
                }`}
              >
                CZ
              </button>
              <span className="text-[#efe6d8]/25">/</span>
              <button
                type="button"
                onClick={() => setLang("uk")}
                className={`cursor-pointer transition-colors ${
                  !isCs ? "text-[#ffa1f7]" : "text-[#efe6d8]/40 hover:text-[#efe6d8]"
                }`}
              >
                UA
              </button>
            </div>
          </div>

          <div className="max-w-[432px] space-y-4 text-[13px] leading-[16.5px] tracking-[-0.35px] font-medium text-[#efe6d8]/[0.48] text-justify">
            {isCs ? (
              <>
                <p>
                  Inženýr na pomezí DevOps, síťové infrastruktury a vývoje softwaru. Student{" "}
                  <span className="text-[#efe6d8]/[0.82]">
                    VUT v Brně (FEKT — Telekomunikační a informační systémy)
                  </span>{" "}
                  a absolvent <span className="text-[#efe6d8]/[0.82]">SŠ Kyberna (2026)</span> s
                  přesahem od L2/L3 směrování a jádra Linuxu až po architekturu v{" "}
                  <span className="text-[#efe6d8]/[0.82]">C# (.NET)</span> a{" "}
                  <span className="text-[#efe6d8]/[0.82]">TypeScriptu</span>.
                </p>
                <p>
                  Dodávám reálné produkční systémy pro klienty v ČR a Kanadě včetně{" "}
                  <span className="text-[#efe6d8]/[0.82]">
                    Bowlingový Club SV, Luxury Cleaning Solutions (Edmonton), Boxing Club Nikita a
                    TDHP
                  </span>
                  . Tři roky v řadě (2024–2026) vybrán do týmu živé podpory mezinárodní konference{" "}
                  <span className="text-[#efe6d8]/[0.82]">ISSS Hradec Králové</span>.
                </p>
                <p>
                  Provozuji vlastní 24/7{" "}
                  <span className="text-[#efe6d8]/[0.82]">Linux &amp; MikroTik Home Lab</span> se
                  self-hosted GitHub Actions CI/CD runnerem, multi-stage Dockerem, Cloudflare
                  Zero-Trust tunely, WireGuard VPN (OSPF/VRF/VLAN) a{" "}
                  <span className="text-[#efe6d8]/[0.82]">2× certifikací Cisco CCNA</span>.
                </p>
              </>
            ) : (
              <>
                <p>
                  Інженер на стику DevOps, мережевої інфраструктури та розробки ПЗ. Студент{" "}
                  <span className="text-[#efe6d8]/[0.82]">
                    VUT v Brně (FEKT — Телекомунікаційні та інформаційні системи)
                  </span>{" "}
                  і випускник <span className="text-[#efe6d8]/[0.82]">SŠ Kyberna (2026)</span> із
                  практичним розумінням стеку від L2/L3 маршрутизації та ядра Linux до{" "}
                  <span className="text-[#efe6d8]/[0.82]">C# (.NET)</span> і{" "}
                  <span className="text-[#efe6d8]/[0.82]">TypeScript</span>.
                </p>
                <p>
                  Запустив у продакшн комерційні платформи для клієнтів у Чехії та Канаді:{" "}
                  <span className="text-[#efe6d8]/[0.82]">
                    Bowlingový Club SV, Luxury Cleaning Solutions (Едмонтон), Boxing Club Nikita та
                    TDHP
                  </span>
                  . Три роки поспіль (2024–2026) у команді IT Support міжнародної конференції{" "}
                  <span className="text-[#efe6d8]/[0.82]">ISSS Hradec Králové</span>.
                </p>
                <p>
                  Підтримую власний 24/7{" "}
                  <span className="text-[#efe6d8]/[0.82]">Linux &amp; MikroTik Home Lab</span> із
                  self-hosted GitHub Actions CI/CD, multi-stage Docker, Cloudflare Zero-Trust,
                  WireGuard VPN (OSPF/VRF/VLAN) та{" "}
                  <span className="text-[#efe6d8]/[0.82]">2× сертифікатами Cisco CCNA</span>.
                </p>
              </>
            )}
          </div>
        </div>

        {/* 2. Middle Availability & Neon Pastel Pink CTA Strip */}
        <div className="border-t border-b border-[#141414] py-5 pl-4 pr-4 sm:pr-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-[6px] h-[6px] rounded-full bg-[#4dff00] shrink-0" />
            <span className="text-[13px] leading-[16px] tracking-[-0.35px] font-medium text-[#efe6d8]/[0.72] truncate">
              {isCs
                ? "Otevřen pro part-time & IT projekty."
                : "Відкритий до проєктів та ІТ-ролей."}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="group h-8 px-3.5 rounded-[40px] bg-[#ffa1f7] text-black text-[13.5px] leading-[16px] tracking-[-0.35px] font-semibold inline-flex items-center shrink-0 cursor-pointer transition-all duration-300"
          >
            <span>{isCs ? "Domluvit hovor" : "Зв'язатися"}</span>
            <span className="inline-block max-w-0 opacity-0 overflow-hidden group-hover:max-w-[18px] group-hover:opacity-100 group-hover:ml-1.5 transition-all duration-300 ease-out">
              →
            </span>
          </button>
        </div>

        {/* 3. Bottom Utility & Social Links (344px desktop height aligns exactly with Footer!) */}
        <div className="h-[140px] sm:h-[180px] lg:h-[344px] p-4 sm:p-5 flex items-end justify-between gap-4">
          <nav
            aria-label="Links"
            className="flex flex-wrap items-center gap-x-[18px] gap-y-2 text-[13px] leading-[16px] tracking-[-0.35px] font-medium text-[#efe6d8]/[0.48]"
          >
            <a
              href="https://github.com/rizzer18"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffa1f7] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/roshka_jr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ffa1f7] transition-colors"
            >
              Instagram
            </a>
            <Link href="/cv" className="hover:text-[#ffa1f7] transition-colors">
              CV / PDF
            </Link>
            <Link href="/uploadFile" className="hover:text-[#ffa1f7] transition-colors">
              Files
            </Link>
            <a href="tel:+420605447445" className="hover:text-[#ffa1f7] transition-colors">
              +420 605 447 445
            </a>
          </nav>

          <div className="hidden xl:flex items-center gap-1.5 font-mono text-[12px] leading-[16px]">
            <button
              type="button"
              onClick={() => setLang("cs")}
              className={`cursor-pointer transition-colors ${
                isCs ? "text-[#efe6d8]" : "text-[#efe6d8]/40 hover:text-[#ffa1f7]"
              }`}
            >
              CZ
            </button>
            <span className="text-[#efe6d8]/30">/</span>
            <button
              type="button"
              onClick={() => setLang("uk")}
              className={`cursor-pointer transition-colors ${
                !isCs ? "text-[#efe6d8]" : "text-[#efe6d8]/40 hover:text-[#ffa1f7]"
              }`}
            >
              UA
            </button>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════════
          RIGHT PANE (60% VERTICAL STREAM: CLOCK/EMAIL, WORK, EXPERTISE, FOOTER)
      ═══════════════════════════════════════════════════════════════════════ */}
      <main className="w-full lg:w-[60%] min-w-0 flex flex-col bg-black">
        {/* Sticky Top Scrim Bar (Live Clock / One-Click Email Copy) */}
        <header
          style={{
            background: "linear-gradient(180deg, #000000 8.36%, rgba(0,0,0,0) 100%)",
          }}
          className="sticky top-0 z-30 flex items-center justify-between lg:justify-end gap-2 px-4 sm:px-6 pt-[12px] pb-[52px] pointer-events-none"
        >
          <span className="lg:hidden pointer-events-auto font-mono text-[12px] text-[#efe6d8]/60">
            Brno, CZ
          </span>
          <div className="pointer-events-auto flex items-center gap-2 font-mono text-[13px] leading-[20px]">
            <span className="tabular-nums text-[#efe6d8]">{clockText || "—:—"}</span>
            <span className="text-[#efe6d8]/40">/</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-live="polite"
              className="inline-flex items-center gap-1.5 cursor-pointer group"
              title={isCs ? "Zkopírovat e-mail" : "Скопіювати e-mail"}
            >
              <span className="text-[#efe6d8]/[0.48]">Email →</span>
              <span className="text-[#efe6d8]/[0.72] group-hover:text-[#ffa1f7] transition-colors">
                {emailCopied
                  ? isCs
                    ? "Zkopírováno ✓"
                    : "Скопійовано ✓"
                  : "romanroskanuk74@gmail.com"}
              </span>
            </button>
          </div>
        </header>

        {/* Editorial Negative Space above SELECTED WORK (matches Akash Tyagi viewport horizon) */}
        <div className="h-[140px] sm:h-[220px] lg:h-[430px]" aria-hidden="true" />

        {/* SELECTED WORK / 2023 — 2026 Pixel Display Divider */}
        <div
          id="work"
          className="border-t border-b border-[#141414] py-4 pr-4 sm:pr-6 pl-5 sm:pl-6 flex items-center justify-between gap-4"
        >
          <h2 className="font-pixel uppercase text-[23px] sm:text-[26px] xl:text-[30px] leading-[32px] xl:leading-[40px] tracking-[-1px] text-[#efe6d8]/40">
            {isCs ? "VYBRANÉ PROJEKTY" : "ВИБРАНІ ПРОЄКТИ"}
          </h2>
          <span className="font-pixel uppercase text-[23px] sm:text-[26px] xl:text-[30px] leading-[32px] xl:leading-[40px] tracking-[-1px] text-[#efe6d8]/40 shrink-0">
            2023 — 2026
          </span>
        </div>

        {/* 5 Project Showcase Sections */}
        <div>
          {t.projects.map((proj, idx) => {
            const url = PROJECT_URLS[idx];
            const isExternal = url.startsWith("http");
            const domain = PROJECT_DOMAINS[idx];
            const tags = PROJECT_TAGS[idx];

            return (
              <article
                key={idx}
                className="border-b border-[#141414] py-16 sm:py-24 xl:py-[96px] flex flex-col items-center"
              >
                <div className="w-[90%] max-w-[860px] space-y-5">
                  {/* Top Bar: Project Title & Live URL */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[12px] text-[#efe6d8]/35">
                        0{idx + 1}
                      </span>
                      <h3 className="text-[15px] sm:text-[16px] font-semibold tracking-[-0.2px] text-[#efe6d8]">
                        {proj.title}
                      </h3>
                    </div>

                    {isExternal ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[12px] text-[#efe6d8]/[0.65] hover:text-[#ffa1f7] transition-colors"
                      >
                        <span>{domain}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span className="font-mono text-[12px] text-[#4dff00]/80">{domain}</span>
                    )}
                  </div>

                  {/* Showcase Artifact Card */}
                  {isExternal ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-[12px] border border-[#191817] hover:border-[#2c2a29] bg-[#060606] overflow-hidden transition-colors group"
                    >
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#141414] bg-[#090909]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#242424]" />
                          <span className="w-2 h-2 rounded-full bg-[#242424]" />
                          <span className="w-2 h-2 rounded-full bg-[#242424]" />
                        </div>
                        <span className="font-mono text-[11px] text-[#efe6d8]/40 group-hover:text-[#efe6d8]/70 transition-colors">
                          https://{domain}
                        </span>
                        <span className="font-mono text-[10.5px] text-[#ffa1f7] opacity-0 group-hover:opacity-100 transition-opacity">
                          {isCs ? "Otevřít →" : "Відкрити →"}
                        </span>
                      </div>
                      <ProjectVisualShowcase index={idx} lang={lang} />
                    </a>
                  ) : (
                    <div className="rounded-[12px] border border-[#191817] bg-[#060606] overflow-hidden">
                      <ProjectVisualShowcase index={idx} lang={lang} />
                    </div>
                  )}

                  {/* Editorial Description + Tech Tags */}
                  <div className="pt-1 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <p className="max-w-[520px] text-[13px] leading-[18px] tracking-[-0.3px] text-[#efe6d8]/[0.48]">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap md:justify-end gap-1.5 md:max-w-[280px] shrink-0">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full border border-[#1a1a1a] font-mono text-[11px] text-[#efe6d8]/[0.55]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            EXPERTISE → SECTION (EXACT AKASH TYAGI PIXEL LIST LAYOUT)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-[#141414] px-5 sm:px-6 py-10 flex flex-col md:flex-row justify-between items-start gap-6">
          <h2 className="font-pixel uppercase text-[24px] sm:text-[26px] xl:text-[30px] leading-[32px] xl:leading-[40px] tracking-[-1px] text-[#efe6d8]/40 shrink-0">
            <span className="hidden md:inline">EXPERTISE →</span>
            <span className="md:hidden">EXPERTISE ↓</span>
          </h2>

          <ul className="space-y-1 font-pixel uppercase text-[21px] sm:text-[25px] xl:text-[28px] leading-[32px] xl:leading-[40px] tracking-[-0.8px] text-[#ffa1f7]">
            {expertiseItems.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CREDENTIALS, VUT / ISSS & 6 OFFICIAL CERTIFICATES
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="credentials" className="border-b border-[#141414]">
          <div className="border-b border-[#141414] py-4 pr-4 sm:pr-6 pl-5 sm:pl-6 flex items-center justify-between gap-4">
            <h2 className="font-pixel uppercase text-[22px] sm:text-[26px] xl:text-[30px] leading-[32px] xl:leading-[40px] tracking-[-1px] text-[#efe6d8]/40">
              {isCs ? "CERTIFIKÁTY & PRAXE" : "СЕРТИФІКАТИ & ДОСВІД"}
            </h2>
            <span className="font-pixel uppercase text-[22px] sm:text-[26px] xl:text-[30px] leading-[32px] xl:leading-[40px] tracking-[-1px] text-[#efe6d8]/40 shrink-0">
              6× PDF
            </span>
          </div>

          {/* Education & ISSS Experience Hairline Rows */}
          <div className="divide-y divide-[#141414]">
            {t.schools.map((school, idx) => (
              <div
                key={idx}
                className="px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[14px] font-semibold text-[#efe6d8]">{school.name}</span>
                    <span
                      className={`font-mono text-[10.5px] px-2 py-0.5 rounded-full border ${
                        school.active
                          ? "border-[#4dff00]/35 text-[#4dff00]"
                          : "border-[#222222] text-[#efe6d8]/55"
                      }`}
                    >
                      {school.badge}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#efe6d8]/[0.72]">{school.desc}</p>
                  <p className="text-[12.5px] text-[#efe6d8]/[0.45] leading-relaxed">{school.sub}</p>
                </div>
                <span className="font-mono text-[12px] text-[#efe6d8]/40 shrink-0">
                  {school.period}
                </span>
              </div>
            ))}

            {/* ISSS Live IT Support Highlight */}
            <div className="px-5 sm:px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-8 space-y-1.5">
                <div className="font-mono text-[11px] text-[#ffa1f7] uppercase">
                  {t.expCards[0].tag}
                </div>
                <h3 className="text-[14px] font-semibold text-[#efe6d8]">{t.expCards[0].title}</h3>
                <p className="text-[13px] leading-[18px] text-[#efe6d8]/[0.48]">
                  {t.expCards[0].desc}
                </p>
              </div>
              <div className="md:col-span-4 relative h-28 rounded-xl overflow-hidden border border-[#1a1a1a]">
                <Image
                  src="/images/classroom.png"
                  alt="Roman Roshkanyuk — ISSS & Team"
                  fill
                  sizes="260px"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* 6 Interactive Certificates Hairline Grid */}
          <div className="border-t border-[#141414] grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 border-collapse">
            {CERTIFICATES.map((cert, idx) => (
              <div
                key={cert.name}
                onClick={() => setPreviewCert(cert)}
                className={`p-5 sm:px-6 flex items-center justify-between gap-3 cursor-pointer group hover:bg-[#080808] transition-colors border-[#141414] ${
                  idx % 2 === 0 ? "sm:border-r" : ""
                } ${idx < CERTIFICATES.length - 2 ? "sm:border-b" : ""}`}
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2 font-mono text-[10.5px] text-[#efe6d8]/40">
                    <Shield size={11} className="text-[#ffa1f7] shrink-0" />
                    <span>{cert.badge}</span>
                    <span>·</span>
                    <span>{cert.year}</span>
                  </div>
                  <div className="text-[13.5px] font-medium text-[#efe6d8] group-hover:text-[#ffa1f7] transition-colors truncate">
                    {cert.name}
                  </div>
                  <div className="text-[12px] text-[#efe6d8]/40 truncate">{cert.issuer}</div>
                </div>

                <div
                  className="flex items-center gap-1.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setPreviewCert(cert)}
                    className="p-2 rounded-full border border-[#1d1d1d] text-[#efe6d8]/60 hover:text-[#ffa1f7] hover:border-[#ffa1f7]/40 transition-colors cursor-pointer"
                    title={t.certView}
                  >
                    <Eye size={13} />
                  </button>
                  <a
                    href={cert.file}
                    download
                    className="p-2 rounded-full border border-[#1d1d1d] text-[#efe6d8]/60 hover:text-[#ffa1f7] hover:border-[#ffa1f7]/40 transition-colors"
                    title={t.certDownload}
                  >
                    <Download size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            3D PERSPECTIVE ANIMATED WIREFRAME GRID ARTWORK
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          aria-hidden="true"
          className="relative h-[240px] sm:h-[360px] perspective-wireframe-stage border-b border-[#141414]"
        >
          <div className="perspective-wireframe-plane" />
          <div
            style={{
              background: "linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.65) 38%, transparent 100%)",
            }}
            className="absolute inset-0 pointer-events-none"
          />
          <div
            style={{
              background: "linear-gradient(to top, #000000 0%, transparent 28%)",
            }}
            className="absolute inset-0 pointer-events-none"
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            FOOTER (100vh DESKTOP — ALIGNS HORIZONTALLY WITH LEFT 344px BLOCK)
        ═══════════════════════════════════════════════════════════════════ */}
        <footer className="lg:h-screen flex flex-col justify-between bg-black">
          {/* Centered Pink Pixel-Art Downward Hand */}
          <div className="flex-1 min-h-[260px] flex items-center justify-center p-8">
            <PixelPointingHand />
          </div>

          {/* Middle Pixel CTA Band (Aligns cleanly with Left Availability Strip) */}
          <div className="border-t border-b border-[#141414] py-4 px-5 sm:px-6 flex flex-wrap items-center justify-between gap-2 font-pixel uppercase text-[22px] sm:text-[26px] xl:text-[30px] leading-[32px] xl:leading-[40px] tracking-[-1px]">
            <span className="text-[#efe6d8]/[0.72]">
              {isCs ? "HLEDÁTE SPOLEHLIVÉHO INŽENÝRA?" : "ПОТРІБЕН НАДІЙНИЙ ІНЖЕНЕР?"}
            </span>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="font-pixel uppercase text-[#ffa1f7] hover:underline decoration-2 underline-offset-4 cursor-pointer transition-all"
            >
              {isCs ? "NAPIŠTE MI!" : "НАПИШІТЬ МЕНІ!"}
            </button>
          </div>

          {/* Bottom 344px Copyright Block */}
          <div className="h-[140px] sm:h-[180px] lg:h-[344px] p-4 sm:p-5 flex items-end justify-center lg:justify-end">
            <span className="font-mono text-[13px] leading-[16px] tracking-[-0.35px] text-[#efe6d8]/[0.48] uppercase">
              © 2026 ROMAN ROSHKANYUK
            </span>
          </div>
        </footer>
      </main>

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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#161616] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold text-[#efe6d8] truncate">
                {previewCert.name}
              </p>
              <p className="font-mono text-[11px] text-[#efe6d8]/45">
                {previewCert.issuer} · {previewCert.year}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={previewCert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1f1f1f] text-[12px] text-[#efe6d8]/80 hover:border-[#ffa1f7]/50 hover:text-[#ffa1f7] transition-colors"
              >
                <ExternalLink size={12} />
                <span className="hidden sm:inline">
                  {isCs ? "Nová záložka" : "Нова вкладка"}
                </span>
              </a>
              <a
                href={previewCert.file}
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffa1f7] text-black text-[12px] font-semibold"
              >
                <Download size={12} />
                <span>{t.certDownload}</span>
              </a>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="p-2 rounded-full border border-[#1f1f1f] text-[#efe6d8]/60 hover:text-[#ffa1f7] cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
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
              className="w-full max-w-5xl h-full rounded-xl border border-[#1c1c1c] bg-white shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
