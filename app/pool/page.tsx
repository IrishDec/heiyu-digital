import Link from "next/link";

export default function PoolPage() {
  return (
    <main className="min-h-screen bg-[#07140f] px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Heiyu Digital Game Lab
        </p>

        <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
          Heiyu Pool
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
          A browser-based pool game for Smart TVs, controlled from your phone.
        </p>

        <div className="mt-10 grid w-full max-w-xl gap-4 sm:grid-cols-2">
          <Link
            href="/pool/tv"
            className="rounded-2xl bg-emerald-400 px-6 py-5 text-lg font-bold text-[#07140f] shadow-lg transition hover:bg-emerald-300"
          >
            Open TV Room
          </Link>

          <Link
            href="/pool/controller"
            className="rounded-2xl border border-white/15 bg-white/10 px-6 py-5 text-lg font-bold text-white transition hover:bg-white/15"
          >
            Phone Controller
          </Link>
        </div>
      </section>
    </main>
  );
}