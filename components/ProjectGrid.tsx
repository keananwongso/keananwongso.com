"use client";

import { useMemo, useState } from "react";
import { PROJECTS, type Category } from "@/lib/content";
import ProjectCard from "./ProjectCard";

type Filter = "all" | Category;

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: PROJECTS.length,
      design: PROJECTS.filter((p) => p.category === "design").length,
      software: PROJECTS.filter((p) => p.category === "software").length,
    }),
    []
  );

  const shown =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "design", label: "Design" },
    { key: "software", label: "Software" },
  ];

  return (
    <section>
      <div className="flex gap-5">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={`font-display text-[17px] underline-offset-[6px] transition-colors ${
              filter === key
                ? "text-accent underline decoration-accent"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {label} ({counts[key]})
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
        {shown.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
