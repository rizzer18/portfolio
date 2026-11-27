import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center text-[#ededf0] px-4 text-center">
      <div className="rounded-2xl border border-[#1d1d26] bg-[#0b0b0f] px-8 sm:px-14 py-12 max-w-lg w-full space-y-4 shadow-2xl">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border border-[#242430] bg-[#111117] text-[#8e8e9a]">
          404 · Not Found
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl tracking-[-0.025em] text-[#ededf0]">
          Stránka nebyla nalezena
        </h1>
        <p className="text-[14px] leading-relaxed text-[#8e8e9a]">
          Požadovaná stránka neexistuje nebo byla přesunuta.
        </p>
        <div className="pt-3">
          <Link
            href="/"
            className="h-10 px-5 rounded-full bg-[#171720] hover:bg-[#22222f] border border-[#2c2c3c] text-[#ededf0] font-medium text-[13.5px] inline-flex items-center gap-2 transition-colors"
          >
            <span>Zpět na hlavní stránku</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
