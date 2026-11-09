import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  CaseStudyHeader,
  CaseStudyFooter,
} from "../../components/CaseStudyChrome";

export const metadata: Metadata = {
  title: "Heiyu Pool | Heiyu Digital",
  description: "A personal pool game project using a TV and smartphone controller.",
};

const features = [
  {
    title: "Phone as the controller",
    description: "Aim, adjust shot power, select cue spin and shoot directly from your smartphone.",
  },
  {
    title: "Play on the big screen",
    description: "A full 15-ball pool table with player turns, pockets, scoring and ball animations.",
  },
  {
    title: "QR code and PIN pairing",
    description: "Connect your phone to the TV game through a real-time Socket.IO connection.",
  },
];

export default function HeiyuPoolCaseStudy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <CaseStudyHeader />

      <section className="px-5 pb-16 pt-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Selected Work / Hobby Project
          </p>
          <h1 className="text-4xl font-extrabold sm:text-6xl">
            Heiyu <span className="text-emerald-400">Pool.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-zinc-300">
            A personal coding project turning a TV into a pool table
            and a smartphone into the cue controller.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Hobby Project", "Interactive Game", "Next.js", "Socket.IO", "Matter.js"].map(tag => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
            <div className="relative aspect-[3/2]">
              <Image
                src="/portfolio/mockups/HeiyuPool.png"
                alt="Heiyu Pool TV game and smartphone controller"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-8">
            <Link href="/pool" className="inline-block rounded-full bg-emerald-400 px-8 py-4 font-bold text-black hover:bg-emerald-300">
              Play Now ↗
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-900/40 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-400">01 / The Idea</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Two screens. One pool table.</h2>
          </div>
          <div className="space-y-5 leading-8 text-zinc-300">
            <p>Heiyu Pool began as a hobby project to see whether a smartphone could replace a traditional game controller.</p>
            <p>The TV displays the pool table while the phone handles aiming, shot power, spin and shooting.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-400">02 / What I've Built</p>
          <h2 className="text-3xl font-bold sm:text-4xl">A playable pool game.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map(feature => (
              <article key={feature.title} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-7">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-900/40 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-400">03 / Behind The Build</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Built with web technology.</h2>
          </div>
          <div className="space-y-5 leading-8 text-zinc-300">
            <p>Next.js, React and TypeScript power the game interface and phone controller.</p>
            <p>Socket.IO sends controller commands to the game through a Node.js server hosted on Render.</p>
            <p>Matter.js handles the physics, with custom code for pockets, player turns, cue spin, animations and sounds.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-emerald-400/20 bg-zinc-900/60 p-8 sm:p-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-400">Work In Progress</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Still improving the game.</h2>
          <p className="mt-6 leading-8 text-zinc-300">
            Next on the list are solo and two-player controller modes, better foul rules,
            more realistic cue spin, tighter pockets and improved sound recordings.
          </p>
        </div>
      </section>

      <section className="px-5 py-24 text-center sm:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl">Fancy a game?</h2>
        <p className="mt-5 text-zinc-400">Open the game on your TV or computer and connect your phone.</p>
        <Link href="/pool" className="mt-8 inline-block rounded-full bg-emerald-400 px-9 py-4 font-bold text-black hover:bg-emerald-300">
          Play Heiyu Pool ↗
        </Link>
      </section>

      <CaseStudyFooter />
    </main>
  );
}
