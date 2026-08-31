import type { Metadata } from "next";
import { RESUME, LINKS, type CVEntry } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
};

function Section({ title, entries }: { title: string; entries: CVEntry[] }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="label border-b border-hairline-strong pb-2 tracking-[0.14em] uppercase">
        {title}
      </h2>
      <div className="mt-5 space-y-7">
        {entries.map((e, i) => (
          <div key={i}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg font-medium text-ink">
                {e.org}
              </h3>
              <span className="label shrink-0">{e.location}</span>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-ink-soft italic">{e.role}</p>
              <span className="label shrink-0">{e.dates}</span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {e.bullets.map((b, j) => (
                <li key={j} className="flex gap-3 text-ink-soft">
                  <span aria-hidden className="text-ink-muted shrink-0">
                    •
                  </span>
                  <span className="min-w-0">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <div className="pt-4 pb-4">
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-[clamp(26px,3.4vw,34px)] font-medium leading-tight text-ink">
          Resume
        </h1>
        <a href={LINKS.resume} className="link" target="_blank" rel="noreferrer">
          PDF ↗
        </a>
      </div>

      <div className="mt-10">
        <Section title="Education" entries={RESUME.education} />
        <Section title="Experience" entries={RESUME.experience} />
        <Section title="Projects" entries={RESUME.projects} />
        <Section title="Leadership" entries={RESUME.leadership} />

        <section className="mt-12">
          <h2 className="label border-b border-hairline-strong pb-2 tracking-[0.14em] uppercase">
            Skills
          </h2>
          <dl className="mt-5 space-y-2.5">
            {RESUME.skills.map((s) => (
              <div key={s.category} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="font-display font-medium text-ink shrink-0">
                  {s.category}:
                </dt>
                <dd className="text-ink-soft">{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
