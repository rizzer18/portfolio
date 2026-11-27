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
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function CVPage() {
  const { lang, setLang } = useLanguage();
  const isCs = lang === "cs";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen text-[#f5f4f1] print:bg-white print:text-black py-6 sm:py-10 px-3 sm:px-6">
      {/* Top Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 pb-4 border-b border-white/[0.1] flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[#f5f4f1]/80 hover:text-[#f5f4f1] transition-colors"
        >
          <ArrowLeft size={15} />
          <span>{isCs ? "Zpět na portfolio" : "Назад до портфоліо"}</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-0.5 rounded-full border border-white/[0.14] bg-white/[0.04] font-mono text-[11.5px]">
            <button
              type="button"
              onClick={() => setLang("cs")}
              className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                isCs ? "bg-[#f5f4f1] text-[#100e0b] font-semibold" : "text-[#9b968f] hover:text-[#f5f4f1]"
              }`}
            >
              CZ
            </button>
            <button
              type="button"
              onClick={() => setLang("uk")}
              className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                !isCs ? "bg-[#f5f4f1] text-[#100e0b] font-semibold" : "text-[#9b968f] hover:text-[#f5f4f1]"
              }`}
            >
              UA
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="h-9 px-4 sm:px-5 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] font-medium text-[13px] inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer size={14} />
            <span>{isCs ? "Tisk / Uložit PDF" : "Друк / Зберегти PDF"}</span>
          </button>
        </div>
      </div>

      {/* Main CV Document Container (A4 Printable Layout) */}
      <main className="max-w-4xl mx-auto rounded-2xl print:rounded-none border border-white/[0.14] print:border-none bg-[#15120e]/78 backdrop-blur-2xl print:bg-white p-5 sm:p-9 print:p-0 shadow-[0_26px_70px_rgba(0,0,0,0.6)] print:shadow-none">
        {/* HEADER */}
        <header className="border-b border-white/[0.1] print:border-zinc-300 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/[0.2] print:border-zinc-400 shrink-0 bg-[#100e0b]">
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
                <h1 className="font-serif text-3xl sm:text-4xl text-[#f5f4f1] print:text-black tracking-[-0.02em] mb-1">
                  Roman Roshkanyuk
                </h1>
                <p className="text-[#f5f4f1]/85 print:text-zinc-800 font-medium text-xs sm:text-[13.5px] mb-2">
                  Junior DevOps, Infrastructure &amp; Software Engineer (Linux · Sítě · C# .NET · Next.js)
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#3fbf7f]/12 border border-[#3fbf7f]/30 print:border-zinc-400 text-[11.5px] text-[#3fbf7f] print:text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fbf7f] print:bg-zinc-700 shrink-0" />
                  <span>
                    {isCs
                      ? "VUT v Brně (FEKT) · 1. ročník Bc. · k dispozici pro part-time / spolupráci"
                      : "VUT v Brně (FEKT) · 1-й курс · відкритий до співпраці / part-time"}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-1.5 font-mono text-[11.5px] text-[#f5f4f1]/80 print:text-zinc-700 w-full sm:w-auto">
              <a
                href="tel:+420605447445"
                className="flex items-center gap-2 hover:text-white print:hover:text-black transition-colors"
              >
                <Phone size={12} className="text-[#3fbf7f] print:text-zinc-800 shrink-0" />
                <span>+420 605 447 445</span>
              </a>
              <a
                href="mailto:romanroskanuk74@gmail.com"
                className="flex items-center gap-2 hover:text-white print:hover:text-black transition-colors"
              >
                <Mail size={12} className="text-[#3fbf7f] print:text-zinc-800 shrink-0" />
                <span>romanroskanuk74@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-[#9b968f] print:text-zinc-600">
                <MapPin size={12} className="text-[#3fbf7f] print:text-zinc-800 shrink-0" />
                <span>Brno / Hradec Králové, ČR</span>
              </div>
              <a
                href="https://github.com/rizzer18"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white print:text-zinc-700 transition-colors"
              >
                <Globe size={12} className="text-[#3fbf7f] print:text-zinc-800 shrink-0" />
                <span>github.com/rizzer18</span>
              </a>
            </div>
          </div>
        </header>

        {/* 2-COLUMN BODY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
          {/* LEFT / MAIN COLUMN (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-2">
                {isCs ? "Inženýrské shrnutí" : "Інженерний профіль"}
              </h2>
              <p className="text-[12.5px] text-[#f5f4f1]/75 print:text-zinc-800 leading-relaxed text-justify">
                {isCs
                  ? "Prakticky zaměřený student 1. ročníku VUT FEKT Brno a absolvent SŠ Kyberna (2026) se zaměřením na správu Linuxu, sítě (2× Cisco CCNA, MikroTik, Windows Server AD DS & GPO) a vývoj v C# (.NET) a TypeScriptu (Next.js). Své znalosti prokazuji na reálných komerčních webech pro klienty v ČR a Kanadě (4 projekty v provozu), tříleté praxi v IT Support týmu na konferenci ISSS (2024–2026) a vlastním domácím Home Labu (Linux server, Docker, vlastní GitHub Actions CI/CD, Cloudflare Zero-Trust a MikroTik VPN/OSPF/VLAN)."
                  : "Практично орієнтований студент 1-го курсу VUT FEKT Brno та випускник SŠ Kyberna (2026) зі спеціалізацією на Linux, мережах (2× Cisco CCNA, MikroTik, Windows Server AD DS & GPO) та розробці на C# (.NET) і TypeScript (Next.js). Підтверджую свої навички 4 реальними комерційними сайтами для клієнтів у Чехії й Канаді, трирічним досвідом IT Support на конференції ISSS (2024–2026) та власними домашніми Home Lab проєктами (Linux-сервер, Docker, власний GitHub Actions CI/CD, Cloudflare Zero-Trust і MikroTik VPN/OSPF/VLAN)."}
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-3">
                {isCs ? "Praxe & Komerční realizace" : "Практичний досвід & Проєкти"}
              </h2>

              <div className="space-y-4">
                <div className="border-l border-white/[0.28] print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-[13.5px] font-semibold text-[#f5f4f1] print:text-black">
                      {isCs
                        ? "Freelance Web Developer & C# (.NET) vývoj"
                        : "Freelance Web Developer & розробка на C# (.NET)"}
                    </h3>
                    <span className="text-[11px] font-mono text-[#9b968f] print:text-zinc-600 shrink-0">
                      2023 — {isCs ? "Současnost" : "Тепер. час"}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#3fbf7f] print:text-zinc-700 mb-1.5">
                    Next.js 15 · TypeScript · Node.js · C# (.NET, OOP/SOLID, System.Reflection)
                  </p>
                  <ul className="text-[12px] text-[#f5f4f1]/75 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      <strong className="text-[#f5f4f1] print:text-black">
                        {isCs ? "4 komerční weby v provozu:" : "4 комерційні сайти в продакшні:"}
                      </strong>{" "}
                      <code>bowlingovyclubsv.cz</code>,{" "}
                      <code>luxury-cleaning-solutions.ca</code> (Kanada),{" "}
                      <code>nikita-box.cz</code>, <code>honzapokusil.cz</code>.
                    </li>
                    <li>
                      <strong className="text-[#f5f4f1] print:text-black">C# (.NET):</strong>{" "}
                      {isCs
                        ? "Důraz na čisté OOP & SOLID principy, Generics, LINQ, async/await a práci se System.Reflection + vlastní streamovací File Server (HTTP 206 Range)."
                        : "Чиста архітектура ООП & SOLID, Generics, LINQ, async/await та робота з System.Reflection + власний потоковий File Server (HTTP 206 Range)."}
                    </li>
                  </ul>
                </div>

                <div className="border-l border-white/[0.28] print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-[13.5px] font-semibold text-[#f5f4f1] print:text-black">
                      IT Support — Konference ISSS Hradec Králové
                    </h3>
                    <span className="text-[11px] font-mono text-[#9b968f] print:text-zinc-600 shrink-0">
                      2024, 2025, 2026
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#3fbf7f] print:text-zinc-700 mb-1.5">
                    {isCs
                      ? "Mezinárodní konference ISSS · Výběr SŠ Kyberna"
                      : "Міжнародна конференція ISSS · Відбір SŠ Kyberna"}
                  </p>
                  <p className="text-[12px] text-[#f5f4f1]/75 print:text-zinc-700 leading-relaxed">
                    {isCs
                      ? "Během studia na SŠ Kyberna třikrát v řadě (2024, 2025 a 2026) vybrán vedením školy pro spolehlivost, klidnou komunikaci a okamžité řešení L1/L2 síťových, AV a OS problémů přímo v přednáškových sálech."
                      : "Під час навчання в SŠ Kyberna три роки поспіль (2024, 2025 та 2026) відбирався керівництвом школи за надійність, чітку комунікацію та миттєве усунення L1/L2 мережевих, AV та системних інцидентів у залах конференції."}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-3">
                {isCs ? "Domácí projekty — Home Lab" : "Домашні проєкти — Home Lab"}
              </h2>

              <div className="space-y-4">
                <div className="border-l border-white/[0.16] print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-[13px] font-semibold text-[#f5f4f1] print:text-black">
                      {isCs
                        ? "Domácí Linux Server, Docker CI/CD & Smart Home"
                        : "Домашній Linux-сервер, Docker CI/CD & Smart Home"}
                    </h3>
                    <span className="text-[10.5px] font-mono text-[#9b968f] print:text-zinc-600 shrink-0">
                      Home Lab
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#9b968f] print:text-zinc-700 mb-1.5">
                    Debian/Ubuntu · Multi-stage Docker · GitHub Actions Runner · Cloudflare Zero-Trust
                  </p>
                  <ul className="text-[12px] text-[#f5f4f1]/75 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      {isCs
                        ? "Automatický CI/CD deploy přes vlastní systemd GitHub Actions Runner a multi-stage Alpine Docker kontejnery (non-root)."
                        : "Автоматичний CI/CD деплой через власний systemd GitHub Actions Runner та multi-stage Alpine Docker контейнери (non-root)."}
                    </li>
                    <li>
                      {isCs
                        ? "Zabezpečený přístup přes Cloudflare Zero-Trust Tunnels (0 otevřených WAN portů, SSH key-only) a provoz Docker Compose služeb (Home Assistant, Mosquitto MQTT, Zigbee2MQTT, Frigate NVR)."
                        : "Безпечний доступ через Cloudflare Zero-Trust Tunnels (0 відкритих WAN-портів, SSH key-only) та робота Docker Compose сервісів (Home Assistant, Mosquitto MQTT, Zigbee2MQTT, Frigate NVR)."}
                    </li>
                  </ul>
                </div>

                <div className="border-l border-white/[0.16] print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-[13px] font-semibold text-[#f5f4f1] print:text-black">
                      {isCs
                        ? "Domácí síťová laboratoř — MikroTik VPN, OSPF & VLAN"
                        : "Домашня мережева лабораторія — MikroTik VPN, OSPF & VLAN"}
                    </h3>
                    <span className="text-[10.5px] font-mono text-[#9b968f] print:text-zinc-600 shrink-0">
                      Home Lab
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#9b968f] print:text-zinc-700 mb-1.5">
                    MikroTik RouterOS · WireGuard VPN · OSPF · VRF · 802.1Q VLAN · Wireshark
                  </p>
                  <ul className="text-[12px] text-[#f5f4f1]/75 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      {isCs
                        ? "Šifrovaný WireGuard Site-to-Site tunel mezi dvěma MikroTik routery, dynamické směrování OSPF a izolace tabulek pomocí VRF."
                        : "Шифрований WireGuard Site-to-Site тунель між двома MikroTik роутерами, динамічна маршрутизація OSPF та ізоляція таблиць VRF."}
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
          <div className="md:col-span-5 space-y-6">
            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-2.5">
                {isCs ? "Vzdělání" : "Освіта"}
              </h2>

              <div className="space-y-3">
                <div className="border border-white/[0.12] bg-white/[0.03] print:bg-transparent print:border-zinc-300 rounded-xl p-3.5">
                  <div className="flex items-center justify-between font-mono text-[10.5px] text-[#9b968f] print:text-zinc-700 mb-1">
                    <span>2026 — {isCs ? "Současnost" : "Тепер. час"}</span>
                    <span className="text-[#3fbf7f] print:text-zinc-700">1. ročník Bc.</span>
                  </div>
                  <h3 className="text-[13.5px] font-semibold text-[#f5f4f1] print:text-black">
                    VUT v Brně — FEKT
                  </h3>
                  <p className="text-[12px] text-[#f5f4f1]/75 print:text-zinc-700">
                    Telekomunikační a informační systémy
                  </p>
                </div>

                <div className="border border-white/[0.12] bg-white/[0.03] print:bg-transparent print:border-zinc-300 rounded-xl p-3.5">
                  <div className="flex items-center justify-between font-mono text-[10.5px] text-[#9b968f] print:text-zinc-700 mb-1">
                    <span>2022 — 2026</span>
                    <span className="text-[#9b968f] print:text-zinc-600">Maturita 2026</span>
                  </div>
                  <h3 className="text-[13.5px] font-semibold text-[#f5f4f1] print:text-black">
                    Střední škola Kyberna, Hradec Králové
                  </h3>
                  <p className="text-[11.5px] text-[#a39e96] print:text-zinc-600 mt-1 leading-relaxed">
                    {isCs
                      ? "IT maturita: Windows Server (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), VMware virtualizace, Cisco CCNA R&S, Linux & C# (.NET)."
                      : "IT матуріта: Windows Server (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), VMware віртуалізація, Cisco CCNA R&S, Linux & C# (.NET)."}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-2.5">
                Technický Stack
              </h2>

              <div className="space-y-3 text-[11px]">
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
                    <span className="font-mono text-[10.5px] text-[#9b968f] print:text-zinc-800 uppercase block mb-1.5">
                      {group.label}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-[5px] bg-white/[0.04] print:bg-zinc-100 border border-white/[0.12] print:border-zinc-300 text-[#f5f4f1]/85 print:text-zinc-800 text-[10.5px]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-2">
                {isCs ? "Certifikáty (6)" : "Сертифікати (6)"}
              </h2>
              <ul className="space-y-1 text-[12px] text-[#f5f4f1]/75 print:text-zinc-800">
                <li>• <strong className="text-[#f5f4f1] print:text-black">CCNA: Switching, Routing &amp; Wireless</strong> — Cisco</li>
                <li>• <strong className="text-[#f5f4f1] print:text-black">CCNA: Introduction to Networks</strong> — Cisco</li>
                <li>• <strong className="text-[#f5f4f1] print:text-black">Linux Essentials</strong> — Cisco Networking Academy</li>
                <li>• <strong className="text-[#f5f4f1] print:text-black">IT Essentials (HW &amp; OS)</strong> — Cisco</li>
                <li>• <strong className="text-[#f5f4f1] print:text-black">ECDL Certificate</strong> &amp; <strong className="text-[#f5f4f1] print:text-black">English B1 Certificate</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-2">
                {isCs ? "Jazyky" : "Мови"}
              </h2>
              <ul className="space-y-1.5 text-[12px] text-[#f5f4f1]/75 print:text-zinc-800">
                <li className="flex justify-between">
                  <span>{isCs ? "Čeština" : "Чеська"}</span>
                  <span className="font-mono text-[#3fbf7f] print:text-zinc-700 text-[11px]">
                    C1 (maturita, VUT Brno)
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>{isCs ? "Ukrajinština" : "Українська"}</span>
                  <span className="font-mono text-[#3fbf7f] print:text-zinc-700 text-[11px]">
                    {isCs ? "Rodilý mluvčí (C2)" : "Рідна (C2)"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>{isCs ? "Angličtina" : "Англійська"}</span>
                  <span className="font-mono text-[#3fbf7f] print:text-zinc-700 text-[11px]">
                    B1+ (Tech Docs / CLI)
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <footer className="mt-7 pt-4 border-t border-white/[0.1] print:border-zinc-300 text-center font-mono text-[11px] text-[#9b968f] print:text-zinc-500">
          Roman Roshkanyuk · +420 605 447 445 · romanroskanuk74@gmail.com · github.com/rizzer18 · Brno, ČR
        </footer>
      </main>
    </div>
  );
}
