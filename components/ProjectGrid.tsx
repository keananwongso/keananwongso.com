import { PROJECTS } from "@/lib/content";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  return (
    <section>
      <h2 className="font-display text-lg font-medium text-ink">Projects</h2>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
