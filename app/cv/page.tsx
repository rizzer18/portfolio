"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Printer,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Shield,
  Code,
  GraduationCap,
  Briefcase,
  Layers,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function CVPage() {
  const { lang, setLang } = useLanguage();
  const isCs = lang === "cs";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white print:bg-white print:text-black py-6 sm:py-10 px-3 sm:px-6">
      {/* Top Floating Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all text-xs sm:text-sm font-medium"
        >
          <ArrowLeft size={15} />
          <span>{isCs ? "Zpět na portfolio" : "Назад до портфоліо"}</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-0.5 text-xs font-bold">
            <button
              onClick={() => setLang("cs")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                isCs ? "bg-amber-400 text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              CZ
            </button>
            <button
              onClick={() => setLang("uk")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                !isCs ? "bg-amber-400 text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              UA
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm shadow-gold-sm transition-all cursor-pointer"
          >
            <Printer size={15} />
            <span>{isCs ? "Tisk / Uložit PDF" : "Друк / Зберегти PDF"}</span>
          </button>
        </div>
      </div>

      {/* Main CV Document Container (A4 Printable Layout) */}
      <main className="max-w-4xl mx-auto bg-[#111115] print:bg-white border border-zinc-800/90 print:border-none rounded-3xl print:rounded-none p-5 sm:p-9 shadow-2xl print:shadow-none print:p-0">
        {/* HEADER */}
        <header className="border-b border-zinc-800/80 print:border-zinc-300 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400/50 print:border-zinc-400 shrink-0 bg-zinc-900">
                <Image
                  src="/images/roman-profile.jpg"
                  alt="Roman Roshkanyuk"
                  fill
                  sizes="96px"
                  className="object-cover object-[50%_32%]"
                  priority
                />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight mb-0.5">
                  Roman Roshkanyuk
                </h1>
                <p className="text-amber-400 print:text-zinc-800 font-bold text-xs sm:text-sm mb-2">
                  Junior DevOps, Infrastructure &amp; Software Engineer (Linux · Sítě · C# .NET · Next.js)
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 print:border-zinc-400 print:text-zinc-700 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 print:bg-zinc-700" />
                  <span>
                    {isCs
                      ? "VUT v Brně (FEKT) · 1. ročník Bc. · k dispozici pro part-time / spolupráci"
                      : "VUT v Brně (FEKT) · 1-й курс · відкритий до співпраці / part-time"}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Pills */}
            <div className="grid grid-cols-1 gap-1.5 text-xs text-zinc-300 print:text-zinc-700 w-full sm:w-auto">
              <a
                href="tel:+420605447445"
                className="flex items-center gap-2 hover:text-amber-400 print:hover:text-black transition-colors"
              >
                <Phone size={13} className="text-amber-400 print:text-zinc-800 shrink-0" />
                <span className="font-semibold">+420 605 447 445</span>
              </a>
              <a
                href="mailto:romanroskanuk74@gmail.com"
                className="flex items-center gap-2 hover:text-amber-400 print:hover:text-black transition-colors"
              >
                <Mail size={13} className="text-amber-400 print:text-zinc-800 shrink-0" />
                <span>romanroskanuk74@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-zinc-400 print:text-zinc-600">
                <MapPin size={13} className="text-amber-400 print:text-zinc-800 shrink-0" />
                <span>Brno / Hradec Králové, ČR</span>
              </div>
              <a
                href="https://github.com/rizzer18"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 print:text-zinc-700"
              >
                <Globe size={13} className="text-amber-400 print:text-zinc-800 shrink-0" />
                <span>github.com/rizzer18 · portfolio.smarthomeroshkajr.cc</span>
              </a>
            </div>
          </div>
        </header>

        {/* 2-COLUMN BODY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
          {/* LEFT / MAIN COLUMN (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            {/* Executive Technical Summary */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-2.5 flex items-center gap-2">
                <Briefcase size={14} />
                <span>{isCs ? "Inženýrské shrnutí" : "Інженерний профіль"}</span>
              </h2>
              <p className="text-xs text-zinc-300 print:text-zinc-800 leading-relaxed">
                {isCs
                  ? "Prakticky zaměřený student 1. ročníku VUT FEKT Brno a absolvent SŠ Kyberna (2026) se zaměřením na správu Linuxu, sítě (2× Cisco CCNA, MikroTik, Windows Server AD DS & GPO) a vývoj v C# (.NET) a TypeScriptu (Next.js). Své znalosti prokazuji na reálných komerčních webech pro klienty v ČR a Kanadě (4 projekty v provozu), tříleté praxi v IT Support týmu na konferenci ISSS (2024–2026) a vlastním domácím Home Labu (Linux server, Docker, vlastní GitHub Actions CI/CD, Cloudflare Zero-Trust a MikroTik VPN/OSPF/VLAN)."
                  : "Практично орієнтований студент 1-го курсу VUT FEKT Brno та випускник SŠ Kyberna (2026) зі спеціалізацією на Linux, мережах (2× Cisco CCNA, MikroTik, Windows Server AD DS & GPO) та розробці на C# (.NET) і TypeScript (Next.js). Підтверджую свої навички 4 реальними комерційними сайтами для клієнтів у Чехії й Канаді, трирічним досвідом IT Support на конференції ISSS (2024–2026) та власними домашніми Home Lab проєктами (Linux-сервер, Docker, власний GitHub Actions CI/CD, Cloudflare Zero-Trust і MikroTik VPN/OSPF/VLAN)."}
              </p>
            </section>

            {/* Real Experience & Commercial Work */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-3 flex items-center gap-2">
                <Briefcase size={14} />
                <span>
                  {isCs
                    ? "Praxe & Komerční realizace"
                    : "Практичний досвід & Комерційні проєкти"}
                </span>
              </h2>

              <div className="space-y-3.5">
                {/* Commercial Web & C# */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-white print:text-black">
                      {isCs
                        ? "Freelance Web Developer & C# (.NET) vývoj"
                        : "Freelance Web Developer & розробка на C# (.NET)"}
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600 shrink-0">
                      2023 — {isCs ? "Současnost" : "Тепер. час"}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1">
                    Next.js 15 · TypeScript · Node.js · C# (.NET, OOP/SOLID, System.Reflection)
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      <strong className="text-white print:text-black">
                        {isCs ? "4 komerční weby v provozu:" : "4 комерційні сайти в продакшні:"}
                      </strong>{" "}
                      <code>bowlingovyclubsv.cz</code>,{" "}
                      <code>luxury-cleaning-solutions.ca</code> (Kanada),{" "}
                      <code>nikita-box.cz</code>, <code>honzapokusil.cz</code>.
                    </li>
                    <li>
                      <strong className="text-white print:text-black">C# (.NET):</strong>{" "}
                      {isCs
                        ? "Důraz na čisté OOP & SOLID principy, Generics, LINQ, async/await a práci se System.Reflection + vlastní streamovací File Server (HTTP 206 Range)."
                        : "Чиста архітектура ООП & SOLID, Generics, LINQ, async/await та робота з System.Reflection + власний потоковий File Server (HTTP 206 Range)."}
                    </li>
                  </ul>
                </div>

                {/* ISSS Live IT Support */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-white print:text-black">
                      IT Support — Konference ISSS Hradec Králové
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600 shrink-0">
                      {isCs ? "Ročníky 2024, 2025, 2026" : "Роки 2024, 2025, 2026"}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1">
                    {isCs
                      ? "Mezinárodní konference ISSS · Výběr SŠ Kyberna (v termínech konání)"
                      : "Міжнародна конференція ISSS · Відбір SŠ Kyberna (у дні проведення)"}
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      {isCs
                        ? "Během studia na SŠ Kyberna třikrát v řadě (2024, 2025 a 2026) vybrán vedením školy pro spolehlivost, klidnou komunikaci a okamžité řešení L1/L2 síťových, AV a OS problémů přímo v přednáškových sálech."
                        : "Під час навчання в SŠ Kyberna три роки поспіль (2024, 2025 та 2026) відбирався керівництвом школи за надійність, чітку комунікацію та миттєве усунення L1/L2 мережевих, AV та системних інцидентів у залах конференції."}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Personal Home Lab Projects (Proof of Skills) */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-3 flex items-center gap-2">
                <Code size={14} />
                <span>
                  {isCs
                    ? "Domácí technické projekty — Home Lab (Ukázka dovedností)"
                    : "Домашні технічні проєкти — Home Lab (Підтвердження вмінь)"}
                </span>
              </h2>

              <div className="space-y-3.5">
                {/* Home Project 1: Linux, Docker & CI/CD */}
                <div className="border-l-2 border-zinc-700 print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-white print:text-black">
                      {isCs
                        ? "Domácí Linux Server, Docker CI/CD & Smart Home"
                        : "Домашній Linux-сервер, Docker CI/CD & Smart Home"}
                    </h3>
                    <span className="text-[10px] font-mono text-amber-400/90 print:text-zinc-600 shrink-0">
                      {isCs ? "Domácí projekt (Home Lab)" : "Домашній проєкт (Home Lab)"}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 print:text-zinc-700 font-medium mb-1">
                    Debian/Ubuntu · Multi-stage Docker · GitHub Actions Runner · Cloudflare Zero-Trust
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      {isCs ? (
                        <>
                          Vlastní domácí server pro praktický trénink DevOps: automatický CI/CD deploy přes vlastní{" "}
                          <strong className="text-white print:text-black">
                            systemd GitHub Actions Runner
                          </strong>{" "}
                          a multi-stage Alpine Docker kontejnery (non-root).
                        </>
                      ) : (
                        <>
                          Власний домашній сервер як практичне підтвердження DevOps-навичок: автоматичний CI/CD деплой через власний{" "}
                          <strong className="text-white print:text-black">
                            systemd GitHub Actions Runner
                          </strong>{" "}
                          та multi-stage Alpine Docker контейнери (non-root).
                        </>
                      )}
                    </li>
                    <li>
                      {isCs
                        ? "Zabezpečený přístup přes Cloudflare Zero-Trust Tunnels (0 otevřených WAN portů, SSH key-only) a provoz Docker Compose služeb (Home Assistant, Mosquitto MQTT, Zigbee2MQTT, Frigate NVR)."
                        : "Безпечний доступ через Cloudflare Zero-Trust Tunnels (0 відкритих WAN-портів, SSH key-only) та робота Docker Compose сервісів (Home Assistant, Mosquitto MQTT, Zigbee2MQTT, Frigate NVR)."}
                    </li>
                  </ul>
                </div>

                {/* Home Project 2: MikroTik Networking Lab */}
                <div className="border-l-2 border-zinc-700 print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-white print:text-black">
                      {isCs
                        ? "Domácí síťová laboratoř — MikroTik VPN, OSPF & VLAN"
                        : "Домашня мережева лабораторія — MikroTik VPN, OSPF & VLAN"}
                    </h3>
                    <span className="text-[10px] font-mono text-amber-400/90 print:text-zinc-600 shrink-0">
                      {isCs ? "Domácí projekt (Home Lab)" : "Домашній проєкт (Home Lab)"}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 print:text-zinc-700 font-medium mb-1">
                    MikroTik RouterOS · WireGuard VPN · OSPF · VRF · 802.1Q VLAN · Wireshark
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      {isCs
                        ? "Praktický domácí projekt pro ověření znalostí ze Cisco CCNA: šifrovaný WireGuard Site-to-Site tunel mezi dvěma MikroTik routery, dynamické směrování OSPF a izolace tabulek pomocí VRF."
                        : "Власний домашній проєкт для практичного закріплення знань Cisco CCNA: шифрований WireGuard Site-to-Site тунель між двома MikroTik роутерами, динамічна маршрутизація OSPF та ізоляція таблиць VRF."}
                    </li>
                    <li>
                      {isCs
                        ? "Segmentace sítě přes 802.1Q VLAN (oddělené CZ a UA VLAN s policy-based routingem), konfigurace Firewall/NAT/Mangle a analýza paketů ve Wiresharku."
                        : "Сегментація мережі через 802.1Q VLAN (окремі CZ та UA VLAN із policy-based routing), налаштування Firewall/NAT/Mangle та аналіз пакетів у Wireshark."}
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            {/* Education */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-2.5 flex items-center gap-2">
                <GraduationCap size={14} />
                <span>{isCs ? "Vzdělání" : "Освіта"}</span>
              </h2>

              <div className="space-y-3">
                <div className="bg-zinc-900/60 print:bg-transparent border border-zinc-800 print:border-zinc-300 rounded-xl p-3">
                  <div className="flex items-center justify-between text-[10px] text-amber-400 print:text-zinc-700 font-bold mb-0.5">
                    <span>2026 — {isCs ? "Současnost" : "Тепер. час"}</span>
                    <span className="text-emerald-400 print:text-zinc-700">1. ročník Bc.</span>
                  </div>
                  <h3 className="text-xs font-bold text-white print:text-black">
                    VUT v Brně — FEKT
                  </h3>
                  <p className="text-[11px] text-zinc-300 print:text-zinc-700">
                    Telekomunikační a informační systémy
                  </p>
                </div>

                <div className="bg-zinc-900/60 print:bg-transparent border border-zinc-800 print:border-zinc-300 rounded-xl p-3">
                  <div className="flex items-center justify-between text-[10px] text-amber-400 print:text-zinc-700 font-bold mb-0.5">
                    <span>2022 — 2026</span>
                    <span className="text-zinc-400 print:text-zinc-600">Maturita 2026</span>
                  </div>
                  <h3 className="text-xs font-bold text-white print:text-black">
                    Střední škola Kyberna, Hradec Králové
                  </h3>
                  <p className="text-[10px] text-zinc-400 print:text-zinc-600 mt-1 leading-relaxed">
                    {isCs
                      ? "IT maturita: Windows Server (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), VMware virtualizace, Cisco CCNA R&S, Linux & C# (.NET)."
                      : "IT матуріта: Windows Server (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), VMware віртуалізація, Cisco CCNA R&S, Linux & C# (.NET)."}
                  </p>
                </div>
              </div>
            </section>

            {/* Tech Matrix */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-2.5 flex items-center gap-2">
                <Layers size={14} />
                <span>Technický Stack</span>
              </h2>

              <div className="space-y-2.5 text-[11px]">
                {[
                  {
                    label: "DevOps, Linux & Security",
                    items: [
                      "Linux (Debian/Ubuntu)",
                      "Docker & Compose",
                      "GitHub Actions CI/CD",
                      "systemd",
                      "Bash",
                      "Cloudflare Zero-Trust",
                      "SSH Hardening",
                    ],
                  },
                  {
                    label: "Networking & Enterprise",
                    items: [
                      "MikroTik RouterOS",
                      "OSPF & VRF",
                      "WireGuard / IPsec",
                      "802.1Q VLAN",
                      "Cisco CCNA",
                      "Wireshark",
                      "Windows Server",
                      "AD DS & GPO",
                      "VMware",
                    ],
                  },
                  {
                    label: "C# (.NET) & Web Engineering",
                    items: [
                      "C# (.NET)",
                      "OOP & SOLID",
                      "System.Reflection",
                      "LINQ & Async",
                      "TypeScript",
                      "Next.js 15",
                      "React 19",
                      "Node.js",
                      "REST & HTTP 206",
                      "Git",
                    ],
                  },
                ].map((group) => (
                  <div key={group.label}>
                    <span className="text-[10px] font-bold text-amber-400 print:text-zinc-800 uppercase block mb-1">
                      {group.label}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {group.items.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-zinc-800/80 print:bg-zinc-100 text-zinc-200 print:text-zinc-800 text-[10px] border border-zinc-700/40 print:border-zinc-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-2 flex items-center gap-2">
                <Shield size={14} />
                <span>{isCs ? "Ověřené Certifikáty (6)" : "Сертифікати (6)"}</span>
              </h2>
              <ul className="space-y-1 text-[11px] text-zinc-300 print:text-zinc-800">
                <li>• <strong>CCNA: Switching, Routing &amp; Wireless</strong> — Cisco</li>
                <li>• <strong>CCNA: Introduction to Networks</strong> — Cisco</li>
                <li>• <strong>Linux Essentials</strong> — Cisco Networking Academy</li>
                <li>• <strong>IT Essentials (HW &amp; OS)</strong> — Cisco</li>
                <li>• <strong>ECDL Certificate</strong> &amp; <strong>English B1 Certificate</strong></li>
              </ul>
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-2 flex items-center gap-2">
                <Globe size={14} />
                <span>{isCs ? "Jazyky" : "Мови"}</span>
              </h2>
              <ul className="space-y-1 text-xs text-zinc-300 print:text-zinc-800">
                <li className="flex justify-between">
                  <span>{isCs ? "Čeština" : "Чеська"}</span>
                  <span className="text-amber-400 print:text-zinc-700 font-semibold text-[11px]">
                    C1 (maturita, VUT Brno)
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>{isCs ? "Ukrajinština" : "Українська"}</span>
                  <span className="text-amber-400 print:text-zinc-700 font-semibold text-[11px]">
                    {isCs ? "Rodilý mluvčí (C2)" : "Рідна (C2)"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>{isCs ? "Angličtina" : "Англійська"}</span>
                  <span className="text-amber-400 print:text-zinc-700 font-semibold text-[11px]">
                    B1+ (Tech Docs / CLI)
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <footer className="mt-6 pt-4 border-t border-zinc-800 print:border-zinc-300 text-center text-[10px] text-zinc-500">
          Roman Roshkanyuk · +420 605 447 445 · romanroskanuk74@gmail.com · github.com/rizzer18 · Brno, ČR
        </footer>
      </main>
    </div>
  );
}
