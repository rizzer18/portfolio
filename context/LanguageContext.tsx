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
    heroStatus: "Všestranný IT Specialista · Systémy · Sítě · Automatizace · Web",
    heroGreeting: "Ahoj, jsem",
    heroSubtitle: "Všestranný IT Specialista",
    heroSubtitleDesc: "Systémy, Sítě, Chytrá domácnost & Webová architektura",
    // Alternating: plain / highlighted / plain / highlighted ...
    heroDesc: [
      "Student 1. ročníku na VUT Brno FEKT s multidisciplinárním přístupem k moderním technologiím. Navrhuji enterprise-grade ",
      "MikroTik sítě",
      " (Site-to-Site VPN, CZ/UA VLANy), vlastní ",
      "Linux infrastrukturu",
      " (Docker, Frigate AI, Cloudflare Tunnels), ",
      "cenově efektivní automatizaci chytré domácnosti",
      " (Home Assistant, Zigbee) a spouštím výkonné ",
      "produkční webové aplikace",
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
      { label: "🚀 Production Web", value: "4 Client Sites Live" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
    aboutTag: "O mně",
    aboutTitle: "Všestranný",
    aboutTitleAccent: "IT Specialista",
    // Alternating plain / highlighted
    aboutBio1: [
      "Jsem ",
      "Roman Roshkanyuk",
      " — všestranný IT specialista a student 1. ročníku na ",
      "VUT Brno (FEKT — Telekomunikační a informační systémy)",
      ", který v roce 2026 absolvoval Střední školu Kyberna v Hradci Králové. Propojuji více technologických oblastí: enterprise networking, Linux systémy, automatizaci chytré domácnosti a full-stack webový vývoj.",
    ],
    aboutBio2: [
      "Moje filozofie je zaměřena na ",
      "praktická, rozpočtově efektivní řešení",
      " — navrhuji systémy, které jednoduše fungují, bez drahého vendor lock-in. Od vlastní ",
      "Home Assistant + Zigbee2MQTT",
      " chytré domácnosti s provozními náklady $0/měsíc, po zabezpečenou ",
      "MikroTik site-to-site VPN",
      " s dvojitou VLAN izolací — kombinuji všechny své dovednosti do kompletních, produkčních řešení.",
    ],
    aboutStats: [
      { number: "3+", label: "Let IT & sítě" },
      { number: "4+", label: "Živé klientské weby" },
      { number: "6", label: "Základní kompetence" },
    ],
    aboutDomains: [
      { label: "Síťový architekt", desc: "MikroTik VPN · CCNA · VLANs", tag: "Certifikovaný CCNA" },
      { label: "Linux & DevOps", desc: "Docker · Cloudflare Tunnels · SSH", tag: "Vlastní hosting" },
      { label: "Chytrá domácnost IoT", desc: "Home Assistant · Zigbee2MQTT · Frigate AI", tag: "Bez předplatného" },
      { label: "Full-Stack webový vývoj", desc: "Next.js · Node.js · TypeScript", tag: "4 živé weby" },
      { label: "Bezpečnost & soukromí", desc: "Zero-Trust · VLAN Isolation · Hardening", tag: "Soukromí na prvním místě" },
      { label: "IT systémy & hardware", desc: "Kyberna Graduate · VUT FEKT 1st Year", tag: "IT Essentials" },
    ],
    aboutCta: "Kontaktujte mě / Najměte mě",

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
    tabLabels: ["Dovednosti", "Vzdělání & Certifikáty", "Zkušenosti"],
    userBadgeName: "Roman Roshkanyuk",
    userBadgeRole: "IT Specialista & Automatizace",

    skillsTitle: "Technické znalosti",
    skillsDesc: "Vývojový stack, síťové inženýrství, self-hosted Linux & UI design.",
    skillCats: [
      { title: "Programování", items: ["React.js", "Node.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "JavaScript"] },
      { title: "Sítě & infrastruktura", items: ["CCNA", "MikroTik", "Site-to-Site VPN", "CZ & UA VLANs", "Cloudflare", "DNS / DHCP"] },
      { title: "Domácí laboratoř & úsporné automatizace", items: ["Linux Server", "Home Assistant", "Zigbee2MQTT", "Frigate NVR", "Cloudflare Tunneling", "Zero-Subscription IoT", "Docker"] },
    ],
    skillLangsTitle: "Jazyky & UI design",
    skillLangs: [
      { lang: "Ukrajinština", level: "Rodný jazyk" },
      { lang: "Angličtina", level: "B1 (Středně pokročilý)" },
      { lang: "Čeština", level: "Student v Brně" },
    ],
    skillDesignItems: ["Figma", "UI/UX Design", "Responzivní weby"],

    eduTitle: "Vzdělání & ověřené certifikáty",
    eduDesc: "Akademická dráha a oborové kvalifikace.",
    schools: [
      { period: "2026 — Současnost", badge: "1. ročník", name: "VUT Brno — FEKT", desc: "Telekomunikační a informační systémy", sub: "1. ročník · Telekomunikační a informační systémy", active: true },
      { period: "2022 — 2026", badge: "Absolvent (2026)", name: "Střední škola Kyberna", desc: "Hradec Králové, Česká republika", sub: "IT střední škola zakončená maturitní zkouškou (absolvent 2026)", active: false },
    ],
    certsTitle: "Oficiální certifikáty",
    certView: "Zobrazit",
    certDownload: "Stáhnout",

    expTitle: "Zkušenosti & projekty",
    expDesc: "Praktický webový vývoj, síťové inženýrství & vlastní hosting.",
    expCards: [
      { tag: "Ověřeno v produkci", title: "Full-Stack vývojář", desc: "Tvorba a nasazení reálných klientských platforem v produkci (bowlingovyclubsv.cz, nikita-box.cz) s Next.js, Node.js a moderní architekturou." },
      { tag: "Klientská řešení", title: "Frontend & UI specialista", desc: "Vývoj interaktivních komerčních webů mezinárodně (luxury-cleaning-solutions.ca, honzapokusil.cz) s online kalkulačkami a plynulými animacemi." },
      { tag: "Chytrá domácnost & IoT", title: "Úsporné automatizace domácnosti", desc: "Návrh lokální chytré domácnosti s Home Assistant, Zigbee2MQTT a Frigate AI detekcí. Žádné cloudové poplatky, 100% soukromí a bezpečný přístup přes Cloudflare tunel." },
      { tag: "Síťové inženýrství", title: "MikroTik VPN & VLANs", desc: "Site-to-site šifrovaný tunel mezi dvěma MikroTik routery. Klientský router dynamicky odděluje síťový provoz do izolovaných CZ a UA VLAN." },
    ],
    expEmail: "romanroskanuk74@gmail.com",
    expPhone: "+420 605 447 445",

    // ── SERVICES ────────────────────────────────────────────────────────────
    servicesTag: "Základní kompetence",
    servicesTitle: ["Co ", "dělám & stavím"],
    servicesDesc: "Multidisciplinární IT specialista — od enterprise síťové architektury a Linux infrastruktury po automatizaci chytré domácnosti a produkční webové aplikace.",
    services: [
      { num: "01", title: "Síťové inženýrství", subtitle: "MikroTik · CCNA · VPN · VLAN", description: "Enterprise-grade networking s MikroTik routery. Site-to-site šifrovaná VPN mezi dvěma MikroTik zařízeními, duální VLAN segmentace (CZ & UA), správa DHCP/DNS a Cisco CCNA-certifikované základy.", highlights: ["MikroTik RouterOS", "Site-to-Site VPN", "CZ / UA VLANs", "CCNA Certified", "DNS & DHCP"] },
      { num: "02", title: "Linux systémy & DevOps", subtitle: "Self-hosted · Cloudflare · Docker", description: "Vlastnoručně nakonfigurovaný domácí Linux server provozující produkční zátěže 24/7. Bezpečný zero-trust vzdálený přístup přes Cloudflare Tunneling — žádné otevřené porty. Orchestrace kontejnerů pomocí Docker.", highlights: ["Linux Administration", "Cloudflare Tunnels", "Docker Compose", "SSH Hardening", "Frigate NVR AI"] },
      { num: "03", title: "Automatizace chytré domácnosti", subtitle: "Home Assistant · Zigbee · No-Subscription", description: "Lokálně orientovaná, soukromí zaměřená chytrá domácnost s Home Assistant a Zigbee (Zigbee2MQTT). Eliminuje vendor lock-in a cloudová předplatná — 100% lokální automatizační síť s AI-powered Frigate kamerovým dohledem.", highlights: ["Home Assistant", "Zigbee2MQTT", "Frigate AI Vision", "Zero Subscriptions", "Automation Scripts"] },
      { num: "04", title: "Produkční webové aplikace", subtitle: "Next.js · Node.js · TypeScript", description: "Produkční webové aplikace pro skutečné klienty — od rezervačních platforem po vícejazyčné sportovní kluby a komerční služby v Kanadě. Postaveno s Next.js, React, TypeScript a SEO-optimalizovanou architekturou.", highlights: ["Next.js & React", "Node.js & REST APIs", "TypeScript", "Tailwind CSS", "SEO Optimization"] },
      { num: "05", title: "Kybernetická bezpečnost & soukromí", subtitle: "Zero-Trust · Hardening · Isolation", description: "Infrastruktura navržená s bezpečností na prvním místě: VLAN-izolované síťové segmenty, zero-trust Cloudflare tunely, SSH hardening, pravidla firewallu a privátní lokální kontrola dat.", highlights: ["Zero-Trust Networking", "VLAN Isolation", "Firewall Rules", "SSH Key Auth", "Private Data Control"] },
      { num: "06", title: "UI / UX & Klientské projekty", subtitle: "Figma · Responsive · International", description: "Kompletní webová řešení navržená od Figma wireframů po nasazená produkční prostředí — pro klienty v České republice, Kanadě a Ukrajině. Důraz na čistý design, rychlost a konverzně orientované rozvržení.", highlights: ["Figma Design", "Responsive UI", "Multilingual (CZ/UA/EN)", "Performance Tuning", "Client Collaboration"] },
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
    footerDesc: "Všestranný IT specialista · Sítě · Linux · Chytrá domácnost · Web — VUT FEKT Brno, 1. ročník",
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
    heroStatus: "Різносторонній IT Спеціаліст · Системи · Мережі · Автоматизація · Веб",
    heroGreeting: "Привіт, я",
    heroSubtitle: "Різносторонній IT Спеціаліст",
    heroSubtitleDesc: "Системи, Мережі, Розумний дім & Веб-архітектура",
    heroDesc: [
      "Студент 1-го курсу VUT Brno FEKT з мультидисциплінарним підходом до сучасних технологій. Проектую корпоративні ",
      "MikroTik мережі",
      " (Site-to-Site VPN, CZ/UA VLAN), власну ",
      "Linux інфраструктуру",
      " (Docker, Frigate AI, Cloudflare Tunnels), ",
      "бюджетну автоматизацію розумного дому",
      " (Home Assistant, Zigbee) та запускаю потужні ",
      "веб-застосунки у продакшні",
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
    aboutTitle: "Різносторонній",
    aboutTitleAccent: "IT Спеціаліст",
    aboutBio1: [
      "Я ",
      "Roman Roshkanyuk",
      " — різносторонній IT спеціаліст та студент 1-го курсу ",
      "VUT Brno (FEKT — Телекомунікаційні та інформаційні системи)",
      ", який у 2026 році закінчив Середню школу Kyberna в Градець-Кралові. Поєдную кілька технологічних напрямків: корпоративні мережі, Linux системи, автоматизацію розумного дому та full-stack веб-розробку.",
    ],
    aboutBio2: [
      "Моя філософія — ",
      "практичні, бюджетоефективні рішення",
      ", що просто працюють без дорогого vendor lock-in. Від власного ",
      "Home Assistant + Zigbee2MQTT",
      " розумного дому з операційними витратами $0/місяць, до захищеної ",
      "MikroTik site-to-site VPN",
      " з подвійною ізоляцією VLAN — поєдную всі навички в комплексні продакшн-рішення.",
    ],
    aboutStats: [
      { number: "3+", label: "Роки IT & мережі" },
      { number: "4+", label: "Живих сайтів клієнтів" },
      { number: "6", label: "Основних компетенцій" },
    ],
    aboutDomains: [
      { label: "Мережевий архітектор", desc: "MikroTik VPN · CCNA · VLANs", tag: "Сертифікований CCNA" },
      { label: "Linux & DevOps", desc: "Docker · Cloudflare Tunnels · SSH", tag: "Власний хостинг" },
      { label: "Розумний дім IoT", desc: "Home Assistant · Zigbee2MQTT · Frigate AI", tag: "Без підписки" },
      { label: "Full-Stack веб-розробка", desc: "Next.js · Node.js · TypeScript", tag: "4 живих сайти" },
      { label: "Безпека & приватність", desc: "Zero-Trust · VLAN Isolation · Hardening", tag: "Приватність — пріоритет" },
      { label: "IT системи & залізо", desc: "Kyberna Graduate · VUT FEKT 1st Year", tag: "IT Essentials" },
    ],
    aboutCta: "Зв'яжіться зі мною / Найміть мене",

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
    tabLabels: ["Навички", "Освіта & Сертифікати", "Досвід"],
    userBadgeName: "Roman Roshkanyuk",
    userBadgeRole: "IT Спеціаліст & Автоматизація",

    skillsTitle: "Технічні знання",
    skillsDesc: "Стек розробки, мережеве інженерство, self-hosted Linux & UI дизайн.",
    skillCats: [
      { title: "Програмування", items: ["React.js", "Node.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "JavaScript"] },
      { title: "Мережі & інфраструктура", items: ["CCNA", "MikroTik", "Site-to-Site VPN", "CZ & UA VLANs", "Cloudflare", "DNS / DHCP"] },
      { title: "Домашня лабораторія & автоматизація", items: ["Linux Server", "Home Assistant", "Zigbee2MQTT", "Frigate NVR", "Cloudflare Tunneling", "Zero-Subscription IoT", "Docker"] },
    ],
    skillLangsTitle: "Мови & UI дизайн",
    skillLangs: [
      { lang: "Українська", level: "Рідна мова" },
      { lang: "Англійська", level: "B1 (Середній рівень)" },
      { lang: "Чеська", level: "Студент у Брно" },
    ],
    skillDesignItems: ["Figma", "UI/UX Дизайн", "Адаптивні сайти"],

    eduTitle: "Освіта & підтверджені сертифікати",
    eduDesc: "Академічний шлях та галузеві кваліфікації.",
    schools: [
      { period: "2026 — Теперішній час", badge: "1-й курс", name: "VUT Brno — FEKT", desc: "Телекомунікаційні та інформаційні системи", sub: "1-й курс · Телекомунікаційні та інформаційні системи", active: true },
      { period: "2022 — 2026", badge: "Випускник (2026)", name: "Середня школа Kyberna", desc: "Градець-Кралове, Чеська Республіка", sub: "IT середня школа, закінчена з матурою (випускник 2026)", active: false },
    ],
    certsTitle: "Офіційні сертифікати",
    certView: "Переглянути",
    certDownload: "Завантажити",

    expTitle: "Досвід & проекти",
    expDesc: "Практична веб-розробка, мережеве інженерство & власний хостинг.",
    expCards: [
      { tag: "Підтверджено в продакшні", title: "Full-Stack розробник", desc: "Створення та розгортання реальних клієнтських платформ (bowlingovyclubsv.cz, nikita-box.cz) на Next.js, Node.js та сучасній архітектурі." },
      { tag: "Клієнтські рішення", title: "Frontend & UI спеціаліст", desc: "Розробка інтерактивних комерційних сайтів (luxury-cleaning-solutions.ca, honzapokusil.cz) з онлайн-калькуляторами та плавними анімаціями." },
      { tag: "Розумний дім & IoT", title: "Бюджетна автоматизація дому", desc: "Проектування локального розумного дому з Home Assistant, Zigbee2MQTT та Frigate AI. Без хмарних платежів, 100% приватність та доступ через Cloudflare тунель." },
      { tag: "Мережеве інженерство", title: "MikroTik VPN & VLAN", desc: "Site-to-site зашифрований тунель між двома MikroTik роутерами. Динамічна ізоляція мережевого трафіку у CZ та UA VLAN." },
    ],
    expEmail: "romanroskanuk74@gmail.com",
    expPhone: "+420 605 447 445",

    // ── SERVICES ────────────────────────────────────────────────────────────
    servicesTag: "Основні компетенції",
    servicesTitle: ["Що я ", "роблю & будую"],
    servicesDesc: "Мультидисциплінарний IT спеціаліст — від корпоративної мережевої архітектури та Linux інфраструктури до автоматизації розумного дому та продакшн веб-застосунків.",
    services: [
      { num: "01", title: "Мережеве інженерство", subtitle: "MikroTik · CCNA · VPN · VLAN", description: "Корпоративні мережі з MikroTik роутерами. Site-to-site зашифрована VPN між двома MikroTik пристроями, подвійна VLAN сегментація (CZ & UA), управління DHCP/DNS та CCNA-сертифіковані основи.", highlights: ["MikroTik RouterOS", "Site-to-Site VPN", "CZ / UA VLANs", "CCNA Certified", "DNS & DHCP"] },
      { num: "02", title: "Linux системи & DevOps", subtitle: "Self-hosted · Cloudflare · Docker", description: "Власноруч налаштований домашній Linux сервер під продакшн навантаженням 24/7. Безпечний zero-trust доступ через Cloudflare Tunneling — без відкритих портів. Оркестрація контейнерів за допомогою Docker.", highlights: ["Linux Administration", "Cloudflare Tunnels", "Docker Compose", "SSH Hardening", "Frigate NVR AI"] },
      { num: "03", title: "Автоматизація розумного дому", subtitle: "Home Assistant · Zigbee · No-Subscription", description: "Локально орієнтований розумний дім на Home Assistant та Zigbee (Zigbee2MQTT). Усуває vendor lock-in та хмарні підписки — 100% локальна автоматизаційна мережа з AI-powered Frigate камерами.", highlights: ["Home Assistant", "Zigbee2MQTT", "Frigate AI Vision", "Zero Subscriptions", "Automation Scripts"] },
      { num: "04", title: "Продакшн веб-застосунки", subtitle: "Next.js · Node.js · TypeScript", description: "Продакшн веб-застосунки для реальних клієнтів — від платформ резервацій до багатомовних спортивних клубів та комерційних послуг у Канаді. Побудовано на Next.js, React, TypeScript та SEO-оптимізованій архітектурі.", highlights: ["Next.js & React", "Node.js & REST APIs", "TypeScript", "Tailwind CSS", "SEO Optimization"] },
      { num: "05", title: "Кібербезпека & приватність", subtitle: "Zero-Trust · Hardening · Isolation", description: "Інфраструктура, спроектована з безпекою на першому місці: VLAN-ізольовані мережеві сегменти, zero-trust Cloudflare тунелі, SSH hardening, правила брандмауера та приватний локальний контроль даних.", highlights: ["Zero-Trust Networking", "VLAN Isolation", "Firewall Rules", "SSH Key Auth", "Private Data Control"] },
      { num: "06", title: "UI / UX & Клієнтські проекти", subtitle: "Figma · Responsive · International", description: "Комплексні веб-рішення від Figma wireframes до розгорнутих продакшн середовищ — для клієнтів у Чехії, Канаді та Україні. Акцент на чистий дизайн, швидкість та конверсійні макети.", highlights: ["Figma Design", "Responsive UI", "Multilingual (CZ/UA/EN)", "Performance Tuning", "Client Collaboration"] },
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
    footerDesc: "Різносторонній IT спеціаліст · Мережі · Linux · Розумний дім · Веб — VUT FEKT Brno, 1-й курс",
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
