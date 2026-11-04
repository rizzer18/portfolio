"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "cs" | "uk";

export const translations = {
  cs: {
    // ── HEADER ──────────────────────────────────────────────────────────────
    nav: [
      { name: "Domů", href: "#hero", id: "hero" },
      { name: "O mně", href: "#about", id: "about" },
      { name: "Kompetence", href: "#services", id: "services" },
      { name: "Portfolio", href: "#projects", id: "projects" },
      { name: "Dovednosti & Certifikáty", href: "#skills-section", id: "skills-section" },
      { name: "Kontakt", href: "#contact", id: "contact" },
    ],
    headerCv: "CV",
    headerCta: "Kontaktujte mě",

    // ── HERO ────────────────────────────────────────────────────────────────
    heroStatus: "IT Specialista · Sítě · Linux · Automatizace · Web",
    heroGreeting: "Ahoj, jsem",
    heroSubtitle: "IT Specialista & Full-Stack Vývojář",
    heroSubtitleDesc: "Sítě, Linux, Chytrá domácnost & Webový vývoj",
    // Alternating: plain / highlighted / plain / highlighted ...
    heroDesc: [
      "Student 1. ročníku na VUT Brno FEKT, s praktickými zkušenostmi v síťových technologiích a webovém vývoji. Konfiguruji ",
      "MikroTik sítě",
      " (Site-to-Site VPN, CZ/UA VLANy), spravuji vlastní ",
      "Linux server",
      " (Docker, Frigate AI, Cloudflare Tunnels), navrhuji ",
      "úspornou automatizaci chytré domácnosti",
      " (Home Assistant, Zigbee) a vyvíjím ",
      "webové aplikace pro reálné klienty",
      " (Next.js).",
    ],
    heroCvBtn: "Zobrazit / Stáhnout CV",
    heroCompBtn: "Zobrazit kompetence",
    heroPills: [
      { label: "🌐 Sítě (MikroTik & CCNA)", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "🐧 Linux & Cloudflare Tunnely", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
      { label: "💡 Lokální chytrá domácnost & Zigbee", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
      { label: "👁️ Frigate NVR (AI Vision)", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "💻 Full-Stack Web (Next.js & Node.js)", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
    ],
    heroInfraTitle: "Infrastruktura",
    heroInfraStatus: "Vše online",
    heroInfraRows: [
      { label: "🐧 Linux Server", value: "Cloudflare Zero-Trust" },
      { label: "🌐 MikroTik VPN", value: "Site-to-Site (CZ/UA)" },
      { label: "💡 Smart Home", value: "Zigbee2MQTT Mesh" },
      { label: "🚀 Production Web", value: "4 klientské weby" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
    aboutTag: "O mně",
    aboutTitle: "IT Specialista",
    aboutTitleAccent: "& Full-Stack Vývojář",
    aboutPhotoName: "Roman Roshkanyuk",
    aboutPhotoBadge: "VUT FEKT · 1. ročník",
    // Alternating plain / highlighted
    aboutBio1: [
      "Jsem ",
      "Roman Roshkanyuk",
      " — IT specialista a student 1. ročníku na ",
      "VUT Brno (FEKT — Telekomunikační a informační systémy)",
      ", absolvent Střední školy Kyberna v Hradci Králové (2026). Propojuji síťové technologie, Linux systémy a full-stack webový vývoj do praktických řešení.",
    ],
    aboutBio2: [
      "Moje filozofie: ",
      "praktická, rozpočtově efektivní řešení",
      " bez drahého vendor lock-in. Od vlastní ",
      "Home Assistant + Zigbee2MQTT",
      " chytré domácnosti s provozními náklady $0/měsíc, po zabezpečenou ",
      "MikroTik site-to-site VPN",
      " s VLAN izolací — kombinuji dovednosti do funkčních produkčních řešení.",
    ],
    aboutStats: [
      { number: "4", label: "Živé klientské weby" },
      { number: "6", label: "Cisco & IT certifikátů" },
      { number: "3+", label: "Roky praxe v IT projektech" },
    ],
    aboutDomains: [
      { label: "Síťový inženýr", desc: "MikroTik VPN · CCNA · VLANs", tag: "CCNA Certified" },
      { label: "Linux & Self-Hosting", desc: "Docker · Cloudflare Tunnels · SSH", tag: "Vlastní server" },
      { label: "Chytrá domácnost IoT", desc: "Home Assistant · Zigbee2MQTT · Frigate AI", tag: "Bez předplatného" },
      { label: "Full-Stack webový vývoj", desc: "Next.js · Node.js · TypeScript", tag: "4 živé weby" },
    ],
    aboutCta: "Kontaktujte mě",

    // ── PROJECTS ────────────────────────────────────────────────────────────
    projectsTag: "Produkční portfolio",
    projectsTitle1: "Živé klientské",
    projectsTitle2: "projekty",
    projectsDesc: "Webové aplikace a platformy aktivně běžící v produkci pro klienty v České republice i v zahraničí.",
    filterAll: "Vše",
    filterWeb: "Živé weby (4)",
    filterInfra: "Infrastruktura (1)",
    projectLiveBtn: "Živý web",
    projectViewBtn: "Zobrazit projekt",
    projectLiveStatus: "200 OK · Live",
    projectSelfHosted: "Self-Hosted",
    liveProduction: "Live Production",
    projectsBanner: "Všechny zvýrazněné weby klientů jsou živé, indexované a aktivně obsluhují reálné uživatele.",
    projectsBannerCta: "Potřebujete vlastní web? Pojďme ho postavit",
    projects: [
      { title: "Bowlingový Club SV", category: "Platforma zábavy & rezervací", description: "Full-stack produkční webová aplikace pro bowlingové a relaxační centrum v Týništi nad Orlicí. Zahrnuje responzivní layout, interaktivní rezervační toky, dynamické ceníky a bohaté mediální galerie." },
      { title: "Boxing Club Nikita", category: "Sportovní klub & vícejazyčná platforma", description: "Produkční web pro Boxing Club Nikita v Hradci Králové. Obsahuje správu tréninkového rozvrhu, profily trenérů, ceníky, fotogalerii a česko-ukrajinskou lokalizaci." },
      { title: "Taneční divadlo Honzy Pokusila", category: "Divadlo & scénické umění", description: "Oficiální platforma pro současné taneční divadlo TDHP. Prezentuje repertoár, harmonogramy workshopů a taneční výuky, historii souboru a plynulé přechody mezi stránkami." },
      { title: "Luxury Cleaning Solutions", category: "Komerční & rezidenční služby", description: "Web pro komerční úklidové služby v Edmontonu a Albertě, Kanada. Postaven s okamžitou kalkulačkou cen, katalogy služeb, integrací Google Reviews a sběrem kontaktů." },
      { title: "Cost-Effective Smart Home & Home Lab", category: "Úsporné automatizace & infrastruktura", description: "Cenově efektivní ekosystém chytré domácnosti bez předplatného. Vlastní Linux server s Home Assistant přes Zigbee (Zigbee2MQTT), Frigate AI surveillance přes Cloudflare Tunneling a MikroTik dual-VLAN (CZ & UA) site-to-site VPN." },
    ],

    // ── TABS ────────────────────────────────────────────────────────────────
    tabsTag: "Kvalifikace & rozvoj",
    tabsTitleParts: ["dovednosti", "vzdělání", "zkušenosti"],
    tabsTitlePrefix: "Moje",
    tabsTitleConjunction: "a",
    tabLabels: ["Dovednosti", "Vzdělání & Certifikáty", "Zkušenosti"],
    userBadgeName: "Roman Roshkanyuk",
    userBadgeRole: "IT Specialista & Vývojář",

    skillsTitle: "Technické znalosti",
    skillsDesc: "Vývojový stack, síťové inženýrství, self-hosted Linux & UI design.",
    skillCats: [
      { title: "Programování", items: ["React.js", "Node.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "JavaScript"] },
      { title: "Sítě & infrastruktura", items: ["CCNA", "MikroTik", "Site-to-Site VPN", "CZ & UA VLANs", "Cloudflare", "DNS / DHCP", "NAT"] },
      { title: "Linux & Virtualizace", items: ["Linux Server", "VMware Workstation", "Docker", "Cloudflare Tunnels", "Bash", "SSH Hardening"] },
      { title: "Windows Server & AD (Kyberna)", items: ["Active Directory", "GPO", "IIS", "DNS Server", "DHCP Server", "VPN / NAT"] },
    ],
    skillLangsTitle: "Jazyky & UI design",
    skillLangs: [
      { lang: "Ukrajinština", level: "Rodný jazyk" },
      { lang: "Čeština", level: "C1 (maturitní zkouška)" },
      { lang: "Angličtina", level: "B1 (Intermediate)" },
    ],
    skillDesignItems: ["Figma", "UI/UX Design", "Responzivní weby"],

    eduTitle: "Vzdělání & ověřené certifikáty",
    eduDesc: "Akademická dráha a oborové kvalifikace.",
    schools: [
      { period: "2026 — Současnost", badge: "1. ročník", name: "VUT Brno — FEKT", desc: "Telekomunikační a informační systémy", sub: "1. ročník · Telekomunikační a informační systémy", active: true },
      { period: "2022 — 2026", badge: "Absolvent (2026)", name: "Střední škola Kyberna", desc: "Hradec Králové, Česká republika", sub: "IT obor, maturitní zkouška (2026). Specializace: Windows Server (Active Directory, GPO, IIS, DNS, DHCP, VPN, NAT), VMware virtualizace a Cisco CCNA.", active: false },
    ],
    certsTitle: "Oficiální certifikáty",
    certView: "Zobrazit",
    certDownload: "Stáhnout",

    expTitle: "Freelance IT & Webový vývoj",
    expDesc: "Freelance vývojář | 2023 — Současnost | 4 klienty v ČR a Kanadě",
    expCards: [
      { tag: "Freelance · 2023—současnost", title: "Full-Stack vývojář — 4 klientské weby", desc: "Návrh, vývoj a nasazení webových platforem v produkci: bowlingovyclubsv.cz, nikita-box.cz, honzapokusil.cz, luxury-cleaning-solutions.ca. Next.js, Node.js, TypeScript." },
      { tag: "Vlastní infrastruktura · 2023—současnost", title: "Linux Server & Síťový inženýr", desc: "Konfigurace MikroTik site-to-site VPN (CZ/UA VLAN), self-hosted Linux server s Docker, Frigate NVR, zabezpečený přes Cloudflare Zero-Trust tunely." },
      { tag: "IoT projekt · 2024—současnost", title: "Smart Home bez předplatného", desc: "Návrh lokální chytré domácnosti: Home Assistant, Zigbee2MQTT, Frigate AI detekce. Provozní náklady: $0/měsíc. Přístup přes Cloudflare tunel." },
    ],
    expEmail: "romanroskanuk74@gmail.com",
    expPhone: "+420 605 447 445",

    // ── SERVICES ────────────────────────────────────────────────────────────
    servicesTag: "Kompetence",
    servicesTitle: ["Co ", "dělám & stavím"],
    servicesDesc: "Od síťové architektury a Linux infrastruktury po automatizaci chytré domácnosti a produkční webové aplikace pro reálné klienty.",
    services: [
      { num: "01", title: "Síťové inženýrství", subtitle: "MikroTik · CCNA · VPN · VLAN", description: "Konfigurace MikroTik routerů: site-to-site šifrovaná VPN mezi dvěma zařízeními, duální VLAN segmentace (CZ & UA), správa DHCP/DNS. Teoretický základ z Cisco CCNA kurzů.", highlights: ["MikroTik RouterOS", "Site-to-Site VPN", "CZ / UA VLANs", "CCNA Certified", "DNS & DHCP"] },
      { num: "02", title: "Linux systémy & Self-Hosting", subtitle: "Self-hosted · Cloudflare · Docker", description: "Vlastnoručně nakonfigurovaný domácí Linux server běžící 24/7. Bezpečný vzdálený přístup přes Cloudflare Tunneling — žádné otevřené porty. Kontejnerizace služeb pomocí Docker.", highlights: ["Linux Administration", "Cloudflare Tunnels", "Docker Compose", "SSH Hardening", "Frigate NVR AI"] },
      { num: "03", title: "Automatizace chytré domácnosti", subtitle: "Home Assistant · Zigbee · No-Subscription", description: "Lokální chytrá domácnost s Home Assistant a Zigbee (Zigbee2MQTT). Bez cloudových předplatných — 100% lokální automatizační síť s Frigate AI kamerovým dohledem.", highlights: ["Home Assistant", "Zigbee2MQTT", "Frigate AI Vision", "Zero Subscriptions", "Automation Scripts"] },
      { num: "04", title: "Produkční webové aplikace", subtitle: "Next.js · Node.js · TypeScript", description: "Webové aplikace pro reálné klienty — od rezervačních platforem po vícejazyčné sportovní kluby a komerční služby v Kanadě. Postaveno s Next.js, React, TypeScript a SEO-optimalizovanou architekturou.", highlights: ["Next.js & React", "Node.js & REST APIs", "TypeScript", "Tailwind CSS", "SEO Optimization"] },
    ],

    // ── TECHSTACK ───────────────────────────────────────────────────────────
    techLabel: "Technologie & nástroje, se kterými pracuji",

    // ── CONTACT ─────────────────────────────────────────────────────────────
    contactTag: "Spojme se",
    contactTitle: ["Pojďme si ", "promluvit", " o vašem projektu"],
    contactSubtitle: "Nebojte se ozvat kvůli spolupráci, freelance zakázkám nebo technickým dotazům.",
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    formSubject: "Předmět (např. Poptávka webového projektu)",
    formName: "Vaše jméno",
    formPhone: "Telefon (volitelné)",
    formEmail: "Váš e-mail",
    formMessage: "Popište mi svůj projekt nebo nápad...",
    formSend: "Odeslat zprávu",
    formSending: "Odesílám zprávu...",
    formSuccess: "Děkuji! Vaše zpráva byla úspěšně odeslána.",

    // ── FOOTER ──────────────────────────────────────────────────────────────
    footerMade: "Vytvořeno s",
    footerBy: "od",
    footerDesc: "IT Specialista & Full-Stack Vývojář · Sítě · Linux · Chytrá domácnost · Web — VUT FEKT Brno, 1. ročník",
    footerNav: [
      { name: "Domů", href: "#hero" },
      { name: "O mně", href: "#about" },
      { name: "Kompetence", href: "#services" },
      { name: "Portfolio", href: "#projects" },
      { name: "Dovednosti & Certifikáty", href: "#skills-section" },
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
      { name: "Компетенції", href: "#services", id: "services" },
      { name: "Портфоліо", href: "#projects", id: "projects" },
      { name: "Навички & Сертифікати", href: "#skills-section", id: "skills-section" },
      { name: "Контакт", href: "#contact", id: "contact" },
    ],
    headerCv: "CV",
    headerCta: "Зв'яжіться зі мною",

    // ── HERO ────────────────────────────────────────────────────────────────
    heroStatus: "IT Спеціаліст · Мережі · Linux · Автоматизація · Веб",
    heroGreeting: "Привіт, я",
    heroSubtitle: "IT Спеціаліст & Full-Stack Розробник",
    heroSubtitleDesc: "Мережі, Linux, Розумний дім & Веб-розробка",
    heroDesc: [
      "Студент 1-го курсу VUT Brno FEKT з практичним досвідом у мережевих технологіях та веб-розробці. Конфігурую ",
      "MikroTik мережі",
      " (Site-to-Site VPN, CZ/UA VLAN), адмініструю власний ",
      "Linux сервер",
      " (Docker, Frigate AI, Cloudflare Tunnels), проектую ",
      "бюджетну автоматизацію розумного дому",
      " (Home Assistant, Zigbee) та розробляю ",
      "веб-застосунки для реальних клієнтів",
      " (Next.js).",
    ],
    heroCvBtn: "Переглянути / Завантажити CV",
    heroCompBtn: "Переглянути компетенції",
    heroPills: [
      { label: "🌐 Мережі (MikroTik & CCNA)", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "🐧 Linux & Cloudflare Tunnels", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
      { label: "💡 Локальний розумний дім & Zigbee", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
      { label: "👁️ Frigate NVR (AI Vision)", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "💻 Full-Stack Web (Next.js & Node.js)", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
    ],
    heroInfraTitle: "Інфраструктура",
    heroInfraStatus: "Все онлайн",
    heroInfraRows: [
      { label: "🐧 Linux Сервер", value: "Cloudflare Zero-Trust" },
      { label: "🌐 MikroTik VPN", value: "Site-to-Site (CZ/UA)" },
      { label: "💡 Розумний дім", value: "Zigbee2MQTT Mesh" },
      { label: "🚀 Веб продакшн", value: "4 клієнтські сайти" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
    aboutTag: "Про мене",
    aboutTitle: "IT Спеціаліст",
    aboutTitleAccent: "& Full-Stack Розробник",
    aboutPhotoName: "Roman Roshkanyuk",
    aboutPhotoBadge: "VUT FEKT · 1-й курс",
    aboutBio1: [
      "Я ",
      "Roman Roshkanyuk",
      " — IT спеціаліст та студент 1-го курсу ",
      "VUT Brno (FEKT — Телекомунікаційні та інформаційні системи)",
      ", випускник Середньої школи Kyberna в Градець-Кралові (2026). Поєдную мережеві технології, Linux системи та full-stack веб-розробку в практичні рішення.",
    ],
    aboutBio2: [
      "Моя філософія: ",
      "практичні, бюджетоефективні рішення",
      " без дорогого vendor lock-in. Від власного ",
      "Home Assistant + Zigbee2MQTT",
      " розумного дому з операційними витратами $0/місяць, до захищеної ",
      "MikroTik site-to-site VPN",
      " з ізоляцією VLAN — поєдную навички у функціональні продакшн-рішення.",
    ],
    aboutStats: [
      { number: "4", label: "Живих сайтів клієнтів" },
      { number: "6", label: "Cisco & IT сертифікатів" },
      { number: "3+", label: "Роки досвіду в IT проектах" },
    ],
    aboutDomains: [
      { label: "Мережевий інженер", desc: "MikroTik VPN · CCNA · VLANs", tag: "CCNA Certified" },
      { label: "Linux & Self-Hosting", desc: "Docker · Cloudflare Tunnels · SSH", tag: "Власний сервер" },
      { label: "Розумний дім IoT", desc: "Home Assistant · Zigbee2MQTT · Frigate AI", tag: "Без підписки" },
      { label: "Full-Stack веб-розробка", desc: "Next.js · Node.js · TypeScript", tag: "4 живих сайти" },
    ],
    aboutCta: "Зв'яжіться зі мною",

    // ── PROJECTS ────────────────────────────────────────────────────────────
    projectsTag: "Продакшн портфоліо",
    projectsTitle1: "Живі клієнтські",
    projectsTitle2: "проекти",
    projectsDesc: "Веб-застосунки та платформи, що активно працюють у продакшні для клієнтів у Чехії та за кордоном.",
    filterAll: "Всі",
    filterWeb: "Живі сайти (4)",
    filterInfra: "Інфраструктура (1)",
    projectLiveBtn: "Живий сайт",
    projectViewBtn: "Переглянути проект",
    projectLiveStatus: "200 OK · Live",
    projectSelfHosted: "Self-Hosted",
    liveProduction: "Live Production",
    projectsBanner: "Всі виділені сайти клієнтів є живими, проіндексованими та активно обслуговують реальних користувачів.",
    projectsBannerCta: "Потрібен власний сайт? Давайте побудуємо",
    projects: [
      { title: "Bowlingový Club SV", category: "Платформа розваг & резервацій", description: "Full-stack продакшн веб-застосунок для боулінгового та релакс-центру в Тиніщті-над-Орліцею. Включає адаптивний макет, інтерактивні потоки резервації, динамічні прайс-листи та медіа-галереї." },
      { title: "Boxing Club Nikita", category: "Спортивний клуб & багатомовна платформа", description: "Продакшн сайт для Boxing Club Nikita в Градець-Кралові. Містить управління розкладом тренувань, профілі тренерів, прайс-листи, фотогалерею та чесько-українську локалізацію." },
      { title: "Taneční divadlo Honzy Pokusila", category: "Театр & сценічне мистецтво", description: "Офіційна платформа для сучасного танцювального театру TDHP. Представляє репертуар, розклади воркшопів та занять, історію трупи та плавні переходи між сторінками." },
      { title: "Luxury Cleaning Solutions", category: "Комерційні & житлові послуги", description: "Сайт для комерційних клінінгових послуг в Едмонтоні та Альберті, Канада. Побудовано з миттєвим калькулятором цін, каталогами послуг, інтеграцією Google Reviews та збором контактів." },
      { title: "Ефективний розумний дім & Home Lab", category: "Бюджетна автоматизація & інфраструктура", description: "Бюджетефективна екосистема розумного дому без підписок. Власний Linux сервер з Home Assistant через Zigbee (Zigbee2MQTT), AI-відеоспостереження Frigate через Cloudflare Tunneling та MikroTik dual-VLAN (CZ & UA) site-to-site VPN." },
    ],

    // ── TABS ────────────────────────────────────────────────────────────────
    tabsTag: "Кваліфікація & розвиток",
    tabsTitleParts: ["навички", "освіта", "досвід"],
    tabsTitlePrefix: "Мої",
    tabsTitleConjunction: "та",
    tabLabels: ["Навички", "Освіта & Сертифікати", "Досвід"],
    userBadgeName: "Roman Roshkanyuk",
    userBadgeRole: "IT Спеціаліст & Розробник",

    skillsTitle: "Технічні знання",
    skillsDesc: "Стек розробки, мережеве інженерство, self-hosted Linux & UI дизайн.",
    skillCats: [
      { title: "Програмування", items: ["React.js", "Node.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "JavaScript"] },
      { title: "Мережі & інфраструктура", items: ["CCNA", "MikroTik", "Site-to-Site VPN", "CZ & UA VLANs", "Cloudflare", "DNS / DHCP", "NAT"] },
      { title: "Linux & Віртуалізація", items: ["Linux Server", "VMware Workstation", "Docker", "Cloudflare Tunnels", "Bash", "SSH Hardening"] },
      { title: "Windows Server & AD (Kyberna)", items: ["Active Directory", "GPO", "IIS", "DNS Server", "DHCP Server", "VPN / NAT"] },
    ],
    skillLangsTitle: "Мови & UI дизайн",
    skillLangs: [
      { lang: "Українська", level: "Рідна мова" },
      { lang: "Чеська", level: "C1 (матуріта)" },
      { lang: "Англійська", level: "B1 (Intermediate)" },
    ],
    skillDesignItems: ["Figma", "UI/UX Дизайн", "Адаптивні сайти"],

    eduTitle: "Освіта & підтверджені сертифікати",
    eduDesc: "Академічний шлях та галузеві кваліфікації.",
    schools: [
      { period: "2026 — Теперішній час", badge: "1-й курс", name: "VUT Brno — FEKT", desc: "Телекомунікаційні та інформаційні системи", sub: "1-й курс · Телекомунікаційні та інформаційні системи", active: true },
      { period: "2022 — 2026", badge: "Випускник (2026)", name: "Середня школа Kyberna", desc: "Градець-Кралове, Чеська Республіка", sub: "IT середня школа, матуріта (2026). Спеціалізація: Windows Server (Active Directory, GPO, IIS, DNS, DHCP, VPN, NAT), VMware віртуалізація та Cisco CCNA.", active: false },
    ],
    certsTitle: "Офіційні сертифікати",
    certView: "Переглянути",
    certDownload: "Завантажити",

    expTitle: "Freelance IT & Веб-розробка",
    expDesc: "Freelance розробник | 2023 — Теперішній час | 4 клієнти в Чехії та Канаді",
    expCards: [
      { tag: "Freelance · 2023—теперішній час", title: "Full-Stack розробник — 4 клієнтські сайти", desc: "Проектування, розробка та реліз комерційних веб-платформ: bowlingovyclubsv.cz, nikita-box.cz, honzapokusil.cz, luxury-cleaning-solutions.ca. Next.js, Node.js, TypeScript." },
      { tag: "Власна інфраструктура · 2023—теперішній час", title: "Linux Server & Мережевий інженер", desc: "Налаштування MikroTik site-to-site VPN (CZ/UA VLAN), домашній Linux сервер на базі Docker, Frigate NVR, захищений доступ через Cloudflare Zero-Trust тунелі." },
      { tag: "IoT проект · 2024—теперішній час", title: "Розумний дім без підписок", desc: "Проектування локального розумного дому: Home Assistant, Zigbee2MQTT, Frigate AI розпізнавання. Витрати: $0/місяць. Безпечний доступ через Cloudflare тунель." },
    ],
    expEmail: "romanroskanuk74@gmail.com",
    expPhone: "+420 605 447 445",

    // ── SERVICES ────────────────────────────────────────────────────────────
    servicesTag: "Компетенції",
    servicesTitle: ["Що я ", "роблю & будую"],
    servicesDesc: "Від мережевої архітектури та Linux інфраструктури до автоматизації розумного дому та веб-застосунків для реальних клієнтів.",
    services: [
      { num: "01", title: "Мережеве інженерство", subtitle: "MikroTik · CCNA · VPN · VLAN", description: "Конфігурація MikroTik роутерів: site-to-site шифрований VPN між двома точками, подвійна VLAN сегментація (CZ & UA), керування DHCP/DNS. Теоретична база з курсів Cisco CCNA.", highlights: ["MikroTik RouterOS", "Site-to-Site VPN", "CZ / UA VLANs", "CCNA Certified", "DNS & DHCP"] },
      { num: "02", title: "Linux системи & Self-Hosting", subtitle: "Self-hosted · Cloudflare · Docker", description: "Власноруч налаштований домашній Linux сервер 24/7. Безпечний віддалений доступ через Cloudflare Tunneling — без відкритих портів. Контейнеризація за допомогою Docker.", highlights: ["Linux Administration", "Cloudflare Tunnels", "Docker Compose", "SSH Hardening", "Frigate NVR AI"] },
      { num: "03", title: "Автоматизація розумного дому", subtitle: "Home Assistant · Zigbee · No-Subscription", description: "Локальний розумний дім на Home Assistant та Zigbee (Zigbee2MQTT). Без хмарних підписок — 100% автономна мережа з Frigate AI відеоаналітикою.", highlights: ["Home Assistant", "Zigbee2MQTT", "Frigate AI Vision", "Zero Subscriptions", "Automation Scripts"] },
      { num: "04", title: "Продакшн веб-застосунки", subtitle: "Next.js · Node.js · TypeScript", description: "Веб-застосунки для реальних клієнтів — від систем бронювання до багатомовних платформ спортивних клубів та сервісів у Канаді. Next.js, React, TypeScript, SEO.", highlights: ["Next.js & React", "Node.js & REST APIs", "TypeScript", "Tailwind CSS", "SEO Optimization"] },
    ],

    // ── TECHSTACK ───────────────────────────────────────────────────────────
    techLabel: "Технології & інструменти, з якими я працюю",

    // ── CONTACT ─────────────────────────────────────────────────────────────
    contactTag: "Зв'яжіться",
    contactTitle: ["Давайте ", "поговоримо", " про ваш проект"],
    contactSubtitle: "Не соромтеся звертатися щодо співпраці, фрілансу або технічних питань.",
    emailLabel: "E-mail",
    phoneLabel: "Телефон",
    formSubject: "Тема (наприклад, Запит на веб-проект)",
    formName: "Ваше ім'я",
    formPhone: "Телефон (необов'язково)",
    formEmail: "Ваш e-mail",
    formMessage: "Опишіть ваш проект або ідею...",
    formSend: "Надіслати повідомлення",
    formSending: "Надсилаю повідомлення...",
    formSuccess: "Дякую! Ваше повідомлення успішно надіслано.",

    // ── FOOTER ──────────────────────────────────────────────────────────────
    footerMade: "Створено з",
    footerBy: "від",
    footerDesc: "IT Спеціаліст & Full-Stack Розробник · Мережі · Linux · Розумний дім · Веб — VUT FEKT Brno, 1-й курс",
    footerNav: [
      { name: "Головна", href: "#hero" },
      { name: "Про мене", href: "#about" },
      { name: "Компетенції", href: "#services" },
      { name: "Портфоліо", href: "#projects" },
      { name: "Навички & Сертифікати", href: "#skills-section" },
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
