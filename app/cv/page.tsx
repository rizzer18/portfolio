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
    <div className="min-h-screen bg-[#070709] text-[#ededf0] print:bg-white print:text-black py-6 sm:py-10 px-3 sm:px-6">
      {/* Top Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 pb-4 border-b border-[#191922] flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[#8e8e9a] hover:text-[#ededf0] transition-colors"
        >
          <ArrowLeft size={15} />
          <span>{isCs ? "Zpět na portfolio" : "Назад до портфоліо"}</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-0.5 rounded-full border border-[#22222d] bg-[#0c0c11] font-mono text-[11.5px]">
            <button
              type="button"
              onClick={() => setLang("cs")}
              className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                isCs ? "bg-[#1d1d28] text-[#ededf0] font-semibold" : "text-[#7c7c88] hover:text-[#ededf0]"
              }`}
            >
              CZ
            </button>
            <button
              type="button"
              onClick={() => setLang("uk")}
              className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                !isCs ? "bg-[#1d1d28] text-[#ededf0] font-semibold" : "text-[#7c7c88] hover:text-[#ededf0]"
              }`}
            >
              UA
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="h-9 px-3.5 sm:px-5 rounded-full bg-[#181822] hover:bg-[#222230] border border-[#2d2d3d] text-[#ededf0] font-medium text-[12.5px] sm:text-[13px] inline-flex items-center gap-1.5 sm:gap-2 transition-colors cursor-pointer"
          >
            <Printer size={14} />
            <span>{isCs ? "Tisk / PDF" : "Друк / PDF"}</span>
          </button>
        </div>
      </div>

      {/* Main CV Document Container (A4 Printable Layout) */}
      <main className="max-w-4xl mx-auto rounded-2xl print:rounded-none border border-[#1b1b24] print:border-none bg-[#0b0b0f] print:bg-white p-5 sm:p-9 print:p-0 shadow-2xl print:shadow-none">
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

              <div className="min-w-0">
                <h1 className="font-serif text-2xl sm:text-4xl text-[#f5f4f1] print:text-black tracking-[-0.02em] mb-1">
                  Roman Roshkanyuk
                </h1>
                <p className="text-[#f5f4f1]/85 print:text-zinc-800 font-medium text-xs sm:text-[13.5px] mb-2 leading-snug">
                  Junior DevOps, Infrastructure &amp; Software Engineer (Linux · Sítě · C# .NET · Next.js)
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl sm:rounded-full bg-[#3fbf7f]/12 border border-[#3fbf7f]/30 print:border-zinc-400 text-[11.5px] leading-snug text-[#3fbf7f] print:text-zinc-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fbf7f] print:bg-zinc-700 shrink-0" />
                  <span>
                    {isCs
                      ? "SŠ Kyberna · 2× Cisco CCNA · jsem k dispozici pro part-time i spolupráci"
                      : "SŠ Kyberna · 2× Cisco CCNA · відкритий до співпраці та part-time"}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-1.5 font-mono text-[11.5px] text-[#f5f4f1]/80 print:text-zinc-700 w-full sm:w-auto min-w-0">
              <a
                href="tel:+420605447445"
                className="flex items-center gap-2 hover:text-white print:hover:text-black transition-colors"
              >
                <Phone size={12} className="text-[#3fbf7f] print:text-zinc-800 shrink-0" />
                <span>+420 605 447 445</span>
              </a>
              <a
                href="mailto:romanroskanuk74@gmail.com"
                className="flex items-center gap-2 hover:text-white print:hover:text-black transition-colors break-all sm:break-normal"
              >
                <Mail size={12} className="text-[#3fbf7f] print:text-zinc-800 shrink-0" />
                <span>romanroskanuk74@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-[#9b968f] print:text-zinc-600">
                <MapPin size={12} className="text-[#3fbf7f] print:text-zinc-800 shrink-0" />
                <span>Hradec Králové, ČR</span>
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
                {isCs ? "O mně — Inženýrské shrnutí" : "Про мене — Інженерний профіль"}
              </h2>
              <p className="text-[12.5px] text-[#f5f4f1]/75 print:text-zinc-800 leading-relaxed text-left sm:text-justify">
                {isCs
                  ? "Zaměřuji se na správu Linuxu, počítačové sítě (vystudoval jsem SŠ Kyberna, mám 2× certifikaci Cisco CCNA, pracuji s MikroTikem i Windows Serverem AD DS & GPO) a vývoj v C# (.NET) a TypeScriptu (Next.js). Nejraději se učím na reálných věcech — postavil jsem a spravuji 4 komerční weby pro klienty v ČR a Kanadě, tři roky po sobě jsem pomáhal v IT Support týmu na konferenci ISSS (2024–2026) a doma provozuji vlastní 24/7 Home Lab (Linux server, Docker, vlastní GitHub Actions CI/CD, Cloudflare Zero-Trust a MikroTik VPN/OSPF/VLAN)."
                  : "Я займаюся адмініструванням Linux, комп'ютерними мережами (закінчив SŠ Kyberna, маю 2× сертифікати Cisco CCNA, працюю з MikroTik і Windows Server AD DS & GPO) та розробкою на C# (.NET) і TypeScript (Next.js). Найкраще вчуся на реальних задачах — я сам розробив і підтримую 4 комерційні сайти для клієнтів у Чехії та Канаді, три роки поспіль працював у команді IT Support на конференції ISSS (2024–2026), а вдома розгорнув власний 24/7 Home Lab (Linux-сервер, Docker, власний GitHub Actions CI/CD, Cloudflare Zero-Trust та MikroTik VPN/OSPF/VLAN)."}
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-3">
                {isCs ? "Moje praxe & Komerční projekty" : "Мій досвід & Комерційні проєкти"}
              </h2>

              <div className="space-y-4">
                <div className="border-l border-white/[0.28] print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-[13.5px] font-semibold text-[#f5f4f1] print:text-black">
                      {isCs
                        ? "Freelance Web Developer & vývoj v C# (.NET)"
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
                        {isCs
                          ? "Postavil jsem a spravuji 4 komerční weby:"
                          : "Спроєктував і запустив у продакшн 4 комерційні сайти:"}
                      </strong>{" "}
                      <code>bowlingovyclubsv.cz</code>,{" "}
                      <code>luxury-cleaning-solutions.ca</code> (Kanada),{" "}
                      <code>nikita-box.cz</code>, <code>honzapokusil.cz</code>.
                    </li>
                    <li>
                      <strong className="text-[#f5f4f1] print:text-black">C# (.NET):</strong>{" "}
                      {isCs
                        ? "Při vývoji si zakládám na čistém OOP & SOLID, Generics, LINQ, async/await a práci se System.Reflection; napsal jsem také vlastní HTTP 206 Range streaming API."
                        : "У розробці дотримуюся чистого ООП & SOLID, Generics, LINQ, async/await і System.Reflection, а також реалізував власне потокове API (HTTP 206 Range)."}
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
                      ? "Během studia na SŠ Kyberna mě vedení školy třikrát po sobě (2024, 2025 a 2026) vybralo do technického týmu konference ISSS. Přímo v přednáškových sálech jsem pod tlakem řešil L1/L2 síťové, AV a OS problémy tak, aby program běžel bez výpadků."
                      : "Під час навчання в SŠ Kyberna керівництво школи три роки поспіль (2024, 2025 та 2026) обирало мене до техкоманди конференції ISSS. Безпосередньо в залах я оперативно усував L1/L2 мережеві, AV та системні збої під час живих виступів."}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-3">
                {isCs ? "Můj domácí Home Lab" : "Мій домашній Home Lab"}
              </h2>

              <div className="space-y-4">
                <div className="border-l border-white/[0.16] print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-[13px] font-semibold text-[#f5f4f1] print:text-black">
                      {isCs
                        ? "Vlastní Linux Server, Docker CI/CD & Smart Home"
                        : "Власний Linux-сервер, Docker CI/CD & Smart Home"}
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
                        ? "Postavil jsem si domácí Linux server, kde mám automatický CI/CD deploy přes vlastní systemd GitHub Actions Runner a multi-stage Alpine Docker kontejnery běžící pod non-root uživatelem."
                        : "Зібрав і налаштував домашній Linux-сервер із автоматичним CI/CD деплоєм через власний systemd GitHub Actions Runner та multi-stage Alpine Docker контейнери (non-root)."}
                    </li>
                    <li>
                      {isCs
                        ? "Přístup zvenčí řeším přes Cloudflare Zero-Trust Tunnels (0 otevřených WAN portů, SSH pouze přes klíče) a v Docker Compose provozuji Home Assistant, Mosquitto MQTT, Zigbee2MQTT a Frigate NVR."
                        : "Зовнішній доступ захистив через Cloudflare Zero-Trust Tunnels (0 відкритих WAN-портів, SSH лише за ключами), а в Docker Compose підтримую Home Assistant, Mosquitto MQTT, Zigbee2MQTT і Frigate NVR."}
                    </li>
                  </ul>
                </div>

                <div className="border-l border-white/[0.16] print:border-zinc-400 pl-3.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-[13px] font-semibold text-[#f5f4f1] print:text-black">
                      {isCs
                        ? "Moje síťová laboratoř — MikroTik VPN, OSPF & VLAN"
                        : "Моя мережева лабораторія — MikroTik VPN, OSPF & VLAN"}
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
                        ? "Mezi dvěma MikroTik routery jsem nastavil šifrovaný WireGuard Site-to-Site tunel, dynamické směrování OSPF a izolaci routovacích tabulek přes VRF."
                        : "Між двома роутерами MikroTik підняв шифрований WireGuard Site-to-Site тунель, налаштував динамічну маршрутизацію OSPF та ізолював таблиці маршрутизації через VRF."}
                    </li>
                    <li>
                      {isCs
                        ? "Síť jsem rozdělil přes 802.1Q VLAN (samostatná CZ a UA VLAN s policy-based routingem), nakonfiguroval jsem Firewall/NAT/Mangle a provoz analyzuji ve Wiresharku."
                        : "Сегментував мережу через 802.1Q VLAN (окремі CZ та UA VLAN із policy-based routing), налаштував Firewall/NAT/Mangle та аналізую пакети у Wireshark."}
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
                {isCs ? "Moje vzdělání" : "Моя освіта"}
              </h2>

              <div className="space-y-3">
                <div className="border border-white/[0.12] bg-white/[0.03] print:bg-transparent print:border-zinc-300 rounded-xl p-3.5">
                  <div className="flex items-center justify-between font-mono text-[10.5px] text-[#9b968f] print:text-zinc-700 mb-1">
                    <span>2022 — 2026</span>
                    <span className="text-[#3fbf7f] print:text-zinc-600">Maturita 2026</span>
                  </div>
                  <h3 className="text-[13.5px] font-semibold text-[#f5f4f1] print:text-black">
                    Střední škola Kyberna, Hradec Králové
                  </h3>
                  <p className="text-[11.5px] text-[#a39e96] print:text-zinc-600 mt-1 leading-relaxed">
                    {isCs
                      ? "Prakticky jsem odmaturoval ze správy Windows Serveru (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), virtualizace ve VMware, sítí Cisco CCNA R&S, Linuxu a vývoje v C# (.NET)."
                      : "Склав практичну ІТ-матуріту з адміністрування Windows Server (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), віртуалізації у VMware, мереж Cisco CCNA R&S, Linux та C# (.NET)."}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl text-[#f5f4f1] print:text-black mb-2.5">
                {isCs ? "Můj technický stack" : "Мій технічний стек"}
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
                {isCs ? "Moje certifikáty (6)" : "Мої сертифікати (6)"}
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
                {isCs ? "Jazyky, kterými mluvím" : "Мови, якими володію"}
              </h2>
              <ul className="space-y-1.5 text-[12px] text-[#f5f4f1]/75 print:text-zinc-800">
                <li className="flex justify-between">
                  <span>{isCs ? "Čeština" : "Чеська"}</span>
                  <span className="font-mono text-[#3fbf7f] print:text-zinc-700 text-[11px]">
                    {isCs ? "C1 (odmaturoval jsem v ČR)" : "C1 (склав матуріту в ЧР)"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>{isCs ? "Ukrajinština" : "Українська"}</span>
                  <span className="font-mono text-[#3fbf7f] print:text-zinc-700 text-[11px]">
                    {isCs ? "Můj rodný jazyk (C2)" : "Моя рідна (C2)"}
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
          Roman Roshkanyuk · +420 605 447 445 · romanroskanuk74@gmail.com · github.com/rizzer18 · Hradec Králové, ČR
        </footer>
      </main>
    </div>
  );
}
