import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090b] text-white px-4 text-center">
      <h1 className="text-6xl font-extrabold text-amber-400 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Stránka nebyla nalezena</h2>
      <p className="text-sm text-zinc-400 mb-6 max-w-md">
        Požadovaná stránka neexistuje nebo byla přesunuta.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition-colors shadow-gold-sm"
      >
        Zpět na hlavní stránku
      </Link>
    </div>
  );
}
