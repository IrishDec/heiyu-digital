"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Why Custom Code", href: "#why-us" },
  { label: "HeiyuBudget", href: "/heiyubudget" },
  { label: "Quiz Platform", href: "/engagement" },
  { label: "MVP", href: "/mvp" },
  { label: "Contact", href: "/contact" },
];

export default function HomeMobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="home-mobile-menu"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/20"
      >
        <span className="h-0.5 w-5 bg-white" />
        <span className="h-0.5 w-5 bg-white" />
        <span className="h-0.5 w-5 bg-white" />
      </button>

      {open && (
        <div
          id="home-mobile-menu"
          className="absolute right-0 top-full z-50 mt-3 flex w-64 flex-col rounded-xl border border-white/10 bg-zinc-900 p-3 shadow-2xl"
        >
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-zinc-200 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
