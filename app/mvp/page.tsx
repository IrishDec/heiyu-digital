"use client";

import { useEffect, useState } from "react";

export default function MVPPage() {

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      if (window.gtag) {
        // @ts-ignore
        window.gtag("config", "G-JHMBLK5970", {
          page_path: "/mvp",
        });
      }
    }
  }, []);


  return (
    <>
     {/* NAV */}
<nav className="fixed top-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/5">
  <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

    {/* Logo */}
    <a href="/" className="text-xl font-bold tracking-tighter text-white">
      HEIYU<span className="text-indigo-500">DIGITAL</span>
    </a>

    {/* Desktop Menu */}
    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 items-center">
      <a href="/" className="hover:text-white transition">Home</a>
      <a href="/engagement" className="hover:text-white transition">Engagement</a>
      <a href="/mvp" className="hover:text-white transition">MVP</a>
      <a href="/contact" className="hover:text-white transition">Contact</a>
    </div>

    {/* Mobile Burger */}
    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="md:hidden flex flex-col gap-1"
    >
      <span className="w-6 h-[2px] bg-white"></span>
      <span className="w-6 h-[2px] bg-white"></span>
      <span className="w-6 h-[2px] bg-white"></span>
    </button>
  </div>

  {/* Mobile Menu */}
  {mobileOpen && (
    <div className="md:hidden bg-[#0a0a0a] border-t border-white/5 px-6 py-6 flex flex-col gap-6 text-gray-300 text-lg">
      <a href="/" onClick={() => setMobileOpen(false)} className="hover:text-white transition">Home</a>
      <a href="/engagement" onClick={() => setMobileOpen(false)} className="hover:text-white transition">Engagement</a>
      <a href="/mvp" onClick={() => setMobileOpen(false)} className="hover:text-white transition">MVP</a>
      <a href="/contact" onClick={() => setMobileOpen(false)} className="hover:text-white transition">Contact</a>
    </div>
  )}
</nav>


      {/* PAGE */}
      <main className="bg-[#050505] text-white pt-32 pb-24">

        {/* HERO */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Launch Your MVP in 4–8 Weeks

          </h1>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            From idea to working product built lean, fast, and ready for real users.
            No bloated builds. No wasted months.
          </p>
        </section>

        {/* WHAT IS MVP */}
        <section className="max-w-4xl mx-auto px-6 mt-28 text-center">
          <h2 className="text-2xl font-semibold">What Is an MVP?</h2>
          <p className="mt-6 text-gray-400 leading-relaxed">
            A Minimum Viable Product is the fastest version of your idea that real users can test.
            It validates demand before you invest heavily.
          </p>
        </section>

        {/* PROCESS */}
        <section id="process" className="max-w-5xl mx-auto px-6 mt-28">
          <h2 className="text-2xl font-semibold text-center mb-12">Build Timeline</h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="font-semibold text-indigo-500">Week 1</h3>
              <p className="mt-3 text-gray-400 text-sm">Scope & Architecture</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="font-semibold text-indigo-500">Weeks 2–4</h3>
              <p className="mt-3 text-gray-400 text-sm">Core Feature Build</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="font-semibold text-indigo-500">Weeks 5–6</h3>
              <p className="mt-3 text-gray-400 text-sm">Auth, Payments, Polish</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="font-semibold text-indigo-500">Weeks 7–8</h3>
              <p className="mt-3 text-gray-400 text-sm">Testing & Launch</p>
            </div>
          </div>
        </section>


        {/* PRICING */}
<section className="max-w-5xl mx-auto px-6 mt-28">
  <h2 className="text-2xl font-semibold text-center mb-12">Investment</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Sprint */}
   <div className="bg-white/5 p-8 rounded-xl border border-white/5 
                transition-all duration-300 
                hover:border-indigo-500/40 
                hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] 
                hover:-translate-y-1">

      <h3 className="text-xl font-semibold text-white">MVP Sprint</h3>
      <p className="text-indigo-500 mt-2 text-lg font-semibold">€5,000 · 4 Weeks</p>

      <ul className="mt-6 space-y-3 text-gray-400 text-sm">
        <li>• Single core feature build</li>
        <li>• Production-ready deployment</li>
        <li>• Clean UI + mobile-first</li>
        <li>• Lean, focused execution</li>
      </ul>

      <a
        href="/contact"
        className="block w-full md:w-auto mt-8 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold text-sm"

      >
        Apply for Sprint
      </a>
    </div>

    {/* Full MVP */}
   <div className="bg-white/5 p-8 rounded-xl border border-white/5 
                transition-all duration-300 
                hover:border-indigo-500/40 
                hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] 
                hover:-translate-y-1">

      <h3 className="text-xl font-semibold text-white">Full MVP Build</h3>
      <p className="text-indigo-500 mt-2 text-lg font-semibold">From €8,000 · 8 Weeks</p>

      <ul className="mt-6 space-y-3 text-gray-400 text-sm">
        <li>• Core feature build</li>
        <li>• Auth + payments</li>
        <li>• Admin dashboard</li>
        <li>• Launch support</li>
      </ul>

      <a
        href="/contact"
       className="block w-full md:w-auto mt-8 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold text-sm"

      >
        Start Full Build
      </a>
    </div>

  </div>
</section>
{/* FOOTER */}
<footer className="mt-28 border-t border-white/5">
  <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
    
    <div>
      © {new Date().getFullYear()} HEIYU<span className="text-indigo-500">DIGITAL</span>
    </div>

    <div className="flex gap-6">
      <a href="/" className="hover:text-white transition">Home</a>
      <a href="/engagement" className="hover:text-white transition">Engagement</a>
      <a href="/mvp" className="hover:text-white transition">MVP</a>
      <a href="/contact" className="hover:text-white transition">Contact</a>
    </div>

  </div>
</footer>


      </main>
    </>
  );
}
