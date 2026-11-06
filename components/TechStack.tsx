"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function TechStack() {
  const { t } = useLanguage();
  const categories = [
    {
      label: "Networks & Infra",
      color: "text-amber-400",
      tools: [
        { name: "MikroTik", logo: "/images/docker.png", text: "MikroTik" },
        { name: "Docker", logo: "/images/docker.png", text: "Docker" },
      ],
    },
    {
      label: "Web Dev",
      color: "text-violet-400",
      tools: [
        { name: "Node.js", logo: "/images/nodejs.png", text: "Node.js" },
        { name: "VS Code", logo: "/images/vscode.png", text: "VS Code" },
        { name: "Swagger", logo: "/images/swagger.png", text: "Swagger" },
        { name: "WordPress", logo: "/images/wordpress.png", text: "WP" },
      ],
    },
    {
      label: "Design",
      color: "text-rose-400",
      tools: [
        { name: "Figma", logo: "/images/figma.png", text: "Figma" },
      ],
    },
  ];

  const toolLogos = [
    { name: "Docker", logo: "/images/docker.png", width: 110, height: 32 },
    { name: "Figma", logo: "/images/figma.png", width: 85, height: 32 },
    { name: "VS Code", logo: "/images/vscode.png", width: 120, height: 32 },
    { name: "Swagger", logo: "/images/swagger.png", width: 100, height: 32 },
    { name: "Node.js", logo: "/images/nodejs.png", width: 90, height: 32 },
    { name: "WordPress", logo: "/images/wordpress.png", width: 105, height: 32 },
  ];

  const textStacks = [
    { name: "Next.js", cat: "Web" },
    { name: "C# (.NET)", cat: "Web" },
    { name: "React", cat: "Web" },
    { name: "TypeScript", cat: "Web" },
    { name: "Tailwind CSS", cat: "Web" },
    { name: "Linux", cat: "Infra" },
    { name: "MikroTik", cat: "Network" },
    { name: "Home Assistant", cat: "IoT" },
    { name: "Zigbee2MQTT", cat: "IoT" },
    { name: "Frigate NVR", cat: "IoT" },
    { name: "Cloudflare", cat: "Infra" },
    { name: "OSPF", cat: "Network" },
    { name: "VRF", cat: "Network" },
    { name: "Windows Server", cat: "Infra" },
    { name: "Active Directory", cat: "Infra" },
    { name: "VMware", cat: "Infra" },
    { name: "CCNA", cat: "Network" },
    { name: "Docker", cat: "Infra" },
    { name: "Figma", cat: "Design" },
    { name: "Node.js", cat: "Web" },
    { name: "WordPress", cat: "Web" },
  ];

  const catColor: Record<string, string> = {
    Web: "border-violet-500/30 bg-violet-500/8 text-violet-300",
    Infra: "border-sky-500/30 bg-sky-500/8 text-sky-300",
    Network: "border-amber-500/30 bg-amber-500/8 text-amber-300",
    IoT: "border-emerald-500/30 bg-emerald-500/8 text-emerald-300",
    Design: "border-rose-500/30 bg-rose-500/8 text-rose-300",
  };

  return (
    <section className="relative py-16 bg-[#09090b] border-y border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section label */}
        <h3 className="text-center text-xs font-bold tracking-widest uppercase text-zinc-400 mb-8">
          {t.techLabel}
        </h3>

        {/* Logo strip */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-9 mb-10">
          {toolLogos.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="px-4 py-2.5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 hover:border-amber-400/40 hover:bg-zinc-900/80 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-[transform,box-shadow,border-color,opacity,filter] duration-300 transform hover:scale-105 flex items-center justify-center shadow-sm will-change-transform"
            >
              <div className="relative h-8 flex items-center justify-center">
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={tool.width}
                  height={tool.height}
                  className="max-h-8 object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tag cloud — full stack listing */}
        <div className="flex flex-wrap justify-center gap-2">
          {textStacks.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={`text-[11px] font-medium px-3 py-1 rounded-full border backdrop-blur-sm ${catColor[item.cat]}`}
            >
              {item.name}
            </motion.span>
          ))}
        </div>

      </div>
    </section>
  );
}
