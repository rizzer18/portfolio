import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

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

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-serif",
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
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${sourceSerif.variable}`}
    >
      <body className="bg-[#070709] text-[#ededf0] min-h-screen antialiased selection:bg-[#272732] selection:text-white font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
