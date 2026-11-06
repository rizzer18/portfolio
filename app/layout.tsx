import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Roman Roshkanyuk | DevOps & IT Specialist, Systémy & Webový inženýr",
  description:
    "Portfolio Romana Roshkanyuka — DevOps & IT Specialist & systémový architekt. Specializace na síťové inženýrství (MikroTik), správu Linuxu, Docker kontejnerizaci, úsporné automatizace a moderní webové aplikace.",
  icons: {
    icon: "/images/star1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`dark ${inter.variable}`}>
      <body className="bg-[#09090b] text-white min-h-screen antialiased selection:bg-amber-400 selection:text-black font-[var(--font-inter)]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
