"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CookieBanner from "./components/CookieBanner";
import ContactForm from "./components/ContactForm";
import CaseStudyModal from "./components/CaseStudyModal";

export default function Home() {
  const [budgetIndex, setBudgetIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);

  const [showContact, setShowContact] = useState(false);
  const [openBudgetCase, setOpenBudgetCase] = useState(false);
  const [openQuizCase, setOpenQuizCase] = useState(false);


  const budgetImages = [
    "/images/budgetscreen.jpg",
    "/images/budgetmenu.jpg",
    "/images/budgetgraph.jpg",
  ];

  const quizImages = [
    "/images/createquiz.jpg",
    "/images/createnewquiz.jpg",
    "/images/questions.jpg",
  ];

  const nextBudget = () =>
    setBudgetIndex((prev) => (prev + 1) % budgetImages.length);

  const nextQuiz = () =>
    setQuizIndex((prev) => (prev + 1) % quizImages.length);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 selection:text-white font-sans">
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 md:h-20 flex flex-col md:flex-row items-center justify-between">
          <div className="text-xl font-bold tracking-tighter text-white">
            HEIYU<span className="text-indigo-500">DIGITAL</span>
          </div>

          <div className="flex gap-6 md:gap-8 text-sm font-medium text-gray-400 items-center mt-3 md:mt-0">
            <a href="#work" className="hover:text-white transition">Work</a>
            <a href="#services" className="hover:text-white transition">Services</a>
            <button onClick={() => setShowContact(true)} className="hover:text-white transition">Contact</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-44 pb-12 md:pt-48 md:pb-24 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 mb-8 border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold tracking-widest uppercase">
          Full-Stack & Database Architecture
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          We Build{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Digital Engines
          </span>
          <br /> Not Just Websites.
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
          Specializing in high performance WebApps, Database Systems, and Legacy Modernization for the real world.
        </p>

        <div className="flex justify-center w-full">
          <button
            onClick={() => setShowContact(true)}
            className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* ===================== */}
      {/*    PORTFOLIO          */}
      {/* ===================== */}

      <section id="work" className="py-10 md:py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 md:mb-16 border-l-4 border-indigo-500 pl-4">
          Selected Works
        </h2>

        {/* =============================== */}
        {/*      PROJECT A — BUDGET APP    */}
        {/* =============================== */}

        <div className="bg-[#0f0f0f] rounded-3xl border border-white/10 overflow-hidden mb-20 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">

            {/* LEFT SIDE */}
            <div className="p-8 md:p-14 flex flex-col justify-center order-2 md:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-md border border-blue-500/20">FinTech</span>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-md border border-green-500/20">SaaS</span>
              </div>

              <h3 className="text-4xl font-bold mb-4 text-white">HeiyuBudget</h3>

              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
               A global tax-tracking tool built for drivers. Uses AI voice-input for instant, hands-free logging with automatic time-zone and date logic based on your phone’s location. Anyone will find this helpful!
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10 text-sm text-gray-400 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> Next.js & Supabase
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div> 
                </div>
              </div>

              <a
                href="https://heiyubudget.com"
                target="_blank"
                className="text-white font-bold border-b border-indigo-500 pb-1 self-start hover:text-indigo-400 transition"
              >
                View Live Project →
              </a>

              <button
                onClick={() => setOpenBudgetCase(true)}
                className="mt-4 text-white font-bold border-b border-indigo-500 pb-1 self-start hover:text-indigo-400 transition"
              >
                Case Study →
              </button>
            </div>

            {/* RIGHT SIDE — PHONE */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center p-10 order-1 md:order-2 border-l border-white/5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>

              <div
                onClick={nextBudget}
                className="relative w-[220px] h-[460px] md:w-[280px] md:h-[580px] bg-black rounded-[2.5rem] md:rounded-[3rem] border-8 border-[#222] shadow-2xl rotate-[-2deg] hover:rotate-0 transition duration-500 z-10 overflow-hidden cursor-pointer group"
              >
                <Image
                  src={budgetImages[budgetIndex]}
                  alt="HeiyuBudget Screens"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#222] rounded-b-xl"></div>
              </div>
            </div>

          </div>
        </div>

        {/* =============================== */}
        {/*      PROJECT B — QUIZ APP       */}
        {/* =============================== */}

        <div className="bg-[#0f0f0f] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
            <div className="bg-gradient-to-bl from-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center p-10 border-r border-white/5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>

              <div
                onClick={nextQuiz}
                className="relative w-[220px] h-[460px] md:w-[280px] md:h-[580px] bg-black rounded-[2.5rem] md:rounded-[3rem] border-8 border-[#222] shadow-2xl rotate-[2deg] hover:rotate-0 transition duration-500 z-10 overflow-hidden cursor-pointer group"
              >
                <Image
                  src={quizImages[quizIndex]}
                  alt="HeiyuQuiz Screens"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="p-8 md:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-md border border-purple-500/20">Gaming</span>
                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-md border border-orange-500/20">AdTech</span>
              </div>

              <h3 className="text-4xl font-bold mb-4 text-white">HeiyuQuiz</h3>

              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              A real-time multiplayer quiz engine built to scale. Supports thousands of players, dynamic ad-insertion, and AI-generated trivia for fast, competitive gameplay.
              </p>

              <a
                href="https://www.heiyuquiz.com/"
                target="_blank"
                className="text-white font-bold border-b border-purple-500 pb-1 self-start hover:text-purple-400 transition"
              >
                Play Now →   
              </a>
              <button
  onClick={() => setOpenQuizCase(true)}
  className="mt-4 text-white font-bold border-b border-purple-500 pb-1 self-start hover:text-purple-400 transition"
>
  Case Study →
</button>

            </div>
          </div>
        </div>
        
      </section>

      {/* =============================== */}
      {/*      CASE STUDY MODAL           */}
      {/* =============================== */}

      <CaseStudyModal
        open={openBudgetCase}
        onClose={() => setOpenBudgetCase(false)}
        title="HeiyuBudget — Case Study"
      >
        <div className="space-y-8">
          <section className="space-y-2">
            <h3 className="text-xl font-semibold">The Problem</h3>
            <p className="text-gray-300">
              Taxi drivers needed a fast, hands-free way to log income and expenses.
              Existing tools were slow and not built for real workflows.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-xl font-semibold">The Solution</h3>
            <p className="text-gray-300">
              A mobile-first budgeting tool with AI voice input,
              and smart timezone/date logic.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-xl font-semibold">Why It’s Impressive</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Initial version built in 48 hours</li>
              <li>Supabase + RLS secure data model</li>
              <li>Automatic daily/weekly/monthly rollovers</li>
            </ul>
          </section>
        </div>
      </CaseStudyModal>

<CaseStudyModal
  open={openQuizCase}
  onClose={() => setOpenQuizCase(false)}
  title="HeiyuQuiz — Case Study"
>
  <div className="space-y-8">

    <section className="space-y-2">
      <h3 className="text-xl font-semibold">The Problem</h3>
      <p className="text-gray-300">
        Existing trivia platforms were slow, predictable, and not designed to handle
        thousands of simultaneous players in real time. No dynamic question generation,
        no adaptive pacing, and no competitive feel.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-xl font-semibold">The Solution</h3>
      <p className="text-gray-300">
        A real-time multiplayer quiz engine powered by sockets, AI-generated question
        banks, auto-scoring, and a mobile-first interface fast enough for competitive play.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-xl font-semibold">Key Highlights</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        <li>Fully real-time WebSocket game loop</li>
        <li>AI-generated trivia on demand</li>
        <li>AdSense compatible with break timers</li>
        <li>Supports thousands of concurrent players</li>
        <li>Fast mobile-first UX optimised for tapping speed</li>
      </ul>
    </section>

  </div>
</CaseStudyModal>

      

      {/* SERVICES */}
      <section id="services" className="py-12 md:py-24 px-6 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl font-bold mb-4">What We Do</h2>
            <p className="text-gray-300">We don't sell hours. We deliver deployed, working software.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#111] border border-white/5">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center mb-6">🚀</div>
              <h3 className="text-xl font-bold mb-3">Custom Web Apps</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Fast, secure Next.js + Supabase applications.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111] border border-white/5">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center mb-6">🗄️</div>
              <h3 className="text-xl font-bold mb-3">Database Architecture</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Scalable SQL design with RLS, high-performance queries.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111] border border-white/5">
              <div className="w-12 h-12 bg-pink-500/10 text-pink-500 rounded-xl flex items-center justify-center mb-6">⚡</div>
              <h3 className="text-xl font-bold mb-3">Legacy Modernization</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Rebuild outdated systems with modern tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-12 md:py-24 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to build?</h2>

        <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg">
          Apps. Websites. Database fixes. We’re ready to code.
        </p>

        <button
          onClick={() => setShowContact(true)}
          className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition shadow-xl"
        >
          Get in Touch
        </button>

        <div className="mt-16 md:mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-mono">
          <span>© {new Date().getFullYear()} HeiyuDigital. All rights reserved. Dublin, Ireland.</span>
          <Link href="/privacy" className="hover:text-white underline decoration-gray-600 underline-offset-4">
            Privacy & Cookies
          </Link>
        </div>
      </footer>

      {/* CONTACT MODAL */}
      {showContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setShowContact(false)}></div>

          <div className="relative w-full max-w-md z-10">
            <ContactForm onClose={() => setShowContact(false)} />
          </div>
        </div>
      )}

      <CookieBanner />
    </main>
  );
}
