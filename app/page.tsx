import { INTRO, CONTACT, EXPERIENCE, LEADERSHIP } from "@/lib/content";
import ProjectGrid from "@/components/ProjectGrid";

const ROLES = [...EXPERIENCE, ...LEADERSHIP];

export default function Home() {
  return (
    <div className="pt-4 pb-4">
      {/* Intro */}
      <section>
        <h1 className="font-display text-[clamp(26px,3.4vw,34px)] font-medium leading-tight text-ink">
          {INTRO.heading}
        </h1>
        <p className="mt-6 text-ink-soft">{INTRO.body}</p>
        <p className="mt-4 text-ink-soft">
          {INTRO.currentRole.text}{" "}
          <a
            href={INTRO.currentRole.link.href}
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            {INTRO.currentRole.link.label}
          </a>
          .
        </p>
      </section>

      <hr className="my-12 border-0 border-t border-dashed border-hairline-strong" />

      {/* Contact + Experience/Leadership */}
      <section className="grid grid-cols-1 gap-12 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-medium text-ink">Contact</h2>
          <ul className="mt-5 space-y-2.5">
            {CONTACT.map(({ label, href }, i) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-baseline justify-between text-ink transition-colors hover:text-ink-muted"
                >
                  <span>
                    <sup className="label mr-1 align-super">{i + 1}</sup>
                    {label}
                  </span>
                  <span className="text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-medium text-ink">
            Experience
          </h2>
          <ul className="mt-5 space-y-4">
            {ROLES.map(({ company, role, dates }) => (
              <li key={company}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-ink">{company}</span>
                  <span className="label shrink-0">{dates}</span>
                </div>
                <p className="label mt-0.5">{role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="my-12 border-0 border-t border-dashed border-hairline-strong" />

      <ProjectGrid />
    </div>
  );
}
