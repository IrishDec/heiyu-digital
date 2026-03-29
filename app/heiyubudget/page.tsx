"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Camera,
  CreditCard,
  Download,
  FileText,
  Menu,
  Package,
  X,
} from "lucide-react";

type DemoResult = {
  type: "Income" | "Expense";
  amount: string;
  category: string;
};

type GlowState = Record<string, { x: number; y: number; active: boolean }>;

function GlassShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-32 h-[22rem] w-[22rem] rounded-full bg-[#39FF14]/8 blur-[120px]" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(57,255,20,0.06),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.08),transparent_26%)]" />
      </div>
      {children}
    </main>
  );
}

function AppHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-3 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-full border border-[#ffffff10] bg-white/[0.03] px-3 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <a
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#ffffff10] bg-white/[0.03] px-4 text-sm text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">Back</span>
          </a>

          <div className="min-w-0 text-center">
            <div className="truncate text-[11px] uppercase tracking-[0.26em] text-white/45">
              Heiyu Digital Product
            </div>
            <div className="truncate text-sm font-medium uppercase tracking-[0.18em] text-white/80">
              Heiyu Budget
            </div>
          </div>

          <button
            onClick={onMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ffffff10] bg-white/[0.03] text-white/80"
            aria-label="Open menu"
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
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
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed right-4 top-4 z-50 w-[min(88vw,22rem)] rounded-[1.75rem] border border-[#ffffff10] bg-[#0b0b0b]/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              Navigate
            </div>
            <div className="mt-1 text-lg font-semibold">HeiyuBudget</div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffff10] bg-white/[0.03] text-white/80"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <a
            href="#top"
            onClick={onClose}
            className="block w-full rounded-2xl border border-[#ffffff10] bg-white/[0.03] px-4 py-4 text-left transition hover:bg-white/[0.06]"
          >
            <div className="text-sm font-semibold">Top</div>
            <div className="mt-1 text-sm text-white/50">
              Hero and product positioning.
            </div>
          </a>

          <a
            href="#audiences"
            onClick={onClose}
            className="block w-full rounded-2xl border border-[#ffffff10] bg-white/[0.03] px-4 py-4 text-left transition hover:bg-white/[0.06]"
          >
            <div className="text-sm font-semibold">Who it’s for</div>
            <div className="mt-1 text-sm text-white/50">
              Drivers, trade, creative, and service.
            </div>
          </a>

          <a
            href="#roadmap"
            onClick={onClose}
            className="block w-full rounded-2xl border border-[#ffffff10] bg-white/[0.03] px-4 py-4 text-left transition hover:bg-white/[0.06]"
          >
            <div className="text-sm font-semibold">Roadmap</div>
            <div className="mt-1 text-sm text-white/50">
              Payments, invoices, receipts, and export.
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default function HeiyuBudgetPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [glow, setGlow] = useState<GlowState>({});
  const [isTouch, setIsTouch] = useState(false);

  const [listening, setListening] = useState(false);
  const [spokenText, setSpokenText] = useState("expense 25 fuel");
  const [demoResult, setDemoResult] = useState<DemoResult>({
    type: "Expense",
    amount: "€25.00",
    category: "Fuel",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const audiences = [
    {
      title: "Drivers",
      desc: "Track income and expenses on the move without slowing down.",
    },
    {
      title: "Trade",
      desc: "Stay on top of jobs, parts, and daily cash flow in seconds.",
    },
    {
      title: "Creative",
      desc: "A cleaner way to manage income, tools and client costs.",
    },
    {
      title: "Service",
      desc: "Built for real-world businesses that need fast money visibility.",
    },
  ];

  const features = [
    {
      title: "Glass Payments",
      desc: "Accept card payments by tapping your phone. No extra hardware.",
      icon: <CreditCard className="h-7 w-7" />,
      large: true,
    },
    {
      title: "Smart Invoicing",
      desc: "Send professional PDFs to clients in seconds. Pre-loaded with your details.",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Inventory & Materials",
      desc: "Track parts, fuel, and stock. Know exactly what every job costs you.",
      icon: <Package className="h-6 w-6" />,
    },
    {
      title: "Smart Receipts",
      desc: "Snap a photo. Our AI does the typing and categorization for you.",
      icon: <Camera className="h-6 w-6" />,
    },
    {
      title: "Tax-Ready Export",
      desc: "For your Accountant. One-click ROS-compatible exports for your year-end.",
      icon: <Download className="h-6 w-6" />,
    },
  ];

  const parseVoiceDemo = (text: string): DemoResult => {
    const raw = text.trim();
    const lower = raw.toLowerCase();

    const amountMatch = lower.match(/(\d+(?:\.\d{1,2})?)/);
    const amountNumber = amountMatch ? parseFloat(amountMatch[1]) : 0;

    let type: "Income" | "Expense" = "Expense";

    if (lower.includes("income")) {
      type = "Income";
    } else if (lower.includes("expense")) {
      type = "Expense";
    }

    let category = type === "Income" ? "Income" : "General";

    if (
      lower.includes("fuel") ||
      lower.includes("diesel") ||
      lower.includes("petrol")
    ) {
      category = "Fuel";
    } else if (lower.includes("cash")) {
      category = "Cash";
    } else if (
      lower.includes("food") ||
      lower.includes("lunch") ||
      lower.includes("dinner")
    ) {
      category = "Food";
    } else if (lower.includes("tools")) {
      category = "Tools";
    } else if (lower.includes("materials")) {
      category = "Materials";
    }

    return {
      type,
      amount: `€${amountNumber.toFixed(2)}`,
      category,
    };
  };

  const handleMicClick = () => {
    if (typeof window === "undefined") return;

    const win = window as Window & {
      SpeechRecognition?: new () => {
        lang: string;
        interimResults: boolean;
        maxAlternatives: number;
        onstart: null | (() => void);
        onresult: null | ((event: any) => void);
        onerror: null | (() => void);
        onend: null | (() => void);
        start: () => void;
      };
      webkitSpeechRecognition?: new () => {
        lang: string;
        interimResults: boolean;
        maxAlternatives: number;
        onstart: null | (() => void);
        onresult: null | ((event: any) => void);
        onerror: null | (() => void);
        onend: null | (() => void);
        start: () => void;
      };
    };

    const SpeechRecognitionAPI =
      win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert("Speech recognition is not supported on this browser.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event?.results?.[0]?.[0]?.transcript?.trim() || "";
      if (!transcript) return;

      setSpokenText(transcript);
      setDemoResult(parseVoiceDemo(transcript));
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <GlassShell>
      <AppHeader onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <section
        id="top"
        className="relative mx-auto max-w-7xl px-4 pb-36 pt-8 sm:px-6 lg:px-10"
      >
        <div className="pt-6 text-center sm:pt-10">
          <h1 className="mx-auto max-w-5xl text-[2.6rem] font-semibold leading-[0.95] tracking-[-0.07em] text-white sm:text-6xl lg:text-[6.25rem]">
            Finance for the <span className="text-white/90">Self-Made.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-lg sm:leading-8">
            Voice-first money management. Designed in Dublin. Built for the
            world.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ffffff10] bg-white/[0.05] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-7 lg:col-span-8 lg:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_35%,transparent_65%,rgba(255,255,255,0.02))]" />

            <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_18rem] lg:items-center">
              <div className="max-w-2xl text-left">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                  The Magic Moment
                </p>

                <h2 className="mt-3 text-[2.35rem] font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-4xl lg:text-[3.35rem]">
                  Say it. It’s logged.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8 lg:text-lg">
                  Voice-first money tracking for real life. Log income or
                  expenses in seconds and see the result instantly.
                </p>

                <div className="mt-5 rounded-2xl border border-[#ffffff10] bg-white/[0.03] p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Try saying
                  </p>
                  <div className="mt-2 text-base font-medium text-white/85 sm:text-lg">
                    “income 60 cash” or “expense 25 fuel” Or another figure! 
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#ffffff10] bg-white/[0.03] p-4">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Speed
                    </div>
                    <div className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                      Natural voice input
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/50">
                      Speak normally. Log it before the moment passes.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#ffffff10] bg-white/[0.03] p-4">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Result
                    </div>
                    <div className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                      Clean instant output
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/50">
                      Clear category, amount, and type without admin overload.
                    </div>
                  </div>
                </div>
              </div>

              <div className="justify-self-center rounded-[1.5rem] border border-[#ffffff10] bg-[#0b0b0b]/70 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-5 lg:w-[18rem] lg:justify-self-end">
                <div className="rounded-[1.25rem] border border-[#ffffff10] bg-white/[0.03] p-4 sm:rounded-[1.5rem] sm:p-5">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Live Capture
                  </p>

                  <div className="mt-5 relative flex items-center justify-center sm:mt-6">
                    <div
                      className={`absolute h-32 w-32 rounded-full blur-3xl sm:h-40 sm:w-40 ${
                        listening
                          ? "bg-pink-400/20 animate-pulse"
                          : "bg-cyan-400/10 animate-pulse"
                      }`}
                    />
                    <button
                      onClick={handleMicClick}
                      type="button"
                      className={`relative flex h-24 w-24 items-center justify-center rounded-full border text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_60px_rgba(0,0,0,0.45)] sm:h-28 sm:w-28 ${
                        listening
                          ? "border-pink-300/30 bg-pink-400/10"
                          : "border-white/15 bg-white/[0.06]"
                      }`}
                    >
                      <span
                        className={`absolute inset-0 rounded-full ${
                          listening
                            ? "border border-pink-300/25 animate-ping"
                            : "border border-cyan-300/20 animate-ping"
                        }`}
                      />
                      <span className="text-3xl">🎙️</span>
                    </button>
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#ffffff10] bg-[linear-gradient(90deg,rgba(34,211,238,0.18),rgba(217,70,239,0.18))] px-4 py-4 text-center text-base font-medium tracking-[-0.03em] sm:mt-6 sm:px-5 sm:text-lg">
                    {listening ? "Listening..." : "Tap to Speak"}
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#ffffff10] bg-black/20 p-4">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      You said
                    </div>
                    <div className="mt-2 text-sm font-medium leading-6 text-white/85">
                      “{spokenText}”
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-4">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Result
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/45">Type</span>
                          <span
                            className={`font-medium ${
                              demoResult.type === "Income"
                                ? "text-emerald-400"
                                : "text-pink-400"
                            }`}
                          >
                            {demoResult.type}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/45">Amount</span>
                          <span className="font-medium text-white">
                            {demoResult.amount}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/45">Category</span>
                          <span className="font-medium text-cyan-300">
                            {demoResult.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-4">
            <div className="rounded-[1.75rem] border border-[#ffffff10] bg-white/[0.05] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                Built for speed
              </p>
              <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                <div className="rounded-2xl border border-[#ffffff10] bg-white/[0.03] p-4">
                  <div className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                    Voice-first
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/50">
                    No slow forms. No spreadsheet drag.
                  </div>
                </div>

                <div className="rounded-2xl border border-[#ffffff10] bg-white/[0.03] p-4">
                  <div className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                    Mobile-native feel
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/50">
                    Designed for real-world use while moving.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#ffffff10] bg-white/[0.05] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                Positioning
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:mt-4 sm:text-3xl">
                Not bloated accounting. Not toy budgeting.
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/55">
                A cleaner money layer for self-employed workers and small
                operators who need clarity, not clutter.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8" id="audiences">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between sm:mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                Who it’s for
              </p>
              <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                Made for the people who actually keep things moving.
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">
            {audiences.map((item, idx) => {
              const cardGlow = glow[item.title] || {
                x: 50,
                y: 50,
                active: false,
              };
              const opacity = isTouch ? 0.55 : cardGlow.active ? 1 : 0.35;
              const background = isTouch
                ? "radial-gradient(220px circle at 50% 35%, rgba(255,255,255,0.08), transparent 45%)"
                : `radial-gradient(280px circle at ${cardGlow.x}% ${cardGlow.y}%, rgba(255,255,255,0.08), transparent 45%)`;

              return (
                <div
                  key={item.title}
                  onMouseMove={
                    isTouch
                      ? undefined
                      : (e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 100;
                          const y = ((e.clientY - rect.top) / rect.height) * 100;
                          setGlow((prev) => ({
                            ...prev,
                            [item.title]: { x, y, active: true },
                          }));
                        }
                  }
                  onMouseLeave={
                    isTouch
                      ? undefined
                      : () => {
                          setGlow((prev) => ({
                            ...prev,
                            [item.title]: {
                              ...(prev[item.title] || { x: 50, y: 50 }),
                              active: false,
                            },
                          }));
                        }
                  }
                  className="relative overflow-hidden rounded-[1.75rem] border border-[#ffffff10] bg-white/[0.05] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-6"
                >
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                    style={{ opacity, background }}
                  />
                  <div
                    className={`absolute inset-x-0 top-0 h-px ${
                      idx % 2 === 0 ? "bg-[#39FF14]/35" : "bg-fuchsia-300/30"
                    }`}
                  />
                  <div className="relative z-10">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] sm:mt-8">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/55 sm:mt-4">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <div className="rounded-[1.75rem] border border-[#ffffff10] bg-white/[0.05] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">
              Why it lands
            </p>
            <div className="mt-5 grid gap-5 sm:gap-6 md:grid-cols-3">
              <div>
                <div className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                  Fast
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  Built to be used in the gaps between real work, not after it.
                </p>
              </div>
              <div>
                <div className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                  Clear
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  Income, expense, and history at a glance with no noise.
                </p>
              </div>
              <div>
                <div className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                  Premium
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  A product feel that respects the user and the time they are
                  giving it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-8 pt-14 text-center sm:pt-16" id="enter">
          <p className="text-[11px] uppercase tracking-[0.26em] text-white/40">
            Get started
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.06em] sm:mt-5 sm:text-5xl md:text-6xl">
            Clean, dark, and built to feel like it already belongs in your
            pocket.
          </h2>
          <div className="mt-8 flex justify-center sm:mt-10">
            <a
              href="https://heiyubudget.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-sm items-center justify-center rounded-full border border-[#ffffff10] bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#050505] shadow-[0_12px_40px_rgba(255,255,255,0.08)] transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Start Tracking
            </a>
          </div>
        </section>

        <section className="pb-28 pt-8" id="roadmap">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-[11px] uppercase tracking-[0.26em] text-white/40">
              Roadmap
            </p>
            <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl md:text-6xl">
              The Future of Self-Made Finance.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              The next layer of HeiyuBudget is built around payments, invoices,
              receipts, smarter tracking, and cleaner year-end reporting.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:auto-rows-[minmax(220px,1fr)]">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className={`relative overflow-hidden rounded-[1.75rem] border border-[#ffffff10] bg-white/[0.05] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-6 lg:p-7 ${
                  feature.large ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_35%,transparent_65%,rgba(255,255,255,0.02))]" />
                <div className="absolute inset-x-0 top-0 h-px bg-[#39FF14]/35" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex items-center rounded-full border border-[#39FF14]/25 bg-[#39FF14]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#39FF14]">
                      Coming Soon
                    </span>
                    <div className="text-white/70">{feature.icon}</div>
                  </div>

                  <div className="mt-5 flex-1">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                      {feature.desc}
                    </p>

                    {idx === 0 && (
                      <div className="mt-8 flex flex-col items-center justify-center rounded-[1.5rem] border border-[#ffffff10] bg-[#0b0b0b]/60 p-6 sm:p-10">
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] sm:h-28 sm:w-28">
                          <span className="absolute inset-0 rounded-full border border-[#39FF14]/20 animate-ping" />
                          <span className="absolute h-20 w-20 rounded-full bg-[#39FF14]/8 blur-2xl" />
                          <CreditCard className="relative h-8 w-8 text-white" />
                        </div>
                        <div className="mt-5 text-center text-sm uppercase tracking-[0.24em] text-white/45">
                          Tap to Pay
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="rounded-[1.4rem] border border-[#ffffff10] bg-[#0b0b0b]/90 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-3 rounded-[1rem] bg-white/[0.04] px-4 py-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Get Started
                  </div>
                  <div className="mt-1 text-sm font-medium text-white/80">
                    Start Tracking
                  </div>
                </div>
                <a
                  href="https://heiyubudget.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#050505] transition-transform hover:scale-[1.02]"
                >
                  Start Tracking
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* FOOTER */}
<footer className="mt-20 border-t border-white/5">
  <div className="max-w-6xl mx-auto px-6 py-12 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="text-center md:text-left">
      © {new Date().getFullYear()} HEIYU
      <span className="text-indigo-500">DIGITAL</span>. All rights reserved. Dublin, Ireland.
    </div>

    <div className="flex flex-wrap justify-center gap-6 items-center">
      <a href="/" className="hover:text-white transition">Home</a>
      <a href="/heiyubudget" className="hover:text-white transition">Heiyu Budget</a>
      <a href="/engagement" className="hover:text-white transition">Quiz Platform</a>
      <a href="/contact" className="hover:text-white transition">Contact</a>
      <a href="/privacy" className="hover:text-white transition">Privacy & Cookies</a>
    </div>
  </div>
</footer>
      </section>
    </GlassShell>
  );
}