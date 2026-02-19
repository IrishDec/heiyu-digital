"use client";

import { useEffect, useState } from "react";


const [mobileOpen, setMobileOpen] = useState(false);


export default function EngagementPage() {

useEffect(() => {
  if (typeof window !== "undefined") {
    // @ts-ignore
    if (window.gtag) {
      // @ts-ignore
      window.gtag("config", "G-JHMBLK5970", {
        page_path: "/engagement",
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


    <main className="min-h-screen bg-black text-white pt-32">

<div className="max-w-6xl mx-auto px-6">

     

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Deploy Branded AI Quiz Experiences Anywhere
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Launch interactive quiz systems for events, classrooms, corporate training
          or marketing campaigns. Fully branded. Instantly playable.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a
            href="https://www.heiyuquiz.com/"
            target="_blank"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition"
          >
            Try Live Demo
          </a>
        </div>

   {/* Pricing Section */}
<div className="mt-32 text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
    Flexible Deployment Options
  </h2>
  <p className="text-gray-400 max-w-2xl mx-auto mb-16">
    Choose between short-term event licenses or ongoing branded
    infrastructure for organisations.
  </p>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

  <div className="bg-zinc-900 border border-gray-800 rounded-2xl overflow-hidden transition hover:border-purple-600 flex flex-col">


  <div className="px-8 py-6 border-b border-gray-800">
    <h3 className="text-2xl font-semibold">Event License</h3>
  </div>

  <div className="px-8 py-6 border-b border-gray-800">
    <p className="text-3xl font-bold">From €350</p>
  </div>

  <div className="px-8 py-6 border-b border-gray-800">
    <p className="italic text-gray-400">
      Perfect for one-off workshops or conferences.
    </p>
  </div>

  <div className="px-8 py-6 space-y-4 text-gray-300">
    <div className="border-b border-gray-800 pb-4">
      • 24–72h Branded Deployment
    </div>
    <div className="border-b border-gray-800 pb-4">
      • Instant QR Code Generation
    </div>
    <div className="border-b border-gray-800 pb-4">
      • Logo Replacement
    </div>
    <div>
      • Hosted by HeiyuDigital
    </div>
  </div>

  <div className="px-8 py-6 mt-auto">

  <a
      href="/contact"
      className="block w-full text-center bg-purple-600 hover:bg-purple-500 py-3 rounded-lg font-semibold transition"
    >
      Contact Us
    </a>
</div>


</div>


       <div className="bg-zinc-900 border border-gray-800 rounded-2xl overflow-hidden transition hover:border-purple-600 flex flex-col">


  <div className="px-8 py-6 border-b border-gray-800">
    <h3 className="text-2xl font-semibold">Branded Pro</h3>
  </div>

  <div className="px-8 py-6 border-b border-gray-800">
    <p className="text-3xl font-bold">€750 / Year</p>
  </div>

  <div className="px-8 py-6 border-b border-gray-800">
    <p className="italic text-gray-400">
      Best for agencies and consistent corporate training.
    </p>
  </div>

  <div className="px-8 py-6 space-y-4 text-gray-300">
    <div className="border-b border-gray-800 pb-4">
      • Everything in Event License
    </div>
    <div className="border-b border-gray-800 pb-4">
      • Full Brand Color Matching
    </div>
    <div className="border-b border-gray-800 pb-4">
      • Custom Intro / Outro Screens
    </div>
    <div>
      • Remove All Heiyu Branding
    </div>
  </div>

<div className="px-8 py-6 mt-auto">

   <a
      href="/contact"
      className="block w-full text-center bg-purple-600 hover:bg-purple-500 py-3 rounded-lg font-semibold transition"
    >
      Contact Us
    </a>

</div>


</div>


       <div className="bg-zinc-900 border border-gray-800 rounded-2xl overflow-hidden transition hover:border-purple-600 flex flex-col">


  <div className="px-8 py-6 border-b border-gray-800">
    <h3 className="text-2xl font-semibold">Integrated Enterprise</h3>
  </div>

  <div className="px-8 py-6 border-b border-gray-800">
    <p className="text-3xl font-bold">€1,500+ / Year</p>
  </div>

  <div className="px-8 py-6 border-b border-gray-800">
    <p className="italic text-gray-400">
      Complete private infrastructure for large organisations.
    </p>
  </div>

  <div className="px-8 py-6 space-y-4 text-gray-300">
    <div className="border-b border-gray-800 pb-4">
      • Everything in Branded Pro
    </div>
    <div className="border-b border-gray-800 pb-4">
      • Custom Subdomain (e.g. quiz.yourbrand.com)
    </div>
    <div className="border-b border-gray-800 pb-4">
      • Website Embed (iFrame / JS)
    </div>
    <div>
      • Dedicated Hosting & Priority Bandwidth
    </div>
  </div>

  <div className="px-8 py-6 mt-auto">

    <a
      href="/contact"
      className="block w-full text-center bg-purple-600 hover:bg-purple-500 py-3 rounded-lg font-semibold transition"
    >
      Contact Us
    </a>
  </div>

</div>
</div>

{/* Optional Add-Ons */}
<section className="mt-28">
  <div className="max-w-7xl mx-auto px-4">

    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Optional Add-Ons
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

      <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-5 md:p-6 text-center transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">
        <h3 className="font-bold text-sm md:text-lg mb-3 tracking-tight">
         Question Packs
        </h3>
        <p className="text-gray-400 text-xs md:text-sm mb-4 leading-relaxed">
          Increase quiz length or add specialised topics.
        </p>
        <p className="font-semibold text-sm md:text-base">From €149-€249</p>
      </div>

      <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-5 md:p-6 text-center transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">
        <h3 className="font-bold text-sm md:text-lg mb-3 tracking-tight">
          Advanced Analytics
        </h3>
        <p className="text-gray-400 text-xs md:text-sm mb-4 leading-relaxed">
          Downloadable reports & participation insights.
        </p>
        <p className="font-semibold text-sm md:text-base">From €299-€499</p>
      </div>

      <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-5 md:p-6 text-center transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">
        <h3 className="font-bold text-sm md:text-lg mb-3 tracking-tight">
          On-Site Display Mode
        </h3>
        <p className="text-gray-400 text-xs md:text-sm mb-4 leading-relaxed">
          Optimised screen mode for live leaderboards.
        </p>
        <p className="font-semibold text-sm md:text-base">From €399-€599</p>
      </div>

      <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-5 md:p-6 text-center transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">
        <h3 className="font-bold text-sm md:text-lg mb-3 tracking-tight">
          Custom Integrations
        </h3>
        <p className="text-gray-400 text-xs md:text-sm mb-4 leading-relaxed">
          API connections or workflow integrations.
        </p>
        <p className="font-semibold text-sm md:text-base">Custom</p>
      </div>

    </div>
  </div>
  <div className="mt-12 text-center">
 <p className="text-gray-400 mb-6">
  Add-ons can be activated at any time after purchase.
  Contact us to customise your deployment.
</p>


  <a
    href="/contact"
    className="inline-block bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-lg font-semibold transition"
  >
    Request Add-On Upgrade
  </a>
</div>

</section>



        </div>

      </div>
      {/* Platform Section */}
<div className="mt-32 max-w-6xl mx-auto px-6 text-center">

  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    How The Platform Works
  </h2>

  <p className="text-gray-400 max-w-3xl mx-auto mb-16">
    A fast, real-time multiplayer quiz system built for live rooms,
    corporate events, classrooms and campaigns.
  </p>

  <div className="grid md:grid-cols-3 gap-10 text-left">

   <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">

      <h3 className="font-semibold text-lg mb-4">Real-Time Multiplayer</h3>
      <p className="text-gray-400 text-sm">
        Supports up to <span className="text-white font-semibold">300 concurrent players</span> in a single session.
        Everyone joins instantly via link or QR code. No app download required.
      </p>
    </div>

  <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">

      <h3 className="font-semibold text-lg mb-4">Speed-Based Tie Breaker</h3>
      <p className="text-gray-400 text-sm">
        If multiple players achieve the same score,
        ranking is automatically decided by
        <span className="text-white font-semibold"> fastest completion time</span>.
        This keeps leaderboards competitive and fair.
      </p>
    </div>

   <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">

      <h3 className="font-semibold text-lg mb-4">AI-Generated or Custom</h3>
      <p className="text-gray-400 text-sm">
       Generate quizzes instantly using AI or create custom questions directly in the editor.
        Fully branded experiences for events, education or marketing.
      </p>
    </div>

  </div>
</div>
{/* Distribution Section */}
<div className="mt-24 max-w-6xl mx-auto px-6 text-center">

  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    Launch Anywhere Your Audience Is
  </h2>

  <p className="text-gray-400 max-w-3xl mx-auto mb-16">
    Share your quiz instantly across messaging apps, internal teams,
    or live rooms. No downloads required.
  </p>

  <div className="grid md:grid-cols-3 gap-10 text-left">

   <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">

      <h3 className="font-semibold text-lg mb-4">WhatsApp & Messaging Groups</h3>
      <p className="text-gray-400 text-sm">
        Drop a link into WhatsApp, Telegram or Messenger groups.
        Participants join in seconds from mobile.
      </p>
    </div>

    <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">

      <h3 className="font-semibold text-lg mb-4">Email & Newsletter Campaigns</h3>
      <p className="text-gray-400 text-sm">
        Use quizzes for lead generation, engagement campaigns
        or internal training rollouts.
      </p>
    </div>

    <div className="bg-zinc-900 border border-gray-800 rounded-2xl p-8 transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/20">
     <h3 className="font-semibold text-lg mb-4">Live Events & On-Site Screens</h3>
      <p className="text-gray-400 text-sm">
        Run real-time competitions at conferences, classrooms
        or corporate workshops with live leaderboards.
      </p>
    </div>

  </div>
</div>
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

