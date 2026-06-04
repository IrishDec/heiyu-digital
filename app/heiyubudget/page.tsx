"use client";

import { useState, type ReactNode } from "react";

const audience = [
  {
    title: "Tradespeople",
    text: "Keep job spend, materials and day-to-day costs easier to track.",
    icon: "🛠️",
  },
  {
    title: "Taxi drivers",
    text: "Log daily takings, fuel, washes, tolls and running costs on the move.",
    icon: "🚕",
  },
  {
    title: "Startups",
    text: "Stay lean and clear while the business is still taking shape.",
    icon: "🚀",
  },
  {
    title: "Self-employed workers",
    text: "Simple money tracking that fits independent work.",
    icon: "💼",
  },
];

const liveNow = [
  "Income tracking",
  "Expense tracking",
  "Voice or text entry",
  "History by day, week, month and year",
  "Mobile-first and easy to use",
];

const comingNext = [
  "Invoices and receipts",
  "Stock and materials",
  "Linking costs to jobs",
  "Card payment",
  "Accountant-ready records",
];

function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen bg-white text-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-32 h-[22rem] w-[22rem] rounded-full bg-indigo-100 blur-[120px]" />
        <div className="absolute -right-4 bottom-0 h-[22rem] w-[22rem] rounded-full bg-cyan-100 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_26%)]" />
      </div>
      {children}
    </main>
  );
}

function AppHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="/" className="text-xl font-bold tracking-tighter text-slate-950">
          HEIYU<span className="text-indigo-600">DIGITAL</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="/" className="transition hover:text-slate-950">
            Home
          </a>
          <a href="/heiyubudget" className="text-slate-950 transition">
            Heiyu Budget
          </a>
          <a href="/engagement" className="transition hover:text-slate-950">
            Quiz Platform
          </a>
          <a href="/mvp" className="transition hover:text-slate-950">
            MVP
          </a>
          <a href="/contact" className="transition hover:text-slate-950">
            Contact
          </a>
        </div>

        <button
          onClick={onMenu}
          className="flex flex-col gap-1 md:hidden"
          aria-label="Open menu"
          type="button"
        >
          <span className="h-[2px] w-6 bg-slate-950" />
          <span className="h-[2px] w-6 bg-slate-950" />
          <span className="h-[2px] w-6 bg-slate-950" />
        </button>
      </div>
    </nav>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {open && (
        <div className="fixed left-0 top-20 z-50 flex w-full flex-col gap-6 border-t border-slate-200 bg-white px-6 py-6 text-lg text-slate-700 shadow-xl md:hidden">
          <a href="/" onClick={onClose} className="transition hover:text-slate-950">
            Home
          </a>
          <a
            href="/heiyubudget"
            onClick={onClose}
            className="font-semibold text-slate-950 transition"
          >
            Heiyu Budget
          </a>
          <a
            href="/engagement"
            onClick={onClose}
            className="transition hover:text-slate-950"
          >
            Quiz Platform
          </a>
          <a
            href="/mvp"
            onClick={onClose}
            className="transition hover:text-slate-950"
          >
            MVP
          </a>
          <a
            href="/contact"
            onClick={onClose}
            className="transition hover:text-slate-950"
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
}

export default function HeiyuBudgetPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <PageShell>
      <AppHeader onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="relative overflow-hidden pt-20">
        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <section className="grid items-center gap-10 py-12 md:grid-cols-[minmax(0,1fr)_420px] lg:gap-14 lg:py-16">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] text-indigo-600">
                HeiyuBudget
              </p>

              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                From late-night admin to a simpler way to{" "}
                <span className="text-indigo-600">track the money.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                HeiyuBudget came from real work on the move. After years in
                construction, and later mobile work, the same problem kept
                showing up again and again: money gets made during the day, but
                the admin gets left until night.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                The first version starts with the basics that matter most: fast
                income and expense tracking by voice or text, with history by
                day, week, month and year.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                The bigger direction is simple: start with tracking, then grow
                into invoices, receipts, stock and materials, linking costs to
                jobs, card payment, and cleaner records.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                HeiyuBudget is being shaped for tradespeople, taxi drivers,
                startups and self-employed workers who need something practical,
                fast and easy to use while real work is happening.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://heiyubudget.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-lg shadow-slate-950/15 transition hover:scale-[1.02]"
                >
                  Try HeiyuBudget
                </a>
              </div>
            </div>

            <div className="w-full md:justify-self-end">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-4 shadow-2xl shadow-indigo-900/20">
                <div className="rounded-[1.5rem] bg-[#111827] p-5 text-white">
                  <div className="mb-5 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-400">
                    <span>Hey Dec 👋</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">
                      ☰
                    </span>
                  </div>

                  <div className="text-center">
                    <h2 className="text-3xl font-black">
                      Heiyu<span className="text-indigo-400">Budget</span>
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                      Fast voice or text budgeting.
                    </p>
                  </div>

                  <div className="mt-7 space-y-3">
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-4 text-center text-lg font-black">
                      🎤 Tap to Speak
                    </div>
                    <div className="rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-4 text-center text-lg font-black">
                      ✏️ Add by Text
                    </div>
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-4 text-center text-lg font-black">
                      ➕ Add / Manage Categories
                    </div>
                  </div>

                  <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black text-indigo-200">
                        Totals Summary
                      </h3>
                      <span className="text-sm text-indigo-300">View All →</span>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                      <div />
                      <div className="font-bold text-slate-300">Today</div>
                      <div className="font-bold text-slate-300">Week</div>

                      <div className="font-bold text-emerald-400">Income</div>
                      <div>€0.00</div>
                      <div>€0.00</div>

                      <div className="font-bold text-pink-400">Expense</div>
                      <div>€0.00</div>
                      <div>€0.00</div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <MiniChart
                      label="Income"
                      color="emerald"
                      values={[30, 42, 35, 48, 62]}
                    />
                    <MiniChart
                      label="Expense"
                      color="pink"
                      values={[55, 20, 28, 38, 30]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 py-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-indigo-950/5 sm:p-7">
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                Who it&apos;s for
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {audience.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-black text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FeaturePanel
                title="What’s live now"
                intro="The first version keeps it focused on what matters most."
                items={liveNow}
                color="green"
              />

              <FeaturePanel
                title="What comes next"
                intro="The next stage is the full flow from daily tracking to business admin."
                items={comingNext}
                color="purple"
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-indigo-100 bg-indigo-50/80 p-6 shadow-xl shadow-indigo-950/5 sm:p-8">
            <div className="grid items-center gap-5 lg:grid-cols-[auto_1fr_auto]">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600 text-3xl text-white">
                🌍
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">
                  Flexible by country
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
                  HeiyuBudget is designed to work across countries. Day, week,
                  month and year views can fit local tax-week and working
                  patterns, so your numbers make sense wherever you are.
                </p>
              </div>

              <div className="hidden text-6xl opacity-20 lg:block">🗺️</div>
            </div>
          </section>

          <section className="grid gap-6 py-6 lg:grid-cols-[1fr_1.3fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-950/5 sm:p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-4xl text-indigo-500">
                  👤
                </div>

                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-950">
                    Built from real admin pain
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                    HeiyuBudget was created from lived experience. The goal is
                    simple: less typing, less friction, and a tool that fits the
                    way real people work.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <SmallProof
                icon="👥"
                title="Built for real-world workers"
                text="Designed around the realities of on-the-move work."
              />
              <SmallProof
                icon="🔒"
                title="Private, secure and mobile-first"
                text="Your data is yours, protected and accessible anywhere."
              />
              <SmallProof
                icon="⏱️"
                title="Less friction. More time."
                text="Spend less time on admin and more on what matters."
              />
            </div>
          </section>

          <section className="mb-8 rounded-[2rem] bg-gradient-to-r from-indigo-600 to-cyan-500 p-6 text-white shadow-2xl shadow-indigo-900/20 sm:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                  Start with tracking today. Grow into the full business flow.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/85">
                  HeiyuBudget begins with income and expenses, then grows into
                  invoicing, stock, payments and smarter admin.
                </p>

                <a
                  href="https://heiyubudget.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#050505] transition hover:scale-[1.02]"
                >
                  Start Tracking
                </a>
              </div>

              <div className="rounded-3xl bg-white p-5 text-slate-950 shadow-xl">
              <a
              href="https://heiyubudget.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl bg-white p-5 text-slate-950 shadow-xl"
               >
              <img
               src="/heiyubudget-qr.png"
              alt="QR code to try HeiyuBudget"
              className="mx-auto h-32 w-32 rounded-xl border border-slate-200 bg-white p-1"
              />
             <p className="mt-4 text-center text-sm font-black">
             Scan to try HeiyuBudget
            </p>
            <p className="mt-1 text-center text-sm text-indigo-600">
            heiyubudget.com
             </p>
             </a>
              </div>
            </div>
          </section>
        </div>
      </section>

      <footer className="mt-8 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 text-sm text-slate-500 md:flex-row">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} HEIYU
            <span className="text-indigo-600">DIGITAL</span>. All rights
            reserved. Dublin, Ireland.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="/" className="transition hover:text-slate-950">
              Home
            </a>
            <a href="/heiyubudget" className="transition hover:text-slate-950">
              Heiyu Budget
            </a>
            <a href="/engagement" className="transition hover:text-slate-950">
              Quiz Platform
            </a>
            <a href="/mvp" className="transition hover:text-slate-950">
              MVP
            </a>
            <a href="/contact" className="transition hover:text-slate-950">
              Contact
            </a>
            <a href="/privacy" className="transition hover:text-slate-950">
              Privacy & Cookies
            </a>
          </div>
        </div>
      </footer>
    </PageShell>
  );
}

function MiniChart({
  label,
  color,
  values,
}: {
  label: string;
  color: "emerald" | "pink";
  values: number[];
}) {
  const textColor = color === "emerald" ? "text-emerald-300" : "text-pink-300";
  const barColor = color === "emerald" ? "bg-emerald-400" : "bg-pink-400";

  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className={`mb-4 text-center text-sm ${textColor}`}>{label}</p>
      <div className="flex h-16 items-end justify-center gap-2">
        {values.map((h) => (
          <span
            key={h}
            className={`w-3 rounded-full ${barColor}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturePanel({
  title,
  intro,
  items,
  color,
}: {
  title: string;
  intro: string;
  items: string[];
  color: "green" | "purple";
}) {
  const badge =
    color === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-indigo-200 bg-indigo-50 text-indigo-700";

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-indigo-950/5 sm:p-7">
      <h2 className="text-2xl font-black tracking-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{intro}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full border px-4 py-2 text-sm font-bold ${badge}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SmallProof({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-indigo-950/5">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-base font-black leading-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}