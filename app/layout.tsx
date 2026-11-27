import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  JetBrains_Mono,
  Pixelify_Sans,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Roman Roshkanyuk | DevOps, Network & Software Engineer",
  description:
    "Portfolio Romana Roshkanyuka — DevOps, síťová infrastruktura (MikroTik / Cisco CCNA), Linux & Docker CI/CD, C# (.NET) a moderní webové systémy v Next.js.",
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
    <html
      lang="cs"
      className={`dark ${geist.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} ${pixelify.variable}`}
    >
      <body className="bg-black text-[#efe6d8] min-h-screen antialiased selection:bg-[#ffa1f7] selection:text-black font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
