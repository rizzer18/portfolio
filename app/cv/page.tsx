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
  Download,
  Shield,
  Server,
  Wifi,
  Home,
  Code,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Layers,
} from "lucide-react";

export default function CVPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white print:bg-white print:text-black py-8 sm:py-12 px-4 sm:px-6">
      
      {/* Top Floating Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all text-xs sm:text-sm font-medium"
        >
          <ArrowLeft size={16} />
          <span>Zpět na portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm shadow-gold-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Printer size={16} />
            <span>Tisk / Uložit jako PDF</span>
          </button>
        </div>
      </div>

      {/* Main CV Document Container (A4 Printable Layout) */}
      <main className="max-w-4xl mx-auto bg-[#111115] print:bg-white border border-zinc-800/90 print:border-none rounded-3xl print:rounded-none p-6 sm:p-10 shadow-2xl print:shadow-none print:p-0">
        
        {/* HEADER */}
        <header className="border-b border-zinc-800/80 print:border-zinc-300 pb-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400/40 print:border-zinc-400 shrink-0 bg-zinc-900">
                <Image
                  src="/images/roman.png"
                  alt="Roman Roshkanyuk"
                  fill
                  sizes="112px"
                  className="object-cover"
                  priority
                />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight mb-1">
                  Roman Roshkanyuk
                </h1>
                <p className="text-amber-400 print:text-zinc-800 font-semibold text-sm sm:text-base mb-2">
                  Všestranný IT Specialista & Full-Stack Vývojář
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 print:border-zinc-400 print:text-zinc-700 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 print:bg-zinc-700"></span>
                  <span>Student 1. ročníku VUT FEKT Brno</span>
                </div>
              </div>
            </div>

            {/* Contact Pills */}
            <div className="flex flex-col gap-2 text-xs text-zinc-300 print:text-zinc-700 w-full sm:w-auto">
              <a
                href="tel:+420605447445"
                className="flex items-center gap-2 hover:text-amber-400 print:hover:text-black transition-colors"
              >
                <Phone size={14} className="text-amber-400 print:text-zinc-800 shrink-0" />
                <span className="font-semibold">+420 605 447 445</span>
              </a>
              <a
                href="mailto:romanroskanuk74@gmail.com"
                className="flex items-center gap-2 hover:text-amber-400 print:hover:text-black transition-colors"
              >
                <Mail size={14} className="text-amber-400 print:text-zinc-800 shrink-0" />
                <span>romanroskanuk74@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-zinc-400 print:text-zinc-600">
                <MapPin size={14} className="text-amber-400 print:text-zinc-800 shrink-0" />
                <span>Brno / Hradec Králové, ČR</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 print:text-zinc-600">
                <Globe size={14} className="text-amber-400 print:text-zinc-800 shrink-0" />
                <span>https://bowlingovyclubsv.cz/ (a další klientské weby)</span>
              </div>
            </div>

          </div>
        </header>

        {/* 2-COLUMN BODY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT / MAIN COLUMN (7 cols) */}
          <div className="md:col-span-7 space-y-7">
            
            {/* Profil / Shrnutí */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-3 flex items-center gap-2">
                <Briefcase size={14} />
                <span>Profil &amp; Cíl</span>
              </h2>
              <p className="text-xs sm:text-[13px] text-zinc-300 print:text-zinc-800 leading-relaxed">
                Všestranný IT specialista se silným základem v síťové architektuře, správě serverů a moderním webovém vývoji. Absolvent IT střední školy Kyberna (maturita 2026) a student 1. ročníku na VUT Brno (obor Telekomunikační a informační systémy). Propojuji teoretické znalosti (Cisco CCNA) s reálnou praxí: vývoj klientských webových platforem na Next.js v produkci, správa šifrovaných MikroTik VPN s duálními VLAN a návrh cenově úsporné, 100% lokální automatizace chytré domácnosti.
              </p>
            </section>

            {/* Praxe & Produkční Projekty */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-4 flex items-center gap-2">
                <Code size={14} />
                <span>Produkční Projekty &amp; Zkušenosti</span>
              </h2>

              <div className="space-y-4">
                
                {/* Projekt 1: Weby */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5 py-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white print:text-black">
                      Full-Stack Webový Vývojář (Klientské projekty)
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600">2023 — Současnost</span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1.5">
                    Produkční weby pro klienty v ČR a zahraničí (Next.js, React, Node.js, TypeScript)
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside">
                    <li><strong className="text-white print:text-black">bowlingovyclubsv.cz:</strong> Komplexní rezervační a prezentační systém zábavního centra v Týništi n. O.</li>
                    <li><strong className="text-white print:text-black">nikita-box.cz:</strong> Web sportovního klubu v HK s rozvrhem tréninků a CZ/UA lokalizací.</li>
                    <li><strong className="text-white print:text-black">luxury-cleaning-solutions.ca:</strong> Web úklidové firmy v Edmontonu (Kanada) s okamžitou online cenovou kalkulačkou.</li>
                    <li><strong className="text-white print:text-black">honzapokusil.cz:</strong> Portál současného tanečního divadla s repertoárem a workshopy.</li>
                  </ul>
                </div>

                {/* Projekt 2: Linux & Home Lab */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5 py-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white print:text-black">
                      Správce Domácí Laboratoře &amp; Linux Serveru
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600">2023 — Současnost</span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1.5">
                    Self-hosted Linux, Docker kontejnerizace, Frigate AI, Cloudflare Zero-Trust
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside">
                    <li>Konfigurace a 24/7 správa vlastního Linux serveru (Debian / Ubuntu).</li>
                    <li>Bezpečné vystavení služeb do internetu přes <strong className="text-white print:text-black">Cloudflare Tunnels</strong> bez nutnosti otevírat porty v routeru.</li>
                    <li>Implementace <strong className="text-white print:text-black">Frigate NVR</strong> kamerového dohledu s lokální detekcí objektů pomocí umělé inteligence.</li>
                  </ul>
                </div>

                {/* Projekt 3: MikroTik & Sítě */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5 py-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white print:text-black">
                      Síťový Inženýr — MikroTik Site-to-Site VPN
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600">2023 — 2026</span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1.5">
                    Propojení dvou MikroTik routerů, VLAN segmentace (CZ / UA)
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside">
                    <li>Vytvoření šifrovaného site-to-site VPN tunelu mezi dvěma geografickými lokacemi.</li>
                    <li>Rozdělení klientského routeru do dvou izolovaných virtuálních sítí (<strong className="text-white print:text-black">CZ VLAN a UA VLAN</strong>) pro optimalizaci provozu a bezpečnost.</li>
                  </ul>
                </div>

                {/* Projekt 4: Smart Home */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5 py-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white print:text-black">
                      Architekt Úsporné Chytré Domácnosti (IoT)
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600">2024 — Současnost</span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1.5">
                    Home Assistant, Zigbee2MQTT, 100% lokální řízení bez poplatků
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside">
                    <li>Návrh rozsáhlé sítě senzorů a akčních členů na protokolu Zigbee 3.0.</li>
                    <li>Úplná eliminace cloudových měsíčních předplatných, zajištění spolehlivého chodu i při výpadku internetu.</li>
                  </ul>
                </div>

              </div>
            </section>

          </div>

          {/* RIGHT COLUMN (5 cols) */}
          <div className="md:col-span-5 space-y-7">
            
            {/* Vzdělání */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-3 flex items-center gap-2">
                <GraduationCap size={14} />
                <span>Vzdělání</span>
              </h2>

              <div className="space-y-3.5">
                <div className="bg-zinc-900/60 print:bg-transparent border border-zinc-800 print:border-zinc-300 rounded-xl p-3">
                  <div className="flex items-center justify-between text-[10px] text-amber-400 print:text-zinc-700 font-bold mb-0.5">
                    <span>2026 — Současnost</span>
                    <span className="text-emerald-400 print:text-zinc-700">1. ročník</span>
                  </div>
                  <h3 className="text-xs font-bold text-white print:text-black">
                    VUT v Brně — FEKT
                  </h3>
                  <p className="text-[11px] text-zinc-300 print:text-zinc-700">
                    Telekomunikační a informační systémy
                  </p>
                  <p className="text-[10px] text-zinc-500 print:text-zinc-600 mt-1">
                    Vysokoškolské studium zaměřené na telekomunikace, přenos dat a sítě.
                  </p>
                </div>

                <div className="bg-zinc-900/60 print:bg-transparent border border-zinc-800 print:border-zinc-300 rounded-xl p-3">
                  <div className="flex items-center justify-between text-[10px] text-amber-400 print:text-zinc-700 font-bold mb-0.5">
                    <span>2022 — 2026</span>
                    <span className="text-zinc-400 print:text-zinc-600">Maturita 2026</span>
                  </div>
                  <h3 className="text-xs font-bold text-white print:text-black">
                    Střední škola Kyberna
                  </h3>
                  <p className="text-[11px] text-zinc-300 print:text-zinc-700">
                    Hradec Králové, Česká republika
                  </p>
                  <p className="text-[10px] text-zinc-500 print:text-zinc-600 mt-1">
                    IT střední škola zakončená maturitní zkouškou v roce 2026. Specializace na správu Windows Server (Active Directory, GPO, IIS, DNS, DHCP, VPN, NAT), VMware virtualizaci a sítě Cisco CCNA.
                  </p>
                </div>
              </div>
            </section>

            {/* Certifikace */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-3 flex items-center gap-2">
                <Shield size={14} />
                <span>Ověřené Certifikáty</span>
              </h2>

              <ul className="space-y-1.5 text-[11px] text-zinc-300 print:text-zinc-800">
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 print:text-zinc-700 font-bold">•</span>
                  <div>
                    <strong className="text-white print:text-black">CCNA: Introduction to Networks</strong>
                    <span className="block text-[10px] text-zinc-500">Cisco Networking Academy (2023)</span>
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 print:text-zinc-700 font-bold">•</span>
                  <div>
                    <strong className="text-white print:text-black">CCNA: Switching, Routing &amp; Wireless</strong>
                    <span className="block text-[10px] text-zinc-500">Cisco Networking Academy (2023)</span>
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 print:text-zinc-700 font-bold">•</span>
                  <div>
                    <strong className="text-white print:text-black">Linux Essentials</strong>
                    <span className="block text-[10px] text-zinc-500">Cisco Networking Academy (2023)</span>
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 print:text-zinc-700 font-bold">•</span>
                  <div>
                    <strong className="text-white print:text-black">IT Essentials (Hardware &amp; OS)</strong>
                    <span className="block text-[10px] text-zinc-500">Cisco Networking Academy (2022)</span>
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 print:text-zinc-700 font-bold">•</span>
                  <div>
                    <strong className="text-white print:text-black">ECDL Certificate</strong>
                    <span className="block text-[10px] text-zinc-500">European Computer Driving Licence (2022)</span>
                  </div>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400 print:text-zinc-700 font-bold">•</span>
                  <div>
                    <strong className="text-white print:text-black">English Language Certificate</strong>
                    <span className="block text-[10px] text-zinc-500">Úroveň B1 (Intermediate)</span>
                  </div>
                </li>
              </ul>
            </section>

            {/* Dovednosti / Tech Stack */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-3 flex items-center gap-2">
                <Layers size={14} />
                <span>Technický Stack</span>
              </h2>

              <div className="space-y-2.5 text-[11px]">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 print:text-zinc-800 uppercase block mb-1">
                    Sítě &amp; Bezpečnost
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {["MikroTik RouterOS", "OSPF", "VRF", "Site-to-Site VPN", "VLAN", "NAT", "Cisco CCNA", "Cloudflare Tunnels", "DNS / DHCP", "Zero-Trust"].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-zinc-800/80 print:bg-zinc-100 text-zinc-300 print:text-zinc-800 text-[10px] border border-zinc-700/40 print:border-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-amber-400 print:text-zinc-800 uppercase block mb-1">
                    Systémy, Virtualizace &amp; Servery
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {["Windows Server", "Active Directory", "GPO", "IIS", "VMware Workstation", "Linux Server", "Docker", "Docker Compose", "Frigate NVR AI", "Bash", "SSH Hardening"].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-zinc-800/80 print:bg-zinc-100 text-zinc-300 print:text-zinc-800 text-[10px] border border-zinc-700/40 print:border-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-amber-400 print:text-zinc-800 uppercase block mb-1">
                    Webový Vývoj
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {["Next.js 15", "React 19", "TypeScript", "Node.js", "Tailwind CSS", "HTML5 / CSS3", "REST APIs"].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-zinc-800/80 print:bg-zinc-100 text-zinc-300 print:text-zinc-800 text-[10px] border border-zinc-700/40 print:border-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-amber-400 print:text-zinc-800 uppercase block mb-1">
                    Chytrá Domácnost &amp; IoT
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {["Home Assistant", "Zigbee2MQTT", "Zigbee 3.0", "MQTT Protocol", "Zero-Subscription IoT"].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-zinc-800/80 print:bg-zinc-100 text-zinc-300 print:text-zinc-800 text-[10px] border border-zinc-700/40 print:border-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-amber-400 print:text-zinc-800 uppercase block mb-1">
                    Design &amp; Nástroje
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {["Figma", "Git / GitHub", "VS Code", "Swagger", "WordPress"].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-zinc-800/80 print:bg-zinc-100 text-zinc-300 print:text-zinc-800 text-[10px] border border-zinc-700/40 print:border-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Jazyky */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-2.5 flex items-center gap-2">
                <Globe size={14} />
                <span>Jazyky</span>
              </h2>

              <ul className="space-y-1.5 text-xs text-zinc-300 print:text-zinc-800">
                <li className="flex items-center justify-between">
                  <span>Ukrajinština</span>
                  <span className="text-amber-400 print:text-zinc-600 font-semibold text-[11px]">Rodný jazyk</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Čeština</span>
                  <span className="text-amber-400 print:text-zinc-600 font-semibold text-[11px]">Plynule (studium VUT Brno)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Angličtina</span>
                  <span className="text-amber-400 print:text-zinc-600 font-semibold text-[11px]">B1 (Středně pokročilý)</span>
                </li>
              </ul>
            </section>

          </div>

        </div>

        {/* FOOTER NOTE */}
        <footer className="mt-8 pt-6 border-t border-zinc-800 print:border-zinc-300 text-center text-[10px] text-zinc-500 print:text-zinc-500">
          Roman Roshkanyuk · Všestranný IT Specialista · Tel: +420 605 447 445 · E-mail: romanroskanuk74@gmail.com · VUT Brno FEKT (2026)
        </footer>

      </main>

    </div>
  );
}
