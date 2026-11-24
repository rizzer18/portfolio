"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "cs" | "uk";

export const translations = {
  cs: {
    // ── HEADER ──────────────────────────────────────────────────────────────
    nav: [
      { name: "Domů", href: "#hero", id: "hero" },
      { name: "O mně", href: "#about", id: "about" },
      { name: "Architektura & Stack", href: "#services", id: "services" },
      { name: "Produkce", href: "#projects", id: "projects" },
      { name: "Certifikáty & Praxe", href: "#skills-section", id: "skills-section" },
      { name: "Kontakt", href: "#contact", id: "contact" },
    ],
    headerCv: "CV",
    headerCta: "Kontaktujte mě",

    // ── HERO / OVERVIEW ─────────────────────────────────────────────────────
    heroStatus: "DevOps · Linux · Sítě (CCNA / MikroTik) · C# (.NET) · Next.js",
    heroGreeting: "Ahoj, jsem",
    heroSubtitle: "Junior DevOps, Infrastructure & Software Engineer",
    heroSubtitleDesc: "End-to-end přesah od L2/L3 sítí a Linuxu přes CI/CD až po C# a TypeScript",
    heroDesc: [
      "Student 1. ročníku VUT FEKT Brno a absolvent IT školy Kyberna (2026) s reálnou produkční praxí. Vlastnoručně provozuji ",
      "24/7 Linux servery, multi-stage Docker kontejnery a vlastní GitHub Actions CI/CD",
      " za Cloudflare Zero-Trust tunely (0 otevřených WAN portů), stavím ",
      "MikroTik sítě s WireGuard VPN, OSPF, VRF a 802.1Q VLAN segmentací",
      " a píšu čistý kód v ",
      "C# (.NET, OOP, SOLID, LINQ, System.Reflection) i TypeScriptu (Next.js)",
      ".",
    ],
    heroCvBtn: "Technické CV (PDF)",
    heroCompBtn: "Architektura & Stack",
    heroPills: [
      { label: "🐳 Docker & GitHub Actions CI/CD", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "🐧 Linux (systemd, SSH, Zero-Trust)", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
      { label: "🌐 MikroTik (OSPF, VRF, WireGuard, VLAN)", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "⚡ C# (.NET, SOLID, Async, Reflection)", color: "border-violet-500/30 bg-violet-500/10 text-violet-300" },
      { label: "🎧 Live Ops & L2 Support (ISSS)", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
      { label: "💻 Next.js 15 & Streaming API", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
    ],
    heroInfraTitle: "Produkční telemetrie (Self-Hosted)",
    heroInfraStatus: "24/7 Online",
    heroInfraRows: [
      { label: "🐧 Linux + Docker", value: "CI/CD Runner · Non-root" },
      { label: "🌐 MikroTik L3", value: "WireGuard · OSPF · CZ/UA VLAN" },
      { label: "🛡️ Edge Security", value: "Cloudflare Zero-Trust (0 portů)" },
      { label: "🚀 Komerční weby", value: "4× produkce (200 OK)" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
    aboutTag: "Inženýrský profil",
    aboutTitle: "DevOps, Systémy",
    aboutTitleAccent: "& Software Engineering",
    aboutPhotoName: "Roman Roshkanyuk",
    aboutPhotoBadge: "VUT FEKT · 1. ročník",
    aboutBio1: [
      "Jsem ",
      "Roman Roshkanyuk",
      " — inženýr zaměřený na DevOps, síťovou infrastrukturu a vývoj softwaru (",
      "VUT Brno FEKT — Telekomunikační a informační systémy",
      ", absolvent SŠ Kyberna 2026). Nehledám jen teoretické úlohy — rozumím celému stacku od paketů ve Wiresharku a routovacích tabulek, přes jádro Linuxu, systemd a kontejnerizaci, až po paměťový model a reflexi v .NET.",
    ],
    aboutBio2: [
      "V praxi spojuji ",
      "automatizovaný CI/CD deployment (GitHub Actions self-hosted runner + multi-stage Alpine Docker)",
      ", síťovou bezpečnost (",
      "MikroTik OSPF/VRF/VLAN, Windows Server AD DS & GPO, Cloudflare Zero-Trust",
      "), vývoj v ",
      "C# (.NET, OOP, návrhové vzory, LINQ, async/await, System.Reflection) a TypeScriptu",
      " a schopnost řešit kritické incidenty pod tlakem — každoročně potvrzenou v týmu ",
      "IT Support na mezinárodní konferenci ISSS",
      ".",
    ],
    aboutStats: [
      { number: "4+", label: "Komerční nasazení v produkci" },
      { number: "6×", label: "Cisco CCNA, Linux & IT certifikáty" },
      { number: "24/7", label: "Vlastní Linux, Docker & CI/CD" },
    ],
    aboutDomains: [
      { label: "DevOps & CI/CD", desc: "Linux · Docker Compose · GitHub Actions · Zero-Trust", tag: "Infra as Code" },
      { label: "L2/L3 Sítě & Security", desc: "MikroTik · OSPF · VRF · WireGuard · 802.1Q VLAN", tag: "2× Cisco CCNA" },
      { label: "C# (.NET) & Full-Stack", desc: "OOP/SOLID · LINQ · Reflection · Next.js 15 · REST", tag: ".NET & TS" },
      { label: "SysAdmin & Live Ops", desc: "AD DS & GPO · VMware · ISSS SLA Support · MQTT/HA", tag: "ISSS 2024+" },
    ],
    aboutCta: "Kontaktujte mě",

    // ── PROJECTS ────────────────────────────────────────────────────────────
    projectsTag: "Ověřeno v reálném provozu",
    projectsTitle1: "Produkční",
    projectsTitle2: "projekty & infra",
    projectsDesc: "Žádné školní makety — reálně běžící komerční aplikace pro klienty v ČR a Kanadě + vlastní 24/7 serverový klastr.",
    filterAll: "Vše",
    filterWeb: "Komerční weby (4)",
    filterInfra: "Infrastruktura (1)",
    projectLiveBtn: "Otevřít produkci",
    projectViewBtn: "Detail architektury",
    projectLiveStatus: "200 OK · Prod",
    projectSelfHosted: "24/7 Self-Hosted",
    liveProduction: "Production",
    projectsBanner: "Všechny komerční projekty běží v ostrém provozu s reálnými zákazníky, SSL, SEO strukturovanými daty a monitoringem.",
    projectsBannerCta: "Chcete probrat architekturu? Napište mi",
    projects: [
      {
        title: "Home Lab, CI/CD & Zero-Trust Infra",
        category: "Linux · Docker · MikroTik VPN · GitHub Actions",
        description: "Produkční domácí Linux server (24/7): multi-stage Docker kontejnery (non-root), automatický CI/CD deploy přes systemd GitHub Runner, Cloudflare Zero-Trust tunely (0 otevřených portů), Frigate AI NVR, Home Assistant + Zigbee2MQTT a MikroTik WireGuard site-to-site VPN s CZ/UA VLAN izolací.",
      },
      {
        title: "Bowlingový Club SV",
        category: "Komerční web & Rezervační tok",
        description: "Produkční full-stack web pro zábavní centrum v Týništi nad Orlicí. SSR/SSG optimalizace v Next.js, interaktivní rezervace drah, dynamická cenotvorba, strukturovaná SEO metadata (Schema.org) a vysoké skóre Core Web Vitals.",
      },
      {
        title: "Luxury Cleaning Solutions",
        category: "B2B/B2C Platforma · Alberta, Kanada",
        description: "Komerční platforma pro kanadskou firmu v Edmontonu. Obsahuje klientskou kalkulačku okamžitého výpočtu ceny v reálném čase, napojení na Google Reviews, lead-capture pipeline a plnou optimalizaci rychlosti načítání.",
      },
      {
        title: "Boxing Club Nikita",
        category: "Vícejazyčná platforma (CZ / UA)",
        description: "Produkční web sportovního klubu v Hradci Králové. Kompletní i18n lokalizace (čeština/ukrajinština), správa rozvrhů tréninků, ceníků a médií, responzivní dark-UI s okamžitou odezvou na mobilních zařízeních.",
      },
      {
        title: "Taneční divadlo Honzy Pokusila",
        category: "Kulturní portál & Správa repertoáru",
        description: "Oficiální produkční prezentace současného tanečního divadla TDHP. Modulární architektura komponent pro repertoár, harmonogramy workshopů a taneční výuky s optimalizací obrazových dat.",
      },
    ],

    // ── TABS / QUALIFICATIONS ───────────────────────────────────────────────
    tabsTag: "Technická verifikace",
    tabsTitleParts: ["dovednosti", "certifikáty", "praxe"],
    tabsTitlePrefix: "Ověřené",
    tabsTitleConjunction: "a",
    tabLabels: ["Stack", "Certifikáty & VUT", "Praxe"],
    userBadgeName: "Roman Roshkanyuk",
    userBadgeRole: "DevOps & Software Engineer",

    skillsTitle: "Technický arzenál",
    skillsDesc: "Konkrétní protokoly, nástroje a technologie ověřené v produkci a laboratorních scénářích.",
    skillCats: [
      {
        title: "C# (.NET) & Backend Engineering",
        items: ["C#", ".NET Core", "OOP & SOLID", "System.Reflection", "Generics & LINQ", "Design Patterns", "Async / Await", "REST API & HTTP Range Streaming"],
      },
      {
        title: "DevOps, Linux & Kontejnery",
        items: ["Linux (Debian/Ubuntu)", "Docker (Multi-stage)", "Docker Compose", "GitHub Actions (Self-Hosted Runner)", "systemd & Journald", "Bash", "SSH Hardening", "Cloudflare Zero-Trust"],
      },
      {
        title: "Sítě & Bezpečnost (Cisco CCNA / MikroTik)",
        items: ["MikroTik RouterOS", "OSPF", "VRF", "WireGuard / IPsec VPN", "802.1Q VLAN (CZ/UA)", "NAT / Firewall / Mangle", "DNS / DHCP", "Wireshark & tcpdump"],
      },
      {
        title: "Enterprise IT & Virtualizace",
        items: ["Windows Server", "Active Directory (AD DS)", "GPO", "IIS", "VMware Workstation", "MQTT / Zigbee2MQTT", "Home Assistant", "Frigate NVR", "L1/L2 Troubleshooting"],
      },
      {
        title: "Moderní Web & Tooling",
        items: ["TypeScript", "Next.js 15 (App Router)", "React 19", "Node.js", "Tailwind CSS", "Git / GitHub", "Swagger / OpenAPI", "Figma"],
      },
    ],
    skillLangsTitle: "Jazyková vybavenost",
    skillLangs: [
      { lang: "Čeština", level: "C1 (maturitní zkouška, studium na VUT)" },
      { lang: "Ukrajinština", level: "Rodilý mluvčí (C2)" },
      { lang: "Angličtina", level: "B1+ (technická dokumentace, RFC, CLI)" },
    ],
    skillDesignItems: ["Čistá architektura", "Dokumentace", "Týmová komunikace"],

    eduTitle: "Vzdělání & 6 ověřených certifikátů",
    eduDesc: "Vysokoškolské technické studium a certifikace Cisco Networking Academy.",
    schools: [
      {
        period: "2026 — Současnost",
        badge: "1. ročník Bc.",
        name: "VUT v Brně — FEKT",
        desc: "Telekomunikační a informační systémy",
        sub: "Síťové architektury, přenosové systémy, nízkoúrovňové programování a informační bezpečnost.",
        active: true,
      },
      {
        period: "2022 — 2026",
        badge: "Maturita 2026",
        name: "Střední škola Kyberna, Hradec Králové",
        desc: "Informační technologie — Síťová & systémová specializace",
        sub: "Praktická maturita: Windows Server (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), VMware, Cisco CCNA R&S, Linux a vývoj v C# (.NET).",
        active: false,
      },
    ],
    certsTitle: "Oficiální certifikáty",
    certView: "Náhled",
    certDownload: "PDF",

    expTitle: "Reálná praxe & Provozní zodpovědnost",
    expDesc: "Kombinace produkčního DevOps provozu, živého IT Supportu pod SLA a komerčního vývoje.",
    expCards: [
      {
        tag: "Live Event Ops · 2024—současnost (každoročně)",
        title: "IT Support & Network Ops — Konference ISSS",
        desc: "Každoročně nominován vedením SŠ Kyberna do technického týmu mezinárodní konference ISSS (Hradec Králové). Okamžitá diagnostika L1/L2 síťových, AV a klientských incidentů v živém sálovém provozu pod vysokým časovým tlakem.",
      },
      {
        tag: "DevOps & SysAdmin · 2023—současnost",
        title: "Linux, Docker CI/CD & MikroTik Engineer",
        desc: "Návrh a 24/7 správa vlastního Linux serveru: multi-stage Docker stacky, vlastní systemd GitHub Actions runner, Cloudflare Zero-Trust bez otevřených portů a MikroTik site-to-site VPN s OSPF/VRF a izolovanými CZ/UA VLANy.",
      },
      {
        tag: "Software & Web Engineer · 2023—současnost",
        title: "Full-Stack vývojář — 4+ komerční nasazení",
        desc: "End-to-end dodávka produkčních aplikací (sběr požadavků, architektura v Next.js/TypeScript/Node.js, streaming API, deployment do Dockeru, DNS/SSL v Cloudflare) pro platící klienty v ČR a Kanadě + backend v C# (.NET).",
      },
    ],
    expEmail: "romanroskanuk74@gmail.com",
    expPhone: "+420 605 447 445",

    // ── SERVICES / ARCHITECTURE ─────────────────────────────────────────────
    servicesTag: "Technický přesah",
    servicesTitle: ["Architektura, ", "kterou stavím & spravuji"],
    servicesDesc: "Propojuji síťovou vrstvu, Linux/Docker infrastrukturu a aplikační kód v C# / TypeScriptu do spolehlivých celků.",
    services: [
      {
        num: "01",
        title: "Síťová architektura & Bezpečnost",
        subtitle: "MikroTik RouterOS · Cisco CCNA · OSPF · VRF · WireGuard",
        description: "Návrh směrovaných a segmentovaných sítí: dynamické směrování OSPF, izolace tabulek přes VRF, šifrované WireGuard site-to-site tunely, 802.1Q VLAN (CZ/UA policy routing), firewall/mangle a analýza paketů ve Wiresharku.",
        highlights: ["OSPF & VRF", "WireGuard VPN", "802.1Q VLAN", "2× Cisco CCNA", "Wireshark"],
      },
      {
        num: "02",
        title: "DevOps, Linux & CI/CD Automatizace",
        subtitle: "Debian/Ubuntu · Docker · GitHub Actions · Zero-Trust",
        description: "24/7 správa Linux serverů, hardening SSH a systemd služeb, multi-stage Alpine Docker obrazy pod non-root uživatelem, automatický CI/CD deploy přes vlastní GitHub Runner a publikace přes Cloudflare Zero-Trust bez otevřených portů.",
        highlights: ["Docker Compose", "GitHub Actions CI/CD", "Cloudflare Tunnels", "Linux & systemd", "Non-root Security"],
      },
      {
        num: "03",
        title: "C# (.NET) & Full-Stack Vývoj",
        subtitle: "C# OOP/Reflection · TypeScript · Next.js 15 · Node.js",
        description: "Důraz na čistou architekturu v C# (.NET — SOLID, Generics, LINQ, async/await, System.Reflection) a produkční webové systémy v Next.js 15 / TypeScript včetně streamování velkých souborů (HTTP 206 Range) a REST API.",
        highlights: ["C# & .NET", "System.Reflection", "Next.js 15", "TypeScript", "HTTP 206 Streaming"],
      },
      {
        num: "04",
        title: "Enterprise IT, AD DS & Live Support",
        subtitle: "Windows Server · AD/GPO · VMware · ISSS Support · IoT",
        description: "Správa Windows Serveru (Active Directory, GPO, DNS/DHCP, IIS), virtualizace ve VMware, 24/7 dohled nad lokálním MQTT/Zigbee/Frigate NVR ekosystémem a bleskový L1/L2 troubleshooting ověřený na konferenci ISSS.",
        highlights: ["Active Directory & GPO", "VMware", "ISSS IT Support", "MQTT & Frigate AI", "SLA Troubleshooting"],
      },
    ],

    // ── TECHSTACK ───────────────────────────────────────────────────────────
    techLabel: "Produkční stack & inženýrské nástroje",

    // ── CONTACT ─────────────────────────────────────────────────────────────
    contactTag: "Přímé spojení",
    contactTitle: ["Pojďme probrat ", "spolupráci", " nebo technickou roli"],
    contactSubtitle: "Rád se potkám u technického pohovoru, ukážu živou infrastrukturu i kód svých projektů. Reaguji obratem.",
    emailLabel: "E-mail",
    phoneLabel: "Telefon (ČR)",
    formSubject: "Předmět (např. Pozice Junior DevOps / C# / SysAdmin / Projekt)",
    formName: "Vaše jméno / Společnost",
    formPhone: "Telefon (volitelné)",
    formEmail: "Váš e-mail",
    formMessage: "Napište mi detaily pozice, týmu nebo projektu...",
    formSend: "Odeslat zprávu",
    formSending: "Odesílám...",
    formSuccess: "Děkuji! Zpráva dorazila — ozvu se vám co nejdříve.",

    // ── FOOTER ──────────────────────────────────────────────────────────────
    footerMade: "Postaveno na",
    footerBy: "—",
    footerDesc: "DevOps · Linux · Docker · MikroTik · C# (.NET) · VUT FEKT Brno",
    footerNav: [
      { name: "Domů", href: "#hero" },
      { name: "O mně", href: "#about" },
      { name: "Kompetence", href: "#services" },
      { name: "Portfolio", href: "#projects" },
      { name: "Certifikáty", href: "#skills-section" },
      { name: "CV", href: "/cv" },
      { name: "Kontakt", href: "#contact" },
    ],
    backToTop: "Zpět nahoru",
  },

  uk: {
    // ── HEADER ──────────────────────────────────────────────────────────────
    nav: [
      { name: "Головна", href: "#hero", id: "hero" },
      { name: "Про мене", href: "#about", id: "about" },
      { name: "Архітектура & Стек", href: "#services", id: "services" },
      { name: "Продакшн", href: "#projects", id: "projects" },
      { name: "Сертифікати & Досвід", href: "#skills-section", id: "skills-section" },
      { name: "Контакт", href: "#contact", id: "contact" },
    ],
    headerCv: "CV",
    headerCta: "Зв'язатися",

    // ── HERO / OVERVIEW ─────────────────────────────────────────────────────
    heroStatus: "DevOps · Linux · Мережі (CCNA / MikroTik) · C# (.NET) · Next.js",
    heroGreeting: "Привіт, я",
    heroSubtitle: "Junior DevOps, Infrastructure & Software Engineer",
    heroSubtitleDesc: "End-to-end інженерія: від L2/L3 мереж і Linux через CI/CD до C# та TypeScript",
    heroDesc: [
      "Студент 1-го курсу VUT FEKT Brno та випускник IT-школи Kyberna (2026) з реальним продакшн-досвідом. Власноруч адмініструю ",
      "24/7 Linux-сервери, multi-stage Docker контейнери та власний GitHub Actions CI/CD",
      " за тунелями Cloudflare Zero-Trust (0 відкритих WAN-портів), будую ",
      "MikroTik мережі з WireGuard VPN, OSPF, VRF та 802.1Q VLAN",
      " і пишу чистий код на ",
      "C# (.NET, SOLID, LINQ, System.Reflection) та TypeScript (Next.js)",
      ".",
    ],
    heroCvBtn: "Технічне CV (PDF)",
    heroCompBtn: "Архітектура & Стек",
    heroPills: [
      { label: "🐳 Docker & GitHub Actions CI/CD", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "🐧 Linux (systemd, SSH, Zero-Trust)", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
      { label: "🌐 MikroTik (OSPF, VRF, WireGuard, VLAN)", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "⚡ C# (.NET, SOLID, Async, Reflection)", color: "border-violet-500/30 bg-violet-500/10 text-violet-300" },
      { label: "🎧 Live Ops & L2 Support (ISSS)", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
      { label: "💻 Next.js 15 & Streaming API", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
    ],
    heroInfraTitle: "Продакшн телеметрія (Self-Hosted)",
    heroInfraStatus: "24/7 Online",
    heroInfraRows: [
      { label: "🐧 Linux + Docker", value: "CI/CD Runner · Non-root" },
      { label: "🌐 MikroTik L3", value: "WireGuard · OSPF · CZ/UA VLAN" },
      { label: "🛡️ Edge Security", value: "Cloudflare Zero-Trust (0 портів)" },
      { label: "🚀 Комерційні сайти", value: "4× продакшн (200 OK)" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
    aboutTag: "Інженерний профіль",
    aboutTitle: "DevOps, Системи",
    aboutTitleAccent: "& Software Engineering",
    aboutPhotoName: "Roman Roshkanyuk",
    aboutPhotoBadge: "VUT FEKT · 1-й курс",
    aboutBio1: [
      "Я ",
      "Roman Roshkanyuk",
      " — інженер на стику DevOps, мережевої інфраструктури та розробки ПЗ (",
      "VUT Brno FEKT — Телекомунікаційні та інформаційні системи",
      ", випускник SŠ Kyberna 2026). Розумію систему на всіх рівнях: від аналізу пакетів у Wireshark і таблиць маршрутизації, через ядро Linux, systemd та ізоляцію контейнерів, до роботи з пам'яттю та рефлексією в .NET.",
    ],
    aboutBio2: [
      "На практиці поєдную ",
      "автоматизований CI/CD деплой (self-hosted GitHub Actions runner + multi-stage Alpine Docker)",
      ", мережеву безпеку (",
      "MikroTik OSPF/VRF/VLAN, Windows Server AD DS & GPO, Cloudflare Zero-Trust",
      "), розробку на ",
      "C# (.NET, ООП, патерни, LINQ, async/await, System.Reflection) і TypeScript",
      " та вміння миттєво гасити інциденти під навантаженням — щороку підтверджене в команді ",
      "IT Support міжнародної конференції ISSS",
      ".",
    ],
    aboutStats: [
      { number: "4+", label: "Комерційні релізи в продакшні" },
      { number: "6×", label: "Cisco CCNA, Linux & IT сертифікати" },
      { number: "24/7", label: "Власний Linux, Docker & CI/CD" },
    ],
    aboutDomains: [
      { label: "DevOps & CI/CD", desc: "Linux · Docker Compose · GitHub Actions · Zero-Trust", tag: "Infra as Code" },
      { label: "L2/L3 Мережі & Security", desc: "MikroTik · OSPF · VRF · WireGuard · 802.1Q VLAN", tag: "2× Cisco CCNA" },
      { label: "C# (.NET) & Full-Stack", desc: "ООП/SOLID · LINQ · Reflection · Next.js 15 · REST", tag: ".NET & TS" },
      { label: "SysAdmin & Live Ops", desc: "AD DS & GPO · VMware · ISSS SLA Support · MQTT/HA", tag: "ISSS 2024+" },
    ],
    aboutCta: "Зв'язатися",

    // ── PROJECTS ────────────────────────────────────────────────────────────
    projectsTag: "Перевірено реальним трафіком",
    projectsTitle1: "Продакшн",
    projectsTitle2: "проєкти & інфра",
    projectsDesc: "Жодних навчальних макетів — реальні комерційні платформи для клієнтів у Чехії та Канаді + власний 24/7 серверний кластер.",
    filterAll: "Всі",
    filterWeb: "Комерційні сайти (4)",
    filterInfra: "Інфраструктура (1)",
    projectLiveBtn: "Відкрити продакшн",
    projectViewBtn: "Деталі архітектури",
    projectLiveStatus: "200 OK · Prod",
    projectSelfHosted: "24/7 Self-Hosted",
    liveProduction: "Production",
    projectsBanner: "Усі комерційні проєкти працюють у живому продакшні з реальними клієнтами, SSL, структурованими даними SEO та моніторингом.",
    projectsBannerCta: "Обговоримо архітектуру чи вакансію?",
    projects: [
      {
        title: "Home Lab, CI/CD & Zero-Trust Infra",
        category: "Linux · Docker · MikroTik VPN · GitHub Actions",
        description: "Власний 24/7 Linux-сервер: multi-stage Docker контейнери (non-root), автоматичний CI/CD деплой через systemd GitHub Runner, Cloudflare Zero-Trust тунелі (0 відкритих портів), Frigate AI NVR, Home Assistant + Zigbee2MQTT та MikroTik WireGuard site-to-site VPN із CZ/UA VLAN ізоляцією.",
      },
      {
        title: "Bowlingový Club SV",
        category: "Комерційний веб & Бронювання",
        description: "Продакшн full-stack платформа для розважального центру в Тиніщті-над-Орліцею. SSR/SSG оптимізація на Next.js, інтерактивні потоки резервації доріжок, динамічні тарифи, Schema.org SEO та високі показники Core Web Vitals.",
      },
      {
        title: "Luxury Cleaning Solutions",
        category: "B2B/B2C Платформа · Альберта, Канада",
        description: "Комерційна платформа для клінінгової компанії в Едмонтоні. Миттєвий клієнтський калькулятор вартості в реальному часі, інтеграція Google Reviews, генерація лідів і оптимізація швидкості завантаження.",
      },
      {
        title: "Boxing Club Nikita",
        category: "Багатомовна платформа (CZ / UA)",
        description: "Продакшн-сайт спортивного клубу в Градець-Кралові. Повна i18n локалізація (чеська/українська), розклад тренувань, прайси, медіа-галерея та швидкий адаптивний dark-UI на мобільних пристроях.",
      },
      {
        title: "Taneční divadlo Honzy Pokusila",
        category: "Культурний портал & Афіша",
        description: "Офіційна продакшн-платформа сучасного танцювального театру TDHP. Модульна архітектура репертуару, розкладів воркшопів і навчання з оптимізацією зображень.",
      },
    ],

    // ── TABS / QUALIFICATIONS ───────────────────────────────────────────────
    tabsTag: "Технічна верифікація",
    tabsTitleParts: ["навички", "сертифікати", "досвід"],
    tabsTitlePrefix: "Підтверджені",
    tabsTitleConjunction: "та",
    tabLabels: ["Стек", "Сертифікати & VUT", "Досвід"],
    userBadgeName: "Roman Roshkanyuk",
    userBadgeRole: "DevOps & Software Engineer",

    skillsTitle: "Технічний арсенал",
    skillsDesc: "Конкретні протоколи, інструменти та технології, перевірені у продакшні та лабораторних стендах.",
    skillCats: [
      {
        title: "C# (.NET) & Backend Engineering",
        items: ["C#", ".NET Core", "ООП & SOLID", "System.Reflection", "Generics & LINQ", "Design Patterns", "Async / Await", "REST API & HTTP Range Streaming"],
      },
      {
        title: "DevOps, Linux & Контейнери",
        items: ["Linux (Debian/Ubuntu)", "Docker (Multi-stage)", "Docker Compose", "GitHub Actions (Self-Hosted Runner)", "systemd & Journald", "Bash", "SSH Hardening", "Cloudflare Zero-Trust"],
      },
      {
        title: "Мережі & Безпека (Cisco CCNA / MikroTik)",
        items: ["MikroTik RouterOS", "OSPF", "VRF", "WireGuard / IPsec VPN", "802.1Q VLAN (CZ/UA)", "NAT / Firewall / Mangle", "DNS / DHCP", "Wireshark & tcpdump"],
      },
      {
        title: "Enterprise IT & Віртуалізація",
        items: ["Windows Server", "Active Directory (AD DS)", "GPO", "IIS", "VMware Workstation", "MQTT / Zigbee2MQTT", "Home Assistant", "Frigate NVR", "L1/L2 Troubleshooting"],
      },
      {
        title: "Сучасний Web & Tooling",
        items: ["TypeScript", "Next.js 15 (App Router)", "React 19", "Node.js", "Tailwind CSS", "Git / GitHub", "Swagger / OpenAPI", "Figma"],
      },
    ],
    skillLangsTitle: "Мовна підготовка",
    skillLangs: [
      { lang: "Чеська", level: "C1 (матуріта, навчання у VUT Brno)" },
      { lang: "Українська", level: "Рідна мова (C2)" },
      { lang: "Англійська", level: "B1+ (технічна документація, RFC, CLI)" },
    ],
    skillDesignItems: ["Чиста архітектура", "Документація", "Командна комунікація"],

    eduTitle: "Освіта & 6 офіційних сертифікатів",
    eduDesc: "Вища інженерна освіта та сертифікація Cisco Networking Academy.",
    schools: [
      {
        period: "2026 — Теперішній час",
        badge: "1-й курс Бакалавр",
        name: "VUT v Brně — FEKT",
        desc: "Телекомунікаційні та інформаційні системи",
        sub: "Мережеві архітектури, системи передачі даних, низькорівневе програмування та інформаційна безпека.",
        active: true,
      },
      {
        period: "2022 — 2026",
        badge: "Матуріта 2026",
        name: "Střední škola Kyberna, Градець-Кралове",
        desc: "Інформаційні технології — Мережева та системна спеціалізація",
        sub: "Практична матуріта: Windows Server (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), VMware, Cisco CCNA R&S, Linux та C# (.NET).",
        active: false,
      },
    ],
    certsTitle: "Офіційні сертифікати",
    certView: "Перегляд",
    certDownload: "PDF",

    expTitle: "Реальний досвід & Експлуатаційна відповідальність",
    expDesc: "Поєднання продакшн DevOps-інфраструктури, живого IT Support під SLA та комерційної розробки.",
    expCards: [
      {
        tag: "Live Event Ops · 2024—теперішній час (щороку)",
        title: "IT Support & Network Ops — Конференція ISSS",
        desc: "Щороку відбирався керівництвом SŠ Kyberna до техкоманди міжнародної конференції ISSS (Градець-Кралове). Миттєва діагностика L1/L2 мережевих, AV та клієнтських інцидентів у живому ефірі під високим тиском часу.",
      },
      {
        tag: "DevOps & SysAdmin · 2023—теперішній час",
        title: "Linux, Docker CI/CD & MikroTik Engineer",
        desc: "Проєктування та 24/7 супровід власного Linux-сервера: multi-stage Docker стеки, власний systemd GitHub Actions runner, Cloudflare Zero-Trust без відкритих портів і MikroTik site-to-site VPN з OSPF/VRF та ізольованими CZ/UA VLAN.",
      },
      {
        tag: "Software & Web Engineer · 2023—теперішній час",
        title: "Full-Stack розробник — 4+ комерційні релізи",
        desc: "End-to-end доставка продакшн-систем (архітектура на Next.js/TypeScript/Node.js, потокові файлові API, деплой у Docker, DNS/SSL у Cloudflare) для клієнтів у Чехії й Канаді + розробка на C# (.NET).",
      },
    ],
    expEmail: "romanroskanuk74@gmail.com",
    expPhone: "+420 605 447 445",

    // ── SERVICES / ARCHITECTURE ─────────────────────────────────────────────
    servicesTag: "Інженерний профіль",
    servicesTitle: ["Архітектура, ", "яку я будую & підтримую"],
    servicesDesc: "Поєдную мережевий рівень, Linux/Docker інфраструктуру та прикладний код на C# / TypeScript у відмовостійкі системи.",
    services: [
      {
        num: "01",
        title: "Мережева архітектура & Безпека",
        subtitle: "MikroTik RouterOS · Cisco CCNA · OSPF · VRF · WireGuard",
        description: "Проєктування маршрутизованих і сегментованих мереж: динамічна маршрутизація OSPF, ізоляція таблиць VRF, шифровані WireGuard site-to-site тунелі, 802.1Q VLAN (CZ/UA policy routing), firewall/mangle та аналіз пакетів у Wireshark.",
        highlights: ["OSPF & VRF", "WireGuard VPN", "802.1Q VLAN", "2× Cisco CCNA", "Wireshark"],
      },
      {
        num: "02",
        title: "DevOps, Linux & CI/CD Автоматизація",
        subtitle: "Debian/Ubuntu · Docker · GitHub Actions · Zero-Trust",
        description: "24/7 адміністрування Linux-серверів, hardening SSH та systemd-сервісів, multi-stage Alpine Docker образи під non-root користувачем, автоматичний CI/CD деплой через власний GitHub Runner і публікація через Cloudflare Zero-Trust без відкритих портів.",
        highlights: ["Docker Compose", "GitHub Actions CI/CD", "Cloudflare Tunnels", "Linux & systemd", "Non-root Security"],
      },
      {
        num: "03",
        title: "C# (.NET) & Full-Stack Розробка",
        subtitle: "C# OOP/Reflection · TypeScript · Next.js 15 · Node.js",
        description: "Чиста архітектура на C# (.NET — SOLID, Generics, LINQ, async/await, System.Reflection) та продакшн веб-системи на Next.js 15 / TypeScript включно з потоковою віддачею великих файлів (HTTP 206 Range) та REST API.",
        highlights: ["C# & .NET", "System.Reflection", "Next.js 15", "TypeScript", "HTTP 206 Streaming"],
      },
      {
        num: "04",
        title: "Enterprise IT, AD DS & Live Support",
        subtitle: "Windows Server · AD/GPO · VMware · ISSS Support · IoT",
        description: "Адміністрування Windows Server (Active Directory, GPO, DNS/DHCP, IIS), віртуалізація у VMware, 24/7 моніторинг локального MQTT/Zigbee/Frigate NVR стеку та швидкий L1/L2 troubleshooting на конференції ISSS.",
        highlights: ["Active Directory & GPO", "VMware", "ISSS IT Support", "MQTT & Frigate AI", "SLA Troubleshooting"],
      },
    ],

    // ── TECHSTACK ───────────────────────────────────────────────────────────
    techLabel: "Продакшн стек & інженерні інструменти",

    // ── CONTACT ─────────────────────────────────────────────────────────────
    contactTag: "Прямий контакт",
    contactTitle: ["Обговоримо ", "співпрацю", " або інженерну роль"],
    contactSubtitle: "Охоче пройду технічну співбесіду, покажу живу інфраструктуру та код своїх проєктів. Відповідаю оперативно.",
    emailLabel: "E-mail",
    phoneLabel: "Телефон (ЧР)",
    formSubject: "Тема (напр. Junior DevOps / C# / SysAdmin / Проєкт)",
    formName: "Ваше ім'я / Компанія",
    formPhone: "Телефон (необов'язково)",
    formEmail: "Ваш e-mail",
    formMessage: "Напишіть деталі позиції, команди або задачі...",
    formSend: "Надіслати повідомлення",
    formSending: "Надсилаю...",
    formSuccess: "Дякую! Повідомлення отримано — відповім якнайшвидше.",

    // ── FOOTER ──────────────────────────────────────────────────────────────
    footerMade: "Побудовано на",
    footerBy: "—",
    footerDesc: "DevOps · Linux · Docker · MikroTik · C# (.NET) · VUT FEKT Brno",
    footerNav: [
      { name: "Головна", href: "#hero" },
      { name: "Про мене", href: "#about" },
      { name: "Компетенції", href: "#services" },
      { name: "Портфоліо", href: "#projects" },
      { name: "Сертифікати", href: "#skills-section" },
      { name: "CV", href: "/cv" },
      { name: "Контакт", href: "#contact" },
    ],
    backToTop: "Нагору",
  },
} as const;

export type Translations = typeof translations.cs;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "cs",
  setLang: () => {},
  t: translations.cs,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cs");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-lang") as Lang | null;
      if (saved === "cs" || saved === "uk") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {}
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try { localStorage.setItem("portfolio-lang", newLang); } catch {}
    document.documentElement.lang = newLang;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
