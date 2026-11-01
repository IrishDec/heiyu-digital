
import Link from "next/link";
import HomeMobileMenu from "./HomeMobileMenu";

const projects = [
  {
    name: "HeiyuBudget",
    category: "CUSTOM WEB APPLICATION",
    description:
      "A voice-powered finance application making everyday income and expense tracking simpler.",
    href: "/heiyubudget",
    image: "/images/budgetscreen.jpg",
    gradient: "from-indigo-900/70 to-violet-950",
    technologies: ["Next.js", "Supabase", "Voice"],
  },
  {
    name: "HeiyuQuiz",
    category: "AI & INTERACTIVE SOFTWARE",
    description:
      "An interactive quiz platform featuring AI-generated questions, timed challenges and competitive leaderboards.",
    href: "/engagement",
    image: "/images/createquiz.jpg",
    gradient: "from-violet-900/70 to-fuchsia-950",
    technologies: ["AI", "Azure", "Supabase"],
  },
  {
    name: "Heiyu Build",
    category: "COMMERCIAL WEBSITE",
    description:
      "A custom business website showcasing specialist groundworks and construction services.",
    href: "/work/heiyubuild",
    image: "/portfolio/mockups/HeiyuBuild.png",
    gradient: "from-amber-900/50 to-zinc-950",
    technologies: ["Business Website", "Custom Design"],
  },
  {
    name: "Dublin Radon Services",
    category: "COMMERCIAL WEBSITE",
    description:
      "A specialist website helping Irish property owners understand radon testing and remediation.",
    href: "/work/dublin-radon-services",
    image: "/portfolio/mockups/Dublinradon.png",
    gradient: "from-teal-900/60 to-slate-950",
    technologies: ["Service Website", "Custom Design"],
  },
  {
    name: "Trinity of Faith",
    category: "COMMUNITY PLATFORM",
    description:
      "A digital home providing parish information, community updates and access to services.",
    href: "/work/trinity-of-faith",
    image: "/portfolio/mockups/tof.png",
    gradient: "from-sky-900/60 to-indigo-950",
    technologies: ["Community", "Web Design"],
  },
];

const services = [
  {
    number: "01",
    title: "Custom Business Websites",
    description:
      "Stand out with a professionally designed website built around your business, your customers and your goals.",
  },
  {
    number: "02",
    title: "Web Applications & SaaS",
    description:
      "From customer portals to subscription products, we create software that solves real business problems.",
  },
  {
    number: "03",
    title: "AI & Business Automation",
    description:
      "Practical AI features and connected tools that help reduce repetitive work and improve customer experiences.",
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const external = project.href.startsWith("http");

  return (
    <Link
      href={project.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div
        className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} application preview`}
            className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="px-5 text-center">
            <span className="text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
              {project.name}
            </span>
            <div className="mx-auto mt-4 h-px w-20 bg-white/30" />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">
              Custom Digital Experience
            </p>
          </div>
        )}

        <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur">
          View Project ↗
        </span>
      </div>

      <div className="p-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-indigo-400">
          {project.category}
        </p>
        <h3 className="mt-3 text-xl font-bold text-white">
          {project.name}
        </h3>
        <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function NewHomepage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            HEIYU<span className="text-indigo-400">DIGITAL</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            <a href="#work" className="hover:text-white">Our Work</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#why-us" className="hover:text-white">Why Custom Code</a>
          </div>

          <Link
            href="/contact"
            className="hidden rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold transition hover:bg-indigo-400 md:inline-flex"
          >
            Get a Quote ↗
          </Link>
          <HomeMobileMenu />
        </div>
      </nav>

      <main>
        {/* HERO */}
     <section className="relative overflow-hidden px-5 pb-16 pt-20 text-center sm:px-8 lg:pb-20 lg:pt-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[min(700px,100%)] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl">
            <p className="mb-8 inline-block rounded-full border border-indigo-400/25 bg-indigo-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-300">
              Custom Software Studio · Dublin, Ireland
            </p>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Your business deserves
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                more than a template.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">
              We design and build custom-coded websites, web applications
              and digital tools that help businesses stand out, serve
              customers and turn ideas into working products.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-indigo-500 px-7 py-4 font-semibold shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
              >
                Get a Free Project Quote ↗
              </Link>
              <a
                href="#work"
                className="rounded-xl border border-white/20 px-7 py-4 font-semibold transition hover:border-white/50 hover:bg-white/5"
              >
                Explore Our Work ↓
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-zinc-400">
              <span>✓ No WordPress Templates</span>
              <span>✓ Custom Development</span>
              <span>✓ Mobile-First Design</span>
              <span>✓ Based in Ireland</span>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="work" className="px-5 pb-20 pt-8 sm:px-8 lg:pt-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
                Selected Work
              </p>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Real projects. Real code.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                From interactive applications to specialist business
                websites, here's a selection of what we've built.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}

              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
                <span className="text-5xl font-light text-indigo-400">+</span>
                <h3 className="mt-5 text-xl font-bold">
                  Always Building.
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-7 text-zinc-400">
                  Independent experiments, games and new digital ideas.
                  More projects are on their way.
                </p>
                <span className="mt-6 rounded-full border border-indigo-400/20 px-4 py-2 text-xs text-indigo-300">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="border-y border-white/5 bg-zinc-900/40 px-5 py-16 sm:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
              What We Do
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Built around your business. Not a template.
            </h2>
            <p className="mt-5 max-w-2xl text-zinc-400">
              Whether you need a business website or a custom software
              product, we build around what you actually need.
            </p>

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.number}
                  className="rounded-2xl border border-white/10 bg-zinc-950 p-6 transition hover:border-indigo-500/40"
                >
                  <span className="text-sm font-bold text-indigo-400">
                    {service.number} /
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CUSTOM CODE */}
        <section
          id="why-us"
          className="border-y border-white/5 bg-zinc-900/40 px-5 py-16 sm:px-8"
        >
          <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
                The Heiyu Digital Difference
              </p>
              <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                No bloated themes.
                <br />
                No unnecessary plugins.
                <br />
                <span className="text-indigo-400">
                  Just purposeful code.
                </span>
              </h2>
            </div>

            <div className="space-y-7 text-zinc-300">
              <div>
                <h3 className="font-bold text-white">Built for performance</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Lightweight, carefully written code helps your pages
                  load quickly and gives visitors a smoother experience.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white">Fewer moving parts</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Avoid the constant plugin and theme maintenance
                  that comes with many off-the-shelf website setups.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white">Made to fit your needs</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-400">
                  Your website should reflect your business,
                  not the limitations of a premade design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="px-5 py-28 text-center sm:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/60 to-zinc-900 px-6 py-16 sm:px-12">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
              Let's Talk About Your Project
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Have an idea? Let's build it.
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-8 text-zinc-300">
              Need a new website, a better online presence or a
              custom application? Tell us what you're planning
              and we'll discuss the next steps.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block rounded-xl bg-indigo-500 px-8 py-4 font-semibold transition hover:bg-indigo-400"
            >
              Request a Free Quote ↗
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-9 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-sm text-zinc-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Heiyu Digital. Dublin, Ireland.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <a href="#work" className="hover:text-white">
              Portfolio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
