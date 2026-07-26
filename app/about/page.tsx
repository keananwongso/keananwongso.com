import type { Metadata } from "next";
import { Fragment } from "react";
import { ABOUT } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

/** Render a fun-fact string, expanding {label|href} tokens into links. */
function renderFact(text: string) {
  const parts = text.split(/(\{[^}]+\})/g);
  return parts.map((part, i) => {
    const match = part.match(/^\{([^|]+)\|([^}]+)\}$/);
    if (!match) return <Fragment key={i}>{part}</Fragment>;
    const [, label, href] = match;
    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="link"
      >
        {label}
      </a>
    );
  });
}

export default function AboutPage() {
  return (
    <div className="pt-4 pb-4">
      <section className="max-w-[46ch]">
        <h1 className="font-display text-[clamp(26px,3.4vw,34px)] font-medium leading-tight text-ink">
          {ABOUT.heading}
        </h1>
        <p className="mt-6 text-ink-soft">{ABOUT.intro}</p>

        <p className="mt-8 font-display text-lg font-medium text-ink">
          {ABOUT.funFactsLead}
        </p>
        <ul className="mt-3 space-y-2">
          {ABOUT.funFacts.map((fact, i) => (
            <li key={i} className="flex gap-3 text-ink-soft">
              <span aria-hidden className="text-ink-muted">
                •
              </span>
              <span>{renderFact(fact)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-ink-soft">{ABOUT.photosLead}</p>
      </section>

      {/* Polaroid row */}
      <div className="mt-6 flex flex-wrap gap-5">
        {ABOUT.photos.map((photo, i) => (
          <figure
            key={i}
            className="w-40 rounded-sm border-[0.5px] border-hairline bg-paper-raised p-2.5 pb-4 shadow-sm"
            style={{ rotate: `${(i % 2 === 0 ? -1 : 1) * (1 + i * 0.4)}deg` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption}
              className="aspect-square w-full rounded-[2px] object-cover"
            />
            <figcaption className="mt-3 text-center">
              <span className="block font-display text-sm text-ink">
                {photo.caption}
              </span>
              <span className="label mt-0.5 block">{photo.date}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
