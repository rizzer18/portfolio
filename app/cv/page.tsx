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
                  ? "Prakticky zaměřený inženýr propojující správu Linux serverů, kontejnerizaci (Docker, GitHub Actions CI/CD), síťovou architekturu (2× Cisco CCNA, MikroTik OSPF/VRF/WireGuard/VLAN, Windows Server AD DS & GPO) a vývoj softwaru v C# (.NET — OOP, SOLID, LINQ, async/await, System.Reflection) a TypeScriptu (Next.js 15). Vlastnoručně provozuji 24/7 produkční Linux infrastrukturu za Cloudflare Zero-Trust tunely (0 otevřených WAN portů), dodal jsem 4+ komerční aplikace do ostrého provozu v ČR a Kanadě a každoročně zajišťuji L1/L2 IT Support na mezinárodní konferenci ISSS."
                  : "Практичний інженер, що поєднує адміністрування Linux-серверів, контейнеризацію (Docker, GitHub Actions CI/CD), мережеву архітектуру (2× Cisco CCNA, MikroTik OSPF/VRF/WireGuard/VLAN, Windows Server AD DS & GPO) та розробку ПЗ на C# (.NET — ООП, SOLID, LINQ, async/await, System.Reflection) і TypeScript (Next.js 15). Власноруч підтримую 24/7 Linux-інфраструктуру за Cloudflare Zero-Trust (0 відкритих WAN-портів), вивів у продакшн 4+ комерційні веб-системи в Чехії й Канаді та щороку забезпечую L1/L2 IT Support на міжнародній конференції ISSS."}
              </p>
            </section>

            {/* Production Experience & Architecture */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 print:text-zinc-800 mb-3.5 flex items-center gap-2">
                <Code size={14} />
                <span>
                  {isCs
                    ? "Produkční praxe & Technická realizace"
                    : "Продакшн-досвід & Технічна реалізація"}
                </span>
              </h2>

              <div className="space-y-4">
                {/* Role 1: DevOps & Linux */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-white print:text-black">
                      DevOps, Linux &amp; Zero-Trust Infrastructure Engineer
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600 shrink-0">
                      2023 — {isCs ? "Současnost" : "Тепер. час"}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1">
                    Debian/Ubuntu · Multi-stage Docker · GitHub Actions Runner · Cloudflare Zero-Trust
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      {isCs ? (
                        <>
                          Automatizoval jsem CI/CD pipeline přes vlastní{" "}
                          <strong className="text-white print:text-black">
                            systemd GitHub Actions Runner
                          </strong>{" "}
                          a multi-stage Alpine Docker obrazy běžící pod neprivilegovaným{" "}
                          <code className="text-[10px]">UID 1001</code>.
                        </>
                      ) : (
                        <>
                          Автоматизував CI/CD конвеєр через власний{" "}
                          <strong className="text-white print:text-black">
                            systemd GitHub Actions Runner
                          </strong>{" "}
                          та multi-stage Alpine Docker-образи під непривілейованим{" "}
                          <code className="text-[10px]">UID 1001</code>.
                        </>
                      )}
                    </li>
                    <li>
                      {isCs ? (
                        <>
                          Publikace interních HTTP/TCP služeb přes{" "}
                          <strong className="text-white print:text-black">
                            Cloudflare Zero-Trust Tunnels
                          </strong>{" "}
                          s TLS terminací a{" "}
                          <strong className="text-white print:text-black">
                            0 otevřenými příchozími WAN porty
                          </strong>
                          , SSH key-only hardening.
                        </>
                      ) : (
                        <>
                          Публікація внутрішніх сервісів через{" "}
                          <strong className="text-white print:text-black">
                            Cloudflare Zero-Trust Tunnels
                          </strong>{" "}
                          із TLS-термінацією та{" "}
                          <strong className="text-white print:text-black">
                            0 відкритих вхідних WAN-портів
                          </strong>
                          , SSH key-only hardening.
                        </>
                      )}
                    </li>
                    <li>
                      {isCs
                        ? "24/7 orchestrace Docker Compose stacků: Home Assistant, Mosquitto MQTT, Zigbee2MQTT a Frigate NVR (lokální AI detekce obrazu)."
                        : "24/7 оркестрація Docker Compose стеків: Home Assistant, Mosquitto MQTT, Zigbee2MQTT та Frigate NVR (локальна AI-детекція відео)."}
                    </li>
                  </ul>
                </div>

                {/* Role 2: Network Engineering */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-white print:text-black">
                      Network Engineer — MikroTik L2/L3 &amp; Enterprise Lab
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600 shrink-0">
                      2023 — {isCs ? "Současnost" : "Тепер. час"}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1">
                    MikroTik RouterOS · WireGuard VPN · OSPF · VRF · 802.1Q VLAN · Wireshark
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      {isCs
                        ? "Konfigurace šifrovaného WireGuard / Site-to-Site VPN tunelu mezi dvěma MikroTik routery, dynamické směrování OSPF a izolace směrovacích tabulek pomocí VRF."
                        : "Конфігурація шифрованого WireGuard / Site-to-Site VPN тунелю між двома MikroTik роутерами, динамічна маршрутизація OSPF та ізоляція таблиць через VRF."}
                    </li>
                    <li>
                      {isCs
                        ? "802.1Q VLAN segmentace (izolované CZ a UA VLAN s policy-based routingem), pravidla Firewall/NAT/Mangle a paketová diagnostika ve Wiresharku."
                        : "802.1Q VLAN сегментація (ізольовані CZ та UA VLAN із policy-based routing), правила Firewall/NAT/Mangle та аналіз трафіку у Wireshark."}
                    </li>
                  </ul>
                </div>

                {/* Role 3: ISSS Live IT Support */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-white print:text-black">
                      IT Support &amp; Network Operations — Konference ISSS
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600 shrink-0">
                      2024 — {isCs ? "Současnost" : "Тепер. час"}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1">
                    {isCs
                      ? "Mezinárodní konference ISSS Hradec Králové · Každoroční výběr SŠ Kyberna"
                      : "Міжнародна конференція ISSS Градець-Кралове · Щорічний відбір SŠ Kyberna"}
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      {isCs
                        ? "Opakovaně nominován vedením školy pro spolehlivost, klidnou komunikaci a schopnost okamžitě vyřešit L1/L2 síťové, AV a OS incidenty přímo v přednáškových sálech."
                        : "Неодноразово номінований керівництвом школи за надійність, чітку комунікацію та здатність миттєво усувати L1/L2 мережеві, AV та системні інциденти у залах конференції."}
                    </li>
                  </ul>
                </div>

                {/* Role 4: Software & Full-Stack */}
                <div className="border-l-2 border-amber-400 print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-[13px] font-bold text-white print:text-black">
                      C# (.NET) &amp; Full-Stack Web Developer (4+ komerční produkce)
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400 print:text-zinc-600 shrink-0">
                      2023 — {isCs ? "Současnost" : "Тепер. час"}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 print:text-zinc-700 font-medium mb-1">
                    C# (.NET, OOP/SOLID, Reflection) · Next.js 15 · TypeScript · Node.js
                  </p>
                  <ul className="text-[11px] text-zinc-300 print:text-zinc-700 space-y-1 list-disc list-inside leading-relaxed">
                    <li>
                      <strong className="text-white print:text-black">C# (.NET):</strong>{" "}
                      {isCs
                        ? "Pokročilé OOP & SOLID, Design Patterns, Generics, LINQ, async/await paralelismus a metaprogramování přes System.Reflection."
                        : "Поглиблене ООП & SOLID, Design Patterns, Generics, LINQ, async/await паралелізм і метапрограмування через System.Reflection."}
                    </li>
                    <li>
                      <strong className="text-white print:text-black">
                        {isCs ? "Komerční nasazení:" : "Комерційні релізи:"}
                      </strong>{" "}
                      <code>bowlingovyclubsv.cz</code>,{" "}
                      <code>luxury-cleaning-solutions.ca</code> (Kanada),{" "}
                      <code>nikita-box.cz</code>, <code>honzapokusil.cz</code> + vlastní
                      streamovací File Server (HTTP 206 Range).
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
