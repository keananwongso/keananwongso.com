import { INTRO, CONTACT, EXPERIENCE } from "@/lib/content";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <div className="pt-4 pb-4">
      {/* Intro */}
      <section className="max-w-[46ch]">
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

      {/* Contact + Experience */}
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
          <ul className="mt-5 space-y-2.5">
            {EXPERIENCE.map(({ company, year }) => (
              <li
                key={company}
                className="flex items-baseline justify-between text-ink"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-ink-muted"
                  />
                  {company}
                </span>
                <span className="label">{year}</span>
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
