import Link from "next/link";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/collection/${project.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border-[0.5px] border-hairline bg-paper-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <h3 className="mt-4 font-display text-[22px] font-medium leading-snug text-ink transition-opacity group-hover:opacity-70">
        {project.title}
      </h3>
      <p className="mt-1 max-w-[42ch] text-[15px] leading-relaxed text-ink-soft">
        {project.caption}
      </p>
      {project.credential && (
        <p className="label mt-3">⌂ {project.credential}</p>
      )}
    </Link>
  );
}
