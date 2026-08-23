import ProjectCard from "../../components/ProjectCard";
import { projects } from "../../lib/projects";

export default function WorkPage() {
  return (
    <main className="mx-auto w-[min(1120px,calc(100%-32px))] py-20">
      <p className="text-xs font-bold tracking-[.14em] text-[#7785FF]">WORK</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">Things I’ve built.</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[#9EACC0]">
        Projects where I had to build, debug, experiment, and figure things out.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
