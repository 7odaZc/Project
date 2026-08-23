import Link from "next/link";
import AdvisorForm from "../components/AdvisorForm";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../lib/projects";

export default function HomePage() {
  return (
    <main className="mx-auto w-[min(1120px,calc(100%-32px))]">
      <section className="py-24 md:py-32">
        <p className="text-xs font-bold tracking-[.16em] text-[#AAB2FF]">
          COMPUTER SCIENCE · SOFTWARE DEVELOPMENT
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[.95] tracking-[-.05em] md:text-7xl">
          I build software, <span className="text-[#AAB2FF]">then I debug it.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#9EACC0]">
          I’m Mahmoud, a Computer Science student interested in software development,
          testing, AI, and interactive projects.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#advisor" className="rounded-xl bg-[#4F5FCF] px-5 py-3 font-bold">
            Find relevant work
          </Link>
          <Link href="/contact" className="rounded-xl border border-white/10 px-5 py-3 font-bold">
            Contact me
          </Link>
        </div>
      </section>

      <section className="pb-24">
          <p className="text-xs font-bold tracking-[.14em] text-[#AAB2FF]">SELECTED WORK</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight">Things I’ve built.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="advisor" className="scroll-mt-10 border-t border-white/10 py-24">
        <AdvisorForm />
      </section>

      <section className="pb-24 pt-4">
        <div className="rounded-3xl border border-white/10 bg-[#101B2E] p-7 md:p-10">
          <p className="text-xs font-bold tracking-[.14em] text-[#AAB2FF]">LET’S TALK</p>
          <h2 className="mt-3 text-3xl font-bold">Have a project, opportunity, or question?</h2>
          <Link href="/contact" className="mt-6 inline-block font-bold text-[#AAB2FF]">
            Contact me →
          </Link>
        </div>
      </section>
    </main>
  );
}
