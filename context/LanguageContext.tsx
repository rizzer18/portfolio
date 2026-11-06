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
    heroStatus: "DevOps & IT Specialist · Sítě · Linux · Docker · CI/CD",
    heroGreeting: "Ahoj, jsem",
    heroSubtitle: "DevOps & IT Specialist",
    heroSubtitleDesc: "Sítě, Linux servery, Docker kontejnerizace & Automatizace",
    // Alternating: plain / highlighted / plain / highlighted ...
    heroDesc: [
      "Student 1. ročníku na VUT Brno FEKT se silným zaměřením na DevOps, správu systémů a síťovou architekturu. Spravuji ",
      "Linux servery a Docker kontejnery",
      " s Cloudflare Zero-Trust tunely, konfiguruji robustní ",
      "MikroTik sítě",
      " (Site-to-Site VPN, OSPF, duální CZ/UA VLANy) a každoročně zajišťuji ",
      "IT Support a infrastrukturu na mezinárodní IT konferenci ISSS",
      ". Propojuji infrastrukturu s moderním webovým vývojem (Next.js).",
    ],
    heroCvBtn: "Zobrazit / Stáhnout CV",
    heroCompBtn: "Zobrazit kompetence",
    heroPills: [
      { label: "🚀 DevOps & Docker kontejnerizace", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "🐧 Linux Server & Cloudflare Tunnely", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
      { label: "🌐 Sítě (MikroTik RouterOS & CCNA)", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "🎧 IT Support & Operations (ISSS)", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
      { label: "⚡ C# (.NET, OOP & Reflexe)", color: "border-violet-500/30 bg-violet-500/10 text-violet-300" },
      { label: "💻 Next.js & Full-Stack Web", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
    ],
    heroInfraTitle: "Infrastruktura & Provoz",
    heroInfraStatus: "Vše online & stabilní",
    heroInfraRows: [
      { label: "🐧 Linux Server", value: "Cloudflare Zero-Trust" },
      { label: "🌐 MikroTik VPN", value: "Site-to-Site (CZ/UA)" },
      { label: "🏠 Home Services (HA)", value: "24/7 Správa & Dohled" },
      { label: "🚀 Production Web", value: "4 klientské weby" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
    aboutTag: "O mně",
    aboutTitle: "DevOps & IT Specialist",
    aboutTitleAccent: "& Infrastructure Engineer",
    aboutPhotoName: "Roman Roshkanyuk",
    aboutPhotoBadge: "VUT FEKT · 1. ročník",
    // Alternating plain / highlighted
    aboutBio1: [
      "Jsem ",
      "Roman Roshkanyuk",
      " — DevOps & IT Specialist a student 1. ročníku na ",
      "VUT Brno (FEKT — Telekomunikační a informační systémy)",
      ", absolvent Střední školy Kyberna v Hradci Králové (2026). Zaměřuji se na spolehlivou systémovou a síťovou infrastrukturu, kontejnerizaci (Docker), automatizaci, programování v C# (.NET) a rychlý troubleshooting v reálném provozu.",
    ],
    aboutBio2: [
      "Kombinuji technickou hloubku a operační spolehlivost: od ",
      "každoročního technického zajištění (IT Support) prestižní konference ISSS",
      ", kam mě škola stabilně deleguje díky vysoké zodpovědnosti, pohotové komunikaci a bleskovému řešení incidentů, přes správu ",
      "Linux serverů, MikroTik sítí a Docker kontejnerů",
      ", až po vývoj softwaru: vedle moderního webového vývoje (Next.js) ovládám ",
      "C# do hloubky — od pokročilého OOP, návrhových vzorů až po reflexi (System.Reflection)",
      " a nízkoúrovňové koncepty.",
    ],
    aboutStats: [
      { number: "4+", label: "Komerční produkční projekty" },
      { number: "6", label: "Cisco & IT certifikátů" },
      { number: "3+", label: "Roky praxe na konferenci ISSS & v IT" },
    ],
    aboutDomains: [
      { label: "DevOps & Docker", desc: "Linux · Docker Compose · Cloudflare Zero-Trust", tag: "System Admin" },
      { label: "Síťový inženýr", desc: "MikroTik VPN · OSPF · CCNA · VLANs", tag: "CCNA Certified" },
      { label: "IT Support & Operations", desc: "Konference ISSS · Troubleshooting · Hardware & OS", tag: "ISSS 2024+" },
      { label: "C# (.NET) & Web Dev", desc: "C# (OOP až reflexe) · Next.js · TypeScript", tag: "C# / Full-Stack" },
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
      { title: "Home Server & Infrastructure Support", category: "Správa domácích služeb & infrastruktury", description: "Komplexní správa a provoz domácího serverového ekosystému s nepřetržitým dohledem. Linux server s Home Assistant, podpora síťového hardwaru, Frigate kamerový systém přes Cloudflare Zero-Trust a MikroTik site-to-site VPN s duálními VLAN." },
    ],

    // ── TABS ────────────────────────────────────────────────────────────────
    tabsTag: "Kvalifikace & rozvoj",
    tabsTitleParts: ["dovednosti", "vzdělání", "zkušenosti"],
    tabsTitlePrefix: "Moje",
    tabsTitleConjunction: "a",
    tabLabels: ["Dovednosti", "Vzdělání & Certifikáty", "Zkušenosti"],
    userBadgeName: "Roman Roshkanyuk",
    userBadgeRole: "DevOps & IT Specialist",

    skillsTitle: "Technické znalosti",
    skillsDesc: "DevOps nástroje, Linux servery, síťové inženýrství, C# (.NET) vývoj & moderní web.",
    skillCats: [
      { title: "C# (.NET) & Backend", items: ["C#", ".NET Core", "Pokročilé OOP", "System.Reflection (Reflexe)", "Generics & LINQ", "Design Patterns", "Asynchronní programování", "REST API"] },
      { title: "DevOps, Docker & Linux", items: ["Linux Server (Ubuntu/Debian)", "Docker", "Docker Compose", "Cloudflare Tunnels", "Bash Scripting", "SSH Hardening", "Reverse Proxy", "CI/CD základy"] },
      { title: "Sítě & Infrastruktura (CCNA)", items: ["Cisco CCNA", "MikroTik RouterOS", "OSPF Routing", "VRF", "Site-to-Site VPN", "CZ & UA VLANs", "DNS / DHCP Server", "NAT / Firewall", "Wireshark"] },
      { title: "Webový vývoj & Frontend", items: ["Next.js 15", "React 19", "Node.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3", "Git / GitHub"] },
      { title: "IT Support & Systémy (ISSS / Kyberna)", items: ["IT Support & Operations", "Správa domácích služeb & HA", "Windows Server", "Active Directory", "GPO", "VMware Workstation", "Hardwarová diagnostika", "Troubleshooting"] },
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

    expTitle: "Pracovní zkušenosti & IT projekty",
    expDesc: "DevOps & IT Specialist | 2023 — Současnost | Infrastruktura, podpora & klientský vývoj",
    expCards: [
      { tag: "Brigáda · 2024—současnost (každoročně)", title: "IT Support Specialist — Konference ISSS", desc: "Pravidelně vybírán školou Kyberna pro technické zajištění mezinárodní IT konference ISSS v Hradci Králové díky spolehlivosti, výborné komunikaci a schopnosti okamžitě diagnostikovat a vyřešit síťové i hardwarové problémy." },
      { tag: "Infrastruktura & DevOps · 2023—současnost", title: "Linux SysAdmin & Síťový inženýr", desc: "Správa produkčního Linux serveru s Docker kontejnerizací, zabezpečení přes Cloudflare Zero-Trust tunely bez otevřených portů, konfigurace MikroTik site-to-site VPN s duálními CZ/UA VLANy a dynamickým směrováním." },
      { tag: "Freelance vývoj · 2023—současnost", title: "Web & Systems Engineer — 4 komerční projekty", desc: "Kompletní architektura, vývoj a deployment webových platforem na Next.js, Node.js a TypeScript pro klienty v ČR a Kanadě (bowlingovyclubsv.cz, nikita-box.cz, luxury-cleaning-solutions.ca, honzapokusil.cz)." },
    ],
    expEmail: "romanroskanuk74@gmail.com",
    expPhone: "+420 605 447 445",

    // ── SERVICES ────────────────────────────────────────────────────────────
    servicesTag: "Kompetence",
    servicesTitle: ["Co ", "dělám & zajišťuji"],
    servicesDesc: "Od síťové architektury a Linux infrastruktury přes komplexní IT Support a správu domácích serverů až po produkční webové aplikace.",
    services: [
      { num: "01", title: "Síťové inženýrství", subtitle: "MikroTik · CCNA · OSPF · VRF · VPN · VLAN", description: "Konfigurace MikroTik routerů: dynamické směrování OSPF, VRF segmentace, site-to-site šifrovaná VPN mezi dvěma zařízeními, duální VLAN (CZ & UA), správa DHCP/DNS a NAT. Teoretický i praktický základ z Cisco CCNA kurzů.", highlights: ["MikroTik RouterOS", "OSPF Routing", "VRF Isolation", "Site-to-Site VPN", "CZ / UA VLANs", "CCNA Certified", "DNS & DHCP"] },
      { num: "02", title: "Linux systémy & DevOps", subtitle: "Self-hosted · Cloudflare · Docker", description: "Vlastnoručně nakonfigurovaný produkční Linux server běžící 24/7. Bezpečný vzdálený přístup přes Cloudflare Tunneling — žádné otevřené porty. Kontejnerizace služeb pomocí Docker Compose.", highlights: ["Linux Administration", "Cloudflare Tunnels", "Docker Compose", "SSH Hardening", "Frigate NVR AI"] },
      { num: "03", title: "IT Support & Správa systémů", subtitle: "ISSS Support · Home Assistant · Dohled 24/7", description: "Komplexní technická podpora (IT Support) a 24/7 správa domácích serverových služeb. Zajištění nepřetržitého provozu ekosystému Home Assistant, Zigbee mesh sítě, kamerového dohledu, diagnostika hardwaru a pohotový troubleshooting.", highlights: ["IT Support & Operations", "Home Assistant Správa", "Hardwarový servis", "Incident Resolution", "Zero Downtime"] },
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
    footerDesc: "DevOps & IT Specialist · Linux · Docker · Sítě · IT Support ISSS · VUT FEKT Brno",
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
    heroStatus: "DevOps & IT Specialist · Мережі · Linux · Docker · CI/CD",
    heroGreeting: "Привіт, я",
    heroSubtitle: "DevOps & IT Specialist",
    heroSubtitleDesc: "Мережі, Linux сервери, Docker контейнеризація & IT Operations",
    heroDesc: [
      "Студент 1-го курсу VUT Brno FEKT з глибоким фокусом на DevOps, системне адміністрування та мережеву інфраструктуру. Адмініструю ",
      "Linux сервери та Docker контейнери",
      " з тунелями Cloudflare Zero-Trust, проєктую відмовостійкі ",
      "MikroTik мережі",
      " (Site-to-Site VPN, OSPF, ізольовані CZ/UA VLAN), а також щороку забезпечую ",
      "IT Support інфраструктури на конференції ISSS",
      ". Поєдную системну надійність із сучасною веб-розробкою (Next.js).",
    ],
    heroCvBtn: "Переглянути / Завантажити CV",
    heroCompBtn: "Переглянути компетенції",
    heroPills: [
      { label: "🚀 DevOps & Docker контейнеризація", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "🐧 Linux Server & Cloudflare Tunnels", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
      { label: "🌐 Мережі (MikroTik & CCNA)", color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "🎧 IT Support & Operations (ISSS)", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
      { label: "⚡ C# (.NET, ООП & Рефлексія)", color: "border-violet-500/30 bg-violet-500/10 text-violet-300" },
      { label: "💻 Next.js & Full-Stack Web", color: "border-zinc-700 bg-zinc-900/60 text-zinc-200" },
    ],
    heroInfraTitle: "Інфраструктура & Підтримка",
    heroInfraStatus: "Все онлайн & стабільно",
    heroInfraRows: [
      { label: "🐧 Linux Сервер", value: "Cloudflare Zero-Trust" },
      { label: "🌐 MikroTik VPN", value: "Site-to-Site (CZ/UA)" },
      { label: "🏠 Home Services (HA)", value: "24/7 Підтримка & Uptime" },
      { label: "🚀 Веб продакшн", value: "4 клієнтські сайти" },
    ],

    // ── ABOUT ───────────────────────────────────────────────────────────────
    aboutTag: "Про мене",
    aboutTitle: "DevOps & IT Specialist",
    aboutTitleAccent: "& Infrastructure Engineer",
    aboutPhotoName: "Roman Roshkanyuk",
    aboutPhotoBadge: "VUT FEKT · 1-й курс",
    aboutBio1: [
      "Я ",
      "Roman Roshkanyuk",
      " — DevOps & IT Specialist та студент 1-го курсу ",
      "VUT Brno (FEKT — Телекомунікаційні та інформаційні системи)",
      ", випускник IT школи Kyberna в Градець-Кралові (2026). Мій профіль — це надійна системна і мережева інфраструктура, контейнеризація (Docker), системна автоматизація, програмування на C# (.NET) та швидкий troubleshooting у критичних умовах.",
    ],
    aboutBio2: [
      "Поєдную високу інженерну підготовку з бездоганною операційною надійністю: від ",
      "щорічної роботи на посаді IT Support на міжнародній конференції ISSS",
      ", куди мене незмінно відбирала школа завдяки відповідальності, відмінній комунікації, глибокому технічному розумінню та вмінню миттєво розв'язувати проблеми, через адміністрування ",
      "Linux серверів, MikroTik VPN та Docker контейнерів",
      ", до глибоких знань розробки: крім Next.js і TypeScript, я ",
      "досконало знаю C# — від фундаментального ООП, патернів проєктування до рефлексії (System.Reflection)",
      ", дженериків та низькорівневих аспектів платформи .NET.",
    ],
    aboutStats: [
      { number: "4+", label: "Комерційні продакшн-проєкти" },
      { number: "6", label: "Cisco & IT сертифікатів" },
      { number: "3+", label: "Роки досвіду на ISSS & в IT" },
    ],
    aboutDomains: [
      { label: "DevOps & Docker", desc: "Linux · Docker Compose · Cloudflare Zero-Trust", tag: "System Admin" },
      { label: "Мережевий інженер", desc: "MikroTik VPN · OSPF · CCNA · VLANs", tag: "CCNA Certified" },
      { label: "IT Support & Operations", desc: "Конференція ISSS · Troubleshooting · Hardware & OS", tag: "ISSS 2024+" },
      { label: "C# (.NET) & Web Dev", desc: "C# (ООП до рефлексії) · Next.js · TypeScript", tag: "C# / Full-Stack" },
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
      { title: "Home Server & Infrastructure Support", category: "Супровід домашніх сервісів & інфраструктури", description: "Повний технічний супровід домашнього серверного комплексу та підтримка сервісів. Linux сервер із Home Assistant, безперебійна робота мережі, безпечне відеоспостереження через Cloudflare Zero-Trust та MikroTik site-to-site VPN." },
    ],

    // ── TABS ────────────────────────────────────────────────────────────────
    tabsTag: "Кваліфікація & розвиток",
    tabsTitleParts: ["навички", "освіта", "досвід"],
    tabsTitlePrefix: "Мої",
    tabsTitleConjunction: "та",
    tabLabels: ["Навички", "Освіта & Сертифікати", "Досвід"],
    userBadgeName: "Roman Roshkanyuk",
    userBadgeRole: "DevOps & IT Specialist",

    skillsTitle: "Технічні знання",
    skillsDesc: "DevOps інструменти, Linux сервери, мережева інженерія, C# (.NET) розробка & сучасний веб.",
    skillCats: [
      { title: "C# (.NET) & Backend", items: ["C#", ".NET Core", "Поглиблене ООП", "System.Reflection (Рефлексія)", "Generics & LINQ", "Design Patterns", "Асинхронне програмування", "REST API"] },
      { title: "DevOps, Docker & Linux", items: ["Linux Server (Ubuntu/Debian)", "Docker", "Docker Compose", "Cloudflare Tunnels", "Bash Scripting", "SSH Hardening", "Reverse Proxy", "Основи CI/CD"] },
      { title: "Мережі & Інфраструктура (CCNA)", items: ["Cisco CCNA", "MikroTik RouterOS", "OSPF Routing", "VRF", "Site-to-Site VPN", "CZ & UA VLANs", "DNS / DHCP Server", "NAT / Firewall", "Wireshark"] },
      { title: "Веб-розробка & Frontend", items: ["Next.js 15", "React 19", "Node.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3", "Git / GitHub"] },
      { title: "IT Support & Системи (ISSS / Kyberna)", items: ["IT Support & Operations", "Супровід сервісів & Home Assistant", "Windows Server", "Active Directory", "GPO", "VMware Workstation", "Діагностика заліза", "Troubleshooting"] },
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

    expTitle: "Досвід роботи & IT проєкти",
    expDesc: "DevOps & IT Specialist | 2023 — Теперішній час | Інфраструктура, підтримка та клієнтський розвиток",
    expCards: [
      { tag: "Бригада · 2024—теперішній час (щороку)", title: "IT Support Specialist — IT Конференція ISSS", desc: "Постійно обирався школою Kyberna для технічного забезпечення міжнародної IT конференції ISSS у Градець-Кралове завдяки відповідальності, комунікабельності, глибоким технічним навичкам та здатності блискавично вирішувати будь-які проблеми з мережею чи обладнанням." },
      { tag: "Інфраструктура & DevOps · 2023—теперішній час", title: "Linux SysAdmin & Мережевий інженер", desc: "Адміністрування продакшн Linux сервера з Docker контейнеризацією, захист через Cloudflare Zero-Trust тунелі без відкритих портів, конфігурація MikroTik site-to-site VPN з подвійними CZ/UA VLAN та динамічною маршрутизацією." },
      { tag: "Freelance розробка · 2023—теперішній час", title: "Web & Systems Engineer — 4 комерційні проєкти", desc: "Архітектура, розробка та деплой під ключ веб-платформ на Next.js, Node.js та TypeScript для клієнтів у Чехії та Канаді (bowlingovyclubsv.cz, nikita-box.cz, luxury-cleaning-solutions.ca, honzapokusil.cz)." },
    ],
    expEmail: "romanroskanuk74@gmail.com",
    expPhone: "+420 605 447 445",

    // ── SERVICES ────────────────────────────────────────────────────────────
    servicesTag: "Компетенції",
    servicesTitle: ["Що я ", "роблю & забезпечую"],
    servicesDesc: "Від мережевої архітектури та Linux інфраструктури через комплексний IT Support і супровід домашніх сервісів до веб-застосунків для реальних клієнтів.",
    services: [
      { num: "01", title: "Мережеве інженерство", subtitle: "MikroTik · CCNA · OSPF · VRF · VPN · VLAN", description: "Конфігурація MikroTik роутерів: динамічна маршрутизація OSPF, ізоляція VRF, site-to-site шифрований VPN між двома точками, подвійна VLAN (CZ & UA), керування DHCP/DNS та NAT. Практична та теоретична база Cisco CCNA.", highlights: ["MikroTik RouterOS", "OSPF Routing", "VRF Isolation", "Site-to-Site VPN", "CZ / UA VLANs", "CCNA Certified", "DNS & DHCP"] },
      { num: "02", title: "Linux системи & DevOps", subtitle: "Self-hosted · Cloudflare · Docker", description: "Власноруч налаштований домашній Linux сервер 24/7. Безпечний віддалений доступ через Cloudflare Tunneling — без відкритих портів. Контейнеризація за допомогою Docker Compose.", highlights: ["Linux Administration", "Cloudflare Tunnels", "Docker Compose", "SSH Hardening", "Frigate NVR AI"] },
      { num: "03", title: "IT Support & Супровід систем", subtitle: "ISSS Support · Home Assistant · 24/7 Uptime", description: "Комплексна технічна підтримка (IT Support) та цілодобовий супровід домашнього серверного комплексу. Безперебійна робота Home Assistant, стабільність мережі, відеоспостереження, діагностика заліза та швидкий troubleshooting.", highlights: ["IT Support & Operations", "Супровід Home Assistant", "Апаратна підтримка", "Incident Resolution", "100% Uptime"] },
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
    footerDesc: "DevOps & IT Specialist · Linux · Docker · Мережі · IT Support ISSS · VUT FEKT Brno",
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
