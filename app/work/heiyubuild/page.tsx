import { CaseStudyHeader, CaseStudyFooter } from "../../components/CaseStudyChrome";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HeiyuBuild Case Study | Heiyu Digital",
  description:
    "Explore the custom website created by Heiyu Digital for HeiyuBuild, a specialist groundworks business serving Dublin.",
};

const features = [
  {
    number: "01",
    title: "A strong first impression",
    description:
      "A bold, construction-focused design immediately communicates the business, its services and the areas it covers.",
  },
  {
    number: "02",
    title: "Designed for mobile",
    description:
      "A responsive layout adapts to phones and desktop screens, with clear navigation and prominent contact options.",
  },
  {
    number: "03",
    title: "Built around enquiries",
    description:
      "Prominent site-visit and quote buttons give prospective customers a clear next step.",
  },
];

export default function HeiyuBuildCaseStudy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <CaseStudyHeader />

      {/* INTRODUCTION */}
      <section className="relative overflow-hidden px-5 pb-16 pt-20 sm:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-3/4 -translate-x-1/2 bg-indigo-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
            Selected Work / Commercial Websites
          </p>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Heiyu<span className="text-amber-400">Build.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">
            A custom website designed to give a specialist Dublin
            groundworks business a strong digital presence and a
            clear route for customers to request work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Business Website", "Responsive Design", "Custom Development"].map(
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

          {/* MAIN PROJECT IMAGE */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/40">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src="/portfolio/mockups/HeiyuBuild.png"
                alt="HeiyuBuild website displayed on a laptop and mobile phone"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              Custom website / Groundworks / Dublin, Ireland
            </p>

            <a
              href="https://heiyubuild.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Visit Live Website ↗
            </a>
          </div>
        </div>
      </section>

      {/* PROJECT STORY */}
      <section className="border-y border-white/10 bg-zinc-900/40 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              01 / The Challenge
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Making a specialist business stand out online.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-zinc-300">
            <p>
              Groundworks is a practical, specialist service. Customers
              need to understand what work a contractor undertakes,
              where they operate and how to make contact.
            </p>
            <p>
              The website needed to explain services clearly,
              establish a professional presence and make it
              straightforward for potential customers to request
              a site visit.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            02 / The Solution
          </p>

          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            A website that puts the business and its customers first.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
            The finished design brings together strong imagery,
            clear service information and direct calls to action.
            Each part of the experience is focused on helping
            visitors find what they need.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-7 transition hover:border-indigo-400/30"
              >


                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>

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
              Practical design. Clear purpose.
            </h2>
          </div>

          <div className="space-y-5 text-zinc-300">
            <p className="leading-8">
              The website uses a strong visual hierarchy, with
              prominent headings and clear contrasts to make
              important information easy to identify.
            </p>
            <p className="leading-8">
              The desktop experience presents the business with
              large imagery and service navigation, while the
              mobile layout adapts the content and controls for
              smaller screens.
            </p>
            <p className="leading-8">
              The goal was to create a professional, approachable
              experience that helps visitors move from learning
              about the business to making an enquiry.
            </p>
          </div>
        </div>
      </section>

      {/* CUSTOMER CTA */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/70 to-zinc-900 px-7 py-16 text-center sm:px-12">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-indigo-300">
            Your Project Could Be Next
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Need a website for your business?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-300">
            Whether you're starting something new or improving
            an existing website, Heiyu Digital can help you
            create a custom online presence built around
            your business.
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
