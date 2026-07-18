import type { Metadata } from "next";
import { LINKS } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

const ABOUT_LINKS = [
  { href: LINKS.linkedin, label: "linkedin", external: true },
  { href: LINKS.github, label: "github", external: true },
  { href: LINKS.email, label: "email", external: false },
  { href: LINKS.resume, label: "résumé", external: true },
];

export default function AboutPage() {
  return (
    <main className="flex-1 px-6 pt-36 pb-28 md:px-20 md:pt-44">
      <p className="label">about</p>
      <h1 className="mt-4 font-display text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.2] text-ink">
        where i&rsquo;m coming from
      </h1>

      <div className="mt-10 max-w-[40ch] space-y-6">
        <p>
          Hi, I&rsquo;m Keanan. I grew up in Jakarta and came to UBC on
          scholarship after a gap year I spent building.
        </p>
        <p>
          My dad teaches Dhamma and my parents run a music business, so I grew
          up around two ideas: that nothing stands alone, and that you practice
          something every day until it becomes yours. I play violin and piano,
          though these days I approach music the way I approach code. I journal
          by hand every night. I build software.
        </p>
        <p>
          The thread through all of it is interdependence. I don&rsquo;t think
          growth happens in isolation, and I don&rsquo;t think skills stay in
          their lanes.
        </p>
      </div>

      <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
        {ABOUT_LINKS.map(({ href, label, external }) => (
          <a
            key={label}
            href={href}
            className="label transition-colors hover:text-ink"
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {label}
          </a>
        ))}
      </div>
    </main>
  );
}
