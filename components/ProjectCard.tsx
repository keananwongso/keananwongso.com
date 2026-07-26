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
      <div
        className={`overflow-hidden rounded-xl border-[0.5px] border-hairline ${
          project.portrait ? "bg-[#EEEDE8]" : "bg-paper-raised"
        } ${featured ? "aspect-[16/7]" : "aspect-[16/10]"}`}
      >
        {project.portrait ? (
          <div className="flex h-full items-start justify-center pt-6">
            {/* Phone peeking up: rounded top bezel, body runs off the bottom edge. */}
            <div className="w-[150px] rounded-t-[1.6rem] bg-[#0e0e11] px-[3px] pt-[3px] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-1.5">
              <div className="relative overflow-hidden rounded-t-[1.4rem] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="block w-full object-cover object-top"
                />
                <div className="absolute left-1/2 top-1.5 h-[13px] w-[32%] -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={project.title}
            style={{ objectPosition: project.cardImagePosition ?? "center" }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
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
