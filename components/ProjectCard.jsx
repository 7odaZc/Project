import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#101B2E] p-5">
      <div
        className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-white/10 bg-[#0D1627] text-xs tracking-[.12em] text-[#7F8DA1]"
        aria-label={`${project.title} project screenshot placeholder`}
      >
        REAL PROJECT SCREENSHOT
      </div>

      <p className="mt-5 text-xs font-bold tracking-[.14em] text-[#4F5FCF]">PROJECT</p>
      <h2 className="mt-2 text-2xl font-bold">{project.title}</h2>
      <p className="mt-3 leading-7 text-[#9EACC0]">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.skills.map((skill) => (
          <span key={skill} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#C7D0DD]">
            {skill}
          </span>
        ))}
      </div>

      <Link
        href={`/work/${project.slug}`}
        className="mt-6 inline-block font-bold text-[#AAB2FF] hover:text-white"
      >
        View case study →
      </Link>
    </article>
  );
}
