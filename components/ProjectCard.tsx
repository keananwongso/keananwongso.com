import Link from "next/link";
import type { Project } from "@/lib/content";

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <Link href={`/collection/${project.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border-[0.5px] border-hairline bg-paper-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          style={{ objectPosition: project.cardImagePosition ?? "center" }}
          className={`${featured ? "aspect-[16/7]" : "aspect-[16/10]"} w-full ${
            project.portrait ? "object-contain p-4" : "object-cover"
          } transition-transform duration-500 group-hover:scale-[1.02]`}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3
          className={`font-display font-medium leading-snug text-ink transition-opacity group-hover:opacity-70 ${
            featured ? "text-[28px]" : "text-[22px]"
          }`}
        >
          {project.title}
        </h3>
        <span className="label shrink-0">{project.year}</span>
      </div>
      <p
        className={`mt-1 text-[15px] leading-relaxed text-ink-soft ${
          featured ? "max-w-[60ch]" : "max-w-[42ch]"
        }`}
      >
        {project.caption}
      </p>
      {project.credential && (
        <p className="label mt-3">⌂ {project.credential}</p>
      )}
    </Link>
  );
}
