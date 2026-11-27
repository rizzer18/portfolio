import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-[#efe6d8] px-4 text-center">
      <div className="border border-[#161616] px-8 sm:px-14 py-12 max-w-lg w-full space-y-5">
        <p className="font-pixel text-6xl sm:text-7xl text-[#ffa1f7] tracking-[-2px]">404</p>
        <h1 className="text-lg sm:text-xl font-semibold tracking-[-0.2px] text-[#efe6d8]">
          Stránka nebyla nalezena
        </h1>
        <p className="text-[13px] leading-[18px] text-[#efe6d8]/[0.48]">
          Požadovaná stránka neexistuje nebo byla přesunuta.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="group h-9 px-5 rounded-full bg-[#ffa1f7] text-black font-semibold text-[13.5px] inline-flex items-center transition-all"
          >
            <span>Zpět na portfolio</span>
            <span className="ml-1.5 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
