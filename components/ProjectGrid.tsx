import { PROJECTS } from "@/lib/content";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section>
      <h2 className="font-display text-lg font-medium text-ink">Projects</h2>

      {featured && (
        <div className="mt-8">
          <ProjectCard project={featured} featured />
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
