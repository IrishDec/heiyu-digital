"use client";

import Link from "next/link";
import { useState } from "react";

const menu = [
  { name: "Home", href: "/" },
  { name: "Our Work", href: "/#work" },
  { name: "HeiyuBudget", href: "/heiyubudget" },
  { name: "Quiz Platform", href: "/engagement" },
  { name: "MVP", href: "/mvp" },
  { name: "Contact", href: "/contact" },
];

export function CaseStudyHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 text-white border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-6">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight"
        >
          HEIYU<span className="text-indigo-400">DIGITAL</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-zinc-300 lg:flex">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold transition hover:bg-indigo-400 sm:block"
        >
          Get a Quote ↗
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="case-study-menu"
          className="flex flex-col gap-1.5 p-2 lg:hidden"
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>
      </div>

      {mobileOpen && (
        <div
          id="case-study-menu"
          className="flex flex-col gap-5 border-t border-white/10 bg-zinc-950 px-6 py-6 lg:hidden"
        >
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300 transition hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export function CaseStudyFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div className="text-center text-sm text-zinc-500 md:text-left">
          © {new Date().getFullYear()} HEIYU
          <span className="text-indigo-400">DIGITAL</span>.
          All rights reserved. Dublin, Ireland.
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/#work" className="hover:text-white">Our Work</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/privacy" className="hover:text-white">Privacy & Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
