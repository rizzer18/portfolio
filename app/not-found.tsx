import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[#f5f4f1] px-4 text-center">
      <div className="rounded-2xl border border-white/[0.14] bg-[#161310]/70 backdrop-blur-xl px-8 sm:px-14 py-12 max-w-lg w-full space-y-4 shadow-[0_26px_60px_rgba(0,0,0,0.55)]">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border border-white/[0.18] bg-white/[0.05] text-[#9b968f]">
          404 · Not Found
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl tracking-[-0.025em] text-[#f5f4f1]">
          Stránka nebyla nalezena
        </h1>
        <p className="text-[14px] leading-relaxed text-[#a39e96]">
          Požadovaná stránka neexistuje nebo byla přesunuta.
        </p>
        <div className="pt-3">
          <Link
            href="/"
            className="h-10 px-5 rounded-full bg-[#f5f4f1] hover:bg-white text-[#100e0b] font-medium text-[13.5px] inline-flex items-center gap-2 transition-colors"
          >
            <span>Zpět na hlavní stránku</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
