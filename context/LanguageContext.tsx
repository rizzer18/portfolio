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
    heroSubtitleDesc: "Baví mě propojovat svět L2/L3 sítí a Linuxu přes CI/CD až po C# a TypeScript",
    heroCvBtn: "Moje CV (PDF)",
    heroInfraTitle: "Můj domácí Home Lab",
    heroInfraStatus: "24/7 Home Lab",
    heroInfraRows: [
      { label: "🐧 Linux + Docker", value: "Můj CI/CD Runner · Non-root" },
      { label: "🌐 MikroTik L3", value: "WireGuard · OSPF · CZ/UA VLAN" },
      { label: "🛡️ Edge Security", value: "Cloudflare Zero-Trust (0 portů)" },
      { label: "🚀 Komerční weby", value: "4× v mém provozu (200 OK)" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
    aboutPhotoName: "Roman Roshkanyuk",
    aboutPhotoBadge: "SŠ Kyberna · 2× Cisco CCNA",
    aboutBio1: [
      "Jmenuji se ",
      "Roman Roshkanyuk",
      " a věnuji se DevOps, síťové infrastruktuře a vývoji softwaru (vystudoval jsem ",
      "SŠ Kyberna v Hradci Králové",
      "). Nechci zůstat jen u teorie — baví mě rozumět celému stacku od paketů ve Wiresharku a routovacích tabulek, přes jádro Linuxu, systemd a Docker, až po paměťový model a reflexi v .NET.",
    ],
    aboutBio2: [
      "V praxi si sám stavím ",
      "automatizovaný CI/CD deployment (vlastní GitHub Actions runner + multi-stage Alpine Docker)",
      ", řeším síťovou bezpečnost (",
      "MikroTik OSPF/VRF/VLAN, Windows Server AD DS & GPO, Cloudflare Zero-Trust",
      "), píšu v ",
      "C# (.NET, OOP, SOLID, LINQ, async/await, System.Reflection) a TypeScriptu",
      " a nebojím se řešit problémy pod tlakem — tři roky po sobě (2024–2026) jsem působil v týmu ",
      "IT Support na mezinárodní konferenci ISSS",
      ".",
    ],
    aboutStats: [
      { number: "4+", label: "Komerční weby, které jsem postavil" },
      { number: "6×", label: "Moje Cisco CCNA, Linux & IT certifikáty" },
      { number: "24/7", label: "Můj vlastní Linux, Docker & CI/CD" },
    ],
    aboutDomains: [
      { label: "DevOps & CI/CD", desc: "Spravuji Linux, Docker Compose, GitHub Actions a Zero-Trust", tag: "Infra as Code" },
      { label: "L2/L3 Sítě & Security", desc: "Konfiguruji MikroTik, OSPF, VRF, WireGuard a 802.1Q VLAN", tag: "2× Cisco CCNA" },
      { label: "C# (.NET) & Full-Stack", desc: "Vyvíjím v C# (OOP/SOLID, Reflection) a Next.js 15", tag: ".NET & TS" },
      { label: "SysAdmin & Live Ops", desc: "Pracuji s AD DS & GPO, VMware, MQTT/HA a živou podporou ISSS", tag: "ISSS 2024–26" },
    ],

    // ── PROJECTS ────────────────────────────────────────────────────────────
    projectsTitle1: "Moje produkční",
    projectsTitle2: "projekty & infra",
    projectsDesc: "Neukazuji školní šuplíkovky — tohle jsou reálné komerční weby, které jsem postavil a spravuji pro klienty v ČR a Kanadě, plus můj domácí Home Lab.",
    filterAll: "Vše",
    filterWeb: "Komerční weby (4)",
    filterInfra: "Home Lab (1)",
    projectLiveBtn: "Otevřít web",
    projectViewBtn: "Detail mé architektury",
    projectLiveStatus: "200 OK · Prod",
    projectSelfHosted: "24/7 Self-Hosted",
    liveProduction: "Production",
    projects: [
      {
        title: "Můj domácí Linux Server, CI/CD & MikroTik Home Lab",
        category: "Můj Home Lab · Linux · Docker · MikroTik",
        description: "Doma si provozuji vlastní Linux server a síťovou laboratoř, kde si vše zkouším v reálném provozu: běží mi tam multi-stage Docker kontejnery (non-root), automatický CI/CD deploy přes vlastní GitHub Runner, Cloudflare Zero-Trust tunely (0 otevřených portů), Home Assistant + Frigate NVR a MikroTik WireGuard VPN s OSPF/VRF a CZ/UA VLANy.",
      },
      {
        title: "Bowlingový Club SV",
        category: "Komerční web & Rezervační tok",
        description: "Pro zábavní centrum v Týništi nad Orlicí jsem navrhl a naprogramoval produkční web v Next.js. Postaral jsem se o SSR/SSG optimalizaci, přehlednou rezervaci drah, dynamický ceník, strukturovaná SEO data (Schema.org) i špičkové Core Web Vitals.",
      },
      {
        title: "Luxury Cleaning Solutions",
        category: "B2B/B2C Platforma · Alberta, Kanada",
        description: "Pro kanadskou úklidovou firmu v Edmontonu jsem vytvořil komerční platformu s interaktivní kalkulačkou okamžitého výpočtu ceny v reálném čase, napojením na Google Reviews, sběrem poptávek a rychlým načítáním.",
      },
      {
        title: "Boxing Club Nikita",
        category: "Vícejazyčná platforma (CZ / UA)",
        description: "Pro sportovní klub v Hradci Králové jsem postavil a nasadil dvojjazyčný web (čeština / ukrajinština). Řešil jsem kompletní i18n lokalizaci, rozvrhy tréninků, ceníky, galerii i bleskovou odezvu na telefonech.",
      },
      {
        title: "Taneční divadlo Honzy Pokusila",
        category: "Kulturní portál & Správa repertoáru",
        description: "Pro současné taneční divadlo TDHP jsem připravil oficiální webovou prezentaci. Navrhl jsem modulární strukturu pro repertoár, harmonogramy workshopů a taneční výuky včetně optimalizace fotografií.",
      },
    ],

    // ── QUALIFICATIONS ──────────────────────────────────────────────────────
    tabsTitleParts: ["dovednosti", "certifikáty", "praxe"],
    tabsTitlePrefix: "Moje",
    tabsTitleConjunction: "a",
    tabLabels: ["Stack", "Certifikáty & Vzdělání", "Praxe"],
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
    skillLangsTitle: "Jazyky, kterými mluvím",
    skillLangs: [
      { lang: "Čeština", level: "C1 (odmaturoval jsem v ČR)" },
      { lang: "Ukrajinština", level: "Můj rodný jazyk (C2)" },
      { lang: "Angličtina", level: "B1+ (technická dokumentace, RFC, CLI)" },
    ],
    schools: [
      {
        period: "2022 — 2026",
        badge: "Maturita 2026",
        name: "Střední škola Kyberna, Hradec Králové",
        desc: "Informační technologie — Síťová & systémová specializace",
        sub: "Na Kyberně jsem prakticky odmaturoval ze správy Windows Serveru (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), VMware, sítí Cisco CCNA R&S, Linuxu a vývoje v C# (.NET).",
        active: true,
      },
    ],
    certsTitle: "Moje certifikáty",
    certView: "Náhled",
    certDownload: "PDF",
    expCards: [
      {
        tag: "Live Event Ops · Ročníky 2024, 2025, 2026",
        title: "IT Support & Network Ops — Konference ISSS",
        desc: "Během studia na SŠ Kyberna mě vedení školy třikrát po sobě (v letech 2024, 2025 a 2026) vybralo do technického týmu mezinárodní konference ISSS v Hradci Králové. Přímo v sálech jsem okamžitě řešil L1/L2 síťové, AV a systémové problémy, aby přednášky běžely hladce.",
      },
      {
        tag: "Můj Home Lab · Praktický trénink 24/7",
        title: "Vlastní Linux Server, Docker CI/CD & MikroTik Lab",
        desc: "Doma si udržuji 24/7 Linux server s Dockerem, vlastním GitHub Actions runnerem, Cloudflare Zero-Trust tunely a domácí MikroTik sítí (WireGuard VPN, OSPF, VRF a oddělené CZ/UA VLANy), na kterých si ověřuji vše z praxe.",
      },
      {
        tag: "Software & Web Engineer · 2023—současnost",
        title: "Full-Stack vývoj — moje 4+ komerční nasazení",
        desc: "Od prvního návrhu až po nasazení dodávám weby a aplikace (Next.js/TypeScript/Node.js, streaming API, Docker, DNS/SSL na Cloudflare) pro reálné klienty v ČR a Kanadě a věnuji se backendu v C# (.NET).",
      },
    ],

    // ── SERVICES / ARCHITECTURE ─────────────────────────────────────────────
    servicesTitle: ["Architektura, ", "kterou stavím & spravuji"],
    servicesDesc: "Rád propojuji síťovou vrstvu, Linux/Docker infrastrukturu a aplikační kód v C# / TypeScriptu do jednoho funkčního a spolehlivého celku.",
    services: [
      {
        num: "01",
        title: "Síťová architektura & Bezpečnost",
        subtitle: "MikroTik RouterOS · Cisco CCNA · OSPF · VRF · WireGuard",
        description: "Navrhuji směrované a segmentované sítě: nastavím dynamické směrování OSPF, izolaci tabulek přes VRF, šifrované WireGuard site-to-site tunely, 802.1Q VLAN (CZ/UA policy routing), firewall/mangle a provoz analyzuji ve Wiresharku.",
        highlights: ["OSPF & VRF", "WireGuard VPN", "802.1Q VLAN", "2× Cisco CCNA", "Wireshark"],
      },
      {
        num: "02",
        title: "DevOps, Linux & CI/CD Automatizace",
        subtitle: "Debian/Ubuntu · Docker · GitHub Actions · Zero-Trust",
        description: "Spravuji Linux servery 24/7, řeším hardening SSH a systemd služeb, stavím multi-stage Alpine Docker obrazy pod non-root uživatelem, automatizuji CI/CD přes vlastní GitHub Runner a služby publikuji přes Cloudflare Zero-Trust bez otevřených portů.",
        highlights: ["Docker Compose", "GitHub Actions CI/CD", "Cloudflare Tunnels", "Linux & systemd", "Non-root Security"],
      },
      {
        num: "03",
        title: "C# (.NET) & Full-Stack Vývoj",
        subtitle: "C# OOP/Reflection · TypeScript · Next.js 15 · Node.js",
        description: "Zakládám si na čisté architektuře v C# (.NET — SOLID, Generics, LINQ, async/await, System.Reflection) a stavím produkční webové systémy v Next.js 15 / TypeScript včetně HTTP 206 Range streamování a REST API.",
        highlights: ["C# & .NET", "System.Reflection", "Next.js 15", "TypeScript", "HTTP 206 Streaming"],
      },
      {
        num: "04",
        title: "Enterprise IT, AD DS & Live Support",
        subtitle: "Windows Server · AD/GPO · VMware · ISSS Support · IoT",
        description: "Konfiguruji Windows Server (Active Directory, GPO, DNS/DHCP, IIS) a virtualizaci ve VMware, dohlížím na lokální MQTT/Zigbee/Frigate NVR ekosystém a mám praxi s rychlým L1/L2 troubleshootingem z konference ISSS.",
        highlights: ["Active Directory & GPO", "VMware", "ISSS IT Support", "MQTT & Frigate AI", "SLA Troubleshooting"],
      },
    ],

    techLabel: "Nástroje a technologie, se kterými pracuji",

    // ── CONTACT ─────────────────────────────────────────────────────────────
    contactTitle: ["Pojďme probrat ", "spolupráci", " nebo technickou roli"],
    contactSubtitle: "Rád se potkám u pohovoru, ukážu vám naživo svůj Home Lab i kód projektů. Odpovídám obratem.",
    emailLabel: "E-mail",
    phoneLabel: "Telefon (ČR)",
    formSubject: "Předmět (např. Pozice Junior DevOps / C# / SysAdmin / Projekt)",
    formName: "Vaše jméno / Společnost",
    formPhone: "Telefon (volitelné)",
    formEmail: "Váš e-mail",
    formMessage: "Napište mi detaily pozice, týmu nebo projektu...",
    formSend: "Odeslat zprávu",
    formSending: "Odesílám...",
    formSuccess: "Děkuji! Zpráva mi dorazila — ozvu se vám co nejdříve.",
  },

  uk: {
    headerCta: "Зв'язатися",

    // ── HERO / OVERVIEW ─────────────────────────────────────────────────────
    heroStatus: "DevOps · Linux · Мережі (CCNA / MikroTik) · C# (.NET) · Next.js",
    heroGreeting: "Привіт, я",
    heroSubtitle: "Junior DevOps, Infrastructure & Software Engineer",
    heroSubtitleDesc: "Люблю поєднувати L2/L3 мережі та Linux через CI/CD із кодом на C# і TypeScript",
    heroCvBtn: "Моє CV (PDF)",
    heroInfraTitle: "Мій домашній Home Lab",
    heroInfraStatus: "24/7 Home Lab",
    heroInfraRows: [
      { label: "🐧 Linux + Docker", value: "Мій CI/CD Runner · Non-root" },
      { label: "🌐 MikroTik L3", value: "WireGuard · OSPF · CZ/UA VLAN" },
      { label: "🛡️ Edge Security", value: "Cloudflare Zero-Trust (0 портів)" },
      { label: "🚀 Комерційні сайти", value: "4× у моєму продакшні (200 OK)" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
    aboutPhotoName: "Roman Roshkanyuk",
    aboutPhotoBadge: "SŠ Kyberna · 2× Cisco CCNA",
    aboutBio1: [
      "Мене звати ",
      "Roman Roshkanyuk",
      ", я займаюся DevOps, мережевою інфраструктурою та розробкою ПЗ (закінчив ",
      "SŠ Kyberna у Градець-Кралові",
      "). Не люблю залишатися лише в теорії — мені важливо розуміти систему на всіх рівнях: від аналізу пакетів у Wireshark і таблиць маршрутизації, через ядро Linux, systemd і Docker, до роботи з пам'яттю та рефлексією в .NET.",
    ],
    aboutBio2: [
      "На практиці я сам будую ",
      "автоматизований CI/CD деплой (власний GitHub Actions runner + multi-stage Alpine Docker)",
      ", налаштовую мережеву безпеку (",
      "MikroTik OSPF/VRF/VLAN, Windows Server AD DS & GPO, Cloudflare Zero-Trust",
      "), пишу код на ",
      "C# (.NET, ООП, SOLID, LINQ, async/await, System.Reflection) і TypeScript",
      " та вмію спокійно вирішувати проблеми під тиском — три роки поспіль (2024–2026) я працював у команді ",
      "IT Support міжнародної конференції ISSS",
      ".",
    ],
    aboutStats: [
      { number: "4+", label: "Комерційні сайти, які я запустив" },
      { number: "6×", label: "Мої Cisco CCNA, Linux & IT сертифікати" },
      { number: "24/7", label: "Мій власний Linux, Docker & CI/CD" },
    ],
    aboutDomains: [
      { label: "DevOps & CI/CD", desc: "Адмініструю Linux, Docker Compose, GitHub Actions і Zero-Trust", tag: "Infra as Code" },
      { label: "L2/L3 Мережі & Security", desc: "Налаштовую MikroTik, OSPF, VRF, WireGuard та 802.1Q VLAN", tag: "2× Cisco CCNA" },
      { label: "C# (.NET) & Full-Stack", desc: "Розробляю на C# (ООП/SOLID, Reflection) і Next.js 15", tag: ".NET & TS" },
      { label: "SysAdmin & Live Ops", desc: "Працюю з AD DS & GPO, VMware, MQTT/HA та живою підтримкою ISSS", tag: "ISSS 2024–26" },
    ],

    // ── PROJECTS ────────────────────────────────────────────────────────────
    projectsTitle1: "Мої продакшн",
    projectsTitle2: "проєкти & інфра",
    projectsDesc: "Тут немає навчальних макетів — це реальні комерційні сайти, які я розробив і підтримую для клієнтів у Чехії та Канаді, плюс мій домашній Home Lab.",
    filterAll: "Всі",
    filterWeb: "Комерційні сайти (4)",
    filterInfra: "Home Lab (1)",
    projectLiveBtn: "Відкрити сайт",
    projectViewBtn: "Деталі моєї архітектури",
    projectLiveStatus: "200 OK · Prod",
    projectSelfHosted: "24/7 Self-Hosted",
    liveProduction: "Production",
    projects: [
      {
        title: "Мій домашній Linux-сервер, CI/CD & MikroTik Home Lab",
        category: "Мій Home Lab · Linux · Docker · MikroTik",
        description: "Вдома я розгорнув власний Linux-сервер і мережеву лабораторію, де відпрацьовую все на живій інфраструктурі: у мене працюють multi-stage Docker контейнери (non-root), автоматичний CI/CD деплой через власний GitHub Runner, Cloudflare Zero-Trust тунелі (0 відкритих портів), Home Assistant + Frigate NVR і MikroTik WireGuard VPN з OSPF/VRF та CZ/UA VLAN.",
      },
      {
        title: "Bowlingový Club SV",
        category: "Комерційний веб & Бронювання",
        description: "Для розважального центру в Тиніщті-над-Орліцею я спроєктував і розробив продакшн-сайт на Next.js. Реалізував SSR/SSG оптимізацію, зручне онлайн-бронювання доріжок, динамічні тарифи, мікророзмітку Schema.org SEO та високі показники Core Web Vitals.",
      },
      {
        title: "Luxury Cleaning Solutions",
        category: "B2B/B2C Платформа · Альберта, Канада",
        description: "Для клінінгової компанії в Едмонтоні (Канада) я створив комерційну платформу з інтерактивним калькулятором миттєвого розрахунку вартості, інтеграцією Google Reviews, формою заявок і швидким завантаженням.",
      },
      {
        title: "Boxing Club Nikita",
        category: "Багатомовна платформа (CZ / UA)",
        description: "Для спортивного клубу в Градець-Кралові я розробив і запустив двомовний сайт (чеська / українська). Налаштував повну i18n локалізацію, розклад тренувань, прайси, галерею та швидкий адаптивний інтерфейс для телефонів.",
      },
      {
        title: "Taneční divadlo Honzy Pokusila",
        category: "Культурний портал & Афіша",
        description: "Для сучасного танцювального театру TDHP я створив офіційну веб-платформу. Побудував модульну архітектуру для репертуару, розкладів воркшопів і навчання разом із оптимізацією зображень.",
      },
    ],

    // ── QUALIFICATIONS ──────────────────────────────────────────────────────
    tabsTitleParts: ["навички", "сертифікати", "досвід"],
    tabsTitlePrefix: "Мої",
    tabsTitleConjunction: "та",
    tabLabels: ["Стек", "Сертифікати & Освіта", "Досвід"],
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
    skillLangsTitle: "Мови, якими я володію",
    skillLangs: [
      { lang: "Чеська", level: "C1 (склав матуріту в ЧР)" },
      { lang: "Українська", level: "Моя рідна мова (C2)" },
      { lang: "Англійська", level: "B1+ (технічна документація, RFC, CLI)" },
    ],
    schools: [
      {
        period: "2022 — 2026",
        badge: "Матуріта 2026",
        name: "Střední škola Kyberna, Градець-Кралове",
        desc: "Інформаційні технології — Мережева та системна спеціалізація",
        sub: "У SŠ Kyberna я склав практичну матуріту з адміністрування Windows Server (AD DS, GPO, IIS, DNS, DHCP, VPN, NAT), VMware, мереж Cisco CCNA R&S, Linux та розробки на C# (.NET).",
        active: true,
      },
    ],
    certsTitle: "Мої сертифікати",
    certView: "Перегляд",
    certDownload: "PDF",
    expCards: [
      {
        tag: "Live Event Ops · Роки 2024, 2025, 2026",
        title: "IT Support & Network Ops — Конференція ISSS",
        desc: "Під час навчання в SŠ Kyberna керівництво школи три роки поспіль (у 2024, 2025 та 2026 рр.) обирало мене до техкоманди міжнародної конференції ISSS у Градець-Кралові. Просто в залах я оперативно усував L1/L2 мережеві, AV та системні збої під час живих виступів.",
      },
      {
        tag: "Мій Home Lab · Практика 24/7",
        title: "Власний Linux-сервер, Docker CI/CD & MikroTik Lab",
        desc: "Вдома я підтримую 24/7 Linux-сервер із Docker, власним GitHub Actions runner, Cloudflare Zero-Trust тунелями та домашньою мережею на MikroTik (WireGuard VPN, OSPF, VRF та окремі CZ/UA VLAN), де перевіряю всі рішення власноруч.",
      },
      {
        tag: "Software & Web Engineer · 2023—теперішній час",
        title: "Full-Stack розробка — мої 4+ комерційні релізи",
        desc: "Від збору вимог і архітектури до деплою в Docker та Cloudflare я створюю продакшн-системи (Next.js/TypeScript/Node.js, потокові API) для клієнтів у Чехії й Канаді та пишу бекенд на C# (.NET).",
      },
    ],

    // ── SERVICES / ARCHITECTURE ─────────────────────────────────────────────
    servicesTitle: ["Архітектура, ", "яку я будую & підтримую"],
    servicesDesc: "Мені подобається об'єднувати мережевий рівень, Linux/Docker інфраструктуру та код на C# / TypeScript у надійні цілісні системи.",
    services: [
      {
        num: "01",
        title: "Мережева архітектура & Безпека",
        subtitle: "MikroTik RouterOS · Cisco CCNA · OSPF · VRF · WireGuard",
        description: "Проєктую маршрутизовані й сегментовані мережі: піднімаю динамічну маршрутизацію OSPF, ізолюю таблиці VRF, налаштовую WireGuard site-to-site тунелі, 802.1Q VLAN (CZ/UA policy routing), firewall/mangle та розбираю трафік у Wireshark.",
        highlights: ["OSPF & VRF", "WireGuard VPN", "802.1Q VLAN", "2× Cisco CCNA", "Wireshark"],
      },
      {
        num: "02",
        title: "DevOps, Linux & CI/CD Автоматизація",
        subtitle: "Debian/Ubuntu · Docker · GitHub Actions · Zero-Trust",
        description: "Адмініструю Linux-сервери 24/7, налаштовую hardening SSH і systemd-сервісів, збираю multi-stage Alpine Docker образи під non-root користувачем, автоматизую CI/CD через власний GitHub Runner і публікую сервіси через Cloudflare Zero-Trust без відкритих портів.",
        highlights: ["Docker Compose", "GitHub Actions CI/CD", "Cloudflare Tunnels", "Linux & systemd", "Non-root Security"],
      },
      {
        num: "03",
        title: "C# (.NET) & Full-Stack Розробка",
        subtitle: "C# OOP/Reflection · TypeScript · Next.js 15 · Node.js",
        description: "Дотримуюся чистої архітектури в C# (.NET — SOLID, Generics, LINQ, async/await, System.Reflection) та розробляю продакшн веб-системи на Next.js 15 / TypeScript включно з потоковою передачею даних (HTTP 206 Range) і REST API.",
        highlights: ["C# & .NET", "System.Reflection", "Next.js 15", "TypeScript", "HTTP 206 Streaming"],
      },
      {
        num: "04",
        title: "Enterprise IT, AD DS & Live Support",
        subtitle: "Windows Server · AD/GPO · VMware · ISSS Support · IoT",
        description: "Налаштовую Windows Server (Active Directory, GPO, DNS/DHCP, IIS) і віртуалізацію у VMware, підтримую локальний стек MQTT/Zigbee/Frigate NVR та маю реальний досвід швидкого L1/L2 troubleshooting на конференції ISSS.",
        highlights: ["Active Directory & GPO", "VMware", "ISSS IT Support", "MQTT & Frigate AI", "SLA Troubleshooting"],
      },
    ],

    techLabel: "Стек та інструменти, з якими я працюю",

    // ── CONTACT ─────────────────────────────────────────────────────────────
    contactTitle: ["Обговоримо ", "співпрацю", " або інженерну роль"],
    contactSubtitle: "Охоче поспілкуюся на співбесіді, покажу наживо свій Home Lab та код проєктів. Відповідаю оперативно.",
    emailLabel: "E-mail",
    phoneLabel: "Телефон (ЧР)",
    formSubject: "Тема (напр. Junior DevOps / C# / SysAdmin / Проєкт)",
    formName: "Ваше ім'я / Компанія",
    formPhone: "Телефон (необов'язково)",
    formEmail: "Ваш e-mail",
    formMessage: "Напишіть деталі позиції, команди або задачі...",
    formSend: "Надіслати повідомлення",
    formSending: "Надсилаю...",
    formSuccess: "Дякую! Я отримав повідомлення — відповім якнайшвидше.",
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
