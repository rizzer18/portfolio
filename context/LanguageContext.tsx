"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export type Lang = "cs" | "uk";

export const translations = {
  cs: {
    headerCta: "Kontaktujte mě",

    // ── HERO / OVERVIEW ─────────────────────────────────────────────────────
    heroStatus: "DevOps · Linux · Sítě (CCNA / MikroTik) · C# (.NET) · Next.js",
    heroGreeting: "Ahoj, jsem",
    heroSubtitle: "Junior DevOps, Infrastructure & Software Engineer",
    heroSubtitleDesc: "End-to-end přesah od L2/L3 sítí a Linuxu přes CI/CD až po C# a TypeScript",
    heroCvBtn: "Technické CV (PDF)",
    heroInfraTitle: "Vlastní Home Lab (Ukázka dovedností)",
    heroInfraStatus: "24/7 Home Lab",
    heroInfraRows: [
      { label: "🐧 Linux + Docker", value: "CI/CD Runner · Non-root" },
      { label: "🌐 MikroTik L3", value: "WireGuard · OSPF · CZ/UA VLAN" },
      { label: "🛡️ Edge Security", value: "Cloudflare Zero-Trust (0 portů)" },
      { label: "🚀 Komerční weby", value: "4× produkce (200 OK)" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
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
      " a schopnost řešit kritické incidenty pod tlakem — třikrát v řadě (2024–2026) potvrzenou v týmu ",
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
      { label: "SysAdmin & Live Ops", desc: "AD DS & GPO · VMware · ISSS SLA Support · MQTT/HA", tag: "ISSS 2024–26" },
    ],

    // ── PROJECTS ────────────────────────────────────────────────────────────
    projectsTitle1: "Produkční",
    projectsTitle2: "projekty & infra",
    projectsDesc: "Žádné školní makety — reálně běžící komerční aplikace pro klienty v ČR a Kanadě + vlastní domácí Home Lab.",
    filterAll: "Vše",
    filterWeb: "Komerční weby (4)",
    filterInfra: "Home Lab (1)",
    projectLiveBtn: "Otevřít produkci",
    projectViewBtn: "Detail architektury",
    projectLiveStatus: "200 OK · Prod",
    projectSelfHosted: "24/7 Self-Hosted",
    liveProduction: "Production",
    projects: [
      {
        title: "Domácí Linux Server, CI/CD & MikroTik Home Lab",
        category: "Domácí projekt (Ukázka dovedností) · Linux · Docker · MikroTik",
        description: "Vlastní domácí server a síťová laboratoř, na kterých si prakticky ověřuji své dovednosti: multi-stage Docker kontejnery (non-root), automatický CI/CD deploy přes vlastní GitHub Runner, Cloudflare Zero-Trust tunely (0 otevřených portů), Home Assistant + Frigate NVR a MikroTik WireGuard VPN s OSPF/VRF a CZ/UA VLANy.",
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

    // ── QUALIFICATIONS ──────────────────────────────────────────────────────
    tabsTitleParts: ["dovednosti", "certifikáty", "praxe"],
    tabsTitlePrefix: "Ověřené",
    tabsTitleConjunction: "a",
    tabLabels: ["Stack", "Certifikáty & VUT", "Praxe"],
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
    expCards: [
      {
        tag: "Live Event Ops · Ročníky 2024, 2025, 2026",
        title: "IT Support & Network Ops — Konference ISSS",
        desc: "Během studia na SŠ Kyberna třikrát v řadě (v termínech konání ročníků 2024, 2025 a 2026) vybrán vedením školy do technického týmu mezinárodní konference ISSS v Hradci Králové. Okamžitá diagnostika L1/L2 síťových, AV a klientských incidentů v živém sálovém provozu.",
      },
      {
        tag: "Domácí projekty (Home Lab) · Praktická ukázka dovedností",
        title: "Vlastní Linux Server, Docker CI/CD & MikroTik Lab",
        desc: "Domácí technické projekty jako praktické potvrzení mých dovedností: 24/7 domácí Linux server s Dockerem, vlastní GitHub Actions runner, Cloudflare Zero-Trust tunely a domácí MikroTik síť (WireGuard VPN, OSPF, VRF a izolované CZ/UA VLANy).",
      },
      {
        tag: "Software & Web Engineer · 2023—současnost",
        title: "Full-Stack vývojář — 4+ komerční nasazení",
        desc: "End-to-end dodávka produkčních aplikací (sběr požadavků, architektura v Next.js/TypeScript/Node.js, streaming API, deployment do Dockeru, DNS/SSL v Cloudflare) pro platící klienty v ČR a Kanadě + backend v C# (.NET).",
      },
    ],

    // ── SERVICES / ARCHITECTURE ─────────────────────────────────────────────
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

    techLabel: "Produkční stack & inženýrské nástroje",

    // ── CONTACT ─────────────────────────────────────────────────────────────
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
  },

  uk: {
    headerCta: "Зв'язатися",

    // ── HERO / OVERVIEW ─────────────────────────────────────────────────────
    heroStatus: "DevOps · Linux · Мережі (CCNA / MikroTik) · C# (.NET) · Next.js",
    heroGreeting: "Привіт, я",
    heroSubtitle: "Junior DevOps, Infrastructure & Software Engineer",
    heroSubtitleDesc: "End-to-end інженерія: від L2/L3 мереж і Linux через CI/CD до C# та TypeScript",
    heroCvBtn: "Технічне CV (PDF)",
    heroInfraTitle: "Власний Home Lab (Підтвердження вмінь)",
    heroInfraStatus: "24/7 Home Lab",
    heroInfraRows: [
      { label: "🐧 Linux + Docker", value: "CI/CD Runner · Non-root" },
      { label: "🌐 MikroTik L3", value: "WireGuard · OSPF · CZ/UA VLAN" },
      { label: "🛡️ Edge Security", value: "Cloudflare Zero-Trust (0 портів)" },
      { label: "🚀 Комерційні сайти", value: "4× продакшн (200 OK)" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
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
      " та вміння миттєво гасити інциденти під навантаженням — три роки поспіль (2024–2026) підтверджене в команді ",
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
      { label: "SysAdmin & Live Ops", desc: "AD DS & GPO · VMware · ISSS SLA Support · MQTT/HA", tag: "ISSS 2024–26" },
    ],

    // ── PROJECTS ────────────────────────────────────────────────────────────
    projectsTitle1: "Продакшн",
    projectsTitle2: "проєкти & інфра",
    projectsDesc: "Жодних навчальних макетів — реальні комерційні платформи для клієнтів у Чехії та Канаді + власний домашній Home Lab.",
    filterAll: "Всі",
    filterWeb: "Комерційні сайти (4)",
    filterInfra: "Home Lab (1)",
    projectLiveBtn: "Відкрити продакшн",
    projectViewBtn: "Деталі архітектури",
    projectLiveStatus: "200 OK · Prod",
    projectSelfHosted: "24/7 Self-Hosted",
    liveProduction: "Production",
    projects: [
      {
        title: "Домашній Linux-сервер, CI/CD & MikroTik Home Lab",
        category: "Домашній проєкт (Підтвердження вмінь) · Linux · Docker · MikroTik",
        description: "Власний домашній сервер і мережева лабораторія для практичного підтвердження моїх вмінь: multi-stage Docker контейнери (non-root), автоматичний CI/CD деплой через власний GitHub Runner, Cloudflare Zero-Trust тунелі (0 відкритих портів), Home Assistant + Frigate NVR та MikroTik WireGuard VPN з OSPF/VRF і CZ/UA VLAN.",
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

    // ── QUALIFICATIONS ──────────────────────────────────────────────────────
    tabsTitleParts: ["навички", "сертифікати", "досвід"],
    tabsTitlePrefix: "Підтверджені",
    tabsTitleConjunction: "та",
    tabLabels: ["Стек", "Сертифікати & VUT", "Досвід"],
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
    expCards: [
      {
        tag: "Live Event Ops · Роки 2024, 2025, 2026",
        title: "IT Support & Network Ops — Конференція ISSS",
        desc: "Під час навчання в SŠ Kyberna три роки поспіль (у дні проведення конференції у 2024, 2025 та 2026 рр.) відбирався керівництвом школи до техкоманди міжнародної конференції ISSS у Градець-Кралові. Миттєва діагностика L1/L2 мережевих, AV та клієнтських інцидентів у живому залі.",
      },
      {
        tag: "Домашні проєкти (Home Lab) · Підтвердження вмінь",
        title: "Власний Linux-сервер, Docker CI/CD & MikroTik Lab",
        desc: "Домашні технічні проєкти як практичне підтвердження моїх навичок: 24/7 домашній Linux-сервер із Docker, власний GitHub Actions runner, Cloudflare Zero-Trust тунелі та домашня мережа на MikroTik (WireGuard VPN, OSPF, VRF та ізольовані CZ/UA VLAN).",
      },
      {
        tag: "Software & Web Engineer · 2023—теперішній час",
        title: "Full-Stack розробник — 4+ комерційні релізи",
        desc: "End-to-end доставка продакшн-систем (архітектура на Next.js/TypeScript/Node.js, потокові файлові API, деплой у Docker, DNS/SSL у Cloudflare) для клієнтів у Чехії й Канаді + розробка на C# (.NET).",
      },
    ],

    // ── SERVICES / ARCHITECTURE ─────────────────────────────────────────────
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

    techLabel: "Продакшн стек & інженерні інструменти",

    // ── CONTACT ─────────────────────────────────────────────────────────────
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

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("portfolio-lang", newLang);
    } catch {}
    document.documentElement.lang = newLang;
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang] as Translations,
    }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
