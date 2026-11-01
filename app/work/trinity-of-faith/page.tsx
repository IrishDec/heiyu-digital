import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CaseStudyHeader,
  CaseStudyFooter,
} from "../../components/CaseStudyChrome";

export const metadata: Metadata = {
  title: "Trinity of Faith Case Study | Heiyu Digital",
  description:
    "A community website for the Trinity of Faith Partnership, connecting Clonskeagh, Kilmacud and Mount Merrion.",
};

const features = [
  {
    title: "Three communities. One website.",
    description:
      "A shared digital home for Clonskeagh, Kilmacud and Mount Merrion, bringing parish information together.",
  },
  {
    title: "Accessible on every screen",
    description:
      "Desktop and mobile layouts make parish information and navigation easier to access.",
  },
  {
    title: "Built for community life",
    description:
      "Clear access to parish news, volunteering, sacraments, donations and webcam services.",
  },
];

export default function TrinityOfFaithCaseStudy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <CaseStudyHeader />

      {/* INTRODUCTION */}
      <section className="relative overflow-hidden px-5 pb-16 pt-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            Selected Work / Community Websites
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Trinity of <span className="text-amber-300">Faith.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">
            A community-focused website bringing three Dublin parish
            communities together in one welcoming digital space.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Community Website", "Responsive Design", "Custom Development"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src="/portfolio/mockups/tof.png"
                alt="Trinity of Faith website displayed on laptop and mobile phone"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              Community Website / Parish Partnership / Dublin
            </p>
            <a
              href="https://trinityoffaith.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Visit Live Website ↗
            </a>
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="border-y border-white/10 bg-zinc-900/40 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              01 / The Challenge
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Bringing three parish communities together.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-zinc-300">
            <p>
              Clonskeagh, Kilmacud and Mount Merrion each have their
              own community life, while sharing a wider partnership.
            </p>
            <p>
              The website needed to present information clearly,
              help parishioners find relevant services and offer
              visitors a welcoming online experience.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            02 / The Solution
          </p>

          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            A digital home designed around its community.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
            The design combines parish imagery, clear navigation and
            a mobile-friendly experience to help visitors find
            information without unnecessary complexity.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-7 transition hover:border-indigo-400/30"
              >
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BEHIND THE BUILD */}
      <section className="border-y border-white/10 bg-zinc-900/40 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              03 / Behind The Build
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Designed with purpose and care.
            </h2>
          </div>

          <div className="space-y-5 leading-8 text-zinc-300">
            <p>
              The design uses familiar parish imagery, generous
              spacing and carefully arranged navigation to make
              information approachable.
            </p>
            <p>
              Desktop visitors see a wide photographic presentation,
              while the mobile design adapts the layout and menu
              for smaller screens.
            </p>
            <p>
              The result is a shared digital destination that
              reflects the identity of the partnership and
              supports everyday parish communication.
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNITY COLLABORATION */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-amber-300/20 bg-zinc-900/60 p-8 sm:p-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-300">
            Pro Bono Community Project
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built Together. Given Back.
          </h2>

          <div className="mt-7 space-y-5 text-base leading-8 text-zinc-300">
            <p>
              The Trinity of Faith website was developed pro bono by
              HeiyuDigital, in collaboration with a committee of parish
              members who helped shape its design, structure and content.
            </p>

            <p>
              The project brought together the committee's ideas and
              knowledge of their communities with HeiyuDigital's
              technical development skills to create a website serving
              Clonskeagh, Kilmacud and Mount Merrion.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/70 to-zinc-900 px-7 py-16 text-center sm:px-12">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-indigo-300">
            Your Project Could Be Next
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Need a website for your organisation?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-300">
            From local organisations to growing businesses,
            Heiyu Digital creates custom websites that put
            people and their needs first.
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-block rounded-xl bg-indigo-500 px-8 py-4 font-semibold transition hover:bg-indigo-400"
          >
            Discuss Your Project ↗
          </Link>
        </div>
      </section>

      <CaseStudyFooter />
    </main>
  );
}
