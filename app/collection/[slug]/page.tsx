import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/content";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return { title: project ? project.title : "Not found" };
}

const META = [
  { key: "title", label: "Title" },
  { key: "role", label: "Role" },
  { key: "year", label: "Year" },
] as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="pt-4 pb-4">
      <Link href="/" className="label transition-colors hover:text-ink">
        ← Work
      </Link>

      {/* Metadata row */}
      <dl className="mt-8 grid grid-cols-3 gap-4">
        {META.map(({ key, label }) => (
          <div key={key}>
            <dt className="label">{label}</dt>
            <dd className="mt-1 text-ink">{project[key]}</dd>
          </div>
        ))}
      </dl>

      {/* Hero image */}
      <div className="mt-6 overflow-hidden rounded-xl border-[0.5px] border-hairline bg-paper-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      {/* Statement */}
      <div className="mt-12 max-w-[48ch]">
        <h2 className="font-display text-[clamp(24px,3vw,30px)] font-medium leading-snug text-ink">
          {project.statement}
        </h2>
      </div>

      {/* Stat callouts */}
      {project.stats && project.stats.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-6 border-y-[0.5px] border-hairline py-8 sm:grid-cols-3">
          {project.stats.map((stat, i) => (
            <div key={i}>
              <div className="font-display text-[28px] font-medium leading-none text-ink">
                {stat.value}
              </div>
              <div className="label mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Case-study sections */}
      <div className="mt-12 max-w-[48ch] space-y-12">
        {project.sections.map((section, i) => (
          <section key={i}>
            <h3 className="label">{section.heading}</h3>
            <div className="mt-3 space-y-5">
              {section.body.map((para, j) => (
                <p key={j} className="text-ink-soft">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Stack + link */}
      <div className="mt-12 max-w-[48ch] space-y-4 border-t-[0.5px] border-hairline pt-8">
        {project.stack && (
          <p className="text-ink-soft">
            <span className="label">Stack&nbsp;&nbsp;</span>
            {project.stack}
          </p>
        )}
        {project.link && (
          <p>
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {project.link.label} ↗
            </a>
          </p>
        )}
      </div>
    </article>
  );
}
